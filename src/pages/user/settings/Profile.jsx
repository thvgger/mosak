// import React, { useState } from 'react';
// import { 
//   User, 
//   Camera, 
//   Mail, 
//   Phone, 
//   MapPin, 
//   Calendar,
//   Save,
//   Edit2,
//   CheckCircle,
//   XCircle
// } from 'lucide-react';
// import { useAuth } from '../../contexts/AuthContext';

// const Profile = () => {
//   const { user, loading, isAuthenticated } = useAuth();  
//   const [isEditing, setIsEditing] = useState(false);
//   const [profileData, setProfileData] = useState({
//     name: user?.full_name || 'Dorcas Samuel',
//     email: user?.email || 'dorcas.samuel@example.com',
//     phone: user?.phone_number || '+234 801 234 5678',
//     location: '',
//     bio: 'Passionate buyer and seller on MosakHub. Love discovering new products and connecting with sellers.',
//     memberSince: 'Jan 2026'
//   });

//   const handleSave = () => {
//     // Save logic here
//     setIsEditing(false);
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-gray-800 flex-1">Profile</h1>
//         <div className='flex items-center justify-center gap-2'>
//           {isEditing && (
//             <button className='btn btn-tertiary'>
//               Cancel
//             </button>
//           )}
//           <button
//             onClick={() => isEditing ? handleSave() : setIsEditing(true)}
//             className="btn"
//             >
//             {isEditing ? <Save size={18} /> : <Edit2 size={18} />}
//             {isEditing ? 'Save Changes' : 'Edit Profile'}
//           </button>
//         </div>
//       </div>

//       {/* Profile Card */}
//       <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Avatar */}
//           <div className="relative group">
//             <div className="w-24 h-24 md:w-32 md:h-32 bg-primary rounded-full flex items-center justify-center text-white text-3xl md:text-4xl font-bold">
//               {profileData.name.charAt(0)}
//             </div>
//             {isEditing && (
//               <button className="p-2 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50">
//                 <Camera size={16} />
//               </button>
//             )}
//           </div>

//           {/* Info */}
//           <div className="flex-1 space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="text-xs text-gray-500">Full Name</label>
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     value={profileData.name}
//                     onChange={(e) => setProfileData({...profileData, name: e.target.value})}
//                     className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
//                   />
//                 ) : (
//                   <p className="font-semibold">{profileData.name}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="text-xs text-gray-500">Email</label>
//                 {isEditing ? (
//                   <input
//                     type="email"
//                     value={profileData.email}
//                     onChange={(e) => setProfileData({...profileData, email: e.target.value})}
//                     className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
//                   />
//                 ) : (
//                   <p className="flex items-center gap-2">
//                     {profileData.email}
//                     <CheckCircle size={14} className="text-green-500" />
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="text-xs text-gray-500">Phone</label>
//                 {isEditing ? (
//                   <input
//                     type="tel"
//                     value={profileData.phone}
//                     onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
//                     className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
//                   />
//                 ) : (
//                   <p>{profileData.phone}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="text-xs text-gray-500">Location</label>
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     value={profileData.location}
//                     onChange={(e) => setProfileData({...profileData, location: e.target.value})}
//                     className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
//                   />
//                 ) : (
//                   <p>{profileData.location}</p>
//                 )}
//               </div>
//             </div>

//             <div>
//               <label className="text-xs text-gray-500">Bio</label>
//               {isEditing ? (
//                 <textarea
//                   value={profileData.bio}
//                   onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
//                   rows={3}
//                   className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
//                 />
//               ) : (
//                 <p className="text-gray-600">{profileData.bio}</p>
//               )}
//             </div>

//             <div className="text-xs text-gray-400 flex items-center gap-1">
//               <Calendar size={12} />
//               Member since {profileData.memberSince}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;





import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    fullName: user?.full_name || "Janedoe",
    username: user?.username || "Janey",
    email: user?.email || "janedoe@gmail.com",
    phone: user?.phone_number || "+234 7897657890",
    dob: "15/09/1453",
    address: "123 Victoria Island, Lagos, Nigeria",
  });

  const handleChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // TODO: API call
    setIsEditing(false);
  };

  return (
    <div className="">
      <div className="space-y-6">

        {/* HEADER CARD */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
            {profileData.fullName.charAt(0)}
          </div>

          <div>
            <h2 className="font-semibold text-lg">
              {profileData.fullName}
            </h2>
            <p className="text-sm text-orange-500 flex items-center gap-1">
              🥉 Bronze Member
            </p>
          </div>
        </div>

        {/* PROFILE INFO */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
          <h3 className="text-lg font-semibold text-gray-700">
            Profile Information
          </h3>

          {/* FULL NAME */}
          <div>
            <label className="text-sm text-gray-500">Full Name</label>
            <input
              type="text"
              value={profileData.fullName}
              disabled={!isEditing}
              onChange={(e) => handleChange("fullName", e.target.value)}
              className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white outline-none"
            />
          </div>

          {/* USERNAME */}
          <div>
            <label className="text-sm text-gray-500"> Username </label>
            <input
              type="text"
              value={profileData.username}
              disabled={!isEditing}
              onChange={(e) => handleChange("username", e.target.value)}
              className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white outline-none"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-500">Email Address</label>
            <input
              type="email"
              value={profileData.email}
              disabled={!isEditing}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white outline-none"
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="text-sm text-gray-500">Phone Number</label>
            <input
              type="text"
              value={profileData.phone}
              disabled={!isEditing}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white outline-none"
            />
          </div>

          {/* DOB */}
          <div>
            <label className="text-sm text-gray-500">Date of Birth</label>
            <input
              type="text"
              value={profileData.dob}
              disabled={!isEditing}
              onChange={(e) => handleChange("dob", e.target.value)}
              className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white outline-none"
            />
          </div>

          {/* ADDRESS */}
          <div>
            <label className="text-sm text-gray-500">Address</label>
            <input
              type="text"
              value={profileData.address}
              disabled={!isEditing}
              onChange={(e) => handleChange("address", e.target.value)}
              className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white outline-none"
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={() =>
              isEditing ? handleSave() : setIsEditing(true)
            }
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;