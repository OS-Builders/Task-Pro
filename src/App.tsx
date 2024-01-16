import { Route, Routes } from "react-router";
import Authentication from "./routes/Authentication.tsx";
import Dashboard from "./routes/Dashboard.tsx";
import { useState } from "react";

function App() {
  // track the username in state
  const [username, setUsername] = useState("");

  return (
    <Routes>
      <Route path="/" element={<Authentication setUsername={setUsername} />} />
      <Route path="/dashboard" element={<Dashboard username={username} />} />
    </Routes>
  );
}

export default App;
