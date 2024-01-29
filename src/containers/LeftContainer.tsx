import { BoardListItemState, LeftContainerProps } from "../types";
import { ReactNode, useEffect, useState } from "react";
import CreateBoardModal from "../components/CreateBoardModal";
import "../scss/leftContainer.scss";

const LeftContainer = ({ user, setCurrentBoard }: LeftContainerProps) => {
  // creating state to open board creating modal
  const [creatingBoard, setCreatingBoard] = useState<boolean>(false);
  // creating state to store the list of board names
  const [boardList, setBoardList] = useState<ReactNode[]>([]);
  //state for selected board
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);
  // make a request for all board naames, return an array containing strings of the board names
  useEffect(() => {
    const fetchBoardList = async () => {
      const reponse: Response = await fetch(`/boards/myboards/${user.id}`);
      const list = await reponse.json();
      const boardSelectors = list.map((board: BoardListItemState) => (
        <button
          className={`board-selector ${
            selectedBoard === board.id ? "selected" : ""
          }`}
          onClick={handleBoardSelect}
          name={board.name}
          id={board.id}
          key={board.id}
        >
          {board.name}
        </button>
      ));
      setBoardList(boardSelectors);
    };
    fetchBoardList().catch(console.error);
    // iterate through board names push buttons or components into array boardlist in state
  }, []);

  // function for changing board when click selection button
  const handleBoardSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurrentBoard({
      name: e.currentTarget.name,
      id: e.currentTarget.id,
    });
    setSelectedBoard(e.currentTarget.id);
  };

  // function for creating a new board
  const handleCreateBoard = () => {
    // create a pop up to create the new board
    setCreatingBoard(true);
  };

  return (
    <div className="left-container">
      <h1 className="heading">Task Pro</h1>
      <h1 className="heading">{user.name}'s Boards</h1>
      <button className="new-board-btn" onClick={handleCreateBoard}>
        Create New Board +
      </button>
      <div className="boards-info">
        <div className="board-selectors">{boardList}</div>
      </div>
      {creatingBoard ? (
        <CreateBoardModal
          setCreatingBoard={setCreatingBoard}
          setCurrentBoard={setCurrentBoard}
          user={user}
          boardList={boardList}
          setBoardList={setBoardList}
          handleBoardSelect={handleBoardSelect}
          selectedBoard={selectedBoard}
        />
      ) : null}
      <footer>
        <button className="settings-button">Settings</button>
      </footer>
    </div>
  );
};

export default LeftContainer;
