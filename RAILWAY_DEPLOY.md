# Deploy no Railway (Backend Go + PostgreSQL)

Passo a passo para subir o **backend** (Go/Gin) e o **PostgreSQL** no Railway e usar a URL no Flutter.

---

## Próximo passo se você já está em railway.com/new

1. **Primeiro**, suba o projeto no GitHub (seção 1 abaixo).  
2. No Railway, clique em **"GitHub Repository"** → selecione o repositório → **Deploy Now**.  
3. Depois, siga as seções 3 a 7 (Root Directory, PostgreSQL, Variables, Domain, Redeploy).  
4. Por fim, configure o Flutter (seção 8) com a URL do Railway.

---

## 1. Subir o projeto no GitHub

Se o projeto ainda **não** está no GitHub:

### 1.1 Criar o repositório no GitHub

1. Acesse [github.com](https://github.com) e faça login.
2. Clique em **"+"** → **"New repository"**.
3. Nome, por exemplo: `barbearia-app`.
4. Deixe **público**, **não** marque "Add a README" (o projeto já existe).
5. Clique em **"Create repository"**.

### 1.2 Enviar o código do PC para o GitHub

No terminal, na pasta do projeto (ex.: `BarbeariaFlutter-main`):

```bash
git init
git add .
git commit -m "Projeto inicial: Flutter + backend Go"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/barbearia-app.git
git push -u origin main
```

Substitua `SEU_USUARIO` e `barbearia-app` pelo seu usuário e nome do repositório.

Se der erro de "nothing to commit", confira o `.gitignore` — pode ser que pastas como `build/` estejam sendo ignoradas (o que é correto).

---

## 2. No Railway: criar projeto e conectar o GitHub

1. Você já está em **railway.com/new** (ou acesse [railway.app](https://railway.app)).
2. Clique em **"GitHub Repository"**.
3. Se pedir, **autorize o Railway** a acessar seu GitHub.
4. Selecione o repositório **barbearia-app** (ou o nome que você usou).
5. Clique em **"Deploy Now"** (ou equivalente).

O Railway vai criar um **projeto** e um **serviço** para o repositório. O deploy pode falhar na primeira vez porque ainda não configuramos o **Root Directory** nem o **PostgreSQL**. Siga os próximos passos.

---

## 3. Configurar o backend (Root Directory + Dockerfile)

O app Flutter está na **raiz** do repositório; o **backend** está em **`backend/`**. O Railway precisa buildar só a pasta do backend.

1. No projeto do Railway, clique no **serviço** do repositório (o que foi criado ao conectar o GitHub).
2. Abra a aba **"Settings"**.
3. Em **"Build"**:
   - **Root Directory:** `backend`
   - **Builder:** Dockerfile (o Railway usa o `Dockerfile` que está em `backend/`).
4. Salve.

O **Dockerfile** em `backend/` já está configurado para buildar e rodar o servidor Go (`./cmd/server`). O Railway usa **PORT** e **DATABASE_URL** por variáveis de ambiente.

---

## 4. Adicionar o PostgreSQL

1. No **mesmo projeto** do Railway, clique em **"+ New"** (ou **"Add Service"**).
2. Escolha **"Database"** → **"PostgreSQL"**.
3. O Railway cria o banco e gera **host**, **database**, **user**, **password** e **DATABASE_URL**.

Não é preciso configurar nada manualmente no banco; o backend usa **DATABASE_URL**.

---

## 5. Ligar o PostgreSQL ao backend

1. Clique no **serviço do backend** (o do repositório GitHub).
2. Vá em **"Variables"** (ou **"Variables"** na lateral).
3. Clique em **"+ New Variable"** ou **"Add Variable"**.
4. Escolha **"Add Reference"** (ou **"Reference"**).
5. Selecione o serviço **PostgreSQL**.
6. Escolha a variável **`DATABASE_URL`**.
7. Salve.

Assim, o backend passa a receber **DATABASE_URL** automaticamente. O `main.go` já usa `os.Getenv("DATABASE_URL")`.

---

## 6. Gerar URL pública do backend

1. Ainda no **serviço do backend**, abra **"Settings"**.
2. Vá em **"Networking"** (ou **"Public Networking"**).
3. Clique em **"Generate Domain"** (ou **"Generate"**).
4. O Railway gera uma URL, por exemplo:  
   `https://barbearia-backend-production-xxxx.up.railway.app`

Copie essa URL — você usará no Flutter.

---

## 7. Redeploy do backend

Depois de alterar **Root Directory**, **Variables** e **Networking**:

1. No serviço do backend, abra **"Deployments"**.
2. No último deploy, clique nos **três pontinhos** → **"Redeploy"** (ou use o botão **"Redeploy"**).

Aguarde o build e o deploy. Quando estiver **"Success"**, a API estará no ar na URL que você gerou.

---

## 8. Configurar o Flutter

1. Abra **`lib/config/api_config.dart`**.
2. Use a URL do Railway em **`baseUrlOverride`** (sem barra no final):

```dart
const String baseUrlOverride = 'https://barbearia-backend-production-xxxx.up.railway.app';
```

Substitua pela **sua** URL do Railway.

3. Faça o build do app:

```bash
flutter build apk --release
```

Ou rode no emulador/celular:

```bash
flutter run
```

O app passa a usar a API no Railway.

---

## 9. Resumo do que fica no ar

| Onde        | O quê                          |
|------------|---------------------------------|
| **Railway**| Backend Go (API) + PostgreSQL  |
| **Flutter**| App no celular/emulador        |

- O **backend** escuta em **PORT** (Railway define).
- O **banco** é o PostgreSQL do Railway; as tabelas são criadas pelo **GORM** (`AutoMigrate`) na primeira execução.
- A **URL pública** é a que você gerou em **Networking**.

---

## 10. Observações

### Upload de imagens

O backend salva imagens em **`./uploads`**. No Railway o disco é **efêmero**: a cada **redeploy** esses arquivos são perdidos. Para **demo** costuma ser suficiente. Para **produção**, o ideal é usar um **bucket** (ex.: S3, Cloudflare R2) e salvar as imagens lá.

### Plano gratuito

O plano gratuito do Railway tem **limite de uso**. Para **demo** e **testes** costuma ser suficiente. Monitore o uso no dashboard.

### Logs

Para ver logs do backend no Railway: **serviço do backend** → **"Deployments"** → clique no deploy → **"View Logs"**.

---

## 11. Checklist rápido

- [ ] Repositório criado no GitHub e código enviado (`git push`)
- [ ] Projeto no Railway criado via **"GitHub Repository"**
- [ ] **Root Directory** = `backend` no serviço do backend
- [ ] Serviço **PostgreSQL** adicionado ao projeto
- [ ] Variável **DATABASE_URL** do PostgreSQL referenciada no backend
- [ ] **Generate Domain** no backend e URL copiada
- [ ] **Redeploy** do backend após as alterações
- [ ] **`baseUrlOverride`** no Flutter com a URL do Railway
- [ ] Testar o app (login, cadastros, etc.)

Depois disso, o backend e o banco estão no ar e o Flutter consegue acessar a API pela URL do Railway.
