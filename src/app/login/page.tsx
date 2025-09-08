"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";

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
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Entrar</h2>
        
        {error && (
          <div className="flex items-center gap-2 bg-red-100 text-red-700 p-3 rounded-lg mb-4">
            <FiAlertCircle />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Usuário</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Seu usuário"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Senha</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Sua senha"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
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
                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="stayLogged" className="ml-2 text-sm text-gray-700">
                Manter Conectado
              </label>
            </div>
            
            <Link href="/esqueci-senha" className="text-sm text-blue-600 hover:underline">
              Esqueci a Senha?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex justify-center items-center disabled:opacity-70"
          >
            {loading ? "Carregando..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-600">
          Não tem conta?{" "}
          <Link href="/cadastro" className="text-blue-600 font-medium hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </main>
  );
}