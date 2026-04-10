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
    { id: 2, date: '2026-01-10', type: 'Withdrawal', typeIcon: ArrowDownRight, ref: 'WTH-2024-0089', amount: '₦300,000', amountClass: 'text-gray-800', status: 'Pending', statusClass: 'bg-orange-100 text-orange-700' },
    { id: 3, date: '2026-01-10', type: 'Escrow Release', typeIcon: ShieldCheck, ref: 'ORD-2024-1220', amount: '+₦750,000', amountClass: 'text-green-600', status: 'Completed', statusClass: 'bg-green-100 text-green-700' },
    { id: 4, date: '2026-01-10', type: 'Sale', typeIcon: ArrowUpRight, ref: 'ORD-2024-1215', amount: '+₦280,000', amountClass: 'text-green-600', status: 'Completed', statusClass: 'bg-green-100 text-green-700' },
    { id: 5, date: '2026-01-10', type: 'Withdrawal', typeIcon: ArrowDownRight, ref: 'WTH-2024-0088', amount: '₦500,000', amountClass: 'text-gray-800', status: 'Completed', statusClass: 'bg-green-100 text-green-700' }
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
          <div className="flex items-center bg-gray-100 rounded-lg p-1 border border-gray-200">
            <span className="text-sm font-medium text-gray-600 px-3">Switch:</span>
            <button 
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'm-wallet' ? 'bg-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('m-wallet')}
            >
              M-Wallet
            </button>
            <button 
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'earnings' ? 'bg-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
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
            className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            Withdraw Funds
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-primary rounded-xl p-6 text-white relative overflow-hidden shadow-sm flex flex-col justify-between min-h-[220px]">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-3">
              <div className="bg-white text-primary p-2 rounded-lg">
                <Wallet size={24} />
              </div>
              <span className="text-white/90 font-medium">Available Balance</span>
            </div>
            <button 
              onClick={() => setShowBalance(!showBalance)}
              className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
            >
              {showBalance ? (
                <EyeIcon color="#000" size={24} strokeWidth={1.5} />
              ) : (
                <EyeOffIcon color="#000" size={24} strokeWidth={1.5} />
              )}
            </button>
          </div>
          
          <div className="mt-4">
            <h2 className="text-3xl lg:text-4xl font-semibold mb-2 truncate" title={showBalance ? "₦1,245,000" : "****"}>
              {showBalance ? "₦1,245,000" : "₦****"}
            </h2>
            <div className="flex items-center justify-between mt-6">
              <span className="text-white/80 text-sm">Ready to withdraw</span>
              <span className="bg-white text-primary text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                <ArrowUpRight size={14} /> +18.5%
              </span>
            </div>
          </div>
          
          <button 
            onClick={() => setIsWithdrawModalOpen(true)}
            className="w-full bg-white text-primary hover:bg-gray-50 py-3 rounded-lg font-medium transition-colors mt-6"
          >
            Withdraw Now
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col min-h-[220px]">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-orange-500">
              <Clock size={24} />
            </div>
            <span className="text-gray-600 font-medium">Pending Balance</span>
          </div>
          
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            {showBalance ? "₦850,000" : "₦****"}
          </h2>
          <p className="text-gray-500 text-sm">Funds in Escrow</p>
          
          <div className="mt-auto pt-6 flex items-center gap-2 text-sm text-gray-500">
            <ShieldCheck size={16} />
            <span>Protected by Escrow</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col min-h-[220px]">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-green-500">
              <CircleCheckBig size={24} />
            </div>
            <span className="text-gray-600 font-medium">Total Withdrawn</span>
          </div>
          
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            {showBalance ? "₦850,000" : "₦****"}
          </h2>
          <p className="text-gray-500 text-sm">Lifetime earnings</p>
          
          <div className="mt-auto pt-6 flex items-center gap-2 text-sm text-gray-500">
            <ArrowUpRight size={16} />
            <span className="hover:text-primary cursor-pointer transition-colors">All-time withdrawals</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6 lg:p-8 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Linked Bank Account</h3>
            <button className="text-primary text-sm font-medium hover:underline">Update Account</button>
          </div>
          
          <div className="bg-[#00179B] rounded-xl p-6 text-white mb-6 relative overflow-hidden shadow-md">
            <div className="absolute top-0 right-0 p-6 opacity-30">
              <CreditCard size={100} strokeWidth={1} className="transform rotate-12" />
            </div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-white/70 text-xs uppercase tracking-wider mb-1">Bank Name</p>
                  <p className="font-semibold text-lg">GTBank</p>
                </div>
                <CreditCard size={28} className="text-white/80" />
              </div>
              
              <div className="flex flex-col sm:flex-row sm:justify-between gap-6">
                <div>
                  <p className="text-white/70 text-xs uppercase tracking-wider mb-1">Account Number</p>
                  <p className="font-mono text-xl font-medium tracking-widest">0123456789</p>
                </div>
                <div>
                  <p className="text-white/70 text-xs uppercase tracking-wider mb-1">Account Name</p>
                  <p className="font-medium text-lg truncate max-w-[200px]">TechGadgets Store</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-auto">
            <div className="bg-white rounded-lg p-4 shadow-xs border border-white/50">
              <p className="text-xs text-gray-500 mb-1">This Month</p>
              <p className="text-lg font-bold text-gray-900">₦3.2M</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-xs border border-white/50">
              <p className="text-xs text-gray-500 mb-1">Last 7 Days</p>
              <p className="text-lg font-bold text-gray-900">₦905K</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-xs border border-white/50">
              <p className="text-xs text-gray-500 mb-1">Avg. Order</p>
              <p className="text-lg font-bold text-gray-900">₦485K</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 lg:p-8 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Withdrawals</h3>
          
          <div className="flex-1 space-y-3">
            {recentWithdrawals.map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg p-4 flex items-center justify-between border border-white/60 shadow-xs">
                <div>
                  <p className="font-bold text-gray-900">{item.amount}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                </div>
                <div className="w-8 h-8 rounded-full border border-green-200 flex items-center justify-center">
                  <CircleCheckBig size={16} className="text-green-500" />
                </div>
              </div>
            ))}
          </div>
          
          <button className="text-primary text-sm font-medium flex items-center justify-center gap-2 mt-6 hover:underline w-full py-2">
            View All Withdrawals <ArrowUpRight size={16} />
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Transaction History</h3>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex items-center justify-between gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 bg-white hover:bg-gray-50 transition-colors">
              <span>All Types</span>
              <ChevronDown size={14} />
            </button>
            <button className="flex items-center justify-between gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 bg-white hover:bg-gray-50 transition-colors">
              <span>All Time</span>
              <ChevronDown size={14} />
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              <span>Export</span>
              <Download size={16} />
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Transaction Type</th>
                <th className="px-6 py-4">Reference</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Escrow Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {transactions.map((tx) => {
                const Icon = tx.typeIcon;
                return (
                  <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">{tx.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Icon size={16} className="text-gray-500" />
                        <span>{tx.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{tx.ref}</td>
                    <td className={`px-6 py-4 font-medium ${tx.amountClass}`}>{tx.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${tx.statusClass}`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-center items-center py-6 text-gray-500 text-sm gap-2">
        <Lock size={16} className="text-gray-400" />
        <span>Your funds are protected by Mosalak escrow system</span>
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
