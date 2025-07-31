import React, { useState } from 'react';
import { Zap, Brain, Target, Eye, Heart, Clock, Shield, TrendingUp, Users, Star, Lightbulb, AlertTriangle } from 'lucide-react';

const DriversPanel: React.FC = () => {
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);

  const mentalDrivers = [
    {
      id: 'ferida_exposta',
      name: 'Ferida Exposta',
      category: 'Emocional Primário',
      trigger: 'Dor não resolvida',
      description: 'Traz à consciência a dor reprimida que o prospect tenta ignorar',
      activation: 'Você ainda [comportamento doloroso] mesmo sabendo que [consequência]?',
      icon: Heart,
      color: 'red',
      examples: [
        'Você ainda trabalha 12h por dia mesmo sabendo que está perdendo tempo com a família?', 
        'Você ainda aceita ganhar pouco mesmo vendo outros crescerem?'
      ],
      implementation: 'Use no início para quebrar resistência inicial. Deve ser seguido de esperança.',
      effectiveness: 95
    },
    {
      id: 'trofeu_secreto',
      name: 'Troféu Secreto',
      category: 'Emocional Primário',
      trigger: 'Desejo inconfessável',
      description: 'Valida ambições que a pessoa tem vergonha de admitir publicamente',
      activation: 'Não é sobre dinheiro, é sobre [desejo real oculto]',
      icon: Star,
      color: 'yellow',
      examples: [
        'Não é sobre o carro, é sobre o respeito que você vai ter',
        'Não é sobre faturamento, é sobre provar que você consegue'
      ],
      implementation: 'Use após estabelecer dor. Cria conexão emocional profunda.',
      effectiveness: 88
    },
    {
      id: 'relogio_psicologico',
      name: 'Relógio Psicológico',
      category: 'Urgência',
      trigger: 'Consciência da finitude do tempo',
      description: 'Instala urgência existencial sobre o tempo que está passando',
      activation: 'Quantos [período] você ainda vai [desperdício]?',
      icon: Clock,
      color: 'orange',
      examples: [
        'Quantos anos você ainda vai postergar seus sonhos?',
        'Quantos meses você ainda vai aceitar essa situação?'
      ],
      implementation: 'Use para criar pressão temporal. Poderoso nos momentos finais.',
      effectiveness: 92
    },
    {
      id: 'diagnostico_brutal',
      name: 'Diagnóstico Brutal',
      category: 'Confronto',
      trigger: 'Confronto com realidade atual',
      description: 'Força o reconhecimento da situação real sem filtros ou ilusões',
      activation: 'Olhe seus números/situação. Até quando você vai aceitar isso?',
      icon: Eye,
      color: 'blue',
      examples: [
        'Olhe seu faturamento dos últimos 3 anos. Mudou alguma coisa?',
        'Veja sua agenda. Quanto tempo você dedica ao que realmente importa?'
      ],
      implementation: 'Use no meio para despertar indignação produtiva.',
      effectiveness: 89
    },
    {
      id: 'ambiente_vampiro',
      name: 'Ambiente Vampiro',
      category: 'Conscientização',
      trigger: 'Percepção do entorno tóxico',
      description: 'Revela como o ambiente atual está sugando energia e potencial',
      activation: 'Seu ambiente te impulsiona ou te mantém pequeno?',
      icon: Shield,
      color: 'purple',
      examples: [
        'As pessoas ao seu redor celebram seu crescimento ou sentem inveja?',
        'Seu ambiente te desafia a crescer ou te mantém na zona de conforto?'
      ],
      implementation: 'Use para justificar mudança de círculo social/profissional.',
      effectiveness: 84
    },
    {
      id: 'ambicao_expandida',
      name: 'Ambição Expandida',
      category: 'Aspiracional',
      trigger: 'Reconhecimento de sonhos pequenos',
      description: 'Questiona por que a pessoa está pedindo tão pouco da vida',
      activation: 'Se o esforço é o mesmo, por que você está pedindo tão pouco?',
      icon: TrendingUp,
      color: 'green',
      examples: [
        'Se você vai trabalhar 8h mesmo, por que não ganhar 10x mais?',
        'Se vai dedicar sua vida a isso, por que não ser o melhor?'
      ],
      implementation: 'Use após diagnóstico para expandir visão de possibilidades.',
      effectiveness: 87
    },
    {
      id: 'custo_invisivel',
      name: 'Custo Invisível',
      category: 'Cálculo',
      trigger: 'Consciência de perdas não percebidas',
      description: 'Quantifica o que está sendo perdido diariamente por inação',
      activation: 'Cada dia sem [solução] custa [perda específica]',
      icon: AlertTriangle,
      color: 'red',
      examples: [
        'Cada mês sem organizar suas finanças = R$2000 desperdiçados',
        'Cada dia procrastinando = uma oportunidade perdida para sempre'
      ],  
      implementation: 'Use para criar urgência matemática. Muito poderoso com números.',
      effectiveness: 91
    },
    {
      id: 'mentor_salvador',
      name: 'Mentor Salvador',
      category: 'Autoridade',
      trigger: 'Necessidade de orientação',
      description: 'Ativa o desejo por uma figura que acredite no potencial deles',
      activation: 'Você precisa de alguém que veja seu potencial quando você não consegue',
      icon: Users,
      color: 'blue',
      examples: [
        'Todo campeão teve um técnico que viu o que ele não via',
        'Você precisa de alguém que já passou por isso antes'
      ],
      implementation: 'Use para posicionar autoridade e necessidade de mentoria.',
      effectiveness: 86
    },
    {
      id: 'identidade_aprisionada',
      name: 'Identidade Aprisionada',
      category: 'Libertação',
      trigger: 'Conflito entre ser atual e potencial',
      description: 'Expõe a diferença entre quem são e quem poderiam ser',
      activation: 'Você não é [rótulo limitante], você é [potencial real]',
      icon: Brain,
      color: 'purple',
      examples: [
        'Você não é um funcionário, você é um empreendedor esperando a oportunidade',
        'Você não é pequeno, você só não teve as ferramentas certas'
      ],
      implementation: 'Use para quebrar autoimagem limitante.',
      effectiveness: 83
    },
    {
      id: 'inveja_produtiva',
      name: 'Inveja Produtiva',
      category: 'Comparação',
      trigger: 'Comparação com pares',
      description: 'Transforma inveja em combustível para ação',
      activation: 'Enquanto você [situação atual], outros como você [resultado desejado]',
      icon: Target,
      color: 'orange',
      examples: [
        'Enquanto você hesita, seus concorrentes estão faturando',
        'Pessoas que começaram depois de você já estão na frente'
      ],
      implementation: 'Use com cuidado. Pode gerar resistência se mal aplicado.',
      effectiveness: 79
    }
  ];

  const categories = [...new Set(mentalDrivers.map(d => d.category))];
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredDrivers = selectedCategory 
    ? mentalDrivers.filter(d => d.category === selectedCategory)
    : mentalDrivers;

  const getColorClasses = (color: string) => {
    const colors = {
      red: 'from-red-600/20 to-red-800/20 border-red-500/30 text-red-300',
      yellow: 'from-yellow-600/20 to-yellow-800/20 border-yellow-500/30 text-yellow-300',
      orange: 'from-orange-600/20 to-orange-800/20 border-orange-500/30 text-orange-300',
      blue: 'from-blue-600/20 to-blue-800/20 border-blue-500/30 text-blue-300',
      purple: 'from-purple-600/20 to-purple-800/20 border-purple-500/30 text-purple-300',
      green: 'from-green-600/20 to-green-800/20 border-green-500/30 text-green-300'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <div className="flex items-center space-x-4 mb-4">
          <Zap className="w-8 h-8 text-yellow-400" />
          <div>
            <h2 className="text-2xl font-bold text-white">19 Drivers Mentais Universais</h2>
            <p className="text-gray-300">Sistema completo de gatilhos psicológicos para persuasão ética</p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1 rounded-full text-sm transition-all ${
              !selectedCategory 
                ? 'bg-purple-600/20 text-purple-300 border border-purple-400/30' 
                : 'bg-gray-800/50 text-gray-400 hover:text-white'
            }`}
          >
            Todos ({mentalDrivers.length})
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-sm transition-all ${
                selectedCategory === category
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-400/30'
                  : 'bg-gray-800/50 text-gray-400 hover:text-white'
              }`}
            >
              {category} ({mentalDrivers.filter(d => d.category === category).length})
            </button>
          ))}
        </div>
      </div>

      {/* Drivers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDrivers.map((driver) => {
          const Icon = driver.icon;
          return (
            <div
              key={driver.id}
              className={`bg-gradient-to-br ${getColorClasses(driver.color)} border rounded-xl p-6 cursor-pointer transition-all hover:scale-105 hover:shadow-2xl ${
                selectedDriver === driver.id ? 'ring-2 ring-purple-400' : ''
              }`}
              onClick={() => setSelectedDriver(selectedDriver === driver.id ? null : driver.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-6 h-6" />
                <div className="text-right">
                  <div className="text-xs font-medium opacity-80">{driver.category}</div>
                  <div className="text-lg font-bold">{driver.effectiveness}%</div>
                </div>
              </div>
              
              <h3 className="font-bold text-lg mb-2">{driver.name}</h3>
              <p className="text-sm opacity-90 mb-3">{driver.description}</p>
              
              <div className="border-t border-white/10 pt-3">
                <div className="text-xs font-medium opacity-70 mb-1">GATILHO:</div>
                <div className="text-sm font-medium">{driver.trigger}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed View */}
      {selectedDriver && (
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
          {(() => {
            const driver = mentalDrivers.find(d => d.id === selectedDriver);
            if (!driver) return null;
            
            const Icon = driver.icon;
            return (
              <>
                <div className={`bg-gradient-to-r ${getColorClasses(driver.color)} p-6 border-b border-white/10`}>
                  <div className="flex items-center space-x-4">
                    <Icon className="w-10 h-10" />
                    <div>
                      <h3 className="text-2xl font-bold">{driver.name}</h3>
                      <p className="opacity-90">{driver.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-white mb-3 flex items-center space-x-2">
                        <Lightbulb className="w-4 h-4 text-yellow-400" />
                        <span>Frase de Ativação</span>
                      </h4>
                      <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-purple-400">
                        <p className="text-purple-200 italic">"{driver.activation}"</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-white mb-3">Implementação</h4>
                      <p className="text-gray-300 text-sm">{driver.implementation}</p>
                      <div className="mt-2 flex items-center space-x-2">
                        <span className="text-sm text-gray-400">Eficácia:</span>
                        <div className="flex-1 bg-gray-800 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-yellow-500 h-2 rounded-full"
                            style={{ width: `${driver.effectiveness}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-white">{driver.effectiveness}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-white mb-3">Exemplos de Uso</h4>
                    <div className="space-y-3">
                      {driver.examples.map((example, index) => (
                        <div key={index} className="bg-black/30 p-4 rounded-lg">
                          <p className="text-gray-300">"{example}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* Usage Guide */}
      <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <h3 className="font-bold text-white mb-4 flex items-center space-x-2">
          <Brain className="w-5 h-5 text-purple-400" />
          <span>Guia de Uso Estratégico</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4">
            <h4 className="font-semibold text-blue-300 mb-2">Fase 1: Despertar</h4>
            <p className="text-sm text-gray-300 mb-2">Consciência do problema</p>
            <div className="space-y-1 text-xs text-blue-200">
              <div>• Diagnóstico Brutal</div>
              <div>• Ferida Exposta</div>
              <div>• Custo Invisível</div>
            </div>
          </div>
          
          <div className="bg-purple-600/10 border border-purple-600/30 rounded-lg p-4">
            <h4 className="font-semibold text-purple-300 mb-2">Fase 2: Desejo</h4>
            <p className="text-sm text-gray-300 mb-2">Amplificação da ambição</p>
            <div className="space-y-1 text-xs text-purple-200">
              <div>• Ambição Expandida</div>
              <div>• Troféu Secreto</div>
              <div>• Identidade Aprisionada</div>
            </div>
          </div>
          
          <div className="bg-orange-600/10 border border-orange-600/30 rounded-lg p-4">
            <h4 className="font-semibold text-orange-300 mb-2">Fase 3: Pressão</h4>
            <p className="text-sm text-gray-300 mb-2">Urgência e comparação</p>
            <div className="space-y-1 text-xs text-orange-200">
              <div>• Relógio Psicológico</div>
              <div>• Inveja Produtiva</div>
              <div>• Ambiente Vampiro</div>
            </div>
          </div>
          
          <div className="bg-green-600/10 border border-green-600/30 rounded-lg p-4">
            <h4 className="font-semibold text-green-300 mb-2">Fase 4: Direção</h4>
            <p className="text-sm text-gray-300 mb-2">Caminho e mentoria</p>
            <div className="space-y-1 text-xs text-green-200">
              <div>• Mentor Salvador</div>
              <div>• Método vs Sorte</div>
              <div>• Coragem Necessária</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriversPanel;