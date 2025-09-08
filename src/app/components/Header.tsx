'use client';
import Link from "next/link";
import { LogIn, Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo da Empresa como link para Home */}
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/GEDS Inovação.png"
            alt="Logo GEDS Inovação"
            width={50}
            height={50}
            className="rounded-full transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg"
          />
          <span className="hidden sm:block font-bold text-xl bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
            GEDS Inovação
          </span>
        </Link>

        {/* Navegação principal */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link 
            href="/#hero" 
            className="hover:text-cyan-300 transition-colors duration-300 font-medium py-2"
          >
            Início
          </Link>
          <Link 
            href="/#about" 
            className="hover:text-cyan-300 transition-colors duration-300 font-medium py-2"
          >
            Sobre
          </Link>
          <Link 
            href="/#servicos" 
            className="hover:text-cyan-300 transition-colors duration-300 font-medium py-2"
          >
            Serviços
          </Link>
          <Link 
            href="/#processo" 
            className="hover:text-cyan-300 transition-colors duration-300 font-medium py-2"
          >
            Processos
          </Link>
          <Link 
            href="/#portfolios" 
            className="hover:text-cyan-300 transition-colors duration-300 font-medium py-2"
          >
            Portfólios
          </Link>
          <Link 
            href="/plans" 
            className="bg-blue-500 hover:bg-cyan-500 px-4 py-2 rounded-full transition-all duration-300 font-medium shadow-md hover:shadow-cyan-500/30"
          >
            Nossos Planos
          </Link>
        </nav>

        {/* Ícone de login */}
        <Link 
          href="/login" 
          className="flex items-center gap-1 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all duration-300 ml-4 group"
        >
          <LogIn className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:block font-medium">Entrar</span>
        </Link>

        {/* Menu mobile */}
        <button
          className="block md:hidden text-white focus:outline-none ml-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Abrir menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Menu mobile expandido */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-800/95 backdrop-blur-sm px-6 py-4 absolute w-full top-full left-0 shadow-xl">
          <nav className="flex flex-col gap-4">
            <Link 
              href="/#hero" 
              className="hover:text-cyan-300 transition-colors py-2 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link 
              href="/#about" 
              className="hover:text-cyan-300 transition-colors py-2 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre
            </Link>
            <Link 
              href="/#servicos" 
              className="hover:text-cyan-300 transition-colors py-2 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Serviços
            </Link>
            <Link 
              href="/#processo" 
              className="hover:text-cyan-300 transition-colors py-2 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Processos
            </Link>
            <Link 
              href="/#portfolios" 
              className="hover:text-cyan-300 transition-colors py-2 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Portfólios
            </Link>
            <Link 
              href="/plans" 
              className="bg-blue-500 hover:bg-cyan-500 px-4 py-2 rounded-full transition-all duration-300 font-medium my-2 text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Nossos Planos
            </Link>
            <Link 
              href="/login" 
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all duration-300 mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <LogIn className="w-5 h-5" />
              <span>Entrar</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;