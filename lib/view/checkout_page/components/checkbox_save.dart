import 'package:flutter/material.dart';
import 'package:barbearia/view/home_page/components/colors.dart';

class CheckBoxSave extends StatefulWidget {
  String save_text;
  CheckBoxSave({super.key, required this.save_text});

  @override
  _CheckBoxSaveState createState() => _CheckBoxSaveState();
}

class _CheckBoxSaveState extends State<CheckBoxSave> {
  bool isChecked = false;

  @override
  Widget build(BuildContext context) {
    Color getColor(Set<WidgetState> states) {
      const Set<WidgetState> interactiveStates = <WidgetState>{
        WidgetState.pressed,
        WidgetState.hovered,
        WidgetState.focused,
      };
      if (states.any(interactiveStates.contains)) {
        return freeDelivery;
      }
      return buttonColor;
    }

    return Row(
      children: [
        Checkbox(
          checkColor: Colors.white,
          fillColor: WidgetStateProperty.resolveWith(getColor),
          value: isChecked,
          onChanged: (bool? value) {
            setState(() {
              isChecked = value!;
            });
          },
        ),
        Text(widget.save_text, style: const TextStyle(color: Colors.black54, fontWeight: FontWeight.w500),)
      ],
    );
  }
}
