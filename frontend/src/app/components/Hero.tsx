"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { FiArrowRight, FiActivity, FiZap, FiTrendingUp, FiShield } from "react-icons/fi";

const INITIAL_PARTICLES = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: (i * 13) % 100,
  y: (i * 17) % 100,
  size: (i % 3) + 1,
  duration: (i % 8) + 5,
  delay: (i % 5),
}));

const METRICS = [
  { label: "Projetos Entregues", value: 50, suffix: "+", icon: FiActivity, color: "cyan" },
  { label: "Clientes Ativos", value: 30, suffix: "+", icon: FiZap, color: "emerald" },
  { label: "Economia Gerada", value: 40, suffix: "%", icon: FiTrendingUp, color: "cyan" },
  { label: "Uptime Garantido", value: 99, suffix: "%", icon: FiShield, color: "emerald" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = target / 60;
          const interval = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(interval);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

const TYPING_PHRASES = [
  "Transformação Digital",
  "Automação Inteligente",
  "Inovação Sustentável",
  "Crescimento Exponencial",
];

function TypingText() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrase = TYPING_PHRASES[phraseIndex];
    const speed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayed.length < phrase.length) {
          setDisplayed(phrase.slice(0, displayed.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (displayed.length > 0) {
          setDisplayed(displayed.slice(0, -1));
        } else {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % TYPING_PHRASES.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, phraseIndex]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
      {displayed}
      <span className="animate-pulse text-cyan-400">|</span>
    </span>
  );
}

export default function Hero() {
  const [showDiagnostic, setShowDiagnostic] = useState(false);

  return (
    <section
      id="hero"
      className="relative bg-black text-white min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {INITIAL_PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-cyan-400/30"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.6, 0.1],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,219,255,0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,219,255,0.8) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Glow orbs */}
        <div className="absolute top-[-15%] left-[-10%] w-[55%] h-[55%] bg-cyan-500/10 rounded-full filter blur-[130px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full filter blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[30%] bg-cyan-400/5 rounded-full filter blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Main Content */}
      <div className="max-w-5xl px-6 text-center relative z-10 pt-20">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">
            Startup de Tecnologia e Inovação
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-4">
            <span className="text-white">Sua empresa precisa de</span>
            <br />
            <TypingText />
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          A <strong className="text-cyan-400">GEDS Inovação</strong> transforma desafios empresariais em
          soluções digitais de alto impacto. Do diagnóstico à entrega, somos seu parceiro estratégico
          em cada etapa da jornada.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16"
        >
          <button
            onClick={() => setShowDiagnostic(true)}
            className="group w-full sm:w-auto text-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-black rounded-full text-base transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,219,255,0.5)] hover:scale-105 flex items-center justify-center gap-3"
          >
            <span>🧠</span>
            Fazer Diagnóstico Inteligente
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </button>
          <Link
            href="/contatos"
            className="w-full sm:w-auto text-center px-8 py-4 border border-cyan-500/40 text-cyan-400 rounded-full text-base font-bold transition-all duration-300 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(0,219,255,0.2)] hover:scale-105"
          >
            Falar com Especialista
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-wrap justify-center gap-4 mb-16 text-xs text-gray-500"
        >
          {["🔒 Dados Seguros", "⚡ Entrega Ágil", "🌱 Sustentável", "🤖 IA Integrada"].map((tag) => (
            <span key={tag} className="flex items-center gap-1">{tag}</span>
          ))}
        </motion.div>
      </div>

      {/* Metrics Strip */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="w-full max-w-5xl px-6 relative z-10"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {METRICS.map((metric, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -4 }}
              className="bg-white/[0.03] backdrop-blur-sm border border-white/10 hover:border-cyan-500/30 rounded-2xl p-5 text-center transition-all duration-300"
            >
              <metric.icon
                className={`mx-auto mb-2 w-5 h-5 ${metric.color === "cyan" ? "text-cyan-400" : "text-emerald-400"}`}
              />
              <div className={`text-2xl md:text-3xl font-black mb-1 ${metric.color === "cyan" ? "text-cyan-400" : "text-emerald-400"}`}>
                <AnimatedCounter target={metric.value} suffix={metric.suffix} />
              </div>
              <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-gray-600 text-[10px] uppercase tracking-widest">Explorar</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-12 bg-gradient-to-b from-cyan-500/50 to-transparent"
        />
      </motion.div>

      {/* Diagnostic Modal */}
      <AnimatePresence>
        {showDiagnostic && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setShowDiagnostic(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black border border-cyan-500/30 rounded-3xl p-8 max-w-lg w-full shadow-[0_0_60px_rgba(0,219,255,0.15)]"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-cyan-500/20">
                  <span className="text-3xl">🧠</span>
                </div>
                <h3 className="text-2xl font-black text-white mb-2">Raio-X Digital</h3>
                <p className="text-gray-400 text-sm">Avalie o nível tecnológico da sua empresa em 60 segundos</p>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  "Sua empresa ainda usa processos manuais?",
                  "Você perde tempo com tarefas repetitivas?",
                  "Clientes reclamam de lentidão no atendimento?",
                  "Você não tem dados claros sobre seu negócio?",
                ].map((q, i) => (
                  <DiagnosticQuestion key={i} question={q} index={i} />
                ))}
              </div>

              <Link
                href="/contatos"
                onClick={() => setShowDiagnostic(false)}
                className="block w-full text-center py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-black rounded-full hover:shadow-[0_0_30px_rgba(0,219,255,0.4)] transition-all"
              >
                Ver meu diagnóstico completo →
              </Link>
              <button
                onClick={() => setShowDiagnostic(false)}
                className="block w-full text-center py-3 text-gray-600 text-sm mt-3 hover:text-gray-400 transition-colors"
              >
                Fechar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function DiagnosticQuestion({ question, index }: { question: string; index: number }) {
  const [answer, setAnswer] = useState<null | boolean>(null);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-center justify-between gap-4 p-3 bg-white/[0.03] rounded-xl border border-white/5"
    >
      <p className="text-gray-300 text-sm flex-1">{question}</p>
      <div className="flex gap-2 shrink-0">
        <button
          onClick={() => setAnswer(true)}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${answer === true ? "bg-red-500 text-white" : "bg-white/5 text-gray-400 hover:bg-red-500/20"}`}
        >
          Sim
        </button>
        <button
          onClick={() => setAnswer(false)}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${answer === false ? "bg-emerald-500 text-white" : "bg-white/5 text-gray-400 hover:bg-emerald-500/20"}`}
        >
          Não
        </button>
      </div>
    </motion.div>
  );
}
