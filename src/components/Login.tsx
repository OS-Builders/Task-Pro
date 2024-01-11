import { SignupProps, FormState } from "../types";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ username, setUsername, setLoggingIn }: SignupProps) => {
  const [formData, setFormData] = useState<FormState>({
    username: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // FETCH REQUEST HERE
    console.log("formData on login", formData);
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-form" onSubmit={handleFormSubmit}>
        <label>Username: </label>
        <input
          className="auth-input"
          name="username"
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
        <label>Password: </label>
        <input
          className="auth-input"
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <button className="auth-submit" type="submit">
          Login
        </button>
      </form>
      <button
        className="toggle-auth"
        onClick={() => {
          setLoggingIn(false);
        }}
      >
        Not registered? Click here to signup!
      </button>
    </div>
  );
};
export default Login;
