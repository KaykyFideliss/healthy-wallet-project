import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function UserSettings() {
  const [userData, setUserData] = useState(null);
  const [uploading, setUploading] = useState(false);

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

  const handleAvatarUpload = async (event) => {
    try {
      setUploading(true);
      
      const file = event.target.files[0];
      if (!file) return;

      // Verificar tamanho e tipo do arquivo
      if (file.size > 2 * 1024 * 1024) {
        alert('Arquivo muito grande. Use imagens menores que 2MB.');
        return;
      }

      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione um arquivo de imagem.');
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert('Usuário não autenticado.');
        return;
      }

      // Primeiro, verificar se o bucket existe
      const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
      
      if (bucketsError) {
        console.error('Erro ao listar buckets:', bucketsError);
        throw new Error('Erro de configuração do storage');
      }

      const avatarsBucket = buckets.find(bucket => bucket.name === 'avatars');
      if (!avatarsBucket) {
        throw new Error('Bucket "avatars" não encontrado. Crie o bucket no Supabase Dashboard primeiro.');
      }

      // Nome do arquivo
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      console.log('Fazendo upload para:', filePath);

      // Fazer upload
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        console.error('Erro detalhado do upload:', uploadError);
        throw uploadError;
      }

      // Obter URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      console.log('URL pública:', publicUrl);

      // Atualizar perfil
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);

      if (updateError) throw updateError;

      // Atualizar estado
      setUserData(prev => ({ ...prev, avatar_url: publicUrl }));
      
      alert('Foto atualizada com sucesso!');
      
    } catch (error) {
      console.error('Erro completo no upload:', error);
      
      if (error.message.includes('Bucket not found')) {
        alert('Bucket não configurado. Crie um bucket chamado "avatars" no Supabase Dashboard em Storage.');
      } else {
        alert('Erro ao fazer upload: ' + error.message);
      }
    } finally {
      setUploading(false);
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Carregando informações...
      </div>
    );
  }

  return (
    <section className="min-h-screen py-10 flex justify-center">
      <div className="p-6 rounded-2xl shadow-lg w-full">
        <div className="flex items-center px-2 mb-6 justify-evenly flex-col md:flex-row">
          <div className="relative">
            <img 
              src={userData.avatar_url || "./img/Avatares/User-hw.png"} 
              alt="Avatar do usuário" 
              className="bg-black rounded-full h-72 w-72 pt-3 mb-10 object-cover border-2 border-yellow-400"
            />
            
            <label 
              htmlFor="avatar-upload"
              className={`absolute bottom-4 right-4 bg-yellow-500 text-black p-3 rounded-full cursor-pointer hover:bg-yellow-400 transition-all ${
                uploading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {uploading ? '⏳' : '📷'}
            </label>
            
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              disabled={uploading}
              className="hidden"
            />
            
            {uploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">Enviando...</span>
              </div>
            )}
          </div>
          
          <div className="md:ml-10 flex-1 items-center text-center md:text-left">
            <h2 className="text-2xl font-bold mb-4 font-zalando text-yellow-400">
              Oi, {userData.nome} {userData.sobrenome}
            </h2>
            <p className="text-white font-zalando text-xs tracking-wide">
              Clique no ícone da câmera para alterar sua foto de perfil.
            </p>        
          </div>
        </div>

        <div className="space-y-3 text-lg text-primaria font-zalando">
          <h3 className="text-xl font-semibold mb-4 font-zalando text-white">Suas Informações</h3>
          <div className="grid grid-cols-2 gap-4 text-xs md:text-sm">
            <p><strong className="text-white">Telefone:</strong> {userData.telefone || "Não informado"}</p>
            <p><strong className="text-white">Idade:</strong> {userData.idade || "Não informado"}</p>
            <p><strong className="text-white">Salário:</strong> 
              {userData.salario ? ` R$ ${userData.salario}` : " Não informado"}
            </p>
          </div>
        </div>

        <hr className="my-6 border-yellow-400" />

        <button
          onClick={async () => {
            await supabase.auth.signOut();
            window.location.href = "/login";
          }}
          className="w-full bg-yellow-500 text-black font-semibold rounded-lg py-2 hover:bg-yellow-400 transition-all"
        >
          Sair da Conta
        </button>
      </div>
    </section>
  );
}