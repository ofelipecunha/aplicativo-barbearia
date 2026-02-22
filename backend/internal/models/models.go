package models

import "time"

type Cliente struct {
	ID           uint      `json:"id" gorm:"primaryKey;column:id"`
	Nome         string    `json:"nome" gorm:"column:nome"`
	Telefone     string    `json:"telefone" gorm:"column:telefone"`
	DataCadastro time.Time `json:"data_cadastro" gorm:"column:data_cadastro;autoCreateTime"`
}

func (Cliente) TableName() string { return "cliente" }

type Usuario struct {
	ID     uint   `json:"id" gorm:"primaryKey;column:id"`
	Nome   string `json:"nome" gorm:"column:nome"`
	Login  string `json:"login" gorm:"column:login;unique"`
	Senha  string `json:"senha" gorm:"column:senha"`
	Perfil string `json:"perfil" gorm:"column:perfil"`   // DONO, RECEPCAO, CABELEIREIRO
	Status string `json:"status" gorm:"column:status"`   // A=Aguardando, V=Validado, N=Não aprovado
	Ativo  bool   `json:"ativo" gorm:"column:ativo;default:true"`
	Avatar string `json:"avatar" gorm:"column:avatar;type:text"`
}

func (Usuario) TableName() string { return "usuario" }

type Agendamento struct {
	ID             uint       `json:"id" gorm:"primaryKey;column:id"`
	ClienteID      uint       `json:"id_cliente" gorm:"column:id_cliente"`
	ServicoID      *uint      `json:"id_servico" gorm:"column:id_servico"`
	CabeleireiroID *uint      `json:"id_cabeleireiro" gorm:"column:id_cabeleireiro"`
	DataHora       time.Time  `json:"data_hora" gorm:"column:data_hora"`
	Status         string     `json:"status" gorm:"column:status;default:AGENDADO"`
	Observacao     string     `json:"observacao" gorm:"column:observacao"`
	DataCadastro   time.Time  `json:"data_cadastro" gorm:"column:data_cadastro;autoCreateTime"`

	Cliente      Cliente  `json:"cliente" gorm:"foreignKey:ClienteID;references:ID"`
	Servico      *Servico `json:"servico,omitempty" gorm:"foreignKey:ServicoID;references:ID"`
	Cabeleireiro *Usuario `json:"cabeleireiro,omitempty" gorm:"foreignKey:CabeleireiroID;references:ID"`
}

func (Agendamento) TableName() string { return "agendamento" }

type FilaAtendimento struct {
	ID              uint       `json:"id" gorm:"primaryKey;column:id"`
	ClienteID       uint       `json:"id_cliente" gorm:"column:id_cliente"`
	AgendamentoID   *uint      `json:"id_agendamento" gorm:"column:id_agendamento"`
	CabeleireiroID  *uint      `json:"id_cabeleireiro" gorm:"column:id_cabeleireiro"` // quando setado, só esse cabeleireiro vê (ex.: agendamento do dia)
	Status          string     `json:"status" gorm:"column:status;default:AGUARDANDO"`
	DataEntrada     time.Time  `json:"data_entrada" gorm:"column:data_entrada;autoCreateTime"`

	Cliente     Cliente      `json:"cliente" gorm:"foreignKey:ClienteID;references:ID"`
	Agendamento *Agendamento `json:"agendamento,omitempty" gorm:"foreignKey:AgendamentoID;references:ID"`
}

func (FilaAtendimento) TableName() string { return "fila_atendimento" }

type Atendimento struct {
	ID             uint       `json:"id" gorm:"primaryKey;column:id"`
	FilaID         uint       `json:"id_fila" gorm:"column:id_fila"`
	CabeleireiroID uint       `json:"id_cabeleireiro" gorm:"column:id_cabeleireiro"`
	Inicio         time.Time  `json:"inicio" gorm:"column:inicio;autoCreateTime"`
	Fim            *time.Time `json:"fim" gorm:"column:fim"`
	Status         string     `json:"status" gorm:"column:status;default:ABERTO"`

	Fila         FilaAtendimento `json:"fila" gorm:"foreignKey:FilaID;references:ID"`
	Cabeleireiro Usuario         `json:"cabeleireiro" gorm:"foreignKey:CabeleireiroID;references:ID"`
}

func (Atendimento) TableName() string { return "atendimento" }

// CaixaMovimento — espinha dorsal: abertura/fechamento do caixa. Status: ABERTO | FECHADO.
type CaixaMovimento struct {
	ID             uint       `json:"id" gorm:"primaryKey;column:id"`
	DataAbertura   time.Time  `json:"data_abertura" gorm:"column:data_abertura;autoCreateTime"`
	DataFechamento *time.Time `json:"data_fechamento" gorm:"column:data_fechamento"`
	ValorAbertura  float64    `json:"valor_abertura" gorm:"column:valor_abertura;not null"`
	ValorFechamento *float64  `json:"valor_fechamento" gorm:"column:valor_fechamento"`
	Status         string     `json:"status" gorm:"column:status;default:ABERTO"` // ABERTO | FECHADO
	Observacao     string     `json:"observacao" gorm:"column:observacao"`
	UsuarioID      *uint      `json:"id_usuario" gorm:"column:id_usuario"`
}

func (CaixaMovimento) TableName() string { return "caixa_movimento" }

type Caixa struct {
	ID               uint       `json:"id" gorm:"primaryKey;column:id"`
	CaixaMovimentoID uint       `json:"id_caixa_movimento" gorm:"column:id_caixa_movimento;not null"`
	AtendimentoID    *uint      `json:"id_atendimento,omitempty" gorm:"column:id_atendimento"`
	Valor            float64    `json:"valor" gorm:"column:valor"`
	TipoPagamento    string     `json:"tipo_pagamento" gorm:"column:tipo_pagamento"`
	TipoMovimentacao string     `json:"tipo_movimentacao" gorm:"column:tipo_movimentacao;default:RECEBIMENTO"`
	Operacao         string     `json:"operacao" gorm:"column:operacao;default:E"`
	UsuarioID        *uint      `json:"id_usuario,omitempty" gorm:"column:id_usuario"`
	Descricao        string     `json:"descricao" gorm:"column:descricao;size:255"`
	Observacao       string     `json:"observacao" gorm:"column:observacao"`
	DataPagamento    time.Time  `json:"data_pagamento" gorm:"column:data_pagamento;autoCreateTime"`
}

func (Caixa) TableName() string { return "caixa" }

type Servico struct {
	ID        uint   `json:"id" gorm:"primaryKey;column:id"`
	Descricao string `json:"descricao" gorm:"column:descricao"`
	Valor     float64 `json:"valor" gorm:"column:valor"`
	Icone     string `json:"icone" gorm:"column:icone"`
	Imagem    string `json:"imagem" gorm:"column:imagem;size:500"`
	Ativo     bool   `json:"ativo" gorm:"column:ativo;default:true"`
}

func (Servico) TableName() string { return "servico" }

type Produto struct {
	ID           uint      `json:"id" gorm:"primaryKey;column:id"`
	Descricao    string    `json:"descricao" gorm:"column:descricao"`
	ValorVenda   float64   `json:"valor_venda" gorm:"column:valor_venda"`
	ValorCusto   *float64  `json:"valor_custo" gorm:"column:valor_custo"`
	Estoque      int       `json:"estoque" gorm:"column:estoque;default:0"`
	Icone        string    `json:"icone" gorm:"column:icone"`
	Imagem       string    `json:"imagem" gorm:"column:imagem;size:500"`
	Ativo        bool      `json:"ativo" gorm:"column:ativo;default:true"`
	DataCadastro time.Time `json:"data_cadastro" gorm:"column:data_cadastro;autoCreateTime"`
}

func (Produto) TableName() string { return "produto" }

type AtendimentoServico struct {
	ID            uint    `json:"id" gorm:"primaryKey;column:id"`
	AtendimentoID uint    `json:"id_atendimento" gorm:"column:id_atendimento"`
	ServicoID     uint    `json:"id_servico" gorm:"column:id_servico"`
	Valor         float64 `json:"valor" gorm:"column:valor"`
}

func (AtendimentoServico) TableName() string { return "atendimento_servico" }

type AtendimentoProduto struct {
	ID            uint    `json:"id" gorm:"primaryKey;column:id"`
	AtendimentoID uint    `json:"id_atendimento" gorm:"column:id_atendimento"`
	ProdutoID     uint    `json:"id_produto" gorm:"column:id_produto"`
	Quantidade    int     `json:"quantidade" gorm:"column:quantidade"`
	Valor         float64 `json:"valor" gorm:"column:valor"`
}

func (AtendimentoProduto) TableName() string { return "atendimento_produto" }

type CaixaSangria struct {
	ID               uint      `json:"id" gorm:"primaryKey;column:id"`
	CaixaMovimentoID uint      `json:"id_caixa_movimento" gorm:"column:id_caixa_movimento;not null"`
	DataSangria      time.Time `json:"data_sangria" gorm:"column:data_sangria;autoCreateTime"`
	Valor            float64   `json:"valor" gorm:"column:valor"`
	Observacao       string    `json:"observacao" gorm:"column:observacao"`
}

func (CaixaSangria) TableName() string { return "caixa_sangria" }

// Notificacao — RECEBIMENTO (RECEPCAO) | REABASTECER (RECEPCAO) | AGUARDANDO (CABELEIREIRO)
type Notificacao struct {
	ID             uint       `json:"id" gorm:"primaryKey;column:id"`
	Tipo           string     `json:"tipo" gorm:"column:tipo"`
	Titulo         string     `json:"titulo" gorm:"column:titulo"`
	Subtitulo      string     `json:"subtitulo" gorm:"column:subtitulo"`
	Detalhe        string     `json:"detalhe" gorm:"column:detalhe"`
	Valor          *float64   `json:"valor" gorm:"column:valor"`
	Estoque        *int       `json:"estoque" gorm:"column:estoque"`
	AtendimentoID  *uint      `json:"id_atendimento" gorm:"column:id_atendimento"`
	AgendamentoID    *uint      `json:"id_agendamento" gorm:"column:id_agendamento"`
	ProdutoID        *uint      `json:"id_produto" gorm:"column:id_produto"`
	UsuarioDestinoID *uint      `json:"id_usuario_destino" gorm:"column:id_usuario_destino"` // quando setado, só esse usuário vê (ex.: CABELEIREIRO vê só suas agendas)
	PerfilDestino    string     `json:"perfil_destino" gorm:"column:perfil_destino"`         // RECEPCAO | CABELEIREIRO
	Lido             bool       `json:"lido" gorm:"column:lido;default:false"`
	DataCriacao      time.Time  `json:"data_criacao" gorm:"column:data_criacao;autoCreateTime"`
}

func (Notificacao) TableName() string { return "notificacao" }
