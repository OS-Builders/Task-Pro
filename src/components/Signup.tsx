import { SignupProps, FormState } from '../types';
import { useState, useEffect } from 'react';

const Signup = ({ username, setUsername, setLoggingIn }: SignupProps) => {
  const [formData, setFormData] = useState<FormState>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: FormState) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // FETCH REQUEST HERE
    console.log('formData on login', formData);
  };

  useEffect(() => {
    if (formData.password === formData.confirmPassword) setPasswordsMatch(true);
    else setPasswordsMatch(false);
  }, [formData]);

  //   let passwordType: string = "password";
  //   const checkType = () => {
  //     if (passwordType === "password") {
  //       passwordType = "text";
  //     } else {
  //       passwordType = "password";
  //     }
  //   };

  return (
    <div className='auth-wrapper'>
      <form className='auth-form' onSubmit={handleFormSubmit}>
        <label>Username </label>
        <input
          className='auth-input'
          name='username'
          type='text'
          placeholder='Username'
          value={formData.username}
          onChange={handleInputChange}
          required
        />

        <label>Email </label>
        <input
          className='auth-input'
          name='email'
          type='text'
          placeholder='Email'
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        <label>Password </label>
        <input
          className='auth-input'
          name='password'
          type='password'
          placeholder='Password'
          value={formData.password}
          onChange={handleInputChange}
          required
        />

        <label>Confirm Password </label>
        <input
          className='auth-input'
          name='confirmPassword'
          type='password'
          placeholder='Confirm Password'
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
        />

        {passwordsMatch ? null : (
          <p className='auth-confirm'>Password does not match!</p>
        )}
        {/* <input type="checkbox" id="toggle-password" onClick={checkType} />
        <label htmlFor="toggle-password">Show Password</label> */}
        <button
          className='auth-submit'
          type='submit'
          disabled={!passwordsMatch}
        >
          Sign Up
        </button>
        <button
          className='auth-switch'
          onClick={() => {
            setLoggingIn(true);
          }}
        >
          Back to login
        </button>
      </form>
    </div>
  );
};
export default Signup;
