@echo off
set PATH=C:\Program Files\nodejs;%PATH%
cd /d "%~dp0"
start "NeoTerra Launcher" "xmcl-electron-app\node_modules\electron\dist\electron.exe" "xmcl-electron-app\dist\index.js"
