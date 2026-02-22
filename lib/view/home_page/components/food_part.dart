import 'package:flutter/material.dart';
import 'package:barbearia/view/home_page/components/size_config.dart';

class FoodPart extends StatelessWidget {
  String partName;
  FoodPart({super.key, required this.partName});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.fromLTRB(
          SizeConfig.screenWidth!/27.4,    
          SizeConfig.screenHeight!/68.3,   
          SizeConfig.screenWidth!/41.1,    
          SizeConfig.screenHeight!/68.3    
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            partName,
            style: TextStyle(
              fontSize: SizeConfig.screenHeight!/34.15,
              fontWeight: FontWeight.w500,
              color: Colors.white,
            ),
          ),  
          Icon(Icons.keyboard_arrow_right, color: Colors.white70, size: SizeConfig.screenHeight!/21.35,)   
        ],
      ),
    );
  }
}
