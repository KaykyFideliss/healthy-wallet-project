import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const logoSrc = "img/Healthy-logo.png";

export default function Footer() {
  return (
    <footer className="font-zalando overflow-x-hidden  rounded-lg">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex flex-col md:flex-row gap-10 md:gap-20 justify-between items-center md:items-start text-center md:text-left">

          {/* LINKS */}
          <div className="flex flex-col gap-2">
            <h1 className="text-white text-sm font-semibold">LINKS RÁPIDOS</h1>

            <Link to="/" className="text-white hover:scale-105 hover:text-primaria text-sm ">
              HOME
            </Link>
            <Link to="/GuiaDeUso" className="text-white hover:scale-105 hover:text-primaria text-sm ">
              GUIA DE USO
            </Link>
            <Link to="/MinhasContas" className="text-white hover:scale-105 hover:text-primaria text-sm ">
              MINHAS CONTAS
            </Link>
            <Link to="/Dashboard" className="text-white hover:scale-105 hover:text-primaria text-sm ">
              DASHBOARD
            </Link>
            <Link to="/settings" className="text-white hover:scale-105 hover:text-primaria text-sm">
              SETTINGS
            </Link>
          </div>

          {/* LOGO */}
          <div className="flex flex-col items-center gap-4 max-w-xs">
            <img
              src={logoSrc}
              alt="Healthy Wallet Logo"
              className="h-24 md:h-32"
            />
            <p className="text-white text-xs md:text-sm text-center">
              Plataforma focada em organização financeira, clareza e decisões inteligentes
            </p>
          </div>

          {/* CONTATOS */}
          <div className="flex flex-col gap-4 mx-20 md:mx-0">
            <h1 className="text-white text-sm font-semibold">CONTATOS</h1>

            <a
              href="https://www.linkedin.com/in/kaykyfidelis/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white hover:scale-105 hover:text-primaria"
            >
              <FaLinkedin className="h-5 w-5" />
              <span className="text-sm">LINKEDIN</span>
            </a>

            <a
              href="https://github.com/KaykyFideliss"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white hover:scale-105 hover:text-primaria"
            >
              <FaGithub className="h-5 w-5" />
              <span className="text-sm">GITHUB</span>
            </a>

            <a
              href="https://www.instagram.com/fidelizx.74/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white hover:scale-105 hover:text-primaria"
            >
              <FaInstagram className="h-5 w-5" />
              <span className="text-sm">INSTAGRAM</span>
            </a>
          </div>
        </div>

        {/* DIVISÓRIA */}
        <hr className="border-white/20 my-8" />

        {/* RODAPÉ FINAL */}
        <div className="flex justify-between gap-2 text-xs  flex-wrap">
          <a href="https://portifolio-kayky-fidelis.vercel.app " target="_blank" rel="noopener noreferrer" className="text-white hover:text-primaria hover:scale-105">
          <span>Desenvolvido por Kayky Fidelis</span>
          </a>
          <span className="text-white">© 2026 Healthy Wallet. All rights reserved.</span>
        </div>

        {/* DIVISÓRIA */}
        <hr className="border-white/20 my-8" />

        {/* TEXTO COM FADE */}
        <div className="relative flex justify-center overflow-visible">
          <h1 className="
            relative z-10 text-white font-zalando font-bold
            whitespace-nowrap leading-none text-3xl md:text-5xl lg:text-[110px]
            drop-shadow-[0_-4px_10px_rgba(0,0,0,0.6)]
            drop-shadow-[0_-14px_32px_rgba(0,0,0,0.45)]
            drop-shadow-[0_-30px_70px_rgba(0,0,0,0.35)]
          ">
            HEALTHY WALLET
          </h1>

          <div className="
            pointer-events-none absolute left-1/2 -translate-x-1/2
            top-[-0.4em] md:top-[-0.6em] lg:top-[-0.9em]
            w-[110%] lg:w-[120%]
            h-[0.8em] md:h-[1.2em] lg:h-[1.6em]
            bg-gradient-to-b from-terciaria via-black to-transparent
            blur-xl z-20
          " />
        </div>

      </div>
    </footer>
  );
}
