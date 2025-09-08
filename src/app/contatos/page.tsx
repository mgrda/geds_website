'use client';

import { FaInstagram, FaGithub, FaLinkedin, FaPaperPlane, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

type FormData = {
  name: string;
  email: string;
  message: string;
};

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Aqui você pode adicionar a lógica de envio do formulário
    alert(`Obrigado pela mensagem, ${data.name}! Entraremos em contato em breve.`);
    reset();
  };

  // Animação para os elementos
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="contact" className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white py-24 overflow-hidden">
      {/* Elementos decorativos animados */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1.5 }}
        className="absolute top-0 left-0 w-full h-full"
      >
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-500 rounded-full filter blur-[100px] animate-float"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-orange-500 rounded-full filter blur-[100px] animate-float-delay"></div>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Cabeçalho com animação */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-400">
              Vamos trabalhar juntos?
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Entre em contato com a <span className="text-blue-400 font-semibold">GEDS Inovação</span> e vamos transformar suas ideias em realidade digital.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          {/* Formulário de Contato com animação */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="lg:w-1/2"
          >
            <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-gray-700 hover:border-orange-400/30 transition-all duration-500">
              <div className="flex items-center gap-3 mb-6">
                <FaPaperPlane className="text-orange-400 text-2xl" />
                <h3 className="text-2xl font-bold">Envie sua mensagem</h3>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                aria-label="Formulário de contato"
                className="space-y-6"
                noValidate
              >
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-gray-300 font-medium">Nome *</label>
                  <input
                    type="text"
                    id="name"
                    {...register('name', { required: 'Nome é obrigatório' })}
                    placeholder="Seu nome completo"
                    className={`w-full px-5 py-3 rounded-xl bg-gray-700/70 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 border ${errors.name ? 'border-red-500' : 'border-gray-600'} transition`}
                  />
                  {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-gray-300 font-medium">Email *</label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', { 
                      required: 'Email é obrigatório',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Email inválido'
                      }
                    })}
                    placeholder="seu@email.com"
                    className={`w-full px-5 py-3 rounded-xl bg-gray-700/70 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 border ${errors.email ? 'border-red-500' : 'border-gray-600'} transition`}
                  />
                  {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-gray-300 font-medium">Mensagem *</label>
                  <textarea
                    id="message"
                    {...register('message', { 
                      required: 'Mensagem é obrigatória',
                      minLength: {
                        value: 20,
                        message: 'Mensagem deve ter pelo menos 20 caracteres'
                      }
                    })}
                    rows={5}
                    placeholder="Como podemos ajudar você?"
                    className={`w-full px-5 py-3 rounded-xl bg-gray-700/70 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 border ${errors.message ? 'border-red-500' : 'border-gray-600'} transition`}
                  ></textarea>
                  {errors.message && <p className="text-red-400 text-sm">{errors.message.message}</p>}
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold px-6 py-4 rounded-xl shadow-lg hover:shadow-orange-500/20 transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <FaPaperPlane />
                    Enviar Mensagem
                  </span>
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Informações de Contato com animação */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ delay: 0.2 }}
            className="lg:w-1/2"
          >
            <div className="h-full bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-gray-700 hover:border-blue-400/30 transition-all duration-500 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <FaEnvelope className="text-blue-400 text-2xl" />
                  <h3 className="text-2xl font-bold">Nossos Contatos</h3>
                </div>

                <div className="space-y-6">
                  {/* Email principal */}
                  <motion.div 
                    whileHover={{ y: -3 }}
                    className="bg-gray-700/70 rounded-xl p-6 border border-gray-600 hover:border-blue-400/50 transition-all"
                  >
                    <h4 className="text-lg font-semibold mb-3 text-gray-300">Email corporativo</h4>
                    <a
                      href="mailto:contato@ynnothivix.com.br"
                      className="inline-flex items-center gap-3 text-white text-lg hover:text-blue-400 transition group"
                    >
                      <div className="bg-blue-500/20 p-2 rounded-lg group-hover:bg-blue-500/30 transition">
                        <FaEnvelope className="text-blue-400 text-xl" />
                      </div>
                      contato@gedsinovacao.com
                    </a>
                    <p className="mt-3 text-gray-400">
                      Respondemos em até 24 horas durante dias úteis.
                    </p>
                  </motion.div>

                  {/* WhatsApp */}
                  <motion.div 
                    whileHover={{ y: -3 }}
                    className="bg-gray-700/70 rounded-xl p-6 border border-gray-600 hover:border-green-400/50 transition-all"
                  >
                    <h4 className="text-lg font-semibold mb-3 text-gray-300">WhatsApp</h4>
                    <a
                      href="https://wa.me/5598987654321"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 text-white text-lg hover:text-green-400 transition group"
                    >
                      <div className="bg-green-500/20 p-2 rounded-lg group-hover:bg-green-500/30 transition">
                        <FaWhatsapp className="text-green-400 text-xl" />
                      </div>
                      (98) 99999-9999
                    </a>
                    <p className="mt-3 text-gray-400">
                      Atendimento rápido via WhatsApp.
                    </p>
                  </motion.div>

                  {/* Localização fictícia */}
                  <motion.div 
                    whileHover={{ y: -3 }}
                    className="bg-gray-700/70 rounded-xl p-6 border border-gray-600 hover:border-red-400/50 transition-all"
                  >
                    <h4 className="text-lg font-semibold mb-3 text-gray-300">Nossa localização</h4>
                    <div className="inline-flex items-center gap-3 text-gray-300 hover:text-red-400 transition group">
                      <div className="bg-red-500/20 p-2 rounded-lg group-hover:bg-red-500/30 transition">
                        <FaMapMarkerAlt className="text-red-400 text-xl" />
                      </div>
                      São Luís - MA, Brasil
                    </div>
                    <p className="mt-3 text-gray-400">
                      Atendemos clientes em todo o Brasil de forma remota.
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Redes sociais */}
              <div className="mt-12">
                <h4 className="text-lg font-semibold mb-6 text-center text-gray-300">Conecte-se conosco</h4>
                <div className="flex justify-center gap-4">
                  <motion.a 
                    whileHover={{ y: -5 }}
                    href="#" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-14 h-14 flex items-center justify-center bg-gray-700 hover:bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl transition-all shadow-lg hover:shadow-pink-500/20"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="text-xl" />
                  </motion.a>
                  <motion.a 
                    whileHover={{ y: -5 }}
                    href="#" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-14 h-14 flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-xl transition-all shadow-lg hover:shadow-gray-500/20"
                    aria-label="GitHub"
                  >
                    <FaGithub className="text-xl" />
                  </motion.a>
                  <motion.a 
                    whileHover={{ y: -5 }}
                    href="#" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-14 h-14 flex items-center justify-center bg-gray-700 hover:bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl transition-all shadow-lg hover:shadow-blue-500/20"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="text-xl" />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;