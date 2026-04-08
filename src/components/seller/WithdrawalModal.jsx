import React, { useState } from 'react';
import { X, CreditCard, Building2, ShieldCheck, ArrowDownToLine, Shield } from 'lucide-react';

const WithdrawalModal = ({ isOpen, onClose, currentBalance }) => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [transferMethod, setTransferMethod] = useState('bank');

  if (!isOpen) return null;

  const quickAmounts = [5000, 10000, 20000, 50000];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  return (
    <div 
      className="fixed inset-0 z-500 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl animate-slide-up my-auto mt-20
        "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-primary p-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 hover:bg-white/10 p-1 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-2.5 rounded-lg">
              <ArrowDownToLine size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold">Withdraw Funds</h3>
              <p className="text-white/80 text-sm">Transfer funds from your wallet balance</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto scrollbar-hide">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
            <p className="text-xs text-secondary font-medium uppercase tracking-wider mb-1">Current Balance</p>
            <h4 className="text-2xl font-bold text-gray-900">{currentBalance}</h4>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {quickAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => handleAmountSelect(amount)}
                className={`py-4 rounded-xl font-bold transition-all border-2 ${
                  selectedAmount === amount 
                  ? 'bg-primary border-primary text-white shadow-lg scale-[1.02]' 
                  : 'bg-gray-50 border-transparent text-gray-700 hover:bg-gray-100'
                }`}
              >
                ₦{amount.toLocaleString()}
              </button>
            ))}
          </div>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg">₦</span>
            <input 
              type="number"
              value={customAmount}
              onChange={handleCustomAmountChange}
              placeholder="Enter custom amount"
              className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/30 rounded-xl py-4 pl-10 pr-4 font-semibold text-gray-900 transition-all outline-none"
            />
          </div>
          <p className="text-xs text-gray-500 font-medium">Minimum amount: ₦1,000</p>

          <div className="space-y-3">
            <h5 className="font-bold text-gray-900 text-sm">Transfer Method</h5>
            <div className="space-y-3">
              <label 
                className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  transferMethod === 'card' ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input 
                    type="radio" 
                    name="method" 
                    className="hidden"
                    onChange={() => setTransferMethod('card')}
                  />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${transferMethod === 'card' ? 'border-primary' : 'border-gray-300'}`}>
                    {transferMethod === 'card' && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Card Payment</p>
                    <p className="text-xs text-gray-500">Pay with Debit/Credit Card</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-[#1434CB] text-white px-1.5 py-0.5 rounded text-[10px] font-bold">VISA</div>
                  <div className="flex -space-x-1">
                    <div className="w-3.5 h-3.5 bg-red-500 rounded-full opacity-90"></div>
                    <div className="w-3.5 h-3.5 bg-orange-500 rounded-full opacity-90"></div>
                  </div>
                </div>
              </label>

              <label 
                className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  transferMethod === 'bank' ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input 
                    type="radio" 
                    name="method" 
                    className="hidden"
                    onChange={() => setTransferMethod('bank')}
                  />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${transferMethod === 'bank' ? 'border-primary' : 'border-gray-300'}`}>
                    {transferMethod === 'bank' && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Bank Transfer</p>
                    <p className="text-xs text-gray-500">Direct bank transfer</p>
                  </div>
                </div>
                <Building2 size={24} className="text-gray-400" />
              </label>
            </div>
          </div>

          <div className="bg-[#E9EDFF] flex items-center gap-3 p-4 rounded-xl">
            <div className="bg-primary/20 p-2 rounded-lg text-primary">
              <Shield fill='currentColor' size={20} className="text-blue-400"/>
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm italic">Secure Payment</p>
              <p className="text-[10px] text-gray-600">Your payment information is encrypted and secure. We never store your card details.</p>
            </div>
          </div>
        </div>

        <div className="p-6 grid grid-cols-2 gap-4 border-t border-gray-100">
          <button 
            onClick={onClose}
            className="w-full py-4 border-2 border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95"
          >
            Proceed to payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalModal;
