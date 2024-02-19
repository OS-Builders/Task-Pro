import { useState } from "react";
import { CardProps } from "../types";
import notesSvg from "../assets/note-text-svgrepo-com.svg";
import editSvg from "../assets/edit-cover-1481-svgrepo-com.svg";
import "../scss/taskCard.scss";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const Card = ({ info, setEditingTask }: CardProps) => {
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: info._id,
    data: {
      task: info,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      className="task-card"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
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
