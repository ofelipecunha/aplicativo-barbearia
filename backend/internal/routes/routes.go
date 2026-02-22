package routes

import (
	"barbearia-backend/internal/handlers"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Register(r *gin.Engine, db *gorm.DB) {
	h := &handlers.Handler{DB: db}

	api := r.Group("/api")
	{
		// auth
		api.POST("/auth/login", h.Login)

		// usuarios
		api.POST("/usuarios", h.CreateUsuario)
		api.GET("/usuarios/solicitacoes", h.ListSolicitacoes)
		api.GET("/usuarios", h.ListUsuarios)
		api.PATCH("/usuarios/:id/aprovacao", h.AprovarRejeitar)
		api.GET("/usuarios/:id/avatar", h.GetAvatar)
		api.GET("/usuarios/:id", h.GetUsuario)
		api.PATCH("/usuarios/:id", h.UpdateUsuario)
		api.DELETE("/usuarios/:id", h.DeleteUsuario)
		api.POST("/usuarios/:id/senha", h.AlterarSenha)
		api.POST("/usuarios/:id/avatar", h.UploadAvatar)

		// clientes
		api.POST("/clientes", h.CreateCliente)
		api.GET("/clientes", h.ListClientes)

		// fila
		api.POST("/fila", h.AddFila)
		api.GET("/fila", h.ListFilaStatus) // ?status=AGUARDANDO|EM_ATENDIMENTO|FINALIZADO
		api.PATCH("/fila/:id/status", h.UpdateFilaStatus)

		// agendamentos
		api.POST("/agendamentos", h.CreateAgendamento)
		api.GET("/agendamentos/agenda", h.ListAgendaFiltrado) // ?mes=YYYY-MM&id_cabeleireiro=&status=
		api.GET("/agendamentos", h.ListAgendamentos)         // ?data=YYYY-MM-DD
		api.PATCH("/agendamentos/:id", h.UpdateAgendamento)
		api.DELETE("/agendamentos/:id", h.DeleteAgendamento)

		// atendimento
		api.GET("/atendimentos", h.ListAtendimentosFiltrado)
		api.POST("/atendimentos/abrir", h.AbrirAtendimento)
		api.GET("/atendimentos/:id/detalhe", h.DetalheAtendimento)
		api.PATCH("/atendimentos/:id/encerrar", h.EncerrarAtendimento)

		// caixa (modelo com caixa_movimento: abertura/fechamento)
		api.POST("/caixa/abrir", h.AbrirCaixa)
		api.POST("/caixa/fechar", h.FecharCaixa)
		api.GET("/caixa/aberto", h.GetCaixaAberto)
		api.POST("/caixa", h.RegistrarPagamento)
		api.GET("/caixa/ultimos", h.ListUltimosLancamentos)
		api.GET("/caixa/saldo", h.SaldoDoDia)
		api.GET("/caixa/:id/detalhe", h.DetalheCaixa)
		api.POST("/caixa/sangria", h.RegistrarSangria)
		api.POST("/caixa/lancamento-manual", h.RegistrarLancamentoManual)

		// admin dashboard (acesso master)
		api.GET("/admin/dashboard", h.DashboardAdmin)
		api.GET("/admin/atendimentos-dia", h.ListAtendimentosDia)
		api.GET("/admin/ranking", h.RankingFiltrado)

		// relatorios e notificações
		api.GET("/recepcao/aguardando", h.ListAguardando)
		api.GET("/recepcao/encerrados", h.ListEncerradosComTotal)
		// recebimento (DONO/recepção): listar clientes aguardando para fazer o recebimento (mesma query de recepcao/aguardando)
		api.GET("/recebimento/aguardando", h.ListAguardando)
		api.GET("/notificacoes", h.ListNotificacoes)
		api.PATCH("/notificacoes/:id/lido", h.MarcarNotificacaoLida)

		// servicos e atendimento-servico
		api.POST("/servicos", h.CreateServico)
		api.GET("/servicos", h.ListServicos)
		api.PATCH("/servicos/:id", h.UpdateServico)
		api.DELETE("/servicos/:id", h.DeleteServico)
		api.POST("/atendimentos/:id/servicos", h.AddServicosAtendimento)
		api.POST("/atendimentos/:id/produtos", h.AddProdutosAtendimento)

		// produtos
		api.POST("/produtos", h.CreateProduto)
		api.GET("/produtos", h.ListProdutos)
		api.PATCH("/produtos/:id", h.UpdateProduto)
		api.DELETE("/produtos/:id", h.DeleteProduto)

		// upload de imagem (produto/serviço)
		api.POST("/upload", h.UploadImagem)
	}
}

