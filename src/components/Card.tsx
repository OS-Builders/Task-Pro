import { useState } from "react";
import { CardProps } from "../types";
import notesSvg from "../assets/note-text-svgrepo-com.svg";
import editSvg from "../assets/edit-cover-1481-svgrepo-com.svg";
import "../scss/taskCard.scss";

const Card = ({ info, setEditingTask }: CardProps) => {
  const [showNotes, setShowNotes] = useState<boolean>(false);
  return (
    <div className="task-card">
      <h3 className="task-name">{info.name}</h3>
      {showNotes ? <p className="task-notes">{info.notes}</p> : null}
      <div className="task-btns-container">
        <button
          className="task-btn"
          id={info._id}
          onClick={() => {
            setEditingTask(info);
          }}
        >
          <img src={editSvg} alt="Edit SVG" className="task-svg" />
        </button>
        <button
          className="task-btn"
          onClick={() => {
            setShowNotes(!showNotes);
          }}
        >
          <img src={notesSvg} alt="Notes SVG" className="task-svg" />
        </button>
      </div>
    </div>
  );
};

export default Card;
