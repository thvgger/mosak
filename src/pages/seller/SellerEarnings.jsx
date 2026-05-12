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
  Download,
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
    { id: 1, title: 'Completed Orders', points: '2,450 M-pts', cash: '₦2,450', icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 2, title: 'Referrals', points: '1,200 pts', cash: '₦1,200', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
    { id: 3, title: 'Reviews & Ratings', points: '800 pts', cash: '₦800', icon: Star, color: 'text-amber-600', bg: 'bg-amber-50' },
    { id: 4, title: 'Bonuses', points: '400 pts', cash: '₦400', icon: Gift, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  const earnMethods = [
    { action: 'Successful Transaction', points: '+15-200' },
    { action: 'Community Activity', points: '+1 CE' },
    { action: 'List new product', points: '+5' },
    { action: 'No-Dispute Sale', points: '+2' },
  ];

  const historyData = [
    { id: 1, date: 'Dec 24, 2024', activity: 'Order Completed', source: 'Order #2891', points: '+250', status: 'Confirmed', ref: 'ORD-2891' },
    { id: 2, date: 'Dec 24, 2024', activity: 'Referral Bonus', source: 'New user join', points: '+500', status: 'Confirmed', ref: 'REF-1234' },
    { id: 3, date: 'Dec 24, 2024', activity: 'Review Posted', source: 'Review #8821', points: '+50', status: 'Confirmed', ref: 'REV-8821' },
    { id: 4, date: 'Dec 24, 2024', activity: 'Order Completed', source: 'Order #2890', points: '+180', status: 'Pending', ref: 'ORD-2890' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full pb-12 text-gray-900">
      {/* Header & Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Rewards & Earnings</h1>
          <p className="text-sm text-gray-500 font-medium">Track your performance points and bonuses</p>
        </div>
        
        <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200 w-fit">
          <button 
            className={`px-6 py-2 text-xs font-bold rounded-lg uppercase tracking-wider transition-all ${activeTab === 'm-wallet' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => {
              setActiveTab('m-wallet');
              navigate('/seller/m-wallet');
            }}
          >
            Wallet
          </button>
          <button 
            className={`px-6 py-2 text-xs font-bold rounded-lg uppercase tracking-wider transition-all ${activeTab === 'earnings' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('earnings')}
          >
            Earnings
          </button>
        </div>
      </div>

      {/* High-Impact Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Points Balance */}
        <div className="bg-primary rounded-[32px] p-6 text-white relative overflow-hidden shadow-xl shadow-blue-600/10 group col-span-2 md:col-span-1">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <Star size={80} fill="currentColor" />
          </div>
          <div className="relative z-10 space-y-4">
            <div className="flex justify-between items-start">
              <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Points Balance</p>
              <button onClick={() => setShowBalance(!showBalance)} className="p-1.5 bg-white/10 rounded-full">
                {showBalance ? <EyeIcon size={14} /> : <EyeOffIcon size={14} />}
              </button>
            </div>
            <h2 className="text-3xl font-bold">{showBalance ? "4,850" : "****"}</h2>
            <div className="pt-2 border-t border-white/10">
              <p className="text-[10px] font-medium text-white/70">≈ ₦4,850 Estimated</p>
            </div>
          </div>
        </div>

        {/* Other stats cards */}
        {[
          { label: 'This Month', value: '1,200', icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Lifetime', value: '12,340', icon: Gift, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Growth', value: '+24%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' }
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-sm group">
            <div className="flex flex-col h-full justify-between gap-4">
              <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <stat.icon size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{showBalance ? stat.value : "****"}</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Card */}
      <div className="bg-gray-900 rounded-[32px] p-8 text-white relative overflow-hidden group shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform">
          <TrendingUp size={120} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2 text-left">
            <h3 className="text-xl font-bold">Convert Points to Cash</h3>
            <p className="text-sm text-gray-400 max-w-md leading-relaxed">
              Instantly transfer your accumulated performance points into your main wallet balance.
            </p>
          </div>
          <button 
            onClick={() => setIsTransferModalOpen(true)}
            className="px-8 py-3.5 bg-primary text-white font-bold rounded-2xl text-xs uppercase tracking-[0.2em] shadow-lg shadow-blue-600/40 hover:bg-primary-hover transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            Redeem Points <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Breakdown Card */}
        <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm lg:col-span-2 text-left">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-gray-900">Revenue Stream</h3>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Points breakdown</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {breakdownData.map((item) => (
              <div key={item.id} className="p-4 bg-gray-50/50 border border-gray-100 rounded-2xl flex items-center justify-between group hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${item.bg} ${item.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">{item.title}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">{item.points}</p>
                  </div>
                </div>
                <div className="text-sm font-bold text-gray-900">{item.cash}</div>
              </div>
            ))}
          </div>
        </div>

        {/* How to earn */}
        <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm text-left">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-gray-900">Fast Lane</h3>
            <ArrowRight size={18} className="text-primary" />
          </div>
          <div className="space-y-4">
            {earnMethods.map((method, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-tight">{method.action}</span>
                <span className="text-xs font-bold text-primary">{method.points}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="bg-white border border-gray-100 rounded-[32px] shadow-sm overflow-hidden text-left">
        <div className="p-6 md:p-8 flex items-center justify-between border-b border-gray-50">
          <h3 className="text-lg font-bold text-gray-900">Activity History</h3>
          <button className="p-2.5 bg-primary/5 text-primary rounded-xl hover:bg-primary/10 transition-all border border-primary/10">
            <Download size={20} />
          </button>
        </div>
        
        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50/50 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
              <tr>
                <th className="px-8 py-4">Event Date</th>
                <th className="px-8 py-4">Description</th>
                <th className="px-8 py-4">Impact</th>
                <th className="px-8 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {historyData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-8 py-5 text-gray-500 font-medium">{row.date}</td>
                  <td className="px-8 py-5">
                    <div className="space-y-0.5">
                      <p className="text-sm font-bold text-gray-900">{row.activity}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{row.source}</p>
                    </div>
                  </td>
                  <td className="px-8 py-5 font-bold text-green-600">{row.points} pts</td>
                  <td className="px-8 py-5 text-right">
                    <span className={`inline-block px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tight ${
                      row.status === 'Confirmed' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden divide-y divide-gray-50">
          {historyData.map((row) => (
            <div key={row.id} className="p-5 active:bg-gray-50 transition-colors space-y-3">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-sm font-bold text-gray-900">{row.activity}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">{row.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-green-600">{row.points} pts</p>
                  <span className={`inline-block mt-1 px-2 py-0.5 text-[9px] font-bold rounded-md uppercase tracking-tight ${
                    row.status === 'Confirmed' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {row.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
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