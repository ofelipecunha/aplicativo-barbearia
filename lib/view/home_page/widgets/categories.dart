import 'package:flutter/material.dart';
import 'package:barbearia/configuration/category.dart';
import 'package:barbearia/configuration/food_list.dart';
import 'package:barbearia/view/home_page/components/size_config.dart';

class CategoriesFood extends StatefulWidget {
  const CategoriesFood({Key? key}) : super(key: key);

  @override
  _CategoriesFoodState createState() => _CategoriesFoodState();
}

class _CategoriesFoodState extends State<CategoriesFood> {
  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<Category>>(
      future: bringTheCategory(),
      builder: (context, snapshot){
        if(snapshot.hasData){
          var categoryList = snapshot.data;
          return SizedBox(
            height: SizeConfig.screenHeight!/8.04,                     
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: categoryList!.length,
              itemBuilder: (context, indeks){
                var category = categoryList[indeks];
                return Column(
                  children: [
                    GestureDetector(
                      onTap: (){},
                      child: Container(
                        margin: EdgeInsets.fromLTRB(
                            SizeConfig.screenWidth!/34.25,             
                            SizeConfig.screenHeight!/170.75,           
                            SizeConfig.screenWidth!/20.55,             
                            SizeConfig.screenHeight!/170.75,           
                        ),
                        height: SizeConfig.screenHeight!/15.18,           
                        width: SizeConfig.screenWidth!/9.14,              
                        decoration: BoxDecoration(
                          image: DecorationImage(
                            image: AssetImage(category.categoryImage),
                            fit: BoxFit.fill,
                          ),
                        ),
                      ),
                    ),
                    Row(
                        children:[
                          Text(category.categoryName, style: TextStyle(fontSize: SizeConfig.screenHeight!/52.54, color: Colors.white70),)  
                        ]
                    ),
                  ],
                );
              },
            ),
          );
        }
        else{
          return const Center();
        }
      },
    );
  }
}