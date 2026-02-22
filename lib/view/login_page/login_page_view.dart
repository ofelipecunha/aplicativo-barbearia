import 'package:flutter/material.dart';
import 'package:barbearia/config/app_colors.dart';
import 'package:barbearia/config/app_typography.dart';
import 'package:barbearia/view/login_page/widgets/text_field.dart';
import 'package:barbearia/view/register_page/register_page_view.dart';
import 'package:barbearia/view/reception_page/reception_home.dart';
import 'package:barbearia/view/barber_page/barber_home.dart';
import 'package:barbearia/view/admin_page/admin_dashboard.dart';
import 'package:barbearia/api/api_client.dart';

/// Tela de login BarberPro: tema escuro, logo laranja e layout premium.
class LoginPageView extends StatefulWidget {
  const LoginPageView({Key? key}) : super(key: key);

  @override
  State<LoginPageView> createState() => _LoginPageViewState();
}

class _LoginPageViewState extends State<LoginPageView> {
  String? _userNome;
  int? _userId;
  final TextEditingController _loginCtrl = TextEditingController();
  final TextEditingController _passCtrl = TextEditingController();
  String? _errorMessage;
  bool _loading = false;

  @override
  void dispose() {
    _loginCtrl.dispose();
    _passCtrl.dispose();
    super.dispose();
  }

  void _goToSetor(BuildContext context, String perfil) {
    Widget page;
    String perfilMapeado = perfil;
    if (perfil == "RECEPCIONISTA") perfilMapeado = "RECEPCAO";

    switch (perfilMapeado) {
      case "DONO":
        page = AdminDashboard(userId: _userId ?? 0, userName: _userNome ?? "");
        break;
      case "RECEPCAO":
        page = ReceptionHome(userId: _userId ?? 0, userName: _userNome ?? "");
        break;
      case "CABELEIREIRO":
      case "CABELEREIRO":
        page = BarberHome(userId: _userId ?? 0, userName: _userNome ?? "", perfil: perfilMapeado);
        break;
      default:
        page = const Scaffold(
          backgroundColor: AppColors.background,
          body: Center(
            child: Text("Perfil não reconhecido", style: TextStyle(color: AppColors.textPrimary)),
          ),
        );
    }
    Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => page));
  }

  Future<void> _acessar() async {
    final login = _loginCtrl.text.trim();
    final senha = _passCtrl.text.trim();

    setState(() {
      _errorMessage = null;
      _loading = true;
    });

    if (login.isEmpty || senha.isEmpty) {
      setState(() {
        _errorMessage = 'Informe login e senha.';
        _loading = false;
      });
      return;
    }

    try {
      final resp = await ApiClient.login(login: login, senha: senha);
      _userNome = resp["nome"]?.toString() ?? "";
      final id = resp["id"];
      _userId = id != null ? (id as num).toInt() : null;
      final perfil = resp["perfil"]?.toString() ?? "";
      if (!mounted) return;
      _goToSetor(context, perfil);
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _errorMessage = 'Login ou senha incorretos.';
        _loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.loginBackground,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: ConstrainedBox(
            constraints: BoxConstraints(
              minHeight: MediaQuery.of(context).size.height -
                  MediaQuery.of(context).padding.top -
                  MediaQuery.of(context).padding.bottom,
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const SizedBox(height: 32),
                // Logo (sem quadrado laranja)
                Center(
                  child: Image.asset(
                    'assets/main/logoWl.png',
                    width: 240,
                    height: 240,
                    fit: BoxFit.contain,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  'Wender Barbearia',
                  textAlign: TextAlign.center,
                  style: AppTypography.heading2.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Text(
                  'Seu visual, nosso compromisso.',
                  textAlign: TextAlign.center,
                  style: AppTypography.bodyRegular.copyWith(
                    color: AppColors.loginTextMuted,
                    fontSize: 14,
                  ),
                ),
                const SizedBox(height: 40),
                // Campos de entrada
                LoginTextField(
                  loginController: _loginCtrl,
                  passController: _passCtrl,
                  loginDark: true,
                  loginHint: 'Digite seu login',
                ),
                const SizedBox(height: 12),
                // Esqueceu senha - alinhado à direita
                Align(
                  alignment: Alignment.centerRight,
                  child: GestureDetector(
                    onTap: () {},
                    child: Text(
                      'Esqueceu sua senha?',
                      style: AppTypography.caption.copyWith(
                        color: AppColors.loginOrange,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                ),
                if (_errorMessage != null) ...[
                  const SizedBox(height: 16),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                    decoration: BoxDecoration(
                      color: AppColors.error.withOpacity(0.15),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(
                        color: AppColors.error.withOpacity(0.4),
                      ),
                    ),
                    child: Row(
                      children: [
                        Icon(Icons.error_outline, color: AppColors.error, size: 20),
                        const SizedBox(width: 10),
                        Expanded(
                          child: Text(
                            _errorMessage!,
                            style: AppTypography.caption.copyWith(color: Colors.red.shade300),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
                const SizedBox(height: 28),
                // Botão Entrar com gradiente
                SizedBox(
                  height: 56,
                  child: AbsorbPointer(
                    absorbing: _loading,
                    child: Material(
                      color: Colors.transparent,
                      child: InkWell(
                        onTap: _acessar,
                        borderRadius: BorderRadius.circular(14),
                      child: Container(
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(14),
                          gradient: _loading
                              ? null
                              : const LinearGradient(
                                  colors: [
                                    AppColors.loginOrangeLight,
                                    AppColors.loginOrangeDark,
                                  ],
                                  begin: Alignment.topCenter,
                                  end: Alignment.bottomCenter,
                                ),
                          color: _loading ? AppColors.loginOrange.withOpacity(0.6) : null,
                        ),
                        alignment: Alignment.center,
                        child: _loading
                            ? const SizedBox(
                                height: 24,
                                width: 24,
                                child: CircularProgressIndicator(
                                  strokeWidth: 2,
                                  color: Colors.white,
                                ),
                              )
                            : Text(
                                'Entrar',
                                style: AppTypography.bodyBold.copyWith(
                                  color: Colors.white,
                                ),
                              ),
                      ),
                    ),
                    ),
                  ),
                ),
                // Divisor OU
                const SizedBox(height: 16),
                // Criar conta
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      'Não possui uma conta? ',
                      style: AppTypography.bodyRegular.copyWith(
                        color: AppColors.loginTextMuted,
                      ),
                    ),
                    GestureDetector(
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(builder: (_) => const RegisterPageView()),
                        );
                      },
                      child: Text(
                        'Criar conta',
                        style: AppTypography.bodyBold.copyWith(
                          color: AppColors.loginOrange,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 48),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
