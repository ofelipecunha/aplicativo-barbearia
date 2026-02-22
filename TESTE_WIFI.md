# Testar app no celular via Wi-Fi (backend no PC)

Backend roda no seu PC, celular e PC na mesma Wi-Fi.

---

## 1. Descobrir o IP do seu PC

No PowerShell do Windows:
```powershell
ipconfig
```

Procure **Adaptador de Rede Sem Fio Wi-Fi** → **Endereço IPv4**.  
Exemplo: `192.168.1.100`

---

## 2. Configurar o app para usar o IP do PC

Abra `lib/config/api_config.dart` e defina:

```dart
const String baseUrlOverride = 'http://192.168.1.100:8080';
```

(substitua `192.168.1.100` pelo seu IP)

---

## 3. Rodar PostgreSQL e backend no PC

### Opção A: Com Docker (mais simples)

Se você tem Docker instalado:
```powershell
docker run -d --name barbearia-db -p 5432:5432 -e POSTGRES_PASSWORD=123 -e POSTGRES_DB=barbearia postgres:17
```

Depois inicie o backend (usa o banco local automaticamente):
```powershell
cd backend
go run ./cmd/server
```

### Opção B: PostgreSQL já instalado

Crie o banco: `CREATE DATABASE barbearia;`

O backend usa por padrão: usuário `postgres`, senha `123`. Se for diferente:
```powershell
cd backend
$env:DATABASE_URL = "postgres://postgres:SUA_SENHA@localhost:5432/barbearia?sslmode=disable"
go run ./cmd/server
```

Senão, só: `go run ./cmd/server`

---

O backend deve exibir `API ouvindo em :8080`.

---

## 4. Rodar o app no celular

**Opção A – Cabo USB (mais simples):**
```powershell
cd "caminho-do-projeto"
flutter run
```
Conecte o celular por USB, habilite depuração USB e rode o comando.

**Opção B – APK:**
```powershell
flutter build apk
```
Instale o APK do celular. O app usará a URL definida em `baseUrlOverride`.

---

## 5. Testar

- Celular e PC na mesma Wi-Fi
- Backend rodando no PC
- Abra o app no celular e teste cadastro/login

---

## Voltar para produção (Render na internet)

Quando for testar com o backend no Render de novo:

1. Em `api_config.dart`, deixe `baseUrlOverride = ''` (vazio)
2. `productionApiUrl` continua com a URL do Render
