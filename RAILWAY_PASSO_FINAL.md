# Passo final: fazer o Railway funcionar

## IMPORTANTE: "Apply 1 change"

Quando você adiciona ou altera variáveis, o Railway mostra **"1 Change"** e o botão **"Apply 1 change"** no topo. As variáveis **só entram no deploy depois de aplicar**.

### Passos obrigatórios

1. **barbearia-app** → aba **Variables**
2. Confirme que `DATABASE_URL` está com a URL do Postgres (Raw Editor)
3. **Clique em "Apply 1 change"** ou **"Deploy"** (⇧+Enter) no topo da tela
4. Só depois disso as variáveis passam a valer
5. Se não houver "Apply", vá em **Deployments** → **Redeploy**

### Verificar se funcionou

Depois do deploy, nos logs deve aparecer:
- `[DB] usando DATABASE_URL (host definido)` ✅
- `API ouvindo em :PORT` ✅

Se aparecer `[DB] FALLBACK localhost` ou `host=localhost`, a variável ainda não chegou.

---

## Conferir a URL do app

Depois do backend subir:

1. **barbearia-app** → **Settings** → **Networking** ou **Domains**
2. Copie a URL exata (ex: `https://barbearia-app-production.up.railway.app` ou `https://barbearia-app-production-xxxx.up.railway.app`)
3. Em `lib/config/api_config.dart`, defina:
   ```dart
   const String productionApiUrl = 'COLE_A_URL_AQUI';
   ```
4. Gere o APK de novo: `flutter build apk --release`

---

## Ordem

1. Redeploy do barbearia-app (com DATABASE_URL salva)
2. Conferir nos logs se o backend subiu
3. Copiar a URL correta do Railway
4. Atualizar `productionApiUrl` no Flutter
5. Gerar novo APK
6. Instalar e testar
