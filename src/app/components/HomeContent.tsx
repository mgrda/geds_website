"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import "swiper/css";
import "swiper/css/pagination";

const HomeContent = () => {
  const services = [
    {
      title: "Desenvolvimento Web",
      desc: "Soluções web escaláveis com foco em performance, segurança e usabilidade.",
      image: "https://cdn-icons-png.flaticon.com/512/1006/1006360.png",
      color: "bg-blue-100",
    },
    {
      title: "Modernização de Sistemas",
      desc: "Refatoração e redesign de sistemas legados com tecnologias modernas.",
      image: "https://cdn-icons-png.flaticon.com/512/4228/4228700.png",
      color: "bg-purple-100",
    },
    {
      title: "Prototipagem e MVPs",
      desc: "Valide sua ideia com agilidade por meio de protótipos funcionais.",
      image: "https://cdn-icons-png.flaticon.com/512/2306/2306154.png",
      color: "bg-green-100",
    },
    {
      title: "Soluções Inovadoras",
      desc: "Plataformas digitais e ferramentas inteligentes que resolvem desafios reais com criatividade e tecnologia de ponta.",
      image: "https://cdn-icons-png.flaticon.com/512/8090/8090406.png",
      color: "bg-cyan-100",
    },
    {
      title: "Criação de Websites Profissionais",
      desc: "Sites institucionais, landing pages, blogs e portfólios modernos com foco em conversão e presença online.",
      image: "https://cdn-icons-png.flaticon.com/512/3039/3039436.png",
      color: "bg-indigo-100",
    },
  ];

  const processo = [
    {
      step: "1. Entendimento",
      desc: "Reuniões com o cliente para entender o problema e as necessidades do projeto.",
      image: "https://cdn-icons-png.flaticon.com/512/4149/4149649.png",
    },
    {
      step: "2. Prototipação",
      desc: "Desenhamos e validamos interfaces antes do desenvolvimento.",
      image: "https://cdn-icons-png.flaticon.com/512/4839/4839908.png",
    },
    {
      step: "3. Desenvolvimento",
      desc: "Implementação ágil com tecnologias modernas e boas práticas.",
      image: "https://cdn-icons-png.flaticon.com/512/1055/1055687.png",
    },
    {
      step: "4. Entrega e Suporte",
      desc: "Implementação completa com acompanhamento técnico e suporte contínuo.",
      image: "https://cdn-icons-png.flaticon.com/512/3050/3050525.png",
    },
  ];

  return (
    <main className="px-4 md:px-8 py-12 space-y-20 bg-gradient-to-b from-white to-gray-50">
      {/* Hero / Proposta de Valor */}
      <motion.section 
        id="hero" 
        className="max-w-5xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
          Transformamos ideias em <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">soluções digitais</span> inovadoras
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Na <strong className="font-semibold text-gray-800">GEDS Inovação</strong>, unimos criatividade, performance e design para criar produtos digitais que geram resultados reais.
        </p>
      </motion.section>

      {/* Destaque Visual */}
      <section className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
              alt="Desenvolvimento Web Moderno"
              className="rounded-2xl shadow-xl object-cover w-full h-80 md:h-96"
            />
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Inovação com <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Propósito</span>
            </h2>
            <p className="text-lg text-gray-600">
              Na GEDS Inovação, acreditamos que a tecnologia deve resolver problemas reais. Cada linha de código que escrevemos é pensada para entregar valor tangível ao seu negócio.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Performance</span>
              <span className="px-4 py-2 bg-cyan-100 text-cyan-800 rounded-full text-sm font-medium">Inovação</span>
              <span className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">Design Inteligente</span>
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
          <span className="inline-block mb-4 text-blue-600 font-medium bg-blue-50 px-4 py-2 rounded-full text-sm uppercase tracking-wider">
            Nossas Soluções
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nossos Serviços</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Soluções completas para impulsionar seu negócio digital
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
                className="bg-white p-8 rounded-2xl shadow-lg h-full border border-gray-100 hover:border-blue-200 transition-all"
                whileHover={{ y: -10 }}
              >
                <div className={`${item.color} w-20 h-20 rounded-xl flex items-center justify-center mb-6 mx-auto`}>
                  <img src={item.image} alt={item.title} className="w-12 h-12 object-contain" />
                </div>
                <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">{item.title}</h3>
                <p className="text-gray-600 text-center">{item.desc}</p>
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
            <span className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition cursor-pointer">
              Ver todos os serviços
              <FiArrowRight className="ml-2" />
            </span>
          </Link>
        </motion.div>
      </section>

      {/* Processo */}
      <section id="processo" className="max-w-7xl mx-auto bg-white py-16 px-6 rounded-3xl shadow-sm border border-gray-100">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <span className="inline-block mb-4 text-blue-600 font-medium bg-blue-50 px-4 py-2 rounded-full text-sm uppercase tracking-wider">
            Metodologia
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nosso Processo</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Metodologia clara e eficiente para garantir o sucesso do seu projeto
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processo.map((item, index) => (
            <motion.div 
              key={index}
              className="bg-gray-50 p-6 rounded-xl text-center border border-gray-200 hover:shadow-lg transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              viewport={{ once: true }}
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <img src={item.image} alt={item.step} className="w-8 h-8 object-contain" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{item.step}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
              <span className="inline-block mt-4 text-xs font-medium text-blue-600">
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
            <span className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition shadow-md cursor-pointer">
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
          <span className="inline-block mb-4 text-blue-600 font-medium bg-blue-50 px-4 py-2 rounded-full text-sm uppercase tracking-wider">
            Nossos Trabalhos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nossos Portfólios</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Conheça alguns dos projetos que já desenvolvemos
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="bg-white p-6 rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all">
            <div className="relative h-64 rounded-xl overflow-hidden mb-6">
              <img
                src="https://images.pexels.com/photos/3184451/pexels-photo-3184451.jpeg"
                alt="Projetos Web"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent flex items-end p-6">
                <h3 className="text-white text-2xl font-bold">Projetos Web Completos</h3>
              </div>
            </div>
            <p className="text-gray-700">
              Desenvolvemos plataformas web robustas e escaláveis, desde sistemas administrativos complexos até elegantes websites institucionais.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all">
            <div className="relative h-64 rounded-xl overflow-hidden mb-6">
              <img
                src="https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg"
                alt="Design de Interfaces"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent flex items-end p-6">
                <h3 className="text-white text-2xl font-bold">Design de Interfaces</h3>
              </div>
            </div>
            <p className="text-gray-700">
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
            <span className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition shadow-lg cursor-pointer">
              Explorar todos os projetos
              <FiArrowRight className="ml-2" />
            </span>
          </Link>
        </motion.div>
      </section>

      {/* CTA Final */}
      <motion.section 
        className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16 px-8 rounded-3xl shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para transformar sua ideia em realidade?</h2>
        <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
          Entre em contato conosco e descubra como a GEDS Inovação pode ajudar seu negócio a alcançar novos patamares.
        </p>
        <Link href="/contatos">
          <span className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition shadow-lg cursor-pointer">
            Iniciar Projeto
            <FiArrowRight className="ml-2" />
          </span>
        </Link>
      </motion.section>
    </main>
  );
};

export default HomeContent;