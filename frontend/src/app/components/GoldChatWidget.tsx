"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NextImage from "next/image";

export default function GoldChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "gold",
      text:
        "Olá! Eu sou o Gold, seu assistente virtual.\nComo posso te ajudar hoje?\n1 - Atendimento\n2 - Pagamento",
    },
  ]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);
  const [fluxo, setFluxo] = useState<"atendimento" | "pagamento" | null>(null);
  const [motivoAtendimento, setMotivoAtendimento] = useState("");
  const [userData, setUserData] = useState({ semana: "", horario: "" });
  const [formaPagamento, setFormaPagamento] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    const userInput = input.trim().toLowerCase();
    let goldResponse = "";

    if (fluxo === null) {
      if (userInput === "1") {
        setFluxo("atendimento");
        setStep(1);
        goldResponse =
          "Certo! Sobre o que você precisa de atendimento?\n1 - Problemas com o site\n2 - Deseja melhorar a qualidade do site\n3 - Criar um novo site\n4 - Outros serviços";
      } else if (userInput === "2") {
        setFluxo("pagamento");
        setStep(1);
        goldResponse =
          "Qual a forma de pagamento?\n1 - Cartão de crédito ou débito\n2 - Via PIX\n3 - Boleto Bancário";
      } else {
        goldResponse =
          "Por favor, escolha uma opção válida:\n1 - Atendimento\n2 - Pagamento";
      }

      setTimeout(() => {
        setMessages((prev) => [...prev, { from: "gold", text: goldResponse }]);
      }, 500);

      setInput("");
      return;
    }

    if (fluxo === "atendimento") {
      const nextStep = step + 1;

      switch (step) {
        case 1:
          if (["1", "2", "3"].includes(userInput)) {
            const motivos = {
              "1": "Problemas com o site",
              "2": "Deseja melhorar a qualidade do site",
              "3": "Criar um novo site",
            };
            setMotivoAtendimento(motivos[userInput as "1" | "2" | "3"]);
            goldResponse =
              "Certo! Por favor, informe seu nome e de onde você é, separados por vírgula.\nEx: João, São Luís - MA";
            setStep(1.7);
          } else if (userInput === "4") {
            goldResponse =
              "Por favor, descreva com mais detalhes o serviço que você precisa:";
            setStep(1.5);
          } else {
            goldResponse = "Por favor, escolha uma opção válida de 1 a 4.";
          }
          break;

        case 1.5:
          setMotivoAtendimento(input);
          goldResponse =
            "Certo! Por favor, informe seu nome e de onde você é, separados por vírgula.\nEx: João, São Luís - MA";
          setStep(1.7);
          break;

        case 1.7:
          const [nome, local] = input.split(",").map((s) => s.trim());

          if (!nome || !local) {
            goldResponse =
              "Por favor, informe seu nome e de onde você é, separados por vírgula.\nEx: João, São Luís - MA";
            break;
          }

          goldResponse =
            "Obrigado pelas informações! Podemos agendar um horário para você.\nQual dia seria melhor: segunda, terça, quarta, quinta ou sexta?";
          setStep(2);
          break;

        case 2:
          setUserData((prev) => ({ ...prev, semana: input }));
          goldResponse =
            "Perfeito. E qual horário seria melhor pra você?\n1 - Seg a sex = 8h às 12h\n2 - Seg a sex = 14h às 18h";
          setStep(nextStep);
          break;

        case 3:
          const horarioEscolhido =
            userInput === "1"
              ? "8h às 12h"
              : userInput === "2"
                ? "14h às 18h"
                : input;

          const finalData = {
            ...userData,
            horario: horarioEscolhido,
          };

          setUserData(finalData);

          goldResponse = `Perfeito! Vou agendar para ${finalData.semana}, das ${finalData.horario}. A pessoa responsável irá te contactar em breve.`;

          setStep(nextStep);

          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              {
                from: "gold",
                text: `📄 *Resumo do atendimento:*\n- Motivo: ${motivoAtendimento}\n- Dia: ${finalData.semana}\n- Horário: ${finalData.horario}`,
              },
            ]);

            setTimeout(() => {
              setMessages((prev) => [
                ...prev,
                { from: "gold", text: "Volte sempre 😊" },
              ]);

              setTimeout(resetChat, 2000);
            }, 2000);
          }, 1000);
          break;

        default:
          goldResponse =
            "Se precisar de mais alguma coisa, estou por aqui!";
      }
    } else if (fluxo === "pagamento") {
      const formas = {
        "1": "Cartão de crédito ou débito",
        "2": "PIX",
        "3": "Boleto Bancário",
      };

      if (step === 1 && formas[userInput as "1" | "2" | "3"]) {
        const forma = formas[userInput as "1" | "2" | "3"];
        setFormaPagamento(forma);

        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { from: "gold", text: `Certo! Você escolheu: ${forma}.` },
          ]);

          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              {
                from: "gold",
                text:
                  "Antes de prosseguir, por favor informe seu nome, cidade e estado separados por vírgula.\nEx: Ana, São Paulo, SP",
              },
            ]);
            setStep(2);
          }, 500);
        }, 500);

        setInput("");
        return;
      }

      if (step === 2) {
        const [nome, cidade, estado] = input.split(",").map((s) => s.trim());

        if (!nome || !cidade || !estado) {
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              {
                from: "gold",
                text:
                  "Por favor, informe corretamente os três dados: nome, cidade e estado separados por vírgula.\nEx: Ana, São Paulo, SP",
              },
            ]);
          }, 500);
          setInput("");
          return;
        }

        const resumo = `📄 *Resumo do pagamento:*\n- Forma: ${formaPagamento}\n- Nome: ${nome}\n- Cidade: ${cidade}\n- Estado: ${estado}`;
        setTimeout(() => {
          setMessages((prev) => [...prev, { from: "gold", text: resumo }]);


          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              {
                from: "gold",
                text:
                  "Nosso setor financeiro entrará em contato com você em breve.",
              },
            ]);

            setTimeout(() => {
              setMessages((prev) => [
                ...prev,
                { from: "gold", text: "Volte sempre 😊" },
              ]);

              setTimeout(resetChat, 2000);
            }, 2000);
          }, 1000);
        }, 500);
        setInput("");
        return;
      }

      goldResponse =
        "Por favor, escolha uma forma de pagamento válida (1, 2 ou 3).";
    }

    if (goldResponse) {
      setTimeout(() => {
        setMessages((prev) => [...prev, { from: "gold", text: goldResponse }]);
      }, 500);
    }

    setInput("");
  };

  const resetChat = () => {
    setFluxo(null);
    setStep(0);
    setMotivoAtendimento("");
    setUserData({ semana: "", horario: "" });
    setFormaPagamento("");
    setMessages([
      {
        from: "gold",
        text:
          "Olá! Eu sou o Gold, seu assistente virtual.\nComo posso te ajudar hoje?\n1 - Atendimento\n2 - Pagamento",
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-20 right-0 bg-background/60 dark:bg-black/40 backdrop-blur-xl text-cyan-600 dark:text-cyan-400 text-[10px] sm:text-xs font-black px-5 py-2.5 rounded-2xl shadow-lg dark:shadow-[0_0_20px_rgba(0,219,255,0.15)] border border-cyan-500/20 mb-2 whitespace-nowrap uppercase tracking-widest"
          >
            Dúvidas? Fale comigo! <span className="animate-bounce inline-block ml-1">👇</span>
          </motion.div>
        )}
      </AnimatePresence>

      {!open ? (
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,219,255,0.4)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen(true)}
          className="bg-background/80 dark:bg-black/80 backdrop-blur-md text-cyan-600 dark:text-cyan-400 p-5 rounded-3xl shadow-xl border border-cyan-500/30 transition-all duration-500 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <MessageCircle className="w-8 h-8 relative z-10" />
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9, transformOrigin: "bottom right" }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="w-[320px] sm:w-[400px] h-[550px] bg-background/95 dark:bg-[#050505]/95 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-foreground/10 dark:border-white/10 flex flex-col overflow-hidden relative"
        >
          {/* Header */}
          <div className="p-6 flex justify-between items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent -z-10" />
            
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <div className="w-12 h-12 rounded-2xl border border-cyan-500/30 shadow-[0_0_15px_rgba(0,219,255,0.2)] overflow-hidden relative transition-transform duration-500 group-hover:scale-105">
                  <NextImage
                    src="/gold.jpg"
                    alt="Assistente Virtual"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-[3px] border-background dark:border-[#0a0a0a] shadow-lg">
                   <div className="w-full h-full bg-emerald-400 rounded-full animate-ping opacity-75" />
                </div>
              </div>
              <div>
                <h3 className="text-foreground dark:text-white font-black text-lg tracking-tight leading-none mb-1">Assistente virtual</h3>
                <p className="text-cyan-600 dark:text-cyan-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 mt-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 dark:bg-cyan-400" />
                  Online • Pronto para ajudar
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setOpen(false)}
              className="w-10 h-10 rounded-xl bg-foreground/5 dark:bg-white/5 hover:bg-foreground/10 dark:hover:bg-white/10 flex items-center justify-center text-foreground/40 dark:text-white/40 hover:text-foreground dark:hover:text-white transition-all duration-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 px-6 py-4 overflow-y-auto space-y-5 custom-scrollbar bg-gradient-to-b from-white/[0.02] to-transparent">
            {messages.map((msg, i) => (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                key={i}
                className={`flex ${msg.from === "gold" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-lg ${msg.from === "gold"
                    ? "bg-foreground/5 dark:bg-white/5 text-foreground/80 dark:text-gray-200 border border-foreground/10 dark:border-white/10 rounded-tl-none"
                    : "bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-900 dark:text-cyan-50 border border-cyan-500/30 rounded-tr-none shadow-sm dark:shadow-[0_0_20px_rgba(0,219,255,0.1)]"
                    }`}
                >
                  <p className="whitespace-pre-line font-medium">{msg.text}</p>
                  <div className={`text-[9px] mt-1 opacity-40 font-bold uppercase tracking-tighter ${msg.from === "gold" ? "text-right" : "text-left"}`}>
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 bg-background/50 dark:bg-[#0a0a0a]/50 border-t border-foreground/5 dark:border-white/5 backdrop-blur-md">
            <div className="flex items-center bg-foreground/5 dark:bg-white/5 rounded-2xl border border-foreground/10 dark:border-white/10 p-1.5 focus-within:border-cyan-500/40 focus-within:bg-foreground/10 dark:focus-within:bg-white/10 transition-all duration-300 shadow-inner">
              <input
                type="text"
                placeholder="Como posso ajudar?"
                className="flex-1 bg-transparent border-none outline-none text-foreground dark:text-white text-base font-bold px-4 placeholder:text-foreground/40 dark:placeholder:text-white/40"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                className="bg-cyan-500 hover:bg-cyan-400 text-black w-10 h-10 rounded-xl flex items-center justify-center transition-colors shadow-lg shadow-cyan-500/20"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
