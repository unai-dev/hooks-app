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
}

export type ScrambleWordsState = { type: "NO_TENGO_NI_IDEA" };
