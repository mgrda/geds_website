"use client";


import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Beaker, Code, Cpu, Lightbulb, Brain, Globe, Terminal, GitBranch, Play, ChevronRight } from 'lucide-react';
import Link from 'next/link';

// ── Particle Background ──────────────────────────────────────────
function LabBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,219,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,219,255,1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />
      {/* Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/8 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-blue-600/8 rounded-full blur-[100px]" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-cyan-400/5 rounded-full blur-[80px]" />
    </div>
  );
}

// ── Terminal Demo ─────────────────────────────────────────────────
function TerminalDemo({ code }: { code: string[] }) {
  const [lines, setLines] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  const run = async () => {
    setRunning(true);
    setLines([]);
    setDone(false);
    for (let i = 0; i < code.length; i++) {
      await new Promise(r => setTimeout(r, 400 + Math.random() * 300));
      setLines(prev => [...prev, code[i]]);
    }
    setRunning(false);
    setDone(true);
  };

  return (
    <div className="bg-black border border-cyan-500/20 rounded-2xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/5">
        <div className="w-3 h-3 rounded-full bg-red-500/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <div className="w-3 h-3 rounded-full bg-green-500/60" />
        <span className="text-gray-600 text-xs ml-2 font-mono">geds-terminal v2.0</span>
        <button
          onClick={run}
          disabled={running}
          className="ml-auto flex items-center gap-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-xs px-3 py-1 rounded-full border border-cyan-500/20 transition-all disabled:opacity-50"
        >
          <Play className="w-3 h-3" /> {running ? 'Executando...' : 'Executar'}
        </button>
      </div>
      <div className="p-4 font-mono text-sm min-h-[120px]">
        {lines.length === 0 && !running && (
          <p className="text-gray-700 text-xs">{'// Clique em Executar para ver o sistema em ação'}</p>
        )}
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`mb-1 ${line.startsWith('✓') ? 'text-emerald-400' : line.startsWith('>') ? 'text-cyan-400' : line.startsWith('[IA]') ? 'text-purple-400' : 'text-gray-300'}`}
          >
            {line}
          </motion.div>
        ))}
        {running && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="text-cyan-400"
          >_</motion.span>
        )}
        {done && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 text-emerald-400 text-xs"
          >
            ✓ Processo concluído com sucesso
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ── AI Test Component ─────────────────────────────────────────────
function AITest() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [typing, setTyping] = useState(false);

  const RESPONSES: Record<string, string> = {
    default: "Analisando seu contexto empresarial... Baseado nos dados fornecidos, recomendo implementar automação de processos para reduzir em até 40% o tempo operacional. Posso iniciar um diagnóstico completo?",
    automação: "Para automação de processos, a GEDS oferece soluções customizadas com integração de IA. Empresas que implementaram nossas soluções reduziram em média 65% das tarefas manuais. Quer ver um caso de uso real?",
    custo: "Calculando ROI... Com base no perfil da sua empresa, estimo uma economia de R$45.000/mês após a implementação completa. O investimento se paga em média em 4 meses. Detalho o plano?",
    ia: "Nossa IA analisa padrões de comportamento, identifica gargalos e sugere otimizações em tempo real. É como ter um consultor estratégico trabalhando 24/7 para sua empresa.",
  };

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setTyping(true);
    await new Promise(r => setTimeout(r, 1200));

    const key = Object.keys(RESPONSES).find(k => k !== 'default' && userMsg.toLowerCase().includes(k));
    const response = key ? RESPONSES[key] : RESPONSES.default;

    setMessages(prev => [...prev, { role: 'ai', text: response }]);
    setTyping(false);
  };

  return (
    <div className="bg-gradient-to-b from-purple-950/20 to-black border border-purple-500/20 rounded-2xl overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
        <div className="w-8 h-8 bg-purple-500/20 rounded-xl flex items-center justify-center">
          <Brain className="w-4 h-4 text-purple-400" />
        </div>
        <div>
          <p className="text-white font-bold text-sm">GEDS AI Assistant</p>
          <p className="text-emerald-400 text-[10px] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
            Online • Pronto para análise
          </p>
        </div>
      </div>

      <div className="h-40 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <p className="text-gray-600 text-xs text-center py-4">
            Pergunte sobre automação, custos, IA ou estratégia...
          </p>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
              msg.role === 'user'
                ? 'bg-cyan-500/20 text-cyan-100 border border-cyan-500/20'
                : 'bg-purple-500/10 text-gray-300 border border-purple-500/15'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="bg-purple-500/10 border border-purple-500/15 px-3 py-2 rounded-xl">
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-purple-400"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ delay: i * 0.15, repeat: Infinity, duration: 0.6 }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2 p-3 border-t border-white/5">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Digite sua dúvida..."
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-xs placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/40"
        />
        <button
          onClick={send}
          className="bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/20 text-cyan-400 px-3 py-2 rounded-xl text-xs transition-all"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}

// ── Projects Data ─────────────────────────────────────────────────
const projects = [
  {
    id: 'smart-process',
    icon: <Cpu className="w-6 h-6" />,
    category: 'Em Desenvolvimento',
    categoryColor: 'cyan',
    title: 'GEDS Process AI',
    desc: 'Sistema de automação inteligente que analisa gargalos empresariais e sugere otimizações em tempo real usando machine learning.',
    tech: ['Python', 'TensorFlow', 'FastAPI', 'React'],
    progress: 72,
    terminal: [
      '> Inicializando módulo de análise...',
      '> Carregando modelo de IA v3.2...',
      '[IA] Analisando padrões de processo...',
      '[IA] Detectados 7 gargalos operacionais',
      '[IA] Calculando otimizações possíveis...',
      '✓ Relatório gerado: 43% de melhoria estimada',
    ],
  },
  {
    id: 'startup-hub',
    icon: <Lightbulb className="w-6 h-6" />,
    category: 'Em Desenvolvimento',
    categoryColor: 'cyan',
    title: 'Startup Hub Platform',
    desc: 'Plataforma colaborativa para conectar startups com investidores, mentores e recursos tecnológicos do ecossistema GEDS.',
    tech: ['Next.js', 'Supabase', 'Stripe', 'AI'],
    progress: 55,
    terminal: [
      '> Conectando ao servidor...',
      '> Carregando perfis de startups...',
      '[IA] Analisando compatibilidade investidor-startup...',
      '[IA] Match score calculado: 94%',
      '> Gerando proposta de conexão...',
      '✓ 3 conexões estratégicas identificadas',
    ],
  },
  {
    id: 'interactive-site',
    icon: <Globe className="w-6 h-6" />,
    category: 'Protótipo',
    categoryColor: 'blue',
    title: 'Site Interativo v2',
    desc: 'Plataforma web com experiências imersivas, elementos de gamificação e inteligência adaptativa baseada no comportamento do usuário.',
    tech: ['React', 'GSAP', 'WebGL', 'Three.js'],
    progress: 88,
    terminal: [
      '> Inicializando WebGL engine...',
      '> Carregando shaders 3D...',
      '[RENDER] 60fps atingido',
      '[UX] Carregando módulo adaptativo...',
      '[UX] Perfil de usuário analisado',
      '✓ Experiência personalizada ativa',
    ],
  },
  {
    id: 'mvp-app',
    icon: <Code className="w-6 h-6" />,
    category: 'MVP',
    categoryColor: 'purple',
    title: 'GEDS Mobile MVP',
    desc: 'Aplicativo mobile que centraliza todos os serviços GEDS: diagnóstico, acompanhamento de projetos e suporte em tempo real.',
    tech: ['React Native', 'Expo', 'Supabase', 'Push Notifications'],
    progress: 40,
    terminal: [
      '> Inicializando React Native...',
      '> Conectando à API GEDS...',
      '[AUTH] Verificando credenciais...',
      '[SYNC] Sincronizando dados do projeto...',
      '> Carregando dashboard mobile...',
      '✓ App pronto para uso',
    ],
  },
  {
    id: 'ia-connector',
    icon: <Brain className="w-6 h-6" />,
    category: 'Conceito',
    categoryColor: 'emerald',
    title: 'GEDS AI Connector',
    desc: 'Middleware inteligente que conecta qualquer sistema legado a APIs modernas de IA, sem necessidade de refatoração completa.',
    tech: ['Python', 'LangChain', 'OpenAI', 'Node.js'],
    progress: 20,
    terminal: [
      '> Detectando sistema legado...',
      '> Mapeando estrutura de dados...',
      '[IA] Analisando endpoints disponíveis...',
      '[IA] Gerando adaptadores automáticos...',
      '> Bridge configurada com sucesso',
      '✓ Sistema legado conectado à IA',
    ],
  },
  {
    id: 'collab-platform',
    icon: <GitBranch className="w-6 h-6" />,
    category: 'Ideia',
    categoryColor: 'yellow',
    title: 'TechCollab Network',
    desc: 'Rede de colaboração tecnológica onde desenvolvedores, designers e PMs podem co-criar soluções open-source sob a curadoria GEDS.',
    tech: ['Next.js', 'GitHub API', 'WebSockets', 'AI'],
    progress: 10,
    terminal: [
      '> Inicializando rede de colaboração...',
      '> Mapeando habilidades dos membros...',
      '[IA] Identificando projetos compatíveis...',
      '[MATCH] 12 colaboradores disponíveis',
      '> Criando sala de projeto...',
      '✓ Equipe montada com sucesso',
    ],
  },
];

const categoryColors: Record<string, string> = {
  cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  yellow: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
};

// ── Project Card ──────────────────────────────────────────────────
function ProjectCard({ project }: { project: typeof projects[0] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-black/50 border border-white/8 hover:border-cyan-500/30 rounded-2xl overflow-hidden transition-all duration-300 group"
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${categoryColors[project.categoryColor]} shrink-0 group-hover:scale-110 transition-transform`}>
            <span className={categoryColors[project.categoryColor].split(' ')[0]}>{project.icon}</span>
          </div>
          <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${categoryColors[project.categoryColor]}`}>
            {project.category}
          </span>
        </div>

        <h3 className="text-white font-black text-lg mb-2 group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4">{project.desc}</p>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-gray-600 text-[10px] uppercase tracking-wider">Progresso</span>
            <span className="text-cyan-400 text-[10px] font-bold">{project.progress}%</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: `${project.progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {project.tech.map(t => (
            <span key={t} className="text-[10px] bg-white/5 text-gray-500 border border-white/8 px-2 py-1 rounded-md">{t}</span>
          ))}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-cyan-400 text-xs font-bold hover:text-white transition group/btn"
        >
          <Terminal className="w-3 h-3" />
          {expanded ? 'Fechar terminal' : 'Ver terminal demo'}
          <ChevronRight className={`w-3 h-3 transition-transform ${expanded ? 'rotate-90' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/5 px-4 pb-4"
          >
            <div className="pt-4">
              <TerminalDemo code={project.terminal} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────
export default function GedsLab() {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const filters = ['Todos', 'Em Desenvolvimento', 'Protótipo', 'MVP', 'Conceito', 'Ideia'];

  const filtered = activeFilter === 'Todos'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <main className="bg-black min-h-screen text-white pt-24 pb-20 relative">
      <LabBackground />

      <div className="max-w-7xl mx-auto px-6">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="text-center mb-20">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl mb-6 relative border border-cyan-500/20"
          >
            <Beaker className="w-12 h-12 text-cyan-400 relative z-10" />
            <div className="absolute inset-0 bg-cyan-500/20 blur-[30px] rounded-2xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="inline-block mb-4 text-cyan-400 font-bold bg-cyan-500/10 px-4 py-2 rounded-full text-xs uppercase tracking-widest border border-cyan-500/20">
              Laboratório de Inovação
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-400 to-blue-400">
              GEDS Lab
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-3 max-w-3xl mx-auto">
              O ambiente onde ideias se tornam tecnologia real
            </p>
            <p className="text-gray-600 max-w-2xl mx-auto text-base italic">
              &ldquo;Inovação não é acidente. É o resultado de experimentos contínuos e coragem para falhar rápido.&rdquo;
            </p>
          </motion.div>

          {/* Live stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mt-10"
          >
            {[
              { label: 'Projetos Ativos', value: '6', icon: '🔬' },
              { label: 'Tecnologias Testadas', value: '18+', icon: '⚡' },
              { label: 'Protótipos Entregues', value: '12', icon: '🚀' },
              { label: 'Horas de P&D / mês', value: '200+', icon: '🧪' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, y: -3 }}
                className="bg-white/[0.03] border border-white/8 hover:border-cyan-500/30 rounded-xl px-5 py-3 text-center transition-all"
              >
                <div className="text-lg mb-0.5">{stat.icon}</div>
                <div className="text-cyan-400 font-black text-xl">{stat.value}</div>
                <div className="text-gray-600 text-[10px] uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── AI Tester ─────────────────────────────────────────── */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-purple-950/30 via-black to-blue-950/30 border border-purple-500/20 rounded-3xl p-6 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-black text-white">Teste nossa IA</h2>
              <span className="text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">BETA</span>
            </div>
            <p className="text-gray-400 text-sm mb-6 max-w-xl">
              Experimente nossa inteligência simulada. Pergunte sobre automação, custos, estratégia de negócio ou tecnologia.
            </p>
            <div className="max-w-xl">
              <AITest />
            </div>
          </div>
        </section>

        {/* ── Projects ─────────────────────────────────────────── */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-2">Projetos do Lab</h2>
              <p className="text-gray-500">Do conceito ao produto final, aqui está o que estamos construindo</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all border ${
                    activeFilter === f
                      ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
                      : 'bg-white/[0.03] text-gray-500 border-white/8 hover:border-cyan-500/20 hover:text-gray-300'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map(project => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center bg-gradient-to-br from-cyan-950/30 to-black border border-cyan-500/15 rounded-3xl p-10 md:p-16 relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          <span className="text-5xl block mb-4">🧪</span>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Quer transformar sua ideia em um protótipo?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Entre em contato e descubra como o GEDS Lab pode acelerar o desenvolvimento da sua solução.
          </p>
          <Link
            href="/contatos"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-black px-10 py-4 rounded-full hover:shadow-[0_0_30px_rgba(0,219,255,0.4)] transition-all"
          >
            Iniciar meu projeto →
          </Link>
        </motion.section>
      </div>
    </main>
  );
}
