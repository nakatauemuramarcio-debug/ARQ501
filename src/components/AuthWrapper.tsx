import React, { useState, useEffect } from 'react';
import { supabase, auth } from '../lib/supabase';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { User } from '@supabase/supabase-js';
import { Brain, Shield, Zap } from 'lucide-react';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar usuário atual
    const getUser = async () => {
      const currentUser = await auth.getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };

    getUser();

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white">
                  Análise Psicológica
                </h1>
              </div>
              <p className="text-gray-300">
                Sistema Avançado de Inteligência de Mercado
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 gap-4 mb-8">
              <div className="bg-black/20 backdrop-blur-xl rounded-lg p-4 border border-white/10">
                <div className="flex items-center space-x-3">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <div>
                    <h3 className="font-semibold text-white">19 Drivers Mentais</h3>
                    <p className="text-sm text-gray-300">Gatilhos psicológicos universais</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/20 backdrop-blur-xl rounded-lg p-4 border border-white/10">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-green-400" />
                  <div>
                    <h3 className="font-semibold text-white">Anti-Objeção</h3>
                    <p className="text-sm text-gray-300">Mapeamento completo de resistências</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/20 backdrop-blur-xl rounded-lg p-4 border border-white/10">
                <div className="flex items-center space-x-3">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <div>
                    <h3 className="font-semibold text-white">Sistema PROVI</h3>
                    <p className="text-sm text-gray-300">Provas visuais instantâneas</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Auth Form */}
            <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <Auth
                supabaseClient={supabase}
                appearance={{
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      colors: {
                        brand: '#8b5cf6',
                        brandAccent: '#7c3aed',
                        brandButtonText: 'white',
                        defaultButtonBackground: '#374151',
                        defaultButtonBackgroundHover: '#4b5563',
                        inputBackground: 'rgba(0, 0, 0, 0.3)',
                        inputBorder: '#4b5563',
                        inputBorderHover: '#8b5cf6',
                        inputBorderFocus: '#8b5cf6',
                        inputText: 'white',
                        inputLabelText: '#d1d5db',
                        inputPlaceholder: '#9ca3af',
                      },
                    },
                  },
                  className: {
                    container: 'auth-container',
                    button: 'auth-button',
                    input: 'auth-input',
                  },
                }}
                providers={[]}
                redirectTo={window.location.origin}
                localization={{
                  variables: {
                    sign_up: {
                      email_label: 'Email',
                      password_label: 'Senha',
                      button_label: 'Criar Conta',
                      loading_button_label: 'Criando conta...',
                      social_provider_text: 'Entrar com {{provider}}',
                      link_text: 'Não tem uma conta? Cadastre-se',
                      confirmation_text: 'Verifique seu email para confirmar a conta',
                    },
                    sign_in: {
                      email_label: 'Email',
                      password_label: 'Senha',
                      button_label: 'Entrar',
                      loading_button_label: 'Entrando...',
                      social_provider_text: 'Entrar com {{provider}}',
                      link_text: 'Já tem uma conta? Entre',
                    },
                    forgotten_password: {
                      email_label: 'Email',
                      button_label: 'Enviar instruções',
                      loading_button_label: 'Enviando...',
                      link_text: 'Esqueceu sua senha?',
                      confirmation_text: 'Verifique seu email para redefinir a senha',
                    },
                  },
                }}
              />
            </div>

            {/* Footer */}
            <div className="text-center mt-8">
              <p className="text-gray-400 text-sm">
                Sistema seguro com criptografia de ponta a ponta
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthWrapper;