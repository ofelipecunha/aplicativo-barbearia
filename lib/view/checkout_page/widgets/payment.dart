import 'package:flutter/material.dart';
import 'package:barbearia/view/checkout_page/components/checkbox_save.dart';
import 'package:barbearia/view/checkout_page/components/checkout_textfield.dart';
import 'package:barbearia/view/checkout_page/components/page_name.dart';

class Payment extends StatefulWidget {
  const Payment({Key? key}) : super(key: key);

  @override
  _PaymentState createState() => _PaymentState();
}

class _PaymentState extends State<Payment> {
  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          PageName(text_name: "Nome do Titular"),
          CheckoutTextField(enter_text: "Nome que esta no cartão", size_width: 1.18,),   
          PageName(text_name: "Numero do cartão"),
          CheckoutTextField(enter_text: "Numero do cartão", size_width: 1.18,),
          Row(
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  PageName(text_name: "Mês/Ano"),
                  CheckoutTextField(enter_text: "mm/aa", size_width: 3.0)
                ],
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  PageName(text_name: "CVV"),
                  CheckoutTextField(enter_text: "***", size_width: 3.0)
                ],
              )
            ],
          ),
          CheckBoxSave(save_text: "Salvar este cartão")
        ],
      ),
    );
  }
}
