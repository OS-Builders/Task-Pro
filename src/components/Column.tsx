import { useEffect, useState, ReactNode } from "react";
import { ColumnProps, TaskState } from "../types";
import NewTaskModal from "./NewTaskModal";
import Card from "./Card.tsx";
import EditTaskModal from "./EditTaskModal.tsx";

const Column = ({
  name,
  create,
  currentBoard,
  boardState,
  setBoardState,
}: ColumnProps) => {
  const [addingTask, setAddingTask] = useState<boolean>(false);
  const [numTasks, setNumTasks] = useState<number>(0);
  const [taskCards, setTaskCards] = useState<ReactNode[]>([]);
  const [editingTask, setEditingTask] = useState<TaskState | null>(null);

  const handleNewTask = () => {
    setAddingTask(true);
  };

  //effect for rendering cards
  useEffect(() => {
    const column = boardState[name];
    setNumTasks(column.length);
    const cardsArray = column.map((task: TaskState) => {
      return (
        <Card info={task} setEditingTask={setEditingTask} key={task._id} />
      );
    });
    setTaskCards(cardsArray);
  }, [boardState, name]);

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
          currentBoard={currentBoard}
          setBoardState={setBoardState}
        />
      ) : null}
      {editingTask ? (
        <EditTaskModal
          setEditingTask={setEditingTask}
          currentBoard={currentBoard}
          task={editingTask}
          setBoardState={setBoardState}
          startColumn={name}
        />
      ) : null}
    </div>
  );
};
export default Column;
