import React from 'react'
import { FaCheck } from "react-icons/fa"
import { ImCross } from "react-icons/im";
import { HeroGeometricPlano } from "./Shade-Landing-planos";
const Planos = () => {
  return (
    <div>
     

      <section className='w-full min-h-screen py-20 relative'>
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <HeroGeometricPlano />
        </div>

            
        {/* Header Section */}
        <div className='items-center justify-center flex flex-col mt-20 gap-4 mb-16'>
          
          <div className="flex items-center justify-center h-1 border-primaria border-2 rounded-3xl p-2 w-fit mx-auto">
            <div className="pr-3">
              <p className="bg-secundaria animate-pulse rounded-full w-2 h-2"></p>
            </div>
            <p className="text-[10px] text-white font-zalando uppercase">Escolha seu Plano</p>
          </div>
          <h1 className='font-semibold font-zalando text-xl text-white text-center md:text-2xl lg:text-5xl'>
            Melhore a sua experiência com <span className='text-primaria'>Healthy Wallet</span>
          </h1>
        </div>

        {/* CARDS PLANOS */}
        <div className='flex flex-col lg:flex-row justify-center items-center gap-8 px-8'>
          
          {/* PLANO STARTER */}
          <div className='bg-[#000000] top-0 md:top-5 lg:top-5 border-primaria border-2 w-full max-w-sm rounded-3xl p-8 relative'>
            {/* <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'> */}
              {/* <span className='bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full'> */}
                {/* Save 15% */}
              {/* </span> */}
            {/* </div> */}
            
            <div className='text-center mb-8'>
              <p className='text-xs text-white font-zalando'>PLANO</p>
              <h2 className='font-zalando font-bold text-2xl text-white'>GRATIS</h2>
              <p className='text-sm mt-3 font-zalando text-white'>Perfeito para gerenciar seus gastos e acompanhe suas metas</p>
            </div>

            <div className='text-center mb-8'>
              <span className='text-5xl font-bold text-white font-number'>$0</span>
              <span className='text-white font-zalando'>/mês</span>
            </div>

            <div className='space-y-4 mb-8'>
                <p className=' text-sm line-through text-white font-zalando flex items-center gap-2'>
                
                
              </p>
                <p className='text-sm text-white font-zalando flex items-center gap-2'>
                <FaCheck className='text-secundaria' />
                1 Tabela disponivel
              </p>

              <p className='text-sm text-white font-zalando flex items-center gap-2'>
                <FaCheck className='text-secundaria' />
                 Dashboard simples sem gráficos
              </p>

                <p className='text-sm text-white font-zalando flex items-center gap-2'>
                <FaCheck className='text-secundaria' />
                Relatórios mensais básicos
              </p>

                <p className=' text-sm line-through text-white font-zalando flex items-center gap-2'>
                <ImCross className='text-red-600' />
                Dashboard simples
              </p>
                <p className=' text-sm line-through text-white font-zalando flex items-center gap-2'>
                <ImCross className='text-red-600' />
                Dashboard simples
              </p>
                <p className=' text-sm line-through text-white font-zalando flex items-center gap-2'>
                <ImCross className='text-red-600' />
                Dashboard simples
              </p> 
             
            </div>

            <button className='w-full bg-primaria font-zalando text-white dari py-3 rounded-lg font-semibold hover:bg-secundaria transition duration-200'>
              Começar Agora
            </button>
          </div>

          {/* PLANO PRO - DESTAQUE */}
            <div className='bg-[#000000]  top-0 md:top-5 lg:-top-3  border-primaria border-2 w-full max-w-sm rounded-3xl p-8 relative'>
            {/* <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'> */}
              {/* <span className='bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full'> */}
                {/* Save 15% */}
              {/* </span> */}
            {/* </div> */}

            <div className='text-center mb-8'>
              <p className='text-xs text-white font-zalando'>PLANO</p>
              <h2 className='font-zalando font-bold text-2xl text-white'>PREMIUM</h2>
              <p className='text-sm mt-1 font-zalando text-white'>Para você que quer empreender </p>
            </div>

            <div className='text-center mb-8'>
              <span className='text-5xl font-bold text-white font-number'>$49,99</span>
              <span className='text-white font-zalando'>/mês</span>
            </div>

            <div className='space-y-4 mb-8'>
                <p className='text-sm text-white font-zalando flex items-center gap-2'>
                <FaCheck className='text-secundaria' />
                 Tabelas Ilimitadas
              </p>

              <p className='text-sm text-white font-zalando flex items-center gap-2'>
                <FaCheck className='text-secundaria' />
                 Dashboard com gráficos avançados
              </p>

                <p className='text-sm text-white font-zalando flex items-center gap-2'>
                <FaCheck className='text-secundaria' />
                Relatórios mensais detalhados
              </p>

                <p className=' text-sm  text-white font-zalando flex items-center gap-2'>
                <FaCheck className='text-secundaria' />
                Avisos de vencimento personalizados
              </p>
             
             <p className=' text-sm  text-white font-zalando flex items-center gap-2'>
                <FaCheck className='text-secundaria' />
               IA Financeira 
              </p>
               <p className=' text-sm  text-white font-zalando flex items-center gap-2'>
                <FaCheck className='text-secundaria' />
                Consultor Financeiro Personalizado
              </p> 
                  <p className=' text-sm  text-white font-zalando flex items-center gap-2'>
                <FaCheck className='text-secundaria' />
                Pagina de investimento com IA 
              </p>
            </div>

            <button className='w-full bg-primaria font-zalando text-white dari py-3 rounded-lg font-semibold hover:bg-secundaria transition duration-200'>
              Começar Agora
            </button>
          </div>

          {/* PLANO EXPERT */}
           <div className='bg-[#000000]  top-0 md:top-5 lg:top-5 border-primaria border-2 w-full max-w-sm rounded-3xl p-8 relative'>
            {/* <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'> */}
              {/* <span className='bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full'> */}
                {/* Save 15% */}
              {/* </span> */}
            {/* </div> */}
            
            <div className='text-center mb-8'>
              <p className='text-xs text-white font-zalando'>PLANO</p>
              <h2 className='font-zalando font-bold text-2xl text-white'>MEDIO</h2>
              <p className='text-sm mt-1 font-zalando text-white'>Perfeito para iniciar uma carreira financeira </p>
            </div>

            <div className='text-center mb-8'>
              <span className='text-5xl font-bold text-white font-number'>$19,99</span>
              <span className='text-white font-zalando'>/mês</span>
            </div>

            <div className='space-y-4 mb-8'>
                <p className='text-sm text-white font-zalando flex items-center gap-2'>
                <FaCheck className='text-secundaria' />
                3 Tabela disponivel
              </p>

              <p className='text-sm text-white font-zalando flex items-center gap-2'>
                <FaCheck className='text-secundaria' />
                 Dashboard com gráficos
              </p>

                <p className='text-sm text-white font-zalando flex items-center gap-2'>
                <FaCheck className='text-secundaria' />
                Relatórios mensais elaborados
              </p>

                <p className=' text-sm  text-white font-zalando flex items-center gap-2'>
                <FaCheck className='text-secundaria' />
                Avisos de vencimento
              </p>
             
                <p className=' text-sm line-through text-white font-zalando flex items-center gap-2'>
                <ImCross className='text-red-600' />
               IA Financeira
              </p>
                <p className=' text-sm line-through text-white font-zalando flex items-center gap-2'>
                <ImCross className='text-red-600' />
                Consultor Financeiro Personalizado
              </p> 
                  <p className=' text-sm line-through text-white font-zalando flex items-center gap-2'>
                <ImCross className='text-red-600' />
                Pagina de investimento com IA 
              </p>
            </div>

            <button className='w-full bg-primaria font-zalando text-white dari py-3 rounded-lg font-semibold hover:bg-secundaria transition duration-200'>
              Começar Agora
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Planos