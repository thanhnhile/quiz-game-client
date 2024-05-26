import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useEffect, useState } from 'react';
import { GAME_EVENTS } from '@utils/events';
import { setAppState, setRankingBoard, setUIState } from '@reducers/appSlice';
import {
  CurrentQuestion,
  GameAnswerDto,
  Question,
  RankingBoard,
} from './interface';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Lottie from 'react-lottie';
import * as startAnimation from '@utils/lottie/start.json';
import Countdown from '@components/game/Countdown';
import RankingBoardComponent from '@components/game/RankingBoard';
import { motion } from 'framer-motion';
import * as mapFunction from './functions';

const Game = () => {
  const { socket, uiState, rankingBoard, name, gameCode, isHost } = useSelector(
    (state: RootState) => state.app
  );
  const [count, setCount] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<CurrentQuestion>();
  const [answer, setAnswer] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuizzQuestions = (data: Question) => {
    dispatch(setUIState('QUESTION'));
    setCurrentQuestion({
      ...data,
      appearTimestamp: Date.now(),
    });
  };

  const handleChangeAnswer = (optionId: string) => {
    if (!currentQuestion) return;
    setAnswer(optionId);
    const responeTimestamp = Date.now() - currentQuestion.appearTimestamp;
    const payload: GameAnswerDto = {
      code: gameCode ?? '',
      participantName: name ?? '',
      questionId: currentQuestion?._id ?? '',
      answerId: optionId,
      responeTimestamp,
    };
    socket?.emit(GAME_EVENTS.RECEIVE_ANSWER, payload);
  };

  const handleNext = () => {
    socket?.emit(GAME_EVENTS.NEXT_QUESTION);
  };

  useEffect(() => {
    socket?.on(GAME_EVENTS.GAME_STARTING, (currentCount) => {
      count === 0 && dispatch(setUIState('COUNT_DOWN'));
      setCount(currentCount);
    });
    socket?.on(GAME_EVENTS.QUIZZ_QUESTIONS, handleQuizzQuestions);
    socket?.on(GAME_EVENTS.QUESTION_TIME_OUT, (data) => {
      setAnswer('');
      console.log(data);
    });
    socket?.on(GAME_EVENTS.UPDATE_RANKING, (data: RankingBoard) => {
      data.hasNextQuestion && dispatch(setUIState('RANKING_BOARD'));
      dispatch(setRankingBoard(data));
    });
    socket?.on(GAME_EVENTS.TIME_OUT, () => {
      dispatch(setAppState('RESULT'));
      navigate(`/game/${gameCode}/result`);
    });
  }, []);

  const renderCountDown = () => {
    return uiState === 'COUNT_DOWN' ? (
      <motion.div
        initial={{ scale: 0.5, opacity: 0.5 }}
        animate={{ scale: 1.3, opacity: 1 }}
      >
        <Countdown value={count} />
      </motion.div>
    ) : null;
  };

  const renderQuestion = () => {
    return uiState === 'QUESTION' ? (
      <QuestionComponent
        question={currentQuestion}
        answer={answer}
        handChangeAnswer={handleChangeAnswer}
      />
    ) : null;
  };

  const renderRankingBoard = () => {
    const fakeData = {
      hasNextQuestion: true,
      data: [
        {
          name: 'laal',
          score: 920,
          _id: '665367b21c6fbf8cef75fc2a',
        },
        {
          name: 'laal2',
          score: 950,
          _id: '665367b21c6fbf8cef75fc2a',
        },
      ],
    };
    return true ? (
      <RankingBoardComponent
        data={mapFunction.mapRankingBoardData(fakeData, name)}
        handleNext={handleNext}
      />
    ) : null;
  };

  const renderStarting = () => {
    const defaultOptions = {
      autoplay: true,
      animationData: startAnimation,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    };
    return uiState === 'STARTING' ? (
      <Lottie options={defaultOptions} height={400} width={400} />
    ) : null;
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {/* {renderStarting()}
      {renderCountDown()}
      {renderQuestion()} */}
      {renderRankingBoard()}
    </Box>
  );
};

type QuestionPropType = {
  question?: Question;
  answer: string;
  handChangeAnswer: Function;
};

const QuestionComponent: React.FC<QuestionPropType> = ({
  question,
  answer,
  handChangeAnswer,
}) => {
  return (
    <div>
      <p>{question?.id}</p>
      <h3>{question?.content}</h3>
      {question?.options?.map((item) => {
        return (
          <div>
            <input
              checked={item.id === answer}
              onChange={() => handChangeAnswer(item.id)}
              type='radio'
              name={question._id}
              id={item.id}
              value={item.id}
            />
            <label htmlFor={item.id}>{item.content}</label>
          </div>
        );
      })}
    </div>
  );
};

export default Game;
