import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { TrendingUp, ChevronRight, Shield, Star, Award, Handbag, Wallet, ShieldCheck, BadgeCheck, CircleCheckBig } from 'lucide-react';
import silver from "../../assets/badges/silver.png";
import { useAuth } from '../../contexts/AuthContext';

const DashboardPage = () => {
  const { user, loading, isAuthenticated } = useAuth();


  const statusIcon = {
    VERIFIED: <BadgeCheck size={16} className="text-primary" />,
    UNVERIFIED: <Shield size={16} className="text-gray-500" />,
  };

  //  const { user } = useOutletContext();


  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-primary rounded-lg p-6 flex flex-col items-start flex-wrap justify-between">
        <h1 className="text-xl font-semibold text-white">Welcome back, <span className=""> {user.full_name} </span></h1>
        <div className="flex items-center space-x-2 mt-4">
          <span className="px-3 py-1.5 bg-gray-200 text-xs text-gray-500 font-medium rounded-md flex items-center gap-1">
            <img src={silver} alt='' className='object-cover w-5 mx-auto h-fit' />
            SILVER
          </span>
          {/* <span className={`px-3 py-2 bg-gray-100  text-xs font-medium rounded-md flex items-center gap-1 ${user.kyc_status === "UNVERIFIED" ? "text-gray-500" : "text-primary"}`}>
            {user.kyc_status === "VERIFIED" ? (
              <BadgeCheck size={16} className="text-primary" />
            ) : user.kyc_status === "UNVERIFIED" ? (
              <Shield size={16} className="text-gray-500" />
            ) : null}
            {user.kyc_status}
          </span> */}
          <span className="px-3 py-2 bg-gray-100 text-gray-500 text-xs font-medium rounded-md flex items-center gap-1">
            {statusIcon[user.kyc_status]}
            {user.kyc_status}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Orders */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex flex-col items-start gap-1">
          <span className='bg-primary/10 p-3 rounded-md text-primary mb-2'> 
            <Handbag size={18} strokeWidth={2} />
          </span>
          <h3 className="text-2xl font-bold">2</h3>
          <p className="text-sm text-gray-500">Active Orders</p>
          <div className="px-1.5 py-1 pr-2 bg-primary/10 text-primary rounded-full flex items-center text-xs">
            <TrendingUp size={16} className="mr-1" />
            +3 this week
          </div>
        </div>

        {/* Wallet Balance */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex flex-col items-start gap-1">
          <span className='bg-green-500/20 p-3 rounded-md text-green-500 mb-2'>
            <Wallet size={18} strokeWidth={2} />
          </span>
          <h3 className="text-2xl font-bold">₦450,000</h3>
          <p className="text-sm text-gray-500">Wallet Balance</p>
        </div>

        {/* Funds in Escrow */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex flex-col items-start gap-1">
          <span className='bg-yellow-100 p-3 rounded-md text-yellow-500 mb-2'>
            <Shield size={18} strokeWidth={2} />
          </span>
          <h3 className="text-2xl font-bold">₦125,000</h3>
          <p className="text-sm text-gray-500">Funds in Escrow</p>
          <div className="px-1.5 py-1 pr-2 bg-yellow-100 text-yellow-800 rounded-full flex items-center text-xs">+3 orders</div>
        </div>

        {/* Available Points */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex flex-col items-start gap-1">
          <span className='bg-red-100 p-3 rounded-md text-red-500 mb-2'>
            <Star size={18} strokeWidth={2}/>
          </span>
          <h3 className="text-2xl font-bold">3,450</h3>
          <p className="text-sm text-gray-500">Available Points</p>
          <a href="#" className="text-blue-600 text-xs flex items-center mt-2 hover:underline">
            Learn how to earn points <ChevronRight size={16} />
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* KYC Verification */}
        <div className="col-span-2 bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-gray-800">KYC Verification Status</h3>
            <span className='bg-green-100/80 px-2 py-1 rounded-full text-xs text-green-600 flex items-center gap-1'>
              <Shield className="" size={14} />
              Level 2
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-6">Your account verification level</p>
          
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-6">
                <span className="font-semibold flex items-center gap-1">
                  <CircleCheckBig size={20} className='text-green-600' />
                  Level 2 Standard
                </span>
                <span className="text-sm text-green-600">✓ Verified</span>
              </div>

              <div className='flex items-start gap-6'>
                <div className='bg-primary/10 rounded-lg p-3 space-y-2 w-[50%]'>
                  <p className="text-xs text-gray-500">Current Transaction Limit</p>
                  <p className="text-xl font-bold flex flex-col gap-1 items-start">
                    <span> ₦500,000 </span>
                    <span className="text-sm font-normal text-gray-500">per transaction</span></p>
                </div>
                
                <div className='w-[50%] space-y-4'>
                  <div className='flex items-center justify-between'>
                    <span className='text-xs'>
                      Verification Progresss
                    </span>
                    <span className='text-xs font-bold'>
                      2 of 3 Levels
                    </span>
                  </div>

                  <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
                    <div className="h-full bg-linear-to-r from-green-700 to-green-500 rounded-full" style={{ width: '60%' }}></div>
                  </div>

                  <button className='btn bg-green-700 w-full'>
                    Upgrade to Level 3
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Member Status */}
        <div className="col-span-1 bg-linear-to-r from-amber-300 to-yellow-500 rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Award className="text-white" size={28} />
              <div>
                <h3 className="font-semibold text-gray-800">Gold Member</h3>
                <p className="text-sm text-gray-500">Member since Jan 2026</p>
              </div>
            </div>
            <ChevronRight className="text-white" size={24} />
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Current Points</p>
              <p className="text-xl font-bold">3,450</p>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Progress to platinum</span>
                <span className="font-semibold">60%</span>
              </div>
              <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
                <div className="h-full bg-linear-to-r from-white to-gray-100 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">1,550 points to next level</p>
            </div>

            <button className="w-full py-3 bg-white border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
              View Badge Details
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className='flex items-center gap-3 mb-4'>
          <span className='bg-yellow-100 p-3 rounded-full'>
            <Star size={20} strokeWidth={2} className='text-yellow-500' />
          </span>
          <h3 className="text-xs font-normal text-gray-500"> 
            Available Points 
            <span className='text-xl text-dark font-bold flex'> 3,450 </span>
          </h3>
        </div>
        
        <div className='flex items-center justify-between gap-4 text-sm text-gray-500'>
          <span> 
            Ways to earn points
          </span>


          <span className='flex items-center gap-2 hover:underline cursor-pointer'>
            View Activities
            <ChevronRight size={16} />
          </span>

        </div>
      </div>
    </div>
  );
};

export default DashboardPage;