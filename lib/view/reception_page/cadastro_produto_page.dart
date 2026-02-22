import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:image_picker/image_picker.dart';

import 'package:barbearia/config/app_colors.dart';
import 'package:barbearia/config/app_typography.dart';
import 'package:barbearia/api/api_client.dart' show ApiClient, serverBase;
import 'package:barbearia/view/shared/cadastro_icons.dart';

/// Tela de cadastro/edição de Produto. [item] null = novo; preenchido = editar.
class CadastroProdutoPage extends StatefulWidget {
  final Map<String, dynamic>? item;
  final VoidCallback? onSuccess;

  const CadastroProdutoPage({
    Key? key,
    this.item,
    this.onSuccess,
  }) : super(key: key);

  @override
  State<CadastroProdutoPage> createState() => _CadastroProdutoPageState();
}

class _CadastroProdutoPageState extends State<CadastroProdutoPage> {
  final _descCtrl = TextEditingController();
  final _valorVendaCtrl = TextEditingController();
  final _valorCustoCtrl = TextEditingController();
  final _estoqueCtrl = TextEditingController();
  String _icone = '';
  String _imagem = '';
  bool _ativo = true;
  bool _loading = false;

  bool get _isEdit => widget.item != null;

  @override
  void initState() {
    super.initState();
    final i = widget.item;
    if (i != null) {
      _descCtrl.text = i['descricao']?.toString() ?? '';
      _valorVendaCtrl.text = _formatBrlInput((i['valor_venda'] as num?)?.toDouble() ?? 0);
      _valorCustoCtrl.text = _formatBrlInput((i['valor_custo'] as num?)?.toDouble() ?? 0);
      final est = (i['estoque'] as num?)?.toInt();
      _estoqueCtrl.text = (est != null && est >= 0) ? est.toString() : '0';
      _icone = i['icone']?.toString() ?? '';
      _imagem = i['imagem']?.toString() ?? '';
      _ativo = i['ativo'] as bool? ?? true;
    } else {
      _valorVendaCtrl.text = '0,00';
      _valorCustoCtrl.text = '0,00';
      _estoqueCtrl.text = '0';
    }
  }

  @override
  void dispose() {
    _descCtrl.dispose();
    _valorVendaCtrl.dispose();
    _valorCustoCtrl.dispose();
    _estoqueCtrl.dispose();
    super.dispose();
  }

  String _formatBrlInput(double v) {
    final s = v.toStringAsFixed(2).replaceAll('.', ',');
    return s;
  }

  Future<void> _pickImage() async {
    final picker = ImagePicker();
    final x = await picker.pickImage(
      source: ImageSource.gallery,
      maxWidth: 800,
      imageQuality: 85,
    );
    if (x == null || !mounted) return;
    setState(() => _loading = true);
    try {
      final path = await ApiClient.uploadImagem(File(x.path));
      if (!mounted) return;
      setState(() {
        _imagem = path;
        _icone = '';
        _loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() => _loading = false);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(e.toString().replaceAll('Exception: ', ''))),
      );
    }
  }

  double _parseBrl(String s) {
    final limpo = s.replaceAll('.', '').replaceAll(',', '.');
    return double.tryParse(limpo) ?? 0;
  }

  Future<void> _save() async {
    final desc = _descCtrl.text.trim();
    if (desc.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Informe o nome do produto')),
      );
      return;
    }
    final valorVenda = _parseBrl(_valorVendaCtrl.text);
    if (valorVenda < 0) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Valor de venda inválido')),
      );
      return;
    }
    final valorCusto = _parseBrl(_valorCustoCtrl.text);
    final estoque = int.tryParse(_estoqueCtrl.text.trim()) ?? 0;
    if (estoque < 0) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Estoque deve ser >= 0')),
      );
      return;
    }

    setState(() => _loading = true);
    try {
      if (_isEdit) {
        final id = (widget.item!['id'] as num).toInt();
        await ApiClient.updateProduto(id, {
          'descricao': desc,
          'valor_venda': valorVenda,
          'valor_custo': valorCusto,
          'estoque': estoque,
          'icone': _imagem.isEmpty ? _icone : '',
          'imagem': _imagem,
          'ativo': _ativo,
        });
      } else {
        await ApiClient.createProduto(
          descricao: desc,
          valorVenda: valorVenda,
          valorCusto: valorCusto,
          estoque: estoque,
          icone: _imagem.isEmpty ? _icone : '',
          imagem: _imagem,
          ativo: _ativo,
        );
      }
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(_isEdit ? 'Produto atualizado.' : 'Produto cadastrado.'),
        ),
      );
      widget.onSuccess?.call();
      Navigator.of(context).pop();
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(e.toString().replaceAll('Exception: ', ''))),
      );
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.loginBackground,
      appBar: AppBar(
        backgroundColor: AppColors.loginBackground,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.chevron_left, color: Colors.white, size: 28),
          onPressed: () => Navigator.of(context).pop(),
        ),
        title: Text(
          _isEdit ? 'Editar Produto' : 'Novo Produto',
          style: const TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.w600,
            fontSize: 18,
          ),
        ),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Foto do Produto
            GestureDetector(
              onTap: _loading ? null : _pickImage,
              child: Container(
                height: 180,
                decoration: BoxDecoration(
                  color: AppColors.loginInputBackground,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(
                    color: AppColors.loginTextMuted.withOpacity(0.5),
                    width: 2,
                    strokeAlign: BorderSide.strokeAlignInside,
                  ),
                ),
                child: _imagem.isNotEmpty
                    ? ClipRRect(
                        borderRadius: BorderRadius.circular(14),
                        child: Stack(
                          fit: StackFit.expand,
                          children: [
                            Image.network(
                              '$serverBase/$_imagem',
                              fit: BoxFit.cover,
                              errorBuilder: (_, __, ___) => _uploadPlaceholder(),
                            ),
                            if (_loading)
                              Container(
                                color: Colors.black54,
                                child: const Center(
                                  child: CircularProgressIndicator(color: AppColors.loginOrange),
                                ),
                              ),
                            Positioned(
                              top: 8,
                              right: 8,
                              child: IconButton(
                                onPressed: _loading ? null : () => setState(() => _imagem = ''),
                                icon: const Icon(Icons.close, color: Colors.white, size: 20),
                                style: IconButton.styleFrom(
                                  backgroundColor: Colors.black54,
                                  padding: const EdgeInsets.all(6),
                                ),
                              ),
                            ),
                          ],
                        ),
                      )
                    : _uploadPlaceholder(),
              ),
            ),
            const SizedBox(height: 28),
            // Nome do Produto
            _label('Nome do Produto'),
            const SizedBox(height: 8),
            _textField(_descCtrl, hint: 'Ex: Shampoo Anticaspa'),
            const SizedBox(height: 20),
            // Preço de Venda e Em estoque
            Row(
              children: [
                Expanded(
                  flex: 2,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      _label('Preço de Venda'),
                      const SizedBox(height: 8),
                      _currencyField(_valorVendaCtrl),
                    ],
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      _label('Em estoque'),
                      const SizedBox(height: 8),
                      _numberField(_estoqueCtrl),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20),
            // Preço de Custo
            _label('Preço de Custo'),
            const SizedBox(height: 8),
            _currencyField(_valorCustoCtrl),
            const SizedBox(height: 20),
            // Categoria (Ícone)
            _label('Categoria'),
            const SizedBox(height: 8),
            _categoriaDropdown(),
            const SizedBox(height: 20),
            // Ativo
            Row(
              children: [
                Text(
                  'Produto ativo',
                  style: AppTypography.bodyRegular.copyWith(color: Colors.white),
                ),
                const SizedBox(width: 12),
                Switch(
                  value: _ativo,
                  onChanged: (v) => setState(() => _ativo = v),
                  activeColor: AppColors.loginOrange,
                ),
              ],
            ),
            const SizedBox(height: 32),
            // Botão Cadastrar
            SizedBox(
              height: 56,
              child: ElevatedButton(
                onPressed: _loading ? null : _save,
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.loginOrange,
                  foregroundColor: Colors.white,
                  elevation: 0,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(14),
                  ),
                ),
                child: _loading
                    ? const SizedBox(
                        height: 24,
                        width: 24,
                        child: CircularProgressIndicator(
                          color: Colors.white,
                          strokeWidth: 2,
                        ),
                      )
                    : Text(
                        _isEdit ? 'Salvar Alterações' : 'Cadastrar Produto',
                        style: AppTypography.bodyBold.copyWith(
                          color: Colors.white,
                          fontSize: 16,
                        ),
                      ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _uploadPlaceholder() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Icon(
          Icons.camera_alt_outlined,
          color: AppColors.loginTextMuted,
          size: 48,
        ),
        const SizedBox(height: 12),
        Text(
          'Toque para fazer upload',
          style: AppTypography.bodyRegular.copyWith(
            color: AppColors.loginTextMuted,
            fontSize: 14,
          ),
        ),
        if (_loading)
          const Padding(
            padding: EdgeInsets.only(top: 12),
            child: SizedBox(
              height: 24,
              width: 24,
              child: CircularProgressIndicator(
                color: AppColors.loginOrange,
                strokeWidth: 2,
              ),
            ),
          ),
      ],
    );
  }

  Widget _label(String text) {
    return Text(
      text,
      style: AppTypography.bodyBold.copyWith(
        color: Colors.white,
        fontSize: 14,
      ),
    );
  }

  Widget _textField(TextEditingController ctrl, {String? hint}) {
    return TextField(
      controller: ctrl,
      style: const TextStyle(color: Colors.white),
      cursorColor: AppColors.loginOrange,
      decoration: InputDecoration(
        hintText: hint,
        hintStyle: TextStyle(color: AppColors.loginTextMuted),
        filled: true,
        fillColor: AppColors.loginInputBackground,
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide.none,
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.loginOrange, width: 1),
        ),
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
      ),
    );
  }

  Widget _currencyField(TextEditingController ctrl) {
    return TextField(
      controller: ctrl,
      keyboardType: TextInputType.number,
      inputFormatters: [_BrlInputFormatter()],
      style: const TextStyle(color: Colors.white),
      cursorColor: AppColors.loginOrange,
      decoration: InputDecoration(
        hintText: '0,00',
        hintStyle: TextStyle(color: AppColors.loginTextMuted),
        prefixText: 'R\$ ',
        prefixStyle: const TextStyle(color: Colors.white),
        filled: true,
        fillColor: AppColors.loginInputBackground,
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide.none,
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.loginOrange, width: 1),
        ),
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
      ),
    );
  }

  Widget _numberField(TextEditingController ctrl) {
    return TextField(
      controller: ctrl,
      keyboardType: TextInputType.number,
      inputFormatters: [FilteringTextInputFormatter.digitsOnly],
      style: const TextStyle(color: Colors.white),
      cursorColor: AppColors.loginOrange,
      decoration: InputDecoration(
        hintText: '0',
        hintStyle: TextStyle(color: AppColors.loginTextMuted),
        filled: true,
        fillColor: AppColors.loginInputBackground,
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide.none,
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.loginOrange, width: 1),
        ),
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
      ),
    );
  }

  Widget _categoriaDropdown() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
      decoration: BoxDecoration(
        color: AppColors.loginInputBackground,
        borderRadius: BorderRadius.circular(12),
      ),
      child: DropdownButtonHideUnderline(
        child: DropdownButton<String>(
          value: _icone.isEmpty ? null : _icone,
          isExpanded: true,
          dropdownColor: AppColors.loginInputBackground,
          hint: Text(
            'Selecione uma categoria',
            style: TextStyle(color: AppColors.loginTextMuted),
          ),
          icon: Icon(Icons.arrow_drop_down, color: AppColors.loginTextMuted),
          items: [
            const DropdownMenuItem<String>(
              value: '',
              child: Text('Nenhuma', style: TextStyle(color: Colors.white)),
            ),
            ...cadastroIconOptions.map((o) {
              final code = o['code'] as String;
              final label = o['label'] as String;
              return DropdownMenuItem<String>(
                value: code,
                child: Text(label, style: const TextStyle(color: Colors.white)),
              );
            }),
          ],
          onChanged: (v) => setState(() => _icone = v ?? ''),
        ),
      ),
    );
  }
}

class _BrlInputFormatter extends TextInputFormatter {
  @override
  TextEditingValue formatEditUpdate(
    TextEditingValue oldValue,
    TextEditingValue newValue,
  ) {
    final raw = newValue.text.replaceAll(RegExp(r'\D'), '');
    final cents = raw.isEmpty ? 0 : int.tryParse(raw) ?? 0;
    final reais = cents / 100;
    final formatted = _format(reais);
    return TextEditingValue(
      text: formatted,
      selection: TextSelection.collapsed(offset: formatted.length),
    );
  }

  static String _format(double v) {
    final inteiro = v.truncate();
    final centavos = ((v - inteiro) * 100).round().clamp(0, 99);
    final s = '${inteiro.abs()}';
    final buffer = StringBuffer();
    for (var i = 0; i < s.length; i++) {
      if (i > 0 && (s.length - i) % 3 == 0) buffer.write('.');
      buffer.write(s[i]);
    }
    final sg = v < 0 ? '-' : '';
    return '$sg${buffer.toString()},${centavos.toString().padLeft(2, '0')}';
  }
}
