import { ContainerProps } from "../types";
import { useEffect, useState } from "react";

const LeftContainer = ({ username, setCurrentBoard }: ContainerProps) => {
  //creating state to store the list of board names
  const [boardList, setBoardList] = useState([]);
  // make a request for all board naames, return an array containing strings of the board names
  const fetchBoardList = async () => {
    const reponse: Response = await fetch(`/boards/${username}`);
    const list = await reponse.json();
    setBoardList(list);
    console.log(boardList);
  };
  fetchBoardList().catch(console.error);

  // function for changing board when click selection button
  const handleBoardSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault;
    setCurrentBoard(e.currentTarget.name);
  };

  // function for creating a new board
  const handleCreateBoard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault;
    // create a pop up to create the new board
  };

  // iterate through board names push buttons or components into array boardlist in state
  const boardSelectors = [];
  for (let i = 0; i < boardList.length; i++) {
    boardSelectors.push(
      <button onClick={handleBoardSelect} name={boardList[i]}>
        boardList[i]
      </button>
    );
  }

  return (
    <div className="left-container">
      <h2>Hello {username}</h2>
      <h1>My Boards</h1>
      <button onClick={handleCreateBoard}>Create New Board +</button>
      <div>{boardSelectors}</div>
    </div>
  );
};

export default LeftContainer;
