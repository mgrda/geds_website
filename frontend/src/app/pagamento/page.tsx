"use client";
import { NextPage } from 'next';
import NextImage from 'next/image';
import Head from 'next/head';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FiCopy, FiCheck, FiLock, FiCreditCard, FiDollarSign, FiAlertCircle, FiDownload, FiCheckCircle, FiTag } from 'react-icons/fi';
import { FaBarcode, FaQrcode } from 'react-icons/fa';
import jsPDF from 'jspdf';
import SquareReveal from '../components/SquareReveal';

const PaymentContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
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
  const [copiedBoleto, setCopiedBoleto] = useState(false);
  const [pagamentoFinalizado, setPagamentoFinalizado] = useState(false);

  // States from the example logic
  const [planName, setPlanName] = useState('Plano Premium');
  const [valorOriginal, setValorOriginal] = useState(49.99);
  const [valorComDesconto, setValorComDesconto] = useState(49.99);
  const [descontoAplicado, setDescontoAplicado] = useState(false);
  const [mensagemVoucher, setMensagemVoucher] = useState('');
  const [tipoMensagemVoucher, setTipoMensagemVoucher] = useState<'success' | 'error' | ''>('');
  const [boletoCode, setBoletoCode] = useState('');

  useEffect(() => {
    const plan = searchParams.get('plan');
    const price = searchParams.get('price');
    
    if (plan) setPlanName(plan);
    if (price) {
      const p = parseFloat(price);
      setValorOriginal(p);
      setValorComDesconto(p);
    }
    
    generarCodigoBarrasAleatorio();
  }, [searchParams]);

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'number') {
      formattedValue = value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }

    if (name === 'expiry') {
      formattedValue = value
        .replace(/^(\d{2})(\d)/g, '$1/$2')
        .replace(/^(\d{2})\/(\d{2})(\d)/g, '$1/$2')
        .substr(0, 5);
    }

    setCardData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const aplicarDescontoLogic = (valor: number, codigo: string) => {
    if (codigo.toUpperCase() !== 'OUT31/10') {
      return { valorComDesconto: valor, percentual: 0 };
    }

    if (valor > 100.00) { // Adjusted thresholds for plans prices
      return { valorComDesconto: parseFloat((valor * 0.7).toFixed(2)), percentual: 30 };
    } else if (valor >= 40.00) {
      return { valorComDesconto: parseFloat((valor * 0.8).toFixed(2)), percentual: 20 };
    } else {
      return { valorComDesconto: valor * 0.95, percentual: 5 }; // Minimum 5% if valid coupon
    }
  };

  const handleAplicarVoucher = () => {
    if (!discountCode.trim()) {
      setMensagemVoucher('Insira um código');
      setTipoMensagemVoucher('error');
      return;
    }

    if (discountCode.toUpperCase() !== 'OUT31/10') {
      setMensagemVoucher('Voucher inválido');
      setTipoMensagemVoucher('error');
      setDescontoAplicado(false);
      setValorComDesconto(valorOriginal);
      return;
    }

    const resultado = aplicarDescontoLogic(valorOriginal, discountCode);
    setMensagemVoucher(`Voucher aplicado! ${resultado.percentual}% de desc.`);
    setTipoMensagemVoucher('success');
    setDescontoAplicado(true);
    setValorComDesconto(resultado.valorComDesconto);
  };

  const generarCodigoBarrasAleatorio = () => {
    const r1 = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    const r2 = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    const r3 = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    const code = `23790.12345 ${r1}.678901 ${r2}.123456 1 999900000${Math.floor(valorOriginal*100)}`;
    setBoletoCode(code);
  };

  const getPixCode = () => {
    const valor = descontoAplicado ? valorComDesconto : valorOriginal;
    return `00020126360014BR.GOV.BCB.PIX0114+5548999999999520400005303986540${valor.toFixed(2).length.toString().padStart(2, '0')}${valor.toFixed(2)}5802BR5925GEDS INOVACAO6007BRASILIA62070503***6304`;
  };

  const copyPixCode = () => {
    navigator.clipboard.writeText(getPixCode());
    setCopiedPixCode(true);
    setTimeout(() => setCopiedPixCode(false), 2000);
  };

  const handleFinalizarPagamento = async () => {
    const valorPago = descontoAplicado ? valorComDesconto : valorOriginal;
    
    if (activeTab === 'boleto') {
      await handleDownloadPdf();
    }
    
    setPagamentoFinalizado(true);
    
    const pagamentoData = {
      id: Date.now(),
      data: new Date().toLocaleDateString('pt-BR'),
      hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      metodo: activeTab,
      valor: valorPago,
      plano: planName,
      status: 'Concluído'
    };

    const historico = JSON.parse(localStorage.getItem('historicoPagamentos') || '[]');
    historico.unshift(pagamentoData);
    localStorage.setItem('historicoPagamentos', JSON.stringify(historico));
    
    setTimeout(() => {
      router.push('/');
    }, 3000);
  };

  const handleDownloadPdf = async () => {
    const pdf = new jsPDF();
    
    const loadImg = (src: string): Promise<HTMLImageElement | null> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
      });
    };

    const logo = await loadImg('/GEDS Inovação.png');
    const seal = await loadImg('/selo_gold.png');

    // Header Background
    pdf.setFillColor(0, 0, 0);
    pdf.rect(0, 0, 210, 40, 'F');

    if (logo) {
      pdf.addImage(logo, 'PNG', 15, 5, 30, 30);
    }

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(22);
    pdf.setFont('helvetica', 'bold');
    pdf.text('GEDS INOVAÇÃO', 50, 20);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text('BOLETO PARA PAGAMENTO - ' + planName.toUpperCase(), 50, 28);

    // Content
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('DETALHES DO PEDIDO', 20, 60);
    
    pdf.setDrawColor(0, 219, 255);
    pdf.setLineWidth(0.5);
    pdf.line(20, 63, 190, 63);

    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Plano:`, 20, 75);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${planName}`, 60, 75);
    
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Valor:`, 20, 85);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${formatCurrency(descontoAplicado ? valorComDesconto : valorOriginal)}`, 60, 85);

    pdf.setFont('helvetica', 'normal');
    pdf.text(`Data:`, 20, 95);
    pdf.text(`${new Date().toLocaleDateString('pt-BR')}`, 60, 95);

    pdf.text(`Vencimento:`, 20, 105);
    pdf.text(`${new Date(Date.now() + 3*24*60*60*1000).toLocaleDateString('pt-BR')}`, 60, 105);

    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('CÓDIGO DE BARRAS', 20, 125);
    
    pdf.setFillColor(240, 240, 240);
    pdf.rect(20, 130, 170, 15, 'F');
    pdf.setFont('courier', 'bold');
    pdf.setFontSize(11);
    pdf.text(boletoCode, 25, 140);

    if (seal) {
      pdf.addImage(seal, 'PNG', 140, 150, 50, 50);
    }

    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.setFont('helvetica', 'italic');
    pdf.text('Este é um documento gerado automaticamente pela plataforma GEDS.', 20, 280);

    pdf.save('boleto-geds.pdf');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <main className="h-screen w-full bg-black overflow-hidden relative">
      <SquareReveal gridSize={12}>
        <div className="w-full h-full flex items-center justify-center p-4 relative">
          <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-20 pointer-events-none bg-repeat"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan/20 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="relative z-10 w-full max-w-6xl bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] max-h-[90vh] overflow-y-auto custom-scrollbar flex flex-col md:flex-row">
            <div className="w-full p-6 md:p-10">
              <div className="text-center mb-10">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2">Finalizar Pagamento</h1>
                <p className="text-gray-400 text-sm">Escolha a forma de pagamento para o {planName}</p>
              </div>

              {pagamentoFinalizado && (
                <div className="mb-8 p-6 bg-cyan/10 border border-cyan/30 rounded-xl animate-fade-in flex items-center gap-4">
                  <FiCheckCircle className="w-10 h-10 text-cyan animate-bounce" />
                  <div>
                    <h3 className="text-xl font-bold text-white">Pagamento concluído!</h3>
                    <p className="text-cyan text-sm">Seu acesso será liberado em instantes. Redirecionando...</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-8">
                  <div className="grid grid-cols-3 gap-4">
                    <button onClick={() => setActiveTab('pix')} className={`flex flex-col items-center p-4 rounded-xl border transition-all duration-300 ${activeTab === 'pix' ? 'border-cyan bg-cyan/10 text-cyan shadow-[0_0_15px_-5px_rgba(0,219,255,0.3)]' : 'border-white/10 bg-black/20 text-gray-500 hover:border-gray-500 hover:bg-white/5'}`}>
                      <FaQrcode className="w-6 h-6 mb-2" />
                      <span className="text-sm font-medium">Pix</span>
                    </button>
                    <button onClick={() => setActiveTab('boleto')} className={`flex flex-col items-center p-4 rounded-xl border transition-all duration-300 ${activeTab === 'boleto' ? 'border-cyan bg-cyan/10 text-cyan shadow-[0_0_15px_-5px_rgba(0,219,255,0.3)]' : 'border-white/10 bg-black/20 text-gray-500 hover:border-gray-500 hover:bg-white/5'}`}>
                      <FaBarcode className="w-6 h-6 mb-2" />
                      <span className="text-sm font-medium">Boleto</span>
                    </button>
                    <button onClick={() => setActiveTab('cartao')} className={`flex flex-col items-center p-4 rounded-xl border transition-all duration-300 ${activeTab === 'cartao' ? 'border-cyan bg-cyan/10 text-cyan shadow-[0_0_15px_-5px_rgba(0,219,255,0.3)]' : 'border-white/10 bg-black/20 text-gray-500 hover:border-gray-500 hover:bg-white/5'}`}>
                      <FiCreditCard className="w-6 h-6 mb-2" />
                      <span className="text-sm font-medium">Cartão</span>
                    </button>
                  </div>

                  {activeTab === 'pix' && (
                    <div className="animate-fade-in bg-cyan/5 p-8 rounded-xl border border-cyan/20">
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="font-medium text-gray-200 text-lg flex items-center">
                          <FaQrcode className="mr-2 text-cyan" /> Pagamento via Pix
                        </h3>
                        <span className="bg-cyan/20 text-cyan text-xs px-3 py-1 rounded-full border border-cyan/30">Instantâneo</span>
                      </div>
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="flex flex-col items-center justify-center">
                          <div className="bg-white p-3 rounded-xl border-2 border-dashed border-cyan/30 mb-4 shadow-lg overflow-hidden relative w-40 h-40">
                            <NextImage
                              src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(getPixCode())}`}
                              alt="QR Code Pix"
                              fill
                              className="object-contain"
                              unoptimized
                            />
                          </div>
                          <p className="text-xs text-gray-400">Escaneie com seu banco</p>
                        </div>
                        <div className="flex flex-col justify-center">
                          <h4 className="font-medium text-gray-300 mb-3 text-sm">Copia e Cola:</h4>
                          <div className="relative mb-3">
                            <div className="bg-black/40 p-3 rounded-lg border border-white/10 font-mono text-[10px] text-gray-400 break-all pr-10">
                              {getPixCode().substring(0, 60)}...
                            </div>
                            <button onClick={copyPixCode} className="absolute top-2 right-2 p-1.5 bg-cyan/20 rounded-md hover:bg-cyan/30 transition-colors">
                              {copiedPixCode ? <FiCheck className="text-green-400 text-sm" /> : <FiCopy className="text-cyan text-sm" />}
                            </button>
                          </div>
                          <button onClick={copyPixCode} className="w-full py-3 bg-cyan text-black hover:bg-cyan-600 font-bold text-sm rounded-lg transition-colors flex items-center justify-center shadow-lg shadow-cyan/20">
                            {copiedPixCode ? 'Código copiado!' : 'Copiar código Pix'}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'boleto' && (
                    <div className="animate-fade-in bg-cyan/5 p-8 rounded-xl border border-cyan/20">
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="font-medium text-gray-200 text-lg flex items-center">
                          <FaBarcode className="mr-2 text-cyan" /> Boleto Bancário
                        </h3>
                        <span className="bg-yellow-500/10 text-yellow-300 text-xs px-3 py-1 rounded-full">Até 3 dias úteis</span>
                      </div>
                      <div className="bg-black/40 p-6 rounded-xl border border-white/10 mb-6">
                        <p className="text-xs text-gray-500 mb-2 uppercase font-bold tracking-wider">Linha Digitável</p>
                        <div className="flex items-center justify-between gap-4">
                          <p className="font-mono text-sm text-gray-300 break-all">{boletoCode}</p>
                          <button onClick={() => { navigator.clipboard.writeText(boletoCode); setCopiedBoleto(true); setTimeout(() => setCopiedBoleto(false), 2000); }} className="flex-shrink-0 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                            {copiedBoleto ? <FiCheck className="text-green-400" /> : <FiCopy className="text-cyan" />}
                          </button>
                        </div>
                      </div>
                      <button onClick={handleDownloadPdf} className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl transition-all flex items-center justify-center gap-2">
                        <FiDownload /> Baixar Boleto em PDF
                      </button>
                    </div>
                  )}

                  {activeTab === 'cartao' && (
                    <div className="animate-fade-in bg-cyan/5 p-8 rounded-xl border border-cyan/20 space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-200 text-lg flex items-center">
                          <FiCreditCard className="mr-2 text-cyan" /> Cartão de Crédito
                        </h3>
                        <div className="flex gap-2">
                          <NextImage src="/visa.png" alt="Visa" width={32} height={20} className="opacity-70 grayscale hover:grayscale-0 transition-all object-contain" />
                          <NextImage src="/mastercard.png" alt="Mastercard" width={32} height={20} className="opacity-70 grayscale hover:grayscale-0 transition-all object-contain" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="relative group">
                          <input type="text" name="number" value={cardData.number} onChange={handleCardInputChange} placeholder="0000 0000 0000 0000" className="w-full pl-10 pr-3 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:border-cyan/50 focus:ring-2 focus:ring-cyan/20 outline-none transition-all" />
                          <FiCreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan" />
                        </div>
                        <input type="text" name="name" value={cardData.name} onChange={handleCardInputChange} placeholder="Nome no Cartão" className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:border-cyan/50 outline-none" />
                        <div className="grid grid-cols-2 gap-4">
                          <input type="text" name="expiry" value={cardData.expiry} onChange={handleCardInputChange} placeholder="MM/AA" className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:border-cyan/50 outline-none" />
                          <input type="text" name="cvv" value={cardData.cvv} onChange={handleCardInputChange} placeholder="CVV" className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:border-cyan/50 outline-none" />
                        </div>
                        <select value={installments} onChange={(e) => setInstallments(Number(e.target.value))} className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:border-cyan/50 outline-none">
                          {[1, 2, 3, 4, 5, 6, 12].map(num => (
                            <option key={num} value={num} className="bg-gray-900 text-white">{num}x de {formatCurrency((descontoAplicado?valorComDesconto:valorOriginal) / num)}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-8">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8 shadow-xl">
                    <h3 className="text-lg font-semibold text-white mb-6">Resumo</h3>
                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between items-center pb-4 border-b border-white/10">
                        <div>
                          <p className="text-white font-medium">{planName}</p>
                          <p className="text-[10px] text-gray-500">Acesso Vitalício</p>
                        </div>
                        <p className="text-white font-medium">{formatCurrency(valorOriginal)}</p>
                      </div>
                      <div className="pt-2">
                        <label className="text-[10px] text-gray-500 block mb-2 font-bold uppercase tracking-widest flex items-center gap-1">
                          <FiTag className="text-cyan" /> Cupom de Desconto
                        </label>
                        <div className="flex gap-2">
                          <input type="text" value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} placeholder="OUT31/10" className="flex-1 min-w-0 bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-cyan/50 outline-none transition-all placeholder:text-gray-700" />
                          <button onClick={handleAplicarVoucher} className="bg-cyan text-black px-4 py-2 rounded-lg text-xs font-bold hover:bg-cyan-600 transition-colors">Aplicar</button>
                        </div>
                        {mensagemVoucher && <p className={`text-[10px] mt-2 font-medium ${tipoMensagemVoucher === 'success' ? 'text-cyan' : 'text-red-400'}`}>{mensagemVoucher}</p>}
                      </div>
                      <div className="flex justify-between pt-6 border-t border-white/10">
                        <span className="text-lg font-bold text-white">Total</span>
                        <div className="text-right">
                          <p className="text-3xl font-black text-cyan leading-tight">{formatCurrency(descontoAplicado ? valorComDesconto : valorOriginal)}</p>
                          {descontoAplicado && <p className="text-[10px] text-green-400 font-bold">VOCÊ ECONOMIZOU {formatCurrency(valorOriginal - valorComDesconto)}!</p>}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-start gap-2">
                        <input id="terms" type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="mt-1 h-3 w-3 rounded border-white/10 bg-black/40 text-cyan cursor-pointer" />
                        <label htmlFor="terms" className="text-[10px] text-gray-500 cursor-pointer hover:text-gray-300 transition-colors">Aceito os termos e condições de uso da plataforma.</label>
                      </div>
                      <button disabled={!termsAccepted || pagamentoFinalizado} onClick={handleFinalizarPagamento} className={`w-full py-4 rounded-xl font-black transition-all duration-500 ${termsAccepted && !pagamentoFinalizado ? 'bg-cyan text-black hover:scale-[1.02] shadow-[0_0_20px_-5px_rgba(0,219,255,0.4)]' : 'bg-white/5 text-gray-600 cursor-not-allowed'}`}>
                        {pagamentoFinalizado ? 'PROCESSANDO...' : activeTab === 'pix' ? 'GERAR PIX' : activeTab === 'boleto' ? 'GERAR BOLETO' : 'FINALIZAR AGORA'}
                      </button>
                      <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 opacity-50">
                        <FiLock className="text-green-500" /> AMBIENTE CRIPTOGRAFADO & SEGURO
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
  );
};

const PaymentPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>GEDS - Finalizar Pagamento</title>
      </Head>
      <Suspense fallback={<div className="h-screen w-full bg-black flex items-center justify-center text-white">Carregando...</div>}>
        <PaymentContent />
      </Suspense>
    </>
  );
};

export default PaymentPage;