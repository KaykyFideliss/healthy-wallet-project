import React from "react";
import { HeroGeometric } from "./Shade-Landing-Hero";
import Imagesite from "./Imagesite";

const Hero = () => {
  return (
    <>
      <HeroGeometric
        title1="Bem-vindo ao"
        title2="HEALTHY WALLET"
        description="Sua plataforma completa para gestão financeira inteligente e controle total do seu dinheiro."
      />

      <Imagesite />
    </>
  );
};

export default Hero;
