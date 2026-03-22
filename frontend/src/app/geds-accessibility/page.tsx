"use client";

import { motion } from "framer-motion";
import {
  Accessibility,
  Type,
  Contrast,
  Brain,
  Zap,
  CheckCircle2,
  ArrowRight,
  Volume2
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";

const features = [
  {
    icon: <Type className="w-6 h-6 md:w-8 md:h-8" />,
    title: "Tipografia Adaptativa",
    desc: "Ajuste instantâneo do tamanho da fonte para uma leitura personalizada em qualquer dispositivo.",
    color: "from-cyan-500 to-blue-500",
    shadow: "shadow-cyan-500/20"
  },
  {
    icon: <Brain className="w-6 h-6 md:w-8 md:h-8" />,
    title: "Modo Disléxico",
    desc: "Fontes e espaçamentos validados cientificamente para facilitar a leitura por pessoas com dislexia.",
    color: "from-purple-500 to-indigo-500",
    shadow: "shadow-purple-500/20"
  },
  {
    icon: <Contrast className="w-6 h-6 md:w-8 md:h-8" />,
    title: "Alto Contraste",
    desc: "Paletas otimizadas em tempo real para garantir legibilidade e reduzir a fadiga ocular.",
    color: "from-blue-600 to-blue-400",
    shadow: "shadow-blue-600/20"
  },
  {
    icon: <Zap className="w-6 h-6 md:w-8 md:h-8" />,
    title: "Filtros Cromáticos",
    desc: "Modos específicos para Daltonismo, garantindo que a cor não seja uma barreira.",
    color: "from-amber-400 to-orange-500",
    shadow: "shadow-orange-500/20"
  }
];

const benefits = [
  { title: "Navegação por Voz", desc: "Controle total via comandos inteligentes.", icon: <Volume2 className="w-5 h-5 text-cyan-400" /> },
  { title: "IA Semântica", desc: "Leitores de tela aprimorados com IA.", icon: <Brain className="w-5 h-5 text-cyan-400" /> }
];

export default function AccessibilityPage() {
  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-cyan-500 selection:text-black">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-16 md:pt-40 md:pb-32 overflow-hidden border-b border-foreground/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] md:w-[1200px] md:h-[700px] bg-cyan-600/10 blur-[100px] md:blur-[150px] rounded-full" />
          <div className="absolute top-[20%] right-[10%] w-[200px] h-[200px] md:w-[500px] md:h-[500px] bg-purple-600/5 blur-[80px] md:blur-[120px] rounded-full" />
        </div>

        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            className="w-14 h-14 md:w-20 md:h-20 bg-foreground/[0.04] border border-foreground/10 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center mx-auto mb-8 md:mb-12 backdrop-blur-xl shadow-2xl"
          >
            <Accessibility className="w-6 h-6 md:w-10 md:h-10 text-cyan-400" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 md:space-y-6">
            <h1 className="text-4xl md:text-8xl font-extrabold mb-4 md:mb-8 tracking-tighter leading-none text-cyan-500">
              GEDS <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">Accessibility</span>
            </h1>
            <p className="text-sm md:text-2xl text-foreground/70 max-w-2xl mx-auto leading-relaxed font-medium">
              Engenharia de inclusão para uma experiência física e digital <span className="text-foreground italic">totalmente universal</span>.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="mt-8 md:mt-12 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="#recursos" className="px-8 py-4 bg-cyan-500 text-black font-bold rounded-full hover:bg-cyan-400 hover:scale-105 transition-all uppercase text-[10px] tracking-wider shadow-lg">
              Ver Recursos
            </Link>
            <Link href="/contatos" className="px-8 py-4 border border-foreground/10 text-foreground font-bold rounded-full hover:bg-foreground/5 transition-all uppercase text-[10px] tracking-wider">
              Auditoria Grátis
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── VISUAL IMAGE - Improved with better sizing and text below ── */}
      <section className="py-12 md:py-24 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Image Container - Better proportions */}
            <div className="relative w-full aspect-[16/9] rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-foreground/10 shadow-2xl group bg-foreground/[0.02]">
              <Image 
                src="/GEDS Accessibility.png" 
                alt="Plataforma GEDS Accessibility" 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
            </div>
            
            {/* Text below image */}
            <div className="text-center space-y-4">
              <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-cyan-500 bg-cyan-500/10 px-6 py-2 rounded-full border border-cyan-500/20">
                Interface Universal
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-foreground">
                Inclusão <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">Inteligente</span>
              </h2>
              <p className="text-sm md:text-base text-foreground/60 max-w-2xl mx-auto leading-relaxed">
                Nossa plataforma adapta-se automaticamente às necessidades de cada usuário, garantindo uma experiência digital verdadeiramente universal.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES GRID ────────────────────────────────────────── */}
      <section id="recursos" className="py-20 md:py-32 px-6 bg-foreground/[0.01] border-y border-foreground/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24 space-y-3">
            <span className="text-cyan-500 text-[9px] font-bold uppercase tracking-widest bg-cyan-500/10 px-6 py-2 rounded-full border border-cyan-500/20">Ecossistema GEDS</span>
            <h2 className="text-3xl md:text-6xl font-extrabold tracking-tight text-cyan-500">Funcionalidades</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {features.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-foreground/[0.02] border border-foreground/5 hover:border-cyan-500/20 transition-all duration-500 shadow-xl">
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-linear-to-br ${item.color} flex items-center justify-center text-black mb-10 group-hover:scale-110 transition-transform shadow-lg ${item.shadow}`}>
                  {item.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4 tracking-tight">{item.title}</h3>
                <p className="text-foreground/50 text-[12px] md:text-sm leading-relaxed font-medium group-hover:text-foreground/70 transition-colors">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY & BENEFITS ────────────────────────────────── */}
      <section className="py-20 border-y border-foreground/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-block text-cyan-500 text-[9px] font-bold uppercase tracking-widest bg-cyan-500/10 px-6 py-2 rounded-full border border-cyan-500/20">
                Manifesto
              </span>
              <h2 className="text-3xl md:text-6xl font-extrabold tracking-tighter leading-[0.9] text-foreground">
                Filosofia de <br /><span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">Diversidade</span>.
              </h2>
            </div>
            <p className="text-sm md:text-lg text-foreground/50 leading-relaxed font-medium">
              O GEDS Accessibility opera de forma invisível, garantindo que o seu produto atenda as normas WCAG 2.1 AA sem comprometer o design premium da sua marca.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {benefits.map((benefit, i) => (
                <div key={i} className="p-5 rounded-3xl bg-foreground/[0.03] border border-foreground/5 flex flex-col gap-4 hover:border-cyan-500/20 transition-colors">
                  <div className="text-cyan-400">{benefit.icon}</div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-foreground">{benefit.title}</h4>
                  <p className="text-[10px] text-foreground/40 font-medium tracking-tight">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {[
              "Conformidade WCAG 2.1 AA",
              "Navegação Assistida por IA",
              "Interface Adaptativa Real-Time",
              "Sistemas de Alerta Visual SOS"
            ].map((text, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-6 rounded-3xl bg-foreground/[0.02] border border-foreground/5 group hover:border-cyan-500/20 hover:bg-foreground/[0.04] transition-colors">
                <CheckCircle2 className="w-5 h-5 text-cyan-500 shrink-0" />
                <span className="text-[10px] font-bold text-foreground/60 uppercase tracking-wider group-hover:text-foreground transition-colors">{text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <section className="relative py-32 md:py-48 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[150px] rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-10">
          <h2 className="text-4xl md:text-8xl font-extrabold tracking-tighter leading-[0.85] text-foreground">
            Tecnologia <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">Totalmente Livre.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
            <Link href="/contatos"
              className="group inline-flex items-center justify-center gap-4 px-12 py-6 bg-cyan-500 text-black font-bold rounded-full hover:bg-cyan-400 transition-all shadow-2xl transform hover:-translate-y-1 uppercase text-[10px] tracking-wider">
              Solicitar Auditoria
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
            </Link>
            <Link href="/servicos"
              className="inline-flex items-center justify-center gap-4 px-12 py-6 border border-foreground/10 text-foreground font-bold rounded-full hover:bg-foreground/5 transition-all uppercase text-[10px] tracking-wider">
              Ver Outros Serviços
            </Link>
          </div>
          <p className="text-[9px] font-bold uppercase tracking-wider text-foreground/20">Design • Engenharia • Inclusão</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}