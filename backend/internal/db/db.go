package db

import (
	"barbearia-backend/internal/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func ConnectAndMigrate(dsn string) (*gorm.DB, error) {
	conn, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}
	if err := conn.AutoMigrate(
		&models.Cliente{},
		&models.Usuario{},
		&models.FilaAtendimento{},
		&models.Atendimento{},
		&models.CaixaMovimento{},
		&models.Caixa{},
		&models.Servico{},
		&models.Produto{},
		&models.AtendimentoServico{},
		&models.AtendimentoProduto{},
		&models.CaixaSangria{},
		&models.Agendamento{},
		&models.Notificacao{},
	); err != nil {
		return nil, err
	}
	return conn, nil
}

