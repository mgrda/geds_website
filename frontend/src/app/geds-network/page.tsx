"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Network, Server, Wifi, Monitor, Shield, Zap, Leaf, Beaker,
  Activity, AlertTriangle, CheckCircle2, ArrowRight, Headphones,
  TicketCheck, MapPin, Cpu, BarChart3, Radio,
  TrendingDown, TrendingUp, ChevronRight, RotateCcw
} from "lucide-react";

// ── Animated Network Background ─────────────────────────────────
function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    for (let i = 0; i < 35; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      });
    }

    let frame: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      nodes.forEach((a, i) => {
        nodes.forEach((b, j) => {
          if (i >= j) return;
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 160) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(59,130,246,${0.15 * (1 - dist / 160)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
        ctx.beginPath();
        ctx.arc(a.x, a.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(59,130,246,0.5)";
        ctx.fill();
      });

      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
    />
  );
}

// ── Animated Counter ─────────────────────────────────────────────
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let c = 0; const step = target / 60;
        const id = setInterval(() => {
          c += step;
          if (c >= target) { setVal(target); clearInterval(id); }
          else setVal(Math.floor(c));
        }, 16);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

// ── Live Network Dashboard ────────────────────────────────────────
function NetworkDashboard() {
  const [tick, setTick] = useState(0);
  useEffect(() => { const id = setInterval(() => setTick(t => t + 1), 2000); return () => clearInterval(id); }, []);

  const bandwidth = [42, 58, 61, 55, 70, 63, 78, 72, 80, 75, 85, 88 + (tick % 6)];
  const latency = 12 + (tick % 4);
  const devices = 47 + (tick % 3);
  const uptime = 99.97;

  const metrics = [
    { label: "Status da Rede", value: "Online", icon: <Wifi className="w-5 h-5" />, color: "emerald", extra: <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" /> },
    { label: "Uso de Banda", value: `${bandwidth[bandwidth.length - 1]}%`, icon: <BarChart3 className="w-5 h-5" />, color: "blue", extra: null },
    { label: "Dispositivos", value: String(devices), icon: <Monitor className="w-5 h-5" />, color: "purple", extra: null },
    { label: "Latência (ms)", value: String(latency), icon: <Activity className="w-5 h-5" />, color: "cyan", extra: null },
  ];

  const colorMap: Record<string, string> = {
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  };

  return (
    <div className="bg-foreground/[0.02] border border-blue-500/20 rounded-[3rem] p-8 md:p-10 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-foreground font-black text-xl uppercase italic tracking-tighter">Painel de Controle de Rede</h3>
          <p className="text-foreground/40 text-[10px] font-black uppercase tracking-widest">Monitoramento em tempo real</p>
        </div>
        <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 2 }}
          className="flex items-center gap-2 text-emerald-400 text-[10px] font-black bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20 uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-emerald-400" /> AO VIVO
        </motion.div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((m, i) => (
          <motion.div key={i} className={`p-5 rounded-2xl border ${colorMap[m.color]} relative overflow-hidden`}>
            <div className="flex items-center justify-between mb-3">
              <div className={colorMap[m.color].split(' ')[0]}>{m.icon}</div>
              {m.extra}
            </div>
            <p className={`text-2xl font-black ${colorMap[m.color].split(' ')[0]}`}>{m.value}</p>
            <p className="text-foreground/40 text-[9px] font-black uppercase tracking-widest mt-1">{m.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Bandwidth Graph */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-foreground/50 text-[10px] font-black uppercase tracking-widest">Uso de Banda — últimos 12 ciclos</p>
          <span className="text-blue-400 text-[10px] font-black">Mbps</span>
        </div>
        <div className="flex items-end gap-1.5 h-24 bg-foreground/[0.02] rounded-2xl p-3">
          {bandwidth.map((v, i) => (
            <motion.div key={i} className="flex-1 rounded-t-md bg-linear-to-t from-blue-600 to-blue-400 opacity-80"
              style={{ height: `${v}%` }} whileHover={{ opacity: 1 }} />
          ))}
        </div>
      </div>

      {/* Uptime */}
      <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-between">
        <div>
          <p className="text-foreground/40 text-[9px] font-black uppercase tracking-widest">Uptime Total</p>
          <p className="text-3xl font-black text-emerald-400">{uptime}%</p>
        </div>
        <div className="w-16 h-16 rounded-full border-4 border-emerald-500/30 flex items-center justify-center relative">
          <div className="absolute inset-0 rounded-full border-4 border-emerald-400" style={{ clipPath: "inset(0 0 3% 0)" }} />
          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
        </div>
      </div>
    </div>
  );
}

// ── Infrastructure Simulator ──────────────────────────────────────
const companyTypes = [
  { id: "startup", label: "Startup / PME", icon: "🚀" },
  { id: "medium", label: "Empresa Média", icon: "🏢" },
  { id: "enterprise", label: "Enterprise", icon: "🏙️" },
  { id: "hospital", label: "Hospital / Clínica", icon: "🏥" },
];

const problemsList = [
  "Quedas frequentes de internet",
  "Lentidão na rede",
  "Falhas no servidor",
  "Dificuldade em acesso remoto",
  "Sem monitoramento de rede",
];

function InfraSimulator() {
  const [computers, setComputers] = useState(20);
  const [company, setCompany] = useState("");
  const [problems, setProblems] = useState<string[]>([]);
  const [result, setResult] = useState<{ bottleneck: string; solution: string; priority: string } | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const toggleProblem = (p: string) => setProblems(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);

  const analyze = async () => {
    if (!company || problems.length === 0) return;
    setAnalyzing(true);
    await new Promise(r => setTimeout(r, 1800));

    const bottlenecks: Record<string, string> = {
      startup: computers < 15 ? "Infraestrutura básica sem redundância" : "Crescimento acelerado sem planejamento de escalabilidade",
      medium: "Mistura de equipamentos antigos com novos criando gargalos",
      enterprise: "Segmentação inadequada da rede e sobrecarga de switches de distribuição",
      hospital: "Rede crítica sem VLAN dedicada para equipamentos médicos",
    };

    const solutions: Record<string, string> = {
      startup: "Switch gerenciável + firewall dedicado + monitoramento 24/7",
      medium: "Unificação da infraestrutura com switches gerenciáveis e cabeamento estruturado",
      enterprise: "Redesign da topologia de rede com SD-WAN e segmentação por VLAN",
      hospital: "Rede crítica segregada com QoS prioritário e redundância de link",
    };

    setResult({
      bottleneck: bottlenecks[company] || "Infraestrutura mal dimensionada para o volume de usuários",
      solution: solutions[company] || "Auditoria completa seguida de reestruturação gradual",
      priority: problems.length >= 3 ? "Alta" : problems.length === 2 ? "Média" : "Baixa",
    });
    setAnalyzing(false);
  };

  const reset = () => { setResult(null); setComputers(20); setCompany(""); setProblems([]); };

  return (
    <div className="bg-foreground/[0.02] border border-blue-500/20 rounded-[3rem] p-8 md:p-10">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/30 rounded-2xl flex items-center justify-center">
          <Cpu className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h3 className="text-foreground font-black text-xl uppercase italic tracking-tighter">Simulador de Infraestrutura</h3>
          <p className="text-foreground/40 text-[10px] font-black uppercase tracking-widest">Diagnóstico inteligente de rede</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-7">
            {/* Computers slider */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-foreground/60 text-sm font-black uppercase tracking-tight">Computadores / Dispositivos</label>
                <span className="text-blue-400 font-black text-sm">{computers}</span>
              </div>
              <input type="range" min={1} max={500} value={computers}
                onChange={e => setComputers(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer accent-blue-400" />
              <div className="flex justify-between text-[9px] font-black text-foreground/30 uppercase tracking-widest mt-1">
                <span>1</span><span>500</span>
              </div>
            </div>

            {/* Company type */}
            <div>
              <p className="text-foreground/60 text-sm font-black uppercase tracking-tight mb-3">Tipo de Empresa</p>
              <div className="grid grid-cols-2 gap-2">
                {companyTypes.map(c => (
                  <button key={c.id} onClick={() => setCompany(c.id)}
                    className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition-all ${company === c.id ? "bg-blue-500/10 border-blue-500 text-foreground" : "bg-foreground/[0.02] border-foreground/5 text-foreground/40 hover:border-foreground/20"}`}>
                    <span className="text-xl">{c.icon}</span>
                    <span className="text-[11px] font-black uppercase tracking-tight">{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Problems */}
            <div>
              <p className="text-foreground/60 text-sm font-black uppercase tracking-tight mb-3">Problemas Identificados</p>
              <div className="space-y-2">
                {problemsList.map(p => (
                  <button key={p} onClick={() => toggleProblem(p)}
                    className={`w-full flex items-center gap-3 p-4 rounded-2xl border text-left transition-all ${problems.includes(p) ? "bg-yellow-500/10 border-yellow-500/50 text-foreground" : "bg-foreground/[0.02] border-foreground/5 text-foreground/40 hover:border-foreground/20"}`}>
                    <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${problems.includes(p) ? "border-yellow-500 bg-yellow-500" : "border-foreground/20"}`}>
                      {problems.includes(p) && <CheckCircle2 className="w-2.5 h-2.5 text-black" />}
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-tight">{p}</span>
                  </button>
                ))}
              </div>
            </div>

            <button onClick={analyze} disabled={!company || problems.length === 0 || analyzing}
              className="w-full py-5 bg-blue-500 hover:bg-blue-400 text-white font-black rounded-full transition-all disabled:opacity-40 disabled:cursor-not-allowed text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-2">
              {analyzing ? (
                <><motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>⟳</motion.span> Analisando rede...</>
              ) : "Diagnosticar Infraestrutura →"}
            </button>
          </motion.div>
        ) : (
          <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
            <div className={`p-5 rounded-2xl border ${result.priority === "Alta" ? "bg-red-500/10 border-red-500/30" : result.priority === "Média" ? "bg-yellow-500/10 border-yellow-500/30" : "bg-emerald-500/10 border-emerald-500/30"}`}>
              <p className="text-[9px] font-black uppercase tracking-widest text-foreground/50 mb-1">Nível de Prioridade</p>
              <p className={`text-2xl font-black uppercase italic ${result.priority === "Alta" ? "text-red-400" : result.priority === "Média" ? "text-yellow-400" : "text-emerald-400"}`}>{result.priority}</p>
            </div>

            <div className="p-5 rounded-2xl bg-foreground/[0.03] border border-foreground/10">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-yellow-400" />
                <p className="text-[9px] font-black uppercase tracking-widest text-yellow-400">Gargalo Identificado</p>
              </div>
              <p className="text-sm font-bold text-foreground leading-relaxed">{result.bottleneck}</p>
            </div>

            <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/20">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <p className="text-[9px] font-black uppercase tracking-widest text-blue-400">Solução Recomendada</p>
              </div>
              <p className="text-sm font-bold text-foreground leading-relaxed">{result.solution}</p>
            </div>

            <div className="flex gap-3">
              <Link href="/contatos" className="flex-1 text-center py-4 bg-blue-500 hover:bg-blue-400 text-white font-black rounded-full text-[10px] uppercase tracking-[0.2em] transition-all">
                Solicitar Solução
              </Link>
              <button onClick={reset} className="p-4 border border-foreground/10 rounded-full hover:bg-foreground/5 transition-all text-foreground/50">
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Services Data ─────────────────────────────────────────────────
const services = [
  {
    icon: <Headphones className="w-8 h-8" />,
    title: "Suporte Técnico",
    color: "from-blue-500 to-blue-600",
    colorText: "text-blue-400",
    items: ["Atendimento rápido e humanizado", "Manutenção preventiva agendada", "Suporte remoto e presencial"],
  },
  {
    icon: <Network className="w-8 h-8" />,
    title: "Infraestrutura de Redes",
    color: "from-cyan-500 to-blue-500",
    colorText: "text-cyan-400",
    items: ["Montagem de redes corporativas", "Cabeamento estruturado certificado", "Configuração de equipamentos"],
  },
  {
    icon: <Activity className="w-8 h-8" />,
    title: "Monitoramento 24/7",
    color: "from-purple-500 to-blue-600",
    colorText: "text-purple-400",
    items: ["Monitoramento em tempo real", "Alertas automáticos de instabilidade", "Identificação proativa de falhas"],
  },
  {
    icon: <Server className="w-8 h-8" />,
    title: "Gestão de Servidores",
    color: "from-blue-600 to-indigo-600",
    colorText: "text-indigo-400",
    items: ["Configuração e manutenção contínua", "Alta disponibilidade garantida", "Controle de desempenho em tempo real"],
  },
];

// ── Before/After comparison ───────────────────────────────────────
const beforeAfter = [
  { before: "Quedas de internet todo dia", after: "Uptime de 99,97% garantido" },
  { before: "Horas paradas por falha de rede", after: "Failover automático em segundos" },
  { before: "Sem visibilidade da infraestrutura", after: "Dashboard em tempo real" },
  { before: "Suporte lento e sem SLA", after: "Atendimento com SLA definido" },
  { before: "Servidores sem backup", after: "Backup automatizado com versionamento" },
];

// ── Ecosystem ─────────────────────────────────────────────────────
const ecosystem = [
  { name: "GEDS Inovação", icon: <Zap className="w-5 h-5" />, desc: "Sistemas dependem de rede estável", color: "cyan", href: "/" },
  { name: "GEDS Security", icon: <Shield className="w-5 h-5" />, desc: "Proteção da infraestrutura de rede", color: "blue", href: "/geds-security" },
  { name: "GEDS Lab", icon: <Beaker className="w-5 h-5" />, desc: "Testes e inovação em topologias", color: "purple", href: "/geds-lab" },
  { name: "GEDS Green Tech", icon: <Leaf className="w-5 h-5" />, desc: "Eficiência energética dos servidores", color: "emerald", href: "/green-tech" },
];

const ecoColors: Record<string, string> = {
  cyan: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
  blue: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  purple: "bg-purple-500/10 border-purple-500/20 text-purple-400",
  emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
};

// ── Main Page ─────────────────────────────────────────────────────
export default function GedsNetwork() {
  return (
    <main className="bg-background min-h-screen text-foreground overflow-hidden">

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-24 overflow-hidden border-b border-foreground/5">
        <NetworkBackground />

        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-blue-600/8 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-cyan-500/5 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
              className="lg:w-1/2 text-left">

              {/* Badge */}
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.8 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-blue-500/10 border border-blue-500/20 rounded-[2rem] mb-8 relative shadow-[0_0_40px_rgba(59,130,246,0.15)]">
                <Network className="w-10 h-10 text-blue-400 relative z-10" />
                <div className="absolute inset-0 bg-blue-500/10 blur-[20px] rounded-[2rem]" />
              </motion.div>

              <span className="inline-block mb-6 text-blue-400 font-black bg-blue-500/10 px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.4em] border border-blue-500/20">
                Infraestrutura & Conectividade
              </span>

              <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1.05] uppercase italic tracking-tighter text-foreground">
                Infraestrutura <br/>
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-cyan-400 to-blue-500">
                  Inteligente
                </span>
              </h1>

              <p className="text-lg text-foreground/60 max-w-xl mb-12 font-bold uppercase tracking-tight leading-relaxed">
                Soluções completas em redes, suporte técnico e conectividade empresarial para manter sua empresa sempre online.
              </p>

              <div className="flex flex-wrap gap-5">
                <Link href="/contatos"
                  className="inline-flex items-center gap-3 bg-blue-500 hover:bg-blue-400 text-white font-black px-10 py-5 rounded-full transition-all shadow-[0_10px_40px_rgba(59,130,246,0.3)] hover:shadow-[0_15px_50px_rgba(59,130,246,0.5)] uppercase text-[10px] tracking-[0.3em]">
                  Solicitar Análise de Rede
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contatos"
                  className="inline-flex items-center gap-3 border border-foreground/10 text-foreground hover:bg-foreground/5 font-black px-10 py-5 rounded-full transition-all uppercase text-[10px] tracking-[0.3em]">
                  <Headphones className="w-4 h-4" />
                  Falar com Suporte
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-20 pt-10 border-t border-foreground/5">
                {[
                  { label: "Uptime Médio", value: 99, suffix: ".97%" },
                  { label: "Clientes Ativos", value: 80, suffix: "+" },
                  { label: "Incidentes Resolvidos", value: 1200, suffix: "+" },
                  { label: "Suporte em Minutos", value: 15, suffix: "" },
                ].map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
                    <p className="text-3xl font-black text-blue-400 uppercase italic">
                      <Counter target={s.value} suffix={s.suffix} />
                    </p>
                    <p className="text-foreground/40 text-[9px] font-black uppercase tracking-widest mt-1">{s.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Image Section */}
            <motion.div className="lg:w-1/2 relative" initial={{ opacity: 0, scale: 0.95, x: 30 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 1 }}>
              <div className="relative z-10 w-full aspect-[4/5] sm:aspect-square overflow-hidden rounded-[3rem] border border-foreground/10 shadow-2xl group">
                <Image src="/GEDS Network.png" alt="GEDS Network Impact" fill className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]" priority />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 right-10 p-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                      <Wifi className="text-blue-400 w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-white font-black text-lg leading-none uppercase italic">Conectividade</p>
                      <p className="text-blue-400 text-[9px] uppercase font-black tracking-widest mt-1">Sempre Online</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-500/15 rounded-full blur-[100px] -z-10 animate-pulse" />
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-cyan-500/15 rounded-full blur-[100px] -z-10 animate-pulse" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-b border-foreground/5 bg-foreground/[0.01]">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-block mb-4 text-blue-400 font-black bg-blue-500/10 px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.4em] border border-blue-500/20">
              Nossos Serviços
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-foreground uppercase italic tracking-tighter">
              Cobertura <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">Completa</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }} whileHover={{ y: -6 }}
                className="group p-8 rounded-[2.5rem] bg-foreground/[0.02] border border-foreground/5 hover:border-blue-500/30 transition-all duration-300">
                <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${s.color} flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform shadow-xl`}>
                  {s.icon}
                </div>
                <h3 className="text-lg font-black text-foreground mb-5 uppercase italic tracking-tight">{s.title}</h3>
                <ul className="space-y-3">
                  {s.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${s.colorText}`} />
                      <span className="text-foreground/60 text-xs font-bold uppercase tracking-tight">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DASHBOARD + SIMULATOR ─────────────────────────────────── */}
      <section className="py-24 px-6 border-b border-foreground/5">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-block mb-4 text-blue-400 font-black bg-blue-500/10 px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.4em] border border-blue-500/20">
              Ferramentas Interativas
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-foreground uppercase italic tracking-tighter">
              Visualize & <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">Diagnostique</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <NetworkDashboard />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
              <InfraSimulator />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ────────────────────────────────────────── */}
      <section className="py-24 px-6 border-b border-foreground/5 bg-foreground/[0.01]">
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-block mb-4 text-yellow-400 font-black bg-yellow-500/10 px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.4em] border border-yellow-500/20">
              Por que isso Importa?
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-foreground uppercase italic tracking-tighter">
              O Custo da <span className="text-transparent bg-clip-text bg-linear-to-r from-red-400 to-yellow-400">Instabilidade</span>
            </h2>
            <p className="text-foreground/50 max-w-xl mx-auto mt-4 font-bold uppercase text-xs tracking-widest">
              Cada hora parada custa dinheiro. Veja a diferença com a GEDS Network.
            </p>
          </motion.div>

          {/* Column Headers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/20">
              <TrendingDown className="w-5 h-5 text-red-400" />
              <span className="text-red-400 font-black text-sm uppercase tracking-widest">Sem GEDS Network</span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400 font-black text-sm uppercase tracking-widest">Com GEDS Network</span>
            </div>
          </div>

          <div className="space-y-3">
            {beforeAfter.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-5 rounded-2xl bg-red-500/5 border border-red-500/10">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                  <span className="text-foreground/60 text-xs font-bold uppercase tracking-tight">{item.before}</span>
                </div>
                <div className="flex items-center gap-3 p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-foreground/80 text-xs font-bold uppercase tracking-tight">{item.after}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ECOSYSTEM ─────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-b border-foreground/5">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-block mb-4 text-blue-400 font-black bg-blue-500/10 px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.4em] border border-blue-500/20">
              Integração com o Ecossistema
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-foreground uppercase italic tracking-tighter">
              Conectado a <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">tudo</span>
            </h2>
          </motion.div>

          {/* Network node visualization */}
          <div className="flex flex-col items-center mb-12">
            <div className="relative w-full max-w-3xl">
              {/* Center node */}
              <div className="flex justify-center mb-8">
                <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 3 }}
                  className="w-24 h-24 bg-blue-500/10 border-2 border-blue-500/40 rounded-3xl flex flex-col items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.2)] relative z-10">
                  <Network className="w-8 h-8 text-blue-400" />
                  <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest mt-1">GEDS<br/>Network</p>
                </motion.div>
              </div>

              {/* Connections */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {ecosystem.map((eco, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -4 }}>
                    <Link href={eco.href}
                      className={`flex flex-col items-center p-6 rounded-2xl border ${ecoColors[eco.color]} text-center group transition-all hover:scale-105`}>
                      <div className={`w-12 h-12 rounded-xl ${ecoColors[eco.color]} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                        {eco.icon}
                      </div>
                      <p className="font-black text-sm uppercase tracking-tight text-foreground mb-1">{eco.name}</p>
                      <p className="text-foreground/40 text-[9px] font-bold uppercase tracking-tight leading-tight">{eco.desc}</p>
                      <ChevronRight className="w-3 h-3 text-foreground/30 mt-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SPECIALIZED CTA ───────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative rounded-[3.5rem] overflow-hidden border border-blue-500/20 bg-linear-to-br from-blue-950/40 via-background to-cyan-950/20 p-12 md:p-20">

            {/* Top line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-full bg-linear-to-r from-transparent via-blue-500 to-transparent" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px]" />

            <div className="text-center mb-12 relative z-10">
              <Radio className="w-12 h-12 text-blue-400 mx-auto mb-6" />
              <h2 className="text-4xl md:text-6xl font-black text-foreground mb-4 uppercase italic tracking-tighter">
                Suporte Especializado <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">Quando Você Precisa</span>
              </h2>
              <p className="text-foreground/50 max-w-xl mx-auto font-bold uppercase text-xs tracking-widest">
                Nossa equipe técnica está pronta para agir. SLA definido, atendimento humano e resolução rápida.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
              {[
                { icon: <Headphones className="w-6 h-6" />, label: "Falar com Suporte Técnico", desc: "Atendimento imediato", color: "blue", href: "/contatos" },
                { icon: <TicketCheck className="w-6 h-6" />, label: "Abrir Chamado", desc: "SLA garantido", color: "purple", href: "/contatos" },
                { icon: <MapPin className="w-6 h-6" />, label: "Solicitar Visita Técnica", desc: "Equipe presencial", color: "cyan", href: "/contatos" },
              ].map((btn, i) => (
                <motion.div key={i} whileHover={{ y: -4 }} whileTap={{ scale: 0.97 }}>
                  <Link href={btn.href}
                    className={`flex flex-col items-center text-center p-8 rounded-[2rem] border ${ecoColors[btn.color]} hover:opacity-90 transition-all group`}>
                    <div className={`w-14 h-14 rounded-2xl ${ecoColors[btn.color]} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                      {btn.icon}
                    </div>
                    <p className="font-black text-foreground text-sm uppercase italic tracking-tight mb-1">{btn.label}</p>
                    <p className="text-foreground/40 text-[9px] font-black uppercase tracking-widest">{btn.desc}</p>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-12 relative z-10">
              <Link href="/contatos"
                className="inline-flex items-center gap-3 bg-blue-500 hover:bg-blue-400 text-white font-black px-12 py-5 rounded-full transition-all shadow-[0_10px_40px_rgba(59,130,246,0.3)] hover:shadow-[0_15px_50px_rgba(59,130,246,0.5)] uppercase text-[10px] tracking-[0.3em]">
                Quero uma Infraestrutura Estável
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
