# Script PowerShell para baixar e instalar Eclipse Adoptium Temurin JDK 21 (x64)
# Observação: execute como Administrador se quiser instalar em C:\Program Files\Java

$version = '21'
$arch = 'x64'
$destDir = "$env:ProgramFiles\\Java\\jdk-$version"

Write-Host "Baixando Temurin JDK $version..."

$downloadUrl = "https://api.adoptium.net/v3/binary/latest/$version/ga/windows/$arch/jdk/hotspot/normal/eclipse"
$tmpZip = "$env:TEMP\\temurin-jdk-$version.zip"

Invoke-WebRequest -Uri $downloadUrl -OutFile $tmpZip -UseBasicParsing

Write-Host "Extraindo para $destDir..."
Expand-Archive -Path $tmpZip -DestinationPath $env:TEMP -Force

# Encontrar a pasta extraída que contém 'jdk' no nome
$extracted = Get-ChildItem $env:TEMP | Where-Object { $_.PSIsContainer -and $_.Name -match 'jdk' } | Select-Object -First 1
if (-not $extracted) {
    Write-Error "Não foi possível localizar a pasta extraída do JDK. Verifique o zip baixado: $tmpZip"
    exit 1
}

# Mover para Program Files\Java
if (-Not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force | Out-Null
}

Move-Item -Path $extracted.FullName -Destination $destDir -Force

Write-Host "JDK 21 instalado em: $destDir"
Write-Host "Adicione ou atualize JAVA_HOME e PATH conforme necessário."

# Limpeza
Remove-Item $tmpZip -Force

Write-Host "Pronto. Você pode agora configurar o arquivo %USERPROFILE%\\.m2\\toolchains.xml para apontar para este JDK."