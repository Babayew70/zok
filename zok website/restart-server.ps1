# Скрипт для перезапуска серверов

Write-Host "Остановка текущих процессов Node.js..." -ForegroundColor Yellow

# Остановка процессов на портах 3000 и 5000
$processes = Get-NetTCPConnection -LocalPort 3000,5000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
foreach ($pid in $processes) {
    Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
}

Start-Sleep -Seconds 2

Write-Host "Запуск проекта..." -ForegroundColor Green
cd $PSScriptRoot
npm run dev

