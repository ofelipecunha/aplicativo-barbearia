import 'dart:io' show Platform;

/// Mobile (iOS/Android): iOS usa localhost, Android usa 10.0.2.2.
String getApiHost() => Platform.isAndroid ? '10.0.2.2' : '127.0.0.1';
