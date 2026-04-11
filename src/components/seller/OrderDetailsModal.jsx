import React from 'react';
import { X, Shield, CheckCircle, Package, User, DollarSign, Calendar } from 'lucide-react';

const OrderDetailsModal = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-500 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-primary p-4 text-white flex items-center justify-between">
          <h2 className="text-lg font-semibold">Order Details</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto scrollbar-hide">
          {/* Order Status Badge & ID */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Order ID</p>
              <h3 className="text-lg font-bold text-gray-800">{order.id}</h3>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${order.statusColor}`}>
              {order.icon && <order.icon size={14} />}
              {order.status}
            </span>
          </div>

          <hr className="border-gray-100" />

          {/* Product Info */}
          <div className="flex gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-primary shrink-0">
              <Package size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Product Item</p>
              <h4 className="text-base font-semibold text-gray-800">{order.product}</h4>
              <p className="text-sm text-blue-600 font-bold mt-1">{order.amount}</p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mb-1">
                <User size={14} />
                <span>Buyer</span>
              </div>
              <p className="text-sm font-semibold text-gray-800">{order.buyer}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mb-1">
                <Calendar size={14} />
                <span>Order Date</span>
              </div>
              <p className="text-sm font-semibold text-gray-800">{order.time}</p>
            </div>
          </div>

          {/* Escrow Status Section */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 italic">
            <div className="flex items-center gap-2 mb-2">
              <Shield size={18} className="text-primary" />
              <h5 className="text-sm font-semibold text-gray-800">Escrow Protection</h5>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Payment is held safely in Mosak Escrow and will be released to your wallet 24 hours after the buyer confirms delivery.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button 
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
            >
              Close
            </button>
            <button 
              className="flex-1 py-3 px-4 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              Track Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
