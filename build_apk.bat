@echo off
echo Gerando APK...
"C:\Users\Felipe\flutter\bin\flutter.bat" build apk --release
if %ERRORLEVEL% EQU 0 (
    echo.
    echo APK gerado em: build\app\outputs\flutter-apk\app-release.apk
) else (
    echo Erro ao gerar APK.
)
pause
