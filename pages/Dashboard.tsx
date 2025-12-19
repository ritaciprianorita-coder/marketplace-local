
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { 
  TrendingUp, Package, ShoppingCart, Users, Plus, Edit, Trash2, 
  CheckCircle, Clock, AlertTriangle, Sparkles 
} from 'lucide-react';
import { useApp } from '../store';
import { UserRole, Product } from '../types';
import { CATEGORIES } from '../constants';
import { generateProductDescription } from '../services/gemini';

const MOCK_STATS = [
  { name: 'Seg', sales: 4000 },
  { name: 'Ter', sales: 3000 },
  { name: 'Qua', sales: 2000 },
  { name: 'Qui', sales: 2780 },
  { name: 'Sex', sales: 1890 },
  { name: 'Sáb', sales: 2390 },
  { name: 'Dom', sales: 3490 },
];

const Dashboard: React.FC = () => {
  const { user, products, addProduct, updateProduct } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    price: 0,
    description: '',
    category: 'clothing',
    stock: 10
  });

  const sellerProducts = user?.role === UserRole.ADMIN ? products : products.filter(p => p.sellerId === user?.id || p.sellerId === 's1');

  const handleAiDescribe = async () => {
    if (!formData.name) return alert('Por favor, insira o nome do produto primeiro.');
    setIsGenerating(true);
    const desc = await generateProductDescription(formData.name, formData.category || 'Outros');
    setFormData(prev => ({ ...prev, description: desc }));
    setIsGenerating(false);
  };

  const handleSaveProduct = () => {
    if (!formData.name || !formData.price) return;
    const newProduct: Product = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      price: Number(formData.price),
      description: formData.description || '',
      category: formData.category || 'other',
      image: `https://picsum.photos/seed/${formData.name}/400/400`,
      sellerId: user?.id || 's1',
      rating: 5,
      reviewsCount: 0,
      stock: Number(formData.stock)
    };
    addProduct(newProduct);
    setShowAddModal(false);
    setFormData({ name: '', price: 0, description: '', category: 'clothing', stock: 10 });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Painel do {user?.role === UserRole.ADMIN ? 'Administrador' : 'Vendedor'}</h1>
          <p className="text-gray-500">Olá, {user?.name}. Aqui está o resumo da sua loja.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-orange-600 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-700 transition-all shadow-lg shadow-orange-100"
        >
          <Plus className="w-5 h-5" /> Adicionar Produto
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard icon={<TrendingUp className="text-green-600" />} label="Vendas Totais" value="450.000 Kz" change="+12.5%" />
        <StatCard icon={<ShoppingCart className="text-blue-600" />} label="Encomendas" value="24" change="+5" />
        <StatCard icon={<Package className="text-orange-600" />} label="Produtos" value={sellerProducts.length.toString()} />
        <StatCard icon={<Users className="text-purple-600" />} label="Clientes" value="156" change="+12" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold mb-6">Desempenho Semanal</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_STATS}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ea580c" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#ea580c" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} 
                />
                <Area type="monotone" dataKey="sales" stroke="#ea580c" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold mb-6">Encomendas Recentes</h3>
          <div className="space-y-4">
            <OrderItem id="ORD-001" status="pending" price="12.000 Kz" />
            <OrderItem id="ORD-002" status="paid" price="45.000 Kz" />
            <OrderItem id="ORD-003" status="shipped" price="8.500 Kz" />
            <OrderItem id="ORD-004" status="paid" price="150.000 Kz" />
          </div>
          <button className="w-full mt-6 py-3 text-orange-600 font-bold hover:bg-orange-50 rounded-xl transition-colors">
            Ver Todas
          </button>
        </div>
      </div>

      {/* Product Management */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-xl font-bold">Gerir Produtos</h3>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Pesquisar na loja..." 
              className="pl-4 pr-10 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase">
              <tr>
                <th className="px-6 py-4">Produto</th>
                <th className="px-6 py-4">Categoria</th>
                <th className="px-6 py-4">Preço</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {sellerProducts.map(product => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={product.image} className="w-10 h-10 rounded-lg object-cover" alt="" />
                      <span className="font-semibold text-gray-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 capitalize">{product.category}</td>
                  <td className="px-6 py-4 font-bold">{product.price.toLocaleString('pt-AO')} Kz</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${product.stock < 5 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                      {product.stock} un.
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="p-2 text-gray-400 hover:text-orange-600 transition-colors"><Edit className="w-4 h-4" /></button>
                    <button className="p-2 text-gray-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddModal(false)}></div>
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative z-10 overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h3 className="text-xl font-bold">Novo Produto</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">×</button>
            </div>
            <div className="p-8 space-y-6 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Nome do Produto</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500" 
                    placeholder="Ex: T-Shirt de Algodão"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Categoria</label>
                  <select 
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500"
                  >
                    {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-gray-700">Descrição</label>
                  <button 
                    onClick={handleAiDescribe}
                    disabled={isGenerating}
                    className="text-xs flex items-center gap-1 text-orange-600 font-bold hover:underline disabled:opacity-50"
                  >
                    <Sparkles className="w-3 h-3" /> {isGenerating ? 'Gerando...' : 'Gerar com IA'}
                  </button>
                </div>
                <textarea 
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  rows={4}
                  className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500" 
                  placeholder="Conte-nos mais sobre o produto..."
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Preço (Kz)</label>
                  <input 
                    type="number" 
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                    className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Stock Inicial</label>
                  <input 
                    type="number" 
                    value={formData.stock}
                    onChange={e => setFormData({...formData, stock: Number(e.target.value)})}
                    className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500" 
                  />
                </div>
              </div>
            </div>
            <div className="p-6 bg-gray-50 border-t flex justify-end gap-4">
              <button onClick={() => setShowAddModal(false)} className="px-6 py-3 font-bold text-gray-500 hover:text-gray-700">Cancelar</button>
              <button onClick={handleSaveProduct} className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 shadow-lg shadow-orange-100">Guardar Produto</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard: React.FC<{icon: React.ReactNode, label: string, value: string, change?: string}> = ({icon, label, value, change}) => (
  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-gray-50 rounded-xl">{icon}</div>
      {change && (
        <span className={`text-xs font-bold ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{change}</span>
      )}
    </div>
    <p className="text-sm text-gray-500 font-medium mb-1">{label}</p>
    <p className="text-2xl font-extrabold text-gray-900">{value}</p>
  </div>
);

const OrderItem: React.FC<{id: string, status: string, price: string}> = ({id, status, price}) => (
  <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-colors border border-transparent hover:border-gray-100">
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-full ${
        status === 'paid' ? 'bg-green-100' : 
        status === 'pending' ? 'bg-yellow-100' : 'bg-blue-100'
      }`}>
        {status === 'paid' ? <CheckCircle className="w-4 h-4 text-green-600" /> : 
         status === 'pending' ? <Clock className="w-4 h-4 text-yellow-600" /> : <TrendingUp className="w-4 h-4 text-blue-600" />}
      </div>
      <div>
        <p className="text-sm font-bold text-gray-900">{id}</p>
        <p className="text-[10px] text-gray-500 uppercase tracking-tighter">{status}</p>
      </div>
    </div>
    <span className="font-bold text-sm">{price}</span>
  </div>
);

export default Dashboard;
