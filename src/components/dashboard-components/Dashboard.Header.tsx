import { useContext, useState } from "react";
import { Search, Filter, Plus, User } from "lucide-react";
import { AppContext } from "../../App";
import React from "react";

const DashboardHeader = () => {
  const [activeView, setActiveView] = useState("List");

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      {/* Left Side - Project Title & Navigation */}
      {
        <LeftSide
          activeView={activeView}
          setActiveView={setActiveView}
        />
      }

      {/* Right Side - Actions */}
      {<RightSide />}
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
const RightSide: React.FC = () => {
  const appContext = useContext(AppContext);
  const tasks = appContext?.tasks;
  const userData = appContext?.userData;

  return (
    <div className="flex  gap-5 items-center">
      {/* Avatars & Invites */}
      <div className="flex  self-end  -space-x-2">
        {/* people assigned to a task */}

        {tasks &&
          tasks.map((task) => {
            return (
              task.people &&
              task.people.length !== 0 &&
              task.people.map((assignee) =>
                assignee.profileUrl ? (
                  <img
                    src={assignee.profileUrl}
                    alt={`User ${assignee.name + 1}`}
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm object-cover"
                  />
                ) : (
                  <User className="w-4 h-4  text-orange-600" />
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
        <button className="bg-gray-200  text-sm px-3 py-1 rounded-md hover:bg-gray-300">
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
            className="pl-8 pr-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Filter Button */}
        <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
          <Filter className="w-5 h-5" /> Filter
        </button>

        {/* New Task Button */}
        <button
          onClick={() => appContext?.onCreateTask()}
          className="flex items-center gap-1 bg-neutral-600 text-white px-3 py-1 rounded-md hover:bg-neutral-800">
          <Plus className="w-5 h-5" /> New Task
        </button>
      </div>
    </div>
  );
};
