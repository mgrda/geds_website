"use client";

import { FaInstagram, FaGithub, FaLinkedin, FaPaperPlane, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaGlobe } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { supabase } from '@/lib/supabase';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Brain, CheckCircle, ChevronRight, Zap, Code2, Cloud, BarChart3, Layout, Shield } from 'lucide-react';

import { Button } from "@/components/ui/button";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// ── Schema ─────────────────────────────────────────────────────────
const contactSchema = z.object({
  name: z.string().min(2, { message: "Nome é obrigatório" }),
  email: z.string().email({ message: "Email inválido" }),
  problemType: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, { message: "Mensagem deve ter pelo menos 10 caracteres" }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

// ── Problem Types ──────────────────────────────────────────────────
const problemTypes = [
  {
    id: 'automacao',
    icon: <Zap className="w-5 h-5" />,
    label: 'Automação de Processos',
    suggestion: 'Identificamos que você precisa de soluções de automação. Recomendamos começar com um diagnóstico dos processos manuais da sua empresa.',
    services: ['Automação de Fluxos', 'Integração de Sistemas', 'IA Processual'],
  },
  {
    id: 'desenvolvimento',
    icon: <Code2 className="w-5 h-5" />,
    label: 'Desenvolvimento de Software',
    suggestion: 'Para desenvolvimento, podemos construir desde MVPs ágeis até sistemas enterprise completos. Vamos definir o escopo ideal para seu projeto.',
    services: ['Web Apps', 'APIs & Backend', 'Mobile'],
  },
  {
    id: 'cloud',
    icon: <Cloud className="w-5 h-5" />,
    label: 'Cloud & Infraestrutura',
    suggestion: 'A migração para cloud pode reduzir seus custos em até 50%. Faremos uma análise completa da sua infraestrutura atual.',
    services: ['AWS/GCP Migration', 'DevOps', 'Monitoramento 24/7'],
  },
  {
    id: 'dados',
    icon: <BarChart3 className="w-5 h-5" />,
    label: 'Dados & Analytics',
    suggestion: 'Transformaremos seus dados dispersos em insights acionáveis com dashboards inteligentes e relatórios em tempo real.',
    services: ['Business Intelligence', 'Dashboards', 'Data Pipeline'],
  },
  {
    id: 'design',
    icon: <Layout className="w-5 h-5" />,
    label: 'UX/UI Design',
    suggestion: 'Uma interface bem desenhada pode aumentar suas conversões em até 60%. Trabalharemos no design centrado no seu usuário final.',
    services: ['UX Research', 'UI Design', 'Prototipagem'],
  },
  {
    id: 'seguranca',
    icon: <Shield className="w-5 h-5" />,
    label: 'Segurança & Compliance',
    suggestion: 'Protegeremos seus dados e garantiremos conformidade com LGPD e padrões enterprise de segurança.',
    services: ['Auditoria de Segurança', 'LGPD', 'Criptografia'],
  },
];

// ── Form Step Indicator ────────────────────────────────────────────
function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 shrink-0 ${
            i < current ? 'bg-cyan-500 text-black' :
            i === current ? 'bg-white/10 text-cyan-400 border border-cyan-500/40' :
            'bg-white/5 text-gray-700'
          }`}>
            {i < current ? <CheckCircle className="w-4 h-4" /> : i + 1}
          </div>
          {i < total - 1 && (
            <div className={`h-px flex-1 min-w-[16px] transition-all duration-500 ${i < current ? 'bg-cyan-500' : 'bg-white/10'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────
export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState<typeof problemTypes[0] | null>(null);
  const [step, setStep] = useState(0); // 0: choose problem, 1: fill form

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", problemType: "", subject: "", message: "" },
  });

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
      <main className="min-h-screen bg-black flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-24 h-24 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-emerald-400" />
          </motion.div>
          <h2 className="text-3xl font-black text-white mb-3">Mensagem enviada!</h2>
          <p className="text-gray-400 mb-6">Nossa equipe analisará sua solicitação e entrará em contato em breve com soluções personalizadas.</p>
          <button
            onClick={() => { setSubmitted(false); setStep(0); setSelectedProblem(null); }}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-black px-8 py-3 rounded-full hover:shadow-[0_0_20px_rgba(0,219,255,0.4)] transition-all"
          >
            Enviar nova mensagem
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-black overflow-hidden relative text-white">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,219,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,219,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[140px] rounded-full animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/8 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="inline-block mb-4 text-cyan-400 font-bold bg-cyan-500/10 px-4 py-2 rounded-full text-xs uppercase tracking-widest border border-cyan-500/20">
            Contato Inteligente
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            Vamos criar o <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">futuro</span> juntos?
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Nosso sistema inteligente analisa seu problema e sugere as melhores soluções automaticamente.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ─── Left: Contact Info ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
              <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-cyan-500/30 transition-all">
                <h3 className="text-2xl font-black text-white mb-6">Canais de Atendimento</h3>
                <div className="space-y-4">
                  <a href="mailto:contato@gedsinovacao.com" className="flex items-center gap-5 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/8 hover:border-cyan-500/30 transition-all group/item">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-500/30 group-hover/item:scale-110 transition-transform shrink-0">
                      <FaEnvelope className="text-cyan-400 text-xl" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Email Corporativo</p>
                      <p className="text-white font-bold group-hover/item:text-cyan-300 transition-colors">contato@gedsinovacao.com</p>
                    </div>
                  </a>

                  <a href="https://wa.me/5598987654321" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/8 hover:border-emerald-500/30 transition-all group/item">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover/item:scale-110 transition-transform shrink-0">
                      <FaWhatsapp className="text-emerald-400 text-xl" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">WhatsApp</p>
                      <p className="text-white font-bold group-hover/item:text-emerald-300 transition-colors">(98) 99999-9999</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-5 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                      <FaMapMarkerAlt className="text-purple-400 text-xl" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Localização</p>
                      <p className="text-white font-bold">São Luís – MA, Brasil</p>
                      <p className="text-sm text-gray-500">Atendimento Remoto Global</p>
                    </div>
                  </div>
                </div>

                {/* Socials */}
                <div className="mt-8 pt-6 border-t border-white/8">
                  <p className="text-gray-500 text-xs uppercase tracking-wider text-center mb-4">Siga-nos</p>
                  <div className="flex justify-center gap-4">
                    {[
                      { icon: FaInstagram, color: "hover:text-pink-500", label: "Instagram", href: "#" },
                      { icon: FaGithub, color: "hover:text-white", label: "Github", href: "#" },
                      { icon: FaLinkedin, color: "hover:text-blue-400", label: "LinkedIn", href: "#" },
                      { icon: FaGlobe, color: "hover:text-cyan-400", label: "Website", href: "#" },
                    ].map((social, i) => (
                      <a key={i} href={social.href} aria-label={social.label}
                        className={`w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-gray-500 ${social.color} hover:bg-white/8 hover:scale-110 transition-all`}>
                        <social.icon className="text-xl" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Smart assistant badge */}
            <div className="bg-gradient-to-r from-purple-950/40 to-black border border-purple-500/20 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center">
                  <Brain className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Formulário Inteligente</p>
                  <p className="text-purple-400 text-xs">IA sugerindo soluções em tempo real</p>
                </div>
              </div>
              <p className="text-gray-500 text-sm">
                Selecione o tipo do seu problema e nosso sistema irá sugerir automaticamente as melhores soluções para o seu caso.
              </p>
            </div>
          </motion.div>

          {/* ─── Right: Smart Form ───────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-600 rounded-2xl blur opacity-20" />
              <div className="relative bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">

                <StepIndicator current={step} total={2} />

                <AnimatePresence mode="wait">

                  {/* Step 0: Choose problem */}
                  {step === 0 && (
                    <motion.div
                      key="step0"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h3 className="text-2xl font-black text-white mb-2">Qual é o seu desafio?</h3>
                      <p className="text-gray-400 text-sm mb-6">Selecione a categoria que melhor descreve o que você precisa</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                        {problemTypes.map((type) => (
                          <motion.button
                            key={type.id}
                            onClick={() => {
                              setSelectedProblem(type);
                              form.setValue('problemType', type.id);
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                              selectedProblem?.id === type.id
                                ? 'bg-cyan-500/10 border-cyan-500/40 text-white'
                                : 'bg-white/[0.02] border-white/8 text-gray-400 hover:border-cyan-500/20 hover:text-gray-200'
                            }`}
                          >
                            <div className={`shrink-0 transition-colors ${selectedProblem?.id === type.id ? 'text-cyan-400' : 'text-gray-600'}`}>
                              {type.icon}
                            </div>
                            <span className="text-sm font-bold">{type.label}</span>
                            {selectedProblem?.id === type.id && (
                              <CheckCircle className="w-4 h-4 text-cyan-400 ml-auto shrink-0" />
                            )}
                          </motion.button>
                        ))}
                      </div>

                      {/* AI Suggestion */}
                      <AnimatePresence>
                        {selectedProblem && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-4 mb-5 overflow-hidden"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <Brain className="w-4 h-4 text-purple-400" />
                              <span className="text-purple-400 text-xs font-bold uppercase">Sugestão Inteligente</span>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed mb-3">{selectedProblem.suggestion}</p>
                            <div className="flex flex-wrap gap-2">
                              {selectedProblem.services.map(s => (
                                <span key={s} className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded-full border border-cyan-500/20">{s}</span>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="flex gap-3">
                        <button
                          onClick={() => setStep(1)}
                          className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-black rounded-full hover:shadow-[0_0_20px_rgba(0,219,255,0.3)] transition-all flex items-center justify-center gap-2"
                        >
                          {selectedProblem ? 'Continuar com formulário' : 'Pular e preencher'}
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 1: Fill form */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center">
                          <FaPaperPlane className="text-cyan-400 text-lg" />
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-white">
                            {selectedProblem ? `${selectedProblem.label}` : 'Envie sua mensagem'}
                          </h3>
                          {selectedProblem && (
                            <button onClick={() => setStep(0)} className="text-cyan-400 text-xs hover:underline">
                              ← Mudar tipo de problema
                            </button>
                          )}
                        </div>
                      </div>

                      {selectedProblem && (
                        <div className="bg-cyan-500/5 border border-cyan-500/15 rounded-xl p-3 mb-5 flex items-center gap-3">
                          <div className="text-cyan-400 shrink-0">{selectedProblem.icon}</div>
                          <p className="text-gray-400 text-xs leading-relaxed">{selectedProblem.suggestion}</p>
                        </div>
                      )}

                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField control={form.control} name="name" render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-400 text-sm">Seu Nome</FormLabel>
                                <FormControl>
                                  <Input placeholder="João Silva" className="py-5 bg-white/[0.03] border-white/10 text-white placeholder:text-gray-700 focus:border-cyan-500/50" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />

                            <FormField control={form.control} name="email" render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-400 text-sm">Seu Email</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="joao@empresa.com" className="py-5 bg-white/[0.03] border-white/10 text-white placeholder:text-gray-700 focus:border-cyan-500/50" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                          </div>

                          <FormField control={form.control} name="subject" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-400 text-sm">Assunto</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={selectedProblem ? `${selectedProblem.label} - descreva brevemente...` : "Sobre o que você quer falar?"}
                                  className="py-5 bg-white/[0.03] border-white/10 text-white placeholder:text-gray-700 focus:border-cyan-500/50"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />

                          <FormField control={form.control} name="message" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-400 text-sm">
                                Sua Mensagem
                                {form.watch('message') && (
                                  <span className="ml-2 text-green-400 text-xs">✓ {form.watch('message').length} caracteres</span>
                                )}
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder={selectedProblem
                                    ? `Conte mais sobre seu desafio com ${selectedProblem.label.toLowerCase()}...`
                                    : "Descreva seu projeto ou dúvida..."}
                                  className="resize-none bg-white/[0.03] border-white/10 text-white placeholder:text-gray-700 focus:border-cyan-500/50"
                                  rows={4}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />

                          <div className="flex gap-3 pt-2">
                            <button
                              type="button"
                              onClick={() => setStep(0)}
                              className="px-5 py-3 border border-white/10 text-gray-400 rounded-full hover:bg-white/5 transition-all text-sm"
                            >
                              ← Voltar
                            </button>
                            <Button
                              type="submit"
                              disabled={isSubmitting}
                              className="flex-1 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-black rounded-full hover:shadow-[0_0_20px_rgba(0,219,255,0.4)] transition-all disabled:opacity-60"
                            >
                              <span className="flex items-center justify-center gap-2">
                                {isSubmitting ? (
                                  <><span className="animate-spin">⟳</span> Enviando...</>
                                ) : (
                                  <><FaPaperPlane /> Enviar Mensagem</>
                                )}
                              </span>
                            </Button>
                          </div>

                          <p className="text-center text-[11px] text-gray-600">
                            Ao enviar, você concorda com nossa{' '}
                            <a href="/politica-de-privacidade" className="text-cyan-500 hover:underline">Política de Privacidade</a>.
                            Respondemos em até 24h úteis.
                          </p>
                        </form>
                      </Form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
