import React, { useState } from 'react';
import { FileText, Download, Share2, Eye, Zap, Target, Brain, TrendingUp, Shield } from 'lucide-react';

interface ReportViewerProps {
  report: any;
}

const ReportViewer: React.FC<ReportViewerProps> = ({ report }) => {
  const [activeSection, setActiveSection] = useState('summary');

  const sections = [
    { id: 'summary', label: 'Resumo Executivo', icon: Eye },
    { id: 'psychology', label: 'Análise Psicológica', icon: Brain },
    { id: 'objections', label: 'Framework Anti-Objeção', icon: Shield },
    { id: 'provi', label: 'Sistema PROVI', icon: Zap },
    { id: 'market', label: 'Inteligência de Mercado', icon: TrendingUp },
    { id: 'implementation', label: 'Roadmap', icon: Target }
  ];

  const renderSummary = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4">
          <h4 className="font-semibold text-blue-300 mb-2">Análise do Produto</h4>
          <p className="text-gray-300 text-sm">{report.executive_summary?.product_analysis}</p>
        </div>
        <div className="bg-purple-600/10 border border-purple-600/30 rounded-lg p-4">
          <h4 className="font-semibold text-purple-300 mb-2">Perfil do Avatar</h4>
          <p className="text-gray-300 text-sm">{report.executive_summary?.target_profile}</p>
        </div>
        <div className="bg-green-600/10 border border-green-600/30 rounded-lg p-4">
          <h4 className="font-semibold text-green-300 mb-2">Score de Qualidade</h4>
          <div className="text-2xl font-bold text-green-400">{report.quality_score}%</div>
          <p className="text-gray-400 text-xs">Relatório aprovado</p>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-white mb-3">Oportunidades Identificadas</h4>
        <div className="space-y-2">
          {report.executive_summary?.key_opportunities?.map((opportunity: string, index: number) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-black/20 rounded-lg">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span className="text-gray-300">{opportunity}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-white mb-3">Drivers Críticos Identificados</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {report.executive_summary?.critical_drivers?.map((driver: string, index: number) => (
            <div key={index} className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-400/30 rounded-lg p-3 text-center">
              <Zap className="w-5 h-5 text-purple-400 mx-auto mb-1" />
              <span className="text-purple-300 font-medium text-sm">{driver}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPsychology = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold text-white mb-4 flex items-center space-x-2">
          <Brain className="w-5 h-5 text-purple-400" />
          <span>Drivers Mentais Dominantes</span>
        </h4>
        <div className="space-y-4">
          {report.psychological_analysis?.dominant_drives?.map((drive: any, index: number) => (
            <div key={index} className="bg-black/30 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-semibold text-purple-300">{drive.name}</h5>
                <span className="bg-purple-600/20 px-2 py-1 rounded text-xs text-purple-300">
                  {drive.expected_impact}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-2">{drive.psychological_trigger}</p>
              <div className="bg-gray-800/50 p-3 rounded border-l-4 border-purple-400">
                <p className="text-purple-200 italic text-sm">"{drive.activation_phrase}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-white mb-4">Paisagem Emocional</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-600/10 border border-red-600/30 rounded-lg p-4">
            <h5 className="font-medium text-red-300 mb-2">Dor Primária</h5>
            <p className="text-gray-300 text-sm">{report.psychological_analysis?.emotional_landscape?.primary_pain}</p>
          </div>
          <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4">
            <h5 className="font-medium text-blue-300 mb-2">Desejo Oculto</h5>
            <p className="text-gray-300 text-sm">{report.psychological_analysis?.emotional_landscape?.hidden_desire}</p>
          </div>
          <div className="bg-yellow-600/10 border border-yellow-600/30 rounded-lg p-4">
            <h5 className="font-medium text-yellow-300 mb-2">Medo Secreto</h5>
            <p className="text-gray-300 text-sm">{report.psychological_analysis?.emotional_landscape?.secret_fear}</p>
          </div>
          <div className="bg-green-600/10 border border-green-600/30 rounded-lg p-4">
            <h5 className="font-medium text-green-300 mb-2">Hierarquia de Motivação</h5>
            <div className="flex flex-wrap gap-2">
              {report.psychological_analysis?.emotional_landscape?.motivation_hierarchy?.map((motivation: string, index: number) => (
                <span key={index} className="bg-green-600/20 px-2 py-1 rounded text-xs text-green-300">
                  {motivation}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderObjections = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold text-white mb-4">Objeções Universais</h4>
        <div className="space-y-3">
          {report.objection_framework?.universal_objections?.map((objection: any, index: number) => (
            <div key={index} className="bg-red-600/10 border border-red-600/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-red-300">{objection.type}</span>
                <span className="bg-red-600/20 px-2 py-1 rounded text-xs text-red-300">
                  {objection.frequency}% dos casos
                </span>
              </div>
              <p className="text-gray-300 text-sm">{objection.content}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-white mb-4">Objeções Ocultas</h4>
        <div className="space-y-3">
          {report.objection_framework?.hidden_objections?.map((objection: any, index: number) => (
            <div key={index} className="bg-orange-600/10 border border-orange-600/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-orange-300">{objection.type}</span>
                <span className="bg-orange-600/20 px-2 py-1 rounded text-xs text-orange-300">
                  {objection.frequency}% dos casos
                </span>
              </div>
              <p className="text-gray-300 text-sm">{objection.content}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-white mb-4">Estratégias de Neutralização</h4>
        <div className="space-y-3">
          {Object.entries(report.objection_framework?.neutralization_strategies || {}).map(([key, strategy]: [string, any], index: number) => (
            <div key={index} className="bg-green-600/10 border border-green-600/30 rounded-lg p-4">
              <h5 className="font-medium text-green-300 mb-2">{key}</h5>
              <p className="text-gray-300 text-sm">{strategy}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPROVI = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-400/30 rounded-lg p-6">
        <h4 className="font-semibold text-white mb-2">Sistema PROVI - Provas Visuais Instantâneas</h4>
        <p className="text-gray-300 text-sm">
          Demonstrações físicas que transformam conceitos abstratos em experiências memoráveis
        </p>
      </div>

      <div className="space-y-4">
        {report.provi_system?.visual_demonstrations?.map((provi: any, index: number) => (
          <div key={index} className="bg-black/30 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h5 className="font-semibold text-purple-300">{provi.name}</h5>
              <span className="bg-purple-600/20 px-2 py-1 rounded text-xs text-purple-300">
                {provi.impact}
              </span>
            </div>
            
            <p className="text-gray-400 text-sm mb-3">{provi.concept}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h6 className="font-medium text-blue-300 mb-2">Materiais Necessários</h6>
                <ul className="space-y-1">
                  {provi.materials?.map((material: string, materialIndex: number) => (
                    <li key={materialIndex} className="text-gray-300 text-sm flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                      <span>{material}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h6 className="font-medium text-green-300 mb-2">Execução</h6>
                <p className="text-gray-300 text-sm">{provi.execution}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderImplementation = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold text-white mb-4">Arquitetura do Pré-Pitch</h4>
        <div className="space-y-3">
          {Object.entries(report.implementation_roadmap?.pre_pitch_architecture || {}).map(([phase, description]: [string, any], index: number) => (
            <div key={index} className="bg-black/30 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {index + 1}
                </div>
                <div>
                  <h5 className="font-medium text-purple-300">{phase.replace('phase_', 'Fase ')}</h5>
                  <p className="text-gray-300 text-sm">{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-white mb-4">Estratégia de Timing</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(report.implementation_roadmap?.timing_strategy || {}).map(([key, value]: [string, any], index: number) => (
            <div key={index} className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4">
              <h5 className="font-medium text-blue-300 mb-1">{key.replace('_', ' ')}</h5>
              <p className="text-gray-300 text-sm">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'summary': return renderSummary();
      case 'psychology': return renderPsychology();
      case 'objections': return renderObjections();
      case 'provi': return renderPROVI();
      case 'implementation': return renderImplementation();
      default: return renderSummary();
    }
  };

  return (
    <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-b border-white/10 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <FileText className="w-8 h-8 text-purple-400" />
            <div>
              <h3 className="text-xl font-bold text-white">Relatório de Análise Psicológica</h3>
              <p className="text-gray-300">
                {report.word_count?.toLocaleString() || '25,000'}+ caracteres • 
                Qualidade {report.quality_score}% • 
                {new Date(report.timestamp).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              <span>PDF</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
              <Share2 className="w-4 h-4" />
              <span>Compartilhar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-black/10 border-b border-white/5 p-4">
        <div className="flex space-x-1 overflow-x-auto">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  activeSection === section.id
                    ? 'bg-purple-600/20 text-purple-300 border border-purple-400/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{section.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default ReportViewer;