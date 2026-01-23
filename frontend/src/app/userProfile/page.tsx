'use client';

import { FiEdit, FiAward, FiBriefcase, FiCode, FiMail } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Image from 'next/image';
import SquareReveal from '../components/SquareReveal';

const UserProfile = () => {
  // Dados do usuário - podem vir de props ou API
  const user = {
    name: "Carlos Silva",
    role: "Desenvolvedor Full Stack",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Especialista em React, Node.js e soluções escaláveis. Apaixonado por criar experiências digitais excepcionais.",
    email: "carlos.silva@gedsinovacao.com",
    skills: ["React", "TypeScript", "Node.js", "UI/UX", "AWS"],
    stats: {
      projects: 24,
      experience: 5, // anos
      clients: 18
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <SquareReveal gridSize={14}>
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/10">
          {/* Cabeçalho do perfil */}
          <div className="relative h-40 bg-gradient-to-r from-cyan-900 to-blue-900">
            <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-30"></div>
            <div className="absolute -bottom-16 left-6">
              <Image
                src={user.avatar}
                alt={user.name}
                width={128}
                height={128}
                className="w-32 h-32 rounded-full border-4 border-black object-cover shadow-2xl"
                priority
              />
              <button className="absolute bottom-2 right-2 bg-black/80 p-2 rounded-full text-white hover:bg-cyan-500 hover:text-black transition-all border border-white/20">
                <FiEdit />
              </button>
            </div>
          </div>
        </div>

        {/* Corpo do perfil */}
        <div className="pt-20 px-6 pb-8 bg-black/40">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            {/* Informações principais */}
            <div className="md:w-2/3">
              <h1 className="text-4xl font-bold text-white">{user.name}</h1>
              <p className="text-cyan-400 flex items-center gap-2 mt-1 font-medium">
                <FiBriefcase />
                {user.role}
              </p>

              <p className="text-gray-300 mt-4 leading-relaxed">{user.bio}</p>

              {/* Habilidades */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 border-b border-white/10 pb-2">
                  <FiCode className="text-cyan-400" /> Habilidades
                </h3>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-white/5 rounded-full text-sm text-cyan-200 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Estatísticas e contato */}
            <div className="md:w-1/3 space-y-6">
              {/* Estatísticas */}
              <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-white/20 transition">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <FiAward className="text-yellow-400" /> Estatísticas
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-400 text-sm">Projetos</p>
                    <p className="text-white font-bold text-xl">{user.stats.projects}+</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-400 text-sm">Experiência</p>
                    <p className="text-white font-bold text-xl">{user.stats.experience} anos</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-400 text-sm">Clientes</p>
                    <p className="text-white font-bold text-xl">{user.stats.clients}+</p>
                  </div>
                </div>
              </div>

              {/* Contato */}
              <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-white/20 transition">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <FiMail className="text-cyan-400" /> Contato
                </h3>
                <div className="space-y-4">
                  <a
                    href={`mailto:${user.email}`}
                    className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition group p-2 rounded-lg hover:bg-white/5"
                  >
                    <FiMail className="group-hover:text-cyan-400" /> <span className="truncate">{user.email}</span>
                  </a>
                  <div className="flex justify-around pt-2 border-t border-white/10">
                    <a href="#" className="p-2 text-gray-400 hover:text-blue-500 transition hover:bg-white/5 rounded-lg">
                      <FaLinkedin className="text-2xl" />
                    </a>
                    <a href="#" className="p-2 text-gray-400 hover:text-white transition hover:bg-white/5 rounded-lg">
                      <FaGithub className="text-2xl" />
                    </a>
                    <a href="#" className="p-2 text-gray-400 hover:text-cyan-400 transition hover:bg-white/5 rounded-lg">
                      <FaTwitter className="text-2xl" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SquareReveal>
    </div>
  );
};

export default UserProfile;