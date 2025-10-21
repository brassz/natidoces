import { useState, useCallback, useRef, useEffect } from 'react'
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { nodeTypes } from './nodes'

const FlowBuilder = ({ 
  flow, 
  onFlowChange, 
  onNodeSelect, 
  selectedNode, 
  isSimulating,
  simulationMessages,
  onSimulationUpdate 
}) => {
  const reactFlowWrapper = useRef(null)
  const [nodes, setNodes, onNodesChange] = useNodesState(flow?.nodes || [])
  const [edges, setEdges, onEdgesChange] = useEdgesState(flow?.edges || [])
  const [reactFlowInstance, setReactFlowInstance] = useState(null)

  // Atualizar nós e arestas quando o fluxo mudar
  useEffect(() => {
    if (flow) {
      setNodes(flow.nodes || [])
      setEdges(flow.edges || [])
    }
  }, [flow, setNodes, setEdges])

  // Salvar mudanças no fluxo apenas quando necessário
  useEffect(() => {
    if (flow && onFlowChange) {
      const timeoutId = setTimeout(() => {
        onFlowChange({
          ...flow,
          nodes,
          edges
        })
      }, 100)
      
      return () => clearTimeout(timeoutId)
    }
  }, [nodes, edges])

  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge(params, eds))
  }, [setEdges])

  const onDragOver = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback((event) => {
    event.preventDefault()

    if (!reactFlowWrapper.current || !reactFlowInstance) {
      return
    }

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
    const type = event.dataTransfer.getData('application/reactflow')

    if (typeof type === 'undefined' || !type) {
      return
    }

    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    })

    const newNode = {
      id: `${type}-${Date.now()}`,
      type,
      position,
      data: getDefaultDataForType(type),
    }

    setNodes((nds) => nds.concat(newNode))
  }, [reactFlowInstance, setNodes])

  const onNodeClick = useCallback((event, node) => {
    onNodeSelect(node)
  }, [onNodeSelect])

  const onNodeDoubleClick = useCallback((event, node) => {
    onNodeSelect(node)
  }, [onNodeSelect])

  const getDefaultDataForType = useCallback((type) => {
    switch (type) {
      case 'test':
        return { label: 'Nó de Teste' }
      case 'text':
        return { text: 'Digite sua mensagem aqui...' }
      case 'audio':
        return { duration: '00:30', filename: 'audio.mp3' }
      case 'image':
        return { filename: 'imagem.jpg', caption: '' }
      case 'buttons':
        return { 
          buttons: ['Opção 1', 'Opção 2', 'Opção 3'],
          title: 'Escolha uma opção:'
        }
      case 'redirect':
        return { targetBlock: 'Nome do bloco' }
      case 'delay':
        return { duration: 5 }
      case 'condition':
        return { condition: 'Se resposta = X' }
      default:
        return {}
    }
  }, [])

  if (!flow) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            Nenhum fluxo selecionado
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Selecione um fluxo existente ou crie um novo para começar
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900" ref={reactFlowWrapper}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeClick={onNodeClick}
          onNodeDoubleClick={onNodeDoubleClick}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="top-right"
          className="bg-gray-50 dark:bg-gray-900"
        >
          <Controls 
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
          />
          <MiniMap 
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            nodeColor={(node) => {
              switch (node.type) {
                case 'start': return '#22c55e'
                case 'text': return '#3b82f6'
                case 'audio': return '#8b5cf6'
                case 'image': return '#10b981'
                case 'buttons': return '#f59e0b'
                case 'redirect': return '#ef4444'
                case 'delay': return '#6b7280'
                case 'condition': return '#eab308'
                default: return '#6b7280'
              }
            }}
          />
          <Background 
            color="#e5e7eb" 
            gap={20} 
            size={1}
            className="dark:bg-gray-900"
          />
        </ReactFlow>
      </ReactFlowProvider>

      {/* Status de simulação */}
      {isSimulating && (
        <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-2 rounded-lg shadow-lg flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Simulação Ativa</span>
        </div>
      )}
    </div>
  )
}

export default FlowBuilder