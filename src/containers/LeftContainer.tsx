import { DashboardProps } from "../types";
import { useEffect, useState } from "react";

const LeftContainer = ({ username }: DashboardProps) => {
  //creating boardsState
  const [boardList, setBoardList] = useState([]);
  // make a request for all board naames
  const fetchBoardList = async () => {
    const reponse: Response = await fetch(`/api/${username}`);
    const list = await reponse.json();
    setBoardList(list);
    console.log(boardList);
  };
  fetchBoardList().catch(console.error);

  // iterate through board names push buttons or components into array boardlist in state
  const boardSelectors = [];
  for (let i = 0; i < boardList.length; i++) {
    boardSelectors.push(<BoardSelector name={boardList[i]} />);
  }

  return (
    <div className="left-container">
      <h2>Hello {username}</h2>
      <h1>My Boards</h1>
      <button>Create New Board +</button>
      <div>{boardSelectors}</div>
    </div>
  );
};

export default LeftContainer;
