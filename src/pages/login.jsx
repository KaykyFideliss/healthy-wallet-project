  import React, { useState } from 'react';
  import { MdEmail } from "react-icons/md";
  import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

  import { supabase } from "../lib/supabaseClient";

  import { useNavigate } from "react-router-dom"; // ⬅ IMPORTANTE
  import { Link } from "react-router-dom";
  import { motion } from "framer-motion";

  const Login = () => {
    const navigate = useNavigate(); // ⬅ Agora usamos navegação react-router
    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
      email: "",
      senha: "",
    });

    const [erro, setErro] = useState("");

    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
      setErro("");
    };

    // ---------------------------
    // 📌 LOGIN COM EMAIL + SENHA
    // ---------------------------
    const handleLogin = async (e) => {
      e.preventDefault();
      setErro("");

      const { data, error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.senha,
      });

      if (error) {
        setErro("Email ou senha incorretos.");
        return;
      }

      const userId = data.user.id;

  // Verifica se o usuário já terminou o UserSetup
  const { data: profile } = await supabase
    .from("profiles")
    .select("salario, idade")
    .eq("id", userId)
    .single();

  if (!profile || profile.salario === null || profile.idade === null) {
    navigate("/UserSetup");
    return;
  }

  navigate("/MinhasContas");

    };

    
    // LOGIN COM GOOGLE (via Supabase OAuth)
    
  const loginGoogle = async () => {
  setErro("");

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `https://healthy-wallet.vercel.app/auth/callback`,
    },
  });

  if (error) {
    console.error(error);
    setErro("Erro ao fazer login com Google");
  }
};

/* =====================
   VARIANTS
===================== */

const imageVariant = {
  hidden: {
    opacity: 0,
    x: -80,
    filter: "blur(12px)"
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    x: -80,
    filter: "blur(12px)",
    transition: {
      duration: 0.6,
      ease: "easeIn"
    }
  }
}

const textVariant = {
  hidden: {
    opacity: 0,
    x: 80,
    filter: "blur(12px)"
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: "easeOut",
      staggerChildren: 0.15
    }
  },
  exit: {
    opacity: 0,
    x: 80,
    filter: "blur(12px)",
    transition: {
      duration: 0.6,
      ease: "easeIn"
    }
  }
}

const itemFade = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(8px)"
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}


    return (
      <div className="h-screen w-screen overflow-x-hidden flex flex-col md:flex-row items-center justify-center">

        {/* LADO ESQUERDO */}
        <motion.div className="hidden md:flex md:w-1/2 ml-14 h-[800px] md:h-[800px] bg-gradient-to-tr rounded-xl bg-azul-style items-center justify-center p-6 relative " 
        variants={imageVariant}
         initial="hidden"
          animate="visible"
        >
          <img className="rounded-xl" src="./img/home/pessoa-confusa.png" alt="" />
          <div className="z-10 text-center px-4"></div>
        </motion.div>

        {/* LADO DIREITO */}
        <motion.div className="flex w-full md:w-1/2 items-center justify-center p-6"
        variants={textVariant}
          initial="hidden"
          animate="visible"
        >
          <div className="w-full max-w-sm">

            <motion.div className="-m-10"
            variants={itemFade}
              initial="hidden"
              whileInView="visible"
              delay="0.4"
            > 
              <img className="w-60 h-60 mx-auto" src="img/Healthy-logo.png" alt="Logo" />
            </motion.div>

            <motion.h2 className="text-3xl text-white font-zalando font-semibold mb-5 text-center"
            initial="hidden"
            whileInView="visible"
            variants={itemFade}
            >
              LOGIN
            </motion.h2>

            {erro && (
              <p className="text-red-400 text-sm text-center mb-3">{erro}</p>
            )}

            <form onSubmit={handleLogin}>

              {/* EMAIL */}
              <motion.div className="relative mb-6"
              initial="hidden"
              whileInView="visible"
              variants={itemFade}
              >
                <div className="absolute inset-0 rounded-lg border-2 border-yellow-400 pointer-events-none"></div>
                <div className="absolute -top-3 left-3 px-1 bg-black">
                  <span className="text-yellow-400 font-zalando text-xs">EMAIL</span>
                </div>

                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder=" "
                  className="peer bg-black text-primaria w-full rounded-lg px-3 py-3 focus:outline-none"
                />

                <MdEmail className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-400" />
              </motion.div>

              {/* SENHA */}
              <div className="relative mb-2">

                <div className="absolute inset-0 rounded-lg border-2 border-yellow-400 pointer-events-none"></div>

                <div className="absolute -top-3 left-3 px-1 bg-black">
                  <span className="text-yellow-400 font-zalando text-xs">SENHA</span>
                </div>

                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="senha"
                  value={form.senha}
                  onChange={handleChange}
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

              {/* GOOGLE */}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={loginGoogle}
                  className="w-full bg-secundaria hover:bg-primaria text-primaria hover:text-secundaria py-3 px-4 rounded-lg flex items-center justify-center gap-3 transition-all duration-300 font-zalando font-semibold shadow-md hover:shadow-lg active:scale-95"
                >
                  <FaGoogle className="text-2xl" />
                  <span className="text-sm md:text-base">Continuar com Google</span>
                </button>
              </div>

              <div className="text-center font-zalando text-secundaria text-sm mt-2">
                Não tem conta ?{" "}
              <Link to="/Cadastro" className="text-primaria font-semibold hover:underline">
    Cadastre-se
  </Link>

              </div>

            </form>
          </div>
        </motion.div>
      </div>
    );
  };

  export default Login;
