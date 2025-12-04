import React from 'react';
import { Activity, ShoppingCart, User, Menu, Settings } from 'lucide-react';

interface HeaderProps {
    onOpenApi: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenApi }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-2 text-blue-700">
              <Activity className="h-8 w-8" />
              <span className="font-bold text-xl tracking-tight text-slate-900">EMRN</span>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <a href="#" className="text-blue-700 bg-blue-50 px-3 py-2 rounded-md text-sm font-medium">Store</a>
                <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Medical Catalog</a>
                <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Training</a>
                <button 
                    onClick={onOpenApi}
                    className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1"
                >
                    <Settings className="w-3 h-3" />
                    Odoo Integration
                </button>
              </div>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
              <ShoppingCart className="h-6 w-6" />
            </button>
            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
              <User className="h-6 w-6" />
            </button>
            <button className="md:hidden p-2 text-gray-400">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;