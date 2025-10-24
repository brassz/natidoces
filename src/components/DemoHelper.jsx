import { useState } from 'react'
import { RefreshCw, Trash2, Download, Info } from 'lucide-react'
import { resetToSampleData, clearAllData } from '../data/sampleData'

const DemoHelper = () => {
  const [showHelper, setShowHelper] = useState(false)
  const [isResetting, setIsResetting] = useState(false)

  const handleReset = async () => {
    setIsResetting(true)
    resetToSampleData()
    setTimeout(() => {
      setIsResetting(false)
      window.location.reload()
    }, 1000)
  }

  const handleClear = () => {
    if (window.confirm('Tem certeza que deseja limpar todos os dados? Esta ação não pode ser desfeita.')) {
      clearAllData()
      window.location.reload()
    }
  }

  if (!showHelper) {
    return (
      <button
        onClick={() => setShowHelper(true)}
        className="fixed top-4 right-4 z-50 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
        title="Ajuda de Demonstração"
      >
        <Info className="w-5 h-5" />
      </button>
    )
  }

  return (
    <div className="fixed top-4 right-4 z-50 bg-white rounded-2xl shadow-xl border border-gray-200 p-4 w-80">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">Demo Helper</h3>
        <button
          onClick={() => setShowHelper(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>

      <div className="space-y-3 text-sm">
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
          <p className="text-blue-800 mb-2">
            <strong>🎯 Sistema de Demonstração</strong>
          </p>
          <p className="text-blue-700">
            Este é o sistema completo da Nati Doces com dados de exemplo pré-carregados.
          </p>
        </div>

        <div className="bg-green-50 p-3 rounded-lg border border-green-200">
          <p className="text-green-800 mb-2">
            <strong>✅ Funcionalidades Ativas:</strong>
          </p>
          <ul className="text-green-700 text-xs space-y-1">
            <li>• Gerenciamento de encomendas</li>
            <li>• Resumo financeiro com gráficos</li>
            <li>• Painel admin (senha: nati123)</li>
            <li>• Exportação para Excel</li>
            <li>• Design responsivo mobile</li>
          </ul>
        </div>

        <div className="space-y-2">
          <button
            onClick={handleReset}
            disabled={isResetting}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isResetting ? 'animate-spin' : ''}`} />
            <span>{isResetting ? 'Resetando...' : 'Resetar Dados'}</span>
          </button>

          <button
            onClick={handleClear}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Limpar Tudo</span>
          </button>
        </div>

        <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
          <p className="text-yellow-800 text-xs">
            <strong>💡 Dica:</strong> Todos os dados são salvos localmente no navegador. 
            Use "Resetar Dados" para voltar aos exemplos originais.
          </p>
        </div>
      </div>
    </div>
  )
}

export default DemoHelper