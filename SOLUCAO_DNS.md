# Erro "No address associated with hostname"

## Problema

O celular não consegue resolver o DNS de `barbearia-app-production.up.railway.app`, mesmo com o backend funcionando.

## Soluções

### Solução 1: Mudar DNS do celular (mais rápido)

1. **Android:**
   - Configurações → Conexões → Wi-Fi
   - Toque e segure na rede conectada → Gerenciar configurações de rede
   - Avançado → Configurações de IP → Estático
   - DNS 1: `8.8.8.8` (Google)
   - DNS 2: `1.1.1.1` (Cloudflare)
   - Salvar

2. **iOS:**
   - Ajustes → Wi-Fi
   - Toque no (i) da rede conectada
   - Configurar DNS → Manual
   - Adicionar `8.8.8.8` e `1.1.1.1`
   - Salvar

3. **Reinicie o app** e teste o cadastro

---

### Solução 2: Usar domínio customizado no Railway

Se a Solução 1 não funcionar, o Railway pode gerar um domínio customizado:

1. **Railway** → **barbearia-app** → **Settings** → **Networking**
2. Clique em **Generate Domain** (se houver essa opção)
3. Copie o novo domínio gerado
4. Atualize `productionApiUrl` em `lib/config/api_config.dart`
5. Gere novo APK: `build_apk.bat`

---

### Solução 3: Testar em outra rede

- Tente conectar o celular em outra rede Wi-Fi (casa de amigo, trabalho, etc.)
- Algumas operadoras móveis (4G/5G) bloqueiam certos domínios

---

### Solução 4: Verificar se o domínio existe

No PC, abra o PowerShell e rode:

```powershell
nslookup barbearia-app-production.up.railway.app
```

Se retornar um IP, o domínio existe. Se der erro, o Railway pode não ter gerado o domínio público ainda.

---

## Por que isso acontece?

O erro "No address associated with hostname" significa que o DNS do celular não consegue traduzir `barbearia-app-production.up.railway.app` para um endereço IP. Isso pode ser:

- DNS da operadora bloqueando/falhando
- Domínio Railway ainda não propagado
- Cache de DNS no celular

A Solução 1 (mudar DNS) resolve na maioria dos casos.
