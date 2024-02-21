import { createPortal } from "react-dom";
import {
  BoardState,
  EditTaskModalProps,
  TaskFormState,
  TaskState,
} from "../types";
import { useState } from "react";
import "../scss/modal.scss";

const EditTaskModal = ({
  setEditingTask,
  currentBoard,
  setBoardState,
  task,
  startColumn,
}: EditTaskModalProps) => {
  const [formData, setFormData] = useState<TaskFormState>({
    taskname: task.name,
    status: task.status,
    tasknotes: task.notes,
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault;
    console.log("Edit Task Form Submitted: ", formData);
    // send POST request with the  edited task, originla column and current board
    const fetchEditTask = async () => {
      const body = {
        ...formData,
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
    setEditingTask(null);
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData: TaskFormState) => ({ ...prevData, [name]: value }));
  };

  const handleDeleteTask = () => {
    const fetchDeleteTask = async () => {
      const response: Response = await fetch(`/tasks/delete/${task._id}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        setBoardState((prevState: BoardState) => {
          const column = [...prevState[startColumn]];
          const idx = column.indexOf(task);
          column.splice(idx, 1);
          return {
            ...prevState,
            [startColumn]: column,
          };
        });
      }
    };
    fetchDeleteTask().catch(console.error);
    setEditingTask(null);
  };

  return createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <form className="modal-form" onSubmit={handleFormSubmit}>
          <h2 className="modal-title">Edit Task</h2>
          <label htmlFor="taskname" className="modal-label">
            Task Name:{" "}
          </label>
          <input
            className="modal-input"
            name="taskname"
            type="text"
            value={formData.taskname}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="modal-radio" className="modal-label">
            Task Status:{" "}
          </label>
          <div className="modal-radio">
            <div className="modal-radio-pair">
              <input
                type="radio"
                name="status"
                id="backlog"
                value={"backlog"}
                onChange={handleInputChange}
                defaultChecked={task.status === "backlog"}
              />
              <label htmlFor="backlog" className="modal-option">
                Backlog
              </label>
            </div>

            <div className="modal-radio-pair">
              <input
                type="radio"
                name="status"
                id="in-progress"
                value={"inProgress"}
                onChange={handleInputChange}
                defaultChecked={task.status === "inProgress"}
              />
              <label htmlFor="in-progress" className="modal-option">
                In Progress
              </label>
            </div>

            <div className="modal-radio-pair">
              <input
                type="radio"
                name="status"
                id="in-review"
                value={"inReview"}
                onChange={handleInputChange}
                defaultChecked={task.status === "inReview"}
              />
              <label htmlFor="in-review" className="modal-option">
                In Review
              </label>
            </div>

            <div className="modal-radio-pair">
              <input
                type="radio"
                name="status"
                id="completed"
                value={"completed"}
                onChange={handleInputChange}
                defaultChecked={task.status === "completed"}
              />
              <label htmlFor="completed" className="modal-option">
                Completed
              </label>
            </div>
          </div>
          <label htmlFor="tasknotes" className="modal-label">
            Task Notes:{" "}
          </label>
          <textarea
            className="modal-input text"
            name="tasknotes"
            value={formData.tasknotes}
            onChange={handleInputChange}
            required
          />
          <div className="modal-btns">
            <button className="modal-submit" type="submit">
              Save
            </button>
            <button
              className="modal-cancel"
              type="button"
              onClick={() => {
                setEditingTask(null);
              }}
            >
              Cancel
            </button>
            <button
              className="modal-delete"
              type="button"
              onClick={handleDeleteTask}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("portal") as Element
  );
};

export default EditTaskModal;
