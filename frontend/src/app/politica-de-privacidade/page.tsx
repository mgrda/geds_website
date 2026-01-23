"use client";

import { motion } from "framer-motion";
import SquareReveal from "../components/SquareReveal";

export default function PrivacyPolicy() {
    return (
        <main className="bg-black text-white min-h-screen py-20 px-6">
            <SquareReveal gridSize={12}>
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-black mb-8 text-cyan">Política de Privacidade</h1>
                        <p className="text-gray-400 mb-12 text-lg">
                            Última atualização: {new Date().getFullYear()}
                        </p>

                        <div className="space-y-10 text-gray-300 leading-relaxed">
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">1. Introdução</h2>
                                <p>
                                    A GEDS Inovação Tech (&quot;nós&quot;, &quot;nosso&quot;) leva a sua privacidade a sério. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos as informações pessoais que você nos fornece ao utilizar nosso site e serviços. Ao acessar nossa plataforma, você concorda com as práticas descritas neste documento.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">2. Coleta de Dados</h2>
                                <p>
                                    Coletamos apenas as informações essenciais para a prestação de nossos serviços e melhoria da sua experiência:
                                </p>
                                <ul className="list-disc pl-6 mt-4 space-y-2 marker:text-cyan">
                                    <li><strong>Informações de contato:</strong> Nome, e-mail, telefone e empresa, fornecidos voluntariamente através de formulários de contato.</li>
                                    <li><strong>Dados de navegação:</strong> Endereço IP, tipo de navegador, páginas visitadas e tempo de permanência, coletados para fins analíticos e de segurança.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">3. Uso das Informações</h2>
                                <p>
                                    Utilizamos seus dados para:
                                </p>
                                <ul className="list-disc pl-6 mt-4 space-y-2 marker:text-cyan">
                                    <li>Responder a solicitações de contato e orçamentos.</li>
                                    <li>Melhorar a performance e usabilidade do nosso site.</li>
                                    <li>Enviar comunicações institucionais relevantes, caso você tenha optado por recebê-las.</li>
                                    <li>Cumprir obrigações legais e regulatórias.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">4. Proteção e Segurança</h2>
                                <p>
                                    Adotamos medidas técnicas e organizacionais rigorosas para proteger seus dados contra acesso não autorizado, alteração, divulgação ou destruição. Utilizamos protocolos de criptografia e servidores seguros, seguindo as melhores práticas do mercado de tecnologia.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">5. Compartilhamento</h2>
                                <p>
                                    Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros para fins comerciais. Seus dados podem ser compartilhados apenas com prestadores de serviço essenciais para nossa operação (ex: hospedagem), sob estritos acordos de confidencialidade, ou quando exigido por lei.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">6. Seus Direitos</h2>
                                <p>
                                    Você tem o direito de solicitar o acesso, correção ou exclusão de seus dados pessoais armazenados em nossos sistemas. Para exercer esses direitos, entre em contato conosco através dos nossos canais oficiais.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">7. Contato</h2>
                                <p>
                                    Se tiver dúvidas sobre esta Política de Privacidade ou sobre o tratamento de seus dados, entre em contato conosco através da página de <a href="/contatos" className="text-cyan hover:underline">Contato</a>.
                                </p>
                            </section>
                        </div>
                    </motion.div>
                </div>
            </SquareReveal>
        </main>
    );
}
