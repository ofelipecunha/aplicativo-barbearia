import 'package:flutter/material.dart';
import 'package:barbearia/config/app_colors.dart';
import 'package:barbearia/config/app_typography.dart';
import 'package:barbearia/view/login_page/widgets/text_field_widget/text_field_input.dart';
import 'package:barbearia/view/login_page/widgets/text_field_widget/text_field_password.dart';
import 'widgets/register_button.dart';
import 'widgets/text_signin.dart';

class RegisterPageView extends StatefulWidget {
  const RegisterPageView({Key? key}) : super(key: key);

  @override
  _RegisterPageViewState createState() => _RegisterPageViewState();
}

class _RegisterPageViewState extends State<RegisterPageView> {
  final TextEditingController nomeCtrl = TextEditingController();
  final TextEditingController emailCtrl = TextEditingController();
  final TextEditingController senhaCtrl = TextEditingController();
  String? selectedPerfil = '';

  @override
  void dispose() {
    nomeCtrl.dispose();
    emailCtrl.dispose();
    senhaCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.loginBackground,
      body: SafeArea(
        child: Column(
          children: [
            // Header com botão voltar e título
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
              child: Stack(
                alignment: Alignment.center,
                children: [
                  Align(
                    alignment: Alignment.centerLeft,
                    child: IconButton(
                      onPressed: () => Navigator.pop(context),
                      icon: const Icon(
                        Icons.arrow_back_ios,
                        color: Colors.white,
                        size: 22,
                      ),
                    ),
                  ),
                  Text(
                    'Criar sua conta',
                    style: AppTypography.heading4.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
            ),
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(horizontal: 24),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    const SizedBox(height: 24),
                    TextFieldInput(
                      text: 'Digite seu nome',
                      iconName: Icons.person_outline,
                      ltext: 'Nome completo',
                      controller: nomeCtrl,
                      loginDark: true,
                    ),
                    TextFieldInput(
                      text: 'usuario',
                      iconName: Icons.person_outline,
                      ltext: 'Login',
                      controller: emailCtrl,
                      loginDark: true,
                    ),
                    // Dropdown Perfil
                    Text(
                      'Perfil',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 16,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Container(
                      decoration: BoxDecoration(
                        color: AppColors.loginInputBackground,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: DropdownButtonFormField<String>(
                        value: selectedPerfil,
                        decoration: InputDecoration(
                          prefixIcon: Icon(
                            Icons.person_outline,
                            color: AppColors.loginTextMuted,
                            size: 22,
                          ),
                          border: InputBorder.none,
                          contentPadding: const EdgeInsets.symmetric(
                            horizontal: 16,
                            vertical: 18,
                          ),
                        ),
                        dropdownColor: AppColors.loginInputBackground,
                        style: const TextStyle(color: Colors.white),
                        icon: Icon(
                          Icons.arrow_drop_down,
                          color: AppColors.loginTextMuted,
                        ),
                        items: const [
                          DropdownMenuItem<String>(
                            value: '',
                            child: Text('Selecione seu perfil'),
                          ),
                          // DONO/ADMINISTRADOR oculto: só criado internamente; cadastro público só RECEPCIONISTA ou CABELEIREIRO
                          DropdownMenuItem<String>(
                            value: 'RECEPCIONISTA',
                            child: Text('RECEPCIONISTA'),
                          ),
                          DropdownMenuItem<String>(
                            value: 'CABELEIREIRO',
                            child: Text('CABELEIREIRO'),
                          ),
                        ],
                        onChanged: (v) => setState(() => selectedPerfil = v),
                      ),
                    ),
                    TextFieldPassword(
                      controller: senhaCtrl,
                      loginDark: true,
                      hintText: 'Crie uma senha forte',
                      labelText: 'Senha',
                    ),
                    const SizedBox(height: 28),
                    RegisterButton(
                      nomeCtrl: nomeCtrl,
                      emailCtrl: emailCtrl,
                      senhaCtrl: senhaCtrl,
                      selectedPerfil: selectedPerfil,
                    ),
                    const SizedBox(height: 24),
                    const TextSignIn(),
                    const SizedBox(height: 32),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
