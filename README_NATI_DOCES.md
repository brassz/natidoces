# 🧁 Nati Doces - Sistema de Agendamento

Sistema web completo para gerenciamento de encomendas de brigadeiros da **Nati Doces**.

## 🎀 Funcionalidades Principais

### 📱 Página Inicial
- Dashboard com horário em tempo real
- Acesso rápido a todas as funcionalidades
- Design responsivo e intuitivo
- Tema rosa delicado com identidade visual da marca

### 📋 Gerenciamento de Encomendas
- **Cadastro de pedidos** com todos os campos necessários:
  - Nome da cliente
  - Contato (WhatsApp/telefone)
  - Data e horário de entrega
  - Seleção múltipla de sabores
  - Quantidade e preço unitário por sabor
  - Cálculo automático do valor total
  - Campo de observações
- **Listagem completa** com filtros por:
  - Cliente/contato
  - Status (Pendente, Produzindo, Pronto, Entregue, Cancelado)
  - Data de entrega
- **Controle de status** com workflow:
  - Pendente → Produzindo → Pronto → Entregue
- **Exclusão** de pedidos com confirmação
- **Exportação para Excel** (.xlsx)

### 💰 Resumo Financeiro
- **Análise por período**:
  - Hoje, Esta Semana, Este Mês, Personalizado
- **Métricas principais**:
  - Receita total
  - Número de pedidos
  - Ticket médio
- **Relatórios detalhados**:
  - Sabores mais vendidos
  - Status dos pedidos
  - Melhores clientes
  - Estatísticas de performance

### ⚙️ Painel Administrativo
- **Login protegido** por senha
- **Gerenciamento de sabores**:
  - Adicionar novos sabores
  - Remover sabores existentes
  - Lista personalizável
- **Estatísticas gerais**:
  - Total de pedidos
  - Receita acumulada
  - Clientes únicos
  - Sabor mais vendido
- **Configurações de segurança**:
  - Alterar senha do administrador

## 🎨 Design e UX

### Identidade Visual
- **Paleta de cores**: Rosa claro (#FFC0CB), branco e dourado suave
- **Tipografia**: 
  - Pacifico (cursiva) para o logo e títulos principais
  - Inter para textos gerais
- **Elementos visuais**:
  - Gradientes suaves
  - Bordas arredondadas
  - Ícones delicados
  - Animações sutis

### Responsividade
- **Desktop**: Layout completo com sidebar e cards
- **Mobile**: 
  - Menu de navegação inferior fixo
  - Menu flutuante com acesso rápido
  - Cards otimizados para toque
  - Formulários adaptados para mobile

## 🚀 Como Usar

### 1. Acesso Inicial
- Abra o sistema no navegador
- A página inicial mostra o horário atual e menu principal

### 2. Criar Nova Encomenda
- Clique em "Nova Encomenda" ou acesse "Gerenciar Encomendas"
- Preencha os dados da cliente
- Selecione os sabores desejados
- Defina quantidades e preços
- Adicione observações se necessário
- Salve o pedido

### 3. Acompanhar Pedidos
- Na página "Encomendas", visualize todos os pedidos
- Use filtros para encontrar pedidos específicos
- Atualize o status conforme o progresso
- Exporte relatórios quando necessário

### 4. Análise Financeira
- Acesse "Resumo Financeiro"
- Selecione o período desejado
- Analise métricas e relatórios
- Identifique tendências e oportunidades

### 5. Configurações (Admin)
- Acesse "Painel Administrativo"
- Digite a senha: `nati123` (padrão)
- Gerencie sabores disponíveis
- Visualize estatísticas gerais
- Altere configurações de segurança

## 💾 Armazenamento de Dados

O sistema utiliza **localStorage** do navegador para armazenar:
- Pedidos e encomendas
- Configurações administrativas
- Sabores personalizados

### Backup e Exportação
- **Excel**: Exportação automática de pedidos filtrados
- **Dados locais**: Salvos automaticamente no navegador
- **Recomendação**: Faça backup regular exportando para Excel

## 🔐 Segurança

### Autenticação
- Painel administrativo protegido por senha
- Sessão mantida durante uso
- Logout automático ao fechar

### Dados
- Armazenamento local seguro
- Sem transmissão de dados sensíveis
- Controle total sobre informações

## 📱 Compatibilidade

### Navegadores Suportados
- Chrome (recomendado)
- Firefox
- Safari
- Edge

### Dispositivos
- **Desktop**: Experiência completa
- **Tablet**: Layout adaptado
- **Mobile**: Interface otimizada com menu inferior

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Ícones**: Lucide React
- **Datas**: date-fns
- **Exportação**: xlsx
- **Roteamento**: React Router DOM

## 📞 Suporte

Para dúvidas ou sugestões sobre o sistema:
- Consulte este manual
- Teste as funcionalidades em ambiente seguro
- Mantenha backups regulares dos dados

---

**Desenvolvido com 💕 para a Nati Doces**

*Sistema de Agendamento v1.0*