"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";
import SquareReveal from "../components/SquareReveal";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stayLogged, setStayLogged] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação simples
    if (!username || !password) {
      setError("Preencha todos os campos");
      return;
    }

    setLoading(true);

    // Simulação de login (substitua por sua API real)
    setTimeout(() => {
      setLoading(false);
      if (username === "geds235" && password === "admin123") {
        alert("Login bem-sucedido!"); // Substitua por redirecionamento real
      } else {
        setError("Credenciais inválidas");
      }
    }, 1500);
  };

  return (
    <main className="h-screen w-full bg-black overflow-hidden relative">
        <SquareReveal gridSize={12}>
          <div className="w-full h-full flex items-center justify-center p-4 relative"> 
            
            {/* Background Pattern included in the reveal area */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-20 pointer-events-none bg-repeat"></div>
            
            {/* Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-md p-8 bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">Bem-vindo de volta</h2>
                <p className="text-gray-400 text-sm mt-2">Acesse sua conta para continuar</p>
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-red-500/10 text-red-400 border border-red-500/20 p-3 rounded-lg mb-6 text-sm animate-pulse">
                  <FiAlertCircle />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300">Usuário</label>
                  <div className="relative group">
                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-cyan-400 transition-colors duration-300" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all duration-300"
                      placeholder="Seu usuário"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300">Senha</label>
                  <div className="relative group">
                    <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-cyan-400 transition-colors duration-300" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all duration-300"
                      placeholder="Sua senha"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-cyan-400 transition-colors"
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="stayLogged"
                      checked={stayLogged}
                      onChange={() => setStayLogged(!stayLogged)}
                      className="h-4 w-4 rounded border-white/10 bg-black/40 text-cyan-500 focus:ring-cyan-500/20 focus:ring-offset-0 transition-colors"
                    />
                    <label htmlFor="stayLogged" className="ml-2 text-sm text-gray-400 cursor-pointer select-none">
                      Manter conectado
                    </label>
                  </div>

                  <Link href="/esqueci-senha" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors hover:underline decoration-cyan-500/30">
                    Esqueci a senha?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full relative group overflow-hidden bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-[0_0_20px_-5px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_-5px_rgba(6,182,212,0.6)] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10">{loading ? "Entrando..." : "Entrar"}</span>
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:animate-shine" />
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-white/5 text-center">
                <p className="text-sm text-gray-400">
                  Não tem conta?{" "}
                  <Link href="/cadastro" className="text-cyan-400 font-medium hover:text-cyan-300 transition-colors hover:underline decoration-cyan-500/30">
                    Criar nova conta
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </SquareReveal>
    </main>
  );
}
