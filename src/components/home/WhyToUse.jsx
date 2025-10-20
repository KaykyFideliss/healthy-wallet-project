import React from 'react'
import { useNavigate } from 'react-router-dom';

const WhyToUse = () => {
  const navigate = useNavigate();

  const BtnLeanMore = () => { navigate('/MinhasContas'); }

  return (
    <section className='w-full min-h-screen flex items-center justify-center'>
      <div className='w-full max-w-7xl px-6 py-8'>
        
        <div className='text-center mb-12'>
          <h1 className="bg-clip-text text-3xl font-bold sm:text-4xl md:text-6xl text-white font-zalando [text-shadow:0_0_10px_rgba(255,255,255,0.6)]">
            Por que usar o Healthy Wallet ?
          </h1>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-12 px-4">
          <div className='w-full md:w-1/2'>
            <p className='font-zalando text-lg md:text-xl lg:text-xl text-white text-justify leading-relaxed mb-6'>
              O Healthy Wallet foi criado para ajudar você a ter um relacionamento mais saudável com o seu dinheiro.
              Aqui, você controla seus gastos, entende para onde seu dinheiro vai e aprende a equilibrar suas finanças de forma simples e inteligente.
            </p>
            
            <p className='font-zalando text-lg md:text-xl lg:text-xl text-white text-justify leading-relaxed mb-8'>
              Com relatórios visuais, metas personalizadas e um acompanhamento claro do seu progresso, o Healthy Wallet transforma o controle financeiro em um hábito fácil e motivador.
            </p>

            <div className='text-center md:text-left'>
              <button
                onClick={BtnLeanMore}
                className="bg-[#FFCC28] font-zalando text-black px-8 py-4 rounded-xl font-semibold hover:bg-yellow-400 transition shadow-lg shadow-yellow-400/50 hover:shadow-yellow-400/70 hover:scale-105 transform w-full md:w-auto text-lg"
              >
                Saber Mais
              </button>
            </div>
          </div>
          
          <div className='w-full md:w-1/2 flex justify-center'>
            <img
              className="object-cover rounded-xl w-full max-w-md lg:max-w-lg shadow-2xl"
              src="/img/home/Img-Home.png"
              alt="Imagem ilustrativa"
            />
          </div>
        </div>

      </div>
    </section>
  )
}

export default WhyToUse