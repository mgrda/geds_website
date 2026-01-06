"use client";

import { motion } from "framer-motion";
import SquareReveal from "../components/SquareReveal";

export default function TermsOfUse() {
    return (
        <main className="bg-black text-white min-h-screen py-20 px-6">
            <SquareReveal gridSize={12}>
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-black mb-8 text-cyan">Termos de Uso</h1>
                        <p className="text-gray-400 mb-12 text-lg">
                            Última atualização: {new Date().getFullYear()}
                        </p>

                        <div className="space-y-10 text-gray-300 leading-relaxed">
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">1. Aceitação dos Termos</h2>
                                <p>
                                    Ao acessar e utilizar o site da GEDS Inovação Tech, você concorda expressamente com estes Termos de Uso e com nossa Política de Privacidade. Caso não concorde com qualquer disposição destes termos, recomendamos que não utilize nosso site.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">2. Uso do Site</h2>
                                <p>
                                    O conteúdo deste site é destinado a fins informativos e institucionais sobre os serviços de tecnologia prestados pela GEDS Inovação Tech.
                                </p>
                                <p className="mt-4">
                                    Você concorda em não:
                                </p>
                                <ul className="list-disc pl-6 mt-4 space-y-2 marker:text-cyan">
                                    <li>Utilizar o site para qualquer fim ilegal ou não autorizado.</li>
                                    <li>Tentar violar a segurança do site ou acessar áreas restritas sem permissão.</li>
                                    <li>Copiar, reproduzir ou distribuir o conteúdo do site sem nossa autorização expressa.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">3. Propriedade Intelectual</h2>
                                <p>
                                    Todo o conteúdo presente neste site, incluindo textos, logotipos, imagens, gráficos, códigos e software, é propriedade exclusiva da GEDS Inovação Tech ou de seus licenciadores, sendo protegido pelas leis de direitos autorais e propriedade intelectual. O uso indevido de qualquer material é estritamente proibido.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">4. Limitação de Responsabilidade</h2>
                                <p>
                                    A GEDS Inovação Tech envida os melhores esforços para manter as informações do site precisas e atualizadas. No entanto, não garantimos que o site estará livre de erros ou interrupções. Em nenhuma circunstância seremos responsáveis por danos diretos, indiretos ou consequenciais decorrentes do uso ou impossibilidade de uso deste site.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">5. Links para Terceiros</h2>
                                <p>
                                    Nosso site pode conter links para sites de terceiros. Estes links são fornecidos apenas para sua conveniência e não implicam endosso ou responsabilidade pelo conteúdo desses sites. Recomendamos que você leia os termos de uso e políticas de privacidade de qualquer site externo que visitar.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">6. Alterações nos Termos</h2>
                                <p>
                                    Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento, sem aviso prévio. As alterações entrarão em vigor imediatamente após sua publicação no site. O uso contínuo do site após as alterações constitui aceitação dos novos termos.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">7. Lei Aplicável e Foro</h2>
                                <p>
                                    Estes termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da comarca de São Luís, Maranhão, para dirimir quaisquer dúvidas ou litígios oriundos destes Termos de Uso, com renúncia a qualquer outro, por mais privilegiado que seja.
                                </p>
                            </section>
                        </div>
                    </motion.div>
                </div>
            </SquareReveal>
        </main>
    );
}
