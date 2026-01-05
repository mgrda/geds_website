"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import SquareReveal from "../components/SquareReveal";

const ServiceDetail = ({ id, title, description, benefits, image, reverse }: { id: string, title: string, description: string, benefits: string[], image: string, reverse?: boolean }) => {
    return (
        <div id={id} className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 py-20 border-b border-white/5 last:border-0 scroll-mt-24`}>
            <motion.div
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, x: reverse ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <div className="relative group rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-[400px] object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute bottom-0 left-0 p-6 z-20">
                        <div className="h-1 w-20 bg-cyan-500 mb-4 rounded-full" />
                    </div>
                </div>
            </motion.div>

            <motion.div
                className="w-full lg:w-1/2 space-y-6"
                initial={{ opacity: 0, x: reverse ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <h3 className="text-3xl md:text-4xl font-bold text-white">
                    {title}
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                    {description}
                </p>

                <ul className="space-y-4 pt-4">
                    {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <FiCheckCircle className="text-cyan-400 text-xl mt-1 flex-shrink-0" />
                            <span className="text-gray-400">{benefit}</span>
                        </li>
                    ))}
                </ul>
            </motion.div>
        </div>
    );
};

export default function ServicesPage() {
    const services = [
        {
            id: "desenvolvimento-web",
            title: "Desenvolvimento Web Full Stack",
            description: "Construímos aplicações web robustas e escaláveis, utilizando as tecnologias mais avançadas do mercado como React, Next.js e TypeScript. Nosso foco é entregar performance superior, SEO otimizado e uma experiência de usuário impecável.",
            image: "https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg",
            benefits: [
                "Single Page Applications (SPA) ultrarrápidas",
                "Dashboards administrativos complexos",
                "Integração com APIs e serviços de terceiros",
                "Arquitetura escalável e segura"
            ]
        },
        {
            id: "solucoes-inovadoras",
            title: "Soluções Inovadoras & Consultoria",
            description: "Não apenas escrevemos código, nós resolvemos problemas de negócio. Nossa consultoria técnica ajuda a transformar suas ideias abstratas em roadmaps de produtos concretos e viáveis.",
            image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
            benefits: [
                "Análise de viabilidade técnica",
                "Design de arquitetura de software",
                "Automação de processos empresariais",
                "Implementação de IA e Machine Learning"
            ]
        },
        {
            id: "websites-profissionais",
            title: "Websites Institucionais Premium",
            description: "Sua presença digital é o cartão de visitas da sua empresa. Criamos websites com design exclusivo, identidade visual marcante e foco total em conversão de leads.",
            image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
            benefits: [
                "Design responsivo para todos os dispositivos",
                "Animações fluidas e micro-interações",
                "Otimização para motores de busca (SEO)",
                "CMS fácil de gerenciar"
            ]
        },
        {
            id: "modernizacao-sistemas",
            title: "Modernização de Sistemas Legados",
            description: "Sistemas antigos podem frear o crescimento da sua empresa. Nós modernizamos sua infraestrutura tecnológica, migrando sistemas legados para a nuvem com segurança e sem perda de dados.",
            image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
            benefits: [
                "Migração para Cloud (AWS, Azure, Google Cloud)",
                "Refatoração de código e atualização de stack",
                "Melhoria de performance e segurança",
                "Redução de custos operacionais"
            ]
        },
        {
            id: "prototipagem-mvps",
            title: "Prototipagem rápida e MVPs",
            description: "Quer validar uma ideia de startup? Ajudamos você a lançar seu Mínimo Produto Viável (MVP) em tempo recorde, focando nas funcionalidades essenciais para testar o mercado.",
            image: "https://images.pexels.com/photos/3810787/pexels-photo-3810787.jpeg",
            benefits: [
                "Prototipagem de alta fidelidade (Figma)",
                "Desenvolvimento ágil (Scrum/Kanban)",
                "Feedback loop rápido",
                "Lançamento em semanas, não meses"
            ]
        }
    ];

    return (
        <main className="min-h-screen bg-black text-white relative">
            <SquareReveal gridSize={12}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">

                    {/* Header */}
                    <div className="text-center mb-24">
                        <Link href="/servicos" className="inline-flex items-center text-gray-400 hover:text-cyan-400 mb-8 transition-colors">
                            <FiArrowLeft className="mr-2" />
                            Voltar para Serviços
                        </Link>
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-blue-200 mb-6"
                        >
                            Nossa Expertise em Detalhes
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-gray-400 max-w-2xl mx-auto"
                        >
                            Mergulhe fundo em como nossas soluções podem transformar o seu negócio através da tecnologia.
                        </motion.p>
                    </div>

                    {/* Services List */}
                    <div className="space-y-4">
                        {services.map((service, index) => (
                            <ServiceDetail
                                key={index}
                                {...service}
                                reverse={index % 2 !== 0}
                            />
                        ))}
                    </div>

                    {/* CTA Footer */}
                    <div className="mt-24 text-center">
                        <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 rounded-3xl p-12 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
                            <h2 className="text-3xl font-bold mb-6">Pronto para começar seu projeto?</h2>
                            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                                Não importa o tamanho do desafio, nossa equipe está preparada para entregar a melhor solução tecnológica.
                            </p>
                            <Link
                                href="/contatos"
                                className="inline-block px-10 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/30 transition-all transform hover:-translate-y-1"
                            >
                                Falar com um Especialista
                            </Link>
                        </div>
                    </div>

                </div>
            </SquareReveal>
        </main>
    );
}
