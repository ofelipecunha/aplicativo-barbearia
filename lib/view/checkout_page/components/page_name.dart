import 'package:flutter/material.dart';
import 'package:barbearia/view/home_page/components/size_config.dart';

class PageName extends StatelessWidget {
  String text_name;
  PageName({super.key, required this.text_name});

  @override
  Widget build(BuildContext context) {
    return  Padding(
      padding: EdgeInsets.fromLTRB(
          SizeConfig.screenWidth!/27.4,               
          SizeConfig.screenHeight!/341.5,             
          SizeConfig.screenWidth!/20.55,              
          SizeConfig.screenHeight!/68.3               
      ),
      child: Text(text_name, style: TextStyle(fontSize: SizeConfig.screenHeight!/40.18, fontWeight: FontWeight.w500, color: Colors.black54),),   
    );
  }
}
