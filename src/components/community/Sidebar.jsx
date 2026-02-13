import { UserRoundPlus, X } from "lucide-react";

const Sidebar = ({ onClose }) => {
  return (
    <aside className="w-full h-full bg-white flex flex-col">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b">
        <h3 className="font-bold text-lg">Mosalak Community</h3>
        <button onClick={onClose} className="p-2">
          <X size={24} />
        </button>
      </div>

      {/* Community Info */}
      {/* <div className="px-4 md:px-6 py-4">
        <div className="md:hidden mb-4">
          <p className="text-sm text-gray-500">1,247 members</p>
        </div>
        <div className="hidden md:block">
          <h3 className="font-semibold">Mosalak Community</h3>
          <p className="text-sm text-gray-500">1,247 members</p>
        </div>

        <button className="mt-4 text-sm w-full btn justify-start py-2 rounded-lg">
          <UserRoundPlus size={16} /> 
          <span className="hidden md:inline ml-2">Invite to Community</span>
          <span className="md:hidden ml-2">Invite</span>
        </button>
      </div> */}

      {/* Channels */}
      <nav className="flex-1 overflow-y-auto px-4 space-y-2 border-t border-gray-200 pt-4">
        <ChannelGroup
          title="Announcements"
          channels={["platform-updates"]}
          locked
        />

        <ChannelGroup
          channels={["M-ADVERTS"]}
          locked
        />

        <ChannelGroup
          title="General"
          channels={["general", "introductions"]}
        />

        <ChannelGroup
          title="Lounges"
          channels={[
            "buyers-lounge",
            "sellers-lounge",
            "freelancers-lounge",
          ]}
        />

        <ChannelGroup
          title="Opportunities"
          channels={["gigs-marketplace"]}
          highlight
        />
      </nav>

      {/* Create Channel */}
      <div className="p-4">
        <button className="w-full border border-dashed py-2 rounded-lg text-sm">
          + Create Channel
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

/* Helper */
const ChannelGroup = ({ title, channels, locked, highlight }) => (
  <div>
    {title && (
      <h4 className="text-xs uppercase text-gray-500 mb-2">{title}</h4>
    )}
    <ul className="space-y-1">
      {channels.map((ch) => (
        <li
          key={ch}
          className={`px-3 py-2 rounded-lg cursor-pointer text-sm flex items-center
            ${
              highlight
                ? "bg-primary/10 text-primary"
                : "hover:bg-gray-100"
            }`}
        >
          <span className="truncate"># {ch}</span>
          {locked && <span className="ml-auto text-xs shrink-0">🔒</span>}
        </li>
      ))}
    </ul>
  </div>
);