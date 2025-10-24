import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, BarChart3, Settings, Heart, Package, TrendingUp, Users, ArrowRight } from 'lucide-react'
import MobileMenu from '../components/MobileMenu'
import DemoHelper from '../components/DemoHelper'
import { loadSampleData } from '../data/sampleData'

const NatiDocesHome = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [stats, setStats] = useState({
    todayOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0
  })

  // Carregar dados de exemplo na primeira vez
  useEffect(() => {
    loadSampleData()
    calculateQuickStats()
  }, [])

  // Atualizar horário a cada segundo
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const calculateQuickStats = () => {
    const orders = JSON.parse(localStorage.getItem('natiDoces_orders') || '[]')
    
    // Pedidos de hoje
    const today = new Date().toISOString().split('T')[0]
    const todayOrders = orders.filter(order => 
      order.deliveryDate.startsWith(today)
    ).length

    // Receita total
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalValue, 0)

    // Clientes únicos
    const uniqueCustomers = new Set(orders.map(order => order.customerName)).size

    setStats({
      todayOrders,
      totalRevenue,
      totalCustomers: uniqueCustomers
    })
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const menuItems = [
    {
      title: 'Gerenciar Encomendas',
      description: 'Visualizar, criar e editar pedidos de brigadeiros',
      icon: Package,
      link: '/orders',
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-600'
    },
    {
      title: 'Resumo Financeiro',
      description: 'Análise de vendas e relatórios por período',
      icon: BarChart3,
      link: '/financial',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      title: 'Painel Administrativo',
      description: 'Configurações, sabores e estatísticas gerais',
      icon: Settings,
      link: '/admin',
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    }
  ]

  const quickStats = [
    { label: 'Pedidos Hoje', value: stats.todayOrders.toString(), icon: Calendar, color: 'text-blue-600' },
    { label: 'Faturamento', value: `R$ ${stats.totalRevenue.toFixed(2)}`, icon: TrendingUp, color: 'text-green-600' },
    { label: 'Clientes', value: stats.totalCustomers.toString(), icon: Users, color: 'text-purple-600' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 pb-20 md:pb-0">
      {/* Header com Logo e Horário */}
      <div className="bg-white shadow-sm border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent" style={{ fontFamily: 'Pacifico, cursive' }}>
                  Nati Doces
                </h1>
                <p className="text-lg text-gray-600 mt-1">Sistema de Agendamento</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl p-4 inline-block">
              <p className="text-2xl font-bold text-gray-800">{formatTime(currentTime)}</p>
              <p className="text-sm text-gray-600 capitalize">{formatDate(currentTime)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6 text-center">
              <div className={`w-12 h-12 ${stat.color} bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Menu Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="group bg-white rounded-3xl shadow-sm border border-pink-100 p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-pink-600 transition-colors">
                {item.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {item.description}
              </p>
              
              <div className="flex items-center text-pink-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                <span>Acessar</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </Link>
          ))}
        </div>

        {/* Seção de Boas-vindas */}
        <div className="mt-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl shadow-xl text-white p-12 text-center">
          <Heart className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Pacifico, cursive' }}>
            Bem-vinda ao seu sistema!
          </h2>
          <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
            Gerencie suas encomendas de brigadeiros de forma simples e organizada. 
            Acompanhe vendas, controle estoque de sabores e mantenha suas clientes sempre satisfeitas! 💕
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Package className="w-6 h-6" />
              </div>
              <h4 className="font-semibold mb-2">Organize Pedidos</h4>
              <p className="text-pink-100 text-sm">Controle total sobre suas encomendas</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h4 className="font-semibold mb-2">Acompanhe Vendas</h4>
              <p className="text-pink-100 text-sm">Relatórios detalhados do seu negócio</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="font-semibold mb-2">Clientes Felizes</h4>
              <p className="text-pink-100 text-sm">Mantenha a qualidade que suas clientes amam</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-500">
          <p className="text-sm">
            Feito com 💕 para a Nati Doces | Sistema de Agendamento v1.0
          </p>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu />

      {/* Demo Helper */}
      <DemoHelper />
    </div>
  )
}

export default NatiDocesHome