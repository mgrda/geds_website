"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FiArrowRight, FiCheck, FiX, FiStar } from "react-icons/fi";
import {
  Code2, Cloud, LineChart, Layout, Search, PenTool, Zap, ShieldCheck,
  Brain, DollarSign, Globe, Award, Users, Sparkles, Cpu
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────
const services = [
  {
    title: "Desenvolvimento Sob Medida",
    problem: "Processos manuais que travam seu crescimento",
    solution: "Sistemas corporativos de alta performance e segurança",
    result: "Até 80% de ganho em produtividade",
    icon: <Code2 className="w-8 h-8 text-cyan-400" />,
  },
  {
    title: "Cloud & Infraestrutura",
    problem: "Infraestrutura cara e difícil de escalar",
    solution: "Migração para nuvem moderna com arquitetura eficiente",
    result: "50% de redução de custos operacionais",
    icon: <Cloud className="w-8 h-8 text-cyan-400" />,
  },
  {
    title: "Consultoria Estratégica",
    problem: "Decisões baseadas em achismos e falta de dados",
    solution: "Roadmap técnico viável com base em análise real",
    result: "Clareza total para investir com segurança",
    icon: <LineChart className="w-8 h-8 text-cyan-400" />,
  },
  {
    title: "Data & Analytics",
    problem: "Dados dispersos, sem valor para o negócio",
    solution: "Dashboards inteligentes e integração de dados",
    result: "Decisões rápidas e acertadas com dados reais",
    icon: <Search className="w-8 h-8 text-cyan-400" />,
  },
  {
    title: "UX/UI Design",
    problem: "Interface que confunde e afasta clientes",
    solution: "Interfaces que convertem e encantam usuários",
    result: "+60% de conversão e satisfação do usuário",
    icon: <Layout className="w-8 h-8 text-cyan-400" />,
  },
  {
    title: "Automação Inteligente",
    problem: "Tarefas repetitivas consumindo tempo e dinheiro",
    solution: "Fluxos automatizados com IA e integração total",
    result: "98% de redução em trabalho manual",
    icon: <Brain className="w-8 h-8 text-cyan-400" />,
  },
];

const processo = [
  { step: "01", title: "Diagnóstico", desc: "Análise profunda do seu negócio para identificar oportunidades reais de valor.", icon: <Search className="w-6 h-6" /> },
  { step: "02", title: "Estratégia", desc: "Prototipagem e validação de fluxos antes de escrever uma linha de código.", icon: <PenTool className="w-6 h-6" /> },
  { step: "03", title: "Construção Ágil", desc: "Sprints focados em entrega. Você acompanha a evolução quinzenalmente.", icon: <Zap className="w-6 h-6" /> },
  { step: "04", title: "Lançamento", desc: "Testes rigorosos, entrega e suporte contínuo para escalar sua plataforma.", icon: <ShieldCheck className="w-6 h-6" /> },
];

const diferenciais = [
  { icon: <Sparkles className="w-6 h-6" />, title: "IA Integrada", desc: "Soluções com inteligência artificial desde a concepção" },
  { icon: <ShieldCheck className="w-6 h-6" />, title: "Segurança Total", desc: "Dados protegidos com padrões enterprise de segurança" },
  { icon: <Globe className="w-6 h-6" />, title: "Sustentável", desc: "Tecnologia que respeita o planeta e otimiza recursos" },
  { icon: <Users className="w-6 h-6" />, title: "Suporte Humano", desc: "Time dedicado, não um chatbot. Pessoas reais, soluções reais" },
  { icon: <Cpu className="w-6 h-6" />, title: "Stack Moderno", desc: "As tecnologias mais avançadas do mercado atual" },
  { icon: <Award className="w-6 h-6" />, title: "Resultados Comprovados", desc: "50+ projetos entregues com métricas reais de sucesso" },
];

const testimonials = [
  { name: "Carlos Mendes", role: "CEO – TechBrasil", text: "A GEDS transformou completamente nossos processos internos. Ganhamos 3 meses de produtividade em 6 semanas de projeto.", stars: 5 },
  { name: "Ana Rodrigues", role: "Diretora – MedPlus", text: "O sistema desenvolvido pela GEDS reduziu em 70% o tempo de atendimento da nossa clínica. Impressionante!", stars: 5 },
  { name: "Pedro Alves", role: "Fundador – StartupX", text: "Lançamos nosso MVP em tempo recorde. A abordagem ágil e a qualidade técnica são excepcionais.", stars: 5 },
];

// ─── Dashboard Preview Component ─────────────────────────────────
function DashboardPreview() {
  const [data] = useState([65, 78, 45, 90, 72, 85, 95, 88, 76, 92]);

  return (
    <div className="bg-black/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 shadow-[0_0_40px_rgba(0,219,255,0.08)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Dashboard GEDS</p>
          <h3 className="text-white font-bold text-lg">Performance em Tempo Real</h3>
        </div>
        <span className="flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          AO VIVO
        </span>
      </div>

      {/* Mini Chart */}
      <div className="flex items-end gap-1 h-24 mb-6">
        {data.map((v, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-sm bg-gradient-to-t from-cyan-600 to-cyan-400 opacity-80"
            initial={{ height: 0 }}
            whileInView={{ height: `${v}%` }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            viewport={{ once: true }}
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Crescimento", value: "+47%", color: "text-cyan-400" },
          { label: "Economia", value: "R$128k", color: "text-emerald-400" },
          { label: "Produt.", value: "+83%", color: "text-blue-400" },
        ].map((stat, i) => (
          <div key={i} className="text-center bg-white/[0.03] rounded-xl p-3 border border-white/5">
            <p className={`text-lg font-black ${stat.color}`}>{stat.value}</p>
            <p className="text-gray-600 text-[10px] uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Simulador de Prejuízo ────────────────────────────────────────
function LossSimulator() {
  const [employees, setEmployees] = useState(10);
  const [hoursWasted, setHoursWasted] = useState(2);
  const hourlyRate = 30;
  const workingDays = 22;
  const monthlyLoss = employees * hoursWasted * hourlyRate * workingDays;

  return (
    <div className="bg-gradient-to-br from-red-900/20 to-black border border-red-500/20 rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <DollarSign className="w-6 h-6 text-red-400" />
        <h3 className="text-white font-bold text-lg">Simulador de Prejuízo</h3>
      </div>
      <p className="text-gray-400 text-sm mb-6">Descubra quanto sua empresa perde sem automação</p>

      <div className="space-y-5 mb-6">
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-gray-400 text-sm">Funcionários</label>
            <span className="text-white font-bold text-sm">{employees}</span>
          </div>
          <input
            type="range" min={1} max={100} value={employees}
            onChange={(e) => setEmployees(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer accent-cyan-400"
          />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-gray-400 text-sm">Horas desperdiçadas/dia</label>
            <span className="text-white font-bold text-sm">{hoursWasted}h</span>
          </div>
          <input
            type="range" min={0.5} max={8} step={0.5} value={hoursWasted}
            onChange={(e) => setHoursWasted(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer accent-cyan-400"
          />
        </div>
      </div>

      <motion.div
        key={monthlyLoss}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-red-500/10 border border-red-500/20 rounded-xl p-5 text-center"
      >
        <p className="text-red-400 text-xs uppercase tracking-widest mb-1">Prejuízo mensal estimado</p>
        <p className="text-4xl font-black text-white mb-1">
          R$ {monthlyLoss.toLocaleString('pt-BR')}
        </p>
        <p className="text-gray-500 text-xs">Anual: R$ {(monthlyLoss * 12).toLocaleString('pt-BR')}</p>
      </motion.div>

      <Link href="/contatos" className="mt-4 block w-full text-center py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-black rounded-full text-sm hover:shadow-[0_0_20px_rgba(0,219,255,0.4)] transition-all">
        Quero eliminar esse prejuízo →
      </Link>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────
const HomeContent = () => {
  return (
    <div className="px-4 md:px-8 py-12 md:py-20 space-y-20 md:space-y-32 bg-black">

      {/* ── COMO FUNCIONA ─────────────────────────────────────────── */}
      <section id="processo" className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          <span className="inline-block mb-4 text-cyan-400 font-bold bg-cyan-500/10 px-4 py-2 rounded-full text-xs uppercase tracking-widest border border-cyan-500/20">
            Como Funciona
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Do problema à <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">solução em 4 passos</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Transparência e previsibilidade em cada etapa da jornada
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent hidden lg:block" />

          {processo.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="relative bg-black border border-white/8 hover:border-cyan-500/40 rounded-2xl p-6 text-center transition-all duration-300 group"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 text-black text-xs font-black px-3 py-1 rounded-full">
                {item.step}
              </div>
              <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center text-cyan-400 mx-auto mb-4 mt-3 group-hover:bg-cyan-500/20 transition-colors">
                {item.icon}
              </div>
              <h3 className="font-black text-white text-lg mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="flex justify-center mt-10"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          <Link href="/processo" className="inline-flex items-center gap-2 text-cyan-400 font-bold hover:text-white transition group">
            Ver processo detalhado <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </section>

      {/* ── SERVIÇOS (Problema → Solução → Resultado) ─────────────── */}
      <section id="servicos" className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          <span className="inline-block mb-4 text-cyan-400 font-bold bg-cyan-500/10 px-4 py-2 rounded-full text-xs uppercase tracking-widest border border-cyan-500/20">
            Nossas Soluções
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Cada problema tem uma <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">solução GEDS</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="group bg-white/[0.03] border border-white/8 hover:border-cyan-500/40 rounded-2xl p-6 transition-all duration-300 flex flex-col"
            >
              <div className="w-14 h-14 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-white font-black text-lg mb-4">{item.title}</h3>

              <div className="space-y-3 flex-1">
                <div className="flex items-start gap-2">
                  <FiX className="text-red-400 shrink-0 mt-0.5 w-4 h-4" />
                  <p className="text-gray-500 text-sm">{item.problem}</p>
                </div>
                <div className="flex items-start gap-2">
                  <Zap className="text-cyan-400 shrink-0 mt-0.5 w-4 h-4" />
                  <p className="text-gray-300 text-sm">{item.solution}</p>
                </div>
                <div className="flex items-start gap-2 mt-auto">
                  <FiCheck className="text-emerald-400 shrink-0 mt-0.5 w-4 h-4" />
                  <p className="text-emerald-400 text-sm font-bold">{item.result}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="flex justify-center mt-10"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          <Link href="/servicos" className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-6 py-3 rounded-full font-bold hover:bg-cyan-500/20 transition group text-sm">
            Ver todos os serviços <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </section>

      {/* ── DASHBOARD + SIMULADOR ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          <span className="inline-block mb-4 text-cyan-400 font-bold bg-cyan-500/10 px-4 py-2 rounded-full text-xs uppercase tracking-widest border border-cyan-500/20">
            Ferramentas Inteligentes
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Veja o impacto <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">em números reais</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <DashboardPreview />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          >
            <LossSimulator />
          </motion.div>
        </div>
      </section>

      {/* ── STORYTELLING (Antes → Depois) ─────────────────────────── */}
      <section className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          <span className="inline-block mb-4 text-cyan-400 font-bold bg-cyan-500/10 px-4 py-2 rounded-full text-xs uppercase tracking-widest border border-cyan-500/20">
            Transformação Real
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Antes vs. <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Depois da GEDS</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Antes */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-red-900/10 border border-red-500/20 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <FiX className="w-6 h-6 text-red-400" />
              <h3 className="text-xl font-black text-red-400">Antes da GEDS</h3>
            </div>
            <ul className="space-y-3">
              {[
                "Processos manuais lentos e erros frequentes",
                "Dados espalhados sem visibilidade",
                "Clientes insatisfeitos com tempo de resposta",
                "Equipe sobrecarregada com tarefas repetitivas",
                "Decisões baseadas em intuição, não dados",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-400 text-sm">
                  <FiX className="text-red-400 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Depois */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="bg-emerald-900/10 border border-emerald-500/20 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <FiCheck className="w-6 h-6 text-emerald-400" />
              <h3 className="text-xl font-black text-emerald-400">Depois da GEDS</h3>
            </div>
            <ul className="space-y-3">
              {[
                "Automação total, zero erros manuais",
                "Dashboard centralizado com dados em tempo real",
                "Atendimento 3x mais rápido e eficiente",
                "Equipe focada em atividades de alto valor",
                "Decisões estratégicas baseadas em dados reais",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                  <FiCheck className="text-emerald-400 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── GEDS LAB TEASER ─────────────────────────────────────────── */}
      <section id="geds-lab" className="max-w-7xl mx-auto">
        <motion.div
          className="relative bg-gradient-to-r from-cyan-950/40 via-blue-950/40 to-black border border-cyan-500/20 p-8 md:p-16 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(0,219,255,0.08)] flex flex-col md:flex-row items-center justify-between gap-10"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-600/5 blur-[80px] rounded-full" />

          <div className="w-full md:w-2/3 relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🧪</span>
              <span className="text-cyan-400 font-bold bg-cyan-500/10 px-3 py-1 rounded-full text-xs uppercase tracking-widest border border-cyan-500/20">
                Laboratório de Inovação
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              Descubra o <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">GEDS Lab</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-xl leading-relaxed mb-6">
              O ambiente onde ideias se transformam em tecnologia real. Explore nossos <strong>protótipos interativos</strong>,{" "}
              <strong>experimentos com IA</strong> e <strong>projetos futuristas</strong>.
            </p>
            <div className="flex flex-wrap gap-3">
              {["✨ Protótipos Interativos", "🤖 Testes com IA", "🚀 Projetos Futuros", "📊 Dashboards Live"].map((tag) => (
                <span key={tag} className="text-gray-400 text-xs bg-white/5 px-3 py-1 rounded-full border border-white/10">{tag}</span>
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/3 flex flex-col items-center md:items-end gap-4 relative z-10">
            <Link href="/geds-lab">
              <motion.div whileHover={{ scale: 1.05 }} className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-black px-8 py-4 rounded-full shadow-[0_0_30px_rgba(0,219,255,0.3)] text-sm">
                Explorar o Lab <FiArrowRight />
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── GREEN TECH TEASER ─────────────────────────────────────── */}
      <section id="green-tech" className="max-w-7xl mx-auto">
        <motion.div
          className="relative bg-gradient-to-r from-emerald-950/40 via-cyan-950/20 to-black border border-emerald-500/20 p-8 md:p-16 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(52,211,153,0.05)] flex flex-col md:flex-row items-center justify-between gap-10"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <div className="absolute top-0 left-0 w-80 h-80 bg-emerald-500/5 blur-[100px] rounded-full" />

          <div className="w-full md:w-2/3 relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🌱</span>
              <span className="text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full text-xs uppercase tracking-widest border border-emerald-500/20">
                Inovação Sustentável
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              Conheça a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">GEDS Green Tech</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-xl leading-relaxed mb-6">
              Tecnologia que cuida do planeta. Meça o impacto ambiental real das soluções digitais,
              calcule economia de energia e monitore a redução de CO₂ do seu negócio.
            </p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Árvores Salvas", value: "240+", icon: "🌳" },
                { label: "CO₂ Reduzido", value: "18t", icon: "🌍" },
                { label: "Energia Economizada", value: "45%", icon: "⚡" },
              ].map((stat, i) => (
                <div key={i} className="bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-3 text-center">
                  <div className="text-lg mb-1">{stat.icon}</div>
                  <div className="text-emerald-400 font-black text-lg">{stat.value}</div>
                  <div className="text-gray-600 text-[9px] uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/3 flex flex-col items-center md:items-end gap-4 relative z-10">
            <Link href="/green-tech">
              <motion.div whileHover={{ scale: 1.05 }} className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-black px-8 py-4 rounded-full shadow-[0_0_30px_rgba(52,211,153,0.3)] text-sm">
                Ver o Impacto <FiArrowRight />
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── DIFERENCIAIS ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          <span className="inline-block mb-4 text-cyan-400 font-bold bg-cyan-500/10 px-4 py-2 rounded-full text-xs uppercase tracking-widest border border-cyan-500/20">
            Por que GEDS?
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Nossos <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">diferenciais</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">O que nos coloca além das agências tradicionais</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {diferenciais.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, borderColor: "rgba(0,219,255,0.3)" }}
              className="bg-white/[0.02] border border-white/8 rounded-2xl p-6 flex gap-4 items-start transition-all duration-300"
            >
              <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center text-cyan-400 shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PROVA SOCIAL / DEPOIMENTOS ────────────────────────────── */}
      <section className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          <span className="inline-block mb-4 text-cyan-400 font-bold bg-cyan-500/10 px-4 py-2 rounded-full text-xs uppercase tracking-widest border border-cyan-500/20">
            Depoimentos
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Clientes que <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">transformaram</span> seu negócio
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/[0.03] border border-white/8 hover:border-cyan-500/20 rounded-2xl p-6 transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <FiStar key={j} className="text-yellow-400 fill-yellow-400 w-4 h-4" />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-5 italic">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-black font-black text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{t.name}</p>
                  <p className="text-gray-600 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SEGURANÇA ─────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-blue-950/40 to-black border border-blue-500/20 rounded-3xl p-8 md:p-12 overflow-hidden"
        >
          <div className="absolute -right-20 -top-20 w-60 h-60 bg-blue-500/5 rounded-full blur-[80px]" />
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="shrink-0">
              <div className="w-20 h-20 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center">
                <ShieldCheck className="w-10 h-10 text-blue-400" />
              </div>
            </div>
            <div className="flex-1">
              <span className="text-blue-400 text-xs uppercase tracking-widest font-bold">Segurança e Conformidade</span>
              <h3 className="text-2xl md:text-3xl font-black text-white mt-2 mb-3">
                Seus dados estão protegidos
              </h3>
              <p className="text-gray-400 leading-relaxed mb-5">
                Seguimos as melhores práticas de segurança: criptografia em trânsito e repouso,
                conformidade com a LGPD, backups automatizados e monitoramento 24/7.
              </p>
              <div className="flex flex-wrap gap-2">
                {["🔒 LGPD Compliant", "🛡️ SSL/TLS", "☁️ Backup Automático", "🔍 Auditoria Contínua"].map((tag) => (
                  <span key={tag} className="text-blue-300 text-xs bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── MISSÃO / VISÃO / VALORES ──────────────────────────────── */}
      <section className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          <span className="inline-block mb-4 text-cyan-400 font-bold bg-cyan-500/10 px-4 py-2 rounded-full text-xs uppercase tracking-widest border border-cyan-500/20">
            Posicionamento de Marca
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Missão, Visão e <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Valores</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              icon: "🎯", title: "Nossa Missão",
              text: "Democratizar o acesso à tecnologia de ponta para empresas que querem crescer de forma inteligente, eficiente e sustentável."
            },
            {
              icon: "🔭", title: "Nossa Visão",
              text: "Ser a principal referência em inovação digital no Brasil, conectando tecnologia, pessoas e propósito para construir um futuro melhor."
            },
            {
              icon: "💎", title: "Nossos Valores",
              text: "Inovação constante. Transparência radical. Resultados mensuráveis. Impacto positivo. Parceria genuína com cada cliente."
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white/[0.03] border border-white/8 hover:border-cyan-500/20 rounded-2xl p-6 text-center transition-all"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-white font-black text-lg mb-3">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PORTFÓLIO ─────────────────────────────────────────────── */}
      <section id="portfolios" className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          <span className="inline-block mb-4 text-cyan-400 font-bold bg-cyan-500/10 px-4 py-2 rounded-full text-xs uppercase tracking-widest border border-cyan-500/20">
            Cases de Sucesso
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Projetos que <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">geraram impacto</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">O resultado da união entre tecnologia e estratégia</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {[
            { title: "SmartUPA", desc: "Sistema inteligente de gestão hospitalar com 70% de redução no tempo de atendimento.", tech: ["React", "Node.js", "PostgreSQL"], color: "cyan" },
            { title: "Plataforma Legacidos", desc: "Ecossistema digital completo com impacto direto em comunidades locais.", tech: ["Next.js", "Supabase", "IA"], color: "emerald" },
          ].map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className={`bg-white/[0.03] border border-white/8 hover:border-${project.color}-500/30 rounded-2xl p-6 transition-all duration-300`}
            >
              <div className={`w-12 h-12 bg-${project.color}-500/10 border border-${project.color}-500/20 rounded-xl flex items-center justify-center text-${project.color}-400 text-2xl mb-4`}>
                {i === 0 ? "🏥" : "🌿"}
              </div>
              <h3 className="text-white font-black text-xl mb-2">{project.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.desc}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="text-xs bg-white/5 text-gray-400 border border-white/10 px-3 py-1 rounded-full">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link href="/portfolios" className="inline-flex items-center gap-2 border-2 border-cyan-500/30 text-cyan-400 px-6 py-3 rounded-full font-bold hover:bg-cyan-500/10 hover:border-cyan-500/60 transition group text-sm">
            Explorar todos os projetos <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────────── */}
      <motion.section
        className="max-w-4xl mx-auto text-center relative bg-gradient-to-br from-cyan-950/30 via-black to-blue-950/30 border border-cyan-500/15 p-8 md:p-16 rounded-3xl overflow-hidden"
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

        <div className="relative z-10">
          <span className="text-5xl block mb-4">🚀</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-white leading-tight">
            Pronto para transformar<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              sua empresa?
            </span>
          </h2>
          <p className="text-lg md:text-xl mb-10 text-gray-400 max-w-2xl mx-auto">
            Fale com nosso time hoje e veja como GEDS Inovação pode acelerar o crescimento do seu negócio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contatos">
              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-black px-10 py-5 rounded-full font-black text-sm uppercase tracking-wider hover:shadow-[0_0_40px_rgba(0,219,255,0.4)] transition-all shadow-lg group">
                Começar Agora
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <Link href="/plans">
              <span className="inline-flex items-center gap-2 border border-cyan-500/30 text-cyan-400 px-8 py-5 rounded-full font-bold text-sm hover:bg-cyan-500/10 transition-all">
                Ver Planos
              </span>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomeContent;