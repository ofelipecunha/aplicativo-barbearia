import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:barbearia/config/app_colors.dart';
import 'package:barbearia/config/app_typography.dart';
import 'package:barbearia/api/api_client.dart' show ApiClient, serverBase;
import 'package:barbearia/view/home_page/components/size_config.dart';
import 'package:barbearia/view/reception_page/cash_page.dart';
import 'package:barbearia/view/reception_page/produtos_servicos_page.dart';
import 'package:barbearia/view/shared/perfil_page.dart';
import 'package:barbearia/view/shared/app_circle_nav_bar.dart';
import 'package:barbearia/view/shared/notificacoes_modal.dart';
import 'package:barbearia/view/shared/add_cliente_modal.dart';
import 'package:barbearia/view/barber_page/barber_home.dart';
import 'package:barbearia/view/reception_page/reception_home.dart' show showRecebimentoModal;
import 'package:barbearia/view/reception_page/produtos_page.dart';
import 'package:barbearia/view/reception_page/agenda_page.dart';

const Color _orange = AppColors.loginOrange;
// Cores dos cards de filtro (ícone e série no gráfico)
const Color _corProdutos = Color(0xFF4CAF50);
const Color _corCabeleireiro = Color(0xFF80CBC4);

String _brl(num v) {
  final parts = v.toStringAsFixed(2).split('.');
  final inteiro = parts[0];
  final cents = parts[1];
  final buffer = StringBuffer();
  for (int i = 0; i < inteiro.length; i++) {
    final pos = inteiro.length - i;
    buffer.write(inteiro[i]);
    if (pos > 1 && pos % 3 == 1 && i != inteiro.length - 1) buffer.write('.');
  }
  return 'R\$ ${buffer.toString()},$cents';
}

class AdminDashboard extends StatefulWidget {
  final int userId;
  final String userName;

  const AdminDashboard({Key? key, required this.userId, required this.userName}) : super(key: key);

  @override
  State<AdminDashboard> createState() => _AdminDashboardState();
}

class _AdminDashboardState extends State<AdminDashboard> {
  int _navIndex = 0;
  int _periodoDias = 7; // 1=DIA, 7=SEMANA, 14, 30, 60
  Map<String, dynamic> _data = {};
  List<dynamic> _graficoData = []; // só o gráfico muda ao trocar filtro
  bool _loading = true;
  bool _graficoLoading = false;
  String? _error;
  String? _avatarUrl;
  /// Ranking com filtro de data/vendedor; quando null, usa _data['ranking'].
  List<dynamic>? _rankingFiltrado;
  bool _rankingFiltroAtivo = false;

  /// Filtros combináveis do dashboard (gráfico e KPIs)
  bool _filtroServicos = false;
  bool _filtroProdutos = false;
  String? _filtroTipoPagamento; // null = todos; PIX, CARTAO, DINHEIRO
  int? _filtroIdCabeleireiro;   // null = todos
  List<Map<String, dynamic>> _graficoSeries = []; // quando backend retorna grafico_series (múltiplas séries)
  /// Atendimentos encerrados aguardando pagamento (mesmo que notificações RECEBIMENTO).
  List<Map<String, dynamic>> _encerradosAguardandoPagamento = [];
  int _notificacoesCount = 0;
  /// Cards da agenda: um por agendamento (cliente com horário), com dia, hora, cabeleireiro, serviço e cliente.
  List<Map<String, dynamic>> _agendaPreviewCards = [];

  @override
  void initState() {
    super.initState();
    _carregar();
    _carregarAvatar();
    _carregarEncerrados();
    _carregarNotificacoesCount();
    _carregarAgendaPreview();
  }

  Future<void> _carregarAvatar() async {
    if (widget.userId <= 0) return;
    try {
      final u = await ApiClient.getUsuario(widget.userId);
      if (!mounted) return;
      String? av = u['avatar']?.toString();
      if (av != null && av.isNotEmpty && !av.startsWith('http')) {
        av = '$serverBase/$av';
      }
      setState(() => _avatarUrl = av);
    } catch (_) {}
  }

  List<String> _buildTiposFiltro() {
    final list = <String>[];
    if (_filtroServicos) list.add('SERVICO');
    if (_filtroProdutos) list.add('PRODUTO');
    return list;
  }

  Future<void> _carregar() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final tipos = _buildTiposFiltro();
      final data = await ApiClient.getDashboardAdmin(
        _periodoDias,
        tipo: tipos.isEmpty ? null : tipos,
        tipoPagamento: _filtroTipoPagamento,
        idCabeleireiro: _filtroIdCabeleireiro,
      );
      if (!mounted) return;
      setState(() {
        _data = data;
        _graficoData = (data['grafico'] as List<dynamic>?) ?? [];
        final series = data['grafico_series'] as List<dynamic>?;
        _graficoSeries = series != null
            ? series.map((e) => e is Map ? Map<String, dynamic>.from(e) : <String, dynamic>{}).toList()
            : [];
        _loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _error = e.toString().replaceAll('Exception: ', '');
        _loading = false;
      });
    }
  }

  Future<void> _carregarEncerrados() async {
    try {
      final lista = await ApiClient.getEncerrados();
      if (!mounted) return;
      setState(() => _encerradosAguardandoPagamento = lista);
    } catch (_) {}
  }

  Future<void> _carregarNotificacoesCount() async {
    try {
      final lista = await ApiClient.getNotificacoes('RECEPCAO');
      if (!mounted) return;
      setState(() => _notificacoesCount = lista.length);
    } catch (_) {}
  }

  Future<void> _carregarAgendaPreview() async {
    try {
      final now = DateTime.now();
      final list = await ApiClient.listAgendamentosPorMes(now.year, now.month);
      if (!mounted) return;
      final cards = <Map<String, dynamic>>[];
      for (final a in list) {
        final dh = a['data_hora'];
        DateTime? dt;
        if (dh is String) dt = DateTime.tryParse(dh);
        if (dt == null) continue;
        final diaFmt = '${dt.day.toString().padLeft(2, '0')}/${dt.month.toString().padLeft(2, '0')}/${dt.year}';
        final hora = '${dt.hour.toString().padLeft(2, '0')}:${dt.minute.toString().padLeft(2, '0')}';
        final servico = a['servico_descricao']?.toString() ?? a['servico_nome']?.toString() ?? '';
        final cliente = a['nomeCliente']?.toString() ?? a['nome']?.toString() ?? 'Cliente';
        final nomeCabeleireiro = a['cabeleireiro']?.toString() ?? '—';
        cards.add({
          'dia': diaFmt,
          'hora': hora,
          'cliente': cliente,
          'cabeleireiro': nomeCabeleireiro,
          'servico': servico,
          'data_hora': dt,
        });
      }
      cards.sort((a, b) {
        final da = a['data_hora'] as DateTime?;
        final db = b['data_hora'] as DateTime?;
        if (da == null && db == null) return 0;
        if (da == null) return 1;
        if (db == null) return -1;
        return da.compareTo(db);
      });
      if (!mounted) return;
      setState(() => _agendaPreviewCards = cards);
    } catch (_) {}
  }

  /// Carrega só os dados do gráfico e KPIs (com filtros atuais).
  Future<void> _carregarComFiltros() async {
    setState(() => _graficoLoading = true);
    try {
      final tipos = _buildTiposFiltro();
      final data = await ApiClient.getDashboardAdmin(
        _periodoDias,
        tipo: tipos.isEmpty ? null : tipos,
        tipoPagamento: _filtroTipoPagamento,
        idCabeleireiro: _filtroIdCabeleireiro,
      );
      if (!mounted) return;
      setState(() {
        _data = data;
        _graficoData = (data['grafico'] as List<dynamic>?) ?? [];
        final series = data['grafico_series'] as List<dynamic>?;
        _graficoSeries = series != null
            ? series.map((e) => e is Map ? Map<String, dynamic>.from(e) : <String, dynamic>{}).toList()
            : [];
        _graficoLoading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() => _graficoLoading = false);
    }
  }

  void _setPeriodo(int dias) {
    if (_periodoDias == dias) return;
    setState(() => _periodoDias = dias);
    _carregarComFiltros();
  }

  bool get _temFiltroAtivo =>
      _filtroServicos || _filtroProdutos || _filtroTipoPagamento != null || _filtroIdCabeleireiro != null;

  void _limparFiltrosDashboard() {
    setState(() {
      _filtroServicos = false;
      _filtroProdutos = false;
      _filtroTipoPagamento = null;
      _filtroIdCabeleireiro = null;
    });
    _carregarComFiltros();
  }

  static String _formatDate(DateTime d) {
    return '${d.year}-${d.month.toString().padLeft(2, '0')}-${d.day.toString().padLeft(2, '0')}';
  }

  Future<void> _abrirModalFiltroRanking() async {
    final now = DateTime.now();
    DateTime dataInicio = now.subtract(const Duration(days: 30));
    DateTime dataFim = now;
    int? idCabeleireiro;
    List<Map<String, dynamic>> cabeleireiros = [];
    try {
      cabeleireiros = await ApiClient.listCabeleireiros();
    } catch (_) {}

    if (!mounted) return;
    final result = await showDialog<List<dynamic>>(
      context: context,
      barrierDismissible: false,
      builder: (ctx) => _ModalFiltroRanking(
        dataInicio: dataInicio,
        dataFim: dataFim,
        idCabeleireiro: idCabeleireiro,
        cabeleireiros: cabeleireiros,
        onPesquisar: (inicio, fim, idCab) async {
          final list = await ApiClient.getRankingFiltrado(
            dataInicio: _formatDate(inicio),
            dataFim: _formatDate(fim),
            idCabeleireiro: idCab,
          );
          if (ctx.mounted) Navigator.of(ctx).pop(list);
        },
        onCancelar: () => Navigator.of(ctx).pop(),
      ),
    );
    if (!mounted) return;
    if (result != null) {
      setState(() {
        _rankingFiltrado = result;
        _rankingFiltroAtivo = true;
      });
    }
  }

  void _limparFiltroRanking() {
    setState(() {
      _rankingFiltrado = null;
      _rankingFiltroAtivo = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    final h = DateTime.now().hour;
    final greeting = h < 12 ? "Bom dia" : (h < 18 ? "Boa tarde" : "Boa noite");

    Widget body;
    switch (_navIndex) {
      case 1:
        body = const CashPage(showBackButton: false);
        break;
      case 2:
        body = _dashboardBody(greeting);
        break;
      case 3:
        body = const ProdutosServicosPage();
        break;
      case 4:
        body = PerfilPage(
          userId: widget.userId,
          userName: widget.userName,
          perfil: 'DONO',
        );
        break;
      case 0:
      default:
        body = _dashboardBody(greeting);
    }

    return Scaffold(
      backgroundColor: AppColors.loginBackground,
      body: SafeArea(child: body),
      bottomNavigationBar: AppCircleNavBar(
        activeIndex: _navIndex,
        onTap: (i) {
          if (i == 2) {
            showAddClienteModal(
              context,
              onSuccess: () {
                if (!mounted) return;
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (_) => ClientesAguardandoPage(userId: widget.userId),
                  ),
                );
              },
            );
            return;
          }
          setState(() => _navIndex = i);
          if (i == 0) _carregarAvatar();
        },
        isReception: true,
        useDarkTheme: true,
      ),
    );
  }

  Widget _dashboardBody(String greeting) {
    return RefreshIndicator(
      onRefresh: () async {
        await _carregar();
        await _carregarEncerrados();
        await _carregarNotificacoesCount();
        await _carregarAgendaPreview();
      },
      color: _orange,
      child: SingleChildScrollView(
        physics: const AlwaysScrollableScrollPhysics(),
        padding: EdgeInsets.symmetric(
          horizontal: SizeConfig.screenWidth! / 18,
          vertical: SizeConfig.screenHeight! / 56,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                CircleAvatar(
                  radius: 24,
                  backgroundColor: _orange.withOpacity(0.3),
                  backgroundImage: (_avatarUrl != null && _avatarUrl!.isNotEmpty)
                      ? NetworkImage(_avatarUrl!)
                      : null,
                  child: (_avatarUrl == null || _avatarUrl!.isEmpty)
                      ? const Icon(Icons.person, color: _orange, size: 28)
                      : null,
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'BEM-VINDO',
                        style: AppTypography.caption.copyWith(
                          color: AppColors.loginTextMuted,
                          fontSize: 12,
                        ),
                      ),
                      Text(
                        '$greeting, ${widget.userName} 👋',
                        style: AppTypography.heading4.copyWith(color: Colors.white),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ],
                  ),
                ),
                IconButton(
                  icon: _notificacoesCount > 0
                      ? Badge(
                          label: Text('$_notificacoesCount'),
                          child: const Icon(Icons.notifications_none, color: Colors.white, size: 28),
                        )
                      : const Icon(Icons.notifications_none, color: Colors.white, size: 28),
                  onPressed: () => _abrirModalNotificacoesDono(),
                ),
              ],
            ),
            SizedBox(height: SizeConfig.screenHeight! / 50),
            _periodoTabs(),
            SizedBox(height: SizeConfig.screenHeight! / 40),
            if (_loading)
              const Padding(
                padding: EdgeInsets.symmetric(vertical: 40),
                child: Center(child: CircularProgressIndicator(color: _orange)),
              )
            else if (_error != null)
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 24),
                child: Center(
                  child: Text(_error!, style: TextStyle(color: AppColors.error), textAlign: TextAlign.center),
                ),
              )
            else ...[
              _faturamentoCard(),
              SizedBox(height: SizeConfig.screenHeight! / 45),
              _graficoCard(_graficoLoading),
              SizedBox(height: SizeConfig.screenHeight! / 35),
              _filtrosCardsGrid(),
              if (_temFiltroAtivo) ...[
                const SizedBox(height: 8),
                TextButton.icon(
                  onPressed: _limparFiltrosDashboard,
                  icon: const Icon(Icons.clear_all, size: 18, color: _orange),
                  label: const Text('Limpar filtros', style: TextStyle(color: _orange, fontWeight: FontWeight.w600)),
                ),
              ],
              SizedBox(height: SizeConfig.screenHeight! / 45),
              _kpiResumoRow(),
              SizedBox(height: SizeConfig.screenHeight! / 35),
              _rankingSection(),
              SizedBox(height: SizeConfig.screenHeight! / 35),
              _agendaSection(),
              SizedBox(height: SizeConfig.screenHeight! / 20),
            ],
          ],
        ),
      ),
    );
  }

  Widget _periodoTabs() {
    const periodos = [
      (1, 'DIA'),
      (7, 'SEMANA'),
      (14, '14'),
      (30, '30'),
      (60, '60'),
    ];
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: Row(
        children: periodos.map((p) {
          final dias = p.$1;
          final label = p.$2;
          final selected = _periodoDias == dias;
          return Padding(
            padding: const EdgeInsets.only(right: 10),
            child: Material(
              color: selected ? _orange.withOpacity(0.2) : Colors.transparent,
              borderRadius: BorderRadius.circular(12),
              child: InkWell(
                onTap: () => _setPeriodo(dias),
                borderRadius: BorderRadius.circular(12),
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(
                      color: selected ? _orange : Colors.white24,
                      width: 1,
                    ),
                  ),
                  child: Text(
                    label,
                    style: TextStyle(
                      color: selected ? _orange : Colors.white54,
                      fontWeight: FontWeight.w600,
                      fontSize: 14,
                    ),
                  ),
                ),
              ),
            ),
          );
        }).toList(),
      ),
    );
  }

  Widget _faturamentoCard() {
    final total = (_data['faturamento_total'] as num?)?.toDouble() ?? 0.0;
    final percentual = (_data['percentual_vs_anterior'] as num?)?.toDouble();
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'FATURAMENTO TOTAL',
          style: AppTypography.caption.copyWith(
            color: AppColors.loginTextMuted,
            fontSize: 11,
            letterSpacing: 1,
          ),
        ),
        const SizedBox(height: 6),
        Text(
          _brl(total),
          style: AppTypography.heading3.copyWith(color: Colors.white),
        ),
        if (percentual != null) ...[
          const SizedBox(height: 4),
          Text(
            '${percentual >= 0 ? "+" : ""}${percentual.toStringAsFixed(1)}% vs. período anterior',
            style: TextStyle(
              color: percentual >= 0 ? Colors.green.shade400 : Colors.red.shade400,
              fontSize: 13,
              fontWeight: FontWeight.w500,
            ),
          ),
        ],
      ],
    );
  }

  Widget _graficoCard(bool loading) {
    if (loading) {
      return Container(
        height: 164,
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white.withOpacity(0.05),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: Colors.white12),
        ),
        alignment: Alignment.center,
        child: SizedBox(
          height: 32,
          width: 32,
          child: CircularProgressIndicator(color: _orange, strokeWidth: 2),
        ),
      );
    }
    if (_graficoSeries.isNotEmpty) {
      return _graficoMultiplasSeries();
    }
    final grafico = _graficoData;
    if (grafico.isEmpty) {
      return Container(
        height: 140,
        decoration: BoxDecoration(
          color: Colors.white.withOpacity(0.05),
          borderRadius: BorderRadius.circular(12),
        ),
        alignment: Alignment.center,
        child: Text(
          'Sem dados no período',
          style: TextStyle(color: Colors.white54, fontSize: 14),
        ),
      );
    }
    final valores = grafico.map((e) => (e is Map ? (e['valor'] as num?)?.toDouble() ?? 0.0 : 0.0)).toList();
    final maxVal = valores.fold<double>(0, (a, b) => b > a ? b : a);
    const maxHeight = 100.0;
    const animDuration = Duration(milliseconds: 400);

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.05),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.white12),
      ),
      child: Column(
        children: [
          SizedBox(
            height: maxHeight + 24,
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.end,
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: List.generate(grafico.length, (i) {
                final item = grafico[i] is Map ? grafico[i] as Map : <String, dynamic>{};
                final label = item['label']?.toString() ?? '';
                String dataStr = item['data']?.toString() ?? '';
                if (dataStr.isEmpty && grafico.isNotEmpty) {
                  final d = DateTime.now().subtract(Duration(days: grafico.length - 1 - i));
                  dataStr = '${d.year}-${d.month.toString().padLeft(2, '0')}-${d.day.toString().padLeft(2, '0')}';
                }
                final val = valores[i];
                final targetH = maxVal > 0 ? (val / maxVal) * maxHeight : 0.0;
                final h = targetH.clamp(4.0, maxHeight);
                return Expanded(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 2),
                    child: Material(
                      color: Colors.transparent,
                      child: InkWell(
                        onTap: dataStr.isNotEmpty ? () => _abrirModalHistoricoDia(dataStr) : null,
                        borderRadius: BorderRadius.circular(4),
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            TweenAnimationBuilder<double>(
                              key: ValueKey('$_periodoDias-$i-$val'),
                              tween: Tween(begin: 0, end: h),
                              duration: animDuration,
                              curve: Curves.easeOutCubic,
                              builder: (context, value, child) {
                                return Container(
                                  height: value.clamp(4.0, maxHeight),
                                  decoration: BoxDecoration(
                                    color: _orange.withOpacity(0.8),
                                    borderRadius: const BorderRadius.vertical(top: Radius.circular(4)),
                                  ),
                                );
                              },
                            ),
                            const SizedBox(height: 6),
                            Text(
                              label,
                              style: TextStyle(color: Colors.white54, fontSize: 10),
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                );
              }),
            ),
          ),
        ],
      ),
    );
  }

  Widget _graficoMultiplasSeries() {
    const maxHeight = 100.0;
    const animDuration = Duration(milliseconds: 400);
    final series = _graficoSeries;
    if (series.isEmpty) return const SizedBox.shrink();
    final n = (series.first['dados'] as List<dynamic>?)?.length ?? 0;
    if (n == 0) return const SizedBox.shrink();
    double maxVal = 0;
    for (final s in series) {
      final dados = s['dados'] as List<dynamic>? ?? [];
      for (final d in dados) {
        final v = (d is Map ? (d['valor'] as num?)?.toDouble() : null) ?? 0.0;
        maxVal = v > maxVal ? v : maxVal;
      }
    }
    final maxTotalByDay = List.filled(n, 0.0);
    for (final s in series) {
      final dados = s['dados'] as List<dynamic>? ?? [];
      for (int i = 0; i < n && i < dados.length; i++) {
        final v = (dados[i] is Map ? (dados[i]['valor'] as num?)?.toDouble() : null) ?? 0.0;
        maxTotalByDay[i] += v;
      }
    }
    final maxTotal = maxTotalByDay.fold<double>(0, (a, b) => b > a ? b : a);
    if (maxTotal <= 0) maxVal = 1;

    Color corFromHex(String? hex) {
      if (hex == null || hex.isEmpty) return _orange;
      hex = hex.replaceFirst('#', '');
      if (hex.length == 6) hex = 'FF$hex';
      final v = int.tryParse(hex, radix: 16) ?? 0xFF2196F3;
      return Color(v);
    }

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.05),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.white12),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          ClipRect(
            child: SizedBox(
              height: maxHeight + 26,
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.end,
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: List.generate(n, (i) {
                  final primeiroDados = series.first['dados'] as List<dynamic>? ?? [];
                  final dadoI = i < primeiroDados.length && primeiroDados[i] is Map ? primeiroDados[i] as Map : <String, dynamic>{};
                  final label = dadoI['label']?.toString() ?? '';
                  String dataStr = dadoI['data']?.toString() ?? '';
                  if (dataStr.isEmpty && n > 0) {
                    final d = DateTime.now().subtract(Duration(days: n - 1 - i));
                    dataStr = '${d.year}-${d.month.toString().padLeft(2, '0')}-${d.day.toString().padLeft(2, '0')}';
                  }
                  final totalDay = maxTotalByDay[i];
                  final hTotal = maxTotal > 0 ? (totalDay / maxTotal * maxHeight).clamp(4.0, maxHeight) : 0.0;
                  return Expanded(
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 2),
                      child: Material(
                        color: Colors.transparent,
                        child: InkWell(
                          onTap: dataStr.isNotEmpty ? () => _abrirModalHistoricoDia(dataStr) : null,
                          borderRadius: BorderRadius.circular(4),
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            mainAxisAlignment: MainAxisAlignment.end,
                            children: [
                              TweenAnimationBuilder<double>(
                          key: ValueKey('series-$_periodoDias-$i-$totalDay'),
                          tween: Tween(begin: 0, end: hTotal),
                          duration: animDuration,
                          curve: Curves.easeOutCubic,
                          builder: (context, value, child) {
                            if (value <= 0) return const SizedBox(height: 4);
                            final totalH = value.clamp(4.0, maxHeight);
                            final rawHeights = <double>[];
                            for (final s in series) {
                              final dados = s['dados'] as List<dynamic>? ?? [];
                              final val = i < dados.length ? (dados[i] is Map ? (dados[i]['valor'] as num?)?.toDouble() : null) ?? 0 : 0.0;
                              if (val > 0 && totalDay > 0) {
                                rawHeights.add(val / totalDay * totalH);
                              }
                            }
                            if (rawHeights.isEmpty) {
                              return Container(
                                height: totalH,
                                decoration: BoxDecoration(
                                  color: _orange.withOpacity(0.8),
                                  borderRadius: const BorderRadius.vertical(top: Radius.circular(4)),
                                ),
                              );
                            }
                            double sum = rawHeights.reduce((a, b) => a + b);
                            if (sum > totalH && sum > 0) {
                              final scale = totalH / sum;
                              for (int j = 0; j < rawHeights.length; j++) {
                                rawHeights[j] = rawHeights[j] * scale;
                              }
                            }
                            final segments = <Widget>[];
                            int rawIdx = 0;
                            int seriesIdx = 0;
                            for (final s in series) {
                              final dados = s['dados'] as List<dynamic>? ?? [];
                              final val = i < dados.length ? (dados[i] is Map ? (dados[i]['valor'] as num?)?.toDouble() : null) ?? 0 : 0.0;
                              final cor = corFromHex(s['cor']?.toString());
                              if (val > 0 && totalDay > 0 && rawIdx < rawHeights.length) {
                                final hSeg = rawHeights[rawIdx].clamp(0.0, totalH);
                                final isTop = seriesIdx == series.length - 1;
                                segments.add(Container(
                                  height: hSeg,
                                  decoration: BoxDecoration(
                                    color: cor.withOpacity(0.85),
                                    borderRadius: isTop ? const BorderRadius.vertical(top: Radius.circular(4)) : null,
                                  ),
                                ));
                                rawIdx++;
                              }
                              seriesIdx++;
                            }
                            return ClipRect(
                              child: Container(
                                height: totalH,
                                child: Column(
                                  mainAxisAlignment: MainAxisAlignment.end,
                                  mainAxisSize: MainAxisSize.min,
                                  children: segments.reversed.toList(),
                                ),
                              ),
                            );
                          },
                        ),
                              const SizedBox(height: 6),
                              Text(
                                label,
                                style: TextStyle(color: Colors.white54, fontSize: 10),
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  );
                }),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Future<void> _abrirModalHistoricoDia(String dataStr) async {
    List<Map<String, dynamic>> lista = [];
    try {
      lista = await ApiClient.getAtendimentosDoDia(dataStr);
    } catch (_) {}
    if (!mounted) return;
    final dt = DateTime.tryParse(dataStr) ?? DateTime.now();
    final tituloData = DateFormat('dd/MM/yyyy').format(dt);
    showDialog<void>(
      context: context,
      builder: (ctx) => Dialog(
        backgroundColor: const Color(0xFF1E1E2E),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        child: ConstrainedBox(
          constraints: BoxConstraints(maxWidth: 400, maxHeight: MediaQuery.of(ctx).size.height * 0.7),
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Expanded(
                      child: Text(
                        'Atendimentos em $tituloData',
                        style: AppTypography.heading4.copyWith(color: Colors.white),
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.close, color: Colors.white54),
                      onPressed: () => Navigator.pop(ctx),
                      padding: EdgeInsets.zero,
                      constraints: const BoxConstraints(minWidth: 36, minHeight: 36),
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                Flexible(
                  child: lista.isEmpty
                      ? Center(
                          child: Text(
                            'Nenhum atendimento registrado neste dia.',
                            style: TextStyle(color: Colors.white54, fontSize: 14),
                          ),
                        )
                      : ListView.builder(
                          shrinkWrap: true,
                          itemCount: lista.length,
                          itemBuilder: (_, idx) {
                            final a = lista[idx];
                            final nome = a['nome_cliente']?.toString() ?? '—';
                            final total = (a['total'] as num?)?.toDouble() ?? 0.0;
                            final dataHoraRaw = a['data_hora']?.toString();
                            String hora = '';
                            if (dataHoraRaw != null && dataHoraRaw.isNotEmpty) {
                              final dtHora = DateTime.tryParse(dataHoraRaw);
                              if (dtHora != null) hora = DateFormat('HH:mm').format(dtHora);
                            }
                            final servicos = a['servicos']?.toString() ?? '';
                            return Padding(
                              padding: const EdgeInsets.only(bottom: 12),
                              child: Container(
                                padding: const EdgeInsets.all(12),
                                decoration: BoxDecoration(
                                  color: Colors.white.withOpacity(0.06),
                                  borderRadius: BorderRadius.circular(10),
                                ),
                                child: Row(
                                  children: [
                                    Icon(Icons.person_outline, color: _orange, size: 22),
                                    const SizedBox(width: 12),
                                    Expanded(
                                      child: Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          Text(nome, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w600, fontSize: 14)),
                                          if (hora.isNotEmpty) Text(hora, style: TextStyle(color: Colors.white54, fontSize: 12)),
                                          if (servicos.isNotEmpty) Text(servicos, style: TextStyle(color: Colors.white70, fontSize: 12), maxLines: 2, overflow: TextOverflow.ellipsis),
                                        ],
                                      ),
                                    ),
                                    Text(_brl(total), style: const TextStyle(color: _orange, fontWeight: FontWeight.w700, fontSize: 14)),
                                  ],
                                ),
                              ),
                            );
                          },
                        ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _filtrosCardsGrid() {
    final produtos = (_data['produtos_count'] as num?)?.toInt() ?? 0;
    final produtosFat = (_data['produtos_faturamento'] as num?)?.toDouble() ?? 0;
    return GridView.count(
      crossAxisCount: 2,
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      mainAxisSpacing: 8,
      crossAxisSpacing: 8,
      childAspectRatio: 1.75,
      children: [
        _cardFiltro(
          ativo: _filtroProdutos,
          cor: _corProdutos,
          icone: Icons.inventory_2_outlined,
          titulo: 'Produtos',
          valor: '$produtos · ${_brl(produtosFat)}',
          onTap: () {
            setState(() => _filtroProdutos = !_filtroProdutos);
            _carregarComFiltros();
          },
        ),
        _cardFiltro(
          ativo: _filtroIdCabeleireiro != null,
          cor: _corCabeleireiro,
          icone: Icons.person_outline,
          titulo: 'Cabeleireiro',
          valor: _nomeCabeleireiroSelecionado ?? 'TODOS',
          onTap: () => _abrirModalCabeleireiro(),
        ),
      ],
    );
  }

  String? _nomeCabeleireiroSelecionado;

  Future<void> _abrirModalCabeleireiro() async {
    List<Map<String, dynamic>> lista = [];
    try {
      lista = await ApiClient.listCabeleireiros();
    } catch (_) {}
    if (!mounted) return;
    final escolhido = await showDialog<int?>(
      context: context,
      builder: (ctx) => _ModalEscolhaCabeleireiro(
        cabeleireiros: lista,
        idAtual: _filtroIdCabeleireiro,
        onEscolher: (id) => Navigator.of(ctx).pop(id),
      ),
    );
    if (!mounted) return;
    if (escolhido != null) {
      String? nome;
      if (escolhido != 0) {
        try {
          final m = lista.firstWhere((m) => (m['id'] as num?)?.toInt() == escolhido);
          nome = m['nome']?.toString();
        } catch (_) {}
      }
      setState(() {
        _filtroIdCabeleireiro = escolhido == 0 ? null : escolhido;
        _nomeCabeleireiroSelecionado = escolhido == 0 ? null : (nome ?? '');
      });
      _carregarComFiltros();
    }
  }

  Widget _cardFiltro({
    required bool ativo,
    required Color cor,
    required IconData icone,
    required String titulo,
    required String valor,
    required VoidCallback onTap,
  }) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(10),
        child: Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: Colors.white.withOpacity(0.06),
            borderRadius: BorderRadius.circular(10),
            border: Border.all(
              color: ativo ? cor : Colors.white12,
              width: ativo ? 1.5 : 1,
            ),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Icon(icone, color: ativo ? cor : Colors.white54, size: 18),
                  if (ativo) ...[
                    const SizedBox(width: 4),
                    Text('Filtro ativo', style: TextStyle(color: cor, fontSize: 9, fontWeight: FontWeight.w600)),
                  ],
                ],
              ),
              Text(titulo, style: TextStyle(color: Colors.white70, fontSize: 10, fontWeight: FontWeight.w600)),
              Text(valor, style: const TextStyle(color: Colors.white, fontSize: 11), maxLines: 1, overflow: TextOverflow.ellipsis),
            ],
          ),
        ),
      ),
    );
  }

  Widget _kpiResumoRow() {
    final emEspera = (_data['em_espera'] as num?)?.toInt() ?? 0;
    final recebimentoCount = _encerradosAguardandoPagamento.length;
    return Row(
      children: [
        Expanded(
          child: Container(
            padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 14),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.06),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: Colors.white12),
            ),
            child: Row(
              children: [
                Icon(Icons.people_outline, color: _orange, size: 22),
                const SizedBox(width: 10),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Em espera', style: TextStyle(color: Colors.white70, fontSize: 11)),
                    Text('$emEspera', style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                  ],
                ),
              ],
            ),
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Material(
            color: Colors.transparent,
            child: InkWell(
              onTap: _abrirModalTodosRecebimento,
              borderRadius: BorderRadius.circular(12),
              child: Container(
                padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 14),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.06),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.white12),
                ),
                child: Row(
                  children: [
                    Icon(Icons.receipt_long_outlined, color: _orange, size: 22),
                    const SizedBox(width: 10),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Recebimentos', style: TextStyle(color: Colors.white70, fontSize: 11)),
                          Text('$recebimentoCount', style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold), maxLines: 1, overflow: TextOverflow.ellipsis),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }

  static const Color _mint = Color(0xFF80CBC4); // verde água/menta do ícone

  Widget _rankingSection() {
    final ranking = _rankingFiltroAtivo && _rankingFiltrado != null
        ? _rankingFiltrado!
        : (_data['ranking'] as List<dynamic>? ?? []);
    final maxTotal = ranking.fold<double>(0.0, (m, e) {
      final t = (e is Map ? (e['total'] as num?)?.toDouble() : null) ?? 0.0;
      return t > m ? t : m;
    });
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'Cabeleireiros',
              style: AppTypography.heading4.copyWith(color: Colors.white),
            ),
            IconButton(
              icon: const Icon(Icons.filter_list, color: _orange, size: 22),
              onPressed: _abrirModalFiltroRanking,
              padding: EdgeInsets.zero,
              constraints: const BoxConstraints(minWidth: 36, minHeight: 36),
            ),
          ],
        ),
        if (_rankingFiltroAtivo)
          Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: GestureDetector(
              onTap: _limparFiltroRanking,
              child: Text(
                'Filtro ativo — toque para limpar',
                style: TextStyle(color: _orange.withOpacity(0.9), fontSize: 11),
              ),
            ),
          ),
        const SizedBox(height: 12),
        if (ranking.isEmpty)
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.05),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Center(
              child: Text(
                'Nenhum atendimento no período',
                style: TextStyle(color: Colors.white54, fontSize: 14),
              ),
            ),
          )
        else
          ...ranking.asMap().entries.map((e) {
            final i = e.key;
            final r = e.value is Map ? e.value as Map : <String, dynamic>{};
            final nome = (r['nome'] ?? r['Nome'])?.toString() ?? '';
            final atends = ((r['atendimentos'] ?? r['Atendimentos']) as num?)?.toInt() ?? 0;
            final total = ((r['total'] ?? r['Total']) as num?)?.toDouble() ?? 0.0;
            final progresso = maxTotal > 0 ? (total / maxTotal).clamp(0.0, 1.0) : 0.0;
            return Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.05),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.white12),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Container(
                          width: 44,
                          height: 44,
                          decoration: BoxDecoration(
                            color: _mint.withOpacity(0.25),
                            shape: BoxShape.circle,
                            border: Border.all(color: _orange, width: 1.2),
                          ),
                          child: Icon(
                            i == 2 ? Icons.groups_outlined : Icons.description_outlined,
                            color: Colors.white,
                            size: 22,
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                nome,
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.w600,
                                  fontSize: 15,
                                ),
                              ),
                              const SizedBox(height: 2),
                              Text(
                                '$atends atendimentos',
                                style: TextStyle(color: Colors.white54, fontSize: 12),
                              ),
                            ],
                          ),
                        ),
                        Text(
                          _brl(total),
                          style: const TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.w600,
                            fontSize: 15,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),
                    ClipRRect(
                      borderRadius: BorderRadius.circular(4),
                      child: LinearProgressIndicator(
                        value: progresso,
                        minHeight: 6,
                        backgroundColor: Colors.white.withOpacity(0.12),
                        valueColor: const AlwaysStoppedAnimation<Color>(_orange),
                      ),
                    ),
                  ],
                ),
              ),
            );
          }),
      ],
    );
  }

  Widget _agendaSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'Agenda',
              style: AppTypography.heading4.copyWith(color: Colors.white),
            ),
            TextButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (_) => const AgendaPage(),
                  ),
                );
              },
              style: TextButton.styleFrom(padding: EdgeInsets.zero, minimumSize: Size.zero, tapTargetSize: MaterialTapTargetSize.shrinkWrap),
              child: const Icon(Icons.calendar_today, color: _orange, size: 22),
            ),
          ],
        ),
        const SizedBox(height: 4),
        Text(
          'Clientes com horários marcados',
          style: AppTypography.caption.copyWith(
            color: AppColors.loginTextMuted,
            fontSize: 12,
          ),
        ),
        const SizedBox(height: 12),
        SizedBox(
          height: 182,
          child: _agendaPreviewCards.isEmpty
              ? Center(
                  child: Text(
                    'Nenhum cliente com horário agendado',
                    style: TextStyle(color: Colors.white54, fontSize: 13),
                  ),
                )
              : ListView.separated(
                  scrollDirection: Axis.horizontal,
                  itemCount: _agendaPreviewCards.length,
                  separatorBuilder: (_, __) => const SizedBox(width: 12),
                  itemBuilder: (_, i) {
                    final card = _agendaPreviewCards[i];
                    final dia = card['dia']?.toString() ?? '';
                    final hora = card['hora']?.toString() ?? '';
                    final cliente = card['cliente']?.toString() ?? '—';
                    final cabeleireiro = card['cabeleireiro']?.toString() ?? '—';
                    final servico = card['servico']?.toString() ?? '';
                    return Material(
                      color: Colors.transparent,
                      child: InkWell(
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (_) => const AgendaPage(),
                            ),
                          );
                        },
                        borderRadius: BorderRadius.circular(14),
                        child: Container(
                          width: 220,
                          padding: const EdgeInsets.all(14),
                          decoration: BoxDecoration(
                            color: Colors.white.withOpacity(0.06),
                            borderRadius: BorderRadius.circular(14),
                            border: Border.all(color: Colors.white12),
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Row(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Container(
                                    width: 44,
                                    height: 44,
                                    decoration: BoxDecoration(
                                      shape: BoxShape.circle,
                                      color: const Color(0xFF7FD0C9).withOpacity(0.9),
                                      border: Border.all(color: _orange, width: 1.5),
                                    ),
                                    child: const Icon(Icons.event_note, color: Colors.white, size: 22),
                                  ),
                                  const SizedBox(width: 12),
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          cabeleireiro,
                                          style: const TextStyle(
                                            color: Colors.white,
                                            fontWeight: FontWeight.w700,
                                            fontSize: 15,
                                          ),
                                          maxLines: 1,
                                          overflow: TextOverflow.ellipsis,
                                        ),
                                        const SizedBox(height: 4),
                                        Text(
                                          dia.isNotEmpty ? dia : 'Agendado',
                                          style: TextStyle(
                                            color: Colors.green.shade400,
                                            fontWeight: FontWeight.w600,
                                            fontSize: 11,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 12),
                              Container(
                                width: double.infinity,
                                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                                decoration: BoxDecoration(
                                  color: Colors.white.withOpacity(0.08),
                                  borderRadius: BorderRadius.circular(12),
                                  border: Border.all(color: Colors.white10),
                                ),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Row(
                                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                      children: [
                                        Text(
                                          'PRÓXIMO HORÁRIO',
                                          style: TextStyle(color: Colors.white54, fontSize: 10, fontWeight: FontWeight.w500),
                                        ),
                                        Text(
                                          hora,
                                          style: const TextStyle(color: _orange, fontWeight: FontWeight.w700, fontSize: 15),
                                        ),
                                      ],
                                    ),
                                    if (cliente.isNotEmpty) ...[
                                      const SizedBox(height: 6),
                                      Text(
                                        'Cliente: $cliente',
                                        style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w700, fontSize: 15),
                                        maxLines: 1,
                                        overflow: TextOverflow.ellipsis,
                                      ),
                                    ],
                                    if (servico.isNotEmpty) ...[
                                      const SizedBox(height: 2),
                                      Text(
                                        servico,
                                        style: TextStyle(color: Colors.white54, fontSize: 12),
                                        maxLines: 1,
                                        overflow: TextOverflow.ellipsis,
                                      ),
                                    ],
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    );
                  },
                ),
        ),
      ],
    );
  }

  void _abrirModalNotificacoesDono() {
    showNotificacoesModal(
      context,
      perfil: 'RECEPCAO',
      onMarcarTodasLidas: () => _carregar(),
      onNotificationTap: _onNotificationTapDono,
    ).then((_) {
      if (!mounted) return;
      _carregar();
      _carregarEncerrados();
      _carregarNotificacoesCount();
    });
  }

  void _onNotificationTapDono(Map<String, dynamic> item) {
    if (!mounted) return;
    final tipo = (item['tipo']?.toString() ?? '').toUpperCase();
    if (tipo == 'RECEBIMENTO') {
      final idAtendimentoRaw = item['id_atendimento'];
      int idAtendimento = 0;
      if (idAtendimentoRaw != null) {
        if (idAtendimentoRaw is int) idAtendimento = idAtendimentoRaw;
        else if (idAtendimentoRaw is num) idAtendimento = idAtendimentoRaw.toInt();
        else idAtendimento = int.tryParse(idAtendimentoRaw.toString()) ?? 0;
      }
      final nome = item['subtitulo']?.toString() ?? 'Cliente';
      final total = (item['valor'] as num?)?.toDouble() ?? 0.0;
      if (idAtendimento > 0) {
        showRecebimentoModal(
          context,
          nome: nome,
          total: total,
          idAtendimento: idAtendimento,
          onSuccess: () {
            if (!mounted) return;
            _carregarEncerrados();
            _carregarNotificacoesCount();
          },
        );
      }
      return;
    }
    if (tipo == 'REABASTECER') {
      final idProdutoRaw = item['id_produto'];
      int idProduto = 0;
      if (idProdutoRaw != null) {
        if (idProdutoRaw is int) idProduto = idProdutoRaw;
        else if (idProdutoRaw is num) idProduto = idProdutoRaw.toInt();
        else idProduto = int.tryParse(idProdutoRaw.toString()) ?? 0;
      }
      if (idProduto > 0) {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (_) => ProdutosPage(openProdutoId: idProduto),
          ),
        );
      } else {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (_) => const ProdutosPage(),
          ),
        );
      }
    }
  }

  void _abrirModalTodosRecebimento() {
    final encerrados = _encerradosAguardandoPagamento;
    showModalBottomSheet<void>(
      context: context,
      backgroundColor: const Color(0xFF1E1E2E),
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(16))),
      builder: (ctx) => DraggableScrollableSheet(
        initialChildSize: 0.5,
        minChildSize: 0.3,
        maxChildSize: 0.9,
        expand: false,
        builder: (_, scrollController) => Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Padding(
              padding: const EdgeInsets.all(20),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('Recebimento', style: AppTypography.heading4.copyWith(color: Colors.white)),
                  IconButton(
                    icon: const Icon(Icons.close, color: Colors.white54),
                    onPressed: () => Navigator.pop(ctx),
                  ),
                ],
              ),
            ),
            Flexible(
              child: ListView(
                controller: scrollController,
                shrinkWrap: true,
                padding: const EdgeInsets.fromLTRB(20, 0, 20, 24),
                children: [
                  if (encerrados.isNotEmpty) ...[
                    Padding(
                      padding: const EdgeInsets.only(bottom: 8),
                      child: Text('Aguardando pagamento', style: AppTypography.caption.copyWith(color: _orange, fontSize: 11, fontWeight: FontWeight.w600)),
                    ),
                    ...encerrados.map((e) {
                      final nome = e['nome']?.toString() ?? '—';
                      final totalVal = (e['total'] as num?)?.toDouble() ?? 0.0;
                      final idAtendimentoRaw = e['id_atendimento'];
                      int idAtend = 0;
                      if (idAtendimentoRaw != null) {
                        if (idAtendimentoRaw is int) idAtend = idAtendimentoRaw;
                        else if (idAtendimentoRaw is num) idAtend = idAtendimentoRaw.toInt();
                        else idAtend = int.tryParse(idAtendimentoRaw.toString()) ?? 0;
                      }
                      return Padding(
                        padding: const EdgeInsets.only(bottom: 12),
                        child: Material(
                          color: Colors.transparent,
                          child: InkWell(
                            onTap: idAtend > 0
                                ? () {
                                    Navigator.pop(ctx);
                                    showRecebimentoModal(
                                      context,
                                      nome: nome,
                                      total: totalVal,
                                      idAtendimento: idAtend,
                                      onSuccess: () {
                                        if (!mounted) return;
                                        _carregarEncerrados();
                                        _carregarNotificacoesCount();
                                      },
                                    );
                                  }
                                : null,
                            borderRadius: BorderRadius.circular(12),
                            child: Padding(
                              padding: const EdgeInsets.symmetric(vertical: 4),
                              child: Row(
                                children: [
                                  CircleAvatar(radius: 22, backgroundColor: Colors.white12, child: const Icon(Icons.payment, color: _orange, size: 24)),
                                  const SizedBox(width: 12),
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text(nome, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w600, fontSize: 14)),
                                        const Text('Atendimento', style: TextStyle(color: Colors.white54, fontSize: 12)),
                                      ],
                                    ),
                                  ),
                                  Text(_brl(totalVal), style: const TextStyle(color: _orange, fontWeight: FontWeight.w700, fontSize: 14)),
                                ],
                              ),
                            ),
                          ),
                        ),
                      );
                    }),
                  ],
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _ModalFiltroRanking extends StatefulWidget {
  final DateTime dataInicio;
  final DateTime dataFim;
  final int? idCabeleireiro;
  final List<Map<String, dynamic>> cabeleireiros;
  final Future<void> Function(DateTime inicio, DateTime fim, int? idCabeleireiro) onPesquisar;
  final VoidCallback onCancelar;

  const _ModalFiltroRanking({
    required this.dataInicio,
    required this.dataFim,
    required this.idCabeleireiro,
    required this.cabeleireiros,
    required this.onPesquisar,
    required this.onCancelar,
  });

  @override
  State<_ModalFiltroRanking> createState() => _ModalFiltroRankingState();
}

class _ModalFiltroRankingState extends State<_ModalFiltroRanking> {
  late DateTime _dataInicio;
  late DateTime _dataFim;
  int? _idCabeleireiro;
  bool _loading = false;

  @override
  void initState() {
    super.initState();
    _dataInicio = widget.dataInicio;
    _dataFim = widget.dataFim;
    _idCabeleireiro = widget.idCabeleireiro;
  }

  String _formatDisplay(DateTime d) {
    return '${d.day.toString().padLeft(2, '0')}/${d.month.toString().padLeft(2, '0')}/${d.year}';
  }

  Future<void> _pickInicio() async {
    final picked = await showDatePicker(
      context: context,
      initialDate: _dataInicio,
      firstDate: DateTime(2020),
      lastDate: DateTime.now(),
    );
    if (picked != null) setState(() => _dataInicio = picked);
  }

  Future<void> _pickFim() async {
    final picked = await showDatePicker(
      context: context,
      initialDate: _dataFim,
      firstDate: _dataInicio,
      lastDate: DateTime.now(),
    );
    if (picked != null) setState(() => _dataFim = picked);
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      backgroundColor: const Color(0xFF1E1E2E),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Text(
                'Filtrar',
                style: AppTypography.heading4.copyWith(color: Colors.white),
              ),
              const SizedBox(height: 20),
              Text(
                'Data início',
                style: TextStyle(color: Colors.white70, fontSize: 12),
              ),
              const SizedBox(height: 6),
              InkWell(
                onTap: _pickInicio,
                borderRadius: BorderRadius.circular(8),
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 14),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.08),
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(color: Colors.white24),
                  ),
                  child: Row(
                    children: [
                      Icon(Icons.calendar_today, color: _orange, size: 20),
                      const SizedBox(width: 12),
                      Text(_formatDisplay(_dataInicio), style: const TextStyle(color: Colors.white, fontSize: 15)),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 16),
              Text(
                'Data fim',
                style: TextStyle(color: Colors.white70, fontSize: 12),
              ),
              const SizedBox(height: 6),
              InkWell(
                onTap: _pickFim,
                borderRadius: BorderRadius.circular(8),
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 14),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.08),
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(color: Colors.white24),
                  ),
                  child: Row(
                    children: [
                      Icon(Icons.calendar_today, color: _orange, size: 20),
                      const SizedBox(width: 12),
                      Text(_formatDisplay(_dataFim), style: const TextStyle(color: Colors.white, fontSize: 15)),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 16),
              Text(
                'Vendedor',
                style: TextStyle(color: Colors.white70, fontSize: 12),
              ),
              const SizedBox(height: 6),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.08),
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: Colors.white24),
                ),
                child: DropdownButtonHideUnderline(
                  child: DropdownButton<int?>(
                    value: _idCabeleireiro,
                    isExpanded: true,
                    dropdownColor: const Color(0xFF2A2A3E),
                    hint: const Text('Todos os vendedores', style: TextStyle(color: Colors.white70)),
                    items: [
                      const DropdownMenuItem<int?>(value: null, child: Text('Todos os vendedores', style: TextStyle(color: Colors.white))),
                      ...widget.cabeleireiros.map((c) {
                        final id = (c['id'] as num?)?.toInt();
                        final nome = c['nome']?.toString() ?? '';
                        return DropdownMenuItem<int?>(value: id, child: Text(nome, style: const TextStyle(color: Colors.white)));
                      }),
                    ],
                    onChanged: (v) => setState(() => _idCabeleireiro = v),
                  ),
                ),
              ),
              const SizedBox(height: 24),
              Row(
                children: [
                  TextButton(
                    onPressed: _loading ? null : widget.onCancelar,
                    child: Text('Cancelar', style: TextStyle(color: Colors.white70)),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: ElevatedButton(
                      onPressed: _loading
                          ? null
                          : () async {
                              setState(() => _loading = true);
                              try {
                                await widget.onPesquisar(_dataInicio, _dataFim, _idCabeleireiro);
                              } finally {
                                if (mounted) setState(() => _loading = false);
                              }
                            },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: _orange,
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(vertical: 14),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                      ),
                      child: _loading ? const SizedBox(height: 20, width: 20, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white)) : const Text('PESQUISAR', style: TextStyle(fontWeight: FontWeight.w600)),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _ModalEscolhaCabeleireiro extends StatelessWidget {
  final List<Map<String, dynamic>> cabeleireiros;
  final int? idAtual;
  final void Function(int?) onEscolher;

  const _ModalEscolhaCabeleireiro({
    required this.cabeleireiros,
    required this.idAtual,
    required this.onEscolher,
  });

  @override
  Widget build(BuildContext context) {
    return Dialog(
      backgroundColor: const Color(0xFF1E1E2E),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text('Cabeleireiro', style: AppTypography.heading4.copyWith(color: Colors.white)),
            const SizedBox(height: 16),
            Material(
              color: idAtual == null ? _orange.withOpacity(0.2) : Colors.white.withOpacity(0.06),
              borderRadius: BorderRadius.circular(8),
              child: InkWell(
                onTap: () => onEscolher(0),
                borderRadius: BorderRadius.circular(8),
                child: Padding(
                  padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 16),
                  child: Text('TODOS', style: TextStyle(color: idAtual == null ? _orange : Colors.white, fontWeight: idAtual == null ? FontWeight.w600 : FontWeight.normal)),
                ),
              ),
            ),
            const SizedBox(height: 8),
            ...cabeleireiros.map((c) {
              final id = (c['id'] as num?)?.toInt();
              final nome = c['nome']?.toString() ?? '';
              final selected = id == idAtual;
              return Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: Material(
                  color: selected ? _orange.withOpacity(0.2) : Colors.white.withOpacity(0.06),
                  borderRadius: BorderRadius.circular(8),
                  child: InkWell(
                    onTap: () => onEscolher(id),
                    borderRadius: BorderRadius.circular(8),
                    child: Padding(
                      padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 16),
                      child: Text(nome, style: TextStyle(color: selected ? _orange : Colors.white, fontWeight: selected ? FontWeight.w600 : FontWeight.normal)),
                    ),
                  ),
                ),
              );
            }),
          ],
        ),
      ),
    );
  }
}
