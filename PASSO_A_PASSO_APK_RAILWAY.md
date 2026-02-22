# Passo a passo: corrigir Railway, gerar APK e testar fora da rede

## Parte 1: Corrigir a conexão do Railway (obrigatório)

O `DATABASE_URL` com referência `${{Postgres.DATABASE_URL}}` não está funcionando. Use variáveis individuais:

### No Railway – barbearia-app → Variables

1. Clique em **"+ New Variable"** → **"Add Reference"**
2. Selecione o serviço **Postgres** e adicione estas variáveis **uma por vez**:

| Variável    | Referência                  |
|-------------|-----------------------------|
| PGHOST      | Postgres → PGHOST           |
| PGPORT      | Postgres → PGPORT           |
| PGUSER      | Postgres → PGUSER           |
| PGPASSWORD  | Postgres → PGPASSWORD       |
| PGDATABASE  | Postgres → PGDATABASE       |

3. **Redeploy** em Deployments
4. Aguarde o deploy e confira os logs (não deve mais aparecer "localhost")

---

## Parte 2: Criar o primeiro usuário no banco (se estiver vazio)

O Postgres no Railway começa vazio. É preciso ter ao menos um usuário para fazer login.

### Opção A: Pela tela de cadastro do app (quando a API estiver no ar)

1. Abra o app e vá em **"Cadastrar"**
2. Preencha nome, login, senha e perfil (RECEPCIONISTA ou CABELEIREIRO)
3. Cadastre o usuário

### Opção B: Via Railway – Query no Postgres

1. No Railway, clique no serviço **Postgres**
2. Aba **"Query"** ou **"Data"**
3. Execute:

```sql
INSERT INTO usuario (nome, login, senha, perfil, ativo)
VALUES ('Admin', 'admin', '1234', 'DONO', true);
```

Use login: **admin** e senha: **1234** no app.

---

## Parte 3: Gerar o APK

1. No terminal, na pasta do projeto:

```bash
flutter pub get
flutter build apk --release
```

2. O APK será gerado em:

```
build/app/outputs/flutter-apk/app-release.apk
```

3. Envie o APK para o celular (WhatsApp, Drive, cabo USB etc.)
4. Instale (pode ser necessário habilitar "Fontes desconhecidas" nas configurações)

---

## Parte 4: Testar fora da rede

1. No celular, desative o Wi‑Fi e use **4G/5G**
2. Abra o app
3. Faça login com o usuário criado (admin/1234 ou o que cadastrou)

O app em **release** usa automaticamente `productionApiUrl` =  
`https://barbearia-app-production.up.railway.app`

---

## Checklist

- [ ] Variables: PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE (referências ao Postgres)
- [ ] Redeploy do barbearia-app
- [ ] Logs sem erro de conexão
- [ ] Criar primeiro usuário (Query ou tela de cadastro)
- [ ] `flutter build apk --release`
- [ ] Instalar APK no celular
- [ ] Testar fora da rede (4G/5G)

---

## Se a URL do Railway for diferente

Se sua URL não for `barbearia-app-production.up.railway.app`, ajuste em:

`lib/config/api_config.dart`:

```dart
const String productionApiUrl = 'https://SUA-URL-AQUI.up.railway.app';
```
