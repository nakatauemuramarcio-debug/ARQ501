import React, { useState } from 'react';
import { Send, Sparkles, Target, Users, Briefcase, AlertCircle } from 'lucide-react';
import { analysisService } from '../lib/supabase';

interface AnalysisFormProps {
  onSubmit: (data: any) => void;
}

const AnalysisForm: React.FC<AnalysisFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    product: '',
    target: '',
    competitors: '',
    details: '',
    analysisType: 'complete',
    urgency: 'normal'
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Criar análise no Supabase
      const analysis = await analysisService.create({
        product_name: formData.product,
        target_audience: formData.target,
        competitors: formData.competitors,
        additional_details: formData.details,
        analysis_type: formData.analysisType,
        priority: formData.urgency,
        status: 'processing',
        progress: 0,
        current_phase: 'initialization'
      });

      // Passar o ID da análise para o WebSocket
      const formDataWithId = {
        ...formData,
        analysisId: analysis.id
      };

      await onSubmit(formDataWithId);
    } catch (error) {
      console.error('Erro ao iniciar análise:', error);
      alert('Erro ao iniciar análise. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const analysisTypes = [
    { id: 'complete', label: 'Análise Completa', description: 'Todos os 19 drivers + objeções + PROVI' },
    { id: 'drivers', label: 'Foco em Drivers', description: 'Apenas drivers mentais e gatilhos' },
    { id: 'objections', label: 'Anti-Objeção', description: 'Mapeamento completo de resistências' },
    { id: 'provi', label: 'Sistema PROVI', description: 'Provas visuais instantâneas' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Informações Básicas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
            <Briefcase className="w-4 h-4" />
            <span>Produto/Serviço</span>
          </label>
          <textarea
            value={formData.product}
            onChange={(e) => setFormData({ ...formData, product: e.target.value })}
            placeholder="Descreva seu produto ou serviço em detalhes..."
            className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors resize-none"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
            <Users className="w-4 h-4" />
            <span>Público-Alvo</span>
          </label>
          <textarea
            value={formData.target}
            onChange={(e) => setFormData({ ...formData, target: e.target.value })}
            placeholder="Defina seu avatar ideal: idade, profissão, dores, desejos..."
            className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors resize-none"
            rows={4}
            required
          />
        </div>
      </div>

      {/* Informações Adicionais */}
      <div className="space-y-4">
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
            <Target className="w-4 h-4" />
            <span>Concorrentes (opcional)</span>
          </label>
          <input
            type="text"
            value={formData.competitors}
            onChange={(e) => setFormData({ ...formData, competitors: e.target.value })}
            placeholder="Ex: Empresa A, Produto B, Guru C..."
            className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
          />
        </div>

        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Detalhes Adicionais</span>
          </label>
          <textarea
            value={formData.details}
            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
            placeholder="Informações extras: histórico de lançamentos, objeções conhecidas, cases de sucesso..."
            className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors resize-none"
            rows={3}
          />
        </div>
      </div>

      {/* Tipo de Análise */}
      <div>
        <label className="text-sm font-medium text-gray-300 mb-3 block">
          Tipo de Análise
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {analysisTypes.map((type) => (
            <label
              key={type.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                formData.analysisType === type.id
                  ? 'border-purple-400 bg-purple-600/20 text-purple-300'
                  : 'border-gray-600 bg-black/20 text-gray-300 hover:border-gray-500'
              }`}
            >
              <input
                type="radio"
                name="analysisType"
                value={type.id}
                checked={formData.analysisType === type.id}
                onChange={(e) => setFormData({ ...formData, analysisType: e.target.value })}
                className="sr-only"
              />
              <div className="font-medium">{type.label}</div>
              <div className="text-sm opacity-80 mt-1">{type.description}</div>
            </label>
          ))}
        </div>
      </div>

      {/* Urgência */}
      <div>
        <label className="text-sm font-medium text-gray-300 mb-3 block">
          Prioridade de Processamento
        </label>
        <div className="flex space-x-4">
          {[
            { id: 'normal', label: 'Normal', time: '5-10 min' },
            { id: 'high', label: 'Alta', time: '2-5 min' },
            { id: 'urgent', label: 'Urgente', time: '1-2 min' }
          ].map((priority) => (
            <label
              key={priority.id}
              className={`flex-1 p-3 border rounded-lg cursor-pointer transition-all text-center ${
                formData.urgency === priority.id
                  ? 'border-orange-400 bg-orange-600/20 text-orange-300'
                  : 'border-gray-600 bg-black/20 text-gray-300 hover:border-gray-500'
              }`}
            >
              <input
                type="radio"
                name="urgency"
                value={priority.id}
                checked={formData.urgency === priority.id}
                onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                className="sr-only"
              />
              <div className="font-medium">{priority.label}</div>
              <div className="text-xs opacity-80">{priority.time}</div>
            </label>
          ))}
        </div>
      </div>

      {/* Aviso sobre IA */}
      <div className="bg-amber-600/10 border border-amber-600/30 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-200">
            <strong>Sistema Multi-IA:</strong> Esta análise utiliza OpenAI GPT-4, Google Gemini e HuggingFace com sistema de backup automático. 
            Em caso de falha de qualquer provedor, o sistema automaticamente alterna para backups garantindo 100% de disponibilidade.
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || !formData.product || !formData.target}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-medium py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Iniciando Análise...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span>Iniciar Análise Psicológica</span>
          </>
        )}
      </button>
    </form>
  );
};

export default AnalysisForm;