import 'package:flutter/material.dart';
import 'package:barbearia/api/api_client.dart' show ApiClient, serverBase;
import 'package:barbearia/config/app_colors.dart';
import 'package:barbearia/config/app_typography.dart';
import 'package:barbearia/view/home_page/components/size_config.dart';
import 'package:barbearia/view/reception_page/cadastro_produto_page.dart';
import 'package:barbearia/view/shared/cadastro_icons.dart';

/// Tela dedicada a Produtos: listagem, cadastro e edição.
/// [openProdutoId] se informado, após carregar a lista abre o cadastro desse produto (ex.: vindo da notificação REABASTECER).
class ProdutosPage extends StatefulWidget {
  final int? openProdutoId;

  const ProdutosPage({Key? key, this.openProdutoId}) : super(key: key);

  @override
  State<ProdutosPage> createState() => _ProdutosPageState();
}

class _ProdutosPageState extends State<ProdutosPage> {
  List<Map<String, dynamic>> _produtosList = [];
  bool _loading = false;
  String? _error;
  final _searchCtrl = TextEditingController();
  String _searchQuery = '';
  bool _openProdutoPending = true;

  @override
  void initState() {
    super.initState();
    _load();
    _searchCtrl.addListener(() => setState(() => _searchQuery = _searchCtrl.text.trim()));
  }

  @override
  void dispose() {
    _searchCtrl.dispose();
    super.dispose();
  }

  Future<void> _load() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final p = await ApiClient.listProdutos(todos: true);
      if (mounted) {
        setState(() {
          _produtosList = p;
          _loading = false;
        });
        if (widget.openProdutoId != null && _openProdutoPending) {
          _openProdutoPending = false;
          WidgetsBinding.instance.addPostFrameCallback((_) => _abrirProdutoSeEncontrado());
        }
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _error = e.toString();
          _loading = false;
        });
      }
    }
  }

  void _abrirProdutoSeEncontrado() {
    final id = widget.openProdutoId;
    if (id == null || id <= 0) return;
    for (final e in _produtosList) {
      final raw = e['id'];
      if (raw == null) continue;
      final v = raw is int ? raw : (raw is num ? raw.toInt() : int.tryParse(raw.toString()));
      if (v == id) {
        _editProduto(e);
        return;
      }
    }
  }

  void _openCadastro() {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => CadastroProdutoPage(
          onSuccess: _load,
        ),
      ),
    ).then((_) => _load());
  }

  void _editProduto(Map<String, dynamic> item) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => CadastroProdutoPage(
          item: item,
          onSuccess: _load,
        ),
      ),
    ).then((_) => _load());
  }

  Future<void> _deleteProduto(Map<String, dynamic> item) async {
    final id = item['id'];
    if (id == null) return;
    final idInt = id is int ? id : int.tryParse(id.toString());
    if (idInt == null || idInt <= 0) return;

    final desc = item['descricao']?.toString() ?? 'este produto';
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: const Color(0xFF1A1A1A),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        title: const Text('Excluir produto', style: TextStyle(color: Colors.white)),
        content: Text(
          'Excluir "$desc"? Esta ação não pode ser desfeita.',
          style: const TextStyle(color: Colors.white70),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(false),
            child: const Text('Cancelar', style: TextStyle(color: Colors.white70)),
          ),
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(true),
            child: Text('Excluir', style: TextStyle(color: Colors.red.shade400, fontWeight: FontWeight.w600)),
          ),
        ],
      ),
    );
    if (ok != true || !mounted) return;

    try {
      await ApiClient.deleteProduto(idInt);
      if (!mounted) return;
      _load();
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Produto excluído.')),
      );
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Erro ao excluir: ${e.toString().replaceAll('Exception: ', '')}')),
      );
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
      if (pos > 1 && pos % 3 == 1 && i != inteiro.length - 1) buffer.write('.');
    }
    return 'R\$ ${buffer.toString()},$cents';
  }

  List<Map<String, dynamic>> get _filtered {
    if (_searchQuery.isEmpty) return _produtosList;
    final q = _searchQuery.toLowerCase();
    return _produtosList
        .where((p) => (p['descricao']?.toString() ?? '').toLowerCase().contains(q))
        .toList();
  }

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Scaffold(
      backgroundColor: AppColors.loginBackground,
      appBar: AppBar(
        backgroundColor: AppColors.loginBackground,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.chevron_left, color: Colors.white, size: 28),
          onPressed: () => Navigator.of(context).pop(),
        ),
        title: const Text(
          'Produtos',
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.w600, fontSize: 18),
        ),
        centerTitle: true,
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 12),
            child: IconButton(
              onPressed: _openCadastro,
              style: IconButton.styleFrom(
                backgroundColor: AppColors.loginOrange,
                foregroundColor: Colors.white,
              ),
              icon: const Icon(Icons.add, size: 24),
            ),
          ),
        ],
      ),
      body: Padding(
        padding: EdgeInsets.symmetric(
          horizontal: SizeConfig.screenWidth! / 18,
          vertical: SizeConfig.screenHeight! / 68.3,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (_loading)
              const Expanded(
                child: Center(
                  child: CircularProgressIndicator(color: AppColors.loginOrange),
                ),
              )
            else if (_error != null)
              Expanded(
                child: Center(
                  child: Padding(
                    padding: const EdgeInsets.all(24.0),
                    child: Text(
                      'Erro: $_error',
                      style: const TextStyle(
                        color: Colors.redAccent,
                        fontSize: 16,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ),
                ),
              )
            else if (_produtosList.isEmpty)
              Expanded(child: _emptyState())
            else ...[
              _searchField(),
              SizedBox(height: SizeConfig.screenHeight! / 68.3),
              Expanded(
                child: _filtered.isEmpty
                    ? _emptySearchState()
                    : ListView.builder(
                        itemCount: _filtered.length + 1,
                        itemBuilder: (context, i) {
                          if (i == _filtered.length) {
                            return Padding(
                              padding: const EdgeInsets.symmetric(vertical: 20),
                              child: Center(
                                child: TextButton(
                                  onPressed: _load,
                                  child: Text(
                                    'Carregar mais produtos',
                                    style: AppTypography.bodyRegular.copyWith(
                                      color: AppColors.loginOrange,
                                    ),
                                  ),
                                ),
                              ),
                            );
                          }
                          return _ProdutoCard(
                            item: _filtered[i],
                            onEdit: _editProduto,
                            onDelete: _deleteProduto,
                            brl: _brl,
                          );
                        },
                      ),
              ),
            ],
          ],
        ),
      ),
    );
  }

  Widget _emptyState() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            Icons.inventory_2_outlined,
            color: AppColors.loginTextMuted,
            size: 64,
          ),
          const SizedBox(height: 20),
          Text(
            'Nenhum produto cadastrado.',
            style: AppTypography.heading4.copyWith(color: Colors.white),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 8),
          Text(
            'Cadastre ou lance produtos para gerenciar seu estoque.',
            style: AppTypography.bodyRegular.copyWith(color: AppColors.loginTextMuted),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 24),
          ElevatedButton.icon(
            onPressed: _openCadastro,
            icon: const Icon(Icons.add, color: Colors.white, size: 22),
            label: const Text('Cadastrar produto', style: TextStyle(color: Colors.white)),
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.loginOrange,
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _searchField() {
    return TextField(
      controller: _searchCtrl,
      style: const TextStyle(color: Colors.white),
      cursorColor: AppColors.loginOrange,
      decoration: InputDecoration(
        hintText: 'Buscar produto...',
        hintStyle: TextStyle(color: AppColors.loginTextMuted, fontSize: 15),
        prefixIcon: Icon(Icons.search, color: AppColors.loginTextMuted, size: 22),
        suffixIcon: _searchQuery.isNotEmpty
            ? IconButton(
                icon: Icon(Icons.clear, color: AppColors.loginTextMuted, size: 20),
                onPressed: () => _searchCtrl.clear(),
              )
            : null,
        filled: true,
        fillColor: AppColors.loginInputBackground,
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide.none,
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.loginOrange, width: 1.5),
        ),
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      ),
    );
  }

  Widget _emptySearchState() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.search_off, color: AppColors.loginTextMuted, size: 56),
          const SizedBox(height: 16),
          Text(
            'Nenhum produto encontrado para "$_searchQuery".',
            style: AppTypography.bodyRegular.copyWith(color: Colors.white),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 8),
          Text(
            'Tente outro termo ou limpe a busca.',
            style: AppTypography.caption.copyWith(color: AppColors.loginTextMuted),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}

class _ProdutoCard extends StatelessWidget {
  final Map<String, dynamic> item;
  final void Function(Map<String, dynamic>) onEdit;
  final void Function(Map<String, dynamic>) onDelete;
  final String Function(num) brl;

  const _ProdutoCard({
    required this.item,
    required this.onEdit,
    required this.onDelete,
    required this.brl,
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
      stockText = 'ESGOTADO';
    } else if (estoque <= 5) {
      dotColor = Colors.amber;
      stockText = 'ESTOQUE BAIXO: $estoque UN.';
    } else {
      dotColor = const Color(0xFF4CAF50);
      stockText = 'EM ESTOQUE: $estoque UN.';
    }

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.loginInputBackground,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                width: 64,
                height: 64,
                decoration: BoxDecoration(
                  color: AppColors.loginBackground,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: useImagem
                    ? ClipRRect(
                        borderRadius: BorderRadius.circular(12),
                        child: Image.network(
                          '$serverBase/$img',
                          fit: BoxFit.cover,
                          width: 64,
                          height: 64,
                          errorBuilder: (_, __, ___) => Icon(icone, color: AppColors.loginOrange, size: 28),
                        ),
                      )
                    : Icon(icone, color: AppColors.loginOrange, size: 28),
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
                        fontSize: 16,
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
                            fontSize: 12,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              IconButton(
                onPressed: () => onEdit(item),
                icon: Icon(Icons.edit_outlined, color: AppColors.loginTextMuted, size: 22),
                tooltip: 'Editar',
              ),
              IconButton(
                onPressed: () => onDelete(item),
                icon: Icon(Icons.delete_outline, color: Colors.red.shade400, size: 22),
                tooltip: 'Excluir',
              ),
            ],
          ),
        ],
      ),
    );
  }
}
