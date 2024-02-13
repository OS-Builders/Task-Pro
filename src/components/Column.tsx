import { useEffect, useState, ReactNode } from "react";
import { ColumnProps, TaskState } from "../types";
import NewTaskModal from "./NewTaskModal";
import Card from "./Card.tsx";
import EditTaskModal from "./EditTaskModal.tsx";

const Column = ({
  name,
  create,
  user,
  currentBoard,
  boardState,
  setBoardState,
}: ColumnProps) => {
  // state for rendering new task modal
  const [addingTask, setAddingTask] = useState<boolean>(false);

  // state for number of tasks in a column
  const [numTasks, setNumTasks] = useState<number>(0);

  // state for storing task card components
  const [taskCards, setTaskCards] = useState<ReactNode[]>([]);

  // state for editing a task card
  const [editingTask, setEditingTask] = useState<TaskState | null>(null);

  // render new task modal on button click
  const handleNewTask = () => {
    setAddingTask(true);
  };

  //effect for rendering cards
  useEffect(() => {
    const column = boardState[name];
    console.log("Column column: ", column);
    setNumTasks(column.length);
    // map column to an array of task card components and then set as the state
    const cardsArray = column.map((task: TaskState) => {
      return (
        <Card
          info={task}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
          key={task._id}
        />
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
