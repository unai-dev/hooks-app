import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserContext } from "@/useContext/context/UserContext";
import { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

export const LoginPage = () => {
  const { login } = use(UserContext);

  const [userId, setUserId] = useState("");

  const navigation = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = login(+userId);

    if (!result) {
      toast.error("Usuario no encontrado");
      return;
    }

    navigation("/profile");
  };

  return (
    <div className="flex flex-col min-h-screen items-center">
      <h1 className="text-4xl font-bold">Iniciar Sesion</h1>
      <hr />

      <form className="flex flex-col gap-2 my-10" onSubmit={handleSubmit}>
        <Input
          type="number"
          placeholder="ID del usuario"
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
        />

        <Button type="submit">Login</Button>
      </form>

      <Link to="/about">
        <Button variant={"ghost"}>Volver a la pagina principal</Button>
      </Link>
    </div>
  );
};
