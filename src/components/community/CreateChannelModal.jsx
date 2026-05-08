import React, { useState } from "react";
import { ChevronDown, Hash, Lock, Globe, Users, X, Megaphone } from "lucide-react";

// Custom Dropdown Component (reusing the same pattern)
const CustomDropdown = ({ value, onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const current = options.find(opt => opt.value === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between gap-2 px-4 py-2 rounded-lg border ${
          current ? 'border-gray-400' : 'border-gray-400'
        } text-left bg-white hover:bg-gray-50 transition`}
      >
        <span className={current ? 'text-dark' : 'text-gray-500'}>
          {current?.label || placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 right-0 mt-1 rounded-lg bg-white border border-gray-200 shadow-lg z-20 overflow-hidden">
            {options.map(option => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-sm transition
                  ${
                    value === option.value
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const CreateChannelModal = ({ isOpen, onClose, onCreateChannel }) => {
  const [channelName, setChannelName] = useState("");
  const [channelDescription, setChannelDescription] = useState("");
  const [channelType, setChannelType] = useState("public");
  const [selectedGroup, setSelectedGroup] = useState("");

  // Channel type options
  const channelTypeOptions = [
    { value: "public", label: "Public", icon: Globe },
    { value: "private", label: "Private", icon: Lock },
    { value: "announcement", label: "Announcement", icon: Megaphone },
  ];

  // Channel groups (matching your sidebar groups)
  const groupOptions = [
    { value: "general", label: "General" },
    { value: "announcements", label: "Announcements" },
    { value: "lounges", label: "Lounges" },
    { value: "marketplace", label: "Marketplace" },
    { value: "resources", label: "Resources" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create channel object
    const newChannel = {
      id: channelName.toLowerCase().replace(/\s+/g, '-'),
      name: channelName,
      description: channelDescription,
      type: channelType,
      group: selectedGroup,
      members: 0,
      createdAt: new Date().toISOString(),
    };

    // Call the parent handler
    if (onCreateChannel) {
      onCreateChannel(newChannel);
    }
    
    // Reset form and close modal
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setChannelName("");
    setChannelDescription("");
    setChannelType("public");
    setSelectedGroup("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-lg h-auto max-h-[90vh] rounded-xl shadow-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0">
          <h2 className="text-xl font-semibold">
            Create Channel
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 flex-1  h-full overflow-y-auto">
          {/* Channel Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Channel Name
            </label>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                placeholder="e.g., project-discussion, gaming-lounge"
                className="w-full border border-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Use lowercase letters, numbers, and hyphens only
            </p>
          </div>

          {/* Channel Description */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium">
                Description
              </label>
              <span className="text-xs text-gray-400">
                {channelDescription.length}/100
              </span>
            </div>

            <textarea
              rows={3}
              maxLength={100}
              value={channelDescription}
              onChange={(e) => setChannelDescription(e.target.value)}
              placeholder="What's this channel about?"
              className="w-full border border-gray-400 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Channel Group */}
          <div>
            <label className="text-sm font-medium mb-1 block">
              Channel Group
            </label>
            <CustomDropdown
              value={selectedGroup}
              onChange={setSelectedGroup}
              options={groupOptions}
              placeholder="Select a group..."
            />
            <p className="text-xs text-gray-400 mt-1">
              Choose where this channel will appear
            </p>
          </div>

          {/* Channel Type */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Channel Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              {channelTypeOptions.map((type) => {
                const Icon = type.icon;
                const isSelected = channelType === type.value;
                
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setChannelType(type.value)}
                    className={`
                      flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition
                      ${isSelected 
                        ? 'border-primary bg-primary/5' 
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    <Icon size={20} className={isSelected ? 'text-primary' : 'text-gray-500'} />
                    <span className={`text-xs font-medium ${isSelected ? 'text-primary' : 'text-gray-600'}`}>
                      {type.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Additional Options (Optional) */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium mb-3">Additional Settings</h3>
            
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="rounded text-primary" />
                <span>Make this channel age-restricted (18+)</span>
              </label>
              
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="rounded text-primary" />
                <span>Slow mode (5 minutes between messages)</span>
              </label>
              
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="rounded text-primary" />
                <span>Allow file uploads in this channel</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse md:flex-row gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="w-full md:w-auto px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-full md:w-auto px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
            >
              Create Channel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateChannelModal;