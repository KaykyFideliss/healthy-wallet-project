import React from 'react'
import { motion } from "framer-motion";
import { HeroGeometric } from '../components/home/guia/Shade-Landing-GuiaCopy';
import CardPrincipais from "../components/home/guia/grafics/CardPrincipais"
import GraficPizza from '../components/home/guia/grafics/GraficPizza';
import BarChartGuia from '../components/home/guia/grafics/BarChartGuia';
import CardSalario from '../components/home/guia/grafics/CardSalario';
import NaoPagas from '../components/home/guia/grafics/NaoPagas';
import Footer from '../components/Footer';


const GuiaDeUso = () => {
  return (
    <div>

      <HeroGeometric
        title1="saiba como usar o"
        title2="HEALTHY WALLET"
        description=" Descubra como o Healthy Wallet pode transformar sua gestão financeira pessoal com facilidade e eficiência."
      />

      <section >
      

         

       
              <CardPrincipais />
               {/* TRANSIÇÃO DE COR */}
              <div className="h-36 bg-gradient-to-b from-[#030303] to-terciaria" />
              <GraficPizza />
              <BarChartGuia />
              <CardSalario />
              <NaoPagas />
              {/* TRANSIÇÃO DE COR */}
              <div className="h-32 bg-gradient-to-b from-black to-[#030303]" />
              <Footer />
      
      </section>


    </div>
  )
}

export default GuiaDeUso
