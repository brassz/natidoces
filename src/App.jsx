import { useState, useEffect, useCallback } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Layout from './components/Layout'
import FlowBuilder from './components/FlowBuilder'
import SimulationPanel from './components/SimulationPanel'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import NodeConfigPanel from './components/NodeConfigPanel'
import ErrorBoundary from './components/ErrorBoundary'
import LoadingScreen from './components/LoadingScreen'
import ProtectedRoute from './components/ProtectedRoute'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import PricingPage from './pages/PricingPage'
import WhatsAppSettingsPage from './pages/WhatsAppSettingsPage'
import Dashboard from './components/Dashboard'
// Nati Doces Pages
import NatiDocesHome from './pages/NatiDocesHome'
import OrdersPage from './pages/OrdersPage'
import FinancialSummaryPage from './pages/FinancialSummaryPage'
import AdminPage from './pages/AdminPage'

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <Routes>
            {/* Nati Doces Routes */}
            <Route path="/" element={<NatiDocesHome />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/financial" element={<FinancialSummaryPage />} />
            <Route path="/admin" element={<AdminPage />} />
            
            {/* Original Routes */}
            <Route path="/botflow" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/whatsapp-settings" 
              element={
                <ProtectedRoute>
                  <WhatsAppSettingsPage />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App