import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  PanelLeftOpen,
  PanelRightOpen,
  Plus
} from 'lucide-react';
import MAdvertCard from '../../components/community/MAdvertCard';
import CreateAdvertModal from '../../components/community/CreateAdvertModal.jsx'; // Import the new modal

const MAdverts = () => {
  const { setIsSidebarOpen, isSidebarOpen } = useOutletContext();
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Sample M-Adverts data
  const adverts = [
    {
      id: 1,
      author: "Chioma Adeleke",
      avatar: "CA",
      badge: "Platinum",
      role: "Seller",
      time: "10:24 AM",

      // image: "/cars/lexus.jpg",

      productTitle: "Foreign Used 2015 Porsche Macan Turbo - Fully Loaded",
      price: "₦22,000,000",
      oldPrice: "₦44,000,000",

      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      location: "Lagos",

      postText:
        "Good morning everyone! Just launched my new collection on the marketplace. Would love your feedback! 🎉",

      link: "https://mosalak.com/invite/abc123xyz",

      likes: 5,
      fires: 3,
    },
    {
      id: 2,
      author: "Ngozi Okonkwo",
      avatar: "NO",
      badge: "Platinum",
      role: "Seller",
      time: "10:24 AM",

      // image: "/cars/lexus.jpg",

      productTitle: "Foreign Used 2015 Porsche Macan Turbo - Fully Loaded",
      price: "₦22,000,000",
      oldPrice: "₦44,000,000",

      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      location: "Lagos",

      postText:
        "Good morning everyone! Just launched my new collection on the marketplace. Would love your feedback! 🎉",

      link: "https://mosalak.com/invite/abc123xyz",

      likes: 5,
      fires: 3,
    },
    {
      id: 3,
      author: "Cynthia Ofure",
      avatar: "CO",
      badge: "Platinum",
      role: "Seller",
      time: "10:24 AM",

      // image: "/cars/lexus.jpg",

      productTitle: "Foreign Used 2015 Porsche Macan Turbo - Fully Loaded",
      price: "₦22,000,000",
      oldPrice: "₦44,000,000",

      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      location: "Lagos",

      postText:
        "Good morning everyone! Just launched my new collection on the marketplace. Would love your feedback! 🎉",

      link: "https://mosalak.com/invite/abc123xyz",

      likes: 5,
      fires: 3,
    },
  ];

  return (
    <div className="h-full overflow-y-auto flex-1 flex flex-col min-w-0 bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="min-h-14 flex items-center justify-between gap-3 px-4">
          <div className="flex items-center">
            {!isSidebarOpen ? (
              <button
                onClick={() => setIsSidebarOpen(prev => !prev)}
                className="rounded hover:bg-gray-50 p-1"
              >
                <PanelLeftOpen size={20} className='text-gray-400' />
              </button>
            ) : (
              <button
                onClick={() => setIsSidebarOpen(prev => !prev)}
                className="rounded hover:bg-gray-50 p-1"
              >
                <PanelRightOpen size={20} className='text-gray-400' />
              </button>
            )}
          </div>

          <div className="h-full flex-1 flex items-center justify-between gap-4 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-3">
              <h2 className="font-semibold text-base"> M-Adverts </h2>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full text-nowrap">
                {adverts.length} active
              </span>
            </div>

            <button 
              onClick={() => setShowCreateModal(true)}
              className='btn btn-primary px-3 gap-1'
            >
              <Plus size={16} />
              Advertise Here
            </button>
          </div>
        </div>
      </div>

      <div className="p-2 md:p-6 grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-3">
        {adverts.map((advert) => (
          <MAdvertCard key={advert.id} advert={advert} />
        ))}
      </div>

      {/* Create Advert Modal */}
      <CreateAdvertModal 
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  );
};

export default MAdverts;