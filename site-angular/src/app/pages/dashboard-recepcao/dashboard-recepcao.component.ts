import { Component, OnInit, OnDestroy, computed, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { format, parseISO, subDays, startOfMonth, endOfMonth, addMonths, subMonths, isSameMonth, getDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { AgendamentoApi } from '../../models/agendamento.model';
import {
  DashboardAdminResponse,
  GraficoDiaItem,
  CabeleireiroItem,
  RankingItem,
  NotificacaoItem,
  ProdutoEstoqueItem,
  ServicoItem,
  AgendaItem,
  AtendimentoDiaItem,
  DetalheAtendimento,
  AtendimentoFiltroItem,
} from '../../models/dashboard.model';
import { environment } from '../../../environments/environment';
import { MessageService } from 'primeng/api';

interface FilaItem {
  id: number;
  nome: string;
  servico?: string;
  hora: string;
  status: string;
}

@Component({
  selector: 'app-dashboard-recepcao',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './dashboard-recepcao.component.html',
  styleUrl: './dashboard-recepcao.component.scss',
})
export class DashboardRecepcaoComponent implements OnInit, OnDestroy {
  user = this.auth.user;

  loading = signal(true);
  saldoCaixa = signal<number>(0);
  caixaAberto = signal<{ valor_abertura: number } | null>(null);
  percentualCaixa = signal<number | null>(null);

  agendaHoje = signal<{ id: number; data_hora: string; horaFormatada: string; clienteNome: string; servicoDescricao: string; cabeleireiroNome?: string; status?: string }[]>([]);

  filaItens = signal<FilaItem[]>([]);
  notificacoes = signal<NotificacaoItem[]>([]);
  notificacoesModalOpen = signal(false);
  filaModalOpen = signal(false);
  recebimentoNotificacao = signal<NotificacaoItem | null>(null);
  recebimentoModalOpen = signal(false);
  tipoPagamentoRecebimento = signal<string>('DINHEIRO');
  recebimentoCarregando = signal(false);
  recebimentoErro = signal<string>('');
  recebimentoDetalhe = signal<DetalheAtendimento | null>(null);
  recebimentoDetalheCarregando = signal(false);
  private recebimentoIntervalId: any = null;
  private ultimoRecebimentoId: number | null = null;

  emEsperaCount = signal(0);
  agendamentosHojeCount = signal(0);
  estoqueBaixoCount = signal(0);
  atendidosCount = signal(0);

  /** Dashboard admin (período 30d) para cards: faturamento, em_espera, grafico */
  dashboard = signal<DashboardAdminResponse | null>(null);
  /** Agendamentos do mês atual para card AGENDAMENTOS */
  agendaListaMesAtual = signal<AgendaItem[]>([]);
  /** Modal movimentações do caixa (histórico: recebimentos, sangria, lançamentos manuais) — ao clicar no card CAIXA DO DIA */
  movimentacoesCaixaModalOpen = signal(false);
  listaMovimentacoesCaixa = signal<{ id: number; tipo: string; nome?: string; valor: number; data: string; tipo_pagamento?: string; observacao?: string }[]>([]);
  carregandoMovimentacoesCaixa = signal(false);

  /** Modal atendimentos do dia */
  atendimentosDiaModalOpen = signal(false);
  dataSelecionadaAtendimentos = signal<string>('');
  listaAtendimentosDia = signal<AtendimentoDiaItem[]>([]);
  carregandoAtendimentosDia = signal(false);
  atendimentoExpandidoId = signal<number | null>(null);
  detalheAtendimentoMap = signal<Record<number, DetalheAtendimento>>({});
  carregandoDetalheId = signal<number | null>(null);

  produtosModalOpen = signal(false);
  produtoFormModalOpen = signal(false);
  produtosList = signal<ProdutoEstoqueItem[]>([]);
  searchProdutoModal = signal('');
  produtoForm!: FormGroup;
  produtoEditId = signal<number | null>(null);
  produtoSalvando = signal(false);
  produtoErro = signal('');

  servicosModalOpen = signal(false);
  servicoFormModalOpen = signal(false);
  servicosList = signal<ServicoItem[]>([]);
  searchServicoModal = signal('');
  servicoForm!: FormGroup;
  servicoEditId = signal<number | null>(null);
  servicoSalvando = signal(false);
  servicoErro = signal('');


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

  /** Produtos para o card "Produtos em estoque" na dashboard */
  produtosEstoque = signal<ProdutoEstoqueItem[]>([]);
  searchProduto = signal('');

  readonly ESTOQUE_BAIXO_LIMITE = 5;
  estoqueBaixoModalOpen = signal(false);
  produtosEstoqueBaixo = signal<ProdutoEstoqueItem[]>([]);

  /** Gráfico Atendimentos */
  dashboardGrafico = signal<DashboardAdminResponse | null>(null);
  chartPeriodo = signal<number>(15);
  chartDataInicio = signal<string>('');
  chartDataFim = signal<string>('');
  chartFiltroOpen = signal(false);

  /** Cabeleireiros e Agenda (painéis inferiores) */
  cabeleireiros = signal<CabeleireiroItem[]>([]);
  agendaLista = signal<AgendaItem[]>([]);
  agendaFiltroOpen = signal(false);
  agendaFiltroForm: FormGroup;
  /** Modal Agenda (calendário) — usada pelo botão Calendário no card Agenda de Hoje */
  agendaModalOpen = signal(false);
  agendaCalendarMes = signal(format(new Date(), 'yyyy-MM'));
  agendaListaCalendario = signal<AgendaItem[]>([]);
  agendaDiaSelecionado = signal<string | null>(null);

  /** Modal Agenda (sidebar): tabela + pesquisa + mês + Cadastrar — igual DONO */
  modalAgendaOpen = signal(false);
  agendaModalMes = signal(format(new Date(), 'yyyy-MM'));
  agendaSearchCliente = signal('');
  agendaListaModal = signal<AgendaItem[]>([]);
  /** Modal Novo/Editar agendamento (aberta a partir da modal Agenda) */
  modalNovoAgendamentoOpen = signal(false);
  agendaEditId = signal<number | null>(null);
  agendamentoForm!: FormGroup;
  clientesList = signal<{ id: number; nome: string }[]>([]);
  servicosListAgenda = signal<ServicoItem[]>([]);
  agendamentoSalvando = signal(false);
  agendamentoErro = signal('');

  // Modal Configurações (Dados Pessoais + Segurança e Senha)
  configModalOpen = signal(false);
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

  /** Modal Novo Cliente (header + Cliente): Nome, Salvar, Cancelar — cadastra e coloca na fila */
  modalNovoClienteOpen = signal(false);
  clienteForm!: FormGroup;
  clienteSalvando = signal(false);
  clienteErro = signal('');

  /** Relatórios (sidebar): expandível com Produtos, Atendimentos, Agenda (sem Cabeleireiros) */
  relatoriosOpen = signal(false);
  modalRelatorioProdutosOpen = signal(false);
  relatorioProdutosList = signal<ProdutoEstoqueItem[]>([]);
  relatorioProdutoId = signal<number | null>(null);
  relatorioAtivo = signal<string>('');
  carregandoRelatorioProdutos = signal(false);
  modalRelatorioAtendimentosOpen = signal(false);
  relatorioAtendimentosForm!: FormGroup;
  listaRelatorioAtendimentos = signal<AtendimentoFiltroItem[]>([]);
  carregandoRelatorioAtendimentos = signal(false);
  cabeleireirosRelatorio = signal<CabeleireiroItem[]>([]);
  modalRelatorioAgendaOpen = signal(false);
  relatorioAgendaForm!: FormGroup;
  listaRelatorioAgenda = signal<AgendaItem[]>([]);
  carregandoRelatorioAgenda = signal(false);
  cabeleireirosRelatorioAgenda = signal<CabeleireiroItem[]>([]);

  constructor(
    public auth: AuthService,
    private api: ApiService,
    private fb: FormBuilder,
    private message: MessageService,
  ) {
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
    const hoje = new Date();
    const quinzeDiasAtras = subDays(hoje, 14);
    this.chartDataInicio.set(format(quinzeDiasAtras, 'yyyy-MM-dd'));
    this.chartDataFim.set(format(hoje, 'yyyy-MM-dd'));
    this.agendaFiltroForm = this.fb.group({
      mes: [format(hoje, 'yyyy-MM')],
      id_cabeleireiro: [''],
      status: [''],
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
    const hojeStr = format(hoje, 'yyyy-MM-dd');
    this.agendamentoForm = this.fb.group({
      nome_cliente: ['', Validators.required],
      data: [hojeStr, Validators.required],
      hora: ['09:00', Validators.required],
      id_servico: [null as number | null],
      id_cabeleireiro: [null as number | null],
      observacao: [''],
      id_cliente: [null as number | null],
    });
    const inicioMesRel = startOfMonth(hoje);
    this.relatorioAtendimentosForm = this.fb.group({
      data_inicio: [format(inicioMesRel, 'yyyy-MM-dd')],
      data_fim: [format(hoje, 'yyyy-MM-dd')],
      nome: [''],
      id_cabeleireiro: [''],
    });
    this.relatorioAgendaForm = this.fb.group({
      data_inicio: [format(inicioMesRel, 'yyyy-MM-dd')],
      data_fim: [format(hoje, 'yyyy-MM-dd')],
      nome: [''],
      id_cabeleireiro: [''],
    });
  }

  saudacao = computed(() => {
    const h = new Date().getHours();
    if (h < 12) return 'Bom dia';
    if (h < 18) return 'Boa tarde';
    return 'Boa noite';
  });
  nomeUsuario = computed(() => this.user()?.nome?.split(' ')[0] ?? 'recepção');
  /** Exclui RECEBIMENTO da lista — evitando duplicidade (recebimento pode ser feito por outro usuário) */
  notificacoesParaExibir = computed(() =>
    this.notificacoes().filter((n) => (n.tipo || '').toUpperCase() !== 'RECEBIMENTO')
  );
  notificacoesNaoLidas = computed(() => this.notificacoesParaExibir().filter((n) => !n.lido));
  pagamentosPendentesCount = computed(() => 0);

  produtosFiltrados = computed(() => {
    const lista = this.produtosList();
    const q = this.searchProdutoModal().trim().toLowerCase();
    if (!q) return lista;
    return lista.filter((p) => (p.descricao ?? '').toLowerCase().includes(q));
  });

  servicosFiltrados = computed(() => {
    const lista = this.servicosList();
    const q = this.searchServicoModal().trim().toLowerCase();
    if (!q) return lista;
    return lista.filter((s) => (s.descricao ?? '').toLowerCase().includes(q));
  });

  produtosEstoqueFiltrados = computed(() => {
    const lista = this.produtosEstoque();
    const q = this.searchProduto().trim().toLowerCase();
    if (!q) return lista;
    return lista.filter((p) => (p.descricao ?? '').toLowerCase().includes(q));
  });

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

  /** Faturamento total (soma do gráfico 30d) para card FATURAMENTO TOTAL */
  fluxoCaixaTotal = computed(() => {
    const d = this.dashboard();
    const grafico = d?.grafico ?? [];
    return grafico.reduce((s, i) => s + (i.valor || 0), 0);
  });
  /** Clientes em espera para card EM ESPERA */
  clientesEmEspera = computed(() => this.dashboard()?.em_espera ?? this.emEsperaCount());
  /** Total agendamentos do mês para card AGENDAMENTOS */
  totalAgendamentosMes = computed(() => this.agendaListaMesAtual().length);
  /** Valor de abertura do caixa */
  valorAberturaCaixa = computed(() => this.caixaAberto()?.valor_abertura ?? 0);

  /** Gráfico: dados do dashboard grafico */
  graficoDados = computed((): GraficoDiaItem[] => {
    const d = this.dashboardGrafico();
    return d?.grafico ?? [];
  });

  /** Primeiras 5 linhas da agenda para o card */
  agendaListaCard = computed(() => this.agendaLista().slice(0, 5));

  /** Ranking profissionais (Cabeleireiros) */
  rankingProfissionais = computed((): { nome: string; atendimentos: number; total: number }[] => {
    const d = this.dashboard();
    const r = d?.ranking ?? [];
    return r.slice(0, 5).map((item: RankingItem) => ({
      nome: item.nome ?? '',
      atendimentos: item.atendimentos ?? 0,
      total: item.total ?? 0,
    }));
  });

  chartWidth = 380;
  chartHeight = 140;
  chartPadding = { top: 20, right: 16, bottom: 24, left: 16 };

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

  ngOnInit(): void {
    this.carregarTudo();
    this.carregarGraficoAtendimentos();
    this.carregarCabeleireiros();
    this.carregarAgenda();
    this.iniciarMonitorRecebimentos();
  }

  ngOnDestroy(): void {
    if (this.recebimentoIntervalId) {
      clearInterval(this.recebimentoIntervalId);
    }
  }

  carregarTudo(): void {
    this.loading.set(true);
    const hoje = format(new Date(), 'yyyy-MM-dd');
    const mesAtual = format(new Date(), 'yyyy-MM');

    this.api.get<DashboardAdminResponse>('/admin/dashboard', { periodo: '30' }).subscribe({
      next: (data) => this.dashboard.set(data),
      error: () => this.dashboard.set(null),
    });
    this.api.get<AgendaItem[]>('/agendamentos/agenda', { mes: mesAtual }).subscribe({
      next: (list) => this.agendaListaMesAtual.set(list ?? []),
      error: () => this.agendaListaMesAtual.set([]),
    });
    this.api.get<{ saldo: number }>('/caixa/saldo').subscribe({
      next: (res) => this.saldoCaixa.set(res?.saldo ?? 0),
      error: () => {},
    });
    this.api.get<{ valor_abertura: number }>('/caixa/aberto').subscribe({
      next: (res) => this.caixaAberto.set(res && res.valor_abertura != null ? res : null),
      error: () => this.caixaAberto.set(null),
    });
    this.api.get<{ faturamento_total: number; percentual_vs_anterior?: number }>('/admin/dashboard', { periodo: '1' }).subscribe({
      next: (data) => this.percentualCaixa.set(data?.percentual_vs_anterior ?? null),
      error: () => {},
    });

    this.api.get<AgendamentoApi[]>('/agendamentos', { data: hoje }).subscribe({
      next: (list) => {
        const items = (list || []).map((a) => ({
          id: a.id,
          data_hora: a.data_hora,
          horaFormatada: format(parseISO(a.data_hora), 'HH:mm'),
          clienteNome: a.cliente?.nome ?? 'Cliente',
          servicoDescricao: a.servico?.descricao ?? 'Serviço',
          cabeleireiroNome: a.cabeleireiro?.nome,
          status: a.status ?? 'AGENDADO',
        }));
        this.agendaHoje.set(items);
        this.agendamentosHojeCount.set(items.length);
      },
      error: () => {
        this.agendaHoje.set([]);
        this.agendamentosHojeCount.set(0);
      },
    });

    this.carregarFila();
    this.api.get<ProdutoEstoqueItem[]>('/produtos', { todos: '1' }).subscribe({
      next: (list) => this.produtosEstoque.set(list ?? []),
      error: () => this.produtosEstoque.set([]),
    });
    this.api.get<NotificacaoItem[]>('/notificacoes', { perfil: 'RECEPCAO' }).subscribe({
      next: (list) => {
        this.notificacoes.set(list || []);
        const estoque = (list || []).filter((n) => (n.tipo || '').toUpperCase() === 'REABASTECER' || (n.titulo || '').toLowerCase().includes('estoque'));
        this.estoqueBaixoCount.set(estoque.length);
      },
      error: () => this.notificacoes.set([]),
      complete: () => this.loading.set(false),
    });

    this.api.get<{ id: number; status: string }[]>('/atendimentos', { data_inicio: hoje, data_fim: hoje, status: 'ENCERRADO' }).subscribe({
      next: (list) => this.atendidosCount.set((list || []).length),
      error: () => this.atendidosCount.set(0),
    });
  }

  carregarGraficoAtendimentos(): void {
    const periodo = this.chartPeriodo();
    this.api.get<DashboardAdminResponse>('/admin/dashboard', { periodo: String(periodo) }).subscribe({
      next: (data) => this.dashboardGrafico.set(data),
      error: () => this.dashboardGrafico.set(null),
    });
  }

  carregarCabeleireiros(): void {
    this.api.get<CabeleireiroItem[]>('/usuarios', { perfil: 'CABELEIREIRO' }).subscribe({
      next: (list) => this.cabeleireiros.set(list ?? []),
      error: () => this.cabeleireiros.set([]),
    });
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

  toggleChartFiltro(): void {
    this.chartFiltroOpen.update((v) => !v);
  }

  aplicarPeriodoGrafico(dias: number): void {
    const fim = new Date();
    const inicio = subDays(fim, dias - 1);
    this.chartPeriodo.set(dias);
    this.chartDataInicio.set(format(inicio, 'yyyy-MM-dd'));
    this.chartDataFim.set(format(fim, 'yyyy-MM-dd'));
    this.carregarGraficoAtendimentos();
    this.chartFiltroOpen.set(false);
  }

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

  toggleAgendaFiltro(): void {
    this.agendaFiltroOpen.update((v) => !v);
  }

  aplicarAgendaFiltro(): void {
    this.carregarAgenda();
    this.agendaFiltroOpen.set(false);
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

  carregarAgendaCalendario(): void {
    const mes = this.agendaCalendarMes();
    this.api.get<AgendaItem[]>('/agendamentos/agenda', { mes }).subscribe({
      next: (list) => this.agendaListaCalendario.set(list ?? []),
      error: () => this.agendaListaCalendario.set([]),
    });
  }

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

  navegarMesCalendario(delta: number): void {
    const [y, m] = this.agendaCalendarMes().split('-').map(Number);
    const d = new Date(y, m - 1, 1);
    const novo = delta < 0 ? subMonths(d, 1) : addMonths(d, 1);
    this.agendaCalendarMes.set(format(novo, 'yyyy-MM'));
    this.carregarAgendaCalendario();
  }

  diaTemAgendamento(data: Date): boolean {
    return this.diasComAgendamento().has(format(data, 'yyyy-MM-dd'));
  }

  agendaCalendarioTitulo = computed(() => {
    const mesStr = this.agendaCalendarMes();
    const [y, m] = mesStr.split('-').map(Number);
    const d = new Date(y, m - 1, 1);
    return format(d, 'MMMM yyyy', { locale: ptBR });
  });

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

  diaDoMes(data: string): string {
    if (!data) return '';
    try {
      const d = parseISO(data);
      return String(d.getDate());
    } catch {
      return data;
    }
  }

  avatarUrlNome(nome: string): string {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&background=3e3b47&color=ff9000`;
  }

  abrirModalAtendimentosDia(data: string): void {
    if (!data) return;
    this.dataSelecionadaAtendimentos.set(data);
    this.atendimentosDiaModalOpen.set(true);
    this.carregandoAtendimentosDia.set(true);
    this.atendimentoExpandidoId.set(null);
    this.detalheAtendimentoMap.set({});
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

  carregarFila(): void {
    type FilaRaw = { id: number; status: string; data_entrada: string; cliente?: { nome: string }; agendamento?: { servico?: { descricao: string } } };
    this.api.get<FilaRaw[]>('/fila', { status: 'AGUARDANDO' }).subscribe({
      next: (aguardando) => {
        const list = aguardando || [];
        this.emEsperaCount.set(list.length);
        const toItem = (f: FilaRaw): FilaItem => ({
          id: f.id,
          nome: f.cliente?.nome ?? 'Cliente',
          servico: f.agendamento?.servico?.descricao,
          hora: f.data_entrada ? format(parseISO(f.data_entrada), 'HH:mm') : '—',
          status: this.normalizarStatusFila(f.status),
        });
        this.filaItens.set(list.map(toItem));
      },
      error: () => {},
    });
  }

  abrirModalFila(): void {
    this.filaModalOpen.set(true);
  }

  fecharModalFila(): void {
    this.filaModalOpen.set(false);
  }

  carregarProdutosModal(): void {
    this.api.get<ProdutoEstoqueItem[]>('/produtos', { todos: '1' }).subscribe({
      next: (list) => this.produtosList.set(list ?? []),
      error: () => this.produtosList.set([]),
    });
  }

  abrirModalProdutos(): void {
    this.produtosModalOpen.set(true);
    this.searchProdutoModal.set('');
    this.produtoErro.set('');
    this.carregarProdutosModal();
  }

  fecharModalProdutos(): void {
    this.produtosModalOpen.set(false);
  }

  /** Valor de venda exibido no input com máscara R$ (para sincronizar ao abrir modal) */
  valorVendaMask = signal('');

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

  /** Formata número para exibição em reais (R$ 1.234,56) */
  formatarMoeda(val: number): string {
    if (val == null || Number.isNaN(val)) return 'R$ 0,00';
    return 'R$ ' + val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  /** Converte string do input (máscara) em número. Dígitos são tratados como centavos (150 -> 1,50). */
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

  fecharModalFormProduto(): void {
    this.produtoFormModalOpen.set(false);
    this.produtoEditId.set(null);
    this.produtoErro.set('');
  }

  produtoImagemUrl(p: ProdutoEstoqueItem): string {
    if (!p?.imagem?.trim()) return '';
    const img = p.imagem.trim();
    if (img.startsWith('http://') || img.startsWith('https://')) return img;
    const base = (environment?.apiUrl ?? '').replace(/\/api\/?$/, '') || 'http://localhost:8080';
    return base + (img.startsWith('/') ? '' : '/') + img;
  }

  onFileProdutoSelected(event: Event): void {
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
      next: () => this.carregarProdutosModal(),
      error: () => this.produtoErro.set('Erro ao excluir.'),
    });
  }

  carregarServicosModal(): void {
    this.api.get<ServicoItem[]>('/servicos', { todos: '1' }).subscribe({
      next: (list) => this.servicosList.set(list ?? []),
      error: () => this.servicosList.set([]),
    });
  }

  abrirModalServicos(): void {
    this.servicosModalOpen.set(true);
    this.searchServicoModal.set('');
    this.servicoErro.set('');
    this.carregarServicosModal();
  }

  /** Abre a modal de Agenda (tabela + pesquisa + Cadastrar), igual ao perfil DONO */
  abrirModalAgenda(): void {
    this.modalAgendaOpen.set(true);
    this.agendaSearchCliente.set('');
    this.carregarAgendaModal();
  }

  fecharModalAgenda(): void {
    this.modalAgendaOpen.set(false);
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
        this.listaRelatorioAtendimentos.set(f);
        this.carregandoRelatorioAtendimentos.set(false);
      },
      error: () => {
        this.listaRelatorioAtendimentos.set([]);
        this.carregandoRelatorioAtendimentos.set(false);
      },
    });
  }

  abrirRelatorioAtendimentosNovaAba(): void {
    const v = this.relatorioAtendimentosForm.value;
    const params: Record<string, string> = {};
    if (v.data_inicio) params['data_inicio'] = v.data_inicio;
    if (v.data_fim) params['data_fim'] = v.data_fim;
    if (v.id_cabeleireiro) params['id_cabeleireiro'] = String(v.id_cabeleireiro);
    this.carregandoRelatorioAtendimentos.set(true);
    this.api.get<AtendimentoFiltroItem[]>('/atendimentos', params).subscribe({
      next: (list) => {
        this.listaRelatorioAtendimentos.set(list ?? []);
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
      error: () => {},
    });
  }

  formatarDataHoraAgenda(dataHora: string): string {
    if (!dataHora) return '—';
    try {
      const d = parseISO(dataHora);
      return format(d, 'dd/MM/yyyy HH:mm', { locale: ptBR });
    } catch {
      return dataHora;
    }
  }

  formatarHoraAgenda(dataHora: string): string {
    if (!dataHora) return '—';
    try {
      const d = parseISO(dataHora);
      return format(d, 'HH:mm', { locale: ptBR });
    } catch {
      return dataHora;
    }
  }

  classeStatusAgenda(status?: string): string {
    if (!status) return 'agendado';
    const s = (status || '').toUpperCase();
    if (s.includes('CONFIRMADO')) return 'confirmado';
    if (s.includes('PENDENTE')) return 'pendente';
    return 'agendado';
  }

  isEstoqueBaixo(p: ProdutoEstoqueItem): boolean {
    return (p.estoque ?? 0) <= this.ESTOQUE_BAIXO_LIMITE;
  }

  fecharModalServicos(): void {
    this.servicosModalOpen.set(false);
  }

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

  abrirModalEstoqueBaixo(): void {
    this.estoqueBaixoModalOpen.set(true);
    this.api.get<ProdutoEstoqueItem[]>('/produtos', { todos: '1' }).subscribe({
      next: (list) => {
        const baixo = (list ?? []).filter((p) => (p.estoque ?? 0) <= this.ESTOQUE_BAIXO_LIMITE);
        this.produtosEstoqueBaixo.set(baixo.sort((a, b) => (a.estoque ?? 0) - (b.estoque ?? 0)));
      },
      error: () => this.produtosEstoqueBaixo.set([]),
    });
  }

  fecharModalEstoqueBaixo(): void {
    this.estoqueBaixoModalOpen.set(false);
  }

  private normalizarStatusFila(s: string): string {
    const u = (s || '').toUpperCase();
    if (u === 'FINALIZADO') return 'ATENDIDO';
    if (u === 'EM_ATENDIMENTO') return 'EM ATENDIMENTO';
    return 'AGUARDANDO';
  }

  private iniciarMonitorRecebimentos(): void {
    this.verificarRecebimentos();
    this.recebimentoIntervalId = setInterval(() => this.verificarRecebimentos(), 15000);
  }

  /** Não exibe toast de RECEBIMENTO — pode ser feito por outro usuário, evitando duplicidade */
  private verificarRecebimentos(): void {
    this.recebimentoNotificacao.set(null);
  }

  recarregarCaixa(): void {
    this.api.get<{ saldo: number }>('/caixa/saldo').subscribe({
      next: (res) => this.saldoCaixa.set(res?.saldo ?? 0),
      error: () => {},
    });
  }

  abrirModalMovimentacoesCaixa(): void {
    this.movimentacoesCaixaModalOpen.set(true);
    this.carregandoMovimentacoesCaixa.set(true);
    type Item = { id: number; tipo: string; nome?: string; valor: number; data: string; tipo_pagamento?: string; observacao?: string };
    this.api.get<Item[] | { data?: Item[] }>('/caixa/ultimos', { limite: '200' }).subscribe({
      next: (res) => {
        const list: Item[] = Array.isArray(res) ? res : (res && Array.isArray((res as { data?: Item[] }).data) ? (res as { data: Item[] }).data : []);
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

  formatarDataHoraMovimentacao(data: string): string {
    if (!data) return '—';
    try {
      const d = parseISO(data);
      return format(d, 'dd/MM/yyyy HH:mm', { locale: ptBR });
    } catch {
      return data;
    }
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
        this.carregarTudo();
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
          this.carregarTudo();
        },
        error: (err) => {
          this.recebimentoCarregando.set(false);
          this.recebimentoErro.set(err?.error?.error || 'Erro ao registrar recebimento.');
        },
      });
  }

  /** Abre modal de atendimentos do dia — sempre filtrando pela data de hoje. Usado ao clicar no card CAIXA DO DIA. */
  abrirModalCaixaDia(): void {
    const hoje = format(new Date(), 'yyyy-MM-dd');
    this.dataSelecionadaAtendimentos.set(hoje);
    this.atendimentosDiaModalOpen.set(true);
    this.atendimentoExpandidoId.set(null);
    this.detalheAtendimentoMap.set({});
    this.carregandoAtendimentosDia.set(true);
    this.api.get<AtendimentoDiaItem[]>('/admin/atendimentos-dia', { data: hoje }).subscribe({
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

  toggleDetalheAtendimento(idAtendimento: number): void {
    const atual = this.atendimentoExpandidoId();
    if (atual === idAtendimento) {
      this.atendimentoExpandidoId.set(null);
      return;
    }
    this.atendimentoExpandidoId.set(idAtendimento);
    const map = this.detalheAtendimentoMap();
    if (map[idAtendimento]) return;
    this.carregandoDetalheId.set(idAtendimento);
    this.api.get<DetalheAtendimento>(`/atendimentos/${idAtendimento}/detalhe`).subscribe({
      next: (detalhe) => {
        this.detalheAtendimentoMap.update((m) => ({ ...m, [idAtendimento]: detalhe }));
        this.carregandoDetalheId.set(null);
      },
      error: () => this.carregandoDetalheId.set(null),
    });
  }

  formatarDataTituloModal(data: string): string {
    if (!data) return '';
    try {
      const d = parseISO(data);
      return format(d, 'dd/MM/yyyy', { locale: ptBR });
    } catch {
      return data;
    }
  }

  formatarValorAtendimento(total: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total ?? 0);
  }

  toggleNotificacoes(): void {
    this.notificacoesModalOpen.update((v) => !v);
  }
  fecharModalNotificacoes(): void {
    this.notificacoesModalOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.notificacoesModalOpen()) this.fecharModalNotificacoes();
  }

  isNotifRecebimento(n: NotificacaoItem): boolean {
    return (n?.tipo ?? '').toUpperCase() === 'RECEBIMENTO';
  }
  isNotifProduto(n: NotificacaoItem): boolean {
    const t = (n?.tipo ?? '').toUpperCase();
    return t === 'REABASTECER' || t.includes('PRODUTO') || t.includes('ESTOQUE');
  }
  notifImagemProdutoUrl(n: NotificacaoItem): string {
    const img = (n?.imagem_produto ?? '').trim();
    if (!img) return '';
    if (img.startsWith('http://') || img.startsWith('https://')) return img;
    const base = (environment?.apiUrl ?? '').replace(/\/api\/?$/, '') || 'http://localhost:8080';
    return base + (img.startsWith('/') ? '' : '/') + img;
  }

  aoClicarNotificacao(n: NotificacaoItem): void {
    if (!n) return;
    this.fecharModalNotificacoes();
    this.marcarNotificacaoLida(n);
    if (this.isNotifProduto(n) && n.id_produto != null) {
      this.api.get<ProdutoEstoqueItem[]>('/produtos', { todos: '1' }).subscribe({
        next: (list) => {
          const produto = (list ?? []).find((p) => p.id === n.id_produto);
          if (produto) this.abrirModalEditarProduto(produto);
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
      next: () => this.notificacoes.update((lista) => lista.map((n) => (n.id === not.id ? { ...n, lido: true } : n))),
      error: () => {},
    });
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

  abrirModalRecebimento(): void {
    if (!this.recebimentoNotificacao()) return;
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
  confirmarRecebimentoNotificacao(): void {
    const notif = this.recebimentoNotificacao();
    if (!notif || !notif.id_atendimento || !notif.valor) return;
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
          this.api.patch<void>(`/notificacoes/${notif.id}/lido`, {}).subscribe({ next: () => {}, error: () => {} });
          this.recebimentoCarregando.set(false);
          this.recebimentoModalOpen.set(false);
          this.recebimentoNotificacao.set(null);
          this.recebimentoDetalhe.set(null);
          this.carregarTudo();
        },
        error: (err) => {
          this.recebimentoCarregando.set(false);
          this.recebimentoErro.set(err?.error?.error || 'Erro ao registrar recebimento.');
        },
      });
  }

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
    const nome = u?.nome ?? 'R';
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

  classeStatusFila(status: string): string {
    const s = (status || '').toUpperCase().replace(/_/g, ' ');
    if (s === 'ATENDIDO' || s === 'FINALIZADO') return 'atendido';
    if (s === 'EM ATENDIMENTO') return 'em-atendimento';
    return 'aguardando';
  }

  graficoCaixaLinha(): string {
    const saldo = this.saldoCaixa();
    const max = Math.max(saldo, 1);
    const h = 60;
    const pct = Math.min(100, (saldo / max) * 100);
    const y = h - (pct / 100) * h;
    return `M 0 ${h} L 0 ${y} L 80 ${y} L 80 ${h} Z`;
  }
}
