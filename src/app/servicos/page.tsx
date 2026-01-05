"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight, FiCode, FiLayers, FiMonitor, FiRefreshCw, FiZap } from "react-icons/fi";
import SquareReveal from "../components/SquareReveal";

const Services = () => {
  const services = [
    {
      title: "Desenvolvimento Web",
      description: "Aplicações web modernas, rápidas e seguras utilizando React, Next.js e TypeScript para performance superior e excelente UX.",
      icon: <FiCode className="text-3xl" />,
      image: "https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg",
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Soluções Inovadoras",
      description: "Transformamos suas ideias em plataformas tecnológicas funcionais que resolvem problemas reais do seu negócio.",
      icon: <FiZap className="text-3xl" />,
      image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Websites Profissionais",
      description: "Sites com identidade visual personalizada, foco em conversão e experiência do usuário excepcional.",
      icon: <FiMonitor className="text-3xl" />,
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Modernização de Sistemas",
      description: "Transformamos sistemas legados em soluções modernas, seguras e eficientes com arquiteturas performáticas.",
      icon: <FiRefreshCw className="text-3xl" />,
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
      color: "bg-orange-100 text-orange-600"
    },
    {
      title: "Prototipagem e MVPs",
      description: "Valide suas ideias rapidamente com protótipos funcionais e produtos mínimos viáveis de alta qualidade.",
      icon: <FiLayers className="text-3xl" />,
      image: "https://images.pexels.com/photos/3810787/pexels-photo-3810787.jpeg",
      color: "bg-red-100 text-red-600"
    }
  ];

  return (
    <section id="servicos" className="py-20 bg-black text-white">
      <SquareReveal gridSize={15}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Cabeçalho */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block mb-4 text-cyan-400 font-medium bg-cyan-900/30 px-4 py-1 rounded-full border border-cyan-500/30">
              Nossos Serviços
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Soluções <span className="text-cyan-400">Tecnológicas</span> Sob Medida
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Impulsionamos seu negócio com desenvolvimento web de alta qualidade e soluções inovadoras
            </p>
          </motion.div>

          {/* Grid de Serviços */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="group bg-white/5 rounded-xl shadow-lg overflow-hidden border border-white/10 hover:shadow-[0_0_20px_rgba(0,219,255,0.2)] hover:border-cyan-500/50 transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className={`absolute -top-6 -right-6 bg-cyan-500 text-black w-20 h-20 rounded-full flex items-center justify-center shadow-lg group-hover:animate-pulse`}>
                    {service.icon}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{service.title}</h3>
                  <p className="text-gray-400 mb-4">{service.description}</p>
                  <Link
                    href="/sobre-servicos"
                    className="inline-flex items-center text-cyan-400 font-medium hover:text-cyan-300 transition"
                  >
                    Saiba mais
                    <FiArrowRight className="ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Destaque Tecnológico */}
          <motion.div
            className="mt-20 bg-white/5 rounded-2xl shadow-xl overflow-hidden border border-white/10 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 p-10 lg:p-14 bg-gradient-to-r from-blue-900/60 to-cyan-900/60 text-white border-r border-white/10">
                <h3 className="text-3xl font-bold mb-4">Tecnologias que Dominamos</h3>
                <p className="text-gray-300 mb-6">
                  Utilizamos as ferramentas mais modernas do mercado para entregar soluções de alta performance e qualidade.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'MSQL'].map((tech, i) => (
                    <span key={i} className="px-4 py-2 bg-black/40 border border-white/20 rounded-full text-sm text-cyan-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2 p-10 lg:p-14">
                <h3 className="text-3xl font-bold text-white mb-4">Nossa Abordagem</h3>
                <p className="text-gray-400 mb-6">
                  Combinamos metodologias ágeis com anos de experiência para entregar projetos que realmente fazem a diferença.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="bg-cyan-900/40 p-1 rounded-full mt-1">
                      <FiArrowRight className="text-cyan-400" />
                    </div>
                    <span className="text-gray-300">Desenvolvimento iterativo e incremental</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-cyan-900/40 p-1 rounded-full mt-1">
                      <FiArrowRight className="text-cyan-400" />
                    </div>
                    <span className="text-gray-300">Foco na experiência do usuário</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-cyan-900/40 p-1 rounded-full mt-1">
                      <FiArrowRight className="text-cyan-400" />
                    </div>
                    <span className="text-gray-300">Testes automatizados e qualidade garantida</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Botão de Voltar */}
          <motion.div
            className="flex justify-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              href="/"
              className="inline-flex items-center bg-cyan-500 text-black px-8 py-3 rounded-full font-bold hover:bg-cyan-400 transition shadow-[0_0_20px_rgba(0,219,255,0.4)] hover:shadow-[0_0_30px_rgba(0,219,255,0.6)]"
            >
              Voltar para a Home
              <FiArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </SquareReveal>
    </section>
  );
};

export default Services;