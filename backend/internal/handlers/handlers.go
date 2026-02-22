package handlers

import (
	"encoding/base64"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"barbearia-backend/internal/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type Handler struct {
	DB *gorm.DB
}

// AUTH
type LoginRequest struct {
	Login string `json:"login" binding:"required"`
	Senha string `json:"senha" binding:"required"`
}

func (h *Handler) Login(c *gin.Context) {
	var req LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var u models.Usuario
	if err := h.DB.Where("login = ? AND senha = ?", req.Login, req.Senha).First(&u).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Login ou senha inválidos"})
		return
	}
	if u.Status != "V" {
		if u.Status == "A" {
			c.JSON(http.StatusForbidden, gin.H{"error": "Sua conta está aguardando aprovação do administrador."})
		} else {
			c.JSON(http.StatusForbidden, gin.H{"error": "Sua solicitação de cadastro não foi aprovada."})
		}
		return
	}
	if !u.Ativo {
		c.JSON(http.StatusForbidden, gin.H{"error": "Usuário inativo"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"id":     u.ID,
		"nome":   u.Nome,
		"login":  u.Login,
		"perfil": u.Perfil,
		"ativo":  u.Ativo,
		"avatar": u.Avatar,
	})
}

// USUARIO
func (h *Handler) CreateUsuario(c *gin.Context) {
	var body models.Usuario
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Validações
	if body.Nome == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "nome é obrigatório"})
		return
	}
	if body.Login == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "login é obrigatório"})
		return
	}
	if body.Senha == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "senha é obrigatória"})
		return
	}
	if body.Perfil == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "perfil é obrigatório"})
		return
	}

	// Cadastro público: só RECEPCIONISTA ou CABELEIREIRO (DONO não pode ser criado por aqui)
	perfisCadastro := map[string]bool{
		"RECEPCIONISTA": true,
		"CABELEIREIRO":  true,
	}
	if !perfisCadastro[body.Perfil] {
		c.JSON(http.StatusBadRequest, gin.H{"error": "perfil inválido. Use RECEPCIONISTA ou CABELEIREIRO"})
		return
	}

	// Verificar se o login já existe
	var usuarioExistente models.Usuario
	if err := h.DB.Where("login = ?", body.Login).First(&usuarioExistente).Error; err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "login já está em uso"})
		return
	}

	// Definir valores padrão: novo cadastro entra como Aguardando aprovação
	body.Ativo = true
	body.Status = "A"

	// Criar usuário
	if err := h.DB.Create(&body).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Notificar DONO para exibir toast na web: "Fulano está pedindo autorização para ser aprovado"
	_ = h.DB.Create(&models.Notificacao{
		Tipo:          "SOLICITACAO_USUARIO",
		Titulo:        "Nova solicitação de cadastro",
		Subtitulo:     body.Nome,
		PerfilDestino: "DONO",
	})

	c.JSON(http.StatusCreated, body)
}

func (h *Handler) GetUsuario(c *gin.Context) {
	id := c.Param("id")
	var u models.Usuario
	if err := h.DB.Select("id", "nome", "login", "perfil", "status", "ativo", "avatar").Where("id = ?", id).First(&u).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "usuário não encontrado"})
		return
	}
	avatarResp := u.Avatar
	if avatarResp != "" && !strings.HasPrefix(avatarResp, "uploads/") {
		avatarResp = "api/usuarios/" + id + "/avatar"
	}
	c.JSON(http.StatusOK, gin.H{
		"id":     u.ID,
		"nome":   u.Nome,
		"login":  u.Login,
		"perfil": u.Perfil,
		"status": u.Status,
		"ativo":  u.Ativo,
		"avatar": avatarResp,
	})
}

// ListSolicitacoes retorna usuários com status A (aguardando aprovação) para o DONO aprovar/rejeitar.
func (h *Handler) ListSolicitacoes(c *gin.Context) {
	var usuarios []models.Usuario
	if err := h.DB.Select("id", "nome", "login", "perfil", "status").Where("status = ?", "A").Order("id asc").Find(&usuarios).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, usuarios)
}

// AprovarRejeitar atualiza o status do usuário para V (validado) ou N (não aprovado). Uso: DONO.
func (h *Handler) AprovarRejeitar(c *gin.Context) {
	id := c.Param("id")
	var body struct {
		Status string `json:"status"` // "V" ou "N"
	}
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "status é obrigatório (V ou N)"})
		return
	}
	if body.Status != "V" && body.Status != "N" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "status deve ser V (aprovar) ou N (rejeitar)"})
		return
	}
	if err := h.DB.Model(&models.Usuario{}).Where("id = ?", id).Update("status", body.Status).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	// Marcar como lidas as notificações de solicitação desse usuário para o toast não reaparecer
	var u models.Usuario
	if err := h.DB.Select("nome").Where("id = ?", id).First(&u).Error; err == nil {
		_ = h.DB.Model(&models.Notificacao{}).
			Where("tipo = ? AND perfil_destino = ? AND subtitulo = ?", "SOLICITACAO_USUARIO", "DONO", u.Nome).
			Update("lido", true).Error
	}
	c.JSON(http.StatusOK, gin.H{"ok": true, "status": body.Status})
}

func (h *Handler) ListUsuarios(c *gin.Context) {
	perfil := c.Query("perfil")
	todos := c.Query("todos") == "1" // DONO: listar todos (ativos + inativos, qualquer status)
	var usuarios []models.Usuario
	q := h.DB.Order("nome asc")
	if !todos {
		q = q.Where("ativo = ?", true).Where("status = ?", "V")
	}
	if perfil == "CABELEIREIRO" && !todos {
		q = q.Where("perfil IN ?", []string{"CABELEIREIRO", "CABELEREIRO"})
	} else if perfil != "" && !todos {
		q = q.Where("perfil = ?", perfil)
	}
	if err := q.Select("id", "nome", "login", "perfil", "status", "ativo", "avatar").Find(&usuarios).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	for i := range usuarios {
		if usuarios[i].Avatar != "" && !strings.HasPrefix(usuarios[i].Avatar, "uploads/") {
			usuarios[i].Avatar = "api/usuarios/" + fmt.Sprint(usuarios[i].ID) + "/avatar"
		}
	}
	c.JSON(http.StatusOK, usuarios)
}

func (h *Handler) UpdateUsuario(c *gin.Context) {
	id := c.Param("id")
	var body struct {
		Nome   string `json:"nome"`
		Perfil string `json:"perfil"`
		Ativo  *bool  `json:"ativo"`
	}
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	updates := make(map[string]interface{})
	if body.Nome != "" {
		updates["nome"] = body.Nome
	}
	if body.Perfil != "" {
		perfisValidos := map[string]bool{"DONO": true, "RECEPCIONISTA": true, "RECEPCAO": true, "CABELEIREIRO": true, "CABELEREIRO": true}
		if !perfisValidos[body.Perfil] {
			c.JSON(http.StatusBadRequest, gin.H{"error": "perfil inválido"})
			return
		}
		updates["perfil"] = body.Perfil
	}
	if body.Ativo != nil {
		updates["ativo"] = *body.Ativo
	}
	if len(updates) == 0 {
		c.JSON(http.StatusOK, gin.H{"message": "nada a atualizar"})
		return
	}
	if err := h.DB.Model(&models.Usuario{}).Where("id = ?", id).Updates(updates).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.Status(http.StatusOK)
}

// DeleteUsuario remove o usuário do banco. Use com cuidado; preferir desativar (ativo=false) para manter histórico.
func (h *Handler) DeleteUsuario(c *gin.Context) {
	id := c.Param("id")
	if err := h.DB.Delete(&models.Usuario{}, id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.Status(http.StatusNoContent)
}

func (h *Handler) AlterarSenha(c *gin.Context) {
	id := c.Param("id")
	var body struct {
		SenhaAtual string `json:"senha_atual" binding:"required"`
		NovaSenha  string `json:"nova_senha" binding:"required"`
	}
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "senha_atual e nova_senha são obrigatórios"})
		return
	}
	if len(body.NovaSenha) < 4 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "nova senha deve ter no mínimo 4 caracteres"})
		return
	}
	var u models.Usuario
	if err := h.DB.Where("id = ?", id).First(&u).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "usuário não encontrado"})
		return
	}
	if u.Senha != body.SenhaAtual {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "senha atual incorreta"})
		return
	}
	if err := h.DB.Model(&models.Usuario{}).Where("id = ?", id).Update("senha", body.NovaSenha).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.Status(http.StatusOK)
}

func (h *Handler) UploadAvatar(c *gin.Context) {
	id := c.Param("id")
	file, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "arquivo obrigatório"})
		return
	}
	ext := strings.ToLower(filepath.Ext(file.Filename))
	allowed := map[string]bool{".jpg": true, ".jpeg": true, ".png": true, ".gif": true, ".webp": true}
	if !allowed[ext] {
		c.JSON(http.StatusBadRequest, gin.H{"error": "formato inválido. Use jpg, png, gif ou webp."})
		return
	}
	f, err := file.Open()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "erro ao abrir arquivo"})
		return
	}
	defer f.Close()
	bytes, err := io.ReadAll(f)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "erro ao ler arquivo"})
		return
	}
	contentType := "image/jpeg"
	switch ext {
	case ".png":
		contentType = "image/png"
	case ".gif":
		contentType = "image/gif"
	case ".webp":
		contentType = "image/webp"
	}
	encoded := base64.StdEncoding.EncodeToString(bytes)
	avatarValue := "data:" + contentType + ";base64," + encoded
	if err := h.DB.Model(&models.Usuario{}).Where("id = ?", id).Update("avatar", avatarValue).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"avatar": "api/usuarios/" + id + "/avatar"})
}

// GetAvatar serve a imagem de perfil: do banco (base64) ou do disco (path uploads/).
func (h *Handler) GetAvatar(c *gin.Context) {
	id := c.Param("id")
	var u models.Usuario
	if err := h.DB.Select("avatar").Where("id = ?", id).First(&u).Error; err != nil {
		c.Status(http.StatusNotFound)
		return
	}
	if u.Avatar == "" {
		c.Status(http.StatusNotFound)
		return
	}
	if strings.HasPrefix(u.Avatar, "uploads/") {
		// Legado: arquivo em disco
		contentType := "image/jpeg"
		if strings.HasSuffix(u.Avatar, ".png") {
			contentType = "image/png"
		} else if strings.HasSuffix(u.Avatar, ".gif") {
			contentType = "image/gif"
		} else if strings.HasSuffix(u.Avatar, ".webp") {
			contentType = "image/webp"
		}
		c.Header("Content-Type", contentType)
		c.File(u.Avatar)
		return
	}
	// CLOB: data:image/jpeg;base64,... ou só base64
	avatar := u.Avatar
	var data []byte
	var contentType string
	if strings.HasPrefix(avatar, "data:") {
		idx := strings.Index(avatar, ";base64,")
		if idx == -1 {
			c.Status(http.StatusInternalServerError)
			return
		}
		contentType = strings.TrimPrefix(avatar[:idx], "data:")
		encoded := avatar[idx+len(";base64,"):]
		var err error
		data, err = base64.StdEncoding.DecodeString(encoded)
		if err != nil {
			c.Status(http.StatusInternalServerError)
			return
		}
	} else {
		contentType = "image/jpeg"
		var err error
		data, err = base64.StdEncoding.DecodeString(avatar)
		if err != nil {
			c.Status(http.StatusInternalServerError)
			return
		}
	}
	c.Data(http.StatusOK, contentType, data)
}

// CLIENTE
func (h *Handler) CreateCliente(c *gin.Context) {
	var body models.Cliente
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := h.DB.Create(&body).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, body)
}

func (h *Handler) ListClientes(c *gin.Context) {
	var clientes []models.Cliente
	if err := h.DB.Order("id desc").Find(&clientes).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, clientes)
}

// FILA
func (h *Handler) AddFila(c *gin.Context) {
	var body struct {
		ClienteID     uint  `json:"id_cliente"`
		AgendamentoID *uint `json:"id_agendamento"`
	}
	if err := c.ShouldBindJSON(&body); err != nil || body.ClienteID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id_cliente obrigatório"})
		return
	}
	f := models.FilaAtendimento{
		ClienteID:     body.ClienteID,
		AgendamentoID: body.AgendamentoID,
		Status:        "AGUARDANDO",
	}
	if err := h.DB.Create(&f).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	// Notificação para CABELEIREIRO: cliente X está aguardando
	var cli models.Cliente
	if err := h.DB.First(&cli, body.ClienteID).Error; err == nil {
		_ = h.DB.Create(&models.Notificacao{
			Tipo:          "AGUARDANDO",
			Titulo:        "Cliente na fila",
			Subtitulo:     cli.Nome,
			Detalhe:       "Aguardando atendimento",
			PerfilDestino: "CABELEIREIRO",
		}).Error
		// Notificação para DONO: toast "O cliente X está aguardando para ser chamado"
		_ = h.DB.Create(&models.Notificacao{
			Tipo:          "CLIENTE_NA_FILA",
			Titulo:        "Cliente na fila",
			Subtitulo:     cli.Nome,
			Detalhe:       "Aguardando para ser chamado",
			PerfilDestino: "DONO",
		}).Error
	}
	c.JSON(http.StatusCreated, f)
}

// AGENDAMENTO
func (h *Handler) CreateAgendamento(c *gin.Context) {
	var body struct {
		ClienteID      uint   `json:"id_cliente" binding:"required"`
		ServicoID      *uint  `json:"id_servico"`
		CabeleireiroID *uint  `json:"id_cabeleireiro"`
		DataHora       string `json:"data_hora" binding:"required"`
		Observacao     string `json:"observacao"`
	}
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id_cliente e data_hora são obrigatórios"})
		return
	}
	dt, err := time.Parse(time.RFC3339, body.DataHora)
	if err != nil {
		dt, err = time.Parse("2006-01-02T15:04:05.000", body.DataHora)
	}
	if err != nil {
		dt, err = time.Parse("2006-01-02T15:04", body.DataHora)
	}
	if err != nil {
		dt, err = time.Parse("2006-01-02 15:04", body.DataHora)
	}
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "data_hora inválida. Use ISO 8601 ou YYYY-MM-DD HH:MM"})
		return
	}

	var count int64
	if err := h.DB.Model(&models.Agendamento{}).
		Where("data_hora = ? AND status IN ?", dt, []string{"AGENDADO", "CONFIRMADO"}).
		Count(&count).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if count > 0 {
		c.JSON(http.StatusConflict, gin.H{"error": "Este horário já está ocupado por outro agendamento"})
		return
	}

	ag := models.Agendamento{
		ClienteID:      body.ClienteID,
		ServicoID:      body.ServicoID,
		CabeleireiroID: body.CabeleireiroID,
		DataHora:       dt,
		Status:         "AGENDADO",
		Observacao:     body.Observacao,
	}
	if err := h.DB.Create(&ag).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	h.DB.Preload("Cliente").Preload("Servico").Preload("Cabeleireiro").First(&ag, ag.ID)
	// Notificação de AGENDA para o cabeleireiro: só ele vê (id_usuario_destino).
	if body.CabeleireiroID != nil && *body.CabeleireiroID != 0 {
		clienteNome := "Cliente"
		if ag.Cliente.ID != 0 {
			clienteNome = ag.Cliente.Nome
		}
		dataHoraFmt := ag.DataHora.Format("02/01 às 15:04")
		detalhe := fmt.Sprintf("Atender o cliente %s em %s.", clienteNome, dataHoraFmt)
		agID := ag.ID
		_ = h.DB.Create(&models.Notificacao{
			Tipo:             "AGENDA",
			Titulo:           "Agenda marcada para você",
			Subtitulo:        clienteNome,
			Detalhe:          detalhe,
			PerfilDestino:    "CABELEIREIRO",
			AgendamentoID:    &agID,
			UsuarioDestinoID: body.CabeleireiroID,
		}).Error
	}
	c.JSON(http.StatusCreated, ag)
}

func (h *Handler) ListAgendamentos(c *gin.Context) {
	dataStr := c.Query("data")
	if dataStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "parâmetro data (YYYY-MM-DD) é obrigatório"})
		return
	}
	dt, err := time.Parse("2006-01-02", dataStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "data inválida. Use YYYY-MM-DD"})
		return
	}
	start := time.Date(dt.Year(), dt.Month(), dt.Day(), 0, 0, 0, 0, dt.Location())
	end := start.AddDate(0, 0, 1)

	q := h.DB.Preload("Cliente").Preload("Servico").Preload("Cabeleireiro").
		Where("data_hora >= ? AND data_hora < ?", start, end).
		Where("status IN ?", []string{"AGENDADO", "CONFIRMADO"})
	if idCabeleireiroStr := c.Query("id_cabeleireiro"); idCabeleireiroStr != "" {
		var idCabeleireiro uint
		if _, err := fmt.Sscanf(idCabeleireiroStr, "%d", &idCabeleireiro); err != nil || idCabeleireiro == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "id_cabeleireiro deve ser um número"})
			return
		}
		q = q.Where("id_cabeleireiro = ?", idCabeleireiro)
	}
	var list []models.Agendamento
	if err := q.Order("data_hora asc").Find(&list).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, list)
}

// UpdateAgendamento — PATCH /api/agendamentos/:id
func (h *Handler) UpdateAgendamento(c *gin.Context) {
	idStr := c.Param("id")
	var id uint
	if _, err := fmt.Sscanf(idStr, "%d", &id); err != nil || id == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id inválido"})
		return
	}
	var body struct {
		ClienteID      *uint  `json:"id_cliente"`
		ServicoID      *uint  `json:"id_servico"`
		CabeleireiroID *uint  `json:"id_cabeleireiro"`
		DataHora       string `json:"data_hora"`
		Observacao     string `json:"observacao"`
		Status         string `json:"status"`
	}
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "payload inválido"})
		return
	}
	var ag models.Agendamento
	if err := h.DB.First(&ag, id).Error; err != nil || ag.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "agendamento não encontrado"})
		return
	}
	if body.ClienteID != nil {
		ag.ClienteID = *body.ClienteID
	}
	if body.ServicoID != nil {
		ag.ServicoID = body.ServicoID
	}
	if body.CabeleireiroID != nil {
		ag.CabeleireiroID = body.CabeleireiroID
	}
	if body.DataHora != "" {
		dt, err := time.Parse(time.RFC3339, body.DataHora)
		if err != nil {
			dt, err = time.Parse("2006-01-02T15:04:05.000", body.DataHora)
		}
		if err != nil {
			dt, err = time.Parse("2006-01-02T15:04", body.DataHora)
		}
		if err != nil {
			dt, err = time.Parse("2006-01-02 15:04", body.DataHora)
		}
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "data_hora inválida"})
			return
		}
		ag.DataHora = dt
	}
	ag.Observacao = body.Observacao
	if body.Status != "" {
		ag.Status = body.Status
	}
	if err := h.DB.Save(&ag).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	h.DB.Preload("Cliente").Preload("Servico").Preload("Cabeleireiro").First(&ag, ag.ID)
	c.JSON(http.StatusOK, ag)
}

// DeleteAgendamento — DELETE /api/agendamentos/:id
func (h *Handler) DeleteAgendamento(c *gin.Context) {
	idStr := c.Param("id")
	var id uint
	if _, err := fmt.Sscanf(idStr, "%d", &id); err != nil || id == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id inválido"})
		return
	}
	result := h.DB.Delete(&models.Agendamento{}, id)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}
	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "agendamento não encontrado"})
		return
	}
	c.Status(http.StatusNoContent)
}

// AgendaItem — resposta do endpoint de agenda com filtros (nomeCliente, cabeleireiro, servico).
type AgendaItem struct {
	DataCadastro     time.Time  `json:"data_cadastro"`
	DataHora         time.Time  `json:"data_hora"`
	ID               uint       `json:"id"`
	IDCabeleireiro   *uint      `json:"id_cabeleireiro"`
	IDCliente        uint       `json:"id_cliente"`
	IDServico        *uint      `json:"id_servico"`
	Observacao       string     `json:"observacao"`
	Status           string     `json:"status"`
	NomeCliente      string     `json:"nomeCliente"`
	Cabeleireiro     string     `json:"cabeleireiro"`
	ServicoDescricao string     `json:"servico_descricao,omitempty"`
}

// ListAgendaFiltrado — GET /api/agendamentos/agenda?mes=YYYY-MM|data_inicio=&data_fim=&nome=&id_cabeleireiro=&status=
// Filtro: mes (YYYY-MM) OU data_inicio+data_fim; opcionais: nome, id_cabeleireiro, status.
func (h *Handler) ListAgendaFiltrado(c *gin.Context) {
	mesStr := c.Query("mes")
	dataInicio := c.Query("data_inicio")
	dataFim := c.Query("data_fim")
	nome := strings.TrimSpace(c.Query("nome"))
	idCabeleireiro := c.Query("id_cabeleireiro")
	status := c.Query("status")

	var start, end time.Time
	if dataInicio != "" && dataFim != "" {
		t1, err1 := time.Parse("2006-01-02", dataInicio)
		t2, err2 := time.Parse("2006-01-02", dataFim)
		if err1 != nil || err2 != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "data_inicio e data_fim devem ser YYYY-MM-DD"})
			return
		}
		start = time.Date(t1.Year(), t1.Month(), t1.Day(), 0, 0, 0, 0, t1.Location())
		if start.After(time.Date(t2.Year(), t2.Month(), t2.Day(), 0, 0, 0, 0, t2.Location())) {
			c.JSON(http.StatusBadRequest, gin.H{"error": "data_inicio deve ser anterior ou igual a data_fim"})
			return
		}
		end = time.Date(t2.Year(), t2.Month(), t2.Day(), 23, 59, 59, 999999999, t2.Location()).Add(time.Second) // < end cobre todo o dia
	} else if mesStr != "" {
		t, err := time.Parse("2006-01", mesStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "mes deve ser YYYY-MM"})
			return
		}
		start = time.Date(t.Year(), t.Month(), 1, 0, 0, 0, 0, t.Location())
		end = start.AddDate(0, 1, 0)
	} else {
		now := time.Now()
		start = time.Date(now.Year(), now.Month(), 1, 0, 0, 0, 0, now.Location())
		end = start.AddDate(0, 1, 0)
	}

	query := `
SELECT ag.data_cadastro, ag.data_hora, ag.id, ag.id_cabeleireiro, ag.id_cliente, ag.id_servico, ag.observacao, ag.status,
       c.nome AS nome_cliente, us.nome AS cabeleireiro, s.descricao AS servico_descricao
FROM agendamento ag
LEFT JOIN cliente c ON c.id = ag.id_cliente
LEFT JOIN usuario us ON us.id = ag.id_cabeleireiro
LEFT JOIN servico s ON s.id = ag.id_servico
WHERE ag.data_hora >= ? AND ag.data_hora < ? AND ag.status IN ('AGENDADO', 'CONFIRMADO')`
	args := []interface{}{start, end}

	if nome != "" {
		query += " AND c.nome ILIKE ?"
		args = append(args, "%"+nome+"%")
	}
	if idCabeleireiro != "" {
		var id uint
		if _, err := fmt.Sscanf(idCabeleireiro, "%d", &id); err != nil || id == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "id_cabeleireiro deve ser um número"})
			return
		}
		query += " AND ag.id_cabeleireiro = ?"
		args = append(args, id)
	}
	if status != "" {
		query += " AND ag.status = ?"
		args = append(args, status)
	}

	query += " ORDER BY ag.data_hora ASC"

	var list []struct {
		DataCadastro     time.Time `gorm:"column:data_cadastro"`
		DataHora         time.Time `gorm:"column:data_hora"`
		ID               uint      `gorm:"column:id"`
		IDCabeleireiro   *uint     `gorm:"column:id_cabeleireiro"`
		IDCliente        uint      `gorm:"column:id_cliente"`
		IDServico        *uint     `gorm:"column:id_servico"`
		Observacao       string    `gorm:"column:observacao"`
		Status           string    `gorm:"column:status"`
		NomeCliente      string    `gorm:"column:nome_cliente"`
		Cabeleireiro     string    `gorm:"column:cabeleireiro"`
		ServicoDescricao string    `gorm:"column:servico_descricao"`
	}

	if err := h.DB.Raw(query, args...).Scan(&list).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	resp := make([]AgendaItem, 0, len(list))
	for _, row := range list {
		resp = append(resp, AgendaItem{
			DataCadastro:     row.DataCadastro,
			DataHora:         row.DataHora,
			ID:               row.ID,
			IDCabeleireiro:   row.IDCabeleireiro,
			IDCliente:        row.IDCliente,
			IDServico:        row.IDServico,
			Observacao:       row.Observacao,
			Status:           row.Status,
			NomeCliente:      row.NomeCliente,
			Cabeleireiro:     row.Cabeleireiro,
			ServicoDescricao: row.ServicoDescricao,
		})
	}
	c.JSON(http.StatusOK, resp)
}

func (h *Handler) ListFilaStatus(c *gin.Context) {
	status := c.DefaultQuery("status", "AGUARDANDO")
	var fila []models.FilaAtendimento
	if err := h.DB.Preload("Cliente").Preload("Agendamento.Servico").Where("status = ?", status).Order("data_entrada asc").Find(&fila).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, fila)
}

func (h *Handler) UpdateFilaStatus(c *gin.Context) {
	id := c.Param("id")
	var body struct {
		Status string `json:"status"`
	}
	if err := c.ShouldBindJSON(&body); err != nil || body.Status == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "status obrigatório"})
		return
	}
	if err := h.DB.Model(&models.FilaAtendimento{}).Where("id = ?", id).Update("status", body.Status).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.Status(http.StatusNoContent)
}

// ATENDIMENTO
func (h *Handler) AbrirAtendimento(c *gin.Context) {
	var body struct {
		FilaID         uint `json:"id_fila"`
		CabeleireiroID uint `json:"id_cabeleireiro"`
	}
	if err := c.ShouldBindJSON(&body); err != nil || body.FilaID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id_fila é obrigatório"})
		return
	}
	a := models.Atendimento{
		FilaID:         body.FilaID,
		CabeleireiroID: body.CabeleireiroID,
		Status:         "ABERTO",
	}
	err := h.DB.Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(&a).Error; err != nil {
			return err
		}
		if err := tx.Model(&models.FilaAtendimento{}).Where("id = ?", body.FilaID).Update("status", "EM_ATENDIMENTO").Error; err != nil {
			return err
		}
		return nil
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, a)
}

func (h *Handler) EncerrarAtendimento(c *gin.Context) {
	id := c.Param("id")
	now := time.Now()
	err := h.DB.Transaction(func(tx *gorm.DB) error {
		if err := tx.Model(&models.Atendimento{}).Where("id = ?", id).
			Updates(map[string]interface{}{"status": "ENCERRADO", "fim": now}).Error; err != nil {
			return err
		}
		var at models.Atendimento
		if err := tx.First(&at, id).Error; err != nil {
			return err
		}
		if err := tx.Model(&models.FilaAtendimento{}).Where("id = ?", at.FilaID).
			Update("status", "FINALIZADO").Error; err != nil {
			return err
		}
		return nil
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	// Notificação RECEBIMENTO para RECEPCAO (caixa)
	var at models.Atendimento
	if err := h.DB.Preload("Fila.Cliente").First(&at, id).Error; err == nil && at.Fila.Cliente.Nome != "" {
		var total float64
		h.DB.Raw(`SELECT COALESCE(
			(SELECT SUM(valor) FROM atendimento_servico WHERE id_atendimento = ?), 0
		) + COALESCE(
			(SELECT SUM(quantidade * valor) FROM atendimento_produto WHERE id_atendimento = ?), 0
		)`, at.ID, at.ID).Scan(&total)
		aid := at.ID
		_ = h.DB.Create(&models.Notificacao{
			Tipo:          "RECEBIMENTO",
			Titulo:        "RECEBIMENTO",
			Subtitulo:     at.Fila.Cliente.Nome,
			Detalhe:       "Atendimento",
			Valor:         &total,
			AtendimentoID: &aid,
			PerfilDestino: "RECEPCAO",
		}).Error
	}
	c.Status(http.StatusNoContent)
}

// AtendimentoFiltroItem — item do GET /atendimentos com nome_cliente e total para relatório.
type AtendimentoFiltroRow struct {
	ID             uint       `gorm:"column:id" json:"id"`
	IDCabeleireiro uint       `gorm:"column:id_cabeleireiro" json:"id_cabeleireiro"`
	IDFila         uint       `gorm:"column:id_fila" json:"id_fila"`
	Inicio         time.Time  `gorm:"column:inicio" json:"inicio"`
	Fim            *time.Time `gorm:"column:fim" json:"fim"`
	Status         string     `gorm:"column:status" json:"status"`
	NomeCliente    string     `gorm:"column:nome_cliente" json:"nome_cliente"`
	Total          float64    `gorm:"column:total" json:"total"`
}

// ListAtendimentosFiltrado — GET /api/atendimentos?data_inicio=YYYY-MM-DD&data_fim=YYYY-MM-DD&status=...&id_cabeleireiro=...
// Retorna atendimentos com filtros opcionais, incluindo nome_cliente e total.
func (h *Handler) ListAtendimentosFiltrado(c *gin.Context) {
	dataInicio := c.Query("data_inicio")
	dataFim := c.Query("data_fim")
	status := c.Query("status")
	idCabeleireiro := c.Query("id_cabeleireiro")

	var args []interface{}
	baseQ := `SELECT a.id, a.id_cabeleireiro, a.id_fila, a.inicio, a.fim, a.status, c.nome AS nome_cliente, COALESCE(cx.total, 0) AS total
FROM atendimento a
JOIN fila_atendimento f ON f.id = a.id_fila
JOIN cliente c ON c.id = f.id_cliente
LEFT JOIN (SELECT id_atendimento, SUM(valor) AS total FROM caixa GROUP BY id_atendimento) cx ON cx.id_atendimento = a.id
WHERE 1=1`

	if dataInicio != "" {
		t, err := time.Parse("2006-01-02", dataInicio)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "data_inicio deve ser YYYY-MM-DD"})
			return
		}
		start := time.Date(t.Year(), t.Month(), t.Day(), 0, 0, 0, 0, t.Location())
		baseQ += " AND a.inicio >= ?"
		args = append(args, start)
	}
	if dataFim != "" {
		t, err := time.Parse("2006-01-02", dataFim)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "data_fim deve ser YYYY-MM-DD"})
			return
		}
		end := time.Date(t.Year(), t.Month(), t.Day(), 23, 59, 59, 999999999, t.Location())
		baseQ += " AND (a.fim <= ? OR (a.fim IS NULL AND a.inicio <= ?))"
		args = append(args, end, end)
	}
	if status != "" {
		baseQ += " AND a.status = ?"
		args = append(args, status)
	}
	if idCabeleireiro != "" {
		var id uint
		if _, err := fmt.Sscanf(idCabeleireiro, "%d", &id); err != nil || id == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "id_cabeleireiro deve ser um número"})
			return
		}
		baseQ += " AND a.id_cabeleireiro = ?"
		args = append(args, id)
	}
	baseQ += " ORDER BY a.inicio DESC"

	var list []AtendimentoFiltroRow
	if err := h.DB.Raw(baseQ, args...).Scan(&list).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, list)
}

// caixaAberto retorna o caixa_movimento com status ABERTO. ErrRecordNotFound se não houver.
func (h *Handler) caixaAberto() (*models.CaixaMovimento, error) {
	var cm models.CaixaMovimento
	err := h.DB.Where("status = ?", "ABERTO").First(&cm).Error
	return &cm, err
}

// nomeUsuarioPorID retorna o nome do usuário pelo ID; retorna "Recepção" se não encontrar.
func (h *Handler) nomeUsuarioPorID(id uint) string {
	var u models.Usuario
	if err := h.DB.Select("nome").Where("id = ?", id).First(&u).Error; err != nil || u.Nome == "" {
		return "Recepção"
	}
	return u.Nome
}

// notificarDonoLancamento cria notificação para DONO (toast verde no dashboard): "Fulano fez X no valor R$ Y"
func (h *Handler) notificarDonoLancamento(tipo, titulo, nomeUsuario string, valor float64, detalhe string) {
	sub := nomeUsuario
	if sub == "" {
		sub = "Recepção"
	}
	n := models.Notificacao{
		Tipo:          tipo,
		Titulo:        titulo,
		Subtitulo:     sub,
		Detalhe:       detalhe,
		Valor:         &valor,
		PerfilDestino: "DONO",
	}
	_ = h.DB.Create(&n).Error
}

// CAIXA: abrir
func (h *Handler) AbrirCaixa(c *gin.Context) {
	var body struct {
		ValorAbertura float64 `json:"valor_abertura" binding:"required"`
		Observacao    string  `json:"observacao"`
		UsuarioID     *uint   `json:"id_usuario"`
	}
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "valor_abertura é obrigatório"})
		return
	}
	if body.ValorAbertura < 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "valor_abertura deve ser >= 0"})
		return
	}
	_, err := h.caixaAberto()
	if err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "já existe um caixa aberto"})
		return
	}
	cm := models.CaixaMovimento{
		ValorAbertura: body.ValorAbertura,
		Observacao:    body.Observacao,
		UsuarioID:     body.UsuarioID,
		Status:        "ABERTO",
	}
	if err := h.DB.Create(&cm).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	nome := "Recepção"
	if body.UsuarioID != nil {
		nome = h.nomeUsuarioPorID(*body.UsuarioID)
	}
	h.notificarDonoLancamento("LANCAMENTO_ABERTURA_CAIXA", "Abertura de caixa", nome, body.ValorAbertura, "")
	c.JSON(http.StatusCreated, cm)
}

// CAIXA: fechar
func (h *Handler) FecharCaixa(c *gin.Context) {
	var body struct {
		ValorFechamento float64 `json:"valor_fechamento" binding:"required"`
		Observacao      string  `json:"observacao"`
	}
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "valor_fechamento é obrigatório"})
		return
	}
	cm, err := h.caixaAberto()
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": "não há caixa aberto"})
		return
	}
	now := time.Now()
	updates := map[string]interface{}{
		"status":           "FECHADO",
		"data_fechamento":  now,
		"valor_fechamento": body.ValorFechamento,
	}
	if body.Observacao != "" {
		updates["observacao"] = body.Observacao
	}
	if err := h.DB.Model(cm).Updates(updates).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"id": cm.ID, "status": "FECHADO", "data_fechamento": now})
}

// CAIXA: obter caixa aberto (ou 404)
func (h *Handler) GetCaixaAberto(c *gin.Context) {
	cm, err := h.caixaAberto()
	if err != nil {
		c.Status(http.StatusNoContent)
		return
	}
	c.JSON(http.StatusOK, cm)
}

// CAIXA: registrar pagamento (entrada) — exige caixa aberto
func (h *Handler) RegistrarPagamento(c *gin.Context) {
	var body struct {
		AtendimentoID uint    `json:"id_atendimento"`
		Valor         float64 `json:"valor"`
		TipoPagamento string  `json:"tipo_pagamento"`
		UsuarioID     *uint   `json:"id_usuario"`
		Observacao    string  `json:"observacao"`
	}
	if err := c.ShouldBindJSON(&body); err != nil || body.AtendimentoID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id_atendimento é obrigatório"})
		return
	}
	cm, err := h.caixaAberto()
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": "caixa fechado. Abra o caixa para registrar pagamentos."})
		return
	}
	aid := body.AtendimentoID
	p := models.Caixa{
		CaixaMovimentoID: cm.ID,
		AtendimentoID:    &aid,
		Valor:            body.Valor,
		TipoPagamento:    body.TipoPagamento,
		TipoMovimentacao: "RECEBIMENTO",
		Operacao:         "E",
		Observacao:       strings.TrimSpace(body.Observacao),
	}
	if err := h.DB.Create(&p).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	nome := "Recepção"
	if body.UsuarioID != nil {
		nome = h.nomeUsuarioPorID(*body.UsuarioID)
	}
	h.notificarDonoLancamento("LANCAMENTO_RECEBIMENTO", "Recebimento", nome, body.Valor, body.TipoPagamento)
	c.JSON(http.StatusCreated, p)
}

// ensureFilaAgendamentosDoDia cria itens na fila para agendamentos de HOJE do cabeleireiro que ainda não têm entrada (status AGUARDANDO/EM_ATENDIMENTO). Assim o cliente agendado aparece só na fila desse barber.
func (h *Handler) ensureFilaAgendamentosDoDia(idCabeleireiro uint) {
	tz := os.Getenv("TZ")
	if tz == "" {
		tz = "America/Manaus"
	}
	loc, err := time.LoadLocation(tz)
	if err != nil || loc == nil {
		loc = time.UTC
	}
	now := time.Now().In(loc)
	inicioHoje := time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, loc)
	fimHoje := inicioHoje.Add(24*time.Hour - time.Nanosecond)

	var agendamentos []models.Agendamento
	if err := h.DB.Where("data_hora >= ? AND data_hora <= ? AND status IN ?", inicioHoje, fimHoje, []string{"AGENDADO", "CONFIRMADO"}).
		Where("id_cabeleireiro = ?", idCabeleireiro).
		Find(&agendamentos).Error; err != nil {
		return
	}
	for _, ag := range agendamentos {
		var existente int64
		h.DB.Model(&models.FilaAtendimento{}).Where("id_agendamento = ? AND status IN ?", ag.ID, []string{"AGUARDANDO", "EM_ATENDIMENTO"}).Count(&existente)
		if existente > 0 {
			continue
		}
		agID := ag.ID
		_ = h.DB.Create(&models.FilaAtendimento{
			ClienteID:      ag.ClienteID,
			AgendamentoID:  &agID,
			CabeleireiroID: &idCabeleireiro,
			Status:         "AGUARDANDO",
		}).Error
	}
}

// RELATÓRIOS / LISTAGENS
// ListAguardando — GET /recepcao/aguardando e /recebimento/aguardando. Opcional: ?id_cabeleireiro= — quando informado (app do cabeleireiro), cria fila do dia para esse barber e retorna só itens dele.
func (h *Handler) ListAguardando(c *gin.Context) {
	idCabeleireiroStr := c.Query("id_cabeleireiro")
	var idCabeleireiro *uint
	if idCabeleireiroStr != "" {
		var id uint
		if _, err := fmt.Sscanf(idCabeleireiroStr, "%d", &id); err == nil && id != 0 {
			idCabeleireiro = &id
			// Ao listar como cabeleireiro: garantir que agendamentos de HOJE desse cabeleireiro estejam na fila (para aparecer só para ele).
			h.ensureFilaAgendamentosDoDia(id)
		}
	}

	type Row struct {
		ID            uint       `json:"id" gorm:"column:id"`
		Nome          string     `json:"nome" gorm:"column:nome"`
		DataEntrada   time.Time  `json:"data_entrada" gorm:"column:data_entrada"`
		DataCadastro  time.Time  `json:"data_cadastro" gorm:"column:data_cadastro"`
		IDAgendamento *uint      `json:"id_agendamento,omitempty" gorm:"column:id_agendamento"`
		DataHoraAg    *time.Time `json:"data_hora_agendamento,omitempty" gorm:"column:data_hora_agendamento"`
	}
	var rows []Row
	q := h.DB.Table("fila_atendimento f").
		Select("f.id, c.nome, COALESCE(f.data_entrada, c.data_cadastro) as data_entrada, c.data_cadastro, f.id_agendamento, ag.data_hora as data_hora_agendamento").
		Joins("JOIN cliente c ON c.id = f.id_cliente").
		Joins("LEFT JOIN agendamento ag ON ag.id = f.id_agendamento").
		Where("f.status = ?", "AGUARDANDO")
	if idCabeleireiro != nil {
		// CABELEIREIRO vê: fila geral (id_cabeleireiro NULL, sem agendamento) + seus agendamentos do dia (id_cabeleireiro = X)
		q = q.Where("(f.id_cabeleireiro IS NULL OR f.id_cabeleireiro = ?)", *idCabeleireiro)
	}
	// quando id_cabeleireiro não é enviado (recepção/DONO), retorna todos os itens da fila
	if err := q.Scan(&rows).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Formata hora no fuso correto (evita diferença UTC vs local no app)
	// TZ=America/Manaus (-04) ou TZ=America/Sao_Paulo (-03) ou deixe vazio para UTC
	tz := os.Getenv("TZ")
	if tz == "" {
		tz = "America/Manaus"
	}
	loc, err := time.LoadLocation(tz)
	if err != nil || loc == nil {
		loc = time.UTC
	}
	resp := make([]gin.H, 0, len(rows))
	for _, r := range rows {
		item := gin.H{
			"id":               r.ID,
			"nome":             r.Nome,
			"data_entrada":     r.DataEntrada,
			"data_cadastro":    r.DataCadastro,
			"id_agendamento":   r.IDAgendamento,
			"data_hora_agendamento": r.DataHoraAg,
		}
		// Hora e data formatadas no fuso local (mesmo que o banco)
		tEntrada := r.DataEntrada.In(loc)
		item["hora_entrada"] = tEntrada.Format("15:04")
		item["data_exibicao"] = tEntrada.Format("02/01/2006")
		if r.DataHoraAg != nil {
			tAg := r.DataHoraAg.In(loc)
			item["data_hora_agendamento_fmt"] = tAg.Format("02/01 às 15:04")
			item["data_exibicao"] = tAg.Format("02/01/2006")
		}
		resp = append(resp, item)
	}
	c.JSON(http.StatusOK, resp)
}

func (h *Handler) ListEncerradosComTotal(c *gin.Context) {
	type Row struct {
		IDAtendimento uint    `gorm:"column:id_atendimento"`
		Nome          string  `gorm:"column:nome"`
		Total         float64 `gorm:"column:total"`
		IDCliente     uint    `gorm:"column:id_cliente"`
	}
	var rows []Row

	// Busca atendimentos encerrados que ainda não foram pagos (não têm registro em caixa)
	// Total = serviços + (produtos * quantidade)
	query := `
		SELECT 
			a.id as id_atendimento,
			c.nome,
			c.id as id_cliente,
			(COALESCE((SELECT SUM(ats2.valor) FROM atendimento_servico ats2 WHERE ats2.id_atendimento = a.id), 0) +
			 COALESCE((SELECT SUM(atp.quantidade * atp.valor) FROM atendimento_produto atp WHERE atp.id_atendimento = a.id), 0)) as total
		FROM atendimento a
		INNER JOIN fila_atendimento f ON f.id = a.id_fila
		INNER JOIN cliente c ON c.id = f.id_cliente
		LEFT JOIN caixa cx ON cx.id_atendimento = a.id
		WHERE a.status = 'ENCERRADO' 
		  AND (cx.id IS NULL)
		ORDER BY a.id DESC
	`

	// Log da query para debug
	fmt.Printf("[DEBUG] Executando query ListEncerradosComTotal\n")

	if err := h.DB.Raw(query).Scan(&rows).Error; err != nil {
		fmt.Printf("[DEBUG] Erro na query: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Converter para o formato JSON esperado
	result := make([]map[string]interface{}, len(rows))
	for i, row := range rows {
		result[i] = map[string]interface{}{
			"id_atendimento": row.IDAtendimento,
			"nome":           row.Nome,
			"id_cliente":     row.IDCliente,
			"total":          row.Total,
		}
	}

	// Log para debug
	fmt.Printf("[DEBUG] ListEncerradosComTotal: encontrados %d atendimentos\n", len(result))
	if len(result) > 0 {
		for i := 0; i < len(result) && i < 3; i++ {
			item := result[i]
			fmt.Printf("[DEBUG] Item %d: id_atendimento=%v, nome=%v, total=%.2f, id_cliente=%v\n",
				i+1, item["id_atendimento"], item["nome"], item["total"], item["id_cliente"])
		}
	} else {
		// Se não encontrou nada, vamos verificar quantos atendimentos encerrados existem
		var countEncerrados int64
		h.DB.Model(&models.Atendimento{}).Where("status = ?", "ENCERRADO").Count(&countEncerrados)
		fmt.Printf("[DEBUG] Total de atendimentos com status ENCERRADO: %d\n", countEncerrados)

		// Verificar quantos têm pagamento
		var countComPagamento int64
		h.DB.Table("atendimento a").
			Joins("INNER JOIN caixa cx ON cx.id_atendimento = a.id").
			Where("a.status = ?", "ENCERRADO").
			Count(&countComPagamento)
		fmt.Printf("[DEBUG] Atendimentos encerrados JÁ PAGOS: %d\n", countComPagamento)
	}

	c.JSON(http.StatusOK, result)
}

// normalizarPerfilNotificacao aceita RECEPCAO, RECEPCIONISTA, CABELEIREIRO, DONO, ADMIN e normaliza.
func normalizarPerfilNotificacao(perfil string) string {
	switch strings.ToUpper(strings.TrimSpace(perfil)) {
	case "RECEPCIONISTA", "RECEPCAO":
		return "RECEPCAO"
	case "CABELEIREIRO":
		return "CABELEIREIRO"
	case "DONO", "ADMIN":
		return "DONO"
	default:
		return perfil
	}
}

func formatTempoAtras(now time.Time, t time.Time) string {
	d := now.Sub(t)
	if d < time.Minute {
		return "agora"
	}
	if d < time.Hour {
		return fmt.Sprintf("%dm atrás", int(d.Minutes()))
	}
	if d < 24*time.Hour {
		return fmt.Sprintf("%dh atrás", int(d.Hours()))
	}
	return fmt.Sprintf("%dd atrás", int(d.Hours()/24))
}

// NOTIFICAÇÕES — listagem por perfil; só não lidas (lido=false). ?todas=1 para incluir lidas.
// Query: ?perfil=RECEPCAO | CABELEIREIRO | DONO. Para CABELEIREIRO: id_usuario obrigatório — retorna só notificações de AGENDA daquele usuário.
func (h *Handler) ListNotificacoes(c *gin.Context) {
	perfil := c.DefaultQuery("perfil", "")
	if perfil == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "parâmetro perfil é obrigatório (RECEPCAO, CABELEIREIRO ou DONO)"})
		return
	}
	perfil = normalizarPerfilNotificacao(perfil)
	if perfil != "RECEPCAO" && perfil != "CABELEIREIRO" && perfil != "DONO" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "perfil deve ser RECEPCAO, CABELEIREIRO ou DONO"})
		return
	}

	q := h.DB.Where("perfil_destino = ?", perfil)
	if perfil == "CABELEIREIRO" {
		idUsuarioStr := c.Query("id_usuario")
		if idUsuarioStr == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "para perfil CABELEIREIRO o parâmetro id_usuario é obrigatório"})
			return
		}
		var idUsuario uint
		if _, err := fmt.Sscanf(idUsuarioStr, "%d", &idUsuario); err != nil || idUsuario == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "id_usuario deve ser um número válido"})
			return
		}
		q = q.Where("tipo = ?", "AGENDA").Where("id_usuario_destino = ?", idUsuario)
	}
	if c.Query("todas") != "1" {
		q = q.Where("lido = ?", false)
	}
	var list []models.Notificacao
	if err := q.Order("data_criacao DESC").Find(&list).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	now := time.Now()
	resp := make([]gin.H, 0, len(list))
	for _, n := range list {
		item := gin.H{
			"id":            n.ID,
			"tipo":          n.Tipo,
			"titulo":        n.Titulo,
			"subtitulo":     n.Subtitulo,
			"detalhe":       n.Detalhe,
			"tempo_atras":   formatTempoAtras(now, n.DataCriacao),
			"lido":          n.Lido,
			"data_criacao":  n.DataCriacao,
		}
		if n.Valor != nil {
			item["valor"] = *n.Valor
		}
		if n.Estoque != nil {
			item["estoque"] = *n.Estoque
		}
		if n.AtendimentoID != nil {
			item["id_atendimento"] = *n.AtendimentoID
		}
		if n.AgendamentoID != nil {
			item["id_agendamento"] = *n.AgendamentoID
		}
		if n.ProdutoID != nil {
			item["id_produto"] = *n.ProdutoID
			var p models.Produto
			if err := h.DB.Select("imagem").Where("id = ?", *n.ProdutoID).First(&p).Error; err == nil && p.Imagem != "" {
				item["imagem_produto"] = p.Imagem
			}
		}
		resp = append(resp, item)
	}
	c.JSON(http.StatusOK, resp)
}

// MarcarNotificacaoLida — PATCH /notificacoes/:id/lido — marca a notificação como lida (some da lista ao reabrir).
func (h *Handler) MarcarNotificacaoLida(c *gin.Context) {
	idStr := c.Param("id")
	var id uint
	if _, err := fmt.Sscanf(idStr, "%d", &id); err != nil || id == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id inválido"})
		return
	}
	result := h.DB.Model(&models.Notificacao{}).Where("id = ?", id).Update("lido", true)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}
	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "notificação não encontrada"})
		return
	}
	c.Status(http.StatusNoContent)
}

const tipoLembreteAgendamento = "LEMBRETE_AGENDAMENTO"

// CriarLembretesAgendamento cria notificações de lembrete para agendamentos de amanhã (evita duplicatas por id_agendamento).
// Pode ser chamada periodicamente (ex.: a cada hora) a partir de main.
func CriarLembretesAgendamento(db *gorm.DB) {
	now := time.Now()
	amanha := time.Date(now.Year(), now.Month(), now.Day()+1, 0, 0, 0, 0, now.Location())
	fimAmanha := amanha.Add(24*time.Hour - time.Second)

	var agendamentos []models.Agendamento
	if err := db.Where("data_hora BETWEEN ? AND ? AND status IN ?", amanha, fimAmanha, []string{"AGENDADO", "CONFIRMADO"}).
		Preload("Cliente").Preload("Cabeleireiro").Find(&agendamentos).Error; err != nil {
		return
	}
	for _, ag := range agendamentos {
		var existente int64
		db.Model(&models.Notificacao{}).Where("tipo = ? AND id_agendamento = ?", tipoLembreteAgendamento, ag.ID).Count(&existente)
		if existente > 0 {
			continue
		}
		clienteNome := "Cliente"
		if ag.Cliente.ID != 0 {
			clienteNome = ag.Cliente.Nome
		}
		profNome := "profissional"
		if ag.Cabeleireiro != nil && ag.Cabeleireiro.ID != 0 {
			profNome = ag.Cabeleireiro.Nome
		}
		hora := ag.DataHora.Format("15:04")
		detalhe := fmt.Sprintf("Amanhã às %s com o profissional %s.", hora, profNome)
		agID := ag.ID
		n := models.Notificacao{
			Tipo:          tipoLembreteAgendamento,
			Titulo:        "Lembrete de agendamento",
			Subtitulo:     clienteNome,
			Detalhe:       detalhe,
			PerfilDestino: "RECEPCAO",
			Lido:          false,
			AgendamentoID: &agID,
		}
		_ = db.Create(&n).Error
	}
}

// SERVIÇOS
func (h *Handler) CreateServico(c *gin.Context) {
	var body models.Servico
	if err := c.ShouldBindJSON(&body); err != nil || body.Descricao == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "descricao e valor são obrigatórios"})
		return
	}
	if err := h.DB.Create(&body).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, body)
}

func (h *Handler) ListServicos(c *gin.Context) {
	var servicos []models.Servico
	q := h.DB.Order("id asc")
	if c.Query("todos") != "1" {
		q = q.Where("ativo = ?", true)
	}
	if err := q.Find(&servicos).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, servicos)
}

func (h *Handler) UpdateServico(c *gin.Context) {
	id := c.Param("id")
	var body struct {
		Descricao *string  `json:"descricao"`
		Valor     *float64 `json:"valor"`
		Icone     *string  `json:"icone"`
		Imagem    *string  `json:"imagem"`
		Ativo     *bool    `json:"ativo"`
	}
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	updates := map[string]interface{}{}
	if body.Descricao != nil {
		updates["descricao"] = *body.Descricao
	}
	if body.Valor != nil {
		updates["valor"] = *body.Valor
	}
	if body.Icone != nil {
		updates["icone"] = *body.Icone
	}
	if body.Imagem != nil {
		updates["imagem"] = *body.Imagem
	}
	if body.Ativo != nil {
		updates["ativo"] = *body.Ativo
	}
	if len(updates) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "nenhum campo para atualizar"})
		return
	}
	if err := h.DB.Model(&models.Servico{}).Where("id = ?", id).Updates(updates).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.Status(http.StatusNoContent)
}

func (h *Handler) DeleteServico(c *gin.Context) {
	id := c.Param("id")
	res := h.DB.Where("id = ?", id).Delete(&models.Servico{})
	if res.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": res.Error.Error()})
		return
	}
	if res.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "serviço não encontrado"})
		return
	}
	c.Status(http.StatusNoContent)
}

// PRODUTOS
func (h *Handler) CreateProduto(c *gin.Context) {
	var body models.Produto
	if err := c.ShouldBindJSON(&body); err != nil || body.Descricao == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "descricao e valor_venda são obrigatórios"})
		return
	}
	if body.Estoque < 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "estoque deve ser >= 0"})
		return
	}
	if err := h.DB.Create(&body).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, body)
}

func (h *Handler) ListProdutos(c *gin.Context) {
	var produtos []models.Produto
	q := h.DB.Order("id asc")
	if c.Query("todos") != "1" {
		q = q.Where("ativo = ?", true)
	}
	if err := q.Find(&produtos).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, produtos)
}

func (h *Handler) UpdateProduto(c *gin.Context) {
	id := c.Param("id")
	var body struct {
		Descricao  *string  `json:"descricao"`
		ValorVenda *float64 `json:"valor_venda"`
		ValorCusto *float64 `json:"valor_custo"`
		Estoque    *int     `json:"estoque"`
		Icone      *string  `json:"icone"`
		Imagem     *string  `json:"imagem"`
		Ativo      *bool    `json:"ativo"`
	}
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	updates := map[string]interface{}{}
	if body.Descricao != nil {
		updates["descricao"] = *body.Descricao
	}
	if body.ValorVenda != nil {
		updates["valor_venda"] = *body.ValorVenda
	}
	if body.ValorCusto != nil {
		updates["valor_custo"] = *body.ValorCusto
	}
	if body.Estoque != nil {
		updates["estoque"] = *body.Estoque
	}
	if body.Icone != nil {
		updates["icone"] = *body.Icone
	}
	if body.Imagem != nil {
		updates["imagem"] = *body.Imagem
	}
	if body.Ativo != nil {
		updates["ativo"] = *body.Ativo
	}
	if len(updates) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "nenhum campo para atualizar"})
		return
	}
	if err := h.DB.Model(&models.Produto{}).Where("id = ?", id).Updates(updates).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.Status(http.StatusNoContent)
}

func (h *Handler) DeleteProduto(c *gin.Context) {
	id := c.Param("id")
	res := h.DB.Where("id = ?", id).Delete(&models.Produto{})
	if res.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": res.Error.Error()})
		return
	}
	if res.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "produto não encontrado"})
		return
	}
	c.Status(http.StatusNoContent)
}

// Upload de imagem (produto/serviço). Retorna {"imagem": "uploads/..."}.
func (h *Handler) UploadImagem(c *gin.Context) {
	file, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "arquivo obrigatório"})
		return
	}
	ext := strings.ToLower(filepath.Ext(file.Filename))
	allowed := map[string]bool{".jpg": true, ".jpeg": true, ".png": true, ".gif": true, ".webp": true}
	if !allowed[ext] {
		c.JSON(http.StatusBadRequest, gin.H{"error": "formato inválido. Use jpg, png, gif ou webp."})
		return
	}
	name := fmt.Sprintf("%d%s", time.Now().UnixNano(), ext)
	dir := "uploads"
	if err := os.MkdirAll(dir, 0755); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "erro ao criar pasta uploads"})
		return
	}
	path := filepath.Join(dir, name)
	if err := c.SaveUploadedFile(file, path); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "erro ao salvar arquivo"})
		return
	}
	rel := dir + "/" + name
	c.JSON(http.StatusOK, gin.H{"imagem": rel})
}

// Atendimento: detalhe (serviços e produtos) para exibir no modal de recebimento
func (h *Handler) DetalheAtendimento(c *gin.Context) {
	id := c.Param("id")
	var servicos []struct {
		Descricao string  `json:"descricao"`
		Valor     float64 `json:"valor"`
	}
	var produtos []struct {
		Descricao   string  `json:"descricao"`
		Quantidade  int     `json:"quantidade"`
		Valor       float64 `json:"valor"`
		Subtotal    float64 `json:"subtotal"`
	}
	servicosQuery := `
SELECT s.descricao, ats.valor
FROM atendimento_servico ats
JOIN servico s ON s.id = ats.id_servico
WHERE ats.id_atendimento = ?
`
	if err := h.DB.Raw(servicosQuery, id).Scan(&servicos).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	produtosQuery := `
SELECT p.descricao, atp.quantidade, atp.valor, (atp.quantidade * atp.valor) as subtotal
FROM atendimento_produto atp
JOIN produto p ON p.id = atp.id_produto
WHERE atp.id_atendimento = ?
`
	if err := h.DB.Raw(produtosQuery, id).Scan(&produtos).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"servicos":  servicos,
		"produtos":  produtos,
	})
}

// Atendimento_Servico: adicionar serviços a um atendimento
func (h *Handler) AddServicosAtendimento(c *gin.Context) {
	id := c.Param("id")
	var body []struct {
		IDServico uint    `json:"id_servico"`
		Valor     float64 `json:"valor"`
	}
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var lista []models.AtendimentoServico
	for _, item := range body {
		if item.IDServico == 0 {
			continue
		}
		lista = append(lista, models.AtendimentoServico{
			AtendimentoID: parseUint(id),
			ServicoID:     item.IDServico,
			Valor:         item.Valor,
		})
	}
	if len(lista) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "nenhum serviço válido"})
		return
	}
	if err := h.DB.Create(&lista).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.Status(http.StatusCreated)
}

// Atendimento_Produto: adicionar produtos a um atendimento e decrementar estoque
func (h *Handler) AddProdutosAtendimento(c *gin.Context) {
	id := c.Param("id")
	var body []struct {
		IDProduto  uint    `json:"id_produto"`
		Quantidade int     `json:"quantidade"`
		Valor      float64 `json:"valor"`
	}
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var lista []models.AtendimentoProduto
	for _, item := range body {
		if item.IDProduto == 0 || item.Quantidade <= 0 {
			continue
		}
		lista = append(lista, models.AtendimentoProduto{
			AtendimentoID: parseUint(id),
			ProdutoID:     item.IDProduto,
			Quantidade:    item.Quantidade,
			Valor:         item.Valor,
		})
	}
	if len(lista) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "nenhum produto válido"})
		return
	}

	// Validar estoque e decrementar em transação
	tx := h.DB.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	for _, ap := range lista {
		var p models.Produto
		if err := tx.First(&p, ap.ProdutoID).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusNotFound, gin.H{"error": "produto não encontrado"})
			return
		}
		if p.Estoque < ap.Quantidade {
			tx.Rollback()
			c.JSON(http.StatusBadRequest, gin.H{
				"error": fmt.Sprintf("estoque insuficiente para %s: disponível %d, solicitado %d",
					p.Descricao, p.Estoque, ap.Quantidade),
			})
			return
		}
		newEstoque := p.Estoque - ap.Quantidade
		if err := tx.Model(&models.Produto{}).Where("id = ?", ap.ProdutoID).
			Update("estoque", newEstoque).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"error": "erro ao atualizar estoque"})
			return
		}
		if newEstoque <= 5 && p.Ativo {
			pid := ap.ProdutoID
			_ = tx.Create(&models.Notificacao{
				Tipo:          "REABASTECER",
				Titulo:        "REABASTECER",
				Subtitulo:     p.Descricao,
				Detalhe:       "Linha Professional",
				Estoque:       &newEstoque,
				ProdutoID:     &pid,
				PerfilDestino: "RECEPCAO",
			}).Error
		}
	}

	if err := tx.Create(&lista).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if err := tx.Commit().Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "erro ao confirmar transação"})
		return
	}
	c.Status(http.StatusCreated)
}

// CAIXA: últimos lançamentos (do caixa aberto). Opcional: ?limite=100 (padrão 10).
func (h *Handler) ListUltimosLancamentos(c *gin.Context) {
	cm, err := h.caixaAberto()
	if err != nil {
		c.JSON(http.StatusOK, []interface{}{})
		return
	}
	limite := 10
	if s := c.Query("limite"); s != "" {
		if n, e := fmt.Sscanf(s, "%d", &limite); e == nil && n == 1 && limite > 0 {
			if limite > 500 {
				limite = 500
			}
		}
	}
	var rows []struct {
		Tipo          string    `gorm:"column:tipo"`
		ID            uint      `gorm:"column:id"`
		Nome          string    `gorm:"column:nome"`
		Valor         float64   `gorm:"column:valor"`
		Data          time.Time `gorm:"column:data"`
		TipoPagamento *string   `gorm:"column:tipo_pagamento"`
		Observacao    *string   `gorm:"column:observacao"`
	}
	query := `
SELECT tipo, id, nome, valor, data, tipo_pagamento, observacao FROM (
  SELECT 'ENTRADA' AS tipo, cx.id::bigint, cli.nome, cx.valor, cx.data_pagamento AS data, cx.tipo_pagamento, cx.observacao
  FROM caixa cx
  JOIN atendimento a ON a.id = cx.id_atendimento
  JOIN fila_atendimento f ON f.id = a.id_fila
  JOIN cliente cli ON cli.id = f.id_cliente
  WHERE cx.id_caixa_movimento = ? AND (cx.operacao = 'E' OR cx.operacao IS NULL)
  UNION ALL
  SELECT 'SAIDA' AS tipo, sg.id::bigint, 'Sangria' AS nome, sg.valor, sg.data_sangria AS data, NULL::text AS tipo_pagamento, NULL::text AS observacao
  FROM caixa_sangria sg
  WHERE sg.id_caixa_movimento = ?
  UNION ALL
  SELECT 'SAIDA' AS tipo, cx.id::bigint, COALESCE(NULLIF(cx.descricao, ''), 'Lançamento manual') AS nome, cx.valor, cx.data_pagamento AS data, NULL::text AS tipo_pagamento, NULL::text AS observacao
  FROM caixa cx
  WHERE cx.id_caixa_movimento = ? AND cx.operacao = 'S'
) u
ORDER BY data DESC
LIMIT ?;
`
	if err := h.DB.Raw(query, cm.ID, cm.ID, cm.ID, limite).Scan(&rows).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	out := make([]map[string]interface{}, 0, len(rows))
	for _, r := range rows {
		origem := "CAIXA"
		if r.Tipo == "SAIDA" {
			origem = "SANGRIA"
		}
		tipoPag := ""
		if r.TipoPagamento != nil {
			tipoPag = *r.TipoPagamento
		}
		observacao := ""
		if r.Observacao != nil {
			observacao = *r.Observacao
		}
		out = append(out, map[string]interface{}{
			"origem":         origem,
			"id":             r.ID,
			"nome":           r.Nome,
			"valor":          r.Valor,
			"data":           r.Data,
			"tipo":           r.Tipo,
			"tipo_pagamento": tipoPag,
			"observacao":     observacao,
		})
	}
	c.JSON(http.StatusOK, out)
}

// CAIXA: saldo real do caixa aberto (valor_abertura + entradas - saídas)
func (h *Handler) SaldoDoDia(c *gin.Context) {
	cm, err := h.caixaAberto()
	if err != nil {
		c.JSON(http.StatusOK, gin.H{"saldo": 0})
		return
	}
	var saldo float64
	query := `
SELECT cm.valor_abertura
    + COALESCE((SELECT SUM(c.valor) FROM caixa c WHERE c.id_caixa_movimento = ? AND (c.operacao = 'E' OR c.operacao IS NULL)), 0)
    - COALESCE((SELECT SUM(c.valor) FROM caixa c WHERE c.id_caixa_movimento = ? AND c.operacao = 'S'), 0)
    - COALESCE((SELECT SUM(s.valor) FROM caixa_sangria s WHERE s.id_caixa_movimento = ?), 0) AS saldo
FROM caixa_movimento cm
WHERE cm.id = ?;
`
	if err := h.DB.Raw(query, cm.ID, cm.ID, cm.ID, cm.ID).Scan(&saldo).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"saldo": saldo})
}

// CAIXA: detalhe de um lançamento (modal)
func (h *Handler) DetalheCaixa(c *gin.Context) {
	id := c.Param("id")
	var header struct {
		Nome          string    `json:"nome"`
		ValorTotal    float64   `json:"valor"`
		TipoPagamento string    `json:"tipo_pagamento"`
		Observacao    string    `json:"observacao"`
		DataPagamento time.Time `json:"data_pagamento"`
	}
	var servicos []struct {
		Descricao string  `json:"descricao"`
		Valor     float64 `json:"valor"`
	}

	headerQuery := `
SELECT 
    cli.nome,
    c.valor,
    c.tipo_pagamento,
    c.observacao,
    c.data_pagamento
FROM caixa c
JOIN atendimento a ON a.id = c.id_atendimento
JOIN fila_atendimento f ON f.id = a.id_fila
JOIN cliente cli ON cli.id = f.id_cliente
WHERE c.id = ?;
`
	if err := h.DB.Raw(headerQuery, id).Scan(&header).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	servicosQuery := `
SELECT s.descricao, ats.valor
FROM atendimento_servico ats
JOIN servico s ON s.id = ats.id_servico
JOIN atendimento a ON a.id = ats.id_atendimento
JOIN caixa c ON c.id_atendimento = a.id
WHERE c.id = ?;
`
	if err := h.DB.Raw(servicosQuery, id).Scan(&servicos).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"cliente":        header.Nome,
		"valor":          header.ValorTotal,
		"tipo_pagamento": header.TipoPagamento,
		"observacao":     header.Observacao,
		"data_pagamento": header.DataPagamento,
		"servicos":       servicos,
	})
}

// SANGRIA — só com caixa aberto
func (h *Handler) RegistrarSangria(c *gin.Context) {
	var body struct {
		Valor      float64 `json:"valor" binding:"required"`
		Observacao string  `json:"observacao"`
		UsuarioID  *uint   `json:"id_usuario"`
	}
	if err := c.ShouldBindJSON(&body); err != nil || body.Valor <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "valor é obrigatório e deve ser > 0"})
		return
	}
	cm, err := h.caixaAberto()
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": "caixa fechado. Abra o caixa para registrar sangria."})
		return
	}
	s := models.CaixaSangria{
		CaixaMovimentoID: cm.ID,
		Valor:            body.Valor,
		Observacao:       body.Observacao,
	}
	if err := h.DB.Create(&s).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	nome := "Recepção"
	if body.UsuarioID != nil {
		nome = h.nomeUsuarioPorID(*body.UsuarioID)
	}
	h.notificarDonoLancamento("LANCAMENTO_SANGRIA", "Sangria", nome, body.Valor, strings.TrimSpace(body.Observacao))
	c.JSON(http.StatusCreated, s)
}

// LANCAMENTO_MANUAL — só com caixa aberto. Registra saída na tabela caixa (consumo interno, etc).
func (h *Handler) RegistrarLancamentoManual(c *gin.Context) {
	var body struct {
		Descricao string  `json:"descricao"`
		Valor     float64 `json:"valor" binding:"required"`
		UsuarioID uint    `json:"id_usuario" binding:"required"`
	}
	if err := c.ShouldBindJSON(&body); err != nil || body.Valor <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "valor é obrigatório e deve ser > 0"})
		return
	}
	cm, err := h.caixaAberto()
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": "caixa fechado. Abra o caixa para registrar lançamento manual."})
		return
	}
	uid := body.UsuarioID
	cx := models.Caixa{
		CaixaMovimentoID: cm.ID,
		AtendimentoID:    nil, // sem atendimento
		Valor:            body.Valor,
		TipoPagamento:    "LANCAMENTO_MANUAL",
		TipoMovimentacao: "LANCAMENTO_MANUAL",
		Operacao:         "S",
		UsuarioID:        &uid,
		Descricao:        strings.TrimSpace(body.Descricao),
		Observacao:       "Consumo interno da barbearia",
	}
	if err := h.DB.Create(&cx).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	h.notificarDonoLancamento("LANCAMENTO_MANUAL", "Lançamento manual", h.nomeUsuarioPorID(uid), body.Valor, strings.TrimSpace(body.Descricao))
	c.JSON(http.StatusCreated, cx)
}

// DashboardAdmin — GET /api/admin/dashboard?periodo=1|7|14|30|60&tipo=SERVICO|PRODUTO&tipo_pagamento=PIX|CARTAO|DINHEIRO&id_cabeleireiro=
// Filtros opcionais: tipo (pode repetir para múltiplas séries), tipo_pagamento, id_cabeleireiro.
func (h *Handler) DashboardAdmin(c *gin.Context) {
	periodoStr := c.DefaultQuery("periodo", "7")
	var dias int
	switch periodoStr {
	case "1":
		dias = 1
	case "7", "14", "15", "30", "60", "90":
		_, _ = fmt.Sscanf(periodoStr, "%d", &dias)
	default:
		if _, err := fmt.Sscanf(periodoStr, "%d", &dias); err != nil || dias <= 0 {
			dias = 7
		}
	}
	if dias <= 0 {
		dias = 7
	}

	tipoPagamento := strings.TrimSpace(c.Query("tipo_pagamento"))
	var idCabeleireiro uint
	if s := c.Query("id_cabeleireiro"); s != "" {
		_, _ = fmt.Sscanf(s, "%d", &idCabeleireiro)
	}

	tipos := make([]string, 0)
	for _, t := range c.QueryArray("tipo") {
		t = strings.TrimSpace(strings.ToUpper(t))
		if t == "SERVICO" || t == "PRODUTO" {
			has := false
			for _, x := range tipos {
				if x == t {
					has = true
					break
				}
			}
			if !has {
				tipos = append(tipos, t)
			}
		}
	}

	now := time.Now()
	loc := now.Location()
	var inicio, fim time.Time
	dataInicioStr := strings.TrimSpace(c.Query("data_inicio"))
	dataFimStr := strings.TrimSpace(c.Query("data_fim"))
	if dataInicioStr != "" && dataFimStr != "" {
		// data_inicio e data_fim: YYYY-MM-DD (período customizado para o card Faturamento Total)
		var err error
		inicio, err = time.ParseInLocation("2006-01-02", dataInicioStr, loc)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "data_inicio inválida (use YYYY-MM-DD)"})
			return
		}
		inicio = time.Date(inicio.Year(), inicio.Month(), inicio.Day(), 0, 0, 0, 0, loc)
		fim, err = time.ParseInLocation("2006-01-02", dataFimStr, loc)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "data_fim inválida (use YYYY-MM-DD)"})
			return
		}
		fim = time.Date(fim.Year(), fim.Month(), fim.Day(), 23, 59, 59, 999999999, loc)
		if inicio.After(fim) {
			c.JSON(http.StatusBadRequest, gin.H{"error": "data_inicio deve ser anterior a data_fim"})
			return
		}
		dias = int(fim.Sub(inicio).Hours()/24) + 1
		if dias <= 0 {
			dias = 1
		}
	} else if mesStr := strings.TrimSpace(c.Query("mes")); mesStr != "" {
		// mes=YYYY-MM: período é o mês inteiro (ou até hoje se for o mês atual)
		dtMes, err := time.Parse("2006-01", mesStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "parâmetro mes inválido. Use YYYY-MM"})
			return
		}
		inicio = time.Date(dtMes.Year(), dtMes.Month(), 1, 0, 0, 0, 0, loc)
		lastDay := time.Date(dtMes.Year(), dtMes.Month()+1, 0, 23, 59, 59, 999999999, loc)
		if lastDay.After(now) {
			fim = time.Date(now.Year(), now.Month(), now.Day(), 23, 59, 59, 999999999, loc)
		} else {
			fim = lastDay
		}
		dias = int(fim.Sub(inicio).Hours()/24) + 1
		if dias <= 0 {
			dias = 1
		}
	} else {
		fim = time.Date(now.Year(), now.Month(), now.Day(), 23, 59, 59, 999999999, loc)
		inicio = time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, loc).AddDate(0, 0, -dias+1)
	}

	// Base: args para filtro de caixa (data + tipo_pagamento + id_cabeleireiro)
	caixaArgs := []interface{}{inicio, fim}
	caixaWhereExtra := ""
	if tipoPagamento != "" {
		caixaWhereExtra += " AND (c.tipo_pagamento = ?)"
		caixaArgs = append(caixaArgs, tipoPagamento)
	}
	if idCabeleireiro > 0 {
		caixaWhereExtra += " AND (a.id_cabeleireiro = ?)"
		caixaArgs = append(caixaArgs, idCabeleireiro)
	}
	caixaJoin := ""
	if idCabeleireiro > 0 {
		caixaJoin = " JOIN atendimento a ON a.id = c.id_atendimento"
	}

	// Faturamento do período (conforme tipo)
	var faturamento float64
	var faturamentoServicos, faturamentoProdutos float64
	if len(tipos) == 0 {
		q := `SELECT COALESCE(SUM(c.valor), 0) FROM caixa c` + caixaJoin + ` WHERE c.data_pagamento >= ? AND c.data_pagamento <= ?` + caixaWhereExtra
		if err := h.DB.Raw(q, caixaArgs...).Scan(&faturamento).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	} else {
		subQ := `SELECT c.id_atendimento FROM caixa c` + caixaJoin + ` WHERE c.data_pagamento >= ? AND c.data_pagamento <= ?` + caixaWhereExtra
		for _, t := range tipos {
			if t == "SERVICO" {
				h.DB.Raw(`SELECT COALESCE(SUM(ats.valor), 0) FROM atendimento_servico ats WHERE ats.id_atendimento IN (`+subQ+`)`, append(caixaArgs)...).Scan(&faturamentoServicos)
			} else if t == "PRODUTO" {
				h.DB.Raw(`SELECT COALESCE(SUM(atp.quantidade * atp.valor), 0) FROM atendimento_produto atp WHERE atp.id_atendimento IN (`+subQ+`)`, append(caixaArgs)...).Scan(&faturamentoProdutos)
			}
		}
		faturamento = faturamentoServicos + faturamentoProdutos
	}

	// Período anterior para % variação (mesma lógica de filtro)
	inicioAnt := inicio.AddDate(0, 0, -dias)
	argsAnt := []interface{}{inicioAnt, inicio}
	if tipoPagamento != "" {
		argsAnt = append(argsAnt, tipoPagamento)
	}
	if idCabeleireiro > 0 {
		argsAnt = append(argsAnt, idCabeleireiro)
	}
	var faturamentoAnterior float64
	if len(tipos) == 0 {
		qAnt := `SELECT COALESCE(SUM(c.valor), 0) FROM caixa c` + caixaJoin + ` WHERE c.data_pagamento >= ? AND c.data_pagamento < ?` + caixaWhereExtra
		h.DB.Raw(qAnt, argsAnt...).Scan(&faturamentoAnterior)
	} else {
		subQAnt := `SELECT c.id_atendimento FROM caixa c` + caixaJoin + ` WHERE c.data_pagamento >= ? AND c.data_pagamento < ?` + caixaWhereExtra
		var fs, fp float64
		for _, t := range tipos {
			if t == "SERVICO" {
				h.DB.Raw(`SELECT COALESCE(SUM(ats.valor), 0) FROM atendimento_servico ats WHERE ats.id_atendimento IN (`+subQAnt+`)`, append(argsAnt)...).Scan(&fs)
				faturamentoAnterior += fs
			} else if t == "PRODUTO" {
				h.DB.Raw(`SELECT COALESCE(SUM(atp.quantidade * atp.valor), 0) FROM atendimento_produto atp WHERE atp.id_atendimento IN (`+subQAnt+`)`, append(argsAnt)...).Scan(&fp)
				faturamentoAnterior += fp
			}
		}
	}

	var percentualAnterior *float64
	if faturamentoAnterior > 0 {
		p := ((faturamento - faturamentoAnterior) / faturamentoAnterior) * 100
		percentualAnterior = &p
	} else if faturamento > 0 {
		p := 100.0
		percentualAnterior = &p
	}

	labels := []string{"DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"}
	type DiaValor struct {
		Data  string  `gorm:"column:data"`
		Valor float64 `gorm:"column:valor"`
	}

	// Gráfico: uma série ou múltiplas (grafico_series)
	subQGrafico := `SELECT c.id_atendimento FROM caixa c` + caixaJoin + ` WHERE c.data_pagamento >= ? AND c.data_pagamento <= ?` + caixaWhereExtra
	argsGrafico := make([]interface{}, len(caixaArgs))
	copy(argsGrafico, caixaArgs)

	if len(tipos) == 0 {
		// Uma série: valor total por dia (caixa)
		var grafico []DiaValor
		q := `SELECT (c.data_pagamento::date)::text AS data, COALESCE(SUM(c.valor), 0) AS valor FROM caixa c` + caixaJoin + ` WHERE c.data_pagamento >= ? AND c.data_pagamento <= ?` + caixaWhereExtra + ` GROUP BY c.data_pagamento::date ORDER BY data`
		if err := h.DB.Raw(q, caixaArgs...).Scan(&grafico).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		graficoMap := make(map[string]float64)
		for _, d := range grafico {
			graficoMap[d.Data] = d.Valor
		}
		graficoCompleto := make([]gin.H, 0, dias)
		for d := inicio; !d.After(fim); d = d.AddDate(0, 0, 1) {
			key := d.Format("2006-01-02")
			graficoCompleto = append(graficoCompleto, gin.H{"data": key, "label": labels[d.Weekday()], "valor": graficoMap[key]})
		}
		resp := h.dashboardResp(c, inicio, fim, dias, faturamento, faturamentoAnterior, percentualAnterior, faturamentoServicos, faturamentoProdutos, caixaArgs, caixaJoin, caixaWhereExtra, subQGrafico, argsGrafico, graficoCompleto, nil, tipos)
		c.JSON(http.StatusOK, resp)
		return
	}

	// Múltiplas séries ou uma série por tipo
	graficoSeries := make([]gin.H, 0)
	for _, t := range tipos {
		var grafico []DiaValor
		if t == "SERVICO" {
			q := `SELECT (c.data_pagamento::date)::text AS data, COALESCE(SUM(ats.valor), 0) AS valor
FROM caixa c` + caixaJoin + `
JOIN atendimento_servico ats ON ats.id_atendimento = c.id_atendimento
WHERE c.data_pagamento >= ? AND c.data_pagamento <= ?` + caixaWhereExtra + `
GROUP BY c.data_pagamento::date ORDER BY data`
			if err := h.DB.Raw(q, caixaArgs...).Scan(&grafico).Error; err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			graficoMap := make(map[string]float64)
			for _, d := range grafico {
				graficoMap[d.Data] = d.Valor
			}
			dados := make([]gin.H, 0, dias)
			for d := inicio; !d.After(fim); d = d.AddDate(0, 0, 1) {
				key := d.Format("2006-01-02")
				dados = append(dados, gin.H{"data": key, "label": labels[d.Weekday()], "valor": graficoMap[key]})
			}
			graficoSeries = append(graficoSeries, gin.H{"label": "Serviços", "cor": "#2196F3", "dados": dados})
		} else if t == "PRODUTO" {
			q := `SELECT (c.data_pagamento::date)::text AS data, COALESCE(SUM(atp.quantidade * atp.valor), 0) AS valor
FROM caixa c` + caixaJoin + `
JOIN atendimento_produto atp ON atp.id_atendimento = c.id_atendimento
WHERE c.data_pagamento >= ? AND c.data_pagamento <= ?` + caixaWhereExtra + `
GROUP BY c.data_pagamento::date ORDER BY data`
			if err := h.DB.Raw(q, caixaArgs...).Scan(&grafico).Error; err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			graficoMap := make(map[string]float64)
			for _, d := range grafico {
				graficoMap[d.Data] = d.Valor
			}
			dados := make([]gin.H, 0, dias)
			for d := inicio; !d.After(fim); d = d.AddDate(0, 0, 1) {
				key := d.Format("2006-01-02")
				dados = append(dados, gin.H{"data": key, "label": labels[d.Weekday()], "valor": graficoMap[key]})
			}
			graficoSeries = append(graficoSeries, gin.H{"label": "Produtos", "cor": "#4CAF50", "dados": dados})
		}
	}
	resp := h.dashboardResp(c, inicio, fim, dias, faturamento, faturamentoAnterior, percentualAnterior, faturamentoServicos, faturamentoProdutos, caixaArgs, caixaJoin, caixaWhereExtra, subQGrafico, argsGrafico, nil, graficoSeries, tipos)
	c.JSON(http.StatusOK, resp)
}

// AtendimentoDiaItem — item do histórico de atendimentos de um dia (para modal no app).
type AtendimentoDiaItem struct {
	IDAtendimento uint      `json:"id_atendimento"`
	NomeCliente   string    `json:"nome_cliente"`
	Total         float64   `json:"total"`
	DataHora      time.Time `json:"data_hora"`
	Servicos      string    `json:"servicos,omitempty"` // descrições separadas por vírgula
}

// ListAtendimentosDia — GET /api/admin/atendimentos-dia?data=YYYY-MM-DD — atendimentos pagos naquele dia (histórico).
func (h *Handler) ListAtendimentosDia(c *gin.Context) {
	dataStr := c.Query("data")
	if dataStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "parâmetro data (YYYY-MM-DD) é obrigatório"})
		return
	}
	dt, err := time.Parse("2006-01-02", dataStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "data inválida. Use YYYY-MM-DD"})
		return
	}
	// Usar fuso da aplicação (TZ) para o intervalo do dia — evita pagamentos à noite ficarem "no dia errado"
	tz := os.Getenv("TZ")
	if tz == "" {
		tz = "America/Cuiaba"
	}
	loc, errLoc := time.LoadLocation(tz)
	if errLoc != nil || loc == nil {
		loc = time.UTC
	}
	start := time.Date(dt.Year(), dt.Month(), dt.Day(), 0, 0, 0, 0, loc)
	end := start.AddDate(0, 0, 1)

	var list []AtendimentoDiaItem
	q := `SELECT a.id AS id_atendimento, c.nome AS nome_cliente, MIN(a.inicio) AS data_hora, COALESCE(SUM(cx.valor), 0) AS total
FROM caixa cx
JOIN atendimento a ON a.id = cx.id_atendimento
JOIN fila_atendimento f ON f.id = a.id_fila
JOIN cliente c ON c.id = f.id_cliente
WHERE cx.data_pagamento >= ? AND cx.data_pagamento < ?
GROUP BY a.id, c.nome
ORDER BY data_hora`
	if err := h.DB.Raw(q, start, end).Scan(&list).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	// Enriquecer com nomes dos serviços (opcional)
	var descRow struct{ Descricao string }
	for i := range list {
		var descs []string
		rows, _ := h.DB.Raw(`SELECT s.descricao FROM atendimento_servico ats JOIN servico s ON s.id = ats.id_servico WHERE ats.id_atendimento = ? ORDER BY ats.id`, list[i].IDAtendimento).Rows()
		if rows != nil {
			for rows.Next() {
				_ = rows.Scan(&descRow.Descricao)
				descs = append(descs, descRow.Descricao)
			}
			rows.Close()
		}
		if len(descs) > 0 {
			list[i].Servicos = strings.Join(descs, ", ")
		}
	}
	c.JSON(http.StatusOK, list)
}

func (h *Handler) dashboardResp(c *gin.Context, inicio, fim time.Time, dias int, faturamento, faturamentoAnterior float64, percentualAnterior *float64, faturamentoServicos, faturamentoProdutos float64, caixaArgs []interface{}, caixaJoin, caixaWhereExtra, subQGrafico string, argsGrafico []interface{}, graficoCompleto []gin.H, graficoSeries []gin.H, tipos []string) gin.H {
	subQ := `SELECT c.id_atendimento FROM caixa c` + caixaJoin + ` WHERE c.data_pagamento >= ? AND c.data_pagamento <= ?` + caixaWhereExtra

	var totalServicos int64
	h.DB.Raw(`SELECT COUNT(*) FROM atendimento_servico ats WHERE ats.id_atendimento IN (`+subQ+`)`, caixaArgs...).Scan(&totalServicos)
	var totalProdutos int64
	h.DB.Raw(`SELECT COALESCE(SUM(quantidade), 0) FROM atendimento_produto atp WHERE atp.id_atendimento IN (`+subQ+`)`, caixaArgs...).Scan(&totalProdutos)
	var fatServ, fatProd float64
	h.DB.Raw(`SELECT COALESCE(SUM(ats.valor), 0) FROM atendimento_servico ats WHERE ats.id_atendimento IN (`+subQ+`)`, caixaArgs...).Scan(&fatServ)
	h.DB.Raw(`SELECT COALESCE(SUM(atp.quantidade * atp.valor), 0) FROM atendimento_produto atp WHERE atp.id_atendimento IN (`+subQ+`)`, caixaArgs...).Scan(&fatProd)
	if len(tipos) > 0 {
		faturamentoServicos, faturamentoProdutos = fatServ, fatProd
	}

	var emEspera int64
	h.DB.Model(&models.FilaAtendimento{}).Where("status = ?", "AGUARDANDO").Count(&emEspera)

	var qtdAtendimentosPagas int64
	h.DB.Raw(`SELECT COUNT(DISTINCT c.id_atendimento) FROM caixa c`+caixaJoin+` WHERE c.data_pagamento >= ? AND c.data_pagamento <= ?`+caixaWhereExtra, caixaArgs...).Scan(&qtdAtendimentosPagas)
	ticketMedio := 0.0
	if qtdAtendimentosPagas > 0 {
		ticketMedio = faturamento / float64(qtdAtendimentosPagas)
	}

	type RankRow struct {
		Nome         string  `gorm:"column:nome" json:"nome"`
		Atendimentos int64   `gorm:"column:atendimentos" json:"atendimentos"`
		Total        float64 `gorm:"column:total" json:"total"`
	}
	var ranking []RankRow
	rankQ := `SELECT u.nome, COUNT(c.id)::bigint AS atendimentos, COALESCE(SUM(c.valor), 0) AS total
FROM caixa c
JOIN atendimento a ON a.id = c.id_atendimento
JOIN usuario u ON u.id = a.id_cabeleireiro
WHERE c.data_pagamento >= ? AND c.data_pagamento <= ?` + caixaWhereExtra + `
GROUP BY u.id, u.nome ORDER BY total DESC`
	h.DB.Raw(rankQ, caixaArgs...).Scan(&ranking)

	type AtivRow struct {
		Nome        string    `gorm:"column:nome" json:"nome"`
		Valor       float64   `gorm:"column:valor" json:"valor"`
		Data        time.Time `gorm:"column:data" json:"data"`
		Desc        string    `gorm:"column:descricao" json:"descricao"`
		Observacao  string    `gorm:"column:observacao" json:"observacao"`
	}
	var atividade []AtivRow
	ativQ := `SELECT cli.nome, c.valor, c.data_pagamento AS data,
COALESCE((SELECT string_agg(s.descricao, ' + ') FROM atendimento_servico ats JOIN servico s ON s.id = ats.id_servico WHERE ats.id_atendimento = c.id_atendimento), '') AS descricao,
COALESCE(NULLIF(TRIM(c.observacao), ''), '') AS observacao
FROM caixa c
JOIN atendimento a ON a.id = c.id_atendimento
JOIN fila_atendimento f ON f.id = a.id_fila
JOIN cliente cli ON cli.id = f.id_cliente
WHERE c.data_pagamento >= ? AND c.data_pagamento <= ?` + caixaWhereExtra + `
ORDER BY c.data_pagamento DESC LIMIT 10`
	h.DB.Raw(ativQ, caixaArgs...).Scan(&atividade)

	resp := gin.H{
		"faturamento_total":        faturamento,
		"faturamento_anterior":      faturamentoAnterior,
		"percentual_vs_anterior":    percentualAnterior,
		"grafico":                  graficoCompleto,
		"grafico_series":           graficoSeries,
		"servicos_count":           totalServicos,
		"servicos_faturamento":     faturamentoServicos,
		"produtos_count":           totalProdutos,
		"produtos_faturamento":     faturamentoProdutos,
		"em_espera":                emEspera,
		"ticket_medio":             ticketMedio,
		"qtd_atendimentos_periodo": qtdAtendimentosPagas,
		"ranking":                  ranking,
		"atividade_recente":        atividade,
	}
	return resp
}

// RankingFiltrado — GET /api/admin/ranking?data_inicio=YYYY-MM-DD&data_fim=YYYY-MM-DD&id_cabeleireiro= (opcional)
func (h *Handler) RankingFiltrado(c *gin.Context) {
	dataInicioStr := c.Query("data_inicio")
	dataFimStr := c.Query("data_fim")
	idCabeleireiroStr := c.Query("id_cabeleireiro")

	var inicio, fim time.Time
	var err error
	if dataInicioStr != "" {
		inicio, err = time.ParseInLocation("2006-01-02", dataInicioStr, time.Local)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "data_inicio inválida (use YYYY-MM-DD)"})
			return
		}
		inicio = time.Date(inicio.Year(), inicio.Month(), inicio.Day(), 0, 0, 0, 0, inicio.Location())
	} else {
		inicio = time.Now().AddDate(0, 0, -30) // padrão 30 dias atrás
	}
	if dataFimStr != "" {
		fim, err = time.ParseInLocation("2006-01-02", dataFimStr, time.Local)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "data_fim inválida (use YYYY-MM-DD)"})
			return
		}
		fim = time.Date(fim.Year(), fim.Month(), fim.Day(), 23, 59, 59, 999999999, fim.Location())
	} else {
		fim = time.Now()
	}
	if inicio.After(fim) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "data_inicio deve ser anterior a data_fim"})
		return
	}

	type RankRow struct {
		Nome         string  `gorm:"column:nome" json:"nome"`
		Atendimentos int64   `gorm:"column:atendimentos" json:"atendimentos"`
		Total        float64 `gorm:"column:total" json:"total"`
	}
	var ranking []RankRow

	if idCabeleireiroStr != "" {
		var idCab uint
		if _, err := fmt.Sscanf(idCabeleireiroStr, "%d", &idCab); err != nil || idCab == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "id_cabeleireiro inválido"})
			return
		}
		h.DB.Raw(`
			SELECT u.nome, COUNT(c.id)::bigint AS atendimentos, COALESCE(SUM(c.valor), 0) AS total
			FROM caixa c
			JOIN atendimento a ON a.id = c.id_atendimento
			JOIN usuario u ON u.id = a.id_cabeleireiro
			WHERE c.data_pagamento >= ? AND c.data_pagamento <= ? AND u.id = ?
			GROUP BY u.id, u.nome
			ORDER BY total DESC
		`, inicio, fim, idCab).Scan(&ranking)
	} else {
		h.DB.Raw(`
			SELECT u.nome, COUNT(c.id)::bigint AS atendimentos, COALESCE(SUM(c.valor), 0) AS total
			FROM caixa c
			JOIN atendimento a ON a.id = c.id_atendimento
			JOIN usuario u ON u.id = a.id_cabeleireiro
			WHERE c.data_pagamento >= ? AND c.data_pagamento <= ?
			GROUP BY u.id, u.nome
			ORDER BY total DESC
			LIMIT 50
		`, inicio, fim).Scan(&ranking)
	}

	c.JSON(http.StatusOK, gin.H{"ranking": ranking})
}

// helpers
func parseUint(s string) uint {
	var v uint
	_, _ = fmt.Sscan(s, &v)
	return v
}
