import { Tag, Calendar } from "lucide-react";
import type { TaskType } from "../../types";

const TableRow: React.FC<{ tasks: TaskType[] }> = ({ tasks }) => {
  return (
    <tbody>
      {tasks.map((task, index) => (
        <tr
          key={index}
          className="border-t">
          <td className="p-2 flex items-center gap-2">
            <Tag className="w-4 h-4 text-gray-500" /> {task.taskName}
          </td>
          <td className="p-2">{task.description}</td>
          <td className="p-2 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" /> {task.estimation}
          </td>
          <td className="p-2">{task.type}</td>
          <td className="p-2 flex gap-2">
            {task.people && task.people.length !== 0
              ? task.people.map((person, i) => (
                  <span
                    key={i}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                    {person}
                  </span>
                ))
              : null}
          </td>
          <td className="p-2">
            <span
              className={`px-2 py-1 rounded-full text-sm ${
                task.priority === "High"
                  ? "bg-red-200 text-red-700"
                  : task.priority === "Medium"
                  ? "bg-yellow-200 text-yellow-700"
                  : "bg-green-200 text-green-700"
              }`}>
              {task.priority}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableRow;
