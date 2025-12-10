/**
 * El estado inicial luce de esta manera
 */
export interface ScrambleWordsState {
  words: string[];
  currentWord: string;
  scrambledWord: string;
  guess: string;
  points: number;
  errorCounter: number;
  maxAllowErrors: number;
  skipCounter: number;
  maxSkips: number;
  isGameOver: boolean;
  totalWords: number;
}

// Array de palabras a jugar
const GAME_WORDS = [
  "REACT",
  "JAVASCRIPT",
  "TYPESCRIPT",
  "HTML",
  "ANGULAR",
  "SOLID",
  "NODE",
  "VUEJS",
  "SVELTE",
  "EXPRESS",
  "MONGODB",
  "POSTGRES",
  "DOCKER",
  "KUBERNETES",
  "WEBPACK",
  "VITE",
  "TAILWIND",
];

// Esta función mezcla el arreglo para que siempre sea aleatorio
const shuffleArray = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};

// Esta función mezcla las letras de la palabra
const scrambleWord = (word: string = "") => {
  return word
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
};

export type ScrambleWords = { type: "NO_TENGO_NI_IDEA" };

// Funcion con el estado incial
export const getInitialState = (): ScrambleWordsState => {
  const shuffleWords = shuffleArray([...GAME_WORDS]);

  return {
    words: shuffleWords,
    currentWord: shuffleWords[0],
    scrambledWord: scrambleWord(shuffleWords[0]),
    guess: "",
    points: 0,
    errorCounter: 0,
    maxAllowErrors: 3,
    skipCounter: 0,
    maxSkips: 3,
    isGameOver: false,
    totalWords: shuffleWords.length,
  };
};

// Acciones para controlar el juego
export type ScrambleWordsAction =
  | { type: "SET_GUESS"; payload: string }
  | { type: "CHECK_ANSWER" }
  | { type: "SKIP_ANSWER" }
  | { type: "PLAY_AGAIN"; payload: ScrambleWordsState };

// Funcion reducer
export const scrambledWordsReducer = (
  state: ScrambleWordsState,
  action: ScrambleWordsAction
): ScrambleWordsState => {
  switch (action.type) {
    case "SET_GUESS":
      return {
        ...state,
        guess: action.payload.trim().toUpperCase(),
      };

    case "CHECK_ANSWER":
      if (state.currentWord === state.guess) {
        const newWords = state.words.slice(1);

        return {
          ...state,
          words: newWords,
          points: state.points + 1,
          guess: "",
          currentWord: newWords[0],
          scrambledWord: scrambleWord(newWords[0]),
        };
      }

      return {
        ...state,
        guess: "",
        errorCounter: state.errorCounter + 1,
        isGameOver: state.errorCounter + 1 >= state.maxAllowErrors,
      };

    case "SKIP_ANSWER": {
      if (state.errorCounter >= state.maxSkips) return state;
      const updatedWords = state.words.slice(1);

      return {
        ...state,
        words: updatedWords,
        skipCounter: state.skipCounter + 1,
        currentWord: updatedWords[0],
        scrambledWord: scrambleWord(updatedWords[0]),
        guess: "",
      };
    }

    case "PLAY_AGAIN":
      return action.payload;

    default:
      return state;
  }
};
