"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative bg-black text-white min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Elementos de fundo decorativos (Glows) */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan/20 rounded-full filter blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-cyan/10 rounded-full filter blur-[120px]"></div>

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>
      </div>

      <div className="max-w-4xl px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-block bg-cyan/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-cyan/30">
            <span className="text-cyan font-bold tracking-widest text-xs uppercase">Inovação & Tecnologia</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-8xl font-black leading-tight mb-8">
            <span className="text-white">
              Soluções
            </span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-white drop-shadow-[0_0_15px_rgba(0,219,255,0.5)]">
              Inteligentes
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            A <strong className="text-cyan">GEDS Inovação</strong> desenvolve produtos digitais modernos,
            escaláveis e sob medida. Transformamos suas ideias em plataformas de alta performance.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <a
            href="#servicos"
            className="group relative px-8 py-4 bg-cyan text-black rounded-full text-lg font-bold transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,219,255,0.6)] hover:scale-105"
          >
            Nossos Serviços
          </a>
          <Link
            href="/login"
            className="group relative px-8 py-4 border border-cyan/50 text-cyan rounded-full text-lg font-bold transition-all duration-300 hover:bg-cyan/10 hover:shadow-[0_0_20px_rgba(0,219,255,0.2)] hover:scale-105"
          >
            Acessar Plataforma
          </Link>
        </motion.div>

        <div className="mt-20 opacity-30">
          <div className="w-px h-24 bg-gradient-to-b from-cyan to-transparent mx-auto"></div>
        </div>
      </div>
    </section>
  );
}
