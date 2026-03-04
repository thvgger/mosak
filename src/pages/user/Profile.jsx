import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  User, 
  Camera, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Save,
  Edit2,
  CheckCircle,
  XCircle
} from 'lucide-react';

const Profile = () => {
  const { user } = useOutletContext();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Dorcas Samuel',
    email: user?.email || 'dorcas.samuel@example.com',
    phone: '+234 801 234 5678',
    location: 'Lagos, Nigeria',
    bio: 'Passionate buyer and seller on MosakHub. Love discovering new products and connecting with sellers.',
    memberSince: 'Jan 2026'
  });

  const handleSave = () => {
    // Save logic here
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          {isEditing ? <Save size={18} /> : <Edit2 size={18} />}
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <div className="relative group">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-primary rounded-full flex items-center justify-center text-white text-3xl md:text-4xl font-bold">
              {profileData.name.charAt(0)}
            </div>
            {isEditing && (
              <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50">
                <Camera size={16} />
              </button>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  />
                ) : (
                  <p className="font-semibold">{profileData.name}</p>
                )}
              </div>

              <div>
                <label className="text-xs text-gray-500">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  />
                ) : (
                  <p className="flex items-center gap-2">
                    {profileData.email}
                    <CheckCircle size={14} className="text-green-500" />
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs text-gray-500">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  />
                ) : (
                  <p>{profileData.phone}</p>
                )}
              </div>

              <div>
                <label className="text-xs text-gray-500">Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  />
                ) : (
                  <p>{profileData.location}</p>
                )}
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-500">Bio</label>
              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  rows={3}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                />
              ) : (
                <p className="text-gray-600">{profileData.bio}</p>
              )}
            </div>

            <div className="text-xs text-gray-400 flex items-center gap-1">
              <Calendar size={12} />
              Member since {profileData.memberSince}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;