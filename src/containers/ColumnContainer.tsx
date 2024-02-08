import Column from "../components/Column";
import "../scss/columnContainer.scss";
import { ColumnContainerProps, BoardState } from "../types";

const ColumnContainer = ({
  user,
  currentBoard,
  boardState,
  setBoardState,
}: ColumnContainerProps) => {
  const columns = [];
  const columnNames: Array<keyof BoardState> = [
    "backlog",
    "inProgress",
    "inReview",
    "completed",
  ];
  for (let i = 0; i < 4; i++) {
    columns.push(
      <Column
        key={i}
        name={columnNames[i]}
        create={i === 0 ? true : false}
        user={user}
        currentBoard={currentBoard}
        boardState={boardState}
        setBoardState={setBoardState}
      />
    );
  }
  return <div className="column-container">{columns}</div>;
};

export default ColumnContainer;
