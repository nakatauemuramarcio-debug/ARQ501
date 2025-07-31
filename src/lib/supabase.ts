import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos TypeScript para o banco de dados
export interface User {
  id: string;
  auth_id: string;
  email: string;
  full_name?: string;
  company?: string;
  role: string;
  subscription_tier: string;
  api_credits: number;
  created_at: string;
  updated_at: string;
}

export interface Analysis {
  id: string;
  user_id: string;
  product_name: string;
  target_audience: string;
  competitors?: string;
  additional_details?: string;
  analysis_type: string;
  priority: string;
  status: string;
  progress: number;
  current_phase: string;
  quality_score: number;
  word_count: number;
  created_at: string;
  completed_at?: string;
  updated_at: string;
}

export interface MentalDriver {
  id: string;
  analysis_id: string;
  driver_name: string;
  driver_category: string;
  trigger_phrase: string;
  activation_phrase: string;
  effectiveness_score: number;
  implementation_notes?: string;
  examples: string[];
  created_at: string;
}

export interface Objection {
  id: string;
  analysis_id: string;
  objection_type: string;
  objection_content: string;
  frequency_percentage: number;
  is_hidden: boolean;
  neutralization_strategy?: string;
  created_at: string;
}

export interface ProviSystem {
  id: string;
  analysis_id: string;
  provi_name: string;
  concept: string;
  materials: string[];
  execution_steps: string;
  impact_level: string;
  memorability_score: number;
  created_at: string;
}

export interface Report {
  id: string;
  analysis_id: string;
  executive_summary: any;
  psychological_analysis: any;
  objection_framework: any;
  provi_system: any;
  market_intelligence: any;
  implementation_roadmap: any;
  success_metrics: any;
  full_report_json: any;
  created_at: string;
  updated_at: string;
}

export interface ApiUsage {
  id: string;
  user_id: string;
  api_provider: string;
  endpoint: string;
  tokens_used: number;
  cost_usd: number;
  success: boolean;
  response_time_ms: number;
  created_at: string;
}

// Funções de autenticação
export const auth = {
  signUp: async (email: string, password: string, userData?: Partial<User>) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    // Criar registro na tabela users
    if (data.user) {
      const { error: userError } = await supabase
        .from('users')
        .insert({
          auth_id: data.user.id,
          email,
          full_name: userData?.full_name,
          company: userData?.company,
        });

      if (userError) throw userError;
    }

    return data;
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  getCurrentUserProfile: async () => {
    const user = await auth.getCurrentUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('auth_id', user.id)
      .single();

    if (error) throw error;
    return data;
  }
};

// Funções para análises
export const analysisService = {
  create: async (analysisData: Partial<Analysis>) => {
    const user = await auth.getCurrentUserProfile();
    if (!user) throw new Error('Usuário não autenticado');

    const { data, error } = await supabase
      .from('analyses')
      .insert({
        ...analysisData,
        user_id: user.id,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  getAll: async () => {
    const { data, error } = await supabase
      .from('analyses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('analyses')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  update: async (id: string, updates: Partial<Analysis>) => {
    const { data, error } = await supabase
      .from('analyses')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('analyses')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

// Funções para drivers mentais
export const mentalDriverService = {
  create: async (driverData: Partial<MentalDriver>) => {
    const { data, error } = await supabase
      .from('mental_drivers')
      .insert(driverData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  getByAnalysisId: async (analysisId: string) => {
    const { data, error } = await supabase
      .from('mental_drivers')
      .select('*')
      .eq('analysis_id', analysisId);

    if (error) throw error;
    return data;
  }
};

// Funções para objeções
export const objectionService = {
  create: async (objectionData: Partial<Objection>) => {
    const { data, error } = await supabase
      .from('objections')
      .insert(objectionData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  getByAnalysisId: async (analysisId: string) => {
    const { data, error } = await supabase
      .from('objections')
      .select('*')
      .eq('analysis_id', analysisId);

    if (error) throw error;
    return data;
  }
};

// Funções para sistemas PROVI
export const proviService = {
  create: async (proviData: Partial<ProviSystem>) => {
    const { data, error } = await supabase
      .from('provi_systems')
      .insert(proviData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  getByAnalysisId: async (analysisId: string) => {
    const { data, error } = await supabase
      .from('provi_systems')
      .select('*')
      .eq('analysis_id', analysisId);

    if (error) throw error;
    return data;
  }
};

// Funções para relatórios
export const reportService = {
  create: async (reportData: Partial<Report>) => {
    const { data, error } = await supabase
      .from('reports')
      .insert(reportData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  getByAnalysisId: async (analysisId: string) => {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .eq('analysis_id', analysisId)
      .single();

    if (error) throw error;
    return data;
  },

  update: async (id: string, updates: Partial<Report>) => {
    const { data, error } = await supabase
      .from('reports')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

// Funções para controle de uso de API
export const apiUsageService = {
  log: async (usageData: Partial<ApiUsage>) => {
    const user = await auth.getCurrentUserProfile();
    if (!user) return;

    const { error } = await supabase
      .from('api_usage')
      .insert({
        ...usageData,
        user_id: user.id,
      });

    if (error) console.error('Erro ao registrar uso da API:', error);
  },

  getUsageStats: async (days: number = 30) => {
    const user = await auth.getCurrentUserProfile();
    if (!user) return null;

    const { data, error } = await supabase
      .from('api_usage')
      .select('*')
      .eq('user_id', user.id)
      .gte('created_at', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString());

    if (error) throw error;
    return data;
  }
};