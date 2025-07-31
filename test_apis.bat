@echo off
chcp 65001 >nul
title Plataforma de Análise Psicológica - Teste de APIs
color 0D

echo.
echo ╔══════════════════════════════════════════════════════════════════════════════╗
echo ║                    PLATAFORMA DE ANÁLISE PSICOLÓGICA                         ║
echo ║                           Teste de Conectividade APIs                       ║
echo ╚══════════════════════════════════════════════════════════════════════════════╝
echo.

if not exist ".env" (
    echo [ERRO] Arquivo .env não encontrado!
    echo.
    echo Execute 'setup.bat' primeiro para criar o arquivo de configuração.
    echo.
    pause
    exit /b 1
)

echo [INFO] Testando conectividade com APIs de IA...
echo.

:: Carregar variáveis do .env (simulação básica)
for /f "usebackq tokens=1,2 delims==" %%a in (".env") do (
    if "%%a"=="OPENAI_API_KEY" set OPENAI_KEY=%%b
    if "%%a"=="GEMINI_API_KEY" set GEMINI_KEY=%%b
)

echo ═══════════════════════════════════════════════════════════════════════════════
echo TESTE 1: OpenAI API
echo ═══════════════════════════════════════════════════════════════════════════════

if "%OPENAI_KEY%"=="" (
    echo [✗] Chave OpenAI não configurada no .env
    echo     SOLUÇÃO: Adicione OPENAI_API_KEY=sua_chave no arquivo .env
) else (
    echo [✓] Chave OpenAI encontrada: %OPENAI_KEY:~0,20%...
    
    :: Teste básico de conectividade
    curl -s --connect-timeout 10 -H "Authorization: Bearer %OPENAI_KEY%" https://api.openai.com/v1/models >nul 2>&1
    if %errorlevel% equ 0 (
        echo [✓] Conectividade: OK
        echo [✓] Autenticação: VÁLIDA
    ) else (
        echo [⚠] Conectividade: FALHOU
        echo     POSSÍVEIS CAUSAS:
        echo     • Chave inválida ou expirada
        echo     • Firewall/proxy bloqueando
        echo     • Sem créditos na conta OpenAI
        echo     • Problema temporário da API
    )
)
echo.

echo ═══════════════════════════════════════════════════════════════════════════════
echo TESTE 2: Google Gemini API
echo ═══════════════════════════════════════════════════════════════════════════════

if "%GEMINI_KEY%"=="" (
    echo [✗] Chave Gemini não configurada no .env
    echo     SOLUÇÃO: Adicione GEMINI_API_KEY=sua_chave no arquivo .env
) else (
    echo [✓] Chave Gemini encontrada: %GEMINI_KEY:~0,20%...
    
    :: Teste básico de conectividade
    curl -s --connect-timeout 10 "https://generativelanguage.googleapis.com/v1/models?key=%GEMINI_KEY%" >nul 2>&1
    if %errorlevel% equ 0 (
        echo [✓] Conectividade: OK
        echo [✓] Autenticação: VÁLIDA
    ) else (
        echo [⚠] Conectividade: FALHOU
        echo     POSSÍVEIS CAUSAS:
        echo     • Chave inválida ou expirada
        echo     • Firewall/proxy bloqueando
        echo     • API não habilitada no Google Cloud
        echo     • Problema temporário da API
    )
)
echo.

echo ═══════════════════════════════════════════════════════════════════════════════
echo TESTE 3: Conectividade Geral Internet
echo ═══════════════════════════════════════════════════════════════════════════════

ping -n 1 8.8.8.8 >nul 2>&1
if %errorlevel% equ 0 (
    echo [✓] Conectividade básica: OK
) else (
    echo [✗] Sem conectividade básica com internet
)

curl -s --connect-timeout 5 https://httpbin.org/ip >nul 2>&1
if %errorlevel% equ 0 (
    echo [✓] HTTPS/SSL: OK
) else (
    echo [⚠] Problemas com HTTPS/SSL
)

echo.
echo ═══════════════════════════════════════════════════════════════════════════════
echo RESUMO E RECOMENDAÇÕES
echo ═══════════════════════════════════════════════════════════════════════════════

echo.
echo COMO OBTER CHAVES DE API:
echo.
echo 1. OpenAI (GPT-4):
echo    • Acesse: https://platform.openai.com/api-keys
echo    • Crie uma conta e adicione créditos
echo    • Gere uma nova chave API
echo    • Cole no arquivo .env como: OPENAI_API_KEY=sua_chave
echo.
echo 2. Google Gemini:
echo    • Acesse: https://makersuite.google.com/app/apikey
echo    • Faça login com conta Google
echo    • Crie uma nova chave API
echo    • Cole no arquivo .env como: GEMINI_API_KEY=sua_chave
echo.
echo SISTEMA DE BACKUP:
echo • Se uma API falhar, o sistema automaticamente usa backups
echo • Groq (gratuito): 10.000 requests/dia
echo • HuggingFace (gratuito): Processamento local
echo • DuckDuckGo (gratuito): Busca alternativa
echo.
echo PRÓXIMOS PASSOS:
if "%OPENAI_KEY%"=="" (
    echo 1. Configure pelo menos uma chave de API no arquivo .env
)
if "%GEMINI_KEY%"=="" (
    echo 2. Configure pelo menos uma chave de API no arquivo .env
)
echo 3. Execute 'run.bat' para iniciar a aplicação
echo 4. O sistema funcionará mesmo com apenas uma API configurada
echo.
pause