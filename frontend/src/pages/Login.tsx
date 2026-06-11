// src/pages/Login.tsx
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import bgImage from '../assets/login-bg.png'; 

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await api.post('token/', {
                username,
                password
            });
            localStorage.setItem('access_token', response.data.access);
            navigate('/dashboard');
        } catch (err) {
            setError('Credenciais inválidas. Tente novamente.');
        }
    };

    return (
        <div 
            className="min-h-screen flex flex-col items-center justify-center p-4 bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            {/* Overlay um pouco mais denso para garantir que os inputs fiquem legíveis */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* CARD - Dark Glassmorphism puro. O 'mt-32' empurra o card para baixo da logo */}
            <div className="bg-black/30 backdrop-blur-xl w-full max-w-md p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] border border-white/10 relative z-10 mt-32">
                
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white tracking-wide">Bem-vindo de volta</h2>
                    <p className="text-gray-400 mt-2 text-sm">Acesse seu painel financeiro</p>
                </div>

                {error && (
                    <div className="bg-red-500/20 border border-red-500/30 text-red-300 p-3.5 rounded-xl mb-6 text-sm text-center backdrop-blur-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">Usuário</label>
                        <input 
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            // Inputs com fundo translúcido escuro e borda fina
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all placeholder:text-gray-600 shadow-inner"
                            placeholder="Digite o e-mail"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">Senha</label>
                        <input 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all placeholder:text-gray-600 shadow-inner"
                            placeholder="Digite a sua senha"
                            required
                        />
                    </div>

                    <button 
                        type="submit"
                        // Botão com gradiente dourado para dar um destaque premium
                        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold py-3.5 rounded-xl transition-all mt-4 shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] transform hover:-translate-y-0.5"
                    >
                        Entrar
                    </button>
                </form>

                <div className="mt-8 text-center text-sm space-y-3">
                    <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors font-medium">Esqueceu a senha?</a>
                    <p className="text-gray-500">
                        Não tem conta? <a href="#" className="text-white hover:text-amber-400 transition-colors font-semibold">Criar uma conta</a>
                    </p>
                </div>
            </div>
        </div>
    );
}