import 'package:flutter/material.dart';
import 'package:barbearia/view/login_page/widgets/text_field_widget/text_field_input.dart';
import 'package:barbearia/view/login_page/widgets/text_field_widget/text_field_password.dart';

class RegisterTextField extends StatelessWidget {
  final TextEditingController nomeCtrl;
  final TextEditingController emailCtrl;
  final TextEditingController senhaCtrl;
  final String? selectedPerfil;
  final Function(String?) onPerfilChanged;

  const RegisterTextField({
    Key? key,
    required this.nomeCtrl,
    required this.emailCtrl,
    required this.senhaCtrl,
    required this.selectedPerfil,
    required this.onPerfilChanged,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
        child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
          TextFieldInput(
              text: "Nome",
              iconName: Icons.account_circle,
              ltext: "Nome",
              controller: nomeCtrl),
          TextFieldInput(
            text: "email",
            iconName: Icons.mail,
            ltext: "Email",
            controller: emailCtrl,
          ),
          TextFieldPassword(controller: senhaCtrl),
          const SizedBox(height: 16),
          // Dropdown PERFIL
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20.0),
            child: Container(
              decoration: BoxDecoration(
                color: Colors.grey[900],
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: Colors.grey[700]!),
              ),
              child: DropdownButtonFormField<String>(
                value: selectedPerfil,
                decoration: InputDecoration(
                  prefixIcon: const Icon(Icons.person_outline, color: Colors.white70),
                  labelText: "Perfil",
                  labelStyle: const TextStyle(color: Colors.white70),
                  border: InputBorder.none,
                  contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                ),
                dropdownColor: Colors.grey[900],
                style: const TextStyle(color: Colors.white),
                icon: const Icon(Icons.arrow_drop_down, color: Colors.white70),
                items: const [
                  // DONO oculto no cadastro público
                  DropdownMenuItem<String>(
                    value: "RECEPCIONISTA",
                    child: Text("RECEPCIONISTA", style: TextStyle(color: Colors.white)),
                  ),
                  DropdownMenuItem<String>(
                    value: "CABELEIREIRO",
                    child: Text("CABELEIREIRO", style: TextStyle(color: Colors.white)),
                  ),
                ],
                onChanged: onPerfilChanged,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Selecione um perfil';
                  }
                  return null;
                },
              ),
            ),
          ),
        ]));
  }
}
