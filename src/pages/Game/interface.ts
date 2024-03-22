import { Participant } from "../WaitingRoom/interface";

export interface Question {
  id: string;
  _id: string;
  content: string;
  image: string;
  options: [Option];
  answer: string;
}

export interface CurrentQuestion extends Question {
  appearTimestamp: number;
}

export interface Option {
  id: string;
  content: string;
}

export interface GameAnswerDto {
  code: string;
  participantName: string;
  questionId: string;
  answerId: string;
  responeTimestamp: number;
}

export interface RankingBoard {
  hasNextQuestion: boolean;
  top3: Participant[];
  others: Participant[];
}
