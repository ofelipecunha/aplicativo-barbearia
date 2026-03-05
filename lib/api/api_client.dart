import 'dart:convert';
import 'dart:io';

import 'package:barbearia/config/api_config.dart';
import 'package:barbearia/demo/remover_demo_config.dart';
import 'package:barbearia/demo/remover_demo_data.dart';
import 'package:http/http.dart' as http;

export 'package:barbearia/config/api_config.dart' show apiBase, serverBase;

class ApiClient {
  /// Lista clientes na fila. Para perfil CABELEIREIRO, passe [idCabeleireiro] para ver só a fila dele (agendamentos do dia + só para ele).
  static Future<List<Map<String, dynamic>>> getAguardando({int? idCabeleireiro}) async {
    if (removerDemoUseDemoData) return RemoverDemoData.getAguardando();
    final params = <String, String>{};
    if (idCabeleireiro != null && idCabeleireiro > 0) params['id_cabeleireiro'] = idCabeleireiro.toString();
    final uri = Uri.parse('$apiBase/recepcao/aguardando').replace(queryParameters: params);
    final res = await http.get(uri);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      if (res.body.isEmpty || res.body == 'null') return [];
      final decoded = jsonDecode(res.body);
      if (decoded is List) {
        return decoded.cast<Map<String, dynamic>>();
      }
      return [];
    }
    throw Exception('Erro ao buscar aguardando: ${res.statusCode}');
  }

  /// Lista clientes aguardando para fazer o recebimento (DONO/recepção). Mesmo resultado de getAguardando; usa rota /recebimento/aguardando.
  static Future<List<Map<String, dynamic>>> getClientesParaRecebimento() async {
    if (removerDemoUseDemoData) return RemoverDemoData.getAguardando();
    final uri = Uri.parse('$apiBase/recebimento/aguardando');
    final res = await http.get(uri);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      if (res.body.isEmpty || res.body == 'null') return [];
      final decoded = jsonDecode(res.body);
      if (decoded is List) {
        return decoded.cast<Map<String, dynamic>>();
      }
      return [];
    }
    throw Exception('Erro ao buscar clientes para recebimento: ${res.statusCode}');
  }

  /// [perfil] RECEPCAO (recepção/caixa) ou CABELEIREIRO. Para CABELEIREIRO, [idUsuario] é obrigatório (só vê suas notificações de agenda).
  static Future<List<Map<String, dynamic>>> getNotificacoes(String perfil, {int? idUsuario}) async {
    if (removerDemoUseDemoData) return RemoverDemoData.getNotificacoes(perfil);
    final params = <String, String>{'perfil': perfil};
    if (idUsuario != null && idUsuario > 0) params['id_usuario'] = idUsuario.toString();
    final uri = Uri.parse('$apiBase/notificacoes').replace(queryParameters: params);
    final res = await http.get(uri);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      if (res.body.isEmpty || res.body == 'null') return [];
      final decoded = jsonDecode(res.body);
      if (decoded is List) {
        return decoded.cast<Map<String, dynamic>>();
      }
      return [];
    }
    throw Exception('Erro ao buscar notificações: ${res.statusCode}');
  }

  /// Marca a notificação como lida; ao reabrir o painel ela não aparecerá mais.
  static Future<void> markNotificacaoLida(int id) async {
    if (removerDemoUseDemoData) return RemoverDemoData.markNotificacaoLida(id);
    final uri = Uri.parse('$apiBase/notificacoes/$id/lido');
    final res = await http.patch(uri);
    if (res.statusCode >= 200 && res.statusCode < 300) return;
    throw Exception('Erro ao marcar notificação como lida: ${res.statusCode}');
  }

  /// Dashboard do administrador. Filtros opcionais: tipo (SERVICO, PRODUTO), tipo_pagamento (PIX, CARTAO, DINHEIRO), id_cabeleireiro.
  static Future<Map<String, dynamic>> getDashboardAdmin(
    int periodoDias, {
    List<String>? tipo,
    String? tipoPagamento,
    int? idCabeleireiro,
  }) async {
    if (removerDemoUseDemoData) return RemoverDemoData.getDashboardAdmin(periodoDias, tipo: tipo, tipoPagamento: tipoPagamento, idCabeleireiro: idCabeleireiro);
    final q = <String>['periodo=$periodoDias'];
    if (tipo != null && tipo.isNotEmpty) for (final t in tipo) q.add('tipo=${Uri.encodeComponent(t)}');
    if (tipoPagamento != null && tipoPagamento.isNotEmpty) q.add('tipo_pagamento=${Uri.encodeComponent(tipoPagamento)}');
    if (idCabeleireiro != null && idCabeleireiro > 0) q.add('id_cabeleireiro=$idCabeleireiro');
    final uri = Uri.parse('$apiBase/admin/dashboard?${q.join('&')}');
    final res = await http.get(uri);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      if (res.body.isEmpty || res.body == 'null') return {};
      final decoded = jsonDecode(res.body);
      return decoded is Map<String, dynamic> ? decoded : Map<String, dynamic>.from(decoded as Map);
    }
    throw Exception('Erro ao buscar dashboard: ${res.statusCode}');
  }

  /// Atendimentos realizados (pagos) em um dia — para histórico no gráfico. [data] YYYY-MM-DD.
  static Future<List<Map<String, dynamic>>> getAtendimentosDoDia(String data) async {
    if (removerDemoUseDemoData) return RemoverDemoData.getAtendimentosDoDia(data);
    final uri = Uri.parse('$apiBase/admin/atendimentos-dia').replace(queryParameters: {'data': data});
    final res = await http.get(uri);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      if (res.body.isEmpty || res.body == 'null') return [];
      final decoded = jsonDecode(res.body);
      if (decoded is List) return decoded.cast<Map<String, dynamic>>();
      return [];
    }
    throw Exception('Erro ao buscar atendimentos do dia: ${res.statusCode}');
  }

  /// Ranking filtrado por data e opcionalmente por vendedor (cabeleireiro).
  /// [dataInicio] e [dataFim] em YYYY-MM-DD; [idCabeleireiro] null = todos.
  static Future<List<Map<String, dynamic>>> getRankingFiltrado({
    required String dataInicio,
    required String dataFim,
    int? idCabeleireiro,
  }) async {
    if (removerDemoUseDemoData) return RemoverDemoData.getRankingFiltrado(dataInicio: dataInicio, dataFim: dataFim, idCabeleireiro: idCabeleireiro);
    final params = <String, String>{'data_inicio': dataInicio, 'data_fim': dataFim};
    if (idCabeleireiro != null && idCabeleireiro > 0) params['id_cabeleireiro'] = '$idCabeleireiro';
    final uri = Uri.parse('$apiBase/admin/ranking').replace(queryParameters: params);
    final res = await http.get(uri);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      if (res.body.isEmpty || res.body == 'null') return [];
      final decoded = jsonDecode(res.body);
      final map = decoded is Map ? decoded as Map<String, dynamic> : null;
      final list = map?['ranking'] as List<dynamic>?;
      if (list == null) return [];
      return list.map((e) => e is Map ? Map<String, dynamic>.from(e as Map) : <String, dynamic>{}).toList();
    }
    throw Exception('Erro ao buscar ranking: ${res.statusCode}');
  }

  static Future<List<Map<String, dynamic>>> getEncerrados() async {
    if (removerDemoUseDemoData) return RemoverDemoData.getEncerrados();
    final uri = Uri.parse('$apiBase/recepcao/encerrados');
    final res = await http.get(uri);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      if (res.body.isEmpty || res.body == 'null') return [];
      final decoded = jsonDecode(res.body);
      if (decoded is List) {
        return decoded.cast<Map<String, dynamic>>();
      }
      return [];
    }
    throw Exception('Erro ao buscar encerrados: ${res.statusCode}');
  }

  static Future<Map<String, dynamic>> registrarPagamento({
    required int idAtendimento,
    required double valor,
    required String tipoPagamento,
    String observacao = '',
  }) async {
    if (removerDemoUseDemoData) return RemoverDemoData.registrarPagamento(idAtendimento: idAtendimento, valor: valor, tipoPagamento: tipoPagamento, observacao: observacao);
    if (idAtendimento <= 0) {
      throw Exception('id_atendimento é obrigatório e deve ser maior que zero');
    }
    final uri = Uri.parse('$apiBase/caixa');
    final body = <String, dynamic>{
      'id_atendimento': idAtendimento,
      'valor': valor,
      'tipo_pagamento': tipoPagamento,
    };
    if (observacao.trim().isNotEmpty) {
      body['observacao'] = observacao.trim();
    }
    final res = await http.post(
      uri,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(body),
    );
    if (res.statusCode == 201) {
      return jsonDecode(res.body) as Map<String, dynamic>;
    }
    String msg = 'Erro ao registrar pagamento';
    try {
      final b = jsonDecode(res.body);
      if (b is Map && b['error'] != null) msg = b['error'].toString();
    } catch (_) {}
    throw Exception(msg);
  }

  // Cabeleireiro: atendimentos e serviços
  static Future<Map<String, dynamic>> abrirAtendimento(
    int idFila,
    int idCabeleireiro,
  ) async {
    if (removerDemoUseDemoData) return RemoverDemoData.abrirAtendimento(idFila, idCabeleireiro);
    final uri = Uri.parse('$apiBase/atendimentos/abrir');
    final res = await http.post(
      uri,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'id_fila': idFila,
        'id_cabeleireiro': idCabeleireiro,
      }),
    );
    if (res.statusCode == 201) {
      return jsonDecode(res.body) as Map<String, dynamic>;
    }
    String msg = 'Erro ao abrir atendimento';
    try {
      final b = jsonDecode(res.body);
      if (b is Map && b['error'] != null) msg = b['error'].toString();
    } catch (_) {}
    throw Exception(msg);
  }

  static Future<List<Map<String, dynamic>>> listServicos(
      {bool todos = false}) async {
    if (removerDemoUseDemoData) return RemoverDemoData.listServicos(todos: todos);
    final uri = Uri.parse(
        '$apiBase/servicos${todos ? '?todos=1' : ''}');
    final res = await http.get(uri);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      if (res.body.isEmpty || res.body == 'null') return [];
      final decoded = jsonDecode(res.body);
      if (decoded is List) return decoded.cast<Map<String, dynamic>>();
      return [];
    }
    throw Exception('Erro ao listar serviços: ${res.statusCode}');
  }

  static Future<Map<String, dynamic>> createServico({
    required String descricao,
    required double valor,
    String icone = '',
    String imagem = '',
    bool ativo = true,
  }) async {
    if (removerDemoUseDemoData) return RemoverDemoData.createServico(descricao: descricao, valor: valor, icone: icone, imagem: imagem, ativo: ativo);
    final uri = Uri.parse('$apiBase/servicos');
    final body = <String, dynamic>{
      'descricao': descricao,
      'valor': valor,
      'icone': icone,
      'ativo': ativo,
    };
    if (imagem.isNotEmpty) body['imagem'] = imagem;
    final res = await http.post(
      uri,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(body),
    );
    if (res.statusCode == 201) {
      return jsonDecode(res.body) as Map<String, dynamic>;
    }
    _throwFromJson(res, 'Erro ao criar serviço');
  }

  static Future<void> updateServico(int id, Map<String, dynamic> body) async {
    if (removerDemoUseDemoData) return RemoverDemoData.updateServico(id, body);
    final uri = Uri.parse('$apiBase/servicos/$id');
    final res = await http.patch(
      uri,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(body),
    );
    if (res.statusCode >= 200 && res.statusCode < 300) return;
    _throwFromJson(res, 'Erro ao atualizar serviço');
  }

  static Future<void> deleteServico(int id) async {
    if (removerDemoUseDemoData) return RemoverDemoData.deleteServico(id);
    final uri = Uri.parse('$apiBase/servicos/$id');
    final res = await http.delete(uri);
    if (res.statusCode >= 200 && res.statusCode < 300) return;
    _throwFromJson(res, 'Erro ao excluir serviço');
  }

  static Future<List<Map<String, dynamic>>> listProdutos(
      {bool todos = false}) async {
    if (removerDemoUseDemoData) return RemoverDemoData.listProdutos(todos: todos);
    final uri = Uri.parse(
        '$apiBase/produtos${todos ? '?todos=1' : ''}');
    final res = await http.get(uri);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      if (res.body.isEmpty || res.body == 'null') return [];
      final decoded = jsonDecode(res.body);
      if (decoded is List) return decoded.cast<Map<String, dynamic>>();
      return [];
    }
    throw Exception('Erro ao listar produtos: ${res.statusCode}');
  }

  static Future<Map<String, dynamic>> createProduto({
    required String descricao,
    required double valorVenda,
    double? valorCusto,
    int estoque = 0,
    String icone = '',
    String imagem = '',
    bool ativo = true,
  }) async {
    if (removerDemoUseDemoData) return RemoverDemoData.createProduto(descricao: descricao, valorVenda: valorVenda, valorCusto: valorCusto, estoque: estoque, icone: icone, imagem: imagem, ativo: ativo);
    final uri = Uri.parse('$apiBase/produtos');
    final body = <String, dynamic>{
      'descricao': descricao,
      'valor_venda': valorVenda,
      'estoque': estoque,
      'icone': icone,
      'ativo': ativo,
    };
    if (valorCusto != null) body['valor_custo'] = valorCusto;
    if (imagem.isNotEmpty) body['imagem'] = imagem;
    final res = await http.post(
      uri,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(body),
    );
    if (res.statusCode == 201) {
      return jsonDecode(res.body) as Map<String, dynamic>;
    }
    _throwFromJson(res, 'Erro ao criar produto');
  }

  static Future<String> uploadImagem(File file) async {
    if (removerDemoUseDemoData) return RemoverDemoData.uploadImagem(file);
    final uri = Uri.parse('$apiBase/upload');
    final req = http.MultipartRequest('POST', uri);
    req.files.add(await http.MultipartFile.fromPath('file', file.path));
    final stream = await req.send();
    final res = await http.Response.fromStream(stream);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      final m = jsonDecode(res.body) as Map<String, dynamic>;
      final img = m['imagem']?.toString() ?? '';
      if (img.isEmpty) throw Exception('Resposta inválida do upload');
      return img;
    }
    String msg = 'Erro ao enviar imagem';
    try {
      final b = jsonDecode(res.body);
      if (b is Map && b['error'] != null) msg = b['error'].toString();
    } catch (_) {}
    throw Exception(msg);
  }

  static Future<void> updateProduto(int id, Map<String, dynamic> body) async {
    if (removerDemoUseDemoData) return RemoverDemoData.updateProduto(id, body);
    final uri = Uri.parse('$apiBase/produtos/$id');
    final res = await http.patch(
      uri,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(body),
    );
    if (res.statusCode >= 200 && res.statusCode < 300) return;
    _throwFromJson(res, 'Erro ao atualizar produto');
  }

  static Future<void> deleteProduto(int id) async {
    if (removerDemoUseDemoData) return RemoverDemoData.deleteProduto(id);
    final uri = Uri.parse('$apiBase/produtos/$id');
    final res = await http.delete(uri);
    if (res.statusCode >= 200 && res.statusCode < 300) return;
    _throwFromJson(res, 'Erro ao excluir produto');
  }

  static Never _throwFromJson(http.Response res, String fallback) {
    String msg = fallback;
    try {
      final b = jsonDecode(res.body);
      if (b is Map && b['error'] != null) msg = b['error'].toString();
    } catch (_) {}
    throw Exception(msg);
  }

  static Future<void> addServicosAtendimento(
    int idAtendimento,
    List<Map<String, dynamic>> itens,
  ) async {
    if (removerDemoUseDemoData) return RemoverDemoData.addServicosAtendimento(idAtendimento, itens);
    final uri = Uri.parse('$apiBase/atendimentos/$idAtendimento/servicos');
    final body = itens
        .map((e) => {
              'id_servico': e['id_servico'],
              'valor': (e['valor'] as num).toDouble(),
            })
        .toList();
    final res = await http.post(
      uri,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(body),
    );
    if (res.statusCode >= 200 && res.statusCode < 300) return;
    String msg = 'Erro ao adicionar serviços';
    try {
      final b = jsonDecode(res.body);
      if (b is Map && b['error'] != null) msg = b['error'].toString();
    } catch (_) {}
    throw Exception(msg);
  }

  static Future<void> addProdutosAtendimento(
    int idAtendimento,
    List<Map<String, dynamic>> itens,
  ) async {
    if (removerDemoUseDemoData) return RemoverDemoData.addProdutosAtendimento(idAtendimento, itens);
    final uri = Uri.parse('$apiBase/atendimentos/$idAtendimento/produtos');
    final body = itens
        .map((e) => {
              'id_produto': e['id_produto'],
              'quantidade': (e['quantidade'] as num).toInt(),
              'valor': (e['valor'] as num).toDouble(),
            })
        .toList();
    final res = await http.post(
      uri,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(body),
    );
    if (res.statusCode >= 200 && res.statusCode < 300) return;
    String msg = 'Erro ao adicionar produtos';
    try {
      final b = jsonDecode(res.body);
      if (b is Map && b['error'] != null) msg = b['error'].toString();
    } catch (_) {}
    throw Exception(msg);
  }

  static Future<void> encerrarAtendimento(int idAtendimento) async {
    if (removerDemoUseDemoData) return RemoverDemoData.encerrarAtendimento(idAtendimento);
    final uri = Uri.parse('$apiBase/atendimentos/$idAtendimento/encerrar');
    final res = await http.patch(uri);
    if (res.statusCode >= 200 && res.statusCode < 300) return;
    String msg = 'Erro ao encerrar atendimento';
    try {
      final b = jsonDecode(res.body);
      if (b is Map && b['error'] != null) msg = b['error'].toString();
    } catch (_) {}
    throw Exception(msg);
  }

  // Clientes
  static Future<Map<String, dynamic>> createCliente(String nome, {String telefone = ''}) async {
    if (removerDemoUseDemoData) return RemoverDemoData.createCliente(nome, telefone: telefone);
    final res = await http.post(
      Uri.parse('$apiBase/clientes'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'nome': nome, 'telefone': telefone}),
    );
    if (res.statusCode >= 200 && res.statusCode < 300) {
      return jsonDecode(res.body) as Map<String, dynamic>;
    }
    String msg = 'Erro ao criar cliente';
    try {
      final b = jsonDecode(res.body);
      if (b is Map && b['error'] != null) msg = b['error'].toString();
    } catch (_) {}
    throw Exception(msg);
  }

  static Future<List<Map<String, dynamic>>> listClientes() async {
    if (removerDemoUseDemoData) return RemoverDemoData.listClientes();
    final uri = Uri.parse('$apiBase/clientes');
    final res = await http.get(uri);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      if (res.body.isEmpty || res.body == 'null') return [];
      final decoded = jsonDecode(res.body);
      if (decoded is List) return decoded.cast<Map<String, dynamic>>();
      return [];
    }
    throw Exception('Erro ao listar clientes: ${res.statusCode}');
  }

  // Usuários / Cabeleireiros
  static Future<List<Map<String, dynamic>>> listCabeleireiros() async {
    if (removerDemoUseDemoData) return RemoverDemoData.listCabeleireiros();
    final uri = Uri.parse('$apiBase/usuarios?perfil=CABELEIREIRO');
    final res = await http.get(uri);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      if (res.body.isEmpty || res.body == 'null') return [];
      final decoded = jsonDecode(res.body);
      if (decoded is List) return decoded.cast<Map<String, dynamic>>();
      return [];
    }
    throw Exception('Erro ao listar cabeleireiros: ${res.statusCode}');
  }

  // Agendamentos
  static Future<List<Map<String, dynamic>>> listAgendamentos(DateTime data, {int? idCabeleireiro}) async {
    if (removerDemoUseDemoData) return RemoverDemoData.listAgendamentos(data);
    final dataStr = '${data.year}-${data.month.toString().padLeft(2, '0')}-${data.day.toString().padLeft(2, '0')}';
    final params = <String, String>{'data': dataStr};
    if (idCabeleireiro != null && idCabeleireiro > 0) params['id_cabeleireiro'] = idCabeleireiro.toString();
    final uri = Uri.parse('$apiBase/agendamentos').replace(queryParameters: params);
    final res = await http.get(uri);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      if (res.body.isEmpty || res.body == 'null') return [];
      final decoded = jsonDecode(res.body);
      if (decoded is List) return decoded.cast<Map<String, dynamic>>();
      return [];
    }
    throw Exception('Erro ao listar agendamentos: ${res.statusCode}');
  }

  /// Lista agendamentos do mês (GET /agendamentos/agenda?mes=YYYY-MM). Retorna itens com data_hora, nomeCliente, cabeleireiro, servico_descricao.
  static Future<List<Map<String, dynamic>>> listAgendamentosPorMes(int year, int month, {int? idCabeleireiro}) async {
    if (removerDemoUseDemoData) {
      final now = DateTime.now();
      final cards = <Map<String, dynamic>>[];
      for (var d = 0; d < 31; d++) {
        final day = DateTime(now.year, now.month, 1).add(Duration(days: d));
        if (day.month != now.month) break;
        final list = await RemoverDemoData.listAgendamentos(day);
        for (final a in list) {
          final dh = a['data_hora'];
          DateTime? dt;
          if (dh is String) dt = DateTime.tryParse(dh);
          if (dt == null) continue;
          cards.add({
            'data_hora': dt.toIso8601String(),
            'nomeCliente': (a['cliente'] is Map ? (a['cliente'] as Map)['nome'] : null) ?? a['nome'] ?? 'Cliente',
            'cabeleireiro': (a['cabeleireiro'] is Map ? (a['cabeleireiro'] as Map)['nome'] : null)?.toString() ?? '—',
            'servico_descricao': (a['servico'] is Map ? (a['servico'] as Map)['descricao'] : null)?.toString() ?? '',
          });
        }
      }
      return cards;
    }
    final mesStr = '${year.toString().padLeft(4, '0')}-${month.toString().padLeft(2, '0')}';
    final params = <String, String>{'mes': mesStr};
    if (idCabeleireiro != null && idCabeleireiro > 0) params['id_cabeleireiro'] = idCabeleireiro.toString();
    final uri = Uri.parse('$apiBase/agendamentos/agenda').replace(queryParameters: params);
    final res = await http.get(uri);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      if (res.body.isEmpty || res.body == 'null') return [];
      final decoded = jsonDecode(res.body);
      if (decoded is List) return decoded.cast<Map<String, dynamic>>();
      return [];
    }
    throw Exception('Erro ao listar agenda do mês: ${res.statusCode}');
  }

  static Future<Map<String, dynamic>> createAgendamento({
    required int idCliente,
    int? idServico,
    int? idCabeleireiro,
    required DateTime dataHora,
    String observacao = '',
  }) async {
    if (removerDemoUseDemoData) return RemoverDemoData.createAgendamento(idCliente: idCliente, idServico: idServico, idCabeleireiro: idCabeleireiro, dataHora: dataHora, observacao: observacao);
    // Backend aceita YYYY-MM-DDTHH:mm ou YYYY-MM-DD HH:mm (não aceita .000 do toIso8601String)
    final dataHoraStr = '${dataHora.year}-${dataHora.month.toString().padLeft(2, '0')}-${dataHora.day.toString().padLeft(2, '0')}T${dataHora.hour.toString().padLeft(2, '0')}:${dataHora.minute.toString().padLeft(2, '0')}';
    final uri = Uri.parse('$apiBase/agendamentos');
    final body = <String, dynamic>{
      'id_cliente': idCliente,
      'data_hora': dataHoraStr,
    };
    if (idServico != null) body['id_servico'] = idServico;
    if (idCabeleireiro != null) body['id_cabeleireiro'] = idCabeleireiro;
    if (observacao.isNotEmpty) body['observacao'] = observacao;
    final res = await http.post(
      uri,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(body),
    );
    if (res.statusCode == 201) {
      return jsonDecode(res.body) as Map<String, dynamic>;
    }
    String msg = 'Erro ao criar agendamento';
    if (res.statusCode == 409) msg = 'Este horário já está ocupado por outro agendamento';
    try {
      final b = jsonDecode(res.body);
      if (b is Map && b['error'] != null) msg = b['error'].toString();
    } catch (_) {}
    throw Exception(msg);
  }

  static Future<void> addClienteFila(String nome, {String telefone = ''}) async {
    if (removerDemoUseDemoData) return RemoverDemoData.addClienteFila(nome, telefone: telefone);
    // cria cliente
    final createCliente = await http.post(
      Uri.parse('$apiBase/clientes'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({"nome": nome, "telefone": telefone}),
    );
    if (createCliente.statusCode < 200 || createCliente.statusCode >= 300) {
      throw Exception('Erro ao criar cliente: ${createCliente.statusCode}');
    }
    final cli = jsonDecode(createCliente.body) as Map<String, dynamic>;
    final idCliente = (cli['id'] as num).toInt();

    // coloca na fila
    await addFila(idCliente);
  }

  /// Atualiza um agendamento (ex.: status ATENDIDO ou CANCELADO). PATCH /api/agendamentos/:id
  static Future<Map<String, dynamic>> updateAgendamento(int id, {String? status}) async {
    if (removerDemoUseDemoData) {
      return RemoverDemoData.updateAgendamento(id, status: status);
    }
    final body = <String, dynamic>{};
    if (status != null) body['status'] = status;
    final res = await http.patch(
      Uri.parse('$apiBase/agendamentos/$id'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(body),
    );
    if (res.statusCode >= 200 && res.statusCode < 300) {
      final decoded = jsonDecode(res.body);
      return decoded is Map ? Map<String, dynamic>.from(decoded) : <String, dynamic>{};
    }
    String msg = 'Erro ao atualizar agendamento';
    try {
      final b = jsonDecode(res.body);
      if (b is Map && b['error'] != null) msg = b['error'].toString();
    } catch (_) {}
    throw Exception(msg);
  }

  /// Insere cliente na fila. Retorna o objeto fila criado (com id) para abrir atendimento.
  static Future<Map<String, dynamic>> addFila(int idCliente, {int? idAgendamento}) async {
    if (removerDemoUseDemoData) return RemoverDemoData.addFila(idCliente, idAgendamento: idAgendamento);
    final body = <String, dynamic>{"id_cliente": idCliente};
    if (idAgendamento != null) body["id_agendamento"] = idAgendamento;
    final res = await http.post(
      Uri.parse('$apiBase/fila'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(body),
    );
    if (res.statusCode < 200 || res.statusCode >= 300) {
      throw Exception('Erro ao inserir na fila: ${res.statusCode}');
    }
    final decoded = jsonDecode(res.body);
    return decoded is Map ? Map<String, dynamic>.from(decoded) : <String, dynamic>{};
  }

  // CAIXA (modelo caixa_movimento: abertura/fechamento)
  static Future<Map<String, dynamic>?> getCaixaAberto() async {
    if (removerDemoUseDemoData) return RemoverDemoData.getCaixaAberto();
    final uri = Uri.parse('$apiBase/caixa/aberto');
    final res = await http.get(uri);
    if (res.statusCode == 204 || res.statusCode == 404 || res.body.isEmpty) {
      return null;
    }
    if (res.statusCode >= 200 && res.statusCode < 300) {
      final decoded = jsonDecode(res.body);
      if (decoded is Map) return decoded as Map<String, dynamic>;
      return null;
    }
    throw Exception('Erro ao buscar caixa aberto: ${res.statusCode}');
  }

  static Future<double> getSaldoDia() async {
    if (removerDemoUseDemoData) return RemoverDemoData.getSaldoDia();
    final uri = Uri.parse('$apiBase/caixa/saldo');
    final res = await http.get(uri);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      if (res.body.isEmpty || res.body == 'null') return 0;
      final decoded = jsonDecode(res.body);
      if (decoded is Map && decoded['saldo'] != null) {
        return (decoded['saldo'] as num).toDouble();
      }
      return 0;
    }
    throw Exception('Erro ao buscar saldo: ${res.statusCode}');
  }

  static Future<List<Map<String, dynamic>>> getUltimosLancamentos() async {
    if (removerDemoUseDemoData) return RemoverDemoData.getUltimosLancamentos();
    final uri = Uri.parse('$apiBase/caixa/ultimos');
    final res = await http.get(uri);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      if (res.body.isEmpty || res.body == 'null') return [];
      final decoded = jsonDecode(res.body);
      if (decoded is List) {
        return decoded.cast<Map<String, dynamic>>();
      }
      return [];
    }
    throw Exception('Erro ao buscar últimos lançamentos: ${res.statusCode}');
  }

  static Future<Map<String, dynamic>> getDetalheCaixa(int id) async {
    if (removerDemoUseDemoData) return RemoverDemoData.getDetalheCaixa(id);
    final uri = Uri.parse('$apiBase/caixa/$id/detalhe');
    final res = await http.get(uri);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      return jsonDecode(res.body) as Map<String, dynamic>;
    }
    throw Exception('Erro ao buscar detalhe: ${res.statusCode}');
  }

  /// Retorna serviços e produtos lançados em um atendimento (para modal de recebimento)
  static Future<Map<String, dynamic>> getDetalheAtendimento(int idAtendimento) async {
    if (removerDemoUseDemoData) return RemoverDemoData.getDetalheAtendimento(idAtendimento);
    final uri = Uri.parse('$apiBase/atendimentos/$idAtendimento/detalhe');
    final res = await http.get(uri);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      return jsonDecode(res.body) as Map<String, dynamic>;
    }
    throw Exception('Erro ao buscar detalhe do atendimento: ${res.statusCode}');
  }

  static Future<Map<String, dynamic>> abrirCaixa(double valorAbertura,
      {String observacao = '', int? idUsuario}) async {
    if (removerDemoUseDemoData) return RemoverDemoData.abrirCaixa(valorAbertura, observacao: observacao, idUsuario: idUsuario);
    final uri = Uri.parse('$apiBase/caixa/abrir');
    final body = <String, dynamic>{
      'valor_abertura': valorAbertura,
      'observacao': observacao,
    };
    if (idUsuario != null) body['id_usuario'] = idUsuario;
    final res = await http.post(
      uri,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(body),
    );
    if (res.statusCode == 201) {
      return jsonDecode(res.body) as Map<String, dynamic>;
    }
    String msg = 'Erro ao abrir caixa';
    if (res.statusCode == 409) msg = 'Já existe um caixa aberto';
    try {
      final b = jsonDecode(res.body);
      if (b is Map && b['error'] != null) msg = b['error'].toString();
    } catch (_) {}
    throw Exception(msg);
  }

  static Future<void> fecharCaixa(double valorFechamento,
      {String observacao = ''}) async {
    if (removerDemoUseDemoData) return RemoverDemoData.fecharCaixa(valorFechamento, observacao: observacao);
    final uri = Uri.parse('$apiBase/caixa/fechar');
    final res = await http.post(
      uri,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'valor_fechamento': valorFechamento,
        'observacao': observacao,
      }),
    );
    if (res.statusCode < 200 || res.statusCode >= 300) {
      String msg = 'Erro ao fechar caixa';
      if (res.statusCode == 409) msg = 'Não há caixa aberto';
      try {
        final b = jsonDecode(res.body);
        if (b is Map && b['error'] != null) msg = b['error'].toString();
      } catch (_) {}
      throw Exception(msg);
    }
  }

  static Future<void> registrarSangria(double valor,
      {String observacao = ''}) async {
    if (removerDemoUseDemoData) return RemoverDemoData.registrarSangria(valor, observacao: observacao);
    final uri = Uri.parse('$apiBase/caixa/sangria');
    final res = await http.post(
      uri,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'valor': valor,
        'observacao': observacao,
      }),
    );
    if (res.statusCode < 200 || res.statusCode >= 300) {
      String msg = 'Erro ao registrar sangria';
      if (res.statusCode == 409) {
        msg = 'Caixa fechado. Abra o caixa para registrar sangria.';
      }
      try {
        final b = jsonDecode(res.body);
        if (b is Map && b['error'] != null) msg = b['error'].toString();
      } catch (_) {}
      throw Exception(msg);
    }
  }

  // AUTH
  static Future<Map<String, dynamic>> login({
    required String login,
    required String senha,
  }) async {
    if (removerDemoUseDemoData) return RemoverDemoData.login(login, senha);
    final uri = Uri.parse('$apiBase/auth/login');
    final res = await http.post(
      uri,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        "login": login,
        "senha": senha,
      }),
    );
    if (res.statusCode == 200) {
      return jsonDecode(res.body) as Map<String, dynamic>;
    }
    String msg = 'Erro ao autenticar';
    if (res.statusCode == 401) {
      msg = 'Login ou senha inválidos.';
    } else if (res.statusCode == 403) {
      msg = 'Acesso negado.';
    }
    try {
      final body = jsonDecode(res.body);
      if (body is Map && body['error'] != null) msg = body['error'].toString();
    } catch (_) {}
    throw Exception(msg);
  }

  // USUARIOS
  static Future<Map<String, dynamic>> createUsuario({
    required String nome,
    required String login,
    required String senha,
    required String perfil,
  }) async {
    if (removerDemoUseDemoData) return RemoverDemoData.createUsuario(nome: nome, login: login, senha: senha, perfil: perfil);
    final uri = Uri.parse('$apiBase/usuarios');
    final res = await http.post(
      uri,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        "nome": nome,
        "login": login,
        "senha": senha,
        "perfil": perfil,
      }),
    );
    if (res.statusCode == 201) {
      return jsonDecode(res.body) as Map<String, dynamic>;
    }
    String msg = 'Erro ao criar usuário';
    if (res.statusCode == 409) {
      msg = 'Login já está em uso';
    } else if (res.statusCode == 400) {
      try {
        final body = jsonDecode(res.body);
        if (body is Map && body['error'] != null) {
          msg = body['error'].toString();
        }
      } catch (_) {}
    }
    throw Exception(msg);
  }

  /// Lista usuários aguardando aprovação (status A). Uso: DONO.
  static Future<List<Map<String, dynamic>>> getSolicitacoesUsuario() async {
    final uri = Uri.parse('$apiBase/usuarios/solicitacoes');
    final res = await http.get(uri);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      final list = jsonDecode(res.body) as List<dynamic>?;
      return list?.map((e) => e as Map<String, dynamic>).toList() ?? [];
    }
    throw Exception('Erro ao listar solicitações: ${res.statusCode}');
  }

  /// Aprova usuário (status V). Uso: DONO.
  static Future<void> aprovarUsuario(int id) async {
    final uri = Uri.parse('$apiBase/usuarios/$id/aprovacao');
    final res = await http.patch(
      uri,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'status': 'V'}),
    );
    if (res.statusCode < 200 || res.statusCode >= 300) {
      String msg = 'Erro ao aprovar';
      try {
        final b = jsonDecode(res.body);
        if (b is Map && b['error'] != null) msg = b['error'].toString();
      } catch (_) {}
      throw Exception(msg);
    }
  }

  /// Rejeita usuário (status N). Uso: DONO.
  static Future<void> rejeitarUsuario(int id) async {
    final uri = Uri.parse('$apiBase/usuarios/$id/aprovacao');
    final res = await http.patch(
      uri,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'status': 'N'}),
    );
    if (res.statusCode < 200 || res.statusCode >= 300) {
      String msg = 'Erro ao rejeitar';
      try {
        final b = jsonDecode(res.body);
        if (b is Map && b['error'] != null) msg = b['error'].toString();
      } catch (_) {}
      throw Exception(msg);
    }
  }

  static Future<Map<String, dynamic>> getUsuario(int id) async {
    if (removerDemoUseDemoData) return RemoverDemoData.getUsuario(id);
    final uri = Uri.parse('$apiBase/usuarios/$id');
    final res = await http.get(uri);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      return jsonDecode(res.body) as Map<String, dynamic>;
    }
    throw Exception('Erro ao buscar usuário: ${res.statusCode}');
  }

  /// Lista todos os usuários (ativos e inativos). Uso: DONO (Controle de usuários).
  static Future<List<Map<String, dynamic>>> listUsuariosTodos() async {
    if (removerDemoUseDemoData) return RemoverDemoData.listUsuariosTodos();
    final uri = Uri.parse('$apiBase/usuarios').replace(queryParameters: {'todos': '1'});
    final res = await http.get(uri);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      if (res.body.isEmpty || res.body == 'null') return [];
      final decoded = jsonDecode(res.body);
      if (decoded is List) return decoded.cast<Map<String, dynamic>>();
      return [];
    }
    throw Exception('Erro ao listar usuários: ${res.statusCode}');
  }

  static Future<void> updateUsuario(int id, {String? nome, String? perfil, bool? ativo}) async {
    if (removerDemoUseDemoData) return RemoverDemoData.updateUsuario(id, nome: nome, perfil: perfil);
    final uri = Uri.parse('$apiBase/usuarios/$id');
    final body = <String, dynamic>{};
    if (nome != null) body['nome'] = nome;
    if (perfil != null) body['perfil'] = perfil;
    if (ativo != null) body['ativo'] = ativo;
    if (body.isEmpty) return;
    final res = await http.patch(
      uri,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(body),
    );
    if (res.statusCode < 200 || res.statusCode >= 300) {
      String msg = 'Erro ao atualizar usuário';
      try {
        final b = jsonDecode(res.body);
        if (b is Map && b['error'] != null) msg = b['error'].toString();
      } catch (_) {}
      throw Exception(msg);
    }
  }

  /// Remove usuário do banco. Prefira desativar (ativo=false) para manter histórico.
  static Future<void> deleteUsuario(int id) async {
    if (removerDemoUseDemoData) {
      RemoverDemoData.deleteUsuario(id);
      return;
    }
    final uri = Uri.parse('$apiBase/usuarios/$id');
    final res = await http.delete(uri);
    if (res.statusCode < 200 || res.statusCode >= 300) {
      if (res.statusCode == 404) throw Exception('Usuário não encontrado');
      String msg = 'Erro ao excluir';
      try {
        final b = jsonDecode(res.body);
        if (b is Map && b['error'] != null) msg = b['error'].toString();
      } catch (_) {}
      throw Exception(msg);
    }
  }

  static Future<void> alterarSenha(int id, {required String senhaAtual, required String novaSenha}) async {
    if (removerDemoUseDemoData) return RemoverDemoData.alterarSenha(id, senhaAtual: senhaAtual, novaSenha: novaSenha);
    final uri = Uri.parse('$apiBase/usuarios/$id/senha');
    final res = await http.post(
      uri,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'senha_atual': senhaAtual,
        'nova_senha': novaSenha,
      }),
    );
    if (res.statusCode < 200 || res.statusCode >= 300) {
      String msg = 'Erro ao alterar senha';
      if (res.statusCode == 401) msg = 'Senha atual incorreta';
      try {
        final b = jsonDecode(res.body);
        if (b is Map && b['error'] != null) msg = b['error'].toString();
      } catch (_) {}
      throw Exception(msg);
    }
  }

  static Future<String> uploadAvatar(int id, File file) async {
    if (removerDemoUseDemoData) return RemoverDemoData.uploadAvatar(id, file);
    final uri = Uri.parse('$apiBase/usuarios/$id/avatar');
    final req = http.MultipartRequest('POST', uri);
    req.files.add(await http.MultipartFile.fromPath('file', file.path));
    final stream = await req.send();
    final res = await http.Response.fromStream(stream);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      final data = jsonDecode(res.body) as Map<String, dynamic>;
      return (data['avatar'] ?? '').toString();
    }
    throw Exception('Erro ao enviar foto: ${res.statusCode}');
  }
}

