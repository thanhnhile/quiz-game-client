import { Participant } from '@pages/WaitingRoom/interface';
import { RankingBoard } from './interface';

export const mapRankingBoardData = (
  data: RankingBoard | undefined,
  currentName: string | undefined
) => {
  const { data: rankingData, hasNextQuestion } = data ?? { data: [] };
  const currentClientIndex = rankingData?.findIndex(
    (item) => item.name === currentName
  );
  const isInTop3 = currentClientIndex <= 2;
  return {
    hasNextQuestion,
    isInTop3,
    top3: rankingData.slice(0, 2),
    currentClient: {
      rank: currentClientIndex + 1,
      ...rankingData[currentClientIndex],
    },
    others: rankingData.slice(3).splice(currentClientIndex, 1),
  };
};
