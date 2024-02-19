import Column from "../components/Column";
import "../scss/columnContainer.scss";
import { ColumnContainerProps, BoardState, TaskState } from "../types";
import { DndContext, rectIntersection, DragEndEvent } from "@dnd-kit/core";

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

  const handleDragEnd = (e: DragEndEvent) => {
    const task = e.active.data.current?.task;
    const startColumn: "backlog" | "inProgress" | "inReview" | "completed" =
      task.status;
    const endColumn = e.over?.id;
    console.log("drag start: ", startColumn);
    console.log("drag end: ", endColumn);

    const fetchEditTask = async () => {
      const body = {
        taskname: task.name,
        status: endColumn,
        tasknotes: task.notes,
        taskId: task._id,
        boardId: currentBoard.id,
        startColumn: startColumn,
      };
      const response: Response = await fetch(`/tasks/edit`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(body),
      });
      const editedTask: TaskState = await response.json();
      if (response.status === 200) {
        // update the board state, removing from array if necessary
        setBoardState((prevState: BoardState) => {
          const column = [...prevState[startColumn]];
          const idx = column.indexOf(task);
          // if changing columns, remove from startColumn and add to new column
          if (task.status !== editedTask.status) {
            column.splice(idx, 1);
            return {
              ...prevState,
              [editedTask.status]: [
                ...prevState[editedTask.status],
                editedTask,
              ],
              [startColumn]: column,
            };
          }
          // else update the existing column with new task name and notes
          else {
            column[idx] = editedTask;
            return {
              ...prevState,
              [startColumn]: column,
            };
          }
        });
      }
    };
    fetchEditTask().catch(console.error);
  };

  return (
    <DndContext collisionDetection={rectIntersection} onDragEnd={handleDragEnd}>
      <div className="column-container">{columns}</div>
    </DndContext>
  );
};

export default ColumnContainer;
