"use client";

import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import Image from "next/image";
import SquareReveal from "../components/SquareReveal";
import Link from "next/link";

interface PortfolioProject {
  title: string;
  description: string;
  link: string;
  image: string;
  techs: string[];
}

const portfolioProjects: PortfolioProject[] = [
  {
    title: "Legacidos",
    description: "Legacidos é um museu digital interativo que preserva a memória de objetos comuns do cotidiano que tiveram grande relevância cultural, social ou tecnológica, mas que perderam espaço com o avanço do tempo.",
    link: "https://legacidos.vercel.app/",
    image: "/legacidos.png",
    techs: ["React", "Next.js", "Tailwind CSS", "TypeScript"]
  },
  {
    title: "Borasiô",
    description: "Um aplicativo de carona pensado para São Luís, mais humano, seguro e acessível. O Bora Siô foca nas necessidades locais, atendendo desde bairros centrais até a zona rural, valorizando a cultura maranhense e trazendo soluções inovadoras para a mobilidade da ilha.",
    link: "https://pi-borasio.vercel.app/",
    image: "/ora.png",
    techs: ["React", "Node.js", "Vite", "Tailwind CSS"]
  },
  {
    title: "SmartUPA",
    description: "O smartUPA é uma interface web desenvolvida para otimizar o agendamento de consultas e monitoramento de leitos nas Unidades de Pronto Atendimento (UPAs) de São Luís.",
    link: "https://sistema-upa-mauve.vercel.app/",
    image: "/smartUPA.png",
    techs: ["JavaScript", "HTML", "CSS"]
  }
];

export default function PortfoliosPage() {
  return (
    <section className="bg-black text-white py-20 min-h-screen relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[10%] w-[600px] h-[600px] bg-cyan-500/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full"></div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-10 bg-repeat"></div>
      </div>

      <SquareReveal gridSize={12}>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <span className="inline-block mb-4 text-cyan-400 font-medium bg-cyan-900/30 px-4 py-1 rounded-full border border-cyan-500/30">
              Nosso Portfólio
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-linear-to-r from-white via-cyan-100 to-gray-400 bg-clip-text text-transparent">
              Projetos de Excelência
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Materializamos ideias complexas em plataformas digitais de alto impacto.
              Explore alguns de nossos trabalhos mais recentes e veja como aplicamos tecnologia de ponta na prática.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {portfolioProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="group relative bg-white/5 rounded-3xl overflow-hidden shadow-2xl border border-white/10 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,219,255,0.15)] backdrop-blur-sm"
              >
                <Link href={project.link} target="_blank" rel="noopener noreferrer" className="block relative h-72 md:h-80 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-3 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <FiExternalLink className="text-cyan-400 text-xl" />
                  </div>
                </Link>

                <div className="p-8 md:p-10 relative">
                  <div className="absolute top-0 left-10 w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 transform -translate-y-1/2"></div>

                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      <Link href={project.link} target="_blank" rel="noopener noreferrer">
                        {project.title}
                      </Link>
                    </h2>
                  </div>

                  <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Tecnologias</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.techs.map((tech, i) => (
                        <span
                          key={i}
                          className="bg-black/40 text-cyan-300 text-sm font-medium px-4 py-1.5 rounded-full border border-white/10 group-hover:border-cyan-500/30 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-10">
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-white hover:text-black hover:bg-cyan-400 border border-white/20 hover:border-transparent px-8 py-3 rounded-full font-semibold transition-all duration-300"
                    >
                      Acessar o Projeto
                      <FiExternalLink className="ml-2" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-24 text-center border-t border-white/10 pt-16"
          >
            <h3 className="text-2xl font-bold mb-4 text-white">Quer ver sua ideia transformar-se em realidade?</h3>
            <p className="text-gray-400 text-lg font-light mb-8 max-w-2xl mx-auto">
              Nosso time combina rigor técnico, design sofisticado e visão estratégica para entregar produtos de classe mundial.
            </p>
            <Link
              href="/contatos"
              className="inline-block bg-cyan-500 text-black px-10 py-4 rounded-full font-bold hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(0,219,255,0.3)] hover:shadow-[0_0_30px_rgba(0,219,255,0.5)] transform hover:-translate-y-1"
            >
              Iniciar um Projeto
            </Link>
          </motion.div>
        </div>
      </SquareReveal>
    </section>
  );
}