# Deploy no Render – Barbearia (API + Site)

Siga estes passos para subir o **backend (Go)** e o **site (Angular)** no Render.

---

## 1. Banco de dados PostgreSQL

1. No dashboard do Render, clique em **"+ New"** → **"PostgreSQL"**.
2. Escolha um nome (ex: `barbearia-db`), região e plano (Free).
3. Clique em **"Create Database"**.
4. Quando criar, anote:
   - **Internal Database URL** (para o backend usar no mesmo grupo).
   - Ou **External Database URL** (se o backend for em outro serviço).
postgresql://barbearia_db_5106_user:1QlweuNPe2Ygzn078zAChac3zXwzsa3a@dpg-d6kcq0d6ubrc73ecc1e0-a/barbearia_db_5106
---

## 2. Backend (API Go)

1. Clique em **"+ Create new service"**.
2. Escolha **"Web Service"**.
3. Conecte o repositório **ofelipecunha/aplicativo-barbearia** (GitHub).
4. Configure:
   - **Name:** `barbearia-api` (ou outro).
   - **Region:** mesma do banco.
   - **Branch:** `main`.
   - **Root Directory:** `backend`.
   - **Runtime:** **Docker** (o projeto tem `backend/Dockerfile`).
   - **Instance Type:** Free.

5. Em **Environment** (variáveis de ambiente), adicione:

   | Key             | Value |
   |-----------------|--------|
   | `DATABASE_URL`  | Cole a **Internal Database URL** do PostgreSQL (do passo 1). |
   | `CORS_ORIGIN`   | Deixe em branco por enquanto; depois coloque a URL do site (ex: `https://barbearia-web.onrender.com`). |

   Se preferir variáveis separadas em vez de `DATABASE_URL`, use:
   - `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`
   - E opcional: `PGSSLMODE=require`

6. Clique em **"Create Web Service"**.
7. Aguarde o deploy. A URL da API será algo como:  
   **`https://barbearia-api.onrender.com`**

8. (Opcional) Rodar seed no banco: no shell do serviço ou via migração, execute as SQLs em `backend/migrations/` (ex: `add_usuario_status.sql`, `seed_demo_usuarios_e_dados.sql`) se quiser dados iniciais.

---

## 3. Site (Angular – Static Site)

1. No projeto, clique em **"+ Add environment"** ou **"+ Create new service"**.
2. Escolha **"Static Site"**.
3. Conecte o mesmo repositório **ofelipecunha/aplicativo-barbearia**.
4. Configure:
   - **Name:** `barbearia-web`.
   - **Branch:** `main`.
   - **Root Directory:** `site-angular`.
   - **Build Command:**  
     `npm ci && npm run build:render`
   - **Publish Directory:**  
     `dist/barbearia-web-angular/browser`  
     (se não existir `browser`, use apenas `dist/barbearia-web-angular`).

5. Em **Environment**, adicione:

   | Key       | Value |
   |-----------|--------|
   | `API_URL` | URL do backend (ex: `https://barbearia-api.onrender.com`) **sem barra no final**. |

6. Clique em **"Create Static Site"**.
7. Aguarde o build. A URL do site será algo como:  
   **`https://barbearia-web.onrender.com`**

---

## 4. Ligar front e back (CORS)

1. No serviço **Backend (barbearia-api)** → **Environment**.
2. Adicione ou edite:
   - **Key:** `CORS_ORIGIN`
   - **Value:** URL do site (ex: `https://barbearia-web.onrender.com`).
3. Salve; o Render fará um novo deploy. Depois disso, o site conseguirá chamar a API.

---

## 5. Resumo de URLs

| O quê    | Exemplo de URL |
|----------|----------------------------------|
| API      | `https://barbearia-api.onrender.com` |
| Site     | `https://barbearia-web.onrender.com` |

No **site**, o login e todas as chamadas vão para a API usando a `API_URL` definida no build.

---

## Problemas comuns

- **API não conecta no banco:** confira se `DATABASE_URL` (ou PGHOST/PGPORT/etc.) está correto e se o banco está na mesma região.
- **Site não carrega:** verifique se **Publish Directory** é `dist/barbearia-web-angular/browser` (ou o que o `ng build` gerar).
- **Erro de CORS no navegador:** confira se `CORS_ORIGIN` no backend é exatamente a URL do site (com `https://`, sem barra no final).
- **Free tier “dorme”:** no plano gratuito o serviço pode ficar inativo após uns 15 min sem acesso; a primeira requisição pode demorar ~1 min para acordar.
