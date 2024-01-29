import { useState, useEffect } from "react";
import Column from "../components/Column";
import "../scss/columnContainer.scss";
import { ColumnContainerProps } from "../types";

const ColumnContainer = ({ user, currentBoard }: ColumnContainerProps) => {
  const [backlog, setBacklog] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [inReview, setInReview] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    //fetching
  }, [currentBoard]);

  const columns = [];
  const columnNames = ["Backlog", "In Progress", "In Review", "Completed"];
  for (let i = 0; i < 4; i++) {
    columns.push(
      <Column
        key={i}
        name={columnNames[i]}
        create={i === 0 ? true : false}
        user={user}
        currentBoard={currentBoard}
      />
    );
  }
  return <div className="column-container">{columns}</div>;
};

export default ColumnContainer;
