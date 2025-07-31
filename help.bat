@echo off
chcp 65001 >nul
title Plataforma de Análise Psicológica - Sistema de Ajuda
color 0F

echo.
echo ╔══════════════════════════════════════════════════════════════════════════════╗
echo ║                    PLATAFORMA DE ANÁLISE PSICOLÓGICA                         ║
echo ║                            Sistema de Ajuda Interativo                      ║
echo ╚══════════════════════════════════════════════════════════════════════════════╝
echo.

:menu
echo COMANDOS DISPONÍVEIS:
echo.
echo ╔═══════════════════════════════════════════════════════════════════════════════
echo ║ 1. setup.bat      - Instalação completa e configuração inicial
echo ║ 2. run.bat         - Executar aplicação (backend + frontend)
echo ║ 3. start.bat       - Inicialização inteligente (detecta se precisa instalar)
echo ║ 4. diagnose.bat    - Diagnóstico completo do sistema (12 verificações)
echo ║ 5. test_apis.bat   - Teste específico de conectividade com APIs
echo ║ 6. help.bat        - Este menu de ajuda
echo ╚═══════════════════════════════════════════════════════════════════════════════
echo.

echo FLUXO RECOMENDADO PARA NOVOS USUÁRIOS:
echo.
echo 🚀 PRIMEIRA VEZ:
echo    1. Execute: start.bat (faz tudo automaticamente)
echo    2. Aguarde o navegador abrir em http://localhost:5173
echo    3. Comece a usar a plataforma!
echo.
echo 🔧 SE HOUVER PROBLEMAS:
echo    1. Execute: diagnose.bat (identifica problemas)
echo    2. Execute: setup.bat (tenta corrigir automaticamente)
echo    3. Execute: test_apis.bat (verifica APIs específicas)
echo.
echo 📋 USO DIÁRIO:
echo    • Execute: run.bat (inicia tudo rapidamente)
echo    • Ou: start.bat (mais seguro, verifica antes de executar)
echo.

echo INFORMAÇÕES IMPORTANTES:
echo.
echo 📍 URLs DA APLICAÇÃO:
echo    • Interface Principal: http://localhost:5173
echo    • API Backend: http://localhost:3001
echo    • Health Check: http://localhost:3001/health
echo.
echo 📁 ARQUIVOS DE CONFIGURAÇÃO:
echo    • .env - Chaves de API e configurações
echo    • package.json - Dependências do frontend
echo    • server/package.json - Dependências do backend
echo.
echo 🔑 CHAVES DE API NECESSÁRIAS:
echo    • OPENAI_API_KEY (obrigatória para análises avançadas)
echo    • GEMINI_API_KEY (backup automático)
echo    • Outras chaves são opcionais (sistema tem backups gratuitos)
echo.
echo 🛡️ SISTEMA DE BACKUP:
echo    • Se OpenAI falhar → Usa Gemini automaticamente
echo    • Se Gemini falhar → Usa Groq (gratuito)
echo    • Se APIs pagas falharem → Usa HuggingFace local
echo    • Busca: Google → DuckDuckGo → SerpAPI gratuito
echo.

echo ═══════════════════════════════════════════════════════════════════════════════
echo.
echo O que você gostaria de fazer?
echo.
echo [1] Executar diagnóstico completo
echo [2] Testar conectividade das APIs
echo [3] Iniciar aplicação agora
echo [4] Reinstalar/reconfigurar tudo
echo [5] Ver informações técnicas detalhadas
echo [6] Sair
echo.
set /p choice="Digite sua escolha (1-6): "

if "%choice%"=="1" (
    echo.
    echo Executando diagnóstico completo...
    call diagnose.bat
    goto menu
)

if "%choice%"=="2" (
    echo.
    echo Testando APIs...
    call test_apis.bat
    goto menu
)

if "%choice%"=="3" (
    echo.
    echo Iniciando aplicação...
    call start.bat
    exit /b 0
)

if "%choice%"=="4" (
    echo.
    echo Reinstalando sistema...
    call setup.bat
    goto menu
)

if "%choice%"=="5" (
    goto technical_info
)

if "%choice%"=="6" (
    exit /b 0
)

echo Opção inválida. Tente novamente.
echo.
goto menu

:technical_info
cls
echo.
echo ╔══════════════════════════════════════════════════════════════════════════════╗
echo ║                         INFORMAÇÕES TÉCNICAS DETALHADAS                     ║
echo ╚══════════════════════════════════════════════════════════════════════════════╝
echo.

echo ARQUITETURA DO SISTEMA:
echo.
echo 🏗️ BACKEND (Node.js + Express):
echo    • Servidor principal: server/index.js
echo    • WebSocket para tempo real: ws://localhost:3001
echo    • APIs integradas: OpenAI, Gemini, HuggingFace, Groq
echo    • Sistema de busca: Google, DuckDuckGo, SerpAPI
echo    • Processamento: 19 Drivers Mentais + Anti-Objeção + PROVI
echo.
echo 🎨 FRONTEND (React + TypeScript + Vite):
echo    • Interface moderna: http://localhost:5173
echo    • Componentes: Dashboard, Análise, Relatórios, Drivers
echo    • Tempo real: Socket.IO client
echo    • Styling: Tailwind CSS + Design neumórfico
echo.
echo 🧠 FUNCIONALIDADES ESPECIALIZADAS:
echo    • 19 Drivers Mentais Universais (gatilhos psicológicos)
echo    • Engenharia Anti-Objeção (antecipa resistências)
echo    • Sistema PROVI (provas visuais instantâneas)
echo    • Dashboard do Avatar (análise psicográfica)
echo    • Relatórios 25.000+ caracteres
echo.
echo 🔄 SISTEMA DE BACKUP AUTOMÁTICO:
echo    • Tier 1: OpenAI GPT-4 (pago, melhor qualidade)
echo    • Tier 2: Google Gemini (pago, boa qualidade)
echo    • Tier 3: Groq Llama3 (gratuito, 10k req/dia)
echo    • Tier 4: HuggingFace local (gratuito, offline)
echo.
echo 📊 GARANTIAS DE QUALIDADE:
echo    • Relatórios mínimo 25.000 caracteres
echo    • Score de qualidade 85%+ obrigatório
echo    • Validação anti-conteúdo simulado
echo    • Reprocessamento automático se falhar
echo.
echo 🔧 REQUISITOS TÉCNICOS:
echo    • Node.js 18+ (JavaScript runtime)
echo    • NPM (gerenciador de pacotes)
echo    • Conexão internet (para APIs)
echo    • Navegador moderno (Chrome, Firefox, Edge)
echo    • Windows 10+ (para arquivos .bat)
echo.
echo 📁 ESTRUTURA DE ARQUIVOS:
echo    projeto/
echo    ├── src/                 (código React)
echo    ├── server/              (código Node.js)
echo    ├── *.bat               (scripts Windows)
echo    ├── .env                (configurações)
echo    └── package.json        (dependências)
echo.
echo Pressione qualquer tecla para voltar ao menu...
pause >nul
cls
goto menu