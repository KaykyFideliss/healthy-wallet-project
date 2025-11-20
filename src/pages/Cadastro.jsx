import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash, FaUserAlt, FaPhone } from "react-icons/fa";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

const cadastro = () => {
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErro("");
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const senhaRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  const validar = () => {
    if (!emailRegex.test(form.email)) {
      return "Email inválido. Exemplo: nome@gmail.com";
    }

    if (form.telefone.length !== 11) {
      return "O telefone deve ter 11 dígitos (DDD + número).";
    }

    if (!senhaRegex.test(form.senha)) {
      return "A senha precisa ter: letra MAIÚSCULA, número, símbolo e no mínimo 6 caracteres.";
    }

    if (form.senha !== form.confirmarSenha) {
      return "As senhas não coincidem!";
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
      // 1️⃣ Criar usuário no Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.senha,
      });

      if (error) {
        setErro(error.message);
        return;
      }

      const user = data.user;

      // 2️⃣ Salvar dados extras na tabela profiles (INCLUÍDO EMAIL)
      const { error: erroProfile } = await supabase
        .from("profiles")
        .insert({
          id: user.id,
          nome: form.nome,
          sobrenome: form.sobrenome,
          telefone: form.telefone,
          email: form.email, // ← ADICIONADO!
        });

      if (erroProfile) {
        setErro(erroProfile.message);
        return;
      }

      alert("Cadastro realizado com sucesso! Verifique seu email.");

      setTimeout(() => {
        navigate("/login");
      }, 500);

    } catch (err) {
      setErro("Erro inesperado ao cadastrar.");
    }
  };

  return (
    <div className="h-screen w-screen overflow-x-hidden flex flex-col md:flex-row items-center justify-center font-zalando">
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
            <img
              className="w-60 h-60 mx-auto"
              src="img/Healthy-logo.png"
              alt="Logo"
            />
          </div>

          <h2 className="text-3xl text-white font-zalando font-semibold mb-5 text-center">
            CADASTRO
          </h2>

          {erro && (
            <p className="text-red-400 text-sm text-center mb-3 font-zalando">
              {erro}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            {/* NOME */}
            <InputField
              label="NOME"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              Icon={FaUserAlt}
              type="text"
            />

            {/* SOBRENOME */}
            <InputField
              label="SOBRENOME"
              name="sobrenome"
              value={form.sobrenome}
              onChange={handleChange}
              Icon={FaUserAlt}
              type="text"
            />

            {/* EMAIL */}
            <InputField
              label="EMAIL"
              name="email"
              value={form.email}
              onChange={handleChange}
              Icon={MdEmail}
              type="email"
            />

            {/* TELEFONE */}
            <InputField
              label="TELEFONE (DDD + NUMERO)"
              name="telefone"
              value={form.telefone}
              onChange={(e) => {
                if (/^\d*$/.test(e.target.value)) {
                  handleChange(e);
                }
              }}
              Icon={FaPhone}
              type="text"
              maxLength={11}
            />

            {/* SENHA */}
            <PasswordField
              label="SENHA"
              name="senha"
              value={form.senha}
              onChange={handleChange}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />

            {/* CONFIRMAR SENHA */}
            <PasswordField
              label="CONFIRMAR SENHA"
              name="confirmarSenha"
              value={form.confirmarSenha}
              onChange={handleChange}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />

            {/* BOTÃO */}
            <button
              type="submit"
              className="w-full bg-secundaria hover:bg-primaria text-primaria hover:text-secundaria font-zalando py-2 rounded-lg transition-colors"
            >
              Cadastrar
            </button>

            <div className="text-center font-zalando text-secundaria text-sm mt-2">
              Já tem conta?{" "}
              <a
                href="/login"
                className="text-primaria font-zalando font-semibold hover:underline"
              >
                Faça login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, Icon, type, maxLength }) => (
  <div className="relative mb-6">
    <div className="absolute inset-0 rounded-lg border-2 border-yellow-400 pointer-events-none"></div>
    <div className="absolute -top-3 left-3 px-1 bg-black">
      <span className="text-yellow-400 font-zalando text-xs">{label}</span>
    </div>
    <input
      required
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder=" "
      maxLength={maxLength}
      className="peer bg-black text-primaria w-full rounded-lg px-3 py-3 focus:outline-none"
    />
    <Icon className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-400" />
  </div>
);

const PasswordField = ({
  label,
  name,
  value,
  onChange,
  showPassword,
  setShowPassword,
}) => (
  <div className="relative mb-6">
    <div className="absolute inset-0 rounded-lg border-2 border-yellow-400 pointer-events-none"></div>
    <div className="absolute -top-3 left-3 px-1 bg-black">
      <span className="text-yellow-400 font-zalando text-xs">{label}</span>
    </div>

    <input
      required
      type={showPassword ? "text" : "password"}
      name={name}
      value={value}
      onChange={onChange}
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
);

export default cadastro;
