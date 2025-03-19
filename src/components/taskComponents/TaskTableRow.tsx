import { useContext, useRef, useState } from "react";
import { Calendar, Tag, MoreVertical, User } from "lucide-react";
import type { TaskType } from "../../types";
import useEnvironmentUrls from "../hooks/UseEnvironmentVar";
import React from "react";
import { AppContext } from "../../App";

const TableRow: React.FC<{ tasks: TaskType[] }> = ({ tasks }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { serverUrl } = useEnvironmentUrls();
  const editContentRef = useRef<null | HTMLButtonElement>(null);
  const editStatusRef = useRef<null | HTMLSelectElement>(null);
  const appContext = useContext(AppContext);

  const editStatus = async (taskId: string, status: string) => {
    const task = tasks.find( ( task ) => task._id === taskId );
    console.log({status})
    if (task) {
      const updatedTask = { ...task, status };
      await appContext?.modifyTask(taskId, updatedTask);
    }
  };
  return (
    <tbody>
      {tasks.map((task) => (
        <tr
          key={task._id}
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
            {task.people && task.people.length > 0 ? (
              task.people.map((person) => (
                <img
                  key={person._id}
                  className="size-6 rounded-full border border-gray-200 shadow-sm"
                  src={
                    person.profileUrl
                      ? `https://${serverUrl}/${person.profileUrl}`
                      : "/default-avatar.png"
                  }
                  alt={person.name}
                />
              ))
            ) : (
              <User className="size-6 p-2 bg-gray-300 rounded-full" />
            )}
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
          <td className="p-3">
            <span
              className={`px-2 py-1 rounded-full text-sm ${
                task.status === "Completed"
                  ? "bg-green-200 text-green-700"
                  : task.status === "In Progress"
                  ? "bg-yellow-200 text-yellow-700"
                  : "bg-gray-200 text-gray-700"
              }`}>
              {task.status}
            </span>
          </td>
          <td className="p-3 relative">
            <button
              onClick={() =>
                task._id && setOpenDropdown(openDropdown === task._id ? null : task._id)
              }>
              <MoreVertical className="w-4 h-4 text-neutral-300" />
            </button>
            {openDropdown === task._id && (
              <div className="absolute right-0 mt-2 w-32 bg-gray-200 shadow-md rounded-md z-45">
                <button
                  ref={editContentRef}
                  onClick={() => task._id && appContext?.modifyTask(task._id, task)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100">
                  Edit
                </button>
                <select
                  ref={editStatusRef}
                  onChange={(e) => task._id && editStatus(task._id, e.target.value)}
                  className="w-full px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <button
                  onClick={async () => task._id && (await appContext?.deleteTask(task._id))}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100">
                  Delete
                </button>
              </div>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default React.memo(TableRow);
