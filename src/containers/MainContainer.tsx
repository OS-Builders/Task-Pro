import { useState, useEffect } from 'react';
import '../scss/mainContainer.scss';
import { ContainerProps } from '../types';

const MainContainer = ({ currentBoard }: ContainerProps) => {
  // const [view, setView] = useState();
  useEffect(() => {
    const fetchBoard = async () => {
      const reponse: Response = await fetch(`/boards/${currentBoard.id}`);
      const board = await reponse.json();
      console.log(board);
    };
    fetchBoard().catch(console.error);
  }, []);

  return (
    <div className='main-container'>
      <h1>{currentBoard.name}</h1>
      <div className='task-container'></div>
    </div>
  );
};

export default MainContainer;
