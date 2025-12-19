
import React, { useState } from 'react';
import { ChevronLeft, Star, ShoppingCart, Truck, ShieldCheck, Heart, Share2, Sparkles, MessageSquare } from 'lucide-react';
import { useApp } from '../store';

interface ProductDetailProps {
  productId: string;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ productId, onBack }) => {
  const { products, addToCart } = useApp();
  const product = products.find(p => p.id === productId);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return <div>Produto não encontrado.</div>;

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors mb-8 font-medium"
      >
        <ChevronLeft className="w-5 h-5" /> Voltar para o mercado
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100 border border-gray-100 shadow-sm">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden bg-gray-100 cursor-pointer hover:opacity-80 transition-opacity border border-gray-200">
                <img src={`https://picsum.photos/seed/${product.id}${i}/200/200`} alt="preview" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-orange-100 text-orange-600 text-xs font-bold rounded-full uppercase">
              {product.category}
            </span>
            <span className="text-gray-400 text-sm">• Em stock</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-yellow-700 font-bold">{product.rating}</span>
            </div>
            <span className="text-gray-500 underline cursor-pointer">{product.reviewsCount} avaliações</span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">Vendido por: <span className="text-orange-600 font-semibold cursor-pointer">Loja Local de {product.sellerId}</span></span>
          </div>

          <div className="mb-8">
            <div className="text-4xl font-extrabold text-gray-900 mb-1">
              {product.price.toLocaleString('pt-AO')} Kz
            </div>
            <p className="text-gray-500 text-sm">IVA incluído. Pagamento disponível por Multicaixa Express e MB Way.</p>
          </div>

          <div className="p-6 bg-gray-50 rounded-2xl mb-8 space-y-4">
            <div className="flex items-center gap-4">
              <Truck className="w-6 h-6 text-orange-600" />
              <div>
                <p className="font-bold text-gray-900">Entrega Grátis</p>
                <p className="text-sm text-gray-500">Para encomendas acima de 50.000 Kz.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ShieldCheck className="w-6 h-6 text-green-600" />
              <div>
                <p className="font-bold text-gray-900">Compra Segura</p>
                <p className="text-sm text-gray-500">Proteção total LocalMark até a receção do produto.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button 
              onClick={handleAddToCart}
              className={`flex-grow flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all shadow-lg shadow-orange-200 ${
                isAdded ? 'bg-green-600 text-white' : 'bg-orange-600 text-white hover:bg-orange-700'
              }`}
            >
              {isAdded ? 'Adicionado!' : <><ShoppingCart className="w-5 h-5" /> Adicionar ao Carrinho</>}
            </button>
            <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-gray-200 font-bold hover:bg-gray-50 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-4 rounded-xl border-2 border-gray-200 font-bold hover:bg-gray-50 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          <div className="border-t pt-8">
            <div className="flex items-center gap-2 mb-4 text-orange-600 font-bold">
               <Sparkles className="w-5 h-5" /> Assistente de Compra (AI)
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              {product.description}
            </p>
            <button className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-orange-600 bg-gray-100 px-4 py-2 rounded-lg transition-colors">
              <MessageSquare className="w-4 h-4" /> Perguntar sobre este produto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
