import 'package:flutter/material.dart';

class DeleteIconButton extends StatefulWidget {
  String foodName;
  DeleteIconButton({super.key, required this.foodName});

  @override
  _DeleteIconButtonState createState() => _DeleteIconButtonState();
}

class _DeleteIconButtonState extends State<DeleteIconButton> {
  @override
  Widget build(BuildContext context) {
    return IconButton(
        onPressed: () {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content:
              Text("Delete ${widget.foodName}?"),
              action: SnackBarAction(
                  label: "sim",
                  onPressed: () {

                  }
              ),
            ),
          );
        },
        icon: const Icon(Icons.delete_outline, color: Colors.black54,));
  }
}
