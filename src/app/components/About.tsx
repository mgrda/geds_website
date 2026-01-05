"use client";

import { motion } from "framer-motion";
import { FiAward, FiCode, FiTrendingUp, FiUsers, FiGlobe, FiHeart } from "react-icons/fi";

export default function About() {
  return (
    <section id="about" className="py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Cabeçalho */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block mb-4 text-cyan font-bold bg-cyan/10 px-4 py-2 rounded-full text-xs uppercase tracking-widest border border-cyan/20">
            Nossa Essência
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            Parceiros Tecnológicos de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-white drop-shadow-[0_0_10px_rgba(0,219,255,0.3)]">Longo Prazo</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Somos uma casa de software boutique. Acompanhamos sua jornada de transformação digital com times dedicados, metodologia ágil e obsessão por qualidade.
          </p>
        </motion.div>

        {/* Conteúdo Principal */}
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Imagem - Tamanho ajustado */}
          <motion.div
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative group">
              <img
                src="/GEDS inovação.jpeg"
                alt="Equipe GEDS Inovação"
                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl border border-white/10 group-hover:border-cyan/30 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-2xl"></div>
              <div className="absolute inset-0 bg-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-black/80 backdrop-blur-xl p-5 rounded-2xl shadow-2xl border border-cyan/30">
              <div className="flex items-center gap-3">
                <div className="bg-cyan/20 p-3 rounded-full">
                  <FiAward className="text-cyan text-2xl" />
                </div>
                <div>
                  <p className="text-2xl font-black text-white">+50</p>
                  <p className="text-[10px] text-cyan uppercase tracking-widest font-bold">Projetos Entregues</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Texto */}
          <motion.div
            className="lg:w-1/2 space-y-10"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-3xl font-black text-white mb-6 tracking-tight">
                TECNOLOGIA GEDS INOVAÇÃO
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed font-light">
                Especialistas em <strong className="text-white font-bold">desenvolvimento de software moderno</strong>,
                criamos soluções digitais que combinam performance extrema, design intuitivo e tecnologia de ponta
                para posicionar sua marca no topo.
              </p>
            </div>

            <div className="space-y-8">
              {[
                { icon: FiCode, title: "Código de Qualidade", desc: "Desenvolvimento de alta fidelidade seguindo padrões globais." },
                { icon: FiTrendingUp, title: "Resultados Exponenciais", desc: "Sistemas focados em conversão e crescimento acelerado." },
                { icon: FiUsers, title: "Design Centrado no Ser Humano", desc: "Experiências memoráveis desenhadas para usuários reais." }
              ].map((item, i) => (
                <div key={i} className="flex gap-5 group">
                  <div className="bg-white/5 p-4 rounded-xl text-cyan flex-shrink-0 group-hover:bg-cyan group-hover:text-black transition-all duration-300 border border-white/5 group-hover:border-cyan">
                    <item.icon className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-1">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-white/5">
              <h4 className="font-bold text-white mb-5 uppercase tracking-widest text-xs">Stack Tecnológica</h4>
              <div className="flex flex-wrap gap-3">
                {['Next.js', 'React', 'Node.js', 'PostgreSQL', 'AWS', 'Tailwind'].map((tech) => (
                  <span key={tech} className="px-4 py-1.5 bg-cyan/5 text-cyan border border-cyan/20 rounded-full font-bold text-[10px] uppercase tracking-wider hover:bg-cyan hover:text-black transition-all cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Estatísticas */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {[
            { icon: FiAward, val: "50+", label: "Projetos Concluídos", color: "cyan" },
            { icon: FiUsers, val: "30+", label: "Clientes Satisfeitos", color: "white" },
            { icon: FiGlobe, val: "15+", label: "Tecnologias", color: "cyan" },
            { icon: FiHeart, val: "100%", label: "Dedicados", color: "white" }
          ].map((stat, i) => (
            <div key={i} className="text-center p-8 bg-white/5 rounded-2xl border border-white/5 hover:border-cyan/20 transition-all group">
              <stat.icon className={`text-3xl ${stat.color === 'cyan' ? 'text-cyan' : 'text-white'} mx-auto mb-4 group-hover:scale-110 transition-transform`} />
              <div className="text-4xl font-black text-white mb-2 tracking-tighter">{stat.val}</div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}