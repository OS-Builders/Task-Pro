import { BoardListItemState, LeftContainerProps } from '../types';
import { ReactNode, useEffect, useState } from 'react';
import CreateBoardModal from '../components/CreateBoardModal';
import '../scss/leftContainer.scss';
import { useNavigate } from 'react-router';

const LeftContainer = ({
  user,
  setCurrentBoard,
  currentBoard,
}: LeftContainerProps) => {
  const [creatingBoard, setCreatingBoard] = useState<boolean>(false);
  const [boardList, setBoardList] = useState<ReactNode[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);
  const navigate = useNavigate();
  // make a request for all board names, return an array containing strings of the board names
  useEffect(() => {
    const fetchBoardList = async () => {
      const reponse: Response = await fetch(`/boards/myboards/${user.id}`);
      const list = await reponse.json();
      const boardSelectors = list.map((board: BoardListItemState) => (
        <button
          className={`board-selector ${
            selectedBoard === board.id ? 'selected' : ''
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
  }, [currentBoard]);

  const handleBoardSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurrentBoard({
      name: e.currentTarget.name,
      id: e.currentTarget.id,
    });
    setSelectedBoard(e.currentTarget.id);
  };

  const handleCreateBoard = () => {
    setCreatingBoard(true);
  };

  const handleLogOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <div className='left-container'>
      <h1 className='heading'>Task Pro</h1>
      <h3 className='heading'>{user.name}'s Boards</h3>
      <button className='new-board-btn' onClick={handleCreateBoard}>
        Create New Board +
      </button>
      <div className='boards-info'>
        <div className='board-selectors'>{boardList}</div>
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
          setSelectedBoard={setSelectedBoard}
        />
      ) : null}
      <footer>
        <button className='settings-button' onClick={handleLogOut}>
          Log Out
        </button>
      </footer>
    </div>
  );
};

export default LeftContainer;
