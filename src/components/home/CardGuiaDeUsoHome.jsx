import React from 'react'
import { Card, CardFooter, Image, Button } from "@heroui/react"
import { IoIosArrowForward } from "react-icons/io"
import { motion } from "framer-motion"

import Organização from "/img/home/Cards/organização.jpg"
import Postit from "/img/home/Cards/Post-it.png"
import Guide from "/img/home/Cards/Guideimgg.png"

import { useNavigate } from "react-router-dom";

/* =====================
   VARIANTS
===================== */

const fadeUpBlur = {
  hidden: {
    opacity: 0,
    y: 60,
    filter: "blur(12px)"
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: 60,
    filter: "blur(12px)",
    transition: {
      duration: 0.6,
      ease: "easeIn"
    }
  }
}

const containerCards = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemCard = {
  hidden: {
    opacity: 0,
    y: 60,
    filter: "blur(12px)"
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: 60,
    filter: "blur(12px)",
    transition: {
      duration: 0.5,
      ease: "easeIn"
    }
  }
}



const CardGuiaDeUsoHome = () => {
  const navigate = useNavigate();
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center py-20 flex-col gap-10 bg-terciaria">

      {/* =====================
          TÍTULO
      ===================== */}
      <motion.div
        variants={fadeUpBlur}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.3 }}
        className="flex flex-col items-center gap-3 justify-center"
      >
        <div className="flex items-center justify-center h-1 border-primaria border-2 rounded-3xl p-2 w-fit">
          <div className="pr-3">
            <p className="bg-secundaria animate-pulse rounded-full w-2 h-2" />
          </div>
          <p className="text-[10px] text-white font-zalando uppercase">
            Entenda cada Função
          </p>
        </div>

        <h1 className="text-white font-zalando text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 text-center">
          Domine todas as páginas do{" "}
          <span className="text-secundaria">Healthy Wallet</span>
        </h1>
      </motion.div>

      {/*GRID DE CARDS*/}
      <motion.div
        variants={containerCards}
        initial="hidden"
        whileInView="visible"
        exit="hidden"
        viewport={{ once: false, amount: 0.2 }}
        className="max-w-[1200px] mx-auto gap-4 grid grid-cols-12 px-4 sm:px-6"
      >
        {/* CARD 1 */}
        <motion.div variants={itemCard} className="col-span-12 sm:col-span-4">
          <Card className="h-[300px] z-10 border border-white/10 rounded-[10px] overflow-hidden shadow-md shadow-black/25 transition-all duration-700 hover:scale-[1.02] hover:shadow-xl">
            <Image removeWrapper className="w-full h-full object-cover" src={Postit} />
            <CardFooter className="absolute bottom-0 left-0 w-full bg-black/40 justify-between z-10">
              <p className="text-white font-zalando text-tiny">Crie sua tabela</p>
              <Button size="sm" color="primary" onClick={() => navigate("/MinhasContas")}>
                <IoIosArrowForward className="h-6 w-6 text-white " />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        {/* CARD 2 */}
        <motion.div variants={itemCard} className="col-span-12 sm:col-span-4">
          <Card className="h-[300px] border border-white/10 rounded-[10px] overflow-hidden shadow-md shadow-black/25 transition-all duration-700 hover:scale-[1.02] hover:shadow-xl">
            <Image removeWrapper className="w-full h-full object-cover" src={Organização} />
            <CardFooter className="absolute bottom-0 left-0 w-full bg-black/40 justify-center z-10">
              <p className="text-white font-zalando text-tiny">
                Com apenas alguns cliques
              </p>
            </CardFooter>
          </Card>
        </motion.div>

        {/* CARD 3 */}
        <motion.div variants={itemCard} className="col-span-12 sm:col-span-4">
          <Card className="h-[300px] border border-white/10 rounded-[10px] overflow-hidden shadow-md shadow-black/25 transition-all duration-700 hover:scale-[1.02] hover:shadow-xl">
            <Image
              removeWrapper
              className="w-full h-full object-cover"
              src="https://heroui.com/images/card-example-2.jpeg"
            />
            <CardFooter className="absolute bottom-0 left-0 w-full z-10 bg-black/40 justify-between ">
              <p className="text-white font-zalando text-tiny">
                Comece a organizar sua vida
              </p>
              <Button size="sm" color="primary" onClick={() => navigate("/Dashboard")}>
                <IoIosArrowForward className="h-6 w-6 text-white z-20" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        {/* =====================
            ÚLTIMO CARD
        ===================== */}
        <motion.div
          variants={fadeUpBlur}
          className="col-span-12"
        >
          <Card className="h-[400px] border border-white/10 rounded-[10px] overflow-hidden shadow-lg shadow-black/30 transition-all duration-700 hover:scale-[1.02] hover:shadow-xl ">
            <Image removeWrapper className="w-full h-full object-cover" src={Guide} />
            <CardFooter className="absolute bottom-0 left-0 w-full bg-black/40 justify-between z-10">
              <p className="text-white font-zalando text-tiny">
                Acesse a página Guia de Uso para tirar todas as suas dúvidas
              </p>
              <Button size="sm" color="primary" onClick={() => navigate("/GuiaDeUso")}> 
                <IoIosArrowForward className="h-6 w-6 text-white" />
                
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default CardGuiaDeUsoHome
