@echo off

REM Get the directory of the batch file
SET "BATCH_DIR=%~dp0"

REM --- Frontend ---
echo Starting Frontend...
start "Frontend" cmd /k "cd /d "%BATCH_DIR%frontend" && npm run dev"

REM --- Backend ---
echo Starting Backend...
start "Backend" cmd /k "cd /d "%BATCH_DIR%backend" && npm run server"

REM --- Admin ---
echo Starting Admin...
start "Admin" cmd /k "cd /d "%BATCH_DIR%admin" && npm run dev"

echo All processes started.