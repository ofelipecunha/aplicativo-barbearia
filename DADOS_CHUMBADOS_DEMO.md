# Dados Chumbados - App Barbearia (Modo Demo)

Este documento lista todos os dados de demonstração usados quando o app está em modo offline/demo (`removerDemoUseDemoData = true`).

---

## Senha padrão (todos os usuários)

**Senha:** `1234`

---

## Usuários

| ID | Nome   | Login           | Perfil        | Uso                          |
|----|--------|-----------------|---------------|------------------------------|
| 1  | Wender | `wender`        | **DONO**      | Acesso total ao sistema      |
| 2  | Alice  | `alice`         | **RECEPCIONISTA** | Fila, agendamentos, caixa |
| 3  | Gustavo| `gustavo`       | **CABELEIREIRO**  | Atendimentos, fila         |
| 4  | Wender | `wender_barbeiro` | **CABELEIREIRO** | Atendimentos, fila       |
| 5  | João   | `joao`          | **CABELEIREIRO**  | Atendimentos, fila         |
| 6  | José   | `jose`          | **CABELEIREIRO**  | Atendimentos, fila         |

### Logins para demo

- **Dono:** `wender` / `1234`
- **Recepcionista:** `alice` / `1234`
- **Cabeleireiros:** `gustavo`, `wender_barbeiro`, `joao`, `jose` / `1234`

---

## Cabeleireiros (4)

| ID | Nome   | Login           |
|----|--------|-----------------|
| 3  | Gustavo| gustavo         |
| 4  | Wender | wender_barbeiro |
| 5  | João   | joao            |
| 6  | José   | jose            |

### Ranking (dashboard)

1. Gustavo — 28 atendimentos — R$ 1.820
2. Wender — 25 atendimentos — R$ 1.650
3. João — 24 atendimentos — R$ 1.580
4. José — 22 atendimentos — R$ 1.450

---

## Serviços (10)

| ID | Descrição          | Valor    |
|----|--------------------|----------|
| 1  | Corte masculino    | R$ 35,00 |
| 2  | Barba              | R$ 25,00 |
| 3  | Corte + Barba      | R$ 55,00 |
| 4  | Corte feminino     | R$ 75,00 |
| 5  | Coloração          | R$ 120,00|
| 6  | Hidratação         | R$ 45,00 |
| 7  | Sobrancelha        | R$ 15,00 |
| 8  | Pé e mão (unha)    | R$ 40,00 |
| 9  | Platinado Masculino| R$ 95,00 |
| 10 | Corte infantil     | R$ 30,00 |

---

## Produtos (12)

| ID | Descrição          | Venda    | Custo    | Estoque |
|----|--------------------|----------|----------|---------|
| 1  | Pomada             | R$ 30,00 | R$ 15,00 | 20      |
| 2  | Shampoo            | R$ 25,00 | R$ 10,00 | 15      |
| 3  | Condicionador      | R$ 28,00 | R$ 12,00 | 18      |
| 4  | Gel                | R$ 22,00 | R$ 8,00  | 25      |
| 5  | Cera modeladora    | R$ 35,00 | R$ 14,00 | 12      |
| 6  | Tinta capilar      | R$ 45,00 | R$ 20,00 | 10      |
| 7  | Esmalte            | R$ 12,00 | R$ 4,00  | 30      |
| 8  | Removedor          | R$ 18,00 | R$ 6,00  | 22      |
| 9  | Hidratante         | R$ 38,00 | R$ 16,00 | 14      |
| 10 | Secador            | R$ 85,00 | R$ 40,00 | 5       |
| 11 | Pomada Efeito Seco | R$ 42,00 | R$ 18,00 | 16      |
| 12 | Kit Barba Completo | R$ 68,00 | R$ 28,00 | 8       |

---

## Clientes (20)

João Silva, Maria Santos, Pedro Oliveira, Carlos Souza, Ana Costa, Rafael Lima, Fernanda Costa, Gustavo Mendes, Patricia Alves, Roberto Souza, Juliana Rocha, Marcos Paulo, Camila Dias, André Luiz, Larissa Martins, Bruno Santos, Carla Mendes, Diego Oliveira, Eduarda Lima, Fábio Costa.

*(Telefones fictícios no formato (11) 9XXXX-XXXX)*

---

## Fila de espera (hoje)

8 clientes na fila: João Silva, Maria Santos, Pedro Oliveira, Rafael Lima, Fernanda Costa, Gustavo Mendes, Patricia Alves, Roberto Souza.

---

## Agendamentos

- **3 a 6 agendamentos por cabeleireiro por dia**
- Distribuídos entre os 4 cabeleireiros (Gustavo, Wender, João, José)
- Serviços variados (corte, barba, coloração etc.)

---

## Atendimentos

- **Por dia:** 12 a 26 atendimentos variados nos últimos 30 dias
- **Atendimentos encerrados:** amostra com clientes e valores (R$ 55 a R$ 120)
- **Últimos lançamentos:** 15 recebimentos (PIX, DINHEIRO, CARTAO)

---

## Caixa

- **Status:** Aberto
- **Saldo do dia:** R$ 2.845,00
- **Últimos lançamentos:** mix de PIX, dinheiro e cartão

---

## Notificações

- **Recepcionista:** REABASTECER (Pomada Efeito Seco, Kit Barba Completo), LEMBRETE_AGENDAMENTO (João Silva)
- **Dono:** CLIENTE_NA_FILA (Pedro Oliveira)

---

## Ativar/desativar modo demo

Arquivo: `lib/demo/remover_demo_config.dart`

- `removerDemoUseDemoData = true` → usa dados chumbados
- `removerDemoUseDemoData = false` → usa backend/API real
