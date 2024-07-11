import { RankingBoard } from '@utils/interface';
import { RankingBoardData } from '@components/game/RankingBoard';

export const mapRankingBoardData = (
  data: RankingBoard | undefined,
  currentName: string | undefined
): RankingBoardData => {
  console.log('Current name: ', { currentName, data });
  const { data: rankingData, hasNextQuestion } = data ?? { data: [] };
  const currentClientIndex = rankingData?.findIndex(
    (item) => item.name === currentName
  );
  const isInTop3 = currentClientIndex >= 0 && currentClientIndex <= 2;
  return {
    hasNextQuestion,
    isInTop3,
    top3: rankingData.slice(0, 3),
    currentClient: {
      yourRank: currentClientIndex,
      ...rankingData[currentClientIndex],
    },
    others: rankingData.slice(3).splice(currentClientIndex, 1),
  };
};
