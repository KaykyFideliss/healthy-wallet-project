import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "boxicons/css/boxicons.min.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuth(); // usuário logado

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  const links = user
    ? [
        { name: "Home", path: "/" },
        { name: "Minhas Contas", path: "/MinhasContas" },
        { name: "Dashboard", path: "/Dashboard" },
        { name: "Settings", path: "/Settings" },

      ]
    : [
        { name: "Home", path: "/" },
        
        { name: "Login", path: "/login" },
      ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      viewport={{ amount: 0.5 }}
      className={`fixed top-0 left-0 w-full h-16 flex justify-center items-center z-40 transition-colors duration-500 ${
        scrolled ? "bg-terciaria backdrop-blur-md" : "bg-transparent"
      }`}
    >
      {/* DESKTOP */}
      <div className="hidden h-16 md:flex justify-between items-center w-full px-8">
        
        <Link to="/">
          <img src="./img/Healthy-logo.png" alt="Logo" className="pt-2 w-24 h-24" />
        </Link>

        <div className="flex gap-8 items-center">
          {links.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-sm tracking-wider text-[#ffbb00] hover:text-secundaria font-zalando"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* MOBILE BUTTON */}
      <button
        className="absolute right-4 md:hidden text-[#ffbb00] text-4xl"
        style={{ zIndex: 60 }}
        onClick={() => setOpen(!open)}
      >
        <i className={open ? "bx bx-x" : "bx bx-menu"}></i>
      </button>

      {/* MOBILE MENU */}
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
            className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center bg-terciaria text-xl z-50"
          >
            {links.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setOpen(false)}
                className="text-2xl mb-4 text-primaria hover:text-[#ffc52c] font-zalando"
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
