'use client';
import Link from "next/link";
import Image from "next/image";
import { LogIn, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-black/80 backdrop-blur-md text-white border-b border-cyan/20 shadow-[0_0_20px_rgba(0,219,255,0.1)] sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo da Empresa como link para Home */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Image
              src="/GEDS Inovação.png"
              alt="Logo GEDS Inovação"
              width={50}
              height={50}
              className="rounded-full transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-[0_0_15px_rgba(0,219,255,0.6)]"
              priority
            />
            <div className="absolute inset-0 rounded-full bg-cyan/20 blur-md -z-10 group-hover:bg-cyan/40 transition-all"></div>
          </div>
          <span className="hidden sm:block font-black text-xl bg-gradient-to-r from-white to-cyan bg-clip-text text-transparent tracking-tighter">
            GEDS INOVAÇÃO
          </span>
        </Link>

        {/* Navegação principal */}
        <nav className="hidden md:flex gap-8 items-center">
          {[
            { name: "Início", href: "/" },
            { name: "Sobre", href: "/#about" },
            { name: "Expertise", href: "/#servicos" },
            { name: "Metodologia", href: "/#processo" },
            { name: "Cases", href: "/#portfolios" }
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative text-sm font-bold uppercase tracking-widest text-white/70 hover:text-cyan transition-all duration-300 py-1 group"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          <Link
            href="/plans"
            className="bg-cyan text-black px-6 py-2 rounded-full transition-all duration-300 font-black text-sm uppercase tracking-wider hover:bg-white hover:shadow-[0_0_20px_rgba(0,219,255,0.4)]"
          >
            Planos
          </Link>
        </nav>

        {/* Ícone de login */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="flex items-center gap-2 text-cyan border border-cyan/30 hover:bg-cyan/10 px-5 py-2 rounded-full transition-all duration-300 group"
          >
            <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            <span className="hidden sm:block font-bold text-xs uppercase tracking-widest">Entrar</span>
          </Link>

          {/* Menu mobile */}
          <button
            className="block md:hidden text-white focus:outline-none p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Abrir menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6 text-cyan" />
          </button>
        </div>
      </div>

      {/* Menu mobile expandido */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-black/95 backdrop-blur-xl px-6 py-8 absolute w-full top-full left-0 shadow-2xl border-b border-cyan/20 overflow-hidden"
          >
            <nav className="flex flex-col gap-6">
              {[
                { name: "Início", href: "/" },
                { name: "Sobre", href: "/#about" },
                { name: "Expertise", href: "/#servicos" },
                { name: "Metodologia", href: "/#processo" },
                { name: "Cases", href: "/#portfolios" }
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-lg font-bold text-white hover:text-cyan transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/plans"
                className="bg-cyan text-black px-4 py-3 rounded-full transition-all duration-300 font-bold text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Ver Planos
              </Link>
              <Link
                href="/plans"
                className="hidden"
              >
              </Link>
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 border border-cyan/30 text-cyan px-4 py-3 rounded-full transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn className="w-5 h-5" />
                <span className="font-bold">Área do Cliente</span>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;