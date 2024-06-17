import { SignupProps, AuthFormState } from '../types';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const Login = ({ setUser, setLoggingIn }: SignupProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<AuthFormState>({
    username: '',
    password: '',
  });
  // const [guestLogIn, setGuestLogIn] = useState(false);
  const [loginFail, setLoginFail] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleGuestLogin = () => {
    const guestCredentials = {
      username: 'guest',
      password: 'guest',
    };
    setFormData(guestCredentials);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // send post request to /user/login with formData in body
    const body: string = JSON.stringify(formData);
    const response: Response = await fetch('/user/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: body,
    });
    // receive username from backend
    const user = await response.json();
    // if request success, save username to state and route to dashboard
    if (response.status === 200) {
      setUser(user);
      setLoginFail(false);
      return navigate('/dashboard');
    } else {
      setLoginFail(true);
    }
  };

  return (
    <div className='auth-wrapper'>
      <form className='auth-form' onSubmit={handleFormSubmit}>
        <label htmlFor='username'>Username </label>
        <input
          className='auth-input'
          id='username'
          name='username'
          type='text'
          placeholder='Username'
          value={formData.username}
          onChange={handleInputChange}
          autoComplete='username'
          required
        />
        <label htmlFor='password'>Password </label>
        <input
          className='auth-input'
          id='password'
          name='password'
          type='password'
          placeholder='Password'
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        {loginFail ? (
          <p className='auth-confirm'>Username or password incorrect</p>
        ) : null}
        <button className='auth-submit' type='submit'>
          Login
        </button>
        <button className='auth-guest' type='submit' onClick={handleGuestLogin}>
          Log in as guest
        </button>
        <button
          className='auth-switch'
          onClick={() => {
            setLoggingIn(false);
          }}
        >
          Not registered? Click here to signup!
        </button>
      </form>
    </div>
  );
};
export default Login;
