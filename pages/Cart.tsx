
import React, { useState } from 'react';
import { Trash2, Minus, Plus, ShoppingBag, CreditCard, ArrowRight, CheckCircle } from 'lucide-react';
import { useApp } from '../store';

interface CartProps {
  onNavigateHome: () => void;
}

const Cart: React.FC<CartProps> = ({ onNavigateHome }) => {
  const { cart, removeFromCart, updateCartQuantity, clearCart } = useApp();
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [paymentMethod, setPaymentMethod] = useState<'multicaixa' | 'mbway' | 'card'>('multicaixa');

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 50000 ? 0 : 2500;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    setStep('success');
    setTimeout(() => {
      clearCart();
    }, 100);
  };

  if (cart.length === 0 && step !== 'success') {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Teu carrinho está vazio</h2>
          <p className="text-gray-500 mb-8">Parece que ainda não adicionaste nada. Explora as nossas ofertas incríveis!</p>
          <button 
            onClick={onNavigateHome}
            className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 transition-colors"
          >
            Começar a Comprar
          </button>
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-extrabold mb-4">Encomenda Confirmada!</h2>
          <p className="text-gray-600 mb-8">Obrigado pela tua compra. Receberás um email com os detalhes e poderás acompanhar o envio no teu painel.</p>
          <button 
            onClick={onNavigateHome}
            className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-black transition-colors"
          >
            Voltar à Loja
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold mb-8">
        {step === 'cart' ? 'O Teu Carrinho' : 'Finalizar Compra'}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {step === 'cart' ? (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 text-left border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Produto</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase hidden md:table-cell">Preço</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Quant.</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Subtotal</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {cart.map(item => (
                    <tr key={item.id} className="group">
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-4">
                          <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
                          <div>
                            <p className="font-bold text-gray-900">{item.name}</p>
                            <p className="text-xs text-gray-500">{item.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6 hidden md:table-cell">
                        <span className="font-medium">{item.price.toLocaleString('pt-AO')} Kz</span>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-3 border rounded-lg w-fit px-2 py-1">
                          <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-orange-600"><Minus className="w-4 h-4" /></button>
                          <span className="w-8 text-center font-bold">{item.quantity}</span>
                          <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-orange-600"><Plus className="w-4 h-4" /></button>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <span className="font-bold">{(item.price * item.quantity).toLocaleString('pt-AO')} Kz</span>
                      </td>
                      <td className="px-6 py-6 text-right">
                        <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-600 transition-colors p-2">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
                  Endereço de Entrega
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Nome Completo" className="p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500" />
                  <input type="text" placeholder="Telefone" className="p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500" />
                  <input type="text" placeholder="Cidade / Província" className="p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500" />
                  <input type="text" placeholder="Morada Detalhada" className="p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500" />
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm">2</span>
                  Método de Pagamento
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button 
                    onClick={() => setPaymentMethod('multicaixa')}
                    className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${paymentMethod === 'multicaixa' ? 'border-orange-600 bg-orange-50' : 'border-gray-100 hover:border-gray-200'}`}
                  >
                    <div className="font-bold">Multicaixa</div>
                    <div className="text-[10px] uppercase text-gray-500">Referência</div>
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('mbway')}
                    className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${paymentMethod === 'mbway' ? 'border-orange-600 bg-orange-50' : 'border-gray-100 hover:border-gray-200'}`}
                  >
                    <div className="font-bold">MB Way</div>
                    <div className="text-[10px] uppercase text-gray-500">Telemóvel</div>
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('card')}
                    className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${paymentMethod === 'card' ? 'border-orange-600 bg-orange-50' : 'border-gray-100 hover:border-gray-200'}`}
                  >
                    <div className="font-bold">Cartão</div>
                    <div className="text-[10px] uppercase text-gray-500">Débito/Crédito</div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl sticky top-24">
            <h3 className="text-xl font-bold mb-6">Resumo</h3>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>{subtotal.toLocaleString('pt-AO')} Kz</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Entrega</span>
                <span>{shipping === 0 ? 'Grátis' : `${shipping.toLocaleString('pt-AO')} Kz`}</span>
              </div>
              <div className="border-t pt-4 flex justify-between text-xl font-extrabold text-gray-900">
                <span>Total</span>
                <span>{total.toLocaleString('pt-AO')} Kz</span>
              </div>
            </div>

            {step === 'cart' ? (
              <button 
                onClick={() => setStep('checkout')}
                className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-700 transition-all shadow-lg shadow-orange-100"
              >
                Continuar <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button 
                onClick={handleCheckout}
                className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all shadow-lg shadow-gray-200"
              >
                Pagar Agora <CreditCard className="w-5 h-5" />
              </button>
            )}

            <div className="mt-8 p-4 bg-orange-50 rounded-2xl border border-orange-100">
              <p className="text-xs text-orange-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Pagamento 100% seguro com proteção LocalMark.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShieldCheck: React.FC<{className?: string}> = ({className}) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

export default Cart;
