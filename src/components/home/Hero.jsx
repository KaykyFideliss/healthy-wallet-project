// Hero.jsx
import React from 'react';
import DarkVeil from './DarkVeil';

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* BG animado */}
      <div className="absolute inset-0 z-0">
        <DarkVeil
          hueShift={55}            // muda a cor
          noiseIntensity={0.02}    // ruído sutil
          scanlineIntensity={0.1}  // efeito "TV"
          speed={1.9}              // velocidade
          warpAmount={0.2}         // distorção
          resolutionScale={1.4}
        />
      </div>

      {/* Conteúdo do Hero */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white">
       <p className="text-xl text-primaria font-zalando">Bem-vindo ao </p>
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold font-zalando mb-4 text-primaria ">HEALTHY WALLET</h1>
        
      </div>
    </section>
  );
};

export default Hero;