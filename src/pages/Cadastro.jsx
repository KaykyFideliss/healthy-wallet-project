import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash, FaUserAlt, FaPhone } from "react-icons/fa";
import { supabase } from "../lib/supabaseClient";
import { Link, useNavigate } from "react-router-dom";

const Cadastro = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
  });

  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErro("");
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const senhaRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;

  const validar = () => {
    if (!emailRegex.test(form.email)) {
      return "Email inválido. Exemplo: nome@gmail.com";
    }

    if (form.telefone.length !== 11) {
      return "O telefone deve ter 11 dígitos (DDD + número).";
    }

    if (!senhaRegex.test(form.senha)) {
      return "A senha precisa ter letra maiúscula, número, símbolo e no mínimo 6 caracteres.";
    }

    if (form.senha !== form.confirmarSenha) {
      return "As senhas não coincidem.";
    }

    return "";
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const erroValidacao = validar();

  if (erroValidacao) {
    setErro(erroValidacao);
    return;
  }

  try {
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.senha,
    });

    if (error) {
      if (error.message.includes("User already registered")) {
        alert("Este email já possui conta. Redirecionando para login...");
        navigate("/login");
        return;
      }

      setErro(error.message);
      return;
    }

    const user = data?.user ?? null;

    // Email confirmation ativa
    if (!user) {
      alert("Cadastro realizado! Verifique seu email para confirmar a conta.");
      navigate("/login");
      return;
    }

    if (!user.id) {
      setErro("Não foi possível obter o ID do usuário.");
      return;
    }

    const { error: erroProfile } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        nome: form.nome,
        sobrenome: form.sobrenome,
        telefone: form.telefone,
        email: form.email,
      });

    if (erroProfile) {
      setErro("Usuário criado, mas houve erro ao salvar perfil.");
      return;
    }

    alert("Cadastro realizado com sucesso!");
    navigate("/login");

  } catch (err) {
    setErro("Erro inesperado ao cadastrar.");
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="h-screen w-screen overflow-x-hidden flex flex-col md:flex-row items-center justify-center font-zalando">
      
      {/* LADO ESQUERDO */}
      <div className="hidden md:flex md:w-1/2 ml-14 h-[800px] md:h-[600px] bg-gradient-to-tr rounded-xl bg-azul-style items-center justify-center p-6 relative">
        <img
          src="/img/healthy-logo.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover rounded-xl opacity-20"
        />
      </div>

      {/* LADO DIREITO */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-6">
        <div className="w-full max-w-sm">

          <img className="w-60 h-60 mx-auto -mb-10" src="/img/Healthy-logo.png" alt="Logo" />

          <h2 className="text-3xl text-white font-semibold mb-5 text-center">
            CADASTRO
          </h2>

          {erro && (
            <p className="text-red-400 text-sm text-center mb-3">{erro}</p>
          )}

          <form onSubmit={handleSubmit}>
            <InputField label="NOME" name="nome" value={form.nome} onChange={handleChange} Icon={FaUserAlt} />
            <InputField label="SOBRENOME" name="sobrenome" value={form.sobrenome} onChange={handleChange} Icon={FaUserAlt} />
            <InputField label="EMAIL" name="email" type="email" value={form.email} onChange={handleChange} Icon={MdEmail} />

            <InputField
              label="TELEFONE (DDD + NUMERO)"
              name="telefone"
              value={form.telefone}
              onChange={(e) => /^\d*$/.test(e.target.value) && handleChange(e)}
              Icon={FaPhone}
              maxLength={11}
            />

            <PasswordField label="SENHA" name="senha" value={form.senha} onChange={handleChange} showPassword={showPassword} setShowPassword={setShowPassword} />
            <PasswordField label="CONFIRMAR SENHA" name="confirmarSenha" value={form.confirmarSenha} onChange={handleChange} showPassword={showPassword} setShowPassword={setShowPassword} />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-secundaria hover:bg-primaria text-primaria hover:text-secundaria py-2 rounded-lg transition-colors"
            >
              {loading ? "Cadastrando..." : "Cadastrar"}
            </button>

            <div className="text-center text-secundaria text-sm mt-2">
              Já tem conta?{" "}
              <Link to="/login" className="text-primaria font-semibold hover:underline">
                Faça login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, Icon, type = "text", maxLength }) => (
  <div className="relative mb-6">
    <div className="absolute inset-0 rounded-lg border-2 border-yellow-400 pointer-events-none"></div>
    <div className="absolute -top-3 left-3 px-1 bg-black">
      <span className="text-yellow-400 text-xs">{label}</span>
    </div>
    <input
      required
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      className="bg-black text-primaria w-full rounded-lg px-3 py-3 focus:outline-none"
    />
    <Icon className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-400" />
  </div>
);

const PasswordField = ({ label, name, value, onChange, showPassword, setShowPassword }) => (
  <div className="relative mb-6">
    <div className="absolute inset-0 rounded-lg border-2 border-yellow-400 pointer-events-none"></div>
    <div className="absolute -top-3 left-3 px-1 bg-black">
      <span className="text-yellow-400 text-xs">{label}</span>
    </div>

    <input
      required
      type={showPassword ? "text" : "password"}
      name={name}
      value={value}
      onChange={onChange}
      className="bg-black text-primaria w-full rounded-lg px-3 py-3 focus:outline-none"
    />

    <div
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-yellow-400"
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </div>
  </div>
);

export default Cadastro;
