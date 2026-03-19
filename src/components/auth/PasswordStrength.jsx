// components/auth/PasswordStrength.jsx
import React from 'react';
import { Check, X } from 'lucide-react';

const PasswordStrength = ({ password }) => {
  const validations = {
    minLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const getStrengthScore = () => {
    return Object.values(validations).filter(Boolean).length;
  };

  const getStrengthText = () => {
    const score = getStrengthScore();
    if (score === 0) return 'Very Weak';
    if (score <= 2) return 'Weak';
    if (score <= 4) return 'Medium';
    return 'Strong';
  };

  const getStrengthColor = () => {
    const score = getStrengthScore();
    if (score <= 2) return 'bg-red-500';
    if (score <= 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="mt-2 space-y-2">
      {/* Strength Meter */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${getStrengthColor()} transition-all duration-300`}
            style={{ width: `${(getStrengthScore() / 5) * 100}%` }}
          />
        </div>
        <span className="text-xs font-medium">{getStrengthText()}</span>
      </div>

      {/* Validation List */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <ValidationItem isValid={validations.minLength} text="8+ characters" />
        <ValidationItem isValid={validations.hasUpperCase} text="Uppercase" />
        <ValidationItem isValid={validations.hasLowerCase} text="Lowercase" />
        <ValidationItem isValid={validations.hasNumber} text="Number" />
        <ValidationItem isValid={validations.hasSpecialChar} text="Special char" />
      </div>
    </div>
  );
};

const ValidationItem = ({ isValid, text }) => (
  <div className="flex items-center gap-1">
    {isValid ? (
      <Check size={12} className="text-green-500" />
    ) : (
      <X size={12} className="text-red-500" />
    )}
    <span className={isValid ? 'text-green-700' : 'text-gray-500'}>{text}</span>
  </div>
);

export default PasswordStrength;