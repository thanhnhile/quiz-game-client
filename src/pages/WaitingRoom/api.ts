import * as request from '../../utils/request';
import { Participant } from './interface';

export const getParticipants = async (code: string) => {
  try {
    const participants: Participant[] = await request.get(
      `game/${code}/participants`
    );
    return participants ?? [];
  } catch (e) {
    console.log(e);
  }
};
