import { useState, useEffect } from 'react'
import { Calendar, Search, Plus, Filter, Download, Heart } from 'lucide-react'
import { format, parseISO, isAfter, isBefore, startOfDay, endOfDay } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import * as XLSX from 'xlsx'
import MobileMenu from '../components/MobileMenu'

const OrdersPage = () => {
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('')
  const [showNewOrderForm, setShowNewOrderForm] = useState(false)

  // Carregar pedidos do localStorage
  useEffect(() => {
    const savedOrders = localStorage.getItem('natiDoces_orders')
    if (savedOrders) {
      const parsedOrders = JSON.parse(savedOrders)
      setOrders(parsedOrders)
      setFilteredOrders(parsedOrders)
    }
  }, [])

  // Filtrar pedidos
  useEffect(() => {
    let filtered = orders

    // Filtro por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.contact.includes(searchTerm)
      )
    }

    // Filtro por status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter)
    }

    // Filtro por data
    if (dateFilter) {
      const filterDate = parseISO(dateFilter)
      filtered = filtered.filter(order => {
        const orderDate = parseISO(order.deliveryDate.split('T')[0])
        return format(orderDate, 'yyyy-MM-dd') === format(filterDate, 'yyyy-MM-dd')
      })
    }

    setFilteredOrders(filtered)
  }, [orders, searchTerm, statusFilter, dateFilter])

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      producing: 'bg-blue-100 text-blue-800 border-blue-200',
      ready: 'bg-green-100 text-green-800 border-green-200',
      delivered: 'bg-gray-100 text-gray-800 border-gray-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200'
    }
    return colors[status] || colors.pending
  }

  const getStatusText = (status) => {
    const texts = {
      pending: 'Pendente',
      producing: 'Produzindo',
      ready: 'Pronto',
      delivered: 'Entregue',
      cancelled: 'Cancelado'
    }
    return texts[status] || 'Pendente'
  }

  const exportToExcel = () => {
    const exportData = filteredOrders.map(order => ({
      'Cliente': order.customerName,
      'Contato': order.contact,
      'Data de Entrega': format(parseISO(order.deliveryDate), 'dd/MM/yyyy HH:mm', { locale: ptBR }),
      'Sabores': order.flavors.map(f => `${f.name} (${f.quantity}x)`).join(', '),
      'Valor Total': `R$ ${order.totalValue.toFixed(2)}`,
      'Status': getStatusText(order.status),
      'Observações': order.observations || ''
    }))

    const ws = XLSX.utils.json_to_sheet(exportData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Encomendas')
    XLSX.writeFile(wb, `nati-doces-encomendas-${format(new Date(), 'yyyy-MM-dd')}.xlsx`)
  }

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    )
    setOrders(updatedOrders)
    localStorage.setItem('natiDoces_orders', JSON.stringify(updatedOrders))
  }

  const deleteOrder = (orderId) => {
    if (window.confirm('Tem certeza que deseja excluir esta encomenda?')) {
      const updatedOrders = orders.filter(order => order.id !== orderId)
      setOrders(updatedOrders)
      localStorage.setItem('natiDoces_orders', JSON.stringify(updatedOrders))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent" style={{ fontFamily: 'Pacifico, cursive' }}>
                  Nati Doces
                </h1>
                <p className="text-sm text-gray-600">Sistema de Agendamento</p>
              </div>
            </div>
            <button
              onClick={() => setShowNewOrderForm(true)}
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-3 rounded-full font-medium flex items-center space-x-2 shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              <span>Nova Encomenda</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros */}
        <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por cliente ou contato..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-300 focus:border-transparent"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-300 focus:border-transparent"
            >
              <option value="all">Todos os status</option>
              <option value="pending">Pendente</option>
              <option value="producing">Produzindo</option>
              <option value="ready">Pronto</option>
              <option value="delivered">Entregue</option>
              <option value="cancelled">Cancelado</option>
            </select>

            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-300 focus:border-transparent"
            />

            <button
              onClick={exportToExcel}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-xl font-medium flex items-center justify-center space-x-2 transition-colors"
            >
              <Download className="w-5 h-5" />
              <span>Exportar Excel</span>
            </button>
          </div>
        </div>

        {/* Lista de Encomendas */}
        <div className="grid gap-6">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-12 text-center">
              <Heart className="w-16 h-16 text-pink-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhuma encomenda encontrada</h3>
              <p className="text-gray-500 mb-6">Que tal criar a primeira encomenda?</p>
              <button
                onClick={() => setShowNewOrderForm(true)}
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-3 rounded-full font-medium"
              >
                Criar Encomenda
              </button>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-800">{order.customerName}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-1">📱 {order.contact}</p>
                    <p className="text-gray-600 mb-3">
                      📅 {format(parseISO(order.deliveryDate), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-pink-600">R$ {order.totalValue.toFixed(2)}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">Sabores:</h4>
                  <div className="flex flex-wrap gap-2">
                    {order.flavors.map((flavor, index) => (
                      <span
                        key={index}
                        className="bg-pink-50 text-pink-700 px-3 py-1 rounded-full text-sm border border-pink-200"
                      >
                        {flavor.name} ({flavor.quantity}x - R$ {flavor.unitPrice.toFixed(2)})
                      </span>
                    ))}
                  </div>
                </div>

                {order.observations && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-1">Observações:</h4>
                    <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{order.observations}</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex space-x-2">
                    {order.status !== 'delivered' && order.status !== 'cancelled' && (
                      <>
                        {order.status === 'pending' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'producing')}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                          >
                            Iniciar Produção
                          </button>
                        )}
                        {order.status === 'producing' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'ready')}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                          >
                            Marcar como Pronto
                          </button>
                        )}
                        {order.status === 'ready' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'delivered')}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                          >
                            Marcar como Entregue
                          </button>
                        )}
                      </>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => deleteOrder(order.id)}
                      className="text-red-600 hover:text-red-800 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal de Nova Encomenda */}
      {showNewOrderForm && (
        <NewOrderModal
          onClose={() => setShowNewOrderForm(false)}
          onSave={(newOrder) => {
            const updatedOrders = [...orders, newOrder]
            setOrders(updatedOrders)
            localStorage.setItem('natiDoces_orders', JSON.stringify(updatedOrders))
            setShowNewOrderForm(false)
          }}
        />
      )}

      {/* Mobile Menu */}
      <MobileMenu />
    </div>
  )
}

// Componente do Modal de Nova Encomenda
const NewOrderModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    contact: '',
    deliveryDate: '',
    deliveryTime: '',
    flavors: [{ name: '', quantity: 1, unitPrice: 0 }],
    observations: ''
  })

  const availableFlavors = [
    'Brigadeiro Tradicional',
    'Beijinho',
    'Nutella',
    'Leite Ninho com Morango',
    'Oreo',
    'Prestígio',
    'Paçoca',
    'Churros',
    'Maracujá',
    'Limão',
    'Outro'
  ]

  const addFlavor = () => {
    setFormData({
      ...formData,
      flavors: [...formData.flavors, { name: '', quantity: 1, unitPrice: 0 }]
    })
  }

  const removeFlavor = (index) => {
    const newFlavors = formData.flavors.filter((_, i) => i !== index)
    setFormData({ ...formData, flavors: newFlavors })
  }

  const updateFlavor = (index, field, value) => {
    const newFlavors = [...formData.flavors]
    newFlavors[index] = { ...newFlavors[index], [field]: value }
    setFormData({ ...formData, flavors: newFlavors })
  }

  const calculateTotal = () => {
    return formData.flavors.reduce((total, flavor) => {
      return total + (flavor.quantity * flavor.unitPrice)
    }, 0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newOrder = {
      id: Date.now().toString(),
      customerName: formData.customerName,
      contact: formData.contact,
      deliveryDate: `${formData.deliveryDate}T${formData.deliveryTime}`,
      flavors: formData.flavors.filter(f => f.name && f.quantity > 0),
      totalValue: calculateTotal(),
      observations: formData.observations,
      status: 'pending',
      createdAt: new Date().toISOString()
    }

    onSave(newOrder)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-pink-100">
          <h2 className="text-2xl font-bold text-gray-800">Nova Encomenda</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome da Cliente *</label>
              <input
                type="text"
                required
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-300 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contato (WhatsApp) *</label>
              <input
                type="tel"
                required
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-300 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data de Entrega *</label>
              <input
                type="date"
                required
                value={formData.deliveryDate}
                onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-300 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Horário de Entrega *</label>
              <input
                type="time"
                required
                value={formData.deliveryTime}
                onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-300 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sabores *</label>
            {formData.flavors.map((flavor, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-3 p-4 bg-pink-50 rounded-xl">
                <select
                  value={flavor.name}
                  onChange={(e) => updateFlavor(index, 'name', e.target.value)}
                  className="px-3 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                  required
                >
                  <option value="">Selecione o sabor</option>
                  {availableFlavors.map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
                
                <input
                  type="number"
                  min="1"
                  placeholder="Qtd"
                  value={flavor.quantity}
                  onChange={(e) => updateFlavor(index, 'quantity', parseInt(e.target.value) || 1)}
                  className="px-3 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                />
                
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Preço unitário"
                  value={flavor.unitPrice}
                  onChange={(e) => updateFlavor(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                  className="px-3 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                />
                
                <button
                  type="button"
                  onClick={() => removeFlavor(index)}
                  className="text-red-600 hover:text-red-800 px-3 py-2 rounded-lg"
                  disabled={formData.flavors.length === 1}
                >
                  Remover
                </button>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addFlavor}
              className="bg-pink-100 hover:bg-pink-200 text-pink-700 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              + Adicionar Sabor
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Observações</label>
            <textarea
              value={formData.observations}
              onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-300 focus:border-transparent"
              placeholder="Ex: precisa ser entregue com laço rosa..."
            />
          </div>

          <div className="bg-pink-50 p-4 rounded-xl">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-700">Valor Total:</span>
              <span className="text-2xl font-bold text-pink-600">R$ {calculateTotal().toFixed(2)}</span>
            </div>
          </div>

          <div className="flex space-x-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-3 rounded-xl font-medium transition-colors"
            >
              Salvar Encomenda
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default OrdersPage