import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:barbearia/config/app_colors.dart';
import 'package:barbearia/config/app_typography.dart';
import 'package:barbearia/view/home_page/components/size_config.dart';
import 'package:barbearia/view/reception_page/cash_page.dart';
import 'package:barbearia/api/api_client.dart' show ApiClient, serverBase;
import 'package:barbearia/view/shared/app_circle_nav_bar.dart';
import 'package:barbearia/view/shared/add_cliente_modal.dart';
import 'package:barbearia/view/shared/add_cliente_page.dart';
import 'package:barbearia/view/shared/notificacoes_modal.dart';
import 'package:barbearia/view/reception_page/produtos_servicos_page.dart';
import 'package:barbearia/view/reception_page/produtos_page.dart';
import 'package:barbearia/view/reception_page/cadastro_produto_page.dart';
import 'package:barbearia/view/reception_page/agenda_page.dart';
import 'package:barbearia/view/reception_page/servicos_page.dart';
import 'package:barbearia/view/shared/perfil_page.dart';

class ReceptionHome extends StatefulWidget {
  final int userId;
  final String userName;
  const ReceptionHome({Key? key, required this.userId, required this.userName}) : super(key: key);

  @override
  State<ReceptionHome> createState() => _ReceptionHomeState();
}

class _ReceptionHomeState extends State<ReceptionHome> {
  double caixaDoDia = 0;
  List<Map<String, dynamic>> aguardando = [];
  List<Map<String, dynamic>> encerrados = [];
  bool loading = false;
  bool loadingEncerrados = false;
  String? error;
  int _index = 0;
  bool _isLoading = false;
  final TextEditingController _searchCtrl = TextEditingController();
  String _searchQuery = '';
  int _notificationCount = 0;
  String? _avatarUrl;
  bool _autoNotificacoesShown = false;

  @override
  void initState() {
    super.initState();
    _searchCtrl.addListener(() => setState(() => _searchQuery = _searchCtrl.text.trim()));
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _carregarAguardando();
      _carregarEncerrados();
      _carregarNotificacoes();
      _carregarAvatar();
    });
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

  @override
  void dispose() {
    _searchCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    
    // Calcular greeting uma vez
    final h = DateTime.now().hour;
    final greeting = h < 12 ? "Bom dia" : (h < 18 ? "Boa tarde" : "Boa noite");

    Widget currentBody;
    switch (_index) {
      case 1:
        currentBody = const CashPage(showBackButton: false);
        break;
      case 2:
        currentBody = AddClientePage(
          onSuccess: () {
            if (!_isLoading && mounted) {
              _carregarAguardando().then((_) {
                if (mounted) {
                  setState(() => _index = 0); // Volta para Home antes de abrir fila
                  _abrirAllClientsPage();
                }
              });
              _carregarEncerrados();
            }
          },
          autoOpenModal: true,
        );
        break;
      case 3:
        currentBody = const ProdutosServicosPage();
        break;
      case 4:
        currentBody = PerfilPage(
          userId: widget.userId,
          userName: widget.userName,
          perfil: 'RECEPCIONISTA',
        );
        break;
      case 0:
      default:
        currentBody = _homeContent(() => greeting);
    }

    return Scaffold(
      backgroundColor: AppColors.loginBackground,
      body: SafeArea(child: currentBody),
      bottomNavigationBar: AppCircleNavBar(
        activeIndex: _index,
        onTap: (i) {
          setState(() => _index = i);
          if (i == 0) _carregarAvatar();
        },
        isReception: true,
        useDarkTheme: true,
      ),
    );
  }

  Widget _homeContent(String Function() greeting) {
    final greetingText = "${greeting()}, ${widget.userName} 👋".trim();
    return RefreshIndicator(
      onRefresh: () async {
        await Future.wait([
          _carregarAguardando(),
          _carregarEncerrados(),
          _atualizarCaixa(),
          _carregarNotificacoes(),
          _carregarAvatar(),
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
              _greetingRow(greetingText),
              SizedBox(height: SizeConfig.screenHeight! / 80),
              _searchField(),
              SizedBox(height: SizeConfig.screenHeight! / 40),
              Text(
                "Caixa do Dia",
                style: AppTypography.heading4.copyWith(color: Colors.white),
              ),
              SizedBox(height: SizeConfig.screenHeight! / 80),
              _caixaCard(),
              SizedBox(height: SizeConfig.screenHeight! / 28),
              Text(
                "Ações Rápidas",
                style: AppTypography.heading4.copyWith(color: Colors.white),
              ),
              SizedBox(height: SizeConfig.screenHeight! / 80),
              _acoesRapidasCards(),
              SizedBox(height: SizeConfig.screenHeight! / 28),
              _sectionHeaderCliente(),
              SizedBox(height: SizeConfig.screenHeight! / 80),
              _clientesRecentPreview(),
              SizedBox(height: SizeConfig.screenHeight! / 40),
            ],
          ),
        ),
      ),
    );
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
      final data = await ApiClient.getAguardando();
      final saldo = await ApiClient.getSaldoDia();
      if (!mounted) {
        _isLoading = false;
        return;
      }
      setState(() {
        aguardando = data;
        caixaDoDia = saldo;
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

  Future<void> _carregarNotificacoes() async {
    if (!mounted) return;
    try {
      final lista = await ApiClient.getNotificacoes('RECEPCAO');
      if (!mounted) return;
      final count = lista.length;
      setState(() => _notificationCount = count);
      if (!_autoNotificacoesShown && count > 0) {
        _autoNotificacoesShown = true;
        Future.delayed(const Duration(milliseconds: 800), () {
          if (!mounted) return;
          showNotificacoesModal(
            context,
            perfil: 'RECEPCAO',
            onMarcarTodasLidas: () {},
            onNotificationTap: _navegarPorNotificacao,
          ).then((_) => _carregarNotificacoes());
        });
      }
    } catch (_) {}
  }

  void _navegarPorNotificacao(Map<String, dynamic> item) {
    final tipo = item['tipo']?.toString() ?? '';
    if (tipo == 'RECEBIMENTO') {
      ApiClient.getEncerrados().then((data) {
        if (!mounted) return;
        final idRaw = item['id_atendimento'];
        int? idAtendimento;
        if (idRaw != null) {
          if (idRaw is int) {
            idAtendimento = idRaw;
          } else if (idRaw is num) {
            idAtendimento = idRaw.toInt();
          } else {
            idAtendimento = int.tryParse(idRaw.toString());
          }
        }
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (_) => AllRecebimentoPage(
              encerrados: data,
              idAtendimentoToOpen: idAtendimento,
              onPagamentoRegistrado: () {
                _atualizarCaixa();
                _carregarEncerrados();
                _carregarNotificacoes();
              },
            ),
          ),
        ).then((_) {
          _carregarEncerrados();
          _atualizarCaixa();
          _carregarNotificacoes();
        });
      }).catchError((e) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Erro: ${e.toString().replaceAll('Exception: ', '')}')),
          );
        }
      });
    } else if (tipo == 'REABASTECER') {
      final idRaw = item['id_produto'];
      int? idProduto;
      if (idRaw != null) {
        if (idRaw is int) {
          idProduto = idRaw;
        } else if (idRaw is num) {
          idProduto = idRaw.toInt();
        } else {
          idProduto = int.tryParse(idRaw.toString());
        }
      }
      if (idProduto == null || idProduto <= 0) return;
      ApiClient.listProdutos(todos: true).then((lista) {
        if (!mounted) return;
        Map<String, dynamic>? produto;
        for (final p in lista) {
          final pid = p['id'];
          final v = pid is int ? pid : (pid is num ? pid.toInt() : int.tryParse(pid?.toString() ?? ''));
          if (v == idProduto) {
            produto = p;
            break;
          }
        }
        if (produto != null) {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (_) => CadastroProdutoPage(
                item: produto,
                onSuccess: () => _carregarNotificacoes(),
              ),
            ),
          );
        }
      }).catchError((e) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Erro: ${e.toString().replaceAll('Exception: ', '')}')),
          );
        }
      });
    }
  }

  Future<void> _atualizarCaixa() async {
    if (!mounted) return;
    try {
      final saldo = await ApiClient.getSaldoDia();
      if (!mounted) return;
      setState(() {
        caixaDoDia = saldo;
      });
    } catch (e) {
      // Ignorar erro silenciosamente para não interromper o fluxo
    }
  }

  Future<void> _carregarEncerrados() async {
    if (!mounted) return;
    setState(() {
      loadingEncerrados = true;
    });
    try {
      final data = await ApiClient.getEncerrados();
      if (!mounted) return;
      
      // Processar dados
      final dataProcessada = _processarEncerrados(data);
      
      if (!mounted) return;
      setState(() {
        encerrados = dataProcessada;
        loadingEncerrados = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        loadingEncerrados = false;
      });
    }
  }

  List<Map<String, dynamic>> _processarEncerrados(List<Map<String, dynamic>> data) {
    if (data.isEmpty) {
      return [];
    }
    
    return data.map((item) {
      // Criar uma cópia para não modificar o original
      final novoItem = Map<String, dynamic>.from(item);
      
      var idAtendimento = novoItem["id_atendimento"];
      
      // Se id_atendimento é null ou inválido, tenta converter
      if (idAtendimento == null) {
        idAtendimento = novoItem["id"];
      }
      
      // Garantir que é um número válido
      if (idAtendimento != null) {
        if (idAtendimento is num) {
          if (idAtendimento > 0) {
            novoItem["id_atendimento"] = idAtendimento.toInt();
          }
        } else {
          final parsed = int.tryParse(idAtendimento.toString());
          if (parsed != null && parsed > 0) {
            novoItem["id_atendimento"] = parsed;
          }
        }
      }
      
      return novoItem;
    }).where((item) {
      // Filtrar apenas itens com id_atendimento válido
      final id = item["id_atendimento"];
      if (id == null) return false;
      if (id is num) return id > 0;
      if (id is int) return id > 0;
      return false;
    }).toList();
  }

  Widget _searchField() {
    return TextField(
      controller: _searchCtrl,
      style: const TextStyle(color: Colors.white),
      cursorColor: AppColors.loginOrange,
      decoration: InputDecoration(
        hintText: 'Buscar clientes, serviços...',
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

  Widget _greetingRow(String greet) {
    final hasAvatar = _avatarUrl != null && _avatarUrl!.isNotEmpty;
    return Row(
      children: [
        CircleAvatar(
          radius: 24,
          backgroundColor: AppColors.loginOrange.withOpacity(0.3),
          backgroundImage: hasAvatar ? NetworkImage(_avatarUrl!) : null,
          child: hasAvatar ? null : const Icon(Icons.person, color: AppColors.loginOrange, size: 28),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                "BEM-VINDO",
                style: AppTypography.caption.copyWith(
                  color: AppColors.loginTextMuted,
                  fontSize: 12,
                ),
              ),
              const SizedBox(height: 2),
              Text(
                greet,
                style: AppTypography.heading4.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
                overflow: TextOverflow.ellipsis,
              ),
            ],
          ),
        ),
        Material(
          color: Colors.transparent,
          child: InkWell(
            onTap: () {
              setState(() => _notificationCount = 0);
              showNotificacoesModal(
                context,
                perfil: 'RECEPCAO',
                onMarcarTodasLidas: () {},
                onNotificationTap: _navegarPorNotificacao,
              ).then((_) => _carregarNotificacoes());
            },
            borderRadius: BorderRadius.circular(24),
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
                Positioned(
                  top: -4,
                  right: -4,
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
                        style: AppTypography.chip.copyWith(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                          fontSize: 11,
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _caixaCard() {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (_) => const CashPage()),
          );
        },
        borderRadius: BorderRadius.circular(20),
        child: Container(
          width: double.infinity,
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: AppColors.loginInputBackground,
            borderRadius: BorderRadius.circular(20),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Expanded(
                    child: loading
                        ? const SizedBox(
                            height: 32,
                            width: 32,
                            child: CircularProgressIndicator(color: AppColors.loginOrange, strokeWidth: 2),
                          )
                        : Text(
                            _brl(caixaDoDia),
                            style: AppTypography.heading2.copyWith(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                  ),
                  const SizedBox(width: 12),
                  SizedBox(
                    width: 88,
                    height: 56,
                    child: CustomPaint(
                      painter: _LineChartPainter(color: AppColors.loginOrange),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              Align(
                alignment: Alignment.centerRight,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                  decoration: BoxDecoration(
                    color: const Color(0xFF2E7D32).withOpacity(0.3),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    "+15%",
                    style: AppTypography.caption.copyWith(
                      color: const Color(0xFF4CAF50),
                      fontWeight: FontWeight.w600,
                      fontSize: 12,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _abrirAllClientsPage() {
    void openPage() {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (_) => AllClientsPage(
            clientes: aguardando,
            onRefresh: () async {
              await _carregarAguardando();
              return aguardando;
            },
            onClienteAdicionado: () async {
              await _carregarAguardando();
              if (mounted) {
                Navigator.pop(context);
                openPage();
              }
            },
          ),
        ),
      );
    }
    openPage();
  }

  Widget _sectionHeaderCliente() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          "Clientes Recentes",
          style: AppTypography.heading4.copyWith(color: Colors.white),
        ),
        Material(
          color: Colors.transparent,
          child: InkWell(
            onTap: () {
              if (aguardando.isNotEmpty) {
                _abrirAllClientsPage();
              } else if (encerrados.isNotEmpty) {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (_) => AllRecebimentoPage(
                      encerrados: encerrados,
                      onPagamentoRegistrado: () {
                        _atualizarCaixa();
                        _carregarEncerrados();
                      },
                    ),
                  ),
                ).then((_) {
                  _carregarEncerrados();
                  _atualizarCaixa();
                });
              } else if (!_isLoading) {
                showAddClienteModal(context, onSuccess: () {
                  if (!_isLoading && mounted) _carregarAguardando();
                });
              }
            },
            borderRadius: BorderRadius.circular(8),
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 4),
              child: Text(
                "VER TODOS",
                style: AppTypography.bodyBold.copyWith(
                  color: AppColors.loginOrange,
                  fontSize: 12,
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }

  List<Map<String, dynamic>> _getClientesRecentes() {
    final combined = <Map<String, dynamic>>[];
    for (final a in aguardando) {
      combined.add({...a, '_status': 'AGUARDANDO', '_sort': _getSortTime(a, true)});
    }
    for (final e in encerrados) {
      combined.add({...e, '_status': 'FINALIZADO', '_sort': _getSortTime(e, false)});
    }
    combined.sort((a, b) {
      final ta = a['_sort'] as DateTime? ?? DateTime(2100);
      final tb = b['_sort'] as DateTime? ?? DateTime(2100);
      return ta.compareTo(tb);
    });
    var result = combined;
    if (_searchQuery.isNotEmpty) {
      final q = _searchQuery.toLowerCase();
      result = result.where((item) {
        final nome = (item['nome'] ?? item['cliente'] ?? '').toString().toLowerCase();
        final servico = _getServicoNome(item).toLowerCase();
        return nome.contains(q) || servico.contains(q);
      }).toList();
    }
    return result.take(3).toList();
  }

  DateTime? _getSortTime(Map<String, dynamic> item, bool isAguardando) {
    dynamic raw = item["entrada"] ?? item["created_at"] ?? item["data_entrada"] ?? item["horario"] ?? item["data_fim"];
    if (raw == null) return null;
    if (raw is String) return DateTime.tryParse(raw);
    if (raw is int) return DateTime.fromMillisecondsSinceEpoch(raw);
    return null;
  }

  Widget _clientesRecentPreview() {
    if (loading && aguardando.isEmpty && encerrados.isEmpty) {
      return const Center(
        child: Padding(
          padding: EdgeInsets.all(24),
          child: CircularProgressIndicator(color: AppColors.loginOrange),
        ),
      );
    }
    if (error != null && aguardando.isEmpty) {
      return Padding(
        padding: const EdgeInsets.all(16),
        child: Text(
          "Erro: $error",
          style: AppTypography.caption.copyWith(color: AppColors.error),
        ),
      );
    }
    final preview = _getClientesRecentes();
    if (preview.isEmpty) {
      return Container(
        width: double.infinity,
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          color: AppColors.loginInputBackground,
          borderRadius: BorderRadius.circular(16),
        ),
        child: Column(
          children: [
            Icon(Icons.people_outline, color: AppColors.loginTextMuted, size: 40),
            const SizedBox(height: 12),
            Text(
              "Nenhum cliente recente.",
              style: AppTypography.bodyRegular.copyWith(color: AppColors.loginTextMuted),
            ),
            const SizedBox(height: 12),
            TextButton.icon(
              onPressed: () {
                showAddClienteModal(context, onSuccess: () {
                  if (mounted) _carregarAguardando();
                });
              },
              icon: const Icon(Icons.person_add, size: 18, color: AppColors.loginOrange),
              label: Text(
                "Adicionar cliente",
                style: AppTypography.bodyBold.copyWith(color: AppColors.loginOrange),
              ),
            ),
          ],
        ),
      );
    }
    return Column(
      children: preview.map((item) => _clienteRecentCard(item)).toList(),
    );
  }

  String _getServicoNome(Map<String, dynamic> item) {
    final s = item["servico"];
    if (s != null && s.toString().isNotEmpty) return s.toString();
    final list = item["servicos"];
    if (list is List && list.isNotEmpty) {
      final first = list.first;
      if (first is Map && first["nome"] != null) return first["nome"].toString();
      return first.toString();
    }
    return item["_status"] == 'AGUARDANDO' ? 'Aguardando' : 'Atendimento';
  }

  Widget _clienteRecentCard(Map<String, dynamic> item) {
    final nome = item["nome"]?.toString() ?? item["cliente"]?.toString() ?? "Cliente";
    final status = item["_status"]?.toString() ?? "AGUARDANDO";
    final hora = _formatHoraCliente(item);

    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: () {
            if (status == 'FINALIZADO') {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) => AllRecebimentoPage(
                    encerrados: encerrados,
                    onPagamentoRegistrado: () {
                      _atualizarCaixa();
                      _carregarEncerrados();
                    },
                  ),
                ),
              ).then((_) {
                _carregarEncerrados();
                _atualizarCaixa();
              });
            }
          },
          borderRadius: BorderRadius.circular(14),
          child: Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: AppColors.loginInputBackground,
              borderRadius: BorderRadius.circular(14),
            ),
            child: Row(
              children: [
                Container(
                  width: 44,
                  height: 44,
                  decoration: BoxDecoration(
                    color: AppColors.loginOrange.withOpacity(0.25),
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(Icons.person_outline, color: AppColors.loginOrange, size: 22),
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Text(
                    nome,
                    style: AppTypography.heading4.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                if (hora != null)
                  Text(
                    hora,
                    style: AppTypography.caption.copyWith(
                      color: AppColors.loginTextMuted,
                      fontSize: 13,
                    ),
                  ),
                const SizedBox(width: 10),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                  decoration: BoxDecoration(
                    color: status == 'FINALIZADO'
                        ? AppColors.loginOrange.withOpacity(0.3)
                        : AppColors.loginTextMuted.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    status,
                    style: AppTypography.caption.copyWith(
                      color: status == 'FINALIZADO' ? AppColors.loginOrange : AppColors.loginTextMuted,
                      fontWeight: FontWeight.w600,
                      fontSize: 11,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  String? _formatHoraCliente(Map<String, dynamic> item) {
    final raw = item["entrada"] ?? item["created_at"] ?? item["data_entrada"] ?? item["horario"] ?? item["data_fim"];
    if (raw == null) return null;
    DateTime? dt;
    if (raw is String) dt = DateTime.tryParse(raw);
    if (raw is int) dt = DateTime.fromMillisecondsSinceEpoch(raw);
    if (dt == null) return null;
    return "${dt.hour.toString().padLeft(2, '0')}:${dt.minute.toString().padLeft(2, '0')}";
  }

  Widget _acoesRapidasCards() {
    const gap = 12.0;
    return Column(
      children: [
        Row(
          children: [
            Expanded(
              child: _acaoRapidaCard(
                titulo: "Produtos",
                icone: Icons.inventory_2_outlined,
                type: "produto",
              ),
            ),
            const SizedBox(width: gap),
            Expanded(
              child: _acaoRapidaCard(
                titulo: "Serviços",
                icone: Icons.content_cut,
                type: "servico",
              ),
            ),
          ],
        ),
        const SizedBox(height: gap),
        Row(
          children: [
            Expanded(
              child: _acaoRapidaCard(
                titulo: "Pagamentos",
                icone: Icons.payments_outlined,
                type: "recebimento",
                badgeCount: encerrados.length,
              ),
            ),
            const SizedBox(width: gap),
            Expanded(
              child: _acaoRapidaCard(
                titulo: "Agenda",
                icone: Icons.calendar_today_outlined,
                type: "agenda",
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _acaoRapidaCard({
    required String titulo,
    required IconData icone,
    required String type,
    int? badgeCount,
  }) {
    final count = badgeCount ?? 0;
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: () {
          switch (type) {
            case 'produto':
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => const ProdutosPage()),
              );
              break;
            case 'recebimento':
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) => AllRecebimentoPage(
                    encerrados: encerrados,
                    onPagamentoRegistrado: () {
                      _atualizarCaixa();
                      _carregarEncerrados();
                    },
                  ),
                ),
              ).then((_) {
                _carregarEncerrados();
                _atualizarCaixa();
              });
              break;
            case 'servico':
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => const ServicosPage()),
              );
              break;
            case 'agenda':
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => const AgendaPage()),
              );
              break;
          }
        },
        borderRadius: BorderRadius.circular(16),
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 20),
          decoration: BoxDecoration(
            color: AppColors.loginInputBackground,
            borderRadius: BorderRadius.circular(16),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Row(
                mainAxisSize: MainAxisSize.min,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(icone, color: AppColors.loginOrange, size: 32),
                  if (badgeCount != null && count > 0) ...[
                    const SizedBox(width: 6),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                      decoration: BoxDecoration(
                        color: AppColors.loginOrange,
                        borderRadius: BorderRadius.circular(10),
                      ),
                      constraints: const BoxConstraints(minWidth: 20, minHeight: 18),
                      child: Center(
                        child: Text(
                          count > 99 ? '99+' : '$count',
                          style: AppTypography.chip.copyWith(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                            fontSize: 11,
                          ),
                        ),
                      ),
                    ),
                  ],
                ],
              ),
              const SizedBox(height: 12),
              Text(
                titulo,
                style: AppTypography.bodyBold.copyWith(
                  color: Colors.white,
                  fontSize: 14,
                ),
                textAlign: TextAlign.center,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

/// Desenha um mini gráfico de linha ascendente (tendência de crescimento).
class _LineChartPainter extends CustomPainter {
  final Color color;

  _LineChartPainter({required this.color});

  @override
  void paint(Canvas canvas, Size size) {
    const points = [0.2, 0.35, 0.3, 0.5, 0.45, 0.7, 0.85];
    final path = Path();
    final padding = 4.0;
    final w = size.width - padding * 2;
    final h = size.height - padding * 2;
    for (int i = 0; i < points.length; i++) {
      final x = padding + (i / (points.length - 1)) * w;
      final y = size.height - padding - (points[i] * h);
      if (i == 0) {
        path.moveTo(x, y);
      } else {
        path.lineTo(x, y);
      }
    }
    canvas.drawPath(
      path,
      Paint()
        ..color = color
        ..style = PaintingStyle.stroke
        ..strokeWidth = 2.5
        ..strokeCap = StrokeCap.round
        ..strokeJoin = StrokeJoin.round,
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
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
  return "R\$ ${buffer.toString()},$cents";
}

class AllRecebimentoPage extends StatefulWidget {
  final List<Map<String, dynamic>> encerrados;
  final VoidCallback? onPagamentoRegistrado;
  /// Se informado, abre automaticamente o modal de recebimento para este atendimento.
  final int? idAtendimentoToOpen;
  const AllRecebimentoPage({
    Key? key,
    required this.encerrados,
    this.onPagamentoRegistrado,
    this.idAtendimentoToOpen,
  }) : super(key: key);

  @override
  State<AllRecebimentoPage> createState() => _AllRecebimentoPageState();
}

class _AllRecebimentoPageState extends State<AllRecebimentoPage> {
  late List<Map<String, dynamic>> _encerrados;
  final _searchCtrl = TextEditingController();
  String _searchQuery = '';

  @override
  void initState() {
    super.initState();
    _encerrados = List<Map<String, dynamic>>.from(widget.encerrados);
    _searchCtrl.addListener(() => setState(() => _searchQuery = _searchCtrl.text.trim()));
    if (widget.idAtendimentoToOpen != null) {
      WidgetsBinding.instance.addPostFrameCallback((_) => _abrirModalSeNecessario());
    }
  }

  void _abrirModalSeNecessario() {
    if (!mounted || widget.idAtendimentoToOpen == null) return;
    final id = widget.idAtendimentoToOpen!;
    Map<String, dynamic>? item;
    for (final e in _encerrados) {
      final raw = e['id_atendimento'];
      if (raw == null) continue;
      final v = raw is int ? raw : (raw is num ? raw.toInt() : int.tryParse(raw.toString()));
      if (v == id) {
        item = e;
        break;
      }
    }
    if (item != null) {
      _openModal(context, item);
    }
  }

  @override
  void dispose() {
    _searchCtrl.dispose();
    super.dispose();
  }

  List<Map<String, dynamic>> get _filtered {
    if (_searchQuery.isEmpty) return _encerrados;
    final q = _searchQuery.toLowerCase();
    return _encerrados
        .where((e) => (e['nome'] ?? e['cliente'] ?? '')
            .toString()
            .toLowerCase()
            .contains(q))
        .toList();
  }

  void _atualizarLista() {
    // Recarregar dados da API
    ApiClient.getEncerrados().then((data) {
      if (mounted) {
        setState(() {
          _encerrados = data;
        });
        // Se a lista ficou vazia, pode fechar a tela automaticamente
        if (_encerrados.isEmpty) {
          // Não fechar automaticamente, deixar o usuário ver que está vazio
        }
      }
    }).catchError((e) {
      // Ignorar erro silenciosamente
    });
  }

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    
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
      return "R\$ ${buffer.toString()},$cents";
    }
    
    return Scaffold(
      backgroundColor: AppColors.loginBackground,
      appBar: AppBar(
        backgroundColor: AppColors.loginBackground,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.chevron_left, color: Colors.white, size: 28),
          onPressed: () => Navigator.of(context).pop(),
        ),
        title: const Text(
          "Recebimentos",
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.w600, fontSize: 18),
        ),
        centerTitle: true,
      ),
      body: _encerrados.isEmpty
          ? _emptyState()
          : Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Padding(
                  padding: EdgeInsets.fromLTRB(
                    SizeConfig.screenWidth! / 18,
                    SizeConfig.screenHeight! / 68,
                    SizeConfig.screenWidth! / 18,
                    SizeConfig.screenHeight! / 56,
                  ),
                  child: _searchField(),
                ),
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: SizeConfig.screenWidth! / 18),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        "PENDENTES",
                        style: AppTypography.bodyBold.copyWith(
                          color: AppColors.loginTextMuted,
                          fontSize: 12,
                          letterSpacing: 1,
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: AppColors.loginOrange,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Text(
                          "${_filtered.length} Clientes",
                          style: AppTypography.chip.copyWith(
                            color: Colors.white,
                            fontWeight: FontWeight.w600,
                            fontSize: 12,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                SizedBox(height: SizeConfig.screenHeight! / 80),
                Expanded(
                  child: _filtered.isEmpty
                      ? _emptySearchState()
                      : ListView.builder(
                          padding: EdgeInsets.fromLTRB(
                            SizeConfig.screenWidth! / 18,
                            0,
                            SizeConfig.screenWidth! / 18,
                            SizeConfig.screenHeight! / 34,
                          ),
                          itemCount: _filtered.length,
                          itemBuilder: (context, index) {
                            final item = _filtered[index];
                            return _RecebimentoCard(
                              item: item,
                              brl: _brl,
                              onTap: () => _openModal(context, item),
                            );
                          },
                        ),
                ),
              ],
            ),
    );
  }

  void _openModal(BuildContext context, Map<String, dynamic> item) {
    final nome = item["nome"] ?? item["cliente"] ?? "Cliente";
    final total = (item["total"] ?? 0) as num;
    final idAtendimentoRaw = item["id_atendimento"];
    int idAtendimento = 0;
    if (idAtendimentoRaw != null) {
      if (idAtendimentoRaw is int) {
        idAtendimento = idAtendimentoRaw;
      } else if (idAtendimentoRaw is num) {
        idAtendimento = idAtendimentoRaw.toInt();
      } else {
        idAtendimento = int.tryParse(idAtendimentoRaw.toString()) ?? 0;
      }
    }
    if (idAtendimento <= 0) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Erro: ID do atendimento inválido (recebido: $idAtendimentoRaw)")),
      );
      return;
    }
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) => _RecebimentoModal(
        nome: nome.toString(),
        total: total.toDouble(),
        idAtendimento: idAtendimento,
        onSuccess: () {
          _atualizarLista();
          widget.onPagamentoRegistrado?.call();
        },
        onCancel: () => Navigator.of(ctx).pop(),
      ),
    );
  }

  Widget _emptyState() {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.receipt_long_outlined, color: AppColors.loginTextMuted, size: 64),
            const SizedBox(height: 20),
            Text(
              "Nenhum atendimento aguardando recebimento.",
              style: AppTypography.bodyRegular.copyWith(color: AppColors.loginTextMuted, fontSize: 16),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }

  Widget _emptySearchState() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.search_off, color: AppColors.loginTextMuted, size: 48),
          const SizedBox(height: 16),
          Text(
            'Nenhum cliente encontrado para "$_searchQuery".',
            style: AppTypography.bodyRegular.copyWith(color: AppColors.loginTextMuted, fontSize: 15),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  Widget _searchField() {
    return TextField(
      controller: _searchCtrl,
      style: const TextStyle(color: Colors.white),
      cursorColor: AppColors.loginOrange,
      decoration: InputDecoration(
        hintText: 'Buscar cliente...',
        hintStyle: TextStyle(color: AppColors.loginTextMuted, fontSize: 15),
        prefixIcon: Icon(Icons.search, color: AppColors.loginTextMuted, size: 22),
        suffixIcon: _searchQuery.isNotEmpty
            ? IconButton(
                icon: Icon(Icons.clear, color: AppColors.loginTextMuted, size: 20),
                onPressed: () => _searchCtrl.clear(),
              )
            : null,
        filled: true,
        fillColor: AppColors.loginInputBackground,
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide.none,
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.loginOrange, width: 1.5),
        ),
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      ),
    );
  }
}

class _RecebimentoCard extends StatelessWidget {
  final Map<String, dynamic> item;
  final String Function(num) brl;
  final VoidCallback onTap;

  const _RecebimentoCard({
    required this.item,
    required this.brl,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final nome = item["nome"] ?? item["cliente"] ?? "Cliente";
    final total = (item["total"] ?? 0) as num;
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(16),
        child: Container(
          margin: const EdgeInsets.only(bottom: 12),
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: AppColors.loginInputBackground,
            borderRadius: BorderRadius.circular(16),
          ),
          child: Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Container(
                          width: 44,
                          height: 44,
                          decoration: BoxDecoration(
                            color: AppColors.loginBackground,
                            shape: BoxShape.circle,
                          ),
                          child: Icon(
                            Icons.person_outline,
                            color: AppColors.loginTextMuted,
                            size: 24,
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                "CLIENTE",
                                style: AppTypography.caption.copyWith(
                                  color: AppColors.loginTextMuted,
                                  fontSize: 11,
                                  letterSpacing: 0.5,
                                ),
                              ),
                              const SizedBox(height: 2),
                              Text(
                                nome.toString(),
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 16,
                                ),
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                              ),
                              const SizedBox(height: 8),
                              Text(
                                "TOTAL DEVIDO",
                                style: AppTypography.caption.copyWith(
                                  color: AppColors.loginTextMuted,
                                  fontSize: 11,
                                  letterSpacing: 0.5,
                                ),
                              ),
                              const SizedBox(height: 2),
                              Text(
                                brl(total.toDouble()),
                                style: const TextStyle(
                                  color: AppColors.loginOrange,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 18,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: AppColors.loginOrange,
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: const Text(
                      "AGUARDANDO",
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 11,
                        fontWeight: FontWeight.w600,
                        letterSpacing: 0.3,
                      ),
                    ),
                  ),
                  const SizedBox(height: 12),
                  Container(
                    width: 48,
                    height: 48,
                    decoration: BoxDecoration(
                      color: AppColors.loginOrange,
                      shape: BoxShape.circle,
                    ),
                    child: const Icon(
                      Icons.payments_outlined,
                      color: Colors.white,
                      size: 24,
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

/// Abre o modal de recebimento (nome, valor, id_atendimento). Usado pelo dashboard DONO e por ReceptionHome.
void showRecebimentoModal(
  BuildContext context, {
  required String nome,
  required double total,
  required int idAtendimento,
  VoidCallback? onSuccess,
}) {
  showModalBottomSheet<void>(
    context: context,
    isScrollControlled: true,
    backgroundColor: Colors.transparent,
    builder: (ctx) => _RecebimentoModal(
      nome: nome,
      total: total,
      idAtendimento: idAtendimento,
      onSuccess: () => onSuccess?.call(),
      onCancel: () => Navigator.of(ctx).pop(),
    ),
  );
}

class _RecebimentoModal extends StatefulWidget {
  final String nome;
  final double total;
  final int idAtendimento;
  final VoidCallback onSuccess;
  final VoidCallback onCancel;

  const _RecebimentoModal({
    Key? key,
    required this.nome,
    required this.total,
    required this.idAtendimento,
    required this.onSuccess,
    required this.onCancel,
  }) : super(key: key);

  @override
  State<_RecebimentoModal> createState() => _RecebimentoModalState();
}

class _RecebimentoModalState extends State<_RecebimentoModal> {
  final TextEditingController _valorController = TextEditingController();
  String _tipoPagamento = "Dinheiro";
  bool _loading = false;
  List<Map<String, dynamic>> _servicos = [];
  List<Map<String, dynamic>> _produtos = [];
  bool _loadingDetalhe = true;

  /// Primeira linha do título: "Recebimento - [primeiro nome]"
  static String _tituloRecebimentoLinha1(String nome) {
    final t = nome.trim();
    if (t.isEmpty) return 'Recebimento';
    final primeiro = t.split(RegExp(r'\s+')).first;
    return 'Recebimento - $primeiro';
  }

  /// Segunda linha: restante do nome (após o primeiro), ou null se só uma palavra
  static String? _tituloRecebimentoLinha2(String nome) {
    final t = nome.trim();
    final parts = t.split(RegExp(r'\s+'));
    if (parts.length < 2) return null;
    return parts.sublist(1).join(' ');
  }

  static String _formatBrlInput(double v) {
    final parts = v.toStringAsFixed(2).split('.');
    return '${parts[0].replaceAllMapped(
      RegExp(r'(\d)(?=(\d{3})+(?!\d))'),
      (m) => '${m[1]}.',
    )},${parts[1]}';
  }

  @override
  void initState() {
    super.initState();
    _valorController.text = _formatBrlInput(widget.total);
    _carregarDetalhe();
  }

  Future<void> _carregarDetalhe() async {
    if (widget.idAtendimento <= 0) {
      setState(() => _loadingDetalhe = false);
      return;
    }
    try {
      final d = await ApiClient.getDetalheAtendimento(widget.idAtendimento);
      if (!mounted) return;
      setState(() {
        _servicos = (d['servicos'] as List?)?.cast<Map<String, dynamic>>() ?? [];
        _produtos = (d['produtos'] as List?)?.cast<Map<String, dynamic>>() ?? [];
        _loadingDetalhe = false;
      });
    } catch (_) {
      if (mounted) setState(() => _loadingDetalhe = false);
    }
  }

  @override
  void dispose() {
    _valorController.dispose();
    super.dispose();
  }

  double _parseBrl(String s) {
    final limpo = s.replaceAll(".", "").replaceAll(",", ".");
    return double.tryParse(limpo) ?? 0.0;
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
    return "R\$ ${buffer.toString()},$cents";
  }

  Future<void> _processarPagamento() async {
    final valor = _parseBrl(_valorController.text);
    if (valor <= 0) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Informe um valor válido")),
      );
      return;
    }

    if (widget.idAtendimento <= 0) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Erro: ID do atendimento inválido (${widget.idAtendimento}). Verifique os dados do atendimento.")),
      );
      return;
    }

    setState(() => _loading = true);
    try {
      await ApiClient.registrarPagamento(
        idAtendimento: widget.idAtendimento,
        valor: valor,
        tipoPagamento: _tipoPagamento,
        observacao: _tipoPagamento,
      );
      if (!mounted) return;
      
      // Fechar o modal primeiro
      Navigator.of(context).pop();
      
      // Aguardar um pouco para garantir que o modal fechou
      await Future.delayed(const Duration(milliseconds: 100));
      
      // Executar callback após o modal fechar
      if (mounted) {
        WidgetsBinding.instance.addPostFrameCallback((_) {
          if (mounted) {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text("Pagamento registrado com sucesso!")),
            );
            widget.onSuccess();
          }
        });
      }
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(e.toString().replaceAll("Exception: ", ""))),
      );
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      padding: EdgeInsets.only(
        left: 24,
        right: 24,
        top: 16,
        bottom: MediaQuery.of(context).viewInsets.bottom + 24,
      ),
      child: SingleChildScrollView(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Center(
              child: Container(
                width: 40,
                height: 4,
                decoration: BoxDecoration(color: Colors.grey[300], borderRadius: BorderRadius.circular(2)),
              ),
            ),
            const SizedBox(height: 20),
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        _tituloRecebimentoLinha1(widget.nome),
                        style: const TextStyle(color: Color(0xFF1A1A2E), fontWeight: FontWeight.bold, fontSize: 20),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                      if (_tituloRecebimentoLinha2(widget.nome) != null) ...[
                        const SizedBox(height: 2),
                        Text(
                          _tituloRecebimentoLinha2(widget.nome)!,
                          style: const TextStyle(color: Color(0xFF1A1A2E), fontWeight: FontWeight.bold, fontSize: 20),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ],
                    ],
                  ),
                ),
                IconButton(
                  onPressed: widget.onCancel,
                  icon: const Icon(Icons.close, color: Color(0xFF6B7280), size: 24),
                  padding: EdgeInsets.zero,
                  constraints: const BoxConstraints(minWidth: 40, minHeight: 40),
                ),
              ],
            ),
            const SizedBox(height: 24),
            if (_loadingDetalhe)
              const Padding(
                padding: EdgeInsets.symmetric(vertical: 16),
                child: Center(child: SizedBox(
                  height: 24,
                  width: 24,
                  child: CircularProgressIndicator(strokeWidth: 2, color: AppColors.loginOrange),
                )),
              )
            else if (_servicos.isNotEmpty || _produtos.isNotEmpty) ...[
              Text(
                "Serviços e produtos",
                style: TextStyle(color: Colors.grey[600], fontSize: 12, fontWeight: FontWeight.w600),
              ),
              const SizedBox(height: 8),
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: Colors.grey[50],
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.grey[200]!),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    ..._servicos.map((s) => Padding(
                      padding: const EdgeInsets.symmetric(vertical: 4),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Expanded(
                            child: Text(
                              s['descricao']?.toString() ?? '',
                              style: const TextStyle(color: Color(0xFF1A1A2E), fontSize: 14),
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                          Text(
                            _brl((s['valor'] as num?)?.toDouble() ?? 0),
                            style: const TextStyle(color: Color(0xFF1A1A2E), fontSize: 14, fontWeight: FontWeight.w500),
                          ),
                        ],
                      ),
                    )),
                    ..._produtos.map((p) {
                      final qtd = (p['quantidade'] as num?)?.toInt() ?? 0;
                      final valor = (p['valor'] as num?)?.toDouble() ?? 0;
                      final subtotal = (p['subtotal'] as num?)?.toDouble() ?? (qtd * valor);
                      return Padding(
                        padding: const EdgeInsets.symmetric(vertical: 4),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Expanded(
                              child: Text(
                                '${p['descricao'] ?? ''} (${qtd}x)',
                                style: const TextStyle(color: Color(0xFF1A1A2E), fontSize: 14),
                                overflow: TextOverflow.ellipsis,
                              ),
                            ),
                            Text(
                              _brl(subtotal),
                              style: const TextStyle(color: Color(0xFF1A1A2E), fontSize: 14, fontWeight: FontWeight.w500),
                            ),
                          ],
                        ),
                      );
                    }),
                  ],
                ),
              ),
              const SizedBox(height: 20),
            ],
            Text("Total sugerido", style: TextStyle(color: Colors.grey[600], fontSize: 13)),
            const SizedBox(height: 4),
            Text(
              _brl(widget.total),
              style: const TextStyle(color: Color(0xFF1A1A2E), fontWeight: FontWeight.bold, fontSize: 24),
            ),
            const SizedBox(height: 20),
            Text("Valor a receber", style: TextStyle(color: Colors.grey[600], fontSize: 13)),
            const SizedBox(height: 8),
            TextField(
              controller: _valorController,
              keyboardType: TextInputType.number,
              inputFormatters: [_BrlCurrencyInputFormatter()],
              decoration: InputDecoration(
                hintText: "R\$ 0,00",
                hintStyle: TextStyle(color: Colors.grey[400]),
                filled: true,
                fillColor: Colors.grey[100],
                prefixText: "R\$ ",
                prefixStyle: const TextStyle(color: Color(0xFF1A1A2E), fontSize: 16),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: BorderSide(color: Colors.grey[300]!),
                ),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: const BorderSide(color: AppColors.loginOrange, width: 2),
                ),
                contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
              ),
              style: const TextStyle(color: Color(0xFF1A1A2E), fontSize: 18),
            ),
            const SizedBox(height: 24),
            Text(
              "TIPO DE PAGAMENTO",
              style: TextStyle(color: Colors.grey[600], fontSize: 12, fontWeight: FontWeight.w600, letterSpacing: 0.5),
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(child: _tipoButton("Dinheiro")),
                const SizedBox(width: 10),
                Expanded(child: _tipoButton("Pix")),
              ],
            ),
            const SizedBox(height: 10),
            Row(
              children: [
                Expanded(child: _tipoButton("Débito")),
                const SizedBox(width: 10),
                Expanded(child: _tipoButton("Crédito")),
              ],
            ),
            const SizedBox(height: 32),
            SizedBox(
              height: 54,
              child: ElevatedButton(
                onPressed: _loading ? null : _processarPagamento,
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.loginOrange,
                  foregroundColor: Colors.white,
                  elevation: 0,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                ),
                child: _loading
                    ? const SizedBox(
                        width: 24,
                        height: 24,
                        child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2),
                      )
                    : const Text(
                        "REGISTRAR PAGAMENTO",
                        style: TextStyle(fontWeight: FontWeight.w600, fontSize: 15, letterSpacing: 0.3),
                      ),
              ),
            ),
            const SizedBox(height: 16),
            TextButton(
              onPressed: _loading ? null : widget.onCancel,
              child: Text(
                "CANCELAR",
                style: TextStyle(color: Colors.grey[600], fontWeight: FontWeight.w600, fontSize: 14),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _tipoButton(String tipo) {
    final selected = _tipoPagamento == tipo;
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: () => setState(() => _tipoPagamento = tipo),
        borderRadius: BorderRadius.circular(12),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 14),
          decoration: BoxDecoration(
            color: selected ? AppColors.loginOrange : Colors.grey[200],
            borderRadius: BorderRadius.circular(12),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              if (selected) const Padding(
                padding: EdgeInsets.only(right: 6),
                child: Icon(Icons.check, color: Colors.white, size: 18),
              ),
              Text(
                tipo,
                style: TextStyle(
                  color: selected ? Colors.white : Colors.grey[700],
                  fontWeight: selected ? FontWeight.w600 : FontWeight.w500,
                  fontSize: 14,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _BrlCurrencyInputFormatter extends TextInputFormatter {
  @override
  TextEditingValue formatEditUpdate(
    TextEditingValue oldValue,
    TextEditingValue newValue,
  ) {
    final raw = newValue.text.replaceAll(RegExp(r'\D'), '');
    final cents = raw.isEmpty ? 0 : int.tryParse(raw) ?? 0;
    final reais = cents / 100;
    final formatted = _formatBrl(reais);
    return TextEditingValue(
      text: formatted,
      selection: TextSelection.collapsed(offset: formatted.length),
    );
  }

  static String _formatBrl(double v) {
    final inteiro = v.truncate();
    final centavos = ((v - inteiro) * 100).round().clamp(0, 99);
    final s = '${inteiro.abs()}';
    final buffer = StringBuffer();
    for (var i = 0; i < s.length; i++) {
      if (i > 0 && (s.length - i) % 3 == 0) buffer.write('.');
      buffer.write(s[i]);
    }
    final sg = v < 0 ? '-' : '';
    return '$sg${buffer.toString()},${centavos.toString().padLeft(2, '0')}';
  }
}

class AllClientsPage extends StatefulWidget {
  final List<Map<String, dynamic>> clientes;
  final VoidCallback? onClienteAdicionado;
  /// Callback para pull-to-refresh: retorna a nova lista de clientes aguardando (perfil RECEPCAO).
  final Future<List<Map<String, dynamic>>> Function()? onRefresh;

  const AllClientsPage({
    Key? key,
    required this.clientes,
    this.onClienteAdicionado,
    this.onRefresh,
  }) : super(key: key);

  @override
  State<AllClientsPage> createState() => _AllClientsPageState();
}

class _AllClientsPageState extends State<AllClientsPage> {
  final TextEditingController _searchCtrl = TextEditingController();
  String _searchQuery = '';
  late List<Map<String, dynamic>> _displayClientes;

  @override
  void initState() {
    super.initState();
    _displayClientes = List<Map<String, dynamic>>.from(widget.clientes);
    _searchCtrl.addListener(() => setState(() => _searchQuery = _searchCtrl.text.trim().toLowerCase()));
  }

  @override
  void didUpdateWidget(AllClientsPage oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.clientes != widget.clientes) {
      _displayClientes = List<Map<String, dynamic>>.from(widget.clientes);
    }
  }

  @override
  void dispose() {
    _searchCtrl.dispose();
    super.dispose();
  }

  Future<void> _onRefresh() async {
    if (widget.onRefresh == null) return;
    final novaLista = await widget.onRefresh!();
    if (!mounted) return;
    setState(() => _displayClientes = novaLista);
  }

  List<Map<String, dynamic>> get _clientesFiltrados {
    if (_searchQuery.isEmpty) return _displayClientes;
    return _displayClientes.where((c) {
      final nome = (c["nome"] ?? "Cliente").toString().toLowerCase();
      return nome.contains(_searchQuery);
    }).toList();
  }

  /// Verifica se o cliente tem agendamento (RESERVADO).
  bool _isReservado(Map<String, dynamic> item) {
    if (item['status'] == 'RESERVADO') return true;
    if (item['tem_agendamento'] == true) return true;
    if (item['id_agendamento'] != null) return true;
    if (item['data_hora_agendamento'] != null) return true;
    return false;
  }

  /// Usa hora formatada do backend (hora_entrada, data_hora_agendamento_fmt)
  String? _formatHoraCard(Map<String, dynamic> item, bool isReservado) {
    if (isReservado) {
      return item['data_hora_agendamento_fmt']?.toString();
    }
    return item['hora_entrada']?.toString();
  }

  /// Data em dd/MM/yyyy do backend
  String? _formatDataCard(Map<String, dynamic> item) {
    return item['data_exibicao']?.toString();
  }

  Widget _buildScrollableContent(BuildContext context, List<Map<String, dynamic>> clientes) {
    final scrollable = clientes.isEmpty
        ? ListView(
            physics: const AlwaysScrollableScrollPhysics(),
            children: [
              SizedBox(height: MediaQuery.of(context).size.height * 0.3),
              Center(
                child: Text(
                  _searchQuery.isNotEmpty ? "Nenhum cliente encontrado" : "Nenhum cliente aguardando",
                  style: TextStyle(color: AppColors.loginTextMuted, fontSize: 14),
                ),
              ),
            ],
          )
        : Padding(
            padding: EdgeInsets.symmetric(horizontal: SizeConfig.screenWidth! / 20),
            child: GridView.builder(
              physics: const AlwaysScrollableScrollPhysics(),
              itemCount: clientes.length,
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                mainAxisSpacing: 12,
                crossAxisSpacing: 12,
                childAspectRatio: 1.1,
              ),
              itemBuilder: (context, index) {
                final item = clientes[index];
                final isReservado = _isReservado(item);
                final tipoIcone = index.isOdd ? 'horario' : 'data';
                final horaExibicao = _formatHoraCard(item, isReservado);
                final dataExibicao = _formatDataCard(item);
                return _ClienteCardFila(
                  item: item,
                  isReservado: isReservado,
                  tipoIconeAgendamento: item['tipo_agendamento'] ?? tipoIcone,
                  horaExibicao: horaExibicao,
                  dataExibicao: dataExibicao,
                );
              },
            ),
          );
    if (widget.onRefresh != null) {
      return RefreshIndicator(
        onRefresh: _onRefresh,
        color: AppColors.loginOrange,
        child: scrollable,
      );
    }
    return scrollable;
  }

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    final clientes = _clientesFiltrados;
    return Scaffold(
      backgroundColor: AppColors.loginBackground,
      appBar: AppBar(
        backgroundColor: AppColors.loginBackground,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () => Navigator.of(context).pop(),
        ),
        title: Text(
          "Clientes aguardando",
          style: AppTypography.heading4.copyWith(
            color: Colors.white,
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        iconTheme: const IconThemeData(color: Colors.white),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Padding(
            padding: EdgeInsets.fromLTRB(
              SizeConfig.screenWidth! / 18,
              8,
              SizeConfig.screenWidth! / 18,
              12,
            ),
            child: TextField(
              controller: _searchCtrl,
              style: const TextStyle(color: Colors.white),
              cursorColor: AppColors.loginOrange,
              decoration: InputDecoration(
                hintText: 'Buscar cliente...',
                hintStyle: TextStyle(color: AppColors.loginTextMuted, fontSize: 15),
                prefixIcon: Icon(Icons.search, color: AppColors.loginTextMuted, size: 22),
                suffixIcon: _searchQuery.isNotEmpty
                    ? IconButton(
                        icon: Icon(Icons.clear, color: AppColors.loginTextMuted, size: 20),
                        onPressed: _searchCtrl.clear,
                      )
                    : null,
                filled: true,
                fillColor: AppColors.loginInputBackground,
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: BorderSide.none,
                ),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: const BorderSide(color: AppColors.loginOrange, width: 1.5),
                ),
                contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
              ),
            ),
          ),
          Expanded(
            child: _buildScrollableContent(context, clientes),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          showAddClienteModal(context, onSuccess: widget.onClienteAdicionado);
        },
        backgroundColor: AppColors.loginOrange,
        child: const Icon(Icons.add, color: Colors.white, size: 28),
      ),
    );
  }
}

class _ClienteCardFila extends StatelessWidget {
  final Map<String, dynamic> item;
  final bool isReservado;
  final String tipoIconeAgendamento;
  final String? horaExibicao;
  final String? dataExibicao;

  const _ClienteCardFila({
    required this.item,
    required this.isReservado,
    this.tipoIconeAgendamento = 'data',
    this.horaExibicao,
    this.dataExibicao,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.loginInputBackground,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: Colors.white.withOpacity(0.08)),
      ),
      padding: const EdgeInsets.all(12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  color: AppColors.loginOrange.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const Icon(
                  Icons.person_outline,
                  color: AppColors.loginOrange,
                  size: 22,
                ),
              ),
              if (isReservado) ...[
                const Spacer(),
                Icon(
                  tipoIconeAgendamento == 'horario' ? Icons.access_time : Icons.calendar_today,
                  color: AppColors.loginOrange,
                  size: 20,
                ),
              ],
            ],
          ),
          const SizedBox(height: 10),
          Text(
            item["nome"]?.toString() ?? "Cliente",
            style: const TextStyle(
              color: Colors.white,
              fontWeight: FontWeight.w600,
              fontSize: 14,
            ),
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
          const SizedBox(height: 4),
          Text(
            "Status:",
            style: TextStyle(
              color: AppColors.loginTextMuted,
              fontSize: 11,
            ),
          ),
          const SizedBox(height: 2),
          isReservado
              ? Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                      decoration: BoxDecoration(
                        color: AppColors.loginOrange.withOpacity(0.25),
                        borderRadius: BorderRadius.circular(6),
                      ),
                      child: const Text(
                        "RESERVADO",
                        style: TextStyle(
                          color: AppColors.loginOrange,
                          fontWeight: FontWeight.bold,
                          fontSize: 11,
                        ),
                      ),
                    ),
                    if (horaExibicao != null && horaExibicao!.isNotEmpty) ...[
                      const SizedBox(height: 2),
                      Text(
                        horaExibicao!,
                        style: TextStyle(
                          color: AppColors.loginTextMuted,
                          fontSize: 10,
                        ),
                      ),
                    ],
                    if (dataExibicao != null && dataExibicao!.isNotEmpty) ...[
                      const SizedBox(height: 2),
                      Text(
                        dataExibicao!,
                        style: TextStyle(
                          color: AppColors.loginTextMuted,
                          fontSize: 10,
                        ),
                      ),
                    ],
                  ],
                )
              : Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      horaExibicao != null && horaExibicao!.isNotEmpty
                          ? "Aguardando • $horaExibicao"
                          : "Aguardando",
                      style: const TextStyle(
                        color: AppColors.loginOrange,
                        fontWeight: FontWeight.w500,
                        fontSize: 13,
                      ),
                    ),
                    if (dataExibicao != null && dataExibicao!.isNotEmpty) ...[
                      const SizedBox(height: 2),
                      Text(
                        dataExibicao!,
                        style: TextStyle(
                          color: AppColors.loginTextMuted,
                          fontSize: 10,
                        ),
                      ),
                    ],
                  ],
                ),
        ],
      ),
    );
  }
}
