import 'package:flutter/material.dart';
import 'package:barbearia/view/home_page/components/colors.dart';
import 'package:barbearia/view/home_page/components/size_config.dart';

class AddToCartButton extends StatelessWidget {
  const AddToCartButton({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Padding(
      padding: EdgeInsets.fromLTRB(
          SizeConfig.screenWidth!/20.55,
          SizeConfig.screenHeight!/34.15,
          SizeConfig.screenWidth!/20.55,
          0,
      ),
      child: Container(
        decoration: BoxDecoration(
          color: buttonColor,
          borderRadius: BorderRadius.circular(20),
        ),
        child: ElevatedButton(
          style: ButtonStyle(
            shape: WidgetStateProperty.all<RoundedRectangleBorder>(
              RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(20.0),
              ),
            ),
            minimumSize: WidgetStateProperty.all(Size(SizeConfig.screenWidth!/1.37, SizeConfig.screenHeight!/11.66)),
            backgroundColor: WidgetStateProperty.all(Colors.transparent),
            shadowColor: WidgetStateProperty.all(Colors.transparent),
          ),
          onPressed: () { },
          child: Wrap(
            children: [
              Padding(
                padding: EdgeInsets.only(right: SizeConfig.screenWidth!/51.38),       
                child: const Icon(Icons.shopping_cart_rounded , color: Colors.white,),
              ),
              Text(
                "Add to Cart",
                style: TextStyle(fontSize: SizeConfig.screenHeight!/34.15,  fontWeight: FontWeight.w700, color: Colors.white,),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
