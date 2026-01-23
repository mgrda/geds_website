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
            className="absolute bottom-20 right-0 bg-black/80 backdrop-blur-md text-cyan text-xs font-bold px-4 py-2 rounded-full shadow-[0_0_15px_rgba(0,219,255,0.3)] border border-cyan/40 mb-2 whitespace-nowrap"
          >
            Dúvidas? Fale comigo! <span className="animate-bounce inline-block">👇</span>
          </motion.div>
        )}
      </AnimatePresence>

      {!open ? (
        <motion.button
          whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(0,219,255,0.6)" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpen(true)}
          className="bg-black text-cyan p-4 rounded-full shadow-[0_0_15px_rgba(0,219,255,0.3)] border-2 border-cyan/50 transition-all duration-300"
        >
          <MessageCircle className="w-8 h-8" />
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.5, transformOrigin: "bottom right" }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="w-80 sm:w-96 h-[500px] bg-black/90 backdrop-blur-xl rounded-2xl shadow-[0_0_40px_rgba(0,219,255,0.2)] border border-cyan/30 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="bg-cyan/10 border-b border-cyan/20 p-4 flex justify-between items-center bg-gradient-to-r from-cyan/20 to-transparent">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full border-2 border-cyan shadow-[0_0_10px_rgba(0,219,255,0.5)] overflow-hidden relative">
                  <NextImage
                    src="/gold.jpg"
                    alt="Gold"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black animate-pulse"></div>
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Gold</h3>
                <p className="text-cyan/70 text-[10px] uppercase tracking-widest">Assistente de IA</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/50 hover:text-cyan transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
            {messages.map((msg, i) => (
              <motion.div
                initial={{ opacity: 0, x: msg.from === "gold" ? -10 : 10 }}
                animate={{ opacity: 1, x: 0 }}
                key={i}
                className={`flex ${msg.from === "gold" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${msg.from === "gold"
                    ? "bg-white/5 text-white border border-white/10 rounded-tl-none"
                    : "bg-cyan/20 text-cyan border border-cyan/30 rounded-tr-none shadow-[0_0_10px_rgba(0,219,255,0.1)]"
                    }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-black/50 border-t border-cyan/20">
            <div className="flex items-center bg-white/5 rounded-full border border-white/10 px-4 py-2 focus-within:border-cyan/50 focus-within:shadow-[0_0_10px_rgba(0,219,255,0.2)] transition-all">
              <input
                type="text"
                placeholder="Digite sua mensagem..."
                className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder:text-white/30"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                className="ml-2 text-cyan hover:text-white transition-colors p-1"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current rotate-90">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
