import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { 
  ShieldCheck, 
  Camera, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase,
  User,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import bronzeBadge from '../../../assets/badges/bronze.png';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  // Hardcoded for mockup fidelity
  const [profileData, setProfileData] = useState({
    businessName: user?.business_profile?.business_name || "Sarah's Craft Store",
    fullName: user?.full_name || "Sarah Samuel",
    email: user?.email || "sarah.samuel@gmail.com",
    phone: user?.phone_number || "+234 812 345 6789",
    location: "123 Victoria Island, Lagos",
    description: "Handcrafted products made with love and attention to detail. Specializing in sustainable, eco-friendly items for your home and lifestyle.",
    memberSince: "Jan 2024",
    level: "Bronze"
  });

  const handleChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Seller Profile</h1>
          <p className="text-sm text-gray-500 font-medium">Manage your personal and business details</p>
        </div>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all text-sm shadow-lg shadow-blue-600/20"
        >
          {isEditing ? 'Save Profile' : 'Edit Profile'}
        </button>
      </div>

      {/* TOP CARD: IDENTITY */}
      <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform">
          <User size={120} />
        </div>
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
          {/* Avatar with Upload */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-3xl border-4 border-white shadow-md overflow-hidden">
              {profileData.fullName.charAt(0)}
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-white border border-gray-100 rounded-full shadow-lg text-blue-600 hover:scale-110 transition-transform">
              <Camera size={14} />
            </button>
          </div>

          {/* Core Info */}
          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="flex flex-col md:flex-row items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900">{profileData.businessName}</h2>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full border border-blue-100 uppercase tracking-tight">
                  <ShieldCheck size={12} fill="currentColor" className="text-white" />
                  Verified
                </span>
                <span className="flex items-center gap-1 px-3 py-1 bg-orange-50 text-orange-600 text-[10px] font-bold rounded-full border border-orange-100 uppercase tracking-tight">
                  <img src={bronzeBadge} alt="" className="w-3 h-3" />
                  {profileData.level}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-500 font-medium">
              <div className="flex items-center gap-1.5">
                <Calendar size={16} className="text-blue-600" />
                Member since {profileData.memberSince}
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={16} className="text-blue-600" />
                {profileData.location}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* INFORMATION GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PERSONAL DETAILS */}
        <div className="bg-white rounded-[24px] border border-gray-100 p-6 space-y-6 shadow-sm">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-50">
            <User size={18} className="text-blue-600" />
            <h3 className="font-bold text-gray-900">Personal Details</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Full Name</label>
              <input 
                type="text" 
                value={profileData.fullName}
                disabled={!isEditing}
                onChange={(e) => handleChange('fullName', e.target.value)}
                className="w-full bg-[#F8F9FB] border-none rounded-xl px-4 py-3 text-sm font-bold text-gray-800 disabled:opacity-80"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={profileData.email}
                  disabled={!isEditing}
                  className="w-full bg-[#F8F9FB] border-none rounded-xl px-4 py-3 text-sm font-bold text-gray-800 disabled:opacity-80"
                />
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Phone Number</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={profileData.phone}
                  disabled={!isEditing}
                  className="w-full bg-[#F8F9FB] border-none rounded-xl px-4 py-3 text-sm font-bold text-gray-800 disabled:opacity-80"
                />
                <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
              </div>
            </div>
          </div>
        </div>

        {/* BUSINESS DETAILS */}
        <div className="bg-white rounded-[24px] border border-gray-100 p-6 space-y-6 shadow-sm">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-50">
            <Briefcase size={18} className="text-blue-600" />
            <h3 className="font-bold text-gray-900">Business Details</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Business Name</label>
              <input 
                type="text" 
                value={profileData.businessName}
                disabled={!isEditing}
                onChange={(e) => handleChange('businessName', e.target.value)}
                className="w-full bg-[#F8F9FB] border-none rounded-xl px-4 py-3 text-sm font-bold text-gray-800 disabled:opacity-80"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Location / Store Address</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={profileData.location}
                  disabled={!isEditing}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="w-full bg-[#F8F9FB] border-none rounded-xl px-4 py-3 text-sm font-bold text-gray-800 disabled:opacity-80"
                />
                <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Business Description</label>
              <textarea 
                rows="3"
                value={profileData.description}
                disabled={!isEditing}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full bg-[#F8F9FB] border-none rounded-xl px-4 py-3 text-sm font-medium text-gray-600 resize-none disabled:opacity-80"
              />
            </div>
          </div>
        </div>
      </div>

      {/* QUICK LINKS / SECURITY */}
      <div className="bg-blue-600 rounded-[24px] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-600/20">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-lg font-bold">Public Store Visibility</h3>
          <p className="text-blue-100 text-sm font-medium">Control how your store is seen by thousands of buyers.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-white text-blue-600 font-bold rounded-xl text-sm hover:bg-blue-50 transition-all flex items-center gap-2">
            View Public Page <ExternalLink size={16} />
          </button>
        </div>
      </div>

      {/* KYC SHORTCUT */}
      <div className="bg-[#F8F9FB] border-2 border-dashed border-gray-200 rounded-[24px] p-8 flex flex-col items-center text-center space-y-4">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
          <ShieldCheck size={32} className="text-blue-600" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-gray-900">Verification Center</h3>
          <p className="text-gray-500 text-sm max-w-md">Complete your KYC verification to increase your withdrawal limits and get the verified seller badge.</p>
        </div>
        <button className="flex items-center gap-2 text-blue-600 font-bold uppercase tracking-widest text-xs hover:gap-3 transition-all">
          Go to KYC Verification <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default Profile;
