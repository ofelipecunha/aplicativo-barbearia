import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:barbearia/config/app_colors.dart';
import 'package:barbearia/config/app_typography.dart';
import 'package:barbearia/view/home_page/components/colors.dart';
import 'package:barbearia/view/home_page/components/size_config.dart';
import 'package:barbearia/api/api_client.dart' show ApiClient, serverBase;
import 'package:barbearia/view/shared/app_circle_nav_bar.dart';
import 'package:barbearia/view/shared/add_cliente_page.dart';
import 'package:barbearia/view/shared/add_cliente_modal.dart';
import 'package:barbearia/view/shared/cadastro_icons.dart';
import 'package:barbearia/view/shared/notificacoes_modal.dart';
import 'package:barbearia/view/reception_page/agenda_page.dart';
import 'package:barbearia/view/reception_page/produtos_servicos_page.dart';
import 'package:barbearia/view/shared/perfil_page.dart';

class BarberHome extends StatefulWidget {
  final int userId;
  final String userName;
  final String perfil;
  /// Quando true (ex.: embutido no dashboard do DONO), não exibe a navbar própria para evitar duplicação.
  final bool hideBottomNav;

  const BarberHome({
    Key? key,
    required this.userId,
    required this.userName,
    this.perfil = 'CABELEIREIRO',
    this.hideBottomNav = false,
  }) : super(key: key);

  @override
  State<BarberHome> createState() => _BarberHomeState();
}

class _BarberHomeState extends State<BarberHome> {
  List<Map<String, dynamic>> aguardando = [];
  bool loading = false;
  String? error;
  int _index = 0;
  bool _isLoading = false;
  String? _avatarUrl;
  int _notificationCount = 0;
  bool _autoNotificacoesShown = false;
  final TextEditingController _searchCtrl = TextEditingController();
  String _searchQuery = '';
  late PageController _proximosPageController;
  int _proximosClientePage = 0;

  @override
  void initState() {
    super.initState();
    _proximosPageController = PageController(viewportFraction: 0.88);
    _proximosPageController.addListener(() {
      final p = (_proximosPageController.page ?? 0).round().clamp(0, 999);
      if (p != _proximosClientePage && mounted) setState(() => _proximosClientePage = p);
    });
    _searchCtrl.addListener(() => setState(() => _searchQuery = _searchCtrl.text.trim()));
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _carregarAguardando();
      _carregarAvatar();
      _carregarNotificacoes();
    });
  }

  @override
  void dispose() {
    _proximosPageController.dispose();
    _searchCtrl.dispose();
    super.dispose();
  }

  Future<void> _carregarNotificacoes() async {
    try {
      final list = await ApiClient.getNotificacoes('CABELEIREIRO', idUsuario: widget.userId);
      if (!mounted) return;
      final count = list.where((n) => (n['lido'] != true)).length;
      setState(() => _notificationCount = count);
      if (!_autoNotificacoesShown && count > 0) {
        _autoNotificacoesShown = true;
        Future.delayed(const Duration(milliseconds: 800), () {
          if (!mounted) return;
          showNotificacoesModal(
            context,
            perfil: 'CABELEIREIRO',
            idUsuario: widget.userId,
            onMarcarTodasLidas: () {},
            onNotificationTap: (_) {},
          ).then((_) => _carregarNotificacoes());
        });
      }
    } catch (_) {}
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

  Future<void> _carregarAguardando() async {
    if (!mounted || _isLoading) return;
    _isLoading = true;
    if (!mounted) {
      _isLoading = false;
      return;
    }
    setState(() {
      loading = true;
      error = null;
    });
    try {
      final data = await ApiClient.getAguardando(
        idCabeleireiro: (widget.perfil == 'CABELEIREIRO' || widget.perfil == 'CABELEREIRO') ? widget.userId : null,
      );
      if (!mounted) {
        _isLoading = false;
        return;
      }
      setState(() {
        aguardando = data;
        loading = false;
        _isLoading = false;
      });
    } catch (e) {
      if (!mounted) {
        _isLoading = false;
        return;
      }
      setState(() {
        error = e.toString();
        loading = false;
        _isLoading = false;
      });
    }
  }

  void _pegarEAtender(Map<String, dynamic> item) async {
    final idFila = (item['id'] as num).toInt();
    final nome = item['nome'] as String? ?? 'Cliente';
    try {
      final at = await ApiClient.abrirAtendimento(idFila, widget.userId);
      final idAtendimento = (at['id'] as num).toInt();
      if (!mounted) return;
      await Navigator.push<void>(
        context,
        MaterialPageRoute(
          builder: (_) => AtendimentoBarberPage(
            atendimentoId: idAtendimento,
            clienteNome: nome,
            userId: widget.userId,
          ),
        ),
      );
      // Recarregar após voltar da tela de atendimento
      if (mounted && !_isLoading) {
        WidgetsBinding.instance.addPostFrameCallback((_) {
          if (mounted && !_isLoading) {
            _carregarAguardando();
          }
        });
      }
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(e.toString().replaceAll('Exception: ', '')),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    
    // Calcular greeting uma vez
    final h = DateTime.now().hour;
    final greeting = h < 12 ? 'Bom dia' : (h < 18 ? 'Boa tarde' : 'Boa noite');

    Widget body;
    switch (_index) {
      case 1:
        body = AgendaPage(
          idCabeleireiro: (widget.perfil == 'CABELEIREIRO' || widget.perfil == 'CABELEREIRO')
              ? widget.userId
              : null,
          showBackButton: false,
          onMarcarAtendido: (idFila, nomeCliente) {
            _pegarEAtender({'id': idFila, 'nome': nomeCliente});
          },
        );
        break;
      case 2:
        body = AddClientePage(
          onSuccess: () {
            if (!_isLoading && mounted) {
              WidgetsBinding.instance.addPostFrameCallback((_) {
                if (mounted && !_isLoading) {
                  _carregarAguardando();
                }
              });
            }
          },
          autoOpenModal: true,
        );
        break;
      case 3:
        body = const ProdutosServicosPage(readOnly: true);
        break;
      case 4:
        body = PerfilPage(
          userId: widget.userId,
          userName: widget.userName,
          perfil: widget.perfil,
        );
        break;
      case 0:
      default:
        body = _homeContent(() => greeting);
    }

    final isHome = _index == 0 || widget.hideBottomNav;
    final showBar = !widget.hideBottomNav;
    return Scaffold(
      backgroundColor: isHome ? AppColors.loginBackground : AppColors.background,
      appBar: (isHome || widget.hideBottomNav)
          ? null
          : AppBar(
              backgroundColor: AppColors.header,
              elevation: 0,
              systemOverlayStyle: SystemUiOverlayStyle.light,
              title: const Text('Cabeleireiro', style: TextStyle(color: AppColors.textPrimary)),
              centerTitle: true,
            ),
      body: isHome ? SafeArea(child: body) : body,
      bottomNavigationBar: showBar
          ? AppCircleNavBar(
              activeIndex: _index,
              onTap: (i) {
                if (i == 2) {
                  showAddClienteModal(
                    context,
                    onSuccess: () {
                      if (mounted && !_isLoading) _carregarAguardando();
                    },
                  );
                  return;
                }
                setState(() => _index = i);
                if (i == 0 || i == 1) {
                  _carregarAvatar();
                  if (i == 0) {
                    _carregarAguardando();
                    _carregarNotificacoes();
                  }
                }
              },
              isReception: false,
              useDarkTheme: true,
            )
          : null,
    );
  }

  /// Estilo do nome do usuário no header e do nome do cliente no card.
  static TextStyle get _nomeStyle => AppTypography.heading3.copyWith(
        color: Colors.white,
        fontWeight: FontWeight.bold,
      );

  Widget _homeContent(String Function() greeting) {
    return RefreshIndicator(
      onRefresh: () async {
        await Future.wait([
          _carregarAguardando(),
          _carregarAvatar(),
          _carregarNotificacoes(),
        ]);
      },
      color: AppColors.loginOrange,
      child: SingleChildScrollView(
        physics: const AlwaysScrollableScrollPhysics(),
        child: Padding(
          padding: EdgeInsets.symmetric(
            horizontal: SizeConfig.screenWidth! / 18,
            vertical: SizeConfig.screenHeight! / 56,
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildHeader(greeting),
              SizedBox(height: SizeConfig.screenHeight! / 50),
              _buildSearchBar(),
              SizedBox(height: SizeConfig.screenHeight! / 35),
              Text(
                'PRÓXIMOS CLIENTES',
                style: AppTypography.caption.copyWith(
                  color: AppColors.loginTextMuted,
                  fontSize: 12,
                  fontWeight: FontWeight.w600,
                ),
              ),
              const SizedBox(height: 12),
              _buildProximosClientesCard(),
              SizedBox(height: SizeConfig.screenHeight! / 28),
              Text(
                'GESTOR RÁPIDO',
                style: AppTypography.caption.copyWith(
                  color: AppColors.loginTextMuted,
                  fontSize: 12,
                  fontWeight: FontWeight.w600,
                ),
              ),
              const SizedBox(height: 12),
              _buildGestorRapido(),
              const SizedBox(height: 24),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHeader(String Function() greeting) {
    final hasAvatar = _avatarUrl != null && _avatarUrl!.isNotEmpty;
    final greet = greeting().toUpperCase();
    return Row(
      children: [
        Stack(
          alignment: Alignment.bottomRight,
          children: [
            CircleAvatar(
              radius: 26,
              backgroundColor: AppColors.loginOrange.withOpacity(0.3),
              backgroundImage: hasAvatar ? NetworkImage(_avatarUrl!) : null,
              child: hasAvatar ? null : const Icon(Icons.person, color: AppColors.loginOrange, size: 30),
            ),
            Positioned(
              right: 0,
              bottom: 0,
              child: Container(
                width: 14,
                height: 14,
                decoration: BoxDecoration(
                  color: const Color(0xFF00C853),
                  shape: BoxShape.circle,
                  border: Border.all(color: AppColors.loginBackground, width: 2),
                ),
              ),
            ),
          ],
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                greet,
                style: AppTypography.caption.copyWith(
                  color: AppColors.loginTextMuted,
                  fontSize: 12,
                ),
              ),
              const SizedBox(height: 2),
              Text(
                widget.userName,
                style: _nomeStyle,
                overflow: TextOverflow.ellipsis,
              ),
            ],
          ),
        ),
        Icon(Icons.content_cut, color: AppColors.loginOrange, size: 28),
        const SizedBox(width: 8),
        GestureDetector(
          onTap: () {
            setState(() => _notificationCount = 0);
            showNotificacoesModal(
              context,
              perfil: 'CABELEIREIRO',
              idUsuario: widget.userId,
              onMarcarTodasLidas: () {},
              onNotificationTap: (_) {},
            ).then((_) => _carregarNotificacoes());
          },
          child: Stack(
            clipBehavior: Clip.none,
            children: [
              Container(
                width: 44,
                height: 44,
                decoration: BoxDecoration(
                  color: AppColors.loginInputBackground,
                  shape: BoxShape.circle,
                ),
                child: const Icon(Icons.notifications_outlined, color: Colors.white70, size: 22),
              ),
              if (_notificationCount > 0)
                Positioned(
                  top: -2,
                  right: -2,
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                    decoration: BoxDecoration(
                      color: AppColors.loginOrange,
                      borderRadius: BorderRadius.circular(10),
                    ),
                    constraints: const BoxConstraints(minWidth: 20, minHeight: 18),
                    child: Center(
                      child: Text(
                        _notificationCount > 99 ? '99+' : '$_notificationCount',
                        style: AppTypography.chip.copyWith(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 11),
                      ),
                    ),
                  ),
                ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildSearchBar() {
    return TextField(
      controller: _searchCtrl,
      style: const TextStyle(color: Colors.white),
      cursorColor: AppColors.loginOrange,
      decoration: InputDecoration(
        hintText: 'Buscar clientes...',
        hintStyle: TextStyle(color: AppColors.loginTextMuted),
        prefixIcon: Icon(Icons.search, color: AppColors.loginTextMuted, size: 22),
        filled: true,
        fillColor: AppColors.loginInputBackground,
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide(color: AppColors.loginInputBackground),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.loginOrange, width: 1),
        ),
      ),
    );
  }

  Widget _buildProximosClientesCard() {
    if (loading) {
      return SizedBox(
        height: 320,
        child: Center(
          child: Container(
            padding: const EdgeInsets.symmetric(vertical: 48, horizontal: 24),
            decoration: BoxDecoration(
              color: const Color(0xFF1E1E1E),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: Colors.white12),
            ),
            child: const CircularProgressIndicator(color: AppColors.loginOrange),
          ),
        ),
      );
    }
    var listaFiltrada = aguardando;
    if (_searchQuery.trim().isNotEmpty) {
      final q = _searchQuery.trim().toLowerCase();
      listaFiltrada = aguardando.where((e) => (e['nome']?.toString() ?? '').toLowerCase().contains(q)).toList();
    }
    if (listaFiltrada.isEmpty) {
      return Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(vertical: 40, horizontal: 24),
        decoration: BoxDecoration(
          color: const Color(0xFF1E1E1E),
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: Colors.white12),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.people_outline, color: Colors.white38, size: 48),
            const SizedBox(height: 16),
            Text(
              'Nenhum cliente na fila no momento.',
              style: AppTypography.bodyRegular.copyWith(color: Colors.white70),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      );
    }
    return SizedBox(
      height: 340,
      child: PageView.builder(
        controller: _proximosPageController,
        padEnds: true,
        itemCount: listaFiltrada.length,
        itemBuilder: (context, index) {
          final item = listaFiltrada[index];
          final currentPage = _proximosClientePage.clamp(0, listaFiltrada.length - 1);
          final isCentered = index == currentPage;
          return Padding(
            padding: const EdgeInsets.symmetric(horizontal: 6),
            child: _buildProximoClienteCard(
              item,
              index + 1,
              listaFiltrada.length,
              isCentered: isCentered,
            ),
          );
        },
      ),
    );
  }

  Widget _buildProximoClienteCard(
    Map<String, dynamic> item,
    int posicao,
    int total, {
    bool isCentered = true,
  }) {
    final nome = item['nome'] as String? ?? 'Cliente';
    return AnimatedScale(
      scale: isCentered ? 1.0 : 0.92,
      duration: const Duration(milliseconds: 200),
      child: AnimatedOpacity(
        opacity: isCentered ? 1.0 : 0.75,
        duration: const Duration(milliseconds: 200),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 24, horizontal: 20),
          decoration: BoxDecoration(
            color: const Color(0xFF1E1E1E),
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: Colors.white12),
            boxShadow: isCentered
                ? [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.5),
                      blurRadius: 20,
                      spreadRadius: 0,
                      offset: const Offset(0, 8),
                    ),
                    BoxShadow(
                      color: AppColors.loginOrange.withOpacity(0.15),
                      blurRadius: 24,
                      spreadRadius: -4,
                      offset: const Offset(0, 6),
                    ),
                  ]
                : [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.25),
                      blurRadius: 8,
                      spreadRadius: 0,
                      offset: const Offset(0, 2),
                    ),
                  ],
          ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            padding: const EdgeInsets.all(4),
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(color: AppColors.loginOrange, width: 2),
              color: Colors.white.withOpacity(0.05),
            ),
            child: CircleAvatar(
              radius: 36,
              backgroundColor: Colors.white24,
              child: Icon(Icons.person, color: Colors.white70, size: 40),
            ),
          ),
          const SizedBox(height: 12),
          Text(
            nome,
            style: _nomeStyle.copyWith(fontSize: 20),
            textAlign: TextAlign.center,
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
          ),
          const SizedBox(height: 4),
          Text(
            '$posicaoº na fila',
            style: AppTypography.caption.copyWith(
              color: AppColors.loginTextMuted,
              fontSize: 11,
            ),
          ),
          const SizedBox(height: 8),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.schedule, color: AppColors.loginTextMuted, size: 16),
              const SizedBox(width: 4),
              Text(
                '09:00 - 09:45',
                style: AppTypography.caption.copyWith(color: AppColors.loginTextMuted, fontSize: 12),
              ),
            ],
          ),
          const SizedBox(height: 16),
          if (widget.perfil == 'DONO' || widget.perfil == 'CABELEIREIRO' || widget.perfil == 'CABELEREIRO')
            SizedBox(
              width: double.infinity,
              child: ElevatedButton.icon(
                onPressed: () => _pegarEAtender(item),
                icon: const Icon(Icons.play_arrow, color: Colors.white, size: 20),
                label: const Text('ATENDER', style: TextStyle(fontSize: 12)),
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.loginOrange,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                  elevation: 2,
                  shadowColor: AppColors.loginOrange.withOpacity(0.5),
                ),
              ),
            ),
        ],
      ),
        ),
      ),
    );
  }

  Widget _buildGestorRapido() {
    final items = <Map<String, dynamic>>[
      {'icon': Icons.calendar_today, 'label': 'MINHA AGENDA', 'onTap': () => setState(() => _index = 1)},
      {'icon': Icons.inventory_2_outlined, 'label': 'VER ESTOQUE', 'onTap': () => setState(() => _index = 3)},
    ];
    return GridView.count(
      crossAxisCount: 2,
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      mainAxisSpacing: 12,
      crossAxisSpacing: 12,
      childAspectRatio: 1.1,
      children: items.map((e) {
        final onTap = e['onTap'] as VoidCallback;
        return Material(
          color: Colors.transparent,
          child: InkWell(
            onTap: onTap,
            borderRadius: BorderRadius.circular(16),
            child: Container(
              decoration: BoxDecoration(
                color: const Color(0xFF1E1E1E),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: Colors.white12),
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(e['icon'] as IconData, color: AppColors.loginOrange, size: 36),
                  const SizedBox(height: 12),
                  Text(
                    e['label'] as String,
                    style: AppTypography.caption.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.w600,
                      fontSize: 12,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),
          ),
        );
      }).toList(),
    );
  }

}

/// Tela "Clientes aguardando" com botão ATENDER em cada item. Usada após salvar cliente no modal (+).
class ClientesAguardandoPage extends StatefulWidget {
  final int userId;

  const ClientesAguardandoPage({Key? key, required this.userId}) : super(key: key);

  @override
  State<ClientesAguardandoPage> createState() => _ClientesAguardandoPageState();
}

class _ClientesAguardandoPageState extends State<ClientesAguardandoPage> {
  List<Map<String, dynamic>> _lista = [];
  bool _loading = true;
  String? _error;

  Future<void> _carregar() async {
    setState(() { _loading = true; _error = null; });
    try {
      final data = await ApiClient.getClientesParaRecebimento();
      if (!mounted) return;
      setState(() { _lista = data; _loading = false; });
    } catch (e) {
      if (!mounted) return;
      setState(() { _error = e.toString().replaceAll('Exception: ', ''); _loading = false; });
    }
  }

  @override
  void initState() {
    super.initState();
    _carregar();
  }

  Future<void> _atender(Map<String, dynamic> item) async {
    final idFila = (item['id'] as num?)?.toInt();
    if (idFila == null) return;
    final nome = item['nome']?.toString() ?? 'Cliente';
    try {
      final at = await ApiClient.abrirAtendimento(idFila, widget.userId);
      final idAtendimento = (at['id'] as num).toInt();
      if (!mounted) return;
      await Navigator.push<void>(
        context,
        MaterialPageRoute(
          builder: (_) => AtendimentoBarberPage(
            atendimentoId: idAtendimento,
            clienteNome: nome,
            userId: widget.userId,
          ),
        ),
      );
      if (mounted) _carregar();
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(e.toString().replaceAll('Exception: ', ''))),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.loginBackground,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios, color: Colors.white),
          onPressed: () => Navigator.of(context).pop(),
        ),
        title: const Text(
          'Clientes aguardando',
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.w600),
        ),
      ),
      body: RefreshIndicator(
        onRefresh: _carregar,
        color: AppColors.loginOrange,
        child: _loading
            ? const Center(child: CircularProgressIndicator(color: AppColors.loginOrange))
            : _error != null
                ? Center(
                    child: Padding(
                      padding: const EdgeInsets.all(24),
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text(_error!, textAlign: TextAlign.center, style: const TextStyle(color: Colors.red)),
                          const SizedBox(height: 16),
                          TextButton(
                            onPressed: _carregar,
                            child: const Text('Tentar novamente', style: TextStyle(color: AppColors.loginOrange)),
                          ),
                        ],
                      ),
                    ),
                  )
                : _lista.isEmpty
                    ? ListView(
                        physics: const AlwaysScrollableScrollPhysics(),
                        children: [
                          SizedBox(height: MediaQuery.of(context).size.height * 0.2),
                          const Center(
                            child: Text(
                              'Nenhum cliente na fila no momento.',
                              style: TextStyle(color: AppColors.loginTextMuted, fontSize: 16),
                            ),
                          ),
                        ],
                      )
                    : ListView.builder(
                        physics: const AlwaysScrollableScrollPhysics(),
                        padding: const EdgeInsets.fromLTRB(20, 8, 20, 32),
                        itemCount: _lista.length,
                        itemBuilder: (_, i) {
                          final item = _lista[i];
                          final nome = item['nome']?.toString() ?? '—';
                          final hora = item['hora_entrada']?.toString() ?? '';
                          return Padding(
                            padding: const EdgeInsets.only(bottom: 12),
                            child: Container(
                              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                              decoration: BoxDecoration(
                                color: Colors.white.withOpacity(0.05),
                                borderRadius: BorderRadius.circular(14),
                                border: Border.all(color: Colors.white12),
                              ),
                              child: Row(
                                children: [
                                  CircleAvatar(
                                    radius: 26,
                                    backgroundColor: Colors.white12,
                                    child: const Icon(Icons.person_outline, color: Colors.white54, size: 28),
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
                                            fontSize: 16,
                                          ),
                                        ),
                                        if (hora.isNotEmpty)
                                          Text(
                                            hora,
                                            style: const TextStyle(color: AppColors.loginTextMuted, fontSize: 12),
                                          ),
                                      ],
                                    ),
                                  ),
                                  ElevatedButton.icon(
                                    onPressed: () => _atender(item),
                                    icon: const Icon(Icons.play_arrow, color: Colors.white, size: 20),
                                    label: const Text('ATENDER', style: TextStyle(fontSize: 12)),
                                    style: ElevatedButton.styleFrom(
                                      backgroundColor: AppColors.loginOrange,
                                      foregroundColor: Colors.white,
                                      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          );
                        },
                      ),
      ),
    );
  }
}

/// Item do carrinho (serviço ou produto) no lançamento do atendimento.
class _CartItem {
  final String tipo; // 'servico' | 'produto'
  final int id;
  final String descricao;
  final double valor;
  int quantidade;
  final String? icone;

  _CartItem({
    required this.tipo,
    required this.id,
    required this.descricao,
    required this.valor,
    this.quantidade = 1,
    this.icone,
  });

  double get subtotal => valor * quantidade;
}

class AtendimentoBarberPage extends StatefulWidget {
  final int atendimentoId;
  final String clienteNome;
  final int userId;

  const AtendimentoBarberPage({
    Key? key,
    required this.atendimentoId,
    required this.clienteNome,
    required this.userId,
  }) : super(key: key);

  @override
  State<AtendimentoBarberPage> createState() => _AtendimentoBarberPageState();
}

class _AtendimentoBarberPageState extends State<AtendimentoBarberPage> {
  final List<_CartItem> _cart = [];
  final _searchCtrl = TextEditingController();
  String _searchQuery = '';
  int _tabIndex = 0; // 0 = Serviços, 1 = Produtos
  List<Map<String, dynamic>> _servicos = [];
  List<Map<String, dynamic>> _produtos = [];
  bool _loadingData = false;
  bool _loadingAction = false;

  double get _subtotal => _cart.fold<double>(0, (s, e) => s + e.subtotal);
  double get _total => _subtotal;

  @override
  void initState() {
    super.initState();
    _loadServicosProdutos();
    _searchCtrl.addListener(() => setState(() => _searchQuery = _searchCtrl.text.trim()));
  }

  @override
  void dispose() {
    _searchCtrl.dispose();
    super.dispose();
  }

  Future<void> _loadServicosProdutos() async {
    setState(() => _loadingData = true);
    try {
      final s = await ApiClient.listServicos(todos: true);
      final p = await ApiClient.listProdutos(todos: true);
      if (mounted) {
        setState(() {
          _servicos = s;
          _produtos = p;
          _loadingData = false;
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() => _loadingData = false);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(e.toString().replaceAll('Exception: ', ''))),
        );
      }
    }
  }

  List<Map<String, dynamic>> get _filteredServicos {
    if (_searchQuery.isEmpty) return _servicos;
    final q = _searchQuery.toLowerCase();
    return _servicos
        .where((e) => (e['descricao']?.toString() ?? '').toLowerCase().contains(q))
        .toList();
  }

  List<Map<String, dynamic>> get _filteredProdutos {
    if (_searchQuery.isEmpty) return _produtos;
    final q = _searchQuery.toLowerCase();
    return _produtos
        .where((e) => (e['descricao']?.toString() ?? '').toLowerCase().contains(q))
        .toList();
  }

  void _addToCart(String tipo, Map<String, dynamic> item) {
    final id = (item['id'] as num).toInt();
    final desc = item['descricao']?.toString() ?? '';

    if (tipo == 'produto') {
      final estoque = (item['estoque'] as num?)?.toInt();
      if (estoque != null) {
        if (estoque <= 0) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text('Não é possível adicionar: "$desc" está em falta no estoque.'),
              backgroundColor: Colors.red.shade700,
            ),
          );
          return;
        }
        int noCarrinho = 0;
        for (final e in _cart) {
          if (e.tipo == 'produto' && e.id == id) noCarrinho += e.quantidade;
        }
        if (noCarrinho + 1 > estoque) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text(
                'Não é possível adicionar: estoque de "$desc" é $estoque un. Você já tem $noCarrinho no pedido.',
              ),
              backgroundColor: Colors.orange.shade800,
            ),
          );
          return;
        }
      }
    }

    final valor = (tipo == 'servico'
            ? (item['valor'] as num?)?.toDouble()
            : (item['valor_venda'] as num?)?.toDouble()) ??
        0.0;
    final icone = item['icone']?.toString();
    _CartItem? existing;
    for (final e in _cart) {
      if (e.tipo == tipo && e.id == id) {
        existing = e;
        break;
      }
    }
    if (existing != null) {
      final e = existing;
      setState(() => e.quantidade++);
    } else {
      setState(() => _cart.add(_CartItem(
            tipo: tipo,
            id: id,
            descricao: desc,
            valor: valor,
            quantidade: 1,
            icone: icone,
          )));
    }
  }

  void _updateQty(_CartItem item, int delta) {
    if (delta > 0 && item.tipo == 'produto') {
      Map<String, dynamic>? prod;
      for (final e in _produtos) {
        if ((e['id'] as num?)?.toInt() == item.id) {
          prod = e;
          break;
        }
      }
      if (prod != null) {
        final estoque = (prod['estoque'] as num?)?.toInt();
        if (estoque != null && item.quantidade + delta > estoque) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text('Estoque de "${item.descricao}" é $estoque un. Não é possível aumentar a quantidade.'),
              backgroundColor: Colors.orange.shade800,
            ),
          );
          return;
        }
      }
    }
    final q = item.quantidade + delta;
    if (q <= 0) {
      setState(() => _cart.remove(item));
    } else {
      setState(() => item.quantidade = q);
    }
  }

  void _removeFromCart(_CartItem item) {
    setState(() => _cart.remove(item));
  }

  Future<void> _finalizarVenda() async {
    if (_cart.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Adicione ao menos um item (serviço ou produto) antes de finalizar.')),
      );
      return;
    }
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: const Color(0xFF0D0D0D),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        title: const Text(
          'Finalizar venda',
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
        ),
        content: Text(
          'Total: ${_brl(_total)}\n\nEncerrar atendimento de ${widget.clienteNome}?',
          style: const TextStyle(color: Colors.white70),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(false),
            child: const Text('CANCELAR', style: TextStyle(color: Colors.white70)),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: buttonColor),
            onPressed: () => Navigator.of(ctx).pop(true),
            child: const Text('FINALIZAR', style: TextStyle(color: Colors.white)),
          ),
        ],
      ),
    );
    if (ok != true || !mounted) return;
    setState(() => _loadingAction = true);
    try {
      final servicosPayload = <Map<String, dynamic>>[];
      final produtosPayload = <Map<String, dynamic>>[];
      for (final it in _cart) {
        if (it.tipo == 'servico') {
          for (var i = 0; i < it.quantidade; i++) {
            servicosPayload.add({'id_servico': it.id, 'valor': it.valor});
          }
        } else {
          produtosPayload.add({
            'id_produto': it.id,
            'quantidade': it.quantidade,
            'valor': it.valor,
          });
        }
      }
      if (servicosPayload.isNotEmpty) {
        await ApiClient.addServicosAtendimento(widget.atendimentoId, servicosPayload);
      }
      if (produtosPayload.isNotEmpty) {
        await ApiClient.addProdutosAtendimento(widget.atendimentoId, produtosPayload);
      }
      await ApiClient.encerrarAtendimento(widget.atendimentoId);
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Venda finalizada. Atendimento encerrado.')),
      );
      Navigator.of(context).pop();
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(e.toString().replaceAll('Exception: ', ''))),
      );
    } finally {
      if (mounted) setState(() => _loadingAction = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: AppColors.header,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: AppColors.textPrimary),
          onPressed: () => Navigator.of(context).pop(),
        ),
        title: Text(
          widget.clienteNome,
          style: const TextStyle(color: AppColors.textPrimary, fontSize: 18, fontWeight: FontWeight.w500),
        ),
        centerTitle: true,
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Padding(
            padding: EdgeInsets.symmetric(
              horizontal: SizeConfig.screenWidth! / 18,
              vertical: SizeConfig.screenHeight! / 91,
            ),
            child: _searchField(),
          ),
          Padding(
            padding: EdgeInsets.symmetric(horizontal: SizeConfig.screenWidth! / 18),
            child: _tabs(),
          ),
          SizedBox(height: SizeConfig.screenHeight! / 91),
          Expanded(
            child: _loadingData
                ? const Center(child: CircularProgressIndicator(color: Colors.white))
                : _tabIndex == 0
                    ? _gridServicos()
                    : _gridProdutos(),
          ),
          _resumoSection(),
        ],
      ),
    );
  }

  Widget _searchField() {
    return TextField(
      controller: _searchCtrl,
      style: const TextStyle(color: Colors.white),
      decoration: InputDecoration(
        hintText: 'Buscar cliente ou produto...',
        hintStyle: TextStyle(color: Colors.white54, fontSize: 15),
        prefixIcon: Icon(Icons.search, color: Colors.white54, size: 22),
        suffixIcon: _searchQuery.isNotEmpty
            ? IconButton(
                icon: const Icon(Icons.clear, color: Colors.white54, size: 20),
                onPressed: () => _searchCtrl.clear(),
              )
            : null,
        filled: true,
        fillColor: const Color(0xFF111111),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide.none,
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: Colors.white12),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide(color: buttonColor, width: 1.5),
        ),
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      ),
    );
  }

  Widget _tabs() {
    return Row(
      children: [
        Expanded(
          child: GestureDetector(
            onTap: () => setState(() => _tabIndex = 0),
            child: Container(
              padding: const EdgeInsets.symmetric(vertical: 12),
              decoration: BoxDecoration(
                color: _tabIndex == 0 ? const Color(0xFF1A1A1A) : Colors.transparent,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(
                  color: _tabIndex == 0 ? buttonColor : Colors.white24,
                  width: 1,
                ),
              ),
              child: Text(
                'Serviços',
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: _tabIndex == 0 ? Colors.white : Colors.white54,
                  fontWeight: FontWeight.w600,
                  fontSize: 15,
                ),
              ),
            ),
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: GestureDetector(
            onTap: () => setState(() => _tabIndex = 1),
            child: Container(
              padding: const EdgeInsets.symmetric(vertical: 12),
              decoration: BoxDecoration(
                color: _tabIndex == 1 ? const Color(0xFF1A1A1A) : Colors.transparent,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(
                  color: _tabIndex == 1 ? buttonColor : Colors.white24,
                  width: 1,
                ),
              ),
              child: Text(
                'Produtos',
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: _tabIndex == 1 ? Colors.white : Colors.white54,
                  fontWeight: FontWeight.w600,
                  fontSize: 15,
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _gridServicos() {
    final list = _filteredServicos;
    if (list.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.design_services_outlined, color: Colors.white38, size: 56),
            const SizedBox(height: 12),
            Text(
              _searchQuery.isEmpty ? 'Nenhum serviço cadastrado.' : 'Nenhum serviço encontrado.',
              style: const TextStyle(color: Colors.white54, fontSize: 16),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      );
    }
    return GridView.builder(
      padding: EdgeInsets.symmetric(horizontal: SizeConfig.screenWidth! / 18),
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        mainAxisSpacing: 14,
        crossAxisSpacing: 14,
        childAspectRatio: 0.70,
      ),
      itemCount: list.length,
      itemBuilder: (context, i) => _ItemCard(
        descricao: list[i]['descricao']?.toString() ?? '',
        valor: (list[i]['valor'] as num?)?.toDouble() ?? 0,
        icone: list[i]['icone']?.toString(),
        imagem: list[i]['imagem']?.toString(),
        onAdd: () => _addToCart('servico', list[i]),
      ),
    );
  }

  Widget _gridProdutos() {
    final list = _filteredProdutos;
    if (list.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.inventory_2_outlined, color: Colors.white38, size: 56),
            const SizedBox(height: 12),
            Text(
              _searchQuery.isEmpty ? 'Nenhum produto cadastrado.' : 'Nenhum produto encontrado.',
              style: const TextStyle(color: Colors.white54, fontSize: 16),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      );
    }
    return GridView.builder(
      padding: EdgeInsets.symmetric(horizontal: SizeConfig.screenWidth! / 18),
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        mainAxisSpacing: 14,
        crossAxisSpacing: 14,
        childAspectRatio: 0.70,
      ),
      itemCount: list.length,
      itemBuilder: (context, i) => _ItemCard(
        descricao: list[i]['descricao']?.toString() ?? '',
        valor: (list[i]['valor_venda'] as num?)?.toDouble() ?? 0,
        icone: list[i]['icone']?.toString(),
        imagem: list[i]['imagem']?.toString(),
        estoque: (list[i]['estoque'] as num?)?.toInt(),
        onAdd: () => _addToCart('produto', list[i]),
      ),
    );
  }

  Widget _resumoSection() {
    // Altura menor para a lista: ~2 itens visíveis, resto em scroll — deixa mais espaço para o grid
    final maxListHeight = (SizeConfig.screenHeight ?? 600) * 0.14;
    return Container(
      width: double.infinity,
      padding: EdgeInsets.fromLTRB(
        SizeConfig.screenWidth! / 18,
        8,
        SizeConfig.screenWidth! / 18,
        10,
      ),
      decoration: BoxDecoration(
        color: const Color(0xFF0D0D0D),
        border: Border(top: BorderSide(color: Colors.white12)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Resumo do Pedido',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 14,
                  fontWeight: FontWeight.bold,
                ),
              ),
              if (_cart.isNotEmpty)
                Text(
                  '${_cart.length} ${_cart.length == 1 ? 'item' : 'itens'} · ${_brl(_total)}',
                  style: TextStyle(color: buttonColor, fontSize: 13, fontWeight: FontWeight.w600),
                ),
            ],
          ),
          SizedBox(height: 6),
          if (_cart.isEmpty)
            const Padding(
              padding: EdgeInsets.symmetric(vertical: 6.0),
              child: Text(
                'Nenhum item. Toque em (+) em Serviços ou Produtos.',
                style: TextStyle(color: Colors.white54, fontSize: 12),
              ),
            )
          else
            ConstrainedBox(
              constraints: BoxConstraints(maxHeight: maxListHeight),
              child: ListView.separated(
                shrinkWrap: true,
                physics: const BouncingScrollPhysics(),
                itemCount: _cart.length,
                separatorBuilder: (_, __) => const SizedBox(height: 4),
                itemBuilder: (context, i) {
                  final e = _cart[i];
                  return _ResumoItemRow(
                    item: e,
                    brl: _brl,
                    onMinus: () => _updateQty(e, -1),
                    onPlus: () => _updateQty(e, 1),
                    onRemove: () => _removeFromCart(e),
                  );
                },
              ),
            ),
          if (_cart.isNotEmpty) ...[
            SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('Total a pagar', style: TextStyle(color: Colors.white70, fontSize: 13)),
                Text(_brl(_total), style: TextStyle(color: buttonColor, fontWeight: FontWeight.w700, fontSize: 15)),
              ],
            ),
            SizedBox(height: 8),
          ],
          SizedBox(
            width: double.infinity,
            child: FilledButton(
              onPressed: _loadingAction ? null : _finalizarVenda,
              style: FilledButton.styleFrom(
                backgroundColor: buttonColor,
                padding: const EdgeInsets.symmetric(vertical: 12),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              ),
              child: _loadingAction
                  ? const SizedBox(
                      height: 22,
                      width: 22,
                      child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2),
                    )
                  : const Text(
                      'Finalizar venda',
                      style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 15),
                    ),
            ),
          ),
        ],
      ),
    );
  }
}

class _ItemCard extends StatelessWidget {
  final String descricao;
  final double valor;
  final String? icone;
  final String? imagem;
  final int? estoque;
  final VoidCallback onAdd;

  const _ItemCard({
    required this.descricao,
    required this.valor,
    this.icone,
    this.imagem,
    this.estoque,
    required this.onAdd,
  });

  @override
  Widget build(BuildContext context) {
    final iconData = iconFromCode(icone) ?? Icons.category;
    final useImagem = imagem != null && imagem!.isNotEmpty;
    final semEstoque = estoque != null && estoque! <= 0;
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF141414),
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: Colors.white.withOpacity(0.12), width: 1),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.25),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Expanded(
            flex: 3,
            child: Stack(
              fit: StackFit.expand,
              children: [
                Padding(
                  padding: const EdgeInsets.all(10),
                  child: useImagem
                      ? ClipRRect(
                          borderRadius: BorderRadius.circular(10),
                          child: Image.network(
                            '$serverBase/$imagem',
                            fit: BoxFit.cover,
                            width: double.infinity,
                            height: double.infinity,
                            errorBuilder: (_, __, ___) => _buildIconPlaceholder(iconData),
                          ),
                        )
                      : _buildIconPlaceholder(iconData),
                ),
                Positioned(
                  top: 6,
                  right: 6,
                  child: Material(
                    color: semEstoque ? Colors.grey.shade700 : buttonColor,
                    borderRadius: BorderRadius.circular(22),
                    elevation: semEstoque ? 0 : 4,
                    shadowColor: semEstoque ? null : buttonColor.withOpacity(0.5),
                    child: InkWell(
                      onTap: semEstoque
                          ? () {
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text('Não é possível adicionar: "$descricao" está em falta no estoque.'),
                                  backgroundColor: Colors.red.shade700,
                                ),
                              );
                            }
                          : onAdd,
                      borderRadius: BorderRadius.circular(22),
                      child: const Padding(
                        padding: EdgeInsets.all(10),
                        child: Icon(Icons.add, color: Colors.white, size: 22),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
          Container(
            height: 1,
            color: Colors.white.withOpacity(0.08),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(12, 10, 12, 12),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  descricao,
                  style: const TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.w600,
                    fontSize: 13,
                    height: 1.2,
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: 6),
                Text(
                  _brl(valor),
                  style: TextStyle(
                    color: buttonColor,
                    fontWeight: FontWeight.w800,
                    fontSize: 15,
                    letterSpacing: 0.3,
                  ),
                ),
                if (estoque != null) ...[
                  const SizedBox(height: 4),
                  Text(
                    semEstoque ? 'Sem estoque' : 'Estoque: $estoque',
                    style: TextStyle(
                      color: semEstoque ? Colors.red.shade400 : Colors.white54,
                      fontSize: 11,
                      fontWeight: semEstoque ? FontWeight.w600 : FontWeight.w500,
                    ),
                  ),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildIconPlaceholder(IconData iconData) {
    return Container(
      width: double.infinity,
      height: double.infinity,
      decoration: BoxDecoration(
        color: buttonColor.withOpacity(0.12),
        borderRadius: BorderRadius.circular(10),
      ),
      child: Icon(iconData, color: buttonColor, size: 44),
    );
  }
}

class _ResumoItemRow extends StatelessWidget {
  final _CartItem item;
  final String Function(num) brl;
  final VoidCallback onMinus;
  final VoidCallback onPlus;
  final VoidCallback onRemove;

  const _ResumoItemRow({
    required this.item,
    required this.brl,
    required this.onMinus,
    required this.onPlus,
    required this.onRemove,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 2),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Expanded(
            child: Row(
              children: [
                Flexible(
                  child: Text(
                    item.descricao,
                    style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w500, fontSize: 13),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                const SizedBox(width: 6),
                Text(
                  brl(item.valor),
                  style: TextStyle(color: buttonColor, fontWeight: FontWeight.w600, fontSize: 12),
                ),
              ],
            ),
          ),
          Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              IconButton(
                onPressed: onMinus,
                icon: const Icon(Icons.remove, color: Colors.white70, size: 18),
                style: IconButton.styleFrom(
                  padding: const EdgeInsets.all(2),
                  minimumSize: const Size(30, 30),
                  backgroundColor: Colors.white12,
                ),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 6),
                child: Text(
                  '${item.quantidade}',
                  style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w600, fontSize: 13),
                ),
              ),
              IconButton(
                onPressed: onPlus,
                icon: const Icon(Icons.add, color: Colors.white70, size: 18),
                style: IconButton.styleFrom(
                  padding: const EdgeInsets.all(2),
                  minimumSize: const Size(30, 30),
                  backgroundColor: Colors.white12,
                ),
              ),
              const SizedBox(width: 2),
              IconButton(
                onPressed: onRemove,
                icon: Icon(Icons.delete_outline, color: Colors.red.shade400, size: 20),
                style: IconButton.styleFrom(padding: const EdgeInsets.all(2)),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

String _brl(num v) {
  final parts = v.toStringAsFixed(2).split('.');
  final inteiro = parts[0];
  final cents = parts[1];
  final buffer = StringBuffer();
  for (int i = 0; i < inteiro.length; i++) {
    final pos = inteiro.length - i;
    buffer.write(inteiro[i]);
    if (pos > 1 && pos % 3 == 1 && i != inteiro.length - 1) {
      buffer.write('.');
    }
  }
  return 'R\$ ${buffer.toString()},$cents';
}
