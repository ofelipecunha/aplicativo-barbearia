import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'package:barbearia/config/app_colors.dart';
import 'package:barbearia/config/app_typography.dart';
import 'package:barbearia/api/api_client.dart';
import 'package:barbearia/view/shared/cadastro_icons.dart';

/// Tela de cadastro/edição de Serviço. [item] null = novo; preenchido = editar.
/// Apenas ícone (sem imagem).
class CadastroServicoPage extends StatefulWidget {
  final Map<String, dynamic>? item;
  final VoidCallback? onSuccess;

  const CadastroServicoPage({
    Key? key,
    this.item,
    this.onSuccess,
  }) : super(key: key);

  @override
  State<CadastroServicoPage> createState() => _CadastroServicoPageState();
}

class _CadastroServicoPageState extends State<CadastroServicoPage> {
  final _descCtrl = TextEditingController();
  final _valorCtrl = TextEditingController();
  String _icone = '';
  bool _ativo = true;
  bool _loading = false;

  bool get _isEdit => widget.item != null;

  @override
  void initState() {
    super.initState();
    final i = widget.item;
    if (i != null) {
      _descCtrl.text = i['descricao']?.toString() ?? '';
      _valorCtrl.text = _formatBrlInput((i['valor'] as num?)?.toDouble() ?? 0);
      _icone = i['icone']?.toString() ?? '';
      _ativo = i['ativo'] as bool? ?? true;
    } else {
      _valorCtrl.text = '0,00';
    }
  }

  @override
  void dispose() {
    _descCtrl.dispose();
    _valorCtrl.dispose();
    super.dispose();
  }

  String _formatBrlInput(double v) {
    return v.toStringAsFixed(2).replaceAll('.', ',');
  }

  double _parseBrl(String s) {
    final limpo = s.replaceAll('.', '').replaceAll(',', '.');
    return double.tryParse(limpo) ?? 0;
  }

  Future<void> _save() async {
    final desc = _descCtrl.text.trim();
    if (desc.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Informe a descrição do serviço')),
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
      if (_isEdit) {
        final id = (widget.item!['id'] as num).toInt();
        await ApiClient.updateServico(id, {
          'descricao': desc,
          'valor': valor,
          'icone': _icone,
          'ativo': _ativo,
        });
      } else {
        await ApiClient.createServico(
          descricao: desc,
          valor: valor,
          icone: _icone,
          ativo: _ativo,
        );
      }
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(_isEdit ? 'Serviço atualizado.' : 'Serviço cadastrado.'),
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
          _isEdit ? 'Editar Serviço' : 'Novo Serviço',
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
            _label('ESCOLHA UM ÍCONE'),
            const SizedBox(height: 12),
            Center(
              child: Wrap(
                alignment: WrapAlignment.center,
                runAlignment: WrapAlignment.center,
                spacing: 12,
                runSpacing: 12,
                children: cadastroIconOptions.map((o) {
                final code = o['code'] as String;
                final icon = o['icon'] as IconData;
                final sel = _icone == code;
                return GestureDetector(
                  onTap: () => setState(() => _icone = code),
                  child: Container(
                    width: 52,
                    height: 52,
                    decoration: BoxDecoration(
                      color: AppColors.loginInputBackground,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(
                        color: sel ? AppColors.loginOrange : AppColors.loginTextMuted.withOpacity(0.4),
                        width: sel ? 2 : 1,
                      ),
                    ),
                    child: Icon(
                      icon,
                      color: sel ? AppColors.loginOrange : Colors.white70,
                      size: 26,
                    ),
                  ),
                );
              }).toList(),
              ),
            ),
            const SizedBox(height: 28),
            _label('Descrição'),
            const SizedBox(height: 8),
            _textField(_descCtrl, hint: 'Ex: Corte Degradê'),
            const SizedBox(height: 20),
            _label('Valor (R\$)'),
            const SizedBox(height: 8),
            _currencyField(_valorCtrl),
            const SizedBox(height: 20),
            Row(
              children: [
                Text(
                  'Ativo',
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
                        _isEdit ? 'Salvar Alterações' : 'Cadastrar',
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
