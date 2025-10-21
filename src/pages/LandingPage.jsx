import { Link } from 'react-router-dom'
import { 
  ArrowRight, 
  MessageSquare, 
  Zap, 
  Users, 
  BarChart3, 
  Shield, 
  Smartphone,
  Play,
  CheckCircle,
  Star
} from 'lucide-react'

const LandingPage = () => {
  const features = [
    {
      icon: <MessageSquare className="h-8 w-8 text-primary-600" />,
      title: "Editor Visual Intuitivo",
      description: "Crie fluxos de conversa arrastando e soltando blocos. Interface simples e poderosa para qualquer pessoa usar."
    },
    {
      icon: <Zap className="h-8 w-8 text-primary-600" />,
      title: "Simulação em Tempo Real",
      description: "Teste seus fluxos instantaneamente. Veja como o bot responderia antes de publicar."
    },
    {
      icon: <Users className="h-8 w-8 text-primary-600" />,
      title: "Múltiplos Tipos de Blocos",
      description: "Textos, áudios, imagens, botões, condições lógicas e muito mais para criar conversas ricas."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-primary-600" />,
      title: "Analytics e Métricas",
      description: "Acompanhe o desempenho dos seus fluxos e otimize a experiência dos usuários."
    },
    {
      icon: <Shield className="h-8 w-8 text-primary-600" />,
      title: "Seguro e Confiável",
      description: "Seus dados protegidos com as melhores práticas de segurança da indústria."
    },
    {
      icon: <Smartphone className="h-8 w-8 text-primary-600" />,
      title: "Integração WhatsApp",
      description: "Conecte diretamente com a API oficial do WhatsApp Business para automação real."
    }
  ]

  const benefits = [
    "Interface drag & drop intuitiva",
    "Simulação em tempo real",
    "Exportação de fluxos em JSON",
    "Múltiplos tipos de mídia",
    "Lógica condicional avançada",
    "Integração com WhatsApp API",
    "Análise de conversas",
    "Templates pré-definidos"
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BF</span>
              </div>
              <span className="text-xl font-bold text-gray-900">BotFlow Studio</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/pricing"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Preços
              </Link>
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Entrar
              </Link>
              <Link
                to="/login"
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Teste Grátis
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Crie <span className="text-primary-600">Chatbots Inteligentes</span>
              <br />
              para WhatsApp
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              BotFlow Studio é a plataforma mais intuitiva para criar fluxos de conversa automáticos. 
              Arraste, solte e configure - sem código necessário. Teste grátis por 7 dias.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors flex items-center justify-center"
              >
                Teste Grátis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-lg text-lg font-medium transition-colors flex items-center justify-center">
                <Play className="mr-2 h-5 w-5" />
                Ver Demonstração
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Por que escolher BotFlow Studio?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A plataforma mais completa para criar e gerenciar chatbots profissionais
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Tudo que você precisa para criar chatbots profissionais
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                BotFlow Studio oferece todas as ferramentas necessárias para criar, 
                testar e otimizar seus fluxos de conversa automaticamente.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="aspect-video bg-gradient-to-br from-primary-100 to-blue-100 rounded-lg flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">BF</span>
                  </div>
                  <p className="text-gray-600">Preview do Editor</p>
                </div>
              </div>
              <p className="text-gray-600 text-center">
                Interface visual intuitiva para criar fluxos de conversa
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Planos que cabem no seu orçamento
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Escolha o plano ideal para seu negócio. Teste grátis por 7 dias em todos os planos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Mensal */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Mensal</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900">R$ 297</span>
                  <span className="text-gray-600">/mês</span>
                </div>
                <p className="text-gray-600 text-sm">Ideal para testar</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary-600" />
                  <span className="text-sm text-gray-700">Até 10 fluxos</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary-600" />
                  <span className="text-sm text-gray-700">Editor visual completo</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary-600" />
                  <span className="text-sm text-gray-700">Integração WhatsApp</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary-600" />
                  <span className="text-sm text-gray-700">Suporte por email</span>
                </li>
              </ul>
              <Link
                to="/login"
                className="block w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-900 py-3 rounded-lg font-medium transition-colors"
              >
                Teste Grátis
              </Link>
            </div>

            {/* Trimestral */}
            <div className="bg-primary-50 rounded-xl p-6 border-2 border-primary-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Mais Popular
                </div>
              </div>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Trimestral</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900">R$ 715,90</span>
                  <span className="text-gray-600">/trimestre</span>
                </div>
                <p className="text-gray-600 text-sm">Economia de 20%</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary-600" />
                  <span className="text-sm text-gray-700">Até 50 fluxos</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary-600" />
                  <span className="text-sm text-gray-700">Editor visual completo</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary-600" />
                  <span className="text-sm text-gray-700">Integração WhatsApp</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary-600" />
                  <span className="text-sm text-gray-700">Suporte prioritário</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary-600" />
                  <span className="text-sm text-gray-700">Analytics avançados</span>
                </li>
              </ul>
              <Link
                to="/login"
                className="block w-full text-center bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Teste Grátis
              </Link>
            </div>

            {/* Anual */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Anual</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900">R$ 2.499,90</span>
                  <span className="text-gray-600">/ano</span>
                </div>
                <p className="text-gray-600 text-sm">Economia de 30%</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary-600" />
                  <span className="text-sm text-gray-700">Fluxos ilimitados</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary-600" />
                  <span className="text-sm text-gray-700">Editor visual completo</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary-600" />
                  <span className="text-sm text-gray-700">Integração WhatsApp</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary-600" />
                  <span className="text-sm text-gray-700">Suporte 24/7</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary-600" />
                  <span className="text-sm text-gray-700">API personalizada</span>
                </li>
              </ul>
              <Link
                to="/login"
                className="block w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-900 py-3 rounded-lg font-medium transition-colors"
              >
                Teste Grátis
              </Link>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              to="/pricing"
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              Ver todos os planos e recursos →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Teste grátis por 7 dias. Sem compromisso, cancele quando quiser.
          </p>
          <Link
            to="/login"
            className="bg-white hover:bg-gray-100 text-primary-600 px-8 py-4 rounded-lg text-lg font-medium transition-colors inline-flex items-center"
          >
            Começar Teste Grátis
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">BF</span>
                </div>
                <span className="text-xl font-bold">BotFlow Studio</span>
              </div>
              <p className="text-gray-400">
                A plataforma mais intuitiva para criar chatbots profissionais.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Funcionalidades</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrações</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentação</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutoriais</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Comunidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BotFlow Studio. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage