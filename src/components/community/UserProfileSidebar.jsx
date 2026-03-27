// import React, { useState, useEffect } from 'react';
// import { 
//   X, 
//   Star, 
//   MapPin,
//   MessageCircle,
//   MoreHorizontal,
//   User,
//   CheckCircle,
//   Award,
//   ShoppingBag,
//   Briefcase,
//   Volume,
//   Search,
//   Users
// } from 'lucide-react';

// const UserProfileSidebar = ({ isOpen, onClose, selectedUser, isMobile }) => {
//   const [isDesktop, setIsDesktop] = useState(!isMobile);

//   useEffect(() => {
//     setIsDesktop(!isMobile);
//   }, [isMobile]);

//   if (!isOpen || !selectedUser) return null;

//   // Sample user data structure (you can expand this)
//   const userData = {
//     id: selectedUser.id,
//     name: selectedUser.name,
//     role: selectedUser.role,
//     avatar: selectedUser.avatar || selectedUser.name.split(' ').map(n => n[0]).join(''),
//     badges: selectedUser.badges || ['Verified'],
//     rating: selectedUser.rating || 4.9,
//     joined: selectedUser.joined || '2023',
//     location: selectedUser.location || 'Lagos, NG',
//     bio: selectedUser.bio || 'Community member passionate about connecting and sharing knowledge.',
//     stats: {
//       sales: selectedUser.sales || 0,
//       purchases: selectedUser.purchases || 0,
//       projects: selectedUser.projects || 0,
//       reviews: selectedUser.reviews || 124
//     }
//   };

//   // Desktop Sidebar View
//   if (isDesktop) {
//     return (
//       <>
//         {/* Mobile Overlay - only shows on mobile but we keep it for consistency */}
//         {isOpen && (
//           <div 
//             className="fixed inset-0 bg-black/50 z-40 md:hidden flex"
//             onClick={onClose}
//           />
//         )}

//         {/* Desktop Sidebar */}
//         <aside className={`
//           fixed md:sticky inset-y-0 right-0
//           w-72 bg-white border-l border-gray-200
//           flex flex-col transition-transform duration-300
//           ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-full'}
//         `}>
//           {/* Header */}
//           <div className="h-14 flex items-center justify-between px-6 border-b border-gray-200">
//             <h3 className="font-semibold text-gray-700">Profile</h3>
//             <button 
//               onClick={onClose}
//               className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//             >
//               <X size={18} />
//             </button>
//           </div>

//           {/* Scrollable Content */}
//           <div className="flex-1 overflow-y-auto p-6">
//             {/* Profile Header */}
//             <div className="text-center">
//               <div className="w-24 h-24 mx-auto rounded-full bg-linear-to-br from-primary to-blue-600 text-white flex items-center justify-center text-3xl font-bold">
//                 {userData.avatar}
//               </div>
              
//               <h2 className="mt-4 text-xl font-bold">{userData.name}</h2>
//               <p className="text-gray-600 text-sm">{userData.role}</p>
              
//               {/* Rating and Location */}
//               <div className="flex items-center justify-center gap-3 mt-2 text-sm">
//                 <div className="flex items-center gap-1">
//                   <Star size={14} className="text-yellow-400 fill-current" />
//                   <span className="font-medium">{userData.rating}</span>
//                 </div>
//                 <span className="text-gray-300">•</span>
//                 <span className="text-gray-600 flex items-center gap-1">
//                   <MapPin size={14} />
//                   {userData.location}
//                 </span>
//               </div>

//               {/* Badges */}
//               <div className="flex flex-wrap justify-center gap-2 mt-3">
//                 {userData.badges.map((badge, i) => (
//                   <span key={i} className="px-3 py-1 bg-gray-100 text-xs rounded-full flex items-center gap-1">
//                     {badge === 'Verified' && <CheckCircle size={12} className="text-blue-500" />}
//                     {badge}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* Stats Grid */}
//             <div className="grid grid-cols-4 gap-2 mt-6 p-4 bg-gray-50 rounded-lg">
//               <div className="text-center">
//                 <div className="text-lg font-bold text-primary">
//                   {userData.stats.sales || userData.stats.projects || '0'}
//                 </div>
//                 <div className="text-xs text-gray-600">
//                   {selectedUser.sales ? 'Sales' : selectedUser.projects ? 'Projects' : 'Posts'}
//                 </div>
//               </div>
//               <div className="text-center">
//                 <div className="text-lg font-bold text-primary">
//                   {userData.stats.purchases || '0'}
//                 </div>
//                 <div className="text-xs text-gray-600">Purchases</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-lg font-bold text-primary">{userData.rating}</div>
//                 <div className="text-xs text-gray-600">Rating</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-lg font-bold text-primary">
//                   {userData.stats.reviews || '0'}
//                 </div>
//                 <div className="text-xs text-gray-600">Reviews</div>
//               </div>
//             </div>

//             {/* Bio */}
//             <div className="mt-6">
//               <h3 className="font-medium mb-2 text-sm">About</h3>
//               <p className="text-sm text-gray-600 leading-relaxed">
//                 {userData.bio}
//               </p>
//             </div>

//             {/* Recent Activity Preview */}
//             <div className="mt-6">
//               <h3 className="font-medium mb-3 text-sm">Recent Activity</h3>
//               <div className="space-y-3">
//                 <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
//                   <MessageCircle size={16} className="text-gray-400 mt-0.5" />
//                   <div>
//                     <p className="text-xs text-gray-600">
//                       Commented on "Looking for UI/UX Designer"
//                     </p>
//                     <span className="text-xs text-gray-400">2 hours ago</span>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
//                   <Award size={16} className="text-gray-400 mt-0.5" />
//                   <div>
//                     <p className="text-xs text-gray-600">
//                       Received "Top Contributor" badge
//                     </p>
//                     <span className="text-xs text-gray-400">Yesterday</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex gap-3 mt-8">
//               <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-sm font-medium">
//                 <MessageCircle size={16} />
//                 Message
//               </button>
//               <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
//                 <MoreHorizontal size={16} />
//                 More
//               </button>
//             </div>

//             {/* Report/Block Options */}
//             <button className="w-full mt-4 text-sm text-gray-400 hover:text-red-500 transition text-center">
//               Report User
//             </button>
//           </div>
//         </aside>
//       </>
//     );
//   }

//   // Mobile Popup View
//   return (
//     <div className="fixed inset-0 z-50 flex items-end md:hidden">
//       {/* Overlay */}
//       <div 
//         className="absolute inset-0 bg-black/60"
//         onClick={onClose}
//       />

//       {/* Popup */}
//       <div className="relative bg-white w-full rounded-t-2xl max-h-[80vh] pb-4 overflow-y-auto animate-slide-up">
//         {/* Handle bar for drag to close */}
//         <div className="sticky top-0 bg-white pt-3 pb-2 flex justify-center border-b border-gray-100">
//           <div 
//             className="w-12 h-1.5 bg-gray-300 rounded-full cursor-pointer"
//             onClick={onClose}
//           />
//         </div>

//         {/* Close button */}
//         {/* <button
//           onClick={onClose}
//           className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full z-10"
//         >
//           <X size={20} />
//         </button> */}

//         {/* Content */}
//         <div className="px-6 pb-8">
//           {/* Profile Header */}
//           <div className="text-center pt-2">
//             <div className="w-24 h-24 mx-auto rounded-full bg-linear-to-br from-primary to-blue-600 text-white flex items-center justify-center text-3xl font-bold">
//               {userData.avatar}
//             </div>
            
//             <h2 className="mt-4 text-xl font-bold">{userData.name}</h2>
//             <p className="text-gray-600 text-sm">{userData.role}</p>
            
//             {/* Rating and Location */}
//             <div className="flex items-center justify-center gap-3 mt-2 text-sm">
//               <div className="flex items-center gap-1">
//                 <Star size={14} className="text-yellow-400 fill-current" />
//                 <span className="font-medium">{userData.rating}</span>
//               </div>
//               <span className="text-gray-300">•</span>
//               <span className="text-gray-600 flex items-center gap-1">
//                 <MapPin size={14} />
//                 {userData.location}
//               </span>
//             </div>

//             {/* Badges */}
//             <div className="flex flex-wrap justify-center gap-2 mt-3">
//               {userData.badges.map((badge, i) => (
//                 <span key={i} className="px-3 py-1 bg-gray-100 text-xs rounded-full flex items-center gap-1">
//                   {badge === 'Verified' && <CheckCircle size={12} className="text-blue-500" />}
//                   {badge}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Stats Grid */}
//           <div className="grid grid-cols-4 gap-2 mt-6 p-2 bg-gray-300 rounded-lg">
//             <div className="text-center">
//               <div className="text-lg font-bold text-primary">
//                 {userData.stats.sales || userData.stats.projects || '0'}
//               </div>
//               <div className="text-xs text-gray-600">
//                 {selectedUser.sales ? 'Sales' : selectedUser.projects ? 'Projects' : 'Posts'}
//               </div>
//             </div>
//             <div className="text-center">
//               <div className="text-lg font-bold text-primary">
//                 {userData.stats.purchases || '0'}
//               </div>
//               <div className="text-xs text-gray-600">Purchases</div>
//             </div>
//             <div className="text-center">
//               <div className="text-lg font-bold text-primary">{userData.rating}</div>
//               <div className="text-xs text-gray-600">Rating</div>
//             </div>
//             <div className="text-center">
//               <div className="text-lg font-bold text-primary">
//                 {userData.stats.reviews || '0'}
//               </div>
//               <div className="text-xs text-gray-600">Reviews</div>
//             </div>
//           </div>

//           {/* Bio */}
//           <div className="mt-6">
//             <h3 className="font-medium mb-2 text-sm">About</h3>
//             <p className="text-sm text-gray-600 leading-relaxed">
//               {userData.bio}
//             </p>
//           </div>

//           {/* Recent Activity Preview */}
//           <div className="mt-6">
//             <h3 className="font-medium mb-3 text-sm">Recent Activity</h3>
//             <div className="space-y-3">
//               <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
//                 <MessageCircle size={16} className="text-gray-400 mt-0.5" />
//                 <div>
//                   <p className="text-xs text-gray-600">
//                     Commented on "Looking for UI/UX Designer"
//                   </p>
//                   <span className="text-xs text-gray-400">2 hours ago</span>
//                 </div>
//               </div>
//               <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
//                 <Award size={16} className="text-gray-400 mt-0.5" />
//                 <div>
//                   <p className="text-xs text-gray-600">
//                     Received "Top Contributor" badge
//                   </p>
//                   <span className="text-xs text-gray-400">Yesterday</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-3 mt-8">
//             <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-sm font-medium">
//               <MessageCircle size={16} />
//               Message
//             </button>
//             <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
//               <MoreHorizontal size={16} />
//               More
//             </button>
//           </div>

//           {/* Report/Block Options */}
//           <button className="w-full mt-4 text-sm text-gray-400 hover:text-red-500 transition text-center">
//             Report User
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfileSidebar;


// components/community/UserProfileSidebar.jsx (updated)
import React, { useState, useEffect } from 'react';
import { 
  X, 
  Star, 
  MapPin,
  MessageCircle,
  MoreHorizontal,
  CheckCircle,
  Award,
  Calendar,
  Mail,
  User as UserIcon,
  ThumbsUp,
  MessageSquare,
  ShoppingBag,
  Briefcase
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const UserProfileSidebar = ({ isOpen, onClose, selectedUser, isMobile }) => {
  const { user: currentUser } = useAuth();
  const [isDesktop, setIsDesktop] = useState(!isMobile);

  useEffect(() => {
    setIsDesktop(!isMobile);
  }, [isMobile]);

  if (!isOpen || !selectedUser) return null;

  // Build user data with fallbacks
  const userData = {
    id: selectedUser.id,
    name: selectedUser.name || selectedUser.full_name || 'User',
    username: selectedUser.username || selectedUser.name?.toLowerCase().replace(/\s/g, ''),
    email: selectedUser.email,
    role: selectedUser.role || selectedUser.roles?.[0] || 'Member',
    avatar: selectedUser.avatar || selectedUser.name?.charAt(0) || 'U',
    badges: selectedUser.badges || getBadgesByRole(selectedUser.role),
    rating: selectedUser.rating || 4.5,
    joined: selectedUser.joined || selectedUser.created_at?.split('T')[0] || '2024',
    location: selectedUser.location || 'Nigeria',
    bio: selectedUser.bio || 'Community member passionate about connecting and sharing knowledge.',
    stats: {
      posts: selectedUser.stats?.posts || 0,
      deals: selectedUser.stats?.deals || 0,
      likes: selectedUser.stats?.likes || 0,
      comments: selectedUser.stats?.comments || 0,
      followers: selectedUser.stats?.followers || 0,
      following: selectedUser.stats?.following || 0
    },
    kyc_status: selectedUser.kyc_status,
    isCurrentUser: currentUser?.id === selectedUser.id
  };

  const getBadgesByRole = (role) => {
    const badges = ['Verified'];
    if (role === 'SELLER') badges.push('Top Seller');
    if (role === 'FREELANCER') badges.push('Top Rated');
    if (role === 'BUYER') badges.push('Trusted Buyer');
    if (userData.kyc_status === 'VERIFIED') badges.push('KYC Verified');
    return badges;
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  // Desktop Sidebar View
  if (isDesktop) {
    return (
      <>
        {/* Mobile Overlay */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
          />
        )}

        {/* Desktop Sidebar */}
        <aside className={`
          fixed md:sticky inset-y-0 right-0 top-0
          w-80 bg-white border-l border-gray-200
          flex flex-col transition-transform duration-300
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          z-50 md:z-0
        `}>
          {/* Header */}
          <div className="h-14 flex items-center justify-between px-6 border-b border-gray-200 sticky top-0 bg-white z-10">
            <h3 className="font-semibold text-gray-700">Profile</h3>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Profile Header */}
            <div className="text-center p-6 border-b border-gray-100">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-blue-600 text-white flex items-center justify-center text-3xl font-bold shadow-lg">
                {userData.avatar}
              </div>
              
              <h2 className="mt-4 text-xl font-bold">{userData.name}</h2>
              <p className="text-gray-500 text-sm">@{userData.username}</p>
              <p className="text-gray-600 text-sm mt-1">{userData.role}</p>
              
              {/* Rating and Location */}
              <div className="flex items-center justify-center gap-3 mt-3 text-sm">
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-400 fill-current" />
                  <span className="font-medium">{userData.rating}</span>
                </div>
                <span className="text-gray-300">•</span>
                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin size={14} />
                  <span>{userData.location}</span>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {userData.badges.map((badge, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 text-xs rounded-full flex items-center gap-1">
                    {badge === 'Verified' && <CheckCircle size={12} className="text-blue-500" />}
                    {badge}
                  </span>
                ))}
              </div>

              {/* Email */}
              {userData.email && (
                <div className="mt-3 flex items-center justify-center gap-1 text-xs text-gray-500">
                  <Mail size={12} />
                  <span>{userData.email}</span>
                </div>
              )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3 p-6 border-b border-gray-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{userData.stats.posts}</div>
                <div className="text-xs text-gray-500">Posts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{userData.stats.deals}</div>
                <div className="text-xs text-gray-500">Deals</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{userData.stats.followers}</div>
                <div className="text-xs text-gray-500">Followers</div>
              </div>
            </div>

            {/* Bio */}
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-medium mb-2 text-sm flex items-center gap-2">
                <UserIcon size={14} />
                About
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {userData.bio}
              </p>
            </div>

            {/* Member Since */}
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-medium mb-2 text-sm flex items-center gap-2">
                <Calendar size={14} />
                Member Since
              </h3>
              <p className="text-sm text-gray-600">{formatDate(userData.joined)}</p>
            </div>

            {/* Recent Activity Preview */}
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-medium mb-3 text-sm flex items-center gap-2">
                <Award size={14} />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {userData.stats.posts > 0 && (
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <MessageSquare size={16} className="text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-600">
                        Posted in #{userData.role === 'SELLER' ? 'sellers-lounge' : 'general'}
                      </p>
                      <span className="text-xs text-gray-400">Recently</span>
                    </div>
                  </div>
                )}
                {userData.stats.deals > 0 && (
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <ShoppingBag size={16} className="text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-600">
                        Completed {userData.stats.deals} successful {userData.stats.deals === 1 ? 'deal' : 'deals'}
                      </p>
                      <span className="text-xs text-gray-400">All time</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6">
              <div className="flex gap-3">
                <button 
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition text-sm font-medium ${
                    userData.isCurrentUser
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-primary text-white hover:bg-primary/90'
                  }`}
                  disabled={userData.isCurrentUser}
                >
                  <MessageCircle size={16} />
                  {userData.isCurrentUser ? 'Your Profile' : 'Message'}
                </button>
                {!userData.isCurrentUser && (
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
                    <MoreHorizontal size={16} />
                    More
                  </button>
                )}
              </div>
              
              {!userData.isCurrentUser && (
                <button className="w-full mt-4 text-sm text-gray-400 hover:text-red-500 transition text-center">
                  Report User
                </button>
              )}
            </div>
          </div>
        </aside>
      </>
    );
  }

  // Mobile Popup View (similar structure but optimized for mobile)
  return (
    <div className="fixed inset-0 z-50 flex items-end md:hidden">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      
      <div className="relative bg-white w-full rounded-t-2xl max-h-[85vh] pb-4 overflow-y-auto animate-slide-up">
        <div className="sticky top-0 bg-white pt-3 pb-2 flex justify-center border-b border-gray-100">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full cursor-pointer" onClick={onClose} />
        </div>

        <div className="px-6 pb-8">
          {/* Profile Header - Mobile */}
          <div className="text-center pt-2">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-blue-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
              {userData.avatar}
            </div>
            
            <h2 className="mt-3 text-lg font-bold">{userData.name}</h2>
            <p className="text-gray-500 text-xs">@{userData.username}</p>
            <p className="text-gray-600 text-xs mt-1">{userData.role}</p>
            
            <div className="flex items-center justify-center gap-3 mt-2 text-xs">
              <div className="flex items-center gap-1">
                <Star size={12} className="text-yellow-400 fill-current" />
                <span>{userData.rating}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <MapPin size={12} />
                <span>{userData.location}</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-1.5 mt-2">
              {userData.badges.slice(0, 2).map((badge, i) => (
                <span key={i} className="px-2 py-0.5 bg-gray-100 text-xs rounded-full flex items-center gap-1">
                  {badge === 'Verified' && <CheckCircle size={10} className="text-blue-500" />}
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Stats - Mobile */}
          <div className="grid grid-cols-3 gap-2 mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-lg font-bold text-primary">{userData.stats.posts}</div>
              <div className="text-xs text-gray-500">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-primary">{userData.stats.deals}</div>
              <div className="text-xs text-gray-500">Deals</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-primary">{userData.stats.followers}</div>
              <div className="text-xs text-gray-500">Followers</div>
            </div>
          </div>

          {/* Bio - Mobile */}
          <div className="mt-4">
            <h3 className="font-medium mb-1 text-sm">About</h3>
            <p className="text-sm text-gray-600">{userData.bio}</p>
          </div>

          {/* Action Buttons - Mobile */}
          <div className="flex gap-3 mt-6">
            <button 
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition text-sm font-medium ${
                userData.isCurrentUser
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-primary/90'
              }`}
              disabled={userData.isCurrentUser}
            >
              <MessageCircle size={16} />
              {userData.isCurrentUser ? 'Your Profile' : 'Message'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSidebar;