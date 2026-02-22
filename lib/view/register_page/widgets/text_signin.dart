import 'package:flutter/material.dart';
import 'package:barbearia/config/app_colors.dart';
import 'package:barbearia/config/app_typography.dart';
import 'package:barbearia/view/login_page/login_page_view.dart';

class TextSignIn extends StatelessWidget {
  const TextSignIn({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          'Já tem uma conta? ',
          style: AppTypography.bodyRegular.copyWith(
            color: AppColors.loginTextMuted,
          ),
        ),
        GestureDetector(
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (_) => const LoginPageView()),
            );
          },
          child: Text(
            'Entrar',
            style: AppTypography.bodyBold.copyWith(
              color: AppColors.loginOrange,
            ),
          ),
        ),
      ],
    );
  }
}