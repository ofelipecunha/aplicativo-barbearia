# Usar o iPhone como celular de teste com acesso ao banco

Você pode instalar uma versão **release** no iPhone e fazer o app falar com o backend real (e assim com o banco de dados) de duas formas.

---

## 1. Backend na nuvem (Render)

Se o backend já está no Render (`https://barbearia-app-v429.onrender.com`):

- O app em **release** já usa essa URL automaticamente (`lib/config/api_config.dart` → `productionApiUrl`).
- **Dados chumbados:** deixe `removerDemoUseDemoData = false` em `lib/demo/remover_demo_config.dart`.
- Instale no iPhone:
  ```bash
  cd "/Users/felipecunha/Desktop/projeto compartilhada/projetos rede/barbearia-app-main"
  flutter run -d 00008110-000955092209A01E --release
  ```
- O iPhone usa a internet e acessa o backend (e o banco) na nuvem. Não precisa estar na mesma rede do Mac.

---

## 2. Backend no seu Mac (mesma WiFi) — celular de teste “local”

Para o iPhone usar o backend rodando no **Mac** (e o Postgres do Mac):

### No Mac

1. Subir o backend (e o Postgres, se for local):
   ```bash
   cd backend
   go run ./cmd/server
   ```
   (Ou como você costuma rodar, ex.: porta 8080.)

2. Descobrir o IP do Mac na rede:
   ```bash
   ipconfig getifaddr en0
   ```
   Anote o IP (ex.: `192.168.1.10`).

### No projeto Flutter

3. Abra `lib/config/api_config.dart` e defina o IP do Mac em `baseUrlOverride`:
   ```dart
   const String baseUrlOverride = 'http://192.168.1.10:8080';
   ```
   (Troque `192.168.1.10` pelo IP que você anotou; use a porta do seu backend, ex.: 8080.)

4. Deixe os dados reais (sem demo):
   - `lib/demo/remover_demo_config.dart` → `removerDemoUseDemoData = false`.

5. Instale no iPhone (release):
   ```bash
   flutter run -d 00008110-000955092209A01E --release
   ```

Com isso, o app no iPhone chama o backend no Mac e o Mac acessa o banco. O iPhone precisa estar na **mesma WiFi** que o Mac.

---

## Resumo

| Objetivo                         | baseUrlOverride      | removerDemoUseDemoData | Onde roda o backend |
|----------------------------------|----------------------|------------------------|----------------------|
| Testar com backend na nuvem     | `''` (vazio)         | `false`                | Render               |
| Testar com backend no Mac       | `'http://IP_MAC:8080'` | `false`              | Mac (mesma WiFi)     |

Depois de testar com o Mac, volte `baseUrlOverride = ''` para não fixar o IP no código.
