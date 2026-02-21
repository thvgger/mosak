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
      <div className="flex items-center justify-start flex-wrap gap-6 pt-4 border-t border-gray-300">
        <button className="btn">
          Message Client
        </button>


        <div className="flex items-center gap-2 cursor-pointer" title="like">
          <span className="btn btn-outline border-0 relative p-0! rounded-full hover:bg-transparent hover:text-primary"> 
            <ThumbsUp size={14} strokeWidth={1.5} /> 
          </span>
          <span className="text-xs text-primary rounded-full"> 200 </span>
        </div>

        <div className="flex items-center gap-0" title="save">
          <span className="btn btn-outline border-0 relative p-0! rounded-full hover:bg-transparent hover:text-primary"> 
            <Bookmark size={14} strokeWidth={1.5} /> 
          </span>
        </div>
        
        <div className="flex items-center gap-0" title="share">
          <span className="btn btn-outline border-0 relative p-0! rounded-full hover:bg-transparent hover:text-primary"> 
            <Share2 size={14} strokeWidth={1.5} />
          </span>
        </div>
      </div>
    </article>
  );
};

export default PostCard;