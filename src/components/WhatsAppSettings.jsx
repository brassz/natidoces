import { useState } from 'react'
import { Settings, Key, Smartphone, Webhook } from 'lucide-react'

const WhatsAppSettings = () => {
  const [activeTab, setActiveTab] = useState('credentials')
  
  console.log('WhatsAppSettings component rendered')

  return (
    <div className="h-full bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
            <Settings className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Configurações WhatsApp API
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Gerencie suas instâncias, webhooks e conexões
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8 px-6">
          {[
            { id: 'credentials', label: 'Credenciais API', icon: Key },
            { id: 'instances', label: 'Instâncias', icon: Smartphone },
            { id: 'webhook', label: 'Webhook', icon: Webhook }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-green-500 text-green-600 dark:text-green-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'credentials' && (
          <div className="max-w-2xl">
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Configurações da API
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Configure suas credenciais para acessar a API oficial do WhatsApp Business
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Chave da API
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-white"
                  placeholder="Insira sua chave da API"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Segredo da API
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-white"
                  placeholder="Insira o segredo da API"
                />
              </div>

              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Salvar Credenciais
              </button>
            </div>
          </div>
        )}

        {activeTab === 'instances' && (
          <div>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Instâncias do WhatsApp
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Gerencie suas instâncias e conecte suas contas do WhatsApp
                  </p>
                </div>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Nova Instância
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Loja Principal</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">+5511999999999</p>
                  </div>
                  <span className="px-2 py-1 rounded-full text-xs font-medium text-green-600 bg-green-100">
                    Conectado
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                    Conectar
                  </button>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'webhook' && (
          <div className="max-w-2xl">
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Configuração do Webhook
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Configure o webhook para receber eventos do WhatsApp em tempo real
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  URL do Webhook
                </label>
                <input
                  type="url"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-white"
                  placeholder="https://seu-dominio.com/webhook"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Token de Verificação
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-white"
                  placeholder="Token para verificar o webhook"
                />
              </div>

              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Configurar Webhook
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default WhatsAppSettings