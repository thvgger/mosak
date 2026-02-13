import { Volume, Search, Pin, Users, Info, Menu } from "lucide-react";

const ChatHeader = ({ onMenuClick }) => {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-2 md:gap-4">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-1"
        >
          <Menu size={20} />
        </button>
        <h2 className="font-semibold text-base md:text-lg"> # general </h2>
        <p className="text-xs text-gray-400">
          Main community discussion for all Mosalak users
        </p>
      </div>

      <div className="flex items-center gap-2 md:gap-4 text-gray-400">
        <button className="hidden sm:inline-block"> 
          <Volume size={16}/> 
        </button>
        <button> 
          <Search size={16} /> 
        </button>
        <button className="hidden sm:inline-block"> 
          <Pin size={16} /> 
        </button>
        <button className="hidden md:inline-block"> 
          <Users size={16} /> 
        </button>
        <button className="hidden md:inline-block"> 
          <Info size={16} /> 
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;