import { SignupProps, FormState } from "../types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const Signup = ({ setUser, setLoggingIn }: SignupProps) => {
  const navigate = useNavigate();
  // save the signup info into state
  const [formData, setFormData] = useState<FormState>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(false);

  // update form data as user input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: FormState) => ({ ...prevData, [name]: value }));
  };

  // sign user in and navigate to dashboard
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // send post request to /user/signup with formData in body
    const body: string = JSON.stringify(formData);
    const response: Response = await fetch("/user/signup", {
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
      setUser(user);
      return navigate("/dashboard");
    }
  };

  useEffect(() => {
    if (formData.password === formData.confirmPassword) setPasswordsMatch(true);
    else setPasswordsMatch(false);
  }, [formData]);

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

        <label>Email </label>
        <input
          className="auth-input"
          name="email"
          type="text"
          placeholder="Email"
          value={formData.email}
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

        <label>Confirm Password </label>
        <input
          className="auth-input"
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
        />

        {passwordsMatch ? null : (
          <p className="auth-confirm">Password does not match!</p>
        )}

        <button
          className="auth-submit"
          type="submit"
          disabled={!passwordsMatch}
        >
          Sign Up
        </button>
        <button
          className="auth-switch"
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
