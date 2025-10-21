import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import LoadingScreen from './LoadingScreen'

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const checkAuth = () => {
      try {
        const authData = localStorage.getItem('botflow-auth')
        if (authData) {
          const parsed = JSON.parse(authData)
          setIsAuthenticated(parsed.isAuthenticated === true)
        } else {
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error('Error checking authentication:', error)
        setIsAuthenticated(false)
      }
    }

    checkAuth()
  }, [])

  if (isAuthenticated === null) {
    return <LoadingScreen />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute