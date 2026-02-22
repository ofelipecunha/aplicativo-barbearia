import 'package:flutter/foundation.dart';

import 'api_config_host_io.dart'
    if (dart.library.html) 'api_config_host_stub.dart' as host;

/// Configuração da URL do backend (API + uploads).
///
/// **Produção (app fora da rede / Railway):**
/// - Use baseUrlOverride com a URL do Railway (ex: https://barbearia-app-production.up.railway.app)
/// - Ou defina productionApiUrl e o app usará em builds release (flutter build apk)
///
/// **Desenvolvimento local:**
/// - Deixe baseUrlOverride vazio e productionApiUrl vazio para usar apiHost + apiPort
/// - iOS Simulator: 127.0.0.1 (referencia o Mac)
/// - Android Emulator: 10.0.2.2 (alias para localhost do host)
/// - Celular na mesma WiFi (iPhone como teste): baseUrlOverride = 'http://IP_DO_MAC:8080'
///   (veja iPhone_celular_teste.md)
const String baseUrlOverride = '';

/// URL do Railway. Em release (APK), o app usa esta URL automaticamente.
const String productionApiUrl = 'https://barbearia-app-v429.onrender.com';

/// Backend local: use a mesma porta que o servidor Go (go run ./cmd/server → :8080).
/// apiHost varia por plataforma: iOS usa 127.0.0.1, Android usa 10.0.2.2
String get apiHost => host.getApiHost();
const int apiPort = 8080;

String get _base {
  if (baseUrlOverride.trim().isNotEmpty) {
    var url = baseUrlOverride.trim().replaceAll(RegExp(r'/+$'), '');
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'http://$url';
    }
    return url;
  }
  if (kReleaseMode && productionApiUrl.trim().isNotEmpty) {
    return productionApiUrl.trim().replaceAll(RegExp(r'/+$'), '');
  }
  return 'http://$apiHost:$apiPort';
}

String get apiBase => '$_base/api';
String get serverBase => _base;
