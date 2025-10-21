import { useState } from 'react'

const SimpleFlowBuilder = ({ flow, onFlowChange, onNodeSelect, selectedNode }) => {
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
    <div className="h-full bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {flow.name}
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Editor de Fluxo (Versão Simplificada)
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            O editor visual será carregado aqui. Por enquanto, esta é uma versão simplificada para debug.
          </p>
          <div className="space-y-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Nós: {flow.nodes.length}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Conexões: {flow.edges.length}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Criado em: {new Date(flow.createdAt).toLocaleString('pt-BR')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimpleFlowBuilder