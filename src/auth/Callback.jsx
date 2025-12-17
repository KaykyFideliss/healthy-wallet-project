import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const finalizeLogin = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        navigate("/login");
        return;
      }

      const userId = data.session.user.id;

      const { data: profile } = await supabase
        .from("profiles")
        .select("salario, idade")
        .eq("id", userId)
        .single();

      if (!profile || profile.salario == null || profile.idade == null) {
        navigate("/UserSetup");
      } else {
        navigate("/MinhasContas");
      }
    };

    finalizeLogin();
  }, [navigate]);

  return <p>Finalizando login...</p>;
};

export default Callback;
