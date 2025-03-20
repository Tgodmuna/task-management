import Invitation from "../../pages/Invitation";
import { Task } from "../taskComponents/Task";
import DashboardHeader from "./Dashboard.Header";

const Dashboard = () => {
  return (
    <div>
      <DashboardHeader />
      <Task />
      <Invitation />
    </div>
  );
};
export default Dashboard;
