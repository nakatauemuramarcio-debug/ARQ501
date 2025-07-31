@echo off
chcp 65001 >nul
title Plataforma de Análise Psicológica - Inicialização Inteligente
color 0E

echo.
echo ╔══════════════════════════════════════════════════════════════════════════════╗
echo ║                    PLATAFORMA DE ANÁLISE PSICOLÓGICA                         ║
echo ║                        Inicialização Inteligente                            ║
echo ╚══════════════════════════════════════════════════════════════════════════════╝
echo.

echo [INFO] Verificando status do sistema...
echo.

:: Verificar se é primeira execução
if not exist "node_modules" (
    echo [DETECTADO] Primeira execução - Iniciando instalação completa...
    echo.
    call setup.bat
    if %errorlevel% neq 0 (
        echo [ERRO] Falha na instalação inicial.
        pause
        exit /b 1
    )
    echo.
    echo [INFO] Instalação concluída. Iniciando aplicação...
    echo.
)

if not exist "server\node_modules" (
    echo [DETECTADO] Dependências do servidor ausentes - Instalando...
    echo.
    cd server
    call npm install express ws cors openai axios cheerio uuid node-fetch
    cd ..
)

if not exist ".env" (
    echo [DETECTADO] Configuração ausente - Criando arquivo .env...
    echo.
    call setup.bat
)

:: Sistema já configurado, executar diretamente
echo [✓] Sistema configurado. Iniciando aplicação...
echo.

call run.bat