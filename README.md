
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
  - Finalizar: encerra o programa.

Requisitos de desenvolvimento (upgrade Java)
-----------------------------------------
- Este projeto foi atualizado para usar Java 21 (LTS).
- Requisitos locais:
  - Java 21 JDK (Eclipse Temurin / Adoptium recomendado) — necessário para compilar e executar.
  - Maven (o projeto usa o Maven Wrapper `mvnw`, portanto maven não precisa estar instalado globalmente).

Instalação rápida do JDK 21 (sem privilégios de administrador)
-------------------------------------------------------------
Há um script auxiliar em `backend/scripts/install-jdk21.ps1` que baixa e extrai o Temurin JDK 21 para a pasta do usuário (`%USERPROFILE%\.jdk\jdk-21`). Exemplo de uso no PowerShell (executar na pasta `backend/scripts`):

```powershell
.\install-jdk21.ps1
```

Configurar Maven Toolchains (opcional)
------------------------------------
Para garantir que o Maven use JDK 21, crie (ou atualize) o arquivo `%USERPROFILE%\.m2\toolchains.xml` com o caminho para o JDK instalado. Exemplo:

```xml
<toolchains>
  <toolchain>
    <type>jdk</type>
    <provides>
      <version>21</version>
      <vendor>eclipse-adoptium</vendor>
    </provides>
    <configuration>
      <jdkHome>C:\\Users\\<seu_usuario>\\.jdk\\jdk-21</jdkHome>
    </configuration>
  </toolchain>
</toolchains>
```

Alternativa: exporte temporariamente `JAVA_HOME` apontando para o JDK21 antes de executar o Maven (ex.: em PowerShell):

```powershell
$inner = Get-ChildItem "$env:USERPROFILE\.jdk\jdk-21" -Directory | Select-Object -First 1
$env:JAVA_HOME = $inner.FullName
$env:PATH = "$env:JAVA_HOME\bin;" + $env:PATH
```

Como construir e executar o projeto
----------------------------------
No diretório `backend`:

```powershell
cd backend
.\mvnw.cmd -DskipTests package   # gera o jar
java -jar target\demo-0.0.1-SNAPSHOT.jar
```

Observações
-----------
- Fiz alterações de compatibilidade para Java 21 no POM (`maven-compiler-plugin` com `<release>21` e `maven-toolchains-plugin`) e corrigi a classe principal `BankApiApplication` para que o Spring Boot consiga empacotar o jar executável.
- Se for necessário, posso commitar essas mudanças e criar um pull request.

Contato
-------
Aluno: João Victor Cardoso Duarte

