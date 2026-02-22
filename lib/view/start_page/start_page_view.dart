import 'package:flutter/material.dart';
import 'package:barbearia/config/app_colors.dart';
import 'package:barbearia/view/home_page/components/size_config.dart';
import 'package:barbearia/view/login_page/login_page_view.dart';

class StartPageView extends StatefulWidget {
  const StartPageView({Key? key}) : super(key: key);

  @override
  _StartPageViewState createState() => _StartPageViewState();
}

class _StartPageViewState extends State<StartPageView> {
  bool _visible = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) {
        setState(() => _visible = true);
      }
    });
    // Transição automática após 3 segundos
    Future.delayed(const Duration(seconds: 3), () {
      if (mounted) {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (_) => const LoginPageView()),
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Scaffold(
      backgroundColor: AppColors.background,
      body: AnimatedOpacity(
        duration: const Duration(milliseconds: 700),
        curve: Curves.easeOut,
        opacity: _visible ? 1 : 0,
        child: Stack(
          children: [
            // imagem de fundo
            Container(
              decoration: const BoxDecoration(
                image: DecorationImage(
                  image: AssetImage('assets/discount/3.png'),
                  fit: BoxFit.cover,
                ),
              ),
            ),
            // degradê escuro de baixo para cima
            Container(
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.bottomCenter,
                  end: Alignment.topCenter,
                  stops: [0.0, 0.45, 0.95],
                  colors: [
                    Color.fromRGBO(0, 0, 0, 0.6), // mais leve para ver a imagem
                    Color.fromRGBO(0, 0, 0, 0.38),
                    Colors.transparent,
                  ],
                ),
              ),
            ),
            // logo central
            Align(
              alignment: const Alignment(0, -0.1), // sobe levemente a logo
              child: AnimatedScale(
                scale: _visible ? 1.0 : 0.8,
                curve: Curves.easeOutBack,
                duration: const Duration(milliseconds: 700),
                child: AnimatedOpacity(
                  opacity: _visible ? 1 : 0,
                  duration: const Duration(milliseconds: 500),
                  child: Image.asset(
                    'assets/main/logoWl.png',
                    width: 280,
                    height: 280,
                    fit: BoxFit.contain,
                  ),
                ),
              ),
            ),
            SafeArea(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(24, 16, 24, 24),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Spacer(),
                    const Row(),
                    const SizedBox(height: 12),
                    const Text(
                      "Gestão e atendimento em um só lugar.",
                      style: TextStyle(
                        color: AppColors.textPrimary,
                        fontSize: 28,
                        fontWeight: FontWeight.w500,
                        height: 1.1,
                      ),
                    ),
                    const SizedBox(height: 10),
                    const SizedBox(height: 22),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
