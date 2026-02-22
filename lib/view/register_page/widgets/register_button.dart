import 'package:flutter/material.dart';
import 'package:barbearia/config/app_colors.dart';
import 'package:barbearia/config/app_typography.dart';
import 'package:barbearia/view/home_page/components/size_config.dart';
import 'package:barbearia/view/login_page/login_page_view.dart';
import 'package:barbearia/api/api_client.dart';

class RegisterButton extends StatefulWidget {
  final TextEditingController nomeCtrl;
  final TextEditingController emailCtrl;
  final TextEditingController senhaCtrl;
  final String? selectedPerfil;

  const RegisterButton({
    Key? key,
    required this.nomeCtrl,
    required this.emailCtrl,
    required this.senhaCtrl,
    required this.selectedPerfil,
  }) : super(key: key);

  @override
  _RegisterButtonState createState() => _RegisterButtonState();
}

class _RegisterButtonState extends State<RegisterButton> {
  bool _isLoading = false;

  Future<void> _handleRegister() async {
    if (widget.nomeCtrl.text.trim().isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Por favor, preencha o nome')),
      );
      return;
    }

    if (widget.emailCtrl.text.trim().isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Por favor, preencha o login')),
      );
      return;
    }

    if (widget.senhaCtrl.text.trim().isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Por favor, crie uma senha')),
      );
      return;
    }

    if (widget.selectedPerfil == null || widget.selectedPerfil!.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Por favor, selecione um perfil')),
      );
      return;
    }

    setState(() => _isLoading = true);

    try {
      await ApiClient.createUsuario(
        nome: widget.nomeCtrl.text.trim(),
        login: widget.emailCtrl.text.trim(),
        senha: widget.senhaCtrl.text.trim(),
        perfil: widget.selectedPerfil!,
      );

      if (!mounted) return;

      showDialog(
        context: context,
        barrierDismissible: false,
        barrierColor: Colors.black.withOpacity(0.7),
        builder: (ctx) {
          return AlertDialog(
            backgroundColor: AppColors.loginBackground,
            insetPadding: EdgeInsets.symmetric(
              horizontal: SizeConfig.screenWidth! / 13.7,
            ),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(24),
            ),
            title: Column(
              children: [
                Icon(
                  Icons.hourglass_top,
                  color: AppColors.loginOrange,
                  size: SizeConfig.screenHeight! / 17,
                ),
                SizedBox(height: SizeConfig.screenHeight! / 68.3),
                Text(
                  'Solicitação enviada',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                    fontSize: SizeConfig.screenHeight! / 36,
                  ),
                ),
              ],
            ),
            content: Text(
              'Sua solicitação de cadastro foi enviada. O administrador irá analisar e, ao aprovar, você poderá fazer login.',
              textAlign: TextAlign.center,
              style: TextStyle(
                color: AppColors.loginTextMuted,
                fontSize: SizeConfig.screenHeight! / 44,
                height: 1.4,
              ),
            ),
            actionsAlignment: MainAxisAlignment.center,
            actionsPadding: EdgeInsets.only(
              bottom: SizeConfig.screenHeight! / 68.3,
              left: SizeConfig.screenWidth! / 20.55,
              right: SizeConfig.screenWidth! / 20.55,
            ),
            actions: [
              SizedBox(
                width: double.infinity,
                child: Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(10),
                    gradient: const LinearGradient(
                      colors: [
                        AppColors.loginOrangeLight,
                        AppColors.loginOrangeDark,
                      ],
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                    ),
                  ),
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.transparent,
                      shadowColor: Colors.transparent,
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                    ),
                    onPressed: () {
                      Navigator.of(ctx).pop();
                      Navigator.pushReplacement(
                        context,
                        MaterialPageRoute(builder: (_) => const LoginPageView()),
                      );
                    },
                    child: const Text(
                      'Voltar ao login',
                      style: TextStyle(
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                ),
              ),
            ],
          );
        },
      );
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
            'Erro ao cadastrar: ${e.toString().replaceAll('Exception: ', '')}',
          ),
          backgroundColor: Colors.red,
        ),
      );
    } finally {
      if (mounted) {
        setState(() => _isLoading = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return SizedBox(
      height: 56,
      child: AbsorbPointer(
        absorbing: _isLoading,
        child: Material(
          color: Colors.transparent,
          child: InkWell(
            onTap: _handleRegister,
            borderRadius: BorderRadius.circular(14),
            child: Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(14),
                gradient: _isLoading
                    ? null
                    : const LinearGradient(
                        colors: [
                          AppColors.loginOrangeLight,
                          AppColors.loginOrangeDark,
                        ],
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                      ),
                color: _isLoading
                    ? AppColors.loginOrange.withOpacity(0.6)
                    : null,
              ),
              alignment: Alignment.center,
              child: _isLoading
                  ? const SizedBox(
                      height: 24,
                      width: 24,
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                        color: Colors.white,
                      ),
                    )
                  : Text(
                      'Criar conta',
                      style: AppTypography.bodyBold.copyWith(
                        color: Colors.white,
                      ),
                    ),
            ),
          ),
        ),
      ),
    );
  }
}
