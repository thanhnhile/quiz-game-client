import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Result = () => {
  const { rankingBoard } = useSelector((state: RootState) => state.app);

  return (
    <div>
      <h1>Result</h1>
      <div>
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
    </div>
  );
};

export default Result;
