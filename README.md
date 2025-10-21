# BotFlow Studio

Sistema web moderno e intuitivo para montar fluxos de chatbot para WhatsApp API. Permite criar, editar e visualizar fluxos de conversa com blocos arrastáveis e conectáveis, além de simular mensagens recebidas e respostas do bot em tempo real.

## 🚀 Funcionalidades

### Editor de Fluxo (Flow Builder)
- Interface "arrasta e solta" estilo React Flow
- Blocos disponíveis:
  - 🗨️ Mensagem de Texto
  - 🎧 Mensagem de Áudio (simulação de reprodução)
  - 🖼️ Imagem ou Mídia
  - 🔘 Opções de Seleção (botões com respostas rápidas)
  - 🔁 Redirecionamento para outro bloco
  - 🕓 Atraso / Espera
  - 🧭 Condição lógica (ex: se resposta = X → vai para Y)
- Conexões visuais entre blocos com linhas animadas
- Duplo clique em um bloco abre um editor lateral (sidebar) para configurar texto, mídias, botões e condições
- Opção de testar fluxo no próprio editor, mostrando simulação no painel direito (modo preview)

### Painel de Mensagens (Inbox Simulada)
- Lista de mensagens recebidas (simulação)
- Mostra mensagens automáticas enviadas pelo bot conforme o fluxo
- Possibilidade de pausar, resetar e visualizar logs das interações

### Sidebar / Menu Superior
- Logo da empresa (BotFlow Studio)
- Botões:
  - ➕ Novo Fluxo
  - 💾 Salvar / Exportar Fluxo (em JSON)
  - 📤 Importar Fluxo
  - 🎬 Testar Fluxo
- Modo claro/escuro (Dark/Light mode switch)

### Painel de Fluxos
- Lista de fluxos salvos (cards com nome, data, número de blocos)
- Ações: Editar / Duplicar / Excluir

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React + Vite
- **Estilização**: TailwindCSS
- **Editor de Fluxo**: React Flow
- **Ícones**: Lucide React
- **Armazenamento**: LocalStorage
- **Simulação**: Mock data com WebSocket fake

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Passos para executar

1. **Clone o repositório** (se aplicável)
2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Execute o projeto em modo de desenvolvimento**:
   ```bash
   npm run dev
   ```

4. **Acesse a aplicação**:
   Abra seu navegador em `http://localhost:3000`

### Scripts disponíveis

- `npm run dev` - Executa o projeto em modo de desenvolvimento
- `npm run build` - Gera a build de produção
- `npm run preview` - Visualiza a build de produção localmente
- `npm run lint` - Executa o linter para verificar qualidade do código

## 🎯 Como usar

1. **Criar um novo fluxo**: Clique em "Novo Fluxo" no header
2. **Adicionar blocos**: Arraste blocos da sidebar para o editor
3. **Conectar blocos**: Conecte os blocos arrastando das conexões
4. **Configurar blocos**: Clique em um bloco para abrir o painel de configuração
5. **Testar o fluxo**: Use o painel de simulação para testar as interações
6. **Salvar/Exportar**: Use os botões no header para salvar ou exportar seu fluxo

## 🎨 Características do Design

- Design moderno com cores suaves (tons de verde e cinza, estilo WhatsApp Business)
- Animações suaves em hover e drag
- Layout responsivo
- Fontes modernas (Inter)
- Modo claro e escuro

## 📱 Responsividade

O sistema foi desenvolvido para ser responsivo e funcionar bem em:
- Desktop
- Tablet
- Mobile (com algumas limitações na interface do editor)

## 🔧 Estrutura do Projeto

```
src/
├── components/
│   ├── nodes/           # Componentes dos diferentes tipos de nós
│   ├── FlowBuilder.jsx  # Editor principal de fluxo
│   ├── SimulationPanel.jsx # Painel de simulação
│   ├── Sidebar.jsx      # Sidebar com blocos e fluxos
│   ├── Header.jsx       # Cabeçalho da aplicação
│   └── NodeConfigPanel.jsx # Painel de configuração de nós
├── contexts/
│   └── ThemeContext.jsx # Contexto para tema claro/escuro
├── App.jsx              # Componente principal
└── main.jsx             # Ponto de entrada
```

## 🚀 Próximos Passos

- Integração com APIs reais do WhatsApp
- Mais tipos de blocos (vídeo, localização, etc.)
- Sistema de templates pré-definidos
- Colaboração em tempo real
- Analytics e métricas de fluxo

## 📄 Licença

Este projeto é um template/demonstração para criação de fluxos de chatbot.