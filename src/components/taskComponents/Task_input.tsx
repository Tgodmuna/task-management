import React, { useContext, useState, useCallback } from "react";
import { Calendar, Users, Tag, AlignLeft, Plus, X, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { TaskContext } from "./Task";
import { AppContext } from "../../App";
import useEnvironmentUrls from "../hooks/UseEnvironmentVar";
import { UseFetchToken } from "../hooks/UseFetchToken";
import type { newTaskType } from "../../types";

const TaskInput: React.FC = () => {
  const taskContext = useContext(TaskContext);
  const appContext = useContext(AppContext);
  const { serverUrl } = useEnvironmentUrls();
  const token = UseFetchToken();

  const [formData, setFormData] = useState<newTaskType>({
    taskName: "",
    description: "",
    estimation: "",
    type: "Dashboard",
    priority: "Medium",
    status: "To-Do",
    people: [],
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const peopleArray = e.target.value.split(",").map((person) => person.trim());
    setFormData((prev) => ({ ...prev, people: peopleArray }));
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const { taskName, description, estimation, type, priority, status, people } = formData;

      if (
        ![taskName, description, estimation, type, priority, status].every(Boolean) ||
        people.length === 0
      ) {
        toast.error("All fields are required");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.post(
          `${serverUrl}/api/task/createTask`,
          { newTask: formData },
          { headers: { "x-auth-token": token } }
        );

        if (response.status === 201) {
          taskContext?.setTasks((prev) => [...prev, response.data.task]);
          toast.success(response.data.message);
          appContext?.onCreateTask();
        }
      } catch (error) {
        const errorMsg = axios.isAxiosError(error)
          ? error.response?.data?.message || error.message || "Something went wrong"
          : "Something went wrong";
        toast.error(errorMsg);
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [formData, serverUrl, token, taskContext, appContext]
  );
  if (!taskContext || !appContext) return null;

  return (
    <div
      className={`fixed w-full h-[100vh] inset-0 bg-black bg-opacity-50 items-center justify-center z-50 ${
        appContext.isAddTaskOpen ? "flex" : "hidden"
      }`}>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow-md w-full max-w-2xl relative">
        <button
          title="close"
          type="button"
          className="absolute top-2 right-2 text-gray-500 hover:bg-neutral-800"
          onClick={appContext.onCreateTask}>
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-semibold mb-4">New Task</h2>

        <div className="flex flex-col gap-3">
          {[
            { icon: Tag, name: "taskName", placeholder: "Task Name" },
            { icon: AlignLeft, name: "description", placeholder: "Description" },
            { icon: Calendar, name: "estimation", type: "date" },
          ].map(({ icon: Icon, ...input }) => (
            <div
              key={input.name}
              className="flex items-center border p-2 rounded-md">
              <Icon className="text-gray-400 w-5 h-5 mr-2" />
              <input
                {...input}
                className="w-full focus:outline-none"
                value={(formData as any)[input.name]}
                onChange={handleInputChange}
              />
            </div>
          ))}

          <div className="flex gap-3">
            {[
              { name: "type", options: ["Dashboard", "Mobile App", "Website"] },
              { name: "priority", options: ["Low", "Medium", "High"] },
              { name: "status", options: ["To-Do", "In Progress", "Completed"] },
            ].map(({ name, options }) => (
              <select
                key={name}
                name={name}
                className="border p-2 rounded-md w-full"
                value={(formData as any)[name]}
                onChange={handleInputChange}>
                {options.map((option) => (
                  <option
                    key={option}
                    value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ))}
          </div>

          <div className="flex items-center border p-2 rounded-md">
            <Users className="text-gray-400 w-5 h-5 mr-2" />
            <input
              type="text"
              placeholder="Assign Users (comma separated)"
              className="w-full focus:outline-none"
              onChange={handlePeopleChange}
            />
          </div>
        </div>

        <button
          disabled={loading}
          type="submit"
          className={`${
            loading && "cursor-not-allowed bg-slate-500"
          } mt-4 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700`}>
          {loading ? (
            <span className="flex">
              Creating Task <Loader2 className="animate-spin h-5 w-5 mx-auto" />
            </span>
          ) : (
            <span className="flex">
              <Plus className="w-5 h-5" /> Add Task
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default React.memo(TaskInput);
