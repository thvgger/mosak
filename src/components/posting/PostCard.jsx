import { Bookmark, Share2, ThumbsUp } from "lucide-react";

const PostCard = () => {
  return (
    <article className="bg-white border border-gray-300 rounded-lg p-4 md:p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            SJ
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold">Sarah Johnson</h4>
              <span className="text-xs bg-yellow-100 px-2 py-1 rounded">GOLD</span>
            </div>
            <p className="text-xs text-gray-500">1 day ago • Edited</p>
          </div>
        </div>

        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
          Open
        </span>
      </div>

      {/* Content */}
      <div>
        <h3 className="font-semibold">
          Need UI/UX Designer for Mobile App Redesign
        </h3>
        <p className="text-gray-600 text-sm mt-1">
          Looking for an experienced UI/UX designer to redesign our
          e-commerce mobile app. Must have portfolio showcasing modern
          design principles.
        </p>

        <div className="flex flex-wrap gap-2 mt-3 text-xs">
          {["UI/UX", "Mobile", "Figma", "UX"].map(tag => (
            <span
              key={tag}
              className="bg-gray-100 px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Meta */}
      <div className="flex gap-3 text-xs text-gray-600">
        <span className="bg-gray-100 px-2 py-1 rounded">Freelance</span>
        <span className="bg-gray-100 px-2 py-1 rounded">Remote</span>
        <span className="bg-gray-100 px-2 py-1 rounded">
          ₦150,000 – ₦300,000
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-start flex-wrap gap-3 pt-4 border-t border-gray-300">
        <button className="btn">
          Message Client
        </button>
        <button className="btn btn-outline gap-1 px-4"> 
          <Bookmark size={14} strokeWidth={1.5} /> 
          Save
        </button>

        <button className="btn btn-outline relative px-4">
          <span className="flex items-center gap-1"> 
            <ThumbsUp size={14} strokeWidth={1.5} /> Like 
          </span>
          <span className="text-[10px] ml-auto absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full py-0.5 px-1.5 hover:bg-red-400"> 200 </span>
        </button>

        <button className="btn btn-outline px-4">
          <span className="flex items-center gap-1"> 
            <Share2 size={14} />
            Share 
          </span>
        </button>
      </div>
    </article>
  );
};

export default PostCard;