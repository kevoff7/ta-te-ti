import confetti from "canvas-confetti";
const matches = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const checkMatches = (matrix: string[]) => {
  for (const match of matches) {
    const [a, b, c] = match;

    if (matrix[a] && matrix[a] === matrix[b] && matrix[a] === matrix[c]) {
      confetti();

      return {check: true, win: matrix[a], match};
    }
  }
  if (matrix.every((item) => item !== "")) return {check: true, win: "tie"};
};
