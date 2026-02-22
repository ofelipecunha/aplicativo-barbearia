import 'package:flutter/material.dart';
import 'package:barbearia/config/app_colors.dart';
import 'package:barbearia/view/home_page/components/size_config.dart';
import 'package:barbearia/view/login_page/login_page_view.dart';

class LoginButton extends StatefulWidget {
  const LoginButton({Key? key}) : super(key: key);

  @override
  _LoginButtonState createState() => _LoginButtonState();
}

class _LoginButtonState extends State<LoginButton> {
  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Padding(
      padding: EdgeInsets.fromLTRB(
          SizeConfig.screenWidth!/20.55,
          0,
          SizeConfig.screenWidth!/20.55,
          SizeConfig.screenHeight!/45.54),
      child: Container(
        decoration: BoxDecoration(
          color: AppColors.primary,
          borderRadius: BorderRadius.circular(10),
        ),
        child: ElevatedButton(
          style: ButtonStyle(
            shape: WidgetStateProperty.all<RoundedRectangleBorder>(
              RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10.0),
              ),
            ),
            minimumSize: WidgetStateProperty.all(Size(SizeConfig.screenWidth!/1.37, 56)),
            backgroundColor: WidgetStateProperty.all(Colors.transparent),
            shadowColor: WidgetStateProperty.all(Colors.transparent),
            foregroundColor: WidgetStateProperty.all(AppColors.primaryButtonText),
          ),
          onPressed: () {
            Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => const LoginPageView()));
          },
          child: const Text(
            "Entrar",
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.w500, color: AppColors.primaryButtonText),
          ),
        ),
      ),
    );
  }
}
