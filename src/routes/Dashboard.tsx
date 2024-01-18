import LeftContainer from "../containers/LeftContainer";
import MainContainer from "../containers/MainContainer";
import { DashboardProps, CurrentBoardState } from "../types";
import { useState } from "react";
import "../scss/Dashboard.scss";

const Dashboard = ({ user }: DashboardProps) => {
  // state of current board selected
  const [currentBoard, setCurrentBoard] = useState<CurrentBoardState>({
    name: "",
    id: "",
  });
  //state confirmDelete false
  return (
    <div className="main-page">
      <LeftContainer user={user} setCurrentBoard={setCurrentBoard} />
      <MainContainer />
    </div>
  );
};

export default Dashboard;
