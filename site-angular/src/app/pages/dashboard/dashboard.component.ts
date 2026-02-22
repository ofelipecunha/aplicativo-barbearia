import { Component, OnInit, OnDestroy, computed, signal, HostListener, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { format, parseISO, subDays, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, isSameMonth, getDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { MessageService } from 'primeng/api';

import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { BrlCurrencyDirective } from '../../directives/brl-currency.directive';
import { environment } from '../../../environments/environment';
import { AgendamentoApi, AgendamentoExibicao } from '../../models/agendamento.model';
import {
  DashboardAdminResponse,
  GraficoDiaItem,
  RankingItem,
  AtividadeRecenteItem,
  NotificacaoItem,
  CabeleireiroItem,
  SolicitacaoUsuario,
  AtendimentoFiltroItem,
  AgendaItem,
  AtendimentoDiaItem,
  DetalheAtendimento,
  ProdutoEstoqueItem,
  ServicoItem,
} from '../../models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ReactiveFormsModule, FormsModule, BrlCurrencyDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  user = this.auth.user;

  // Dados do dashboard admin (período 30d)
  dashboard = signal<DashboardAdminResponse | null>(null);
  // Receita do dia (período 1)
  receitaDia = signal<number>(0);
  percentualDia = signal<number | null>(null);
  // Saldo caixa (valor em caixa em tempo real)
  saldoCaixa = signal<number>(0);
  // Caixa aberto (abertura do dia — para mostrar no card)
  caixaAberto = signal<{ valor_abertura: number } | null>(null);
  // Agendamentos de hoje
  agendamentosHoje = signal<AgendamentoExibicao[]>([]);
  // Notificações (alertas estoque + atividade)
  notificacoes = signal<NotificacaoItem[]>([]);

  // Modal de notificações
  notificacoesModalOpen = signal(false);
  notificacoesCarregando = signal(false);

  // Modal Solicitação de Usuários (DONO)
  solicitacoesModalOpen = signal(false);
  solicitacoesList = signal<SolicitacaoUsuario[]>([]);
  solicitacoesCarregando = signal(false);
  /** ID do usuário em que está sendo executada ação (aprovar/desconsiderar) para desabilitar botões */
  solicitacaoAcaoId = signal<number | null>(null);

  // Notificação de recebimento (somente web)
  recebimentoNotificacao = signal<NotificacaoItem | null>(null);
  recebimentoModalOpen = signal(false);
  tipoPagamentoRecebimento = signal<string>('DINHEIRO');
  recebimentoCarregando = signal(false);
  recebimentoErro = signal<string>('');
  recebimentoDetalhe = signal<DetalheAtendimento | null>(null);
  recebimentoDetalheCarregando = signal(false);

  private recebimentoIntervalId: any | null = null;
  private ultimoRecebimentoNotificacaoId: number | null = null;

  /** Polling de notificações SOLICITACAO_USUARIO para DONO: exibir toast quando alguém se cadastra */
  private solicitacaoIntervalId: ReturnType<typeof setInterval> | null = null;
  private ultimoSolicitacaoNotificacaoId: number | null = null;
  private ultimoLancamentoNotificacaoId: number | null = null;
  private ultimoClienteNaFilaNotificacaoId: number | null = null;

  loading = signal(true);

  // Filtro do card FATURAMENTO TOTAL (data início / data fim)
  faturamentoFiltroOpen = signal(false);
  faturamentoDataInicio = signal<string>('');
  faturamentoDataFim = signal<string>('');
  /** Valor exibido no card quando há filtro aplicado; null = usa fluxoCaixaTotal (período do gráfico) */
  faturamentoTotalFiltrado = signal<number | null>(null);
  /** Resposta completa do dashboard pelo filtro de data (usada no Gráfico e Cabeleireiros quando o filtro está aplicado) */
  dashboardFiltroFaturamento = signal<DashboardAdminResponse | null>(null);
  faturamentoFiltroCarregando = signal(false);
  /** Posição do painel do filtro (abaixo do botão) */
  faturamentoPanelTop = signal(0);
  faturamentoPanelLeft = signal(0);

  @ViewChild('faturamentoFiltroBtn') faturamentoFiltroBtn?: ElementRef<HTMLButtonElement>;

  // Gráfico Atendimentos: dados separados do dashboard geral (período configurável)
  dashboardGrafico = signal<DashboardAdminResponse | null>(null);
  chartPeriodo = signal<number>(15); // Inicia em 15 dias para ver o dia atual
  chartDataInicio = signal<string>('');
  chartDataFim = signal<string>('');
  chartFiltroOpen = signal(false);

  // Produtos em estoque (card que substitui Estimativa)
  produtosEstoque = signal<ProdutoEstoqueItem[]>([]);
  searchProduto = signal<string>('');

  // (mantido para compatibilidade com código legado da estimativa)
  estimativaPeriodo = signal<number>(15);

  /** Modal movimentações do caixa (ao clicar no card CAIXA DO DIA) — mesma chamada do dashboard-recepcao */
  movimentacoesCaixaModalOpen = signal(false);
  listaMovimentacoesCaixa = signal<{ id: number; tipo: string; nome?: string; valor: number; data: string; tipo_pagamento?: string; observacao?: string }[]>([]);
  carregandoMovimentacoesCaixa = signal(false);

  /** Sidebar: Caixa expandível (sub-itens abrem as mesmas modais do card CAIXA DO DIA da recepção) */
  caixaOpen = signal(false);
  /** Modal Abertura de Caixa */
  aberturaCaixaModalOpen = signal(false);
  aberturaCaixaForm!: FormGroup;
  aberturaCaixaErro = signal('');
  aberturaCaixaSalvando = signal(false);
  /** Modal Lançamento Manual */
  lancamentoManualModalOpen = signal(false);
  lancamentoManualForm!: FormGroup;
  lancamentoManualErro = signal('');
  lancamentoManualSalvando = signal(false);
  /** Modal Sangria */
  sangriaModalOpen = signal(false);
  sangriaForm!: FormGroup;
  sangriaErro = signal('');
  sangriaSalvando = signal(false);
  /** Modal Encerrar Caixa */
  encerrarCaixaModalOpen = signal(false);
  encerrarCaixaForm!: FormGroup;
  encerrarCaixaErro = signal('');
  encerrarCaixaSalvando = signal(false);
  /** Modal Recebimento (lista de encerrados) */
  recebimentoListaModalOpen = signal(false);
  carregandoEncerrados = signal(false);
  listaEncerrados = signal<{ id_atendimento: number; nome?: string; total: number }[]>([]);
  selectedEncerradoParaRec = signal<{ id_atendimento: number; nome?: string; total: number } | null>(null);

  // Modal atendimentos do dia (ao clicar em um dia do gráfico)
  atendimentosDiaModalOpen = signal(false);
  dataSelecionadaAtendimentos = signal<string>('');
  listaAtendimentosDia = signal<AtendimentoDiaItem[]>([]);
  carregandoAtendimentosDia = signal(false);
  /** ID do atendimento cujo detalhe (serviços/produtos) está expandido no modal */
  atendimentoExpandidoId = signal<number | null>(null);
  /** Cache de detalhes por id_atendimento (GET /atendimentos/:id/detalhe) */
  detalheAtendimentoMap = signal<Record<number, DetalheAtendimento>>({});
  /** ID do atendimento cujo detalhe está sendo carregado */
  carregandoDetalheId = signal<number | null>(null);

  // Filtro de atendimentos
  filterPanelOpen = signal(false);
  cabeleireiros = signal<CabeleireiroItem[]>([]);
  atendimentosFiltrados = signal<AtendimentoFiltroItem[]>([]);
  filterForm: FormGroup;

  // Filtro do painel Cabeleireiros (mês + cabeleireiro)
  profFiltroOpen = signal(false);
  profFiltroForm: FormGroup;
  /** Dashboard carregado ao aplicar filtro no painel Cabeleireiros; quando null, usa dashboard() */
  dashboardCabeleireiros = signal<DashboardAdminResponse | null>(null);
  profFiltroCarregando = signal(false);
  /** Modal "Ver todos" os cabeleireiros */
  modalVerTodosCabeleireirosOpen = signal(false);

  // Agenda (card): filtro + lista em tabela
  agendaFiltroOpen = signal(false);
  agendaLista = signal<AgendaItem[]>([]);
  agendaFiltroForm: FormGroup;
  /** Agenda do mês atual (sempre para o card de AGENDAMENTOS) */
  agendaListaMesAtual = signal<AgendaItem[]>([]);
  /** Primeiras 5 linhas para o card */
  agendaListaCard = computed(() => this.agendaLista().slice(0, 5));
  agendaModalOpen = signal(false);
  /** Mês exibido no calendário do modal (YYYY-MM) */
  agendaCalendarMes = signal(format(new Date(), 'yyyy-MM'));
  /** Lista de agendamentos do mês do calendário (para marcar dias em verde) */
  agendaListaCalendario = signal<AgendaItem[]>([]);
  /** Data selecionada no calendário (YYYY-MM-DD) para exibir agendamentos do dia */
  agendaDiaSelecionado = signal<string | null>(null);

  // Relatórios na sidebar (expandível)
  relatoriosOpen = signal(false);
  modalRelatorioProdutosOpen = signal(false);
  relatorioProdutosList = signal<ProdutoEstoqueItem[]>([]);
  relatorioProdutoId = signal<number | null>(null);
  carregandoRelatorioProdutos = signal(false);
  relatorioAtivo = signal<string>(''); // '' = Todos, 'true' = Ativo, 'false' = Inativo

  /** Relatório de Atendimentos: modal com filtros Data Início, Data Final, Nome, Cabeleireiro */
  modalRelatorioAtendimentosOpen = signal(false);
  relatorioAtendimentosForm!: FormGroup;
  listaRelatorioAtendimentos = signal<AtendimentoFiltroItem[]>([]);
  carregandoRelatorioAtendimentos = signal(false);
  cabeleireirosRelatorio = signal<CabeleireiroItem[]>([]);

  /** Relatório de Agenda: modal com filtros Data Início, Data Final, Nome, Vendedor (Cabeleireiro) */
  modalRelatorioAgendaOpen = signal(false);
  relatorioAgendaForm!: FormGroup;
  listaRelatorioAgenda = signal<AgendaItem[]>([]);
  carregandoRelatorioAgenda = signal(false);
  cabeleireirosRelatorioAgenda = signal<CabeleireiroItem[]>([]);

  /** Relatório de Cabeleireiros: modal com filtros Cabeleireiro (dropdown), Data Início, Data Final */
  modalRelatorioCabeleireirosOpen = signal(false);
  relatorioCabeleireirosForm!: FormGroup;
  listaRelatorioCabeleireiros = signal<RankingItem[]>([]);
  carregandoRelatorioCabeleireiros = signal(false);
  cabeleireirosRelatorioCabeleireiros = signal<CabeleireiroItem[]>([]);

  // —— Modais da sidebar (DONO): Produtos, Serviços, Agenda ——
  modalProdutosOpen = signal(false);
  searchProdutoModal = signal('');
  produtosListModal = signal<ProdutoEstoqueItem[]>([]);
  produtoForm: FormGroup;
  produtoEditId = signal<number | null>(null);
  produtoFormModalOpen = signal(false);
  produtoSalvando = signal(false);
  produtoErro = signal('');
  valorVendaMask = signal('');

  modalServicosOpen = signal(false);
  searchServicoModal = signal('');
  servicosList = signal<ServicoItem[]>([]);
  servicoForm: FormGroup;
  servicoEditId = signal<number | null>(null);
  servicoFormModalOpen = signal(false);
  servicoSalvando = signal(false);
  servicoErro = signal('');

  modalAgendaOpen = signal(false);
  agendaModalMes = signal(format(new Date(), 'yyyy-MM'));
  agendaSearchCliente = signal('');
  agendaListaModal = signal<AgendaItem[]>([]);
  modalNovoAgendamentoOpen = signal(false);
  /** ID do agendamento em edição; null = novo */
  agendaEditId = signal<number | null>(null);
  agendamentoForm: FormGroup;
  clientesList = signal<{ id: number; nome: string }[]>([]);
  servicosListAgenda = signal<ServicoItem[]>([]);
  agendamentoSalvando = signal(false);
  agendamentoErro = signal('');

  // Modal Configurações (Dados Pessoais + Segurança e Senha)
  configModalOpen = signal(false);
  /** 'menu' | 'dados' | 'senha' */
  configSubView = signal<'menu' | 'dados' | 'senha'>('menu');
  configDadosForm!: FormGroup;
  configSenhaForm!: FormGroup;
  configDadosLoading = signal(false);
  configDadosErro = signal('');
  configSenhaLoading = signal(false);
  configSenhaErro = signal('');
  configUsuarioLogin = signal('');
  configUsuarioPerfil = signal('');
  avatarUploading = signal(false);

  // Modal Novo Cliente (header + Cliente): apenas Nome, Salvar e Cancelar — mesmo endpoint do app
  modalNovoClienteOpen = signal(false);
  clienteForm!: FormGroup;
  clienteSalvando = signal(false);
  clienteErro = signal('');

  constructor(
    public auth: AuthService,
    private api: ApiService,
    private fb: FormBuilder,
    private message: MessageService,
  ) {
    const hoje = new Date();
    // Gráfico Atendimentos: inicia com últimos 15 dias
    const quinzeDiasAtras = subDays(hoje, 14);
    this.chartDataInicio.set(format(quinzeDiasAtras, 'yyyy-MM-dd'));
    this.chartDataFim.set(format(hoje, 'yyyy-MM-dd'));
    const trintaDiasAtras = subDays(hoje, 29); // para filterForm (painel Atendimentos)
    this.filterForm = this.fb.group({
      data_inicio: [format(trintaDiasAtras, 'yyyy-MM-dd')],
      data_fim: [format(hoje, 'yyyy-MM-dd')],
      status: [''],
      id_cabeleireiro: [''],
    });
    this.agendaFiltroForm = this.fb.group({
      mes: [format(hoje, 'yyyy-MM')],
      id_cabeleireiro: [''],
      status: [''],
    });
    this.profFiltroForm = this.fb.group({
      mes: [format(hoje, 'yyyy-MM')],
      id_cabeleireiro: [''],
    });
    this.produtoForm = this.fb.group({
      descricao: ['', Validators.required],
      valor_venda: [0, [Validators.required, Validators.min(0)]],
      estoque: [0, [Validators.required, Validators.min(0)]],
      imagem: [''],
    });
    this.servicoForm = this.fb.group({
      descricao: ['', Validators.required],
      valor: [0, [Validators.required, Validators.min(0)]],
      imagem: [''],
    });
    const hojeStr = format(hoje, 'yyyy-MM-dd');
    this.agendamentoForm = this.fb.group({
      nome_cliente: ['', Validators.required],
      data: [hojeStr, Validators.required],
      hora: ['09:00', Validators.required],
      id_servico: [null as number | null],
      id_cabeleireiro: [null as number | null],
      observacao: [''],
      id_cliente: [null as number | null], // usado na edição (PATCH)
    });
    this.configDadosForm = this.fb.group({
      nome: [this.auth.user()?.nome ?? '', Validators.required],
    });
    this.configSenhaForm = this.fb.group({
      senha_atual: ['', Validators.required],
      nova_senha: ['', [Validators.required, Validators.minLength(4)]],
      confirmar: ['', Validators.required],
    });
    this.clienteForm = this.fb.group({
      nome: ['', Validators.required],
    });
    this.lancamentoManualForm = this.fb.group({
      descricao: [''],
      valor: [0, [Validators.required, Validators.min(0.01)]],
    });
    this.sangriaForm = this.fb.group({
      valor: [0, [Validators.required, Validators.min(0.01)]],
      observacao: [''],
    });
    this.encerrarCaixaForm = this.fb.group({
      observacao: [''],
    });
    this.aberturaCaixaForm = this.fb.group({
      valor_abertura: [0, [Validators.required, Validators.min(0)]],
      observacao: [''],
    });
    const hojeRel = new Date();
    const inicioMesRel = startOfMonth(hojeRel);
    this.relatorioAtendimentosForm = this.fb.group({
      data_inicio: [format(inicioMesRel, 'yyyy-MM-dd')],
      data_fim: [format(hojeRel, 'yyyy-MM-dd')],
      nome: [''],
      id_cabeleireiro: [''],
    });
    this.relatorioAgendaForm = this.fb.group({
      data_inicio: [format(inicioMesRel, 'yyyy-MM-dd')],
      data_fim: [format(hojeRel, 'yyyy-MM-dd')],
      nome: [''],
      id_cabeleireiro: [''], // Vendedor
    });
    this.relatorioCabeleireirosForm = this.fb.group({
      id_cabeleireiro: [''],
      data_inicio: [format(inicioMesRel, 'yyyy-MM-dd')],
      data_fim: [format(hojeRel, 'yyyy-MM-dd')],
    });
  }

  ngOnInit(): void {
    this.iniciarFiltroFaturamentoMesAtual();
    this.carregarTudo();
    this.carregarGraficoAtendimentos();
    this.carregarCabeleireiros();
    this.carregarAgenda();
    this.carregarProdutos();
    this.iniciarMonitorRecebimentos();
    this.iniciarMonitorSolicitacoes();
  }

  ngOnDestroy(): void {
    if (this.recebimentoIntervalId) {
      clearInterval(this.recebimentoIntervalId);
      this.recebimentoIntervalId = null;
    }
    if (this.solicitacaoIntervalId) {
      clearInterval(this.solicitacaoIntervalId);
      this.solicitacaoIntervalId = null;
    }
  }

  toggleAgendaFiltro(): void {
    this.agendaFiltroOpen.update((v) => !v);
  }

  toggleProfFiltro(): void {
    this.profFiltroOpen.update((v) => !v);
  }

  abrirModalVerTodosCabeleireiros(): void {
    this.modalVerTodosCabeleireirosOpen.set(true);
  }

  fecharModalVerTodosCabeleireiros(): void {
    this.modalVerTodosCabeleireirosOpen.set(false);
  }

  /** Aplica filtro do painel Cabeleireiros: mês e cabeleireiro, e recarrega ranking */
  aplicarProfFiltro(): void {
    const v = this.profFiltroForm.value;
    const mes = (v.mes || format(new Date(), 'yyyy-MM')) as string;
    const idCabeleireiro = v.id_cabeleireiro ? String(v.id_cabeleireiro) : '';
    this.profFiltroCarregando.set(true);
    const params: Record<string, string> = { mes };
    if (idCabeleireiro) params['id_cabeleireiro'] = idCabeleireiro;
    this.api.get<DashboardAdminResponse>('/admin/dashboard', params).subscribe({
      next: (data) => {
        this.dashboardCabeleireiros.set(data);
        this.profFiltroCarregando.set(false);
        this.profFiltroOpen.set(false);
      },
      error: () => this.profFiltroCarregando.set(false),
    });
  }

  openAgendaModal(): void {
    this.agendaCalendarMes.set(format(new Date(), 'yyyy-MM'));
    this.carregarAgendaCalendario();
    this.agendaModalOpen.set(true);
  }

  closeAgendaModal(): void {
    this.agendaModalOpen.set(false);
    this.agendaDiaSelecionado.set(null);
  }

  /** Carrega agendamentos do mês para o calendário (dias em verde) */
  carregarAgendaCalendario(): void {
    const mes = this.agendaCalendarMes();
    this.api.get<AgendaItem[]>('/agendamentos/agenda', { mes }).subscribe({
      next: (list) => this.agendaListaCalendario.set(list ?? []),
      error: () => this.agendaListaCalendario.set([]),
    });
  }

  /** Conjunto de datas (YYYY-MM-DD) que têm agendamento no mês do calendário */
  diasComAgendamento = computed(() => {
    const list = this.agendaListaCalendario();
    const set = new Set<string>();
    list.forEach((a) => {
      if (a.data_hora) {
        try {
          const d = typeof a.data_hora === 'string' ? parseISO(a.data_hora) : new Date(a.data_hora);
          set.add(format(d, 'yyyy-MM-dd'));
        } catch {
          // ignore
        }
      }
    });
    return set;
  });

  /** Dias para exibir no grid do calendário (inclui dias do mês anterior/seguinte para completar semanas) */
  agendaCalendarioDias = computed(() => {
    const mesStr = this.agendaCalendarMes();
    const [y, m] = mesStr.split('-').map(Number);
    const inicio = startOfMonth(new Date(y, m - 1, 1));
    const fim = endOfMonth(inicio);
    const primeiroDia = getDay(inicio);
    const diasNoMes = fim.getDate();
    const inicioGrid = subDays(inicio, primeiroDia);
    const totalCells = Math.ceil((primeiroDia + diasNoMes) / 7) * 7;
    const dias: { data: Date; dia: number; isCurrentMonth: boolean; dataStr: string }[] = [];
    for (let i = 0; i < totalCells; i++) {
      const d = new Date(inicioGrid.getFullYear(), inicioGrid.getMonth(), inicioGrid.getDate() + i);
      dias.push({
        data: d,
        dia: d.getDate(),
        isCurrentMonth: isSameMonth(d, inicio),
        dataStr: format(d, 'yyyy-MM-dd'),
      });
    }
    return dias;
  });

  /** Navega o mês do calendário (delta: -1 ou 1) */
  navegarMesCalendario(delta: number): void {
    const [y, m] = this.agendaCalendarMes().split('-').map(Number);
    const d = new Date(y, m - 1, 1);
    const novo = delta < 0 ? subMonths(d, 1) : addMonths(d, 1);
    this.agendaCalendarMes.set(format(novo, 'yyyy-MM'));
    this.carregarAgendaCalendario();
  }

  /** Retorna se a data (Date) tem agendamento */
  diaTemAgendamento(data: Date): boolean {
    return this.diasComAgendamento().has(format(data, 'yyyy-MM-dd'));
  }

  /** Nome do mês/ano para o título do calendário */
  agendaCalendarioTitulo = computed(() => {
    const mesStr = this.agendaCalendarMes();
    const [y, m] = mesStr.split('-').map(Number);
    const d = new Date(y, m - 1, 1);
    return format(d, 'MMMM yyyy', { locale: ptBR });
  });

  /** Agendamentos do dia selecionado no calendário (cliente, data/hora, cabeleireiro), ordenados por horário */
  agendamentosDoDiaSelecionado = computed(() => {
    const dataStr = this.agendaDiaSelecionado();
    if (!dataStr) return [];
    const list = this.agendaListaCalendario();
    const filtrados = list.filter((a) => {
      if (!a.data_hora) return false;
      try {
        const d = typeof a.data_hora === 'string' ? parseISO(a.data_hora) : new Date(a.data_hora);
        return format(d, 'yyyy-MM-dd') === dataStr;
      } catch {
        return false;
      }
    });
    return filtrados.slice().sort((a, b) => {
      const da = a.data_hora ? (typeof a.data_hora === 'string' ? parseISO(a.data_hora).getTime() : new Date(a.data_hora).getTime()) : 0;
      const db = b.data_hora ? (typeof b.data_hora === 'string' ? parseISO(b.data_hora).getTime() : new Date(b.data_hora).getTime()) : 0;
      return da - db;
    });
  });

  /** Data do dia selecionado formatada para exibição (ex.: 02/02/2026) */
  agendaDiaSelecionadoFormatado = computed(() => {
    const dataStr = this.agendaDiaSelecionado();
    if (!dataStr) return '';
    try {
      const d = parseISO(dataStr);
      return format(d, 'dd/MM/yyyy', { locale: ptBR });
    } catch {
      return dataStr;
    }
  });

  selecionarDiaCalendario(data: Date, isCurrentMonth: boolean): void {
    if (!isCurrentMonth) return;
    this.agendaDiaSelecionado.set(format(data, 'yyyy-MM-dd'));
  }

  fecharDiaSelecionado(): void {
    this.agendaDiaSelecionado.set(null);
  }

  carregarAgenda(): void {
    const v = this.agendaFiltroForm.value;
    const params: Record<string, string> = {};
    params['mes'] = v.mes || format(new Date(), 'yyyy-MM');
    if (v.id_cabeleireiro) params['id_cabeleireiro'] = String(v.id_cabeleireiro);
    if (v.status) params['status'] = v.status;
    this.api.get<AgendaItem[]>('/agendamentos/agenda', params).subscribe({
      next: (list) => this.agendaLista.set(list ?? []),
      error: () => this.agendaLista.set([]),
    });
  }

  aplicarAgendaFiltro(): void {
    this.carregarAgenda();
    this.agendaFiltroOpen.set(false);
  }

  // —— Sidebar: abrir modais ——
  abrirModalProdutos(): void {
    this.modalProdutosOpen.set(true);
    this.searchProdutoModal.set('');
    this.produtoErro.set('');
    this.carregarProdutosModal();
  }

  fecharModalProdutos(): void {
    this.modalProdutosOpen.set(false);
  }

  abrirModalRelatorioProdutos(): void {
    this.modalRelatorioProdutosOpen.set(true);
    this.relatorioProdutoId.set(null);
    this.relatorioAtivo.set('');
    this.api.get<ProdutoEstoqueItem[]>('/produtos', { todos: '1' }).subscribe({
      next: (list) => this.relatorioProdutosList.set(list ?? []),
      error: () => this.relatorioProdutosList.set([]),
    });
  }

  fecharModalRelatorioProdutos(): void {
    this.modalRelatorioProdutosOpen.set(false);
  }

  pesquisarRelatorioProdutos(): void {
    this.carregandoRelatorioProdutos.set(true);
    this.api.get<ProdutoEstoqueItem[]>('/produtos', { todos: '1' }).subscribe({
      next: (list) => {
        this.relatorioProdutosList.set(list ?? []);
        this.carregandoRelatorioProdutos.set(false);
      },
      error: () => {
        this.relatorioProdutosList.set([]);
        this.carregandoRelatorioProdutos.set(false);
      },
    });
  }

  /** Lista de produtos filtrada para o relatório (dropdown + ativo) */
  relatorioProdutosFiltrados = computed(() => {
    const lista = this.relatorioProdutosList();
    const idProd = this.relatorioProdutoId();
    const ativo = this.relatorioAtivo();
    let f = lista;
    if (idProd != null) f = f.filter((p) => p.id === idProd);
    if (ativo === 'true') f = f.filter((p) => p.ativo !== false);
    if (ativo === 'false') f = f.filter((p) => p.ativo === false);
    return f;
  });

  private gerarHtmlRelatorioProdutos(autoPrint: boolean): string {
    const produtos = this.relatorioProdutosFiltrados();
    const dataGeracao = format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
    const printScript = autoPrint ? '<script>window.onload = function() { window.print(); window.close(); }</script>' : '';
    const logoUrl = typeof window !== 'undefined' && window.location ? window.location.origin + '/assets/logoWl.png' : '/assets/logoWl.png';
    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Relatório de Produtos em Estoque</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', system-ui, sans-serif; padding: 32px; color: #1a1a1a; background: #fff; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; gap: 24px; margin-bottom: 28px; padding-bottom: 20px; border-bottom: 3px solid #ff9000; }
    .header-left { flex: 1; min-width: 0; }
    .header h1 { font-size: 1.75rem; font-weight: 700; color: #1a1a1a; }
    .header .sub { font-size: 0.9rem; color: #666; margin-top: 6px; }
    .header-logo { flex-shrink: 0; }
    .header-logo img { max-height: 56px; width: auto; object-fit: contain; display: block; }
    table { width: 100%; border-collapse: collapse; font-size: 0.95rem; }
    thead { background: #1a1a1a; color: #fff; }
    th { text-align: left; padding: 14px 16px; font-weight: 600; }
    td { padding: 12px 16px; border-bottom: 1px solid #e5e5e5; }
    tbody tr:nth-child(even) { background: #f9f9f9; }
    tbody tr:hover { background: #f0f0f0; }
    .qtd { text-align: right; font-weight: 600; color: #ff9000; }
    .status { display: inline-block; padding: 4px 10px; border-radius: 6px; font-size: 0.8rem; font-weight: 600; }
    .status.ativo { background: #dcfce7; color: #166534; }
    .status.inativo { background: #fee2e2; color: #991b1b; }
    .footer { margin-top: 28px; font-size: 0.85rem; color: #737373; }
  </style>
</head>
<body>
  <div class="header">
    <div class="header-left">
      <h1>Relatório de Produtos em Estoque</h1>
      <div class="sub">Gerado em ${dataGeracao} · Wender Barbearia</div>
    </div>
    <div class="header-logo">
      <img src="${logoUrl}" alt="Wender Barbearia" />
    </div>
  </div>
  <table>
    <thead>
      <tr><th>Descrição</th><th class="qtd">Quantidade</th><th>Status</th></tr>
    </thead>
    <tbody>
      ${produtos.map((p) => `<tr><td>${(p.descricao || '—').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}</td><td class="qtd">${p.estoque ?? 0}</td><td><span class="status ${p.ativo !== false ? 'ativo' : 'inativo'}">${p.ativo !== false ? 'Ativo' : 'Inativo'}</span></td></tr>`).join('')}
    </tbody>
  </table>
  <div class="footer">Total: ${produtos.length} produto(s)</div>
  ${printScript}
</body>
</html>`;
  }

  visualizarRelatorioProdutos(): void {
    const html = this.gerarHtmlRelatorioProdutos(false);
    const janela = window.open('', '_blank');
    if (janela) {
      janela.document.write(html);
      janela.document.close();
    }
  }

  imprimirRelatorioProdutosPDF(): void {
    const html = this.gerarHtmlRelatorioProdutos(true);
    const janela = window.open('', '_blank');
    if (janela) {
      janela.document.write(html);
      janela.document.close();
    }
  }

  abrirModalRelatorioAtendimentos(): void {
    this.modalRelatorioAtendimentosOpen.set(true);
    this.listaRelatorioAtendimentos.set([]);
    const hoje = new Date();
    const inicioMes = startOfMonth(hoje);
    this.relatorioAtendimentosForm.patchValue({
      data_inicio: format(inicioMes, 'yyyy-MM-dd'),
      data_fim: format(hoje, 'yyyy-MM-dd'),
      nome: '',
      id_cabeleireiro: '',
    });
    this.api.get<CabeleireiroItem[]>('/usuarios', { perfil: 'CABELEIREIRO' }).subscribe({
      next: (list) => this.cabeleireirosRelatorio.set(list ?? []),
      error: () => this.cabeleireirosRelatorio.set([]),
    });
  }

  fecharModalRelatorioAtendimentos(): void {
    this.modalRelatorioAtendimentosOpen.set(false);
  }

  nomeCabeleireiroRelatorio(id: number): string {
    const cab = this.cabeleireirosRelatorio().find((c) => c.id === id);
    return cab?.nome ?? '—';
  }

  visualizarRelatorioAtendimentos(): void {
    const v = this.relatorioAtendimentosForm.value;
    const params: Record<string, string> = {};
    if (v.data_inicio) params['data_inicio'] = v.data_inicio;
    if (v.data_fim) params['data_fim'] = v.data_fim;
    if (v.id_cabeleireiro) params['id_cabeleireiro'] = String(v.id_cabeleireiro);
    this.carregandoRelatorioAtendimentos.set(true);
    this.api.get<AtendimentoFiltroItem[]>('/atendimentos', params).subscribe({
      next: (list) => {
        let f = list ?? [];
        const nome = (v.nome || '').trim();
        if (nome) {
          // Filtro por nome não vem do backend; manter lista se backend não suportar
          f = f.filter(() => true);
        }
        this.listaRelatorioAtendimentos.set(f);
        this.carregandoRelatorioAtendimentos.set(false);
      },
      error: () => {
        this.listaRelatorioAtendimentos.set([]);
        this.carregandoRelatorioAtendimentos.set(false);
      },
    });
  }

  /** Abre o relatório de atendimentos em uma nova aba (carrega com os filtros atuais e abre o HTML). */
  abrirRelatorioAtendimentosNovaAba(): void {
    const v = this.relatorioAtendimentosForm.value;
    const params: Record<string, string> = {};
    if (v.data_inicio) params['data_inicio'] = v.data_inicio;
    if (v.data_fim) params['data_fim'] = v.data_fim;
    if (v.id_cabeleireiro) params['id_cabeleireiro'] = String(v.id_cabeleireiro);
    this.carregandoRelatorioAtendimentos.set(true);
    this.api.get<AtendimentoFiltroItem[]>('/atendimentos', params).subscribe({
      next: (list) => {
        let f = list ?? [];
        const nome = (v.nome || '').trim();
        if (nome) f = f.filter(() => true);
        this.listaRelatorioAtendimentos.set(f);
        this.carregandoRelatorioAtendimentos.set(false);
        const html = this.gerarHtmlRelatorioAtendimentos(false);
        const janela = window.open('', '_blank');
        if (janela) {
          janela.document.write(html);
          janela.document.close();
        }
      },
      error: () => {
        this.listaRelatorioAtendimentos.set([]);
        this.carregandoRelatorioAtendimentos.set(false);
      },
    });
  }

  private gerarHtmlRelatorioAtendimentos(autoPrint: boolean): string {
    const lista = this.listaRelatorioAtendimentos();
    const dataGeracao = format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
    const printScript = autoPrint ? '<script>window.onload = function() { window.print(); window.close(); }</script>' : '';
    const logoUrl = typeof window !== 'undefined' && window.location ? window.location.origin + '/assets/logoWl.png' : '/assets/logoWl.png';
    const esc = (s: string) => (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const fmtValor = (v: number | undefined) => v != null ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v) : '—';
    const rows = lista.map((a) => {
      const cliente = a.nome_cliente ?? '—';
      const inicioStr = a.inicio ? format(parseISO(a.inicio), 'dd/MM/yyyy HH:mm', { locale: ptBR }) : '—';
      const cab = this.nomeCabeleireiroRelatorio(a.id_cabeleireiro);
      const valorStr = fmtValor(a.total);
      return `<tr><td>${esc(cliente)}</td><td>${esc(inicioStr)}</td><td>${esc(cab)}</td><td class="td-num">${esc(valorStr)}</td><td>${esc(a.status)}</td></tr>`;
    }).join('');
    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Relatório de Atendimentos</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', system-ui, sans-serif; padding: 32px; color: #1a1a1a; background: #fff; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; gap: 24px; margin-bottom: 28px; padding-bottom: 20px; border-bottom: 3px solid #ff9000; }
    .header-left { flex: 1; min-width: 0; }
    .header h1 { font-size: 1.75rem; font-weight: 700; color: #1a1a1a; }
    .header .sub { font-size: 0.9rem; color: #666; margin-top: 6px; }
    .header-logo { flex-shrink: 0; }
    .header-logo img { max-height: 56px; width: auto; object-fit: contain; display: block; }
    table { width: 100%; border-collapse: collapse; font-size: 0.95rem; }
    thead { background: #1a1a1a; color: #fff; }
    th { text-align: left; padding: 14px 16px; font-weight: 600; }
    td { padding: 12px 16px; border-bottom: 1px solid #e5e5e5; }
    tbody tr:nth-child(even) { background: #f9f9f9; }
    .footer { margin-top: 28px; font-size: 0.85rem; color: #737373; }
  </style>
</head>
<body>
  <div class="header">
    <div class="header-left">
      <h1>Relatório de Atendimentos</h1>
      <div class="sub">Gerado em ${dataGeracao} · Wender Barbearia</div>
    </div>
    <div class="header-logo">
      <img src="${logoUrl}" alt="Wender Barbearia" />
    </div>
  </div>
  <table>
    <thead>
      <tr><th>Cliente</th><th>Data início</th><th>Cabeleireiro</th><th class="qtd">Valor</th><th>Status</th></tr>
    </thead>
    <tbody>${rows || '<tr><td colspan="5">Nenhum atendimento no período.</td></tr>'}
    </tbody>
  </table>
  <div class="footer">Total: ${lista.length} atendimento(s)</div>
  ${printScript}
</body>
</html>`;
  }

  imprimirRelatorioAtendimentos(): void {
    const html = this.gerarHtmlRelatorioAtendimentos(true);
    const janela = window.open('', '_blank');
    if (janela) {
      janela.document.write(html);
      janela.document.close();
    }
  }

  abrirModalRelatorioAgenda(): void {
    this.modalRelatorioAgendaOpen.set(true);
    this.listaRelatorioAgenda.set([]);
    const hoje = new Date();
    const inicioMes = startOfMonth(hoje);
    this.relatorioAgendaForm.patchValue({
      data_inicio: format(inicioMes, 'yyyy-MM-dd'),
      data_fim: format(hoje, 'yyyy-MM-dd'),
      nome: '',
      id_cabeleireiro: '',
    });
    this.api.get<CabeleireiroItem[]>('/usuarios', { perfil: 'CABELEIREIRO' }).subscribe({
      next: (list) => this.cabeleireirosRelatorioAgenda.set(list ?? []),
      error: () => this.cabeleireirosRelatorioAgenda.set([]),
    });
  }

  fecharModalRelatorioAgenda(): void {
    this.modalRelatorioAgendaOpen.set(false);
  }

  visualizarRelatorioAgenda(): void {
    const v = this.relatorioAgendaForm.value;
    const params: Record<string, string> = {};
    if (v.data_inicio) params['data_inicio'] = v.data_inicio;
    if (v.data_fim) params['data_fim'] = v.data_fim;
    if (v.nome) params['nome'] = String(v.nome).trim();
    if (v.id_cabeleireiro) params['id_cabeleireiro'] = String(v.id_cabeleireiro);
    this.carregandoRelatorioAgenda.set(true);
    this.api.get<AgendaItem[]>('/agendamentos/agenda', params).subscribe({
      next: (list) => {
        this.listaRelatorioAgenda.set(list ?? []);
        this.carregandoRelatorioAgenda.set(false);
      },
      error: () => {
        this.listaRelatorioAgenda.set([]);
        this.carregandoRelatorioAgenda.set(false);
      },
    });
  }

  abrirRelatorioAgendaNovaAba(): void {
    const v = this.relatorioAgendaForm.value;
    const params: Record<string, string> = {};
    if (v.data_inicio) params['data_inicio'] = v.data_inicio;
    if (v.data_fim) params['data_fim'] = v.data_fim;
    if (v.nome) params['nome'] = String(v.nome).trim();
    if (v.id_cabeleireiro) params['id_cabeleireiro'] = String(v.id_cabeleireiro);
    this.carregandoRelatorioAgenda.set(true);
    this.api.get<AgendaItem[]>('/agendamentos/agenda', params).subscribe({
      next: (list) => {
        this.listaRelatorioAgenda.set(list ?? []);
        this.carregandoRelatorioAgenda.set(false);
        const html = this.gerarHtmlRelatorioAgenda(false);
        const janela = window.open('', '_blank');
        if (janela) {
          janela.document.write(html);
          janela.document.close();
        }
      },
      error: () => {
        this.listaRelatorioAgenda.set([]);
        this.carregandoRelatorioAgenda.set(false);
      },
    });
  }

  private gerarHtmlRelatorioAgenda(autoPrint: boolean): string {
    const lista = this.listaRelatorioAgenda();
    const dataGeracao = format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
    const printScript = autoPrint ? '<script>window.onload = function() { window.print(); window.close(); }</script>' : '';
    const logoUrl = typeof window !== 'undefined' && window.location ? window.location.origin + '/assets/logoWl.png' : '/assets/logoWl.png';
    const esc = (s: string) => (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const rows = lista.map((a) => {
      const dataHoraStr = a.data_hora ? format(parseISO(a.data_hora), 'dd/MM/yyyy HH:mm', { locale: ptBR }) : '—';
      return `<tr><td>${esc(a.nomeCliente ?? '—')}</td><td>${esc(dataHoraStr)}</td><td>${esc(a.cabeleireiro ?? '—')}</td><td>${esc(a.servico_descricao ?? '—')}</td><td>${esc(a.status ?? '—')}</td></tr>`;
    }).join('');
    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Relatório de Agenda</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', system-ui, sans-serif; padding: 32px; color: #1a1a1a; background: #fff; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; gap: 24px; margin-bottom: 28px; padding-bottom: 20px; border-bottom: 3px solid #ff9000; }
    .header-left { flex: 1; min-width: 0; }
    .header h1 { font-size: 1.75rem; font-weight: 700; color: #1a1a1a; }
    .header .sub { font-size: 0.9rem; color: #666; margin-top: 6px; }
    .header-logo { flex-shrink: 0; }
    .header-logo img { max-height: 56px; width: auto; object-fit: contain; display: block; }
    table { width: 100%; border-collapse: collapse; font-size: 0.95rem; }
    thead { background: #1a1a1a; color: #fff; }
    th { text-align: left; padding: 14px 16px; font-weight: 600; }
    td { padding: 12px 16px; border-bottom: 1px solid #e5e5e5; }
    tbody tr:nth-child(even) { background: #f9f9f9; }
    .footer { margin-top: 28px; font-size: 0.85rem; color: #737373; }
  </style>
</head>
<body>
  <div class="header">
    <div class="header-left">
      <h1>Relatório de Agenda</h1>
      <div class="sub">Gerado em ${dataGeracao} · Wender Barbearia</div>
    </div>
    <div class="header-logo">
      <img src="${logoUrl}" alt="Wender Barbearia" />
    </div>
  </div>
  <table>
    <thead>
      <tr><th>Cliente</th><th>Data/Hora</th><th>Vendedor</th><th>Serviço</th><th>Status</th></tr>
    </thead>
    <tbody>${rows || '<tr><td colspan="5">Nenhum agendamento no período.</td></tr>'}
    </tbody>
  </table>
  <div class="footer">Total: ${lista.length} agendamento(s)</div>
  ${printScript}
</body>
</html>`;
  }

  imprimirRelatorioAgenda(): void {
    const html = this.gerarHtmlRelatorioAgenda(true);
    const janela = window.open('', '_blank');
    if (janela) {
      janela.document.write(html);
      janela.document.close();
    }
  }

  abrirModalRelatorioCabeleireiros(): void {
    this.modalRelatorioCabeleireirosOpen.set(true);
    this.listaRelatorioCabeleireiros.set([]);
    const hoje = new Date();
    const inicioMes = startOfMonth(hoje);
    this.relatorioCabeleireirosForm.patchValue({
      data_inicio: format(inicioMes, 'yyyy-MM-dd'),
      data_fim: format(hoje, 'yyyy-MM-dd'),
      id_cabeleireiro: '',
    });
    this.api.get<CabeleireiroItem[]>('/usuarios', { perfil: 'CABELEIREIRO' }).subscribe({
      next: (list) => this.cabeleireirosRelatorioCabeleireiros.set(list ?? []),
      error: () => this.cabeleireirosRelatorioCabeleireiros.set([]),
    });
  }

  fecharModalRelatorioCabeleireiros(): void {
    this.modalRelatorioCabeleireirosOpen.set(false);
  }

  visualizarRelatorioCabeleireiros(): void {
    const v = this.relatorioCabeleireirosForm.value;
    const params: Record<string, string> = {};
    if (v.data_inicio) params['data_inicio'] = v.data_inicio;
    if (v.data_fim) params['data_fim'] = v.data_fim;
    if (v.id_cabeleireiro) params['id_cabeleireiro'] = String(v.id_cabeleireiro);
    this.carregandoRelatorioCabeleireiros.set(true);
    this.api.get<{ ranking: RankingItem[] }>('/admin/ranking', params).subscribe({
      next: (res) => {
        this.listaRelatorioCabeleireiros.set(res?.ranking ?? []);
        this.carregandoRelatorioCabeleireiros.set(false);
      },
      error: () => {
        this.listaRelatorioCabeleireiros.set([]);
        this.carregandoRelatorioCabeleireiros.set(false);
      },
    });
  }

  abrirRelatorioCabeleireirosNovaAba(): void {
    const v = this.relatorioCabeleireirosForm.value;
    const params: Record<string, string> = {};
    if (v.data_inicio) params['data_inicio'] = v.data_inicio;
    if (v.data_fim) params['data_fim'] = v.data_fim;
    if (v.id_cabeleireiro) params['id_cabeleireiro'] = String(v.id_cabeleireiro);
    this.carregandoRelatorioCabeleireiros.set(true);
    this.api.get<{ ranking: RankingItem[] }>('/admin/ranking', params).subscribe({
      next: (res) => {
        this.listaRelatorioCabeleireiros.set(res?.ranking ?? []);
        this.carregandoRelatorioCabeleireiros.set(false);
        const html = this.gerarHtmlRelatorioCabeleireiros(false);
        const janela = window.open('', '_blank');
        if (janela) {
          janela.document.write(html);
          janela.document.close();
        }
      },
      error: () => {
        this.listaRelatorioCabeleireiros.set([]);
        this.carregandoRelatorioCabeleireiros.set(false);
      },
    });
  }

  private gerarHtmlRelatorioCabeleireiros(autoPrint: boolean): string {
    const lista = this.listaRelatorioCabeleireiros();
    const dataGeracao = format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
    const printScript = autoPrint ? '<script>window.onload = function() { window.print(); window.close(); }</script>' : '';
    const logoUrl = typeof window !== 'undefined' && window.location ? window.location.origin + '/assets/logoWl.png' : '/assets/logoWl.png';
    const esc = (s: string) => (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const rows = lista.map((r) => {
      const totalStr = r.total != null ? 'R$ ' + r.total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—';
      return `<tr><td>${esc(r.nome ?? '—')}</td><td class="td-num">${r.atendimentos ?? 0}</td><td class="td-num">${esc(totalStr)}</td></tr>`;
    }).join('');
    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Relatório de Cabeleireiros</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', system-ui, sans-serif; padding: 32px; color: #1a1a1a; background: #fff; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; gap: 24px; margin-bottom: 28px; padding-bottom: 20px; border-bottom: 3px solid #ff9000; }
    .header-left { flex: 1; min-width: 0; }
    .header h1 { font-size: 1.75rem; font-weight: 700; color: #1a1a1a; }
    .header .sub { font-size: 0.9rem; color: #666; margin-top: 6px; }
    .header-logo { flex-shrink: 0; }
    .header-logo img { max-height: 56px; width: auto; object-fit: contain; display: block; }
    table { width: 100%; border-collapse: collapse; font-size: 0.95rem; }
    thead { background: #1a1a1a; color: #fff; }
    th { text-align: left; padding: 14px 16px; font-weight: 600; }
    td { padding: 12px 16px; border-bottom: 1px solid #e5e5e5; }
    .td-num { text-align: right; }
    th.td-num { text-align: right; }
    tbody tr:nth-child(even) { background: #f9f9f9; }
    .footer { margin-top: 28px; font-size: 0.85rem; color: #737373; }
  </style>
</head>
<body>
  <div class="header">
    <div class="header-left">
      <h1>Relatório de Cabeleireiros</h1>
      <div class="sub">Gerado em ${dataGeracao} · Wender Barbearia</div>
    </div>
    <div class="header-logo">
      <img src="${logoUrl}" alt="Wender Barbearia" />
    </div>
  </div>
  <table>
    <thead>
      <tr><th>Cabeleireiro</th><th class="td-num">Atendimentos</th><th class="td-num">Total</th></tr>
    </thead>
    <tbody>${rows || '<tr><td colspan="3">Nenhum dado no período.</td></tr>'}
    </tbody>
  </table>
  <div class="footer">Total: ${lista.length} cabeleireiro(s)</div>
  ${printScript}
</body>
</html>`;
  }

  imprimirRelatorioCabeleireiros(): void {
    const html = this.gerarHtmlRelatorioCabeleireiros(true);
    const janela = window.open('', '_blank');
    if (janela) {
      janela.document.write(html);
      janela.document.close();
    }
  }

  carregarProdutosModal(): void {
    this.api.get<ProdutoEstoqueItem[]>('/produtos', { todos: '1' }).subscribe({
      next: (list) => this.produtosListModal.set(list ?? []),
      error: () => this.produtosListModal.set([]),
    });
  }

  produtosFiltradosModal = computed(() => {
    const lista = this.produtosListModal();
    const q = this.searchProdutoModal().trim().toLowerCase();
    if (!q) return lista;
    return lista.filter((p) => (p.descricao ?? '').toLowerCase().includes(q));
  });

  abrirModalNovoProduto(): void {
    this.produtoEditId.set(null);
    this.produtoForm.reset({ descricao: '', valor_venda: 0, estoque: 0, imagem: '' });
    this.valorVendaMask.set(this.formatarMoeda(0));
    this.produtoErro.set('');
    this.produtoFormModalOpen.set(true);
  }

  abrirModalEditarProduto(p: ProdutoEstoqueItem): void {
    this.produtoEditId.set(p.id);
    const valor = p.valor_venda ?? 0;
    this.produtoForm.patchValue({
      descricao: p.descricao ?? '',
      valor_venda: valor,
      estoque: p.estoque ?? 0,
      imagem: p.imagem ?? '',
    });
    this.valorVendaMask.set(this.formatarMoeda(valor));
    this.produtoErro.set('');
    this.produtoFormModalOpen.set(true);
  }

  fecharModalFormProduto(): void {
    this.produtoFormModalOpen.set(false);
    this.produtoEditId.set(null);
    this.produtoErro.set('');
  }

  formatarMoeda(val: number): string {
    if (val == null || Number.isNaN(val)) return 'R$ 0,00';
    return 'R$ ' + val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  parsearMoeda(s: string): number {
    if (!s || typeof s !== 'string') return 0;
    const limpo = s.replace(/\D/g, '');
    if (limpo.length === 0) return 0;
    return Math.round(parseInt(limpo, 10) * 100) / 10000;
  }

  onValorVendaInput(val: string): void {
    const num = this.parsearMoeda(val);
    this.produtoForm.patchValue({ valor_venda: num }, { emitEvent: true });
    this.valorVendaMask.set(val ? this.formatarMoeda(num) : '');
  }

  onValorVendaBlur(): void {
    const num = this.produtoForm.get('valor_venda')?.value ?? 0;
    this.valorVendaMask.set(this.formatarMoeda(num));
  }

  onFileProdutoSelectedModal(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];
    if (!file) return;
    this.api.upload('/upload', file).subscribe({
      next: (res) => {
        if (res?.imagem) this.produtoForm.patchValue({ imagem: res.imagem });
      },
      error: () => this.produtoErro.set('Falha ao enviar imagem.'),
    });
    input.value = '';
  }

  salvarProduto(): void {
    if (this.produtoForm.invalid) {
      this.produtoForm.markAllAsTouched();
      return;
    }
    const id = this.produtoEditId();
    const val = this.produtoForm.value;
    const payload = {
      descricao: val.descricao?.trim() ?? '',
      valor_venda: Number(val.valor_venda) ?? 0,
      estoque: Number(val.estoque) ?? 0,
      imagem: val.imagem?.trim() || undefined,
    };
    this.produtoSalvando.set(true);
    this.produtoErro.set('');
    if (id != null) {
      this.api.patch<void>(`/produtos/${id}`, payload).subscribe({
        next: () => {
          this.produtoSalvando.set(false);
          this.fecharModalFormProduto();
          this.carregarProdutosModal();
          this.carregarProdutos();
        },
        error: (err) => {
          this.produtoSalvando.set(false);
          this.produtoErro.set(err?.error?.error || 'Erro ao atualizar.');
        },
      });
    } else {
      this.api.post<ProdutoEstoqueItem>('/produtos', payload).subscribe({
        next: () => {
          this.produtoSalvando.set(false);
          this.fecharModalFormProduto();
          this.carregarProdutosModal();
          this.carregarProdutos();
        },
        error: (err) => {
          this.produtoSalvando.set(false);
          this.produtoErro.set(err?.error?.error || 'Erro ao cadastrar.');
        },
      });
    }
  }

  excluirProduto(p: ProdutoEstoqueItem): void {
    if (!confirm(`Excluir o produto "${p.descricao ?? 'Produto'}"?`)) return;
    this.api.delete<void>(`/produtos/${p.id}`).subscribe({
      next: () => {
        this.carregarProdutosModal();
        this.carregarProdutos();
      },
      error: () => this.produtoErro.set('Erro ao excluir.'),
    });
  }

  // —— Modal Serviços ——
  abrirModalServicos(): void {
    this.modalServicosOpen.set(true);
    this.searchServicoModal.set('');
    this.servicoErro.set('');
    this.carregarServicosModal();
  }

  fecharModalServicos(): void {
    this.modalServicosOpen.set(false);
  }

  carregarServicosModal(): void {
    this.api.get<ServicoItem[]>('/servicos', { todos: '1' }).subscribe({
      next: (list) => this.servicosList.set(list ?? []),
      error: () => this.servicosList.set([]),
    });
  }

  servicosFiltrados = computed(() => {
    const lista = this.servicosList();
    const q = this.searchServicoModal().trim().toLowerCase();
    if (!q) return lista;
    return lista.filter((s) => (s.descricao ?? '').toLowerCase().includes(q));
  });

  abrirModalNovoServico(): void {
    this.servicoEditId.set(null);
    this.servicoForm.reset({ descricao: '', valor: 0, imagem: '' });
    this.servicoErro.set('');
    this.servicoFormModalOpen.set(true);
  }

  abrirModalEditarServico(s: ServicoItem): void {
    this.servicoEditId.set(s.id);
    this.servicoForm.patchValue({
      descricao: s.descricao ?? '',
      valor: s.valor ?? 0,
      imagem: s.imagem ?? '',
    });
    this.servicoErro.set('');
    this.servicoFormModalOpen.set(true);
  }

  fecharModalFormServico(): void {
    this.servicoFormModalOpen.set(false);
    this.servicoEditId.set(null);
    this.servicoErro.set('');
  }

  servicoImagemUrl(s: ServicoItem): string {
    if (!s?.imagem?.trim()) return '';
    const img = s.imagem.trim();
    if (img.startsWith('http://') || img.startsWith('https://')) return img;
    const base = (environment?.apiUrl ?? '').replace(/\/api\/?$/, '') || 'http://localhost:8080';
    return base + (img.startsWith('/') ? '' : '/') + img;
  }

  onFileServicoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];
    if (!file) return;
    this.api.upload('/upload', file).subscribe({
      next: (res) => {
        if (res?.imagem) this.servicoForm.patchValue({ imagem: res.imagem });
      },
      error: () => this.servicoErro.set('Falha ao enviar imagem.'),
    });
    input.value = '';
  }

  salvarServico(): void {
    if (this.servicoForm.invalid) {
      this.servicoForm.markAllAsTouched();
      return;
    }
    const id = this.servicoEditId();
    const val = this.servicoForm.value;
    const payload = {
      descricao: val.descricao?.trim() ?? '',
      valor: Number(val.valor) ?? 0,
      imagem: val.imagem?.trim() || undefined,
    };
    this.servicoSalvando.set(true);
    this.servicoErro.set('');
    if (id != null) {
      this.api.patch<void>(`/servicos/${id}`, payload).subscribe({
        next: () => {
          this.servicoSalvando.set(false);
          this.fecharModalFormServico();
          this.carregarServicosModal();
        },
        error: (err) => {
          this.servicoSalvando.set(false);
          this.servicoErro.set(err?.error?.error || 'Erro ao atualizar.');
        },
      });
    } else {
      this.api.post<ServicoItem>('/servicos', payload).subscribe({
        next: () => {
          this.servicoSalvando.set(false);
          this.fecharModalFormServico();
          this.carregarServicosModal();
        },
        error: (err) => {
          this.servicoSalvando.set(false);
          this.servicoErro.set(err?.error?.error || 'Erro ao cadastrar.');
        },
      });
    }
  }

  excluirServico(s: ServicoItem): void {
    if (!confirm(`Excluir o serviço "${s.descricao ?? 'Serviço'}"?`)) return;
    this.api.delete<void>(`/servicos/${s.id}`).subscribe({
      next: () => this.carregarServicosModal(),
      error: () => this.servicoErro.set('Erro ao excluir.'),
    });
  }

  // —— Modal Agenda (sidebar) ——
  abrirModalAgenda(): void {
    this.modalAgendaOpen.set(true);
    this.agendaSearchCliente.set('');
    this.carregarAgendaModal();
  }

  fecharModalAgenda(): void {
    this.modalAgendaOpen.set(false);
  }

  carregarAgendaModal(): void {
    const mes = this.agendaModalMes();
    this.api.get<AgendaItem[]>('/agendamentos/agenda', { mes }).subscribe({
      next: (list) => this.agendaListaModal.set(list ?? []),
      error: () => this.agendaListaModal.set([]),
    });
  }

  agendaListaFiltrada = computed(() => {
    const lista = this.agendaListaModal();
    const q = this.agendaSearchCliente().trim().toLowerCase();
    if (!q) return lista;
    return lista.filter((a) => (a.nomeCliente ?? '').toLowerCase().includes(q));
  });

  abrirModalNovoAgendamento(): void {
    this.agendaEditId.set(null);
    this.agendamentoForm.reset({
      nome_cliente: '',
      data: format(new Date(), 'yyyy-MM-dd'),
      hora: '09:00',
      id_servico: null,
      id_cabeleireiro: null,
      observacao: '',
      id_cliente: null,
    });
    this.agendamentoErro.set('');
    this.carregarClientesEServicosParaAgendamento();
    this.modalNovoAgendamentoOpen.set(true);
  }

  abrirModalEditarAgendamento(a: AgendaItem): void {
    const dataHora = a.data_hora ? parseISO(a.data_hora) : new Date();
    this.agendaEditId.set(a.id);
    this.agendamentoForm.reset({
      nome_cliente: a.nomeCliente ?? '',
      data: format(dataHora, 'yyyy-MM-dd'),
      hora: format(dataHora, 'HH:mm'),
      id_servico: a.id_servico ?? null,
      id_cabeleireiro: a.id_cabeleireiro ?? null,
      observacao: a.observacao ?? '',
      id_cliente: a.id_cliente ?? null,
    });
    this.agendamentoErro.set('');
    this.carregarClientesEServicosParaAgendamento();
    this.modalNovoAgendamentoOpen.set(true);
  }

  fecharModalNovoAgendamento(): void {
    this.modalNovoAgendamentoOpen.set(false);
    this.agendaEditId.set(null);
  }

  abrirModalNovoCliente(): void {
    this.clienteForm.reset({ nome: '' });
    this.clienteErro.set('');
    this.modalNovoClienteOpen.set(true);
  }

  fecharModalNovoCliente(): void {
    this.modalNovoClienteOpen.set(false);
  }

  salvarCliente(): void {
    if (this.clienteForm.invalid) {
      this.clienteForm.markAllAsTouched();
      return;
    }
    const nome = (this.clienteForm.get('nome')?.value ?? '').trim();
    if (!nome) {
      this.clienteErro.set('Informe o nome do cliente.');
      return;
    }
    this.clienteSalvando.set(true);
    this.clienteErro.set('');
    this.api.post<{ id: number; nome: string }>('/clientes', { nome, telefone: '' }).subscribe({
      next: (cli) => {
        const idCliente = cli?.id;
        if (idCliente == null) {
          this.clienteSalvando.set(false);
          this.clienteErro.set('Resposta inválida ao cadastrar cliente.');
          return;
        }
        this.api.post<unknown>('/fila', { id_cliente: idCliente }).subscribe({
          next: () => {
            this.clienteSalvando.set(false);
            this.fecharModalNovoCliente();
            this.carregarTudo();
            this.message.add({
              severity: 'success',
              summary: 'Cliente cadastrado',
              detail: `${nome} foi cadastrado e adicionado à fila de espera.`,
              life: 4000,
            });
          },
          error: (err) => {
            this.clienteSalvando.set(false);
            this.clienteErro.set(err?.error?.error || 'Cliente criado, mas falha ao adicionar na fila.');
          },
        });
      },
      error: (err) => {
        this.clienteSalvando.set(false);
        this.clienteErro.set(err?.error?.error || 'Erro ao cadastrar cliente.');
      },
    });
  }

  carregarClientesEServicosParaAgendamento(): void {
    this.api.get<{ id: number; nome: string }[]>('/clientes').subscribe({
      next: (list) => this.clientesList.set(list ?? []),
      error: () => this.clientesList.set([]),
    });
    this.api.get<ServicoItem[]>('/servicos', { todos: '1' }).subscribe({
      next: (list) => this.servicosListAgenda.set(list ?? []),
      error: () => this.servicosListAgenda.set([]),
    });
  }

  salvarAgendamento(): void {
    if (this.agendamentoForm.invalid) {
      this.agendamentoForm.markAllAsTouched();
      return;
    }
    const val = this.agendamentoForm.value;
    const dataHoraStr = `${val.data}T${val.hora}`;
    const idServico = val.id_servico ? Number(val.id_servico) : undefined;
    const idCabeleireiro = val.id_cabeleireiro ? Number(val.id_cabeleireiro) : undefined;
    const observacao = (val.observacao ?? '').trim();
    const idEdit = this.agendaEditId();

    if (idEdit != null) {
      // Edição: PATCH
      const idCliente = val.id_cliente ? Number(val.id_cliente) : undefined;
      this.agendamentoSalvando.set(true);
      this.agendamentoErro.set('');
      this.api
        .patch<AgendaItem>(`/agendamentos/${idEdit}`, {
          id_cliente: idCliente,
          data_hora: dataHoraStr,
          id_servico: idServico ?? null,
          id_cabeleireiro: idCabeleireiro ?? null,
          observacao: observacao || undefined,
        })
        .subscribe({
          next: () => {
            this.agendamentoSalvando.set(false);
            this.fecharModalNovoAgendamento();
            this.carregarAgendaModal();
            this.carregarAgenda();
            this.carregarTudo();
          },
          error: (err) => {
            this.agendamentoSalvando.set(false);
            this.agendamentoErro.set(err?.error?.error || 'Erro ao atualizar agendamento.');
          },
        });
      return;
    }

    // Novo: POST (criar cliente se necessário)
    const nomeCliente = (val.nome_cliente ?? '').trim();
    if (!nomeCliente) {
      this.agendamentoErro.set('Informe o nome do cliente.');
      return;
    }
    this.agendamentoSalvando.set(true);
    this.agendamentoErro.set('');
    const clientes = this.clientesList();
    const existente = clientes.find((c) => c.nome?.trim().toLowerCase() === nomeCliente.toLowerCase());
    const doPostAgendamento = (idCliente: number) => {
      this.api
        .post<AgendaItem>('/agendamentos', {
          id_cliente: idCliente,
          data_hora: dataHoraStr,
          id_servico: idServico || undefined,
          id_cabeleireiro: idCabeleireiro || undefined,
          observacao: observacao || undefined,
        })
        .subscribe({
          next: () => {
            this.agendamentoSalvando.set(false);
            this.fecharModalNovoAgendamento();
            this.carregarAgendaModal();
            this.carregarAgenda();
            this.carregarTudo();
          },
          error: (err) => {
            this.agendamentoSalvando.set(false);
            this.agendamentoErro.set(err?.error?.error || 'Erro ao criar agendamento.');
          },
        });
    };
    if (existente) {
      doPostAgendamento(existente.id);
      return;
    }
    this.api.post<{ id: number }>('/clientes', { nome: nomeCliente }).subscribe({
      next: (res) => {
        doPostAgendamento(res.id);
      },
      error: (err) => {
        this.agendamentoSalvando.set(false);
        this.agendamentoErro.set(err?.error?.error || 'Erro ao criar cliente.');
      },
    });
  }

  excluirAgendamento(a: AgendaItem): void {
    if (!confirm('Excluir este agendamento?')) return;
    this.api.delete(`/agendamentos/${a.id}`).subscribe({
      next: () => {
        this.carregarAgendaModal();
        this.carregarAgenda();
        this.carregarTudo();
      },
      error: () => {
        // poderia exibir toast ou mensagem
      },
    });
  }

  abrirSolicitacaoUsuarios(): void {
    this.solicitacoesModalOpen.set(true);
    this.solicitacoesList.set([]);
    this.solicitacoesCarregando.set(true);
    this.api.get<SolicitacaoUsuario[]>('/usuarios/solicitacoes').subscribe({
      next: (list) => {
        this.solicitacoesList.set(list ?? []);
        this.solicitacoesCarregando.set(false);
      },
      error: () => {
        this.solicitacoesList.set([]);
        this.solicitacoesCarregando.set(false);
      },
    });
  }

  fecharModalSolicitacoes(): void {
    this.solicitacoesModalOpen.set(false);
    this.solicitacaoAcaoId.set(null);
  }

  aprovarSolicitacao(u: SolicitacaoUsuario): void {
    this.solicitacaoAcaoId.set(u.id);
    this.api.patch<{ ok: boolean; status: string }>(`/usuarios/${u.id}/aprovacao`, { status: 'V' }).subscribe({
      next: () => {
        this.solicitacoesList.update((list) => list.filter((x) => x.id !== u.id));
        this.solicitacaoAcaoId.set(null);
      },
      error: () => this.solicitacaoAcaoId.set(null),
    });
  }

  desconsiderarSolicitacao(u: SolicitacaoUsuario): void {
    this.solicitacaoAcaoId.set(u.id);
    this.api.patch<{ ok: boolean; status: string }>(`/usuarios/${u.id}/aprovacao`, { status: 'N' }).subscribe({
      next: () => {
        this.solicitacoesList.update((list) => list.filter((x) => x.id !== u.id));
        this.solicitacaoAcaoId.set(null);
      },
      error: () => this.solicitacaoAcaoId.set(null),
    });
  }

  formatarDataHoraAgenda(dataHora: string): string {
    if (!dataHora) return '—';
    try {
      const d = parseISO(dataHora);
      return format(d, "dd/MM/yyyy HH:mm", { locale: ptBR });
    } catch {
      return dataHora;
    }
  }

  /** Recarrega todos os dados do dashboard (cards, gráficos, agenda, estoque) sem recarregar a página */
  recarregarDashboard(): void {
    this.carregarTudo();
    this.carregarGraficoAtendimentos();
    this.carregarCabeleireiros();
    this.carregarAgenda();
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.api.get<ProdutoEstoqueItem[]>('/produtos').subscribe({
      next: (list) => this.produtosEstoque.set(list ?? []),
      error: () => this.produtosEstoque.set([]),
    });
  }

  /** Limite para considerar estoque baixo (aparece primeiro e em vermelho) */
  readonly ESTOQUE_BAIXO_LIMITE = 5;

  /** Produtos filtrados pela pesquisa e ordenados: estoque baixo primeiro */
  produtosEstoqueFiltrados = computed(() => {
    const lista = this.produtosEstoque();
    const q = this.searchProduto().trim().toLowerCase();
    const filtrada = q
      ? lista.filter((p) => (p.descricao ?? '').toLowerCase().includes(q))
      : [...lista];
    return filtrada.sort((a, b) => {
      const aBaixo = (a.estoque ?? 0) <= this.ESTOQUE_BAIXO_LIMITE ? 1 : 0;
      const bBaixo = (b.estoque ?? 0) <= this.ESTOQUE_BAIXO_LIMITE ? 1 : 0;
      if (aBaixo !== bBaixo) return bBaixo - aBaixo;
      return (a.estoque ?? 0) - (b.estoque ?? 0);
    });
  });

  isEstoqueBaixo(p: ProdutoEstoqueItem): boolean {
    return (p.estoque ?? 0) <= this.ESTOQUE_BAIXO_LIMITE;
  }

  /** URL da imagem do produto (path uploads/ ou URL absoluta) */
  produtoImagemUrl(p: ProdutoEstoqueItem): string {
    if (!p?.imagem?.trim()) return '';
    const img = p.imagem.trim();
    if (img.startsWith('http://') || img.startsWith('https://')) return img;
    const base = (environment?.apiUrl ?? '').replace(/\/api\/?$/, '') || 'http://localhost:8080';
    return base + (img.startsWith('/') ? '' : '/') + img;
  }

  carregarCabeleireiros(): void {
    this.api.get<CabeleireiroItem[]>('/usuarios', { perfil: 'CABELEIREIRO' }).subscribe({
      next: (list) => this.cabeleireiros.set(list ?? []),
      error: () => this.cabeleireiros.set([]),
    });
  }

  /** Verifica se o usuário atual deve ver notificações de recebimento (recepção / dono) */
  private deveMonitorarRecebimentos(): boolean {
    const perfil = this.user()?.perfil ?? '';
    return perfil === 'RECEPCAO' || perfil === 'RECEPCIONISTA' || perfil === 'DONO' || perfil === 'ADMIN';
  }

  /** Inicia o polling periódico de notificações de RECEBIMENTO para exibir toast na web */
  private iniciarMonitorRecebimentos(): void {
    if (!this.deveMonitorarRecebimentos()) {
      return;
    }
    if (this.recebimentoIntervalId) {
      clearInterval(this.recebimentoIntervalId);
      this.recebimentoIntervalId = null;
    }
    this.verificarRecebimentosPendentes();
    this.recebimentoIntervalId = setInterval(() => {
      this.verificarRecebimentosPendentes();
    }, 5000);
  }

  /** Não exibe toast de RECEBIMENTO — pode ser feito por outro usuário, evitando duplicidade */
  private verificarRecebimentosPendentes(): void {
    this.recebimentoNotificacao.set(null);
  }

  /** Verifica se o usuário atual é DONO/ADMIN (deve receber toast de solicitação de cadastro) */
  private deveMonitorarSolicitacoes(): boolean {
    const perfil = (this.user()?.perfil ?? '').toUpperCase();
    return perfil === 'DONO' || perfil === 'ADMIN';
  }

  /** Polling: notificações SOLICITACAO_USUARIO para exibir toast no perfil DONO */
  private iniciarMonitorSolicitacoes(): void {
    if (!this.deveMonitorarSolicitacoes()) {
      return;
    }
    if (this.solicitacaoIntervalId) {
      clearInterval(this.solicitacaoIntervalId);
      this.solicitacaoIntervalId = null;
    }
    this.verificarSolicitacoesPendentes();
    this.solicitacaoIntervalId = setInterval(() => {
      this.verificarSolicitacoesPendentes();
    }, 5000);
  }

  /** Busca notificações DONO: SOLICITACAO_USUARIO, LANCAMENTO_*, CLIENTE_NA_FILA */
  private verificarSolicitacoesPendentes(): void {
    this.api.get<NotificacaoItem[]>('/notificacoes', { perfil: 'DONO' }).subscribe({
      next: (list) => {
        const todas = list || [];
        const solicitacoes = todas.filter((n) => (n.tipo || '').toUpperCase() === 'SOLICITACAO_USUARIO');
        const lancamentos = todas.filter((n) => (n.tipo || '').toUpperCase().startsWith('LANCAMENTO_'));
        const clienteNaFila = todas.filter((n) => (n.tipo || '').toUpperCase() === 'CLIENTE_NA_FILA');
        if (solicitacoes.length > 0) {
          const maisRecente = solicitacoes[0];
          const nomeNotif = (maisRecente.subtitulo || '').trim();
          this.api.get<SolicitacaoUsuario[]>('/usuarios/solicitacoes').subscribe({
            next: (pendentes) => {
              const nomesPendentes = new Set((pendentes ?? []).map((u) => (u.nome || '').trim()));
              if (!nomesPendentes.has(nomeNotif)) {
                return;
              }
              if (this.ultimoSolicitacaoNotificacaoId !== maisRecente.id) {
                this.ultimoSolicitacaoNotificacaoId = maisRecente.id;
                const nome = nomeNotif || 'Um usuário';
                this.message.add({
                  severity: 'info',
                  summary: 'Nova solicitação de cadastro',
                  detail: `${nome} está pedindo autorização para ser aprovado.`,
                  life: 8000,
                });
              }
            },
            error: () => {},
          });
        }
        if (lancamentos.length > 0) {
          const maisRecente = lancamentos[0];
          if (this.ultimoLancamentoNotificacaoId === null) {
            this.ultimoLancamentoNotificacaoId = maisRecente.id;
            // não exibe toast na primeira carga (só para lançamentos novos)
          } else if (this.ultimoLancamentoNotificacaoId !== maisRecente.id) {
            this.ultimoLancamentoNotificacaoId = maisRecente.id;
            const nome = (maisRecente.subtitulo || 'Recepção').trim();
            const titulo = (maisRecente.titulo || 'Lançamento').trim();
            const valor = maisRecente.valor != null ? maisRecente.valor : 0;
            const valorStr = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
            const detalhe = (maisRecente.detalhe || '').trim();
            const msg = detalhe ? `${nome} fez lançamento de ${titulo} (${detalhe}) no valor ${valorStr}.` : `${nome} fez lançamento de ${titulo} no valor ${valorStr}.`;
            this.message.add({
              severity: 'success',
              summary: 'Lançamento no sistema',
              detail: msg,
              life: 8000,
            });
          }
        }
        if (clienteNaFila.length > 0) {
          const maisRecente = clienteNaFila[0];
          if (this.ultimoClienteNaFilaNotificacaoId === null) {
            this.ultimoClienteNaFilaNotificacaoId = maisRecente.id;
          } else if (this.ultimoClienteNaFilaNotificacaoId !== maisRecente.id) {
            this.ultimoClienteNaFilaNotificacaoId = maisRecente.id;
            const nome = (maisRecente.subtitulo || 'Cliente').trim();
            this.message.add({
              severity: 'info',
              summary: 'Cliente na fila',
              detail: `O cliente ${nome} está aguardando para ser chamado.`,
              life: 8000,
            });
          }
        }
      },
      error: () => {},
    });
  }

  abrirModalRecebimento(): void {
    if (!this.recebimentoNotificacao()) {
      return;
    }
    this.recebimentoErro.set('');
    this.tipoPagamentoRecebimento.set('DINHEIRO');
    this.recebimentoModalOpen.set(true);
    this.carregarDetalheRecebimento();
  }

  fecharModalRecebimento(): void {
    this.recebimentoModalOpen.set(false);
    this.recebimentoDetalhe.set(null);
  }

  carregarDetalheRecebimento(): void {
    const idAtend = this.recebimentoNotificacao()?.id_atendimento;
    if (idAtend == null) {
      this.recebimentoDetalhe.set(null);
      return;
    }
    this.recebimentoDetalheCarregando.set(true);
    this.recebimentoDetalhe.set(null);
    this.api.get<DetalheAtendimento>(`/atendimentos/${idAtend}/detalhe`).subscribe({
      next: (d) => {
        this.recebimentoDetalhe.set(d);
        this.recebimentoDetalheCarregando.set(false);
      },
      error: () => {
        this.recebimentoDetalhe.set(null);
        this.recebimentoDetalheCarregando.set(false);
      },
    });
  }

  setTipoPagamentoRecebimento(tipo: string): void {
    this.tipoPagamentoRecebimento.set(tipo);
  }

  /** Retorna o texto da forma de pagamento para gravar na observação (Dinheiro, Pix, Crédito, Débito). */
  observacaoFormaPagamento(tipo: string): string {
    const map: Record<string, string> = {
      DINHEIRO: 'Dinheiro',
      PIX: 'Pix',
      CARTAO_CREDITO: 'Crédito',
      CARTAO_DEBITO: 'Débito',
    };
    return map[tipo] ?? '';
  }

  fecharToastRecebimento(event: MouseEvent): void {
    event.stopPropagation();
    this.recebimentoNotificacao.set(null);
  }

  /** Confirma o recebimento no caixa usando a notificação selecionada */
  confirmarRecebimentoNotificacao(): void {
    const notif = this.recebimentoNotificacao();
    if (!notif || !notif.id_atendimento || !notif.valor) {
      return;
    }
    const idUsuario = this.user()?.id;
    this.recebimentoCarregando.set(true);
    this.recebimentoErro.set('');
    const tipo = this.tipoPagamentoRecebimento();
    const observacao = this.observacaoFormaPagamento(tipo);
    this.api
      .post<any>('/caixa', {
        id_atendimento: notif.id_atendimento,
        valor: notif.valor,
        tipo_pagamento: tipo,
        ...(observacao ? { observacao } : {}),
        ...(idUsuario ? { id_usuario: idUsuario } : {}),
      })
      .subscribe({
        next: () => {
          // marca notificação como lida, mas sem bloquear o fluxo
          this.api.patch<void>(`/notificacoes/${notif.id}/lido`, {}).subscribe({
            next: () => {},
            error: () => {},
          });
          this.recebimentoCarregando.set(false);
          this.recebimentoModalOpen.set(false);
          this.recebimentoNotificacao.set(null);
          this.recebimentoDetalhe.set(null);
          this.recarregarDashboard();
        },
        error: (err) => {
          this.recebimentoCarregando.set(false);
          let msg = 'Erro ao registrar recebimento.';
          if (err && err.error && err.error.error) {
            msg = err.error.error;
          }
          this.recebimentoErro.set(msg);
        },
      });
  }

  aplicarFiltro(): void {
    const v = this.filterForm.value;
    const params: Record<string, string> = {};
    if (v.data_inicio) params['data_inicio'] = v.data_inicio;
    if (v.data_fim) params['data_fim'] = v.data_fim;
    if (v.status) params['status'] = v.status;
    if (v.id_cabeleireiro) params['id_cabeleireiro'] = String(v.id_cabeleireiro);
    this.api.get<AtendimentoFiltroItem[]>('/atendimentos', params).subscribe({
      next: (list) => this.atendimentosFiltrados.set(list ?? []),
      error: () => this.atendimentosFiltrados.set([]),
    });
    this.filterPanelOpen.set(false);
  }

  carregarTudo(): void {
    this.loading.set(true);
    const hoje = format(new Date(), 'yyyy-MM-dd');

    // Dashboard 30 dias (gráfico, ranking, atividade)
    this.dashboardCabeleireiros.set(null); // limpa filtro do painel Cabeleireiros
    this.api.get<DashboardAdminResponse>('/admin/dashboard', { periodo: '30' }).subscribe({
      next: (data) => this.dashboard.set(data),
      error: () => this.dashboard.set(null),
    });

    // Receita do dia (1 dia) para card e variação
    this.api.get<DashboardAdminResponse>('/admin/dashboard', { periodo: '1' }).subscribe({
      next: (data) => {
        this.receitaDia.set(data?.faturamento_total ?? 0);
        this.percentualDia.set(data?.percentual_vs_anterior ?? null);
      },
      error: () => {},
    });

    // Saldo caixa (valor em caixa atual — card Caixa do dia)
    this.api.get<{ saldo: number }>('/caixa/saldo').subscribe({
      next: (res) => this.saldoCaixa.set(res?.saldo ?? 0),
      error: () => {},
    });

    // Caixa aberto (abertura do dia — 204 quando fechado)
    this.api.get<{ valor_abertura: number }>('/caixa/aberto').subscribe({
      next: (res) => this.caixaAberto.set(res && res.valor_abertura != null ? res : null),
      error: () => this.caixaAberto.set(null),
    });

    // Agendamentos de hoje
    this.api.get<AgendamentoApi[]>('/agendamentos', { data: hoje }).subscribe({
      next: (list) => {
        const items = (list || []).map((a) => ({
          id: a.id,
          data_hora: a.data_hora,
          horaFormatada: format(parseISO(a.data_hora), 'HH:mm'),
          clienteNome: a.cliente?.nome ?? 'Cliente',
          servicoDescricao: a.servico?.descricao ?? 'Serviço',
          cabeleireiroNome: a.cabeleireiro?.nome,
        }));
        this.agendamentosHoje.set(items);
      },
      error: () => this.agendamentosHoje.set([]),
    });

    // Agendamentos do mês atual (para o card AGENDAMENTOS)
    const mesAtual = format(new Date(), 'yyyy-MM');
    this.api.get<AgendaItem[]>('/agendamentos/agenda', { mes: mesAtual }).subscribe({
      next: (list) => this.agendaListaMesAtual.set(list ?? []),
      error: () => this.agendaListaMesAtual.set([]),
    });

    // Notificações (RECEPCAO para admin) - usadas em alertas e atividade
    this.api.get<NotificacaoItem[]>('/notificacoes', { perfil: 'RECEPCAO' }).subscribe({
      next: (list) => this.notificacoes.set(list || []),
      error: () => this.notificacoes.set([]),
      complete: () => this.loading.set(false),
    });
  }

  toggleChartFiltro(): void {
    this.chartFiltroOpen.update((v) => !v);
  }

  /** Aplica um dos períodos rápidos (15, 30, 60, 90 dias) e recarrega o gráfico */
  aplicarPeriodoGrafico(dias: number): void {
    const fim = new Date();
    const inicio = subDays(fim, dias - 1);
    this.chartPeriodo.set(dias);
    this.chartDataInicio.set(format(inicio, 'yyyy-MM-dd'));
    this.chartDataFim.set(format(fim, 'yyyy-MM-dd'));
    this.carregarGraficoAtendimentos();
    this.chartFiltroOpen.set(false);
  }

  /** Aplica filtro do gráfico usando as datas escolhidas (calcula período em dias) */
  aplicarFiltroGrafico(): void {
    const ini = this.chartDataInicio();
    const fim = this.chartDataFim();
    if (ini && fim) {
      const dIni = parseISO(ini);
      const dFim = parseISO(fim);
      const dias = Math.max(1, Math.ceil((dFim.getTime() - dIni.getTime()) / (24 * 60 * 60 * 1000)) + 1);
      this.chartPeriodo.set(Math.min(365, Math.max(1, dias)));
    }
    this.carregarGraficoAtendimentos();
    this.chartFiltroOpen.set(false);
  }

  carregarGraficoAtendimentos(): void {
    const periodo = this.chartPeriodo();
    this.api.get<DashboardAdminResponse>('/admin/dashboard', { periodo: String(periodo) }).subscribe({
      next: (data) => this.dashboardGrafico.set(data),
      error: () => this.dashboardGrafico.set(null),
    });
  }

  /** Inicializa o filtro do card FATURAMENTO TOTAL com o mês atual (1º dia até hoje) e carrega o valor */
  iniciarFiltroFaturamentoMesAtual(): void {
    const hoje = new Date();
    const inicioMes = startOfMonth(hoje);
    this.faturamentoDataInicio.set(format(inicioMes, 'yyyy-MM-dd'));
    this.faturamentoDataFim.set(format(hoje, 'yyyy-MM-dd'));
    this.faturamentoFiltroCarregando.set(true);
    this.api
      .get<DashboardAdminResponse>('/admin/dashboard', {
        data_inicio: format(inicioMes, 'yyyy-MM-dd'),
        data_fim: format(hoje, 'yyyy-MM-dd'),
      })
      .subscribe({
        next: (data) => {
          this.faturamentoTotalFiltrado.set(data?.faturamento_total ?? 0);
          this.dashboardFiltroFaturamento.set(data ?? null);
          this.faturamentoFiltroCarregando.set(false);
        },
        error: () => this.faturamentoFiltroCarregando.set(false),
      });
  }

  toggleFaturamentoFiltro(): void {
    const open = !this.faturamentoFiltroOpen();
    if (open && !this.faturamentoDataInicio() && !this.faturamentoDataFim()) {
      const hoje = new Date();
      this.faturamentoDataInicio.set(format(startOfMonth(hoje), 'yyyy-MM-dd'));
      this.faturamentoDataFim.set(format(hoje, 'yyyy-MM-dd'));
    }
    this.faturamentoFiltroOpen.set(open);
    if (open) {
      setTimeout(() => this.atualizarPosicaoPanelFaturamento(), 0);
    }
  }

  /** Posiciona o painel do filtro logo abaixo do botão de filtro do card FATURAMENTO TOTAL */
  atualizarPosicaoPanelFaturamento(): void {
    const el = this.faturamentoFiltroBtn?.nativeElement;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    this.faturamentoPanelTop.set(rect.bottom + 8);
    this.faturamentoPanelLeft.set(rect.left);
  }

  aplicarFaturamentoFiltro(): void {
    const inicio = this.faturamentoDataInicio().trim();
    const fim = this.faturamentoDataFim().trim();
    if (!inicio || !fim) return;
    this.faturamentoFiltroCarregando.set(true);
    this.api
      .get<DashboardAdminResponse>('/admin/dashboard', { data_inicio: inicio, data_fim: fim })
      .subscribe({
        next: (data) => {
          this.faturamentoTotalFiltrado.set(data?.faturamento_total ?? 0);
          this.dashboardFiltroFaturamento.set(data ?? null);
          this.faturamentoFiltroCarregando.set(false);
          this.faturamentoFiltroOpen.set(false);
        },
        error: () => {
          this.faturamentoFiltroCarregando.set(false);
        },
      });
  }

  limparFaturamentoFiltro(): void {
    this.faturamentoTotalFiltrado.set(null);
    this.dashboardFiltroFaturamento.set(null);
    this.faturamentoDataInicio.set('');
    this.faturamentoDataFim.set('');
    this.faturamentoFiltroOpen.set(false);
  }

  /** Abre o modal de atendimentos do dia ao clicar em um dia do gráfico */
  abrirModalAtendimentosDia(data: string): void {
    if (!data) return;
    this.dataSelecionadaAtendimentos.set(data);
    this.atendimentosDiaModalOpen.set(true);
    this.carregandoAtendimentosDia.set(true);
    this.api.get<AtendimentoDiaItem[]>('/admin/atendimentos-dia', { data }).subscribe({
      next: (list) => {
        this.listaAtendimentosDia.set(list ?? []);
        this.carregandoAtendimentosDia.set(false);
      },
      error: () => {
        this.listaAtendimentosDia.set([]);
        this.carregandoAtendimentosDia.set(false);
      },
    });
  }

  fecharModalAtendimentosDia(): void {
    this.atendimentosDiaModalOpen.set(false);
    this.atendimentoExpandidoId.set(null);
    this.detalheAtendimentoMap.set({});
    this.carregandoDetalheId.set(null);
  }

  /** Abre o modal de movimentações do caixa (ao clicar no card Caixa do Dia) — mesma modal do dashboard-recepcao */
  abrirModalMovimentacoesCaixa(): void {
    this.movimentacoesCaixaModalOpen.set(true);
    this.carregandoMovimentacoesCaixa.set(true);
    type MovItem = { id: number; tipo: string; nome?: string; valor: number; data: string; tipo_pagamento?: string; observacao?: string };
    this.api.get<MovItem[] | { data?: MovItem[] }>('/caixa/ultimos', { limite: '200' }).subscribe({
      next: (res) => {
        const list: MovItem[] = Array.isArray(res) ? res : (res && Array.isArray((res as { data?: MovItem[] }).data) ? (res as { data: MovItem[] }).data : []);
        this.listaMovimentacoesCaixa.set([...list]);
        this.carregandoMovimentacoesCaixa.set(false);
      },
      error: () => {
        this.listaMovimentacoesCaixa.set([]);
        this.carregandoMovimentacoesCaixa.set(false);
      },
    });
  }

  fecharModalMovimentacoesCaixa(): void {
    this.movimentacoesCaixaModalOpen.set(false);
  }

  /** Recarrega apenas saldo e estado do caixa (após lançamento, sangria, encerrar, recebimento) */
  recarregarCaixa(): void {
    this.api.get<{ saldo: number }>('/caixa/saldo').subscribe({
      next: (res) => this.saldoCaixa.set(res?.saldo ?? 0),
      error: () => {},
    });
    this.api.get<{ valor_abertura: number }>('/caixa/aberto').subscribe({
      next: (res) => this.caixaAberto.set(res && res.valor_abertura != null ? res : null),
      error: () => this.caixaAberto.set(null),
    });
  }

  abrirModalAberturaCaixa(): void {
    this.aberturaCaixaForm.reset({ valor_abertura: 0, observacao: '' });
    this.aberturaCaixaErro.set('');
    this.aberturaCaixaModalOpen.set(true);
  }

  fecharModalAberturaCaixa(): void {
    this.aberturaCaixaModalOpen.set(false);
    this.aberturaCaixaErro.set('');
  }

  confirmarAberturaCaixa(): void {
    if (this.aberturaCaixaForm.invalid) {
      this.aberturaCaixaForm.markAllAsTouched();
      this.aberturaCaixaErro.set('Informe o valor de abertura (obrigatório e maior ou igual a zero).');
      return;
    }
    const { valor_abertura, observacao } = this.aberturaCaixaForm.value;
    const idUsuario = this.user()?.id;
    this.aberturaCaixaSalvando.set(true);
    this.aberturaCaixaErro.set('');
    this.api
      .post<unknown>('/caixa/abrir', {
        valor_abertura: Number(valor_abertura),
        observacao: (observacao || '').trim() || undefined,
        ...(idUsuario ? { id_usuario: idUsuario } : {}),
      })
      .subscribe({
        next: () => {
          this.aberturaCaixaSalvando.set(false);
          this.fecharModalAberturaCaixa();
          this.recarregarCaixa();
        },
        error: (err) => {
          this.aberturaCaixaSalvando.set(false);
          this.aberturaCaixaErro.set(err?.error?.error || 'Erro ao abrir caixa.');
        },
      });
  }

  abrirModalLancamentoManual(): void {
    this.lancamentoManualForm.reset({ descricao: '', valor: 0 });
    this.lancamentoManualErro.set('');
    this.lancamentoManualModalOpen.set(true);
  }

  fecharModalLancamentoManual(): void {
    this.lancamentoManualModalOpen.set(false);
    this.lancamentoManualErro.set('');
  }

  salvarLancamentoManual(): void {
    if (this.lancamentoManualForm.invalid) {
      this.lancamentoManualForm.markAllAsTouched();
      this.lancamentoManualErro.set('Preencha o valor (obrigatório e maior que zero).');
      return;
    }
    const u = this.user();
    const idUsuario = u?.id ?? 0;
    if (!idUsuario) {
      this.lancamentoManualErro.set('Usuário não identificado.');
      return;
    }
    const { descricao, valor } = this.lancamentoManualForm.value;
    this.lancamentoManualSalvando.set(true);
    this.lancamentoManualErro.set('');
    this.api.post('/caixa/lancamento-manual', { descricao: (descricao || '').trim(), valor: Number(valor), id_usuario: idUsuario }).subscribe({
      next: () => {
        this.lancamentoManualSalvando.set(false);
        this.fecharModalLancamentoManual();
        this.recarregarCaixa();
      },
      error: (err) => {
        this.lancamentoManualSalvando.set(false);
        this.lancamentoManualErro.set(err?.error?.error || 'Erro ao registrar lançamento.');
      },
    });
  }

  abrirModalSangria(): void {
    this.sangriaForm.reset({ valor: 0, observacao: '' });
    this.sangriaErro.set('');
    this.sangriaModalOpen.set(true);
  }

  fecharModalSangria(): void {
    this.sangriaModalOpen.set(false);
    this.sangriaErro.set('');
  }

  salvarSangria(): void {
    if (this.sangriaForm.invalid) {
      this.sangriaForm.markAllAsTouched();
      this.sangriaErro.set('Informe um valor maior que zero.');
      return;
    }
    const { valor, observacao } = this.sangriaForm.value;
    const idUsuario = this.user()?.id;
    this.sangriaSalvando.set(true);
    this.sangriaErro.set('');
    this.api.post('/caixa/sangria', { valor: Number(valor), observacao: (observacao || '').trim(), ...(idUsuario ? { id_usuario: idUsuario } : {}) }).subscribe({
      next: () => {
        this.sangriaSalvando.set(false);
        this.fecharModalSangria();
        this.recarregarCaixa();
      },
      error: (err) => {
        this.sangriaSalvando.set(false);
        this.sangriaErro.set(err?.error?.error || 'Erro ao registrar sangria.');
      },
    });
  }

  abrirModalEncerrarCaixa(): void {
    this.encerrarCaixaForm.reset({ observacao: '' });
    this.encerrarCaixaErro.set('');
    this.encerrarCaixaModalOpen.set(true);
  }

  fecharModalEncerrarCaixa(): void {
    this.encerrarCaixaModalOpen.set(false);
    this.encerrarCaixaErro.set('');
  }

  confirmarEncerrarCaixa(): void {
    const saldo = this.saldoCaixa();
    this.encerrarCaixaSalvando.set(true);
    this.encerrarCaixaErro.set('');
    const observacao = this.encerrarCaixaForm.get('observacao')?.value?.trim() || '';
    this.api.post('/caixa/fechar', { valor_fechamento: saldo, observacao }).subscribe({
      next: () => {
        this.encerrarCaixaSalvando.set(false);
        this.fecharModalEncerrarCaixa();
        this.recarregarCaixa();
        this.recarregarDashboard();
      },
      error: (err) => {
        this.encerrarCaixaSalvando.set(false);
        this.encerrarCaixaErro.set(err?.error?.error || 'Erro ao encerrar caixa.');
      },
    });
  }

  abrirModalRecebimentoLista(): void {
    this.recebimentoListaModalOpen.set(true);
    this.selectedEncerradoParaRec.set(null);
    this.recebimentoErro.set('');
    this.tipoPagamentoRecebimento.set('DINHEIRO');
    this.carregandoEncerrados.set(true);
    this.api.get<{ id_atendimento: number; nome?: string; total: number }[]>('/recepcao/encerrados').subscribe({
      next: (list) => {
        this.listaEncerrados.set(list ?? []);
        this.carregandoEncerrados.set(false);
      },
      error: () => {
        this.listaEncerrados.set([]);
        this.carregandoEncerrados.set(false);
      },
    });
  }

  fecharModalRecebimentoLista(): void {
    this.recebimentoListaModalOpen.set(false);
    this.selectedEncerradoParaRec.set(null);
    this.recebimentoErro.set('');
  }

  selecionarEncerradoParaRec(item: { id_atendimento: number; nome?: string; total: number }): void {
    this.selectedEncerradoParaRec.set(item);
    this.tipoPagamentoRecebimento.set('DINHEIRO');
    this.recebimentoErro.set('');
  }

  voltarListaEncerrados(): void {
    this.selectedEncerradoParaRec.set(null);
    this.recebimentoErro.set('');
  }

  confirmarRecebimentoEncerrado(): void {
    const item = this.selectedEncerradoParaRec();
    if (!item) return;
    const idUsuario = this.user()?.id;
    this.recebimentoCarregando.set(true);
    this.recebimentoErro.set('');
    const tipo = this.tipoPagamentoRecebimento();
    const observacao = this.observacaoFormaPagamento(tipo);
    this.api
      .post('/caixa', {
        id_atendimento: item.id_atendimento,
        valor: item.total,
        tipo_pagamento: tipo,
        ...(observacao ? { observacao } : {}),
        ...(idUsuario ? { id_usuario: idUsuario } : {}),
      })
      .subscribe({
        next: () => {
          this.recebimentoCarregando.set(false);
          this.fecharModalRecebimentoLista();
          this.recarregarCaixa();
          this.recarregarDashboard();
        },
        error: (err) => {
          this.recebimentoCarregando.set(false);
          this.recebimentoErro.set(err?.error?.error || 'Erro ao registrar recebimento.');
        },
      });
  }

  formatarDataHoraMovimentacao(data: string): string {
    if (!data) return '—';
    try {
      const d = parseISO(data);
      return format(d, 'dd/MM/yyyy HH:mm', { locale: ptBR });
    } catch {
      return data;
    }
  }

  /** Alterna a exibição do detalhe (serviços/produtos) de um atendimento no modal */
  toggleDetalheAtendimento(idAtendimento: number): void {
    const atual = this.atendimentoExpandidoId();
    if (atual === idAtendimento) {
      this.atendimentoExpandidoId.set(null);
      return;
    }
    this.atendimentoExpandidoId.set(idAtendimento);
    const map = this.detalheAtendimentoMap();
    if (map[idAtendimento]) {
      return;
    }
    this.carregandoDetalheId.set(idAtendimento);
    this.api.get<DetalheAtendimento>(`/atendimentos/${idAtendimento}/detalhe`).subscribe({
      next: (detalhe) => {
        this.detalheAtendimentoMap.update((m) => ({ ...m, [idAtendimento]: detalhe }));
        this.carregandoDetalheId.set(null);
      },
      error: () => this.carregandoDetalheId.set(null),
    });
  }

  /** Data formatada para o título do modal: "Atendimentos em DD/MM/YYYY" */
  formatarDataTituloModal(data: string): string {
    if (!data) return '';
    try {
      const d = parseISO(data);
      return format(d, 'dd/MM/yyyy', { locale: ptBR });
    } catch {
      return data;
    }
  }

  /** Hora para exibir no card: HH:mm */
  formatarHoraAtendimento(dataHora: string): string {
    if (!dataHora) return '—';
    try {
      const d = parseISO(dataHora);
      return format(d, 'HH:mm', { locale: ptBR });
    } catch {
      return dataHora;
    }
  }

  /** Valor em reais para o card */
  formatarValorAtendimento(total: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total ?? 0);
  }

  /** Saudação: Bom dia / Boa tarde / Boa noite */
  saudacao = computed(() => {
    const h = new Date().getHours();
    if (h < 12) return 'Bom dia';
    if (h < 18) return 'Boa tarde';
    return 'Boa noite';
  });

  /** Nome do usuário para exibição */
  nomeUsuario = computed(() => this.user()?.nome?.split(' ')[0] ?? 'Usuário');

  /** Cargo para exibição no sidebar */
  cargoUsuario = computed(() => {
    const p = this.user()?.perfil ?? '';
    if (p === 'ADMIN' || p === 'DONO') return 'Administrador';
    if (p === 'RECEPCIONISTA' || p === 'RECEPCAO') return 'Recepcionista';
    if (p === 'CABELEIREIRO') return 'Cabeleireiro';
    return p || 'Usuário';
  });

  /** Valor receita diária para card (saldo caixa ou receita do dia) */
  receitaDiariaValor = computed(() => {
    const saldo = this.saldoCaixa();
    const rec = this.receitaDia();
    return saldo > 0 ? saldo : rec;
  });

  /** Exclui RECEBIMENTO — evitando duplicidade (recebimento pode ser feito por outro usuário) */
  notificacoesParaExibir = computed(() =>
    this.notificacoes().filter((n) => (n.tipo || '').toUpperCase() !== 'RECEBIMENTO')
  );
  /** Notificações não lidas (para badge e lista), excluindo RECEBIMENTO */
  notificacoesNaoLidas = computed(() => this.notificacoesParaExibir().filter((n) => !n.lido));

  /** Clientes em espera (fila AGUARDANDO) — igual ao app */
  clientesEmEspera = computed(() => this.dashboard()?.em_espera ?? 0);

  /** Valor de abertura do caixa (quando há caixa aberto) */
  valorAberturaCaixa = computed(() => this.caixaAberto()?.valor_abertura ?? 0);

  /** Total agendamentos do mês atual (card AGENDAMENTOS) */
  totalAgendamentosMes = computed(() => this.agendaListaMesAtual().length);

  /** Alertas estoque: notificações de estoque ou mock (exclui RECEBIMENTO) */
  alertasEstoque = computed(() => {
    const not = this.notificacoesParaExibir().filter(
      (n) => n.tipo?.toLowerCase().includes('estoque') || n.titulo?.toLowerCase().includes('estoque')
    );
    return not.length > 0 ? not.length : 0;
  });
  alertasEstoqueTexto = computed(() => {
    const n = this.alertasEstoque();
    return n === 0 ? 'Nenhum alerta' : n === 1 ? '01 Item' : `${String(n).padStart(2, '0')} Itens`;
  });

  /** Gráfico Atendimentos: usa dados do dashboard do gráfico (período 15/30/60/90) */
  /** Dados do gráfico: quando o filtro de data do FATURAMENTO TOTAL está aplicado, usa esse período; senão usa o período do gráfico (15d) */
  graficoDados = computed((): GraficoDiaItem[] => {
    const d = this.dashboardFiltroFaturamento() ?? this.dashboardGrafico();
    if (!d?.grafico?.length) return [];
    return d.grafico;
  });

  /** Fluxo de caixa total (soma do gráfico do período atual) */
  fluxoCaixaTotal = computed(() => {
    const g = this.graficoDados();
    return g.reduce((s, i) => s + (i.valor || 0), 0);
  });

  /** Valor exibido no card FATURAMENTO TOTAL: filtro aplicado ou valor do período do gráfico */
  valorFaturamentoCard = computed(() => {
    const filtrado = this.faturamentoTotalFiltrado();
    if (filtrado !== null) return filtrado;
    return this.fluxoCaixaTotal();
  });

  /** Média diária de faturamento (base do gráfico atual) para a estimativa */
  mediaDiariaFaturamento = computed(() => {
    const total = this.fluxoCaixaTotal();
    const dias = this.chartPeriodo() || 1;
    return total / dias;
  });

  /** Estimativa de faturamento: média diária × próximos X dias */
  estimativaValor = computed(() => {
    const media = this.mediaDiariaFaturamento();
    const dias = this.estimativaPeriodo();
    return media * dias;
  });

  setEstimativaPeriodo(dias: number): void {
    this.estimativaPeriodo.set(dias);
  }

  /** Barras do gráfico de estimativa: últimos 15 dias (base), mesmo graficoDados */
  estimativaChartBars = computed((): { x: number; y: number; width: number; height: number; valor: number; index: number }[] => {
    const dados = this.graficoDados();
    const w = 200;
    const h = 70;
    const pad = { top: 8, right: 8, bottom: 18, left: 8 };
    const innerW = w - pad.left - pad.right;
    const innerH = h - pad.top - pad.bottom;
    if (dados.length === 0) return [];
    const max = Math.max(...dados.map((d) => d.valor), 1);
    const n = dados.length;
    const gap = 2;
    const barWidth = Math.max(1, (innerW - (n - 1) * gap) / n);
    const baseY = h - pad.bottom;
    return dados.map((d, i) => {
      const barHeight = (d.valor / max) * innerH;
      const x = pad.left + i * (barWidth + gap);
      const y = baseY - barHeight;
      return { x, y, width: barWidth, height: barHeight, valor: d.valor, index: i };
    });
  });

  estimativaChartWidth = 200;
  estimativaChartHeight = 70;

  /** Cores para o gráfico de pizza (mesmo período do gráfico de barras) */
  private pieColors = ['#ff9000', '#e67e22', '#d35400', '#b8860b', '#8b6914', '#6b5344'];

  /** Fatias do gráfico de pizza: ranking do período (filtro de data ou dashboard do gráfico) */
  pieSlices = computed((): { label: string; value: number; percent: number; color: string; path: string }[] => {
    const ranking = (this.dashboardFiltroFaturamento() ?? this.dashboardGrafico())?.ranking ?? [];
    const list = ranking.slice(0, 6).filter((r) => (r.total ?? 0) > 0);
    const total = list.reduce((s, r) => s + (r.total ?? 0), 0);
    if (total === 0) return [];
    const cx = 100;
    const cy = 100;
    const r = 70;
    let startAngle = -Math.PI / 2; // começa no topo (12h)
    return list.map((item, i) => {
      const value = item.total ?? 0;
      const percent = total > 0 ? (value / total) * 100 : 0;
      const sweepAngle = (percent / 100) * 2 * Math.PI;
      const endAngle = startAngle + sweepAngle;
      const x1 = cx + r * Math.cos(startAngle);
      const y1 = cy + r * Math.sin(startAngle);
      const x2 = cx + r * Math.cos(endAngle);
      const y2 = cy + r * Math.sin(endAngle);
      const largeArc = percent > 50 ? 1 : 0;
      const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
      startAngle = endAngle;
      return {
        label: item.nome ?? '—',
        value,
        percent,
        color: this.pieColors[i % this.pieColors.length],
        path,
      };
    });
  });

  /** Ranking: quantidade de atendimentos e valor total por profissional (usa filtro de data do FATURAMENTO TOTAL ou do painel se aplicado) */
  rankingProfissionais = computed((): { nome: string; atendimentos: number; total: number }[] => {
    const source = this.dashboardFiltroFaturamento() ?? this.dashboardCabeleireiros() ?? this.dashboard();
    const r = source?.ranking ?? [];
    return r.slice(0, 5).map((item: RankingItem) => ({
      nome: item.nome,
      atendimentos: item.atendimentos ?? 0,
      total: item.total ?? 0,
    }));
  });

  /** Lista completa para o modal "Ver todos": todos os usuários CABELEIREIRO com quantidade e valor (0 se não estiver no ranking) */
  rankingProfissionaisCompleto = computed((): { nome: string; atendimentos: number; total: number }[] => {
    const source = this.dashboardFiltroFaturamento() ?? this.dashboardCabeleireiros() ?? this.dashboard();
    const r = (source?.ranking ?? []) as RankingItem[];
    const rankingMap = new Map<string, { atendimentos: number; total: number }>();
    r.forEach((item) => {
      const nome = (item.nome ?? '').trim();
      if (nome) rankingMap.set(nome, { atendimentos: item.atendimentos ?? 0, total: item.total ?? 0 });
    });
    const cabList = this.cabeleireiros();
    if (cabList.length === 0) return r.map((item) => ({ nome: item.nome ?? '', atendimentos: item.atendimentos ?? 0, total: item.total ?? 0 }));
    return cabList.map((c) => {
      const nome = (c.nome ?? '').trim();
      const dados = rankingMap.get(nome);
      return {
        nome: nome || 'Sem nome',
        atendimentos: dados?.atendimentos ?? 0,
        total: dados?.total ?? 0,
      };
    });
  });

  /** Máximo do ranking (valor total) para barra de progresso */
  rankingMax = computed(() => {
    const r = this.rankingProfissionais();
    if (r.length === 0) return 1;
    return Math.max(...r.map((x) => x.total), 1);
  });

  /** Atividade recente: do dashboard ou fallback notificações */
  atividadeRecente = computed((): { texto: string; cor: string; tempo: string }[] => {
    const d = this.dashboard()?.atividade_recente ?? [];
    if (d.length > 0) {
      return d.slice(0, 5).map((a: AtividadeRecenteItem) => {
        const textoObs = a.observacao ? ` • ${a.observacao}` : '';
        return {
          texto: `Venda - R$ ${(a.valor ?? 0).toFixed(2).replace('.', ',')} • ${a.nome ?? ''}${textoObs}`,
          cor: 'green',
          tempo: this.formatarTempoAtras(a.data),
        };
      });
    }
    const not = this.notificacoesParaExibir().slice(0, 5);
    return not.map((n) => ({
      texto: n.titulo + (n.subtitulo ? ` • ${n.subtitulo}` : ''),
      cor: 'orange',
      tempo: n.tempo_atras ?? '',
    }));
  });

  /** Agenda de hoje (primeiros 5) */
  agendaHojeLista = computed(() => this.agendamentosHoje().slice(0, 5));

  /** Dimensões do gráfico de barras (viewBox) */
  chartWidth = 380;
  chartHeight = 140;
  chartPadding = { top: 20, right: 16, bottom: 24, left: 16 };

  /** Barras para o gráfico: x, y, width, height, valor, index (para cor alternada) */
  chartBars = computed((): { x: number; y: number; width: number; height: number; valor: number; index: number }[] => {
    const dados = this.graficoDados();
    const w = this.chartWidth;
    const h = this.chartHeight;
    const pad = this.chartPadding;
    const innerW = w - pad.left - pad.right;
    const innerH = h - pad.top - pad.bottom;

    if (dados.length === 0) return [];

    const max = Math.max(...dados.map((d) => d.valor), 1);
    const n = dados.length;
    const gap = 4;
    const barWidth = Math.max(2, (innerW - (n - 1) * gap) / n);
    const baseY = h - pad.bottom;

    return dados.map((d, i) => {
      const barHeight = (d.valor / max) * innerH;
      const x = pad.left + i * (barWidth + gap);
      const y = baseY - barHeight;
      return { x, y, width: barWidth, height: barHeight, valor: d.valor, index: i };
    });
  });

  /** Linhas de grade horizontais (y em unidades do viewBox) */
  chartGridLines = computed(() => {
    const h = this.chartHeight;
    const pad = this.chartPadding;
    const innerH = h - pad.top - pad.bottom;
    const count = 4;
    const lines: number[] = [];
    for (let i = 1; i <= count; i++) {
      lines.push(pad.top + (innerH * i) / (count + 1));
    }
    return lines;
  });

  toggleNotificacoes(): void {
    this.notificacoesModalOpen.update((v) => !v);
  }

  fecharModalNotificacoes(): void {
    this.notificacoesModalOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.notificacoesModalOpen()) {
      this.fecharModalNotificacoes();
    }
  }

  /** True se a notificação é do tipo RECEBIMENTO (exibe card verde com ícone de dinheiro). */
  isNotifRecebimento(n: NotificacaoItem): boolean {
    return (n?.tipo ?? '').toUpperCase() === 'RECEBIMENTO';
  }

  /** True se a notificação é de produto/estoque (REABASTECER ou tipo com PRODUTO) — exibe ícone ou imagem. */
  isNotifProduto(n: NotificacaoItem): boolean {
    const t = (n?.tipo ?? '').toUpperCase();
    return t === 'REABASTECER' || t.includes('PRODUTO') || t.includes('ESTOQUE');
  }

  /** URL da imagem do produto na notificação (path do backend ou URL absoluta). */
  notifImagemProdutoUrl(n: NotificacaoItem): string {
    const img = (n?.imagem_produto ?? '').trim();
    if (!img) return '';
    if (img.startsWith('http://') || img.startsWith('https://')) return img;
    const base = (environment?.apiUrl ?? '').replace(/\/api\/?$/, '') || 'http://localhost:8080';
    return base + (img.startsWith('/') ? '' : '/') + img;
  }

  /** Ao clicar numa notificação: fecha o dropdown, marca como lida e abre a tela correspondente (produto = cadastro com qtde; recebimento = modal recebimento). */
  aoClicarNotificacao(n: NotificacaoItem): void {
    if (!n) return;
    this.fecharModalNotificacoes();
    this.marcarNotificacaoLida(n);

    if (this.isNotifProduto(n) && n.id_produto != null) {
      this.api.get<ProdutoEstoqueItem[]>('/produtos', { todos: '1' }).subscribe({
        next: (list) => {
          const produto = (list ?? []).find((p) => p.id === n.id_produto);
          if (produto) {
            this.abrirModalEditarProduto(produto);
          }
        },
        error: () => {},
      });
      return;
    }

    if (this.isNotifRecebimento(n) && n.id_atendimento != null && n.valor != null) {
      this.recebimentoNotificacao.set(n);
      this.recebimentoModalOpen.set(true);
      this.carregarDetalheRecebimento();
    }
  }

  marcarNotificacaoLida(not: NotificacaoItem): void {
    if (!not || not.lido) return;
    this.api.patch<void>(`/notificacoes/${not.id}/lido`, {}).subscribe({
      next: () => {
        this.notificacoes.update((lista) =>
          lista.map((n) => (n.id === not.id ? { ...n, lido: true } : n)),
        );
      },
      error: () => {
        // silencioso
      },
    });
  }

  /** Base URL do servidor (sem /api) para montar URL do avatar quando retornado como path relativo */
  private get serverBase(): string {
    const url = environment?.apiUrl ?? 'http://localhost:8080/api';
    return url.replace(/\/api\/?$/, '');
  }

  avatarUrl(): string {
    const u = this.user();
    if (u?.avatar) {
      const av = u.avatar;
      if (av.startsWith('http')) return av;
      return `${this.serverBase}/${av.startsWith('api/') ? av : 'api/' + av}`;
    }
    const nome = u?.nome ?? 'U';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&background=ff9000&color=1a1a1a`;
  }

  abrirModalConfiguracoes(): void {
    this.configSubView.set('menu');
    this.configDadosErro.set('');
    this.configSenhaErro.set('');
    this.configModalOpen.set(true);
  }

  fecharModalConfiguracoes(): void {
    this.configModalOpen.set(false);
    this.configSubView.set('menu');
  }

  configVoltarMenu(): void {
    this.configSubView.set('menu');
  }

  abrirConfigDadosPessoais(): void {
    const u = this.user();
    this.configDadosForm.patchValue({ nome: u?.nome ?? '' });
    this.configUsuarioLogin.set(u?.login ?? '');
    this.api.getUsuario(u?.id ?? 0).subscribe({
      next: (usuario) => {
        this.configUsuarioLogin.set(usuario.login ?? '');
        this.configUsuarioPerfil.set(usuario.perfil ?? '');
        this.configDadosForm.patchValue({ nome: usuario.nome ?? '' });
        this.configSubView.set('dados');
        this.configDadosErro.set('');
      },
      error: () => this.configDadosErro.set('Erro ao carregar dados.'),
    });
  }

  abrirConfigSegurancaSenha(): void {
    this.configSenhaForm.reset({ senha_atual: '', nova_senha: '', confirmar: '' });
    this.configSenhaErro.set('');
    this.configSubView.set('senha');
  }

  salvarConfigDadosPessoais(): void {
    if (this.configDadosForm.invalid) {
      this.configDadosForm.markAllAsTouched();
      return;
    }
    const id = this.user()?.id ?? 0;
    if (!id) return;
    const nome = this.configDadosForm.get('nome')?.value?.trim() ?? '';
    if (!nome) {
      this.configDadosErro.set('Nome é obrigatório.');
      return;
    }
    this.configDadosLoading.set(true);
    this.configDadosErro.set('');
    this.api.updateUsuario(id, { nome }).subscribe({
      next: () => {
        this.auth.updateUser({ ...this.user()!, nome });
        this.configDadosLoading.set(false);
        this.configSubView.set('menu');
      },
      error: (err) => {
        this.configDadosLoading.set(false);
        this.configDadosErro.set(err?.error?.error || 'Erro ao salvar.');
      },
    });
  }

  salvarConfigSenha(): void {
    if (this.configSenhaForm.invalid) {
      this.configSenhaForm.markAllAsTouched();
      const nova = this.configSenhaForm.get('nova_senha')?.value ?? '';
      const conf = this.configSenhaForm.get('confirmar')?.value ?? '';
      if (nova.length < 4) this.configSenhaErro.set('Nova senha deve ter no mínimo 4 caracteres.');
      else if (nova !== conf) this.configSenhaErro.set('Nova senha e confirmação não conferem.');
      return;
    }
    const id = this.user()?.id ?? 0;
    if (!id) return;
    const senhaAtual = this.configSenhaForm.get('senha_atual')?.value ?? '';
    const novaSenha = this.configSenhaForm.get('nova_senha')?.value ?? '';
    const confirmar = this.configSenhaForm.get('confirmar')?.value ?? '';
    if (novaSenha.length < 4) {
      this.configSenhaErro.set('Nova senha deve ter no mínimo 4 caracteres.');
      return;
    }
    if (novaSenha !== confirmar) {
      this.configSenhaErro.set('Nova senha e confirmação não conferem.');
      return;
    }
    this.configSenhaLoading.set(true);
    this.configSenhaErro.set('');
    this.api.alterarSenha(id, senhaAtual, novaSenha).subscribe({
      next: () => {
        this.configSenhaLoading.set(false);
        this.configSubView.set('menu');
      },
      error: (err) => {
        this.configSenhaLoading.set(false);
        this.configSenhaErro.set(err?.error?.error || 'Erro ao alterar senha.');
      },
    });
  }

  onAvatarSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];
    if (!file) return;
    const id = this.user()?.id ?? 0;
    if (!id) return;
    this.avatarUploading.set(true);
    this.api.uploadAvatar(id, file).subscribe({
      next: () => {
        this.api.getUsuario(id).subscribe({
          next: (usuario) => {
            this.auth.updateUser({ ...this.user()!, avatar: usuario.avatar ?? undefined });
            this.avatarUploading.set(false);
          },
          error: () => this.avatarUploading.set(false),
        });
      },
      error: () => {
        this.avatarUploading.set(false);
      },
    });
    input.value = '';
  }

  avatarUrlNome(nome: string): string {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&background=3e3b47&color=ff9000`;
  }

  encodeUrl(s: string): string {
    return encodeURIComponent(s ?? '');
  }

  /** Retorna apenas o dia (número) da data para o rótulo do gráfico. Ex: "2025-02-08" -> "8" */
  diaDoMes(data: string): string {
    if (!data) return '';
    try {
      const d = parseISO(data);
      return String(d.getDate());
    } catch {
      return data;
    }
  }

  private formatarTempoAtras(dataStr: string): string {
    try {
      const d = new Date(dataStr);
      const diff = Date.now() - d.getTime();
      const min = Math.floor(diff / 60000);
      const h = Math.floor(diff / 3600000);
      if (min < 60) return `${min} min atrás`;
      if (h < 24) return `${h}h atrás`;
      return `${Math.floor(h / 24)}d atrás`;
    } catch {
      return '';
    }
  }

  }
