import { useEffect, useState, ReactNode } from "react";
import { ColumnProps, TaskState } from "../types";
import NewTaskModal from "./NewTaskModal";
import Card from "./Card.tsx";

const Column = ({
  name,
  create,
  user,
  currentBoard,
  boardState,
}: ColumnProps) => {
  // state for rendering new task modal
  const [addingTask, setAddingTask] = useState<boolean>(false);

  // state for number of tasks in a column
  const [numTasks, setNumTasks] = useState<number>(0);

  // state for storing task card components
  const [taskCards, setTaskCards] = useState<ReactNode[]>([]);

  // render new task modal on button click
  const handleNewTask = () => {
    setAddingTask(true);
  };

  //effect for rendering cards based on intial state
  useEffect(() => {
    const column = boardState[name];
    console.log("Column column: ", column);
    setNumTasks(column.length);
    // map column to an array of task card components and then set as the state
    const cardsArray = column.map((task: TaskState) => {
      return <Card info={task} key={task._id} />;
    });
    setTaskCards(cardsArray);
  }, [boardState]);

  //effect for updating state as boardState changes, only update if need by comparing numTasks to column.length

  return (
    <div className="column">
      <h2 className="column-title">
        {(name === "backlog"
          ? "Backlog"
          : name === "inProgress"
          ? "In Progress"
          : name === "inReview"
          ? "In Review"
          : "Completed") + ` (${numTasks})`}
      </h2>
      <div className="cards-container">
        {create && (
          <button className="new-task-btn" onClick={handleNewTask}>
            Add New Task +
          </button>
        )}
        {taskCards}
      </div>
      {addingTask ? (
        <NewTaskModal
          setAddingTask={setAddingTask}
          user={user}
          currentBoard={currentBoard}
        />
      ) : null}
    </div>
  );
};
export default Column;
