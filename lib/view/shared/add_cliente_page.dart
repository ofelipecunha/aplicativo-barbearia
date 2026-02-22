import 'package:flutter/material.dart';
import 'package:barbearia/view/home_page/components/colors.dart';
import 'package:barbearia/view/home_page/components/size_config.dart';
import 'add_cliente_modal.dart';

/// Aba "Adicionar": botão para novo cliente + auto-abre o modal ao entrar.
class AddClientePage extends StatefulWidget {
  final VoidCallback? onSuccess;
  final bool autoOpenModal;

  const AddClientePage({
    Key? key,
    this.onSuccess,
    this.autoOpenModal = true,
  }) : super(key: key);

  @override
  State<AddClientePage> createState() => _AddClientePageState();
}

class _AddClientePageState extends State<AddClientePage> {
  bool _modalAberto = false;
  bool _isProcessing = false;

  @override
  void initState() {
    super.initState();
    if (widget.autoOpenModal && !_modalAberto && !_isProcessing) {
      // Delay para garantir que o widget está totalmente montado
      WidgetsBinding.instance.addPostFrameCallback((_) async {
        if (!mounted || _modalAberto || _isProcessing) return;
        _modalAberto = true;
        _isProcessing = true;
        try {
          await showAddClienteModal(
            context,
            onSuccess: () {
              // Executar callback de forma segura
              if (mounted && !_isProcessing) {
                widget.onSuccess?.call();
              }
            },
          );
        } finally {
          if (mounted) {
            _modalAberto = false;
            _isProcessing = false;
          }
        }
      });
    }
  }

  void _openModal() async {
    if (_modalAberto || _isProcessing) return;
    _modalAberto = true;
    _isProcessing = true;
    try {
      await showAddClienteModal(
        context,
        onSuccess: () {
          // Executar callback de forma segura
          if (mounted && !_isProcessing) {
            widget.onSuccess?.call();
          }
        },
      );
    } finally {
      if (mounted) {
        _modalAberto = false;
        _isProcessing = false;
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.person_add, color: Colors.white38, size: 64),
            const SizedBox(height: 16),
            const Text(
              'Adicionar cliente à fila',
              style: TextStyle(color: Colors.white70, fontSize: 16),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 24),
            ElevatedButton.icon(
              onPressed: _openModal,
              icon: const Icon(Icons.add_circle, color: Colors.white),
              label: const Text('Novo cliente', style: TextStyle(color: Colors.white)),
              style: ElevatedButton.styleFrom(
                backgroundColor: buttonColor,
                padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
