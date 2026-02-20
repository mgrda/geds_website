'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowUp,
  FiChevronRight
} from "react-icons/fi";

const socialLinks = [
  { name: 'Facebook', icon: <FiFacebook />, href: '#', color: 'hover:bg-blue-600' },
  { name: 'Instagram', icon: <FiInstagram />, href: '#', color: 'hover:bg-pink-600' },
  { name: 'LinkedIn', icon: <FiLinkedin />, href: '#', color: 'hover:bg-blue-700' },
];

const quickLinks = [
  { label: 'Início', href: '/#hero' },
  { label: 'Sobre', href: '/#about' },
  { label: 'Serviços', href: '/#servicos' },
  { label: 'Portfólio', href: '/#portfolio' },
  { label: 'Planos', href: '/#plans' },
  { label: 'Processo', href: '/processo' },
];

const legalLinks = [
  { label: 'Privacidade', href: '/politica-de-privacidade' },
  { label: 'Termos', href: '/termos-de-uso' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050505] text-white pt-24 pb-12 overflow-hidden border-t border-white/5">
      {/* Premium Background Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-[0.03] -z-10"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">

          {/* Brand Identity Section */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center group cursor-pointer"
            >
              <div className="relative mr-4 p-1 rounded-full bg-white/5 border border-white/10 group-hover:border-cyan-500/50 transition-all duration-500">
                <Image
                  src="/GEDS Inovação.png"
                  alt="GEDS Inovação"
                  width={44}
                  height={44}
                  className="rounded-full"
                />
                <div className="absolute inset-0 bg-cyan-500/20 blur-md rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-white via-white to-cyan-400 bg-clip-text text-transparent">
                GEDS INOVAÇÃO
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 max-w-sm leading-relaxed text-lg"
            >
              Forjando o futuro digital através de engenharia disruptiva e design de precisão. Transformamos visões em realidades escaláveis.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex gap-4"
            >
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className={`group relative w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all duration-300 ${social.color}`}
                >
                  <span className="text-xl relative z-10 group-hover:scale-110 transition-transform">
                    {social.icon}
                  </span>
                  <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
                </Link>
              ))}
            </motion.div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest border-l-2 border-cyan-500 pl-4">
              Páginas
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link, idx) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + (idx * 0.05) }}
                >
                  <Link
                    href={link.href}
                    className="group text-gray-400 hover:text-cyan-400 transition-all flex items-center text-sm"
                  >
                    <FiChevronRight className="w-0 group-hover:w-4 opacity-0 group-hover:opacity-100 transition-all duration-300 text-cyan-500" />
                    <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Legal Section */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest border-l-2 border-cyan-500 pl-4">
              Legal
            </h3>
            <ul className="space-y-4">
              {legalLinks.map((link, idx) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (idx * 0.05) }}
                >
                  <Link
                    href={link.href}
                    className="group text-gray-400 hover:text-cyan-400 transition-all flex items-center text-sm"
                  >
                    <FiChevronRight className="w-0 group-hover:w-4 opacity-0 group-hover:opacity-100 transition-all duration-300 text-cyan-500" />
                    <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest border-l-2 border-cyan-500 pl-4">
              Contato
            </h3>
            <div className="space-y-6">
              {[
                { icon: <FiMail />, text: 'contato@gedsinovacao.com', label: 'E-mail' },
                { icon: <FiPhone />, text: '+55 (98) 99999-9999', label: 'Telefone' },
                { icon: <FiMapPin />, text: 'São Luís - MA, Brasil', label: 'Localização' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (idx * 0.1) }}
                  className="flex items-start group"
                >
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-all duration-500">
                    {item.icon}
                  </div>
                  <div className="ml-4">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-0.5">{item.label}</p>
                    <p className="text-gray-300 group-hover:text-white transition-colors text-sm">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider with Glow */}
        <div className="relative">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-48 bg-cyan-500 blur-sm"></div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start space-y-2"
          >
            <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em]">
              © 2026 <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">GEDS INOVAÇÃO</span>
            </p>
            <p className="text-[11px] font-medium text-gray-400/80 uppercase tracking-widest flex items-center gap-2">
              <span className="w-4 h-[1px] bg-cyan-500/50"></span>
              Soluções Tecnológicas de Alto Desempenho
            </p>
          </motion.div>

          {/* Back to Top */}
          <motion.button
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="group relative px-8 py-3 rounded-full bg-white/5 border border-white/10 overflow-hidden transition-all duration-500 hover:border-cyan-500/50"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <div className="relative flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]">
              <span>Voltar ao topo</span>
              <FiArrowUp className="w-4 h-4 text-cyan-500 group-hover:-translate-y-1 transition-transform" />
            </div>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
