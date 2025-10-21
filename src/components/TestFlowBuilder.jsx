import { useState, useCallback, useRef } from 'react'
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

const TestFlowBuilder = ({ flow, onFlowChange, onNodeSelect }) => {
  const reactFlowWrapper = useRef(null)
  const [nodes, setNodes, onNodesChange] = useNodesState(flow?.nodes || [])
  const [edges, setEdges, onEdgesChange] = useEdgesState(flow?.edges || [])
  const [reactFlowInstance, setReactFlowInstance] = useState(null)

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
      type: 'default',
      position,
      data: { label: `Nó ${type}` },
    }

    setNodes((nds) => nds.concat(newNode))
  }, [reactFlowInstance, setNodes])

  const onNodeClick = useCallback((event, node) => {
    onNodeSelect(node)
  }, [onNodeSelect])

  if (!flow) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            Nenhum fluxo selecionado
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Crie um novo fluxo para começar
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
          fitView
          attributionPosition="top-right"
        >
          <Controls />
          <MiniMap />
          <Background />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  )
}

export default TestFlowBuilder