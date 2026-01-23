"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import {
  Code2,
  Cloud,
  LineChart,
  Layout,
  Search,
  PenTool,
  Zap,
  ShieldCheck,
} from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";

const HomeContent = () => {
  const services = [
    {
      title: "Desenvolvimento Sob Medida",
      desc: "Sistemas corporativos de alta complexidade. Foco em performance, segurança e escalabilidade real.",
      icon: <Code2 className="w-12 h-12 text-cyan" />,
    },
    {
      title: "Cloud & Infraestrutura",
      desc: "Arquiteturas modernas e migração para nuvem. Redução de custos e eliminação de dívida técnica.",
      icon: <Cloud className="w-12 h-12 text-cyan" />,
    },
    {
      title: "Consultoria Estratégica",
      desc: "Transformamos desafios de negócio em roadmaps técnicos viáveis. Do MVP ao produto final.",
      icon: <LineChart className="w-12 h-12 text-cyan" />,
    },
    {
      title: "Data & Analytics",
      desc: "Dashboards inteligentes e integração de dados para decisões baseadas em fatos, não em intuição.",
      icon: <Search className="w-12 h-12 text-cyan" />,
    },
    {
      title: "UX/UI Design",
      desc: "Interfaces que convertem. Foco total na experiência do usuário e na identidade da sua marca.",
      icon: <Layout className="w-12 h-12 text-cyan" />,
    },
  ];

  const processo = [
    {
      step: "1. Diagnóstico",
      desc: "Mergulhamos no seu negócio para entender o problema raiz antes de escrever qualquer linha de código.",
      icon: <Search className="w-8 h-8 text-black" />,
    },
    {
      step: "2. Estratégia Visual",
      desc: "Prototipagem de alta fidelidade para validar fluxos e garantir que estamos construindo o produto certo.",
      icon: <PenTool className="w-8 h-8 text-black" />,
    },
    {
      step: "3. Construção Ágil",
      desc: "Sprints focados em entrega de valor. Você acompanha a evolução do produto quinzenalmente.",
      icon: <Zap className="w-8 h-8 text-black" />,
    },
    {
      step: "4. Qualidade & Scale",
      desc: "Testes rigorosos e preparação para o lançamento. Suporte contínuo para evoluir sua plataforma.",
      icon: <ShieldCheck className="w-8 h-8 text-black" />,
    },
  ];

  return (
    <main className="px-4 md:px-8 py-12 space-y-20 bg-black">
      {/* Hero / Proposta de Valor */}
      <motion.section
        id="hero"
        className="max-w-5xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-white leading-[1.1]">
          Soluções Digitais que <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-blue-400">Impulsionam Negócios</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Somos parceiros de tecnologia para empresas que buscam ir além. Unimos engenharia de ponta e design estratégico para criar produtos que o mercado ama.
        </p>
      </motion.section>

      {/* Destaque Visual */}
      <section className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <motion.div
            className="md:w-1/2 relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl grayscale hover:grayscale-0 transition-all duration-700">
              <Image
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Desenvolvimento Web Moderno"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          <motion.div
            className="md:w-1/2 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Mais do que Código, <span className="text-cyan">Resultados</span>
            </h2>
            <p className="text-lg text-gray-400">
              Acreditamos que a tecnologia deve servir ao negócio, não o contrário. Nossa abordagem é pragmática: resolvemos problemas complexos com soluções simples e eficientes.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <span className="px-4 py-2 bg-cyan/10 text-cyan rounded-full text-sm font-medium border border-cyan/20">Arquitetura Limpa</span>
              <span className="px-4 py-2 bg-cyan/10 text-cyan rounded-full text-sm font-medium border border-cyan/20">DevOps</span>
              <span className="px-4 py-2 bg-cyan/10 text-cyan rounded-full text-sm font-medium border border-cyan/20">Data Driven</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Nossos Serviços */}
      <section id="servicos" className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="inline-block mb-4 text-cyan font-bold bg-cyan/10 px-4 py-2 rounded-full text-xs uppercase tracking-widest border border-cyan/20">
            Expertise
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">O Que Fazemos</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Da concepção ao lançamento, cobrimos todo o ciclo de vida digital
          </p>
        </motion.div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {services.map((item, index) => (
            <SwiperSlide key={index}>
              <motion.div
                className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl shadow-xl h-full border border-white/10 hover:border-cyan/50 hover:shadow-[0_0_20px_rgba(0,219,255,0.1)] transition-all"
                whileHover={{ y: -10 }}
              >
                <div className="w-20 h-20 rounded-xl flex items-center justify-center mb-6 mx-auto bg-cyan/10 ring-1 ring-cyan/20">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-center mb-4 text-white">{item.title}</h3>
                <p className="text-gray-400 text-center">{item.desc}</p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <motion.div
          className="flex justify-center mt-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link href="/servicos">
            <span className="inline-flex items-center text-cyan font-bold hover:text-white transition cursor-pointer">
              Ver todos os serviços
              <FiArrowRight className="ml-2" />
            </span>
          </Link>
        </motion.div>
      </section>

      {/* Processo */}
      <section id="processo" className="max-w-7xl mx-auto bg-white/5 py-16 px-6 rounded-3xl shadow-2xl border border-white/10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <span className="inline-block mb-4 text-cyan font-bold bg-cyan/10 px-4 py-2 rounded-full text-xs uppercase tracking-widest border border-cyan/20">
            Como Trabalhamos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Metodologia Ágil</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Transparência e previsibilidade em cada etapa
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processo.map((item, index) => (
            <motion.div
              key={index}
              className="bg-black/40 p-6 rounded-xl text-center border border-white/5 hover:border-cyan/30 hover:shadow-[0_0_15px_rgba(0,219,255,0.1)] transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              viewport={{ once: true }}
            >
              <div className="bg-cyan w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg shadow-cyan/20">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{item.step}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
              <span className="inline-block mt-4 text-xs font-bold text-cyan uppercase tracking-wider">
                Passo {index + 1}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Link href="/processo">
            <span className="inline-flex items-center bg-cyan text-black px-8 py-3 rounded-full font-bold hover:bg-white hover:shadow-[0_0_20px_rgba(0,219,255,0.4)] transition shadow-md cursor-pointer">
              Conheça nosso processo detalhado
              <FiArrowRight className="ml-2" />
            </span>
          </Link>
        </motion.div>
      </section>

      {/* Portfólios */}
      <section id="portfolios" className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <span className="inline-block mb-4 text-cyan font-bold bg-cyan/10 px-4 py-2 rounded-full text-xs uppercase tracking-widest border border-cyan/20">
            Projetos Realizados
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Cases de Sucesso</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            O resultado da união entre tecnologia e estratégia
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="bg-white/5 p-6 rounded-2xl shadow-xl overflow-hidden border border-white/10 hover:border-cyan/30 transition-all">
            <div className="relative h-64 rounded-xl overflow-hidden mb-6">
              <Image
                src="https://images.pexels.com/photos/3184451/pexels-photo-3184451.jpeg"
                alt="Projetos Web"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-6">
                <h3 className="text-white text-2xl font-bold">Projetos Web Completos</h3>
              </div>
            </div>
            <p className="text-gray-400">
              Desenvolvemos plataformas web robustas e escaláveis, desde sistemas administrativos complexos até elegantes websites institucionais.
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-2xl shadow-xl overflow-hidden border border-white/10 hover:border-cyan/30 transition-all">
            <div className="relative h-64 rounded-xl overflow-hidden mb-6">
              <Image
                src="https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg"
                alt="Design de Interfaces"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-6">
                <h3 className="text-white text-2xl font-bold">Design de Interfaces</h3>
              </div>
            </div>
            <p className="text-gray-400">
              Interfaces intuitivas e atraentes que melhoram a experiência do usuário e aumentam as taxas de conversão.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link href="/portfolios">
            <span className="inline-flex items-center bg-transparent border border-cyan/50 text-cyan px-8 py-3 rounded-full font-bold hover:bg-cyan/10 hover:shadow-[0_0_15px_rgba(0,219,255,0.2)] transition shadow-lg cursor-pointer">
              Explorar todos os projetos
              <FiArrowRight className="ml-2" />
            </span>
          </Link>
        </motion.div>
      </section>

      {/* CTA Final */}
      <motion.section
        className="max-w-4xl mx-auto text-center bg-gradient-to-br from-cyan/20 to-black p-1 py-16 px-8 rounded-3xl shadow-[0_0_50px_rgba(0,219,255,0.1)] border border-cyan/20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-5xl font-black mb-6 text-white leading-tight">Pronto para transformar <br /> sua ideia em <span className="text-cyan">realidade?</span></h2>
        <p className="text-xl mb-10 text-gray-400 max-w-2xl mx-auto">
          Entre em contato conosco e descubra como a GEDS Inovação pode ajudar seu negócio a alcançar novos patamares.
        </p>
        <Link href="/contatos">
          <span className="inline-flex items-center bg-cyan text-black px-10 py-4 rounded-full font-bold hover:bg-white hover:shadow-[0_0_30px_rgba(0,219,255,0.6)] transition-all shadow-lg cursor-pointer text-lg group">
            Começar Agora
            <FiArrowRight className="ml-3 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </motion.section>
    </main >
  );
};

export default HomeContent;