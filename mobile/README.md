Configuração de ambiente React Native (Windows)

Este diretório descreve passo-a-passo para preparar um ambiente de desenvolvimento React Native no Windows. Inclui instruções para usar Expo (recomendado para começar) e React Native CLI (para builds nativos com Android/iOS).

Requisitos básicos
- Git
- Node.js (LTS) e npm
- Yarn (opcional, recomendado)
- JDK 11+ (para builds nativos Android). Se já tiver JDK21 instalado para o backend, pode servir.
- Android Studio (com SDK e AVD) para emulação Android
- (Opcional) Chocolatey para instalação automática de ferramentas

Opções de setup

1) Expo (mais simples, indicado para prototipagem rápida)
- Instalar Node.js: https://nodejs.org/
- Instalar Expo CLI globalmente (ou usar npx):
  - npm install -g expo-cli
  - OU usar: npx create-expo-app MyApp
- Criar app com Expo:
  - npx create-expo-app MyApp
  - cd MyApp
  - npx expo start

2) React Native CLI (quando precisar de código nativo)
- Instalar Node.js e Yarn
- Instalar Android Studio e configurar variáveis de ambiente (ANDROID_HOME / ANDROID_SDK_ROOT)
- Instalar React Native CLI globalmente (opcional) ou usar npx react-native init MyApp
- Criar app:
  - npx react-native init MyApp
  - cd MyApp
  - npx react-native run-android

Script de verificação
Há um script PowerShell `mobile/scripts/check-rn-env.ps1` que verifica o ambiente (Node, npm, yarn, git, javac, adb). Execute-o em PowerShell para checar o que falta.

Sugestão de workflow
- Para começar rapidamente, use Expo e o app Expo Go no seu celular.
- Se for necessário testar integrações nativas (push notifications, bibliotecas nativas), configure React Native CLI + Android Studio.

Se quiser, eu posso:
- Executar o script de checagem aqui e reportar os resultados no seu ambiente.
- Criar um app-base (Expo) dentro do repositório `mobile/`.
- Adicionar um README com instruções de CI para builds Android.
