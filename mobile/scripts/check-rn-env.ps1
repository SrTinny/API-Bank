# Script de verificação básico para ambiente React Native no Windows
# Verifica Node, npm, yarn, git, javac, adb

Write-Host "Verificando Node..."
node --version 2>$null
if ($LASTEXITCODE -ne 0) { Write-Host "Node não encontrado" -ForegroundColor Red } else { node --version }

Write-Host "Verificando npm..."
npm --version 2>$null
if ($LASTEXITCODE -ne 0) { Write-Host "npm não encontrado" -ForegroundColor Red } else { npm --version }

Write-Host "Verificando yarn (opcional)..."
yarn --version 2>$null
if ($LASTEXITCODE -ne 0) { Write-Host "yarn não encontrado (opcional)" -ForegroundColor Yellow } else { yarn --version }

Write-Host "Verificando Git..."
git --version 2>$null
if ($LASTEXITCODE -ne 0) { Write-Host "git não encontrado" -ForegroundColor Red } else { git --version }

Write-Host "Verificando Java (javac)..."
javac -version 2>$null
if ($LASTEXITCODE -ne 0) { Write-Host "javac não encontrado" -ForegroundColor Yellow } else { javac -version }

Write-Host "Verificando adb (Android SDK Platform-tools)..."
adb version 2>$null
if ($LASTEXITCODE -ne 0) { Write-Host "adb não encontrado" -ForegroundColor Yellow } else { adb version }

Write-Host "Verificação completa."