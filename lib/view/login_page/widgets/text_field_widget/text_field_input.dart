import 'package:flutter/material.dart';
import 'package:barbearia/config/app_colors.dart';
import 'package:barbearia/view/home_page/components/size_config.dart';

class TextFieldInput extends StatelessWidget {
  final String text;
  final IconData iconName;
  final String ltext;
  final TextEditingController controller;
  final bool themeLight;
  final bool loginDark;
  /// Campo de login: borda laranja e placeholder laranja (igual ao layout de referência).
  final bool orangeBorderAndHint;

  const TextFieldInput({
    super.key,
    required this.text,
    required this.iconName,
    required this.ltext,
    required this.controller,
    this.themeLight = false,
    this.loginDark = false,
    this.orangeBorderAndHint = false,
  });

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    Color fillColor;
    Color textColor;
    Color hintColor;
    Color iconColor;
    BorderSide enabledBorder;
    Color labelColor;

    if (loginDark) {
      fillColor = AppColors.loginInputBackground;
      textColor = Colors.white;
      hintColor = AppColors.loginTextMuted;
      iconColor = AppColors.loginTextMuted;
      enabledBorder = BorderSide.none;
      labelColor = Colors.white;
    } else if (themeLight) {
      fillColor = Colors.white;
      textColor = const Color(0xFF1A1A1A);
      hintColor = (orangeBorderAndHint) ? AppColors.primary : const Color(0xFF9E9E9E);
      iconColor = const Color(0xFF424242);
      enabledBorder = (orangeBorderAndHint)
          ? const BorderSide(color: AppColors.primary, width: 1.5)
          : BorderSide(color: Colors.grey.shade300);
      labelColor = const Color(0xFF1A1A1A);
    } else {
      fillColor = AppColors.inputBackground;
      textColor = AppColors.textSecondary;
      hintColor = AppColors.textHint;
      iconColor = AppColors.textHint;
      enabledBorder = const BorderSide(color: AppColors.inputBackground);
      labelColor = AppColors.textSecondary;
    }

    return Padding(
      padding: EdgeInsets.fromLTRB(0, SizeConfig.screenHeight! / 68.3, 0, SizeConfig.screenHeight! / 34.15),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (loginDark) ...[
            Text(
              ltext,
              style: TextStyle(
                color: labelColor,
                fontSize: 16,
                fontWeight: FontWeight.w500,
              ),
            ),
            const SizedBox(height: 8),
          ],
          TextField(
            controller: controller,
            style: TextStyle(color: textColor),
            cursorColor: AppColors.loginOrange,
            decoration: InputDecoration(
              filled: true,
              fillColor: fillColor,
              prefixIcon: Icon(iconName, color: iconColor, size: 22),
              contentPadding: EdgeInsets.symmetric(
                vertical: SizeConfig.screenHeight! / 68.3,
                horizontal: SizeConfig.screenWidth! / 17.12,
              ),
              focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
                borderSide: BorderSide(
                  width: loginDark ? 1 : 1.5,
                  color: loginDark ? AppColors.loginOrange : AppColors.primary,
                ),
              ),
              enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
                borderSide: loginDark
                    ? BorderSide(color: AppColors.loginInputBackground)
                    : enabledBorder,
              ),
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
              hintText: text,
              hintStyle: TextStyle(color: hintColor),
              labelText: loginDark ? null : ltext,
              labelStyle: TextStyle(color: labelColor),
            ),
          ),
        ],
      ),
    );
  }
}