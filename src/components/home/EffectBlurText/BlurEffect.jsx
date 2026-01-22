import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const BlurEffect = () => {
  const Words = [
    { text: "Healthy Wallet", id: 1 },
    { text: "inteligência", id: 2 },
    { text: "tecnologia", id: 3 }
  ]

  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % Words.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

return (
  <div className="flex justify-center items-center ">
    <p className="text-white font-zalando text-4xl text-center flex flex-wrap justify-center">
      <span className="mr-2">
        Assuma o controle da sua vida financeira com
      </span>

      <span className="relative inline-block min-w-[220px] text-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={Words[index].id}
            initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(10px)", y: -10 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-primaria whitespace-nowrap"
          >
            {Words[index].text}
          </motion.span>
        </AnimatePresence>
      </span>
    </p>
  </div>
)

}

export default BlurEffect
