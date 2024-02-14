import { createPortal } from "react-dom";
import { EditBoardModalProps } from "../types";
import { useState } from "react";
import "../scss/modal.scss";

const EditBoardModal = ({
  setEditingBoard,
  setCurrentBoard,
  currentBoard,
}: EditBoardModalProps) => {
  const [boardName, setBoardName] = useState<string>(currentBoard.name);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue: string = e.target.value;
    setBoardName(inputValue.trim()); //edge case for whitespace
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // send put request to /boards/edit with new boardName and id in body
    const body = {
      boardName: boardName,
      id: currentBoard.id,
    };
    const response: Response = await fetch("/boards/edit", {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(body),
    });
    // if request success, update currentBoard
    if (response.status === 200) {
      const responseData = await response.json();
      setCurrentBoard({ name: responseData.name, id: responseData._id });
      setEditingBoard(false);
    } else {
      console.log("Failed to edit board.");
    }
  };

  const handleDeleteBoard = () => {
    const fetchDeleteBoard = async () => {
      const response: Response = await fetch(
        `/boards/delete/${currentBoard.id}`,
        {
          method: "DELETE",
        }
      );
      if (response.status === 200) {
        setCurrentBoard({
          name: "",
          id: "",
        });
        setEditingBoard(false);
      }
    };
    fetchDeleteBoard().catch(console.error);
  };

  const isButtonDisabled: boolean = boardName === ""; //checking if boardName is empty? using trim in handle input

  return createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <form className="modal-form" onSubmit={handleFormSubmit}>
          <h2 className="modal-title">Edit Board</h2>
          <input
            className="modal-input"
            name="boardname"
            type="text"
            value={boardName}
            onChange={handleInputChange}
            required
          />
          <div className="modal-btns">
            <button
              className="modal-submit"
              type="submit"
              disabled={isButtonDisabled}
            >
              Save
            </button>
            <button
              className="modal-cancel"
              onClick={() => {
                setEditingBoard(false);
              }}
            >
              Cancel
            </button>
            <button className="modal-delete" onClick={handleDeleteBoard}>
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("portal") as Element
  );
};

export default EditBoardModal;
