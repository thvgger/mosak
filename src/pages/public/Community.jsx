import { useState } from "react";
import Sidebar from "../../components/community/Sidebar";
import ChatHeader from "../../components/community/ChatHeader";
import MessageList from "../../components/community/MessageList";
import MessageInput from "../../components/community/MessageInput";
import PinnedAdvert from "../../components/community/PinnedAdvert";
import { Menu, X } from "lucide-react";

const Community = () => {
  // Set Default Siderbar Open
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Mobile Sidebar Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-lg"
        onClick={() => setIsSidebarOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        fixed md:relative z-40 w-72 md:w-64 lg:w-72 h-full
        transition-transform duration-300 ease-in-out
      `}>
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-h-screen w-full overflow-hidden">
        <ChatHeader onMenuClick={() => setIsSidebarOpen(true)} />
        <div className="flex-1 overflow-y-auto">
          <div className="">
            <PinnedAdvert />
            <MessageList />
          </div>
        </div>
        <MessageInput />
      </div>
    </div>
  );
};

export default Community;