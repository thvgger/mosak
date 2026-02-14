import { useState, useEffect } from "react";
import PostCard from "../../components/posting/PostCard.jsx";
import CreatePostModal from "../../components/posting/CreatePostModal.jsx";

const Postings = () => {
  const [openModal, setOpenModal] = useState(false);

    
  useEffect(() => {
    if(openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

  }, [openModal]);


  return (
    <div className="bg-gray-50 min-h-screen container mx-auto py-4">
      <button
        className="btn mb-6"
        onClick={() => setOpenModal(true)}
      >
        Post A Request
      </button>

      {/* Feed */}
      <main className="py-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <PostCard key={i} />
        ))}
      </main>

      {/* Modal */}
      <CreatePostModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
};

export default Postings;