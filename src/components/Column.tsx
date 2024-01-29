import { useState } from "react";
import { ColumnProps } from "../types";
import NewTaskModal from "./NewTaskModal";

const Column = ({ name, create, user, currentBoard }: ColumnProps) => {
  // state for rendering new task modal
  const [addingTask, setAddingTask] = useState(false);

  // render new task modal on button click
  const handleNewTask = () => {
    setAddingTask(true);
  };

  return (
    <div className="column">
      <h2 className="column-title">{name}</h2>
      <div className="cards-container">
        {create && (
          <button className="new-task-btn" onClick={handleNewTask}>
            Add New Task +
          </button>
        )}
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
