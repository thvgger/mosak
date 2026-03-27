import React, { useState } from 'react';
import { 
  Eye, 
  EyeOff, 
  Download, 
  Upload, 
  RefreshCw,
  ChevronDown,
  Filter,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Wallet as WalletIcon,
  TrendingUp,
  Shield,
  CreditCard,
  History,
  ShieldBan,
  Plus,
  ArrowDownRight,
  CardSim,
  CardSimIcon
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Wallet = () => {
  const { user, loading, isAuthenticated } = useAuth();
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState('wallet'); // 'wallet' or 'earnings'
  const [transactionFilter, setTransactionFilter] = useState('all');
  const [showAddFunds, setShowAddFunds] = useState(false);
  
  // Sample wallet data
  const walletData = {
    availableBalance: 45750.00,
    pendingBalance: 12500.00,
    totalEarnings: 1250000.00,
    lifetimeEarnings: 2450000.00,
    currency: 'NGN'
  };

  // Sample transactions based on the image
  const transactions = [
    {
      id: 'TXN-001',
      date: 'Dec 24, 2024',
      type: 'credit',
      description: 'Wallet Top-up',
      amount: 50000,
      status: 'completed',
      reference: 'REF-WALLET-001'
    },
    {
      id: 'TXN-002',
      date: 'Dec 24, 2024',
      type: 'debit',
      description: 'Order ORD-2024-1547',
      amount: 1250000,
      status: 'completed',
      reference: 'ORD-2024-1547'
    },
    {
      id: 'TXN-003',
      date: 'Dec 24, 2024',
      type: 'credit',
      description: 'Refund ORD-2024-1500',
      amount: 50000,
      status: 'completed',
      reference: 'REF-ORD-1500'
    },
    {
      id: 'TXN-004',
      date: 'Dec 24, 2024',
      type: 'debit',
      description: 'Order ORD-2024-1500',
      amount: 1250000,
      status: 'completed',
      reference: 'ORD-2024-1500'
    },
    {
      id: 'TXN-005',
      date: 'Dec 23, 2024',
      type: 'credit',
      description: 'Withdrawal to Bank',
      amount: 25000,
      status: 'pending',
      reference: 'WTH-2024-001'
    },
    {
      id: 'TXN-006',
      date: 'Dec 22, 2024',
      type: 'debit',
      description: 'Order ORD-2024-1482',
      amount: 75000,
      status: 'completed',
      reference: 'ORD-2024-1482'
    }
  ];

  // Filter transactions
  const filteredTransactions = transactions.filter(tx => {
    if (transactionFilter === 'all') return true;
    if (transactionFilter === 'credit') return tx.type === 'credit';
    if (transactionFilter === 'debit') return tx.type === 'debit';
    if (transactionFilter === 'pending') return tx.status === 'pending';
    if (transactionFilter === 'completed') return tx.status === 'completed';
    return true;
  });

  const formatCurrency = (amount) => {
    return `₦${amount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed':
        return <CheckCircle size={14} className="text-green-500" />;
      case 'pending':
        return <Clock size={14} className="text-yellow-500" />;
      case 'failed':
        return <XCircle size={14} className="text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTransactionIcon = (type) => {
    if (type === 'credit') {
      return <ArrowDownLeft size={16} className="text-green-600" />;
    } else {
      return <ArrowUpRight size={16} className="text-red-600" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Wallet/Earnings Toggle */}
      <div className="bg-white p-1 rounded-lg flex items-center w-fit ml-auto border border-gray-200">
        <button
          onClick={() => setActiveTab('wallet')}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition ${
            activeTab === 'wallet' 
              ? 'bg-primary text-white' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Wallet
        </button>
        <button
          onClick={() => setActiveTab('earnings')}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition ${
            activeTab === 'earnings' 
              ? 'bg-primary text-white' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Earnings
        </button>
      </div>

      {/* Header with Balance Toggle */}
      <div className="flex flex-col justify-between items-start bg-primary text-white p-4 rounded-xl">
        <h1 className="text-sm font-normal flex items-center gap-2 mb-4">
          <ShieldBan size={16} />
          Secured Wallet
        </h1>
        <small className='text-xs text-gray-300'> Available Balance </small>
        <p className='flex items-center gap-2 mb-4 text-xl font-bold'>
          ₦45,750.00
          <Eye size={18} className='text-white/80' />
        </p>

        <div className='flex items-center gap-2'>
          <button className='btn btn-secondary px-4'>
            <Plus size={18} />
            Add Funds
          </button>
          <button className='btn btn-secondary bg-white/80 px-4'>
            <ArrowUpRight size={20} />
            Withdraw
          </button>
          <button className='btn btn-secondary bg-white/80 px-4'>
            <ArrowDownRight size={20} />
            Transfer Funds
          </button>
        </div>
          {/* <p className="text-sm text-gray-500 mt-1">Manage your funds and track your earnings</p> */}

        {/* <button 
          onClick={() => setShowBalance(!showBalance)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-primary rounded-lg hover:bg-gray-200 transition"
        >
          {showBalance ? <Eye size={18} /> : <EyeOff size={18} />}
          <span className="text-sm font-medium">{showBalance ? 'Hide' : 'Show'} Balance</span>
        </button> */}
      </div>


      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Spent */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm space-y-4">
          <p className='text-sm text-gray-600 flex items-center gap-2 justify-between'>
            Total Spent
            <ArrowUpRight size={20} className='text-red-400' />
          </p>
          <h3 className="text-2xl font-bold mb-1">
            {showBalance ? formatCurrency(walletData.availableBalance) : '••••••'}
          </h3>
          <p className="text-xs text-gray-500">This month</p>
        </div>

        {/* Total Added */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm space-y-4">
          <p className='text-sm text-gray-600 flex items-center gap-2 justify-between'>
            Total Added           
            <ArrowDownRight size={20} className='text-green-400' /> 
          </p>
          <h3 className="text-2xl font-bold mb-1">
            {showBalance ? formatCurrency(walletData.pendingBalance) : '••••••'}
          </h3>
          <p className="text-xs text-gray-500">This month</p>
        </div>

        {/* Total Transactions */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm space-y-4">
          <p className='text-sm text-gray-600 flex items-center gap-2 justify-between'>
            Transactions
            <CreditCard size={20} className='text-orange-500' />
          </p>
          <h3 className="text-2xl font-bold mb-1">
            {showBalance ? formatCurrency(walletData.lifetimeEarnings) : '••••••'}
          </h3>
          <p className="text-xs text-gray-500">This month</p>
        </div>
      </div>

      {/* Quick Actions */}
      {/* <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
            <div className="p-3 bg-primary/10 rounded-full">
              <Upload size={20} className="text-primary" />
            </div>
            <span className="text-sm font-medium">Add Funds</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
            <div className="p-3 bg-primary/10 rounded-full">
              <Download size={20} className="text-primary" />
            </div>
            <span className="text-sm font-medium">Withdraw</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
            <div className="p-3 bg-primary/10 rounded-full">
              <RefreshCw size={20} className="text-primary" />
            </div>
            <span className="text-sm font-medium">Transfer</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
            <div className="p-3 bg-primary/10 rounded-full">
              <History size={20} className="text-primary" />
            </div>
            <span className="text-sm font-medium">Transaction History</span>
          </button>
        </div>
      </div> */}

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="font-semibold text-gray-800">Recent Transactions</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <select
                  value={transactionFilter}
                  onChange={(e) => setTransactionFilter(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Transactions</option>
                  <option value="credit">Credits Only</option>
                  <option value="debit">Debits Only</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter size={18} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 text-nowrap">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 text-nowrap">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 text-nowrap">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 text-nowrap">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 text-nowrap">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 text-nowrap">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 text-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{tx.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{tx.date}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getTransactionIcon(tx.type)}
                      <span className={`ml-2 text-sm capitalize ${tx.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                        {tx.type}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{tx.description}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-semibold ${tx.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                      {tx.type === 'credit' ? '+' : '-'}{formatCurrency(tx.amount)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {getStatusIcon(tx.status)}
                      <span className={`ml-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(tx.status)}`}>
                        {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-primary hover:text-primary/80 text-sm font-medium">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <WalletIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No transactions</h3>
            <p className="mt-1 text-sm text-gray-500">No transactions found for the selected filter.</p>
          </div>
        )}

        {/* Pagination */}
        <div className="bg-white px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredTransactions.length}</span> of{' '}
              <span className="font-medium">{transactions.length}</span> transactions
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50">
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 flex items-start gap-3">
        <Shield size={20} className="text-blue-600 mt-0.5" />
        <div>
          <h4 className="text-sm font-semibold text-blue-900">Secure Transactions</h4>
          <p className="text-xs text-blue-700 mt-1">
            All transactions are protected by our escrow service. Funds are only released when both parties are satisfied.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Wallet;