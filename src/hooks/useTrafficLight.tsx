/**
 * useState -> es un hook que permite manejar el estado del componente, este redibuja el componente cuando el estado cambia
 * useEffect -> es un hook que se ejecuta cuando el componente se monta, se actualiza o se desmonta(nos permite manejar efectos secundarios)
 */
import { useState, useEffect } from "react";

const colors = {
  red: "bg-red-500 animate-pulse",
  yellow: "bg-yellow-500 animate-pulse",
  green: "bg-green-500 animate-pulse",
};

/**
 * Agregamos un tipado estrricto para el estado
 * Asi podemos asegurarnos de que el estado siempre sea de tipo "rojo | amarillo | verde"
 * @type {Light}
 */

type Light = keyof typeof colors;

export const useTrafficLight = () => {
  const [light, setLight] = useState<Light>("red");
  // Iniciamos el hook de estado para controlar el contador de tiempo
  const [countDown, setCountDown] = useState(5);

  /**
   * Iniciamos el hook useEffect para controlar el efecto secundario
   * Le indicamos que se ejecute en un intervalo de 1 segundo
   * y que se ejecute solo si el countDown es mayor a 0
   * setCountDown -> va a disminuir de 1 en 1 el contador
   */
  // ! Efecto para manejar el contador
  useEffect(() => {
    if (countDown === 0) return;

    const intervalId = setInterval(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);

    // Limpiamos el intervalo al desmontar el componente
    return () => {
      clearInterval(intervalId);
    };
    // Le indicamos que se ejecute solo si el countDown cambia
  }, [countDown]);

  // ! Efecto para manejar el cambio de color
  useEffect(() => {
    if (countDown > 0) return;

    setCountDown(5);

    if (light === "red") {
      setLight("green");
      return;
    }
    if (light === "green") {
      setLight("yellow");
      setCountDown(3);
      return;
    }

    if (light === "yellow") {
      setLight("red");
      return;
    }
  }, [countDown, light]);

  return {
    // Props
    colors,
    light,
    countDown,

    // Methods

    // Computed is a calculated value based on the props
    percentage: (countDown / 5) * 100,
    greenLight: light === "green" ? colors.green : "bg-gray-500",
    yellowLight: light === "yellow" ? colors.yellow : "bg-gray-500",
    redLight: light === "red" ? colors.red : "bg-gray-500",
  };
};
