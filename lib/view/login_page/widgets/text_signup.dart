import 'package:flutter/material.dart';
import 'package:barbearia/view/home_page/components/colors.dart';
import 'package:barbearia/view/home_page/components/size_config.dart';
import 'package:barbearia/view/register_page/register_page_view.dart';

class TextSignUp extends StatelessWidget {
  const TextSignUp({super.key});

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Padding(
      padding: EdgeInsets.fromLTRB(SizeConfig.screenWidth! / 20.55,
          SizeConfig.screenHeight! / 136.6, SizeConfig.screenWidth! / 20.55, 0),
      child: Container(
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              "Não tem conta? ",
              style: TextStyle(color: texthint),
            ),
            GestureDetector(
              onTap: () {
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => const RegisterPageView()));
              },
              child: Text(
                "Cadastre-se",
                style: TextStyle(
                    color: buttonColor,
                    fontWeight: FontWeight.w600,
                    fontSize: SizeConfig.screenHeight! / 45.54),
              ),
            )
          ],
        ),
      ),
    );
  }
}
