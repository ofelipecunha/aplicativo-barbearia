import 'package:flutter/material.dart';
import 'package:barbearia/view/home_page/components/colors.dart';
import 'package:barbearia/view/home_page/components/size_config.dart';
import 'package:barbearia/view/profile_page/components/CustomShape.dart';

class TopCustomShape extends StatefulWidget {
  const TopCustomShape({Key? key}) : super(key: key);

  @override
  _TopCustomShapeState createState() => _TopCustomShapeState();
}

class _TopCustomShapeState extends State<TopCustomShape> {
  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: SizeConfig.screenHeight!/2.84,               
      child: Stack(
        children: [
          ClipPath(
            clipper: CustomShape(),
            child: Container(
              height: SizeConfig.screenHeight!/4.56,       
              color: buttonColor,
            ),
          ),
          Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                Container(
                  margin: const EdgeInsets.only(bottom: 10),
                  height: SizeConfig.screenHeight!/4.88,         
                  width: SizeConfig.screenWidth!/2.93,           
                  decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      border: Border.all(color: Colors.white, width: SizeConfig.screenWidth!/51.37),
                      color: Colors.white,
                      image: const DecorationImage(
                          image: AssetImage("assets/main/avatar.png")
                      )
                  ),
                ),
                const Text("Name Surname", style: TextStyle(fontSize: 22),),
                SizedBox(height: SizeConfig.screenHeight!/136.6,),             
                const Text("test@gmail.com", style: TextStyle(fontWeight: FontWeight.w400, color: Colors.black45),)
              ],
            ),
          )
        ],
      ),
    );
  }
}
