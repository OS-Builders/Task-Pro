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
}: EditTaskModalProps) => {
  const [formData, setFormData] = useState<TaskFormState>({
    taskname: task.name,
    status: task.status,
    tasknotes: task.notes,
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault;
    console.log("New Task Form Submitted: ", formData);
    // send POST request with the new task card, user and current board
    const fetchAddTask = async () => {
      if (currentBoard && currentBoard.name !== "") {
        const body = {
          ...formData,
          boardId: currentBoard.id,
        };
        const response: Response = await fetch(`/tasks/edit`, {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify(body),
        });
        const task: TaskState = await response.json();
        if (response.status === 200) {
          console.log("edited task: ", task);
          // update the board state, removing from array if necessary
          setBoardState((prevState: BoardState) => ({
            ...prevState,
            [task.status]: [...prevState[task.status], task],
          }));
        }
      }
    };
    fetchAddTask().catch(console.error);
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

  return createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <form className="modal-form" onSubmit={handleFormSubmit}>
          <h2 className="modal-title">New Task</h2>
          <label htmlFor="taskname">Task Name: </label>
          <input
            className="modal-input"
            name="taskname"
            type="text"
            value={task.name}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="modal-radio">Task Status: </label>
          <div className="modal-radio">
            <input
              type="radio"
              name="status"
              id="backlog"
              value={"backlog"}
              onChange={handleInputChange}
              checked={task.status === "backlog"}
            />
            <label htmlFor="backlog">Backlog</label>
            <input
              type="radio"
              name="status"
              id="in-progress"
              value={"inProgress"}
              onChange={handleInputChange}
              checked={task.status === "inProgress"}
            />
            <label htmlFor="in-progress">In Progress</label>
            <input
              type="radio"
              name="status"
              id="in-review"
              value={"inReview"}
              onChange={handleInputChange}
              checked={task.status === "inReview"}
            />
            <label htmlFor="in-review">In Review</label>
            <input
              type="radio"
              name="status"
              id="completed"
              value={"completed"}
              onChange={handleInputChange}
              checked={task.status === "completed"}
            />
            <label htmlFor="completed">Completed</label>
          </div>
          <label htmlFor="tasknotes">Task Notes: </label>
          <textarea
            className="modal-input text"
            name="tasknotes"
            value={task.notes}
            onChange={handleInputChange}
            required
          />
          <div className="modal-btns">
            <button className="modal-submit" type="submit">
              Add Task
            </button>
            <button
              className="modal-cancel"
              onClick={() => {
                setEditingTask(null);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("portal") as Element
  );
};

export default EditTaskModal;
