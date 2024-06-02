import { createSlice } from "@reduxjs/toolkit";

type GameState = {
  players: {
    X: {
      name: string;
      score: number;
    };
    O: {
      name: string;
      score: number;
    };
  };
};

const initialState: GameState = {
  players: {
    X: {
      name: "Player X",
      score: 0,
    },
    O: {
      name: "Player O",
      score: 0,
    },
  },
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    incrementScore: (
      state: GameState,
      action: { payload: keyof GameState["players"] | "draw" }
    ) => {
      if (action.payload === "draw") {
        state.players.X.score += 1;
        state.players.O.score += 1;
        return;
      }

      const player: keyof GameState["players"] = action.payload;
      state.players[player].score += 1;
    },
    resetScore: (state: GameState) => {
      state.players.X.score = 0;
      state.players.O.score = 0;
    },
    setName: (
      state: GameState,
      action: { payload: { player: keyof GameState["players"]; name: string } }
    ) => {
      const { player, name } = action.payload;
      state.players[player].name = name;
    },
  },
});

export const { incrementScore, resetScore, setName } = gameSlice.actions;

export default gameSlice.reducer;
