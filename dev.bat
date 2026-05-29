@echo off
cd /d "%~dp0"
echo Starting Landscape and More dev server (fresh build cache)...
echo Open http://localhost:3000 in your browser when ready.
echo.
call npm run dev:clean
pause
