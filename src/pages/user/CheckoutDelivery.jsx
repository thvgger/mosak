import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Truck, ShieldCheck, Home } from 'lucide-react';

const CheckoutDelivery = () => {
  const navigate = useNavigate();
  
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: 'Lagos',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save delivery info and navigate to payment
    localStorage.setItem('deliveryInfo', JSON.stringify(deliveryInfo));
    navigate('/checkout/payment');
  };

  const cartItems = [
    { name: 'Samsung Galaxy A54 5G', quantity: 1, price: 950000 },
    { name: 'Apple AirPods Pro (2nd Gen)', quantity: 1, price: 145000 }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 1500;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600 flex items-center">
          <Link to="/" className="hover:text-blue-600 flex items-center">
            <Home size={16} className="mr-1" />
            Home
          </Link>
          <span className="mx-2">›</span>
          <Link to="/marketplace" className="hover:text-blue-600">
            Marketplace
          </Link>
          <span className="mx-2">›</span>
          <Link to="/cart" className="hover:text-blue-600">
            Cart
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-900 font-medium">Checkout</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Delivery Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="bg-primary/40 flex items-center gap-3 mb-6 p-6">
                <div className="flex items-center justify-center">
                  <Truck className="text-blue-600" size={20} />
                </div>
                <h2 className="text-xl font-bold">Delivery Information</h2>
              </div>

              <form onSubmit={handleSubmit} className='p-6'>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={deliveryInfo.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      required
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={deliveryInfo.phoneNumber}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      required
                    />
                  </div>

                  {/* Delivery Address */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={deliveryInfo.address}
                      onChange={handleChange}
                      placeholder="Enter your delivery address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      required
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={deliveryInfo.city}
                      onChange={handleChange}
                      placeholder="Enter city"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      required
                    />
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <select
                      name="state"
                      value={deliveryInfo.state}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                    >
                      <option value="Lagos">Lagos</option>
                      <option value="Abuja">Abuja</option>
                      <option value="Port Harcourt">Port Harcourt</option>
                      <option value="Ibadan">Ibadan</option>
                      <option value="Kano">Kano</option>
                    </select>
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t">
                  <Link
                    to="/cart"
                    className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-2"
                  >
                    <ArrowLeft size={18} />
                    Back to Cart
                  </Link>
                  <button
                    type="submit"
                    className="w-full sm:flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-medium"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm sticky top-6 overflow-hidden">
              <h3 className="text-xl font-bold mb-6 bg-primary/40 p-6">Order Summary</h3>
              
              {/* Order Items */}
              <div className="space-y-4 mb-6 p-6">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-start border-b pb-4">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-bold">₦{item.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-0 p-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>₦{deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Escrow Fee (3%)</span>
                  <span>₦{deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t">
                  <span>Total</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Escrow Protection */}
              <div className="p-6">
                <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div>
                    <h4 className="font-bold text-blue-800 flex gap-1">
                      <ShieldCheck className="text-blue-600 shrink-0" size={24} />
                      Escrow Protection Active
                    </h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Your payment is held securely until you confirm receipt. Buy with confidence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutDelivery;