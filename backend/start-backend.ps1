# Script para iniciar o backend da Barbearia
Write-Host "Iniciando backend..." -ForegroundColor Cyan

Set-Location $PSScriptRoot

# Verificar se o Go está instalado
$goVersion = go version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Erro: Go não está instalado ou não está no PATH" -ForegroundColor Red
    exit 1
}

Write-Host "Go encontrado: $goVersion" -ForegroundColor Green

# Verificar variáveis de ambiente opcionais
if ($env:DATABASE_URL) {
    Write-Host "DATABASE_URL: $env:DATABASE_URL" -ForegroundColor Yellow
} else {
    Write-Host "Usando DATABASE_URL padrão: postgres://postgres:123@localhost:5432/barbearia?sslmode=disable" -ForegroundColor Yellow
}

if ($env:PORT) {
    Write-Host "PORT: $env:PORT" -ForegroundColor Yellow
} else {
    Write-Host "Usando porta padrão: 8080" -ForegroundColor Yellow
}

Write-Host "`nExecutando servidor..." -ForegroundColor Cyan
Write-Host "Pressione Ctrl+C para parar o servidor`n" -ForegroundColor Yellow

go run ./cmd/server
