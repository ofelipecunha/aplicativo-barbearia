import 'package:flutter/material.dart';
import 'package:barbearia/view/home_page/components/colors.dart';
import 'package:barbearia/view/home_page/components/size_config.dart';

class UserNameText extends StatefulWidget {
  const UserNameText({Key? key}) : super(key: key);

  @override
  _UserNameTextState createState() => _UserNameTextState();
}

class _UserNameTextState extends State<UserNameText> {
  @override
  Widget build(BuildContext context) {
    String _greeting() {
      final hour = DateTime.now().hour;
      if (hour < 12) return "Bom dia";
      if (hour < 18) return "Boa tarde";
      return "Boa noite";
    }

    return Padding(
      padding: EdgeInsets.fromLTRB(
          SizeConfig.screenWidth! / 14.17,
          SizeConfig.screenHeight! / 23.55,
          SizeConfig.screenWidth! / 11.74,
          SizeConfig.screenHeight! / 68.3),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Padding(
                    padding: EdgeInsets.only(
                        top: SizeConfig.screenHeight! / 85.38,
                        bottom: SizeConfig.screenHeight! / 113.84),
                    child: Text(
                      _greeting(),
                      style: TextStyle(
                          fontSize: SizeConfig.screenHeight! / 29.7,
                          fontWeight: FontWeight.bold,
                          color: Colors.white),
                    ),
                  ),
                  Padding(
                    padding: EdgeInsets.only(
                        bottom: SizeConfig.screenHeight! / 85.38),
                    child: Container(
                      height: SizeConfig.screenHeight! / 22.77,
                      width: SizeConfig.screenWidth! / 13.7,
                      decoration: const BoxDecoration(
                          image: DecorationImage(
                              image:
                                  AssetImage("assets/main/waving-hand.png"))),
                    ),
                  )
                ],
              ),
              Text(
                "Quer agendar um corte?",
                style: TextStyle(
                    fontSize: SizeConfig.screenHeight! / 40.18,
                    color: Colors.white70),
              )
            ],
          ),
          Stack(
            children: [
              Container(
                height: SizeConfig.screenHeight! / 17.07,
                width: SizeConfig.screenWidth! / 5.13,
                decoration: BoxDecoration(
                    color: lightColor.withOpacity(0.5),
                    borderRadius: BorderRadius.circular(30.0)),
              ),
              Container(
                  height: SizeConfig.screenHeight! / 17.07,
                  width: SizeConfig.screenWidth! / 10.28,
                  decoration: BoxDecoration(
                      color: buttonColor.withOpacity(0.5),
                      borderRadius: BorderRadius.circular(30.0)),
                  child: const Icon(
                    Icons.notifications_none,
                    color: Colors.white,
                  )),
              Positioned(
                  right: SizeConfig.screenWidth! / 20.55,
                  bottom: SizeConfig.screenHeight! / 62.01,
                  child: const Text(
                    "3",
                    style: TextStyle(
                        color: Colors.black87, fontWeight: FontWeight.bold),
                  ))
            ],
          ),
        ],
      ),
    );
  }
}
