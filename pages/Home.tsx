
import React, { useState, useEffect } from 'react';
import { CATEGORIES, getCategoryIcon } from '../constants';
import { useApp } from '../store';
import ProductCard from '../components/ProductCard';
import { Search, Sparkles } from 'lucide-react';
import { getSmartProductSuggestions } from '../services/gemini';

interface HomeProps {
  onProductClick: (id: string) => void;
}

const Home: React.FC<HomeProps> = ({ onProductClick }) => {
  const { products } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const filteredProducts = products.filter(p => {
    const matchesCategory = !selectedCategory || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    if (searchQuery.length > 3) {
      const fetchSuggestions = async () => {
        const suggestions = await getSmartProductSuggestions(searchQuery);
        setAiSuggestions(suggestions);
      };
      const timer = setTimeout(fetchSuggestions, 1000);
      return () => clearTimeout(timer);
    } else {
      setAiSuggestions([]);
    }
  }, [searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-400 rounded-3xl p-8 md:p-12 mb-12 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Compre do Mercado Local com Confiança</h2>
          <p className="text-lg opacity-90 mb-8">Produtos frescos, artesanato único e tecnologia ao alcance de um clique. Entregas rápidas em todo o território nacional.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="O que procuras hoje?" 
                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-orange-200"
              />
              {aiSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white shadow-2xl rounded-xl mt-2 overflow-hidden border border-gray-100">
                  <div className="px-4 py-2 bg-orange-50 text-xs font-bold text-orange-600 flex items-center gap-2">
                    <Sparkles className="w-3 h-3" /> IA Sugestões
                  </div>
                  {aiSuggestions.map((s, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => { setSearchQuery(s); setAiSuggestions([]); }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 transition-colors border-t border-gray-50"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-black transition-colors">
              Explorar
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 h-full w-1/3 opacity-20 hidden md:block">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <circle cx="100" cy="50" r="50" fill="white" />
          </svg>
        </div>
      </section>

      {/* Categories */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Categorias Populares</h3>
          <button 
            onClick={() => setSelectedCategory(null)}
            className="text-orange-600 font-semibold text-sm hover:underline"
          >
            Ver Todas
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
              className={`p-6 rounded-2xl flex flex-col items-center gap-3 transition-all border-2 ${
                selectedCategory === category.id 
                ? 'bg-orange-50 border-orange-600 text-orange-600' 
                : 'bg-white border-transparent hover:border-gray-200 text-gray-600 hover:shadow-md'
              }`}
            >
              <div className={`p-3 rounded-xl ${selectedCategory === category.id ? 'bg-orange-100' : 'bg-gray-50'}`}>
                {getCategoryIcon(category.icon)}
              </div>
              <span className="text-sm font-semibold text-center">{category.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-gray-900">
            {selectedCategory ? CATEGORIES.find(c => c.id === selectedCategory)?.name : 'Novidades'}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            Mostrando {filteredProducts.length} produtos
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={onProductClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <div className="max-w-xs mx-auto">
              <p className="text-gray-500 mb-4">Nenhum produto encontrado nesta categoria ou com este nome.</p>
              <button 
                onClick={() => { setSelectedCategory(null); setSearchQuery(''); }}
                className="text-orange-600 font-bold"
              >
                Limpar filtros
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
