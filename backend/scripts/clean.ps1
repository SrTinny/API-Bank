<#
  scripts/clean.ps1
  Remove artifacts de build e logs para desenvolvimento local.

  Uso: execute na pasta backend (PowerShell)
    .\scripts\clean.ps1

  Opções:
    -RemoveNodeModules: Remove também mobile/node_modules (pode requerer reinstalação depois).
#>

param(
    [switch]$RemoveNodeModules
)

Write-Output "Cleaning backend artifacts..."

$root = Join-Path $PSScriptRoot ".."
Set-Location $root

if (Test-Path backend_log.txt) { Write-Output 'Removing backend_log.txt'; Remove-Item backend_log.txt -Force }
if (Test-Path backend_err.txt) { Write-Output 'Removing backend_err.txt'; Remove-Item backend_err.txt -Force }

if (Test-Path target) {
    Write-Output 'Removing target/ directory (this may take a while)...'
    Remove-Item -Recurse -Force target
}

if ($RemoveNodeModules) {
    $nm = Join-Path $root "..\mobile\node_modules"
    if (Test-Path $nm) {
        Write-Output 'Removing mobile/node_modules (this may be large)...'
        Remove-Item -Recurse -Force $nm
    } else { Write-Output 'mobile/node_modules not found' }
}

Write-Output 'Clean finished.'
