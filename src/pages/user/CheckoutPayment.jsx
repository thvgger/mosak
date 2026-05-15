import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, ShieldCheck, CreditCard, Wallet, Building } from 'lucide-react';
import visa from "../../assets/visa.svg";

const CheckoutPayment = () => {
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardInfo, setCardInfo] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [saveCard, setSaveCard] = useState(false);

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process payment logic here
    alert('Order placed successfully!');
    navigate('/account/orders');
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
          <Link to="/checkout" className="text-gray-900 font-medium">Checkout</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-900 font-medium">Payment</span>
        </div>

        {/* <div className="mb-6 text-sm text-gray-600 flex items-center">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">›</span>
          <Link to="/checkout" className="hover:text-blue-600">Checkout</Link>
        </div> */}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Payment Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6">Payment Method</h2>

              {/* Payment Method Selection */}
              <div className="space-y-4 mb-8">
                {/* Card Payment */}
                <div 
                  className={`border rounded-xl p-4 cursor-pointer transition flex items-start justify-between gap-2 ${paymentMethod === 'card' ? 'border-blue-600 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'card' ? 'border-blue-600 bg-blue-600' : 'border-gray-400'}`}>
                    {paymentMethod === 'card' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>

                  <div className="flex-1 flex flex-col items-start gap-1">
                    <div className="flex items-center gap-2">
                      {/* <CreditCard size={20} /> */}
                      <span className="font-medium">Card Payment</span>
                    </div>
                    <p className="text-sm text-gray-600">Pay with Debit/Credit Card</p>
                  </div>
                  <div className="flex gap-2 mt-2 ml-9">
                    <span className="text-gray-400 font-bold">
                      <img src={visa} alt='' className='h-6 w-12 object-cover' />
                    </span>
                    <span className="text-gray-400 font-bold">Mastercard</span>
                  </div>
                </div>

                {/* Bank Transfer */}
                <div 
                  className={`border rounded-xl p-4 cursor-pointer transition ${paymentMethod === 'bank' ? 'border-blue-600 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
                  onClick={() => setPaymentMethod('bank')}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'bank' ? 'border-blue-600 bg-blue-600' : 'border-gray-400'}`}>
                      {paymentMethod === 'bank' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                    <div className="flex items-center gap-2">
                      {/* <Building size={20} /> */}
                      <span className="font-medium">Bank Transfer</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 ml-9">Direct bank transfer</p>
                </div>

                {/* Pay From Wallet */}
                {/* <div 
                  className={`border rounded-xl p-4 cursor-pointer transition ${paymentMethod === 'wallet' ? 'border-blue-600 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
                  onClick={() => setPaymentMethod('wallet')}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'wallet' ? 'border-blue-600 bg-blue-600' : 'border-gray-400'}`}>
                      {paymentMethod === 'wallet' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Pay From Wallet</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 ml-9">Pay instantly with your wallet balance</p>
                  <p className="text-sm font-medium mt-1 ml-9">Balance: ₦145,000</p>
                </div> */}
              </div>

              {/* Card Payment Form (shown only when card payment is selected) */}
              {paymentMethod === 'card' && (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    {/* Card Holder Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Holder Name
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={cardInfo.cardName}
                        onChange={handleCardChange}
                        placeholder="Enter card name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        required
                      />
                    </div>

                    {/* Card Number */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={cardInfo.cardNumber}
                        onChange={handleCardChange}
                        placeholder="Enter your card number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        required
                      />
                    </div>

                    {/* Expiry Date and CVV */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={cardInfo.expiryDate}
                          onChange={handleCardChange}
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={cardInfo.cvv}
                          onChange={handleCardChange}
                          placeholder="123"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                          required
                        />
                      </div>
                    </div>

                    {/* Save Card Option */}
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="saveCard"
                        checked={saveCard}
                        onChange={(e) => setSaveCard(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="saveCard" className="text-sm text-gray-700">
                        Save as default payment method
                      </label>
                    </div>
                  </div>
                </form>
              )}

              {/* Form Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t">
                <Link
                  to="/checkout"
                  className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={18} />
                  Back to Delivery
                </Link>
                <button
                  onClick={handleSubmit}
                  className="w-full sm:flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-medium"
                >
                  Complete Order
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h3 className="text-xl font-bold mb-6">Order Summary</h3>
              
              {/* Order Items */}
              <div className="space-y-4 mb-6">
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
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>₦{deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t">
                  <span>Total</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Escrow Protection */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="text-blue-600 shrink-0" size={24} />
                  <div>
                    <h4 className="font-bold text-blue-800">Escrow Protection Active</h4>
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

export default CheckoutPayment;