import { useState, useEffect, useRef } from 'react'
import { 
  Play, 
  Pause, 
  RotateCcw, 
  MessageSquare, 
  Send, 
  User, 
  Bot,
  Volume2,
  Image,
  MousePointer
} from 'lucide-react'

const SimulationPanel = ({ 
  isSimulating, 
  onToggleSimulation, 
  messages, 
  flow 
}) => {
  const [inputMessage, setInputMessage] = useState('')
  const [simulationMessages, setSimulationMessages] = useState([])
  const [currentNode, setCurrentNode] = useState(null)
  const messagesEndRef = useRef(null)

  // Inicializar simulação
  useEffect(() => {
    if (isSimulating && flow) {
      const startNode = flow.nodes.find(node => node.type === 'start')
      if (startNode) {
        setCurrentNode(startNode)
        setSimulationMessages([{
          id: '1',
          type: 'bot',
          content: 'Bem-vindo! Como posso ajudá-lo hoje?',
          timestamp: new Date(),
          nodeId: startNode.id
        }])
      }
    } else {
      setSimulationMessages([])
      setCurrentNode(null)
    }
  }, [isSimulating, flow])

  // Auto scroll para última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [simulationMessages])

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !isSimulating) return

    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setSimulationMessages(prev => [...prev, userMessage])
    setInputMessage('')

    // Simular resposta do bot baseada no fluxo
    setTimeout(() => {
      simulateBotResponse(inputMessage)
    }, 1000)
  }

  const simulateBotResponse = (userInput) => {
    if (!currentNode || !flow) return

    // Encontrar próximo nó baseado na entrada do usuário
    const nextEdge = flow.edges.find(edge => edge.source === currentNode.id)
    
    if (nextEdge) {
      const nextNode = flow.nodes.find(node => node.id === nextEdge.target)
      if (nextNode) {
        setCurrentNode(nextNode)
        
        const botMessage = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: getNodeMessage(nextNode),
          timestamp: new Date(),
          nodeId: nextNode.id,
          nodeType: nextNode.type
        }

        setSimulationMessages(prev => [...prev, botMessage])
      }
    } else {
      // Se não há próximo nó, enviar mensagem padrão
      const botMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: 'Obrigado pela sua mensagem! Como posso ajudá-lo?',
        timestamp: new Date(),
        nodeId: currentNode.id,
        nodeType: 'end'
      }

      setSimulationMessages(prev => [...prev, botMessage])
    }
  }

  const getNodeMessage = (node) => {
    switch (node.type) {
      case 'text':
        return node.data.text || 'Mensagem de texto'
      case 'audio':
        return '🔊 Enviando mensagem de áudio...'
      case 'image':
        return `📷 Enviando imagem: ${node.data.filename || 'imagem.jpg'}`
      case 'buttons':
        return node.data.title || 'Escolha uma opção:'
      case 'redirect':
        return `Redirecionando para: ${node.data.targetBlock}`
      case 'delay':
        return `⏳ Aguardando ${node.data.duration || 5} segundos...`
      case 'condition':
        return `Verificando condição: ${node.data.condition}`
      default:
        return 'Resposta do bot'
    }
  }

  const resetSimulation = () => {
    setSimulationMessages([])
    setCurrentNode(null)
    if (flow) {
      const startNode = flow.nodes.find(node => node.type === 'start')
      if (startNode) {
        setCurrentNode(startNode)
        setSimulationMessages([{
          id: '1',
          type: 'bot',
          content: 'Bem-vindo! Como posso ajudá-lo hoje?',
          timestamp: new Date(),
          nodeId: startNode.id
        }])
      }
    }
  }

  const getMessageIcon = (message) => {
    if (message.type === 'user') return <User className="h-4 w-4" />
    
    switch (message.nodeType) {
      case 'audio': return <Volume2 className="h-4 w-4" />
      case 'image': return <Image className="h-4 w-4" />
      case 'buttons': return <MousePointer className="h-4 w-4" />
      default: return <Bot className="h-4 w-4" />
    }
  }

  const renderButtons = (message) => {
    if (message.nodeType === 'buttons' && message.nodeId) {
      const node = flow?.nodes.find(n => n.id === message.nodeId)
      if (node && node.data.buttons) {
        return (
          <div className="flex flex-wrap gap-2 mt-3">
            {node.data.buttons.map((button, index) => (
              <button
                key={index}
                onClick={() => {
                  setInputMessage(button)
                  handleSendMessage()
                }}
                className="px-3 py-2 bg-primary-100 hover:bg-primary-200 dark:bg-primary-900/20 dark:hover:bg-primary-900/40 text-primary-700 dark:text-primary-300 rounded-lg text-sm transition-colors"
              >
                {button}
              </button>
            ))}
          </div>
        )
      }
    }
    return null
  }

  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Simulação
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleSimulation}
              className={`p-2 rounded-lg transition-colors ${
                isSimulating 
                  ? 'bg-red-100 hover:bg-red-200 text-red-600 dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:text-red-400' 
                  : 'bg-green-100 hover:bg-green-200 text-green-600 dark:bg-green-900/20 dark:hover:bg-green-900/40 dark:text-green-400'
              }`}
            >
              {isSimulating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <button
              onClick={resetSimulation}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-400 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {!flow ? (
          <div className="text-center py-4">
            <MessageSquare className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Selecione um fluxo para simular
            </p>
          </div>
        ) : (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                isSimulating ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
              }`}></div>
              <span>{isSimulating ? 'Simulação ativa' : 'Simulação pausada'}</span>
            </div>
            {currentNode && (
              <div className="mt-1 text-xs">
                Nó atual: {currentNode.type}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {simulationMessages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.type === 'bot' && (
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                {getMessageIcon(message)}
              </div>
            )}
            
            <div className={`max-w-[70%] ${message.type === 'user' ? 'order-first' : ''}`}>
              <div
                className={`px-3 py-2 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                {renderButtons(message)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {message.timestamp.toLocaleTimeString('pt-BR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>

            {message.type === 'user' && (
              <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      {isSimulating && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Digite sua mensagem..."
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="p-2 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SimulationPanel