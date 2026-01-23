"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FiMail, FiArrowLeft, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import SquareReveal from "../components/SquareReveal";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [step, setStep] = useState<"email" | "verification">("email");
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(0);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Timer countdown effect
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleSendCode = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            setError("Por favor, digite seu e-mail.");
            return;
        }

        setLoading(true);
        setError("");

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setStep("verification");
            setTimer(60); // 60 seconds cooldown
            // Focus on first input of code
            setTimeout(() => inputRefs.current[0]?.focus(), 100);
        }, 1500);
    };

    const handleVerify = async () => {
        const fullCode = code.join("");
        if (fullCode.length < 6) {
            setError("Digite o código completo de 6 dígitos.");
            return;
        }

        setLoading(true);
        setError("");

        // Simulate verification
        setTimeout(() => {
            setLoading(false);
            if (fullCode === "123456") { // Mock validation
                setSuccess(true);
            } else {
                setError("Código inválido. Tente novamente.");
            }
        }, 1500);
    };

    const handleCodeChange = (index: number, value: string) => {
        if (value.length > 1) value = value.slice(0, 1); // Limit to 1 char
        if (!/^\d*$/.test(value)) return; // Only numbers

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
        if (pastedData.every(char => /^\d$/.test(char))) {
            const newCode = [...code];
            pastedData.forEach((char, i) => {
                if (i < 6) newCode[i] = char;
            });
            setCode(newCode);
            inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
        }
    };

    if (success) {
        return (
            <main className="h-screen w-full bg-black overflow-hidden relative">
                <SquareReveal gridSize={15}>
                    <div className="w-full h-full flex items-center justify-center p-4 relative">
                        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-20 pointer-events-none bg-repeat"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/20 blur-[120px] rounded-full pointer-events-none"></div>

                        <div className="relative z-10 w-full max-w-md p-8 bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] text-center">
                            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-500/20 mb-6 ring-1 ring-green-500/50 animate-bounce-slow">
                                <FiCheckCircle className="h-10 w-10 text-green-400" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">Senha Redefinida!</h2>
                            <p className="text-gray-400 mb-8">
                                Sua senha foi alterada com sucesso. Você já pode acessar sua conta com a nova senha.
                            </p>
                            <Link
                                href="/login"
                                className="block w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 rounded-xl transition-all shadow-lg hover:shadow-green-500/25"
                            >
                                Ir para Login
                            </Link>
                        </div>
                    </div>
                </SquareReveal>
            </main>
        );
    }

    return (
        <main className="h-screen w-full bg-black overflow-hidden relative">
            <SquareReveal gridSize={12}>
                <div className="w-full h-full flex items-center justify-center p-4 relative">

                    {/* Background Ambience */}
                    <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-20 pointer-events-none bg-repeat"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none"></div>

                    <div className="relative z-10 w-full max-w-md p-8 bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]">

                        {/* Header */}
                        <div className="mb-8">
                            <Link href="/login" className="inline-flex items-center text-sm text-gray-500 hover:text-white transition-colors mb-6 group">
                                <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" /> Voltar para login
                            </Link>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                                recuperar conta
                            </h2>
                            <p className="text-gray-400 text-sm mt-3">
                                {step === "email"
                                    ? "Digite seu e-mail para receber o código de verificação."
                                    : `Enviamos um código de 6 dígitos para ${email}`
                                }
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="flex items-center gap-2 bg-red-500/10 text-red-400 border border-red-500/20 p-3 rounded-lg mb-6 text-sm animate-pulse">
                                <FiAlertCircle className="flex-shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Step 1: Email Input */}
                        {step === "email" && (
                            <form onSubmit={handleSendCode} className="space-y-6">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-300">E-mail cadastrado</label>
                                    <div className="relative group">
                                        <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-cyan-400 transition-colors duration-300" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-10 pr-3 py-3.5 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all duration-300"
                                            placeholder="exemplo@email.com"
                                            disabled={loading}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full relative overflow-hidden bg-cyan-500 hover:bg-cyan-400 text-black py-3.5 rounded-xl font-bold transition-all duration-300 shadow-[0_0_20px_rgba(0,219,255,0.4)] hover:shadow-[0_0_25px_rgba(0,219,255,0.6)] disabled:opacity-70 disabled:cursor-not-allowed group"
                                >
                                    <span className="relative z-10">{loading ? "Enviando..." : "Gerar Código"}</span>
                                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:animate-shine" />
                                </button>
                            </form>
                        )}

                        {/* Step 2: Verification Code */}
                        {step === "verification" && (
                            <div className="space-y-8">
                                {/* Email display and edit option */}
                                <div className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/5">
                                    <span className="text-gray-300 text-sm truncate pr-2">{email}</span>
                                    <button
                                        onClick={() => { setStep("email"); setCode(["", "", "", "", "", ""]); setError(""); }}
                                        className="text-xs text-cyan-400 hover:text-cyan-300 font-medium whitespace-nowrap"
                                    >
                                        Alterar e-mail
                                    </button>
                                </div>

                                <div>
                                    <label className="block mb-4 text-sm font-medium text-center text-gray-300">Código de Verificação</label>
                                    <div className="flex justify-between gap-2" onPaste={handlePaste}>
                                        {code.map((digit, index) => (
                                            <input
                                                key={index}
                                                ref={(el) => { inputRefs.current[index] = el }}
                                                type="text"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleCodeChange(index, e.target.value)}
                                                onKeyDown={(e) => handleKeyDown(index, e)}
                                                className="w-12 h-14 bg-black/40 border border-white/10 rounded-lg text-center text-xl font-bold text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="text-center">
                                    {timer > 0 ? (
                                        <p className="text-sm text-gray-500">
                                            Reenviar código em <span className="text-cyan-400 font-mono">{timer}s</span>
                                        </p>
                                    ) : (
                                        <button
                                            onClick={handleSendCode}
                                            className="text-sm text-cyan-400 hover:text-cyan-300 underline decoration-cyan-500/30 hover:decoration-cyan-500/70 transition-all font-medium"
                                        >
                                            Não recebeu o código? Reenviar
                                        </button>
                                    )}
                                </div>

                                <button
                                    onClick={handleVerify}
                                    disabled={loading || code.some(d => !d)}
                                    className="w-full relative overflow-hidden bg-cyan-500 hover:bg-cyan-400 text-black py-3.5 rounded-xl font-bold transition-all duration-300 shadow-[0_0_20px_rgba(0,219,255,0.4)] hover:shadow-[0_0_25px_rgba(0,219,255,0.6)] disabled:opacity-50 disabled:cursor-not-allowed group"
                                >
                                    <span className="relative z-10">{loading ? "Verificando..." : "VERIFICAR"}</span>
                                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:animate-shine" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </SquareReveal>
        </main>
    );
}
