import { useContext, useRef, useState } from "react";
import { Calendar, Tag, MoreVertical, User } from "lucide-react";
import type { TaskType } from "../../types";
import { TaskContext } from "./Task";
import axios from "axios";
import useEnvironmentUrls from "../hooks/UseEnvironmentVar";
import { toast } from "react-toastify";
import React from "react";

const TableRow: React.FC<{ tasks: TaskType[] }> = ({ tasks }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const taskContext = useContext(TaskContext);
  const { serverUrl } = useEnvironmentUrls();
  const editContentRef = useRef<null | HTMLButtonElement>(null);
  const editStatusRef = useRef<null | HTMLSelectElement>(null);

  //delete handler
  async function deleteTask(id: string) {
    taskContext?.setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));

    try {
      const response = await axios.delete(`${serverUrl}/api/task/delete/${id}`);
      if (response.status === 200) return toast.success("Deleted successfully");
      toast.info(response.data);
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    }
  }

  //edit task handler
  async function editContent(id: string) {
    let text = editContentRef.current?.innerHTML || "";
    const task = tasks.find((task) => task._id === id);
    if (task) {
      task.description = text;
      taskContext?.setTasks((prevState) => [...prevState, task]);
    }

    try {
      const response = await axios.patch(`${serverUrl}/api/task/${id}`, { description: text });
      if (response.status === 200) toast.success("Task edited successfully");
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    }
  }

  //edit status handler
  async function editStatus(id: string, i: number) {
    const task = tasks.find((task) => task._id === id);
    let options = editContentRef.current?.children;
    let text = options && options[i]?.innerHTML;

    if (task && text) {
      task.status = text;
      taskContext?.setTasks((prevState) => [...prevState, task]);
    }

    try {
      const response = await axios.patch(`${serverUrl}/api/task/${id}`, { status: text });
      if (response.status === 200) toast.success("Status updated successfully");
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    }
  }

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
            <button onClick={() => setOpenDropdown(openDropdown === task._id ? null : task._id || null)}>
              <MoreVertical className="w-4 h-4 text-neutral-300" />
            </button>
            {openDropdown === task._id && (
              <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-md z-10">
                <button
                  ref={editContentRef}
                  onClick={() => task._id && editContent(task._id)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100">
                  Edit
                </button>
                <button
                  onClick={async () => task._id && (await deleteTask(task._id))}
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
