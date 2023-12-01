import {useState} from "react";

import {checkMatches} from "./ta-te-ti/helpers/checkMatches";
import {generatedMatrix} from "./ta-te-ti/helpers/generatedMatrix";
import {Matrix} from "./ta-te-ti/Matrix";

const GameTurn = {
  X: "❌",
  O: "⚪",
};

function App() {
  const [matrix, setMatrix] = useState<string[]>(() => {
    const newMatrix = localStorage.getItem("matrix");

    return newMatrix ? JSON.parse(newMatrix) : generatedMatrix;
  });
  const [turn, setTurn] = useState(() => {
    const newTurn = localStorage.getItem("turn");

    return newTurn ? JSON.parse(newTurn) : GameTurn.X;
  });
  const [winner, setWinner] = useState<{check: boolean; win?: string; match?: number[]}>(() => {
    const newWinner = localStorage.getItem("winner");

    return newWinner ? JSON.parse(newWinner) : {check: false};
  });

  const updateMatrix = (index: number) => {
    const newMatrix = [...matrix];

    newMatrix[index] = turn;

    localStorage.setItem("matrix", JSON.stringify(newMatrix));
    setMatrix(newMatrix);

    const newTurn = turn === GameTurn.X ? GameTurn.O : GameTurn.X;

    localStorage.setItem("turn", JSON.stringify(newTurn));
    setTurn(newTurn);

    const checkResult = checkMatches(newMatrix);

    if (checkResult) {
      localStorage.setItem("winner", JSON.stringify(checkResult));
      console.log(checkResult);
      setWinner(checkResult);
    }
  };

  const restartGame = () => {
    setMatrix(generatedMatrix);
    setTurn(GameTurn.X);
    setWinner({check: false});

    localStorage.clear();
  };

  return (
    <div className="bg-body min-h-screen text-gray-12 flex flex-col items-center">
      <header>
        <h1 className="text-4xl font-mono text-center uppercase mt-7">ta te ti</h1>
      </header>
      <section className="mt-16 font-mono uppercase text-center">
        <article className="flex justify-center h-12">
          {!winner.check ? (
            <p className="text-2xl flex items-center">
              turn: {turn === GameTurn.X ? GameTurn.X : GameTurn.O}
            </p>
          ) : (
            <div className="flex gap-3 items-center justify-center">
              <p className="text-2xl">{winner.win === "tie" ? "TIE" : `WINS: ${winner.win}`}</p>
              <button
                className="border  h-9 px-2 hover:bg-gray-12 hover:text-body"
                onClick={() => restartGame()}
              >
                Play Again!
              </button>
            </div>
          )}
        </article>
      </section>
      <main className="max-w-sm w-full flex flex-col">
        <section className="mt-14 w-full grid grid-cols-3 grid-rows-3">
          {matrix.map((box, index) => (
            <Matrix
              key={index}
              box={box}
              index={index}
              match={winner.match}
              updateMatrix={updateMatrix}
              winner={winner}
            />
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;
