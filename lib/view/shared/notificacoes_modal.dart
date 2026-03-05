import 'package:flutter/material.dart';
import 'package:barbearia/config/app_colors.dart';
import 'package:barbearia/config/app_typography.dart';
import 'package:barbearia/api/api_client.dart';

/// Modal de notificações por perfil: RECEPCAO (RECEBIMENTO/REABASTECER), CABELEIREIRO (AGENDA) ou DONO (SOLICITACAO_USUARIO, CLIENTE_NA_FILA, etc.).
/// [perfil] RECEPCAO, CABELEIREIRO ou DONO. Para CABELEIREIRO, [idUsuario] é obrigatório (cada um vê só suas agendas).
/// [onNotificationTap] chamado ao tocar numa notificação; a modal será fechada antes.
Future<void> showNotificacoesModal(
  BuildContext context, {
  required String perfil,
  int? idUsuario,
  VoidCallback? onMarcarTodasLidas,
  void Function(Map<String, dynamic> item)? onNotificationTap,
}) async {
  await showModalBottomSheet(
    context: context,
    isScrollControlled: true,
    backgroundColor: Colors.transparent,
    builder: (ctx) => _NotificacoesModalContent(
      perfil: perfil,
      idUsuario: idUsuario,
      onMarcarTodasLidas: onMarcarTodasLidas,
      onNotificationTap: onNotificationTap,
    ),
  );
}

class _NotificacoesModalContent extends StatefulWidget {
  final String perfil;
  final int? idUsuario;
  final VoidCallback? onMarcarTodasLidas;
  final void Function(Map<String, dynamic> item)? onNotificationTap;

  const _NotificacoesModalContent({
    required this.perfil,
    this.idUsuario,
    this.onMarcarTodasLidas,
    this.onNotificationTap,
  });

  @override
  State<_NotificacoesModalContent> createState() => _NotificacoesModalContentState();
}

class _NotificacoesModalContentState extends State<_NotificacoesModalContent> {
  List<Map<String, dynamic>> _notificacoes = [];
  bool _loading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _carregar();
  }

  Future<void> _carregar() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final lista = await ApiClient.getNotificacoes(widget.perfil, idUsuario: widget.idUsuario);
      if (!mounted) return;
      setState(() {
        _notificacoes = lista;
        _loading = false;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _error = e.toString().replaceAll('Exception: ', '');
        _loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: MediaQuery.of(context).size.height * 0.7,
      decoration: const BoxDecoration(
        color: AppColors.loginBackground,
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      child: Column(
        children: [
          _buildHeader(),
          Text(
            'ATUALIZAÇÕES RECENTES',
            style: AppTypography.caption.copyWith(
              color: AppColors.loginTextMuted,
              fontSize: 11,
              letterSpacing: 1,
            ),
          ).padding(const EdgeInsets.only(top: 4, bottom: 16)),
          Expanded(
            child: _loading
                ? const Center(child: CircularProgressIndicator(color: AppColors.loginOrange))
                : _error != null
                    ? Center(
                        child: Padding(
                          padding: const EdgeInsets.all(24),
                          child: Text(_error!, textAlign: TextAlign.center, style: TextStyle(color: AppColors.error.withOpacity(0.9))),
                        ),
                      )
                    : _notificacoes.isEmpty
                        ? Center(
                            child: Text(
                              'Nenhuma notificação',
                              style: TextStyle(color: AppColors.loginTextMuted),
                            ),
                          )
                        : ListView.separated(
                            padding: const EdgeInsets.fromLTRB(16, 0, 16, 80),
                            itemCount: _notificacoes.length,
                            separatorBuilder: (_, __) => const SizedBox(height: 12),
                            itemBuilder: (_, i) => _NotificacaoCard(
                              item: _notificacoes[i],
                              onTap: widget.onNotificationTap != null
                                  ? () async {
                                      final item = _notificacoes[i];
                                      final id = item['id'];
                                      if (id != null) {
                                        final idInt = id is int ? id : (id is num ? id.toInt() : int.tryParse(id.toString()));
                                        if (idInt != null && idInt > 0) {
                                          try {
                                            await ApiClient.markNotificacaoLida(idInt);
                                          } catch (_) {}
                                        }
                                      }
                                      if (!context.mounted) return;
                                      Navigator.of(context).pop();
                                      widget.onNotificationTap!(item);
                                    }
                                  : null,
                            ),
                          ),
          ),
          _buildFooter(),
        ],
      ),
    );
  }

  Widget _buildHeader() {
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 20, 12, 8),
      child: Row(
        children: [
          Text(
            'Notificações',
            style: AppTypography.heading4.copyWith(
              color: AppColors.textPrimary,
              fontSize: 22,
              fontWeight: FontWeight.bold,
            ),
          ),
          const Spacer(),
          IconButton(
            icon: Icon(Icons.close, color: AppColors.loginTextMuted),
            onPressed: () => Navigator.of(context).pop(),
          ),
        ],
      ),
    );
  }

  Widget _buildFooter() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.loginBackground,
        border: Border(top: BorderSide(color: AppColors.loginInputBackground, width: 1)),
      ),
      child: SafeArea(
        child: TextButton(
          onPressed: () {
            widget.onMarcarTodasLidas?.call();
            Navigator.of(context).pop();
          },
          child: Text(
            'Marcar todas como lidas',
            style: AppTypography.bodyBold.copyWith(color: AppColors.loginOrange, fontSize: 14),
          ),
        ),
      ),
    );
  }
}

class _NotificacaoCard extends StatelessWidget {
  final Map<String, dynamic> item;
  final VoidCallback? onTap;

  const _NotificacaoCard({required this.item, this.onTap});

  @override
  Widget build(BuildContext context) {
    final tipo = item['tipo']?.toString() ?? '';
    final titulo = item['titulo']?.toString() ?? tipo;
    final subtitulo = item['subtitulo']?.toString() ?? '';
    final detalhe = item['detalhe']?.toString() ?? '';
    final tempoAtras = item['tempo_atras']?.toString() ?? '';
    final valor = item['valor'];
    final estoque = item['estoque'];

    final isRecebimento = tipo == 'RECEBIMENTO';
    final isAgenda = tipo == 'AGENDA';
    final isSolicitacaoUsuario = tipo == 'SOLICITACAO_USUARIO';
    final corDestaque = (isRecebimento || isAgenda || isSolicitacaoUsuario) ? AppColors.loginOrange : Colors.blue.shade300;
    final icone = isRecebimento
        ? Icons.person_add
        : (isAgenda
            ? Icons.calendar_today
            : (isSolicitacaoUsuario ? Icons.how_to_reg : Icons.inventory_2_outlined));

    final child = Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: AppColors.loginInputBackground,
        borderRadius: BorderRadius.circular(14),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 48,
            height: 48,
            decoration: BoxDecoration(
              color: (isRecebimento || isAgenda || isSolicitacaoUsuario) ? AppColors.loginOrange.withOpacity(0.25) : Colors.blue.withOpacity(0.25),
              borderRadius: BorderRadius.circular(14),
            ),
            child: Icon(
              icone,
              color: corDestaque,
              size: 26,
            ),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Text(
                      titulo,
                      style: TextStyle(
                        color: corDestaque,
                        fontWeight: FontWeight.bold,
                        fontSize: 12,
                      ),
                    ),
                    if (tempoAtras.isNotEmpty) ...[
                      const SizedBox(width: 8),
                      Text(
                        tempoAtras,
                        style: TextStyle(color: AppColors.loginTextMuted, fontSize: 11),
                      ),
                    ],
                  ],
                ),
                const SizedBox(height: 6),
                Text(
                  subtitulo,
                  style: TextStyle(
                    color: AppColors.textPrimary,
                    fontWeight: FontWeight.w600,
                    fontSize: 15,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
                if (detalhe.isNotEmpty) ...[
                  const SizedBox(height: 2),
                  Text(
                    detalhe,
                    style: TextStyle(color: AppColors.loginTextMuted, fontSize: 13),
                  ),
                ],
              ],
            ),
          ),
          if (isRecebimento && valor != null)
            Text(
              'R\$ ${(valor as num).toStringAsFixed(2).replaceAll('.', ',')}',
              style: const TextStyle(
                color: AppColors.loginOrange,
                fontWeight: FontWeight.bold,
                fontSize: 14,
              ),
            )
          else if (!isRecebimento && estoque != null)
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(
                color: AppColors.loginOrange.withOpacity(0.2),
                borderRadius: BorderRadius.circular(20),
              ),
              child: Text(
                'Restam $estoque',
                style: const TextStyle(
                  color: AppColors.loginOrange,
                  fontWeight: FontWeight.w600,
                  fontSize: 12,
                ),
              ),
            ),
        ],
      ),
    );

    if (onTap != null) {
      return Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(14),
          child: child,
        ),
      );
    }
    return child;
  }
}

extension _Padding on Widget {
  Widget padding(EdgeInsetsGeometry padding) => Padding(padding: padding, child: this);
}
