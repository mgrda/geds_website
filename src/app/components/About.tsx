"use client";

import { motion } from "framer-motion";
import { FiAward, FiCode, FiTrendingUp, FiUsers, FiGlobe, FiHeart } from "react-icons/fi";

export default function About() {
  return (
    <section id="about" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Cabeçalho */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block mb-4 text-blue-600 font-medium bg-blue-50 px-4 py-2 rounded-full text-sm uppercase tracking-wider">
            Quem Somos
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Inovação com <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Propósito</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transformamos ideias em soluções digitais que impulsionam negócios
          </p>
        </motion.div>

        {/* Conteúdo Principal */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Imagem - Tamanho ajustado */}
          <motion.div 
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <img
                src="/GEDS inovação.jpeg"
                alt="Equipe GEDS Inovação"
                className="w-full h-[400px] object-cover rounded-2xl shadow-xl border-4 border-white"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-2xl"></div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 p-2 rounded-full">
                  <FiAward className="text-blue-600 text-xl" />
                </div>
                <span className="font-semibold text-gray-800">+50 Projetos</span>
              </div>
            </div>
          </motion.div>

          {/* Texto */}
          <motion.div 
            className="lg:w-1/2 space-y-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900">
              GEDS Inovação Technology
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Especialistas em <strong className="text-gray-800">desenvolvimento de software moderno</strong>, 
              criamos soluções digitais que combinam performance, design intuitivo e tecnologia de ponta 
              para impulsionar seu negócio no mercado digital.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-blue-100 p-3 rounded-lg text-blue-600 flex-shrink-0">
                  <FiCode className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">Código de Qualidade</h3>
                  <p className="text-gray-600">Desenvolvimento seguindo as melhores práticas e padrões do mercado</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-cyan-100 p-3 rounded-lg text-cyan-600 flex-shrink-0">
                  <FiTrendingUp className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">Resultados Mensuráveis</h3>
                  <p className="text-gray-600">Soluções que realmente impactam seus indicadores de negócio</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-indigo-100 p-3 rounded-lg text-indigo-600 flex-shrink-0">
                  <FiUsers className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">Foco no Cliente</h3>
                  <p className="text-gray-600">Entendemos suas necessidades para entregar exatamente o que você precisa</p>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <h4 className="font-semibold text-gray-800 mb-3">Nossas Tecnologias</h4>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium text-sm">
                  Next.js
                </span>
                <span className="px-4 py-2 bg-cyan-100 text-cyan-800 rounded-full font-medium text-sm">
                  React
                </span>
                <span className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full font-medium text-sm">
                  Node.js
                </span>
                <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full font-medium text-sm">
                  UX/UI Design
                </span>
                <span className="px-4 py-2 bg-teal-100 text-teal-800 rounded-full font-medium text-sm">
                  Cloud
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Estatísticas */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <FiAward className="text-3xl text-blue-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900">50+</div>
            <p className="text-gray-600">Projetos Concluídos</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <FiUsers className="text-3xl text-cyan-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900">30+</div>
            <p className="text-gray-600">Clientes Satisfeitos</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <FiGlobe className="text-3xl text-indigo-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900">15+</div>
            <p className="text-gray-600">Tecnologias</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <FiHeart className="text-3xl text-purple-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900">100%</div>
            <p className="text-gray-600">Dedicados</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}