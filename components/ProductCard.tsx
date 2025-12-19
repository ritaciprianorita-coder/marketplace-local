
import React from 'react';
import { Star, ShoppingCart, Info } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../store';

interface ProductCardProps {
  product: Product;
  onClick: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { addToCart } = useApp();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div 
      onClick={() => onClick(product.id)}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden group border border-gray-100 flex flex-col h-full"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg text-gray-700 hover:text-orange-600"
            title="Ver Detalhes"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-xs text-orange-600 font-bold uppercase tracking-wider mb-1">
          {product.category}
        </div>
        <h3 className="text-gray-900 font-semibold mb-2 line-clamp-1 group-hover:text-orange-600 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-1 mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3.5 h-3.5 fill-current ${i < Math.floor(product.rating) ? '' : 'text-gray-300'}`} />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviewsCount})</span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2">
          <div className="flex flex-col">
             <span className="text-lg font-bold text-gray-900">
              {product.price.toLocaleString('pt-AO')} Kz
            </span>
            <span className="text-[10px] text-gray-500">Envio Local</span>
          </div>
          <button 
            onClick={handleAddToCart}
            className="p-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-orange-600 hover:text-white transition-all flex items-center justify-center"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
