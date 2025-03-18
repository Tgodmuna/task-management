import { Task } from "../taskComponents/Task";
import DashboardHeader from "./Dashboard.Header";

const Dashboard = () => {
  return (
    <div>
      <DashboardHeader />
      <Task/>
    </div>
  )
}
export default Dashboard;
