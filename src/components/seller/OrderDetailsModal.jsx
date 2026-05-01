import React from 'react';
import { X, Shield, AlertTriangle, Clock, Package, User, ChevronRight, MessageSquare, Info } from 'lucide-react';

const OrderDetailsModal = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  const isDisputed = order.escrowStatus === 'disputed';
  const amountValue = Number(order.amount.replace(/,/g, ''));
  const escrowFee = amountValue * 0.03;
  const totalAmount = amountValue + escrowFee;

  return (
    <div 
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[10002] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="bg-white w-full max-w-2xl max-h-[95vh] flex flex-col rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className={`${isDisputed ? 'bg-[#FF3B3B]' : 'bg-[#0024FF]'} p-6 flex items-center justify-between text-white shrink-0`}>
          <div className="flex items-center gap-3">
            <h2 className="font-bold text-xl tracking-tight leading-none">
              {isDisputed ? 'Under dispute' : 'View Details'}
            </h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
            <X size={28} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-8 overflow-y-auto flex-1 space-y-8 no-scrollbar">
          {/* Dispute Warning Banner */}
          {isDisputed && (
            <div className="bg-[#FFF1F1] border border-[#FFDADA] rounded-[24px] p-6 flex gap-4 items-start animate-in slide-in-from-top-2 duration-300">
              <div className="w-12 h-12 bg-[#FF3B3B] rounded-xl flex items-center justify-center shrink-0">
                <AlertTriangle size={24} className="text-white" />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="text-[#FF3B3B] font-bold text-lg">Order Under Dispute</h3>
                <p className="text-gray-600 text-[13px] leading-relaxed font-medium">
                  This deal has been flagged for dispute by the buyer. Our support team is currently reviewing the case. Please wait for further instructions.
                </p>
                <button className="text-[#FF3B3B] font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                  Contact Support <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Service Item Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.1em]">Service Item</p>
              <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                {order.product}
              </h3>
            </div>
            <div className="w-16 h-16 bg-[#F8F9FB] rounded-2xl flex items-center justify-center text-gray-300 border border-gray-50">
              <Package size={32} />
            </div>
          </div>

          {/* Buyer Info Card */}
          <div className="flex items-center gap-4 py-4 px-6 bg-[#F8F9FB] rounded-2xl border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-[#E0E7FF] flex items-center justify-center text-[#0024FF] font-bold text-lg border-2 border-white shadow-sm">
              {order.buyer?.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.1em]">Buyer</p>
              <h4 className="text-base font-bold text-gray-900">{order.buyer}</h4>
            </div>
            <button className="p-3 bg-white hover:bg-gray-50 rounded-xl transition-all shadow-sm border border-gray-50 text-[#0024FF]">
              <MessageSquare size={20} fill="currentColor" className="opacity-10" />
              <MessageSquare size={20} className="absolute inset-0 m-auto" />
            </button>
          </div>

          {/* Parameters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em]">Agreed Amount</label>
              <div className="w-full px-6 py-5 bg-[#F8F9FB] border border-gray-100 rounded-2xl text-gray-900 font-black text-xl">
                ₦{order.amount}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em]">Delivery Period</label>
              <div className="w-full px-6 py-5 bg-[#F8F9FB] border border-gray-100 rounded-2xl text-gray-900 font-bold text-lg flex items-center gap-3">
                <Clock size={20} className="text-[#0024FF]" />
                {order.delivery || '3 Days'}
              </div>
            </div>
          </div>

          {/* Buyer's Note Section */}
          <div className="space-y-2">
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em]">Buyer's Note</label>
            <div className="w-full px-6 py-6 bg-[#F8F9FB] border border-gray-100 rounded-2xl text-gray-600 font-medium text-sm leading-relaxed italic">
              "Please ensure the design is minimalist and uses the color palette we discussed earlier. Looking forward to the draft."
            </div>
          </div>

          {/* Payment Breakdown Card */}
          <div className="bg-[#F8F9FB] rounded-[32px] p-8 space-y-6 border border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-[0.1em]">Payment Breakdown</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">Service Amount</span>
                <span className="text-gray-900 font-bold">₦{order.amount}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">Escrow Fee (3%)</span>
                <span className="text-gray-900 font-bold">₦{escrowFee.toLocaleString()}</span>
              </div>
              <div className="pt-5 border-t border-gray-200 flex justify-between items-end">
                <span className="text-sm font-bold text-gray-900 pb-1">Total Settlement</span>
                <div className="text-right">
                  <p className="text-[28px] font-black text-gray-900 leading-none mb-1">₦{totalAmount.toLocaleString()}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Held in Mosak Escrow</p>
                </div>
              </div>
            </div>
          </div>

          {/* Escrow Status Banner */}
          {!isDisputed && (
            <div className="bg-[#EEF2FF] border border-[#DDE4FF] rounded-[24px] p-6 flex gap-4 items-center">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                <Shield size={24} fill="#0024FF" className="text-white" />
                <Shield size={24} className="text-[#0024FF] absolute" />
              </div>
              <div className="space-y-1">
                <p className="text-[14px] font-bold text-gray-900 leading-snug">
                  Mosak Escrow is securing this payment.
                </p>
                <p className="text-[11px] text-gray-500 font-medium uppercase tracking-wider">
                  Verified & Protected Transaction
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-8 bg-white border-t border-gray-100 flex gap-4 shrink-0">
          <button 
            onClick={onClose}
            className="flex-1 px-8 py-5 border-2 border-gray-200 text-gray-900 font-bold rounded-2xl hover:bg-gray-50 transition-colors uppercase tracking-[0.1em] text-xs"
          >
            {isDisputed ? 'View Case' : 'Dispute'}
          </button>
          {!isDisputed && (
            <button 
              className="flex-1 px-8 py-5 bg-[#0024FF] text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98] uppercase tracking-[0.1em] text-xs"
            >
              Create Offer
            </button>
          )}
          {isDisputed && (
            <button 
              className="flex-1 px-8 py-5 bg-gray-100 text-gray-400 font-bold rounded-2xl cursor-not-allowed uppercase tracking-[0.1em] text-xs"
              disabled
            >
              Action Pending
            </button>
          )}
        </div>
      </div>
      
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default OrderDetailsModal;