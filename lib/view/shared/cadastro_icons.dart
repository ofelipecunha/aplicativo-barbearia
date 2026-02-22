import 'package:flutter/material.dart';

/// Ícones para cadastro de serviços/produtos (salão, barbas, cabelos, etc.)
final List<Map<String, dynamic>> cadastroIconOptions = [
  // Corte e barba
  {'code': 'content_cut', 'icon': Icons.content_cut, 'label': 'Corte'},
  {'code': 'face', 'icon': Icons.face, 'label': 'Barba'},
  {'code': 'cut', 'icon': Icons.cut, 'label': 'Tesoura'},
  {'code': 'style', 'icon': Icons.style, 'label': 'Estilo'},
  // Cuidados com cabelo
  {'code': 'wash', 'icon': Icons.wash, 'label': 'Lavagem'},
  {'code': 'water_drop', 'icon': Icons.water_drop, 'label': 'Hidratação'},
  {'code': 'local_fire_department', 'icon': Icons.local_fire_department, 'label': 'Química'},
  {'code': 'brush', 'icon': Icons.brush, 'label': 'Pintura'},
  {'code': 'palette', 'icon': Icons.palette, 'label': 'Tintura'},
  // Tratamentos e beleza
  {'code': 'spa', 'icon': Icons.spa, 'label': 'Spa'},
  {'code': 'face_retouching_natural', 'icon': Icons.face_retouching_natural, 'label': 'Skin Care'},
  {'code': 'auto_awesome', 'icon': Icons.auto_awesome, 'label': 'Beleza'},
  {'code': 'diamond', 'icon': Icons.diamond, 'label': 'Premium'},
  {'code': 'star', 'icon': Icons.star, 'label': 'Destaque'},
  // Serviços gerais
  {'code': 'cleaning_services', 'icon': Icons.cleaning_services, 'label': 'Higienização'},
  {'code': 'inventory_2', 'icon': Icons.inventory_2, 'label': 'Produto'},
  {'code': 'checkroom', 'icon': Icons.checkroom, 'label': 'Vestuário'},
  {'code': 'sentiment_satisfied', 'icon': Icons.sentiment_satisfied, 'label': 'Cliente'},
  {'code': 'self_improvement', 'icon': Icons.self_improvement, 'label': 'Bem-estar'},
];

IconData? iconFromCode(String? code) {
  if (code == null || code.isEmpty) return null;
  for (final o in cadastroIconOptions) {
    if (o['code'] == code) return o['icon'] as IconData;
  }
  return Icons.category;
}
