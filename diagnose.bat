@echo off
chcp 65001 >nul
title Plataforma de Análise Psicológica - Diagnóstico do Sistema
color 0C

echo.
echo ╔══════════════════════════════════════════════════════════════════════════════╗
echo ║                    PLATAFORMA DE ANÁLISE PSICOLÓGICA                         ║
echo ║                         Diagnóstico Completo do Sistema                     ║
echo ╚══════════════════════════════════════════════════════════════════════════════╝
echo.

set ERROR_COUNT=0
set WARNING_COUNT=0

echo [INFO] Iniciando diagnóstico de 12 componentes críticos...
echo.

:: 1. Verificar Sistema Operacional
echo ═══════════════════════════════════════════════════════════════════════════════
echo [1/12] SISTEMA OPERACIONAL
echo ═══════════════════════════════════════════════════════════════════════════════
ver
if %errorlevel% equ 0 (
    echo [✓] Sistema operacional: OK
) else (
    echo [✗] Problema no sistema operacional
    set /a ERROR_COUNT+=1
)
echo.

:: 2. Verificar Python
echo ═══════════════════════════════════════════════════════════════════════════════
echo [2/12] PYTHON
echo ═══════════════════════════════════════════════════════════════════════════════
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [✓] Python instalado:
    python --version
) else (
    echo [✗] Python NÃO encontrado
    echo     SOLUÇÃO: Instale Python 3.11+ em https://python.org/downloads
    set /a ERROR_COUNT+=1
)
echo.

:: 3. Verificar Node.js
echo ═══════════════════════════════════════════════════════════════════════════════
echo [3/12] NODE.JS
echo ═══════════════════════════════════════════════════════════════════════════════
node --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [✓] Node.js instalado:
    node --version
) else (
    echo [✗] Node.js NÃO encontrado
    echo     SOLUÇÃO: Instale Node.js em https://nodejs.org
    set /a ERROR_COUNT+=1
)
echo.

:: 4. Verificar NPM
echo ═══════════════════════════════════════════════════════════════════════════════
echo [4/12] NPM
echo ═══════════════════════════════════════════════════════════════════════════════
npm --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [✓] NPM instalado:
    npm --version
) else (
    echo [✗] NPM NÃO encontrado
    echo     SOLUÇÃO: Reinstale Node.js (NPM vem incluído)
    set /a ERROR_COUNT+=1
)
echo.

:: 5. Verificar Dependências Frontend
echo ═══════════════════════════════════════════════════════════════════════════════
echo [5/12] DEPENDÊNCIAS FRONTEND
echo ═══════════════════════════════════════════════════════════════════════════════
if exist "node_modules" (
    echo [✓] Dependências do frontend: INSTALADAS
) else (
    echo [⚠] Dependências do frontend: NÃO INSTALADAS
    echo     SOLUÇÃO: Execute 'setup.bat' ou 'npm install'
    set /a WARNING_COUNT+=1
)
echo.

:: 6. Verificar Dependências Backend
echo ═══════════════════════════════════════════════════════════════════════════════
echo [6/12] DEPENDÊNCIAS BACKEND
echo ═══════════════════════════════════════════════════════════════════════════════
if exist "server\node_modules" (
    echo [✓] Dependências do backend: INSTALADAS
) else (
    echo [⚠] Dependências do backend: NÃO INSTALADAS
    echo     SOLUÇÃO: Execute 'setup.bat'
    set /a WARNING_COUNT+=1
)
echo.

:: 7. Verificar Arquivos Essenciais
echo ═══════════════════════════════════════════════════════════════════════════════
echo [7/12] ARQUIVOS ESSENCIAIS
echo ═══════════════════════════════════════════════════════════════════════════════
set MISSING_FILES=0
if not exist "package.json" (
    echo [✗] package.json: AUSENTE
    set /a MISSING_FILES+=1
)
if not exist "server\index.js" (
    echo [✗] server\index.js: AUSENTE
    set /a MISSING_FILES+=1
)
if not exist "src\App.tsx" (
    echo [✗] src\App.tsx: AUSENTE
    set /a MISSING_FILES+=1
)
if not exist "index.html" (
    echo [✗] index.html: AUSENTE
    set /a MISSING_FILES+=1
)

if %MISSING_FILES% equ 0 (
    echo [✓] Todos os arquivos essenciais: PRESENTES
) else (
    echo [✗] %MISSING_FILES% arquivo(s) essencial(is) ausente(s)
    echo     SOLUÇÃO: Redownload do projeto completo
    set /a ERROR_COUNT+=1
)
echo.

:: 8. Verificar Configuração (.env)
echo ═══════════════════════════════════════════════════════════════════════════════
echo [8/12] CONFIGURAÇÃO (.env)
echo ═══════════════════════════════════════════════════════════════════════════════
if exist ".env" (
    echo [✓] Arquivo .env: PRESENTE
    findstr /C:"OPENAI_API_KEY" .env >nul
    if %errorlevel% equ 0 (
        echo [✓] Chave OpenAI: CONFIGURADA
    ) else (
        echo [⚠] Chave OpenAI: NÃO CONFIGURADA
        set /a WARNING_COUNT+=1
    )
    findstr /C:"GEMINI_API_KEY" .env >nul
    if %errorlevel% equ 0 (
        echo [✓] Chave Gemini: CONFIGURADA
    ) else (
        echo [⚠] Chave Gemini: NÃO CONFIGURADA
        set /a WARNING_COUNT+=1
    )
) else (
    echo [✗] Arquivo .env: AUSENTE
    echo     SOLUÇÃO: Execute 'setup.bat' para criar
    set /a ERROR_COUNT+=1
)
echo.

:: 9. Verificar Conectividade Internet
echo ═══════════════════════════════════════════════════════════════════════════════
echo [9/12] CONECTIVIDADE INTERNET
echo ═══════════════════════════════════════════════════════════════════════════════
ping -n 1 google.com >nul 2>&1
if %errorlevel% equ 0 (
    echo [✓] Conexão com internet: OK
) else (
    echo [✗] Sem conexão com internet
    echo     SOLUÇÃO: Verifique sua conexão de rede
    set /a ERROR_COUNT+=1
)
echo.

:: 10. Verificar Portas Disponíveis
echo ═══════════════════════════════════════════════════════════════════════════════
echo [10/12] PORTAS DE REDE
echo ═══════════════════════════════════════════════════════════════════════════════
netstat -an | find "LISTENING" | find ":3001" >nul
if %errorlevel% equ 0 (
    echo [⚠] Porta 3001: EM USO (backend pode estar rodando)
    set /a WARNING_COUNT+=1
) else (
    echo [✓] Porta 3001: DISPONÍVEL
)

netstat -an | find "LISTENING" | find ":5173" >nul
if %errorlevel% equ 0 (
    echo [⚠] Porta 5173: EM USO (frontend pode estar rodando)
    set /a WARNING_COUNT+=1
) else (
    echo [✓] Porta 5173: DISPONÍVEL
)
echo.

:: 11. Verificar Sintaxe dos Arquivos
echo ═══════════════════════════════════════════════════════════════════════════════
echo [11/12] SINTAXE DOS ARQUIVOS
echo ═══════════════════════════════════════════════════════════════════════════════
if exist "server\index.js" (
    node -c server\index.js >nul 2>&1
    if %errorlevel% equ 0 (
        echo [✓] server\index.js: SINTAXE OK
    ) else (
        echo [✗] server\index.js: ERRO DE SINTAXE
        set /a ERROR_COUNT+=1
    )
) else (
    echo [✗] server\index.js: ARQUIVO AUSENTE
    set /a ERROR_COUNT+=1
)
echo.

:: 12. Teste de Conectividade com APIs
echo ═══════════════════════════════════════════════════════════════════════════════
echo [12/12] CONECTIVIDADE COM APIs
echo ═══════════════════════════════════════════════════════════════════════════════
curl -s --connect-timeout 5 https://api.openai.com >nul 2>&1
if %errorlevel% equ 0 (
    echo [✓] OpenAI API: ACESSÍVEL
) else (
    echo [⚠] OpenAI API: INACESSÍVEL (pode ser firewall/proxy)
    set /a WARNING_COUNT+=1
)

curl -s --connect-timeout 5 https://generativelanguage.googleapis.com >nul 2>&1
if %errorlevel% equ 0 (
    echo [✓] Gemini API: ACESSÍVEL
) else (
    echo [⚠] Gemini API: INACESSÍVEL (pode ser firewall/proxy)
    set /a WARNING_COUNT+=1
)
echo.

:: Relatório Final
echo ╔══════════════════════════════════════════════════════════════════════════════╗
echo ║                            RELATÓRIO FINAL                                  ║
echo ╚══════════════════════════════════════════════════════════════════════════════╝
echo.
echo RESUMO DO DIAGNÓSTICO:
echo • Componentes verificados: 12
echo • Erros críticos: %ERROR_COUNT%
echo • Avisos: %WARNING_COUNT%
echo.

if %ERROR_COUNT% equ 0 (
    if %WARNING_COUNT% equ 0 (
        echo [✓] STATUS: SISTEMA PERFEITO - Pronto para uso!
        echo.
        echo PRÓXIMO PASSO: Execute 'run.bat' para iniciar
    ) else (
        echo [⚠] STATUS: SISTEMA FUNCIONAL - Alguns avisos encontrados
        echo.
        echo O sistema deve funcionar, mas recomenda-se resolver os avisos.
        echo PRÓXIMO PASSO: Execute 'run.bat' para iniciar
    )
) else (
    echo [✗] STATUS: SISTEMA COM PROBLEMAS - Correções necessárias
    echo.
    echo Resolva os erros críticos antes de tentar executar.
    echo PRÓXIMO PASSO: Execute 'setup.bat' para tentar corrigir automaticamente
)

echo.
echo COMANDOS DISPONÍVEIS:
echo • setup.bat    - Instalação/correção automática
echo • run.bat      - Executar aplicação
echo • start.bat    - Inicialização inteligente
echo • diagnose.bat - Este diagnóstico
echo.

:: Salvar log do diagnóstico
echo [INFO] Salvando log do diagnóstico...
(
    echo DIAGNÓSTICO DA PLATAFORMA DE ANÁLISE PSICOLÓGICA
    echo Data/Hora: %date% %time%
    echo.
    echo ERROS CRÍTICOS: %ERROR_COUNT%
    echo AVISOS: %WARNING_COUNT%
    echo.
    echo STATUS: 
    if %ERROR_COUNT% equ 0 (
        if %WARNING_COUNT% equ 0 (
            echo SISTEMA PERFEITO
        ) else (
            echo SISTEMA FUNCIONAL COM AVISOS
        )
    ) else (
        echo SISTEMA COM PROBLEMAS CRÍTICOS
    )
) > diagnostico_%date:~-4%%date:~3,2%%date:~0,2%_%time:~0,2%%time:~3,2%.log

echo [✓] Log salvo como: diagnostico_%date:~-4%%date:~3,2%%date:~0,2%_%time:~0,2%%time:~3,2%.log
echo.
pause