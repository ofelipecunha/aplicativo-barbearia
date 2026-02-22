import 'package:flutter/material.dart';
import 'package:barbearia/view/home_page/components/size_config.dart';

class FeaturesFood extends StatefulWidget {
  const FeaturesFood({Key? key}) : super(key: key);

  @override
  _FeaturesFoodState createState() => _FeaturesFoodState();
}

class _FeaturesFoodState extends State<FeaturesFood> {
  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        ContainerFeatures(percent_text: "200+", features_text: "Calories"),
        ContainerFeatures(percent_text: "%10", features_text: "Fat"),
        ContainerFeatures(percent_text: "%40", features_text: "Proteins"),
      ],
    );
  }
}

class ContainerFeatures extends StatelessWidget {
  String percent_text;
  String features_text;
  ContainerFeatures({super.key, required this.percent_text, required this.features_text});

  @override
  Widget build(BuildContext context) {
    return Container(
        height: SizeConfig.screenHeight!/13.66,                         
        width: SizeConfig.screenWidth!/4.11,                            
        margin: EdgeInsets.only(top: SizeConfig.screenHeight!/34.15),   
        decoration: BoxDecoration(
            border: Border.all(
                color: Colors.black12,
                width: SizeConfig.screenWidth!/205.5          
            ),
            borderRadius: BorderRadius.circular(10)
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(percent_text, style: const TextStyle(color: Colors.black38),),
            Text(features_text,style: const TextStyle(color: Colors.black38))
          ],
        )
    );
  }
}

