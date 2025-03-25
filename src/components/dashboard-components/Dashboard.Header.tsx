import { useContext, useState, useEffect } from "react";
import { Search, Filter, Plus, User } from "lucide-react";
import { AppContext } from "../../App";
import React from "react";
import type { TaskType, userType } from "../../types";

const DashboardHeader = () => {
  const [activeView, setActiveView] = useState("List");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<TaskType[]>([]);
  const appContext = useContext(AppContext);
  const tasks = appContext?.tasks;
  const userData = appContext?.userData;
  const toggleAddTask = appContext?.onCreateTask;
  const toggleInvite = appContext?.onInviteSent;

  useEffect(() => {
    if (searchQuery) {
      const results = tasks?.filter((task) => {
        const query = searchQuery.toLowerCase();
        return (
          task.taskName.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query) ||
          task.estimation.toLowerCase().includes(query) ||
          task.type.toLowerCase().includes(query) ||
          task.priority.toLowerCase().includes(query) ||
          task.status?.toLowerCase().includes(query) ||
          task.people?.some((person) =>
            person.name.toLowerCase().includes(query)
          )
        );
      });
      setSearchResults(results || []);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, tasks]);

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      {/* Left Side - Project Title & Navigation */}
      <LeftSide
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* Right Side - Actions */}
      <RightSide
        tasks={tasks}
        userData={userData}
        toggleAddTask={toggleAddTask}
        toggleInvite={toggleInvite}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchResults={searchResults}
      />
    </header>
  );
};

export default React.memo(DashboardHeader);

// left side
const LeftSide: React.FC<{
  activeView: string;
  setActiveView: React.Dispatch<React.SetStateAction<string>>;
}> = ({ activeView, setActiveView }) => {
  const appContext = useContext(AppContext);
  const userData = appContext?.userData;

  return (
    <div className="flex items-center gap-6">
      <h1 className="text-xl capitalize font-semibold w-full">
        welcome to your Dashboard{" "}
        <span className={`text-xl italic text-neutral-400 uppercase `}>{userData?.name}</span>
      </h1>
      <nav className="flex gap-4">
        {["Kanban", "Timeline", "List"].map((view) => (
          <button
            key={view}
            className={`text-sm font-medium ${
              activeView === view ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
            }`}
            onClick={() => setActiveView(view)}>
            {view}
          </button>
        ))}
      </nav>
    </div>
  );
};

// right side
const RightSide: React.FC<{
  tasks: [] | TaskType[] | undefined;
  userData: userType | null | undefined;
  toggleInvite: (() => void) | undefined;
  toggleAddTask: (() => void) | undefined;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchResults: TaskType[];
}> = ({
  tasks,
  userData,
  toggleAddTask,
  toggleInvite,
  searchQuery,
  setSearchQuery,
  searchResults,
}) => {
  return (
    <div className="flex  gap-5 items-center">
      {/* Avatars & Invites */}
      <div className="flex    w-full h-8 rounded-full p-1 items-center gap-1">
        {/* people assigned to a task */}
        {tasks &&
          tasks.map((task) => {
            return (
              task?.people &&
              task?.people.length !== 0 &&
              task?.people.map((assignee) =>
                assignee.profileUrl ? (
                  <img
                    title={"assignee"}
                    key={assignee?.name}
                    src={assignee?.profileUrl}
                    alt={`User ${assignee?.name}`}
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm object-cover"
                  />
                ) : (
                  <User
                    key={assignee.name}
                    className="w-4 h-4  text-green-300"
                  />
                )
              )
            );
          })}

        {/* Placeholder Avatar */}
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 border-2 border-white shadow-sm">
          {userData?.profileUrl ? (
            <img
              src={userData.profileUrl}
              alt={`User ${userData.name + 1}`}
              className="w-8 h-8 rounded-full border-2 border-white shadow-sm object-cover"
            />
          ) : (
            <User className="w-4 h-4 text-gray-600" />
          )}
        </div>
        <button
          onClick={() => toggleInvite && toggleInvite()}
          className="bg-gray-200  text-sm px-3 py-1 rounded-md hover:bg-gray-300">
          Invite
        </button>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
            {searchResults.length > 0 && (
            <div className="absolute bg-white border rounded-md shadow-lg mt-1 w-full z-[100]">
              {searchResults.map((task) => (
                <div
                key={task._id}
                className="p-2 hover:bg-gray-100 border-b last:border-b-0 md:flex md:flex-col md:items-start">
                <h3 className="font-semibold text-base md:text-lg">{task.taskName}</h3>
                <p className="text-sm text-gray-600 md:text-base">{task.description}</p>
                <div className="flex flex-wrap justify-between text-xs text-gray-500 mt-1 md:text-sm">
                  <span className="mr-2">Estimation: {task.estimation}</span>
                  <span className="mr-2">Type: {task.type}</span>
                  <span className="mr-2">Priority: {task.priority}</span>
                  <span className="mr-2">Status: {task.status}</span>
                </div>
                {task.people && task.people.length > 0 && (
                  <div className="flex flex-wrap mt-2">
                  {task.people.map((person) => (
                    <div key={person._id} className="flex items-center mr-2 mb-2">
                    {person.profileUrl ? (
                      <img
                      src={person.profileUrl}
                      alt={person.name}
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm object-cover"
                      />
                    ) : (
                      <User className="w-4 h-4 text-gray-600" />
                    )}
                    <span className="ml-1 text-sm md:text-base">{person.name}</span>
                    </div>
                  ))}
                  </div>
                )}
                </div>
              ))}
            </div>
            )}
        </div>

        {/* Filter Button */}
        <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
          <Filter className="w-5 h-5" /> Filter
        </button>

        {/* New Task Button */}
        <button
          onClick={() => toggleAddTask && toggleAddTask()}
          className="flex  items-center gap-1 bg-neutral-600 text-white w-[7rem] text-sm p-2 rounded-md hover:bg-neutral-800 transition duration-300 ease-in-out transform hover:scale-105">
          <Plus className="size-5" />
          New Task
        </button>
      </div>
    </div>
  );
};
