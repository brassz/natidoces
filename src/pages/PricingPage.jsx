import { Link } from 'react-router-dom'
import { 
  Check, 
  ArrowRight, 
  Star,
  ArrowLeft
} from 'lucide-react'

const PricingPage = () => {
  const plans = [
    {
      name: "Mensal",
      price: "R$ 297",
      period: "/mês",
      description: "Ideal para testar o sistema",
      features: [
        "Até 10 fluxos de chatbot",
        "Editor visual completo",
        "Simulação em tempo real",
        "Integração WhatsApp API",
        "Suporte por email",
        "Exportação de fluxos",
        "Analytics básicos",
        "Templates ilimitados"
      ],
      popular: false,
      cta: "Começar Teste Grátis"
    },
    {
      name: "Trimestral",
      price: "R$ 715,90",
      period: "/trimestre",
      description: "Economia de 20% - Melhor custo-benefício",
      features: [
        "Até 50 fluxos de chatbot",
        "Editor visual completo",
        "Simulação em tempo real",
        "Integração WhatsApp API",
        "Suporte prioritário",
        "Exportação de fluxos",
        "Analytics avançados",
        "Templates ilimitados",
        "Integração com CRM",
        "Relatórios personalizados"
      ],
      popular: true,
      cta: "Escolher Trimestral"
    },
    {
      name: "Anual",
      price: "R$ 2.499,90",
      period: "/ano",
      description: "Economia de 30% - Mais popular",
      features: [
        "Fluxos ilimitados",
        "Editor visual completo",
        "Simulação em tempo real",
        "Integração WhatsApp API",
        "Suporte prioritário 24/7",
        "Exportação de fluxos",
        "Analytics avançados",
        "Templates ilimitados",
        "Integração com CRM",
        "Relatórios personalizados",
        "API personalizada",
        "Treinamento dedicado",
        "Consultoria mensal"
      ],
      popular: false,
      cta: "Escolher Anual"
    }
  ]

  const benefits = [
    "Sem taxa de setup",
    "Cancelamento a qualquer momento",
    "Atualizações gratuitas",
    "Suporte em português",
    "Garantia de 30 dias",
    "Integração WhatsApp oficial"
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
                to="/"
                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Voltar
              </Link>
              <Link
                to="/login"
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Entrar
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Escolha o plano ideal para seu negócio
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Comece com um teste gratuito de 7 dias. Sem compromisso, cancele quando quiser.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary-600" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg border-2 p-8 ${
                  plan.popular
                    ? 'border-primary-500 transform scale-105'
                    : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      Mais Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/signup"
                  className={`block w-full text-center py-3 px-4 rounded-lg font-medium transition-colors ${
                    plan.popular
                      ? 'bg-primary-600 hover:bg-primary-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="inline h-4 w-4 ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-gray-600">
              Tire suas dúvidas sobre nossos planos
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Posso cancelar a qualquer momento?
              </h3>
              <p className="text-gray-600">
                Sim! Você pode cancelar sua assinatura a qualquer momento. Não há taxas de cancelamento ou multas.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Há teste gratuito?
              </h3>
              <p className="text-gray-600">
                Sim! Oferecemos 7 dias de teste gratuito para todos os planos. Você pode testar todas as funcionalidades sem compromisso.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Como funciona a integração com WhatsApp?
              </h3>
              <p className="text-gray-600">
                Nosso sistema se conecta diretamente com a API oficial do WhatsApp Business. Você precisará de uma conta verificada do WhatsApp Business.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Posso mudar de plano depois?
              </h3>
              <p className="text-gray-600">
                Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. O valor será ajustado proporcionalmente.
              </p>
            </div>
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
            Comece seu teste gratuito hoje e veja como BotFlow Studio pode transformar seu atendimento.
          </p>
          <Link
            to="/signup"
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

export default PricingPage