import 'package:flutter/material.dart';
import 'package:barbearia/api/api_client.dart';
import 'package:barbearia/view/home_page/components/colors.dart';

/// Exibe o modal "Novo cliente" e adiciona à fila. Chama [onSuccess] após salvar.
Future<void> showAddClienteModal(
  BuildContext context, {
  VoidCallback? onSuccess,
}) async {
  await showDialog(
    context: context,
    barrierDismissible: true,
    builder: (ctx) => _AddClienteDialogContent(
      dialogContext: ctx,
      onSuccess: onSuccess,
    ),
  );
}

/// Conteúdo do dialog como StatefulWidget para gerenciar o controller
/// e evitar "TextEditingController was used after being disposed".
class _AddClienteDialogContent extends StatefulWidget {
  final BuildContext dialogContext;
  final VoidCallback? onSuccess;

  const _AddClienteDialogContent({
    required this.dialogContext,
    this.onSuccess,
  });

  @override
  State<_AddClienteDialogContent> createState() => _AddClienteDialogContentState();
}

class _AddClienteDialogContentState extends State<_AddClienteDialogContent> {
  late final TextEditingController _ctrl;
  bool _isProcessing = false;

  @override
  void initState() {
    super.initState();
    _ctrl = TextEditingController();
  }

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  Future<void> _salvar() async {
    final nome = _ctrl.text.trim();
    if (nome.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Informe o nome do cliente')),
      );
      return;
    }

    setState(() => _isProcessing = true);

    try {
      await ApiClient.addClienteFila(nome);
      if (!mounted) return;

      Navigator.of(widget.dialogContext).pop();

      WidgetsBinding.instance.addPostFrameCallback((_) {
        widget.onSuccess?.call();
      });
    } catch (e) {
      if (!mounted) return;
      setState(() => _isProcessing = false);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
            'Erro ao salvar cliente: ${e.toString().replaceAll("Exception: ", "")}',
          ),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      backgroundColor: Colors.white,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      title: const Text(
        'Novo cliente',
        style: TextStyle(color: Colors.black87, fontWeight: FontWeight.bold),
      ),
      content: TextField(
        controller: _ctrl,
        autofocus: true,
        decoration: InputDecoration(
          labelText: 'Nome',
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
      actions: [
        TextButton(
          onPressed: _isProcessing ? null : () => Navigator.of(widget.dialogContext).pop(),
          child: const Text('CANCELAR', style: TextStyle(color: Colors.black54)),
        ),
        ElevatedButton(
          style: ElevatedButton.styleFrom(backgroundColor: buttonColor),
          onPressed: _isProcessing ? null : _salvar,
          child: _isProcessing
              ? const SizedBox(
                  width: 20,
                  height: 20,
                  child: CircularProgressIndicator(
                    color: Colors.white,
                    strokeWidth: 2,
                  ),
                )
              : const Text('SALVAR', style: TextStyle(color: Colors.white)),
        ),
      ],
    );
  }
}
