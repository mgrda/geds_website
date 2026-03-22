'use client';
import Link from "next/link";
import Image from "next/image";
import { LogIn, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-background/80 backdrop-blur-md text-foreground border-b border-cyan/20 shadow-[0_0_20px_rgba(0,219,255,0.1)] sticky top-0 z-50 transition-colors">
      <div className="max-w-[1536px] mx-auto w-full flex justify-between items-center px-4 py-4 lg:px-8">
        {/* Logo da Empresa como link para Home */}
        <Link href="/" className="flex items-center gap-2 xl:gap-3 group shrink-0">
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
          <span className="hidden sm:block font-black text-xl bg-linear-to-r from-foreground to-cyan bg-clip-text text-transparent tracking-tighter">
            GEDS INOVAÇÃO
          </span>
        </Link>

        {/* Navegação principal reduzida */}
        <nav className="hidden lg:flex gap-4 xl:gap-8 items-center flex-1 justify-center px-4">
          {[
            { name: "Início", href: "/" },
            { name: "Sobre", href: "/#about" },
            { name: "Serviços", href: "/servicos" },
            { name: "Network", href: "/geds-network" },
            { name: "Games", href: "/geds-games" }
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative text-xs xl:text-sm font-bold uppercase tracking-widest text-foreground/70 hover:text-cyan transition-all duration-300 py-1 group whitespace-nowrap"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Lado Direito: Theme Toggle + Login + Mobile Menu */}
        <div className="flex items-center justify-end gap-2 md:gap-4 shrink-0">
          <ThemeToggle />

          <Link
            href="/login"
            className="flex items-center gap-2 text-cyan border border-cyan/30 hover:bg-cyan/10 px-4 md:px-5 py-2 rounded-full transition-all duration-300 group shrink-0"
          >
            <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
            <span className="hidden sm:block font-bold text-[10px] md:text-xs uppercase tracking-widest whitespace-nowrap">Entrar</span>
          </Link>

          {/* Menu principal (Hambúrguer para todas as resoluções) */}
          <button
            className="block text-foreground focus:outline-none p-2 rounded-lg hover:bg-foreground/10 transition-colors"
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
            className="bg-background/95 backdrop-blur-xl px-6 py-8 absolute w-full top-full left-0 shadow-2xl border-b border-cyan/20 overflow-hidden"
          >
            <nav className="flex flex-col gap-6 max-h-[70vh] overflow-y-auto">
              {[
                { name: "Início", href: "/" },
                { name: "Sobre", href: "/#about" },
                { name: "Serviços", href: "/servicos" },
                { name: "Segurança", href: "/geds-security" },
                { name: "Network", href: "/geds-network" },
                { name: "Games", href: "/geds-games" },
                { name: "Acessibilidade", href: "/geds-accessibility" },
                { name: "Processos", href: "/processo" },
                { name: "Contato", href: "/contatos" }
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-lg font-bold text-foreground hover:text-cyan transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/#green-tech"
                className="bg-linear-to-r from-emerald-400 to-cyan-400 text-black px-4 py-3 rounded-full transition-all duration-300 font-bold text-center flex items-center justify-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>🌱</span> Green Tech
              </Link>
              <Link
                href="/#geds-lab"
                className="bg-linear-to-r from-cyan to-blue-600 text-white dark:text-foreground px-4 py-3 rounded-full transition-all duration-300 font-bold text-center flex items-center justify-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>🧪</span> GEDS Lab
              </Link>
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