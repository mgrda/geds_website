"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import SquareReveal from "../components/SquareReveal";

const ProcessoPage = () => {
  const etapas = [
    {
      title: "1. Entendimento",
      desc: "Realizamos reuniões e análises aprofundadas para entender suas dores, metas e expectativas. Aqui nascem as soluções certas.",
      features: ["Briefing detalhado", "Análise de mercado", "Definição de escopo"]
    },
    {
      title: "2. Prototipação",
      desc: "Transformamos ideias em protótipos visuais navegáveis. Validamos com você antes de começar o desenvolvimento real.",
      features: ["Wireframes interativos", "Testes de usabilidade", "Validação de conceito"]
    },
    {
      title: "3. Desenvolvimento",
      desc: "Implementação do projeto com metodologias ágeis, entregas parciais e validações constantes para garantir qualidade.",
      features: ["Sprints quinzenais", "Testes automatizados", "Deploy contínuo"]
    },
    {
      title: "4. Entrega e Suporte",
      desc: "Depois do lançamento, seguimos com você oferecendo suporte técnico, melhorias e atualizações contínuas.",
      features: ["Treinamento da equipe", "Monitoramento 24/7", "Otimizações contínuas"]
    },
  ];

  return (
    <main className="bg-black text-white">
      <SquareReveal gridSize={12}>
        {/* Hero Section */}
        <section className="relative py-20 px-6 max-w-7xl mx-auto overflow-hidden">
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.png')] bg-repeat"></div>
          </div>

          <motion.div
            className="relative text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block mb-4 text-cyan-400 font-medium bg-cyan-900/30 px-4 py-1 rounded-full border border-cyan-500/30">
              Metodologia
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Nosso Processo de <span className="text-cyan-400">Desenvolvimento</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Um fluxo de trabalho transparente e eficiente que garante resultados excepcionais em cada projeto.
            </p>
          </motion.div>
        </section>

        {/* Process Timeline */}
        <section className="py-16 px-6 max-w-4xl mx-auto">
          <div className="space-y-12">
            {etapas.map((etapa, index) => (
              <motion.div
                key={index}
                className="bg-white/5 p-8 rounded-xl shadow-lg border border-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(0,219,255,0.1)] transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-xl font-bold text-white mb-3">{etapa.title}</h2>
                <p className="text-gray-400 mb-4">{etapa.desc}</p>

                <ul className="space-y-2">
                  {etapa.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <FiCheckCircle className="text-cyan-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Highlight Section */}
        <section className="py-20 px-6 bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border-y border-white/10 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Compromisso com Prazos e Transparência</h2>
            <p className="text-xl mb-8 text-gray-300">
              Sabemos que tecnologia precisa gerar valor real. Por isso, mantemos uma <strong>comunicação clara</strong> durante todo o ciclo, com cronogramas definidos e <strong>respeito absoluto aos prazos</strong>. Você acompanha cada evolução do projeto, sem surpresas.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="bg-black/40 p-6 rounded-xl border border-white/10">
                <div className="text-4xl font-bold mb-2 text-cyan-400">100%</div>
                <div className="text-gray-400">Projetos Entregues</div>
              </div>
              <div className="bg-black/40 p-6 rounded-xl border border-white/10">
                <div className="text-4xl font-bold mb-2 text-cyan-400">24/7</div>
                <div className="text-gray-400">Suporte Contínuo</div>
              </div>
              <div className="bg-black/40 p-6 rounded-xl border border-white/10">
                <div className="text-4xl font-bold mb-2 text-cyan-400">30+</div>
                <div className="text-gray-400">Clientes Satisfeitos</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/5 p-10 rounded-2xl shadow-xl border border-white/10"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Pronto para começar seu projeto?</h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Nosso processo comprovado garante que sua visão se torne realidade com qualidade e eficiência.
            </p>
            <Link
              href="/contatos"
              className="inline-flex items-center bg-cyan-500 text-black px-8 py-3 rounded-full font-bold hover:bg-cyan-400 transition shadow-[0_0_20px_rgba(0,219,255,0.4)] hover:shadow-[0_0_30px_rgba(0,219,255,0.6)]"
            >
              Fale com nossos especialistas
              <FiArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </section>

        {/* Back Button */}
        <div className="pb-16 px-6 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center border border-white/20 text-gray-300 px-6 py-3 rounded-full font-medium hover:bg-white/10 transition"
          >
            Voltar para a Home
          </Link>
        </div>
      </SquareReveal>
    </main>
  );
};

export default ProcessoPage;