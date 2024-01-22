import { useState } from "react";
import Login from "../components/Login.tsx";
import Signup from "../components/Signup.tsx";
import { AuthProps } from "../types.ts";
import "../scss/authContainer.scss";
import "../scss/authWrapper.scss";

const Authentication = ({ setUser }: AuthProps) => {
  // use state to swap between logging in and signing in
  const [loggingIn, setLoggingIn] = useState(true);
  return (
    <div className="title-wrapper">
      <h1 className="title">Task Pro</h1>
      {loggingIn ? (
        <Login setUser={setUser} setLoggingIn={setLoggingIn} />
      ) : (
        <Signup setUser={setUser} setLoggingIn={setLoggingIn} />
      )}
    </div>
  );
};
export default Authentication;
