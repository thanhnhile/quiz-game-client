import * as request from "../../utils/request";
import { GameJoinCreateDto } from "./interface";

export const joinGame = async (payload: GameJoinCreateDto) => {
  try {
    const data = await request.post("game/join", payload);
    return data;
  } catch (error) {
    console.log(error);
  }
};
