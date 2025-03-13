import { useState } from "react";
import type { TaskType } from "../../types";
import TableHeader from "./TaskTableHead";
import TableRow from "./TaskTableRow";

const TaskList = () => {
  const [tasks, setTasks] = useState<TaskType[]>([
    {
      taskName: "Employee Details",
      description: "Create a page where there is information about employees",
      estimation: "Feb 14, 2024 - Feb 1, 2024",
      type: "Dashboard",
      people: ["AL", "RT", "D"],
      priority: "Medium",
    },
    {
      taskName: "Darkmode version",
      description: "Darkmode version for all screens",
      estimation: "Feb 14, 2024 - Feb 1, 2024",
      type: "Mobile App",
      people: ["Q", "J"],
      priority: "Low",
    },
  ]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-5xl">
      <h2 className="text-lg font-semibold mb-4">Task List</h2>
      <table className="w-full border-collapse">
        <TableHeader />
        <TableRow tasks={tasks} />
      </table>
    </div>
  );
};

export default TaskList;
