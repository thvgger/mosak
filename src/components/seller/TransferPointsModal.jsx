import React, { useState } from 'react';
import { X, Coins, Wallet, ArrowRightLeft, Info, CheckCircle2 } from 'lucide-react';

const TransferPointsModal = ({ isOpen, onClose, pointsBalance = 4850, walletBalance = 2500 }) => {
  const [pointsToTransfer, setPointsToTransfer] = useState('');
  
  if (!isOpen) return null;

  const pointsValue = pointsToTransfer ? parseFloat(pointsToTransfer) : 0;
  const receiveAmount = pointsValue; 
  const newWalletBalance = walletBalance + receiveAmount;

  const handleMaxPoints = () => {
    setPointsToTransfer(pointsBalance.toString());
  };

  return (
    <div className="fixed inset-0 z-500 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto" onClick={onClose}>
      <div className="bg-white w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl animate-slide-up my-auto" onClick={(e) => e.stopPropagation()}>
        <div className="bg-primary p-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 hover:bg-white/10 p-1 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-2.5 rounded-lg">
              <ArrowRightLeft size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold">Transfer Points to Wallet</h3>
              <p className="text-white/80 text-sm">Convert your earned points into spendable cash</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary/5 border border-primary/10 rounded-xl p-4">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Points Balance</p>
              <div className="flex items-center gap-2">
                <Coins size={18} className="text-primary" />
                <h4 className="text-xl font-bold text-gray-900">{pointsBalance.toLocaleString()}</h4>
              </div>
            </div>
            <div className="bg-green-50 border border-green-100 rounded-xl p-4">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Wallet Balance</p>
              <div className="flex items-center gap-2">
                <Wallet size={18} className="text-green-600" />
                <h4 className="text-xl font-bold text-gray-900">₦{walletBalance.toLocaleString()}</h4>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Info size={16} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-600">Conversion Rate</span>
            </div>
            <span className="text-sm font-bold text-gray-900">100 points = ₦100</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-gray-900">Points to Transfer</label>
              <button 
                onClick={handleMaxPoints}
                className="text-xs text-primary font-bold hover:underline"
              >
                Use maximum ({pointsBalance.toLocaleString()} points)
              </button>
            </div>
            <div className="relative">
              <input 
                type="number"
                value={pointsToTransfer}
                onChange={(e) => setPointsToTransfer(e.target.value)}
                placeholder="Enter amount"
                className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 rounded-xl py-4 px-4 font-bold text-gray-900 transition-all outline-none"
              />
            </div>
          </div>

          {pointsToTransfer && pointsValue > 0 && (
            <div className="bg-green-50 border border-green-100 rounded-xl p-5 space-y-3 animate-slide-up">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">You will receive</span>
                <span className="text-xl font-bold text-green-600">₦{receiveAmount.toLocaleString()}</span>
              </div>
              <div className="pt-3 border-t border-green-100 flex items-center justify-between">
                <span className="text-sm text-gray-600">New wallet balance</span>
                <span className="text-sm font-bold text-gray-900">₦{newWalletBalance.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 grid grid-cols-2 gap-4 border-t border-gray-100">
          <button 
            onClick={onClose}
            className="w-full py-4 border-2 border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            disabled={!pointsToTransfer || pointsValue <= 0 || pointsValue > pointsBalance}
            className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95 disabled:opacity-50 disabled:scale-100 disabled:shadow-none"
          >
            Confirm Transfer
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransferPointsModal;
