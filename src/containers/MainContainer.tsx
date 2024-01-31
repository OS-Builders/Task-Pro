import { useState, useEffect } from "react";
import "../scss/mainContainer.scss";
import { BoardState, MainContainerProps } from "../types";
import ColumnContainer from "./ColumnContainer.tsx";

const MainContainer = ({ user, currentBoard }: MainContainerProps) => {
  // set the board state as empty arrays, will be populated with board ids after fetch
  const [boardState, setBoardState] = useState<BoardState>({
    backlog: [],
    inProgress: [],
    inReview: [],
    completed: [],
  });

  // effect for fetching the current board info whenever currentBoard changes
  useEffect(() => {
    const fetchBoard = async () => {
      // fetch the currentBoard if a board has been selected
      if (currentBoard && currentBoard.name !== "") {
        const reponse: Response = await fetch(
          `/boards/board?board=${currentBoard.id}&user=${user.id}`
        );
        const board = await reponse.json();
        // update state with the fetched data
        console.log("MainContainer board: ", board);
        const { boardOwner, name, _id, __v, ...columns } = board;
        await setBoardState({ ...columns });
      }
    };
    fetchBoard().catch(console.error);
  }, [currentBoard]);

  //
  useEffect(() => {
    console.log("MainContainer boardState:", boardState); // Log the updated state after it's set
  }, [boardState]); // Log when the boardState changes

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
      <ColumnContainer
        user={user}
        currentBoard={currentBoard}
        boardState={boardState}
        setBoardState={setBoardState}
      />
    </div>
  );
};

export default MainContainer;
