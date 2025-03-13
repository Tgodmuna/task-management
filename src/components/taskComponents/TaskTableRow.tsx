import { useState } from "react";
import { Calendar, Tag, MoreVertical } from "lucide-react";
import type { TaskType } from "../../types";

const TableRow: React.FC<{ tasks: TaskType[] }> = ({ tasks }) => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  return (
    <tbody>
      {tasks.map((task, index) => (
        <tr
          key={index}
          className="border-t hover:bg-gray-50">
          <td className="p-3 flex items-center gap-2">
            <Tag className="w-4 h-4 text-neutral-300" /> {task.taskName}
          </td>
          <td className="p-3">{task.description}</td>
          <td className="p-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-neutral-300" /> {task.estimation}
          </td>
          <td className="p-3">{task.type}</td>
          <td className="p-3 flex gap-2">
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
          <td className="p-3">
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
          <td className="p-3 relative">
            <button onClick={() => setOpenDropdown(openDropdown === index ? null : index)}>
              <MoreVertical className="w-4 h-4 text-neutral-300" />
            </button>
            {openDropdown === index && (
              <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-md z-10">
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Edit</button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Delete</button>
              </div>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableRow;
