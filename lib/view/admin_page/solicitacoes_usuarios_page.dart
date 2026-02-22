import 'package:flutter/material.dart';
import 'package:barbearia/config/app_colors.dart';
import 'package:barbearia/api/api_client.dart';

/// Tela de solicitações de usuários (aguardando aprovação). Acesso: DONO pelo Perfil.
class SolicitacoesUsuariosPage extends StatefulWidget {
  const SolicitacoesUsuariosPage({Key? key}) : super(key: key);

  @override
  State<SolicitacoesUsuariosPage> createState() => _SolicitacoesUsuariosPageState();
}

class _SolicitacoesUsuariosPageState extends State<SolicitacoesUsuariosPage> {
  List<Map<String, dynamic>> _lista = [];
  bool _loading = true;
  String? _error;

  Future<void> _carregar() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final lista = await ApiClient.getSolicitacoesUsuario();
      if (!mounted) return;
      setState(() {
        _lista = lista;
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

  Future<void> _aprovar(int id) async {
    try {
      await ApiClient.aprovarUsuario(id);
      if (!mounted) return;
      setState(() => _lista = _lista.where((e) => (e['id'] as num?)?.toInt() != id).toList());
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Usuário aprovado.'), backgroundColor: Colors.green),
      );
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Erro: ${e.toString().replaceAll('Exception: ', '')}'), backgroundColor: Colors.red),
      );
    }
  }

  Future<void> _rejeitar(int id) async {
    try {
      await ApiClient.rejeitarUsuario(id);
      if (!mounted) return;
      setState(() => _lista = _lista.where((e) => (e['id'] as num?)?.toInt() != id).toList());
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Solicitação rejeitada.'), backgroundColor: Colors.orange),
      );
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Erro: ${e.toString().replaceAll('Exception: ', '')}'), backgroundColor: Colors.red),
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
          'Solicitações de Usuários',
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
                          SizedBox(height: MediaQuery.of(context).size.height * 0.25),
                          const Center(
                            child: Text(
                              'Nenhuma solicitação aguardando',
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
                          final u = _lista[i];
                          final id = (u['id'] as num?)?.toInt();
                          final nome = u['nome']?.toString() ?? '';
                          final login = u['login']?.toString() ?? '';
                          final perfil = u['perfil']?.toString() ?? '';
                          return Padding(
                            padding: const EdgeInsets.only(bottom: 12),
                            child: Container(
                              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                              decoration: BoxDecoration(
                                color: Colors.white.withOpacity(0.05),
                                borderRadius: BorderRadius.circular(12),
                                border: Border.all(color: Colors.white12),
                              ),
                              child: Row(
                                children: [
                                  CircleAvatar(
                                    radius: 22,
                                    backgroundColor: Colors.white12,
                                    child: const Icon(Icons.person_outline, color: Colors.white54, size: 24),
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
                                            fontSize: 14,
                                          ),
                                        ),
                                        Text(
                                          login,
                                          style: const TextStyle(color: AppColors.loginTextMuted, fontSize: 12),
                                          maxLines: 1,
                                          overflow: TextOverflow.ellipsis,
                                        ),
                                        if (perfil.isNotEmpty)
                                          Text(
                                            perfil,
                                            style: TextStyle(color: Colors.white38, fontSize: 11),
                                          ),
                                      ],
                                    ),
                                  ),
                                  IconButton(
                                    icon: const Icon(Icons.check_circle, color: Colors.green, size: 28),
                                    onPressed: id == null ? null : () => _aprovar(id),
                                    tooltip: 'Aprovar',
                                  ),
                                  IconButton(
                                    icon: const Icon(Icons.cancel, color: Colors.red, size: 28),
                                    onPressed: id == null ? null : () => _rejeitar(id),
                                    tooltip: 'Rejeitar',
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
