import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Plus, 
  Save, 
  Upload, 
  Download, 
  Play, 
  Moon, 
  Sun,
  FileText,
  MoreVertical,
  LogOut,
  User,
  MessageCircle
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const Header = ({ 
  flows, 
  currentFlow, 
  onCreateNew, 
  onExportFlow, 
  onImportFlow, 
  onSelectFlow 
}) => {
  const { isDark, toggleTheme } = useTheme()
  const [showFlowsMenu, setShowFlowsMenu] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('botflow-auth')
    navigate('/login')
  }

  const getUserInfo = () => {
    try {
      const authData = localStorage.getItem('botflow-auth')
      if (authData) {
        const parsed = JSON.parse(authData)
        return parsed
      }
    } catch (error) {
      console.error('Error getting user info:', error)
    }
    return null
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo e título */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">BF</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              BotFlow Studio
            </h1>
          </div>
        </div>

        {/* Menu de fluxos */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setShowFlowsMenu(!showFlowsMenu)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <FileText className="h-4 w-4" />
              <span className="text-sm font-medium">
                {currentFlow ? currentFlow.name : 'Selecionar Fluxo'}
              </span>
              <MoreVertical className="h-4 w-4" />
            </button>

            {showFlowsMenu && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2">
                <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Fluxos Salvos
                  </p>
                </div>
                {flows.length === 0 ? (
                  <div className="px-3 py-4 text-center text-gray-500 dark:text-gray-400">
                    Nenhum fluxo criado ainda
                  </div>
                ) : (
                  flows.map(flow => (
                    <button
                      key={flow.id}
                      onClick={() => {
                        onSelectFlow(flow)
                        setShowFlowsMenu(false)
                      }}
                      className={`w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                        currentFlow?.id === flow.id ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' : ''
                      }`}
                    >
                      <div className="font-medium text-sm">{flow.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(flow.updatedAt).toLocaleDateString('pt-BR')}
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Ações */}
        <div className="flex items-center gap-2">
          <button
            onClick={onCreateNew}
            className="flex items-center gap-2 px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Novo Fluxo</span>
          </button>

          <button
            onClick={() => navigate('/whatsapp-settings')}
            className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </button>

          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => onExportFlow(currentFlow)}
              disabled={!currentFlow}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="h-4 w-4" />
              <span>Exportar</span>
            </button>

            <label className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors cursor-pointer">
              <Upload className="h-4 w-4" />
              <span>Importar</span>
              <input
                type="file"
                accept=".json"
                onChange={onImportFlow}
                className="hidden"
              />
            </label>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">
                {getUserInfo()?.name || 'Usuário'}
              </span>
            </button>

            {showUserMenu && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2">
                <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {getUserInfo()?.name || 'Usuário'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {getUserInfo()?.email || 'email@exemplo.com'}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sair</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header