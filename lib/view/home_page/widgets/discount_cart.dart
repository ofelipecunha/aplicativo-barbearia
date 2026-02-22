import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:barbearia/configuration/food.dart';
import 'package:barbearia/configuration/food_list.dart';
import 'package:barbearia/view/home_page/components/size_config.dart';

class DiscountCard extends StatefulWidget {
  const DiscountCard({Key? key}) : super(key: key);

  @override
  _DiscountCardState createState() => _DiscountCardState();
}

class _DiscountCardState extends State<DiscountCard> {
  final List<String> imageList = [
    "assets/discount/1.jpg",
    "assets/discount/2.jpg",
    "assets/discount/3.jpg",
    "assets/discount/4.jpg",
  ];

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(
          top: SizeConfig.screenHeight! / 34.15,
          bottom: SizeConfig.screenHeight! / 68.3),
      child: FutureBuilder<List<Food>>(
        future: bringTheFoods(),
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            return SizedBox(
              height: SizeConfig.screenHeight! / 3.415,
              width: SizeConfig.screenWidth,
              child: CarouselSlider(
                options: CarouselOptions(
                  enableInfiniteScroll: true,
                  enlargeCenterPage: true,
                  autoPlay: false,
                ),
                items: imageList
                    .map((e) => ClipRRect(
                          borderRadius: BorderRadius.circular(20),
                          child: Stack(
                            fit: StackFit.expand,
                            children: [
                              Image.asset(
                                e,
                                fit: BoxFit.cover,
                              )
                            ],
                          ),
                        ))
                    .toList(),
              ),
            );
          } else {
            return const Center();
          }
        },
      ),
    );
  }
}
