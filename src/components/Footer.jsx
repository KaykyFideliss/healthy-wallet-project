import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

const navigation = {
  main: [
    { name: "About", href: "#" },
    { name: "Services", href: "#" },
    { name: "Projects", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Contact", href: "#" },
  ],
  social: [
    { name: "GitHub", href: "#", icon: FaGithub },
    { name: "LinkedIn", href: "#", icon: FaLinkedin },
    { name: "Instagram", href: "#", icon: FaInstagram },
    { name: "Twitter", href: "#", icon: FaXTwitter },
  ],

}

const logoSrc = 'img/Healthy-logo.png';

export default function Footer() {
  return (
  <footer className="font-zalando overflow-x-hidden rounded-lg ">
  <div className="max-w-7xl mx-auto px-6 py-10">
    
    <div className="flex flex-col md:flex-row gap-10 md:gap-20 justify-between items-center md:items-start text-center md:text-left">
      
      {/* LINKS */}
      <div className="flex flex-col gap-2">
        <h1 className="text-white text-sm font-semibold">LINKS RÁPIDOS</h1>
        <p className="text-white text-sm hover:opacity-80 cursor-pointer">HOME</p>
        <p className="text-white text-sm hover:opacity-80 cursor-pointer">GUIA DE USO</p>
        <p className="text-white text-sm hover:opacity-80 cursor-pointer">MINHAS CONTAS</p>
        <p className="text-white text-sm hover:opacity-80 cursor-pointer">DASHBOARD</p>
        <p className="text-white text-sm hover:opacity-80 cursor-pointer">SETTINGS</p>
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

        <a href="#" className="flex items-center gap-2 hover:opacity-80">
          <FaLinkedin className="text-white h-5 w-5" />
          <span className="text-white text-sm">LINKEDIN</span>
        </a>

        <a href="#" className="flex items-center gap-2 hover:opacity-80">
          <FaGithub className="text-white h-5 w-5" />
          <span className="text-white text-sm">GITHUB</span>
        </a>

        <a href="#" className="flex items-center gap-2 hover:opacity-80">
          <FaInstagram className="text-white h-5 w-5" />
          <span className="text-white text-sm">INSTAGRAM</span>
        </a>
      </div>
    </div>

    {/* DIVISÓRIA */}
    <hr className="border-white/20 my-8" />

    {/* RODAPÉ FINAL */}
    <div className="flex justify-between gap-2 text-center text-xs text-white">
      <a href="#" className="hover:opacity-80">Desenvolvido por Kayky Fidelis </a>
      <p>© 2026 Healthy Wallet. All rights reserved.</p>
    </div>

  </div>
</footer>

  )
}
