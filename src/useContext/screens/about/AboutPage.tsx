import { Button } from "@/components/ui/button";
import { UserContext } from "@/useContext/context/UserContext";
import { use } from "react";
import { Link } from "react-router";

export const AboutPage = () => {
  // use -> es un provedor de algun tipo de data para que todos los hijos del arbol puedan usar sus props o metodos
  const { isAuth, logout } = use(UserContext);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-4xl font-bold">Sobre mi</h1>
      <hr />
      <div className="flex flex-col gap-2">
        {isAuth && (
          <Link
            to="/profile"
            className="hover:text-blue-500 underline text-2xl "
          >
            Perfil
          </Link>
        )}

        {/* Login Logout */}
        {isAuth ? (
          <Button onClick={logout} variant={"destructive"}>
            Salir
          </Button>
        ) : (
          <Link
            to="/login"
            className="hover:text-blue-500 underline text-2xl rounded-md "
          >
            Iniciar sesion
          </Link>
        )}
      </div>
    </div>
  );
};
