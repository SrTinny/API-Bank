
-----------------
Aplicação Java (Spring Boot) que simula operações bancárias básicas com contas: Conta Comum, Conta Poupança e Conta Especial. A interface e fluxo esperado são descritos abaixo.

Fluxo de uso
------------
- Ao iniciar o programa, uma tela de boas-vindas aparece e, em seguida, telas para cadastro de contas (comum, poupança e especial).
- Após o cadastro, a tela de Operações apresenta os botões:
  1) Saque
  2) Depósito
  3) Transferência
  4) Reajustar
  5) Ver saldos
  6) Finalizar

- Comportamento resumido:
  - Saque: solicita número da conta e valor; verifica saldo e, se necessário, utiliza limite (cheque especial) aplicando multa quando usado.
  - Depósito: solicita número da conta e valor; confirma titular e atualiza saldo.
  - Transferência: solicita contas origem/destino e valor; realiza transferência quando aplicável.
  - Reajustar: aplica taxa (padrão 10% se não informada) à conta poupança.
  - Ver saldos: mostra saldos atualizados.
  # API-Bank (backend + mobile)

  Aplicação Java (Spring Boot) que implementa operações bancárias básicas: Conta Comum, Conta Poupança e Conta Especial. O repositório também contém um cliente mobile Expo (React Native + TypeScript) para testes locais.

  Sumário rápido
  --------------
  - Backend: `backend/` (Spring Boot, Java 21, Maven wrapper)
  - Mobile: `mobile/` (Expo-managed React Native, TypeScript)

  Pré-requisitos
  --------------
  - Java 21 JDK (recomendado: Eclipse Temurin / Adoptium)
  - Node.js + npm (para a parte mobile)
  - Rede: para testar no dispositivo físico, coloque o celular e a máquina na mesma rede Wi-Fi.

  Instalação rápida (backend)
  --------------------------
  1. Abra PowerShell no diretório `backend`.
  2. (Opcional) Se quiser usar o script para instalar o JDK 21 localmente:

  ```powershell
  cd backend\scripts
  .\install-jdk21.ps1
  ```

  3. Construir e executar (modo desenvolvimento):

  ```powershell
  cd backend
  .\mvnw.cmd -DskipTests package
  java -jar target\demo-0.0.1-SNAPSHOT.jar
  # ou durante desenvolvimento apenas
  .\mvnw.cmd spring-boot:run
  ```

  Instalação rápida (mobile)
  -------------------------
  1. No diretório `mobile`:

  ```bash
  cd mobile
  npm install        # se ainda não instalou dependências
  npx expo start
  ```

  2. Abra o app Expo Go no celular e escanei o QR apresentado pelo Metro Bundler (use `tunnel` se necessário).

  Configuração do cliente mobile
  ------------------------------
  O cliente axios está configurado para apontar para o IP local da máquina durante desenvolvimento. No arquivo `mobile/src/services/apiClient.ts` verifique o valor de `baseURL`.

  Exemplo (deve corresponder ao IP da sua máquina na rede local):

  ```ts
  export const api = axios.create({
    baseURL: 'http://192.168.18.44:8081',
    headers: { 'Content-Type': 'application/json' }
  })
  ```

  Se o seu Expo estiver usando `tunnel` ou `localhost`, prefira apontar para o IP LAN da máquina para que o dispositivo consiga alcançar o backend.

  Resolução de problemas comuns
  ----------------------------
  - AxiosError: Network Error
    - Causa típica: o dispositivo não consegue alcançar o backend (binding, porta ou firewall).
    - Verifique:
      - O backend está rodando (procure no `backend` por "Tomcat started on port 8081").
      - O `apiClient.baseURL` aponta para o IP correto e porta (ex.: `http://192.168.18.44:8081`).
      - Windows Firewall permite conexões na porta (ex.: 8081) para o processo Java. Se necessário, adicione uma regra temporária.

  - Erro 500 ao criar conta (duplicata)
    - Se o pedido retorna erro 500 e o log mostra `Conta com este número já existe.`, isso significa que tentou cadastrar um número duplicado. Agora duplicatas retornam HTTP 409 Conflict (mapeado por `ApiExceptionHandler`).

  Notas importantes sobre `application.properties`
  -----------------------------------------------
  Durante o desenvolvimento eu habilitei temporariamente as seguintes propriedades em `backend/src/main/resources/application.properties`:

  ```properties
  spring.jpa.hibernate.ddl-auto=update
  server.address=0.0.0.0
  ```

  - `ddl-auto=update` ajuda a criar/atualizar o schema automaticamente em H2 para desenvolvimento. NÃO deixe isso em produção; o ideal é usar migrações controladas (Flyway/Liquibase).
  - `server.address=0.0.0.0` faz o Spring aceitar conexões de outras máquinas na rede local (necessário para testes com dispositivo físico). Remova em produção se desejar limitar o binding.

  Scripts úteis
  -------------
  - `backend/scripts/clean.ps1` — script PowerShell para limpar `target/`, `backend_log.txt` e `backend_err.txt`. Uso:

  ```powershell
  cd backend
  .\scripts\clean.ps1
  # ou para remover também node_modules do mobile (CUIDADO):
  .\scripts\clean.ps1 -RemoveNodeModules
  ```

  Logs e diagnóstico
  ------------------
  - Logs do backend (quando executado via mvnw com redirecionamento) podem estar em `backend_log.txt` e `backend_err.txt`. Eles costumam conter mensagens úteis (ex.: payloads recebidos e stacktraces).

  Segurança / Produção
  --------------------
  - Antes de colocar em produção:
    - Reverter `spring.jpa.hibernate.ddl-auto` para `none` e aplicar migrações controladas.
    - Remover `server.address=0.0.0.0` se não desejar expor o serviço em todas as interfaces.
    - Configurar CORS e autenticação.

  Contato / Ajuda
  --------------
  Se quiser que eu configure um processo de inicialização mais seguro (migrations + script de seed) ou preparar um README mais detalhado para o mobile, diga qual área prefere que eu foque.

