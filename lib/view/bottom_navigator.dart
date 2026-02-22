import 'package:curved_navigation_bar/curved_navigation_bar.dart';
import 'package:flutter/material.dart';
import 'package:barbearia/view/cart_page/cart_view.dart';
import 'package:barbearia/view/favorite_page/favorite_page_view.dart';
import 'package:barbearia/view/home_page/components/colors.dart';
import 'package:barbearia/view/home_page/components/size_config.dart';
import 'package:barbearia/view/home_page/home_page_view.dart';
import 'package:barbearia/view/profile_page/profile_page_view.dart';
import 'package:barbearia/view/search_page/search_page_view.dart';



class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final navigationKey = GlobalKey<CurvedNavigationBarState>();
  int index = 0;

  final screen = [
    const HomePageView(),
    const SearchPageView(),
    const CartView(),
    const FavoritePageView(),
    const ProfilePageView(),
  ];
  @override
  Widget build(BuildContext context) {
    final items = [
      Icon(Icons.home, size: SizeConfig.screenHeight!/22.77),          /// 30.0
      Icon(Icons.search, size: SizeConfig.screenHeight!/22.77),
      Icon(Icons.shopping_cart, size: SizeConfig.screenHeight!/22.77),
      Icon(Icons.favorite, size: SizeConfig.screenHeight!/22.77),
      Icon(Icons.person, size: SizeConfig.screenHeight!/22.77),
    ];
    Size size = MediaQuery.of(context).size;
    final double navHeight = (SizeConfig.screenHeight! / 11.39).clamp(0, 75).toDouble();
    return Container(
      color: buttonColor,
      child: SafeArea(
        top: false,
        child: Scaffold(
          extendBody: true,
          backgroundColor: Colors.black,
          body: screen[index],
          bottomNavigationBar: Theme(
            data: Theme.of(context).copyWith(
                iconTheme: const IconThemeData(color: Colors.white)
            ),
            child: CurvedNavigationBar(
              key: navigationKey,
              color: Colors.black45,
              backgroundColor: Colors.transparent,
              buttonBackgroundColor: buttonColor,
              height: navHeight,                                   /// capped to plugin limit (<= 75)
              animationCurve: Curves.easeInOut,
              animationDuration: const Duration(milliseconds: 400),
              index: index,
              items: items,
              onTap: (index) => setState(() => this.index = index),
            ),
          ),
        ),
      ),
    );
  }
}
