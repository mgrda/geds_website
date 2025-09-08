import Link from "next/link";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Elementos de fundo decorativos */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-soft-light filter blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500 rounded-full mix-blend-soft-light filter blur-xl"></div>
      </div>
      
      <div className="max-w-4xl px-6 text-center relative z-10">
        <div className="mb-8">
          <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <span className="text-blue-300 font-medium">Inovação & Tecnologia</span>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
            Soluções Inteligentes
          </span>{" "}
          para o seu Negócio
        </h1>

        <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
          A <strong className="text-white">GEDS Inovação</strong> desenvolve produtos digitais modernos,
          escaláveis e sob medida. Transformamos suas ideias em plataformas de alta performance 
          que impulsionam resultados.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#servicos"
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-full text-lg font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-cyan-500/20"
          >
            Nossos Serviços
          </a>
          <Link
            href="/contatos"
            className="border-2 border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full text-lg font-medium hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:-translate-y-1"
          >
            Entre em Contato
          </Link>
        </div>
        
        <div className="mt-16 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;