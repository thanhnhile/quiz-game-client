import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Socket, io } from "socket.io-client";
import { AppStateType, BASE_URL, UIState } from "../utils/constants";
import { RankingBoard } from "../pages/Game/interface";
import { postJoinGame } from "../pages/GameJoin/api";

type AppSliceType = {
  gameCode?: string;
  currentState?: AppStateType;
  socket: Socket | null;
  uiState?: UIState;
  rankingBoard?: RankingBoard;
  accessToken?: string;
  currentQuestionIndex?: number;
};

const initialState: AppSliceType = {
  socket: null,
};

export const joinGame = createAsyncThunk("app/joinGame", postJoinGame);

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    initSocket: (
      state,
      action: PayloadAction<{ code?: string; clientName?: string }>
    ) => {
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
    setCurrentQuestionIndex: (state, action: PayloadAction<number>) => {
      state.currentQuestionIndex = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      joinGame.fulfilled,
      (state, action: PayloadAction<{ accessToken: string }>) => {
        setAppState("WAITING");
        state.accessToken = action.payload.accessToken;
      }
    );
  },
});

export const { initSocket, setAppState, setUIState, setRankingBoard } =
  appSlice.actions;
export default appSlice.reducer;
