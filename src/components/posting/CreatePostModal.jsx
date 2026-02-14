import { useState } from "react";
import { ChevronDown } from "lucide-react";

// Custom Dropdown Component
const CustomDropdown = ({ value, onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const current = options.find(opt => opt.value === value);

  return (
    <div className="relative">
      {/* Trigger */}
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

      {/* Overlay */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
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

const CreatePostModal = ({ isOpen, onClose }) => {
  const [description, setDescription] = useState("");
  const [role, setRole] = useState("");
  const [workMode, setWorkMode] = useState("");

  // Role options
  const roleOptions = [
    { value: "ui-ux-designer", label: "UI/UX Designer" },
    { value: "frontend-developer", label: "Frontend Developer" },
    { value: "backend-developer", label: "Backend Developer" },
    { value: "fullstack-developer", label: "Full Stack Developer" },
    { value: "product-manager", label: "Product Manager" },
    { value: "graphic-designer", label: "Graphic Designer" },
    { value: "content-writer", label: "Content Writer" },
    { value: "marketing-specialist", label: "Marketing Specialist" },
  ];

  // Work Mode options
  const workModeOptions = [
    { value: "remote", label: "Remote" },
    { value: "hybrid", label: "Hybrid" },
    { value: "onsite", label: "Onsite" },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-90 flex items-center justify-center px-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="h-120 overflow-y-auto scrollbar-hide relative bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 md:p-8">
        <h2 className="text-xl font-semibold mb-6">
          Post a Request
        </h2>

        <form className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Post Title
            </label>
            <input
              type="text"
              placeholder="e.g., Need UI Designer for Mobile App"
              className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Description */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium">
                Detailed Description
              </label>
              <span className="text-xs text-gray-400">
                {description.length}/200
              </span>
            </div>

            <textarea
              rows={4}
              maxLength={200}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your project requirement, timeline, and specific skills needed..."
              className="w-full border border-gray-400 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <p className="text-xs text-gray-400 mt-1">
              Appears in search results and previews
            </p>
          </div>

          {/* Role & Work Mode */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">
                Role Needed
              </label>
              <CustomDropdown
                value={role}
                onChange={setRole}
                options={roleOptions}
                placeholder="Select a role..."
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">
                Work Mode
              </label>
              <CustomDropdown
                value={workMode}
                onChange={setWorkMode}
                options={workModeOptions}
                placeholder="Select Work Mode"
              />
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="text-sm font-medium mb-1 block">
              Budget Range (Optional)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Min (₦)"
                className="border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="number"
                placeholder="Max (₦)"
                className="border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Attachments */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Attachments (Optional)
            </label>

            <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center text-gray-500 hover:border-primary transition cursor-pointer">
              <div className="text-2xl mb-2">⬆️</div>
              <p className="text-sm">
                Click to upload or drag and drop
              </p>
              <p className="text-xs mt-1">
                PNG, JPG up to 5MB
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col md:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn border border-dark w-full md:w-auto px-6 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="button"
              className="btn w-full md:w-auto px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
            >
              Publish & Promote Post
            </button>

            <button
              type="submit"
              className="btn btn-outline w-full md:w-auto px-6 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition"
            >
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;