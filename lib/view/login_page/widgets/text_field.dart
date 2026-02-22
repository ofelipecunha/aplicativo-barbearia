import 'package:flutter/material.dart';
import 'package:barbearia/view/login_page/widgets/text_field_widget/text_field_input.dart';
import 'package:barbearia/view/login_page/widgets/text_field_widget/text_field_password.dart';

class LoginTextField extends StatelessWidget {
  final TextEditingController loginController;
  final TextEditingController passController;
  final bool themeLight;
  final bool loginDark;
  final String? loginHint;
  /// Borda e placeholder laranja no campo de login (estilo antigo).
  final bool orangeBorderAndHint;

  const LoginTextField({
    Key? key,
    required this.loginController,
    required this.passController,
    this.themeLight = false,
    this.loginDark = false,
    this.loginHint,
    this.orangeBorderAndHint = false,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        TextFieldInput(
          text: loginHint ?? 'Login',
          iconName: Icons.mail_outline,
          ltext: loginDark ? 'Login' : 'Login',
          controller: loginController,
          themeLight: themeLight,
          loginDark: loginDark,
          orangeBorderAndHint: orangeBorderAndHint,
        ),
        TextFieldPassword(
          controller: passController,
          themeLight: themeLight,
          loginDark: loginDark,
        ),
      ],
    );
  }
}
