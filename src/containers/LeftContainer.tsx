import { ContainerProps, BoardListItemState } from '../types';
import { useEffect, useState } from 'react';
import CreateBoardModal from '../components/CreateBoardModal';
import '../scss/leftContainer.scss';

const LeftContainer = ({ user, setCurrentBoard }: ContainerProps) => {
  // creating state to open board creating modal
  const [creatingBoard, setCreatingBoard] = useState<boolean>(false);
  // creating state to store the list of board names
  const [boardList, setBoardList] = useState<BoardListItemState[]>([]);
  //state for selected board
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);
  // make a request for all board naames, return an array containing strings of the board names
  useEffect(() => {
    const fetchBoardList = async () => {
      const reponse: Response = await fetch(`/boards/${user.id}`);
      const list = await reponse.json();
      setBoardList(list);
    };
    fetchBoardList().catch(console.error);
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

  // iterate through board names push buttons or components into array boardlist in state
  const boardSelectors = boardList.map((board, index) => (
    <button
      className={`board-selector ${
        selectedBoard === board.id ? 'selected' : ''
      }`}
      onClick={handleBoardSelect}
      name={board.name}
      id={board.id}
      key={index}
    >
      {board.name}
    </button>
  ));

  return (
    <div className='left-container'>
      <h1 className='heading'>Hello, {user.name}</h1>
      <button className='new-board-btn' onClick={handleCreateBoard}>
        Create New Board +
      </button>
      <div className='boards-info'>
        <div className='board-selectors'>{boardSelectors}</div>
      </div>
      {creatingBoard ? (
        <CreateBoardModal
          setCreatingBoard={setCreatingBoard}
          setCurrentBoard={setCurrentBoard}
          user={user}
        />
      ) : null}
      <footer>
        <button className='setting-button'>Setting</button>
      </footer>
    </div>
  );
};

export default LeftContainer;
