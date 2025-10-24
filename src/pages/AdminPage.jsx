import { useState, useEffect } from 'react'
import { Settings, Users, TrendingUp, Package, Heart, Eye, EyeOff, Shield, Save } from 'lucide-react'
import MobileMenu from '../components/MobileMenu'

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [adminSettings, setAdminSettings] = useState({
    availableFlavors: [
      'Brigadeiro Tradicional',
      'Beijinho',
      'Nutella',
      'Leite Ninho com Morango',
      'Oreo',
      'Prestígio',
      'Paçoca',
      'Churros',
      'Maracujá',
      'Limão'
    ],
    adminPassword: 'nati123'
  })
  const [newFlavor, setNewFlavor] = useState('')
  const [orders, setOrders] = useState([])

  useEffect(() => {
    // Carregar configurações do admin
    const savedSettings = localStorage.getItem('natiDoces_adminSettings')
    if (savedSettings) {
      setAdminSettings(JSON.parse(savedSettings))
    }

    // Carregar pedidos
    const savedOrders = localStorage.getItem('natiDoces_orders')
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }

    // Verificar se já está autenticado na sessão
    const isAuth = sessionStorage.getItem('natiDoces_adminAuth')
    if (isAuth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === adminSettings.adminPassword) {
      setIsAuthenticated(true)
      sessionStorage.setItem('natiDoces_adminAuth', 'true')
      setPassword('')
    } else {
      alert('Senha incorreta!')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('natiDoces_adminAuth')
  }

  const saveSettings = () => {
    localStorage.setItem('natiDoces_adminSettings', JSON.stringify(adminSettings))
    alert('Configurações salvas com sucesso!')
  }

  const addFlavor = () => {
    if (newFlavor.trim() && !adminSettings.availableFlavors.includes(newFlavor.trim())) {
      setAdminSettings({
        ...adminSettings,
        availableFlavors: [...adminSettings.availableFlavors, newFlavor.trim()]
      })
      setNewFlavor('')
    }
  }

  const removeFlavor = (flavorToRemove) => {
    setAdminSettings({
      ...adminSettings,
      availableFlavors: adminSettings.availableFlavors.filter(flavor => flavor !== flavorToRemove)
    })
  }

  const updatePassword = (newPassword) => {
    setAdminSettings({
      ...adminSettings,
      adminPassword: newPassword
    })
  }

  const getStats = () => {
    const totalOrders = orders.length
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalValue, 0)
    const deliveredOrders = orders.filter(order => order.status === 'delivered').length
    const pendingOrders = orders.filter(order => order.status === 'pending').length

    // Clientes únicos
    const uniqueCustomers = new Set(orders.map(order => order.customerName)).size

    // Sabor mais vendido
    const flavorStats = {}
    orders.forEach(order => {
      order.flavors.forEach(flavor => {
        flavorStats[flavor.name] = (flavorStats[flavor.name] || 0) + flavor.quantity
      })
    })
    const topFlavor = Object.entries(flavorStats).sort((a, b) => b[1] - a[1])[0]

    return {
      totalOrders,
      totalRevenue,
      deliveredOrders,
      pendingOrders,
      uniqueCustomers,
      topFlavor: topFlavor ? topFlavor[0] : 'Nenhum',
      topFlavorCount: topFlavor ? topFlavor[1] : 0
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent" style={{ fontFamily: 'Pacifico, cursive' }}>
              Painel Administrativo
            </h1>
            <p className="text-gray-600 mt-2">Nati Doces</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha de Administrador
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-300 focus:border-transparent pr-12"
                  placeholder="Digite a senha"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-3 rounded-xl font-medium transition-colors"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    )
  }

  const stats = getStats()

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent" style={{ fontFamily: 'Pacifico, cursive' }}>
                  Painel Administrativo
                </h1>
                <p className="text-sm text-gray-600">Configurações e estatísticas</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estatísticas Gerais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Pedidos</p>
                <p className="text-3xl font-bold text-blue-600">{stats.totalOrders}</p>
              </div>
              <Package className="w-12 h-12 text-blue-600 bg-blue-100 rounded-full p-3" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Receita Total</p>
                <p className="text-3xl font-bold text-green-600">R$ {stats.totalRevenue.toFixed(2)}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-green-600 bg-green-100 rounded-full p-3" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Clientes Únicos</p>
                <p className="text-3xl font-bold text-purple-600">{stats.uniqueCustomers}</p>
              </div>
              <Users className="w-12 h-12 text-purple-600 bg-purple-100 rounded-full p-3" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sabor Top</p>
                <p className="text-lg font-bold text-pink-600">{stats.topFlavor}</p>
                <p className="text-sm text-gray-500">{stats.topFlavorCount} vendidos</p>
              </div>
              <Heart className="w-12 h-12 text-pink-600 bg-pink-100 rounded-full p-3" />
            </div>
          </div>
        </div>

        {/* Status dos Pedidos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Status dos Pedidos</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <span className="font-medium text-gray-700">Pendentes</span>
                <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  {stats.pendingOrders}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="font-medium text-gray-700">Entregues</span>
                <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {stats.deliveredOrders}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Configurações de Segurança</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alterar Senha do Administrador
              </label>
              <input
                type="password"
                value={adminSettings.adminPassword}
                onChange={(e) => updatePassword(e.target.value)}
                className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                placeholder="Nova senha"
              />
            </div>
          </div>
        </div>

        {/* Gerenciamento de Sabores */}
        <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Gerenciar Sabores Disponíveis</h3>
          
          <div className="mb-6">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newFlavor}
                onChange={(e) => setNewFlavor(e.target.value)}
                placeholder="Novo sabor..."
                className="flex-1 px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && addFlavor()}
              />
              <button
                onClick={addFlavor}
                className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                Adicionar
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {adminSettings.availableFlavors.map((flavor, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-pink-50 rounded-lg border border-pink-200">
                <span className="font-medium text-gray-700">{flavor}</span>
                <button
                  onClick={() => removeFlavor(flavor)}
                  className="text-red-600 hover:text-red-800 font-medium text-sm"
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Botão Salvar */}
        <div className="flex justify-end">
          <button
            onClick={saveSettings}
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-3 rounded-xl font-medium flex items-center space-x-2 transition-colors"
          >
            <Save className="w-5 h-5" />
            <span>Salvar Configurações</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu />
    </div>
  )
}

export default AdminPage