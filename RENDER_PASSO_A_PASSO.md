# Deploy no Render – Passo a passo

## 1. Criar o banco PostgreSQL (antes do Web Service)

1. No Render: **New** → **PostgreSQL**
2. Nome: `barbearia-db`
3. Região: **Oregon (US West)** (mesma do backend)
4. Clique em **Create Database**
5. Aguarde criar e anote a **Internal Database URL** (em Connection)

---

## 2. Configurar o Web Service

### Na tela de Configure (onde você está):

| Campo | Valor |
|-------|-------|
| **Name** | `barbearia-app` |
| **Language** | `Docker` |
| **Branch** | `main` |
| **Region** | Oregon (US West) |
| **Root Directory** | `backend` |
| **Dockerfile Path** | `./Dockerfile` (ou deixe vazio) |

### Environment Variables

Clique em **Add Environment Variable** e adicione:

| Nome | Valor |
|------|-------|
| `DATABASE_URL` | Cole a **Internal Database URL** do Postgres que você criou |

> **Dica:** Se você adicionou o Postgres como dependência, o Render pode preencher `DATABASE_URL` automaticamente. Senão, copie da aba Connection do banco.

### Porta

O Render define `PORT` automaticamente. O backend já usa essa variável.

---

## 3. Deploy

Clique em **Deploy Web Service** e aguarde o build.

---

## 4. Após o deploy

1. Acesse o serviço e copie a URL (ex: `https://barbearia-app.onrender.com`)
2. Atualize em `lib/config/api_config.dart`:
   ```dart
   const String productionApiUrl = 'https://barbearia-app.onrender.com';
   ```
3. Gere novo APK: `build_apk.bat`
4. Teste no celular

---

## Observação

No free tier, o serviço “dorme” após 15 minutos sem requisições. A primeira requisição depois disso pode levar ~30 segundos para responder.
