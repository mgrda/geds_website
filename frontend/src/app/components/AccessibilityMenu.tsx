"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Accessibility, 
  X, 
  Type, 
  Contrast, 
  Eye, 
  Megaphone, 
  Brain, 
  Sparkles,
  Search,
  Zap,
  RotateCcw,
  Navigation2,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

interface AccessibilityItem {
  icon: React.ReactNode;
  label: string;
  action: () => void;
  active?: boolean;
  danger?: boolean;
}

interface AccessibilityCategory {
  title: string;
  items: AccessibilityItem[];
}

const AccessibilityMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [grayscale, setGrayscale] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [colorBlindMode, setColorBlindMode] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState(100);
  const [isSirenActive, setIsSirenActive] = useState(false);
  const [isMenuFogo, setIsMenuFogo] = useState(false);
  
  // New States
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isReadingGuide, setIsReadingGuide] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isZoomActive, setIsZoomActive] = useState(false);

  // Apply filters and styles to root
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    root.style.fontSize = `${fontSize}%`;

    if (dyslexiaFont) {
       body.classList.add('dyslexia-mode');
    } else {
       body.classList.remove('dyslexia-mode');
    }

    let filter = "none";
    if (grayscale) filter = "grayscale(100%)";
    else if (highContrast) filter = "contrast(180%) brightness(110%) saturate(50%)";
    else if (colorBlindMode === 'deuteranopia') filter = "url('#deuteranopia')";
    else if (colorBlindMode === 'protanopia') filter = "url('#protanopia')";
    
    body.style.filter = filter;

    if (isMenuFogo) {
      body.classList.add('menu-fogo-active');
    } else {
      body.classList.remove('menu-fogo-active');
    }

    if (isZoomActive) {
      body.style.cursor = 'zoom-in';
    } else {
      body.style.cursor = '';
    }

  }, [grayscale, highContrast, fontSize, dyslexiaFont, colorBlindMode, isMenuFogo, isZoomActive]);

  // Mouse move for tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // IA Narrativa (Text to Speech)
  const toggleNarrative = useCallback(() => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const mainContent = document.querySelector('main') || document.body;
    const textToRead = mainContent.innerText.slice(0, 5000); // Limit to avoid browser hang
    
    if (textToRead) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'pt-BR';
      utterance.rate = 1.1;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  }, [isSpeaking]);

  // Alarme Sonoro
  useEffect(() => {
    if (isSirenActive) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      gain.gain.value = 0.05;
      osc.connect(gain);
      gain.connect(ctx.destination);
      const interval = setInterval(() => {
        const time = ctx.currentTime;
        osc.frequency.exponentialRampToValueAtTime(800, time + 0.4);
        osc.frequency.exponentialRampToValueAtTime(600, time + 0.8);
      }, 800);
      osc.start();
      return () => {
        clearInterval(interval);
        osc.stop();
        ctx.close();
      };
    }
  }, [isSirenActive]);

  const toggleSiren = () => {
    if (isSirenActive) {
      setIsSirenActive(false);
      setIsMenuFogo(false);
    } else {
      setIsSirenActive(true);
      setIsMenuFogo(true);
      alert("🚨 ALARME GEDS ATIVADO: O sistema visual e sonoro de emergência está em execução.");
    }
  };

  const resetAll = () => {
    setGrayscale(false);
    setHighContrast(false);
    setDyslexiaFont(false);
    setColorBlindMode(null);
    setFontSize(100);
    setIsSirenActive(false);
    setIsMenuFogo(false);
    setIsSpeaking(false);
    setIsReadingGuide(false);
    setIsZoomActive(false);
    window.speechSynthesis.cancel();
  };

  const categories: AccessibilityCategory[] = [
    {
      title: "Visão & Tipografia",
      items: [
        { icon: <Type className="w-5 h-5" />, label: "Aumentar Texto", action: () => setFontSize(prev => Math.min(prev + 10, 150)) },
        { icon: <Type className="w-4 h-4" />, label: "Reduzir Texto", action: () => setFontSize(prev => Math.max(prev - 10, 80)) },
        { icon: <Brain className="w-5 h-5" />, label: "Modo Disléxico", active: dyslexiaFont, action: () => setDyslexiaFont(!dyslexiaFont) },
        { icon: <Contrast className="w-5 h-5" />, label: "Alto Contraste", active: highContrast, action: () => { setHighContrast(!highContrast); setGrayscale(false); setColorBlindMode(null); } },
      ]
    },
    {
      title: "Filtros & Navegação",
      items: [
        { icon: <Eye className="w-5 h-5" />, label: "Escala Cinza", active: grayscale, action: () => { setGrayscale(!grayscale); setHighContrast(false); } },
        { icon: <Navigation2 className="w-5 h-5" />, label: "Guia Leitura", active: isReadingGuide, action: () => setIsReadingGuide(!isReadingGuide) },
        { icon: <Zap className="w-5 h-5" />, label: "Deuteranopia", active: colorBlindMode === 'deuteranopia', action: () => setColorBlindMode(colorBlindMode === 'deuteranopia' ? null : 'deuteranopia') },
        { icon: <RotateCcw className="w-4 h-4" />, label: "Resetar Tudo", action: resetAll },
      ]
    },
    {
      title: "IA & Funções Premium",
      items: [
        { 
          icon: <Sparkles className={`w-5 h-5 ${isSpeaking ? "animate-spin text-cyan-400" : "text-cyan-400"}`} />, 
          label: isSpeaking ? "Parar IA" : "IA Narrativa", 
          action: toggleNarrative,
          active: isSpeaking
        },
        { 
          icon: <Search className="w-5 h-5" />, 
          label: "Zoom Focus", 
          action: () => setIsZoomActive(!isZoomActive),
          active: isZoomActive
        },
        { 
          icon: <Megaphone className={`w-5 h-5 ${isMenuFogo ? "animate-bounce text-white" : "text-orange-500"}`} />, 
          label: "MENU FOGO", 
          action: toggleSiren,
          danger: true,
          active: isMenuFogo
        },
      ]
    }
  ];

  return (
    <>
      <svg style={{ position: 'absolute', height: 0, width: 0 }}>
        <filter id="deuteranopia">
          <feColorMatrix type="matrix" values="0.625, 0.375, 0, 0, 0, 0.7, 0.3, 0, 0, 0, 0, 0.3, 0.7, 0, 0, 0, 0, 0, 1, 0" />
        </filter>
        <filter id="protanopia">
          <feColorMatrix type="matrix" values="0.567, 0.433, 0, 0, 0, 0.558, 0.442, 0, 0, 0, 0, 0.242, 0.758, 0, 0, 0, 0, 0, 1, 0" />
        </filter>
      </svg>

      <style dangerouslySetInnerHTML={{ __html: `
        .dyslexia-mode * {
          font-family: 'OpenDyslexic', 'Comic Sans MS', cursive, sans-serif !important;
          line-height: 1.8 !important;
          letter-spacing: 0.1em !important;
          word-spacing: 0.2em !important;
        }
        .menu-fogo-active {
          animation: geds-sos-pulse 1.5s infinite alternate;
        }
        @keyframes geds-sos-pulse {
          from { border: 4px solid #ff4500; box-shadow: inset 0 0 40px rgba(255, 69, 0, 0.3); }
          to { border: 4px solid #ff0000; box-shadow: inset 0 0 80px rgba(255, 0, 0, 0.6); }
        }
        .reading-guide {
          position: fixed;
          left: 0;
          width: 100%;
          height: 1.5rem;
          background: rgba(0, 219, 255, 0.2);
          border-top: 2px solid rgba(0, 219, 255, 0.5);
          border-bottom: 2px solid rgba(0, 219, 255, 0.5);
          pointer-events: none;
          z-index: 9999;
          transform: translateY(-50%);
        }
        .zoom-overlay {
          position: fixed;
          pointer-events: none;
          z-index: 9998;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          border: 4px solid white;
          box-shadow: 0 0 50px rgba(0,0,0,0.5);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px) scale(1.5);
        }
      `}} />

      {/* Reading Guide */}
      {isReadingGuide && (
        <div 
          className="reading-guide" 
          style={{ top: mousePos.y }}
        />
      )}

      {/* Zoom Focus (Magnifier) */}
      {isZoomActive && (
        <div 
          className="zoom-overlay" 
          style={{ 
            left: mousePos.x - 100, 
            top: mousePos.y - 100 
          }}
        >
          <div className="w-1 h-1 bg-cyan-400 rounded-full" />
        </div>
      )}

      {/* Floating Launcher */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed left-8 bottom-8 z-50 w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-2xl transition-all duration-500 backdrop-blur-xl border ${
          isMenuFogo 
            ? "bg-red-600 border-red-400 text-white animate-pulse" 
            : "bg-cyan-500 hover:bg-cyan-400 border-cyan-500/50 text-black shadow-[0_10px_40px_rgba(6,182,212,0.3)] hover:shadow-[0_15px_50px_rgba(6,182,212,0.5)]"
        }`}
      >
        <Accessibility size={32} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-start p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ x: -100, opacity: 0, scale: 0.95 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: -100, opacity: 0, scale: 0.95 }}
              className={`w-full max-w-sm rounded-[3.5rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] relative z-10 overflow-hidden flex flex-col max-h-[90vh] border transition-colors duration-700 ${
                isMenuFogo ? "bg-red-950/90 border-red-500" : "bg-[#0a0a0a] border-white/10"
              }`}
            >
              {/* Premium Header */}
              <div className={`p-8 relative overflow-hidden flex items-center gap-6 transition-colors ${
                  isMenuFogo ? "bg-linear-to-br from-red-600 to-orange-700" : "bg-cyan-500"
              }`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl -mr-10 -mt-10 rounded-full" />
                
                <div className={`relative z-10 w-16 h-16 rounded-full overflow-hidden border-2 shadow-xl shrink-0 ${isMenuFogo ? "border-white/20" : "border-black/20"}`}>
                  <Image 
                    src="/GEDS Accessibility.png" 
                    alt="GEDS Accessibility" 
                    fill 
                    className="object-cover"
                  />
                </div>

                <div className="relative z-10 flex-1">
                   <h2 className={`text-lg font-black uppercase italic tracking-tighter leading-none mb-2 ${isMenuFogo ? "text-white" : "text-black"}`}>
                     GEDS Accessibility
                   </h2>
                   <div className="flex items-center gap-2">
                     <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isMenuFogo ? "bg-red-200" : "bg-black"}`} />
                     <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${isMenuFogo ? "text-white/70" : "text-black/70"}`}>
                       {isMenuFogo ? "SISTEMA SOS ATIVO" : "Engenharia de Inclusão"}
                     </p>
                   </div>
                </div>
                
                <button 
                  onClick={() => setIsOpen(false)}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all relative z-10 ${isMenuFogo ? "bg-black/20 hover:bg-black/40 text-white" : "bg-black/10 hover:bg-black/20 text-black"}`}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Grid Content */}
              <div className="p-10 space-y-12 overflow-y-auto custom-scrollbar">
                {categories.map((cat, idx) => (
                  <div key={idx} className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className={`h-px flex-1 ${isMenuFogo ? "bg-red-500/20" : "bg-white/5"}`} />
                      <h3 className={`text-[10px] uppercase font-black tracking-[0.4em] transition-colors ${
                        isMenuFogo ? "text-red-400" : "text-cyan-400"
                      }`}>
                        {cat.title}
                      </h3>
                      <div className={`h-px flex-1 ${isMenuFogo ? "bg-red-500/20" : "bg-white/5"}`} />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {cat.items.map((item, itemIdx) => (
                        <motion.button
                          key={itemIdx}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={item.action}
                          className={`flex flex-col items-center justify-center p-6 rounded-[2rem] border transition-all gap-4 text-center group relative overflow-hidden ${
                            item.active
                              ? isMenuFogo 
                                ? "bg-red-500 border-red-400 text-white shadow-[0_10px_30px_rgba(239,68,68,0.3)]" 
                                : "bg-cyan-500 border-cyan-400 text-black shadow-[0_10px_30px_rgba(6,182,212,0.3)]"
                              : isMenuFogo 
                                ? "bg-red-900/20 border-red-500/20 hover:border-red-500/50 text-red-200" 
                                : "bg-white/[0.03] border-white/5 hover:border-white/20 hover:bg-white/[0.06] text-gray-400 hover:text-white"
                          }`}
                        >
                          <div className={`transition-all duration-500 group-hover:scale-110 ${item.danger ? "text-red-500 animate-pulse" : ""}`}>
                            {item.icon}
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest leading-none">
                            {item.label}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Premium Footer */}
              <div className={`p-8 bg-black/40 border-t border-white/5 flex flex-col items-center gap-4`}>
                 <div className="flex gap-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`w-1 h-1 rounded-full ${isMenuFogo ? "bg-red-500/30" : "bg-white/10"}`} />
                    ))}
                 </div>
                 <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.5em]">
                   GEDS Universal Interface
                 </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AccessibilityMenu;
