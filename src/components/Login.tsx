import { SignupProps, FormState } from "../types";
import { useState } from "react";
import { useNavigate } from "react-router";

const Login = ({ setUsername, setLoggingIn }: SignupProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormState>({
    username: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // send post request to /user/login with formData in body
    const body = JSON.stringify(formData);
    const response = await fetch("/user/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: body,
    });
    // receive username from backend
    const user = await response.json();
    // if request success, save username to state and route to dashboard
    if (response.status === 200) {
      setUsername(user);
      return navigate("/dashboard");
    }
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-form" onSubmit={handleFormSubmit}>
        <label>Username </label>
        <input
          className="auth-input"
          name="username"
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
        <label>Password </label>
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
        <button
          className="auth-switch"
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
