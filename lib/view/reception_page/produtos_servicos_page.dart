import 'package:flutter/material.dart';
import 'package:barbearia/api/api_client.dart' show ApiClient, serverBase;
import 'package:barbearia/config/app_colors.dart';
import 'package:barbearia/view/home_page/components/size_config.dart';
import 'package:barbearia/view/shared/cadastro_choice_modal.dart';
import 'package:barbearia/view/reception_page/cadastro_produto_page.dart';
import 'package:barbearia/view/reception_page/cadastro_servico_page.dart';
import 'package:barbearia/view/shared/cadastro_icons.dart';

/// Aba Produtos/Serviços: listagem com abas. [readOnly] true = só visualizar (sem cadastrar/editar).
class ProdutosServicosPage extends StatefulWidget {
  final bool readOnly;

  const ProdutosServicosPage({Key? key, this.readOnly = false}) : super(key: key);

  @override
  State<ProdutosServicosPage> createState() => _ProdutosServicosPageState();
}

class _ProdutosServicosPageState extends State<ProdutosServicosPage> {
  bool _produtos = true;
  List<Map<String, dynamic>> _produtosList = [];
  List<Map<String, dynamic>> _servicosList = [];
  bool _loading = false;
  String? _error;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final p = await ApiClient.listProdutos(todos: true);
      final s = await ApiClient.listServicos(todos: true);
      setState(() {
        _produtosList = p;
        _servicosList = s;
      });
    } catch (e) {
      setState(() => _error = e.toString());
    } finally {
      setState(() => _loading = false);
    }
  }

  void _openCadastro() {
    showCadastroChoiceModal(context, onSelect: (type) {
      if (type == 'produto') {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (_) => CadastroProdutoPage(onSuccess: _load),
          ),
        ).then((_) => _load());
      } else {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (_) => CadastroServicoPage(onSuccess: _load),
          ),
        ).then((_) => _load());
      }
    });
  }

  void _editProduto(Map<String, dynamic> item) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => CadastroProdutoPage(item: item, onSuccess: _load),
      ),
    ).then((_) => _load());
  }

  void _editServico(Map<String, dynamic> item) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => CadastroServicoPage(item: item, onSuccess: _load),
      ),
    ).then((_) => _load());
  }

  static String _brl(num v) {
    final parts = v.toStringAsFixed(2).split('.');
    final inteiro = parts[0];
    final cents = parts[1];
    final buffer = StringBuffer();
    for (int i = 0; i < inteiro.length; i++) {
      final pos = inteiro.length - i;
      buffer.write(inteiro[i]);
      if (pos > 1 && pos % 3 == 1 && i != inteiro.length - 1) buffer.write('.');
    }
    return 'R\$ ${buffer.toString()},$cents';
  }

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    final readOnly = widget.readOnly;
    return Scaffold(
      backgroundColor: AppColors.loginBackground,
      body: Padding(
        padding: EdgeInsets.symmetric(
          horizontal: SizeConfig.screenWidth! / 18,
          vertical: SizeConfig.screenHeight! / 68.3,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                SegmentedButton<bool>(
                  segments: const [
                    ButtonSegment(value: true, label: Text('Produtos')),
                    ButtonSegment(value: false, label: Text('Serviços')),
                  ],
                  selected: {_produtos},
                  onSelectionChanged: (s) =>
                      setState(() => _produtos = s.first),
                  style: ButtonStyle(
                    backgroundColor: WidgetStateProperty.resolveWith((states) {
                      if (states.contains(WidgetState.selected)) {
                        return AppColors.loginOrange;
                      }
                      return AppColors.loginInputBackground;
                    }),
                    foregroundColor: const WidgetStatePropertyAll(Colors.white),
                  ),
                ),
                if (!readOnly)
                  IconButton.filled(
                    onPressed: _openCadastro,
                    icon: const Icon(Icons.add),
                    style: IconButton.styleFrom(backgroundColor: AppColors.loginOrange),
                  ),
              ],
            ),
            const SizedBox(height: 16),
            if (_loading)
              const Expanded(
                child: Center(
                  child: CircularProgressIndicator(color: AppColors.loginOrange),
                ),
              )
            else if (_error != null)
              Expanded(
                child: Center(
                  child: Text(
                    'Erro: $_error',
                    style: const TextStyle(color: Colors.redAccent),
                    textAlign: TextAlign.center,
                  ),
                ),
              )
            else if (_produtos)
              Expanded(
                child: _produtosList.isEmpty
                    ? _empty('Nenhum produto cadastrado.', readOnly)
                    : ListView.builder(
                        itemCount: _produtosList.length,
                        itemBuilder: (context, i) {
                          return _ProdutoCard(
                            item: _produtosList[i],
                            onEdit: readOnly ? null : _editProduto,
                            brl: _brl,
                            readOnly: readOnly,
                          );
                        },
                      ),
              )
            else
              Expanded(
                child: _servicosList.isEmpty
                    ? _empty('Nenhum serviço cadastrado.', readOnly)
                    : ListView.builder(
                        itemCount: _servicosList.length,
                        itemBuilder: (context, i) {
                          return _ServicoCard(
                            item: _servicosList[i],
                            onEdit: readOnly ? null : _editServico,
                            brl: _brl,
                            readOnly: readOnly,
                          );
                        },
                      ),
              ),
          ],
        ),
      ),
    );
  }

  Widget _empty(String msg, bool readOnly) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            _produtos ? Icons.inventory_2_outlined : Icons.design_services_outlined,
            color: AppColors.loginTextMuted,
            size: 56,
          ),
          const SizedBox(height: 16),
          Text(
            msg,
            style: TextStyle(color: AppColors.loginTextMuted, fontSize: 16),
            textAlign: TextAlign.center,
          ),
          if (!readOnly) ...[
            const SizedBox(height: 16),
            TextButton.icon(
              onPressed: _openCadastro,
              icon: const Icon(Icons.add, color: Colors.white),
              label: const Text('Cadastrar', style: TextStyle(color: Colors.white)),
              style: TextButton.styleFrom(backgroundColor: AppColors.loginOrange),
            ),
          ],
        ],
      ),
    );
  }
}

class _ProdutoCard extends StatelessWidget {
  final Map<String, dynamic> item;
  final void Function(Map<String, dynamic>)? onEdit;
  final String Function(num) brl;
  final bool readOnly;

  const _ProdutoCard({
    required this.item,
    this.onEdit,
    required this.brl,
    this.readOnly = false,
  });

  @override
  Widget build(BuildContext context) {
    final desc = item['descricao']?.toString() ?? '';
    final valor = (item['valor_venda'] as num?)?.toDouble() ?? 0;
    final estoque = (item['estoque'] as num?)?.toInt() ?? 0;
    final icone = iconFromCode(item['icone']?.toString()) ?? Icons.inventory_2;
    final img = item['imagem']?.toString() ?? '';
    final useImagem = img.isNotEmpty;

    Color dotColor;
    String stockText;
    if (estoque <= 0) {
      dotColor = Colors.red;
      stockText = 'Esgotado';
    } else if (estoque <= 5) {
      dotColor = Colors.amber;
      stockText = '$estoque em estoque';
    } else {
      dotColor = Colors.green;
      stockText = '$estoque em estoque';
    }

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.loginInputBackground,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.white12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                width: 44,
                height: 44,
                decoration: BoxDecoration(
                  color: Colors.white10,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: useImagem
                    ? ClipRRect(
                        borderRadius: BorderRadius.circular(12),
                        child: Image.network(
                          '$serverBase/$img',
                          fit: BoxFit.cover,
                          width: 44,
                          height: 44,
                          errorBuilder: (_, __, ___) => Icon(icone, color: AppColors.loginOrange, size: 24),
                        ),
                      )
                    : Icon(icone, color: AppColors.loginOrange, size: 24),
              ),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      desc,
                      style: const TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.w600,
                        fontSize: 16,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      brl(valor),
                      style: TextStyle(
                        color: AppColors.loginOrange,
                        fontWeight: FontWeight.bold,
                        fontSize: 15,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Row(
                      children: [
                        Container(
                          width: 8,
                          height: 8,
                          decoration: BoxDecoration(
                            color: dotColor,
                            shape: BoxShape.circle,
                          ),
                        ),
                        const SizedBox(width: 6),
                        Text(
                          stockText,
                          style: TextStyle(
                            color: dotColor,
                            fontSize: 13,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              if (!readOnly && onEdit != null)
                OutlinedButton(
                  onPressed: () => onEdit!(item),
                  style: OutlinedButton.styleFrom(
                    foregroundColor: Colors.white70,
                    side: const BorderSide(color: Colors.white38),
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                  ),
                  child: const Text('Editar'),
                ),
            ],
          ),
        ],
      ),
    );
  }
}

class _ServicoCard extends StatelessWidget {
  final Map<String, dynamic> item;
  final void Function(Map<String, dynamic>)? onEdit;
  final String Function(num) brl;
  final bool readOnly;

  const _ServicoCard({
    required this.item,
    this.onEdit,
    required this.brl,
    this.readOnly = false,
  });

  @override
  Widget build(BuildContext context) {
    final desc = item['descricao']?.toString() ?? '';
    final valor = (item['valor'] as num?)?.toDouble() ?? 0;
    final icone = iconFromCode(item['icone']?.toString()) ?? Icons.design_services;
    final img = item['imagem']?.toString() ?? '';
    final useImagem = img.isNotEmpty;

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.loginInputBackground,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.white12),
      ),
      child: Row(
        children: [
          Container(
            width: 44,
            height: 44,
            decoration: BoxDecoration(
              color: Colors.white10,
              borderRadius: BorderRadius.circular(12),
            ),
            child: useImagem
                ? ClipRRect(
                    borderRadius: BorderRadius.circular(12),
                    child: Image.network(
                      '$serverBase/$img',
                      fit: BoxFit.cover,
                      width: 44,
                      height: 44,
                      errorBuilder: (_, __, ___) => Icon(icone, color: AppColors.loginOrange, size: 24),
                    ),
                  )
                : Icon(icone, color: AppColors.loginOrange, size: 24),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  desc,
                  style: const TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.w600,
                    fontSize: 16,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  brl(valor),
                  style: TextStyle(
                    color: AppColors.loginOrange,
                    fontWeight: FontWeight.bold,
                    fontSize: 15,
                  ),
                ),
              ],
            ),
          ),
          if (!readOnly && onEdit != null)
            OutlinedButton(
              onPressed: () => onEdit!(item),
              style: OutlinedButton.styleFrom(
                foregroundColor: Colors.white70,
                side: const BorderSide(color: Colors.white38),
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
              ),
              child: const Text('Editar'),
            ),
        ],
      ),
    );
  }
}
