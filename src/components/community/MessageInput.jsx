import { CalendarRange, Link, Smile, Paperclip, Send } from "lucide-react";

const MessageInput = () => {
  return (
    <div className="bg-white p-3 md:p-4 flex items-center gap-2 md:gap-4 border-t border-gray-300 sticky bottom-0">
      {/* Mobile-friendly buttons */}
      <button className=""> 
        <Link size={16} className="text-gray-400" /> 
      </button>
      <button className="">
        <Paperclip size={16} className="text-gray-400" />
      </button>
      
      <button className=""> 
        <CalendarRange size={18} className="text-gray-400" /> 
      </button>
      
      {/* <button className="ml-auto md:ml-0">
        <Smile size={16} />
      </button> */}

      <input
        type="text"
        placeholder="Type your message..."
        className="flex-1 border border-gray-300 rounded-lg px-3 md:px-4 py-2 focus:outline-none text-sm md:text-base"
      />

      <button className="bg-primary text-white p-2 md:px-4 md:py-2 rounded-lg">
        {/* <span className="hidden md:inline">Send</span> */}
        <span className="">
          <Send />
        </span>
      </button>
    </div>
  );
};

export default MessageInput;