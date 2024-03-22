import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Socket, io } from "socket.io-client";
import { AppStateType, BASE_URL, UIState } from "../utils/constants";
import { RankingBoard } from "../pages/Game/interface";
import { postJoinGame } from "../pages/GameJoin/api";
import { postCreateNewGame } from "../pages/CreateGameSession/api";

type AppSliceType = {
  gameCode?: string;
  currentState?: AppStateType;
  socket: Socket | null;
  uiState?: UIState;
  rankingBoard?: RankingBoard;
  accessToken?: string;
  name?: string;
  isHost: boolean;
};

const initialState: AppSliceType = {
  socket: null,
  isHost: false,
};

export const joinGame = createAsyncThunk("app/joinGame", postJoinGame);

export const createNewGame = createAsyncThunk(
  "app/createNewGame",
  postCreateNewGame
);

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    initSocket: (state) => {
      if (!state.socket) {
        let roomSocket = io(BASE_URL, {
          auth: {
            token: state.accessToken,
          },
        });

        return {
          ...state,
          socket: roomSocket,
        };
      }
    },
    setAppState: (state, action: PayloadAction<AppStateType>) => {
      state.currentState = action.payload;
    },
    setUIState: (state, action: PayloadAction<UIState>) => {
      state.uiState = action.payload;
    },
    setRankingBoard: (state, action: PayloadAction<RankingBoard>) => {
      state.rankingBoard = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        joinGame.fulfilled,
        (
          state,
          action: PayloadAction<{
            accessToken: string;
            name: string;
            code: string;
          }>
        ) => {
          state.accessToken = action.payload?.accessToken;
          state.name = action.payload?.name;
          state.isHost = false;
          state.gameCode = action.payload.code;
        }
      )
      .addCase(
        createNewGame.fulfilled,
        (
          state,
          action: PayloadAction<{ accessToken: string; code: string }>
        ) => {
          state.accessToken = action.payload.accessToken;
          state.isHost = true;
          state.gameCode = action.payload.code;
        }
      );
  },
});

export const { initSocket, setAppState, setUIState, setRankingBoard } =
  appSlice.actions;
export default appSlice.reducer;
