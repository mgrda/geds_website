"use client";

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Leaf, Zap, Globe2, Wind, Sun, Droplets, Target } from 'lucide-react';
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
        let c = 0;
        const step = target / 80;
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

// ── Environmental Simulator ──────────────────────────────────────
function EnvSimulator() {
  const [digitalDocs, setDigitalDocs] = useState(1000);
  const [autoProcesses, setAutoProcesses] = useState(50);
  const [remoteWork, setRemoteWork] = useState(30);

  const treesEquivalent = Math.round((digitalDocs * 0.005) + (remoteWork * 0.8));
  const co2Reduction = ((autoProcesses * 0.12) + (remoteWork * 1.5) + (digitalDocs * 0.002)).toFixed(1);
  const energySaved = Math.round((autoProcesses * 0.4) + (remoteWork * 2.3) + (digitalDocs * 0.001));

  return (
    <div className="bg-gradient-to-br from-emerald-950/40 to-black border border-emerald-500/20 rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Globe2 className="w-6 h-6 text-emerald-400" />
        <h3 className="text-white font-black text-lg">Simulador de Impacto Ambiental</h3>
      </div>
      <p className="text-gray-400 text-sm mb-6">Configure o perfil da sua empresa e veja o impacto positivo</p>

      <div className="space-y-5 mb-6">
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-gray-400 text-sm flex items-center gap-2">
              <Leaf className="w-4 h-4 text-emerald-400" /> Documentos digitalizados/mês
            </label>
            <span className="text-white font-bold text-sm">{digitalDocs.toLocaleString('pt-BR')}</span>
          </div>
          <input type="range" min={100} max={10000} step={100} value={digitalDocs}
            onChange={e => setDigitalDocs(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer accent-emerald-400"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-gray-400 text-sm flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" /> Processos automatizados (%)
            </label>
            <span className="text-white font-bold text-sm">{autoProcesses}%</span>
          </div>
          <input type="range" min={0} max={100} value={autoProcesses}
            onChange={e => setAutoProcesses(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer accent-emerald-400"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-gray-400 text-sm flex items-center gap-2">
              <Wind className="w-4 h-4 text-emerald-400" /> Equipe em trabalho remoto (%)
            </label>
            <span className="text-white font-bold text-sm">{remoteWork}%</span>
          </div>
          <input type="range" min={0} max={100} value={remoteWork}
            onChange={e => setRemoteWork(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer accent-emerald-400"
          />
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: '🌳', label: 'Árvores equivalentes', value: treesEquivalent, color: 'emerald' },
          { icon: '🌍', label: 'CO₂ reduzido (ton)', value: co2Reduction, color: 'cyan' },
          { icon: '⚡', label: 'kWh economizados', value: energySaved, color: 'yellow' },
        ].map((item, i) => (
          <motion.div
            key={`${i}-${item.value}`}
            className={`bg-${item.color === 'emerald' ? 'emerald' : item.color === 'cyan' ? 'cyan' : 'yellow'}-500/5 border border-${item.color === 'emerald' ? 'emerald' : item.color === 'cyan' ? 'cyan' : 'yellow'}-500/15 rounded-xl p-3 text-center`}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-xl mb-1">{item.icon}</div>
            <div className={`text-xl font-black text-${item.color === 'emerald' ? 'emerald' : item.color === 'cyan' ? 'cyan' : 'yellow'}-400`}>
              {item.value}
            </div>
            <div className="text-gray-600 text-[9px] uppercase tracking-wider mt-1">{item.label}</div>
          </motion.div>
        ))}
      </div>

      <Link href="/contatos" className="mt-4 block w-full text-center py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-black rounded-full text-sm hover:shadow-[0_0_20px_rgba(52,211,153,0.4)] transition-all">
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
    <div className="bg-gradient-to-br from-cyan-950/30 to-black border border-cyan-500/20 rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Zap className="w-6 h-6 text-cyan-400" />
        <h3 className="text-white font-black text-lg">Calculadora de Economia de Energia</h3>
      </div>
      <p className="text-gray-400 text-sm mb-6">Estime a redução de custos e consumo energético com cloud</p>

      <div className="space-y-5 mb-6">
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-gray-400 text-sm">Servidores físicos atuais</label>
            <span className="text-white font-bold text-sm">{servers}</span>
          </div>
          <input type="range" min={1} max={50} value={servers}
            onChange={e => setServers(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer accent-cyan-400"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-gray-400 text-sm">Migração para cloud (%)</label>
            <span className="text-white font-bold text-sm">{cloudMigration}%</span>
          </div>
          <input type="range" min={10} max={100} value={cloudMigration}
            onChange={e => setCloudMigration(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer accent-cyan-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-red-500/5 border border-red-500/15 rounded-xl p-4 text-center">
          <p className="text-red-400 text-[10px] uppercase tracking-wider mb-1">Custo atual</p>
          <p className="text-white font-black text-xl">R${currentCost.toLocaleString('pt-BR')}/mês</p>
        </div>
        <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-4 text-center">
          <p className="text-emerald-400 text-[10px] uppercase tracking-wider mb-1">Após migração</p>
          <p className="text-emerald-400 font-black text-xl">R${afterCost.toLocaleString('pt-BR')}/mês</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-xl p-4 text-center mb-4">
        <p className="text-emerald-400 text-[10px] uppercase tracking-wider mb-1">Economia mensal + {co2}t CO₂ a menos</p>
        <p className="text-3xl font-black text-white">
          R${savings.toLocaleString('pt-BR')}<span className="text-emerald-400 text-lg">/mês</span>
        </p>
        <p className="text-emerald-400/70 text-xs mt-1">Anual: R${(savings * 12).toLocaleString('pt-BR')}</p>
      </div>

      <Link href="/contatos" className="block w-full text-center py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-black rounded-full text-sm hover:shadow-[0_0_20px_rgba(0,219,255,0.4)] transition-all">
        Migrar para cloud →
      </Link>
    </div>
  );
}

// ── Live Dashboard ────────────────────────────────────────────────
function LiveDashboard() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 3000);
    return () => clearInterval(id);
  }, []);

  const metrics = [
    { label: 'Árvores salvas hoje', value: `${242 + (tick % 5)}`, delta: '+3 esta hora', icon: '🌳', color: 'emerald' },
    { label: 'CO₂ reduzido (kg)', value: `${1847 + (tick * 2)}`, delta: `+${12 + tick % 3} esta hora`, icon: '🌍', color: 'cyan' },
    { label: 'kWh economizados', value: `${4521 + tick}`, delta: '+8 este minuto', icon: '⚡', color: 'yellow' },
    { label: 'Folhas poupadas', value: `${(156000 + tick * 50).toLocaleString('pt-BR')}`, delta: '+500 hoje', icon: '📄', color: 'emerald' },
  ];

  return (
    <div className="bg-black/60 border border-emerald-500/20 rounded-2xl p-6 shadow-[0_0_40px_rgba(52,211,153,0.05)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-black text-lg">Dashboard Sustentável GEDS</h3>
          <p className="text-gray-500 text-xs">Impacto acumulado em tempo real</p>
        </div>
        <motion.span
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          AO VIVO
        </motion.span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {metrics.map((m, i) => (
          <motion.div
            key={`${i}-${m.value}`}
            className={`bg-white/[0.03] border border-white/8 rounded-xl p-4`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl">{m.icon}</span>
              <span className={`text-[10px] text-${m.color}-400 bg-${m.color}-500/10 px-2 py-0.5 rounded-full border border-${m.color}-500/20`}>
                {m.delta}
              </span>
            </div>
            <p className={`text-2xl font-black text-${m.color}-400`}>{m.value}</p>
            <p className="text-gray-600 text-[10px] uppercase tracking-wider mt-1">{m.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Mini graph simulation */}
      <div>
        <p className="text-gray-600 text-xs uppercase tracking-wider mb-3">Impacto mensal (últimos 12 meses)</p>
        <div className="flex items-end gap-1 h-20">
          {[45, 52, 60, 55, 70, 78, 75, 85, 88, 92, 95, 100 + tick % 5].map((v, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t-sm bg-gradient-to-t from-emerald-600 to-emerald-400 opacity-70"
              style={{ height: `${v}%` }}
              whileHover={{ opacity: 1 }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-gray-700 text-[9px]">Jan</span>
          <span className="text-gray-700 text-[9px]">Dez</span>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────
export default function GreenTech() {
  return (
    <main className="bg-black min-h-screen text-white pt-24 pb-20 relative overflow-hidden">

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(52,211,153,0.6) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-emerald-950/30 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-cyan-950/20 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="text-center mb-20">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-2xl mb-6 relative border border-emerald-500/20"
          >
            <Leaf className="w-12 h-12 text-emerald-400 relative z-10" />
            <div className="absolute inset-0 bg-emerald-500/15 blur-[30px] rounded-2xl" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <span className="inline-block mb-4 text-emerald-400 font-bold bg-emerald-500/10 px-4 py-2 rounded-full text-xs uppercase tracking-widest border border-emerald-500/20">
              Future Impact
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-400 to-cyan-400">
              GEDS Green Tech
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-4">
              Tecnologia que transforma negócios e preserva o planeta
            </p>
            <p className="text-gray-600 max-w-2xl mx-auto text-base">
              A inovação digital mais responsável: cada linha de código que escrevemos é pensada para
              gerar impacto positivo no mundo.
            </p>
          </motion.div>

          {/* Impact counters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-5 mt-12"
          >
            {[
              { icon: '🌳', label: 'Árvores Equivalentes', value: 240, suffix: '+', color: 'emerald' },
              { icon: '🌍', label: 'Toneladas CO₂', value: 18, suffix: 't', color: 'cyan' },
              { icon: '⚡', label: 'Energia Reduzida', value: 45, suffix: '%', color: 'yellow' },
              { icon: '📄', label: 'Páginas Poupadas', value: 150, suffix: 'mil', color: 'emerald' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.08, y: -5 }}
                className="bg-white/[0.03] border border-white/8 hover:border-emerald-500/30 rounded-2xl px-6 py-5 text-center transition-all"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className={`text-3xl font-black mb-1 text-${stat.color === 'emerald' ? 'emerald' : stat.color === 'cyan' ? 'cyan' : 'yellow'}-400`}>
                  <AnimCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-gray-600 text-[10px] uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── Simuladores ─────────────────────────────────────── */}
        <section className="mb-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            <span className="inline-block mb-4 text-emerald-400 font-bold bg-emerald-500/10 px-4 py-2 rounded-full text-xs uppercase tracking-widest border border-emerald-500/20">
              Ferramentas Interativas
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              Calcule seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">impacto real</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <EnvSimulator />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <EnergyCalculator />
            </motion.div>
          </div>
        </section>

        {/* ── Live Dashboard ────────────────────────────────────── */}
        <section className="mb-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            <span className="inline-block mb-4 text-emerald-400 font-bold bg-emerald-500/10 px-4 py-2 rounded-full text-xs uppercase tracking-widest border border-emerald-500/20">
              Monitoramento Global
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              Dashboard <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">sustentável global</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <LiveDashboard />
          </motion.div>
        </section>

        {/* ── Soluções ─────────────────────────────────────────── */}
        <section className="mb-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            <span className="inline-block mb-4 text-emerald-400 font-bold bg-emerald-500/10 px-4 py-2 rounded-full text-xs uppercase tracking-widest border border-emerald-500/20">
              Nossas Soluções Sustentáveis
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white">
              Tecnologia verde <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">na prática</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: <Leaf className="w-7 h-7" />,
                title: 'Paperless Total',
                desc: 'Assinaturas digitais, contratos e fichas 100% via software. Zero papel, zero custo de impressão.',
                impact: '-98% papel',
                color: 'emerald',
              },
              {
                icon: <Zap className="w-7 h-7" />,
                title: 'Automação Verde',
                desc: 'Processos automatizados com eficiência energética. Menos máquinas ligadas, menos energia consumida.',
                impact: '-65% energia',
                color: 'cyan',
              },
              {
                icon: <Sun className="w-7 h-7" />,
                title: 'Cloud Eficiente',
                desc: 'Arquitetura em nuvem que usa apenas os recursos necessários, na hora certa.',
                impact: '-50% emissões',
                color: 'yellow',
              },
              {
                icon: <Wind className="w-7 h-7" />,
                title: 'Trabalho Remoto',
                desc: 'Ferramentas que facilitam o trabalho remoto e reduzem deslocamentos diários.',
                impact: '-40% CO₂',
                color: 'emerald',
              },
              {
                icon: <Droplets className="w-7 h-7" />,
                title: 'IoT Sustentável',
                desc: 'Sensores inteligentes para monitorar e otimizar o uso de recursos naturais em tempo real.',
                impact: '-30% desperdício',
                color: 'cyan',
              },
              {
                icon: <Globe2 className="w-7 h-7" />,
                title: 'Relatório de ESG',
                desc: 'Dashboards de ESG com métricas reais de impacto ambiental, social e de governança.',
                impact: '100% transparente',
                color: 'emerald',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="bg-white/[0.03] border border-white/8 hover:border-emerald-500/30 rounded-2xl p-6 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 bg-${item.color}-500/10 border border-${item.color}-500/20 rounded-2xl flex items-center justify-center text-${item.color}-400 mb-4 group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h3 className="text-white font-black text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-3">{item.desc}</p>
                <span className={`text-${item.color}-400 text-xs font-bold bg-${item.color}-500/10 px-3 py-1 rounded-full border border-${item.color}-500/20`}>
                  {item.impact}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Commitment ────────────────────────────────────────── */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-emerald-950/40 via-black to-cyan-950/30 border border-emerald-500/20 rounded-3xl p-10 md:p-16 overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px]" />

            <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
              <Target className="w-16 h-16 text-emerald-400 shrink-0" />
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-3">Nosso compromisso</h2>
                <p className="text-gray-300 text-lg leading-relaxed italic max-w-3xl">
                  &ldquo;Desenvolver software é criar o futuro. E nós tomamos a decisão de construir um amanhã
                  onde a agilidade dos negócios coexista perfeitamente com a responsabilidade para com o planeta.
                  Cada byte de código que escrevemos carrega esse compromisso.&rdquo;
                </p>
                <div className="flex flex-wrap gap-3 mt-6">
                  {['🌱 Carbono Neutro até 2026', '♻️ 100% Digital', '🌍 ESG Certificado', '⚡ Energia Eficiente'].map(tag => (
                    <span key={tag} className="text-emerald-400 text-xs bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-5xl block mb-4">🌱</span>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Pronto para um tech mais <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">verde?</span>
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Descubra como nossas soluções sustentáveis podem transformar seu negócio e o impacto que ele deixa no mundo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contatos" className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-black px-10 py-4 rounded-full hover:shadow-[0_0_30px_rgba(52,211,153,0.4)] transition-all">
              Iniciar minha jornada verde →
            </Link>
            <Link href="/plans" className="inline-flex items-center gap-2 border border-emerald-500/30 text-emerald-400 px-8 py-4 rounded-full font-bold hover:bg-emerald-500/10 transition-all text-sm">
              Ver planos sustentáveis
            </Link>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
