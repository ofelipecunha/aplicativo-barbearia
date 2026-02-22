# Prompt para contexto de IA — Projeto Barbearia

Use o texto abaixo para dar contexto a uma IA sobre este projeto. Cole no início da conversa ou em um System Prompt.

---

## Texto para copiar

```
Este é o projeto **Barbearia** (ou Wender Barbearia) — um sistema completo de gestão para barbearias e salões de beleza. Atende tanto **app mobile** quanto **web**.

### O que é o projeto
- Sistema de gestão para barbearias/salões
- **App mobile**: Flutter (iOS e Android)
- **Web**: Angular (dashboard administrativo e recepção)
- **Backend**: API REST em Go
- Funciona com backend real ou em **modo demo** com dados chumbados (offline)

### Perfis de usuário

1. **DONO**
   - Acesso total ao sistema
   - Dashboard com faturamento, gráficos, ranking de cabeleireiros
   - Gestão de usuários (solicitações, aprovação, controle)
   - Produtos e serviços (CRUD)
   - Agenda geral
   - Caixa (abertura, sangria, recebimento, fechamento)
   - Relatórios (produtos, atendimentos, agenda)
   - Criar clientes

2. **RECEPCIONISTA** (RECEPCAO)
   - Dashboard próprio com foco em operação
   - Fila de espera e chamada de clientes
   - Adicionar cliente na fila
   - Agenda (agendamentos)
   - Produtos e serviços (listar, cadastrar)
   - Caixa (recebimento, lançamentos)
   - Notificações (reabastecer, lembretes de agendamento)

3. **CABELEIREIRO**
   - Dashboard com sua agenda do dia
   - Fila de atendimentos (geral + seus agendamentos)
   - Iniciar/encerrar atendimento
   - Adicionar serviços e produtos ao atendimento
   - Notificações de agenda
   - Lista de produtos (venda)

### Telas principais — App (Flutter)

- **Splash** → **Login** → redireciona conforme perfil
- **AdminDashboard** (DONO): início, produtos, serviços, agenda, solicitações, caixa (abertura, sangria, recebimento, fechamento), relatórios, controle de usuários, criar cliente
- **ReceptionHome** (RECEPCIONISTA): fila, agenda, produtos/serviços, caixa
- **BarberHome** (CABELEIREIRO): fila/agenda, atendimentos, produtos
- **AgendaPage**: calendário, agendamentos por cabeleireiro
- **ProdutosPage** / **ServicosPage**: listagem e cadastro
- **CashPage**: caixa, saldo, lançamentos, recebimento
- **PerfilPage**: dados pessoais, alterar senha, controle de usuários (DONO)
- **CriarClientePage**, **SolicitacoesUsuariosPage**, **ControleUsuariosPage**: específicos do DONO

### Telas principais — Web (Angular)

- **Login** → redireciona por perfil
- **Dashboard** (DONO): `/dashboard` — mesma lógica do app (produtos, serviços, agenda, solicitações, caixa, relatórios)
- **Dashboard Recepção** (RECEPCIONISTA): `/dashboard-recepcao` — fila, agenda, produtos, caixa
- **Perfil**: `/perfil` — alterar dados e senha
- Rotas: login, cadastro, esqueci-senha, reset-senha

### Funcionalidades centrais

- **Fila de espera**: clientes aguardando atendimento
- **Atendimentos**: abertura, serviços/produtos, recebimento, encerramento
- **Agendamentos**: por cliente, serviço e cabeleireiro
- **Caixa**: abertura, sangria, recebimento (PIX, dinheiro, cartão), fechamento
- **Produtos**: estoque, venda, custo
- **Serviços**: corte, barba, coloração etc.
- **Usuários**: cadastro público (RECEPCIONISTA/CABELEIREIRO), aprovação pelo DONO
- **Notificações**: reabastecer, lembretes de agendamento, cliente na fila

### Estrutura do projeto

- `lib/` — app Flutter (views, api, demo)
- `site-angular/` — app web Angular
- `backend/` — API Go
- `lib/demo/remover_demo_data.dart` — dados chumbados para modo demo
- `lib/demo/remover_demo_config.dart` — flag `removerDemoUseDemoData` (true = demo, false = backend)
```
