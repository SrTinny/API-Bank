
-----------------
Aplicação Java (Spring Boot) que simula operações bancárias básicas com contas: Conta Comum, Conta Poupança e Conta Especial. A interface e fluxo esperado são descritos abaixo.

Fluxo de uso
------------
- Ao iniciar o programa, uma tela de boas-vindas aparece e, em seguida, telas para cadastro de contas (comum, poupança e especial).
- Após o cadastro, a tela de Operações apresenta os botões:
  1) Saque
  # API-Bank (Backend + Mobile)

  Aplicação Java (Spring Boot) que implementa operações bancárias básicas (Conta Comum, Conta Poupança e Conta Especial). Inclui um cliente mobile Expo (React Native + TypeScript) para testes locais.

  ## Estrutura do repositório
  - `backend/` — Spring Boot (Java 21, Maven wrapper)
  - `mobile/` — Expo-managed React Native (TypeScript)

  ---

  ## Requisitos
  - Java 21 JDK (Eclipse Temurin / Adoptium recomendado)
  - Node.js + npm
  - PowerShell (Windows) para os comandos abaixo
  - Dispositivo e máquina no mesmo Wi-Fi para testes em dispositivo físico

  ---

  ## Como executar (sempre)
  Abaixo os passos curtos e reproduzíveis para rodar backend e mobile no Windows (PowerShell). Use esses comandos sempre para evitar problemas de porta/cache.

  ### 1) Backend (API)
  Abra PowerShell e execute:

  ```powershell
  cd C:\Users\joaov\Documents\Projetos\Tecnicas-de-prog-trab-1\backend
  # Build (gera o jar)
  .\mvnw.cmd -DskipTests package
  # Ou, para desenvolvimento (iniciar e acompanhar logs):
  .\mvnw.cmd spring-boot:run
  # Alternativa: executar o JAR gerado
  java -jar target\demo-0.0.1-SNAPSHOT.jar
  ```

  Notas:
  - O backend está configurado para escutar em `0.0.0.0` (aceita conexões da LAN).
  - H2 foi configurado em modo arquivo em `backend/data/bankdb.mv.db` para persistência em desenvolvimento.
  - H2 Console disponível: `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:file:./data/bankdb`).

  ### 2) Mobile (Expo)
  Abra um novo PowerShell, no diretório `mobile`:

  ```powershell
  cd C:\Users\joaov\Documents\Projetos\Tecnicas-de-prog-trab-1\mobile
  # Instalar dependências (se ainda não instalou)
  npm install
  # Iniciar bundler (force clear cache quando alterar baseURL)
  npx expo start -c
  ```

  - Abra o Expo Go no seu celular e escaneie o QR.
  - Caso o Expo proponha mudar de porta, aceite ou force a porta 8081 com `npx expo start --port 8081 -c`.
  - O `apiClient` do mobile já foi configurado para usar o IP da máquina: `http://192.168.18.44:8080`. Atualize `mobile/src/services/apiClient.ts` se seu IP mudar.

  ---

  ## H2 Console (inspecionar o DB)
  1. Abra: `http://localhost:8080/h2-console`
  2. JDBC URL: `jdbc:h2:file:./data/bankdb` (ou caminho absoluto `jdbc:h2:file:C:/.../backend/data/bankdb`)
  3. User: `sa` | Password: (vazio)
  4. Ex.: `SELECT * FROM CONTAS;`

  Se o console reclamar que o DB não existe, verifique o path e se o backend está executando com o mesmo arquivo.

   ---

   ## Testando Transferência (PowerShell)

   A seguir alguns comandos PowerShell para testar a funcionalidade de transferência diretamente na API.

   1) Criar duas contas de teste (origem e destino):

   ```powershell
   # Conta origem (COMUM)
   Invoke-RestMethod -Uri http://localhost:8080/api/contas -Method Post -ContentType 'application/json' -Body '{"tipo":"COMUM","numero":"1000","titular":"Conta Origem"}'

   # Conta destino (COMUM)
   Invoke-RestMethod -Uri http://localhost:8080/api/contas -Method Post -ContentType 'application/json' -Body '{"tipo":"COMUM","numero":"2000","titular":"Conta Destino"}'
   ```

   2) Fazer um depósito inicial na conta origem para ter saldo disponível:

   ```powershell
   Invoke-RestMethod -Uri http://localhost:8080/api/contas/1000/deposito -Method Patch -ContentType 'application/json' -Body '{"valor":150.00}'
   ```

   3) Executar transferência (happy path):

   ```powershell
   $body = @{ contaOrigem = '1000'; contaDestino = '2000'; valor = 50 } | ConvertTo-Json
   Invoke-RestMethod -Uri http://localhost:8080/api/contas/transferencia -Method Patch -ContentType 'application/json' -Body $body
   ```

   4) Conferir saldos após transferência:

   ```powershell
   Invoke-RestMethod -Uri http://localhost:8080/api/contas/1000 -Method Get
   Invoke-RestMethod -Uri http://localhost:8080/api/contas/2000 -Method Get
   ```

   5) Teste de saldo insuficiente (espera HTTP 400 / mensagem de erro): tente transferir um valor maior que o saldo disponível na origem.

   ```powershell
   $body = @{ contaOrigem = '1000'; contaDestino = '2000'; valor = 10000 } | ConvertTo-Json
   Invoke-RestMethod -Uri http://localhost:8080/api/contas/transferencia -Method Patch -ContentType 'application/json' -Body $body -ErrorAction Stop
   ```

   - O serviço retornará um erro com status 400 e uma mensagem com `Saldo insuficiente` (tratado por `ApiExceptionHandler`).

  ---

  ## Solução rápida para `AxiosError: Network Error` no Expo Go
  1. Confirme que o backend responde do celular (abra no navegador do celular):
     `http://192.168.18.44:8080/api/contas`
  2. Se abrir JSON, recarregue o Expo (`npx expo start -c` e "Reload" no app).
  3. Se não abrir do celular:
     - Verifique firewall (abrir porta 8080 para rede privada) ou pare VPN/isolamento de rede.
     - Verifique se o `apiClient` usa o IP correto.

  ---

  ## Comandos de diagnóstico úteis
  - Ver processos escutando portas (Windows):
  ```powershell
  netstat -aon | findstr ":8080"
  netstat -aon | findstr ":8081"
  ```
  - Encontrar e parar processo (ex.: PID 13500):
  ```powershell
  tasklist /FI "PID eq 13500" /FO LIST
  Stop-Process -Id 13500 -Force
  ```
  - Checar IP da máquina (LAN):
  ```powershell
  Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -notlike '127.*' -and $_.IPAddress -notlike '169.254.*' } | Select-Object IPAddress, InterfaceAlias
  ```
