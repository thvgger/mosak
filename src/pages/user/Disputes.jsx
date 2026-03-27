import React, { useState } from 'react'
import { 
  LayoutDashboard,
  ShoppingBag,
  MessageSquare,
  Wallet,
  HelpCircle,
  LogOut,
  Clock,
  AlertCircle,
  CheckCircle,
  X,
  Upload,
  FileText,
  ChevronRight,
  Info
} from 'lucide-react';
import car from "../../assets/car.png";

const Disputes = () => {
  const [selectedDispute, setSelectedDispute] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    reason: '',
    description: ''
  })

  const initialDisputes = [
    {
      id: 1,
      title: "HP Pavilion 15 Laptop",
      status: "in review",
      orderId: "ORD-2024-1547",
      date: "Dec 20, 2024",
      seller: "David's Crafts",
      reason: "Item not as described",
      icon: Clock,
      bgColor: "bg-orange-100",
      textColor: "text-orange-600",
      borderColor: "border-orange-200"
    },
    {
      id: 2,
      title: "HP Pavilion 15 Laptop",
      status: "Awaiting seller",
      orderId: "ORD-2024-1547",
      date: "Dec 20, 2024",
      seller: "Fatima's Crafts",
      reason: "Item not as described",
      icon: AlertCircle,
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-600",
      borderColor: "border-yellow-200"
    },
    {
      id: 3,
      title: "HP Pavilion 15 Laptop",
      status: "Resolved",
      orderId: "ORD-2024-1547",
      date: "Dec 20, 2024",
      seller: "Sarah's Crafts",
      reason: "Item not as described",
      icon: CheckCircle,
      bgColor: "bg-green-100",
      textColor: "text-green-600",
      borderColor: "border-green-200"
    }
  ]

  const handleViewClick = (dispute) => {
    setSelectedDispute(dispute)
    setIsModalOpen(true)
    // Reset form when opening new dispute
    setFormData({
      reason: '',
      description: ''
    })
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedDispute(null)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', { dispute: selectedDispute, ...formData })
    // You can add your API call here
    handleCloseModal()
  }

  const [disputes, setDisputes] = useState(initialDisputes);
  
  const toggleDisputes = () => {
    if (disputes.length > 0) {
      setDisputes([]);
    } else {
      setDisputes(initialDisputes);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Disputes & Issues</h1>
          <p className="text-sm text-gray-500 my-1">Track and manage any issues with your orders</p>
          <button className='btn text-xs' onClick={toggleDisputes}>
            {disputes.length > 0 ? "Hide Disputes" : "Show Disputes"}
          </button>
        </div>

        {/* Disputes List */}
        {disputes.length > 0 ? (
          <div className="">
            {initialDisputes.map((dispute) => {
              const IconComponent = dispute.icon
              return (
                <div 
                  key={dispute.id} 
                  className={`bg-white shadow-sm border-b-2 border-gray-200 p-4 md:p-6 hover:shadow-md transition-shadow`}
                >
                  <div className="w-full flex flex-wrap items-center justify-between gap-3">
                    <img src={car} alt='' className='w-20 h-full md:w-30 md:h-30 object-cover rounded-xl' />
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-0.5">
                        <h3 className="font-medium text-gray-800">{dispute.title}</h3>
                        <span className={`px-1 py-0.5 pr-2 rounded-full text-xs font-medium flex items-center gap-1 border text-nowrap ${dispute.bgColor} ${dispute.textColor} ${dispute.borderColor}`}>
                          <IconComponent className="w-4 h-4" />
                          {dispute.status}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-x-2 mb-0.5">
                        <div className='flex items-center gap-2'>
                          <p className="text-xs text-gray-500">Order ID</p>
                          <p className="text-sm font-medium text-gray-700">{dispute.orderId}</p>
                        </div>
                        <p className='text-gray-500 mb-1'>•</p>
                        <div className='flex items-center gap-2'>
                          <p className="text-xs text-gray-500">Date</p>
                          <p className="text-sm font-medium text-gray-700">{dispute.date}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-xs text-gray-500">Seller:</p>
                        <p className="text-sm text-gray-700">{dispute.seller}</p>
                      </div>

                      <div className='flex items-center gap-2'>
                        <p className="text-xs text-gray-700"><Info size={14} /></p>
                        <p className="text-sm text-gray-700">{dispute.reason}</p>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleViewClick(dispute)}
                      className="px-4 py-2 text-primary hover:bg-orange-50 rounded-lg text-sm font-medium transition-colors"
                    >
                      View
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16 border border-gray-200 rounded-lg">
            <span className='bg-primary/10 p-3 rounded-full flex w-fit mx-auto'>
              <Info size={30} className="" />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-gray-800">
              No Disputes Yet
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              You don't have any active disputes
            </p>
  
            {/* <button className="mt-4 px-4 py-2 bg-primary text-white rounded-lg">
              Go to Marketplace
            </button> */}
          </div>
        )}
      </div>

      {/* Dispute Modal */}
      {isModalOpen && selectedDispute && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-800 p-4">
          <div className="bg-white rounded-xl max-w-xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 relative">
              <div className='w-full bg-primary text-white p-6'>
                <h2 className="text-xl font-bold">Dispute Details - {selectedDispute.orderId}</h2>
                <p className="text-sm text-gray-100 mt-1">{selectedDispute.title}</p>
              </div>
              <button 
                onClick={handleCloseModal}
                className="absolute right-2 z-2 p-2 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                {/* Issue Summary */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Issue Summary</h3>
                  
                  {/* Dispute Reason */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dispute Reason <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                      required
                    >
                      <option value="">Select a Reason</option>
                      <option value="not_as_described">Item not as described</option>
                      <option value="damaged">Item damaged</option>
                      <option value="wrong_item">Wrong item received</option>
                      <option value="not_received">Item not received</option>
                      <option value="other">Other</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Choose the option that best describes your issue.</p>
                  </div>

                  {/* Describe the issue */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Describe the issue <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      maxLength={50}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                      placeholder="Explain what happened. Be clear and honest so we can help faster."
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1 text-right">{formData.description.length}/50</p>
                  </div>

                  {/* Upload evidence */}
                  <div className="mb-4">
                    <div className="block text-sm font-medium text-gray-700 mb-2">
                      Upload evidence <span className="text-gray-400">(optional)</span>
                    </div>
                    <label htmlFor='images' className="w-full flex flex-col border-2 border-dashed border-gray-300 rounded-lg p-8 text-center transition-all cursor-pointer">
                      <input 
                        type="file"
                        id="images"
                        multiple
                        accept="image/*"
                        hidden
                        required 
                        className='' 
                      />
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                      <span className="text-sm text-gray-600 mb-1">Drag and drop files here.</span>
                      <span className="text-xs text-gray-500">Images, videos, or PDFs • Max 10MB per file</span>
                    </label>
                    <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                      <Info size={14} /> Evidence helps us resolve disputes faster.
                    </p>
                  </div>
                </div>

                {/* What happens next */}
                <div className="mb-8 bg-primary/10 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">What happens next</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-100 text-primary rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-sm font-medium">1</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Mosalak notifies the seller</p>
                        <p className="text-sm text-gray-600">The seller will be informed about your dispute.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-100 text-primary rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-sm font-medium">2</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Seller responds</p>
                        <p className="text-sm text-gray-600">The seller has 48 hours to provide their side.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-100 text-primary rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-sm font-medium">3</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Mosalak reviews both sides</p>
                        <p className="text-sm text-gray-600">Our team carefully examines all evidence.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-100 text-primary rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-sm font-medium">4</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">A fair resolution is made</p>
                        <p className="text-sm text-gray-600">You'll be notified of the final decision.</p>
                      </div>
                    </div>
                  </div>
                  <a href="#" className="inline-flex items-center text-primary text-sm font-medium mt-4 hover:text-orange-700">
                    Read Full Policy
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors"
                  >
                    Submit Dispute
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Disputes