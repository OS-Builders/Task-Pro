import { useState, useEffect } from "react";
import "../scss/mainContainer.scss";
import { ContainerProps } from "../types";
import ColumnContainer from "./ColumnContainer.tsx";

const MainContainer = ({ user, currentBoard }: ContainerProps) => {
  // const [view, setView] = useState();
  useEffect(() => {
    const fetchBoard = async () => {
      if (currentBoard && currentBoard.name !== "") {
        const reponse: Response = await fetch(
          `/boards/board?board=${currentBoard.id}&user=${user.id}`
        );
        const board = await reponse.json();
        console.log(board);
      }
    };
    fetchBoard().catch(console.error);
  }, [currentBoard]);

  if (!currentBoard?.name) {
    return (
      <div className="main-container">
        <h1 className="heading">
          Select existing board or create a new one to get started!
        </h1>
      </div>
    );
  }

  return (
    <div className="main-container">
      <h1 className="board-title">{currentBoard.name}</h1>
      <ColumnContainer />
    </div>
  );
};

export default MainContainer;
