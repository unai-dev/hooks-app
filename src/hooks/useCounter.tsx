import { useState } from "react";

export const useCounter = (initialValue: number = 1) => {
  const [counter, setCounter] = useState(initialValue);

  const handleAdd = () => {
    setCounter(counter + 1);
  };
  const handleSubtract = () => {
    if (counter === initialValue) return;
    setCounter(counter - 1);
  };

  return {
    // Props
    counter,

    // Methods
    handleAdd,
    handleSubtract,
  };
};
