import { useContext, useRef, useState } from "react";
import { Calendar, Tag, MoreVertical, User } from "lucide-react";
import type { TaskType } from "../../types";
import { TaskContext } from "./Task";
import axios from "axios";
import useEnvironmentUrls from "../hooks/UseEnvironmentVar";
import { toast } from "react-toastify";
import React from "react";

const TableRow: React.FC<{ tasks: TaskType[] }> = ({ tasks }) => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const taskContext = useContext(TaskContext);
  const { serverUrl } = useEnvironmentUrls();
  const editContentRef = useRef<null | HTMLButtonElement>(null);
  const editStatusRef = useRef<null | HTMLSelectElement>(null);

  //delete handler
  async function deleteTask(id: string) {
    taskContext?.setTasks((prevTasks) => {
      return prevTasks.filter((task) => task._id !== id);
    });

    //make a call to the server
    try {
      const response = await axios.delete(`${serverUrl}/api/task/delete/${id}`);
      if (response.status === 200) {
        return toast.success("deleted successfully");
      }

      if (response.status !== 200) return toast.info(response.data);
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    }
  }

  //edit task handler
  async function editContent(id: string) {
    let text = editContentRef.current && editContentRef.current?.innerHTML;

    const task = tasks.find((task) => task._id === id);
    if (task) {
      task.description = text ?? "";
      taskContext?.setTasks((prevState) => [...prevState, task]);
    }
    //make a call to server
    try {
      const response = await axios.patch(`${serverUrl}/api/task/${id}`, { description: text });

      if (response.status === 200) {
        toast.success("your task was edited successfully");
        console.log(response);
      }
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    }
  }

  //edit status handler
  async function editStatus(id: string, i: number) {
    const task = tasks.find((task) => task._id === id);

    let options = editContentRef.current?.children;
    let text = options && options[i].innerHTML;

    if (task && text) {
      task.status = text;
      taskContext?.setTasks((prevState) => [...prevState, task]);
    }

    //make a call to server
    try {
      const response = await axios.patch(`${serverUrl}/api/task/${id}`, { description: text });

      if (response.status === 200) {
        toast.success("your task was edited successfully");
        console.log(response);
      }
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    }
  }

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
            {task.people && task.people.length !== 0 ? (
              task.people.map((person, i) => (
                <img
                  className={`size-4 rounded-full p-2 gap-2`}
                  src={`https://${serverUrl}/${person.profileUrl}`}
                  alt={`${person.name}-1`}
                />
              ))
            ) : (
              <User className={"size-1 p-2 bg-green-300"} />
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
          <td className="p-3 relative">
            <button onClick={() => setOpenDropdown(openDropdown === index ? null : index)}>
              <MoreVertical className="w-4 h-4 text-neutral-300" />
            </button>
            {openDropdown === index && (
              <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-md z-10">
                <button
                  ref={editContentRef}
                  onClick={() => editContent(task._id as string)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100">
                  Edit
                </button>

                <button
                  onClick={async () => task._id && (await deleteTask(task._id))}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100">
                  Delete
                </button>

                <button className="w-full flex flex-col text-left px-4 py-2 hover:bg-gray-100">
                  <select
                    ref={editStatusRef}
                    name="change status"
                    id="CS"
                    disabled={true}>
                    <option
                      className={`text-neutral-400 text-center`}
                      value=""
                      disabled={true}>
                      change-status
                    </option>

                    <option
                      onClick={async () => task._id && (await editStatus(task._id, 1))}
                      className={`capitalize hover:bg-gray-200 cursor-pointer `}
                      value="to-do">
                      Todo
                    </option>

                    <option
                      onClick={async () => task._id && (await editStatus(task._id, 2))}
                      className={`capitalize hover:bg-gray-200 cursor-pointer `}
                      value="in progress">
                      in-progress
                    </option>

                    <option
                      onClick={async () => task._id && (await editStatus(task._id, 3))}
                      className={`capitalize hover:bg-gray-200 cursor-pointer `}
                      value="completed">
                      completed
                    </option>
                  </select>
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
