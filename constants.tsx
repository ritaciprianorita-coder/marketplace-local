
import React from 'react';
import { ShoppingBag, Laptop, Utensils, Brush, Heart, Zap } from 'lucide-react';
import { Product, Category, UserRole } from './types';

export const CATEGORIES: Category[] = [
  { id: 'clothing', name: 'Vestuário', icon: 'ShoppingBag' },
  { id: 'electronics', name: 'Eletrónicos', icon: 'Laptop' },
  { id: 'food', name: 'Alimentação', icon: 'Utensils' },
  { id: 'crafts', name: 'Artesanato', icon: 'Brush' },
  { id: 'health', name: 'Saúde & Beleza', icon: 'Heart' },
  { id: 'other', name: 'Outros', icon: 'Zap' },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'T-Shirt Algodão Orgânico',
    price: 4500,
    description: 'Camiseta de alta qualidade feita com 100% algodão orgânico local.',
    category: 'clothing',
    image: 'https://picsum.photos/seed/tshirt/400/400',
    sellerId: 's1',
    rating: 4.5,
    reviewsCount: 12,
    stock: 50
  },
  {
    id: '2',
    name: 'Smartphone X-Pro 12',
    price: 150000,
    description: 'O mais recente em tecnologia móvel com câmara de 108MP.',
    category: 'electronics',
    image: 'https://picsum.photos/seed/phone/400/400',
    sellerId: 's2',
    rating: 4.8,
    reviewsCount: 89,
    stock: 5
  },
  {
    id: '3',
    name: 'Cesto de Vime Artesanal',
    price: 12000,
    description: 'Trabalho manual feito por artesãos do Huambo.',
    category: 'crafts',
    image: 'https://picsum.photos/seed/basket/400/400',
    sellerId: 's1',
    rating: 4.9,
    reviewsCount: 5,
    stock: 10
  },
  {
    id: '4',
    name: 'Kit Temperos Naturais',
    price: 3500,
    description: 'Seleção de especiarias frescas e biológicas.',
    category: 'food',
    image: 'https://picsum.photos/seed/spices/400/400',
    sellerId: 's3',
    rating: 4.2,
    reviewsCount: 24,
    stock: 100
  },
  {
    id: '5',
    name: 'Auscultadores Wireless B-Bass',
    price: 25000,
    description: 'Som envolvente e cancelamento de ruído ativo.',
    category: 'electronics',
    image: 'https://picsum.photos/seed/headphones/400/400',
    sellerId: 's2',
    rating: 4.6,
    reviewsCount: 42,
    stock: 15
  },
  {
    id: '6',
    name: 'Sapato Social Couro',
    price: 32000,
    description: 'Elegância e conforto para o dia-a-dia profissional.',
    category: 'clothing',
    image: 'https://picsum.photos/seed/shoes/400/400',
    sellerId: 's1',
    rating: 4.4,
    reviewsCount: 18,
    stock: 20
  }
];

export const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'ShoppingBag': return <ShoppingBag className="w-5 h-5" />;
    case 'Laptop': return <Laptop className="w-5 h-5" />;
    case 'Utensils': return <Utensils className="w-5 h-5" />;
    case 'Brush': return <Brush className="w-5 h-5" />;
    case 'Heart': return <Heart className="w-5 h-5" />;
    default: return <Zap className="w-5 h-5" />;
  }
};
