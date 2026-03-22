"use client";

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Leaf, Zap, Globe2, Wind, Sun, Droplets, Target, TrendingUp, Award } from 'lucide-react';
import Link from 'next/link';

// ── Animated Counter ─────────────────────────────────────────────
function AnimCounter({ target, suffix = '', decimals = 0 }: { target: number; suffix?: string; decimals?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let c = 0; const step = target / 80;
        const id = setInterval(() => {
          c += step;
          if (c >= target) { setVal(target); clearInterval(id); }
          else setVal(parseFloat(c.toFixed(decimals)));
        }, 16);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, decimals]);
  return <span ref={ref}>{decimals > 0 ? val.toFixed(decimals) : Math.floor(val)}{suffix}</span>;
}

// ── Environmental Simulator ───────────────────────────────────────
function EnvSimulator() {
  const [digitalDocs, setDigitalDocs] = useState(1000);
  const [autoProcesses, setAutoProcesses] = useState(50);
  const [remoteWork, setRemoteWork] = useState(30);
  const trees = Math.round((digitalDocs * 0.005) + (remoteWork * 0.8));
  const co2 = ((autoProcesses * 0.12) + (remoteWork * 1.5) + (digitalDocs * 0.002)).toFixed(1);
  const energy = Math.round((autoProcesses * 0.4) + (remoteWork * 2.3) + (digitalDocs * 0.001));
  return (
    <div className="bg-linear-to-br from-emerald-950/40 to-background border border-emerald-500/20 rounded-[2.5rem] p-6 md:p-8">
      <div className="flex items-center gap-3 mb-4">
        <Globe2 className="w-6 h-6 text-emerald-400" />
        <h3 className="text-foreground font-black text-lg uppercase italic tracking-tighter">Simulador de Impacto Ambiental</h3>
      </div>
      <p className="text-foreground/50 text-sm mb-6 font-bold uppercase tracking-tight">Configure o perfil da sua empresa e veja o impacto positivo</p>
      <div className="space-y-5 mb-6">
        {[
          { label: 'Documentos digitalizados/mês', icon: <Leaf className="w-4 h-4 text-emerald-400"/>, val: digitalDocs, set: setDigitalDocs, min: 100, max: 10000, step: 100, display: digitalDocs.toLocaleString('pt-BR') },
          { label: 'Processos automatizados (%)', icon: <Zap className="w-4 h-4 text-emerald-400"/>, val: autoProcesses, set: setAutoProcesses, min: 0, max: 100, step: 1, display: `${autoProcesses}%` },
          { label: 'Equipe em trabalho remoto (%)', icon: <Wind className="w-4 h-4 text-emerald-400"/>, val: remoteWork, set: setRemoteWork, min: 0, max: 100, step: 1, display: `${remoteWork}%` },
        ].map((s, i) => (
          <div key={i}>
            <div className="flex justify-between mb-2">
              <label className="text-foreground/60 text-sm flex items-center gap-2 font-bold">{s.icon} {s.label}</label>
              <span className="text-foreground font-black text-sm">{s.display}</span>
            </div>
            <input type="range" min={s.min} max={s.max} step={s.step} value={s.val} onChange={e => s.set(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer accent-emerald-400" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[{ icon: '🌳', label: 'Árvores', value: trees, color: 'emerald' }, { icon: '🌍', label: 'CO₂ (ton)', value: co2, color: 'cyan' }, { icon: '⚡', label: 'kWh', value: energy, color: 'yellow' }].map((item, i) => (
          <motion.div key={`${i}-${item.value}`} className={`bg-${item.color}-500/5 border border-${item.color}-500/15 rounded-2xl p-3 text-center`} animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 0.3 }}>
            <div className="text-xl mb-1">{item.icon}</div>
            <div className={`text-xl font-black text-${item.color}-400`}>{item.value}</div>
            <div className="text-foreground/30 text-[9px] uppercase tracking-wider mt-1 font-black">{item.label}</div>
          </motion.div>
        ))}
      </div>
      <Link href="/contatos" className="mt-2 block w-full text-center py-4 bg-linear-to-r from-emerald-500 to-cyan-500 text-black font-black rounded-full text-[10px] uppercase tracking-[0.3em] hover:shadow-[0_0_20px_rgba(52,211,153,0.4)] transition-all">
        Quero ter esse impacto →
      </Link>
    </div>
  );
}

// ── Energy Calculator ─────────────────────────────────────────────
function EnergyCalculator() {
  const [servers, setServers] = useState(5);
  const [cloudMigration, setCloudMigration] = useState(50);
  const currentCost = servers * 800;
  const afterCost = Math.round(currentCost * (1 - cloudMigration / 150));
  const savings = currentCost - afterCost;
  const co2 = (servers * 0.5 * (cloudMigration / 100)).toFixed(1);
  return (
    <div className="bg-linear-to-br from-cyan-950/30 to-background border border-cyan-500/20 rounded-[2.5rem] p-6 md:p-8">
      <div className="flex items-center gap-3 mb-4">
        <Zap className="w-6 h-6 text-cyan-400" />
        <h3 className="text-foreground font-black text-lg uppercase italic tracking-tighter">Calculadora de Economia</h3>
      </div>
      <p className="text-foreground/50 text-sm mb-6 font-bold uppercase tracking-tight">Estime a redução de custos com migração para cloud</p>
      <div className="space-y-5 mb-6">
        {[
          { label: 'Servidores físicos atuais', val: servers, set: setServers, min: 1, max: 50, display: String(servers) },
          { label: 'Migração para cloud (%)', val: cloudMigration, set: setCloudMigration, min: 10, max: 100, display: `${cloudMigration}%` },
        ].map((s, i) => (
          <div key={i}>
            <div className="flex justify-between mb-2">
              <label className="text-foreground/60 text-sm font-bold">{s.label}</label>
              <span className="text-foreground font-black text-sm">{s.display}</span>
            </div>
            <input type="range" min={s.min} max={s.max} value={s.val} onChange={e => s.set(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer accent-cyan-400" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-red-500/5 border border-red-500/15 rounded-2xl p-4 text-center">
          <p className="text-red-400 text-[9px] uppercase tracking-wider mb-1 font-black">Custo atual</p>
          <p className="text-foreground font-black text-lg">R${currentCost.toLocaleString('pt-BR')}/mês</p>
        </div>
        <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-2xl p-4 text-center">
          <p className="text-emerald-400 text-[9px] uppercase tracking-wider mb-1 font-black">Após migração</p>
          <p className="text-emerald-400 font-black text-lg">R${afterCost.toLocaleString('pt-BR')}/mês</p>
        </div>
      </div>
      <div className="bg-linear-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl p-4 text-center mb-4">
        <p className="text-emerald-400 text-[9px] uppercase tracking-wider mb-1 font-black">Economia + {co2}t CO₂ a menos</p>
        <p className="text-3xl font-black text-foreground">R${savings.toLocaleString('pt-BR')}<span className="text-emerald-400 text-lg">/mês</span></p>
        <p className="text-emerald-400/70 text-xs mt-1 font-bold">Anual: R${(savings * 12).toLocaleString('pt-BR')}</p>
      </div>
      <Link href="/contatos" className="block w-full text-center py-4 bg-linear-to-r from-cyan-500 to-emerald-500 text-black font-black rounded-full text-[10px] uppercase tracking-[0.3em] hover:shadow-[0_0_20px_rgba(0,219,255,0.4)] transition-all">
        Migrar para cloud →
      </Link>
    </div>
  );
}

// ── Live Dashboard ────────────────────────────────────────────────
function LiveDashboard() {
  const [tick, setTick] = useState(0);
  useEffect(() => { const id = setInterval(() => setTick(t => t + 1), 3000); return () => clearInterval(id); }, []);
  const metrics = [
    { label: 'Árvores salvas hoje', value: `${242 + (tick % 5)}`, delta: '+3 esta hora', icon: '🌳', color: 'emerald' },
    { label: 'CO₂ reduzido (kg)', value: `${1847 + (tick * 2)}`, delta: `+${12 + tick % 3} esta hora`, icon: '🌍', color: 'cyan' },
    { label: 'kWh economizados', value: `${4521 + tick}`, delta: '+8 este minuto', icon: '⚡', color: 'yellow' },
    { label: 'Folhas poupadas', value: `${(156000 + tick * 50).toLocaleString('pt-BR')}`, delta: '+500 hoje', icon: '📄', color: 'emerald' },
  ];
  return (
    <div className="bg-foreground/[0.02] border border-emerald-500/20 rounded-[2.5rem] p-6 shadow-[0_0_40px_rgba(52,211,153,0.05)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-foreground font-black text-lg uppercase italic tracking-tighter">Dashboard Sustentável GEDS</h3>
          <p className="text-foreground/40 text-xs font-black uppercase tracking-widest">Impacto acumulado em tempo real</p>
        </div>
        <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 2 }}
          className="flex items-center gap-2 text-emerald-400 text-[9px] font-black bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> AO VIVO
        </motion.span>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {metrics.map((m, i) => (
          <motion.div key={`${i}-${m.value}`} className="bg-foreground/[0.03] border border-foreground/8 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl">{m.icon}</span>
              <span className={`text-[9px] text-${m.color}-400 bg-${m.color}-500/10 px-2 py-0.5 rounded-full border border-${m.color}-500/20 font-black uppercase tracking-wider`}>{m.delta}</span>
            </div>
            <p className={`text-2xl font-black text-${m.color}-400`}>{m.value}</p>
            <p className="text-foreground/30 text-[9px] uppercase tracking-wider mt-1 font-black">{m.label}</p>
          </motion.div>
        ))}
      </div>
      <div>
        <p className="text-foreground/40 text-[9px] uppercase tracking-widest mb-3 font-black">Impacto mensal (últimos 12 meses)</p>
        <div className="flex items-end gap-1 h-20">
          {[45, 52, 60, 55, 70, 78, 75, 85, 88, 92, 95, 100 + tick % 5].map((v, i) => (
            <motion.div key={i} className="flex-1 rounded-t-sm bg-linear-to-t from-emerald-600 to-emerald-400 opacity-70" style={{ height: `${v}%` }} whileHover={{ opacity: 1 }} />
          ))}
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-foreground/30 text-[9px] font-black">Jan</span>
          <span className="text-foreground/30 text-[9px] font-black">Dez</span>
        </div>
      </div>
    </div>
  );
}

// ── ESG Goals Data ────────────────────────────────────────────────
const esgGoals = [
  {
    pillar: 'Ambiental',
    color: 'emerald',
    icon: <Leaf className="w-6 h-6" />,
    goals: [
      { label: 'Carbono neutro até 2026', progress: 68, target: '0 t CO₂ líquido', status: 'Em progresso' },
      { label: '100% operações paperless', progress: 85, target: '0 papel/mês', status: 'Em progresso' },
      { label: 'Energia renovável nos servidores', progress: 40, target: '100% verde', status: 'Iniciado' },
      { label: 'Reduzir pegada digital 50%', progress: 30, target: '-50% energia/req.', status: 'Iniciado' },
    ],
  },
  {
    pillar: 'Social',
    color: 'blue',
    icon: <Globe2 className="w-6 h-6" />,
    goals: [
      { label: 'Acessibilidade universal no produto', progress: 90, target: 'WCAG AA+', status: 'Quase lá' },
      { label: 'Programa de estágio social', progress: 55, target: '12 bolsas/ano', status: 'Em progresso' },
      { label: 'Diversidade & Inclusão na equipe', progress: 60, target: '+50% diversidade', status: 'Em progresso' },
      { label: 'Educação tech para comunidades', progress: 20, target: '500 alunos/ano', status: 'Iniciado' },
    ],
  },
  {
    pillar: 'Governança',
    color: 'purple',
    icon: <Award className="w-6 h-6" />,
    goals: [
      { label: 'Certificação ISO 27001', progress: 45, target: 'Certificado', status: 'Em progresso' },
      { label: 'Conformidade LGPD total', progress: 100, target: '100% compliant', status: 'Concluído' },
      { label: 'Relatório ESG anual público', progress: 75, target: 'Publicação anual', status: 'Em progresso' },
      { label: 'Auditoria externa independente', progress: 25, target: 'Anual', status: 'Iniciado' },
    ],
  },
];

const esgColors: Record<string, { bar: string; text: string; bg: string; border: string; badge: string }> = {
  emerald: { bar: 'bg-emerald-500', text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  blue:    { bar: 'bg-blue-500',    text: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20',    badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  purple:  { bar: 'bg-purple-500',  text: 'text-purple-400',  bg: 'bg-purple-500/10',  border: 'border-purple-500/20',  badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
};

// ── Main Page ─────────────────────────────────────────────────────
export default function GreenTech() {
  return (
    <main className="bg-background min-h-screen text-foreground pt-24 pb-20 relative overflow-hidden">

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: `radial-gradient(circle, rgba(52,211,153,0.6) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-emerald-950/30 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-cyan-950/20 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">

        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="mb-24 mt-12">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 text-left">
            <motion.div className="lg:w-1/2" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring' }}
                className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-emerald-500/20 to-cyan-500/20 rounded-2xl mb-6 border border-emerald-500/20">
                <Leaf className="w-8 h-8 text-emerald-400 relative z-10" />
              </motion.div>

              <span className="inline-block mb-4 text-emerald-400 font-black bg-emerald-500/10 px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.4em] border border-emerald-500/20">
                Future Impact & Sustainability
              </span>
              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1] uppercase italic tracking-tighter text-foreground">
                GEDS <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400">Green Tech</span>
              </h1>
              <p className="text-lg text-foreground/60 mb-8 max-w-xl leading-relaxed font-bold uppercase tracking-tight">
                Transformando a pegada digital em um legado positivo. Desenvolvemos soluções que escalam seu negócio enquanto protegem o planeta.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <Link href="/contatos" className="bg-emerald-500 hover:bg-emerald-400 text-black font-black px-10 py-4 rounded-full transition-all shadow-[0_10px_30px_rgba(16,185,129,0.2)] hover:shadow-[0_15px_40px_rgba(16,185,129,0.4)] uppercase text-[10px] tracking-[0.3em]">
                  Fazer meu diagnóstico
                </Link>
                <a href="#esg" className="px-10 py-4 rounded-full border border-foreground/10 hover:border-emerald-500/50 text-foreground font-black uppercase text-[10px] tracking-[0.3em] transition-all">
                  Metas ESG 2026
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-foreground/5">
                {[
                  { icon: '🌳', label: 'Árvores', value: 240 },
                  { icon: '🌍', label: 'CO₂ (t)', value: 18 },
                  { icon: '⚡', label: 'Energia', value: 45, suff: '%' },
                  { icon: '📄', label: 'Papel', value: 150, suff: 'k' },
                ].map((stat, i) => (
                  <div key={i}>
                    <p className="text-2xl font-black text-foreground flex items-center gap-1">
                      {stat.icon} <AnimCounter target={stat.value} suffix={stat.suff || ''} />
                    </p>
                    <p className="text-foreground/40 text-[9px] uppercase tracking-widest font-black mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div className="lg:w-1/2 relative" initial={{ opacity: 0, scale: 0.95, x: 30 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 1 }}>
              <div className="relative z-10 w-full aspect-[4/5] sm:aspect-square overflow-hidden rounded-[3rem] border border-foreground/10 shadow-2xl group">
                <Image src="/GEDS Green Tech.jpg" alt="GEDS Green Tech" fill className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]" priority />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 right-10 p-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center border border-emerald-500/30"><Zap className="text-emerald-400 w-6 h-6" /></div>
                    <div>
                      <p className="text-white font-black text-lg leading-none uppercase">Eficiência Máxima</p>
                      <p className="text-emerald-400 text-[9px] uppercase font-black tracking-widest mt-1">Sustentabilidade Nativa</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] -z-10 animate-pulse" />
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] -z-10 animate-pulse" />
            </motion.div>
          </div>
        </section>

        {/* ── Simuladores ───────────────────────────────────────── */}
        <section className="mb-20">
          <motion.div className="text-center mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <span className="inline-block mb-4 text-emerald-400 font-black bg-emerald-500/10 px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.4em] border border-emerald-500/20">Ferramentas Interativas</span>
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4 uppercase italic tracking-tighter">
              Calcule seu <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400">impacto real</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}><EnvSimulator /></motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}><EnergyCalculator /></motion.div>
          </div>
        </section>

        {/* ── Live Dashboard ─────────────────────────────────────── */}
        <section className="mb-20">
          <motion.div className="text-center mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <span className="inline-block mb-4 text-emerald-400 font-black bg-emerald-500/10 px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.4em] border border-emerald-500/20">Monitoramento Global</span>
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4 uppercase italic tracking-tighter">
              Dashboard <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400">sustentável global</span>
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <LiveDashboard />
          </motion.div>
        </section>

        {/* ── Soluções ──────────────────────────────────────────── */}
        <section className="mb-20">
          <motion.div className="text-center mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <span className="inline-block mb-4 text-emerald-400 font-black bg-emerald-500/10 px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.4em] border border-emerald-500/20">Nossas Soluções</span>
            <h2 className="text-3xl md:text-5xl font-black text-foreground uppercase italic tracking-tighter">
              Tecnologia verde <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400">na prática</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: <Leaf className="w-7 h-7"/>, title: 'Paperless Total', desc: 'Assinaturas digitais, contratos e fichas 100% via software.', impact: '-98% papel', color: 'emerald' },
              { icon: <Zap className="w-7 h-7"/>, title: 'Automação Verde', desc: 'Processos automatizados com eficiência energética.', impact: '-65% energia', color: 'cyan' },
              { icon: <Sun className="w-7 h-7"/>, title: 'Cloud Eficiente', desc: 'Arquitetura em nuvem que usa apenas os recursos necessários.', impact: '-50% emissões', color: 'yellow' },
              { icon: <Wind className="w-7 h-7"/>, title: 'Trabalho Remoto', desc: 'Ferramentas que facilitam o trabalho remoto e reduzem deslocamentos.', impact: '-40% CO₂', color: 'emerald' },
              { icon: <Droplets className="w-7 h-7"/>, title: 'IoT Sustentável', desc: 'Sensores inteligentes para monitorar e otimizar recursos naturais.', impact: '-30% desperdício', color: 'cyan' },
              { icon: <Globe2 className="w-7 h-7"/>, title: 'Relatório de ESG', desc: 'Dashboards com métricas reais de impacto ambiental e social.', impact: '100% transparente', color: 'emerald' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }} whileHover={{ y: -6 }}
                className="bg-foreground/[0.02] border border-foreground/8 hover:border-emerald-500/30 rounded-[2rem] p-6 transition-all duration-300 group">
                <div className={`w-14 h-14 bg-${item.color}-500/10 border border-${item.color}-500/20 text-${item.color}-400 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h3 className="text-foreground font-black text-lg mb-2 uppercase italic tracking-tight">{item.title}</h3>
                <p className="text-foreground/50 text-sm leading-relaxed mb-3 font-bold">{item.desc}</p>
                <span className={`text-${item.color}-400 text-[9px] font-black bg-${item.color}-500/10 px-3 py-1 rounded-full border border-${item.color}-500/20 uppercase tracking-widest`}>{item.impact}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── METAS ESG ─────────────────────────────────────────── */}
        <section id="esg" className="mb-20">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-block mb-4 text-emerald-400 font-black bg-emerald-500/10 px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.4em] border border-emerald-500/20">
              Compromisso com o Futuro
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-foreground mb-4 uppercase italic tracking-tighter">
              Metas <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400">ESG 2026</span>
            </h2>
            <p className="text-foreground/50 max-w-2xl mx-auto font-bold uppercase text-xs tracking-widest">
              Nossa agenda de responsabilidade ambiental, social e de governança — com métricas reais de progresso.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {esgGoals.map((pillar, pi) => {
              const c = esgColors[pillar.color];
              return (
                <motion.div key={pi} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: pi * 0.15 }}
                  className={`rounded-[2.5rem] border ${c.border} ${c.bg} p-8 space-y-6`}>
                  {/* Pillar Header */}
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl ${c.bg} border ${c.border} flex items-center justify-center ${c.text}`}>{pillar.icon}</div>
                    <div>
                      <p className={`text-[9px] font-black uppercase tracking-widest ${c.text}`}>Pilar</p>
                      <h3 className="text-foreground font-black text-2xl uppercase italic tracking-tighter">{pillar.pillar}</h3>
                    </div>
                  </div>

                  {/* Goals */}
                  <div className="space-y-5">
                    {pillar.goals.map((goal, gi) => (
                      <motion.div key={gi} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: gi * 0.1 }}>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-foreground/80 text-xs font-black uppercase tracking-tight">{goal.label}</p>
                          <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${goal.progress === 100 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : `${c.badge}`}`}>
                            {goal.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-foreground/5 rounded-full overflow-hidden">
                            <motion.div className={`h-full ${c.bar} rounded-full`}
                              initial={{ width: 0 }} whileInView={{ width: `${goal.progress}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: gi * 0.1 }} />
                          </div>
                          <span className={`text-[9px] font-black ${c.text} w-8 text-right`}>{goal.progress}%</span>
                        </div>
                        <p className="text-foreground/30 text-[9px] font-black uppercase tracking-widest mt-1">Meta: {goal.target}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Pillar Score */}
                  <div className={`pt-4 border-t ${c.border} flex items-center justify-between`}>
                    <span className="text-foreground/40 text-[9px] font-black uppercase tracking-widest">Score do Pilar</span>
                    <span className={`text-2xl font-black ${c.text} uppercase italic`}>
                      {Math.round(pillar.goals.reduce((a, g) => a + g.progress, 0) / pillar.goals.length)}%
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Overall Score Banner */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
            className="mt-8 p-8 rounded-[2.5rem] bg-linear-to-r from-emerald-950/40 via-background to-cyan-950/30 border border-emerald-500/20 flex flex-col md:flex-row items-center gap-6 justify-between">
            <div className="flex items-center gap-4">
              <TrendingUp className="w-8 h-8 text-emerald-400" />
              <div>
                <p className="text-[9px] text-foreground/40 font-black uppercase tracking-widest">Score ESG Global GEDS</p>
                <p className="text-4xl font-black text-foreground uppercase italic tracking-tighter">57% <span className="text-emerald-400">Concluído</span></p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {['🌱 Carbono Neutro até 2026', '♻️ 100% Digital', '🌍 ESG Certificado', '⚡ Energia Eficiente'].map(tag => (
                <span key={tag} className="text-emerald-400 text-[9px] font-black bg-emerald-500/10 px-3 py-2 rounded-full border border-emerald-500/20 uppercase tracking-widest">{tag}</span>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Commitment ────────────────────────────────────────── */}
        <section className="mb-20">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative bg-linear-to-br from-emerald-950/40 via-background to-cyan-950/30 border border-emerald-500/20 rounded-[3rem] p-10 md:p-16 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-full bg-linear-to-r from-transparent via-emerald-500 to-transparent" />
            <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
              <Target className="w-16 h-16 text-emerald-400 shrink-0" />
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3 uppercase italic tracking-tighter">Nosso compromisso</h2>
                <p className="text-foreground/60 text-lg leading-relaxed italic max-w-3xl font-bold">
                  &ldquo;Desenvolver software é criar o futuro. E nós tomamos a decisão de construir um amanhã onde a agilidade dos negócios coexista perfeitamente com a responsabilidade para com o planeta. Cada byte de código que escrevemos carrega esse compromisso.&rdquo;
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────── */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <span className="text-5xl block mb-4">🌱</span>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4 uppercase italic tracking-tighter">
            Pronto para um tech mais <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400">verde?</span>
          </h2>
          <p className="text-foreground/50 mb-8 max-w-xl mx-auto uppercase text-xs font-black tracking-widest">
            Descubra como nossas soluções sustentáveis podem transformar seu negócio e o impacto que ele deixa no mundo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contatos" className="inline-flex items-center gap-2 bg-linear-to-r from-emerald-500 to-cyan-500 text-black font-black px-10 py-4 rounded-full hover:shadow-[0_0_30px_rgba(52,211,153,0.4)] transition-all uppercase text-[10px] tracking-[0.3em]">
              Iniciar minha jornada verde →
            </Link>
            <Link href="/plans" className="inline-flex items-center gap-2 border border-emerald-500/30 text-emerald-400 px-8 py-4 rounded-full font-black hover:bg-emerald-500/10 transition-all uppercase text-[10px] tracking-[0.3em]">
              Ver planos sustentáveis
            </Link>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
