
import React, { useState } from 'react';
import { ShoppingCart, User, Menu, X, Search, LogOut, LayoutDashboard, Home } from 'lucide-react';
import { useApp } from '../store';
import { UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activePage, onNavigate }) => {
  const { cart, user, logout } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 hover:bg-gray-100 rounded-full">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
            <h1 
              onClick={() => onNavigate('home')} 
              className="text-2xl font-bold text-orange-600 cursor-pointer flex items-center gap-2"
            >
              Local<span className="text-gray-900">Mark</span>
            </h1>
          </div>

          <div className="hidden md:flex items-center flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Procurar produtos..." 
                className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => onNavigate('cart')}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-orange-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => onNavigate('dashboard')}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg text-sm font-medium"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span className="hidden sm:inline">Painel</span>
                </button>
                <button 
                  onClick={logout}
                  className="p-2 hover:bg-red-50 text-red-600 rounded-full"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => onNavigate('login')}
                className="bg-orange-600 text-white px-6 py-2 rounded-full hover:bg-orange-700 transition-colors font-medium text-sm sm:text-base"
              >
                Entrar
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMenuOpen(false)}></div>
          <div className="fixed top-0 left-0 bottom-0 w-64 bg-white p-6 shadow-xl">
            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-bold text-orange-600">Menu</span>
              <button onClick={() => setIsMenuOpen(false)}><X /></button>
            </div>
            <nav className="space-y-4">
              <button onClick={() => { onNavigate('home'); setIsMenuOpen(false); }} className="flex items-center gap-3 w-full p-2 hover:bg-gray-100 rounded-lg">
                <Home className="w-5 h-5" /> Início
              </button>
              {user && (
                <button onClick={() => { onNavigate('dashboard'); setIsMenuOpen(false); }} className="flex items-center gap-3 w-full p-2 hover:bg-gray-100 rounded-lg">
                  <LayoutDashboard className="w-5 h-5" /> Painel
                </button>
              )}
              <button onClick={() => { onNavigate('cart'); setIsMenuOpen(false); }} className="flex items-center gap-3 w-full p-2 hover:bg-gray-100 rounded-lg">
                <ShoppingCart className="w-5 h-5" /> Carrinho
              </button>
            </nav>
          </div>
        </div>
      )}

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">LocalMark</h3>
            <p className="text-sm">O maior marketplace local, conectando vendedores e compradores com confiança.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Termos e Condições</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Ajuda</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Suporte</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Envio e Entrega</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Devoluções</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Newsletter</h4>
            <div className="flex">
              <input type="email" placeholder="Teu email" className="bg-gray-800 border-none rounded-l px-3 py-2 w-full focus:ring-2 focus:ring-orange-500" />
              <button className="bg-orange-600 text-white px-4 py-2 rounded-r hover:bg-orange-700">OK</button>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-center text-xs">
          © 2024 LocalMark. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
