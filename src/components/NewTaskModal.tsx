import { createPortal } from "react-dom";
import { NewTaskModalProps, TaskFormState } from "../types";
import { useState } from "react";
import Card from "./Card";
import "../scss/modal.scss";

const NewTaskModal = ({
  setAddingTask,
  currentBoard,
  setTaskCards,
  taskCards,
  setBoardState,
}: NewTaskModalProps) => {
  const [formData, setFormData] = useState<TaskFormState>({
    taskname: "",
    status: "Backlog",
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
        const task = await response.json();
        if (response.status === 200) {
          console.log("newly created task: ", task);
          setBoardState((prevState) => ({
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
          <h2 className="modal-title">New Board</h2>
          <label htmlFor="taskname">Task Name: </label>
          <input
            className="modal-input"
            name="taskname"
            type="text"
            placeholder="New Task"
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
              defaultChecked
            />
            <label htmlFor="backlog">Backlog</label>
            <input
              type="radio"
              name="status"
              id="in-progress"
              value={"inProgress"}
              onChange={handleInputChange}
            />
            <label htmlFor="in-progress">In Progress</label>
            <input
              type="radio"
              name="status"
              id="in-review"
              value={"inReview"}
              onChange={handleInputChange}
            />
            <label htmlFor="in-review">In Review</label>
            <input
              type="radio"
              name="status"
              id="completed"
              value={"completed"}
              onChange={handleInputChange}
            />
            <label htmlFor="completed">Completed</label>
          </div>
          <label htmlFor="tasknotes">Task Notes: </label>
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
