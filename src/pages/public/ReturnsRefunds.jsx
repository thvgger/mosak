import { Clock, Info } from 'lucide-react';
import React from 'react';

const ReturnsRefunds = () => {
  return (
    <div className='container mx-auto px-6 py-16'>
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Returns & Refunds
          </h2>
          <p className="text-gray-500 text-sm">
            Understand our refund policy and how to return products
          </p>
        </div>

        <button className="btn px-4">
          Invite Friends & Earn Points
        </button>
      </div>

      {/* Refund Eligibility */}
      <h3 className="font-semibold mb-2 text-lg">Refund Eligibility</h3>
      <hr className="bg-gray-200 h-px border-0 my-4" />

      <p className='text-sm text-gray-600 mb-3'>You may be eligible for a refund if:</p>
      <ul className="space-y-2 mb-10">
        <li className="flex items-start gap-2">
          <span className="text-indigo-500">•</span>
          <span className="text-gray-700">Item not received within the expected delivery timeframe</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-indigo-500">•</span>
          <span className="text-gray-700">Product is significantly different from the listing description</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-indigo-500">•</span>
          <span className="text-gray-700">Item arrived damaged, defective, or broken</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-indigo-500">•</span>
          <span className="text-gray-700">Wrong product was shipped</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-indigo-500">•</span>
          <span className="text-gray-700">Product has quality issues or doesn’t work as advertised</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-indigo-500">•</span>
          <span className="text-gray-700">Seller cancels the order after payment</span>
        </li>
      </ul>

      {/* How to Request a Refund */}
      <h3 className='font-semibold mb-2 text-lg'>How to Request a Refund</h3>
      <hr className="bg-gray-200 h-px border-0 my-4" />

      <p className='text-sm text-gray-600 mb-4'>To request a refund, follow these steps:</p>
      <div className="space-y-5 mb-10">
        <div className="flex gap-4">
          <div className="shrink-0 w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold">1</div>
          <div>
            <h4 className="font-semibold text-gray-800">Contact the Seller First</h4>
            <p className="text-sm text-gray-600">Message the seller to explain the issue. Many sellers will offer a replacement or refund immediately to maintain good ratings.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="shrink-0 w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold">2</div>
          <div>
            <h4 className="font-semibold text-gray-800">Submit Refund Request</h4>
            <p className="text-sm text-gray-600">If the seller doesn't respond within 48 hours, go to your Orders page and click "Request Refund" on the relevant order.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="shrink-0 w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold">3</div>
          <div>
            <h4 className="font-semibold text-gray-800">Provide Documentation</h4>
            <p className="text-sm text-gray-600">Upload clear photos showing the issue, screenshots of conversations, or any proof that supports your claim.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="shrink-0 w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold">4</div>
          <div>
            <h4 className="font-semibold text-gray-800">Seller Response</h4>
            <p className="text-sm text-gray-600">The seller has 48 hours to respond. They can approve the refund, offer a replacement, or provide their side of the story.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="shrink-0 w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold">5</div>
          <div>
            <h4 className="font-semibold text-gray-800">Refund Processing</h4>
            <p className="text-sm text-gray-600">Once approved, refunds are processed to your original payment method within 5-7 business days. For large purchases, bank processing may take longer.</p>
          </div>
        </div>
      </div>

      {/* Escrow-Based Refunds */}
      <div className="bg-indigo-50 rounded-xl p-6 mb-10 border border-indigo-100">
        <h3 className='font-semibold mb-3 text-lg text-indigo-800'>Escrow-Based Refunds</h3>
        <hr className="bg-indigo-200 h-px border-0 my-3" />
        <p className='text-sm text-gray-700 mb-3'>All purchases on Mosaik are protected by our escrow system:</p>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-indigo-500">✓</span>
            <span className="text-sm text-gray-700">Your payment is held securely until you confirm receipt and satisfaction</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-500">✓</span>
            <span className="text-sm text-gray-700">If you request a refund before approving delivery, funds remain in escrow</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-500">✓</span>
            <span className="text-sm text-gray-700">Automatic refund if seller doesn't ship within the agreed timeframe</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-500">✓</span>
            <span className="text-sm text-gray-700">Partial refunds are possible for items with minor issues</span>
          </li>
        </ul>
      </div>

      {/* Non-Refundable Items & Exceptions */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h3 className='font-semibold mb-3 text-lg text-gray-800'>Non-Refundable Items & Exceptions</h3>
        <hr className="bg-gray-300 h-px border-0 my-3" />
        <p className='text-sm text-gray-600 mb-3'>The following items are typically not eligible for refunds:</p>
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-start gap-2">
            <span className="text-red-400">✗</span>
            <span className="text-sm text-gray-700"><strong>Digital Products:</strong> eBooks, software licenses, digital downloads (once accessed)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-400">✗</span>
            <span className="text-sm text-gray-700"><strong>Custom/Made-to-Order Items:</strong> Personalized products made specifically for you</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-400">✗</span>
            <span className="text-sm text-gray-700"><strong>Perishable Goods:</strong> Food items, plants, fresh flowers</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-400">✗</span>
            <span className="text-sm text-gray-700"><strong>Intimate Items:</strong> Underwear, swimwear, cosmetics (if opened)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-400">✗</span>
            <span className="text-sm text-gray-700"><strong>Buyer's Remorse:</strong> Simply changing your mind after receiving the item</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-400">✗</span>
            <span className="text-sm text-gray-700"><strong>Late Claims:</strong> Refund requests made more than 14 days after delivery</span>
          </div>
        </div>
      </div>


      <div className="border border-yellow-300 bg-yellow-50 p-4 rounded-lg flex gap-3 mt-5">
        <span className="bg-yellow-700 rounded-md h-fit p-1">
          <Info className="text-white" size={18} />
        </span>
        <div>
          <p className="text-sm font-medium text-yellow-700">
            Return Shipping
          </p>
          <p className="text-sm text-gray-600 mt-1">
            For physical returns, shipping costs are typically the buyer's responsibility unless the item is defective or the seller made an error. Always confirm return shipping arrangements before sending items back.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReturnsRefunds;