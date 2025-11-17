import React, { useState } from 'react';
import { MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash,FaGoogle  } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";





const Login = () => {
  const loginGoogle = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    const userInfo = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      }
    );

    console.log("Usuário Google:", userInfo.data);
  },
  onError: () => console.log("Erro no login Google"),
});

  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleLogin = (credentialResponse) => {
    const token = credentialResponse.credential;
    const user = jwtDecode(token);

    console.log("Usuário Google:", user);

    // Aqui você envia para o backend
    // fetch("http://localhost:3000/api/auth/google", ...)
  };

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

              <div className="absolute inset-0 rounded-lg border-2 border-yellow-400 pointer-events-none"></div>

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

              <input
                required
                type="email"
                placeholder=" "
                className="peer bg-black text-primaria w-full rounded-lg px-3 py-3 focus:outline-none"
              />

              <MdEmail className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-400" />
            </div>


            {/* SENHA */}
            <div className="relative mb-2">

              <div className="absolute inset-0 rounded-lg border-2 border-yellow-400 pointer-events-none"></div>

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

              <input
                required
                type={showPassword ? "text" : "password"}
                placeholder=" "
                className="peer bg-black text-primaria w-full rounded-lg px-3 py-3 focus:outline-none"
              />

              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-yellow-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>

            </div>

            <div className='mb-3'>
              <a href="/" className='font-zalando text-primaria hover:underline text-sm flex justify-end'>
                esqueceu a senha ?
              </a>
            </div>

            {/* BOTÃO LOGIN */}
            <button
              type="submit"
              className="w-full bg-secundaria hover:bg-primaria text-primaria hover:text-secundaria font-zalando py-2 rounded-lg transition-colors"
            >
              Entrar
            </button>

<div className='mt-3 rounded-xl bg-[#1d1c1d] h-[1.9px]' ></div>

         {/* BOTÃO GOOGLE PERSONALIZADO */}
          <div className="mt-4">
            <button
            type='button'
              onClick={loginGoogle}
              className="w-full bg-secundaria hover:bg-primaria text-primaria hover:text-secundaria  py-3 px-4 rounded-lg flex items-center justify-center gap-3 transition-all duration-300 font-zalando font-semibold shadow-md hover:shadow-lg active:scale-95"
            >
              <FaGoogle  className="text-2xl" />
              <span className="text-sm md:text-base">Continuar com Google</span>
            </button>
          </div>


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
