import React from 'react';
import { MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginForm = () => {
  return (
    <div className="h-screen w-screen flex flex-col md:flex-row items-center justify-center">

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

      {/* LADO DIREITO (FORM FRONT-END) */}
      <div className=" flex w-full md:w-1/2 items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <img className="w-60 h-30 mx-auto mb-4" src="img/Healthy-logo.png" alt="Logo" />

          <h2 className="text-3xl text-primaria font-zalando font-semibold mb-6 text-center">
            Login
          </h2>

          {/* FORMULÁRIO SEM BACK-END */}
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>

            {/* EMAIL */}
            <div className="relative">
              <input
                required
                type="email"
                placeholder=" "
                className=" bg-black text-primaria w-full border border-yellow-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2  peer"
              />

              <label className="text-white">
                EMAIL
              </label>

              <MdEmail className="absolute text-lg right-3 top-1/2 -translate-y-1/2 text-azul-style" />
            </div>

            <button
              type="submit"
              className="w-full bg-azul-style hover:bg-blue-600 font-zalando text-white py-2 rounded-lg transition-colors">
              Entrar
            </button>

            <div className="text-center font-zalando text-gray-600 text-sm mt-2">
              Não tem conta?{" "}
              <a href="/cadastro" className="text-azul-style font-medium hover:underline">
                Cadastre-se
              </a>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
