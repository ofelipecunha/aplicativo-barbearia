import 'package:flutter/material.dart';
import 'package:barbearia/view/home_page/components/size_config.dart';
import 'package:barbearia/view/success_page/widgets/lottie_widget.dart';
import 'package:barbearia/view/success_page/widgets/ok_button.dart';
import 'package:barbearia/view/success_page/widgets/router_text.dart';

class CheckCart extends StatelessWidget {
  const CheckCart({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Column(
          children: [
            const LottieWidget(),
            const RouterText(),
            SizedBox(height: SizeConfig.screenHeight!/68.3,),
            const OkButton(),
          ]
      ),
    );
  }
}