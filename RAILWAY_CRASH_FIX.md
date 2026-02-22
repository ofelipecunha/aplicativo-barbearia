# Barbearia-app crashando no Railway (connection refused)

## Problema

O erro `failed to connect to host=localhost user=postgres database=barbearia` significa que o app não está recebendo a URL do Postgres. Ele usa o fallback localhost.

## Solução 1: Referência DATABASE_URL (se ainda não fez)

1. **barbearia-app** → aba **Variables**
2. **+ New Variable** → **Add Reference**
3. Selecione o serviço **Postgres** (ícone do elefante, não o volume)
4. Escolha **`DATABASE_URL`** ou **`DATABASE_PRIVATE_URL`**
5. Salve e faça **Redeploy**

## Solução 2: Se DATABASE_URL já está mas não funciona

O Railway às vezes expõe variáveis separadas. Adicione estas referências (uma por vez):

| Variável   | Referência              |
|-----------|--------------------------|
| PGHOST    | Add Reference → Postgres → PGHOST    |
| PGPORT    | Add Reference → Postgres → PGPORT    |
| PGUSER    | Add Reference → Postgres → PGUSER    |
| PGPASSWORD| Add Reference → Postgres → PGPASSWORD|
| PGDATABASE| Add Reference → Postgres → PGDATABASE|

O backend agora monta o DSN a partir dessas variáveis automaticamente.

## Solução 3 (RECOMENDADA): Colar DATABASE_URL direto (Raw Editor)

As referências podem não estar funcionando. Use o valor bruto:

1. **Postgres** (clique no serviço Postgres) → aba **Variables**
2. Encontre **DATABASE_URL** ou **DATABASE_PRIVATE_URL** e clique no ícone de **copiar** o valor
3. **barbearia-app** → aba **Variables**
4. Clique em **Raw Editor**
5. **Remova** as variáveis antigas (DATABASE_URL, PGHOST, etc. se forem referências)
6. Adicione: `DATABASE_URL` = (cole a URL copiada do Postgres)
   - Formato: `postgresql://postgres:SENHA@centerbeam.proxy.rlwy.net:22835/railway`
7. Salve e faça **Redeploy**

---

## Solução 4: Conferir nome do serviço Postgres (se usar referências)

O nome na referência `${{Postgres.DATABASE_URL}}` deve ser **exatamente** o nome do seu serviço Postgres. Se o serviço se chama "PostgreSQL" ou "postgres" (minúsculo), ajuste a referência.

## Solução 5: Verificar Root Directory e Redeploy

1. **Settings** → **Source** → Root Directory = **`backend`**
2. **Deployments** → **Redeploy**

---

## Checklist

- [ ] **Solução 3**: Copiar DATABASE_URL do Postgres e colar no barbearia-app (Raw Editor)
- [ ] Ou: Add Reference → Postgres → **DATABASE_URL** (se as referências funcionarem)
- [ ] Ou: Add Reference para **PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE**
- [ ] Settings → Root Directory = **backend**
- [ ] Redeploy
