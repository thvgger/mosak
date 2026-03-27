import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  ShieldCheck,
  Truck,
  Package,
  CheckCircle,
  Clock,
  MessageCircle,
  AlertCircle
} from "lucide-react";

const OrderTracking = () => {
  const { orderId } = useParams();

  return (
    <div className="space-y-6">
      <ul className="flex items-center gap-2 text-gray-500">
        <Link to="/account/orders"> Orders </Link>
        &gt;
        <Link to=""> Orders Tracking </Link>
      </ul>

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Order Tracking</h1>
        <p className="text-sm text-gray-500">
          Track order progress and escrow status
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">

          {/* Escrow Notice */}
          <div className="bg-indigo-50 border border-indigo-400 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="text-indigo-600" size={20} />
              <span className="text-sm font-semibold text-indigo-700">
                Payment Held in Escrow
              </span>
            </div>

            <p className="text-gray-700 text-sm">
              Your <strong>₦45,000</strong> is safely held by Paystack.
              No action required yet.
            </p>

            <div className="flex items-center text-sm text-red-500 mt-2">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              Waiting for seller to ship
            </div>
          </div>


          {/* Delivery Information */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">

            <div className="flex items-center gap-2 mb-6">
              <Truck className="text-blue-600" size={20} />
              <h2 className="font-semibold text-gray-800">
                Delivery Information
              </h2>
            </div>

            {/* Timeline */}
            <div className="space-y-8">

              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="bg-blue-600 text-white p-2 rounded-full">
                    <ShieldCheck size={16} />
                  </div>
                  <div className="w-px h-full bg-gray-300"></div>
                </div>

                <div>
                  <p className="font-medium text-gray-800">
                    Payment Held in Escrow
                  </p>
                  <p className="text-sm text-gray-500">
                    Your payment is safely held by Paystack until delivery is confirmed.
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Dec 23, 2025 at 2:34 PM
                  </p>
                </div>
              </div>


              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="bg-blue-600 text-white p-2 rounded-full">
                    <Package size={16} />
                  </div>
                  <div className="w-px h-full bg-gray-300"></div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-800">
                      Seller Preparing Item
                    </p>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      Current
                    </span>
                  </div>

                  <p className="text-sm text-gray-500">
                    The seller is preparing your item for shipment.
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Expected ship date: Dec 24, 2025
                  </p>
                </div>
              </div>


              {/* Step 3 */}
              <div className="flex gap-4 opacity-60">
                <div className="flex flex-col items-center">
                  <div className="bg-gray-300 text-white p-2 rounded-full">
                    <Truck size={16} />
                  </div>
                  <div className="w-px h-full bg-gray-200"></div>
                </div>

                <div>
                  <p className="font-medium text-gray-700">Item Delivered</p>
                  <p className="text-sm text-gray-500">
                    You'll receive notification once item arrives.
                  </p>
                </div>
              </div>


              {/* Step 4 */}
              <div className="flex gap-4 opacity-60">
                <div className="bg-gray-300 text-white p-2 rounded-full">
                  <CheckCircle size={16} />
                </div>

                <div>
                  <p className="font-medium text-gray-700">
                    Confirm You Received Item
                  </p>
                  <p className="text-sm text-gray-500">
                    After receiving your item confirm delivery.
                  </p>

                  <button className="mt-2 text-sm px-4 py-2 bg-gray-200 rounded-lg">
                    Confirm Delivery
                  </button>

                  <p className="text-xs text-red-500 mt-1">
                    Only confirm after inspecting your item
                  </p>
                </div>
              </div>

            </div>
          </div>


          {/* Bottom Buttons */}
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <MessageCircle size={16} />
              Chat with seller
            </button>

            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-gray-600">
              <AlertCircle size={16} />
              Report an issue
            </button>
          </div>

        </div>



        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">

          {/* Order Summary */}
          <div className="bg-white border rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4">
              Order Summary
            </h3>

            <div className="text-sm text-gray-600 space-y-2">
              <p>Samsung Galaxy A54 5G x1</p>
              <p>Apple AirPods Pro (2nd Gen) x1</p>
            </div>

            <div className="border-t my-4"></div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total Paid</span>
              <span className="font-semibold">₦1,500</span>
            </div>

            <div className="text-xs text-gray-400 mt-3">
              Order ID: {orderId}
            </div>
          </div>


          {/* Payment Protection */}
          <div className="bg-indigo-50 border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="text-indigo-600" size={18} />
              <span className="font-semibold text-gray-800">
                Your Payment is Protected
              </span>
            </div>

            <p className="text-sm text-gray-600">
              Your payment is securely held until delivery is confirmed.
            </p>

            <div className="mt-4 text-sm font-semibold text-indigo-600">
              Amount Held: ₦2,345,000
            </div>

            <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
              Report an Issue
            </button>
          </div>


          {/* Seller Information */}
          <div className="bg-white border rounded-xl p-5 shadow-sm">

            <h3 className="font-semibold text-gray-800 mb-4">
              Seller Information
            </h3>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-indigo-600 text-white flex items-center justify-center rounded-full font-semibold">
                G
              </div>

              <div>
                <p className="font-medium text-gray-800">
                  Gadget World
                </p>
                <p className="text-xs text-blue-600">
                  Verified Seller
                </p>
              </div>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p>Location: Lagos</p>
              <p>Response Rate: 98%</p>
              <p>Rating: ⭐ 4.9</p>
            </div>

            <button className="mt-4 w-full border py-2 rounded-lg hover:bg-gray-50">
              Chat with seller
            </button>
          </div>


          {/* Admin State Select */}
          <div className="bg-white border rounded-xl p-4">
            <p className="text-sm text-gray-500 mb-2">
              Select Order State
            </p>

            <select className="w-full border rounded-lg p-2 text-sm">
              <option>Processing</option>
              <option>In Transit</option>
              <option>Delivered</option>
              <option>Completed</option>
            </select>
          </div>

        </div>

      </div>
    </div>
  );
};

export default OrderTracking;