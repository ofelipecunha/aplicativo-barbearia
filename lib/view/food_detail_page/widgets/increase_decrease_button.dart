import 'package:flutter/material.dart';
import 'package:barbearia/configuration/food.dart';
import 'package:barbearia/view/food_detail_page/components/separator.dart';
import 'package:barbearia/view/home_page/components/colors.dart';
import 'package:barbearia/view/home_page/components/size_config.dart';

class IncreaseDecrease extends StatefulWidget {
  Food food;
  IncreaseDecrease({super.key, required this.food});

  @override
  _IncreaseDecreaseState createState() => _IncreaseDecreaseState();
}

class _IncreaseDecreaseState extends State<IncreaseDecrease> {
  int _counter = 1;

  void _increaseCart() {
    setState(() {
      _counter++;
    });
  }

  void _decreaseCart() {
    setState(() {
      if(_counter > 1){
        _counter--;
      }else{
        _counter = 1;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Padding(
      padding: EdgeInsets.only(top: SizeConfig.screenHeight!/45.54),       
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: EdgeInsets.only(top: SizeConfig.screenHeight!/68.3, bottom: SizeConfig.screenHeight!/34.15),   
            child: const MySeparator(color: Colors.grey,),
          ),
          Text("Total", style: TextStyle(color: Colors.black54, fontSize: SizeConfig.screenHeight!/42.69),),    
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text("\$${int.parse(widget.food.foodPrice )* _counter}", style: TextStyle(color: Colors.black, fontSize: SizeConfig.screenHeight!/27.32),)  
                ],
              ),
              Container(
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    InkWell(
                      onTap: (){_decreaseCart();},
                      child: Container(
                        height: SizeConfig.screenHeight!/13.94,              
                        width: SizeConfig.screenWidth!/8.39,                 
                        decoration: BoxDecoration(
                          border: Border.all(
                              color: buttonColor,
                              width: 1
                          ),
                          borderRadius: BorderRadius.circular(15),
                          color: textColor.withOpacity(0.1),
                          //borderRadius: BorderRadius.circular(10)
                        ),
                        child: Center(
                          child: Icon(Icons.remove, color: buttonColor),
                        ),
                      ),
                    ),
                    SizedBox(
                        width: SizeConfig.screenWidth!/6.85,           
                        height: SizeConfig.screenHeight!/13.94,        
                        child: Center(
                            child: Text("$_counter",style: TextStyle(fontSize: SizeConfig.screenHeight!/37.95, fontWeight: FontWeight.bold),),   
                        ),
                    ),
                    InkWell(
                      onTap: (){_increaseCart();},
                      child: Container(
                        height: SizeConfig.screenHeight!/13.94,        
                        width: SizeConfig.screenWidth!/8.39,           
                        decoration: BoxDecoration(
                          border: Border.all(
                            color: buttonColor,
                            width: 1
                          ),
                          borderRadius: BorderRadius.circular(15),
                          color: textColor.withOpacity(0.4),
                        ),
                        child: Center(
                          child: Icon(Icons.add, color: buttonColor),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
