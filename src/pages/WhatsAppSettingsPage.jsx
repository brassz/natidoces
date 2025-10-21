import { useState, useEffect } from 'react'
import { 
  Settings, 
  Key, 
  Smartphone, 
  Webhook, 
  CheckCircle, 
  AlertCircle, 
  Plus, 
  Trash2, 
  Copy, 
  ExternalLink,
  QrCode,
  RefreshCw,
  Eye,
  EyeOff,
  ArrowLeft
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const WhatsAppSettingsPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('credentials')
  const [showApiKey, setShowApiKey] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [webhookStatus, setWebhookStatus] = useState('disconnected')
  
  // Estados para credenciais da API
  const [apiCredentials, setApiCredentials] = useState({
    apiKey: '',
    apiSecret: '',
    baseUrl: 'https://api.whatsapp.com',
    version: 'v17.0'
  })

  // Estados para instâncias
  const [instances, setInstances] = useState([
    {
      id: '1',
      name: 'Loja Principal',
      phoneNumber: '+5511999999999',
      status: 'connected',
      qrCode: null,
      lastSeen: '2024-01-15T10:30:00Z'
    }
  ])

  // Estados para webhook
  const [webhookConfig, setWebhookConfig] = useState({
    url: 'https://seu-dominio.com/webhook',
    verifyToken: 'botflow-verify-token',
    events: ['messages', 'message_status', 'message_reaction']
  })

  // Estados para nova instância
  const [newInstance, setNewInstance] = useState({
    name: '',
    description: ''
  })
  const [showModal, setShowModal] = useState(false)

  // Fechar modal com tecla Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setShowModal(false)
      }
    }

    if (showModal) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [showModal])

  const handleSaveCredentials = async () => {
    setIsLoading(true)
    try {
      // Simular salvamento
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Credenciais salvas:', apiCredentials)
      alert('Credenciais salvas com sucesso!')
    } catch (error) {
      console.error('Erro ao salvar credenciais:', error)
      alert('Erro ao salvar credenciais')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateInstance = async () => {
    if (!newInstance.name.trim()) {
      alert('Nome da instância é obrigatório')
      return
    }

    setIsLoading(true)
    try {
      const instance = {
        id: Date.now().toString(),
        name: newInstance.name,
        phoneNumber: '',
        status: 'disconnected',
        qrCode: null,
        lastSeen: null,
        description: newInstance.description
      }
      
      setInstances([...instances, instance])
      setNewInstance({ name: '', description: '' })
      setShowModal(false)
      alert('Instância criada com sucesso!')
    } catch (error) {
      console.error('Erro ao criar instância:', error)
      alert('Erro ao criar instância')
    } finally {
      setIsLoading(false)
    }
  }

  const handleConnectInstance = async (instanceId) => {
    setIsLoading(true)
    try {
      // Simular geração de QR Code
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const updatedInstances = instances.map(instance => 
        instance.id === instanceId 
          ? { ...instance, qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', status: 'waiting_qr' }
          : instance
      )
      setInstances(updatedInstances)
    } catch (error) {
      console.error('Erro ao conectar instância:', error)
      alert('Erro ao conectar instância')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteInstance = (instanceId) => {
    if (confirm('Tem certeza que deseja excluir esta instância?')) {
      setInstances(instances.filter(instance => instance.id !== instanceId))
    }
  }

  const handleSaveWebhook = async () => {
    setIsLoading(true)
    try {
      // Simular validação do webhook
      await new Promise(resolve => setTimeout(resolve, 1500))
      setWebhookStatus('connected')
      alert('Webhook configurado com sucesso!')
    } catch (error) {
      console.error('Erro ao configurar webhook:', error)
      alert('Erro ao configurar webhook')
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('Copiado para a área de transferência!')
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-green-600 bg-green-100'
      case 'disconnected': return 'text-red-600 bg-red-100'
      case 'waiting_qr': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'connected': return 'Conectado'
      case 'disconnected': return 'Desconectado'
      case 'waiting_qr': return 'Aguardando QR'
      default: return 'Desconhecido'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Voltar ao Dashboard</span>
              </button>
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
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-8">
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
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          {/* Credenciais da API */}
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
                  <div className="relative">
                    <input
                      type={showApiKey ? 'text' : 'password'}
                      value={apiCredentials.apiKey}
                      onChange={(e) => setApiCredentials({...apiCredentials, apiKey: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-white pr-10"
                      placeholder="Insira sua chave da API"
                    />
                    <button
                      type="button"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showApiKey ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Segredo da API
                  </label>
                  <input
                    type="password"
                    value={apiCredentials.apiSecret}
                    onChange={(e) => setApiCredentials({...apiCredentials, apiSecret: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-white"
                    placeholder="Insira o segredo da API"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      URL Base
                    </label>
                    <input
                      type="url"
                      value={apiCredentials.baseUrl}
                      onChange={(e) => setApiCredentials({...apiCredentials, baseUrl: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-white"
                      placeholder="https://api.whatsapp.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Versão da API
                    </label>
                    <select
                      value={apiCredentials.version}
                      onChange={(e) => setApiCredentials({...apiCredentials, version: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-white"
                    >
                      <option value="v17.0">v17.0</option>
                      <option value="v18.0">v18.0</option>
                      <option value="v19.0">v19.0</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleSaveCredentials}
                    disabled={isLoading}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {isLoading ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <CheckCircle className="h-4 w-4" />
                    )}
                    Salvar Credenciais
                  </button>
                  <button
                    onClick={() => copyToClipboard(apiCredentials.apiKey)}
                    className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    Copiar API Key
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Instâncias */}
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
                  <button
                    onClick={() => setShowModal(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Nova Instância
                  </button>
                </div>
              </div>

              {/* Lista de Instâncias */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {instances.map(instance => (
                  <div key={instance.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{instance.name}</h3>
                        {instance.phoneNumber && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">{instance.phoneNumber}</p>
                        )}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(instance.status)}`}>
                        {getStatusText(instance.status)}
                      </span>
                    </div>

                    {instance.qrCode && (
                      <div className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Escaneie o QR Code com seu WhatsApp:</p>
                        <div className="w-32 h-32 bg-gray-200 dark:bg-gray-600 rounded-lg mx-auto flex items-center justify-center">
                          <QrCode className="h-16 w-16 text-gray-400" />
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      {instance.status === 'disconnected' && (
                        <button
                          onClick={() => handleConnectInstance(instance.id)}
                          disabled={isLoading}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                        >
                          Conectar
                        </button>
                      )}
                      {instance.status === 'waiting_qr' && (
                        <button
                          onClick={() => handleConnectInstance(instance.id)}
                          disabled={isLoading}
                          className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                        >
                          Atualizar QR
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteInstance(instance.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal para Nova Instância */}
              {showModal && (
                <div 
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                  onClick={(e) => {
                    if (e.target === e.currentTarget) {
                      setShowModal(false)
                    }
                  }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                      Criar Nova Instância
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Nome da Instância
                        </label>
                        <input
                          type="text"
                          value={newInstance.name}
                          onChange={(e) => setNewInstance({...newInstance, name: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                          placeholder="Ex: Loja Principal"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Descrição (opcional)
                        </label>
                        <textarea
                          value={newInstance.description}
                          onChange={(e) => setNewInstance({...newInstance, description: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                          placeholder="Descrição da instância..."
                          rows={3}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                      <button
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handleCreateInstance}
                        disabled={isLoading}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50"
                      >
                        {isLoading ? 'Criando...' : 'Criar Instância'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Webhook */}
          {activeTab === 'webhook' && (
            <div className="max-w-2xl">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Configuração do Webhook
                  </h2>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    webhookStatus === 'connected' 
                      ? 'text-green-600 bg-green-100' 
                      : 'text-red-600 bg-red-100'
                  }`}>
                    {webhookStatus === 'connected' ? 'Conectado' : 'Desconectado'}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Configure o webhook para receber eventos do WhatsApp em tempo real
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    URL do Webhook
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      value={webhookConfig.url}
                      onChange={(e) => setWebhookConfig({...webhookConfig, url: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-white pr-10"
                      placeholder="https://seu-dominio.com/webhook"
                    />
                    <button
                      onClick={() => copyToClipboard(webhookConfig.url)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <Copy className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Token de Verificação
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={webhookConfig.verifyToken}
                      onChange={(e) => setWebhookConfig({...webhookConfig, verifyToken: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-white pr-10"
                      placeholder="Token para verificar o webhook"
                    />
                    <button
                      onClick={() => copyToClipboard(webhookConfig.verifyToken)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <Copy className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Eventos a Escutar
                  </label>
                  <div className="space-y-2">
                    {['messages', 'message_status', 'message_reaction', 'contacts', 'groups'].map(event => (
                      <label key={event} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={webhookConfig.events.includes(event)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setWebhookConfig({
                                ...webhookConfig,
                                events: [...webhookConfig.events, event]
                              })
                            } else {
                              setWebhookConfig({
                                ...webhookConfig,
                                events: webhookConfig.events.filter(ev => ev !== event)
                              })
                            }
                          }}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          {event.replace('_', ' ')}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                        Informações Importantes
                      </h4>
                      <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                        <li>• Certifique-se de que sua URL do webhook seja acessível publicamente</li>
                        <li>• Use HTTPS para maior segurança</li>
                        <li>• O token de verificação deve ser único e seguro</li>
                        <li>• Teste o webhook antes de ativar em produção</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleSaveWebhook}
                    disabled={isLoading}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {isLoading ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <CheckCircle className="h-4 w-4" />
                    )}
                    Configurar Webhook
                  </button>
                  <button
                    onClick={() => window.open(webhookConfig.url, '_blank')}
                    className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Testar URL
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WhatsAppSettingsPage