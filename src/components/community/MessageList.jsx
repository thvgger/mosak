const MessageList = () => {
  return (
    <div className="p-4 space-y-4 md:space-y-6 pb-4">
      <Message
        name="Chioma Adeleke"
        badge="Gold"
        role="Seller"
        message="Good morning everyone! Just launched my new collection on the marketplace. Would love your feedback! 🎉"
      />

      <Message
        name="Tunde Bakere"
        badge="Silver"
        role="Buyer"
        message="Congratulations Chioma! I'll check it out. Has anyone tried the new search filters?"
      />

      <Message
        name="Ngozi Okonkwo"
        badge="Platinum"
        role="Freelancer"
        message="Yes! The filters are super helpful. Makes discovery much easier."
      />

      <Message
        name="Ngozi Okonkwo"
        badge="Platinum"
        role="Freelancer"
        message="Yes! The filters are super helpful. Makes discovery much easier."
      />
      
      {/* Add more messages to demonstrate scrolling */}
      <Message
        name="John Doe"
        badge="Silver"
        role="Buyer"
        message="This is another message to show scrolling behavior."
      />
    </div>
  );
};

export default MessageList;

/* Message Component */
const Message = ({ name, badge, role, message }) => (
  <div className="flex gap-3 md:gap-4">
    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm md:text-base shrink-0">
      {name[0]}
    </div>

    <div className="flex-1 min-w-0">
      <div className="flex flex-wrap items-center gap-1 md:gap-2">
        <span className="font-semibold text-sm md:text-base">{name}</span>
        <span className="text-xs bg-yellow-100 px-2 rounded whitespace-nowrap">
          {badge}
        </span>
        <span className="text-xs bg-gray-100 px-2 rounded whitespace-nowrap">
          {role}
        </span>
        <span className="text-xs text-gray-400 ml-auto whitespace-nowrap">10:24 AM</span>
      </div>

      <p className="text-gray-700 mt-1 text-sm md:text-base wrap-break-words">{message}</p>

      <div className="flex gap-2 mt-2 text-sm">
        <button className="px-2 py-1 bg-gray-100 rounded text-xs md:text-sm hover:bg-gray-200 transition-colors">👍 5</button>
        <button className="px-2 py-1 bg-gray-100 rounded text-xs md:text-sm hover:bg-gray-200 transition-colors">🔥 3</button>
      </div>
    </div>
  </div>
);