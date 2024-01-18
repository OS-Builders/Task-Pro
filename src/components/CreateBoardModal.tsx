import { createPortal } from "react-dom";
import { CreateBoardModalProps } from "../types";
import { useState } from "react";

const CreateBoardModal = ({
  setCreatingBoard,
  setCurrentBoard,
  user,
}: CreateBoardModalProps) => {
  const [boardName, setBoardName] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardName(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // send post request to /boards/create with formData in body
    const body = {
      boardName: boardName,
      userId: user.id,
    };
    const response: Response = await fetch("/boards/create", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(body),
    });
    // receive username from backend
    // if request success, save username to state and route to dashboard
    if (response.status === 200) {
      setCreatingBoard(false);
      setCurrentBoard(response.name);
    } else {
    }
  };

  return createPortal(
    <div className="create-board-modal">
      <h2>New Board</h2>
      <form className="modal-form" onSubmit={handleFormSubmit}>
        <input
          className="modal-input"
          name="boardname"
          type="text"
          placeholder="Enter Board Name"
          onChange={handleInputChange}
          required
        />
        <button className="board-submit" type="submit">
          Save
        </button>
        <button
          className="cancel-btn"
          onClick={() => {
            setCreatingBoard(false);
          }}
        >
          Cancel
        </button>
      </form>
    </div>,
    document.getElementById("portal") as Element
  );
};

export default CreateBoardModal;
