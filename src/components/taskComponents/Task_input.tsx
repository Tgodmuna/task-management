import { useContext, useState } from "react";
import { Calendar, Users, Tag, AlignLeft, Plus, X, Loader2 } from "lucide-react";
import { TaskContext } from "./Task";
import type { newTaskType } from "../../types";
import React from "react";
import axios from "axios";
import useEnvironmentUrls from "../hooks/UseEnvironmentVar";
import { toast } from "react-toastify";
import { AppContext } from "../../App";
import { UseFetchToken } from "../hooks/UseFetchToken";

const TaskInput: React.FC = () => {
  const taskContext = useContext(TaskContext);
  const appContext = useContext(AppContext);
  const [taskName, setTaskName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [estimation, setEstimation] = useState<string>("");
  const [type, setType] = useState<string>("Dashboard");
  const [priority, setPriority] = useState<string>("Medium");
  const [people, setPeople] = useState<string[]>([]);
  const { serverUrl } = useEnvironmentUrls();
  const [loading, Setisloading] = useState<boolean>(false);
  const token = UseFetchToken();
  if (!taskContext && !appContext) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: newTaskType = {
      taskName,
      description,
      estimation,
      type,
      priority,
      people,
    };

    function validate(data: newTaskType) {
      const { taskName, description, estimation, type, priority, people } = data;

      if (!taskName && !description && !estimation && !type && !priority && !people) {
        toast.error("fields are empty");
        return null;
      }

      if (!taskName || !description || !estimation || !type || !priority || !people) {
        toast.error("all fields are required");
        return null;
      }
      return true;
    }

    if (!validate(newTask)) return;

    Setisloading(true);

    //post to server
    axios
      .post(
        `${serverUrl}/api/task/createTask`,
        { newTask },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          Setisloading(false);
          taskContext?.setTasks((prev) => [...prev, res.data.task]);
          toast.success(res.data.message);

          //close the form
          appContext?.onCreateTask();
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message || (err as Error).message || "something went wrong");
        console.log(err);
        Setisloading(false);
      });
  };

  return (
    <div
      className={`fixed w-full h-[100vh] inset-0 bg-black bg-opacity-50  items-center justify-center z-50 ${
        appContext?.isAddTaskOpen ? "flex" : "hidden"
      }`}>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow-md w-full max-w-2xl relative">
        <button
          title={"close"}
          type="button"
          className="absolute top-2 right-2 text-gray-500 hover:bg-neutral-800"
          onClick={() => appContext?.onCreateTask()}>
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-semibold mb-4">New Task</h2>

        <div className="flex flex-col gap-3">
          {/* Task Name */}
          <div className="flex items-center border p-2 rounded-md">
            <Tag className="text-gray-400 w-5 h-5 mr-2" />
            <input
              type="text"
              placeholder="Task Name"
              className="w-full focus:outline-none"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="flex items-center border p-2 rounded-md">
            <AlignLeft className="text-gray-400 w-5 h-5 mr-2" />
            <input
              type="text"
              placeholder="Description"
              className="w-full focus:outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Estimation */}
          <div className="flex items-center border p-2 rounded-md">
            <Calendar className="text-gray-400 w-5 h-5 mr-2" />
            <input
              type="date"
              className="w-full focus:outline-none"
              value={estimation}
              onChange={(e) => setEstimation(e.target.value)}
            />
          </div>

          {/* Type & Priority */}
          <div className="flex gap-3">
            <select
              className="border p-2 rounded-md w-full"
              value={type}
              onChange={(e) => setType(e.target.value)}>
              <option>Dashboard</option>
              <option>Mobile App</option>
              <option>Website</option>
            </select>

            <select
              className="border p-2 rounded-md w-full"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          {/* Assign Users */}
          <div className="flex items-center border p-2 rounded-md">
            <Users className="text-gray-400 w-5 h-5 mr-2" />
            <input
              type="text"
              placeholder="Assign Users (comma separated)"
              className="w-full focus:outline-none"
              onChange={(e) => setPeople([...people, e.target.value])}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          disabled={loading}
          type="submit"
          className={`${
            loading && "cursor-not-allowed bg-slate-500"
          } mt-4 flex items-center gap-2 bg-blue-600  text-white px-4 py-2 rounded-md hover:bg-blue-700`}>
          {loading ? (
            <span className={`flex`}>
              creating Task <Loader2 className="animate-spin h-5 w-5 mx-auto" />
            </span>
          ) : (
            <span className={`flex`}>
              <Plus className="w-5 h-5" />
              add task
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default React.memo(TaskInput);
