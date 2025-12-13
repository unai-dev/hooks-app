import { use, type JSX } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router";

// Definimos una interfaz para indicar que el elemento(componente privado) sea de tipo JSX
interface Props {
  element: JSX.Element;
}

export const PrivateRoute = ({ element }: Props) => {
  const { authStatus } = use(UserContext);

  if (authStatus === "checking") {
    return <div>Loading...</div>;
  }

  if (authStatus === "auth") {
    return element;
  }

  /**
   * En caso de que no este auth lo redirigimos
   * A la pantalla login
   */
  return <Navigate to={"/login"} replace />;
};
