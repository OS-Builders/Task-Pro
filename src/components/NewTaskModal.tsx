import { createPortal } from "react-dom";

const NewTaskModal = () => {
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
          <div className="modal-btns">
            <button
              className="modal-submit"
              type="submit"
              disabled={isButtonDisabled}
            >
              Add Task
            </button>
            <button
              className="modal-cancel"
              onClick={() => {
                setCreatingBoard(false);
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
