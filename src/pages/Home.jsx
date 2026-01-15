import React from 'react'
import Hero from '../components/home/Hero'
import WhyToUse from '../components/home/WhyToUse'
import Imagesite from '../components/home/Imagesite'
import Planos from '../components/home/Planos'
import CardGuiaDeUsoHome from '../components/home/CardGuiaDeUsoHome'  

const Home = () => {
  return (
    <div className='overflow-x-hidden' >
        <Hero />
      <Imagesite />
      {/* <Planos /> */}
      <CardGuiaDeUsoHome />
    </div>  
  )
}

export default Home
