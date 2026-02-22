# Script para levantar o projeto Barbearia Flutter
# Flutter em: C:\Users\Felipe\flutter

$flutterPath = "C:\Users\Felipe\flutter\bin"
$env:Path = "$flutterPath;$env:Path"

Set-Location $PSScriptRoot

Write-Host "Instalando dependencias (flutter pub get)..." -ForegroundColor Cyan
flutter pub get
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "`nSubindo o app no emulador..." -ForegroundColor Cyan
flutter run
