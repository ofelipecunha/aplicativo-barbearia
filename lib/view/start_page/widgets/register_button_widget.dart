import 'package:flutter/material.dart';
import 'package:barbearia/view/home_page/components/colors.dart';
import 'package:barbearia/view/home_page/components/size_config.dart';
import 'package:barbearia/view/register_page/register_page_view.dart';

class RegisterButtonWidget extends StatefulWidget {
  const RegisterButtonWidget({Key? key}) : super(key: key);

  @override
  _RegisterButtonWidgetState createState() => _RegisterButtonWidgetState();
}

class _RegisterButtonWidgetState extends State<RegisterButtonWidget> {
  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Padding(
      padding: EdgeInsets.fromLTRB(
          SizeConfig.screenWidth!/20.55,
          0,
          SizeConfig.screenWidth!/20.55,
          SizeConfig.screenHeight!/34.15
      ),
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white, // botão CADASTRAR branco
          borderRadius: BorderRadius.circular(30),
        ),
        child: ElevatedButton(
          style: ButtonStyle(
            shape: WidgetStateProperty.all<RoundedRectangleBorder>(
              RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(20.0),
              ),
            ),
            minimumSize: WidgetStateProperty.all(Size(SizeConfig.screenWidth!/1.37, SizeConfig.screenHeight!/13.66)),
            backgroundColor: WidgetStateProperty.all(Colors.transparent),
            shadowColor: WidgetStateProperty.all(Colors.transparent),
          ),
          onPressed: () {
            Navigator.push(context, MaterialPageRoute(builder: (context) => const RegisterPageView()));
          },
          child: Text(
            "Cadastrar",
            style: TextStyle(color: buttonColor, fontSize: SizeConfig.screenHeight!/42.69,  fontWeight: FontWeight.w700),   /// 16
          ),
        ),
      ),
    );
  }
}
