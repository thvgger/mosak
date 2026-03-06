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
  ChevronRight
} from 'lucide-react'

const Disputes = () => {
  const [selectedDispute, setSelectedDispute] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    reason: '',
    description: ''
  })

  const disputes = [
    {
      id: 1,
      title: "HP Pavilion 15 Laptop",
      status: "in review",
      orderId: "ORD-2024-1547",
      date: "Dec 20, 2024",
      seller: "Fatima's Crafts",
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
      seller: "Fatima's Crafts",
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

  return (
    <>
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Disputes & Issues</h1>
          <p className="text-sm text-gray-500 mt-1">Track and manage any issues with your orders</p>
        </div>

        {/* Disputes List */}
        <div className="">
          {disputes.map((dispute) => {
            const IconComponent = dispute.icon
            return (
              <div 
                key={dispute.id} 
                className={`bg-white shadow-sm border-b-2 border-gray-200 p-6 hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="font-semibold text-gray-800">{dispute.title}</h3>
                      <span className={`px-1.5 py-1 pr-2 rounded-full text-xs font-medium flex items-center gap-1 border ${dispute.bgColor} ${dispute.textColor} ${dispute.borderColor}`}>
                        <IconComponent className="w-3.5 h-3.5" />
                        {dispute.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-1">
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
                      <p className="text-xs text-gray-500">Seller</p>
                      <p className="text-sm text-gray-700">{dispute.seller}</p>
                    </div>

                    <div className='flex items-center gap-2'>
                      <p className="text-xs text-gray-500">Reason</p>
                      <p className="text-sm text-gray-700">{dispute.reason}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleViewClick(dispute)}
                    className="px-4 py-2 text-orange-600 hover:bg-orange-50 rounded-lg text-sm font-medium transition-colors"
                  >
                    View
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Dispute Modal */}
      {isModalOpen && selectedDispute && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-80 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Dispute Details - {selectedDispute.orderId}</h2>
                <p className="text-sm text-gray-500 mt-1">{selectedDispute.title}</p>
              </div>
              <button 
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Explain what happened. Be clear and honest so we can help faster."
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1 text-right">{formData.description.length}/50</p>
                  </div>

                  {/* Upload evidence */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload evidence <span className="text-gray-400">(optional)</span>
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-500 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                      <p className="text-sm text-gray-600 mb-1">Drag and drop files here.</p>
                      <p className="text-xs text-gray-500">Images, videos, or PDFs • Max 10MB per file</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Evidence helps us resolve disputes faster.</p>
                  </div>
                </div>

                {/* What happens next */}
                <div className="mb-8 bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">What happens next</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sm font-medium">1</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Mosalak notifies the seller</p>
                        <p className="text-sm text-gray-600">The seller will be informed about your dispute.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sm font-medium">2</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Seller responds</p>
                        <p className="text-sm text-gray-600">The seller has 48 hours to provide their side.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sm font-medium">3</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Mosalak reviews both sides</p>
                        <p className="text-sm text-gray-600">Our team carefully examines all evidence.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sm font-medium">4</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">A fair resolution is made</p>
                        <p className="text-sm text-gray-600">You'll be notified of the final decision.</p>
                      </div>
                    </div>
                  </div>
                  <a href="#" className="inline-flex items-center text-orange-600 text-sm font-medium mt-4 hover:text-orange-700">
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
                    className="px-6 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors"
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