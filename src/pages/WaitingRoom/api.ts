import * as request from "../../utils/request";
import { GameStartDto, Participant } from "./interface";

export const getParticipants = async (code: string) => {
  try {
    const participants: Participant[] = await request.get(
      `game/${code}/participants`
    );
    return participants ?? [];
  } catch (e) {}
};

export const startGame = async (payload: GameStartDto) => {
  try {
    return await request.post("game/start", payload);
  } catch (e) {
    console.log(e);
  }
};
