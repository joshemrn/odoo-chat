export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  inStock: boolean;
}

export interface Order {
  id: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: string[];
  estimatedDelivery: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isThinking?: boolean;
  relatedProducts?: Product[]; // If the AI finds products, we attach them here for UI rendering
}

export enum StoreTool {
  SEARCH_PRODUCTS = 'search_products',
  TRACK_ORDER = 'track_order'
}