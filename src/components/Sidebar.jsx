import { useState } from 'react'
import { 
  MessageSquare, 
  Volume2, 
  Image, 
  MousePointer, 
  ArrowRight, 
  Clock, 
  GitBranch,
  Play,
  Settings,
  Trash2,
  Copy,
  Calendar
} from 'lucide-react'

const Sidebar = ({ 
  flows, 
  currentFlow, 
  selectedNode, 
  onSelectFlow, 
  onDeleteFlow, 
  onDuplicateFlow, 
  onUpdateNode 
}) => {
  const [activeTab, setActiveTab] = useState('flows')
  const [showNodeConfig, setShowNodeConfig] = useState(false)

  const nodeTypes = [
    { type: 'test', icon: MessageSquare, label: 'Nó de Teste', color: 'bg-blue-500' },
    { type: 'text', icon: MessageSquare, label: 'Mensagem de Texto', color: 'bg-blue-500' },
    { type: 'audio', icon: Volume2, label: 'Mensagem de Áudio', color: 'bg-purple-500' },
    { type: 'image', icon: Image, label: 'Imagem/Mídia', color: 'bg-green-500' },
    { type: 'buttons', icon: MousePointer, label: 'Botões de Opção', color: 'bg-orange-500' },
    { type: 'redirect', icon: ArrowRight, label: 'Redirecionamento', color: 'bg-red-500' },
    { type: 'delay', icon: Clock, label: 'Atraso/Espera', color: 'bg-gray-500' },
    { type: 'condition', icon: GitBranch, label: 'Condição Lógica', color: 'bg-yellow-500' },
  ]

  const handleDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('flows')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'flows'
              ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Fluxos
        </button>
        <button
          onClick={() => setActiveTab('blocks')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'blocks'
              ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Blocos
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'flows' && (
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Meus Fluxos
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {flows.length} fluxos
              </span>
            </div>

            {flows.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <Play className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Nenhum fluxo criado ainda
                </p>
                <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                  Clique em "Novo Fluxo" para começar
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {flows.map(flow => (
                  <div
                    key={flow.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                      currentFlow?.id === flow.id
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                    onClick={() => onSelectFlow(flow)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                          {flow.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(flow.updatedAt).toLocaleDateString('pt-BR')}</span>
                          <span>•</span>
                          <span>{flow.nodes.length} blocos</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 ml-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            onDuplicateFlow(flow)
                          }}
                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                          title="Duplicar"
                        >
                          <Copy className="h-3 w-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            onDeleteFlow(flow.id)
                          }}
                          className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 rounded transition-colors"
                          title="Excluir"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'blocks' && (
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Blocos Disponíveis
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Arraste os blocos para o editor para criar seu fluxo
            </p>

            <div className="space-y-2">
              {nodeTypes.map((nodeType) => {
                const Icon = nodeType.icon
                return (
                  <div
                    key={nodeType.type}
                    draggable
                    onDragStart={(event) => handleDragStart(event, nodeType.type)}
                    className={`flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 cursor-move hover:shadow-md transition-all group ${
                      selectedNode?.type === nodeType.type ? 'ring-2 ring-primary-500' : ''
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg ${nodeType.color} flex items-center justify-center`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {nodeType.label}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Configurações do nó selecionado */}
      {selectedNode && activeTab === 'blocks' && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-gray-500" />
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Configurações
              </h4>
            </div>
            <button
              onClick={() => setShowNodeConfig(!showNodeConfig)}
              className="text-xs text-primary-600 hover:text-primary-700 font-medium"
            >
              {showNodeConfig ? 'Ocultar' : 'Editar'}
            </button>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tipo
              </label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {nodeTypes.find(nt => nt.type === selectedNode.type)?.label}
              </p>
            </div>
            {showNodeConfig && (
              <div className="space-y-2">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Duplo clique no nó para abrir configurações detalhadas
                </div>
                <button
                  onClick={() => {
                    // Forçar abertura do painel de configuração
                    console.log('Forçando abertura do painel de configuração')
                  }}
                  className="w-full px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm transition-colors"
                >
                  Editar Bloco
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Sidebar