import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import 'boxicons/css/boxicons.min.css';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Detecta scroll para mudar o background
  useEffect(() => {
    const handleScroll = () => {
      const scrolly = window.scrollY;
      setScrolled(scrolly > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Faz scroll para o topo sempre que a rota mudar
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      viewport={{ amount: 0.5 }}
      className={`fixed top-0 left-0 w-full h-16 flex justify-center items-center z-40 transition-colors duration-500 ${
        scrolled ? "bg-white/95 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      {/* Links Desktop */}
      <div className="hidden md:flex justify-between items-center w-full px-8 pt-4">
        {/* Logo */}
        <div>
          <Link to="/">
            <img src="/img/logo.png" alt="Foto-logo" className="pt-2 w-20 h-20" />
          </Link>
        </div>

        {/* Links */}
        <div className="flex gap-8 items-center">
          {["Home",  "Sistema", "Download"].map((item) => (
            <Link
              key={item}
              to={`/${item === "Home" ? "" : item.toLowerCase()}`}
              className="text-sm tracking-wider transition-colors text-[#22333b] hover:text-[#6cc7f5] font-zalando"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>

      {/* Botão Mobile */}
      <button
        style={{ zIndex: 60 }}
        className="absolute right-4 md:hidden text-[#22333b] text-4xl"
        onClick={() => setOpen(!open)}
      >
        <i className={open ? "bx bx-x" : "bx bx-menu"}></i>
      </button>

      {/* Menu Mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center bg-white text-xl z-50"
          >
            {["Home", "Sistema", "Download"].map((item) => (
              <Link
                key={item}
                to={`/${item === "Home" ? "" : item.toLowerCase()}`}
                className="hover:text-[#6cc7f5] font-zalando text-[#22333b] text-2xl mb-4"
                onClick={() => {
                  setOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                {item}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
