export interface Participant {
  name: string;
}

export interface GameStartDto {
  code: string;
}

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

export interface RankingBoardParticipant extends Participant {
  totalScore: number;
  latestScore: number;
}

export interface RankingBoard {
  hasNextQuestion: boolean;
  data: RankingBoardParticipant[];
}

export interface GameJoinCreateDto {
  name: string;
  code: string;
}
