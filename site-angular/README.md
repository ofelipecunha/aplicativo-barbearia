# Site Barbearia (Angular + PrimeNG)

Front-end em **Angular 18** com **PrimeNG**, consumindo as mesmas APIs do backend da barbearia.

## Tecnologias

- **Angular 18** (standalone components)
- **PrimeNG 18** (componentes: InputText, Password, Button, Calendar, Toast, Skeleton)
- **RxJS**, **date-fns**
- Tema PrimeNG: **Aura Dark Amber** (visual alinhado ao app)

## Estrutura

- `src/app/services/` – ApiService, AuthService
- `src/app/guards/` – authGuard (rotas privadas)
- `src/app/pages/` – login, cadastro, esqueci-senha, reset-senha, dashboard, perfil
- `src/app/models/` – User, Agendamento
- Mesmas APIs: `POST /api/auth/login`, `GET /api/agendamentos?data=`, `PATCH /api/usuarios/:id`, `POST /api/usuarios/:id/senha`, etc.

## Como rodar

1. **Instalar dependências**
   ```bash
   cd site-angular
   npm install
   ```

2. **Backend** rodando em `http://localhost:8080` (API em `/api`).

3. **Subir o site**
   ```bash
   npm start
   ```
   Acesse: http://localhost:4200

4. **Produção**  
   Alterar `src/environments/environment.prod.ts` com a URL da API e depois:
   ```bash
   npm run build
   ```

## Rotas

- `/login` – Login (login/senha)
- `/cadastro` – Cadastro (nome, login, senha)
- `/esqueci-senha` – Informação (contato com admin)
- `/reset-senha` – Placeholder
- `/dashboard` – Horários agendados (calendário + lista do dia) – **requer login**
- `/perfil` – Editar nome e senha – **requer login**
