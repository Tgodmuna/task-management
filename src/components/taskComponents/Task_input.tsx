import { useState } from "react";
import { Calendar, Users, Tag, AlignLeft, Plus } from "lucide-react";
import type { TaskType } from "../../types";

const TaskInput: React.FC = () => {
  const [taskName, setTaskName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [estimation, setEstimation] = useState<string>("");
  const [type, setType] = useState<string>("Dashboard");
  const [priority, setPriority] = useState<string>("Medium");
  const [assignedUsers, setAssignedUsers] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: TaskType = {
      taskName,
      description,
      estimation,
      type,
      priority,
      people: assignedUsers,
    };
    console.log(newTask);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow-md w-full max-w-2xl">
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
            onChange={(e) => setAssignedUsers(e.target.value.split(","))}
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-4 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
        <Plus className="w-5 h-5" /> Add Task
      </button>
    </form>
  );
};

export default TaskInput;
