import React from 'react';
import { Shield, CheckCircle, XCircle, Clock, Mail, Phone, UserCheck, FileText } from 'lucide-react';

const Verifications = () => {
  const verifications = [
    {
      type: 'Email Address',
      icon: Mail,
      status: 'verified',
      value: 'd********l@example.com',
      date: 'Jan 15, 2026'
    },
    {
      type: 'Phone Number',
      icon: Phone,
      status: 'verified',
      value: '+234 *** *** 5678',
      date: 'Jan 20, 2026'
    },
    {
      type: 'Identity Verification',
      icon: UserCheck,
      status: 'pending',
      value: 'Government ID submitted',
      message: 'Under review (2-3 business days)'
    },
    {
      type: 'Address Verification',
      icon: FileText,
      status: 'not_started',
      value: 'Utility bill required'
    },
    {
      type: 'Business Verification',
      icon: Shield,
      status: 'not_started',
      value: 'For sellers with registered business'
    }
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'verified':
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-600 text-xs font-medium rounded-full">
            <CheckCircle size={12} />
            Verified
          </span>
        );
      case 'pending':
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-600 text-xs font-medium rounded-full">
            <Clock size={12} />
            Pending
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
            <XCircle size={12} />
            Not Started
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Verifications</h1>

      {/* Verification Progress */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold">Verification Level</h2>
            <p className="text-sm text-gray-500">Complete verifications to increase your limits</p>
          </div>
          <div className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
            Level 1
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span>Overall Progress</span>
            <span className="font-medium">40%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: '40%' }}></div>
          </div>
        </div>
      </div>

      {/* Verification List */}
      <div className="bg-white rounded-xl border border-gray-200 divide-y">
        {verifications.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${
                  item.status === 'verified' ? 'bg-green-100' :
                  item.status === 'pending' ? 'bg-yellow-100' : 'bg-gray-100'
                }`}>
                  <Icon size={20} className={
                    item.status === 'verified' ? 'text-green-600' :
                    item.status === 'pending' ? 'text-yellow-600' : 'text-gray-600'
                  } />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold">{item.type}</h3>
                    {getStatusBadge(item.status)}
                  </div>
                  <p className="text-sm text-gray-600">{item.value}</p>
                  {item.message && (
                    <p className="text-xs text-gray-400 mt-1">{item.message}</p>
                  )}
                  {item.date && (
                    <p className="text-xs text-gray-400 mt-1">Verified on {item.date}</p>
                  )}
                </div>
              </div>
              {item.status !== 'verified' && (
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 text-sm whitespace-nowrap">
                  Start Verification
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Limits Info */}
      <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">Verification Benefits</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-center gap-2">
            <CheckCircle size={14} />
            Higher transaction limits
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle size={14} />
            Faster withdrawals
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle size={14} />
            Access to seller features
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Verifications;