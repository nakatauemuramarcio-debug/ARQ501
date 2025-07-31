/*
  # Schema completo para Plataforma de Análise Psicológica

  1. Novas Tabelas
    - `users` - Usuários do sistema
    - `analyses` - Análises psicológicas realizadas
    - `mental_drivers` - Drivers mentais identificados
    - `objections` - Objeções mapeadas
    - `provi_systems` - Sistemas PROVI criados
    - `reports` - Relatórios gerados
    - `api_usage` - Controle de uso das APIs

  2. Segurança
    - RLS habilitado em todas as tabelas
    - Políticas para usuários autenticados
    - Controle de acesso por usuário
*/

-- Extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de usuários (complementa auth.users)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  company text,
  role text DEFAULT 'user',
  subscription_tier text DEFAULT 'free',
  api_credits integer DEFAULT 100,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabela de análises
CREATE TABLE IF NOT EXISTS analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  product_name text NOT NULL,
  target_audience text NOT NULL,
  competitors text,
  additional_details text,
  analysis_type text DEFAULT 'complete',
  priority text DEFAULT 'normal',
  status text DEFAULT 'pending',
  progress integer DEFAULT 0,
  current_phase text DEFAULT 'initialization',
  quality_score integer DEFAULT 0,
  word_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  updated_at timestamptz DEFAULT now()
);

-- Tabela de drivers mentais identificados
CREATE TABLE IF NOT EXISTS mental_drivers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id uuid REFERENCES analyses(id) ON DELETE CASCADE NOT NULL,
  driver_name text NOT NULL,
  driver_category text NOT NULL,
  trigger_phrase text NOT NULL,
  activation_phrase text NOT NULL,
  effectiveness_score integer DEFAULT 0,
  implementation_notes text,
  examples jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

-- Tabela de objeções mapeadas
CREATE TABLE IF NOT EXISTS objections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id uuid REFERENCES analyses(id) ON DELETE CASCADE NOT NULL,
  objection_type text NOT NULL,
  objection_content text NOT NULL,
  frequency_percentage integer DEFAULT 0,
  is_hidden boolean DEFAULT false,
  neutralization_strategy text,
  created_at timestamptz DEFAULT now()
);

-- Tabela de sistemas PROVI
CREATE TABLE IF NOT EXISTS provi_systems (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id uuid REFERENCES analyses(id) ON DELETE CASCADE NOT NULL,
  provi_name text NOT NULL,
  concept text NOT NULL,
  materials jsonb DEFAULT '[]',
  execution_steps text NOT NULL,
  impact_level text DEFAULT 'medium',
  memorability_score integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Tabela de relatórios
CREATE TABLE IF NOT EXISTS reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id uuid REFERENCES analyses(id) ON DELETE CASCADE NOT NULL,
  executive_summary jsonb DEFAULT '{}',
  psychological_analysis jsonb DEFAULT '{}',
  objection_framework jsonb DEFAULT '{}',
  provi_system jsonb DEFAULT '{}',
  market_intelligence jsonb DEFAULT '{}',
  implementation_roadmap jsonb DEFAULT '{}',
  success_metrics jsonb DEFAULT '{}',
  full_report_json jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabela de controle de uso de APIs
CREATE TABLE IF NOT EXISTS api_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  api_provider text NOT NULL,
  endpoint text NOT NULL,
  tokens_used integer DEFAULT 0,
  cost_usd decimal(10,4) DEFAULT 0,
  success boolean DEFAULT true,
  response_time_ms integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Tabela de configurações do sistema
CREATE TABLE IF NOT EXISTS system_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key text UNIQUE NOT NULL,
  setting_value jsonb DEFAULT '{}',
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Inserir configurações padrão
INSERT INTO system_settings (setting_key, setting_value, description) VALUES
('mental_drivers_config', '{
  "total_drivers": 19,
  "categories": ["Emocional Primário", "Urgência", "Confronto", "Conscientização", "Aspiracional", "Cálculo", "Autoridade", "Libertação", "Comparação"],
  "effectiveness_threshold": 85
}', 'Configurações dos drivers mentais'),
('api_fallback_order', '{
  "primary": "openai",
  "secondary": "gemini", 
  "tertiary": "groq",
  "quaternary": "huggingface"
}', 'Ordem de fallback das APIs'),
('quality_requirements', '{
  "min_word_count": 25000,
  "min_quality_score": 85,
  "required_sections": ["executive_summary", "psychological_analysis", "objection_framework", "provi_system"]
}', 'Requisitos de qualidade dos relatórios');

-- Habilitar RLS em todas as tabelas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE mental_drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE objections ENABLE ROW LEVEL SECURITY;
ALTER TABLE provi_systems ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

-- Políticas para users
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = auth_id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = auth_id);

CREATE POLICY "Users can insert own data"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = auth_id);

-- Políticas para analyses
CREATE POLICY "Users can read own analyses"
  ON analyses
  FOR SELECT
  TO authenticated
  USING (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));

CREATE POLICY "Users can create analyses"
  ON analyses
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));

CREATE POLICY "Users can update own analyses"
  ON analyses
  FOR UPDATE
  TO authenticated
  USING (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));

-- Políticas para mental_drivers
CREATE POLICY "Users can read own mental drivers"
  ON mental_drivers
  FOR SELECT
  TO authenticated
  USING (analysis_id IN (
    SELECT id FROM analyses WHERE user_id IN (
      SELECT id FROM users WHERE auth_id = auth.uid()
    )
  ));

CREATE POLICY "Users can create mental drivers"
  ON mental_drivers
  FOR INSERT
  TO authenticated
  WITH CHECK (analysis_id IN (
    SELECT id FROM analyses WHERE user_id IN (
      SELECT id FROM users WHERE auth_id = auth.uid()
    )
  ));

-- Políticas para objections
CREATE POLICY "Users can read own objections"
  ON objections
  FOR SELECT
  TO authenticated
  USING (analysis_id IN (
    SELECT id FROM analyses WHERE user_id IN (
      SELECT id FROM users WHERE auth_id = auth.uid()
    )
  ));

CREATE POLICY "Users can create objections"
  ON objections
  FOR INSERT
  TO authenticated
  WITH CHECK (analysis_id IN (
    SELECT id FROM analyses WHERE user_id IN (
      SELECT id FROM users WHERE auth_id = auth.uid()
    )
  ));

-- Políticas para provi_systems
CREATE POLICY "Users can read own provi systems"
  ON provi_systems
  FOR SELECT
  TO authenticated
  USING (analysis_id IN (
    SELECT id FROM analyses WHERE user_id IN (
      SELECT id FROM users WHERE auth_id = auth.uid()
    )
  ));

CREATE POLICY "Users can create provi systems"
  ON provi_systems
  FOR INSERT
  TO authenticated
  WITH CHECK (analysis_id IN (
    SELECT id FROM analyses WHERE user_id IN (
      SELECT id FROM users WHERE auth_id = auth.uid()
    )
  ));

-- Políticas para reports
CREATE POLICY "Users can read own reports"
  ON reports
  FOR SELECT
  TO authenticated
  USING (analysis_id IN (
    SELECT id FROM analyses WHERE user_id IN (
      SELECT id FROM users WHERE auth_id = auth.uid()
    )
  ));

CREATE POLICY "Users can create reports"
  ON reports
  FOR INSERT
  TO authenticated
  WITH CHECK (analysis_id IN (
    SELECT id FROM analyses WHERE user_id IN (
      SELECT id FROM users WHERE auth_id = auth.uid()
    )
  ));

-- Políticas para api_usage
CREATE POLICY "Users can read own api usage"
  ON api_usage
  FOR SELECT
  TO authenticated
  USING (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));

CREATE POLICY "Users can create api usage records"
  ON api_usage
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));

-- Políticas para system_settings (apenas leitura para usuários autenticados)
CREATE POLICY "Authenticated users can read system settings"
  ON system_settings
  FOR SELECT
  TO authenticated
  USING (true);

-- Funções para atualizar timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_analyses_updated_at BEFORE UPDATE ON analyses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reports_updated_at BEFORE UPDATE ON reports
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_system_settings_updated_at BEFORE UPDATE ON system_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_users_auth_id ON users(auth_id);
CREATE INDEX IF NOT EXISTS idx_analyses_user_id ON analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_analyses_status ON analyses(status);
CREATE INDEX IF NOT EXISTS idx_mental_drivers_analysis_id ON mental_drivers(analysis_id);
CREATE INDEX IF NOT EXISTS idx_objections_analysis_id ON objections(analysis_id);
CREATE INDEX IF NOT EXISTS idx_provi_systems_analysis_id ON provi_systems(analysis_id);
CREATE INDEX IF NOT EXISTS idx_reports_analysis_id ON reports(analysis_id);
CREATE INDEX IF NOT EXISTS idx_api_usage_user_id ON api_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_api_usage_created_at ON api_usage(created_at);