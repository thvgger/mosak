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
