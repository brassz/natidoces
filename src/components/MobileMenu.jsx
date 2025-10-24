import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Package, BarChart3, Settings, Menu, X, Heart } from 'lucide-react'

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const menuItems = [
    { path: '/', icon: Home, label: 'Início' },
    { path: '/orders', icon: Package, label: 'Encomendas' },
    { path: '/financial', icon: BarChart3, label: 'Financeiro' },
    { path: '/admin', icon: Settings, label: 'Admin' }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Mobile Menu Button - Fixed */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full shadow-lg flex items-center justify-center transition-transform duration-200 transform hover:scale-110"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Mobile Menu */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-40 transform transition-transform duration-300 md:hidden ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent" style={{ fontFamily: 'Pacifico, cursive' }}>
                Nati Doces
              </h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="grid grid-cols-2 gap-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex flex-col items-center space-y-2 p-4 rounded-2xl transition-colors ${
                  isActive(item.path)
                    ? 'bg-pink-50 text-pink-600 border-2 border-pink-200'
                    : 'bg-gray-50 text-gray-600 hover:bg-pink-50 hover:text-pink-600'
                }`}
              >
                <item.icon className="w-8 h-8" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar - Always visible on mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-pink-100 z-30 md:hidden">
        <div className="grid grid-cols-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-3 px-2 transition-colors ${
                isActive(item.path)
                  ? 'text-pink-600 bg-pink-50'
                  : 'text-gray-400 hover:text-pink-600'
              }`}
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default MobileMenu