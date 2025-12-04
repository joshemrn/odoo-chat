import React, { useState } from 'react';
import Header from './components/Header';
import ChatWidget from './components/ChatWidget';
import ProductCard from './components/ProductCard';
import ApiKeyModal from './components/ApiKeyModal';
import { MOCK_PRODUCTS } from './services/mockStore';
import { Truck, ShieldCheck, HeartPulse } from 'lucide-react';

const App: React.FC = () => {
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header onOpenApi={() => setIsApiModalOpen(true)} />

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative bg-blue-900 py-24 sm:py-32 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1516574187841-69301976e991?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
              alt="Medical background"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-900/80 to-transparent" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
                EMRN Medical Supplies <br />
                <span className="text-blue-200">First Response Ready</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-blue-100">
                Canada's trusted source for emergency medical equipment, training supplies, and first aid kits. 
                Integrating advanced AI support for seamless procurement.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <button className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-blue-900 shadow-sm hover:bg-blue-50 transition-colors">
                  Shop Catalog
                </button>
                <button 
                  onClick={() => setIsApiModalOpen(true)}
                  className="text-sm font-semibold leading-6 text-white hover:text-blue-200 flex items-center gap-2"
                >
                  Configure AI Agent <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="py-12 bg-white border-b border-gray-200">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
                    <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                        <Truck className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">Nationwide Shipping</h3>
                        <p className="text-sm text-gray-500">Fast delivery across Canada</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
                    <div className="bg-red-100 p-3 rounded-full text-red-600">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">Health Canada Approved</h3>
                        <p className="text-sm text-gray-500">Certified Medical Grade</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
                    <div className="bg-teal-100 p-3 rounded-full text-teal-600">
                        <HeartPulse className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">Clinical Support</h3>
                        <p className="text-sm text-gray-500">Professional assistance available</p>
                    </div>
                </div>
             </div>
           </div>
        </div>

        {/* Featured Products */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">Emergency Equipment</h2>
              <p className="text-gray-500 mt-2">Essential gear for first responders.</p>
            </div>
            <a href="#" className="text-blue-600 font-medium hover:text-blue-800">View all &rarr;</a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_PRODUCTS.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-16 border-t border-gray-200 pt-16">
             <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900">Consumables & PPE</h2>
                  <p className="text-gray-500 mt-2">High-volume supplies for clinics.</p>
                </div>
                 <a href="#" className="text-blue-600 font-medium hover:text-blue-800">View all &rarr;</a>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {MOCK_PRODUCTS.slice(3, 6).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
             </div>
          </div>
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">EMRN</h3>
            <p className="text-sm">Eastern Medical Rescue Network.</p>
            <p className="text-sm text-slate-500 mt-2">Serving Canadian Healthcare Professionals.</p>
          </div>
          <div>
             <h4 className="text-white font-medium mb-4">Products</h4>
             <ul className="space-y-2 text-sm">
                 <li><a href="#" className="hover:text-white">Defibrillators</a></li>
                 <li><a href="#" className="hover:text-white">First Aid Kits</a></li>
                 <li><a href="#" className="hover:text-white">Diagnostics</a></li>
             </ul>
          </div>
          <div>
             <h4 className="text-white font-medium mb-4">Support</h4>
             <ul className="space-y-2 text-sm">
                 <li><a href="#" className="hover:text-white">Contact Us</a></li>
                 <li><a href="#" className="hover:text-white">Training Programs</a></li>
                 <li><a href="#" className="hover:text-white">Odoo Integration</a></li>
             </ul>
          </div>
          <div>
             <h4 className="text-white font-medium mb-4">Legal</h4>
             <ul className="space-y-2 text-sm">
                 <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                 <li><a href="#" className="hover:text-white">Terms of Sale</a></li>
             </ul>
          </div>
        </div>
      </footer>

      <ApiKeyModal isOpen={isApiModalOpen} onClose={() => setIsApiModalOpen(false)} />
      <ChatWidget />
    </div>
  );
};

export default App;