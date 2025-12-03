import { useEffect, useState } from "react";

/**
 * Agregamos un tipado estrricto para el estado
 * Asi podemos asegurarnos de que el estado siempre sea de tipo "rojo | amarillo | verde"
 * @type {Light}
 */

const colors = {
  red: "bg-red-500 animate-pulse",
  yellow: "bg-yellow-500 animate-pulse",
  green: "bg-green-500 animate-pulse",
};

type Light = keyof typeof colors;

export const TrafficLightWithEffect = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-white text-2xl">Semaforo con useEffect</h1>
        <h2 className="text-white text-xl">CountDown: {countDown}</h2>

        <div className="w-64 bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${(countDown / 5) * 100}%` }}
          ></div>
        </div>

        <div
          className={`w-32 h-32 ${
            light === "red" ? colors[light] : "bg-gray-500"
          } rounded-full`}
        ></div>

        <div
          className={`w-32 h-32 ${
            light === "yellow" ? colors[light] : "bg-gray-500"
          } rounded-full`}
        ></div>
        <div
          className={`w-32 h-32 ${
            light === "green" ? colors[light] : "bg-gray-500"
          } rounded-full`}
        ></div>
      </div>
    </div>
  );
};
