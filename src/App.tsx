import { useState } from "react";
import "./App.css";
import clickSound from "./assets/sounds/click.wav";
import CircleIcon from "./components/icons/circle";
import CrossIcon from "./components/icons/cross";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");

  function handleClick(index: number) {
    if (board[index]) return;

    new Audio(clickSound).play();
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    setBoard(newBoard);
  }

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="grid grid-cols-3">
          {board.map((cell, index) => (
            <div className={`h-32 w-32 p-2 cell ${"cell" + "-" + index}`}>
              <div
                onClick={() => handleClick(index)}
                className={`grid place-content-center w-full h-full transition-colors p-2 ${
                  !cell ? "hover:bg-neutral-200" : ""
                }`}
              >
                {cell === "X" && <CrossIcon />}
                {cell === "O" && <CircleIcon />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
