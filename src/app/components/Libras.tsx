'use client';
import { useEffect } from 'react';

const Libras = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.async = true;
    script.onload = () => {
      if (window.VLibras) {
        new window.VLibras.Widget('https://vlibras.gov.br/app');
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div {...{ 'vw': 'true' }} className="enabled fixed bottom-5 right-24 z-[100]">
      <div
        {...{ 'vw-access-button': 'true' }}
        className="active rounded-full shadow-[0_0_15px_rgba(0,219,255,0.4)] border border-cyan/30 bg-black/50 backdrop-blur-sm"
      />
      <div {...{ 'vw-plugin-wrapper': 'true' }}>
        <div className="vw-plugin-top-wrapper" />
      </div>
    </div>
  );
};

export default Libras;
