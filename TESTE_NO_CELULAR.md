# Testar o app no celular (mesma rede Wi‑Fi)

Siga estes passos para rodar o app no seu celular em casa, usando o PC como servidor.

## 1. Descobrir o IP do seu PC na rede Wi‑Fi

- **Windows:** abra o **Prompt de Comando** (CMD) e rode:
  ```bash
  ipconfig
  ```
- Procure **“Adaptador de Rede sem Fio Wi‑Fi”** (ou similar).
- Anote o **“Endereço IPv4”**, algo como `192.168.1.5` ou `192.168.0.10`.

## 2. Configurar o app para usar o IP do PC

- Abra **`lib/config/api_config.dart`**.
- Troque `apiHost` para o IP do passo 1, por exemplo:
  ```dart
  const String apiHost = '192.168.1.5';  // IP do seu PC
  ```
- Mantenha `apiPort = 8080`.

Quando for testar de novo no **emulador**, volte para:
```dart
const String apiHost = '10.0.2.2';
```

## 3. Liberar a porta 8080 no Firewall do Windows

O celular precisa acessar o backend no PC. Se a porta 8080 estiver bloqueada, a conexão falha.

- Abra **“Firewall do Windows com Segurança Avançada”** (busque no menu Iniciar).
- **Regras de Entrada** → **Nova Regra**.
- Escolha **Porta** → **TCP** → **Portas locais específicas:** `8080`.
- **Permitir a conexão**.
- Marque **Domínio**, **Particular** e **Público** (ou só **Particular** se quiser).
- Nome, por exemplo: **“Barbearia API 8080”**.

## 4. Rodar o backend no PC

- Banco (PostgreSQL) e backend devem estar rodando no **mesmo PC**.
- No terminal, na pasta do backend:
  ```bash
  cd backend
  go run ./cmd/server
  ```
- O backend usa `localhost` para o banco; o celular só fala com o PC na porta 8080.

## 5. Rodar o app no celular

- Conecte o celular ao **mesmo Wi‑Fi** do PC.
- **Opção A – USB:** conecte o celular por cabo, ative **Depuração USB** (modo desenvolvedor) e rode:
  ```bash
  flutter run
  ```
- **Opção B – APK:** gere e instale o APK:
  ```bash
  flutter build apk --debug
  ```
  O arquivo fica em `build/app/outputs/flutter-apk/app-debug.apk`. Copie para o celular e instale.

## Resumo

| Onde roda        | O que usa                         |
|------------------|-----------------------------------|
| Emulador Android | `apiHost = '10.0.2.2'`           |
| Celular na WiFi  | `apiHost = 'IP_DO_SEU_PC'`       |

- PC e celular na **mesma rede Wi‑Fi**.
- **Firewall** liberando a porta **8080**.
- **Backend** rodando no PC antes de abrir o app no celular.
