import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:barbearia/config/app_colors.dart';
import 'package:barbearia/config/app_typography.dart';
import 'package:barbearia/api/api_client.dart';
import 'package:barbearia/config/api_config.dart';
import 'package:barbearia/view/login_page/login_page_view.dart';
import 'package:barbearia/view/admin_page/controle_usuarios_page.dart';
import 'package:barbearia/view/admin_page/solicitacoes_usuarios_page.dart';

/// Mapeia perfil do backend para label amigável.
String _perfilLabel(String? perfil) {
  if (perfil == null || perfil.isEmpty) return 'Usuário';
  switch (perfil.toUpperCase()) {
    case 'CABELEIREIRO':
    case 'CABELEREIRO':
      return 'Barbeiro Master';
    case 'RECEPCIONISTA':
    case 'RECEPCAO':
      return 'Recepcionista';
    case 'DONO':
      return 'Dono';
    default:
      return perfil;
  }
}

class PerfilPage extends StatefulWidget {
  final int userId;
  final String userName;
  final String? perfil;

  const PerfilPage({
    Key? key,
    required this.userId,
    required this.userName,
    this.perfil,
  }) : super(key: key);

  @override
  State<PerfilPage> createState() => _PerfilPageState();
}

class _PerfilPageState extends State<PerfilPage> {
  String _nome = '';
  String? _avatar;
  String? _perfil;
  bool _loading = true;
  @override
  void initState() {
    super.initState();
    _nome = widget.userName;
    _perfil = widget.perfil;
    _carregarUsuario();
  }

  Future<void> _carregarUsuario() async {
    if (widget.userId <= 0) {
      setState(() => _loading = false);
      return;
    }
    try {
      final u = await ApiClient.getUsuario(widget.userId);
      if (!mounted) return;
      setState(() {
        _nome = u['nome']?.toString() ?? widget.userName;
        _perfil = u['perfil']?.toString() ?? widget.perfil;
        _avatar = u['avatar']?.toString();
        if (_avatar != null && _avatar!.isNotEmpty && !_avatar!.startsWith('http')) {
          _avatar = '${serverBase}/$_avatar';
        }
        _loading = false;
      });
    } catch (_) {
      if (mounted) setState(() => _loading = false);
    }
  }

  Future<void> _alterarImagem() async {
    final picker = ImagePicker();
    final x = await picker.pickImage(source: ImageSource.gallery);
    if (x == null || widget.userId <= 0) return;
    try {
      final path = await ApiClient.uploadAvatar(widget.userId, File(x.path));
      if (!mounted) return;
      setState(() {
        _avatar = path.startsWith('http') ? path : '$serverBase/$path';
      });
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Foto atualizada!')),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(e.toString().replaceAll('Exception: ', ''))),
        );
      }
    }
  }

  Future<void> _sair() async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: AppColors.loginInputBackground,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        title: const Text('Sair da conta', style: TextStyle(color: Colors.white)),
        content: const Text(
          'Deseja realmente sair?',
          style: TextStyle(color: AppColors.loginTextMuted),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(false),
            child: const Text('Não', style: TextStyle(color: AppColors.loginTextMuted)),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: AppColors.loginOrange),
            onPressed: () => Navigator.of(ctx).pop(true),
            child: const Text('Sim', style: TextStyle(color: Colors.white)),
          ),
        ],
      ),
    );
    if (ok == true) {
      Navigator.pushAndRemoveUntil(
        context,
        MaterialPageRoute(builder: (_) => const LoginPageView()),
        (route) => false,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.loginBackground,
      appBar: AppBar(
        backgroundColor: AppColors.loginBackground,
        elevation: 0,
        title: const SizedBox.shrink(),
        titleSpacing: 0,
      ),
      body: _loading
          ? const Center(
              child: CircularProgressIndicator(color: AppColors.loginOrange),
            )
          : SingleChildScrollView(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Column(
                children: [
                  const SizedBox(height: 24),
                  _buildProfileSection(),
                  const SizedBox(height: 32),
                  _menuItem(
                    icon: Icons.person_outline,
                    label: 'Dados Pessoais',
                    onTap: () => _abrirDadosPessoais(),
                  ),
                  const SizedBox(height: 10),
                  _menuItem(
                    icon: Icons.lock_outline,
                    label: 'Segurança e Senha',
                    onTap: () => _abrirSegurancaSenha(),
                  ),
                  if (widget.perfil == 'DONO') ...[
                    const SizedBox(height: 10),
                    _menuItem(
                      icon: Icons.person_add_outlined,
                      label: 'Solicitações de Usuários',
                      onTap: () => _abrirSolicitacoesUsuarios(),
                    ),
                    const SizedBox(height: 10),
                    _menuItem(
                      icon: Icons.people_outline,
                      label: 'Controle de usuários',
                      onTap: () => _abrirControleUsuarios(),
                    ),
                  ],
                  const SizedBox(height: 32),
                  _buildSairButton(),
                  const SizedBox(height: 40),
                ],
              ),
            ),
    );
  }

  Widget _buildProfileSection() {
    return Column(
      children: [
        Stack(
          children: [
            Container(
              width: 120,
              height: 120,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(color: AppColors.loginOrange, width: 3),
                color: AppColors.loginInputBackground,
              ),
              child: ClipOval(
                child: _avatar != null
                    ? Image.network(
                        _avatar!,
                        fit: BoxFit.cover,
                        width: 120,
                        height: 120,
                        errorBuilder: (_, __, ___) => const Icon(
                          Icons.person,
                          size: 56,
                          color: AppColors.loginTextMuted,
                        ),
                      )
                    : Image.asset(
                        'assets/main/avatar.png',
                        fit: BoxFit.cover,
                        errorBuilder: (_, __, ___) => const Icon(
                          Icons.person,
                          size: 56,
                          color: AppColors.loginTextMuted,
                        ),
                      ),
              ),
            ),
            Positioned(
              bottom: 0,
              right: 0,
              child: GestureDetector(
                onTap: _alterarImagem,
                child: Container(
                  width: 36,
                  height: 36,
                  decoration: const BoxDecoration(
                    color: AppColors.loginOrange,
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(Icons.edit, color: Colors.white, size: 18),
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: 16),
        Text(
          _nome,
          style: const TextStyle(
            color: Colors.white,
            fontSize: 22,
            fontWeight: FontWeight.bold,
          ),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 4),
        Text(
          _perfilLabel(_perfil),
          style: const TextStyle(
            color: AppColors.loginTextMuted,
            fontSize: 15,
          ),
          textAlign: TextAlign.center,
        ),
      ],
    );
  }

  Widget _menuItem({
    required IconData icon,
    required String label,
    String? badge,
    required VoidCallback onTap,
  }) {
    return Material(
      color: AppColors.loginInputBackground,
      borderRadius: BorderRadius.circular(14),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(14),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
          child: Row(
            children: [
              Icon(icon, color: AppColors.loginOrange, size: 24),
              const SizedBox(width: 14),
              Expanded(
                child: Row(
                  children: [
                    Text(
                      label,
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 16,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    if (badge != null) ...[
                      const SizedBox(width: 8),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                        decoration: BoxDecoration(
                          color: AppColors.loginOrange,
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: Text(
                          badge,
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 11,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ],
                  ],
                ),
              ),
              const Icon(Icons.chevron_right, color: AppColors.loginTextMuted, size: 24),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSairButton() {
    return SizedBox(
      width: double.infinity,
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: _sair,
          borderRadius: BorderRadius.circular(14),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
            decoration: BoxDecoration(
              color: AppColors.loginInputBackground,
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: Colors.red.withOpacity(0.4)),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(Icons.logout, color: Colors.red[400], size: 22),
                const SizedBox(width: 10),
                Text(
                  'Sair da conta',
                  style: TextStyle(
                    color: Colors.red[400],
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  void _abrirDadosPessoais() {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => DadosPessoaisPage(
          userId: widget.userId,
          nomeInicial: _nome,
          perfilInicial: _perfil ?? '',
          onSaved: () {
            _carregarUsuario();
          },
        ),
      ),
    );
  }

  void _abrirSegurancaSenha() {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => SegurancaSenhaPage(userId: widget.userId),
      ),
    );
  }

  void _abrirControleUsuarios() {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => const ControleUsuariosPage(),
      ),
    );
  }

  void _abrirSolicitacoesUsuarios() {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => const SolicitacoesUsuariosPage(),
      ),
    );
  }

}

/// Tela de Dados Pessoais: editar nome e perfil.
class DadosPessoaisPage extends StatefulWidget {
  final int userId;
  final String nomeInicial;
  final String perfilInicial;
  final VoidCallback onSaved;

  const DadosPessoaisPage({
    Key? key,
    required this.userId,
    required this.nomeInicial,
    required this.perfilInicial,
    required this.onSaved,
  }) : super(key: key);

  @override
  State<DadosPessoaisPage> createState() => _DadosPessoaisPageState();
}

class _DadosPessoaisPageState extends State<DadosPessoaisPage> {
  late TextEditingController _nomeCtrl;
  bool _loading = false;
  Map<String, dynamic>? _usuario;

  @override
  void initState() {
    super.initState();
    _nomeCtrl = TextEditingController(text: widget.nomeInicial);
    _carregar();
  }

  Future<void> _carregar() async {
    if (widget.userId <= 0) return;
    try {
      final u = await ApiClient.getUsuario(widget.userId);
      if (mounted) {
        setState(() {
          _usuario = u;
          _nomeCtrl.text = u['nome']?.toString() ?? widget.nomeInicial;
        });
      }
    } catch (_) {}
  }

  @override
  void dispose() {
    _nomeCtrl.dispose();
    super.dispose();
  }

  Future<void> _salvar() async {
    final nome = _nomeCtrl.text.trim();
    if (nome.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Nome é obrigatório')),
      );
      return;
    }
    setState(() => _loading = true);
    try {
      await ApiClient.updateUsuario(widget.userId, nome: nome);
      if (!mounted) return;
      widget.onSaved();
      Navigator.pop(context);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Dados salvos com sucesso!')),
      );
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(e.toString().replaceAll('Exception: ', ''))),
        );
      }
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.loginBackground,
      appBar: AppBar(
        backgroundColor: AppColors.loginBackground,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text(
          'Dados Pessoais',
          style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            TextField(
              controller: _nomeCtrl,
              style: const TextStyle(color: Colors.white),
              decoration: InputDecoration(
                labelText: 'Nome',
                labelStyle: const TextStyle(color: AppColors.loginTextMuted),
                filled: true,
                fillColor: AppColors.loginInputBackground,
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: BorderSide(color: Colors.grey.shade700),
                ),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: const BorderSide(color: AppColors.loginOrange, width: 2),
                ),
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'Login: ${_usuario?['login'] ?? ''}',
              style: const TextStyle(color: AppColors.loginTextMuted, fontSize: 14),
            ),
            const SizedBox(height: 32),
            SizedBox(
              height: 50,
              child: ElevatedButton(
                onPressed: _loading ? null : _salvar,
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.loginOrange,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                child: _loading
                    ? const SizedBox(height: 24, width: 24, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                    : const Text('Salvar', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w600)),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// Tela de Segurança e Senha: alterar senha.
class SegurancaSenhaPage extends StatefulWidget {
  final int userId;

  const SegurancaSenhaPage({Key? key, required this.userId}) : super(key: key);

  @override
  State<SegurancaSenhaPage> createState() => _SegurancaSenhaPageState();
}

class _SegurancaSenhaPageState extends State<SegurancaSenhaPage> {
  final _senhaAtualCtrl = TextEditingController();
  final _novaSenhaCtrl = TextEditingController();
  final _confirmarCtrl = TextEditingController();
  bool _loading = false;
  bool _obscureAtual = true;
  bool _obscureNova = true;
  bool _obscureConf = true;

  @override
  void dispose() {
    _senhaAtualCtrl.dispose();
    _novaSenhaCtrl.dispose();
    _confirmarCtrl.dispose();
    super.dispose();
  }

  Future<void> _alterar() async {
    final atual = _senhaAtualCtrl.text;
    final nova = _novaSenhaCtrl.text;
    final conf = _confirmarCtrl.text;
    if (atual.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Informe a senha atual')),
      );
      return;
    }
    if (nova.length < 4) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Nova senha deve ter no mínimo 4 caracteres')),
      );
      return;
    }
    if (nova != conf) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Nova senha e confirmação não conferem')),
      );
      return;
    }
    setState(() => _loading = true);
    try {
      await ApiClient.alterarSenha(
        widget.userId,
        senhaAtual: atual,
        novaSenha: nova,
      );
      if (!mounted) return;
      Navigator.pop(context);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Senha alterada com sucesso!')),
      );
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(e.toString().replaceAll('Exception: ', ''))),
        );
      }
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  InputDecoration _decoration(String label) {
    return InputDecoration(
      labelText: label,
      labelStyle: const TextStyle(color: AppColors.loginTextMuted),
      filled: true,
      fillColor: AppColors.loginInputBackground,
      border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: BorderSide(color: Colors.grey.shade700),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: const BorderSide(color: AppColors.loginOrange, width: 2),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.loginBackground,
      appBar: AppBar(
        backgroundColor: AppColors.loginBackground,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text(
          'Segurança e Senha',
          style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            TextField(
              controller: _senhaAtualCtrl,
              obscureText: _obscureAtual,
              style: const TextStyle(color: Colors.white),
              decoration: _decoration('Senha atual').copyWith(
                suffixIcon: IconButton(
                  icon: Icon(_obscureAtual ? Icons.visibility_off : Icons.visibility, color: AppColors.loginTextMuted),
                  onPressed: () => setState(() => _obscureAtual = !_obscureAtual),
                ),
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: _novaSenhaCtrl,
              obscureText: _obscureNova,
              style: const TextStyle(color: Colors.white),
              decoration: _decoration('Nova senha').copyWith(
                suffixIcon: IconButton(
                  icon: Icon(_obscureNova ? Icons.visibility_off : Icons.visibility, color: AppColors.loginTextMuted),
                  onPressed: () => setState(() => _obscureNova = !_obscureNova),
                ),
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: _confirmarCtrl,
              obscureText: _obscureConf,
              style: const TextStyle(color: Colors.white),
              decoration: _decoration('Confirmar nova senha').copyWith(
                suffixIcon: IconButton(
                  icon: Icon(_obscureConf ? Icons.visibility_off : Icons.visibility, color: AppColors.loginTextMuted),
                  onPressed: () => setState(() => _obscureConf = !_obscureConf),
                ),
              ),
            ),
            const SizedBox(height: 32),
            SizedBox(
              height: 50,
              child: ElevatedButton(
                onPressed: _loading ? null : _alterar,
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.loginOrange,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                child: _loading
                    ? const SizedBox(height: 24, width: 24, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                    : const Text('Alterar senha', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w600)),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
