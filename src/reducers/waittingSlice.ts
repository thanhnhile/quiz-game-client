import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Participant } from "../pages/WaitingRoom/interface";
import {
  getParticipants,
  startGame as startGameApi,
} from "../pages/WaitingRoom/api";

type WaitingState = {
  participants: Participant[];
  count: number;
};

const initialState: WaitingState = {
  participants: [],
  count: 0,
};

//asyn thunk

export const getJoinedParticipants = createAsyncThunk(
  "waiting/getJoinedParticipants",
  getParticipants
);

export const startGame = createAsyncThunk("waiting/startGame", startGameApi);

//slice

const waitiingSilce = createSlice({
  name: "waiting",
  initialState,
  reducers: {
    setParticipants: (state, action: PayloadAction<Participant[]>) => {
      state.participants = action.payload;
      state.count = action.payload.length;
    },

    addParticipant: (state, action: PayloadAction<Participant>) => {
      state.participants.push(action.payload);
      state.count++;
    },

    removeParticipant: (state, action: PayloadAction<string>) => {
      const index = state.participants.findIndex(
        (p) => p.name === action.payload
      );
      if (index >= 0) {
        state.participants.splice(index, 1);
        state.count--;
      }
    },
  },
  extraReducers: (buider) => {
    buider.addCase(getJoinedParticipants.fulfilled, (state, action) => {
      if (action.payload) state.participants = action.payload;
    });
  },
});

export const { setParticipants, addParticipant, removeParticipant } =
  waitiingSilce.actions;
export default waitiingSilce.reducer;
