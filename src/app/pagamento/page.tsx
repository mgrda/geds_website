"use client";
import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { FiCopy, FiCheck, FiLock, FiCreditCard, FiDollarSign, FiAlertCircle } from 'react-icons/fi';
import { FaBarcode } from 'react-icons/fa';
import SquareReveal from '../components/SquareReveal';

const PaymentPage: NextPage = () => {
  const [activeTab, setActiveTab] = useState<'boleto' | 'pix' | 'cartao'>('pix');
  const [discountCode, setDiscountCode] = useState('');
  const [installments, setInstallments] = useState(1);
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [copiedPixCode, setCopiedPixCode] = useState(false);
  const [pixCode] = useState('00020126360014BR.GOV.BCB.PIX0114+5548999999999520400005303986540515.005802BR5925EMPRESA X LTDA ME6007BRASILIA62070503***6304');

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Formatação do número do cartão
    if (name === 'number') {
      formattedValue = value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }

    // Formatação da data de expiração
    if (name === 'expiry') {
      formattedValue = value
        .replace(/^(\d{2})(\d)/g, '$1/$2')
        .replace(/^(\d{2})\/(\d{2})(\d)/g, '$1/$2')
        .substr(0, 5);
    }

    setCardData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const applyDiscount = () => {
    if (!discountCode.trim()) {
      alert('Por favor, insira um código de desconto');
      return;
    }
    alert(`Código de desconto "${discountCode}" aplicado!`);
  };

  const copyPixCode = () => {
    navigator.clipboard.writeText(pixCode);
    setCopiedPixCode(true);
    setTimeout(() => setCopiedPixCode(false), 2000);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <>
      <Head>
        <title>YNNOTHIVIX - Finalizar Pagamento</title>
        <meta name="description" content="Finalize seu pagamento de forma segura" />
      </Head>

      <main className="h-screen w-full bg-black overflow-hidden relative">
        <SquareReveal gridSize={12}>
          <div className="w-full h-full flex items-center justify-center p-4 relative">

            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-20 pointer-events-none bg-repeat"></div>

            {/* Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-6xl bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] max-h-[90vh] overflow-y-auto custom-scrollbar flex flex-col md:flex-row">

              <div className="w-full p-6 md:p-10">
                <div className="text-center mb-10">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2">Finalizar Pagamento</h1>
                  <p className="text-gray-400 text-sm">Escolha a forma de pagamento e complete sua assinatura</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  {/* Left Side: Payment Methods & Form */}
                  <div className="lg:col-span-2 space-y-8">

                    {/* Opções de Pagamento */}
                    <div className="grid grid-cols-3 gap-4">
                      <button
                        onClick={() => setActiveTab('pix')}
                        className={`flex flex-col items-center p-4 rounded-xl border transition-all duration-300 ${activeTab === 'pix' ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400 shadow-[0_0_15px_-5px_rgba(99,102,241,0.3)]' : 'border-white/10 bg-black/20 text-gray-500 hover:border-gray-500 hover:bg-white/5'}`}
                      >
                        <FiDollarSign className="w-6 h-6 mb-2" />
                        <span className="text-sm font-medium">Pix</span>
                      </button>
                      <button
                        onClick={() => setActiveTab('boleto')}
                        className={`flex flex-col items-center p-4 rounded-xl border transition-all duration-300 ${activeTab === 'boleto' ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400 shadow-[0_0_15px_-5px_rgba(99,102,241,0.3)]' : 'border-white/10 bg-black/20 text-gray-500 hover:border-gray-500 hover:bg-white/5'}`}
                      >
                        <FaBarcode className="w-6 h-6 mb-2" />
                        <span className="text-sm font-medium">Boleto</span>
                      </button>
                      <button
                        onClick={() => setActiveTab('cartao')}
                        className={`flex flex-col items-center p-4 rounded-xl border transition-all duration-300 ${activeTab === 'cartao' ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400 shadow-[0_0_15px_-5px_rgba(99,102,241,0.3)]' : 'border-white/10 bg-black/20 text-gray-500 hover:border-gray-500 hover:bg-white/5'}`}
                      >
                        <FiCreditCard className="w-6 h-6 mb-2" />
                        <span className="text-sm font-medium">Cartão</span>
                      </button>
                    </div>

                    {/* Formulário de Pix */}
                    {activeTab === 'pix' && (
                      <div className="animate-fade-in">
                        <div className="bg-indigo-500/5 p-8 rounded-xl border border-indigo-500/20">
                          <div className="flex items-center justify-between mb-8">
                            <h3 className="font-medium text-gray-200 text-lg flex items-center">
                              <FiDollarSign className="mr-2 text-indigo-400" /> Pagamento via Pix
                            </h3>
                            <span className="bg-indigo-500/20 text-indigo-300 text-xs px-3 py-1 rounded-full border border-indigo-500/30">Instantâneo</span>
                          </div>

                          <div className="grid md:grid-cols-2 gap-8">
                            {/* QR Code */}
                            <div className="flex flex-col items-center justify-center">
                              <div className="bg-white p-3 rounded-xl border-2 border-dashed border-indigo-500/30 mb-4 shadow-lg">
                                <div className="w-40 h-40 bg-gray-100 flex items-center justify-center rounded">
                                  {/* Placeholder for QR - Keeping it simple visual */}
                                  <div className="w-full h-full bg-white grid grid-cols-10 grid-rows-10">
                                    {Array.from({ length: 100 }).map((_, i) => (
                                      <div key={i} className={`w-full h-full ${((i * 13) % 7) > 2 ? 'bg-black' : 'bg-white'}`} />
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <p className="text-xs text-gray-400 mb-2">Escaneie com seu app bancário</p>
                            </div>

                            {/* Código Copia e Cola */}
                            <div className="flex flex-col justify-center">
                              <h4 className="font-medium text-gray-300 mb-3 text-sm">Ou copie o código Pix:</h4>
                              <div className="relative mb-3">
                                <div className="bg-black/40 p-3 rounded-lg border border-white/10 font-mono text-xs text-gray-400 break-all pr-10">
                                  {pixCode.substring(0, 50)}...
                                </div>
                                <button
                                  onClick={copyPixCode}
                                  className="absolute top-2 right-2 p-1.5 bg-indigo-500/20 rounded-md hover:bg-indigo-500/30 transition-colors"
                                  title="Copiar código Pix"
                                >
                                  {copiedPixCode ? (
                                    <FiCheck className="text-green-400 text-sm" />
                                  ) : (
                                    <FiCopy className="text-indigo-400 text-sm" />
                                  )}
                                </button>
                              </div>
                              <button
                                onClick={copyPixCode}
                                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm rounded-lg transition-colors flex items-center justify-center shadow-lg shadow-indigo-500/20"
                              >
                                {copiedPixCode ? 'Código copiado!' : 'Copiar código Pix'}
                              </button>

                              <div className="mt-4 bg-indigo-900/20 border-l-2 border-indigo-500 p-3 rounded-r">
                                <p className="text-xs text-indigo-200">
                                  Aprovação imediata. Seu acesso será liberado assim que o pagamento for confirmado.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Formulário de Boleto */}
                    {activeTab === 'boleto' && (
                      <div className="animate-fade-in">
                        <div className="bg-indigo-500/5 p-8 rounded-xl border border-indigo-500/20">
                          <div className="flex items-center justify-between mb-8">
                            <h3 className="font-medium text-gray-200 text-lg flex items-center">
                              <FaBarcode className="mr-2 text-indigo-400" /> Boleto Bancário
                            </h3>
                            <span className="bg-yellow-500/10 text-yellow-300 text-xs px-3 py-1 rounded-full border border-yellow-500/20">Até 3 dias úteis</span>
                          </div>

                          <div className="bg-white/5 p-8 rounded-xl border border-white/10 text-center mb-8">
                            <div className="max-w-xs mx-auto opacity-50">
                              <div className="bg-gray-200/10 p-4 rounded mb-2 space-y-2">
                                <div className="h-4 bg-gray-500/20 rounded w-full"></div>
                                <div className="h-4 bg-gray-500/20 rounded w-3/4"></div>
                                <div className="h-10 bg-gray-500/20 rounded w-full mt-4"></div>
                              </div>
                            </div>
                            <p className="mt-4 text-sm text-gray-400">O boleto será gerado após a confirmação</p>
                          </div>

                          <div className="bg-yellow-900/20 border-l-2 border-yellow-500 p-4 rounded-r">
                            <div className="flex">
                              <div className="flex-shrink-0">
                                <FiAlertCircle className="h-5 w-5 text-yellow-500" />
                              </div>
                              <div className="ml-3">
                                <p className="text-sm text-yellow-200">
                                  Sua assinatura só será ativada após a compensação do boleto, que pode levar até 3 dias úteis.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Formulário de Cartão de Crédito */}
                    {activeTab === 'cartao' && (
                      <div className="animate-fade-in space-y-4">
                        {/* Card Wrapper */}
                        <div className="bg-indigo-500/5 p-8 rounded-xl border border-indigo-500/20">
                          <div className="flex items-center justify-between mb-8">
                            <h3 className="font-medium text-gray-200 text-lg flex items-center">
                              <FiCreditCard className="mr-2 text-indigo-400" /> Cartão de Crédito
                            </h3>
                            <div className="flex space-x-2 grayscale opacity-70">
                              {/* Using simple divs/text as placeholder icons since we don't have the images accessible right now for sure, or re-using img tags if they work */}
                              <div className="h-6 w-10 bg-white/10 rounded"></div>
                              <div className="h-6 w-10 bg-white/10 rounded"></div>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <div>
                              <label htmlFor="cardNumber" className="block text-xs font-medium text-gray-400 mb-1.5">Número do Cartão</label>
                              <div className="relative group">
                                <input
                                  type="text"
                                  id="cardNumber"
                                  name="number"
                                  value={cardData.number}
                                  onChange={handleCardInputChange}
                                  placeholder="0000 0000 0000 0000"
                                  maxLength={19}
                                  className="w-full pl-10 pr-3 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all duration-300"
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <FiCreditCard className="h-5 w-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                                </div>
                              </div>
                            </div>

                            <div>
                              <label htmlFor="cardName" className="block text-xs font-medium text-gray-400 mb-1.5">Nome no Cartão</label>
                              <input
                                type="text"
                                id="cardName"
                                name="name"
                                value={cardData.name}
                                onChange={handleCardInputChange}
                                placeholder="Como escrito no cartão"
                                className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all duration-300"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label htmlFor="cardExpiry" className="block text-xs font-medium text-gray-400 mb-1.5">Validade</label>
                                <input
                                  type="text"
                                  id="cardExpiry"
                                  name="expiry"
                                  value={cardData.expiry}
                                  onChange={handleCardInputChange}
                                  placeholder="MM/AA"
                                  maxLength={5}
                                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all duration-300"
                                />
                              </div>

                              <div>
                                <label htmlFor="cardCvv" className="block text-xs font-medium text-gray-400 mb-1.5">CVV</label>
                                <div className="relative group">
                                  <input
                                    type="text"
                                    id="cardCvv"
                                    name="cvv"
                                    value={cardData.cvv}
                                    onChange={handleCardInputChange}
                                    placeholder="123"
                                    maxLength={4}
                                    className="w-full px-4 py-3 pr-10 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all duration-300"
                                  />
                                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <FiLock className="h-4 w-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div>
                              <label htmlFor="installments" className="block text-xs font-medium text-gray-400 mb-1.5">Parcelamento</label>
                              <select
                                id="installments"
                                value={installments}
                                onChange={(e) => setInstallments(Number(e.target.value))}
                                className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all duration-300 appearance-none"
                              >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
                                  <option key={num} value={num} className="bg-gray-900 text-white">
                                    {num}x de {formatCurrency(15 / num)} {num > 1 ? '(sem juros)' : ''}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Side: Order Summary */}
                  <div className="space-y-8">
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8 shadow-xl sticky top-6">
                      <h3 className="text-lg font-semibold text-white mb-6">Resumo do Pedido</h3>

                      <div className="space-y-5 mb-8">
                        <div className="flex justify-between items-center pb-5 border-b border-white/10">
                          <div>
                            <p className="text-white font-medium">Plano Premium</p>
                            <p className="text-xs text-gray-400">Assinatura mensal</p>
                          </div>
                          <p className="text-white font-medium">R$ 49,99</p>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-400">Subtotal</span>
                          <span className="text-gray-200">R$ 49,99</span>
                        </div>

                        {/* Cupom */}
                        <div className="pt-2">
                          <label className="text-xs text-gray-500 block mb-2">Tem um cupom?</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={discountCode}
                              onChange={(e) => setDiscountCode(e.target.value)}
                              placeholder="Código"
                              className="flex-1 min-w-0 bg-black/30 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all placeholder-gray-600"
                            />
                            <button
                              onClick={applyDiscount}
                              className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-indigo-500/20 whitespace-nowrap"
                            >
                              Aplicar
                            </button>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-6 border-t border-white/10">
                          <span className="text-lg font-semibold text-white">Total</span>
                          <div className="text-right">
                            <p className="text-3xl font-bold text-indigo-400">R$ 49,99</p>
                            <p className="text-[10px] text-green-400">Economize 20% no anual</p>
                          </div>
                        </div>
                      </div>

                      {/* Termos */}
                      <div className="space-y-6">
                        <div className="flex items-start">
                          <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                            className="mt-1 h-4 w-4 rounded border-white/10 bg-black/40 text-indigo-500 focus:ring-indigo-500/20 focus:ring-offset-0"
                          />
                          <label htmlFor="terms" className="ml-2 block text-xs text-gray-400">
                            Concordo com os <a href="#" className="text-indigo-400 hover:text-indigo-300">Termos</a> e <a href="#" className="text-indigo-400 hover:text-indigo-300">Privacidade</a>.
                          </label>
                        </div>

                        <button
                          disabled={!termsAccepted}
                          className={`w-full relative group overflow-hidden py-4 rounded-xl font-semibold transition-all duration-300 shadow-[0_0_20px_-5px_rgba(99,102,241,0.4)] ${termsAccepted ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white hover:shadow-[0_0_25px_-5px_rgba(99,102,241,0.6)]' : 'bg-gray-800 text-gray-500 cursor-not-allowed opacity-50'}`}
                        >
                          <span className="relative z-10">
                            {activeTab === 'pix' && 'Gerar Pix'}
                            {activeTab === 'boleto' && 'Gerar Boleto'}
                            {activeTab === 'cartao' && 'Confirmar Pagamento'}
                          </span>
                          {termsAccepted && <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:animate-shine" />}
                        </button>

                        <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 pt-2">
                          <FiLock className="text-green-500" />
                          <span>Ambiente 100% Seguro</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SquareReveal>
      </main>
    </>
  );
};

export default PaymentPage;