import * as request from "../../utils/request";
import { GameSesstionCreateDto } from "./interface";

export const postCreateNewGame = async (payload: GameSesstionCreateDto) => {
  try {
    const data = await request.post("games", payload);
    return data;
  } catch (error) {
    console.log(error);
  }
};
