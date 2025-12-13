import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ProfessionalApp } from "./useContext/ProfessionalApp";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster />
    <ProfessionalApp />
  </StrictMode>
);
