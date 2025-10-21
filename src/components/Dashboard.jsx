import { useState, useEffect, useCallback } from 'react'
import Layout from './Layout'
import FlowBuilder from './FlowBuilder'
import SimulationPanel from './SimulationPanel'
import Sidebar from './Sidebar'
import Header from './Header'
import NodeConfigPanel from './NodeConfigPanel'

const Dashboard = () => {
  const [flows, setFlows] = useState([])
  const [currentFlow, setCurrentFlow] = useState(null)
  const [selectedNode, setSelectedNode] = useState(null)
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationMessages, setSimulationMessages] = useState([])
  const [showNodeConfig, setShowNodeConfig] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Carregar fluxos salvos do localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedFlows = localStorage.getItem('botflow-flows')
      if (savedFlows) {
        setFlows(JSON.parse(savedFlows))
      }
      setIsLoading(false)
    }
  }, [])

  // Salvar fluxos no localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && flows.length > 0) {
      localStorage.setItem('botflow-flows', JSON.stringify(flows))
    }
  }, [flows])

  const createNewFlow = useCallback(() => {
    const newFlow = {
      id: Date.now().toString(),
      name: `Novo Fluxo ${flows.length + 1}`,
      nodes: [
        {
          id: '1',
          type: 'start',
          position: { x: 100, y: 100 },
          data: { label: 'Início' }
        }
      ],
      edges: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    setFlows(prev => [...prev, newFlow])
    setCurrentFlow(newFlow)
  }, [flows.length])

  const updateFlow = useCallback((updatedFlow) => {
    setFlows(prev => prev.map(flow => 
      flow.id === updatedFlow.id 
        ? { ...updatedFlow, updatedAt: new Date().toISOString() }
        : flow
    ))
    setCurrentFlow(updatedFlow)
  }, [])

  const deleteFlow = (flowId) => {
    setFlows(prev => prev.filter(flow => flow.id !== flowId))
    if (currentFlow?.id === flowId) {
      setCurrentFlow(null)
    }
  }

  const duplicateFlow = (flow) => {
    const duplicatedFlow = {
      ...flow,
      id: Date.now().toString(),
      name: `${flow.name} (Cópia)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setFlows(prev => [...prev, duplicatedFlow])
  }

  const exportFlow = (flow) => {
    const dataStr = JSON.stringify(flow, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `fluxo-${flow.name.toLowerCase().replace(/\s+/g, '-')}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const importFlow = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedFlow = JSON.parse(e.target.result)
          importedFlow.id = Date.now().toString()
          importedFlow.createdAt = new Date().toISOString()
          importedFlow.updatedAt = new Date().toISOString()
          setFlows(prev => [...prev, importedFlow])
        } catch (error) {
          alert('Erro ao importar fluxo. Verifique se o arquivo está correto.')
        }
      }
      reader.readAsText(file)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-primary-600 rounded-lg flex items-center justify-center animate-bounce">
            <span className="text-white font-bold text-xl">BF</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Carregando BotFlow Studio
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Preparando sua área de trabalho...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header 
        flows={flows}
        currentFlow={currentFlow}
        onCreateNew={createNewFlow}
        onExportFlow={exportFlow}
        onImportFlow={importFlow}
        onSelectFlow={setCurrentFlow}
      />
      
      <Layout>
        <Sidebar 
          flows={flows}
          currentFlow={currentFlow}
          selectedNode={selectedNode}
          onSelectFlow={setCurrentFlow}
          onDeleteFlow={deleteFlow}
          onDuplicateFlow={duplicateFlow}
          onUpdateNode={updateFlow}
        />
        
        <div className="flex-1 flex">
          <div className="flex-1">
            <FlowBuilder 
              flow={currentFlow}
              onFlowChange={updateFlow}
              onNodeSelect={(node) => {
                console.log('Node selected:', node)
                setSelectedNode(node)
                if (node) setShowNodeConfig(true)
              }}
              selectedNode={selectedNode}
              isSimulating={isSimulating}
              simulationMessages={simulationMessages}
              onSimulationUpdate={setSimulationMessages}
            />
          </div>
          
          {showNodeConfig && selectedNode && (
            <NodeConfigPanel 
              node={selectedNode}
              onUpdate={(updatedNode) => {
                if (currentFlow) {
                  const updatedNodes = currentFlow.nodes.map(node => 
                    node.id === updatedNode.id ? updatedNode : node
                  )
                  updateFlow({ ...currentFlow, nodes: updatedNodes })
                }
              }}
              onClose={() => setShowNodeConfig(false)}
            />
          )}
          
          <SimulationPanel 
            isSimulating={isSimulating}
            onToggleSimulation={setIsSimulating}
            messages={simulationMessages}
            flow={currentFlow}
          />
        </div>
      </Layout>
    </div>
  )
}

export default Dashboard