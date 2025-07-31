@echo off
chcp 65001 >nul
title Plataforma de Análise Psicológica - Instalação Automática
color 0A

echo.
echo ╔══════════════════════════════════════════════════════════════════════════════╗
echo ║                    PLATAFORMA DE ANÁLISE PSICOLÓGICA                         ║
echo ║                         Sistema de Instalação Automática                    ║
echo ╚══════════════════════════════════════════════════════════════════════════════╝
echo.

echo [INFO] Verificando sistema...
echo.

:: Verificar se Python está instalado
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] Python não encontrado!
    echo.
    echo Por favor, instale o Python 3.11+ em: https://python.org/downloads
    echo Certifique-se de marcar "Add Python to PATH" durante a instalação.
    echo.
    pause
    exit /b 1
)

echo [✓] Python encontrado
python --version

:: Verificar se Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] Node.js não encontrado!
    echo.
    echo Por favor, instale o Node.js em: https://nodejs.org
    echo.
    pause
    exit /b 1
)

echo [✓] Node.js encontrado
node --version

:: Verificar se npm está instalado
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] NPM não encontrado!
    echo.
    echo NPM deveria vir com Node.js. Reinstale o Node.js.
    echo.
    pause
    exit /b 1
)

echo [✓] NPM encontrado
npm --version
echo.

echo [INFO] Instalando dependências do frontend...
echo.

:: Instalar dependências do frontend
call npm install
if %errorlevel% neq 0 (
    echo [ERRO] Falha ao instalar dependências do frontend!
    echo.
    pause
    exit /b 1
)

echo.
echo [✓] Dependências do frontend instaladas com sucesso!
echo.

echo [INFO] Instalando dependências do backend...
echo.

:: Navegar para pasta do servidor e instalar dependências
cd server
call npm init -y >nul 2>&1
call npm install express ws cors openai axios cheerio uuid node-fetch
if %errorlevel% neq 0 (
    echo [ERRO] Falha ao instalar dependências do backend!
    echo.
    cd ..
    pause
    exit /b 1
)

cd ..
echo [✓] Dependências do backend instaladas com sucesso!
echo.

:: Criar arquivo .env se não existir
if not exist ".env" (
    echo [INFO] Criando arquivo de configuração .env...
    echo.
    (
        echo # Chaves de API de Inteligência Artificial
        echo GEMINI_API_KEY=AIzaSyBQ7K-wDIURnZFUNBaKQXYHTto7LSI3jF4
        echo OPENAI_API_KEY=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
        echo HUGGINGFACE_API_KEY=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
        echo.
        echo # Chaves de API dos Serviços de Busca
        echo GOOGLE_SEARCH_KEY=AIzaSyDwIFvCvailaG6B7xtysujm0djJn1zlx18
        echo GOOGLE_CSE_ID=c207a51dd04f9488a
        echo SERPER_API_KEY=e9b24d4c32b1ac9aee129cd78abdef1e37db12d5
        echo JINA_API_KEY=jina_d080053353b847259addd96fea8f35c7sEg1KIqZSlQ5-zk5AA_0eZPEWhNW
        echo SCRAPINGANT_API_KEY=eeead289a2cd45cda43c45d012265fce
        echo SECRET_KEY=DGD851F8DGhgfhgf_fdsfewn543534_arqv30_enhanced_2024
        echo GROQ_API_KEY=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
        echo.
        echo # Configurações do Servidor
        echo PORT=3001
        echo NODE_ENV=development
    ) > .env
    echo [✓] Arquivo .env criado com chaves de API pré-configuradas
) else (
    echo [✓] Arquivo .env já existe
)

echo.
echo ╔══════════════════════════════════════════════════════════════════════════════╗
echo ║                            INSTALAÇÃO CONCLUÍDA!                            ║
echo ╚══════════════════════════════════════════════════════════════════════════════╝
echo.
echo [✓] Todas as dependências foram instaladas com sucesso
echo [✓] Arquivo de configuração .env criado
echo [✓] Sistema pronto para uso
echo.
echo PRÓXIMOS PASSOS:
echo 1. Execute 'run.bat' para iniciar a aplicação
echo 2. O navegador abrirá automaticamente em http://localhost:5173
echo 3. O servidor backend estará rodando em http://localhost:3001
echo.
echo IMPORTANTE:
echo - As chaves de API já estão pré-configuradas no arquivo .env
echo - Se precisar alterar alguma configuração, edite o arquivo .env
echo - Para diagnósticos, execute 'diagnose.bat'
echo.
pause