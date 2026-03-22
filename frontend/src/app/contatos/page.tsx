"use client";

import { FaInstagram, FaGithub, FaLinkedin, FaPaperPlane, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaGlobe } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Brain, CheckCircle, ChevronRight, Zap, Code2, Cloud, BarChart3, Layout, Shield, Sparkles, Timer, Target } from 'lucide-react';

import { Button } from "@/components/ui/button";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Nome é obrigatório" }),
  email: z.string().email({ message: "Email inválido" }),
  problemType: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, { message: "Mensagem deve ter pelo menos 10 caracteres" }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const problemTypes = [
  {
    id: 'automacao',
    icon: <Zap className="w-5 h-5" />,
    label: 'Automação de Processos',
    suggestion: 'Identificamos que você precisa de soluções de automação. Recomendamos começar com um diagnóstico dos processos manuais da sua empresa.',
    services: ['Automação de Fluxos', 'Integração de Sistemas', 'IA Processual'],
    complexity: "Média",
    avgTime: "4-8 semanas"
  },
  {
    id: 'desenvolvimento',
    icon: <Code2 className="w-5 h-5" />,
    label: 'Desenvolvimento de Software',
    suggestion: 'Para desenvolvimento, podemos construir desde MVPs ágeis até sistemas enterprise completos. Vamos definir o escopo ideal para seu projeto.',
    services: ['Web Apps', 'APIs & Backend', 'Mobile'],
    complexity: "Alta",
    avgTime: "12-24 semanas"
  },
  {
    id: 'cloud',
    icon: <Cloud className="w-5 h-5" />,
    label: 'Cloud & Infraestrutura',
    suggestion: 'A migração para cloud pode reduzir seus custos em até 50%. Faremos uma análise completa da sua infraestrutura atual.',
    services: ['AWS/GCP Migration', 'DevOps', 'Monitoramento 24/7'],
    complexity: "Média",
    avgTime: "2-6 semanas"
  },
  {
    id: 'dados',
    icon: <BarChart3 className="w-5 h-5" />,
    label: 'Dados & Analytics',
    suggestion: 'Transformaremos seus dados dispersos em insights acionáveis com dashboards inteligentes e relatórios em tempo real.',
    services: ['Business Intelligence', 'Dashboards', 'Data Pipeline'],
    complexity: "Alta",
    avgTime: "8-16 semanas"
  },
  {
    id: 'design',
    icon: <Layout className="w-5 h-5" />,
    label: 'UX/UI Design',
    suggestion: 'Uma interface bem desenhada pode aumentar suas conversões em até 60%. Trabalharemos no design centrado no seu usuário final.',
    services: ['UX Research', 'UI Design', 'Prototipagem'],
    complexity: "Baixa",
    avgTime: "3-8 semanas"
  },
  {
    id: 'seguranca',
    icon: <Shield className="w-5 h-5" />,
    label: 'Segurança & Compliance',
    suggestion: 'Protegeremos seus dados e garantiremos conformidade com LGPD e padrões enterprise de segurança.',
    services: ['Auditoria de Segurança', 'LGPD', 'Criptografia'],
    complexity: "Crítica",
    avgTime: "4-12 semanas"
  },
];

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2 flex-1">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-black transition-all duration-500 shrink-0 ${
            i < current ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]' :
            i === current ? 'bg-white/5 text-cyan-400 border border-cyan-500/30' :
            'bg-white/[0.02] text-gray-700 border border-white/5'
          }`}>
            {i < current ? <CheckCircle className="w-5 h-5" /> : i + 1}
          </div>
          {i < total - 1 && (
            <div className={`h-px flex-1 transition-all duration-700 ${i < current ? 'bg-cyan-500' : 'bg-white/10'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState<typeof problemTypes[0] | null>(null);
  const [step, setStep] = useState(0); 
  const [iaAnalysis, setIaAnalysis] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", problemType: "", subject: "", message: "" },
  });

  useEffect(() => {
    if (selectedProblem) {
      setIaAnalysis(true);
      const timer = setTimeout(() => setIaAnalysis(false), 800);
      return () => clearTimeout(timer);
    }
  }, [selectedProblem]);

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const client = supabase;
      if (!client) { alert("Serviço indisponível."); setIsSubmitting(false); return; }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (client.from('contatos') as any).insert([{
        nome: data.name,
        email: data.email,
        assunto: selectedProblem ? `[${selectedProblem.label}] ${data.subject || ''}` : (data.subject || 'Sem assunto'),
        mensagem: data.message,
        status: 'nao_lido'
      }]);

      if (error) throw error;
      setSubmitted(true);
      form.reset();
    } catch (err) {
      console.error(err);
      alert('Erro ao enviar. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md bg-foreground/[0.02] p-12 rounded-[3.5rem] border border-foreground/10 shadow-2xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-24 h-24 bg-cyan-500/10 border border-cyan-500/30 rounded-[2rem] flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle className="w-12 h-12 text-cyan-400" />
          </motion.div>
          <h2 className="text-4xl font-extrabold text-cyan-500 mb-4 uppercase tracking-tight">Missão Recebida.</h2>
          <p className="text-foreground/70 mb-8 font-medium text-sm leading-relaxed">Sua mensagem foi criptografada e enviada para nossos especialistas em inovação. Aguarde nosso sinal em até 24h.</p>
          <button
            onClick={() => { setSubmitted(false); setStep(0); setSelectedProblem(null); }}
            className="w-full bg-cyan-500 text-black font-bold px-8 py-4 rounded-full hover:scale-105 transition-all uppercase text-xs tracking-wider shadow-xl"
          >
            Nova Conexão
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-background overflow-hidden relative text-foreground">
      
      {/* Premium Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,219,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,219,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-purple-600/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-500/5 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">

        {/* Header - Updated with cyan color scheme */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20 md:mb-32"
        >
          <span className="inline-block mb-6 text-cyan-500 font-bold bg-cyan-500/10 px-6 py-2 rounded-full text-[10px] uppercase tracking-widest border border-cyan-500/20">
            Conexão Humana & IA
          </span>
          <h1 className="text-5xl md:text-8xl font-extrabold text-cyan-500 mb-6 leading-none tracking-tight">
            O Futuro <br /> Começa <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">Hoje.</span>
          </h1>
          <p className="text-sm md:text-xl text-foreground/70 max-w-2xl mx-auto font-medium leading-relaxed">
            Nossa IA analisa sua necessidade instantaneamente para fornecer a melhor engenharia de solução.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: Contact Info - Updated with cyan accents */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div className="space-y-8">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-cyan-500">Diretórios de Contato</h3>
              
              <div className="grid gap-4">
                <a href="mailto:contato.gedsinovacao@gmail.com" className="group flex items-center gap-6 p-6 rounded-[2rem] bg-foreground/[0.02] border border-foreground/5 hover:border-cyan-500/30 hover:bg-foreground/[0.04] transition-all">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:scale-110 transition-transform">
                    <FaEnvelope className="text-cyan-400 text-2xl" />
                  </div>
                  <div>
                    <p className="text-[9px] text-foreground/40 font-bold uppercase tracking-widest mb-1">Email Principal</p>
                    <p className="text-base font-bold tracking-tight group-hover:text-cyan-500 transition-colors break-all">contato.gedsinovacao@gmail.com</p>
                  </div>
                </a>

                <a href="https://wa.me/55989999999" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-6 p-6 rounded-[2rem] bg-foreground/[0.02] border border-foreground/5 hover:border-emerald-500/30 hover:bg-foreground/[0.04] transition-all">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform">
                    <FaWhatsapp className="text-emerald-400 text-2xl" />
                  </div>
                  <div>
                    <p className="text-[9px] text-foreground/40 font-bold uppercase tracking-widest mb-1">WhatsApp Tech</p>
                    <p className="text-lg font-bold tracking-tight group-hover:text-emerald-400 transition-colors">(98) 9999-9999</p>
                  </div>
                </a>

                <div className="flex items-center gap-6 p-6 rounded-[2rem] bg-foreground/[0.02] border border-foreground/5">
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                    <FaMapMarkerAlt className="text-purple-400 text-2xl" />
                  </div>
                  <div>
                    <p className="text-[9px] text-foreground/40 font-bold uppercase tracking-widest mb-1">Base de Operações</p>
                    <p className="text-lg font-bold tracking-tight">São Luís – MA, Brasil</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Matrix - Updated colors */}
            <div className="space-y-6">
              <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest text-center md:text-left">Rede Global GEDS</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                {[
                  { icon: FaInstagram, color: "hover:text-pink-500", label: "Instagram", href: "#" },
                  { icon: FaGithub, color: "hover:text-foreground", label: "Github", href: "#" },
                  { icon: FaLinkedin, color: "hover:text-blue-400", label: "LinkedIn", href: "#" },
                  { icon: FaGlobe, color: "hover:text-cyan-400", label: "Website", href: "#" },
                ].map((social, i) => (
                  <a key={i} href={social.href} aria-label={social.label}
                    className={`w-14 h-14 rounded-2xl bg-foreground/[0.03] border border-foreground/10 flex items-center justify-center text-foreground/40 ${social.color} hover:bg-foreground/[0.08] hover:scale-110 transition-all`}>
                    <social.icon className="text-2xl" />
                  </a>
                ))}
              </div>
            </div>

            {/* AI Assistant Card - Updated with cyan scheme */}
            <div className="relative p-8 rounded-[2.5rem] bg-foreground/[0.02] border border-foreground/5 overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">IA Preditiva</h4>
                  <p className="text-[10px] text-cyan-500 font-bold tracking-tight">Análise de Escopo em Tempo Real</p>
                </div>
              </div>
              <p className="text-xs text-foreground/40 font-medium leading-relaxed">
                Nosso formulário utiliza aprendizado de máquina para categorizar seu projeto e alocá-lo na fila de prioridade correta para sua vertical de negócio.
              </p>
            </div>
          </motion.div>

          {/* Right: Smart Form - Updated with cyan accents */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-linear-to-br from-cyan-600/20 via-blue-600/20 to-transparent blur-[60px] opacity-20 pointer-events-none" />
            <div className="relative bg-foreground/[0.02] border border-foreground/10 rounded-[3.5rem] p-8 md:p-12 shadow-2xl overflow-hidden min-h-[600px]">
              
              <StepIndicator current={step} total={2} />

              <AnimatePresence mode="wait">
                {/* Step 0: Choose problem */}
                {step === 0 && (
                  <motion.div
                    key="step0"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    className="space-y-8"
                  >
                    <div className="space-y-3">
                      <h3 className="text-3xl font-extrabold text-cyan-500 tracking-tight">Seu Desafio.</h3>
                      <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest">Selecione uma categoria base</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {problemTypes.map((type) => (
                        <motion.button
                          key={type.id}
                          onClick={() => {
                            setSelectedProblem(type);
                            form.setValue('problemType', type.id);
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`flex items-center gap-4 p-5 rounded-[2rem] border text-left transition-all relative overflow-hidden ${
                            selectedProblem?.id === type.id
                              ? 'bg-cyan-500/10 border-cyan-500 text-foreground'
                              : 'bg-foreground/[0.02] border-foreground/5 text-foreground/40 hover:border-foreground/20 hover:text-foreground'
                          }`}
                        >
                          <div className={`shrink-0 ${selectedProblem?.id === type.id ? 'text-cyan-400' : 'text-gray-600'}`}>
                            {type.icon}
                          </div>
                          <span className="text-[11px] font-bold uppercase tracking-wide">{type.label}</span>
                          {selectedProblem?.id === type.id && (
                            <div className="absolute top-0 right-0 w-4 h-4 bg-cyan-500 rounded-bl-xl flex items-center justify-center">
                              <CheckCircle className="w-2.5 h-2.5 text-black" />
                            </div>
                          )}
                        </motion.button>
                      ))}
                    </div>

                    {/* AI Project Estimation Sidepanel - Updated colors */}
                    <AnimatePresence>
                      {selectedProblem && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="p-6 rounded-[2.5rem] bg-linear-to-br from-cyan-950/20 to-black border border-cyan-500/20 relative group"
                        >
                          <div className={`${iaAnalysis ? 'opacity-100' : 'opacity-0'} absolute inset-0 bg-cyan-500/5 transition-opacity duration-500 flex items-center justify-center`}>
                             <Sparkles className="animate-spin text-cyan-400" />
                          </div>

                          <div className="flex items-center gap-3 mb-4">
                            <Sparkles className="w-5 h-5 text-cyan-400" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-500">Análise Preditiva Completa</span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-6 mb-6">
                            <div className="space-y-1">
                               <div className="flex items-center gap-2 text-foreground/40">
                                 <Timer className="w-3 h-3" />
                                 <span className="text-[9px] font-bold uppercase tracking-widest text-foreground/40">Tempo Estimado</span>
                               </div>
                               <p className="text-lg font-bold tracking-tight text-foreground">{selectedProblem.avgTime}</p>
                            </div>
                            <div className="space-y-1">
                               <div className="flex items-center gap-2 text-foreground/40">
                                 <Target className="w-3 h-3" />
                                 <span className="text-[9px] font-bold uppercase tracking-widest text-foreground/40">Complexidade</span>
                               </div>
                               <p className="text-lg font-bold tracking-tight text-foreground">{selectedProblem.complexity}</p>
                            </div>
                          </div>

                          <div className="space-y-3">
                             <p className="text-[11px] text-foreground/60 font-medium leading-relaxed">{selectedProblem.suggestion}</p>
                             <div className="flex flex-wrap gap-2">
                               {selectedProblem.services.map(s => (
                                 <span key={s} className="text-[8px] font-bold uppercase tracking-widest text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-400/20">{s}</span>
                               ))}
                             </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button
                      onClick={() => setStep(1)}
                      className="w-full py-6 bg-cyan-500 text-black font-bold rounded-full hover:scale-105 transition-all text-[11px] uppercase tracking-wider flex items-center justify-center gap-3 shadow-2xl hover:bg-cyan-400"
                    >
                      Prosseguir para Detalhes
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}

                {/* Step 1: Fill form */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    className="space-y-8"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/20 rounded-[1.5rem] flex items-center justify-center">
                        {selectedProblem?.icon || <FaPaperPlane className="text-cyan-400 text-xl" />}
                      </div>
                      <div>
                        <h3 className="text-2xl font-extrabold text-cyan-500 tracking-tight">
                          {selectedProblem?.label || 'Mensagem'}
                        </h3>
                        {selectedProblem && (
                          <button onClick={() => setStep(0)} className="text-[10px] font-bold uppercase tracking-widest text-cyan-500 hover:text-cyan-400">
                            ← Alterar Categoria
                          </button>
                        )}
                      </div>
                    </div>

                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-foreground/50">Nome Completo</FormLabel>
                              <FormControl>
                                <Input placeholder="IDENTIDADE" className="py-6 bg-foreground/[0.04] border-foreground/10 text-foreground placeholder:text-foreground/30 focus:border-cyan-500 font-medium" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />

                          <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-foreground/50">Endereço de Rede</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="contato@empresa.com" className="py-6 bg-foreground/[0.04] border-foreground/10 text-foreground placeholder:text-foreground/30 focus:border-cyan-500 font-medium" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                        </div>

                        <FormField control={form.control} name="subject" render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-foreground/50">Referência do Assunto</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={selectedProblem ? `${selectedProblem.label} - breve descrição` : "O que vamos construir?"}
                                className="py-6 bg-foreground/[0.04] border-foreground/10 text-foreground placeholder:text-foreground/30 focus:border-cyan-500 font-medium"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />

                        <FormField control={form.control} name="message" render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-foreground/50">
                              Descrição do Desafio
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Descreva sua visão ou o problema técnico que precisamos resolver..."
                                className="resize-none bg-foreground/[0.04] border-foreground/10 text-foreground placeholder:text-foreground/30 focus:border-cyan-500 font-medium p-6"
                                rows={4}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                          <button
                            type="button"
                            onClick={() => setStep(0)}
                            className="px-8 py-5 border border-foreground/10 text-foreground/50 rounded-full hover:bg-foreground/5 transition-all text-[10px] font-bold uppercase tracking-widest"
                          >
                            ← Voltar
                          </button>
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 py-7 bg-linear-to-r from-cyan-500 to-blue-600 text-black font-bold rounded-full hover:shadow-[0_20px_60px_rgba(6,182,212,0.3)] transition-all disabled:opacity-60 text-[11px] uppercase tracking-wider"
                          >
                            {isSubmitting ? (
                              <><span className="animate-spin">⟳</span> PROCESSANDO...</>
                            ) : (
                              <><FaPaperPlane className="mr-3" /> Transmitir Mensagem</>
                            )}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}