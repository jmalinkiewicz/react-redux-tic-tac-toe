import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./features/score/gameSlice";

export const store = configureStore({
  reducer: {
    game: gameSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
