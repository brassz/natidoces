import { useState, useEffect } from 'react'
import { TrendingUp, Calendar, DollarSign, Package, Heart, BarChart3 } from 'lucide-react'
import { format, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, parseISO, isWithinInterval } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import MobileMenu from '../components/MobileMenu'

const FinancialSummaryPage = () => {
  const [orders, setOrders] = useState([])
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [customDateRange, setCustomDateRange] = useState({ start: '', end: '' })

  useEffect(() => {
    const savedOrders = localStorage.getItem('natiDoces_orders')
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }
  }, [])

  const getDateRange = () => {
    const now = new Date()
    
    switch (selectedPeriod) {
      case 'today':
        return { start: startOfDay(now), end: endOfDay(now) }
      case 'week':
        return { start: startOfWeek(now, { locale: ptBR }), end: endOfWeek(now, { locale: ptBR }) }
      case 'month':
        return { start: startOfMonth(now), end: endOfMonth(now) }
      case 'custom':
        return {
          start: customDateRange.start ? parseISO(customDateRange.start) : startOfMonth(now),
          end: customDateRange.end ? parseISO(customDateRange.end) : endOfMonth(now)
        }
      default:
        return { start: startOfMonth(now), end: endOfMonth(now) }
    }
  }

  const getFilteredOrders = () => {
    const { start, end } = getDateRange()
    
    return orders.filter(order => {
      const orderDate = parseISO(order.deliveryDate)
      return isWithinInterval(orderDate, { start, end }) && order.status !== 'cancelled'
    })
  }

  const calculateStats = () => {
    const filteredOrders = getFilteredOrders()
    
    const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.totalValue, 0)
    const totalOrders = filteredOrders.length
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0
    
    // Contar brigadeiros por sabor
    const flavorStats = {}
    filteredOrders.forEach(order => {
      order.flavors.forEach(flavor => {
        if (flavorStats[flavor.name]) {
          flavorStats[flavor.name].quantity += flavor.quantity
          flavorStats[flavor.name].revenue += flavor.quantity * flavor.unitPrice
        } else {
          flavorStats[flavor.name] = {
            quantity: flavor.quantity,
            revenue: flavor.quantity * flavor.unitPrice
          }
        }
      })
    })

    // Ordenar sabores por quantidade
    const topFlavors = Object.entries(flavorStats)
      .map(([name, stats]) => ({ name, ...stats }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5)

    // Estatísticas por status
    const statusStats = {}
    filteredOrders.forEach(order => {
      statusStats[order.status] = (statusStats[order.status] || 0) + 1
    })

    // Clientes frequentes
    const customerStats = {}
    filteredOrders.forEach(order => {
      if (customerStats[order.customerName]) {
        customerStats[order.customerName].orders += 1
        customerStats[order.customerName].totalSpent += order.totalValue
      } else {
        customerStats[order.customerName] = {
          orders: 1,
          totalSpent: order.totalValue,
          contact: order.contact
        }
      }
    })

    const topCustomers = Object.entries(customerStats)
      .map(([name, stats]) => ({ name, ...stats }))
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, 5)

    return {
      totalRevenue,
      totalOrders,
      averageOrderValue,
      topFlavors,
      statusStats,
      topCustomers
    }
  }

  const stats = calculateStats()
  const { start, end } = getDateRange()

  const getStatusText = (status) => {
    const texts = {
      pending: 'Pendente',
      producing: 'Produzindo',
      ready: 'Pronto',
      delivered: 'Entregue'
    }
    return texts[status] || status
  }

  const getPeriodText = () => {
    switch (selectedPeriod) {
      case 'today':
        return 'Hoje'
      case 'week':
        return 'Esta Semana'
      case 'month':
        return 'Este Mês'
      case 'custom':
        return `${format(start, 'dd/MM/yyyy')} - ${format(end, 'dd/MM/yyyy')}`
      default:
        return 'Este Mês'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent" style={{ fontFamily: 'Pacifico, cursive' }}>
                Resumo Financeiro
              </h1>
              <p className="text-sm text-gray-600">Análise de vendas e performance</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros de Período */}
        <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex space-x-2">
              {[
                { value: 'today', label: 'Hoje' },
                { value: 'week', label: 'Esta Semana' },
                { value: 'month', label: 'Este Mês' },
                { value: 'custom', label: 'Personalizado' }
              ].map(period => (
                <button
                  key={period.value}
                  onClick={() => setSelectedPeriod(period.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedPeriod === period.value
                      ? 'bg-pink-500 text-white'
                      : 'bg-pink-100 text-pink-700 hover:bg-pink-200'
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>

            {selectedPeriod === 'custom' && (
              <div className="flex space-x-2">
                <input
                  type="date"
                  value={customDateRange.start}
                  onChange={(e) => setCustomDateRange({ ...customDateRange, start: e.target.value })}
                  className="px-3 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                />
                <input
                  type="date"
                  value={customDateRange.end}
                  onChange={(e) => setCustomDateRange({ ...customDateRange, end: e.target.value })}
                  className="px-3 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                />
              </div>
            )}
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            Período: <span className="font-medium">{getPeriodText()}</span>
          </div>
        </div>

        {/* Cards de Estatísticas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Receita Total</p>
                <p className="text-3xl font-bold text-green-600">R$ {stats.totalRevenue.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Pedidos</p>
                <p className="text-3xl font-bold text-blue-600">{stats.totalOrders}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ticket Médio</p>
                <p className="text-3xl font-bold text-purple-600">R$ {stats.averageOrderValue.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Sabores */}
          <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <Heart className="w-5 h-5 text-pink-500 mr-2" />
              Sabores Mais Vendidos
            </h3>
            <div className="space-y-4">
              {stats.topFlavors.map((flavor, index) => (
                <div key={flavor.name} className="flex items-center justify-between p-4 bg-pink-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{flavor.name}</p>
                      <p className="text-sm text-gray-600">{flavor.quantity} unidades</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-pink-600">R$ {flavor.revenue.toFixed(2)}</p>
                  </div>
                </div>
              ))}
              {stats.topFlavors.length === 0 && (
                <p className="text-gray-500 text-center py-8">Nenhum sabor vendido no período</p>
              )}
            </div>
          </div>

          {/* Status dos Pedidos */}
          <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Status dos Pedidos</h3>
            <div className="space-y-4">
              {Object.entries(stats.statusStats).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="font-medium text-gray-700">{getStatusText(status)}</span>
                  <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                    {count}
                  </span>
                </div>
              ))}
              {Object.keys(stats.statusStats).length === 0 && (
                <p className="text-gray-500 text-center py-8">Nenhum pedido no período</p>
              )}
            </div>
          </div>

          {/* Clientes Frequentes */}
          <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6 lg:col-span-2">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Melhores Clientes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.topCustomers.map((customer, index) => (
                <div key={customer.name} className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-100">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{customer.name}</p>
                      <p className="text-sm text-gray-600">{customer.contact}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Pedidos:</span>
                      <span className="text-sm font-medium">{customer.orders}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total gasto:</span>
                      <span className="text-sm font-medium text-pink-600">R$ {customer.totalSpent.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
              {stats.topCustomers.length === 0 && (
                <div className="col-span-full">
                  <p className="text-gray-500 text-center py-8">Nenhum cliente no período</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Resumo do Período */}
        <div className="mt-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl shadow-lg text-white p-8">
          <h3 className="text-2xl font-bold mb-4">Resumo do Período</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold">{stats.totalOrders}</p>
              <p className="text-pink-100">Encomendas</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">
                {stats.topFlavors.reduce((sum, flavor) => sum + flavor.quantity, 0)}
              </p>
              <p className="text-pink-100">Brigadeiros</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">R$ {stats.totalRevenue.toFixed(2)}</p>
              <p className="text-pink-100">Faturamento</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{Object.keys(stats.statusStats).reduce((sum, status) => sum + (stats.statusStats[status] || 0), 0)}</p>
              <p className="text-pink-100">Total Geral</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu />
    </div>
  )
}

export default FinancialSummaryPage