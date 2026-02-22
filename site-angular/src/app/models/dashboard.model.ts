export interface DashboardAdminResponse {
  faturamento_total: number;
  faturamento_anterior: number;
  percentual_vs_anterior?: number | null;
  grafico?: GraficoDiaItem[];
  grafico_series?: { label: string; cor: string; dados: GraficoDiaItem[] }[];
  ranking: RankingItem[];
  atividade_recente: AtividadeRecenteItem[];
  em_espera: number;
  ticket_medio: number;
  qtd_atendimentos_periodo: number;
}

export interface GraficoDiaItem {
  data: string;
  label: string;
  valor: number;
}

export interface RankingItem {
  nome: string;
  atendimentos: number;
  total: number;
}

export interface AtividadeRecenteItem {
  nome: string;
  valor: number;
  data: string;
  descricao: string;
  /** Ex.: "Crédito" ou "Débito" quando o pagamento foi com cartão */
  observacao?: string;
}

export interface RankingResponse {
  ranking: RankingItem[];
}

export interface NotificacaoItem {
  id: number;
  tipo: string;
  titulo: string;
  subtitulo?: string;
  detalhe?: string;
  tempo_atras: string;
  valor?: number;
  estoque?: number;
  id_atendimento?: number;
  id_produto?: number;
  /** Caminho ou URL da imagem do produto (quando notificação é de produto). */
  imagem_produto?: string;
  data_criacao?: string;
  lido: boolean;
}

export interface SaldoCaixaResponse {
  saldo: number;
}

export interface CabeleireiroItem {
  id: number;
  nome: string;
  perfil: string;
}

/** Usuário aguardando aprovação (GET /usuarios/solicitacoes) — DONO aprova ou desconsidera */
export interface SolicitacaoUsuario {
  id: number;
  nome: string;
  login: string;
  perfil: string;
  status: string;
}

export interface AtendimentoFiltroItem {
  id: number;
  id_cabeleireiro: number;
  id_fila: number;
  inicio: string;
  fim: string | null;
  status: string;
  nome_cliente?: string;
  total?: number;
}

export interface AgendaItem {
  id: number;
  data_cadastro: string;
  data_hora: string;
  id_cabeleireiro: number | null;
  id_cliente: number;
  id_servico: number | null;
  observacao: string;
  status: string;
  nomeCliente: string;
  cabeleireiro: string;
  servico_descricao?: string;
}

/** Item do histórico de atendimentos de um dia (GET /admin/atendimentos-dia) */
export interface AtendimentoDiaItem {
  id_atendimento: number;
  nome_cliente: string;
  data_hora: string;
  total: number;
  servicos?: string;
}

/** Detalhe de um atendimento (GET /atendimentos/:id/detalhe) — serviços e produtos */
export interface DetalheAtendimento {
  servicos: { descricao: string; valor: number }[];
  produtos: { descricao: string; quantidade: number; valor: number; subtotal: number }[];
}

/** Produto (GET /produtos) — para card Produtos em estoque */
export interface ProdutoEstoqueItem {
  id: number;
  descricao: string;
  valor_venda: number;
  estoque: number;
  ativo?: boolean;
  imagem?: string;
}

/** Serviço (GET /servicos) — para modal Serviços */
export interface ServicoItem {
  id: number;
  descricao: string;
  valor: number;
  icone?: string;
  imagem?: string;
  ativo?: boolean;
}
