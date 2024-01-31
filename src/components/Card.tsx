import { useState } from "react";
import { CardProps } from "../types";
import notesSvg from "../assets/note-text-svgrepo-com.svg";
import "../scss/taskCard.scss";

const Card = ({ info }: CardProps) => {
  const [showNotes, setShowNotes] = useState<boolean>(false);
  return (
    <div className="task-card">
      <h3 className="task-name">{info.name}</h3>
      {showNotes ? <p className="task-notes">{info.notes}</p> : null}
      <button
        className="toggle-notes-btn"
        onClick={() => {
          setShowNotes(!showNotes);
        }}
      >
        <img src={notesSvg} alt="Notes SVG" className="notes-svg" />
      </button>
    </div>
  );
};

export default Card;
