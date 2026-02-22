import 'package:flutter/material.dart';
import 'package:intl/date_symbol_data_local.dart';
import 'package:intl/intl.dart';
import 'package:table_calendar/table_calendar.dart';
import 'package:barbearia/api/api_client.dart';
import 'package:barbearia/config/app_colors.dart';
import 'package:barbearia/config/app_typography.dart';
import 'package:barbearia/view/home_page/components/size_config.dart';

class AgendaPage extends StatefulWidget {
  /// Quando informado (ex.: perfil CABELEIREIRO), a agenda mostra apenas agendamentos deste cabeleireiro.
  final int? idCabeleireiro;
  /// Quando false (ex.: agenda como aba no BarberHome), não exibe seta de voltar — evita pop que deixa tela preta.
  final bool showBackButton;

  const AgendaPage({Key? key, this.idCabeleireiro, this.showBackButton = true}) : super(key: key);

  @override
  State<AgendaPage> createState() => _AgendaPageState();
}

class _AgendaPageState extends State<AgendaPage> {
  final _searchCtrl = TextEditingController();
  String _searchQuery = '';
  DateTime _focusedDay = DateTime.now();
  DateTime? _selectedDay;
  CalendarFormat _calendarFormat = CalendarFormat.twoWeeks;

  List<Map<String, dynamic>> _agendamentosDoDia = [];
  /// Agendamentos por dia (chave yyyy-mm-dd) para marcar dias com agendamento em verde.
  Map<String, List<Map<String, dynamic>>> _agendamentosPorDia = {};
  bool _loading = false;
  String? _error;

  static String _key(DateTime d) =>
      '${d.year}-${d.month.toString().padLeft(2, '0')}-${d.day.toString().padLeft(2, '0')}';

  @override
  void initState() {
    super.initState();
    _selectedDay = _focusedDay;
    _searchCtrl.addListener(() => setState(() => _searchQuery = _searchCtrl.text.trim()));
    initializeDateFormatting('pt_BR', null);
    _carregarAgendamentos(_selectedDay!);
    _carregarAgendamentosDoMes(_focusedDay);
  }

  @override
  void dispose() {
    _searchCtrl.dispose();
    super.dispose();
  }

  Future<void> _carregarAgendamentos(DateTime day) async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final lista = await ApiClient.listAgendamentos(day, idCabeleireiro: widget.idCabeleireiro);
      if (!mounted) return;
      setState(() {
        _agendamentosDoDia = lista;
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

  Future<void> _carregarAgendamentosDoMes(DateTime anyDayInMonth) async {
    final start = DateTime(anyDayInMonth.year, anyDayInMonth.month, 1);
    final end = DateTime(anyDayInMonth.year, anyDayInMonth.month + 1, 0);
    final futures = <Future<void>>[];
    final Map<String, List<Map<String, dynamic>>> result = {};
    for (var d = start.day; d <= end.day; d++) {
      final day = DateTime(anyDayInMonth.year, anyDayInMonth.month, d);
      futures.add(
        ApiClient.listAgendamentos(day, idCabeleireiro: widget.idCabeleireiro).then((list) {
          if (list.isNotEmpty) result[_key(day)] = list;
        }),
      );
    }
    await Future.wait(futures);
    if (!mounted) return;
    setState(() {
      _agendamentosPorDia = {..._agendamentosPorDia, ...result};
    });
  }

  void _onDaySelected(DateTime selected, DateTime focused) {
    setState(() {
      _selectedDay = selected;
      _focusedDay = focused;
    });
    _carregarAgendamentos(selected);
  }

  /// Lista do dia filtrada pelo nome do cliente (campo "Buscar por nome...").
  List<Map<String, dynamic>> get _listaFiltrada {
    if (_searchQuery.isEmpty) return _agendamentosDoDia;
    final q = _searchQuery.trim().toLowerCase();
    if (q.isEmpty) return _agendamentosDoDia;
    return _agendamentosDoDia.where((a) {
      final nome = _getClienteNome(a).toLowerCase();
      return nome.contains(q);
    }).toList();
  }

  String _getClienteNome(Map<String, dynamic> a) {
    final c = a['cliente'];
    if (c is Map) {
      final n = c['nome'] ?? c['Nome'];
      if (n != null && n.toString().trim().isNotEmpty) return n.toString().trim();
    }
    return a['nome']?.toString().trim() ?? 'Cliente';
  }

  String _getServicoNome(Map<String, dynamic> a) {
    final s = a['servico'];
    if (s is Map && s['descricao'] != null) return s['descricao'].toString();
    return a['servico_nome']?.toString() ?? '';
  }

  String _getHorario(Map<String, dynamic> a) {
    final dh = a['data_hora'];
    if (dh == null) return '';
    DateTime? dt;
    if (dh is String) dt = DateTime.tryParse(dh);
    if (dt == null) return '';
    return '${dt.hour.toString().padLeft(2, '0')}:${dt.minute.toString().padLeft(2, '0')}';
  }

  String _getCabeleireiroNome(Map<String, dynamic> a) {
    final cab = a['cabeleireiro'];
    if (cab is Map && cab['nome'] != null) return cab['nome'].toString();
    return a['cabeleireiro_nome']?.toString() ?? '—';
  }

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Scaffold(
      backgroundColor: AppColors.loginBackground,
      appBar: AppBar(
        backgroundColor: AppColors.loginBackground,
        elevation: 0,
        leading: widget.showBackButton
            ? IconButton(
                icon: const Icon(Icons.arrow_back, color: Colors.white),
                onPressed: () => Navigator.of(context).pop(),
              )
            : null,
        title: Text(
          "Agenda",
          style: AppTypography.heading4.copyWith(
            color: Colors.white,
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        centerTitle: true,
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _abrirModalNovoAgendamento(),
        backgroundColor: AppColors.loginOrange,
        child: const Icon(Icons.add, color: Colors.white),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          _buildSearchField(),
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildCalendar(),
                  const SizedBox(height: 20),
                  _buildListHeader(),
                  const SizedBox(height: 12),
                  _buildListaAgendados(),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Future<void> _abrirModalNovoAgendamento() async {
    final dia = _selectedDay ?? _focusedDay;
    final saved = await showDialog<bool>(
      context: context,
      barrierDismissible: false,
      builder: (ctx) => _ModalNovoAgendamento(
        diaInicial: dia,
        idCabeleireiroLogado: widget.idCabeleireiro,
        onSaved: () => Navigator.of(ctx).pop(true),
        onCancel: () => Navigator.of(ctx).pop(false),
      ),
    );
    if (saved == true && mounted) {
      _carregarAgendamentos(_selectedDay ?? _focusedDay);
    }
  }

  Widget _buildSearchField() {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 8, 16, 16),
      child: TextField(
        controller: _searchCtrl,
        style: const TextStyle(color: Colors.white, fontSize: 15),
        cursorColor: AppColors.loginOrange,
        decoration: InputDecoration(
          hintText: "Buscar por nome...",
          hintStyle: TextStyle(color: AppColors.loginTextMuted, fontSize: 15),
          prefixIcon: Icon(Icons.search, color: AppColors.loginTextMuted, size: 22),
          filled: true,
          fillColor: AppColors.loginInputBackground,
          border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: BorderSide(color: Colors.transparent),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: const BorderSide(color: AppColors.loginOrange, width: 1.5),
          ),
          contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        ),
      ),
    );
  }

  Widget _buildCalendar() {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.loginInputBackground,
        borderRadius: BorderRadius.circular(16),
      ),
      padding: const EdgeInsets.all(16),
      child: TableCalendar<Map<String, dynamic>>(
        locale: 'pt_BR',
        firstDay: DateTime.utc(2020, 1, 1),
        lastDay: DateTime.utc(2030, 12, 31),
        focusedDay: _focusedDay,
        selectedDayPredicate: (day) => isSameDay(_selectedDay, day),
        calendarFormat: _calendarFormat,
        availableCalendarFormats: const {
          CalendarFormat.month: 'Mês',
          CalendarFormat.twoWeeks: '2 SEMANAS',
          CalendarFormat.week: 'Semana',
        },
        eventLoader: (day) {
          return _agendamentosPorDia[_key(day)] ?? [];
        },
        daysOfWeekHeight: 14,
        daysOfWeekStyle: DaysOfWeekStyle(
          weekdayStyle: TextStyle(color: AppColors.loginTextMuted, fontSize: 11),
          weekendStyle: TextStyle(color: AppColors.loginTextMuted, fontSize: 11),
        ),
        calendarStyle: CalendarStyle(
          defaultTextStyle: const TextStyle(color: Colors.white, fontSize: 14),
          weekendTextStyle: TextStyle(color: AppColors.loginTextMuted.withOpacity(0.7), fontSize: 14),
          selectedDecoration: BoxDecoration(
            color: AppColors.loginOrange,
            shape: BoxShape.circle,
            boxShadow: [
              BoxShadow(
                color: AppColors.loginOrange.withOpacity(0.4),
                blurRadius: 8,
                spreadRadius: 1,
              ),
            ],
          ),
          selectedTextStyle: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
          todayDecoration: BoxDecoration(
            color: AppColors.loginOrange.withOpacity(0.3),
            shape: BoxShape.circle,
          ),
          todayTextStyle: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
          markerDecoration: BoxDecoration(
            color: Colors.green.shade400,
            shape: BoxShape.circle,
          ),
          markersMaxCount: 1,
          outsideTextStyle: TextStyle(color: AppColors.loginTextMuted.withOpacity(0.6), fontSize: 14),
        ),
        headerStyle: HeaderStyle(
          formatButtonVisible: true,
          formatButtonShowsNext: false,
          titleTextFormatter: (date, _) => DateFormat('MM/yyyy').format(date),
          titleTextStyle: const TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold),
          formatButtonDecoration: BoxDecoration(
            color: AppColors.loginOrange,
            borderRadius: BorderRadius.circular(8),
          ),
          formatButtonTextStyle: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold),
          leftChevronIcon: const Icon(Icons.chevron_left, color: Colors.white, size: 24),
          rightChevronIcon: const Icon(Icons.chevron_right, color: Colors.white, size: 24),
        ),
        calendarBuilders: CalendarBuilders<Map<String, dynamic>>(
          defaultBuilder: (context, day, focusedDay) {
            final key = _key(day);
            final hasEvents = (_agendamentosPorDia[key] ?? []).isNotEmpty;
            final isSelected = isSameDay(_selectedDay, day);
            if (hasEvents && !isSelected) {
              return Container(
                margin: const EdgeInsets.all(4),
                decoration: BoxDecoration(
                  color: Colors.green.shade600,
                  shape: BoxShape.circle,
                  boxShadow: [
                    BoxShadow(
                      color: Colors.green.withOpacity(0.3),
                      blurRadius: 4,
                      spreadRadius: 0,
                    ),
                  ],
                ),
                child: Center(
                  child: Text(
                    '${day.day}',
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 14,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              );
            }
            return null;
          },
          markerBuilder: (context, date, events) {
            if (events.isEmpty) return null;
            return Positioned(
              bottom: 1,
              child: Container(
                width: 6,
                height: 6,
                decoration: BoxDecoration(
                  color: Colors.green.shade400,
                  shape: BoxShape.circle,
                ),
              ),
            );
          },
        ),
        onDaySelected: _onDaySelected,
        onFormatChanged: (format) => setState(() => _calendarFormat = format),
        onPageChanged: (focused) {
          setState(() => _focusedDay = focused);
          _carregarAgendamentosDoMes(focused);
        },
      ),
    );
  }

  Widget _buildListHeader() {
    final day = _selectedDay ?? _focusedDay;
    final dateStr = "${day.day.toString().padLeft(2, '0')}/${day.month.toString().padLeft(2, '0')}/${day.year}";
    return RichText(
      text: TextSpan(
        style: const TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.w600),
        children: [
          const TextSpan(text: "Agendados em "),
          TextSpan(
            text: dateStr,
            style: const TextStyle(color: AppColors.loginOrange, fontWeight: FontWeight.bold),
          ),
        ],
      ),
    );
  }

  Widget _buildListaAgendados() {
    if (_loading) {
      return const Center(
        child: Padding(
          padding: EdgeInsets.all(32),
          child: CircularProgressIndicator(color: AppColors.loginOrange),
        ),
      );
    }
    if (_error != null) {
      return Container(
        width: double.infinity,
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          color: AppColors.loginInputBackground,
          borderRadius: BorderRadius.circular(16),
        ),
        child: Column(
          children: [
            Icon(Icons.error_outline, color: AppColors.error, size: 40),
            const SizedBox(height: 12),
            Text(
              _error!,
              style: AppTypography.bodyRegular.copyWith(color: AppColors.error),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      );
    }
    final lista = _listaFiltrada;
    if (lista.isEmpty) {
      return Container(
        width: double.infinity,
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          color: AppColors.loginInputBackground,
          borderRadius: BorderRadius.circular(16),
        ),
        child: Text(
          _searchQuery.isEmpty
              ? "Nenhum cliente agendado neste dia."
              : "Nenhum resultado para \"$_searchQuery\".",
          style: AppTypography.bodyRegular.copyWith(color: AppColors.loginTextMuted),
          textAlign: TextAlign.center,
        ),
      );
    }
    return Column(
      children: lista.map((a) => _cardAgendamento(a)).toList(),
    );
  }

  Widget _cardAgendamento(Map<String, dynamic> item) {
    final nome = _getClienteNome(item);
    final horario = _getHorario(item);
    final servico = _getServicoNome(item);
    final cabeleireiro = _getCabeleireiroNome(item);
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      decoration: BoxDecoration(
        color: AppColors.loginInputBackground,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Row(
          children: [
            Container(
              width: 48,
              height: 48,
              decoration: const BoxDecoration(
                color: AppColors.loginOrange,
                shape: BoxShape.circle,
              ),
              child: const Icon(Icons.person_outline, color: Colors.white, size: 24),
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    nome,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 4),
                  RichText(
                    text: TextSpan(
                      style: TextStyle(color: AppColors.loginTextMuted, fontSize: 14),
                      children: [
                        TextSpan(
                          text: horario,
                          style: const TextStyle(color: AppColors.loginOrange, fontWeight: FontWeight.w500),
                        ),
                        if (servico.isNotEmpty) TextSpan(text: ' • $servico'),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(width: 8),
            Text(
              cabeleireiro,
              style: TextStyle(
                color: AppColors.loginTextMuted,
                fontSize: 13,
                fontWeight: FontWeight.w500,
              ),
              textAlign: TextAlign.end,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),
          ],
        ),
      ),
    );
  }
}

/// Modal para criar novo agendamento.
class _ModalNovoAgendamento extends StatefulWidget {
  final DateTime diaInicial;
  /// Quando informado (perfil CABELEIREIRO), o dropdown mostra apenas este usuário e fica fixo nele.
  final int? idCabeleireiroLogado;
  final VoidCallback onSaved;
  final VoidCallback onCancel;

  const _ModalNovoAgendamento({
    required this.diaInicial,
    this.idCabeleireiroLogado,
    required this.onSaved,
    required this.onCancel,
  });

  @override
  State<_ModalNovoAgendamento> createState() => _ModalNovoAgendamentoState();
}

class _ModalNovoAgendamentoState extends State<_ModalNovoAgendamento> {
  List<Map<String, dynamic>> _clientes = [];
  List<Map<String, dynamic>> _servicos = [];
  List<Map<String, dynamic>> _cabeleireiros = [];
  bool _loadingData = true;
  bool _saving = false;
  String? _error;

  int? _idServico;
  int? _idCabeleireiro;
  DateTime _dataHora = DateTime.now();
  final _nomeClienteCtrl = TextEditingController();
  final _obsCtrl = TextEditingController();

  @override
  void initState() {
    super.initState();
    _dataHora = DateTime(
      widget.diaInicial.year,
      widget.diaInicial.month,
      widget.diaInicial.day,
      DateTime.now().hour,
      DateTime.now().minute,
    );
    _carregarDados();
  }

  @override
  void dispose() {
    _nomeClienteCtrl.dispose();
    _obsCtrl.dispose();
    super.dispose();
  }

  Future<void> _carregarDados() async {
    setState(() => _loadingData = true);
    try {
      final idLogado = widget.idCabeleireiroLogado;
      final futures = <Future<dynamic>>[
        ApiClient.listClientes(),
        ApiClient.listServicos(),
        idLogado != null ? ApiClient.getUsuario(idLogado) : ApiClient.listCabeleireiros(),
      ];
      final results = await Future.wait(futures);
      if (!mounted) return;
      setState(() {
        _clientes = List<Map<String, dynamic>>.from(results[0] as List);
        _servicos = List<Map<String, dynamic>>.from(results[1] as List);
        if (idLogado != null && results[2] is Map<String, dynamic>) {
          _cabeleireiros = [results[2] as Map<String, dynamic>];
          _idCabeleireiro = idLogado;
        } else {
          _cabeleireiros = List<Map<String, dynamic>>.from(results[2] as List);
          if (_cabeleireiros.isNotEmpty && _idCabeleireiro == null) {
            _idCabeleireiro = (_cabeleireiros.first['id'] as num).toInt();
          }
        }
        _loadingData = false;
        if (_servicos.isNotEmpty && _idServico == null) _idServico = (_servicos.first['id'] as num).toInt();
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _error = e.toString().replaceAll('Exception: ', '');
        _loadingData = false;
      });
    }
  }

  Future<void> _salvar() async {
    final nomeCliente = _nomeClienteCtrl.text.trim();
    if (nomeCliente.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Informe o nome do cliente')),
      );
      return;
    }
    setState(() {
      _saving = true;
      _error = null;
    });
    try {
      int idCliente;
      Map<String, dynamic>? existente;
      for (final c in _clientes) {
        if ((c['nome']?.toString() ?? '').trim().toLowerCase() == nomeCliente.toLowerCase()) {
          existente = c;
          break;
        }
      }
      if (existente != null) {
        idCliente = (existente['id'] as num).toInt();
      } else {
        final novo = await ApiClient.createCliente(nomeCliente);
        idCliente = (novo['id'] as num).toInt();
      }
      await ApiClient.createAgendamento(
        idCliente: idCliente,
        idServico: _idServico,
        idCabeleireiro: _idCabeleireiro,
        dataHora: _dataHora,
        observacao: _obsCtrl.text.trim(),
      );
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Agendamento criado com sucesso!'),
          backgroundColor: Colors.green,
        ),
      );
      widget.onSaved();
    } catch (e) {
      if (!mounted) return;
      setState(() => _saving = false);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(e.toString().replaceAll('Exception: ', '')),
          backgroundColor: Colors.red,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      backgroundColor: AppColors.loginInputBackground,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      title: const Text(
        'Novo agendamento',
        style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
      ),
      content: SingleChildScrollView(
        child: _loadingData
            ? const SizedBox(
                height: 120,
                child: Center(child: CircularProgressIndicator(color: AppColors.loginOrange)),
              )
            : _error != null
                ? Text(_error!, style: const TextStyle(color: Colors.red))
                : SizedBox(
                    width: double.maxFinite,
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        const Text('Cliente', style: TextStyle(color: AppColors.loginTextMuted, fontSize: 12)),
                        const SizedBox(height: 4),
                        TextField(
                          controller: _nomeClienteCtrl,
                          style: const TextStyle(color: Colors.white),
                          decoration: _inputDecoration(hintText: 'Nome do cliente'),
                        ),
                        const SizedBox(height: 16),
                        const Text('Data e horário', style: TextStyle(color: AppColors.loginTextMuted, fontSize: 12)),
                        const SizedBox(height: 4),
                        InkWell(
                          onTap: () async {
                            final date = await showDatePicker(
                              context: context,
                              initialDate: _dataHora,
                              firstDate: DateTime.now(),
                              lastDate: DateTime.now().add(const Duration(days: 365)),
                            );
                            if (date != null && mounted) {
                              setState(() => _dataHora = DateTime(date.year, date.month, date.day, _dataHora.hour, _dataHora.minute));
                            }
                          },
                          child: InputDecorator(
                            decoration: _inputDecoration(),
                            child: Text(
                              '${_dataHora.day.toString().padLeft(2, '0')}/${_dataHora.month.toString().padLeft(2, '0')}/${_dataHora.year} ${_dataHora.hour.toString().padLeft(2, '0')}:${_dataHora.minute.toString().padLeft(2, '0')}',
                              style: const TextStyle(color: Colors.white),
                            ),
                          ),
                        ),
                        const SizedBox(height: 8),
                        TextButton.icon(
                          onPressed: () async {
                            final time = await showTimePicker(context: context, initialTime: TimeOfDay.fromDateTime(_dataHora));
                            if (time != null && mounted) {
                              setState(() => _dataHora = DateTime(_dataHora.year, _dataHora.month, _dataHora.day, time.hour, time.minute));
                            }
                          },
                          icon: const Icon(Icons.access_time, color: AppColors.loginOrange, size: 20),
                          label: const Text('Alterar horário', style: TextStyle(color: AppColors.loginOrange)),
                        ),
                        const SizedBox(height: 16),
                        const Text('Serviço (opcional)', style: TextStyle(color: AppColors.loginTextMuted, fontSize: 12)),
                        const SizedBox(height: 4),
                        DropdownButtonFormField<int?>(
                          value: _idServico,
                          isExpanded: true,
                          dropdownColor: AppColors.loginInputBackground,
                          decoration: _inputDecoration(),
                          items: [
                            const DropdownMenuItem<int?>(value: null, child: Text('Nenhum', style: TextStyle(color: Colors.white70), overflow: TextOverflow.ellipsis)),
                            ..._servicos.map((s) {
                              final id = (s['id'] as num).toInt();
                              final desc = s['descricao']?.toString() ?? 'Serviço $id';
                              return DropdownMenuItem<int?>(value: id, child: Text(desc, style: const TextStyle(color: Colors.white), overflow: TextOverflow.ellipsis));
                            }),
                          ],
                          onChanged: (v) => setState(() => _idServico = v),
                        ),
                        const SizedBox(height: 16),
                        const Text('Cabeleireiro (opcional)', style: TextStyle(color: AppColors.loginTextMuted, fontSize: 12)),
                        const SizedBox(height: 4),
                        DropdownButtonFormField<int?>(
                          value: _idCabeleireiro,
                          isExpanded: true,
                          dropdownColor: AppColors.loginInputBackground,
                          decoration: _inputDecoration(),
                          items: widget.idCabeleireiroLogado != null
                              ? _cabeleireiros.map((c) {
                                  final id = (c['id'] as num).toInt();
                                  final nome = c['nome']?.toString() ?? 'Cabeleireiro $id';
                                  return DropdownMenuItem<int?>(value: id, child: Text(nome, style: const TextStyle(color: Colors.white), overflow: TextOverflow.ellipsis));
                                }).toList()
                              : [
                                  const DropdownMenuItem<int?>(value: null, child: Text('Qualquer', style: TextStyle(color: Colors.white70), overflow: TextOverflow.ellipsis)),
                                  ..._cabeleireiros.map((c) {
                                    final id = (c['id'] as num).toInt();
                                    final nome = c['nome']?.toString() ?? 'Cabeleireiro $id';
                                    return DropdownMenuItem<int?>(value: id, child: Text(nome, style: const TextStyle(color: Colors.white), overflow: TextOverflow.ellipsis));
                                  }),
                                ],
                          onChanged: widget.idCabeleireiroLogado != null ? null : (v) => setState(() => _idCabeleireiro = v),
                        ),
                        const SizedBox(height: 16),
                        TextField(
                          controller: _obsCtrl,
                          style: const TextStyle(color: Colors.white),
                          decoration: _inputDecoration().copyWith(hintText: 'Observação (opcional)'),
                        ),
                      ],
                    ),
                  ),
      ),
      actions: [
        TextButton(
          onPressed: _saving ? null : widget.onCancel,
          child: const Text('CANCELAR', style: TextStyle(color: AppColors.loginTextMuted)),
        ),
        ElevatedButton(
          onPressed: _saving ? null : _salvar,
          style: ElevatedButton.styleFrom(backgroundColor: AppColors.loginOrange),
          child: _saving
              ? const SizedBox(width: 20, height: 20, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
              : const Text('AGENDAR', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
        ),
      ],
    );
  }

  InputDecoration _inputDecoration({String? hintText}) {
    return InputDecoration(
      hintText: hintText,
      hintStyle: const TextStyle(color: AppColors.loginTextMuted),
      filled: true,
      fillColor: AppColors.loginBackground,
      border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
      enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide(color: Colors.white24)),
      focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: const BorderSide(color: AppColors.loginOrange)),
    );
  }
}
