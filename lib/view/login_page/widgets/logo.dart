import 'package:flutter/material.dart';
import 'package:barbearia/view/home_page/components/size_config.dart';

class LogoImage extends StatelessWidget {
  const LogoImage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    final double h = SizeConfig.screenHeight ?? MediaQuery.of(context).size.height;
    final double w = SizeConfig.screenWidth ?? MediaQuery.of(context).size.width;

    return Container(
      height: h * 0.34,
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            Color(0xFFFFA726),
            Color(0xFFFFC66D),
          ],
        ),
        borderRadius: const BorderRadius.only(
          bottomLeft: Radius.circular(32),
          bottomRight: Radius.circular(32),
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.35),
            blurRadius: 18,
            offset: const Offset(0, 10),
          )
        ],
      ),
      child: Center(
        child: SizedBox(
          width: w * 0.82,
          height: h * 0.24,
          child: Container(
            decoration: const BoxDecoration(
              image: DecorationImage(
                image: AssetImage('assets/main/logoWl.png'),
                fit: BoxFit.contain,
              ),
            ),
          ),
        ),
      ),
    );
  }
}
