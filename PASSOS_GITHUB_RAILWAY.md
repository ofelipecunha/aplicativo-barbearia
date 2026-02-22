# Passos GitHub + Railway — barbearia-app

Guia objetivo para o repositório [ofelipecunha/barbearia-app](https://github.com/ofelipecunha/barbearia-app).

---

## 1. Git no PC (já feito)

- `git init`
- `git add .`
- `git commit -m "Projeto inicial: Flutter + backend Go (Barbearia)"`
- `git branch -M main`
- `git remote add origin https://github.com/ofelipecunha/barbearia-app.git`

**Falta só o push.** No terminal, na pasta do projeto:

```bash
git push -u origin main
```

Se pedir login, use seu usuário e senha do GitHub (ou um **Personal Access Token** em vez da senha).

Depois do push, o código estará em: https://github.com/ofelipecunha/barbearia-app

---

## 2. Railway — conectar o GitHub

1. Acesse **[railway.app/new](https://railway.app/new)** (ou railway.com → New Project).
2. Clique em **"GitHub Repository"**.
3. Se pedir, **autorize o Railway** no GitHub.
4. Selecione o repositório **`ofelipecunha/barbearia-app`**.
5. Clique em **"Deploy Now"** (ou o botão equivalente).

O Railway vai criar um **projeto** e um **serviço** apontando para o repo. O primeiro deploy pode falhar (falta Root Directory e PostgreSQL). Siga o passo 3.

---

## 3. Configurar o serviço do backend

### 3.1 Root Directory

1. No projeto do Railway, clique no **serviço** do repositório (o que foi criado ao conectar o GitHub).
2. Abra **Settings** (engrenagem ou aba "Settings").
3. Em **Build**:
   - **Root Directory:** `backend`
   - (Railway usa o `Dockerfile` que está em `backend/`.)

### 3.2 Adicionar PostgreSQL

1. No **mesmo projeto**, clique em **"+ New"** (ou **"Add Service"**).
2. Escolha **"Database"** → **"PostgreSQL"**.
3. O Railway cria o banco e gera **DATABASE_URL** (e outras variáveis).

### 3.3 Ligar o PostgreSQL ao backend

1. Volte ao **serviço do backend** (o do GitHub).
2. Abra **Variables** (ou **"Variables"** na lateral).
3. Clique em **"+ New Variable"** ou **"Add Variable"**.
4. Escolha **"Add Reference"** (ou **"Reference"**).
5. Selecione o serviço **PostgreSQL**.
6. Escolha a variável **`DATABASE_URL`**.
7. Salve.

O backend já usa `os.Getenv("DATABASE_URL")` no `main.go`.

### 3.4 URL pública

1. Ainda no **serviço do backend**, em **Settings**.
2. Vá em **Networking** (ou **Public Networking**).
3. Clique em **"Generate Domain"**.
4. Copie a URL gerada, por exemplo:  
   `https://barbearia-app-production-xxxx.up.railway.app`

Guarde essa URL para o Flutter.

### 3.5 Redeploy

1. No serviço do backend, abra **Deployments**.
2. No último deploy, use **"Redeploy"** (três pontinhos ou botão).
3. Aguarde o build terminar. Quando estiver **Success**, a API estará no ar na URL do passo 3.4.

---

## 4. Flutter — usar a URL do Railway

1. Abra **`lib/config/api_config.dart`**.
2. Defina **`baseUrlOverride`** com a URL do Railway (sem barra no final):

```dart
const String baseUrlOverride = 'https://barbearia-app-production-xxxx.up.railway.app';
```

Substitua pela **sua** URL (a que você copiou no passo 3.4).

3. Rode o app:

```bash
flutter run
```

Ou gere o APK:

```bash
flutter build apk --release
```

O app passa a usar a API no Railway.

---

## Checklist rápido

- [ ] `git push -u origin main` (na pasta do projeto)
- [ ] Railway: **GitHub Repository** → selecionar **ofelipecunha/barbearia-app** → Deploy
- [ ] **Root Directory** = `backend` no serviço do backend
- [ ] **+ New** → **Database** → **PostgreSQL**
- [ ] **Variables** do backend → **Add Reference** → PostgreSQL → **DATABASE_URL**
- [ ] **Generate Domain** no backend e copiar a URL
- [ ] **Redeploy** do backend
- [ ] Em **`api_config.dart`**, `baseUrlOverride` = URL do Railway
- [ ] Testar o app (login, cadastros, etc.)

---

## Se o push der erro

- **"Failed to connect" / "Could not connect to server"**  
  Verifique internet, proxy e firewall. Tente de outro computador ou rede.

- **"Authentication failed"**  
  Use um **Personal Access Token** do GitHub em vez da senha:
  1. GitHub → **Settings** → **Developer settings** → **Personal access tokens**.
  2. **Generate new token**, marque `repo`.
  3. Ao dar `git push`, use o token como senha.

- **"Repository not found"**  
  Confirme que o repositório é **https://github.com/ofelipecunha/barbearia-app** e que você tem acesso (dono ou colaborador).
