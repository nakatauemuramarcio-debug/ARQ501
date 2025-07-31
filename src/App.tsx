import React, { useState, useEffect } from 'react';
import { Brain, Target, Search, FileText, Zap, Users, TrendingUp, Clock, Shield, Award } from 'lucide-react';
import Dashboard from './components/Dashboard';
import AnalysisForm from './components/AnalysisForm';
import ReportViewer from './components/ReportViewer';
import DriversPanel from './components/DriversPanel';

interface AnalysisState {
  phase: string;
  progress: number;
  message: string;
  isComplete: boolean;
  report?: any;
}

function App() {
  const [activeTab, setActiveTab] = useState('analysis');
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [analysisState, setAnalysisState] = useState<AnalysisState>({
    phase: 'IDLE',
    progress: 0,
    message: 'Pronto para análise',
    isComplete: false
  });

  useEffect(() => {
    // Conectar ao WebSocket quando componente montar
    const websocket = new WebSocket('ws://localhost:3001');
    
    websocket.onopen = () => {
      console.log('Conectado ao servidor de análise');
      setWs(websocket);
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'PROGRESS_UPDATE') {
        setAnalysisState({
          phase: data.phase,
          progress: data.progress,
          message: data.message,
          isComplete: false
        });
      } else if (data.type === 'ANALYSIS_COMPLETE') {
        setAnalysisState({
          phase: 'COMPLETE',
          progress: 100,
          message: 'Análise psicológica concluída!',
          isComplete: true,
          report: data.report
        });
      } else if (data.type === 'ERROR') {
        setAnalysisState({
          phase: 'ERROR',
          progress: 0,
          message: `Erro: ${data.message}`,
          isComplete: false
        });
      }
    };

    websocket.onerror = (error) => {
      console.error('Erro no WebSocket:', error);
    };

    websocket.onclose = () => {
      console.log('Conexão WebSocket fechada');
      setWs(null);
    };

    return () => {
      if (websocket.readyState === WebSocket.OPEN) {
        websocket.close();
      }
    };
  }, []);

  const startAnalysis = (formData: any) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: 'START_ANALYSIS',
        payload: formData
      }));
      
      setAnalysisState({
        phase: 'STARTING',
        progress: 0,
        message: 'Iniciando análise psicológica...',
        isComplete: false
      });
    }
  };

  const tabs = [
    { id: 'analysis', label: 'Análise Psicológica', icon: Brain },
    { id: 'drivers', label: 'Drivers Mentais', icon: Zap },
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'reports', label: 'Relatórios', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Plataforma de Análise Psicológica
                </h1>
                <p className="text-purple-300">
                  Sistema Avançado de Inteligência de Mercado
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-purple-300">Status do Sistema</div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white text-sm">Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-black/10 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-4 border-b-2 transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'border-purple-400 text-purple-300'
                      : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'analysis' && (
          <div className="space-y-8">
            <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
              <div className="flex items-center space-x-4 mb-6">
                <Target className="w-8 h-8 text-purple-400" />
                <div>
                  <h2 className="text-2xl font-bold text-white">Nova Análise</h2>
                  <p className="text-gray-300">Configure os parâmetros para análise psicológica completa</p>
                </div>
              </div>
              
              <AnalysisForm onSubmit={startAnalysis} />
            </div>

            {/* Progress Display */}
            {analysisState.progress > 0 && (
              <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <div className="flex items-center space-x-4 mb-4">
                  <Search className="w-6 h-6 text-blue-400 animate-spin" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">Análise em Progresso</h3>
                    <p className="text-gray-300">{analysisState.message}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progresso</span>
                    <span className="text-purple-300">{analysisState.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${analysisState.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Phase Indicators */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  {[
                    { phase: 'DATA_COLLECTION', label: 'Coleta', icon: Search },
                    { phase: 'AI_ANALYSIS', label: 'IA', icon: Brain },
                    { phase: 'MENTAL_DRIVERS', label: 'Drivers', icon: Zap },
                    { phase: 'REPORT_GENERATION', label: 'Relatório', icon: FileText }
                  ].map(({ phase, label, icon: Icon }) => (
                    <div 
                      key={phase}
                      className={`p-3 rounded-lg border transition-all ${
                        analysisState.phase === phase
                          ? 'bg-purple-600/20 border-purple-400 text-purple-300'
                          : analysisState.progress > 0 && ['DATA_COLLECTION', 'AI_ANALYSIS', 'MENTAL_DRIVERS'].indexOf(phase) < ['DATA_COLLECTION', 'AI_ANALYSIS', 'MENTAL_DRIVERS'].indexOf(analysisState.phase)
                          ? 'bg-green-600/20 border-green-400 text-green-300'
                          : 'bg-gray-800/50 border-gray-600 text-gray-400'
                      }`}
                    >
                      <Icon className="w-5 h-5 mb-1" />
                      <div className="text-xs font-medium">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Report Results */}
            {analysisState.isComplete && analysisState.report && (
              <ReportViewer report={analysisState.report} />
            )}
          </div>
        )}

        {activeTab === 'drivers' && <DriversPanel />}
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'reports' && (
          <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">Histórico de Relatórios</h2>
            <p className="text-gray-300">Funcionalidade de histórico será implementada em breve.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-xl border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Sistema de Análise</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>19 Drivers Mentais Universais</li>
                <li>Engenharia Anti-Objeção</li>
                <li>Sistema PROVI</li>
                <li>Dashboard do Avatar</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Tecnologias</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>OpenAI GPT-4</li>
                <li>Google Gemini</li>
                <li>HuggingFace AI</li>
                <li>Sistema Multi-Backup</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Garantias</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>100% de Disponibilidade</li>
                <li>Relatórios 25.000+ caracteres</li>
                <li>Qualidade 85%+ garantida</li>
                <li>Backup automático</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Status</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm">Sistema Seguro</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-400 text-sm">Tempo Real</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-400 text-sm">Qualidade Premium</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Plataforma de Análise Psicológica de Mercado - Sistema Avançado de Inteligência
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;