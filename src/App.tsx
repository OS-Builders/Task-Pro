import { Route, Routes } from "react-router";
import Authentication from "./routes/Authentication.tsx";
import Dashboard from "./routes/Dashboard.tsx";
import { useState } from "react";
import { UserState } from "./types.ts";

function App() {
  // track the username in state
  const [user, setUser] = useState<UserState>({
    name: "",
    id: "",
  });

  return (
    <Routes>
      <Route path="/" element={<Authentication setUser={setUser} />} />
      <Route path="/dashboard" element={<Dashboard user={user} />} />
    </Routes>
  );
}

export default App;
