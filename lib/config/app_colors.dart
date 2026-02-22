import 'package:flutter/material.dart';

/// Paleta de cores inspirada no GoBarber (layout e estilo das telas).
/// Background principal, headers, botões e textos seguem o mesmo padrão visual.
class AppColors {
  AppColors._();

  /// Fundo principal das telas (equivale ao body #312E38 do GoBarber)
  static const Color background = Color(0xFF312E38);

  /// Header / barra superior (equivale ao #28262e do GoBarber)
  static const Color header = Color(0xFF28262E);

  /// Cards, containers e blocos (equivale ao #3e3b47 do GoBarber)
  static const Color card = Color(0xFF3E3B47);

  /// Fundo dos inputs (equivale ao #232129 do GoBarber)
  static const Color inputBackground = Color(0xFF232129);

  /// Texto principal (branco)
  static const Color textPrimary = Color(0xFFFFFFFF);

  /// Texto secundário / links claros (equivale ao #f4ede8 do GoBarber)
  static const Color textSecondary = Color(0xFFF4EDE8);

  /// Texto cinza (labels, subtítulos - #999591)
  static const Color textGray = Color(0xFF999591);

  /// Placeholder / texto desabilitado (#666360)
  static const Color textHint = Color(0xFF666360);

  /// Cor de destaque / laranja principal dos botões (#ff9000)
  static const Color primary = Color(0xFFFF9000);

  /// Texto sobre botão laranja (escuro #312e38)
  static const Color primaryButtonText = Color(0xFF312E38);

  /// Laranja mais escuro para hover/pressed (shade do #ff9000)
  static const Color primaryDark = Color(0xFFCC7300);

  /// Erro / validação (#c53030)
  static const Color error = Color(0xFFC53030);

  // --- Tema BarberPro (tela de login) ---
  /// Fundo escuro da tela de login
  static const Color loginBackground = Color(0xFF1A1A1A);
  /// Fundo dos campos de input (#2C2C2C)
  static const Color loginInputBackground = Color(0xFF2C2C2C);
  /// Laranja do logo e gradiente (#FF9500)
  static const Color loginOrange = Color(0xFFFF9500);
  /// Gradiente laranja claro
  static const Color loginOrangeLight = Color(0xFFFFA726);
  /// Gradiente laranja escuro
  static const Color loginOrangeDark = Color(0xFFFF8C00);
  /// Texto cinza do subtítulo
  static const Color loginTextMuted = Color(0xFFAAAAAA);
}
