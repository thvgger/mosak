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
  CardSimIcon,
  X,
  Package,
  Zap,
  Smartphone,
  Building2,
  Landmark,
  Copy,
  Check
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Wallet = () => {
  const { user, loading, isAuthenticated } = useAuth();
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState('wallet'); // 'wallet' or 'earnings'
  const [transactionFilter, setTransactionFilter] = useState('all');
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [manualAmount, setManualAmount] = useState('');
  const [copied, setCopied] = useState(false);
  
  // Virtual account details
  const virtualAccount = {
    accountNumber: '1234567890',
    bankName: 'Providus Bank',
    accountName: 'Mosalak Ltd'
  };
  
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

  const handleAddFunds = () => {
    setShowAddFunds(true);
    setManualAmount('');
    setCopied(false);
  };

  const handleCopyAccountNumber = () => {
    navigator.clipboard.writeText(virtualAccount.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleManualAmountChange = (e) => {
    const value = e.target.value;
    // Only allow numbers
    if (value === '' || /^\d*$/.test(value)) {
      setManualAmount(value);
    }
  };

  const handleDone = () => {
    // Here you would typically save the manual amount for record keeping
    console.log('Manual amount recorded:', manualAmount);
    setShowAddFunds(false);
    setManualAmount('');
  };

  const handleCancel = () => {
    setShowAddFunds(false);
    setManualAmount('');
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
          <button onClick={() => setShowBalance(!showBalance)}>
            {showBalance ? <Eye size={18} className='text-white/80' /> : <EyeOff size={18} className='text-white/80' />}
          </button>
        </p>

        <div className='flex items-center gap-2'>
          <button onClick={handleAddFunds} className='btn btn-secondary px-4'>
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

      {/* Add Funds Modal - Virtual Account Transfer */}
      {showAddFunds && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-5000 p-4">
          <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto scrollbar-hide">
            {/* Modal Header */}
            <div className="border-b border-gray-200 p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Add Funds</h2>
                <button 
                  onClick={handleCancel}
                  className="p-1 hover:bg-gray-100 rounded-lg transition"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Virtual Account Transfer Section */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Virtual Account Transfer</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Transfer to your dedicated virtual account number below
                </p>
                
                {/* Account Number Box */}
                <div className="bg-gray-50 rounded-lg p-4 mb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">Account Number</span>
                    <button 
                      onClick={handleCopyAccountNumber}
                      className="flex items-center gap-1 text-sm text-primary hover:text-primary/80"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="text-2xl font-mono font-bold tracking-wider mb-2">
                    {virtualAccount.accountNumber}
                  </div>
                  <div className="text-sm text-gray-600">
                    {virtualAccount.bankName} - {virtualAccount.accountName}
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <p className="text-xs text-blue-800">
                    Funds usually reflect within 5-10 minutes. Please contact support if delayed beyond 30 minutes.
                  </p>
                </div>
              </div>

              {/* Manual Amount Entry */}
              <div className="border-t border-gray-200 pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Or enter amount manually
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₦</span>
                  <input
                    type="text"
                    value={manualAmount}
                    onChange={handleManualAmountChange}
                    placeholder="Enter amount"
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  For record keeping purposes only
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 p-6 flex justify-end gap-3">
              <button
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDone}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;