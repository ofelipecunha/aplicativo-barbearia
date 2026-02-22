# Alternativas ao Railway para Backend + Banco

O código foi revertido: `productionApiUrl` usa novamente `https://barbearia-app-production.up.railway.app`.

Se quiser migrar para outro provedor, estas opções costumam ter melhor compatibilidade com operadoras brasileiras:

---

## 1. Render (recomendado)

- **Site:** https://render.com
- **Por quê:** Domínios *.onrender.com são muito usados e raramente bloqueados
- **Free tier:** PostgreSQL + Web Service (dorme após 15 min de inatividade)
- **Deploy:** Conecta no GitHub, igual ao Railway

**Passos resumidos:**
1. Crie conta em render.com
2. New → PostgreSQL (database)
3. New → Web Service (backend)
   - Repositório: seu GitHub
   - Root Directory: `backend`
   - Build Command: `go build -o server ./cmd/server`
   - Start Command: `./server`
   - Variáveis: `DATABASE_URL` → Internal URL do Postgres
4. Copie a URL do Web Service (ex: `https://barbearia-xxx.onrender.com`)
5. Atualize `productionApiUrl` em `lib/config/api_config.dart`
6. Gere novo APK

---

## 2. Fly.io

- **Site:** https://fly.io
- **Por quê:** Boa para apps Go, rede global
- **Free tier:** 1 Postgres + 3 VMs pequenas

---

## 3. Koyeb

- **Site:** https://koyeb.com
- **Por quê:** Suporta Docker + Postgres, interface simples
- **Free tier:** 1 serviço + banco

---

## 4. DigitalOcean App Platform

- **Site:** https://digitalocean.com
- **Por quê:** Domínios confiáveis, boa estabilidade
- **Observação:** Pago (aprox. US$ 5/mês), com período de trial

---

## Resumo

| Serviço     | Banco  | Backend Go      | Free tier | Domínio típico      |
|------------|--------|------------------|-----------|---------------------|
| **Render** | ✅     | ✅ (deploy Git)  | ✅        | *.onrender.com      |
| **Fly.io** | ✅     | ✅               | ✅        | *.fly.dev           |
| **Koyeb**  | ✅     | ✅ (Docker)      | ✅        | *.koyeb.app         |
| **Railway**| ✅     | ✅               | ✅        | *.up.railway.app    |

Render costuma ser o mais simples e compatível para migrar do Railway.
