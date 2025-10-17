Instruções para configurar JDK 21 e Maven Toolchains

1) Instalar JDK 21 (Eclipse Temurin)
   - Execute o script `scripts\install-jdk21.ps1` como Administrador, ou baixe manualmente o JDK 21 e instale em `C:\Program Files\Java\jdk-21`.

2) Criar um arquivo de configuração do Maven toolchains em `%USERPROFILE%\\.m2\\toolchains.xml` com o conteúdo abaixo (ajuste o caminho se necessário):

```xml
<toolchains>
  <toolchain>
    <type>jdk</type>
    <provides>
      <version>21</version>
      <vendor>eclipse-adoptium</vendor>
    </provides>
    <configuration>
      <jdkHome>C:\\Program Files\\Java\\jdk-21</jdkHome>
    </configuration>
  </toolchain>
</toolchains>
```

3) Verificar o Java usado pelo Maven Wrapper
   - No diretório `backend`, execute `.\\mvnw -v` para confirmar o JDK ativo.

4) Rodar build
   - `.\
mvnw -DskipTests package`

Se você preferir não usar toolchains, basta definir `JAVA_HOME` apontando para o JDK 21 antes de executar o Maven.
