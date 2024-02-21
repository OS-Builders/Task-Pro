import LeftContainer from "../containers/LeftContainer";
import MainContainer from "../containers/MainContainer";
import { DashboardProps, CurrentBoardState } from "../types";
import { useState } from "react";
import "../scss/dashBoard.scss";

const Dashboard = ({ user }: DashboardProps) => {
  const [currentBoard, setCurrentBoard] = useState<CurrentBoardState>({
    name: "",
    id: "",
  });
  return (
    <div className="main-page">
      <LeftContainer
        user={user}
        setCurrentBoard={setCurrentBoard}
        currentBoard={currentBoard}
      />
      <MainContainer
        user={user}
        setCurrentBoard={setCurrentBoard}
        currentBoard={currentBoard}
      />
    </div>
  );
};

export default Dashboard;
