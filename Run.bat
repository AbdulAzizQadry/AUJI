@echo off
set PROJECT_DIR=%~dp0
cd /d "%PROJECT_DIR%"
if not exist node_modules (
    npm install
)
start cmd /k "cd /d %PROJECT_DIR% && npm start"
if exist "%PROJECT_DIR%\src/components/requirements.txt" (
    pip install -r "%PROJECT_DIR%\src/components/requirements.txt"
)
start cmd /k "cd /d %PROJECT_DIR%src/components/ && python app.py"
pause
