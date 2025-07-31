import React, { useState, useEffect } from 'react';
import { BarChart, TrendingUp, Users, Brain, Zap, Target, Clock, Shield, Award } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalAnalyses: 0,
    avgQuality: 0,
    completionRate: 0,
    avgTime: 0
  });

  useEffect(() => {
    // Simular carregamento de estatísticas
    const timer = setTimeout(() => {
      setStats({
        totalAnalyses: 1247,
        avgQuality: 92.5,
        completionRate: 98.7,
        avgTime: 8.3
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const recentAnalyses = [
    {
      id: 1,
      product: 'Curso de Marketing Digital',
      target: 'Empreendedores 25-45 anos',
      quality: 95,
      driversFound: 7,
      timestamp: '2024-01-20 14:30',
      status: 'completed'
    },
    {
      id: 2,
      product: 'Consultoria Empresarial',
      target: 'CEOs de PMEs',
      quality: 89,
      driversFound: 5,
      timestamp: '2024-01-20 13:15',
      status: 'completed'
    },
    {
      id: 3,
      product: 'Software de Gestão',
      target: 'Gestores de TI',
      quality: 93,
      driversFound: 6,
      timestamp: '2024-01-20 11:45',
      status: 'completed'
    }
  ];

  const systemHealth = [
    { name: 'OpenAI GPT-4', status: 'online', responseTime: '1.2s', success: 99.8 },
    { name: 'Google Gemini', status: 'online', responseTime: '1.8s', success: 98.5 },
    { name: 'HuggingFace', status: 'online', responseTime: '2.1s', success: 97.2 },
    { name: 'Sistema de Busca', status: 'online', responseTime: '0.8s', success: 99.9 },
    { name: 'Backup Groq', status: 'standby', responseTime: '1.5s', success: 96.8 }
  ];

  const driversPerformance = [
    { name: 'Diagnóstico Brutal', usage: 87, effectiveness: 94 },
    { name: 'Relógio Psicológico', usage: 82, effectiveness: 91 },
    { name: 'Ambição Expandida', usage: 79, effectiveness: 89 },
    { name: 'Custo Invisível', usage: 75, effectiveness: 92 },
    { name: 'Mentor Salvador', usage: 68, effectiveness: 86 }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-200 text-sm font-medium">Análises Totais</p>
              <p className="text-2xl font-bold text-blue-100">
                {stats.totalAnalyses.toLocaleString()}
              </p>
            </div>
            <BarChart className="w-8 h-8 text-blue-400" />
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm">+12.5% este mês</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-200 text-sm font-medium">Qualidade Média</p>
              <p className="text-2xl font-bold text-purple-100">
                {stats.avgQuality}%
              </p>
            </div>
            <Award className="w-8 h-8 text-purple-400" />
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm">Acima da meta (85%)</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-200 text-sm font-medium">Taxa de Sucesso</p>
              <p className="text-2xl font-bold text-green-100">
                {stats.completionRate}%
              </p>
            </div>
            <Target className="w-8 h-8 text-green-400" />
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm">Sistema estável</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-600/20 to-orange-800/20 border border-orange-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-200 text-sm font-medium">Tempo Médio</p>
              <p className="text-2xl font-bold text-orange-100">
                {stats.avgTime}min
              </p>
            </div>
            <Clock className="w-8 h-8 text-orange-400" />
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm">-15% otimização</span>
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
          <Shield className="w-5 h-5 text-green-400" />
          <span>Status do Sistema</span>
        </h3>
        
        <div className="space-y-3">
          {systemHealth.map((service, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  service.status === 'online' ? 'bg-green-400 animate-pulse' : 
                  service.status === 'standby' ? 'bg-yellow-400' : 'bg-red-400'
                }`}></div>
                <span className="text-white font-medium">{service.name}</span>
              </div>
              
              <div className="flex items-center space-x-6 text-sm">
                <div className="text-gray-300">
                  <span className="text-gray-400">Tempo:</span> {service.responseTime}
                </div>
                <div className="text-gray-300">
                  <span className="text-gray-400">Sucesso:</span> {service.success}%
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  service.status === 'online' ? 'bg-green-600/20 text-green-400' :
                  service.status === 'standby' ? 'bg-yellow-600/20 text-yellow-400' : 
                  'bg-red-600/20 text-red-400'
                }`}>
                  {service.status.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Analyses & Drivers Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Analyses */}
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
            <Brain className="w-5 h-5 text-purple-400" />
            <span>Análises Recentes</span>
          </h3>
          
          <div className="space-y-3">
            {recentAnalyses.map((analysis) => (
              <div key={analysis.id} className="p-4 bg-black/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white truncate">{analysis.product}</h4>
                  <span className="bg-green-600/20 text-green-400 px-2 py-1 rounded text-xs">
                    {analysis.quality}%
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-2">{analysis.target}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">{analysis.timestamp}</span>
                  <div className="flex items-center space-x-2">
                    <Zap className="w-3 h-3 text-yellow-400" />
                    <span className="text-yellow-400">{analysis.driversFound} drivers</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Drivers Performance */}
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span>Performance dos Drivers</span>
          </h3>
          
          <div className="space-y-4">
            {driversPerformance.map((driver, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium text-sm">{driver.name}</span>
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="text-blue-400">Uso: {driver.usage}%</span>
                    <span className="text-green-400">Eficácia: {driver.effectiveness}%</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-800 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${driver.usage}%` }}
                    ></div>
                  </div>
                  <div className="bg-gray-800 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all"
                      style={{ width: `${driver.effectiveness}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4">Ações Rápidas</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-purple-600/20 border border-purple-400/30 rounded-lg text-purple-300 hover:bg-purple-600/30 transition-all">
            <Brain className="w-5 h-5" />
            <span>Nova Análise</span>  
          </button>
          
          <button className="flex items-center space-x-3 p-4 bg-blue-600/20 border border-blue-400/30 rounded-lg text-blue-300 hover:bg-blue-600/30 transition-all">
            <BarChart className="w-5 h-5" />
            <span>Relatório Mensal</span>
          </button>
          
          <button className="flex items-center space-x-3 p-4 bg-green-600/20 border border-green-400/30 rounded-lg text-green-300 hover:bg-green-600/30 transition-all">
            <Users className="w-5 h-5" />
            <span>Gerenciar Usuários</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;