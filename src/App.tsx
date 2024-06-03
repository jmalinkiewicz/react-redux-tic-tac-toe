import { useEffect, useState } from "react";
import "./App.css";
import clickSound from "./assets/sounds/click.wav";
import CircleIcon from "./components/icons/circle";
import CrossIcon from "./components/icons/cross";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "./hooks";
import { incrementScore } from "./features/score/gameSlice";
import ScorePanel from "./components/scorePanel/scorePanel";

function App() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [result, setResult] = useState<"X" | "O" | "draw" | null>(null);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [showScore, setShowScore] = useState(false);

  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.game);

  const resultMessage =
    result === "X"
      ? `${store.players.X.name} wins`
      : result === "O"
      ? `${store.players.O.name} wins`
      : "It's a draw";

  useEffect(() => {
    const winningCombination = [
      [0, 1, 2], // Horizontal
      [3, 4, 5], // Horizontal
      [6, 7, 8], // Horizontal
      [0, 3, 6], // Vertical
      [1, 4, 7], // Vertical
      [2, 5, 8], // Vertical
      [0, 4, 8], // Diagonal
      [2, 4, 6], // Diagonal
    ];

    for (const combination of winningCombination) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setIsGameOver(true);
        setResult(board[a]);
        dispatch(incrementScore(board[a]));
        return;
      }
    }

    if (board.every((cell) => cell)) {
      setIsGameOver(true);
      setResult("draw");
      dispatch(incrementScore("draw"));
    }
  }, [board]);

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
      <div
        className={`h-screen w-screen flex flex-col ${
          showScore ? "justify-between" : "justify-center"
        } py-24 items-center`}
      >
        {showScore && <ScorePanel player="X" sided="left" />}
        <div className="relative">
          <div className="grid grid-cols-3 max-h-96 max-w-96">
            {board.map((cell, index) => (
              <div
                className={`h-24 w-24 sm:h-32 sm:w-32 p-2 cell ${
                  "cell" + "-" + index
                }`}
              >
                <motion.div
                  whileHover={cell ? {} : { scale: 1.05 }}
                  whileTap={cell ? {} : { scale: 0.95 }}
                  onClick={() => handleClick(index)}
                  className={`grid place-content-center w-full h-full transition-colors p-2 ${
                    !cell ? "hover:bg-neutral-200" : ""
                  }`}
                >
                  {cell === "X" && <CrossIcon />}
                  {cell === "O" && <CircleIcon />}
                </motion.div>
              </div>
            ))}
          </div>
          <h1 className="absolute -bottom-16 w-full text-center">
            Turn:{" "}
            {currentPlayer === "X"
              ? store.players.X.name
              : store.players.O.name}
          </h1>
          {isGameOver && (
            <motion.div
              initial={{ y: "-10vh", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.35 }}
              className="absolute top-0 left-0 w-full h-full bg-white flex justify-center items-center flex-col gap-12"
            >
              <h1 className="text-4xl text-black font-bold">Game Over</h1>
              <p>{resultMessage}</p>
              <motion.button
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="px-3 py-2 bg-black text-white rounded-md"
                onClick={() => {
                  setBoard(Array(9).fill(null));
                  setCurrentPlayer("X");
                  setIsGameOver(false);
                }}
              >
                Play again
              </motion.button>
            </motion.div>
          )}
        </div>
        {showScore && <ScorePanel player="O" sided="right" />}
      </div>
      <button
        onClick={() => setShowScore(!showScore)}
        className="absolute bottom-6 right-8"
      >
        {!showScore ? "show" : "hide"} score
      </button>
    </>
  );
}

export default App;
