import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";



const initialState = {
  parts: []
} as any


const currentPostSlice = createSlice({
  name: "currentPost",
  initialState,
  reducers: {
    addPart: (state, action: PayloadAction<object>) => {
      state.parts.push({...action.payload})
    }
  },
  // extraReducers: (builder) => {
  //   builder.addCase()
  // }
})

export const { addPart } = currentPostSlice.actions
export const selectPart = (state: RootState) => state.currentPost
export default currentPostSlice.reducer