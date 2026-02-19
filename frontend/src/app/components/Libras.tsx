'use client';

import { useEffect, useCallback } from 'react';
import Script from 'next/script';

const Libras = () => {
  const initVLibras = useCallback(() => {
    const w = window as any;
    if (w.VLibras && typeof w.VLibras.Widget === 'function') {
      const wrapper = document.querySelector('[vw-plugin-wrapper]');

      // VLibras injeta um iframe quando funciona. Se não houver iframe, tentamos inicializar.
      const hasIframe = wrapper?.querySelector('iframe');

      if (wrapper && !hasIframe) {
        try {
          console.log("Tentando inicializar VLibras...");
          new w.VLibras.Widget('https://vlibras.gov.br/app');
        } catch (e) {
          console.error("Erro ao inicializar VLibras:", e);
        }
      }
    }
  }, []);

  useEffect(() => {
    // Tenta inicializar IMEDIATAMENTE se o script já estiver no window
    const timer = setTimeout(initVLibras, 500);

    // Intervalo de verificação para garantir que o widget permaneça ativo em navegações SPA
    const interval = setInterval(initVLibras, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [initVLibras]);

  return (
    <>
      <Script
        src="https://vlibras.gov.br/app/vlibras-plugin.js"
        strategy="lazyOnload" // Mudança para lazyOnload para garantir que o DOM esteja pronto
        onReady={initVLibras}
      />
      <div {...({ 'vw': 'true' } as any)} className="enabled">
        <div {...({ 'vw-access-button': 'true' } as any)} className="active" />
        <div {...({ 'vw-plugin-wrapper': 'true' } as any)}>
          <div className="vw-plugin-top-wrapper" />
        </div>
      </div>
    </>
  );
};

export default Libras;


