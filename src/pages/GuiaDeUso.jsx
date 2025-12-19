import React from 'react'
import { motion } from "framer-motion";
import { HeroGeometric } from '@/components/home/guia/Shade-Landing-Guia';
import CardPrincipais from "../components/home/guia/grafics/CardPrincipais"
import GraficPizza from '../components/home/guia/grafics/GraficPizza';
import BarChartGuia from '../components/home/guia/grafics/BarChartGuia';
import CardSalario from '../components/home/guia/grafics/CardSalario';


const GuiaDeUso = () => {
  return (
    <div>

      <HeroGeometric
        title1="saiba como usar o"
        title2="HEALTHY WALLET"
        description=" Descubra como o Healthy Wallet pode transformar sua gestão financeira pessoal com facilidade e eficiência."
      />

      <section className=''>
      

         

       
              <CardPrincipais />
              <GraficPizza />
              <BarChartGuia />
              <CardSalario />
      
      </section>


    </div>
  )
}

export default GuiaDeUso
