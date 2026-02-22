import 'package:flutter/material.dart';
import 'package:barbearia/config/app_colors.dart';
import 'package:barbearia/view/home_page/components/colors.dart';
import 'package:barbearia/view/home_page/components/size_config.dart';

class ForgotPassword extends StatelessWidget {
  final bool themeLight;

  const ForgotPassword({Key? key, this.themeLight = false}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Padding(
      padding: EdgeInsets.only(right: SizeConfig.screenWidth! / 15.3),
      child: Align(
        alignment: Alignment.centerRight,
        child: Text(
          'Esqueceu sua senha?',
          style: TextStyle(
            color: themeLight ? AppColors.primary : textColor,
            fontSize: 14,
            decoration: TextDecoration.underline,
          ),
        ),
      ),
    );
  }
}
