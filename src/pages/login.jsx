import React, { useState } from 'react';
import { MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="h-screen w-screen overflow-x-hidden flex flex-col md:flex-row items-center justify-center">

      {/* LADO ESQUERDO */}
      <div className="hidden md:flex md:w-1/2 ml-14 h-[800px] md:h-[600px] bg-gradient-to-tr rounded-xl bg-azul-style items-center justify-center p-6 relative">
        <video
          src="/img/healthy-logo.png"
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover rounded-xl"
        />
        <div className="z-10 text-center px-4"></div>
      </div>

      {/* LADO DIREITO */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-6">
        <div className="w-full max-w-sm">

          <div className="-m-10">
            <img className="w-60 h-60 mx-auto" src="img/Healthy-logo.png" alt="Logo" />
          </div>

          <h2 className="text-3xl text-white font-zalando font-semibold mb-5 text-center">
            LOGIN
          </h2>

          <form onSubmit={(e) => e.preventDefault()}>

            {/* EMAIL */}
            <div className="relative mb-6">

              {/* BORDA DO INPUT (efeito notch) */}
              <div className="
    absolute inset-0 rounded-lg border-2 border-yellow-400 pointer-events-none
  ">
              </div>

              {/* NOTCH (quebra da borda atrás da label) */}
              <div className="
    absolute -top-3 left-3 px-1 bg-black
    transition-all duration-300
    peer-placeholder-shown:bg-transparent
    peer-placeholder-shown:px-0
    peer-placeholder-shown:left-3
  ">
                <span
                  className="
        text-yellow-400 font-zalando text-xs
        transition-all duration-300
        peer-placeholder-shown:text-sm
        peer-placeholder-shown:opacity-0
        peer-focus:opacity-100
      "
                >
                  EMAIL
                </span>
              </div>

              {/* INPUT */}
              <input
                required
                type="email"
                placeholder=" "
                className="
      peer bg-black text-primaria w-full rounded-lg px-3 py-3
      focus:outline-none
    "
              />

              {/* ÍCONE */}
              <MdEmail className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-400" />
            </div>


           {/* SENHA */}
<div className="relative mb-6">

  {/* BORDA DO INPUT (efeito notch) */}
  <div className="
    absolute inset-0 rounded-lg border-2 border-yellow-400 pointer-events-none
  "></div>

  {/* NOTCH */}
  <div className="
    absolute -top-3 left-3 px-1 bg-black
    transition-all duration-300
    peer-placeholder-shown:bg-transparent
    peer-placeholder-shown:px-0
    peer-placeholder-shown:left-3
  ">
    <span
      className="
        text-yellow-400 font-zalando text-xs
        transition-all duration-300
        peer-placeholder-shown:text-sm
        peer-placeholder-shown:opacity-0
        peer-focus:opacity-100
      "
    >
      SENHA
    </span>
  </div>

  {/* INPUT */}
  <input
    required
    type={showPassword ? "text" : "password"}
    placeholder=" "
    className="peer bg-black text-primaria w-full rounded-lg px-3 py-3 focus:outline-none"
  />

  {/* ÍCONE OLHO */}
  <div
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-yellow-400"
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </div>
</div>


            {/* BOTÃO */}
            <button
              type="submit"
              className="w-full bg-secundaria hover:bg-primaria text-primaria hover:text-secundaria font-zalando py-2 rounded-lg transition-colors"
            >
              Entrar
            </button>

            <div className="text-center font-zalando text-secundaria text-sm mt-2">
              Não tem conta ?{" "}
              <a href="/cadastro" className="text-primaria font-zalando font-semibold hover:underline">
                Cadastre-se
              </a>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
