@echo off
setlocal
cd /d "%~dp0"

set PORT=8765
set URL=http://127.0.0.1:%PORT%

echo ========================================
echo   Weather Dashboard
echo   %URL%
echo ========================================
echo.
echo Starting server... browser opens in 2 sec.
echo Press Ctrl+C to stop.
echo.

rem Open browser after server has time to start
start /min cmd /c "ping 127.0.0.1 -n 3 >nul && start "" "%URL%""

python -m http.server %PORT% --bind 127.0.0.1
