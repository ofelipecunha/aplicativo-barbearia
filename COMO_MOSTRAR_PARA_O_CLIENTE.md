# Como mostrar o app para o cliente

Você não precisa publicar na Play Store para mostrar o app. Dá para fazer demo e testes de várias formas.

---

## 1. Demo rápida (você e o cliente juntos)

**Cenário:** reunião presencial ou por vídeo, você mostra o app rodando no seu celular.

- Gere um **APK**: `flutter build apk --debug`
- Instale no seu celular (cabo ou envie o arquivo).
- Deixe o **backend rodando no seu PC** e o **celular na mesma Wi‑Fi** (use o IP do PC no `api_config.dart`, como no [TESTE_NO_CELULAR.md](TESTE_NO_CELULAR.md)).
- Abra o app e mostre as telas, fluxos, etc.

**Vantagem:** rápido, sem publicar em lugar nenhum.  
**Limite:** o cliente não mexe no aparelho dele; só assiste.

---

## 2. Cliente testa no celular dele (APK direto)

**Cenário:** você manda o app instalável para o cliente testar no próprio aparelho.

### Passo 1: Onde o backend vai rodar?

O app fala com a API. Se o backend estiver só no seu PC, o cliente (em outra rede) **não** consegue acessar.

Você precisa de uma dessas opções:

| Opção | O que é | Quando usar |
|-------|---------|-------------|
| **Backend em nuvem** | API + banco em um servidor (ex.: VPS, Railway, Render, Fly.io) com URL pública | Cliente usando de qualquer lugar |
| **Ngrok (túnel)** | Expõe seu localhost na internet por um link temporário | Teste rápido; link muda ao reiniciar |
| **Seu PC com IP fixo + porta aberta** | Mais complexo, menos comum | Só se o cliente estiver na sua rede |

Para **mostrar para o cliente** costuma ser suficiente:
- **Ngrok**: rápido para uma demo. Você roda o backend no PC, ngrok gera algo como `https://abc123.ngrok-free.app` → você coloca isso no app e manda o APK.
- **Backend em nuvem**: melhor se o cliente for usar por mais tempo ou de casa/escritório.

#### Ngrok em poucos passos (demo rápida)

1. Crie conta em [ngrok.com](https://ngrok.com) (plano gratuito).
2. Instale o ngrok e autentique: `ngrok config add-authtoken SEU_TOKEN`.
3. No PC, suba o backend (ex.: `go run ./cmd/server` na pasta do backend).
4. Em outro terminal: `ngrok http 8080`.
5. O ngrok mostra uma URL como `https://abc123.ngrok-free.app`.
6. No `lib/config/api_config.dart`, defina `baseUrlOverride` com essa URL:
   ```dart
   const String baseUrlOverride = 'https://abc123.ngrok-free.app';
   ```
   Deixe `apiHost` e `apiPort` como estão; quando `baseUrlOverride` não está vazio, o app usa só ela.

### Passo 2: Configurar o app com a URL da API

- Abra `lib/config/api_config.dart`.
- **Ngrok ou backend em nuvem:** use `baseUrlOverride` com a URL completa (ex.: `https://abc123.ngrok-free.app` ou `https://sua-api.railway.app`). O app usa essa base para API e imagens.
- **Backend local / celular na mesma WiFi:** deixe `baseUrlOverride` vazio e use `apiHost` = IP do PC (ex.: `192.168.1.5`) e `apiPort` = `8080`, como no [TESTE_NO_CELULAR.md](TESTE_NO_CELULAR.md).

### Passo 3: Gerar e enviar o APK

```bash
flutter build apk --release
```

O APK fica em: `build/app/outputs/flutter-apk/app-release.apk`.

- Envie por **WhatsApp**, **Email**, **Google Drive**, etc.
- No celular do cliente: **Configurações → Segurança** → permitir **“Instalar apps de fontes desconhecidas”** (ou **“Apps desconhecidos”** para o app usado no download, ex. Chrome ou Gmail).
- Cliente abre o arquivo e instala.

**Vantagem:** simples, sem Play Store.  
**Cuidado:** avise que é **versão de teste** e que ele precisa confiar na origem do arquivo.

---

## 3. Cliente testa via link (Play Store – teste interno)

**Cenário:** você quer um link “profissional” para o cliente instalar direto da Play Store, sem enviar APK.

- Você precisa de conta **Google Play Console** (taxa única, hoje ~US$ 25).
- Cria o app, sobe um **App Bundle** (`flutter build appbundle --release`).
- Usa **Testes internos** (até 100 testadores por email) ou **Testes fechados**.
- Adiciona o email do cliente como testador.
- O cliente recebe o link, entra na Play Store e instala.

**Vantagem:** experiência parecida com app publicado; fácil de dar suporte (“instala por este link”).  
**Requisito:** backend acessível (nuvem ou ngrok), como no item 2.

---

## 4. Publicar de fato na Play Store

Quando o cliente aprovar e você for **lançar para todo mundo**:

- App estável, com backend em produção.
- Gera **release** no Play Console, preenche store listing, política de privacidade, etc.
- Sobe o **App Bundle** da release.
- Envia para **revisão**. Após aprovação, o app fica disponível na Play Store.

Isso é “soltar a versão no ar” de verdade. Os itens 1–3 são para **mostrar** e **testar** antes dessa etapa.

---

## Resumo prático

| Objetivo | O que fazer |
|----------|-------------|
| **Só mostrar na reunião** | Build APK → instala no seu celular → backend no PC + mesma Wi‑Fi |
| **Cliente testar no celular dele** | Backend acessível (ngrok ou nuvem) → config do app com essa URL → build APK → envia o APK |
| **Cliente instalar por link “bonito”** | Backend acessível + Play Console → Testes internos → link da Play Store |
| **App no ar para todos** | Backend em produção + app publicado na Play Store |

---

## Comandos úteis

```bash
# APK debug (testes, demo)
flutter build apk --debug

# APK release (enviar para o cliente)
flutter build apk --release

# App Bundle (para Play Store – testes ou publicação)
flutter build appbundle --release
```

---

## Sobre o backend

- **Demo na sua rede:** backend no PC + `api_config` com IP do PC + Firewall liberando a porta.
- **Cliente em outra rede:** backend precisa ter **URL pública** (ngrok, VPS, Railway, Render, etc.). Aí você coloca essa URL no `api_config` antes de gerar o APK/App Bundle.

Se quiser, no próximo passo dá para detalhar **só ngrok** ou **só um provedor de nuvem** (ex.: Railway/Render) para deixar o backend no ar para o cliente.
