import { CalendarRange, Link, Smile, Paperclip, Send } from "lucide-react";

const MessageInput = () => {
  return (
    <div className="w-full container bg-white p-3 md:p-4 flex items-start justify-start border-t border-gray-300 fixed bottom-0">
      <div className="w-full flex items-center justify-center gap-2 md:gap-4 relative!">
        <button className=""> 
          <Link size={16} className="text-gray-400" /> 
        </button>
        <button className="">
          <Paperclip size={16} className="text-gray-400" />
        </button>
        
        <button className=""> 
          <CalendarRange size={18} className="text-gray-400" /> 
        </button>

        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded-lg px-3 md:px-4 py-2 focus:outline-none focus:border-primary text-base"
        />

        <button className="bg-primary text-white p-2 md:px-4 md:py-2 rounded-lg">
          <span className="">
            <Send />
          </span>
        </button>

      </div>
    </div>
  );
};

export default MessageInput;