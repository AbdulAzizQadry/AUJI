@echo off
echo Setting up and starting AUJI project...

set PROJECT_DIR=%~dp0

cd /d "%PROJECT_DIR%"
if not exist node_modules (
    echo Installing frontend packages...
    npm install
)

echo Starting frontend server...
start cmd /k "cd /d %PROJECT_DIR% && npm start"

if exist "%PROJECT_DIR%\src/components/requirements.txt" (
    echo Installing Python dependencies...
    pip install -r "%PROJECT_DIR%\src/components/requirements.txt"
)

echo Starting backend server...
start cmd /k "cd /d %PROJECT_DIR%src/components/ && python app.py"

echo AUJI Project is up and running!
pause
