import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Truck,
  Package,
  CheckCircle,
  MessageCircle,
  AlertCircle,
  Clock,
  ChevronRight,
  Lock,
  ChevronLeft,
  Store,
  Info,
  ChevronDown
} from "lucide-react";

const OrderTracking = () => {
  const [orderState, setOrderState] = useState("Preparing");

  return (
    <div className="min-h-screen bg-[#F8F9FB] pb-20">
      {/* Header / Breadcrumb */}
      <div className="max-w-[1200px] mx-auto px-6 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
        <Link to="/cart" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
          Back to Cart <ArrowRight size={16} />
        </Link>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-[1fr_380px] gap-8">
        
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          
          {/* Status Banner */}
          <div className="bg-white border-2 border-[#0024FF]/10 rounded-[24px] p-8 shadow-sm">
            <div className="inline-flex items-center gap-2 bg-[#8B9CFF] text-white px-5 py-2.5 rounded-xl font-bold text-sm mb-6">
              <ShieldCheck size={18} fill="white" className="text-[#8B9CFF]" />
              Payment Held in Escrow
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Your ₦45,000 is safely held by Paystack. No action required yet.
            </h2>
            <p className="flex items-center gap-2 text-gray-500 font-medium">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              Waiting for seller to ship
            </p>
          </div>

          {/* Delivery Information */}
          <div className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100">
            <div className="bg-[#DDE4FF] px-8 py-5 flex items-center gap-3">
              <Truck size={24} className="text-[#0024FF]" />
              <h3 className="text-lg font-bold text-gray-900">Delivery Information</h3>
            </div>
            
            <div className="p-10">
              <div className="relative pl-12 space-y-12">
                {/* Timeline Line */}
                <div className="absolute left-[23px] top-[30px] bottom-[30px] w-0.5 bg-gray-100"></div>

                {/* Step 1: Completed */}
                <div className="relative">
                  <div className="absolute -left-[51px] top-0 w-12 h-12 bg-[#0024FF] rounded-xl flex items-center justify-center text-white z-10 shadow-lg shadow-blue-600/20 border-4 border-white">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-1">Payment Held in Escrow</h4>
                    <p className="text-sm text-gray-600 font-medium mb-1">Your payment is safely held by Paystack until delivery is confirmed.</p>
                    <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Dec 23, 2025 at 2:34 PM</p>
                  </div>
                </div>

                {/* Step 2: Current */}
                <div className="relative">
                  <div className="absolute -left-[51px] top-0 w-12 h-12 bg-[#0024FF] rounded-xl flex items-center justify-center text-white z-10 shadow-lg shadow-blue-600/20 border-4 border-white">
                    <Truck size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-bold text-gray-900 text-lg">Seller Preparing Item</h4>
                      <span className="px-4 py-1 bg-[#8B9CFF] text-white text-[10px] font-bold rounded-full uppercase tracking-widest">Current</span>
                    </div>
                    <p className="text-sm text-gray-600 font-medium mb-1">The seller is preparing your item for shipment.</p>
                    <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Expected to ship by: Dec 24, 2025</p>
                  </div>
                </div>

                {/* Step 3: Pending */}
                <div className="relative opacity-30">
                  <div className="absolute -left-[51px] top-0 w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 z-10 border-4 border-white">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-1">Item Delivered</h4>
                    <p className="text-sm text-gray-500 font-medium">You'll receive a notification once the item is delivered.</p>
                  </div>
                </div>

                {/* Step 4: Pending Action */}
                <div className="relative opacity-30">
                  <div className="absolute -left-[51px] top-0 w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 z-10 border-4 border-white">
                    <Package size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-2">Confirm You Received Item</h4>
                    <p className="text-sm text-gray-500 font-medium mb-4">After receiving your item, confirm delivery here.</p>
                    <button disabled className="px-6 py-3 bg-gray-200 text-gray-400 font-bold rounded-xl text-sm cursor-not-allowed uppercase tracking-wider">
                      Confirm Delivery
                    </button>
                    <p className="flex items-center gap-2 text-[11px] text-red-500 font-bold mt-3">
                      <Info size={14} />
                      Only confirm after inspecting your item.
                    </p>
                  </div>
                </div>

                {/* Step 5: Final */}
                <div className="relative opacity-30">
                  <div className="absolute -left-[51px] top-0 w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 z-10 border-4 border-white">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-1">Completed</h4>
                    <p className="text-sm text-gray-500 font-medium">Funds released</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex gap-4 p-8 bg-white rounded-[24px] border border-gray-100 shadow-sm">
            <button className="flex items-center justify-center gap-2 flex-1 py-4 border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all">
              <MessageCircle size={20} fill="currentColor" className="opacity-10" />
              Chat with seller
            </button>
            <button className="flex items-center justify-center gap-2 flex-1 py-4 border-2 border-gray-200 text-gray-500 font-bold rounded-xl hover:bg-gray-50 transition-all">
              <ShieldAlert size={20} />
              Report an issue
            </button>
          </div>

        </div>


        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          
          {/* Order Summary */}
          <div className="bg-[#EEF2FF] rounded-[24px] overflow-hidden shadow-sm">
            <div className="px-8 py-6 flex items-center gap-3 border-b border-white/50">
              <Truck size={24} className="text-[#0024FF]" />
              <h3 className="text-lg font-bold text-gray-900">Order Summary</h3>
            </div>
            
            <div className="p-8 bg-white space-y-6">
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-600">Samsung Galaxy A54 5G x1</p>
                <p className="text-sm font-medium text-gray-600">Apple AirPods Pro (2nd Gen) x1</p>
              </div>
              
              <div className="pt-4 border-t border-gray-100 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#8B9CFF] text-white text-[9px] font-black rounded-md uppercase tracking-wider">
                    <ShieldCheck size={10} fill="white" className="text-[#8B9CFF]" />
                    Held in Escrow
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-[#0024FF]">Total Paid</span>
                  <span className="text-base font-black text-gray-900">₦1,500</span>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Order ID: #MOS-87342</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Paid: Dec 23, 2025</p>
              </div>
            </div>
          </div>

          {/* Payment Protected Card */}
          <div className="bg-[#DDE4FF] rounded-[24px] p-8 shadow-sm border border-blue-100">
            <div className="flex items-center gap-2 text-[#0024FF] font-black uppercase tracking-[0.1em] text-xs mb-6">
              <ShieldCheck size={20} fill="#0024FF" className="text-white" />
              Your Payment is Protected
            </div>
            
            <div className="bg-white rounded-2xl p-4 flex items-center justify-between mb-2 shadow-sm border border-blue-50">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Amount held</span>
              <div className="flex items-center gap-2 text-[#0024FF] font-black text-lg">
                <Lock size={18} />
                <span>₦2,345,000</span>
              </div>
            </div>
            
            <div className="h-2.5 bg-white/50 rounded-full mb-6 overflow-hidden relative border border-white/20">
               <div className="w-[85%] h-full bg-[#0024FF] rounded-full shadow-[0_0_10px_rgba(0,36,255,0.3)]"></div>
            </div>

            <div className="bg-[#B4C6FF]/40 rounded-xl p-4 mb-6">
              <p className="text-[12px] text-blue-800 font-bold leading-relaxed">
                Your payment is securely held until you confirm delivery. This protects you from fraud and ensures you receive your item as described.
              </p>
            </div>

            <button className="w-full bg-[#0024FF] hover:bg-blue-700 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-blue-600/20 uppercase tracking-widest text-xs">
              Report an Issue
            </button>
          </div>

          {/* Seller Information */}
          <div className="bg-[#F8F9FB] border border-gray-100 rounded-[24px] p-8 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Seller Information</h3>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md border-4 border-white">
                G
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg leading-none mb-1">Gadget World</h4>
                <div className="flex items-center gap-1.5 text-blue-600">
                  <ShieldCheck size={14} fill="currentColor" className="text-white" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">Verified Seller</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">Location:</span>
                <span className="text-gray-900 font-bold">Lagos</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">Response Rate:</span>
                <span className="text-gray-900 font-bold flex items-center gap-1">4.9 <StarIcon /></span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">Rating:</span>
                <span className="text-gray-900 font-bold">98%</span>
              </div>
            </div>

            <button className="flex items-center justify-center gap-2 w-full py-4 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold text-sm rounded-xl transition-all shadow-sm">
              <MessageCircle size={18} fill="currentColor" className="opacity-10" />
              Chat with seller
            </button>
          </div>

          {/* Developer Tool: Select Order State */}
          <div className="bg-[#DDE4FF] rounded-[24px] p-8 shadow-sm border border-blue-100">
             <p className="text-[10px] font-black text-blue-700 uppercase tracking-widest mb-4">HERE: Select Order State</p>
             <div className="relative">
                <select 
                  value={orderState}
                  onChange={(e) => setOrderState(e.target.value)}
                  className="w-full bg-white border-2 border-white rounded-xl py-4 px-6 text-sm font-bold text-gray-700 appearance-none focus:outline-none shadow-sm"
                >
                  <option>Preparing</option>
                  <option>In Transit</option>
                  <option>Delivered</option>
                </select>
                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#FFD700" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

export default OrderTracking;