import LeftContainer from "../containers/LeftContainer";
import MainContainer from "../containers/MainContainer";
import { DashboardProps } from "../types";

const Dashboard = ({ username }: DashboardProps) => {
  return (
    <div className="main-page">
      <LeftContainer username={username} />
      <MainContainer />
    </div>
  );
};

export default Dashboard;
