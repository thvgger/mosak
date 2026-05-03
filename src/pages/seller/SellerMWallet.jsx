import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  Wallet, 
  Clock, 
  CheckCircle2, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownRight, 
  ShieldCheck, 
  Download, 
  ChevronDown,
  Lock,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  CircleCheckBig
} from 'lucide-react';
import WithdrawalModal from '../../components/seller/WithdrawalModal';

const SellerMWallet = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('m-wallet');
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [showBalance, setShowBalance] = useState(() => {
    const saved = localStorage.getItem('mosak_show_balance');
    return saved !== null ? JSON.parse(saved) : true;
  });

  React.useEffect(() => {
    localStorage.setItem('mosak_show_balance', JSON.stringify(showBalance));
  }, [showBalance]);

  const recentWithdrawals = [
    { amount: '₦950,000', date: '2026-01-01', status: 'completed' },
    { amount: '₦950,000', date: '2026-01-01', status: 'completed' },
    { amount: '₦950,000', date: '2026-01-01', status: 'completed' }
  ];

  const transactions = [
    { id: 1, date: '2026-01-10', type: 'Sale', typeIcon: ArrowUpRight, ref: 'ORD-2024-1237', amount: '+₦450,000', amountClass: 'text-green-600', status: 'Completed', statusClass: 'bg-green-100 text-green-700' },
    { id: 2, date: '2026-01-10', type: 'Withdrawal', typeIcon: ArrowDownRight, ref: 'WTH-2024-0089', amount: '-₦300,000', amountClass: 'text-gray-900', status: 'Pending', statusClass: 'bg-orange-100 text-orange-700' },
    { id: 3, date: '2026-01-10', type: 'Escrow Release', typeIcon: ShieldCheck, ref: 'ORD-2024-1220', amount: '+₦750,000', amountClass: 'text-green-600', status: 'Completed', statusClass: 'bg-green-100 text-green-700' },
    { id: 4, date: '2026-01-10', type: 'Sale', typeIcon: ArrowUpRight, ref: 'ORD-2024-1215', amount: '+₦280,000', amountClass: 'text-green-600', status: 'Completed', statusClass: 'bg-green-100 text-green-700' },
    { id: 5, date: '2026-01-10', type: 'Withdrawal', typeIcon: ArrowDownRight, ref: 'WTH-2024-0088', amount: '-₦500,000', amountClass: 'text-gray-900', status: 'Completed', statusClass: 'bg-green-100 text-green-700' }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full pb-12">
      {/* Header & Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Wallet & Earnings</h1>
          <p className="text-sm text-gray-500">Manage your funds and track your revenue</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200">
            <button 
              className={`flex-1 sm:flex-none px-6 py-2 text-xs font-bold rounded-lg uppercase tracking-wider transition-all ${activeTab === 'm-wallet' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('m-wallet')}
            >
              M-Wallet
            </button>
            <button 
              className={`flex-1 sm:flex-none px-6 py-2 text-xs font-bold rounded-lg uppercase tracking-wider transition-all ${activeTab === 'earnings' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => {
                setActiveTab('earnings');
                navigate('/seller/earnings');
              }}
            >
              Earnings
            </button>
          </div>
          <button 
            onClick={() => setIsWithdrawModalOpen(true)}
            className="bg-primary hover:bg-primary-hover text-white px-8 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-600/20 transition-all active:scale-95"
          >
            Withdraw
          </button>
        </div>
      </div>

      {/* Balance Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Available Balance */}
        <div className="bg-primary rounded-[32px] p-8 text-white relative overflow-hidden shadow-xl shadow-blue-600/10 group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
            <Wallet size={120} />
          </div>
          
          <div className="relative z-10 h-full flex flex-col justify-between space-y-8">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em]">Available Balance</p>
                <div className="flex items-center gap-4">
                  <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
                    {showBalance ? "₦1,245,000" : "₦****"}
                  </h2>
                  <button 
                    onClick={() => setShowBalance(!showBalance)}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                  >
                    {showBalance ? <EyeIcon size={18} /> : <EyeOffIcon size={18} />}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-white/80">Withdraw anytime</span>
              <span className="bg-white/20 backdrop-blur-sm text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 border border-white/10">
                <ArrowUpRight size={12} /> +18.5%
              </span>
            </div>
          </div>
        </div>

        {/* Pending Balance */}
        <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm flex flex-col justify-between group">
          <div className="space-y-1 mb-6">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Pending Balance</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
              {showBalance ? "₦850,000" : "₦****"}
            </h2>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-orange-500 uppercase tracking-widest">
              <Clock size={16} />
              <span>In Escrow</span>
            </div>
            <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShieldCheck size={20} />
            </div>
          </div>
        </div>

        {/* Total Withdrawn */}
        <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm flex flex-col justify-between group">
          <div className="space-y-1 mb-6">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Total Withdrawn</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
              {showBalance ? "₦2,650,000" : "₦****"}
            </h2>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-green-500 uppercase tracking-widest">
              <CircleCheckBig size={16} />
              <span>Lifetime</span>
            </div>
            <div className="w-10 h-10 bg-green-50 text-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <ArrowUpRight size={20} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Linked Bank Card */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-[32px] p-6 md:p-8 flex flex-col shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <CreditCard className="text-primary" size={20} />
              <h3 className="text-lg font-bold text-gray-900">Settlement Account</h3>
            </div>
            <button className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">Update</button>
          </div>
          
          <div className="bg-gray-900 rounded-2xl p-8 text-white mb-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <CreditCard size={140} strokeWidth={1} className="transform rotate-12" />
            </div>
            
            <div className="relative z-10 space-y-10">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Bank Institution</p>
                  <p className="font-bold text-xl">Guaranty Trust Bank</p>
                </div>
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10">
                  <CreditCard size={24} />
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Account Identifier</p>
                  <p className="font-mono text-2xl font-bold tracking-[0.3em]">0123456789</p>
                </div>
                <div className="text-right">
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Account Holder</p>
                  <p className="font-bold text-lg uppercase">TechGadgets Store</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: 'This Month', value: '₦3.2M' },
              { label: 'Last 7 Days', value: '₦905K' },
              { label: 'Avg. Sale', value: '₦485K', hideOnMobile: true }
            ].map((stat, i) => (
              <div key={i} className={`bg-gray-50 rounded-2xl p-4 border border-gray-100 ${stat.hideOnMobile ? 'hidden md:block' : ''}`}>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-base md:text-xl font-bold text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity List */}
        <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm flex flex-col group">
          <div className="flex items-center gap-2 mb-8">
            <ArrowUpRight className="text-primary" size={20} />
            <h3 className="text-lg font-bold text-gray-900">Recent Cashouts</h3>
          </div>
          
          <div className="flex-1 space-y-4">
            {recentWithdrawals.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-gray-100/50 hover:bg-gray-50 transition-colors">
                <div>
                  <p className="text-sm font-bold text-gray-900">{item.amount}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase mt-0.5">{item.date}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-green-50 text-green-500 flex items-center justify-center">
                  <CircleCheckBig size={16} />
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-8 py-3.5 bg-gray-50 text-gray-700 text-[10px] font-bold rounded-2xl hover:bg-gray-100 transition-all uppercase tracking-[0.2em]">
            History Log
          </button>
        </div>
      </div>

      {/* Transactions Section */}
      <div className="bg-white border border-gray-100 rounded-[32px] shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-50">
          <h3 className="text-lg font-bold text-gray-900">Transaction History</h3>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-gray-50 text-gray-700 font-bold rounded-xl text-[10px] uppercase tracking-widest border border-gray-100 flex items-center gap-2">
                All Types <ChevronDown size={14} />
              </button>
              <button className="px-4 py-2 bg-gray-50 text-gray-700 font-bold rounded-xl text-[10px] uppercase tracking-widest border border-gray-100 flex items-center gap-2">
                This Year <ChevronDown size={14} />
              </button>
            </div>
            <button className="p-2 bg-primary/5 text-primary rounded-xl hover:bg-primary/10 transition-all border border-primary/10">
              <Download size={20} />
            </button>
          </div>
        </div>
        
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50/50 text-gray-400 font-bold text-[10px] uppercase tracking-widest">
              <tr>
                <th className="px-8 py-4 text-center">Date</th>
                <th className="px-8 py-4">Transaction Details</th>
                <th className="px-8 py-4">Reference ID</th>
                <th className="px-8 py-4">Value</th>
                <th className="px-8 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-gray-700">
              {transactions.map((tx) => {
                const Icon = tx.typeIcon;
                return (
                  <tr key={tx.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-8 py-5 text-center font-medium text-gray-500">{tx.date}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">
                          <Icon size={18} />
                        </div>
                        <span className="font-bold text-gray-900">{tx.type}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-gray-400 font-mono tracking-tighter">{tx.ref}</td>
                    <td className={`px-8 py-5 font-bold ${tx.amountClass}`}>{tx.amount}</td>
                    <td className="px-8 py-5 text-right">
                      <span className={`inline-block px-3 py-1 text-[10px] font-bold rounded-lg uppercase tracking-tight ${tx.statusClass}`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile View Card List */}
        <div className="md:hidden divide-y divide-gray-50">
          {transactions.map((tx) => (
            <div key={tx.id} className="p-5 active:bg-gray-50 transition-colors space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-500 border border-gray-100">
                    <tx.typeIcon size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{tx.type}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${tx.amountClass}`}>{tx.amount}</p>
                  <span className={`inline-block mt-1 px-2 py-0.5 text-[9px] font-bold rounded-md uppercase tracking-tight ${tx.statusClass}`}>
                    {tx.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-50 border-dashed">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Reference</span>
                <span className="text-[10px] font-mono font-bold text-gray-500">{tx.ref}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-8 text-gray-400 gap-2">
        <Lock size={20} strokeWidth={1.5} />
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-center max-w-[250px] leading-relaxed">
          Secured By Mosalak Escrow Infrastructure
        </p>
      </div>

      <WithdrawalModal 
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        currentBalance="₦1,245,000"
      />
    </div>
  );
};

export default SellerMWallet;
