@echo off
setlocal
cd /d "%~dp0"

set PORT=8765
set URL=http://127.0.0.1:%PORT%/

echo ========================================
echo   Weather Dashboard
echo   %URL%
echo ========================================
echo.
echo 請務必使用完整網址（含 :8765）
echo.

where python >nul 2>&1
if errorlevel 1 (
  echo [錯誤] 找不到 python，請安裝 Python 3 後再試。
  pause
  exit /b 1
)

if not exist "config.js" (
  echo [提示] 尚未建立 config.js
  echo        請手動建立 config.js 並填入 Google Places API Key
  echo        格式見 README.md
  echo.
)

echo 關閉舊的本機伺服器（若有）...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":%PORT% " ^| findstr LISTENING') do (
  taskkill /F /PID %%a >nul 2>&1
)

echo 啟動伺服器中... 2 秒後開啟瀏覽器
echo 按 Ctrl+C 可停止
echo.

start /min cmd /c "ping 127.0.0.1 -n 3 >nul && start "" "%URL%""

python serve.py %PORT%
if errorlevel 1 (
  echo.
  echo [錯誤] 無法啟動伺服器，請確認埠 %PORT% 未被占用。
  pause
  exit /b 1
)
