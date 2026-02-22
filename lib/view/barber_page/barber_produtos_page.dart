import 'package:flutter/material.dart';
import 'package:barbearia/view/home_page/components/colors.dart';
import 'package:barbearia/view/home_page/components/size_config.dart';
import 'package:barbearia/api/api_client.dart';

/// Aba Produtos do cabeleireiro: visualização somente leitura dos serviços.
class BarberProdutosPage extends StatefulWidget {
  const BarberProdutosPage({Key? key}) : super(key: key);

  @override
  State<BarberProdutosPage> createState() => _BarberProdutosPageState();
}

class _BarberProdutosPageState extends State<BarberProdutosPage> {
  List<Map<String, dynamic>> servicos = [];
  bool loading = false;
  String? error;

  @override
  void initState() {
    super.initState();
    _carregar();
  }

  Future<void> _carregar() async {
    setState(() {
      loading = true;
      error = null;
    });
    try {
      final data = await ApiClient.listServicos();
      setState(() => servicos = data);
    } catch (e) {
      setState(() => error = e.toString());
    } finally {
      setState(() => loading = false);
    }
  }

  static String _brl(num v) {
    final parts = v.toStringAsFixed(2).split('.');
    final inteiro = parts[0];
    final cents = parts[1];
    final buffer = StringBuffer();
    for (int i = 0; i < inteiro.length; i++) {
      final pos = inteiro.length - i;
      buffer.write(inteiro[i]);
      if (pos > 1 && pos % 3 == 1 && i != inteiro.length - 1) {
        buffer.write('.');
      }
    }
    return 'R\$ ${buffer.toString()},$cents';
  }

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    if (loading) {
      return const Center(
        child: CircularProgressIndicator(color: Colors.white),
      );
    }
    if (error != null) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Text(
            'Erro: $error',
            style: const TextStyle(color: Colors.redAccent),
            textAlign: TextAlign.center,
          ),
        ),
      );
    }
    if (servicos.isEmpty) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.inventory_2_outlined, color: Colors.white38, size: 56),
              const SizedBox(height: 16),
              const Text(
                'Nenhum serviço cadastrado.',
                style: TextStyle(color: Colors.white70, fontSize: 16),
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
      );
    }
    return ListView.builder(
      padding: EdgeInsets.symmetric(
        horizontal: SizeConfig.screenWidth! / 18,
        vertical: SizeConfig.screenHeight! / 68.3,
      ),
      itemCount: servicos.length,
      itemBuilder: (context, index) {
        final s = servicos[index];
        final desc = s['descricao'] as String? ?? '';
        final valor = (s['valor'] as num?)?.toDouble() ?? 0.0;
        return Container(
          margin: const EdgeInsets.only(bottom: 12),
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: const Color(0xFF111111),
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: Colors.white12),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Text(
                  desc,
                  style: const TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.w500,
                    fontSize: 16,
                  ),
                ),
              ),
              Text(
                _brl(valor),
                style: TextStyle(
                  color: buttonColor,
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
