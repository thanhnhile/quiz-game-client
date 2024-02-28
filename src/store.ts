import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import waittingReducer from "./reducers/waittingSlice";
import appReducer from "./reducers/appSlice";

export const store = configureStore({
  reducer: {
    waitting: waittingReducer,
    app: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
