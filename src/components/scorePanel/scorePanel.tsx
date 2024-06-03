import { GameState, setName } from "../../features/score/gameSlice";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { motion } from "framer-motion";

export default function ScorePanel({
  player,
  sided,
}: {
  player: keyof GameState["players"];
  sided: "left" | "right";
}) {
  const store = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  return (
    <div
      className={`p-2 border-[1px] ${
        sided === "left" ? "text-left" : "text-right"
      }`}
    >
      <motion.input
        whileHover={{
          backgroundColor: "#f5f5f5",
        }}
        whileFocus={{
          backgroundColor: "#f5f5f5",
        }}
        className={`text-2xl py-0.5 font-bold focus:outline-none ${
          sided === "right" ? "text-right" : "text-left"
        }`}
        type="text"
        onChange={(e) => {
          dispatch(
            setName({
              player,
              name: e.target.value,
            })
          );
        }}
        value={store.players[player].name}
      />
      <p>Score: {store.players[player].score}</p>
    </div>
  );
}
