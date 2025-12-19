
import React, { useState } from 'react';
import { Mail, Lock, User, Store, ArrowRight, Github } from 'lucide-react';
import { useApp } from '../store';
import { UserRole } from '../types';

interface LoginProps {
  onSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onSuccess }) => {
  const { login } = useApp();
  const [isRegistering, setIsRegistering] = useState(false);
  const [role, setRole] = useState<UserRole>(UserRole.BUYER);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email || 'user@localmark.ao', role);
    onSuccess();
  };

  return (
    <div className="container mx-auto px-4 py-20 flex justify-center">
      <div className="w-full max-w-lg bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-2xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            {isRegistering ? 'Criar Nova Conta' : 'Bem-vindo de Volta'}
          </h2>
          <p className="text-gray-500">Escolha como deseja aceder à plataforma</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <button 
            onClick={() => setRole(UserRole.BUYER)}
            className={`p-4 rounded-2xl flex flex-col items-center gap-2 border-2 transition-all ${role === UserRole.BUYER ? 'border-orange-600 bg-orange-50 text-orange-600' : 'border-gray-100 text-gray-500 hover:border-gray-200'}`}
          >
            <User className="w-6 h-6" />
            <span className="font-bold text-sm">Comprador</span>
          </button>
          <button 
            onClick={() => setRole(UserRole.SELLER)}
            className={`p-4 rounded-2xl flex flex-col items-center gap-2 border-2 transition-all ${role === UserRole.SELLER ? 'border-orange-600 bg-orange-50 text-orange-600' : 'border-gray-100 text-gray-500 hover:border-gray-200'}`}
          >
            <Store className="w-6 h-6" />
            <span className="font-bold text-sm">Vendedor</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {isRegistering && (
             <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Nome Completo" 
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-orange-500 transition-all"
              />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email" 
              className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-orange-500 transition-all"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="password" 
              required
              placeholder="Senha" 
              className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-orange-500 transition-all"
            />
          </div>

          {!isRegistering && (
            <div className="text-right">
              <a href="#" className="text-sm font-semibold text-orange-600 hover:underline">Esqueceu a senha?</a>
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-orange-700 transition-all shadow-lg shadow-orange-100"
          >
            {isRegistering ? 'Criar Conta' : 'Entrar na Conta'} <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-100 text-center">
          <p className="text-gray-500 text-sm mb-4">Ou continuar com</p>
          <div className="flex justify-center gap-4">
            <button className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"><Github className="w-6 h-6" /></button>
            <button className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <svg className="w-6 h-6" viewBox="0 0 24 24"><path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/></svg>
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-sm font-bold text-gray-600 hover:text-orange-600"
          >
            {isRegistering ? 'Já tens conta? Entrar' : 'Novo no LocalMark? Criar conta'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
