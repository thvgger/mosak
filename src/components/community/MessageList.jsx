import React from 'react';

const MessageList = ({ onUserSelect }) => {
  return (
    <div className="p-4 space-y-4 md:space-y-6 pb-20">
      <Message
        name="Chioma Adeleke"
        badge="Gold"
        role="Seller"
        message="Good morning everyone! Just launched my new collection on the marketplace. Would love your feedback! 🎉"
        onUserSelect={onUserSelect}
      />

      <Message
        name="Tunde Bakere"
        badge="Silver"
        role="Buyer"
        message="Congratulations Chioma! I'll check it out. Has anyone tried the new search filters?"
        onUserSelect={onUserSelect}
      />

      <Message
        name="Ngozi Okonkwo"
        badge="Platinum"
        role="Freelancer"
        message="Yes! The filters are super helpful. Makes discovery much easier."
        onUserSelect={onUserSelect}
      />

      <Message
        name="Aminu Suleiman"
        badge="Gold"
        role="Freelancer"
        message="This is another message to show scrolling behavior."
        onUserSelect={onUserSelect}
      />
      
      {/* Add more messages to demonstrate scrolling */}
      <Message
        name="John Doe"
        badge="Silver"
        role="Buyer"
        message="This is another message to show scrolling behavior."
        onUserSelect={onUserSelect}
      />
    </div>
  );
};

export default MessageList;

/* Message Component */
const Message = ({ name, badge, role, message, onUserSelect }) => {
  // Create user object based on the name
  const getUserData = () => {
    const userMap = {
      'Chioma Adeleke': {
        id: 1,
        name: 'Chioma Adeleke',
        role: 'Gold Seller',
        avatar: 'CA',
        badges: ['Top Seller', 'Verified'],
        rating: 4.9,
        sales: 234,
        joined: '2023',
        location: 'Lagos, NG',
        bio: 'Digital marketer specializing in social media growth. 5+ years experience.'
      },
      'Tunde Bakere': {
        id: 2,
        name: 'Tunde Bakere',
        role: 'Silver Buyer',
        avatar: 'TB',
        badges: ['Frequent Buyer', 'Verified'],
        rating: 4.7,
        purchases: 89,
        joined: '2024',
        location: 'Abuja, NG',
        bio: 'Tech enthusiast and early adopter. Love discovering new products.'
      },
      'Ngozi Okonkwo': {
        id: 3,
        name: 'Ngozi Okonkwo',
        role: 'Platinum Freelancer',
        avatar: 'NO',
        badges: ['Top Rated', 'Verified', 'Expert'],
        rating: 4.9,
        projects: 156,
        joined: '2022',
        location: 'Port Harcourt, NG',
        bio: 'UI/UX Designer with 7 years experience. Google certified.'
      },
      'Aminu Suleiman': {
        id: 4,
        name: 'Aminu Suleiman',
        role: 'Gold Freelancer',
        avatar: 'AS',
        badges: ['Web Developer', 'Verified'],
        rating: 4.8,
        projects: 92,
        joined: '2023',
        location: 'Kano, NG',
        bio: 'Full-stack developer specializing in React and Node.js'
      },
      'John Doe': {
        id: 5,
        name: 'John Doe',
        role: 'Silver Buyer',
        avatar: 'JD',
        badges: ['New Member'],
        rating: 4.5,
        purchases: 12,
        joined: '2024',
        location: 'Lagos, NG',
        bio: 'New to the community, excited to connect!'
      }
    };
    
    return userMap[name] || {
      id: Date.now(),
      name: name,
      role: role || 'Member',
      avatar: name.split(' ').map(n => n[0]).join(''),
      badges: [badge].filter(Boolean),
      rating: 4.5,
      joined: '2024',
      location: 'Nigeria',
      bio: 'Community member'
    };
  };

  const handleClick = () => {
    if (onUserSelect) {
      onUserSelect(getUserData());
    }
  };

  return (
    <div className="flex gap-3">
      {/* Profile Picture or Initials */}
      <div 
        onClick={handleClick}
        className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm md:text-base shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
      >
        {name[0]}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-1 md:gap-2">
          <span 
            onClick={handleClick}
            className="font-semibold text-sm md:text-base cursor-pointer hover:underline"
          >
            {name}
          </span>
          <span className="text-xs bg-yellow-100 px-2 py-0.5 rounded whitespace-nowrap">
            {badge}
          </span>
          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded whitespace-nowrap">
            {role}
          </span>
          <span className="text-xs text-gray-400 ml-auto whitespace-nowrap">10:24 AM</span>
        </div>

        <p className="text-gray-700 mt-1.5 text-xs md:text-sm wrap-break-words">{message}</p>

        <div className="flex gap-2 mt-2 text-sm">
          <button className="px-2 py-1 bg-gray-100 rounded text-xs md:text-sm hover:bg-gray-200 transition-colors">👍 5</button>
          <button className="px-2 py-1 bg-gray-100 rounded text-xs md:text-sm hover:bg-gray-200 transition-colors">🔥 3</button>
        </div>
      </div>
    </div>
  );
};