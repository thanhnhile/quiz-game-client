export interface GameSesstionCreateDto {
  timeLimit: string;
  questionListId: string;
}

export interface Game {
  code: string;
  questionList: string;
  participants: [];
  timeLimit: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
