import React from 'react';
import { PanelRightOpen, PanelLeftOpen } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

const Leaderboards = () => {
  const { setIsSidebarOpen, isSidebarOpen } = useOutletContext();

  const rankings = [
    { id: 1, userName: "John Doe", rank: "Gold", points: 1500 },
    { id: 2, userName: "Jane Smith", rank: "Silver", points: 1200 },
    { id: 3, userName: "Bob Johnson", rank: "Bronze", points: 900 },
    { id: 4, userName: "Alice Williams", rank: "Gold", points: 1400 },
    { id: 5, userName: "Michael Brown", rank: "Silver", points: 1100 },
    { id: 6, userName: "Emily Davis", rank: "Bronze", points: 800 },
    { id: 7, userName: "David Wilson", rank: "Gold", points: 1300 },
    { id: 8, userName: "Sarah Miller", rank: "Silver", points: 1000 },
    { id: 9, userName: "Chris Anderson", rank: "Bronze", points: 700 },
    { id: 10, userName: "Jessica Taylor", rank: "Gold", points: 1600 },
  ];


  return (
    <section className='h-full flex-1 flex flex-col min-w-0'>
      {/* Header */}
      <div className="min-h-14 border-b border-gray-200 flex items-center justify-between gap-3 px-4 bg-white">
        <div className="flex items-center">
          {!isSidebarOpen ? (
            <button
              onClick={() => setIsSidebarOpen(prev => !prev)}
              className="rounded hover:bg-gray-50"
            >
              <PanelLeftOpen size={20} className='text-gray-400' />
            </button>
          ) : (
            <button
              onClick={() => setIsSidebarOpen(prev => !prev)}
              className="rounded hover:bg-gray-50"
            >
              <PanelRightOpen size={20} className='text-gray-400' />
            </button>
          )}
        </div>

        <div className="w-full flex items-center justify-between flex-wrap gap-1.5">
          <h2 className="font-semibold text-base"> Leaderboards </h2>
          <p className="text-xs md:text-sm text-gray-600"> Current top ranked users </p>
        </div>
      </div>


      {/* Leaderboard Rankings */}
      <div className='flex flex-col gap-4 w-full p-4 overflow-y-auto'>
        {rankings.map((user) => (
          <div key={user.id} className='flex items-center justify-between p-4 bg-primary/10 border border-primary/80 rounded-lg'>
            <div className='flex items-center gap-3'>
              <div className='bg-primary text-white rounded-full flex items-center justify-center w-10 h-10'>{user.id}</div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${user.rank === 'Gold' ? 'bg-yellow-400' : user.rank === 'Silver' ? 'bg-gray-400' : 'bg-orange-400'}`}>
                {user.userName[0]}
              </div>
              <div>
                <p className='font-semibold'>{user.userName}</p>
                <p className='text-xs text-gray-600'>{user.rank}</p>
              </div>
            </div>
            <p className='font-bold text-primary'>{user.points} 
              <span className='text-xs font-medium'> Points </span>
            </p>
          </div>
        ))}
      </div>
    </section>
  )
};


export default Leaderboards;