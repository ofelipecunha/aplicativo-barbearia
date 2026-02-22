import 'package:flutter/material.dart';
import 'package:barbearia/config/app_colors.dart';
import 'package:barbearia/api/api_client.dart';

String _perfilLabel(String? p) {
  if (p == null || p.isEmpty) return '—';
  switch (p.toUpperCase()) {
    case 'DONO':
      return 'Dono';
    case 'RECEPCIONISTA':
    case 'RECEPCAO':
      return 'Recepcionista';
    case 'CABELEIREIRO':
    case 'CABELEREIRO':
      return 'Cabeleireiro';
    default:
      return p;
  }
}

String _statusLabel(String? s) {
  if (s == null || s.isEmpty) return '—';
  switch (s.toUpperCase()) {
    case 'A':
      return 'Aguardando';
    case 'V':
      return 'Ativo';
    case 'N':
      return 'Não aprovado';
    default:
      return s;
  }
}

class ControleUsuariosPage extends StatefulWidget {
  const ControleUsuariosPage({Key? key}) : super(key: key);

  @override
  State<ControleUsuariosPage> createState() => _ControleUsuariosPageState();
}

class _ControleUsuariosPageState extends State<ControleUsuariosPage> {
  List<Map<String, dynamic>> _usuarios = [];
  bool _loading = true;
  String? _error;

  Future<void> _carregar() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final lista = await ApiClient.listUsuariosTodos();
      if (!mounted) return;
      setState(() {
        _usuarios = lista;
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

  @override
  void initState() {
    super.initState();
    _carregar();
  }

  Future<void> _toggleAtivo(Map<String, dynamic> u, bool novoAtivo) async {
    final id = (u['id'] as num?)?.toInt();
    if (id == null) return;
    try {
      await ApiClient.updateUsuario(id, ativo: novoAtivo);
      if (!mounted) return;
      setState(() {
        final idx = _usuarios.indexWhere((e) => (e['id'] as num?)?.toInt() == id);
        if (idx >= 0) _usuarios[idx]['ativo'] = novoAtivo;
      });
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(novoAtivo ? 'Usuário ativado.' : 'Acesso do usuário desativado.'),
          backgroundColor: novoAtivo ? Colors.green : Colors.orange,
        ),
      );
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Erro: ${e.toString().replaceAll('Exception: ', '')}'),
          backgroundColor: Colors.red,
        ),
      );
    }
  }

  Future<void> _excluirUsuario(Map<String, dynamic> u) async {
    final id = (u['id'] as num?)?.toInt();
    if (id == null) return;
    final nome = u['nome']?.toString() ?? 'Usuário';
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: AppColors.loginInputBackground,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        title: const Text('Excluir usuário', style: TextStyle(color: Colors.white)),
        content: Text(
          'Excluir "$nome" do sistema? Esta ação não pode ser desfeita. O histórico pode ser afetado. Prefira desativar o acesso em vez de excluir.',
          style: const TextStyle(color: AppColors.loginTextMuted),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(false),
            child: const Text('Cancelar', style: TextStyle(color: AppColors.loginTextMuted)),
          ),
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(true),
            child: const Text('Excluir', style: TextStyle(color: Colors.red)),
          ),
        ],
      ),
    );
    if (ok != true || !mounted) return;
    try {
      await ApiClient.deleteUsuario(id);
      if (!mounted) return;
      setState(() => _usuarios = _usuarios.where((e) => (e['id'] as num?)?.toInt() != id).toList());
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Usuário excluído.'), backgroundColor: Colors.orange),
      );
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Erro: ${e.toString().replaceAll('Exception: ', '')}'),
          backgroundColor: Colors.red,
        ),
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
          'Controle de usuários',
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
                : _usuarios.isEmpty
                    ? ListView(
                        physics: const AlwaysScrollableScrollPhysics(),
                        children: [
                          SizedBox(height: MediaQuery.of(context).size.height * 0.3),
                          const Center(
                            child: Text(
                              'Nenhum usuário cadastrado',
                              style: TextStyle(color: AppColors.loginTextMuted),
                            ),
                          ),
                        ],
                      )
                    : ListView.builder(
                        physics: const AlwaysScrollableScrollPhysics(),
                        padding: const EdgeInsets.fromLTRB(20, 8, 20, 32),
                        itemCount: _usuarios.length,
                        itemBuilder: (_, i) {
                          final u = _usuarios[i];
                          final id = (u['id'] as num?)?.toInt();
                          final nome = u['nome']?.toString() ?? '—';
                          final login = u['login']?.toString() ?? '—';
                          final perfil = u['perfil']?.toString();
                          final status = u['status']?.toString();
                          final ativo = u['ativo'] == true;
                          return Card(
                            margin: const EdgeInsets.only(bottom: 12),
                            color: AppColors.loginInputBackground,
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                            child: Padding(
                              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                              child: Row(
                                children: [
                                  CircleAvatar(
                                    radius: 26,
                                    backgroundColor: Colors.white12,
                                    child: const Icon(Icons.person, color: AppColors.loginTextMuted, size: 28),
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
                                            fontWeight: FontWeight.w600,
                                            fontSize: 16,
                                          ),
                                        ),
                                        const SizedBox(height: 2),
                                        Text(
                                          login,
                                          style: const TextStyle(color: AppColors.loginTextMuted, fontSize: 13),
                                        ),
                                        const SizedBox(height: 4),
                                        Row(
                                          children: [
                                            Container(
                                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                                              decoration: BoxDecoration(
                                                color: AppColors.loginOrange.withOpacity(0.2),
                                                borderRadius: BorderRadius.circular(8),
                                              ),
                                              child: Text(
                                                _perfilLabel(perfil),
                                                style: const TextStyle(
                                                  color: AppColors.loginOrange,
                                                  fontSize: 11,
                                                  fontWeight: FontWeight.w500,
                                                ),
                                              ),
                                            ),
                                            if (status != null && status.isNotEmpty) ...[
                                              const SizedBox(width: 8),
                                              Text(
                                                _statusLabel(status),
                                                style: TextStyle(
                                                  color: status == 'V' ? Colors.green : Colors.orange.shade300,
                                                  fontSize: 11,
                                                ),
                                              ),
                                            ],
                                          ],
                                        ),
                                      ],
                                    ),
                                  ),
                                  Column(
                                    mainAxisSize: MainAxisSize.min,
                                    children: [
                                      Text(
                                        ativo ? 'Ativo' : 'Inativo',
                                        style: TextStyle(
                                          color: ativo ? Colors.green : Colors.red.shade300,
                                          fontSize: 12,
                                          fontWeight: FontWeight.w500,
                                        ),
                                      ),
                                      Switch(
                                        value: ativo,
                                        onChanged: id == null ? null : (v) => _toggleAtivo(u, v),
                                        activeColor: AppColors.loginOrange,
                                      ),
                                    ],
                                  ),
                                  IconButton(
                                    icon: const Icon(Icons.delete_outline, color: Colors.red, size: 22),
                                    onPressed: id == null ? null : () => _excluirUsuario(u),
                                    tooltip: 'Excluir usuário',
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
