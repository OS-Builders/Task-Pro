import { useState, useEffect } from 'react';
import '../scss/mainContainer.scss';
import { BoardState, MainContainerProps } from '../types';
import ColumnContainer from './ColumnContainer.tsx';
import editSvg from '../assets/edit-cover-1481-svgrepo-com.svg';
import EditBoardModal from '../components/EditBoardModal.tsx';

const MainContainer = ({
  user,
  currentBoard,
  setCurrentBoard,
}: MainContainerProps) => {
  // set the board state as empty arrays, will be populated with card ids after fetch
  const [boardState, setBoardState] = useState<BoardState>({
    backlog: [],
    inProgress: [],
    inReview: [],
    completed: [],
  });
  const [editingBoard, setEditingBoard] = useState<boolean>(false);

  // effect for fetching the current board info whenever currentBoard changes
  useEffect(() => {
    const fetchBoard = async () => {
      // fetch the currentBoard if a board has been selected
      if (currentBoard && currentBoard.name !== '') {
        const reponse: Response = await fetch(
          `/boards/board?board=${currentBoard.id}&user=${user.id}`
        );
        const board = await reponse.json();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { boardOwner, name, _id, __v, ...columns } = board;
        await setBoardState({ ...columns });
      }
    };
    fetchBoard().catch(console.error);
  }, [currentBoard]);

  if (!currentBoard?.name) {
    return (
      <div className='main-container'>
        <h1 className='heading'>
          Select existing board or create a new one to get started!
        </h1>
      </div>
    );
  }

  return (
    <div className='main-container'>
      <div className='main-header'>
        <h1 className='board-title'>{currentBoard.name}</h1>
        <button
          className='edit-board-btn'
          onClick={() => setEditingBoard(true)}
        >
          <img src={editSvg} alt='Edit SVG' className='edit-svg' />
        </button>
      </div>
      <ColumnContainer
        user={user}
        currentBoard={currentBoard}
        boardState={boardState}
        setBoardState={setBoardState}
      />
      {editingBoard ? (
        <EditBoardModal
          setEditingBoard={setEditingBoard}
          setCurrentBoard={setCurrentBoard}
          currentBoard={currentBoard}
        />
      ) : null}
    </div>
  );
};

export default MainContainer;
