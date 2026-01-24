import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { HeroGeometricSettings } from "../components/home/Shade-Landing-Settings";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import Footer from "../components/Footer";

export default function UserSettings() {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("profiles")
      .select("nome, sobrenome, email, telefone, idade, salario, avatar_url")
      .eq("id", user.id)
      .single();

    if (!error && data) {
      setUserData(data);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        nome: userData.nome,
        telefone: userData.telefone,
        salario: userData.salario,
      })
      .eq("id", user.id);

    setLoading(false);

    if (error) {
      alert("Erro ao atualizar dados");
      console.error(error);
    } else {
      alert("Dados atualizados com sucesso!");
      setEditMode(false);
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const formatPhone = (phone) => {
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.length !== 11) return phone;

  return cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
};


  return (
    <section className="flex flex-col justify-center relative overflow-hidden">
      <HeroGeometricSettings
        title1="Bem-vindo a tela do usuário,"
        title2={` ${userData.nome}`}
        description="Aqui você pode gerenciar suas informações pessoais e preferências de conta de forma segura e eficiente."
      />

 

      {/* INFORMAÇÕES */}
      <div className="space-y-6 w-full mt-10 py-16 px-4">
        <div className="items-center justify-center flex flex-col">
          <h3 className="text-xl md:text-4xl lg:text-6xl flex font-semibold font-zalando text-white">
            Informações da Conta
          </h3>
          <p className="font-zalando text-white text-center mt-4 max-w-2xl">
            Gerencie suas informações pessoais e mantenha seus dados atualizados
            para uma melhor experiência.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-zalando lg:mx-52 py-16">
          {/* EMAIL (não editável) */}
          <div className="flex h-36 border-2 border-primaria rounded-xl shadow-md items-center justify-center">
            <MdEmail className="text-primaria mr-3 text-2xl" />
            <p className="text-primaria font-semibold text-xl mr-2">Email:</p>
            <p className="text-white">{userData.email}</p>
          </div>

       {/* TELEFONE */}
<div className="flex h-36 border-2 border-primaria rounded-xl shadow-md items-center justify-center">
  <FaPhoneAlt className="text-primaria mr-3 text-2xl" />
  <p className="text-primaria font-semibold text-xl mr-2">Telefone:</p>

  {editMode ? (
    <input
      type="tel"
      inputMode="numeric"
      maxLength={11}
      value={userData.telefone || ""}
      onChange={(e) => {
        // Remove tudo que não for número
        const onlyNumbers = e.target.value.replace(/\D/g, "");

        // Limita a 11 dígitos
        if (onlyNumbers.length <= 11) {
          setUserData({ ...userData, telefone: onlyNumbers });
        }
      }}
      placeholder="11987654321"
      className="bg-transparent border-b border-white text-white outline-none text-center"
    />
  ) : (
    <p className="text-white">
      {userData.telefone
        ? formatPhone(userData.telefone)
        : "Não informado"}
    </p>
  )}
</div>


          {/* NOME */}
          <div className="flex h-36 border-2 border-primaria rounded-xl shadow-md items-center justify-center">
            <FaUser className="text-primaria mr-3 text-2xl" />
            <p className="text-primaria font-semibold text-xl mr-2">Nome:</p>

            {editMode ? (
              <input
                type="text"
                value={userData.nome || ""}
                onChange={(e) =>
                  setUserData({ ...userData, nome: e.target.value })
                }
                className="bg-transparent border-b border-white text-white outline-none"
              />
            ) : (
              <p className="text-white">{userData.nome || "Não informado"}</p>
            )}
          </div>

          {/* SALÁRIO */}
          <div className="flex h-36 border-2 border-primaria rounded-xl shadow-md items-center justify-center">
            <FaMoneyBillTrendUp className="text-primaria mr-3 text-2xl" />
            <p className="text-primaria font-semibold text-xl mr-2">Salário:</p>

            {editMode ? (
              <input
                type="number"
                value={userData.salario || ""}
                onChange={(e) =>
                  setUserData({ ...userData, salario: e.target.value })
                }
                className="bg-transparent border-b border-white text-white outline-none"
              />
            ) : (
              <p className="text-white">
                {userData.salario
                  ? `R$ ${userData.salario}`
                  : "Não informado"}
              </p>
            )}
          </div>
        </div>
      </div>

    {/* BOTÕES DE AÇÃO */}
<div className="w-full flex flex-wrap justify-center items-center gap-4  mb-16 px-4">

  {/* SAIR */}
  <button
    onClick={async () => {
      await supabase.auth.signOut();
      window.location.href = "/login";
    }}
    className="w-full sm:w-auto min-w-[180px] bg-yellow-500 font-zalando text-black font-semibold rounded-xl py-3 px-6 hover:bg-yellow-300 transition-all shadow-lg"
  >
    Sair da Conta
  </button>

  {/* MODO EDIÇÃO */}
  {editMode ? (
    <>
      <button
        onClick={handleUpdate}
        disabled={loading}
        className="w-full sm:w-auto min-w-[180px] bg-secundaria font-zalando text-white font-semibold rounded-xl py-3 px-6 hover:bg-green-800 transition-all shadow-lg"
      >
        {loading ? "Salvando..." : "Salvar"}
      </button>

      <button
        onClick={() => {
          setEditMode(false);
          fetchUserInfo();
        }}
        className="w-full sm:w-auto min-w-[180px] bg-vermelho/50 font-zalando text-white font-semibold rounded-xl py-3 px-6 hover:bg-vermelho/70 transition-all shadow-lg"
      >
        Cancelar
      </button>
    </>
  ) : (
    <button
      onClick={() => setEditMode(true)}
      className="w-full sm:w-auto min-w-[180px] bg-secundaria font-zalando text-white font-semibold rounded-xl py-3 px-6 hover:bg-secundaria/60 transition-all shadow-lg"
    >
      Editar Informações
    </button>
  )}
</div>


      <Footer />
    </section>
  );
}
