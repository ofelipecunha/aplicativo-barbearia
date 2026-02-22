import 'package:flutter/material.dart';

class BottomBarText extends StatefulWidget {
  final String title_text;
  final String price_text;
  final double font_size;
  final FontWeight fontWeight;
  final Color text_color;

  const BottomBarText({super.key,
    required this.title_text,
    required this.price_text,
    required this.font_size,
    required this.fontWeight,
    required this.text_color});

  @override
  _BottomBarTextState createState() => _BottomBarTextState();
}

class _BottomBarTextState extends State<BottomBarText> {
  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Text(widget.title_text, style: TextStyle(fontWeight: widget.fontWeight, fontSize: widget.font_size, color: widget.text_color),),
        const Spacer(),
        Text(widget.price_text, style: TextStyle(fontWeight: widget.fontWeight, fontSize: widget.font_size, color: widget.text_color),),
      ],
    );
  }
}
