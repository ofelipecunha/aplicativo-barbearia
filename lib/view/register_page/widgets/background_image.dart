import 'package:flutter/material.dart';
import 'package:barbearia/config/app_colors.dart';
import 'package:barbearia/view/home_page/components/size_config.dart';
import 'package:barbearia/view/login_page/widgets/text_title.dart';

class BackgroundImage extends StatelessWidget {
  const BackgroundImage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Container(
      child: Column(
        children: <Widget>[
          Container(
            height: SizeConfig.screenHeight!/4.268,    
            decoration: const BoxDecoration(
                image: DecorationImage(
                    image: AssetImage('assets/main/fundo.png'),
                    fit: BoxFit.fill
                )
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Center(
                  child: TextTitle(title: "Criar Conta"),
                ),
              ],
            ),
          )
        ],
      ),
    );
  }
}
