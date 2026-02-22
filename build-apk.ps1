# Script para gerar APK do app Barbearia Flutter
# Flutter em: C:\Users\Felipe\flutter

$flutterPath = "C:\Users\Felipe\flutter\bin"
$env:Path = "$flutterPath;$env:Path"

Set-Location $PSScriptRoot

Write-Host "Limpando e instalando dependencias..." -ForegroundColor Cyan
flutter clean
flutter pub get
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "`nGerando APK (flutter build apk)..." -ForegroundColor Cyan
flutter build apk
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

$apkPath = Join-Path $PSScriptRoot "build\app\outputs\flutter-apk\app-release.apk"
if (Test-Path $apkPath) {
    Write-Host "`nAPK gerado com sucesso!" -ForegroundColor Green
    Write-Host "Local: $apkPath" -ForegroundColor Yellow
    explorer (Split-Path $apkPath)
} else {
    Write-Host "`nAPK nao encontrado em $apkPath" -ForegroundColor Red
    exit 1
}
