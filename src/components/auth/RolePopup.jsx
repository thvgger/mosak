import { useState } from "react";
import { Handbag, Store, ShieldUser, BriefcaseBusiness } from 'lucide-react';

const RolePopup = ({ onContinue, onSignInClick }) => {
  const [selectedRole, setSelectedRole] = useState(null);

  const roles = [
    {
      id: "buyer",
      title: "BUYER",
      description: "Browse and purchase products",
      image: <Handbag />
    },
    {
      id: "seller",
      title: "SELLER",
      description: "List and sell your products",
      image: <Store />
    },
    {
      id: "freelancer",
      title: "FREELANCER",
      description: "Offer your services",
      image: <ShieldUser />
    },
    {
      id: "employer",
      title: "EMPLOYER",
      description: "Find, hire, and work with trusted talent",
      image: <BriefcaseBusiness />
    }
  ];

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
  };

  const handleContinue = () => {
    if (selectedRole) {
      onContinue(selectedRole);
    } else {
      alert("Please select a role to continue");
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 md:p-8 max-h-[90vh] max-w-md w-full shadow-xl overflow-y-auto scrollbar-hide">
      <h2 className="text-xl font-semibold text-center mb-0.5">Create Your Account</h2>
      <p className="text-gray-600 text-xs text-center mb-4">Choose your role and get started</p>
      
      <p className="text-sm mb-2">I want to join as:</p>
      
      <div className="gap-4 mb-4 grid grid-cols-2">
        {roles.map((role) => (
          <button
            key={role.id}
            className={`w-full border-2 rounded-xl p-4 space-y-1 text-center transition-all cursor-pointer ${
              selectedRole === role.id
                ? "border-primary bg-primary/10"
                : "border-gray-300 hover:border-primary/60 hover:bg-blue-50"
            }`}
            onClick={() => handleRoleSelect(role.id)}
          >
            <div className={`w-fit mx-auto ${selectedRole === role.id ? "text-primary/80" : "text-gray-600"} `}>
              {role.image}
            </div>
            <div className={`text-xs font-semibold ${
              selectedRole === role.id ? "text-primary" : ""
            }`}>
              {role.title}
            </div>
            <div className={`text-xs ${
              selectedRole === role.id ? "text-primary/80" : "text-gray-600"
            }`}>
              {role.description}
            </div>
          </button>
        ))}
      </div>
      
      <button 
        className={`btn w-full ${
          selectedRole
            ? "bg-primary text-white hover:bg-blue-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        onClick={handleContinue}
        disabled={!selectedRole}
      >
        CONTINUE
      </button>
      
      <div className="text-center mt-4">
        <span className="text-gray-600">Already have an account? </span>
        <button 
          className="text-primary font-semibold hover:underline"
          onClick={onSignInClick}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default RolePopup;