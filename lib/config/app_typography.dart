import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

/// Tipografia do app com a fonte Poppins, conforme guia de estilo.
/// Tamanhos e line heights em lógica equivalente aos px do guia.
class AppTypography {
  AppTypography._();

  static String get fontFamily => 'Poppins';

  /// Heading 1: 48px, line height 72px
  static TextStyle get heading1 => GoogleFonts.poppins(
        fontSize: 48,
        height: 72 / 48,
        fontWeight: FontWeight.bold,
      );

  /// Heading 2: 36px, line height 56px
  static TextStyle get heading2 => GoogleFonts.poppins(
        fontSize: 36,
        height: 56 / 36,
        fontWeight: FontWeight.bold,
      );

  /// Heading 3: 24px, line height 36px
  static TextStyle get heading3 => GoogleFonts.poppins(
        fontSize: 24,
        height: 36 / 24,
        fontWeight: FontWeight.w600,
      );

  /// Heading 4: 20px, line height 30px
  static TextStyle get heading4 => GoogleFonts.poppins(
        fontSize: 20,
        height: 30 / 20,
        fontWeight: FontWeight.w600,
      );

  /// Body - Bold: 16px, line height 24px
  static TextStyle get bodyBold => GoogleFonts.poppins(
        fontSize: 16,
        height: 24 / 16,
        fontWeight: FontWeight.bold,
      );

  /// Body - Regular: 16px, line height 24px
  static TextStyle get bodyRegular => GoogleFonts.poppins(
        fontSize: 16,
        height: 24 / 16,
        fontWeight: FontWeight.normal,
      );

  /// Caption: 14px, line height 18px
  static TextStyle get caption => GoogleFonts.poppins(
        fontSize: 14,
        height: 18 / 14,
        fontWeight: FontWeight.normal,
      );

  /// Chip / Badge / Tooltip: 12px, line height 16px
  static TextStyle get chip => GoogleFonts.poppins(
        fontSize: 12,
        height: 16 / 12,
        fontWeight: FontWeight.normal,
      );

  /// Retorna TextTheme do Material com Poppins e os estilos do guia.
  static TextTheme get textTheme => TextTheme(
        displayLarge: heading1,
        displayMedium: heading2,
        displaySmall: heading3,
        headlineMedium: heading4,
        titleLarge: heading4,
        bodyLarge: bodyRegular,
        bodyMedium: bodyRegular,
        bodySmall: caption,
        labelLarge: bodyBold,
        labelMedium: caption,
        labelSmall: chip,
      );
}
