import 'package:flutter/material.dart';
import 'package:barbearia/config/app_colors.dart';
import 'package:barbearia/view/home_page/components/size_config.dart';

class TextFieldPassword extends StatefulWidget {
  final TextEditingController controller;
  final bool themeLight;
  final bool loginDark;
  final String? hintText;
  final String? labelText;

  const TextFieldPassword({
    Key? key,
    required this.controller,
    this.themeLight = false,
    this.loginDark = false,
    this.hintText,
    this.labelText,
  }) : super(key: key);

  @override
  State<TextFieldPassword> createState() => _TextFieldPasswordState();
}

class _TextFieldPasswordState extends State<TextFieldPassword> {
  bool passwordObscure = true;

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    Color fillColor;
    Color textColor;
    Color hintColor;
    Color iconColor;
    BorderSide enabledBorder;
    Color labelColor;
    String hintText;
    String label;

    if (widget.loginDark) {
      fillColor = AppColors.loginInputBackground;
      textColor = Colors.white;
      hintColor = AppColors.loginTextMuted;
      iconColor = AppColors.loginTextMuted;
      enabledBorder = BorderSide.none;
      labelColor = Colors.white;
      hintText = widget.hintText ?? '*******';
      label = widget.labelText ?? 'Senha';
    } else if (widget.themeLight) {
      fillColor = Colors.white;
      textColor = const Color(0xFF1A1A1A);
      hintColor = const Color(0xFF9E9E9E);
      iconColor = const Color(0xFF424242);
      enabledBorder = BorderSide(color: Colors.grey.shade300);
      labelColor = const Color(0xFF1A1A1A);
      hintText = widget.hintText ?? 'senha';
      label = widget.labelText ?? 'Senha';
    } else {
      fillColor = AppColors.inputBackground;
      textColor = AppColors.textSecondary;
      hintColor = AppColors.textHint;
      iconColor = AppColors.textSecondary;
      enabledBorder = const BorderSide(color: AppColors.inputBackground);
      labelColor = AppColors.textSecondary;
      hintText = widget.hintText ?? 'senha';
      label = widget.labelText ?? 'Senha';
    }

    return Padding(
      padding: EdgeInsets.fromLTRB(0, SizeConfig.screenHeight! / 68.3, 0, SizeConfig.screenHeight! / 34.15),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (widget.loginDark) ...[
            Text(
              label,
              style: TextStyle(
                color: labelColor,
                fontSize: 16,
                fontWeight: FontWeight.w500,
              ),
            ),
            const SizedBox(height: 8),
          ],
          TextField(
            obscureText: passwordObscure,
            controller: widget.controller,
            style: TextStyle(color: textColor),
            cursorColor: widget.loginDark ? AppColors.loginOrange : AppColors.primary,
            decoration: InputDecoration(
              filled: true,
              fillColor: fillColor,
              prefixIcon: Icon(Icons.lock_outline, color: iconColor, size: 22),
              suffixIcon: IconButton(
                onPressed: () => setState(() => passwordObscure = !passwordObscure),
                icon: Icon(
                  passwordObscure ? Icons.visibility_off : Icons.visibility,
                  color: iconColor,
                  size: 22,
                ),
              ),
              focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
                borderSide: BorderSide(
                  width: widget.loginDark ? 1 : 2,
                  color: widget.loginDark ? AppColors.loginOrange : AppColors.primary,
                ),
              ),
              enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
                borderSide: widget.loginDark
                    ? BorderSide(color: AppColors.loginInputBackground)
                    : enabledBorder,
              ),
              contentPadding: EdgeInsets.symmetric(
                vertical: SizeConfig.screenHeight! / 68.3,
                horizontal: SizeConfig.screenWidth! / 17.12,
              ),
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
              hintText: hintText,
              hintStyle: TextStyle(color: hintColor),
              labelText: widget.loginDark ? null : label,
              labelStyle: TextStyle(color: labelColor),
            ),
          ),
        ],
      ),
    );
  }
}
