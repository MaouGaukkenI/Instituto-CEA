"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { StepBackIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserConfigs() {
  const { data, data: session, status } = useSession();

  const router = useRouter();

  const [name, setName] = useState(session?.user?.name || "");
  const [email, setEmail] = useState(session?.user?.email || "");
  const [profileImage, setProfileImage] = useState(session?.user?.image || "");

  const handleSave = () => {
    // Aqui você pode fazer um fetch/axios para API que atualiza o usuário
    alert("Salvar configurações ainda não implementado");
  };

  if (status === "loading") return <p>Carregando...</p>;

  if (status !== "authenticated") {
    return <h1>Bem-vindo, visitante!</h1>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto text-white">
      <Button
        type="button"
        onClick={() => router.back()}
        className=" bg-transparent hover:bg-gray-700/20 p-2 rounded-full transition"
      >
        <StepBackIcon />
      </Button>

      <h1 className="text-2xl font-bold mb-4">Configurações de Conta</h1>

      {/* Imagem de perfil */}
      <div className="mb-4 flex items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarFallback>
            {data.user.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
          {profileImage && <AvatarImage src={profileImage} />}
        </Avatar>

        <div>
          <input
            type="file"
            accept="image/*"
            id="profile-image-upload"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setProfileImage(reader.result as string);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
          <label
            htmlFor="profile-image-upload"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
          >
            Alterar imagem
          </label>
        </div>
      </div>

      {/* Nome */}
      <div className="mb-4">
        <label className="block mb-1">Nome</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded text-black w-full"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <Button>Alterar Email</Button>
      </div>

      {/* Senha */}
      <div className="mb-4">
        <Button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() =>
            alert("Implementar redirecionamento ou modal de alteração")
          }
        >
          Alterar senha
        </Button>
      </div>

      {/* Login com Google */}
      <div className="mb-6">
        <Button
          className="bg-red-600 text-white px-4 py-2 rounded"
          onClick={() =>
            alert("Implementar lógica de vincular/desvincular conta Google")
          }
        >
          Configurar Google
        </Button>
      </div>

      {/* Salvar alterações */}
      <Button
        className="bg-green-600 text-white px-6 py-2 rounded font-bold"
        onClick={handleSave}
      >
        Salvar Alterações
      </Button>
    </div>
  );
}
