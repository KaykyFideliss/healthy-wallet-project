import React from 'react'
import { FaWallet } from "react-icons/fa";
import { MdScreenshotMonitor, MdOutlineInsights } from "react-icons/md";

const Imagesite = () => {
  return (
   <section className="min-h-screen w-full flex flex-col-reverse lg:flex-row items-center justify-center gap-4  px-6 py-10 mt-8 rounded-lg shadow-md mx-auto ">

      {/* IMAGEM ESQUERDA (no celular fica embaixo) */}
      <div className=" w-full lg:w-1/2 items-center flex justify-center ">
        <img
          src="/img/home/pessoa-confusa.png"
          alt="Pessoa confusa com finanças"
          className="rounded-3xl w-full max-w-sm lg:max-w-lg"
        />
      </div>

      {/* TEXTO À DIREITA */}
      <div className="flex flex-col md:flex-col justify-left w-full lg:w-1/2 max-w-lg lg:mr-52 gap-2 md:gap-1 text-center lg:text-left ">
        
        <div className='flex items-end justify-center lg:justify-start mb-2'>
        {/* Título pequeno */}
        <div className="flex items-center  justify-center lg:justify-start h-1 border-primaria border-2 rounded-3xl p-2 w-fit mx-aut lg:mx-0">
          <div className="pr-3">
            <p className="bg-secundaria animate-pulse rounded-full w-2 h-2"></p>
          </div>
          <p className="text-[10px] text-white font-zalando uppercase">Por que nos escolher?</p>
        </div>
        </div>

        {/* Título principal */}
        <h1 className="text-white font-zalando text-2xl lg:text-3xl leading-snug">
          Por que escolher o <span className="font-bold text-primaria">Healthy Wallet</span>?
        </h1>

        {/* Benefícios */}
        <div className="flex flex-col gap-4 mt-4">

          {/* Controle financeiro */}
          <div className="flex items-center gap-4 lg:gap-6 p-3 lg:p-4 rounded-xl justify-center lg:justify-start">
            <div className="flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-primaria rounded-full flex-shrink-0">
              <FaWallet className="text-white text-3xl lg:text-4xl" />
            </div>
            <div className="flex flex-col text-left max-w-xs">
              <h1 className="text-white font-zalando font-bold text-base lg:text-lg">
                Controle financeiro simplificado
              </h1>
              <p className="text-white font-zalando text-xs lg:text-sm">
                Gerencie seus gastos e acompanhe suas metas com clareza e praticidade.
              </p>
            </div>
          </div>

          {/* Visual moderno */}
          <div className="flex items-center gap-4 lg:gap-6 p-3 lg:p-4 rounded-xl justify-center lg:justify-start">
            <div className="flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-primaria rounded-full flex-shrink-0">
              <MdScreenshotMonitor className="text-white text-4xl lg:text-5xl" />
            </div>
            <div className="flex flex-col text-left max-w-xs">
              <h1 className="text-white font-zalando font-bold text-base lg:text-lg">
                Visual moderno e intuitivo
              </h1>
              <p className="text-white font-zalando text-xs lg:text-sm">
                Uma interface pensada para ser bonita, leve e fácil de usar — até nos menores dispositivos.
              </p>
            </div>
          </div>

          {/* Insights */}
          <div className="flex items-center gap-4 lg:gap-6 p-3 lg:p-4 rounded-xl justify-center lg:justify-start">
            <div className="flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-primaria rounded-full flex-shrink-0">
              <MdOutlineInsights className="text-white text-4xl lg:text-5xl" />
            </div>
            <div className="flex flex-col text-left max-w-xs">
              <h1 className="text-white font-zalando font-bold text-base lg:text-lg">
                Insights que fazem diferença
              </h1>
              <p className="text-white font-zalando text-xs lg:text-sm">
                Entenda melhor seus hábitos e descubra onde economizar com relatórios inteligentes.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Imagesite;
