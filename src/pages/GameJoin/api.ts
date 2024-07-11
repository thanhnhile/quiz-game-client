import * as request from '@utils/request';
import { GameJoinCreateDto } from '@utils/interface';

export const postJoinGame = async (payload: GameJoinCreateDto) => {
  try {
    const data = await request.post('game/join', payload);
    return data;
  } catch (error) {
    console.log(error);
  }
};
