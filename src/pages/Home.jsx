import React from 'react'
import Hero from '../components/home/Hero'
import WhyToUse from '../components/home/WhyToUse'
import Imagesite from '../components/home/Imagesite'
import Planos from '../components/home/Planos'
import CardGuiaDeUsoHome from '../components/home/CardGuiaDeUsoHome'  
import Frase from '../components/home/Frase'
import Footer from '../components/Footer'
const Home = () => {
  return (
    <div className='overflow-x-hidden' >
        <Hero />
      <Imagesite />
      {/* <Planos /> */}
      <CardGuiaDeUsoHome />
      <Frase />
          <Footer  />

    </div>  
  )
}

export default Home
