import 'package:flutter/material.dart';
import 'package:barbearia/view/checkout_page/components/checkbox_save.dart';
import 'package:barbearia/view/checkout_page/components/checkout_textfield.dart';
import 'package:barbearia/view/checkout_page/components/page_name.dart';

class Address extends StatefulWidget {
  const Address({Key? key}) : super(key: key);

  @override
  _AddressState createState() => _AddressState();
}

class _AddressState extends State<Address> {
  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          PageName(text_name: "Nome completo"),
          CheckoutTextField(enter_text: "Entre com nome completo", size_width: 1.18,),   //350
          PageName(text_name: "Email"),
          CheckoutTextField(enter_text: "Entre com seu login", size_width: 1.18,),
          PageName(text_name: "Telefone"),
          CheckoutTextField(enter_text: "Entre com seu telefone", size_width: 1.18,),
          PageName(text_name: "Enderço"),
          CheckoutTextField(enter_text: "Entre com seu endereço", size_width: 1.18,),
          Row(
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  PageName(text_name: "Cidade"),
                  CheckoutTextField(enter_text: "Sua cidade", size_width: 3.0)
                ],
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  PageName(text_name: "País"),
                  CheckoutTextField(enter_text: "Seu país", size_width: 3.0)
                ],
              )
            ],
          ),
          CheckBoxSave(save_text: "Salvar endereço de entrega")
        ],
      ),
    );
  }
}
