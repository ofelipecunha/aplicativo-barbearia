import 'package:flutter/material.dart';
import 'package:barbearia/config/app_colors.dart';
import 'package:barbearia/view/home_page/components/colors.dart';

/// Barra de navegação inferior. Suporta tema claro (gradiente laranja) e tema escuro.
/// Usada em RECEPÇÃO (dark) e CABELEIREIRO com abas específicas por perfil.
class AppCircleNavBar extends StatelessWidget {
  final int activeIndex;
  final ValueChanged<int> onTap;
  final bool isReception;
  final bool useDarkTheme;

  const AppCircleNavBar({
    Key? key,
    required this.activeIndex,
    required this.onTap,
    this.isReception = true,
    this.useDarkTheme = false,
  }) : super(key: key);

  static const Color _white = Colors.white;

  List<_NavItem> _getItems() {
    if (isReception) {
      return const [
        _NavItem(icon: Icons.home, label: 'Home'),
        _NavItem(icon: Icons.point_of_sale, label: 'Caixa'),
        _NavItem(icon: Icons.add, label: ''),
        _NavItem(icon: Icons.inventory_2, label: 'Produtos'),
        _NavItem(icon: Icons.person, label: 'Perfil'),
      ];
    }
    return const [
      _NavItem(icon: Icons.home, label: 'Início'),
      _NavItem(icon: Icons.calendar_today, label: 'Agenda'),
      _NavItem(icon: Icons.add_circle, label: ''),
      _NavItem(icon: Icons.inventory_2, label: 'Produtos'),
      _NavItem(icon: Icons.person, label: 'Perfil'),
    ];
  }

  int get _centerIndex => 2;

  @override
  Widget build(BuildContext context) {
    final items = _getItems();
    final dark = useDarkTheme;

    return Container(
      decoration: BoxDecoration(
        color: dark ? AppColors.loginBackground : null,
        gradient: dark ? null : LinearGradient(
          begin: Alignment.topRight,
          end: Alignment.bottomLeft,
          colors: [buttonColor, const Color(0xFFE08504)],
        ),
        borderRadius: const BorderRadius.only(
          topLeft: Radius.circular(8),
          topRight: Radius.circular(8),
        ),
        boxShadow: dark
            ? [BoxShadow(color: Colors.black54, blurRadius: 12, offset: const Offset(0, -2))]
            : [BoxShadow(color: buttonColor.withOpacity(0.3), blurRadius: 10, offset: const Offset(0, -2))],
      ),
      child: SafeArea(
        top: false,
        child: Container(
          height: 65,
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: List.generate(items.length, (index) {
              final item = items[index];
              final isActive = index == activeIndex;
              final isCenter = index == _centerIndex;

              if (isCenter) {
                return Expanded(
                  child: GestureDetector(
                    onTap: () => onTap(index),
                    behavior: HitTestBehavior.opaque,
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Container(
                          width: 48,
                          height: 48,
                          decoration: BoxDecoration(
                            color: AppColors.loginOrange,
                            shape: BoxShape.circle,
                            boxShadow: [
                              BoxShadow(
                                color: AppColors.loginOrange.withOpacity(0.4),
                                blurRadius: 8,
                                offset: const Offset(0, 2),
                              ),
                            ],
                          ),
                          child: const Icon(Icons.add, color: Colors.white, size: 28),
                        ),
                        if (item.label.isNotEmpty)
                          const SizedBox(height: 2),
                        if (item.label.isNotEmpty)
                          FittedBox(
                            fit: BoxFit.scaleDown,
                            child: Text(
                              item.label,
                              style: TextStyle(
                                color: dark ? AppColors.loginTextMuted : _white,
                                fontSize: 9,
                              ),
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                      ],
                    ),
                  ),
                );
              }

              final iconColor = dark
                  ? (isActive ? AppColors.loginOrange : Colors.white70)
                  : _white;
              final textColor = dark
                  ? (isActive ? AppColors.loginOrange : Colors.white70)
                  : _white;

              return Expanded(
                child: GestureDetector(
                  onTap: () => onTap(index),
                  behavior: HitTestBehavior.opaque,
                  child: Container(
                    padding: const EdgeInsets.symmetric(vertical: 2),
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(
                          item.icon,
                          color: iconColor,
                          size: isActive ? 24 : 22,
                        ),
                        const SizedBox(height: 2),
                        if (item.label.isNotEmpty)
                          FittedBox(
                            fit: BoxFit.scaleDown,
                            child: Text(
                              item.label,
                              style: TextStyle(
                                color: textColor,
                                fontSize: isActive ? 10 : 9,
                                fontWeight: isActive ? FontWeight.w600 : FontWeight.normal,
                              ),
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                      ],
                    ),
                  ),
                ),
              );
            }),
          ),
        ),
      ),
    );
  }
}

class _NavItem {
  final IconData icon;
  final String label;

  const _NavItem({
    required this.icon,
    required this.label,
  });
}
