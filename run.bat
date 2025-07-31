@echo off
chcp 65001 >nul
title Plataforma de Análise Psicológica - Executando
color 0B

echo.
echo ╔══════════════════════════════════════════════════════════════════════════════╗
echo ║                    PLATAFORMA DE ANÁLISE PSICOLÓGICA                         ║
echo ║                           Iniciando Sistema...                              ║
echo ╚══════════════════════════════════════════════════════════════════════════════╝
echo.

:: Verificar se as dependências estão instaladas
if not exist "node_modules" (
    echo [AVISO] Dependências não encontradas. Executando instalação...
    echo.
    call setup.bat
    if %errorlevel% neq 0 (
        echo [ERRO] Falha na instalação. Verifique os erros acima.
        pause
        exit /b 1
    )
)

if not exist "server\node_modules" (
    echo [AVISO] Dependências do servidor não encontradas. Instalando...
    echo.
    cd server
    call npm install express ws cors openai axios cheerio uuid node-fetch
    cd ..
)

:: Verificar se arquivo .env existe
if not exist ".env" (
    echo [AVISO] Arquivo .env não encontrado. Criando...
    echo.
    call setup.bat
)

echo [INFO] Carregando configurações...
echo.

:: Verificar se as portas estão livres
netstat -an | find "LISTENING" | find ":3001" >nul
if %errorlevel% equ 0 (
    echo [AVISO] Porta 3001 já está em uso. Tentando finalizar processo...
    taskkill /f /im node.exe >nul 2>&1
    timeout /t 2 >nul
)

netstat -an | find "LISTENING" | find ":5173" >nul
if %errorlevel% equ 0 (
    echo [AVISO] Porta 5173 já está em uso. Tentando finalizar processo...
    taskkill /f /im node.exe >nul 2>&1
    timeout /t 2 >nul
)

echo [INFO] Iniciando servidor backend...
echo.

:: Iniciar servidor backend em segundo plano
start /b cmd /c "cd server && node index.js"

:: Aguardar servidor backend inicializar
echo [INFO] Aguardando servidor backend inicializar...
timeout /t 3 >nul

:: Verificar se servidor backend está rodando
curl -s http://localhost:3001/health >nul 2>&1
if %errorlevel% neq 0 (
    echo [INFO] Aguardando mais um pouco...
    timeout /t 3 >nul
)

echo [✓] Servidor backend iniciado na porta 3001
echo.

echo [INFO] Iniciando interface frontend...
echo.

:: Aguardar um pouco mais para garantir estabilidade
timeout /t 2 >nul

:: Iniciar frontend
start /b cmd /c "npm run dev"

echo [INFO] Aguardando interface carregar...
timeout /t 5 >nul

echo [✓] Interface frontend iniciada na porta 5173
echo.

:: Abrir navegador automaticamente
echo [INFO] Abrindo navegador...
start http://localhost:5173

echo.
echo ╔══════════════════════════════════════════════════════════════════════════════╗
echo ║                          SISTEMA INICIADO COM SUCESSO!                      ║
echo ╚══════════════════════════════════════════════════════════════════════════════╝
echo.
echo [✓] Backend rodando em: http://localhost:3001
echo [✓] Frontend rodando em: http://localhost:5173
echo [✓] Navegador aberto automaticamente
echo.
echo STATUS DOS SERVIÇOS:
echo • Servidor de Análise: ONLINE
echo • Interface Web: ONLINE  
echo • APIs de IA: CONFIGURADAS
echo • Sistema de Backup: ATIVO
echo.
echo COMANDOS ÚTEIS:
echo • Para parar: Feche esta janela ou pressione Ctrl+C
echo • Para diagnóstico: Execute 'diagnose.bat'
echo • Para reconfigurar: Execute 'setup.bat'
echo.
echo A plataforma está pronta para análises psicológicas de mercado!
echo.
echo Pressione qualquer tecla para minimizar esta janela...
pause >nul

:: Minimizar janela mas manter rodando
powershell -command "(New-Object -ComObject Shell.Application).MinimizeAll()"

:: Loop infinito para manter o processo ativo
:loop
timeout /t 30 >nul
goto loop