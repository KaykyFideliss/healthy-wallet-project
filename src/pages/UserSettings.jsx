import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { HeroGeometricSettings } from "../components/home/Shade-Landing-Settings";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt, FaUser  } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";


export default function UserSettings() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    const { data: { user } } = await supabase.auth.getUser();
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

if (!userData) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}


  return (
   
    <section className=" flx justify-center relative overflow-hidden">

<HeroGeometricSettings
  title1="Bem-vindo a tela do usuário,"
   title2={` ${userData.nome}`}
  description="Aqui você pode gerenciar suas informações pessoais e preferências de conta de forma segura e eficiente."
/>

     {/* INFORMAÇÕES */}
        <div className="space-y-6 w-full mt-10  py-16 px-4">
          <div className="items-center justify-center flex flex-col">
          <h3 className="text-xl md:text-4xl lg:text-6xl justify-center flex font-semibold font-zalando text-white">
            Informações da Conta
          </h3>
          <p className="font-zalando text-white text-center mt-2 md:mt-4 lg:mt-6 max-w-2xl">
            Gerencie suas informações pessoais e mantenha seus dados atualizados para uma melhor experiência.
          </p>
</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-zalando lg:mx-52 py-16">

            <div className="flex h-36 border-2 border-primaria rounded-xl shadow-md items-center justify-center ">
              <div className="text-primaria mr-3 text-2xl"> 
              <MdEmail />
              </div>
              <p className="text-primaria font-semibold text-xl md:text-2xl lg:text-2xl">Email :</p>
              <p className="text-white  mt-1 pl-2">{userData.email || "Não informado"}</p>
            </div>

               <div className="flex h-36 border-2 border-primaria rounded-xl shadow-md items-center justify-center">
              <div className="text-primaria mr-1 text-base md:text-2xl lg:text-2xl"> 
              <FaPhoneAlt />
              </div>
               <p className="text-primaria font-semibold text-xl md:text-2xl lg:text-2xl">Telefone :</p>
              <p className="text-white mt-1 pl-2">{userData.telefone || "Não informado"}</p>
            </div>

            <div className="flex h-36 border-2 border-primaria rounded-xl shadow-md items-center justify-center">
              <div className="text-primaria mr-3 text-2xl"> 
              <FaUser />
              </div>
              <p className="text-primaria font-semibold text-2xl">Idade :</p>
              <p className="text-white text-xl mt-1 pl-2">{userData.idade || "Não informado"}</p>
            </div>

           <div className="flex h-36 border-2 border-primaria rounded-xl shadow-md items-center justify-center">
              <div className="text-primaria mr-3 text-2xl"> 
              <FaMoneyBillTrendUp   />
              </div>
              <p className="text-primaria font-semibold text-2xl">Salário :</p>
              <p className="text-white text-xl mt-1 pl-2">
                {userData.salario ? `R$ ${userData.salario}` : "Não informado"}
              </p>
            </div>
          </div>
        </div>
  {/* BOTÃO DE SAIR */}
  <div className="m-2">
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            window.location.href = "/login";
          }}
          className="w-full mt-10 bg-yellow-500 font-zalando text-black font-semibold rounded-xl py-3 
          hover:bg-yellow-400 transition-all shadow-lg hover:shadow-yellow-400/20"
        >
          Sair da Conta
        </button>
</div>

 

    
    </section>
  );
}
