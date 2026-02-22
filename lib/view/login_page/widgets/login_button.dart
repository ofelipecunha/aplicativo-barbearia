import 'package:flutter/material.dart';
import 'package:barbearia/view/bottom_navigator.dart';
import 'package:barbearia/view/home_page/components/colors.dart';
import 'package:barbearia/view/home_page/components/size_config.dart';

const _loginPrimary = Color(0xFFD3AD33);      // cor pedida
const _loginSecondary = Color(0xFFE6C45C);    // leve variação para o gradiente

class LoginButonColor extends StatefulWidget {
  final VoidCallback onLogin;
  final bool enabled;

  const LoginButonColor({Key? key, required this.onLogin, this.enabled = true})
      : super(key: key);

  @override
  _LoginButonColorState createState() => _LoginButonColorState();
}

class _LoginButonColorState extends State<LoginButonColor> {
  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Padding(
      padding: EdgeInsets.fromLTRB(
          SizeConfig.screenWidth!/20.55,
          SizeConfig.screenHeight!/7.59,
          SizeConfig.screenWidth!/20.55,
          SizeConfig.screenHeight!/45.54
      ),
      child: Container(
        decoration: BoxDecoration(
          boxShadow: const [BoxShadow(color: Colors.black26, offset: Offset(0, 4), blurRadius: 5.0)],
          gradient: const LinearGradient(
            begin: Alignment.centerLeft,
            end: Alignment.centerRight,
            stops: [0.0, 1.0],
            colors: [_loginPrimary, _loginSecondary],
          ),
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
          onPressed: widget.enabled ? widget.onLogin : null,
          child: Text(
            "LOGIN",
            style: TextStyle(fontSize: SizeConfig.screenHeight!/42.68,  fontWeight: FontWeight.w700, color: Colors.white,),    
          ),
        ),
      ),
    );
  }
}
