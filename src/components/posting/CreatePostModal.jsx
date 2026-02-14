import { useState } from "react";

const CreatePostModal = ({ isOpen, onClose }) => {
  const [description, setDescription] = useState("");

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
              <select className="w-full border border-gray-400 rounded-lg px-4 py-2">
                <option>Select a role...</option>
                <option>UI/UX Designer</option>
                <option>Frontend Developer</option>
                <option>Backend Developer</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">
                Work Mode
              </label>
              <select className="w-full border border-gray-400 rounded-lg px-4 py-2">
                <option>Select Work Mode</option>
                <option>Remote</option>
                <option>Hybrid</option>
                <option>Onsite</option>
              </select>
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
                className="border border-gray-400 rounded-lg px-4 py-2"
              />
              <input
                type="number"
                placeholder="Max (₦)"
                className="border border-gray-400 rounded-lg px-4 py-2"
              />
            </div>
          </div>

          {/* Attachments */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Attachments (Optional)
            </label>

            <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center text-gray-500">
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
              className="btn border border-dark w-ful"
            >
              Cancel
            </button>

            <button
              type="button"
              className="btn w-full"
            >
              Publish & Promote Post
            </button>

            <button
              type="submit"
              className="btn btn-outline w-full"
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