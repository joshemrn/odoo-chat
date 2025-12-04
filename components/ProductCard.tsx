import React from 'react';
import { Product } from '../types';
import { ShoppingCart, Check, X } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, compact = false }) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex ${compact ? 'flex-row' : 'flex-col'}`}>
      <div className={`relative ${compact ? 'w-24 h-24 flex-shrink-0' : 'w-full h-48'} bg-gray-100`}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
        {!product.inStock && (
          <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-bl">
            Out of Stock
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            {product.category}
          </div>
          <h3 className={`font-bold text-gray-900 ${compact ? 'text-sm' : 'text-lg'} mb-2 line-clamp-2`}>
            {product.name}
          </h3>
          {!compact && (
            <p className="text-gray-500 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-slate-900">
            ${product.price.toFixed(2)}
          </span>
          <button 
            disabled={!product.inStock}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              product.inStock 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {compact ? 'Add' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;