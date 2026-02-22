# Lógica completa: CAIXA, SANGRIA e ENCERRAR CAIXA

## ⚠️ MODELO ATUAL (caixa_movimento)

O sistema usa **caixa_movimento** como espinha dorsal:

- **Abertura:** `POST /api/caixa/abrir` → insere `caixa_movimento` (status ABERTO). Não pode haver outro caixa ABERTO.
- **Fechamento:** `POST /api/caixa/fechar` → atualiza o caixa aberto (status FECHADO, `data_fechamento`, `valor_fechamento`). A tabela `caixa_fechamento` foi **removida**.
- **Saldo:** `GET /api/caixa/saldo` → `valor_abertura + entradas - sangrias` do caixa **aberto**.
- **Últimos:** `GET /api/caixa/ultimos` → últimos 10 lançamentos do caixa **aberto** (entradas + sangrias).
- **Pagamento / Sangria:** exigem caixa **aberto**; ambos gravam `id_caixa_movimento`.

Tabelas: `caixa_movimento`, `caixa` (com `id_caixa_movimento`), `caixa_sangria` (com `id_caixa_movimento`).

---

## 1. TABELAS E MODELOS (Banco de Dados) — REFERÊNCIA

### 1.1 Tabela `caixa`
Registra **pagamentos** recebidos (entradas no caixa), vinculados a um atendimento.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | uint (PK) | ID do registro |
| `id_atendimento` | uint | FK → atendimento |
| `valor` | float64 | Valor pago |
| `tipo_pagamento` | string | Ex: Dinheiro, Pix, Débito, Crédito |
| `observacao` | string | Observação opcional |
| `data_pagamento` | timestamp | Data/hora (auto) |

**Modelo Go:**
```go
type Caixa struct {
	ID            uint      `json:"id" gorm:"primaryKey;column:id"`
	AtendimentoID uint      `json:"id_atendimento" gorm:"column:id_atendimento"`
	Valor         float64   `json:"valor" gorm:"column:valor"`
	TipoPagamento string    `json:"tipo_pagamento" gorm:"column:tipo_pagamento"`
	Observacao    string    `json:"observacao" gorm:"column:observacao"`
	DataPagamento time.Time `json:"data_pagamento" gorm:"column:data_pagamento;autoCreateTime"`
}
```

---

### 1.2 Tabela `caixa_sangria`
Registra **sangrias** (retiradas de dinheiro do caixa).

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | uint (PK) | ID do registro |
| `data_sangria` | timestamp | Data/hora (auto) |
| `valor` | float64 | Valor retirado |
| `observacao` | string | Observação opcional |

**Modelo Go:**
```go
type CaixaSangria struct {
	ID          uint      `json:"id" gorm:"primaryKey;column:id"`
	DataSangria time.Time `json:"data_sangria" gorm:"column:data_sangria;autoCreateTime"`
	Valor       float64   `json:"valor" gorm:"column:valor"`
	Observacao  string    `json:"observacao" gorm:"column:observacao"`
}
```

---

### 1.3 Tabela `caixa_fechamento`
Registra **fechamentos de caixa** (encerramento do dia).

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | uint (PK) | ID do registro |
| `data_fechamento` | timestamp | Data/hora (auto) |
| `valor_total` | float64 | Valor total no fechamento |
| `observacao` | string | Observação opcional |

**Modelo Go:**
```go
type CaixaFechamento struct {
	ID             uint      `json:"id" gorm:"primaryKey;column:id"`
	DataFechamento time.Time `json:"data_fechamento" gorm:"column:data_fechamento;autoCreateTime"`
	ValorTotal     float64   `json:"valor_total" gorm:"column:valor_total"`
	Observacao     string    `json:"observacao" gorm:"column:observacao"`
}
```

---

## 2. ROTAS DA API (Backend)

| Método | Rota | Handler | Descrição |
|--------|------|---------|-----------|
| POST | `/api/caixa` | RegistrarPagamento | Registra pagamento (entrada) |
| GET | `/api/caixa/ultimos` | ListUltimosLancamentos | Últimos 10 lançamentos (caixa + sangria) |
| GET | `/api/caixa/saldo` | SaldoDoDia | Saldo do dia (entradas − sangrias) |
| GET | `/api/caixa/:id/detalhe` | DetalheCaixa | Detalhe de um lançamento de caixa (para modal) |
| POST | `/api/caixa/sangria` | RegistrarSangria | Registra sangria |
| POST | `/api/caixa/fechamento` | RegistrarFechamento | Registra fechamento de caixa |

---

## 3. HANDLERS, QUERIES E INSERTS (Backend)

### 3.1 RegistrarPagamento — POST `/api/caixa`

**Request body:**
```json
{
  "id_atendimento": 1,
  "valor": 50.00,
  "tipo_pagamento": "Dinheiro"
}
```

**Validação:** `id_atendimento` obrigatório.

**Insert (GORM):**
```go
p := models.Caixa{
	AtendimentoID: body.AtendimentoID,
	Valor:         body.Valor,
	TipoPagamento: body.TipoPagamento,
}
h.DB.Create(&p)
```

**Campos inseridos:** `id_atendimento`, `valor`, `tipo_pagamento`. `observacao` vazio, `data_pagamento` automático.

---

### 3.2 ListUltimosLancamentos — GET `/api/caixa/ultimos`

**Query SQL:**
```sql
SELECT 'CAIXA' AS origem, cx.id, cli.nome, cx.valor, cx.data_pagamento AS data, 'ENTRADA' AS tipo, cx.tipo_pagamento
FROM caixa cx
JOIN atendimento a ON a.id = cx.id_atendimento
JOIN fila_atendimento f ON f.id = a.id_fila
JOIN cliente cli ON cli.id = f.id_cliente
UNION ALL
SELECT 'SANGRIA' AS origem, sg.id, 'Sangria' AS nome, sg.valor, sg.data_sangria::timestamp AS data, 'SAIDA' AS tipo, NULL AS tipo_pagamento
FROM caixa_sangria sg
ORDER BY data DESC
LIMIT 10;
```

**Resposta:** lista de objetos com `origem`, `id`, `nome`, `valor`, `data`, `tipo`, `tipo_pagamento`.

---

### 3.3 SaldoDoDia — GET `/api/caixa/saldo`

**Query SQL:**
```sql
SELECT COALESCE(SUM(c.valor),0) -
       COALESCE((SELECT SUM(valor) FROM caixa_sangria WHERE data_sangria = CURRENT_DATE),0)
FROM caixa c
WHERE DATE(c.data_pagamento) = CURRENT_DATE;
```

**Fórmula:** `soma(caixa do dia) − soma(sangrias do dia)`.

**Resposta:** `{ "saldo": number }`.

---

### 3.4 DetalheCaixa — GET `/api/caixa/:id/detalhe`

**Query 1 – Cabeçalho do lançamento:**
```sql
SELECT
    cli.nome,
    c.valor,
    c.tipo_pagamento,
    c.observacao,
    c.data_pagamento
FROM caixa c
JOIN atendimento a ON a.id = c.id_atendimento
JOIN fila_atendimento f ON f.id = a.id_fila
JOIN cliente cli ON cli.id = f.id_cliente
WHERE c.id = ?;
```

**Query 2 – Serviços do atendimento vinculado ao caixa:**
```sql
SELECT s.descricao, ats.valor
FROM atendimento_servico ats
JOIN servico s ON s.id = ats.id_servico
JOIN atendimento a ON a.id = ats.id_atendimento
JOIN caixa c ON c.id_atendimento = a.id
WHERE c.id = ?;
```

**Resposta:** `{ cliente, valor, tipo_pagamento, observacao, data_pagamento, servicos: [{ descricao, valor }, ...] }`.

---

### 3.5 RegistrarSangria — POST `/api/caixa/sangria`

**Request body:**
```json
{
  "valor": 100.00,
  "observacao": "Retirada para banco"
}
```

**Validação:** `valor` obrigatório e > 0.

**Insert (GORM):**
```go
var body models.CaixaSangria  // valor, observacao
h.DB.Create(&body)
```

**Campos inseridos:** `valor`, `observacao`. `data_sangria` automático.

---

### 3.6 RegistrarFechamento — POST `/api/caixa/fechamento` (ENCERRAR CAIXA)

**Request body:**
```json
{
  "valor_total": 1500.00,
  "observacao": "Fechamento 24/01"
}
```

**Validação:** `valor_total` obrigatório e > 0.

**Insert (GORM):**
```go
var body models.CaixaFechamento  // valor_total, observacao
h.DB.Create(&body)
```

**Campos inseridos:** `valor_total`, `observacao`. `data_fechamento` automático.

---

## 4. FRONTEND (Flutter) — Tela Caixa

**Arquivo:** `lib/view/reception_page/cash_page.dart`

### 4.1 Chamadas à API

| Ação | Método ApiClient | Endpoint |
|------|------------------|----------|
| Carregar saldo | `getSaldoDia()` | GET `/api/caixa/saldo` |
| Carregar últimos lançamentos | `getUltimosLancamentos()` | GET `/api/caixa/ultimos` |
| Registrar sangria | `registrarSangria(valor, observacao)` | POST `/api/caixa/sangria` |

**Não existe no ApiClient:**
- Nenhum método para **DetalheCaixa** (`GET /api/caixa/:id/detalhe`).
- Nenhum método para **Fechamento** (`POST /api/caixa/fechamento`).

---

### 4.2 Fluxo da tela

1. **initState**  
   Chama `_carregarDados()`:
   - `getSaldoDia()` → exibe "Caixa do dia".
   - `getUltimosLancamentos()` → preenche grid "Últimos lançamentos" e lista "Lançamentos" (mesma fonte, mapeada).

2. **SANGRIA**  
   - Abre modal com: Data (readonly), Valor, Observação.
   - Ao salvar: valida valor, chama `registrarSangria`, fecha o modal e chama `_carregarDados()`.

3. **ENCERRAR CAIXA**  
   - Abre modal com: Data/Hora (readonly), Valor, Observação.
   - **Problema:** o botão "SALVAR" apenas fecha o modal (`Navigator.of(ctx).pop()`). **Não chama a API de fechamento** e não usa os campos Valor/Observação.

4. **Clique em um “Último lançamento”**  
   - Abre `_openUltimoModal(item)`.
   - Usa só os dados do `item` (vindos de `getUltimosLancamentos`). **Não chama** `GET /api/caixa/:id/detalhe`.
   - O modal mostra "Serviços" usando `item["servicos"]`, mas a API de últimos **não retorna** `servicos`. Resultado: lista vazia ou erro.
   - O dropdown "Tipo de pagamento" e o botão "FINALIZAR" existem, mas "FINALIZAR" só adiciona um item local em `lancamentos` (tipo "SAÍDA"). **Não há INSERT** em caixa/sangria nem qualquer outra API.

5. **Filtros**  
   Chips "TODOS", "ENTRADA", "SAÍDA". A API devolve `tipo = 'SAIDA'` (sem acento). O filtro "SAÍDA" compara com `"SAÍDA"`, então **não filtra** os itens de sangria corretamente.

---

### 4.3 Resumo de gaps na tela Caixa

| Funcionalidade | Backend | Frontend | Observação |
|----------------|---------|----------|------------|
| Saldo do dia | ✅ | ✅ | Ok |
| Últimos lançamentos | ✅ | ✅ | Ok |
| Sangria | ✅ | ✅ | Ok |
| Encerrar caixa | ✅ | ❌ | API existe; tela não chama e não envia valor_total/observacao |
| Detalhe do lançamento | ✅ | ❌ | API existe; modal usa só lista, sem GET por id e sem serviços |
| Registrar pagamento (nova entrada) | ✅ | ❌ | Não há tela/botão na Caixa que chame POST /caixa |

---

## 5. API CLIENT (Flutter) — Métodos de Caixa

```dart
// GET /api/caixa/saldo
static Future<double> getSaldoDia() async { ... }

// GET /api/caixa/ultimos
static Future<List<Map<String, dynamic>>> getUltimosLancamentos() async { ... }

// POST /api/caixa/sangria
static Future<void> registrarSangria(double valor, {String observacao = ""}) async { ... }
```

**Não implementados:**
- `GET /api/caixa/:id/detalhe`
- `POST /api/caixa/fechamento`
- `POST /api/caixa` (registrar pagamento)

---

## 6. IDEIAS PARA MELHORAR

1. **Encerrar caixa**
   - Na abertura do modal, pré-preencher "Valor" com o saldo do dia (`getSaldoDia`).
   - Ao salvar, chamar `POST /api/caixa/fechamento` com `valor_total` e `observacao`.
   - Adicionar `registrarFechamento(valorTotal, observacao)` no `ApiClient`.

2. **Detalhe do lançamento**
   - Ao abrir o modal do card, chamar `GET /api/caixa/:id/detalhe` (usar `id` do item).
   - Exibir serviços, tipo de pagamento e observação retornados.
   - Remover o "FINALIZAR" que só altera estado local, ou substituir por ação que faça sentido (ex.: apenas visualização).

3. **Filtro SAÍDA**
   - Normalizar `tipo`: tratar `"SAIDA"` e `"SAÍDA"` como o mesmo no filtro.

4. **Registro de pagamento**
   - Se a Caixa também registrar pagamentos (não só recepção/atendimento), criar fluxo que chame `POST /api/caixa` com `id_atendimento`, `valor` e `tipo_pagamento`.

5. **Caixa**
   - Garantir que `observacao` seja enviada no `RegistrarPagamento` quando houver campo na UI.
   - Opcional: `id_usuario` em sangria/fechamento para rastrear quem fez o lançamento.

6. **Fechamento**
   - Opcional: validar se `valor_total` está próximo do saldo do dia (ex.: tolerância em R$) e alertar se divergir.

---

## 7. RESUMO RÁPIDO

| Entidade | Tabela | INSERT | Principais queries |
|----------|--------|--------|--------------------|
| **Caixa (entrada)** | `caixa` | POST /api/caixa | Saldo do dia, Últimos, Detalhe |
| **Sangria** | `caixa_sangria` | POST /api/caixa/sangria | Últimos, Saldo do dia |
| **Encerrar caixa** | `caixa_fechamento` | POST /api/caixa/fechamento | Nenhuma leitura específica implementada |

Queries principais:
- **Saldo:** soma(caixa) − soma(sangria) no dia.
- **Últimos:** `caixa` + `caixa_sangria` ordenados por data, limit 10.
- **Detalhe:** caixa + cliente + serviços do atendimento.
