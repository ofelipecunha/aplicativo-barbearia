import 'package:flutter/material.dart';
import 'package:barbearia/config/app_colors.dart';
import 'package:barbearia/view/home_page/components/size_config.dart';

class TextTitle extends StatelessWidget {
  String title;
  TextTitle({super.key, required this.title});

  @override
  Widget build(BuildContext context) {
    return Container(
      alignment: Alignment.center,
      child: Text(
        title,
        style: TextStyle(
          color: AppColors.textPrimary,
          fontSize: SizeConfig.screenHeight!/22.77,
          fontWeight: FontWeight.w500,
        ),
      ),
    );
  }
}
