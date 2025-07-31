# Plataforma de Análise Psicológica de Mercado

Sistema avançado de inteligência de mercado com 19 drivers mentais universais, engenharia anti-objeção e sistema PROVI.

## 🚀 Funcionalidades

- **19 Drivers Mentais Universais**: Gatilhos psicológicos cientificamente validados
- **Engenharia Anti-Objeção**: Mapeamento completo de resistências e neutralizadores
- **Sistema PROVI**: Provas visuais instantâneas para demonstrações
- **Dashboard do Avatar**: Análise psicográfica detalhada
- **Relatórios Completos**: Documentos de 25.000+ caracteres
- **Sistema Multi-IA**: OpenAI, Gemini, Groq e HuggingFace com backup automático
- **Banco de Dados Supabase**: Armazenamento seguro e escalável

## 🛠️ Tecnologias

### Frontend
- React 18 + TypeScript
- Tailwind CSS
- Vite
- Lucide React (ícones)
- Supabase Auth UI

### Backend
- Node.js + Express
- WebSocket (ws)
- Supabase (PostgreSQL)
- OpenAI API
- Google Gemini API
- Groq API
- HuggingFace API

### Banco de Dados
- Supabase (PostgreSQL)
- Row Level Security (RLS)
- Triggers e Functions
- Índices otimizados

## 📋 Pré-requisitos

- Node.js 18+
- NPM ou Yarn
- Conta Supabase
- Chaves de API (OpenAI, Gemini, etc.)

## 🔧 Instalação

### 1. Clone o repositório
```bash
git clone <repository-url>
cd psychological-market-analysis
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o Supabase

1. Crie um projeto no [Supabase](https://supabase.com)
2. Execute a migration SQL:
   ```sql
   -- Cole o conteúdo de supabase/migrations/create_psychological_analysis_schema.sql
   ```
3. Configure as variáveis de ambiente

### 4. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:
```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# APIs de IA
OPENAI_API_KEY=your-openai-key
GEMINI_API_KEY=your-gemini-key
GROQ_API_KEY=your-groq-key
```

### 5. Execute o projeto
```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm run preview
```

## 🗄️ Estrutura do Banco de Dados

### Tabelas Principais

- **users**: Perfis de usuários
- **analyses**: Análises psicológicas
- **mental_drivers**: Drivers mentais identificados
- **objections**: Objeções mapeadas
- **provi_systems**: Sistemas PROVI criados
- **reports**: Relatórios gerados
- **api_usage**: Controle de uso das APIs

### Segurança

- Row Level Security (RLS) habilitado
- Políticas de acesso por usuário
- Autenticação via Supabase Auth
- Criptografia de dados sensíveis

## 🔐 Autenticação

O sistema usa Supabase Auth com:
- Email/senha
- Confirmação por email
- Reset de senha
- Sessões seguras
- Políticas RLS automáticas

## 📊 APIs Integradas

### Inteligência Artificial
- **OpenAI GPT-4**: Análise principal
- **Google Gemini**: Backup primário
- **Groq Llama3**: Backup gratuito
- **HuggingFace**: Processamento local

### Sistema de Fallback
1. OpenAI (pago, melhor qualidade)
2. Gemini (pago, boa qualidade)
3. Groq (gratuito, 10k req/dia)
4. HuggingFace (gratuito, offline)

## 🎯 Como Usar

### 1. Criar Conta
- Acesse a aplicação
- Cadastre-se com email/senha
- Confirme o email

### 2. Nova Análise
- Clique em "Nova Análise"
- Preencha produto e público-alvo
- Escolha o tipo de análise
- Aguarde o processamento

### 3. Visualizar Resultados
- Dashboard com estatísticas
- Relatórios detalhados
- Drivers mentais identificados
- Sistemas PROVI gerados

## 📈 Monitoramento

### Métricas Disponíveis
- Total de análises
- Qualidade média dos relatórios
- Taxa de sucesso
- Tempo médio de processamento
- Uso das APIs
- Status dos serviços

### Logs e Auditoria
- Registro de todas as operações
- Controle de uso das APIs
- Métricas de performance
- Alertas de erro

## 🔧 Desenvolvimento

### Estrutura do Projeto
```
src/
├── components/          # Componentes React
├── lib/                # Utilitários e configurações
├── types/              # Tipos TypeScript
└── styles/             # Estilos CSS

server/
├── index.js            # Servidor Express
├── services/           # Serviços de IA
└── utils/              # Utilitários do servidor

supabase/
└── migrations/         # Migrações do banco
```

### Scripts Disponíveis
```bash
npm run dev          # Desenvolvimento
npm run build        # Build de produção
npm run preview      # Preview da build
npm run lint         # Linting
npm run server       # Apenas servidor
```

## 🚀 Deploy

### Frontend (Vercel/Netlify)
1. Build do projeto: `npm run build`
2. Deploy da pasta `dist`
3. Configure as variáveis de ambiente

### Backend (Railway/Heroku)
1. Configure as variáveis de ambiente
2. Deploy do servidor Node.js
3. Configure o WebSocket

### Banco de Dados
- Supabase gerencia automaticamente
- Backups automáticos
- Escalabilidade automática

## 🔒 Segurança

### Medidas Implementadas
- Row Level Security (RLS)
- Autenticação JWT
- Validação de entrada
- Rate limiting
- Logs de auditoria
- Criptografia de dados

### Boas Práticas
- Chaves de API em variáveis de ambiente
- Validação no frontend e backend
- Sanitização de dados
- Controle de acesso granular

## 📞 Suporte

Para suporte técnico:
1. Verifique a documentação
2. Consulte os logs de erro
3. Execute o diagnóstico: `npm run diagnose`
4. Abra uma issue no repositório

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para detalhes.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

---

**Plataforma de Análise Psicológica de Mercado** - Sistema Avançado de Inteligência com IA