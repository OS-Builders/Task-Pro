import { createPortal } from "react-dom";
import {
  BoardState,
  NewTaskModalProps,
  TaskFormState,
  TaskState,
} from "../types";
import { useState } from "react";
import "../scss/modal.scss";

const NewTaskModal = ({
  setAddingTask,
  currentBoard,
  setBoardState,
}: NewTaskModalProps) => {
  const [formData, setFormData] = useState<TaskFormState>({
    taskname: "",
    status: "backlog",
    tasknotes: "",
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
        const response: Response = await fetch(`/tasks/create`, {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify(body),
        });
        const task: TaskState = await response.json();
        if (response.status === 200) {
          console.log("newly created task: ", task);
          setBoardState((prevState: BoardState) => ({
            ...prevState,
            [task.status]: [...prevState[task.status], task],
          }));
        }
      }
    };
    fetchAddTask().catch(console.error);
    setAddingTask(false);
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
          <label htmlFor="taskname" className="modal-label">
            Task Name:{" "}
          </label>
          <input
            className="modal-input"
            name="taskname"
            type="text"
            placeholder="New Task"
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
                defaultChecked
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
            placeholder="Task Notes"
            onChange={handleInputChange}
            required
          />
          <div className="modal-btns">
            <button className="modal-submit" type="submit">
              Add Task
            </button>
            <button
              className="modal-cancel"
              type="button"
              onClick={() => {
                setAddingTask(false);
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

export default NewTaskModal;
