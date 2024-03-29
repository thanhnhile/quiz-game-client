import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import { GAME_EVENTS } from "../../utils/events";
import {
  setAppState,
  setRankingBoard,
  setUIState,
} from "../../reducers/appSlice";
import {
  CurrentQuestion,
  GameAnswerDto,
  Question,
  RankingBoard,
} from "./interface";
import { useNavigate } from "react-router-dom";

const Game = () => {
  const { socket, uiState, rankingBoard, name, gameCode, isHost } = useSelector(
    (state: RootState) => state.app
  );
  const [count, setCount] = useState();
  const [currentQuestion, setCurrentQuestion] = useState<CurrentQuestion>();
  const [answer, setAnswer] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuizzQuestions = (data: Question) => {
    dispatch(setUIState("QUESTION"));
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
      code: gameCode ?? "",
      participantName: name ?? "",
      questionId: currentQuestion?._id ?? "",
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
      setCount(currentCount);
    });
    socket?.on(GAME_EVENTS.QUIZZ_QUESTIONS, handleQuizzQuestions);
    socket?.on(GAME_EVENTS.QUESTION_TIME_OUT, (data) => {
      setAnswer("");
      console.log(data);
    });
    socket?.on(GAME_EVENTS.UPDATE_RANKING, (data: RankingBoard) => {
      data.hasNextQuestion && dispatch(setUIState("RANKING_BOARD"));
      dispatch(setRankingBoard(data));
    });
    socket?.on(GAME_EVENTS.TIME_OUT, () => {
      dispatch(setAppState("RESULT"));
      navigate(`/game/${gameCode}/result`);
    });
  }, []);

  const renderCountDown = () => {
    return uiState === "COUNT_DOWN" ? <h1>{count}</h1> : null;
  };

  const renderQuestion = () => {
    return uiState === "QUESTION" ? (
      <QuestionComponent
        question={currentQuestion}
        answer={answer}
        handChangeAnswer={handleChangeAnswer}
      />
    ) : null;
  };

  const renderRankingBoard = () => {
    return uiState === "RANKING_BOARD" ? (
      <div>
        {isHost && <button onClick={handleNext}>Next</button>}
        <div>
          <h3>TOP 3</h3>
          {rankingBoard?.top3?.map((p, index) => {
            return (
              <h4>
                {index + 1}. {p.name} - {p.score}
              </h4>
            );
          })}
        </div>
        <ul>
          {rankingBoard?.others?.map((p) => (
            <ol>
              {p.name} - {p.score}
            </ol>
          ))}
        </ul>
      </div>
    ) : null;
  };

  return (
    <div>
      {renderCountDown()}
      {renderQuestion()}
      {renderRankingBoard()}
    </div>
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
              type="radio"
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
