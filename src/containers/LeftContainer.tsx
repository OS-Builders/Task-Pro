import { ContainerProps, BoardListItemState } from "../types";
import { useEffect, useState } from "react";
import CreateBoardModal from "../components/CreateBoardModal";

const LeftContainer = ({ user, setCurrentBoard }: ContainerProps) => {
  // creating state to open board creating modal
  const [creatingBoard, setCreatingBoard] = useState<boolean>(false);
  // creating state to store the list of board names
  const [boardList, setBoardList] = useState<BoardListItemState[]>([]);
  // make a request for all board naames, return an array containing strings of the board names
  useEffect(() => {
    const fetchBoardList = async () => {
      const reponse: Response = await fetch(`/boards/${user.id}`);
      const list = await reponse.json();
      setBoardList(list);
      console.log(boardList);
    };
    fetchBoardList().catch(console.error);
  }, []);

  // function for changing board when click selection button
  const handleBoardSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault;
    setCurrentBoard({
      name: e.currentTarget.name,
      id: e.currentTarget.id,
    });
  };

  // function for creating a new board
  const handleCreateBoard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault;
    // create a pop up to create the new board
    setCreatingBoard(true);
  };

  // iterate through board names push buttons or components into array boardlist in state
  const boardSelectors = [];
  for (let i = 0; i < boardList.length; i++) {
    boardSelectors.push(
      <button
        className="board-selector"
        onClick={handleBoardSelect}
        name={boardList[i].name}
        id={boardList[i].id}
      >
        boardList[i].name
      </button>
    );
  }

  return (
    <div className="left-container">
      <h2>Hello {user.name}</h2>
      <h1>My Boards</h1>
      <button onClick={handleCreateBoard}>Create New Board +</button>
      <div>{boardSelectors}</div>
      {creatingBoard ? (
        <CreateBoardModal
          setCreatingBoard={setCreatingBoard}
          setCurrentBoard={setCurrentBoard}
          user={user}
        />
      ) : null}
    </div>
  );
};

export default LeftContainer;
