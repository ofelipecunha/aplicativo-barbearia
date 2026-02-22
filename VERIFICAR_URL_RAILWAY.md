# App com erro "No address associated with hostname"

## O que significa

O celular não consegue resolver o DNS de `barbearia-app-production.up.railway.app`. A URL pode estar incorreta ou o domínio não existir.

## O que fazer

### 1. Pegar a URL correta no Railway

1. **barbearia-app** → **Settings** (ou clique no serviço)
2. Aba **Networking** ou **Domains**
3. Em **Public Networking**, copie a URL exata que aparece
   - Pode ser `https://barbearia-app-production.up.railway.app`
   - Ou `https://barbearia-app-production-XXXX.up.railway.app` (com código no final)
   - Ou outro formato
4. Se não houver domínio público, clique em **Generate Domain**

### 2. Testar no navegador do celular

Abra no celular (Chrome/Safari):

```
https://SUA-URL-AQUI/api/servicos
```

Se carregar (mesmo com `[]` ou erro de JSON), a URL está ok.  
Se não carregar, a URL pode estar errada ou o backend não está acessível de fora.

### 3. Gerar novo APK

Se `/api/servicos` funcionou no navegador, a URL já está correta no `api_config.dart`.  
Basta gerar um novo APK e reinstalar:

```bash
flutter build apk --release
```

O APK ficará em `build/app/outputs/flutter-apk/app-release.apk`.  
Instale no celular e teste o cadastro/login.

> **Se ainda der erro no celular:** confira a URL exata no Railway (Settings → Networking) e atualize `productionApiUrl` em `lib/config/api_config.dart` antes de gerar o APK.

### 4. barbearia-app e Postgres

Eles já estão ligados. O backend usa `DATABASE_URL` do Postgres (por isso aparece "[DB] usando DATABASE_URL (host definido)" nos logs). O problema é só o celular conseguir acessar o backend pela URL pública.
