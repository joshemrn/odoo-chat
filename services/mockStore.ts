import { Product, Order } from '../types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod_001',
    name: 'Advanced Digital Stethoscope',
    category: 'Diagnostic',
    price: 199.99,
    description: 'High-precision digital stethoscope with noise cancellation and app integration.',
    image: 'https://picsum.photos/300/300?random=1',
    inStock: true
  },
  {
    id: 'prod_002',
    name: 'Nitrile Exam Gloves (Box of 100)',
    category: 'Consumables',
    price: 24.50,
    description: 'Powder-free, latex-free medical grade nitrile gloves. Available in S, M, L.',
    image: 'https://picsum.photos/300/300?random=2',
    inStock: true
  },
  {
    id: 'prod_003',
    name: 'Automated Blood Pressure Monitor',
    category: 'Diagnostic',
    price: 89.95,
    description: 'Upper arm blood pressure monitor with arrhythmia detection and large display.',
    image: 'https://picsum.photos/300/300?random=3',
    inStock: true
  },
  {
    id: 'prod_004',
    name: 'Folding Wheelchair Lightweight',
    category: 'Mobility',
    price: 349.00,
    description: 'Ultra-lightweight aluminum wheelchair, foldable for easy transport.',
    image: 'https://picsum.photos/300/300?random=4',
    inStock: false
  },
  {
    id: 'prod_005',
    name: 'Surgical Face Masks (Level 3)',
    category: 'Consumables',
    price: 15.99,
    description: '50-pack of ASTM Level 3 surgical masks with ear loops.',
    image: 'https://picsum.photos/300/300?random=5',
    inStock: true
  },
  {
    id: 'prod_006',
    name: 'Pulse Oximeter Fingertip',
    category: 'Diagnostic',
    price: 29.99,
    description: 'Accurately measures oxygen saturation and pulse rate.',
    image: 'https://picsum.photos/300/300?random=6',
    inStock: true
  }
];

const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-12345',
    status: 'shipped',
    items: ['Advanced Digital Stethoscope'],
    estimatedDelivery: '2023-11-15'
  },
  {
    id: 'ORD-67890',
    status: 'processing',
    items: ['Nitrile Exam Gloves'],
    estimatedDelivery: '2023-11-20'
  }
];

// Simulating Odoo API calls
export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return MOCK_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) || 
    p.category.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery)
  );
};

export const getOrderByID = (orderId: string): Order | undefined => {
  return MOCK_ORDERS.find(o => o.id === orderId);
};