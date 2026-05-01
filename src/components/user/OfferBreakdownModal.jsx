import React from 'react';
import { X, Shield, ArrowRight } from 'lucide-react';

const OfferBreakdownModal = ({ isOpen, onClose, deal, onAccept }) => {
  if (!isOpen || !deal) return null;

  const escrowFee = deal.amount * 0.03;
  const totalAmount = Number(deal.amount) + escrowFee;

  return (
    <div 
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[10002] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="bg-white w-full max-w-2xl max-h-[95vh] flex flex-col rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#0024FF] p-6 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-3">
            <Shield size={24} fill="white" className="text-[#0024FF]" />
            <h2 className="font-bold text-xl tracking-tight">Offer Breakdown</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
            <X size={28} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-8 overflow-y-auto flex-1 space-y-8">
          {/* Product Header */}
          <div className="space-y-6">
            <div className="w-full aspect-[2/1] bg-gray-100 rounded-[24px] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000" 
                alt="Product"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                {deal.service || 'Foreign Used 2015 Porsche Macan Turbo'}
              </h3>
              <p className="text-lg font-bold text-gray-900">
                Original price: <span className="text-gray-900">₦95,000</span>
              </p>
              <p className="text-sm text-gray-500 leading-relaxed max-w-lg">
                Buy one or buy a few and make every space where you sit more convenient. 
                Light and easy to move around with removable tray top, handy for serving snacks.
              </p>
            </div>
          </div>

          {/* Fields Section */}
          <div className="grid gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Agreed Amount (₦)</label>
              <div className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-500 font-medium">
                ₦{Number(deal.amount).toLocaleString()}
              </div>
              <p className="text-[11px] text-gray-400 font-bold mt-1.5">This is the final price you and the seller agreed on</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Offer Expiry</label>
              <div className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-500 font-medium">
                24 hours
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Quantity</label>
              <div className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-500 font-medium">
                1
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Note</label>
              <textarea
                placeholder="Add any additional details about the offer..."
                rows="3"
                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#0024FF]/10 outline-none transition-all text-sm resize-none placeholder:text-gray-400 font-medium"
              />
            </div>
          </div>

          {/* Payment Breakdown */}
          <div className="bg-[#F9FAFB] rounded-[24px] p-6 space-y-4">
            <h3 className="text-sm font-bold text-gray-900">Payment Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">Product Amount</span>
                <span className="text-gray-900 font-bold">₦{Number(deal.amount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">Escrow Fee (3%)</span>
                <span className="text-gray-900 font-bold">₦{escrowFee.toLocaleString()}</span>
              </div>
              <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                <span className="text-sm font-bold text-gray-900">Total Amount</span>
                <span className="text-lg font-extrabold text-gray-900">₦{totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* How Escrow Works */}
          <div className="bg-[#DDE4FF]/50 rounded-[24px] p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
              <Shield size={120} className="text-[#0024FF]" />
            </div>
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2 text-[#0024FF]">
                <Shield size={20} fill="#0024FF" className="text-[#0024FF]" />
                <span className="font-bold text-sm">How Escrow Works</span>
              </div>
              <ul className="space-y-2 text-[13px] font-bold text-gray-700">
                <li className="flex gap-2">1. <span className="font-medium text-gray-600">Payment is held securely in escrow by Paystack.</span></li>
                <li className="flex gap-2">2. <span className="font-medium text-gray-600">Sellers ships your order</span></li>
                <li className="flex gap-2">3. <span className="font-medium text-gray-600">You receive and inspect the item</span></li>
                <li className="flex gap-2">4. <span className="font-medium text-gray-600">Payment released to seller after confirmation</span></li>
              </ul>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#0024FF] text-white text-[11px] font-bold rounded-lg hover:bg-blue-700 transition-colors uppercase tracking-wider">
                Read Full Policy <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 bg-white border-t border-gray-100 flex gap-4 shrink-0">
          <button 
            onClick={onClose}
            className="flex-1 px-8 py-4 border-2 border-gray-200 text-gray-900 font-bold rounded-2xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onAccept}
            className="flex-1 px-8 py-4 bg-[#0024FF] text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98]"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferBreakdownModal;