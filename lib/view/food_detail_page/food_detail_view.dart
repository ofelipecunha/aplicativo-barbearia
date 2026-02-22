import 'package:flutter/material.dart';
import 'package:barbearia/configuration/food.dart';
import 'package:barbearia/view/food_detail_page/widgets/detail_widget.dart';
import 'package:barbearia/view/food_detail_page/widgets/food_image.dart';
import 'package:barbearia/view/home_page/components/size_config.dart';

class FoodDetailView extends StatefulWidget {
  Food food;
  FoodDetailView({super.key, required this.food});

  @override
  _FoodDetailViewState createState() => _FoodDetailViewState();
}

class _FoodDetailViewState extends State<FoodDetailView> {

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Scaffold(
      backgroundColor: Colors.black,
      body: SingleChildScrollView(
        child: Stack(
          children: [
            FoodImage(food: widget.food),
            DetailWidget(food: widget.food,),
          ],
        ),
      ),
    );
  }
}