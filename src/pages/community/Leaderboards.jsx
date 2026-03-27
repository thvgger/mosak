// import React from 'react';
// import { PanelRightOpen, PanelLeftOpen, Star, Zap, Shield, Edit, MessageSquareDot, MessageSquare } from 'lucide-react';
// import { useOutletContext } from 'react-router-dom';

// const Leaderboards = () => {
//   const { setIsSidebarOpen, isSidebarOpen } = useOutletContext();

//   const rankings = [
//     { id: 1,userName: "@john_doe", fullName: "John Doe", rank: "Gold", points: "4,500" },
//     { id: 2,userName: "@lady_j", fullName: "Jane Smith", rank: "Silver", points: "3,200" },
//     { id: 3,userName: "@bobby", fullName: "Bob Johnson", rank: "Bronze", points: "2,000" },
//     { id: 4,userName: "@alice_will2", fullName: "Alice Williams", rank: "Gold", points: "1,900" },
//     { id: 5,userName: "@michaelzy", fullName: "Michael Brown", rank: "Silver", points: "1,800" },
//     { id: 6,userName: "@emil_d", fullName: "Emily Davis", rank: "Bronze", points: "1,500" },
//     { id: 7,userName: "@dav_w", fullName: "David Wilson", rank: "Gold", points: "1,400" },
//     { id: 8,userName: "@sarahh", fullName: "Sarah Miller", rank: "Silver", points: "1,200" },
//     { id: 9,userName: "@kris", fullName: "Chris Anderson", rank: "Bronze", points: "1,000" },
//     { id: 10,userName: "@jessy", fullName: "Jessica Taylor", rank: "Gold", points: "900" },
//   ];


//   const topRankings = rankings.slice(0,3);

//   const otherRankings = rankings.slice(3,10);

//   return (
//     <section className='h-full flex-1 flex flex-col min-w-0'>
//       {/* Header */}
//       <div className="min-h-14 border-b border-gray-200 flex items-center justify-between gap-3 px-4 bg-white">
//         <div className="flex items-center">
//           {!isSidebarOpen ? (
//             <button
//               onClick={() => setIsSidebarOpen(prev => !prev)}
//               className="rounded hover:bg-gray-50"
//             >
//               <PanelLeftOpen size={20} className='text-gray-400' />
//             </button>
//           ) : (
//             <button
//               onClick={() => setIsSidebarOpen(prev => !prev)}
//               className="rounded hover:bg-gray-50"
//             >
//               <PanelRightOpen size={20} className='text-gray-400' />
//             </button>
//           )}
//         </div>

//         <div className="w-full flex items-center justify-between flex-wrap gap-1.5">
//           <h2 className="font-semibold text-base"> Community Rankings </h2>
//           <p className="text-xs md:text-sm text-gray-600"> Current top ranked users </p>
//         </div>
//       </div>


//       {/* Leaderboard Rankings */}
//       <div className='w-full p-4 py-8 overflow-y-auto'>
//         <div className='flex flex-col gap-4 items-center justify-center text-center'>
//           <h2 className='font-semibold text-2xl md:text-4xl text-center'> 
//             Mosakhub <span className='text-primary'>Leaderboard</span> 
//           </h2>

//           <p> See the 10 most active members in the Mosakhub community. </p>

//           <small className='max-w-md mx-auto'> The leaderboard highlights users who contribute the most through trades, posts, deals, and community engagement. </small>
//         </div>



//         {/* TOP 3 */}
//         <div className='mt-16'>
//           <div className='flex items-center gap-4'>
//             <span className='w-fit flex text-nowrap'> 🏆 Top 3 Spotlight </span>
//             <hr className='h-px border-none bg-dark/20 w-full' />
//           </div>
//           <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4'>
//             {topRankings.map((user) => (
//               <div key={user.id} className='flex flex-col items-center justify-between space-y-4 p-4 bg-white border-y border-primary/80 rounded-lg shadow-lg'>
//                 <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${user.rank === 'Gold' ? 'bg-yellow-400' : user.rank === 'Silver' ? 'bg-gray-400' : 'bg-orange-400'}`}>
//                     {user.fullName.charAt(0)}
//                 </div>
//                 <div className='flex flex-col items-center justify-center'>
//                   <span>Rank #{user.id}</span>
//                   <span className='font-semibold'>{user.userName}</span>
//                 </div>
//                 <span className='flex flex-col items-center text-center text-primary'>
//                   {user.points}
//                   <small className='text-xs!'> Activity Score </small>
//                 </span>
//                 <div className='flex items-center justify-center gap-2'>
//                   <span className='px-2 py-0.5 rounded-full bg-gray-300 text-xs'> 52 deals </span>
//                   <span className='px-2 py-0.5 rounded-full bg-gray-300 text-xs'> 38 posts </span>
//                 </div>
//                 <span className='border border-gray-500 rounded-full px-2 py-0.5 text-sm flex items-center gap-0.5'>
//                   <Star size={16} strokeWidth={1.5} className='' />
//                   Top Contributor
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>



//         {/* OTHER Rankings */}
//         <div className='mt-20'>
//           <div className='flex items-center gap-4'>
//             <span className='w-fit flex text-nowrap'> 📋 Ranks #4 – #10 </span>
//             <hr className='h-px border-none bg-dark/20 w-full' />
//           </div>
//           <div className="w-full mt-4">
//             <div className="bg-white p-3 rounded-lg grid grid-cols-5 font-semibold text-sm text-gray-700 px-2 mb-2">
//               <span className='sm:text-center'> # </span>
//               <span> User </span>
//               <span> Score </span>
//               <span> Deals </span>
//               <span> Posts </span>
//             </div>

//             <div className="flex flex-col gap-0.5">
//               {otherRankings.map((user) => (
//                 <div
//                   key={user.id}
//                   className="bg-white flex justify-between sm:grid sm:grid-cols-5 items-center rounded-lg p-3"
//                 >
//                   {/* Rank */}
//                   <div className="flex items-center justify-center gap-0 text-sm">
//                     #{user.id}
//                   </div>

//                   {/* User */}
//                   <div className="flex items-center gap-2">
//                     <div
//                       className={`w-8 h-8 rounded-full hidden sm:flex items-center justify-center text-white font-bold ${
//                         user.rank === "Gold"
//                           ? "bg-yellow-400"
//                           : user.rank === "Silver"
//                           ? "bg-gray-400"
//                           : "bg-orange-400"
//                       }`}
//                     >
//                       {user.fullName[0]}
//                     </div>
//                     <p className="font-semibold text-sm">{user.userName}</p>
//                   </div>

//                   {/* Score */}
//                   <p className="font-bold text-primary text-sm">
//                     {user.points}
//                     {/* <span className="text-xs font-medium"> </span> */}
//                   </p>

//                   {/* Deals */}
//                   <p className='text-sm'> 58 deals </p>

//                   {/* Posts */}
//                   <p className='text-sm'> 40 posts </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>



//         {/* Progress */}
//         <div className='mt-20'>
//           <div className='flex items-center gap-4'>
//             <span className='w-fit flex text-nowrap'> 📈 Your Progress </span>
//             <hr className='h-px border-none bg-dark/20 w-full' />
//           </div>
//           <div className='w-full bg-white rounded-xl p-4 mt-4'>
//             <div className='w-full flex items-center justify-between'>
//               <p className='text-sm'> Your <span className='text-primary'>Leaderboard Progress</span></p>

//               <span className='border border-primary text-primary text-sm p-2 rounded-lg flex items-center gap-2'>
//                 <Zap size={16} strokeWidth={1.5} className='text-primary' />
//                 Active this month
//               </span>
//             </div>

//             <div className='w-full grid grid-cols-4 text-xs text-center text-gray-600 mt-2'>
//               <div className='flex flex-col gap-1.5 text-left'> 
//                 Your Rank 
//                 <span className='font-bold'> #27 </span>
//               </div>
//               <div className='flex flex-col gap-1.5 '> 
//                 Activity Score 
//                 <span className='font-bold'> 420 </span>
//               </div>
//               <div className='flex flex-col gap-1.5 '> 
//                 Deals Completed 
//                 <span className='font-bold'> 8 </span>
//               </div>
//               <div className='flex flex-col gap-1.5 text-right'> 
//                 Posts Created
//                 <span> 5 </span>
//               </div>
//             </div>


//             <div>
//               <span className='bg-primary/20 rounded-full w-full h-2 flex my-4 relative'>
//               <span className='bg-primary rounded-full w-[60%] h-2 flex absolute'></span>
//               </span>
              
//               <div className='w-full flex items-center justify-between gap-4 text-xs text-gray-500'>
//                 <span> Progress to Top 10 </span>
//                 <span> 78% there — keep going! </span>
//               </div>
//             </div>

//           </div>
//         </div>


//         {/* Tips */}
//         <div className='mt-20'>
//           <div className='flex items-center gap-4'>
//             <span className='w-fit flex text-nowrap'> 💡 Tips & Suggestions </span>
//             <hr className='h-px border-none bg-dark/20 w-full' />
//           </div>
//           <div className='w-full bg-white border border-gray-300 rounded-xl p-4 mt-4'>
//             <p className='text-sm font-bold'> How to reach the Top 10 </p>

//             <div className='grid md:grid-cols-2 grid-cols-1 gap-4 mt-4'>
//               <div className='w-full border border-gray-300 rounded-xl p-4 flex items-center gap-3'>
//                 <span className='bg-gray-100 p-2 rounded'>
//                   <Shield size={26} strokeWidth={1.5} />
//                 </span>
//                 <div className='flex flex-col gap-1'>
//                   <p> Complete Secure Deals </p>
//                   <small> Finalize more transactions through the platform to boost your deal score significantly.</small>
//                 </div>
//               </div>
              
//               <div className='w-full border border-gray-300 rounded-xl p-4 flex items-center gap-3'>
//                 <span className='bg-gray-100 p-2 rounded'>
//                   <Edit size={26} strokeWidth={1.5} />
//                 </span>
//                 <div className='flex flex-col gap-1'>
//                   <p> Post Regularly </p>
//                   <small> List services or products consistently. Daily activity earns ongoing engagement points.</small>
//                 </div>
//               </div>
              
//               <div className='w-full border border-gray-300 rounded-xl p-4 flex items-center gap-3'>
//                 <span className='bg-gray-100 p-2 rounded'>
//                   <MessageSquare size={26} strokeWidth={1.5} />
//                 </span>
//                 <div className='flex flex-col gap-1'>
//                   <p> Join Community Discussions </p>
//                   <small> Participate in threads, reply to posts, and share your expertise in the community hub. </small>
//                 </div>
//               </div>
              
//               <div className='w-full border border-gray-300 rounded-xl p-4 flex items-center gap-3'>
//                 <span className='bg-gray-100 p-2 rounded'>
//                   <Star size={26} strokeWidth={1.5} />
//                 </span>
//                 <div className='flex flex-col gap-1'>
//                   <p> Maintain High Ratings </p>
//                   <small> Successful transactions with 5-star reviews multiply your activity score bonus. </small>
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>


//       </div>
//     </section>
//   )
// };


// export default Leaderboards;






// pages/community/Leaderboards.jsx (updated with real user data)
import React, { useState, useEffect } from 'react';
import { PanelRightOpen, PanelLeftOpen, Star, Zap, Shield, Edit, MessageSquare, Trophy, Medal, Award } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Leaderboards = () => {
  const { setIsSidebarOpen, isSidebarOpen } = useOutletContext();
  const { user } = useAuth();
  
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserRank, setCurrentUserRank] = useState(null);

  // Fetch real rankings from API
  useEffect(() => {
    const fetchRankings = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/community/leaderboards`, {
          credentials: 'include'
        });
        const data = await response.json();
        
        if (data.success) {
          setRankings(data.rankings);
          if (user && data.currentUserRank) {
            setCurrentUserRank(data.currentUserRank);
          }
        }
      } catch (error) {
        console.error('Failed to fetch leaderboards:', error);
        // Fallback to dummy data
        setRankings(generateDummyRankings());
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, [user]);

  const generateDummyRankings = () => {
    return [
      { id: 1, user: { name: 'John Doe', username: '@john_doe', avatar: 'J' }, rank: 'Gold', score: 4500, deals: 52, posts: 38 },
      { id: 2, user: { name: 'Jane Smith', username: '@lady_j', avatar: 'J' }, rank: 'Silver', score: 3200, deals: 41, posts: 29 },
      { id: 3, user: { name: 'Bob Johnson', username: '@bobby', avatar: 'B' }, rank: 'Bronze', score: 2000, deals: 28, posts: 22 },
      { id: 4, user: { name: "Alice Williams", username: "@alice_will2", avatar: "A"}, rank: "Gold", score: 1900, deals: 42, posts: 32 },
      { id: 5, user: {name: "Michael Brown", userName: "@michaelzy", avatar: "M"}, rank: "Silver", score: 1800, deals: 32, posts: 42 },
      // { id: 6,userName: "@emil_d", fullName: "Emily Davis", rank: "Bronze", points: "1,500" },
      // { id: 7,userName: "@dav_w", fullName: "David Wilson", rank: "Gold", points: "1,400" },
      // { id: 8,userName: "@sarahh", fullName: "Sarah Miller", rank: "Silver", points: "1,200" },
      // { id: 9,userName: "@kris", fullName: "Chris Anderson", rank: "Bronze", points: "1,000" },
      // { id: 10,userName: "@jessy", fullName: "Jessica Taylor", rank: "Gold", points: "900" },
      // ... more users
    ];
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 'Gold': return <Trophy size={20} className="text-yellow-500" />;
      case 'Silver': return <Medal size={20} className="text-gray-400" />;
      case 'Bronze': return <Award size={20} className="text-orange-400" />;
      default: return <Star size={20} className="text-gray-400" />;
    }
  };

  const topRankings = rankings.slice(0, 3);
  const otherRankings = rankings.slice(3, 10);

  if (loading) {
    return (
      <section className='h-full flex-1 flex flex-col min-w-0'>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </section>
    );
  }

  return (
    <section className='h-full flex-1 flex flex-col min-w-0 overflow-y-auto'>
      {/* Header */}
      <div className="min-h-14 border-b border-gray-200 flex items-center justify-between gap-3 px-4 bg-white sticky top-0 z-10">
        <div className="flex items-center">
          <button
            onClick={() => setIsSidebarOpen(prev => !prev)}
            className="rounded hover:bg-gray-50 p-1"
          >
            {!isSidebarOpen ? (
              <PanelLeftOpen size={20} className='text-gray-400' />
            ) : (
              <PanelRightOpen size={20} className='text-gray-400' />
            )}
          </button>
        </div>

        <div className="w-full flex items-center justify-between flex-wrap gap-1.5">
          <h2 className="font-semibold text-base"> Community Rankings </h2>
          <p className="text-xs md:text-sm text-gray-600"> Top ranked users this month </p>
        </div>
      </div>

      {/* Leaderboard Content */}
      <div className='w-full p-4 py-8'>
        <div className='flex flex-col gap-4 items-center justify-center text-center'>
          <h2 className='font-semibold text-2xl md:text-4xl text-center'> 
            Mosakhub <span className='text-primary'>Leaderboard</span> 
          </h2>
          <p> See the most active members in the Mosakhub community. </p>
          <small className='max-w-md mx-auto'> 
            The leaderboard highlights users who contribute the most through trades, posts, deals, and community engagement. 
          </small>
        </div>

        {/* TOP 3 */}
        <div className='mt-16'>
          <div className='flex items-center gap-4'>
            <span className='w-fit flex text-nowrap'> 🏆 Top 3 Spotlight </span>
            <hr className='h-px border-none bg-gray-300 w-full' />
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4'>
            {topRankings.map((user, index) => (
              <div key={user.id} className='flex flex-col items-center justify-between space-y-4 p-6 bg-white border-y border-primary/30 rounded-xl shadow-md hover:shadow-xl transition-shadow'>
                <div className="relative">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg ${
                    user.rank === 'Gold' ? 'bg-linear-to-r from-yellow-400 to-yellow-500' : 
                    user.rank === 'Silver' ? 'bg-linear-to-r from-gray-400 to-gray-500' : 
                    'bg-linear-to-r from-orange-400 to-orange-500'
                  }`}>
                    {user.user?.avatar || user.user?.name?.charAt(0) || 'U'}
                  </div>
                  <div className="absolute -top-2 -right-2">
                    {getRankIcon(user.rank)}
                  </div>
                </div>
                
                <div className='flex flex-col items-center justify-center text-center'>
                  <span className="text-xs text-gray-400">Rank #{user.id}</span>
                  <span className='font-semibold text-lg'>{user.user?.name}</span>
                  <span className='text-xs text-gray-500'>{user.user?.username}</span>
                </div>
                
                <div className='flex flex-col items-center text-center'>
                  <span className='text-2xl font-bold text-primary'>{user.score.toLocaleString()}</span>
                  <small className='text-xs text-gray-500'> Activity Score </small>
                </div>
                
                <div className='flex items-center justify-center gap-2'>
                  <span className='px-2 py-0.5 rounded-full bg-gray-100 text-xs'> {user.deals} deals </span>
                  <span className='px-2 py-0.5 rounded-full bg-gray-100 text-xs'> {user.posts} posts </span>
                </div>
                
                <span className='border border-primary/30 rounded-full px-3 py-1 text-sm flex items-center gap-1 bg-primary/5'>
                  <Star size={14} className='text-yellow-400' />
                  Top Contributor
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* OTHER Rankings */}
        <div className='mt-16'>
          <div className='flex items-center gap-4'>
            <span className='w-fit flex text-nowrap'> 📋 Ranks #4 – #10 </span>
            <hr className='h-px border-none bg-gray-300 w-full' />
          </div>
          
          <div className="w-full mt-4">
            <div className="bg-gray-50 p-3 rounded-lg grid grid-cols-5 font-semibold text-sm text-gray-700 px-2 mb-2">
              <span>#</span>
              <span>User</span>
              <span>Score</span>
              <span>Deals</span>
              <span>Posts</span>
            </div>

            <div className="flex flex-col gap-2">
              {otherRankings.map((user) => (
                <div key={user.id} className="bg-white flex justify-between sm:grid sm:grid-cols-5 items-center rounded-lg p-3 hover:bg-gray-50 transition">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">#{user.id}</span>
                    {getRankIcon(user.rank)}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                      user.rank === 'Gold' ? 'bg-yellow-400' : 
                      user.rank === 'Silver' ? 'bg-gray-400' : 'bg-orange-400'
                    }`}>
                      {user.user?.avatar || user.user?.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{user.user?.name}</p>
                      <p className="text-xs text-gray-400">{user.user?.username}</p>
                    </div>
                  </div>

                  <p className="font-bold text-primary text-sm">{user.score.toLocaleString()}</p>
                  <p className='text-sm'>{user.deals} deals</p>
                  <p className='text-sm'>{user.posts} posts</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Your Progress Section */}
        {currentUserRank && (
          <div className='mt-16'>
            <div className='flex items-center gap-4'>
              <span className='w-fit flex text-nowrap'> 📈 Your Progress </span>
              <hr className='h-px border-none bg-dark/20 w-full' />
            </div>
            
            <div className='w-full bg-white rounded-xl p-6 mt-4 border border-gray-200'>
              <div className='flex flex-wrap items-center justify-between gap-4'>
                <div className='flex items-center gap-3'>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-blue-600 text-white flex items-center justify-center font-bold text-lg">
                    {user?.full_name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <p className='font-semibold'>{user?.full_name}</p>
                    <p className='text-xs text-gray-500'>@{user?.username}</p>
                  </div>
                </div>
                
                <span className='border border-primary text-primary text-sm p-2 rounded-lg flex items-center gap-2 bg-primary/5'>
                  <Zap size={16} className='text-primary' />
                  {currentUserRank.isActive ? 'Active this month' : 'Inactive this month'}
                </span>
              </div>

              <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-6'>
                <div className='text-center p-3 bg-gray-50 rounded-lg'>
                  <div className='text-2xl font-bold text-primary'>#{currentUserRank.rank}</div>
                  <div className='text-xs text-gray-500'>Your Rank</div>
                </div>
                <div className='text-center p-3 bg-gray-50 rounded-lg'>
                  <div className='text-2xl font-bold text-primary'>{currentUserRank.score}</div>
                  <div className='text-xs text-gray-500'>Activity Score</div>
                </div>
                <div className='text-center p-3 bg-gray-50 rounded-lg'>
                  <div className='text-2xl font-bold text-primary'>{currentUserRank.deals}</div>
                  <div className='text-xs text-gray-500'>Deals Completed</div>
                </div>
                <div className='text-center p-3 bg-gray-50 rounded-lg'>
                  <div className='text-2xl font-bold text-primary'>{currentUserRank.posts}</div>
                  <div className='text-xs text-gray-500'>Posts Created</div>
                </div>
              </div>

              <div className='mt-6'>
                <div className='bg-gray-100 rounded-full h-2 overflow-hidden'>
                  <div 
                    className='bg-primary h-full rounded-full transition-all duration-500'
                    style={{ width: `${currentUserRank.progress}%` }}
                  />
                </div>
                <div className='flex justify-between mt-2 text-xs text-gray-500'>
                  <span>Progress to Top 10</span>
                  <span>{currentUserRank.progress}% — Keep going!</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Leaderboards;