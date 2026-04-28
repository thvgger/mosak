import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  Wallet, 
  TrendingUp, 
  Calendar, 
  Gift, 
  ArrowRight,
  ShoppingBag,
  Users,
  Star,
  ChevronDown,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon
} from 'lucide-react';
import TransferPointsModal from '../../components/seller/TransferPointsModal';

const SellerEarnings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('earnings');
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [showBalance, setShowBalance] = useState(() => {
    const saved = localStorage.getItem('mosak_show_balance');
    return saved !== null ? JSON.parse(saved) : true;
  });

  React.useEffect(() => {
    localStorage.setItem('mosak_show_balance', JSON.stringify(showBalance));
  }, [showBalance]);

  const breakdownData = [
    { id: 1, title: 'Completed Orders', points: '2,450 M-pts', cash: '₦2,450', icon: ShoppingBag, colorClass: 'bg-blue-50 text-blue-600' },
    { id: 2, title: 'Referrals', points: '1,200 pts', cash: '₦1,200', icon: Users, colorClass: 'bg-purple-50 text-purple-600' },
    { id: 3, title: 'Reviews & Ratings', points: '800 pts', cash: '₦800', icon: Star, colorClass: 'bg-yellow-50 text-yellow-600' },
    { id: 4, title: 'Discounts & Bonuses', points: '400 pts', cash: '₦400', icon: Gift, colorClass: 'bg-green-50 text-green-600' },
  ];

  const earnMethods = [
    { action: 'Successful Transaction', points: '+15-200' },
    { action: 'Community Activity', points: '+1 CE per message' },
    { action: 'List new product', points: '+5' },
    { action: 'Dispute-Free Transaction', points: '+2' },
    { action: 'Referral Transaction Bonus', points: '+30% of referral\'s reward (for 6 months)' },
    { action: 'Receive 5 star review', points: '+5' },
  ];

  const historyData = [
    { id: 1, date: 'Dec 24, 2024', activity: 'Order Completed', source: 'Order #2891', points: '+250', status: 'Confirmed', ref: 'ORD-2891' },
    { id: 2, date: 'Dec 24, 2024', activity: 'Referral Bonus', source: 'User joined via your link', points: '+500', status: 'Confirmed', ref: 'REF-1234' },
    { id: 3, date: 'Dec 24, 2024', activity: 'Review Posted', source: 'Product review #8821', points: '+50', status: 'Confirmed', ref: 'REV-8821' },
    { id: 4, date: 'Dec 24, 2024', activity: 'Order Completed', source: 'Order #2890', points: '+180', status: 'Pending', ref: 'ORD-2890' },
    { id: 5, date: 'Dec 24, 2024', activity: 'New Year Bonus', source: 'Monthly discount', points: '+250', status: 'Confirmed', ref: 'DISCOUNT-JAN' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center text-sm text-gray-500">
          <span className="hover:text-primary cursor-pointer" onClick={() => navigate('/seller')}>Dashboard</span>
          <ChevronRight size={16} className="mx-1" />
          <span className="text-gray-900 font-medium">Wallet & Earnings</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
            <span className="text-sm font-medium text-gray-700 px-3">Switch:</span>
            <button 
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'm-wallet' ? 'bg-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => {
                setActiveTab('m-wallet');
                navigate('/seller/m-wallet');
              }}
            >
              Wallet
            </button>
            <button 
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'earnings' ? 'bg-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setActiveTab('earnings')}
            >
              Earnings
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-primary rounded-xl p-6 text-white shadow-sm flex flex-col justify-between h-full min-h-[160px]">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-white text-primary p-2 rounded-lg">
               <Wallet size={24} />
            </div>
            <button 
              onClick={() => setShowBalance(!showBalance)}
              className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
            >
              {showBalance ? (
                <EyeIcon size={16} className='text-black' />
              ) : (
                <EyeOffIcon size={16} className='text-black' />
              )}
            </button>
          </div>
          <div className="mt-auto pt-4">
            <h2 className="text-2xl font-bold mb-1">
              {showBalance ? "4,850" : "****"}
            </h2>
            <p className="text-white/80 text-sm font-medium">Total Points Balance</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col justify-between h-full min-h-[160px]">
           <div className="mb-4">
             <div className="bg-green-50 text-green-600 p-2.5 rounded-lg w-fit">
               <TrendingUp size={24} />
             </div>
           </div>
           <div className="mt-auto pt-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {showBalance ? "₦4,850" : "₦****"}
              </h2>
             <p className="text-gray-500 text-sm font-medium">Estimated Wallet Value</p>
           </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col justify-between h-full min-h-[160px]">
           <div className="mb-4">
             <div className="bg-purple-50 text-purple-600 p-2.5 rounded-lg w-fit">
               <Calendar size={24} />
             </div>
           </div>
           <div className="mt-auto pt-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-1 break-words">
                {showBalance ? "C.E: 1,200" : "C.E: ****"}
              </h2>
             <p className="text-gray-500 text-sm font-medium">Earned This Month</p>
           </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col justify-between h-full min-h-[160px]">
           <div className="mb-4">
             <div className="bg-orange-50 text-orange-600 p-2.5 rounded-lg w-fit">
               <Gift size={24} />
             </div>
           </div>
           <div className="mt-auto pt-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {showBalance ? "12,340" : "****"}
              </h2>
             <p className="text-gray-500 text-sm font-medium">Lifetime Earnings</p>
           </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1.5">Convert Points to Cash</h3>
          <p className="text-sm text-gray-500 font-medium">Transfer your earned points to your wallet balance instantly</p>
        </div>
        <button 
          onClick={() => setIsTransferModalOpen(true)}
          className="bg-primary text-white px-6 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 whitespace-nowrap hover:bg-primary/90 transition-colors"
        >
          Transfer Points to Wallet <ArrowRight size={16} />
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <h3 className="font-bold text-gray-900 mb-6 text-lg">Earnings Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {breakdownData.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg flex items-center justify-center ${item.colorClass}`}>
                  <item.icon size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-1">{item.title}</p>
                  <p className="text-base font-bold text-gray-900">{item.points}</p>
                </div>
              </div>
              <div className="font-bold text-gray-900">{item.cash}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h3 className="font-bold text-gray-900 text-lg">How to Earn Points</h3>
          <a href="#" className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
            Learn More <ArrowRight size={14} />
          </a>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {earnMethods.map((method, idx) => (
            <div key={idx} className="flex justify-between items-center p-4 bg-gray-50/70 rounded-lg">
              <span className="text-sm font-medium text-gray-700">{method.action}</span>
              <span className="text-sm font-medium text-primary">{method.points}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-lg">Earnings History</h3>
          <div className="flex gap-3">
             <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm flex items-center justify-between gap-2 text-gray-600 font-medium bg-white hover:bg-gray-50">
                All Time <ChevronDown size={16} />
             </button>
             <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm flex items-center justify-between gap-2 text-gray-600 font-medium bg-white hover:bg-gray-50">
                All Sources <ChevronDown size={16} />
             </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Activity</th>
                <th className="px-6 py-4 font-medium">Source</th>
                <th className="px-6 py-4 font-medium">Points</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {historyData.map((row) => (
                <tr key={row.id}>
                  <td className="px-6 py-4 text-gray-600 font-medium">{row.date}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{row.activity}</td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{row.source}</td>
                  <td className="px-6 py-4 text-green-600 font-medium">{row.points}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      row.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{row.ref}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <TransferPointsModal 
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        pointsBalance={4850}
        walletBalance={1245000}
      />
    </div>
  );
};

export default SellerEarnings;