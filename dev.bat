@echo off
cd /d "%~dp0"
echo Starting Landscape and More dev server...
echo Open http://localhost:3000 in your browser when ready.
echo.
node scripts\dev.mjs
pause
