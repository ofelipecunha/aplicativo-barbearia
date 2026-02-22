package main

import (
	"fmt"
	"log"
	"os"
	"strings"
	"time"

	"barbearia-backend/internal/db"
	"barbearia-backend/internal/handlers"
	"barbearia-backend/internal/routes"

	"github.com/gin-gonic/gin"
)

// getDSN obtém a string de conexão do banco.
// Railway: DATABASE_URL, DATABASE_PRIVATE_URL ou PGHOST/PGPORT/...
func getDSN() string {
	valid := func(s string) bool {
		return s != "" && !strings.Contains(s, "${{") && !strings.Contains(s, "{{")
	}
	if dsn := os.Getenv("DATABASE_URL"); valid(dsn) {
		log.Printf("[DB] usando DATABASE_URL (host definido)")
		return dsn
	}
	if dsn := os.Getenv("DATABASE_PRIVATE_URL"); valid(dsn) {
		log.Printf("[DB] usando DATABASE_PRIVATE_URL")
		return dsn
	}
	host := os.Getenv("PGHOST")
	port := os.Getenv("PGPORT")
	user := os.Getenv("PGUSER")
	pass := os.Getenv("PGPASSWORD")
	dbName := os.Getenv("PGDATABASE")
	log.Printf("[DB] PGHOST=%q PGPORT=%q PGUSER=%q PGDATABASE=%q (pass definido=%v)", host, port, user, dbName, pass != "")
	if host != "" && user != "" && dbName != "" {
		if port == "" {
			port = "5432"
		}
		ssl := os.Getenv("PGSSLMODE")
		if ssl == "" {
			ssl = "require"
		}
		dsn := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=%s", user, pass, host, port, dbName, ssl)
		log.Printf("[DB] usando PGHOST/PGUSER/etc -> host=%s", host)
		return dsn
	}
	log.Printf("[DB] FALLBACK localhost - variaveis Railway nao chegaram ao container")
	return "postgres://postgres:123@localhost:5432/barbearia?sslmode=disable"
}

// CORS middleware para permitir requisições do front (ex.: Angular em localhost:4200).
func CORS() gin.HandlerFunc {
	return func(c *gin.Context) {
		origin := c.GetHeader("Origin")
		if origin == "http://localhost:4200" || origin == "http://127.0.0.1:4200" {
			c.Header("Access-Control-Allow-Origin", origin)
		}
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Content-Length, Accept-Encoding, Authorization, Accept")
		c.Header("Access-Control-Expose-Headers", "Content-Length")
		c.Header("Access-Control-Allow-Credentials", "true")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}

func main() {
	dsn := getDSN()

	conn, err := db.ConnectAndMigrate(dsn)
	if err != nil {
		log.Fatalf("erro ao conectar no banco: %v", err)
	}

	r := gin.Default()
	r.Use(CORS())
	r.MaxMultipartMemory = 8 << 20 // 8 MiB para upload
	r.Static("/uploads", "./uploads")

	// Raiz: evita 404 ao abrir a URL no navegador (serviço é só API)
	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"ok":    true,
			"api":   "Barbearia API",
			"docs":  "Use /api/... (ex: /api/auth/login, /api/servicos)",
		})
	})

	routes.Register(r, conn)

	// Job de lembretes de agendamento: uma vez ao subir e depois a cada 1h (agendamentos de amanhã).
	go func() {
		time.Sleep(10 * time.Second)
		for {
			handlers.CriarLembretesAgendamento(conn)
			time.Sleep(1 * time.Hour)
		}
	}()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("API ouvindo em :%s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatal(err)
	}
}
