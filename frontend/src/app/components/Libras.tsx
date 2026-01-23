/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect } from 'react';
import Script from 'next/script';

const Libras = () => {
  useEffect(() => {
    const w = window as any;
    if (w.VLibras && typeof w.VLibras.Widget === 'function') {
      if (!document.querySelector('.vw-plugin-wrapper')) {
        new w.VLibras.Widget('https://vlibras.gov.br/app');
      }
    }
  }, []);

  return (
    <>
      <Script
        src="https://vlibras.gov.br/app/vlibras-plugin.js"
        strategy="afterInteractive"
        onReady={() => {
          const w = window as any;
          if (w.VLibras && typeof w.VLibras.Widget === 'function') {
            // Verifica se já não foi inicializado para evitar duplicatas
            if (!w.vlibrasInitialized) {
              new w.VLibras.Widget('https://vlibras.gov.br/app');
              w.vlibrasInitialized = true;
            }
          }
        }}
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