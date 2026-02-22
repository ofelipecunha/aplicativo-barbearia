import 'package:flutter/material.dart';
import 'package:barbearia/view/home_page/components/colors.dart';
import 'package:barbearia/view/home_page/components/size_config.dart';

/// Modal "Cadastrar": escolha entre Produtos ou Serviços (estilo exemplo).
void showCadastroChoiceModal(
  BuildContext context, {
  required void Function(String type) onSelect,
}) {
  SizeConfig().init(context);
  showModalBottomSheet<void>(
    context: context,
    backgroundColor: Colors.transparent,
    isScrollControlled: true,
    builder: (ctx) {
      return Container(
        decoration: const BoxDecoration(
          color: Color(0xFF0D0D0D),
          borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
        ),
        padding: EdgeInsets.only(
          left: SizeConfig.screenWidth! / 18,
          right: SizeConfig.screenWidth! / 18,
          top: 24,
          bottom: 24 + MediaQuery.of(ctx).padding.bottom,
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Cadastrar',
              style: TextStyle(
                color: Colors.white,
                fontSize: 22,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 8),
            const Text(
              'Cadastrar ou lançar',
              style: TextStyle(color: Colors.white54, fontSize: 14),
            ),
            const SizedBox(height: 24),
            Row(
              children: [
                Expanded(
                  child: _CadastroOptionCard(
                    titulo: 'Produtos',
                    icone: Icons.inventory_2_outlined,
                    onTap: () {
                      Navigator.of(ctx).pop();
                      onSelect('produto');
                    },
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: _CadastroOptionCard(
                    titulo: 'Serviços',
                    icone: Icons.content_cut,
                    onTap: () {
                      Navigator.of(ctx).pop();
                      onSelect('servico');
                    },
                  ),
                ),
              ],
            ),
          ],
        ),
      );
    },
  );
}

class _CadastroOptionCard extends StatelessWidget {
  final String titulo;
  final IconData icone;
  final VoidCallback onTap;

  const _CadastroOptionCard({
    required this.titulo,
    required this.icone,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Material(
      color: const Color(0xFF1A1A1A),
      borderRadius: BorderRadius.circular(16),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(16),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 28, horizontal: 16),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: Colors.white12),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(icone, color: buttonColor, size: 40),
              const SizedBox(height: 12),
              Text(
                titulo,
                style: const TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 4),
              const Text(
                'Cadastrar ou lançar',
                style: TextStyle(color: Colors.white54, fontSize: 12),
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
