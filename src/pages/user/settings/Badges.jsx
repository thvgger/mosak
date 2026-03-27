// import React from 'react';
// import { Award, Star, Shield, TrendingUp, CheckCircle, Clock } from 'lucide-react';

// const Badges = () => {
//   const badges = [
//     {
//       name: 'Verified Buyer',
//       icon: CheckCircle,
//       color: 'text-blue-600',
//       bg: 'bg-blue-100',
//       description: 'Completed 10+ purchases',
//       earned: true,
//       date: 'Jan 2026'
//     },
//     {
//       name: 'Trusted Seller',
//       icon: Shield,
//       color: 'text-green-600',
//       bg: 'bg-green-100',
//       description: '50+ positive reviews',
//       earned: true,
//       date: 'Feb 2026'
//     },
//     {
//       name: 'Gold Member',
//       icon: Award,
//       color: 'text-yellow-600',
//       bg: 'bg-yellow-100',
//       description: 'Active member for 1+ year',
//       earned: true,
//       date: 'Mar 2026'
//     },
//     {
//       name: 'Top Contributor',
//       icon: Star,
//       color: 'text-purple-600',
//       bg: 'bg-purple-100',
//       description: 'Helped 100+ community members',
//       earned: false,
//       progress: 75
//     },
//     {
//       name: 'Rising Star',
//       icon: TrendingUp,
//       color: 'text-orange-600',
//       bg: 'bg-orange-100',
//       description: 'Complete 20 orders in 30 days',
//       earned: false,
//       progress: 60
//     },
//     {
//       name: 'Early Adopter',
//       icon: Clock,
//       color: 'text-indigo-600',
//       bg: 'bg-indigo-100',
//       description: 'Joined in the first year',
//       earned: false,
//       progress: 0
//     }
//   ];

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-800">Your Badges</h1>
//         <p className='text-sm text-gray-600'>
//           Unlock badges by completing more orders, inviting active users  and engaging with the community
//         </p>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         <div className="bg-white p-6 rounded-xl border border-gray-200">
//           <p className="text-sm text-gray-500">Earned Badges</p>
//           <p className="text-2xl font-bold text-green-600">3</p>
//         </div>
//         <div className="bg-white p-6 rounded-xl border border-gray-200">
//           <p className="text-sm text-gray-500">In Progress</p>
//           <p className="text-2xl font-bold text-orange-600">2</p>
//         </div>
//         <div className="bg-white p-6 rounded-xl border border-gray-200">
//           <p className="text-sm text-gray-500">Total Available</p>
//           <p className="text-2xl font-bold text-blue-600">6</p>
//         </div>
//       </div>

//       {/* Badges Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {badges.map((badge, index) => {
//           const Icon = badge.icon;
//           return (
//             <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
//               <div className="flex items-start justify-between mb-4">
//                 <div className={`p-3 ${badge.bg} rounded-lg`}>
//                   <Icon size={24} className={badge.color} />
//                 </div>
//                 {badge.earned ? (
//                   <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-medium rounded-full">
//                     Earned
//                   </span>
//                 ) : badge.progress > 0 ? (
//                   <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs font-medium rounded-full">
//                     {badge.progress}%
//                   </span>
//                 ) : (
//                   <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
//                     Locked
//                   </span>
//                 )}
//               </div>
//               <h3 className="font-semibold mb-1">{badge.name}</h3>
//               <p className="text-sm text-gray-500 mb-3">{badge.description}</p>
//               {badge.earned && (
//                 <p className="text-xs text-gray-400">Earned on {badge.date}</p>
//               )}
//               {!badge.earned && badge.progress > 0 && (
//                 <div className="mt-2">
//                   <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
//                     <div 
//                       className="h-full bg-primary rounded-full" 
//                       style={{ width: `${badge.progress}%` }}
//                     ></div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Badges;





import React from 'react';
import { Award, Medal, Trophy, Gem, Star, TrendingUp } from 'lucide-react';
import Bronze from "../../../assets/badges/bronze.png";
import Silver from "../../../assets/badges/silver.png";
import Gold from "../../../assets/badges/gold.png";
import Platinum from "../../../assets/badges/platinum.png";
// import Diamond from "../../../assets/badges/diamond.png";

const Badges = () => {
  const badges = [
    {
      name: 'Bronze Badge',
      requirement: '10 orders',
      description: 'Complete 10 orders',
      icon: Bronze,
      color: 'text-amber-600',
      bg: 'bg-amber-100',
      earned: true,
      progress: 100,
    },
    {
      name: 'Silver Badge',
      requirement: '30 orders',
      description: 'Complete 30 orders',
      icon: Silver,
      color: 'text-gray-500',
      bg: 'bg-gray-100',
      earned: true,
      progress: 100,
    },
    {
      name: 'Gold Badge',
      requirement: '50 orders',
      description: 'Complete 50 orders',
      icon: Gold,
      color: 'text-yellow-600',
      bg: 'bg-yellow-100',
      earned: false,
      progress: 53,
    },
    {
      name: 'Platinum Badge',
      requirement: '70 orders',
      description: 'Complete 70 orders',
      icon: Platinum,
      color: 'text-indigo-500',
      bg: 'bg-indigo-100',
      earned: false,
      progress: 16,
    },
    {
      name: 'Diamond Badge',
      requirement: '200 orders',
      description: 'Complete 200 orders',
      icon: Platinum,
      color: 'text-cyan-600',
      bg: 'bg-cyan-100',
      earned: false,
      progress: 8,
    },
  ];

  const earnedCount = badges.filter(b => b.earned).length;
  const inProgressCount = badges.filter(b => !b.earned && b.progress > 0 && b.progress < 100).length;
  const totalAvailable = badges.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Your Badges</h1>
        <p className="text-sm text-gray-600">
          Unlock badges by completing more orders, inviting active users and engaging with the community
        </p>
      </div>

      {/* Stats */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-500">Earned Badges</p>
          <p className="text-2xl font-bold text-green-600">3</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-500">In Progress</p>
          <p className="text-2xl font-bold text-orange-600">2</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-500">Total Available</p>
          <p className="text-2xl font-bold text-blue-600">6</p>
        </div>
      </div> */}

      {/* Badges Grid */}
      <div className="grid grid-cols-1 gap-4">
        {badges.map((badge, index) => {
          const Icon = badge.icon;
          return (
            <div
              key={`${badge.name}-${badge.requirement}-${index}`}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between mb-4">
                <div className='flex items-center gap-4'>
                  <span className={`p-1 ${badge.bg} rounded-lg`}>
                    {/* <Icon size={24} className={badge.color} /> */}
                    <img src={badge.icon} alt='' className='w-8 h-8' />
                  </span>
                  <h3 className="font-semibold mb-1">{badge.name}</h3>
                </div>
                {badge.earned ? (
                  <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-medium rounded-full">
                    Unlocked
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                    Locked
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 mb-3">{badge.description}</p>
              
              <p className={`text-xs flex items-center justify-between ${badge.earned ? "text-dark" : "text-gray-500"}`}> 
                <span> Progess </span>

                <span>
                  {badge.progress}%
                </span>
              </p>

              {badge.progress > 0 && (
                <div className="mt-2">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${!badge.earned ? "bg-gray-500" : "bg-green-600 "}`}
                      style={{ width: `${badge.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              {/* {badge.earned && (
                <p className="text-xs text-gray-400 mt-2">✓ Earned</p>
              )} */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Badges;