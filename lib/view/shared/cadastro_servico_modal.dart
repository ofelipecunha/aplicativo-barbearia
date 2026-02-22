import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

import 'package:barbearia/api/api_client.dart' show ApiClient, serverBase;
import 'package:barbearia/view/home_page/components/colors.dart';
import 'package:barbearia/view/shared/cadastro_icons.dart';

/// Modal de cadastro/edição de Serviço. [item] null = criar; preenchido = editar.
void showCadastroServicoModal(
  BuildContext context, {
  Map<String, dynamic>? item,
  required VoidCallback onSuccess,
}) {
  showDialog(
    context: context,
    builder: (ctx) => _CadastroServicoDialog(
      item: item,
      onSuccess: onSuccess,
    ),
  );
}

class _CadastroServicoDialog extends StatefulWidget {
  final Map<String, dynamic>? item;
  final VoidCallback onSuccess;

  const _CadastroServicoDialog({
    this.item,
    required this.onSuccess,
  });

  @override
  State<_CadastroServicoDialog> createState() => _CadastroServicoDialogState();
}

class _CadastroServicoDialogState extends State<_CadastroServicoDialog> {
  final _descCtrl = TextEditingController();
  final _valorCtrl = TextEditingController();
  String _icone = '';
  String _imagem = '';
  bool _useImagem = false;
  bool _ativo = true;
  bool _loading = false;

  bool get _isEdit => widget.item != null;

  @override
  void initState() {
    super.initState();
    final i = widget.item;
    if (i != null) {
      _descCtrl.text = i['descricao']?.toString() ?? '';
      _valorCtrl.text = _brl((i['valor'] as num?)?.toDouble() ?? 0);
      _icone = i['icone']?.toString() ?? '';
      _imagem = i['imagem']?.toString() ?? '';
      _useImagem = _imagem.isNotEmpty;
      _ativo = i['ativo'] as bool? ?? true;
    }
  }

  Future<void> _pickImage() async {
    final picker = ImagePicker();
    final x = await picker.pickImage(source: ImageSource.gallery, maxWidth: 800, imageQuality: 85);
    if (x == null || !mounted) return;
    setState(() => _loading = true);
    try {
      final path = await ApiClient.uploadImagem(File(x.path));
      if (!mounted) return;
      setState(() {
        _imagem = path;
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

  Widget _toggleChip(String label, bool selected, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
        decoration: BoxDecoration(
          color: selected ? buttonColor : Colors.grey[200],
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: selected ? buttonColor : Colors.grey[400]!,
            width: selected ? 2 : 1,
          ),
        ),
        child: Text(
          label,
          style: TextStyle(
            color: selected ? Colors.white : Colors.black87,
            fontWeight: FontWeight.w600,
            fontSize: 14,
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _descCtrl.dispose();
    _valorCtrl.dispose();
    super.dispose();
  }

  double _parseBrl(String s) {
    final limpo = s.replaceAll('.', '').replaceAll(',', '.');
    return double.tryParse(limpo) ?? 0;
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
    return '${buffer.toString()},$cents';
  }

  Future<void> _save() async {
    final desc = _descCtrl.text.trim();
    if (desc.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Informe a descrição')),
      );
      return;
    }
    final valor = _parseBrl(_valorCtrl.text);
    if (valor < 0) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Valor inválido')),
      );
      return;
    }
    setState(() => _loading = true);
    try {
      final iconeVal = _useImagem ? '' : _icone;
      final imagemVal = _useImagem ? _imagem : '';
      if (_isEdit) {
        final id = (widget.item!['id'] as num).toInt();
        await ApiClient.updateServico(id, {
          'descricao': desc,
          'valor': valor,
          'icone': iconeVal,
          'imagem': imagemVal,
          'ativo': _ativo,
        });
      } else {
        await ApiClient.createServico(
          descricao: desc,
          valor: valor,
          icone: iconeVal,
          imagem: imagemVal,
          ativo: _ativo,
        );
      }
      if (!context.mounted) return;
      Navigator.of(context).pop();
      widget.onSuccess();
    } catch (e) {
      if (!context.mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(e.toString().replaceAll('Exception: ', ''))),
      );
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      backgroundColor: Colors.white,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      child: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    _isEdit ? 'Editar serviço' : 'Novo serviço',
                    style: const TextStyle(
                      color: Colors.black87,
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  IconButton(
                    onPressed: () => Navigator.of(context).pop(),
                    icon: const Icon(Icons.close, color: Colors.black54),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              const Text(
                'Imagem ou ícone',
                style: TextStyle(color: Colors.black87, fontSize: 14, fontWeight: FontWeight.w600),
              ),
              const SizedBox(height: 10),
              Row(
                children: [
                  _toggleChip('Ícone', !_useImagem, () => setState(() {
                    _useImagem = false;
                    _imagem = '';
                  })),
                  const SizedBox(width: 10),
                  _toggleChip('Imagem', _useImagem, () => setState(() {
                    _useImagem = true;
                    _icone = '';
                  })),
                ],
              ),
              const SizedBox(height: 14),
              if (!_useImagem) ...[
                const Text('Escolha um ícone', style: TextStyle(color: Colors.black54, fontSize: 12)),
                const SizedBox(height: 10),
                Wrap(
                  spacing: 10,
                  runSpacing: 10,
                  children: cadastroIconOptions.map((o) {
                    final code = o['code'] as String;
                    final icon = o['icon'] as IconData;
                    final sel = _icone == code;
                    return GestureDetector(
                      onTap: () => setState(() => _icone = code),
                      child: Container(
                        width: 48,
                        height: 48,
                        decoration: BoxDecoration(
                          color: sel ? buttonColor : Colors.grey[200],
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(
                            color: sel ? buttonColor : Colors.grey[300]!,
                            width: sel ? 2 : 1,
                          ),
                        ),
                        child: Icon(icon, color: sel ? Colors.white : Colors.black87, size: 24),
                      ),
                    );
                  }).toList(),
                ),
              ] else ...[
                const Text('Escolha uma imagem da galeria', style: TextStyle(color: Colors.black54, fontSize: 12)),
                const SizedBox(height: 10),
                Row(
                  children: [
                    OutlinedButton.icon(
                      onPressed: _loading ? null : _pickImage,
                      icon: const Icon(Icons.photo_library_outlined, size: 20),
                      label: const Text('Galeria'),
                      style: OutlinedButton.styleFrom(
                        foregroundColor: buttonColor,
                        side: BorderSide(color: buttonColor),
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                      ),
                    ),
                    if (_imagem.isNotEmpty) ...[
                      const SizedBox(width: 12),
                      ClipRRect(
                        borderRadius: BorderRadius.circular(12),
                        child: Image.network(
                          '$serverBase/$_imagem',
                          height: 56,
                          width: 56,
                          fit: BoxFit.cover,
                          errorBuilder: (_, __, ___) => Icon(Icons.broken_image, color: Colors.grey[400], size: 40),
                        ),
                      ),
                    ],
                  ],
                ),
              ],
              const SizedBox(height: 20),
              TextField(
                controller: _descCtrl,
                decoration: InputDecoration(
                  labelText: 'Descrição',
                  labelStyle: const TextStyle(color: Colors.black54),
                  filled: true,
                  fillColor: Colors.grey[100],
                  enabledBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                    borderSide: BorderSide(color: Colors.grey[300]!),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                    borderSide: BorderSide(color: buttonColor, width: 2),
                  ),
                ),
                style: const TextStyle(color: Colors.black87),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: _valorCtrl,
                keyboardType: TextInputType.number,
                decoration: InputDecoration(
                  labelText: 'Valor (R\$)',
                  hintText: 'Ex: 50,00',
                  labelStyle: const TextStyle(color: Colors.black54),
                  hintStyle: const TextStyle(color: Colors.black38),
                  filled: true,
                  fillColor: Colors.grey[100],
                  enabledBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                    borderSide: BorderSide(color: Colors.grey[300]!),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                    borderSide: BorderSide(color: buttonColor, width: 2),
                  ),
                ),
                style: const TextStyle(color: Colors.black87),
              ),
              const SizedBox(height: 16),
              Row(
                children: [
                  const Text('Ativo',
                      style: TextStyle(color: Colors.black87, fontSize: 14)),
                  const SizedBox(width: 12),
                  Switch(
                    value: _ativo,
                    onChanged: (v) => setState(() => _ativo = v),
                    activeColor: buttonColor,
                  ),
                ],
              ),
              const SizedBox(height: 24),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: _loading ? null : _save,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: buttonColor,
                    padding: const EdgeInsets.symmetric(vertical: 14),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  child: _loading
                      ? const SizedBox(
                          height: 22,
                          width: 22,
                          child: CircularProgressIndicator(
                            color: Colors.white,
                            strokeWidth: 2,
                          ),
                        )
                      : Text(
                          _isEdit ? 'Salvar' : 'Cadastrar',
                          style: const TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                            fontSize: 16,
                          ),
                        ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
