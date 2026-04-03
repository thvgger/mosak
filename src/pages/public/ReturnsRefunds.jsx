import React from 'react'

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

      <h3 className="font-semibold mb-2">Refund Eligibility</h3>
      <hr className="bg-gray-300 h-px border-0 my-4" />

      <p className='text-sm text-gray-600 mb-2'> You may be eligible for a refund if: </p>
      <ul className="pl-5 space-y-2 mb-6">
        <li className="list-disc!">Item not received within the expected delivery timeframe</li>
        <li className="list-disc!">Product is significantly different from the listing description</li>
        <li className="list-disc!">Item arrived damaged, defective, or broken</li>
        <li className="list-disc!">Wrong product was shipped</li>
        <li className="list-disc!">Product has quality issues or doesn't work as advertised</li>
        <li className="list-disc!">Seller cancels the order after payment</li>
      </ul>


      <h3 className='font-semibold mb-2'> How to Request a Refund </h3>
      <hr className="bg-gray-300 h-px border-0 my-4" />

      <p className='text-sm text-gray-600 mb-2'> To request a refund, follow these steps: </p>
      <ul>

      </ul>

    </div>
  )
}

export default ReturnsRefunds;