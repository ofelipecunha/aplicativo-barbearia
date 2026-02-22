import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:barbearia/config/app_colors.dart';
import 'package:barbearia/config/app_typography.dart';
import 'package:barbearia/view/home_page/components/size_config.dart';
import 'package:barbearia/api/api_client.dart';

class CashPage extends StatefulWidget {
  final bool showBackButton;

  const CashPage({Key? key, this.showBackButton = true}) : super(key: key);

  @override
  State<CashPage> createState() => _CashPageState();
}

class _CashPageState extends State<CashPage> {
  double caixaDoDia = 0;
  String filtro = "TODOS";
  Map<String, dynamic>? caixaAberto;
  final TextEditingController _sangriaValorController = TextEditingController();
  final TextEditingController _obsUltimoController = TextEditingController();
  final TextEditingController _aberturaValorController = TextEditingController();
  final TextEditingController _aberturaObsController = TextEditingController();
  final TextEditingController _fechamentoObsController =
      TextEditingController();

  List<Map<String, dynamic>> lancamentos = [];
  bool loading = false;
  String? error;

  @override
  void initState() {
    super.initState();
    _carregarDados();
  }

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Scaffold(
      backgroundColor: AppColors.loginBackground,
      appBar: AppBar(
        backgroundColor: AppColors.loginBackground,
        elevation: 0,
        leading: widget.showBackButton
            ? IconButton(
                icon: const Icon(Icons.chevron_left, color: Colors.white, size: 28),
                onPressed: () => Navigator.of(context).pop(),
              )
            : null,
        automaticallyImplyLeading: widget.showBackButton,
        title: const Text(
          "Caixa",
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.w600),
        ),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.all(SizeConfig.screenWidth! / 18),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                "Caixa do dia",
                style: TextStyle(
                  color: AppColors.loginTextMuted,
                  fontSize: 14,
                ),
              ),
              SizedBox(height: SizeConfig.screenHeight! / 136.6),
              if (loading)
                const Center(
                  child: Padding(
                    padding: EdgeInsets.all(24),
                    child: CircularProgressIndicator(color: AppColors.loginOrange),
                  ),
                )
              else if (caixaAberto == null)
                _buildCaixaFechado()
              else ...[
                Text(
                  _brl(caixaDoDia),
                  style: AppTypography.heading2.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: SizeConfig.screenHeight! / 34.15),
                Row(
                  children: [
                    Expanded(
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: AppColors.loginOrange,
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(vertical: 14),
                          elevation: 0,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12),
                          ),
                        ),
                        onPressed: _openSangriaModal,
                        child: const Text(
                          "SANGRIA",
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                    SizedBox(width: SizeConfig.screenWidth! / 41),
                    Expanded(
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: AppColors.loginInputBackground,
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(vertical: 14),
                          elevation: 0,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12),
                          ),
                        ),
                        onPressed: _openEncerrarModal,
                        child: const Text(
                          "ENCERRAR CAIXA",
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ],
              if (caixaAberto != null) ...[
                SizedBox(height: SizeConfig.screenHeight! / 22.77),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      "Lançamentos",
                      style: AppTypography.heading4.copyWith(
                        color: Colors.white,
                      ),
                    ),
                    Text(
                      "HOJE",
                      style: AppTypography.caption.copyWith(
                        color: AppColors.loginTextMuted,
                      ),
                    ),
                  ],
                ),
                SizedBox(height: SizeConfig.screenHeight! / 80),
                if (error != null)
                  Padding(
                    padding: const EdgeInsets.symmetric(vertical: 8.0),
                    child: Text(
                      "Erro: $error",
                      style: const TextStyle(color: AppColors.error),
                    ),
                  ),
                Row(
                  children: [
                    _filterChip("TODOS", "Todos"),
                    const SizedBox(width: 10),
                    _filterChip("ENTRADA", "Entrada"),
                    const SizedBox(width: 10),
                    _filterChip("SAÍDA", "Saída"),
                  ],
                ),
                SizedBox(height: SizeConfig.screenHeight! / 56),
                ListView.separated(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  itemCount: _filtrarLancamentos().length,
                  separatorBuilder: (_, __) => const SizedBox(height: 12),
                  itemBuilder: (context, index) {
                    final item = _filtrarLancamentos()[index];
                    return _LancamentoCard(item: item, brl: _brl);
                  },
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildCaixaFechado() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Text(
          "Nenhum caixa aberto",
          style: AppTypography.bodyRegular.copyWith(
            color: AppColors.loginTextMuted,
          ),
        ),
        SizedBox(height: SizeConfig.screenHeight! / 34.15),
        ElevatedButton(
          style: ElevatedButton.styleFrom(
            backgroundColor: AppColors.loginOrange,
            foregroundColor: Colors.white,
            padding: const EdgeInsets.symmetric(vertical: 14),
            elevation: 0,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
          ),
          onPressed: _openAbrirModal,
          child: const Text(
            "ABRIR CAIXA",
            style: TextStyle(
              color: Colors.white,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
      ],
    );
  }

  Widget _filterChip(String value, String label) {
    final selected = filtro == value;
    return GestureDetector(
      onTap: () => setState(() => filtro = value),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
        decoration: BoxDecoration(
          color: selected
              ? AppColors.loginOrange
              : AppColors.loginInputBackground,
          borderRadius: BorderRadius.circular(10),
        ),
        child: Text(
          label,
          style: AppTypography.caption.copyWith(
            color: selected ? Colors.white : AppColors.loginTextMuted,
            fontWeight: selected ? FontWeight.w600 : FontWeight.normal,
          ),
        ),
      ),
    );
  }

  Future<void> _carregarDados() async {
    setState(() {
      loading = true;
      error = null;
    });
    try {
      final aberto = await ApiClient.getCaixaAberto();
      final saldo = await ApiClient.getSaldoDia();
      final ultimos = await ApiClient.getUltimosLancamentos();
      setState(() {
        caixaAberto = aberto;
        caixaDoDia = saldo;
        lancamentos = ultimos
            .map((e) {
              final tipo = (e["tipo"] ?? "ENTRADA").toString().toUpperCase();
              return {
                "tipo": tipo.contains("SAIDA") || tipo == "SAÍDA" ? "SAÍDA" : "ENTRADA",
                "id": e["id"],
                "origem": e["origem"],
                "cliente": e["nome"] ?? e["cliente"] ?? "",
                "descricao": e["descricao"] ?? e["origem"] ?? _descricaoPadrao(e),
                "observacao": e["observacao"] ?? "",
                "fornecedor": e["fornecedor"] ?? "",
                "valor": (e["valor"] ?? 0) is num
                    ? (e["valor"] as num).toDouble()
                    : 0.0,
                "data": (e["data"] ?? e["data_pagamento"] ?? e["created_at"] ?? "").toString(),
              };
            })
            .toList();
      });
    } catch (e) {
      setState(() {
        error = e.toString();
      });
    } finally {
      setState(() {
        loading = false;
      });
    }
  }

  String _descricaoPadrao(Map<String, dynamic> e) {
    final tipo = (e["tipo"] ?? "").toString().toUpperCase();
    if (tipo.contains("SAIDA") || tipo == "SAÍDA") {
      if (e["observacao"] != null && (e["observacao"] as String).isNotEmpty) {
        return "Sangria de Caixa";
      }
      return "Compra de Produtos";
    }
    return e["origem"]?.toString() ?? "Pagamento";
  }

  void _openAbrirModal() {
    _aberturaValorController.text = "0,00";
    _aberturaObsController.text = "";
    showDialog(
      context: context,
      builder: (ctx) {
        return AlertDialog(
          backgroundColor: Colors.white,
          shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16)),
          title: const Text("Abrir caixa",
              style: TextStyle(
                  color: Colors.black87, fontWeight: FontWeight.bold)),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              _currencyField("Valor de abertura",
                  controller: _aberturaValorController),
              const SizedBox(height: 10),
              _inputField("Observação",
                  controller: _aberturaObsController, maxLines: 2),
            ],
          ),
          actions: [
            TextButton(
                onPressed: () => Navigator.of(ctx).pop(),
                child: const Text("CANCELAR",
                    style: TextStyle(color: Colors.black54))),
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.loginOrange,
                foregroundColor: Colors.white,
              ),
              onPressed: () async {
                final v = _parseBrl(_aberturaValorController.text);
                if (v < 0) {
                  ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text("Informe valor >= 0")));
                  return;
                }
                try {
                  await ApiClient.abrirCaixa(v,
                      observacao: _aberturaObsController.text.trim());
                  if (!mounted) return;
                  Navigator.of(ctx).pop();
                  _carregarDados();
                } catch (e) {
                  if (!mounted) return;
                  ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text(e.toString().replaceAll("Exception: ", ""))));
                }
              },
              child: const Text("ABRIR", style: TextStyle(color: Colors.white)),
            ),
          ],
        );
      },
    );
  }

  void _openSangriaModal() {
    final today = DateTime.now();
    _sangriaValorController.text = "0,00";
    _obsUltimoController.text = "";
    showDialog(
      context: context,
      builder: (ctx) {
        return AlertDialog(
          backgroundColor: Colors.white,
          shape:
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          title: const Text("Sangria",
              style:
                  TextStyle(color: Colors.black87, fontWeight: FontWeight.bold)),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              _readOnlyField("Data", _formatDate(today)),
              const SizedBox(height: 10),
              _currencyField("Valor", controller: _sangriaValorController),
              const SizedBox(height: 10),
              _inputField("Observação",
                  controller: _obsUltimoController, maxLines: 3),
            ],
          ),
          actions: [
            TextButton(
                onPressed: () => Navigator.of(ctx).pop(),
                child: const Text("CANCELAR",
                    style: TextStyle(color: Colors.black54))),
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.loginOrange,
                foregroundColor: Colors.white,
              ),
              onPressed: () async {
                final valor = _parseBrl(_sangriaValorController.text);
                if (valor <= 0) {
                  ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text("Informe um valor válido")));
                  return;
                }
                try {
                  await ApiClient.registrarSangria(valor,
                      observacao: _obsUltimoController.text.trim());
                  if (!mounted) return;
                  Navigator.of(ctx).pop();
                  _carregarDados();
                } catch (e) {
                  if (!mounted) return;
                  Navigator.of(ctx).pop();
                  ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
                      content: Text("Erro ao registrar sangria")));
                }
              },
              child:
                  const Text("SALVAR", style: TextStyle(color: Colors.white)),
            ),
          ],
        );
      },
    );
  }

  void _openEncerrarModal() {
    final now = DateTime.now();
    _fechamentoObsController.text = "";
    showDialog(
      context: context,
      builder: (ctx) {
        return AlertDialog(
          backgroundColor: Colors.white,
          shape:
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          title: const Text("Encerrar caixa",
              style:
                  TextStyle(color: Colors.black87, fontWeight: FontWeight.bold)),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _readOnlyField("Data/Hora", _formatDateTime(now)),
              const SizedBox(height: 10),
              _readOnlyField("Saldo (valor fechamento)", _brl(caixaDoDia)),
              const SizedBox(height: 10),
              _inputField("Observação",
                  controller: _fechamentoObsController, maxLines: 3),
            ],
          ),
          actions: [
            TextButton(
                onPressed: () => Navigator.of(ctx).pop(),
                child: const Text("CANCELAR",
                    style: TextStyle(color: Colors.black54))),
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.loginOrange,
                foregroundColor: Colors.white,
              ),
              onPressed: () async {
                try {
                  await ApiClient.fecharCaixa(caixaDoDia,
                      observacao: _fechamentoObsController.text.trim());
                  if (!mounted) return;
                  Navigator.of(ctx).pop();
                  _carregarDados();
                } catch (e) {
                  if (!mounted) return;
                  ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                      content: Text(
                          e.toString().replaceAll("Exception: ", ""))));
                }
              },
              child:
                  const Text("ENCERRAR", style: TextStyle(color: Colors.white)),
            ),
          ],
        );
      },
    );
  }

  Widget _readOnlyField(String label, String value) {
    return TextField(
      readOnly: true,
      controller: TextEditingController(text: value),
      decoration: InputDecoration(
        labelText: label,
        labelStyle: const TextStyle(color: Colors.black54),
        filled: true,
        fillColor: Colors.grey[100],
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide(color: Colors.grey[300]!),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.loginOrange, width: 2),
        ),
      ),
      style: const TextStyle(color: Colors.black87),
    );
  }

  Widget _inputField(String label,
      {int maxLines = 1, TextEditingController? controller}) {
    return TextField(
      controller: controller,
      maxLines: maxLines,
      decoration: InputDecoration(
        labelText: label,
        labelStyle: const TextStyle(color: Colors.black54),
        filled: true,
        fillColor: Colors.grey[100],
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide(color: Colors.grey[300]!),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.loginOrange, width: 2),
        ),
      ),
      style: const TextStyle(color: Colors.black87),
    );
  }

  double _parseBrl(String s) {
    final limpo = s.replaceAll(".", "").replaceAll(",", ".");
    return double.tryParse(limpo) ?? 0.0;
  }

  Widget _currencyField(String label,
      {required TextEditingController controller}) {
    return TextField(
      controller: controller,
      keyboardType: TextInputType.number,
      inputFormatters: [_BrlCurrencyInputFormatter()],
      decoration: InputDecoration(
        labelText: label,
        labelStyle: const TextStyle(color: Colors.black54),
        filled: true,
        fillColor: Colors.grey[100],
        prefixText: "R\$ ",
        prefixStyle: const TextStyle(color: Colors.black87),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide(color: Colors.grey[300]!),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.loginOrange, width: 2),
        ),
      ),
      style: const TextStyle(color: Colors.black87),
    );
  }

  String _formatDate(DateTime d) {
    return "${_two(d.day)}/${_two(d.month)}/${d.year}";
  }

  String _formatDateTime(DateTime d) {
    return "${_formatDate(d)} ${_two(d.hour)}:${_two(d.minute)}";
  }

  String _two(int v) => v.toString().padLeft(2, '0');

  String _brl(num v) {
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
    return "R\$ ${buffer.toString()},$cents";
  }

  List<Map<String, dynamic>> _filtrarLancamentos() {
    if (filtro == "TODOS") return lancamentos;
    return lancamentos
        .where((e) {
          final t = (e["tipo"] as String?) ?? "";
          if (filtro == "SAÍDA") {
            return t == "SAÍDA" || t.toUpperCase().contains("SAIDA");
          }
          return t == filtro;
        })
        .toList();
  }

  @override
  void dispose() {
    _sangriaValorController.dispose();
    _obsUltimoController.dispose();
    _aberturaValorController.dispose();
    _aberturaObsController.dispose();
    _fechamentoObsController.dispose();
    super.dispose();
  }
}

class _LancamentoCard extends StatelessWidget {
  final Map<String, dynamic> item;
  final String Function(num) brl;

  const _LancamentoCard({required this.item, required this.brl});

  @override
  Widget build(BuildContext context) {
    final tipo = (item["tipo"] ?? "ENTRADA").toString();
    final isEntrada = tipo == "ENTRADA" || !tipo.toUpperCase().contains("SAIDA");
    final valor = (item["valor"] ?? 0) as num;
    final descricao = item["descricao"]?.toString() ?? "Lançamento";
    final cliente = item["cliente"]?.toString() ?? "";
    final fornecedor = item["fornecedor"]?.toString() ?? "";
    final observacao = item["observacao"]?.toString() ?? "";
    final dataStr = item["data"]?.toString() ?? "";
    final hora = _extractHora(dataStr);

    String detalhe = "";
    if (cliente.isNotEmpty) {
      detalhe = "Cliente: $cliente";
    } else if (fornecedor.isNotEmpty) {
      detalhe = "Fornecedor: $fornecedor";
    } else if (observacao.isNotEmpty) {
      detalhe = "Motivo: $observacao";
    } else if (descricao.toLowerCase().contains("sangria")) {
      detalhe = observacao.isNotEmpty ? "Motivo: $observacao" : "Sangria";
    }

    final borderColor = isEntrada ? const Color(0xFF4CAF50) : const Color(0xFFE53935);
    final amountColor = isEntrada ? const Color(0xFF4CAF50) : const Color(0xFFE53935);
    final prefix = isEntrada ? "+ " : "- ";

    return Container(
      decoration: BoxDecoration(
        color: AppColors.loginInputBackground,
        borderRadius: BorderRadius.circular(14),
        border: Border(
          left: BorderSide(color: borderColor, width: 4),
        ),
      ),
      padding: const EdgeInsets.all(14),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Text(
                    isEntrada ? "ENTRADA" : "SAÍDA",
                    style: AppTypography.caption.copyWith(
                      color: borderColor,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  Text(
                    " • ",
                    style: AppTypography.caption.copyWith(
                      color: AppColors.loginTextMuted,
                    ),
                  ),
                  Text(
                    hora,
                    style: AppTypography.caption.copyWith(
                      color: AppColors.loginTextMuted,
                      fontSize: 12,
                    ),
                  ),
                ],
              ),
              Text(
                "$prefix${brl(valor.abs())}",
                style: AppTypography.bodyBold.copyWith(
                  color: amountColor,
                  fontSize: 15,
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            descricao,
            style: AppTypography.bodyRegular.copyWith(
              color: Colors.white,
              fontSize: 15,
            ),
          ),
          if (detalhe.isNotEmpty) ...[
            const SizedBox(height: 4),
            Text(
              detalhe,
              style: AppTypography.caption.copyWith(
                color: AppColors.loginTextMuted,
                fontSize: 13,
              ),
            ),
          ],
        ],
      ),
    );
  }

  String _extractHora(String dataStr) {
    if (dataStr.isEmpty) return "--:--";
    try {
      final dt = DateTime.tryParse(dataStr);
      if (dt != null) {
        return "${dt.hour.toString().padLeft(2, '0')}:${dt.minute.toString().padLeft(2, '0')}";
      }
      if (dataStr.contains(":")) {
        final parts = dataStr.split(" ");
        for (final p in parts) {
          if (p.contains(":") && RegExp(r'\d{1,2}:\d{2}').hasMatch(p)) {
            return p;
          }
        }
      }
    } catch (_) {}
    return "--:--";
  }
}

class _BrlCurrencyInputFormatter extends TextInputFormatter {
  @override
  TextEditingValue formatEditUpdate(
    TextEditingValue oldValue,
    TextEditingValue newValue,
  ) {
    final raw = newValue.text.replaceAll(RegExp(r'\D'), '');
    final cents = raw.isEmpty ? 0 : int.tryParse(raw) ?? 0;
    final reais = cents / 100;
    final formatted = _formatBrl(reais);
    return TextEditingValue(
      text: formatted,
      selection: TextSelection.collapsed(offset: formatted.length),
    );
  }

  static String _formatBrl(double v) {
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
