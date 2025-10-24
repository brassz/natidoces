// Dados de exemplo para demonstração do sistema Nati Doces
export const sampleOrders = [
  {
    id: "1698765432000",
    customerName: "Maria Silva",
    contact: "(11) 99999-1234",
    deliveryDate: "2024-10-25T14:00",
    flavors: [
      { name: "Brigadeiro Tradicional", quantity: 20, unitPrice: 2.50 },
      { name: "Beijinho", quantity: 10, unitPrice: 2.50 }
    ],
    totalValue: 75.00,
    observations: "Entregar com laço rosa, aniversário da filha",
    status: "pending",
    createdAt: "2024-10-24T10:30:00.000Z"
  },
  {
    id: "1698765432001",
    customerName: "Ana Costa",
    contact: "(11) 98888-5678",
    deliveryDate: "2024-10-25T16:30",
    flavors: [
      { name: "Nutella", quantity: 15, unitPrice: 3.00 },
      { name: "Oreo", quantity: 15, unitPrice: 3.00 }
    ],
    totalValue: 90.00,
    observations: "Cliente preferencial, sempre pontual",
    status: "producing",
    createdAt: "2024-10-24T09:15:00.000Z"
  },
  {
    id: "1698765432002",
    customerName: "Carla Mendes",
    contact: "(11) 97777-9012",
    deliveryDate: "2024-10-26T10:00",
    flavors: [
      { name: "Leite Ninho com Morango", quantity: 25, unitPrice: 3.50 }
    ],
    totalValue: 87.50,
    observations: "Festa de escritório, embalar em caixinha especial",
    status: "ready",
    createdAt: "2024-10-23T16:45:00.000Z"
  },
  {
    id: "1698765432003",
    customerName: "Juliana Santos",
    contact: "(11) 96666-3456",
    deliveryDate: "2024-10-24T18:00",
    flavors: [
      { name: "Prestígio", quantity: 12, unitPrice: 3.00 },
      { name: "Paçoca", quantity: 8, unitPrice: 2.80 }
    ],
    totalValue: 58.40,
    observations: "",
    status: "delivered",
    createdAt: "2024-10-23T14:20:00.000Z"
  },
  {
    id: "1698765432004",
    customerName: "Fernanda Lima",
    contact: "(11) 95555-7890",
    deliveryDate: "2024-10-27T15:00",
    flavors: [
      { name: "Churros", quantity: 18, unitPrice: 3.20 },
      { name: "Maracujá", quantity: 12, unitPrice: 3.00 }
    ],
    totalValue: 93.60,
    observations: "Primeira compra, cliente nova",
    status: "pending",
    createdAt: "2024-10-24T11:10:00.000Z"
  }
];

export const sampleAdminSettings = {
  availableFlavors: [
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
    'Doce de Leite',
    'Morango',
    'Coco Queimado'
  ],
  adminPassword: 'nati123'
};

// Função para carregar dados de exemplo
export const loadSampleData = () => {
  // Verificar se já existem dados
  const existingOrders = localStorage.getItem('natiDoces_orders');
  const existingSettings = localStorage.getItem('natiDoces_adminSettings');
  
  // Carregar pedidos de exemplo apenas se não houver dados
  if (!existingOrders) {
    localStorage.setItem('natiDoces_orders', JSON.stringify(sampleOrders));
    console.log('✅ Dados de exemplo carregados: Pedidos');
  }
  
  // Carregar configurações de exemplo apenas se não houver dados
  if (!existingSettings) {
    localStorage.setItem('natiDoces_adminSettings', JSON.stringify(sampleAdminSettings));
    console.log('✅ Dados de exemplo carregados: Configurações Admin');
  }
  
  return {
    ordersLoaded: !existingOrders,
    settingsLoaded: !existingSettings
  };
};

// Função para resetar dados (útil para demonstração)
export const resetToSampleData = () => {
  localStorage.setItem('natiDoces_orders', JSON.stringify(sampleOrders));
  localStorage.setItem('natiDoces_adminSettings', JSON.stringify(sampleAdminSettings));
  console.log('🔄 Sistema resetado com dados de exemplo');
  return true;
};

// Função para limpar todos os dados
export const clearAllData = () => {
  localStorage.removeItem('natiDoces_orders');
  localStorage.removeItem('natiDoces_adminSettings');
  sessionStorage.removeItem('natiDoces_adminAuth');
  console.log('🗑️ Todos os dados foram limpos');
  return true;
};