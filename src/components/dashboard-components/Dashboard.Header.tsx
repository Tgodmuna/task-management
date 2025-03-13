import { useState } from "react";
import { Search, Filter, Plus, User } from "lucide-react";

const DashboardHeader = () => {
  const [activeView, setActiveView] = useState("List");

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      {/* Left Side - Project Title & Navigation */}
      <LeftSide
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* Right Side - Actions */}
      <RightSide />
    </header>
  );
};

export default DashboardHeader;

const LeftSide: React.FC<{
  activeView: string;
  setActiveView: React.Dispatch<React.SetStateAction<string>>;
}> = ({ activeView, setActiveView }) => {
  return (
    <div className="flex items-center gap-6">
      <h1 className="text-xl font-semibold">Craftboard Project</h1>
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
const RightSide: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Avatars & Invite */}
      <div className="flex  self-end  -space-x-2">
        {["/avatar1.jpg", "/avatar2.jpg", "/avatar3.jpg"].map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`User ${index + 1}`}
            className="w-8 h-8 rounded-full border-2 border-white shadow-sm object-cover"
          />
        ))}
        {/* Placeholder Avatar */}
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 border-2 border-white shadow-sm">
          <User className="w-4 h-4 text-gray-600" />
        </div>
        <button className="bg-gray-200 text-sm px-3 py-1 rounded-md hover:bg-gray-300">
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
        <button className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700">
          <Plus className="w-5 h-5" /> New Task
        </button>
      </div>
    </div>
  );
};
