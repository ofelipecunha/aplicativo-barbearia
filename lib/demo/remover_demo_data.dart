// =============================================================================
// REMOVER_DEMO — Dados chumbados para demonstração (APK sem backend).
// Usuários: WENDER (DONO), ALICE (RECEPCIONISTA), 4 Cabeleireiros: GUSTAVO, WENDER, JOAO, JOSE
// 30 dias de atendimentos variados, agendamentos, recebimentos, produtos e serviços
// =============================================================================

/// Respostas de API idênticas ao backend para as telas funcionarem sem servidor.
class RemoverDemoData {
  RemoverDemoData._();

  static const String _senhaDemo = '1234';

  // Usuários: WENDER (DONO), ALICE (RECEPCIONISTA), 4 Cabeleireiros (WENDER também é barbeiro)
  static const List<Map<String, dynamic>> _usuariosDemo = [
    {'id': 1, 'nome': 'Wender', 'login': 'wender', 'perfil': 'DONO', 'ativo': true, 'avatar': null},
    {'id': 2, 'nome': 'Alice', 'login': 'alice', 'perfil': 'RECEPCIONISTA', 'ativo': true, 'avatar': null},
    {'id': 3, 'nome': 'Gustavo', 'login': 'gustavo', 'perfil': 'CABELEIREIRO', 'ativo': true, 'avatar': null},
    {'id': 4, 'nome': 'Wender', 'login': 'wender_barbeiro', 'perfil': 'CABELEIREIRO', 'ativo': true, 'avatar': null},
    {'id': 5, 'nome': 'João', 'login': 'joao', 'perfil': 'CABELEIREIRO', 'ativo': true, 'avatar': null},
    {'id': 6, 'nome': 'José', 'login': 'jose', 'perfil': 'CABELEIREIRO', 'ativo': true, 'avatar': null},
  ];

  // IDs dos 4 cabeleireiros (para agendamentos/atendimentos)
  static const List<int> _idsCabeleireiros = [3, 4, 5, 6]; // GUSTAVO, WENDER, JOAO, JOSE
  static const List<String> _nomesCabeleireiros = ['Gustavo', 'Wender', 'João', 'José'];

  static Future<Map<String, dynamic>> login(String login, String senha) async {
    if (senha != _senhaDemo) throw Exception('Login ou senha inválidos.');
    final log = login.trim().toLowerCase();
    for (final e in _usuariosDemo) {
      final l = (e['login'] as String?)?.toLowerCase() ?? '';
      if (l == log) return Map<String, dynamic>.from(e);
    }
    throw Exception('Login ou senha inválidos.');
  }

  static Future<List<Map<String, dynamic>>> listUsuariosTodos() async {
    return _usuariosDemo.map((e) => Map<String, dynamic>.from(e)..['status'] = 'V').toList();
  }

  static Future<Map<String, dynamic>> getUsuario(int id) async {
    for (final e in _usuariosDemo) {
      if ((e['id'] as int?) == id) return Map<String, dynamic>.from(e);
    }
    throw Exception('usuário não encontrado');
  }

  static Future<List<Map<String, dynamic>>> getAguardando() async {
    return [
      {'id': 1, 'id_fila': 1, 'id_cliente': 1, 'nome': 'João Silva', 'hora_entrada': '14:30'},
      {'id': 2, 'id_fila': 2, 'id_cliente': 2, 'nome': 'Maria Santos', 'hora_entrada': '14:45'},
      {'id': 3, 'id_fila': 3, 'id_cliente': 3, 'nome': 'Pedro Oliveira', 'hora_entrada': '15:00'},
      {'id': 4, 'id_fila': 4, 'id_cliente': 6, 'nome': 'Rafael Lima', 'hora_entrada': '15:15'},
      {'id': 5, 'id_fila': 5, 'id_cliente': 7, 'nome': 'Fernanda Costa', 'hora_entrada': '15:30'},
      {'id': 6, 'id_fila': 6, 'id_cliente': 8, 'nome': 'Gustavo Mendes', 'hora_entrada': '15:45'},
      {'id': 7, 'id_fila': 7, 'id_cliente': 9, 'nome': 'Patricia Alves', 'hora_entrada': '16:00'},
      {'id': 8, 'id_fila': 8, 'id_cliente': 10, 'nome': 'Roberto Souza', 'hora_entrada': '16:10'},
    ];
  }

  static String _dataStr(int daysAgo) {
    final d = DateTime.now().subtract(Duration(days: daysAgo));
    return '${d.year}-${d.month.toString().padLeft(2, '0')}-${d.day.toString().padLeft(2, '0')}';
  }

  static List<String> _diasSemana() => ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  /// Atendimentos variados por dia (15, 23, 18, etc.) nos últimos 30 dias
  static int _atendimentosDoDia(int daysAgo) {
    final seed = daysAgo * 7 + DateTime.now().day;
    return 12 + (seed % 15); // entre 12 e 26
  }

  static Future<Map<String, dynamic>> getDashboardAdmin(
    int periodoDias, {
    List<String>? tipo,
    String? tipoPagamento,
    int? idCabeleireiro,
  }) async {
    final dias = periodoDias.clamp(7, 90);
    final grafico = <Map<String, dynamic>>[];
    double fatTotal = 0;
    int atendTotal = 0;
    for (var i = dias - 1; i >= 0; i--) {
      final qtd = _atendimentosDoDia(i);
      final valor = (qtd * (55 + (i % 25))).toDouble();
      grafico.add({
        'data': _dataStr(i),
        'label': _diasSemana()[DateTime.now().subtract(Duration(days: i)).weekday % 7],
        'valor': valor,
      });
      fatTotal += valor;
      atendTotal += qtd;
    }
    final graficoSeries = [
      {
        'label': 'Serviços',
        'cor': '#2196F3',
        'dados': grafico.map((g) => {...g, 'valor': ((g['valor'] as num) * 0.65)}).toList(),
      },
      {
        'label': 'Produtos',
        'cor': '#4CAF50',
        'dados': grafico.map((g) => {...g, 'valor': ((g['valor'] as num) * 0.35)}).toList(),
      },
    ];
    final ranking = [
      {'nome': 'Gustavo', 'atendimentos': 28, 'total': 1820.0},
      {'nome': 'Wender', 'atendimentos': 25, 'total': 1650.0},
      {'nome': 'João', 'atendimentos': 24, 'total': 1580.0},
      {'nome': 'José', 'atendimentos': 22, 'total': 1450.0},
    ];
    final atividadeRecente = <Map<String, dynamic>>[];
    final nomes = ['Carlos Souza', 'Ana Costa', 'Rafael Lima', 'Fernanda Costa', 'Gustavo Mendes', 'Patricia Alves', 'Roberto Souza', 'Juliana Rocha'];
    final servicos = ['Corte masculino + Barba', 'Corte + Barba', 'Corte + Barba + Pomada', 'Corte feminino', 'Corte, Barba + Shampoo', 'Corte feminino, Coloração', 'Barba', 'Hidratação'];
    for (var i = 0; i < 8; i++) {
      atividadeRecente.add({
        'nome': nomes[i],
        'valor': 45.0 + (i * 15),
        'descricao': servicos[i],
        'data': DateTime.now().subtract(Duration(hours: i + 1)).toIso8601String(),
      });
    }
    return {
      'faturamento_total': fatTotal,
      'faturamento_anterior': fatTotal * 0.85,
      'percentual_vs_anterior': 17.6,
      'em_espera': 8,
      'ticket_medio': fatTotal / atendTotal,
      'qtd_atendimentos_periodo': atendTotal,
      'servicos_count': atendTotal ~/ 2,
      'servicos_faturamento': fatTotal * 0.65,
      'produtos_count': atendTotal ~/ 3,
      'produtos_faturamento': fatTotal * 0.35,
      'grafico': grafico,
      'grafico_series': graficoSeries,
      'ranking': ranking,
      'atividade_recente': atividadeRecente,
    };
  }

  static Future<List<Map<String, dynamic>>> getRankingFiltrado({
    required String dataInicio,
    required String dataFim,
    int? idCabeleireiro,
  }) async {
    return [
      {'nome': 'Gustavo', 'atendimentos': 28, 'total': 1820.0},
      {'nome': 'Wender', 'atendimentos': 25, 'total': 1650.0},
      {'nome': 'João', 'atendimentos': 24, 'total': 1580.0},
      {'nome': 'José', 'atendimentos': 22, 'total': 1450.0},
    ];
  }

  static Future<List<Map<String, dynamic>>> getAtendimentosDoDia(String data) async {
    final qtd = 12 + (data.hashCode.abs() % 14);
    final nomes = ['Carlos Souza', 'Ana Costa', 'Rafael Lima', 'Fernanda Costa', 'Gustavo Mendes', 'Patricia Alves', 'Roberto Souza', 'Juliana Rocha', 'Marcos Paulo', 'Camila Dias', 'André Luiz', 'Larissa Martins', 'Bruno Santos', 'Carla Mendes', 'Diego Oliveira', 'Eduarda Lima', 'Fábio Costa', 'Gabriela Rocha', 'Henrique Silva', 'Isabela Alves'];
    final servicosList = ['Corte masculino, Barba', 'Corte + Barba', 'Corte masculino, Barba, Pomada', 'Corte feminino', 'Corte, Barba, Shampoo', 'Corte feminino, Coloração', 'Barba', 'Hidratação', 'Corte masculino', 'Coloração'];
    final result = <Map<String, dynamic>>[];
    for (var i = 0; i < qtd && i < 20; i++) {
      final hora = 8 + (i % 10);
      final min = (i * 17) % 60;
      result.add({
        'id_atendimento': i + 1,
        'nome_cliente': nomes[i % nomes.length],
        'total': 45.0 + (i * 12) % 120,
        'data_hora': '${data}T${hora.toString().padLeft(2, '0')}:${min.toString().padLeft(2, '0')}:00',
        'servicos': servicosList[i % servicosList.length],
      });
    }
    return result;
  }

  static Future<List<Map<String, dynamic>>> getEncerrados() async {
    return [
      {'id_atendimento': 1, 'nome': 'Carlos Souza', 'cliente': 'Carlos Souza', 'total': 90.0, 'data_fim': DateTime.now().subtract(const Duration(hours: 1)).toIso8601String()},
      {'id_atendimento': 2, 'nome': 'Ana Costa', 'cliente': 'Ana Costa', 'total': 55.0, 'data_fim': DateTime.now().subtract(const Duration(hours: 2)).toIso8601String()},
      {'id_atendimento': 3, 'nome': 'Rafael Lima', 'cliente': 'Rafael Lima', 'total': 120.0, 'data_fim': DateTime.now().subtract(const Duration(hours: 3)).toIso8601String()},
      {'id_atendimento': 4, 'nome': 'Fernanda Costa', 'cliente': 'Fernanda Costa', 'total': 75.0, 'data_fim': DateTime.now().subtract(const Duration(hours: 4)).toIso8601String()},
      {'id_atendimento': 5, 'nome': 'Gustavo Mendes', 'cliente': 'Gustavo Mendes', 'total': 95.0, 'data_fim': DateTime.now().subtract(const Duration(hours: 5)).toIso8601String()},
      {'id_atendimento': 6, 'nome': 'Patricia Alves', 'cliente': 'Patricia Alves', 'total': 65.0, 'data_fim': DateTime.now().subtract(const Duration(hours: 6)).toIso8601String()},
      {'id_atendimento': 7, 'nome': 'Roberto Souza', 'cliente': 'Roberto Souza', 'total': 110.0, 'data_fim': DateTime.now().subtract(const Duration(days: 1)).toIso8601String()},
      {'id_atendimento': 8, 'nome': 'Juliana Rocha', 'cliente': 'Juliana Rocha', 'total': 85.0, 'data_fim': DateTime.now().subtract(const Duration(days: 1)).toIso8601String()},
      {'id_atendimento': 9, 'nome': 'Marcos Paulo', 'cliente': 'Marcos Paulo', 'total': 70.0, 'data_fim': DateTime.now().subtract(const Duration(days: 2)).toIso8601String()},
    ];
  }

  static Future<List<Map<String, dynamic>>> listServicos({bool todos = false}) async {
    return [
      {'id': 1, 'descricao': 'Corte masculino', 'valor': 35.0, 'icone': '', 'imagem': '', 'ativo': true},
      {'id': 2, 'descricao': 'Barba', 'valor': 25.0, 'icone': '', 'imagem': '', 'ativo': true},
      {'id': 3, 'descricao': 'Corte + Barba', 'valor': 55.0, 'icone': '', 'imagem': '', 'ativo': true},
      {'id': 4, 'descricao': 'Corte feminino', 'valor': 75.0, 'icone': '', 'imagem': '', 'ativo': true},
      {'id': 5, 'descricao': 'Coloração', 'valor': 120.0, 'icone': '', 'imagem': '', 'ativo': true},
      {'id': 6, 'descricao': 'Hidratação', 'valor': 45.0, 'icone': '', 'imagem': '', 'ativo': true},
      {'id': 7, 'descricao': 'Sobrancelha', 'valor': 15.0, 'icone': '', 'imagem': '', 'ativo': true},
      {'id': 8, 'descricao': 'Pé e mão (unha)', 'valor': 40.0, 'icone': '', 'imagem': '', 'ativo': true},
      {'id': 9, 'descricao': 'Platinado Masculino', 'valor': 95.0, 'icone': '', 'imagem': '', 'ativo': true},
      {'id': 10, 'descricao': 'Corte infantil', 'valor': 30.0, 'icone': '', 'imagem': '', 'ativo': true},
    ];
  }

  static Future<List<Map<String, dynamic>>> listProdutos({bool todos = false}) async {
    return [
      {'id': 1, 'descricao': 'Pomada', 'valor_venda': 30.0, 'valor_custo': 15.0, 'estoque': 20, 'icone': '', 'imagem': '', 'ativo': true},
      {'id': 2, 'descricao': 'Shampoo', 'valor_venda': 25.0, 'valor_custo': 10.0, 'estoque': 15, 'icone': '', 'imagem': '', 'ativo': true},
      {'id': 3, 'descricao': 'Condicionador', 'valor_venda': 28.0, 'valor_custo': 12.0, 'estoque': 18, 'icone': '', 'imagem': '', 'ativo': true},
      {'id': 4, 'descricao': 'Gel', 'valor_venda': 22.0, 'valor_custo': 8.0, 'estoque': 25, 'icone': '', 'imagem': '', 'ativo': true},
      {'id': 5, 'descricao': 'Cera modeladora', 'valor_venda': 35.0, 'valor_custo': 14.0, 'estoque': 12, 'icone': '', 'imagem': '', 'ativo': true},
      {'id': 6, 'descricao': 'Tinta capilar', 'valor_venda': 45.0, 'valor_custo': 20.0, 'estoque': 10, 'icone': '', 'imagem': '', 'ativo': true},
      {'id': 7, 'descricao': 'Esmalte', 'valor_venda': 12.0, 'valor_custo': 4.0, 'estoque': 30, 'icone': '', 'imagem': '', 'ativo': true},
      {'id': 8, 'descricao': 'Removedor', 'valor_venda': 18.0, 'valor_custo': 6.0, 'estoque': 22, 'icone': '', 'imagem': '', 'ativo': true},
      {'id': 9, 'descricao': 'Hidratante', 'valor_venda': 38.0, 'valor_custo': 16.0, 'estoque': 14, 'icone': '', 'imagem': '', 'ativo': true},
      {'id': 10, 'descricao': 'Secador', 'valor_venda': 85.0, 'valor_custo': 40.0, 'estoque': 5, 'icone': '', 'imagem': '', 'ativo': true},
      {'id': 11, 'descricao': 'Pomada Efeito Seco', 'valor_venda': 42.0, 'valor_custo': 18.0, 'estoque': 16, 'icone': '', 'imagem': '', 'ativo': true},
      {'id': 12, 'descricao': 'Kit Barba Completo', 'valor_venda': 68.0, 'valor_custo': 28.0, 'estoque': 8, 'icone': '', 'imagem': '', 'ativo': true},
    ];
  }

  static Future<List<Map<String, dynamic>>> listClientes() async {
    return [
      {'id': 1, 'nome': 'João Silva', 'telefone': '(11) 99999-1111', 'data_cadastro': DateTime.now().toIso8601String()},
      {'id': 2, 'nome': 'Maria Santos', 'telefone': '(11) 99999-2222', 'data_cadastro': DateTime.now().toIso8601String()},
      {'id': 3, 'nome': 'Pedro Oliveira', 'telefone': '(11) 99999-3333', 'data_cadastro': DateTime.now().toIso8601String()},
      {'id': 4, 'nome': 'Carlos Souza', 'telefone': '(11) 99999-4444', 'data_cadastro': DateTime.now().toIso8601String()},
      {'id': 5, 'nome': 'Ana Costa', 'telefone': '(11) 99999-5555', 'data_cadastro': DateTime.now().toIso8601String()},
      {'id': 6, 'nome': 'Rafael Lima', 'telefone': '(11) 99999-6666', 'data_cadastro': DateTime.now().toIso8601String()},
      {'id': 7, 'nome': 'Fernanda Costa', 'telefone': '(11) 99999-7777', 'data_cadastro': DateTime.now().toIso8601String()},
      {'id': 8, 'nome': 'Gustavo Mendes', 'telefone': '(11) 99999-8888', 'data_cadastro': DateTime.now().toIso8601String()},
      {'id': 9, 'nome': 'Patricia Alves', 'telefone': '(11) 99999-9999', 'data_cadastro': DateTime.now().toIso8601String()},
      {'id': 10, 'nome': 'Roberto Souza', 'telefone': '(11) 98888-1111', 'data_cadastro': DateTime.now().toIso8601String()},
      {'id': 11, 'nome': 'Juliana Rocha', 'telefone': '(11) 98888-2222', 'data_cadastro': DateTime.now().toIso8601String()},
      {'id': 12, 'nome': 'Marcos Paulo', 'telefone': '(11) 98888-3333', 'data_cadastro': DateTime.now().toIso8601String()},
      {'id': 13, 'nome': 'Camila Dias', 'telefone': '(11) 98888-4444', 'data_cadastro': DateTime.now().toIso8601String()},
      {'id': 14, 'nome': 'André Luiz', 'telefone': '(11) 98888-5555', 'data_cadastro': DateTime.now().toIso8601String()},
      {'id': 15, 'nome': 'Larissa Martins', 'telefone': '(11) 98888-6666', 'data_cadastro': DateTime.now().toIso8601String()},
      {'id': 16, 'nome': 'Bruno Santos', 'telefone': '(11) 98888-7777', 'data_cadastro': DateTime.now().toIso8601String()},
      {'id': 17, 'nome': 'Carla Mendes', 'telefone': '(11) 98888-8888', 'data_cadastro': DateTime.now().toIso8601String()},
      {'id': 18, 'nome': 'Diego Oliveira', 'telefone': '(11) 98888-9999', 'data_cadastro': DateTime.now().toIso8601String()},
      {'id': 19, 'nome': 'Eduarda Lima', 'telefone': '(11) 97777-1111', 'data_cadastro': DateTime.now().toIso8601String()},
      {'id': 20, 'nome': 'Fábio Costa', 'telefone': '(11) 97777-2222', 'data_cadastro': DateTime.now().toIso8601String()},
    ];
  }

  static Future<List<Map<String, dynamic>>> listCabeleireiros() async {
    return [
      {'id': 3, 'nome': 'Gustavo', 'login': 'gustavo', 'perfil': 'CABELEIREIRO', 'ativo': true},
      {'id': 4, 'nome': 'Wender', 'login': 'wender_barbeiro', 'perfil': 'CABELEIREIRO', 'ativo': true},
      {'id': 5, 'nome': 'João', 'login': 'joao', 'perfil': 'CABELEIREIRO', 'ativo': true},
      {'id': 6, 'nome': 'José', 'login': 'jose', 'perfil': 'CABELEIREIRO', 'ativo': true},
    ];
  }

  /// Agendamentos do dia: 3 a 6 por cabeleireiro (GUSTAVO, WENDER, JOAO, JOSE)
  static Future<List<Map<String, dynamic>>> listAgendamentos(DateTime data) async {
    final d = '${data.year}-${data.month.toString().padLeft(2, '0')}-${data.day.toString().padLeft(2, '0')}';
    final clientes = ['João Silva', 'Maria Santos', 'Pedro Oliveira', 'Carlos Souza', 'Ana Costa', 'Rafael Lima', 'Fernanda Costa', 'Gustavo Mendes', 'Patricia Alves', 'Roberto Souza', 'Juliana Rocha', 'Marcos Paulo', 'Camila Dias', 'André Luiz', 'Larissa Martins'];
    final servicos = ['Corte masculino', 'Barba', 'Corte + Barba', 'Corte feminino', 'Coloração', 'Hidratação', 'Platinado Masculino'];
    final result = <Map<String, dynamic>>[];
    var id = 1;
    for (var c = 0; c < _idsCabeleireiros.length; c++) {
      final qtd = 3 + (data.day + c) % 4; // 3 a 6 por cabeleireiro
      for (var i = 0; i < qtd; i++) {
        final hora = 8 + (i * 2) + (c % 2);
        result.add({
          'id': id++,
          'id_cliente': (i % 15) + 1,
          'id_servico': (i % 7) + 1,
          'id_cabeleireiro': _idsCabeleireiros[c],
          'data_hora': '${d}T${hora.toString().padLeft(2, '0')}:${(i * 10 % 6 * 10).toString().padLeft(2, '0')}',
          'status': 'AGENDADO',
          'cliente': {'nome': clientes[i % clientes.length]},
          'servico': {'descricao': servicos[i % servicos.length]},
          'cabeleireiro': {'nome': _nomesCabeleireiros[c]},
        });
      }
    }
    result.sort((a, b) => (a['data_hora'] as String).compareTo(b['data_hora'] as String));
    return result;
  }

  static Future<Map<String, dynamic>?> getCaixaAberto() async {
    return {
      'id': 1,
      'data_abertura': DateTime.now().toIso8601String(),
      'valor_abertura': 0.0,
      'status': 'ABERTO',
    };
  }

  static Future<double> getSaldoDia() async => 2845.0;

  static Future<List<Map<String, dynamic>>> getUltimosLancamentos() async {
    final result = <Map<String, dynamic>>[];
    final nomes = ['Carlos Souza', 'Ana Costa', 'Rafael Lima', 'Fernanda Costa', 'Gustavo Mendes', 'Patricia Alves', 'Roberto Souza', 'Juliana Rocha', 'Marcos Paulo', 'Camila Dias'];
    final tipos = ['PIX', 'DINHEIRO', 'CARTAO', 'PIX', 'DINHEIRO', 'PIX', 'CARTAO', 'PIX', 'DINHEIRO', 'PIX'];
    for (var i = 0; i < 15; i++) {
      result.add({
        'id': i + 1,
        'id_atendimento': i + 1,
        'valor': 45.0 + (i * 18) % 120,
        'tipo_pagamento': tipos[i % tipos.length],
        'data_pagamento': DateTime.now().subtract(Duration(hours: i, minutes: i * 5)).toIso8601String(),
      });
    }
    return result;
  }

  static Future<Map<String, dynamic>> getDetalheCaixa(int id) async {
    return {'id': id, 'valor': 90.0, 'tipo_pagamento': 'PIX', 'atendimento': {'id': 1}, 'servicos': [], 'produtos': []};
  }

  static Future<Map<String, dynamic>> getDetalheAtendimento(int idAtendimento) async {
    return {
      'id': idAtendimento,
      'servicos': [
        {'id_servico': 1, 'descricao': 'Corte masculino', 'valor': 35.0},
        {'id_servico': 2, 'descricao': 'Barba', 'valor': 25.0},
      ],
      'produtos': [
        {'id_produto': 1, 'descricao': 'Pomada', 'quantidade': 1, 'valor': 30.0},
      ],
      'total': 90.0,
    };
  }

  static Future<List<Map<String, dynamic>>> getNotificacoes(String perfil) async {
    if (perfil == 'RECEPCAO') {
      return [
        {'id': 1, 'tipo': 'REABASTECER', 'titulo': 'REABASTECER', 'subtitulo': 'Pomada Efeito Seco', 'detalhe': 'Linha Professional', 'estoque': 3, 'lido': false},
        {'id': 2, 'tipo': 'REABASTECER', 'titulo': 'REABASTECER', 'subtitulo': 'Kit Barba Completo', 'detalhe': 'Linha Professional', 'estoque': 2, 'lido': false},
        {'id': 3, 'tipo': 'LEMBRETE_AGENDAMENTO', 'titulo': 'Lembrete de agendamento', 'subtitulo': 'João Silva', 'detalhe': 'Amanhã às 09:00 com Gustavo.', 'lido': false},
      ];
    }
    if (perfil == 'DONO') {
      return [
        {'id': 4, 'tipo': 'CLIENTE_NA_FILA', 'titulo': 'Cliente na fila', 'subtitulo': 'Pedro Oliveira', 'lido': false},
      ];
    }
    return [];
  }

  static Future<void> markNotificacaoLida(int id) async {}
  static Future<Map<String, dynamic>> registrarPagamento({required int idAtendimento, required double valor, required String tipoPagamento, String observacao = ''}) async {
    return {'id': 99, 'id_atendimento': idAtendimento, 'valor': valor, 'tipo_pagamento': tipoPagamento};
  }
  static Future<Map<String, dynamic>> abrirAtendimento(int idFila, int idCabeleireiro) async {
    return {'id': 99, 'id_fila': idFila, 'id_cabeleireiro': idCabeleireiro, 'status': 'ABERTO'};
  }
  static Future<void> encerrarAtendimento(int idAtendimento) async {}
  static Future<void> addServicosAtendimento(int idAtendimento, List<Map<String, dynamic>> itens) async {}
  static Future<void> addProdutosAtendimento(int idAtendimento, List<Map<String, dynamic>> itens) async {}
  static Future<void> addFila(int idCliente, {int? idAgendamento}) async {}
  static Future<Map<String, dynamic>> createCliente(String nome, {String telefone = ''}) async {
    return {'id': 99, 'nome': nome, 'telefone': telefone, 'data_cadastro': DateTime.now().toIso8601String()};
  }
  static Future<void> addClienteFila(String nome, {String telefone = ''}) async {}
  static Future<Map<String, dynamic>> createAgendamento({required int idCliente, int? idServico, int? idCabeleireiro, required DateTime dataHora, String observacao = ''}) async {
    return {'id': 99, 'id_cliente': idCliente, 'data_hora': dataHora.toIso8601String(), 'status': 'AGENDADO'};
  }
  static Future<Map<String, dynamic>> abrirCaixa(double valorAbertura, {String observacao = '', int? idUsuario}) async {
    return {'id': 1, 'valor_abertura': valorAbertura, 'status': 'ABERTO'};
  }
  static Future<void> fecharCaixa(double valorFechamento, {String observacao = ''}) async {}
  static Future<void> registrarSangria(double valor, {String observacao = ''}) async {}
  static Future<Map<String, dynamic>> createServico({required String descricao, required double valor, String icone = '', String imagem = '', bool ativo = true}) async {
    return {'id': 99, 'descricao': descricao, 'valor': valor, 'ativo': ativo};
  }
  static Future<void> updateServico(int id, Map<String, dynamic> body) async {}
  static Future<void> deleteServico(int id) async {}
  static Future<Map<String, dynamic>> createProduto({required String descricao, required double valorVenda, double? valorCusto, int estoque = 0, String icone = '', String imagem = '', bool ativo = true}) async {
    return {'id': 99, 'descricao': descricao, 'valor_venda': valorVenda, 'ativo': ativo};
  }
  static Future<void> updateProduto(int id, Map<String, dynamic> body) async {}
  static Future<void> deleteProduto(int id) async {}
  static Future<Map<String, dynamic>> createUsuario({required String nome, required String login, required String senha, required String perfil}) async {
    return {'id': 99, 'nome': nome, 'login': login, 'perfil': perfil, 'ativo': true};
  }
  static Future<void> updateUsuario(int id, {String? nome, String? perfil, bool? ativo}) async {}
  static Future<void> deleteUsuario(int id) async {}
  static Future<void> alterarSenha(int id, {required String senhaAtual, required String novaSenha}) async {}
  static Future<String> uploadAvatar(int id, dynamic file) async => '';
  static Future<String> uploadImagem(dynamic file) async => '';
}
