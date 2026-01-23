"use client";

import { motion } from "framer-motion";
import NextImage from "next/image";
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
                <div className="relative group rounded-2xl overflow-hidden shadow-2xl border border-white/10 w-full h-[400px]">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                    <NextImage
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 1024px) 100vw, 50vw"
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
            id: "desenvolvimento-sob-medida",
            title: "Desenvolvimento Sob Medida",
            description: "Criamos software corporativo de alta complexidade desenhado especificamente para as regras de negócio da sua empresa. Utilizamos arquiteturas robustas (Clean Architecture, Hexagonal) para garantir que o sistema cresça junto com sua operação, sem perder performance ou segurança.",
            image: "https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg",
            benefits: [
                "Arquitetura escalável e resiliente",
                "Segurança by-design",
                "Integração total com sistemas legados",
                "Código auditável e de alta qualidade"
            ]
        },
        {
            id: "cloud-infraestrutura",
            title: "Cloud & Infraestrutura",
            description: "Modernize sua operação migrando para a nuvem. Projetamos e gerenciamos infraestruturas cloud-native (AWS, Azure, Google Cloud) que reduzem custos operacionais, aumentam a disponibilidade e eliminam dívidas técnicas de servidores on-premise.",
            image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
            benefits: [
                "Redução de custos com servidores (FinOps)",
                "Alta disponibilidade e redundância",
                "Pipelines de CI/CD automatizados",
                "Monitoramento e observabilidade 24/7"
            ]
        },
        {
            id: "consultoria-estrategica",
            title: "Consultoria Estratégica",
            description: "Mais do que código, oferecemos visão de inteligência. Nossos especialistas atuam como parceiros estratégicos para transformar desafios de negócio em roadmaps técnicos viáveis, guiando sua empresa desde a validação de MVPs até a escala global.",
            image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
            benefits: [
                "Diagnóstico tecnológico profundo",
                "Definição de stack e arquitetura",
                "Otimização de processos de desenvolvimento",
                "Mentoria técnica para times internos"
            ]
        },
        {
            id: "data-analytics",
            title: "Data & Analytics",
            description: "Transforme dados brutos em vantagem competitiva. Construímos pipelines de dados e dashboards inteligentes que permitem aos gestores tomar decisões baseadas em fatos e métricas reais, com visualizações intuitivas e relatórios em tempo real.",
            image: "https://images.pexels.com/photos/3810787/pexels-photo-3810787.jpeg",
            benefits: [
                "Dashboards executivos (PowerBI, Metabase)",
                "Engenharia de dados e ETL",
                "Modelagem de dados para BI",
                "Insights preditivos para o negócio"
            ]
        },
        {
            id: "ux-ui-design",
            title: "UX/UI Design",
            description: "Interfaces que encantam e convertem. Nosso time de design cria experiências digitais centradas no usuário, aliando estética sofisticada (Cyber-Neo) com usabilidade funcional para maximizar a retenção e o engajamento.",
            image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
            benefits: [
                "Pesquisa e testes com usuários",
                "Prototipagem de alta fidelidade",
                "Design Systems completos",
                "Foco em acessibilidade e conversão"
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
                                className="inline-block px-10 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl shadow-[0_0_20px_rgba(0,219,255,0.4)] hover:shadow-[0_0_30px_rgba(0,219,255,0.6)] transition-all transform hover:-translate-y-1"
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
