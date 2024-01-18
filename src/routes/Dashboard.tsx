import LeftContainer from "../containers/LeftContainer";
import MainContainer from "../containers/MainContainer";
import { DashboardProps } from "../types";
import { useState } from "react";

const Dashboard = ({ username }: DashboardProps) => {
  // state of current board selected
  const [currentBoard, setCurrentBoard] = useState<string>("");
  //state confirmDelete false
  return (
    <div className="main-page">
      <LeftContainer username={username} setCurrentBoard={setCurrentBoard} />
      <MainContainer />
    </div>
  );
};

export default Dashboard;
