import 'package:flutter/material.dart';
import 'package:barbearia/view/home_page/components/size_config.dart';

class FoodDescription extends StatelessWidget {
  const FoodDescription({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(top: SizeConfig.screenHeight!/45.54),            
      child: Container(
        child: const Text(
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud eslednjn",
          style: TextStyle(color: Colors.black38),
          textAlign: TextAlign.justify,),
      ),
    );
  }
}
