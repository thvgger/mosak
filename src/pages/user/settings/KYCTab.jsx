import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  UserCheck,
  Zap,
  Shield,
  Lock,
  ArrowLeft,
  CheckCircle,
  Upload,
  ChevronDown
} from 'lucide-react';

const KYCTab = () => {
  const [view, setView] = useState('overview'); // overview, levels, level1_step1, level1_step2, submitted, level2_step1, level2_step2
  const [kycLevel, setKycLevel] = useState(0); // 0: Unverified, 1: Level 1, 2: Level 2

  const benefits = [
    "Access to premium sellers",
    "Higher transaction limits",
    "Priority customer support",
    "Lower escrow fees",
    "Enhanced buyer protection",
    "Faster dispute resolution"
  ];

  const renderOverview = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Temporary Test Switcher */}
      <div className="flex justify-end">
        <div className="bg-gray-100 p-1 rounded-lg flex gap-1">
          <button 
            onClick={() => setKycLevel(0)}
            className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${kycLevel === 0 ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
          >
            TEST: UNVERIFIED
          </button>
          <button 
            onClick={() => setKycLevel(1)}
            className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${kycLevel === 1 ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
          >
            TEST: LEVEL 1
          </button>
          <button 
            onClick={() => setKycLevel(2)}
            className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${kycLevel === 2 ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
          >
            TEST: LEVEL 2
          </button>
        </div>
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-gray-900">KYC Verification</h2>
            <div className="flex gap-2">
              <span className="px-2 py-0.5 bg-red-50 text-red-600 text-[10px] font-bold rounded-full border border-red-100 uppercase tracking-tight">Mandatory</span>
              <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-bold rounded-full border border-green-100 uppercase tracking-tight">Free</span>
              <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full border border-blue-100 uppercase tracking-tight">Required for platform access</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Level */}
        <div className={`p-6 rounded-2xl border transition-all ${kycLevel >= 1 ? 'bg-blue-50 border-blue-100 shadow-sm' : 'bg-white border-gray-100 shadow-sm'} flex items-center justify-between`}>
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl ${kycLevel >= 1 ? 'text-blue-600' : 'bg-blue-50 text-blue-600'}`}>
              {kycLevel === 2 ? 'L2' : kycLevel === 1 ? 'L1' : <TrendingUp size={24} />}
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Current KYC Level</p>
              <p className="text-sm font-bold text-gray-900 uppercase">
                {kycLevel === 2 ? 'Standard Verification' : kycLevel === 1 ? 'Basic Verification' : 'Level 1'}
              </p>
            </div>
          </div>
          {kycLevel >= 1 && (
            <div className="bg-blue-600 text-white p-1 rounded-full">
              <CheckCircle2 size={14} />
            </div>
          )}
        </div>

        {/* Card 2: Limit */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${kycLevel >= 1 ? 'text-gray-900 font-bold text-sm' : 'bg-green-50 text-green-600'}`}>
            {kycLevel === 2 ? '₦500,000' : kycLevel === 1 ? '₦100,000' : <Zap size={24} />}
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Transaction Limit</p>
            <p className="text-sm font-bold text-gray-900">
              {kycLevel >= 1 ? 'Per transaction maximum' : '$2,000 / Day'}
            </p>
          </div>
        </div>

        {/* Card 3: Status */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${kycLevel >= 1 ? '' : 'bg-orange-50 text-orange-600'}`}>
              {kycLevel >= 1 ? (
                 <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-full">Approved</span>
              ) : <UserCheck size={24} />}
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Verification Status</p>
              <p className="text-sm font-bold text-gray-900">
                {kycLevel >= 1 ? 'Upgrade available' : 'Unverified'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Warning Banner */}
      <div className={`${kycLevel >= 1 ? 'bg-orange-50 border-orange-100' : 'bg-red-50 border-red-100'} border rounded-2xl p-6 flex items-center gap-6`}>
        <div className={`w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0 ${kycLevel >= 1 ? 'text-orange-600' : 'text-red-600'}`}>
          <AlertTriangle size={24} />
        </div>
        <div className="flex-1 space-y-0.5">
          <h3 className="text-base font-bold text-gray-900">
            {kycLevel >= 1 ? 'Limited Access' : 'Account Restricted'}
          </h3>
          <p className="text-sm text-gray-600">
            {kycLevel === 2 
              ? 'Upgrade to Level 3 to increase your transaction limits'
              : kycLevel === 1
              ? 'Upgrade to Level 2 to increase your transaction limits' 
              : 'Your account is currently restricted to Level 1. Complete your KYC verification to unlock full account potential, higher limits, and all platform features.'
            }
          </p>
        </div>
      </div>

      <button 
        onClick={() => setView('levels')}
        className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all text-sm shadow-lg shadow-blue-600/20 whitespace-nowrap"
      >
        Complete KYC Verification
      </button>

      {/* Benefits List */}
      <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Verification Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="mt-1">
                <CheckCircle2 size={18} className="text-green-500" fill="currentColor" fillOpacity={0.2} />
              </div>
              <p className="text-sm font-medium text-gray-700">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLevels = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <button 
        onClick={() => setView('overview')}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 font-medium transition-colors mb-4"
      >
        <ArrowLeft size={18} />
        Back to Overview
      </button>

      {/* Blue Info Banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center gap-4">
        <div className="bg-white p-1 rounded-md text-blue-600 shadow-sm">
          <Shield size={20} />
        </div>
        <p className="text-sm font-medium text-blue-800">
          Complete all KYC levels to unlock maximum transaction limits and platform features. Each level is free and takes 2-5 minutes.
        </p>
      </div>

      {/* Levels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Level 1 Card */}
        <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm flex flex-col h-full">
          <div className="flex justify-between items-start mb-6">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${kycLevel >= 1 ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
              1
            </div>
            {kycLevel >= 1 && (
              <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-full uppercase tracking-wider">Completed</span>
            )}
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-1">Level 1 - Basic</h3>
            <p className="text-sm text-gray-500">Quick verification to get started</p>
          </div>
          
          <ul className="space-y-4 mb-8 flex-1">
            {[
              "NIN verification",
              "Phone number verification",
              "Email verification",
              "Date Of Birth"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <CheckCircle size={18} className="text-blue-600" fill="currentColor" fillOpacity={0.2} />
                <span className="text-sm font-medium text-gray-700">{item}</span>
              </li>
            ))}
          </ul>

          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Transaction Limit</p>
            <p className="text-lg font-bold text-gray-900">₦100,000</p>
          </div>

          {kycLevel >= 1 ? (
            <div className="w-full py-3.5 bg-green-50 text-green-600 font-bold rounded-xl text-sm flex items-center justify-center gap-2">
              Completed <CheckCircle size={16} />
            </div>
          ) : (
            <button 
              onClick={() => setView('level1_step1')}
              className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all text-sm shadow-lg shadow-blue-600/20"
            >
              Start Level 1
            </button>
          )}
        </div>

        {/* Level 2 Card */}
        <div className={`bg-white rounded-3xl border border-gray-200 p-8 shadow-sm flex flex-col h-full relative overflow-hidden ${kycLevel < 1 ? 'opacity-100' : ''}`}>
          <div className="flex justify-between items-start mb-6">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${kycLevel >= 1 ? 'bg-blue-50 text-blue-600 font-bold' : 'bg-gray-50 text-gray-400'}`}>
              {kycLevel >= 1 ? '2' : <Lock size={20} />}
            </div>
            {kycLevel < 1 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold rounded-full uppercase tracking-wider">Locked</span>
            )}
          </div>
          
          <div className={`mb-8 ${kycLevel < 1 ? 'opacity-60' : ''}`}>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Level 2 - Standard</h3>
            <p className="text-sm text-gray-500">Enhanced verification for higher limits</p>
          </div>
          
          <ul className={`space-y-4 mb-8 flex-1 ${kycLevel < 1 ? 'opacity-60' : ''}`}>
            {[
              "Valid ID upload",
              "Selfie",
              "Proof of Address"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                {kycLevel >= 1 ? (
                  <CheckCircle size={18} className="text-blue-600" fill="currentColor" fillOpacity={0.2} />
                ) : (
                  <div className="w-[18px] h-[18px] rounded-full border-2 border-gray-200" />
                )}
                <span className="text-sm font-medium text-gray-700">{item}</span>
              </li>
            ))}
          </ul>

          <div className={`bg-gray-50 rounded-2xl p-4 mb-6 ${kycLevel < 1 ? 'opacity-60' : ''}`}>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Transaction Limit</p>
            <p className="text-lg font-bold text-gray-900">₦500,000</p>
          </div>

          {kycLevel >= 1 ? (
            kycLevel >= 2 ? (
              <div className="w-full py-3.5 bg-green-50 text-green-600 font-bold rounded-xl text-sm flex items-center justify-center gap-2">
                Completed <CheckCircle size={16} />
              </div>
            ) : (
              <button 
                onClick={() => setView('level2_step1')}
                className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all text-sm shadow-lg shadow-blue-600/20"
              >
                Start Level 2
              </button>
            )
          ) : (
            <button disabled className="w-full py-3.5 bg-gray-100 text-gray-400 font-bold rounded-xl text-sm cursor-not-allowed">
              Complete Level 1 First
            </button>
          )}
        </div>

        {/* Level 3 Card */}
        <div className={`bg-white rounded-3xl border border-gray-200 p-8 shadow-sm flex flex-col h-full relative overflow-hidden ${kycLevel < 2 ? 'opacity-100' : ''}`}>
          <div className="flex justify-between items-start mb-6">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${kycLevel >= 2 ? 'bg-blue-50 text-blue-600 font-bold' : 'bg-gray-50 text-gray-400'}`}>
              {kycLevel >= 2 ? '3' : <Lock size={20} />}
            </div>
            {kycLevel < 2 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold rounded-full uppercase tracking-wider">Locked</span>
            )}
          </div>
          
          <div className={`mb-8 ${kycLevel < 2 ? 'opacity-60' : ''}`}>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Level 3 - Full</h3>
            <p className="text-sm text-gray-500">Complete verification with no limits</p>
          </div>
          
          <ul className={`space-y-4 mb-8 flex-1 ${kycLevel < 2 ? 'opacity-60' : ''}`}>
            {[
              "Address verification",
              "Selfie with ID",
              "CAC Verification"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                {kycLevel >= 2 ? (
                  <CheckCircle size={18} className="text-blue-600" fill="currentColor" fillOpacity={0.2} />
                ) : (
                  <div className="w-[18px] h-[18px] rounded-full border-2 border-gray-200" />
                )}
                <span className="text-sm font-medium text-gray-700">{item}</span>
              </li>
            ))}
          </ul>

          <div className={`bg-gray-50 rounded-2xl p-4 mb-6 ${kycLevel < 2 ? 'opacity-60' : ''}`}>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Transaction Limit</p>
            <p className="text-lg font-bold text-gray-900">Unlimited</p>
          </div>

          {kycLevel >= 2 ? (
            <button className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all text-sm shadow-lg shadow-blue-600/20">
              Start Level 3
            </button>
          ) : (
            <button disabled className="w-full py-3.5 bg-gray-100 text-gray-400 font-bold rounded-xl text-sm cursor-not-allowed">
              Complete Level 2 First
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const renderLevel1Step1 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Header with Step Indicator */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold">
            1
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">KYC Level 1 Verification</h2>
            <p className="text-xs text-gray-500">Basic verification</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium text-gray-500 mb-2">Step 1 of 2</p>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-6 bg-blue-600 rounded-full" />
            <div className="h-1.5 w-1.5 bg-gray-200 rounded-full" />
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8 md:p-12 shadow-sm max-w-3xl mx-auto space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">NIN Number</label>
            <input 
              type="text" 
              placeholder="Enter Nin number"
              className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
            <input 
              type="text" 
              placeholder="yyyy-mm.dd"
              className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
            <input 
              type="text" 
              placeholder="091234567"
              className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            <button className="text-[10px] font-bold text-blue-600 hover:text-blue-700 transition-colors mt-2 uppercase tracking-tight">
              Send Verification Code
            </button>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Verification Code</label>
            <input 
              type="text" 
              placeholder="Enter 6-digit code"
              className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 pt-4">
          <button 
            onClick={() => setView('levels')}
            className="flex-1 py-3.5 border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all text-sm uppercase tracking-wide"
          >
            Cancel
          </button>
          <button 
            onClick={() => setView('level1_step2')}
            className="flex-1 py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all text-sm uppercase tracking-wide shadow-lg shadow-blue-600/20"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );

  const renderLevel1Step2 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Header with Step Indicator */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold">
            1
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">KYC Level 1 Verification</h2>
            <p className="text-xs text-gray-500">Basic verification</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium text-gray-500 mb-2">Step 2 of 2</p>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 bg-gray-200 rounded-full" />
            <div className="h-1.5 w-6 bg-blue-600 rounded-full" />
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8 md:p-12 shadow-sm max-w-3xl mx-auto space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input 
              type="email" 
              defaultValue="deee@gmail.com"
              className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            <button className="text-[10px] font-bold text-blue-600 hover:text-blue-700 transition-colors mt-2 uppercase tracking-tight">
              Send Verification Link
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 pt-4">
          <button 
            onClick={() => setView('level1_step1')}
            className="flex-1 py-3.5 border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all text-sm uppercase tracking-wide"
          >
            Back
          </button>
          <button 
            onClick={() => setView('submitted')}
            className="flex-1 py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all text-sm uppercase tracking-wide shadow-lg shadow-blue-600/20"
          >
            Submit Level 1 Verification
          </button>
        </div>
      </div>
    </div>
  );

  const renderSubmitted = () => (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center animate-in fade-in zoom-in-95 duration-500">
      <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white mb-8 shadow-xl shadow-blue-600/20">
        <CheckCircle size={40} strokeWidth={2.5} />
      </div>
      
      <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">Verification Submitted !</h2>
      <p className="text-sm md:text-base text-gray-500 max-w-md mb-10 leading-relaxed">
        Your documents are being reviewed. You'll be notified within 24-48 hours.
      </p>

      <div className="bg-yellow-50 border border-yellow-100 rounded-full px-6 py-2.5 flex items-center gap-2">
        <span role="img" aria-label="hourglass" className="text-sm">⌛</span>
        <span className="text-sm font-bold text-yellow-800 tracking-tight">Pending Review</span>
      </div>

      <button 
        onClick={() => setView('overview')}
        className="mt-12 text-blue-600 font-bold uppercase tracking-widest text-xs hover:underline"
      >
        Back to Overview
      </button>
    </div>
  );

  const renderLevel2Step1 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 pb-12">
      {/* Header with Step Indicator */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold">
            2
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">KYC Level 2 Verification</h2>
            <p className="text-xs text-gray-500">Standard verification</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium text-gray-500 mb-2">Step 1 of 2</p>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-6 bg-blue-600 rounded-full" />
            <div className="h-1.5 w-1.5 bg-gray-200 rounded-full" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Section 1: Government ID */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm space-y-6">
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700">Government ID Type</label>
            <div className="relative">
              <select className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-400">
                <option>Select ID type</option>
                <option>International Passport</option>
                <option>Driver's License</option>
                <option>National ID Card</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            </div>

            {/* Upload Zone */}
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center gap-3 bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-gray-400 shadow-sm group-hover:text-blue-600 transition-colors">
                <Upload size={24} />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-gray-700">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Proof of Address */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm space-y-6">
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700">Proof of Address</label>
            <div className="relative">
              <select className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-400">
                <option>Select ID type</option>
                <option>Utility Bill</option>
                <option>Bank Statement</option>
                <option>Rent Receipt</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            </div>

            {/* Upload Zone */}
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center gap-3 bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-gray-400 shadow-sm group-hover:text-blue-600 transition-colors">
                <Upload size={24} />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-gray-700">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 pt-2">
            <button 
              onClick={() => setView('levels')}
              className="flex-1 py-3.5 border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all text-sm uppercase tracking-wide"
            >
              Cancel
            </button>
            <button 
              onClick={() => setView('level2_step2')}
              className="flex-1 py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all text-sm uppercase tracking-wide shadow-lg shadow-blue-600/20"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLevel2Step2 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Header with Step Indicator */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold">
            2
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">KYC Level 2 Verification</h2>
            <p className="text-xs text-gray-500">Standard verification</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium text-gray-500 mb-2">Step 2 of 2</p>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 bg-gray-200 rounded-full" />
            <div className="h-1.5 w-6 bg-blue-600 rounded-full" />
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8 md:p-12 shadow-sm max-w-3xl mx-auto space-y-12">
        <div className="space-y-6">
          <label className="block text-sm font-semibold text-gray-700">Selfie</label>
          
          {/* Selfie Circle Zone */}
          <div className="flex justify-center py-4">
            <div className="w-56 h-56 border-2 border-dashed border-gray-200 rounded-full flex flex-col items-center justify-center gap-4 bg-gray-50/30 hover:bg-gray-50 transition-colors cursor-pointer group">
              <div className="text-gray-400 group-hover:text-blue-600 transition-colors">
                <UserCheck size={64} strokeWidth={1.5} />
              </div>
              <p className="text-sm font-bold text-gray-500 group-hover:text-gray-700">Click to take a selfie</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <button 
            onClick={() => setView('level2_step1')}
            className="flex-1 py-3.5 border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all text-sm uppercase tracking-wide"
          >
            Cancel
          </button>
          <button 
            onClick={() => setView('submitted')}
            className="flex-1 py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all text-sm uppercase tracking-wide shadow-lg shadow-blue-600/20"
          >
            Submit Level 2 Verification
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (view) {
      case 'overview': return renderOverview();
      case 'levels': return renderLevels();
      case 'level1_step1': return renderLevel1Step1();
      case 'level1_step2': return renderLevel1Step2();
      case 'level2_step1': return renderLevel2Step1();
      case 'level2_step2': return renderLevel2Step2();
      case 'submitted': return renderSubmitted();
      default: return renderOverview();
    }
  };

  return renderContent();
};

export default KYCTab;
