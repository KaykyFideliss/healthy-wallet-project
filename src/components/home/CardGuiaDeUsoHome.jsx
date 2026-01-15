import React from "react"
import { Card, CardFooter, Image, Button } from "@heroui/react"
import { IoIosArrowForward } from "react-icons/io"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

import Organização from "/img/home/Cards/organização.jpg"
import Postit from "/img/home/Cards/Post-it.png"
import Guide from "/img/home/Cards/Guideimgg.png"

/* =====================
   VARIANTS
===================== */

const fadeUpBlur = {
  hidden: { opacity: 0, y: 60, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    y: 60,
    filter: "blur(12px)",
    transition: { duration: 0.6, ease: "easeIn" }
  }
}

const containerCards = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 }
  }
}

const itemCard = {
  hidden: { opacity: 0, y: 60, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    y: 60,
    filter: "blur(12px)",
    transition: { duration: 0.5, ease: "easeIn" }
  }
}

/* =====================
   COMPONENT
===================== */

const CardGuiaDeUsoHome = () => {
  const navigate = useNavigate()

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 gap-10 bg-terciaria overflow-hidden">
      
      {/* TÍTULO */}
      <motion.div
        variants={fadeUpBlur}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.3 }}
        className="flex flex-col items-center gap-3 text-center"
      >
        <div className="flex items-center gap-3 border-primaria border-2 rounded-3xl px-4 py-1 w-fit">
          <span className="bg-secundaria animate-pulse rounded-full w-2 h-2" />
          <p className="text-[10px] text-white font-zalando uppercase">
            Entenda cada função
          </p>
        </div>

        <h1 className="text-white font-zalando text-3xl sm:text-4xl md:text-5xl font-semibold">
          Domine todas as páginas do{" "}
          <span className="text-secundaria">Healthy Wallet</span>
        </h1>
      </motion.div>

      {/* GRID */}
      <motion.div
        variants={containerCards}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="max-w-[1200px] mx-auto grid grid-cols-12 gap-4 px-4 sm:px-6 overflow-hidden"
      >
        {/* CARD 1 */}
        <motion.div variants={itemCard} className="col-span-12 sm:col-span-4 overflow-hidden">
          <div className="transition-transform duration-700 hover:scale-[1.02]">
            <Card className="h-[300px] border border-white/10 rounded-lg overflow-hidden shadow-md shadow-black/25 relative">
              <Image removeWrapper className="w-full h-full object-cover" src={Postit} />
              <CardFooter className="absolute bottom-0 left-0 w-full bg-black/40 flex justify-between z-10">
                <p className="text-white font-zalando text-tiny">Crie sua tabela</p>
                <Button size="sm" color="primary" onClick={() => navigate("/MinhasContas")}>
                  <IoIosArrowForward className="h-6 w-6 text-white" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </motion.div>

        {/* CARD 2 */}
        <motion.div variants={itemCard} className="col-span-12 sm:col-span-4 overflow-hidden">
          <div className="transition-transform duration-700 hover:scale-[1.02]">
            <Card className="h-[300px] border border-white/10 rounded-lg overflow-hidden shadow-md shadow-black/25 relative">
              <Image removeWrapper className="w-full h-full object-cover" src={Organização} />
              <CardFooter className="absolute bottom-0 left-0 w-full bg-black/40 justify-center z-10">
                <p className="text-white font-zalando text-tiny">
                  Com apenas alguns cliques
                </p>
              </CardFooter>
            </Card>
          </div>
        </motion.div>

        {/* CARD 3 */}
        <motion.div variants={itemCard} className="col-span-12 sm:col-span-4 overflow-hidden">
          <div className="transition-transform duration-700 hover:scale-[1.02]">
            <Card className="h-[300px] border border-white/10 rounded-lg overflow-hidden shadow-md shadow-black/25 relative">
              <Image
                removeWrapper
                className="w-full h-full object-cover"
                src="https://heroui.com/images/card-example-2.jpeg"
              />
              <CardFooter className="absolute bottom-0 left-0 w-full bg-black/40 flex justify-between z-10">
                <p className="text-white font-zalando text-tiny">
                  Comece a organizar sua vida
                </p>
                <Button size="sm" color="primary" onClick={() => navigate("/Dashboard")}>
                  <IoIosArrowForward className="h-6 w-6 text-white" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </motion.div>

        {/* ÚLTIMO CARD */}
        <motion.div variants={fadeUpBlur} className="col-span-12 overflow-hidden">
          <div className="transition-transform duration-700 hover:scale-[1.02]">
            <Card className="h-[400px] border border-white/10 rounded-lg overflow-hidden shadow-lg shadow-black/30 relative">
              <Image removeWrapper className="w-full h-full object-cover" src={Guide} />
              <CardFooter className="absolute bottom-0 left-0 w-full bg-black/40 flex justify-between z-10">
                <p className="text-white font-zalando text-tiny">
                  Acesse a página Guia de Uso para tirar todas as suas dúvidas
                </p>
                <Button size="sm" color="primary" onClick={() => navigate("/GuiaDeUso")}>
                  <IoIosArrowForward className="h-6 w-6 text-white" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default CardGuiaDeUsoHome
