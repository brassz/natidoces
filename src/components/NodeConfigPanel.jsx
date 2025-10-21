import { useState, useEffect } from 'react'
import { 
  MessageSquare, 
  Volume2, 
  Image, 
  MousePointer, 
  ArrowRight, 
  Clock, 
  GitBranch,
  X,
  Save
} from 'lucide-react'

const NodeConfigPanel = ({ node, onUpdate, onClose }) => {
  const [config, setConfig] = useState(node?.data || {})

  useEffect(() => {
    setConfig(node?.data || {})
  }, [node])

  const handleSave = () => {
    if (node && onUpdate) {
      onUpdate({
        ...node,
        data: config
      })
    }
  }

  const renderConfigFields = () => {
    if (!node) return null

    switch (node.type) {
      case 'text':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Texto da Mensagem
              </label>
              <textarea
                value={config.text || ''}
                onChange={(e) => setConfig({ ...config, text: e.target.value })}
                placeholder="Digite sua mensagem aqui..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                rows={4}
              />
            </div>
          </div>
        )

      case 'audio':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Duração do Áudio
              </label>
              <input
                type="text"
                value={config.duration || ''}
                onChange={(e) => setConfig({ ...config, duration: e.target.value })}
                placeholder="00:30"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nome do Arquivo
              </label>
              <input
                type="text"
                value={config.filename || ''}
                onChange={(e) => setConfig({ ...config, filename: e.target.value })}
                placeholder="audio.mp3"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        )

      case 'image':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nome do Arquivo
              </label>
              <input
                type="text"
                value={config.filename || ''}
                onChange={(e) => setConfig({ ...config, filename: e.target.value })}
                placeholder="imagem.jpg"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Legenda
              </label>
              <input
                type="text"
                value={config.caption || ''}
                onChange={(e) => setConfig({ ...config, caption: e.target.value })}
                placeholder="Legenda da imagem..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        )

      case 'buttons':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Título
              </label>
              <input
                type="text"
                value={config.title || ''}
                onChange={(e) => setConfig({ ...config, title: e.target.value })}
                placeholder="Escolha uma opção:"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Botões
              </label>
              <div className="space-y-2">
                {(config.buttons || []).map((button, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={button}
                      onChange={(e) => {
                        const newButtons = [...(config.buttons || [])]
                        newButtons[index] = e.target.value
                        setConfig({ ...config, buttons: newButtons })
                      }}
                      placeholder={`Botão ${index + 1}`}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <button
                      onClick={() => {
                        const newButtons = (config.buttons || []).filter((_, i) => i !== index)
                        setConfig({ ...config, buttons: newButtons })
                      }}
                      className="px-2 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newButtons = [...(config.buttons || []), '']
                    setConfig({ ...config, buttons: newButtons })
                  }}
                  className="w-full px-3 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:border-primary-500 hover:text-primary-500 transition-colors"
                >
                  + Adicionar Botão
                </button>
              </div>
            </div>
          </div>
        )

      case 'redirect':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bloco de Destino
              </label>
              <input
                type="text"
                value={config.targetBlock || ''}
                onChange={(e) => setConfig({ ...config, targetBlock: e.target.value })}
                placeholder="Nome do bloco destino"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        )

      case 'delay':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Duração (segundos)
              </label>
              <input
                type="number"
                value={config.duration || ''}
                onChange={(e) => setConfig({ ...config, duration: parseInt(e.target.value) || 0 })}
                placeholder="5"
                min="1"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        )

      case 'condition':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Condição
              </label>
              <input
                type="text"
                value={config.condition || ''}
                onChange={(e) => setConfig({ ...config, condition: e.target.value })}
                placeholder="Se resposta = X"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        )

      default:
        return (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            Nenhuma configuração disponível para este tipo de nó.
          </div>
        )
    }
  }

  if (!node) return null

  const getNodeIcon = (type) => {
    switch (type) {
      case 'text': return <MessageSquare className="h-5 w-5" />
      case 'audio': return <Volume2 className="h-5 w-5" />
      case 'image': return <Image className="h-5 w-5" />
      case 'buttons': return <MousePointer className="h-5 w-5" />
      case 'redirect': return <ArrowRight className="h-5 w-5" />
      case 'delay': return <Clock className="h-5 w-5" />
      case 'condition': return <GitBranch className="h-5 w-5" />
      default: return null
    }
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getNodeIcon(node.type)}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Configuração
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          ID: {node.id}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {renderConfigFields()}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleSave}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
        >
          <Save className="h-4 w-4" />
          Salvar Alterações
        </button>
      </div>
    </div>
  )
}

export default NodeConfigPanel