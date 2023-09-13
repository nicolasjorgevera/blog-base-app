import { configureStore } from "@reduxjs/toolkit";
import currentPostReducer from "./currentPostSlice";

export function makeStore (){
  return configureStore ({
    reducer: {
      currentPost: currentPostReducer,
    }
  })
}

export const store = makeStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch