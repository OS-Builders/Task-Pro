import { createPortal } from 'react-dom';
import { CreateBoardModalProps } from '../types';
import { useState } from 'react';
import '../scss/modal.scss';

const CreateBoardModal = ({
  setCreatingBoard,
  setCurrentBoard,
  user,
}: CreateBoardModalProps) => {
  const [boardName, setBoardName] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue: string = e.target.value;
    setBoardName(inputValue.trim()); //edge case for whitespace
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // send post request to /boards/create with formData in body
    const body = {
      boardName: boardName,
      userId: user.id,
    };
    const response: Response = await fetch('/boards/create', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(body),
    });
    // receive username from backend
    // if request success, save username to state and route to dashboard
    if (response.status === 200) {
      const responseData = await response.json();
      setCreatingBoard(false);
      console.log('Board created: ', responseData);
    } else {
      console.log('Failed To create board.');
    }
  };

  const isButtonDisabled: boolean = boardName === ''; //checking if boardName is empty? using trim in handle input

  return createPortal(
    <div className='modal-overlay'>
      <div className='modal'>
        <form className='modal-form' onSubmit={handleFormSubmit}>
          <h2 className='modal-title'>New Board</h2>
          <input
            className='modal-input'
            name='boardname'
            type='text'
            placeholder='Enter Board Name'
            onChange={handleInputChange}
            required
          />
          <div className='modal-btns'>
            <button
              className='modal-submit'
              type='submit'
              disabled={isButtonDisabled}
            >
              Save
            </button>
            <button
              className='modal-cancel'
              onClick={() => {
                setCreatingBoard(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById('portal') as Element
  );
};

export default CreateBoardModal;
