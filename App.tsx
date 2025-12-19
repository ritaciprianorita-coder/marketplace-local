
import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './store';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const AppContent: React.FC = () => {
  const [activePage, setActivePage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const navigate = (page: string) => {
    setActivePage(page);
    window.scrollTo(0, 0);
  };

  const openProduct = (id: string) => {
    setSelectedProductId(id);
    setActivePage('product');
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home onProductClick={openProduct} />;
      case 'product':
        return selectedProductId ? (
          <ProductDetail productId={selectedProductId} onBack={() => navigate('home')} />
        ) : <Home onProductClick={openProduct} />;
      case 'cart':
        return <Cart onNavigateHome={() => navigate('home')} />;
      case 'login':
        return <Login onSuccess={() => navigate('home')} />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return <Home onProductClick={openProduct} />;
    }
  };

  return (
    <Layout activePage={activePage} onNavigate={navigate}>
      {renderPage()}
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
