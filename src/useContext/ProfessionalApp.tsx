import { RouterProvider } from "react-router";
import { appRouter } from "./router/app.router";
import { UserContextProvider } from "./context/UserContext";

export const ProfessionalApp = () => {
  return (
    // UserContextProvider -> ofrece todos los metodos y sus props a sus hijos
    <UserContextProvider>
      <div className="bg-gradient ">
        <RouterProvider router={appRouter} />
      </div>
    </UserContextProvider>
  );
};
