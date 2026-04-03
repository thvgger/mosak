import React, { useState } from 'react';
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Mail, 
  Phone, 
  UserCheck, 
  FileText, 
  Info, 
  Upload, 
  UserRound,
  ArrowLeft,
  ArrowRight,
  Camera
} from 'lucide-react';

const Verification = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    identityDocument: null,
    addressDocument: null,
    selfie: null
  });
  const [errors, setErrors] = useState({});

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
      status: 'pending',
      value: '+234 *** *** 5678',
      message: 'Verification in progress'
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
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, [fieldName]: 'Please upload a valid image file (JPEG, PNG)' }));
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, [fieldName]: 'File size must be less than 5MB' }));
        return;
      }
      
      setFormData(prev => ({ ...prev, [fieldName]: file }));
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    
    if (!formData.identityDocument) {
      newErrors.identityDocument = 'Government ID is required';
    }
    
    if (!formData.addressDocument) {
      newErrors.addressDocument = 'Proof of address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.selfie) {
      newErrors.selfie = 'Selfie photo is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep2()) {
      // Here you would typically upload files and submit to your backend
      try {
        // Simulate API call
        const formDataToSubmit = new FormData();
        formDataToSubmit.append('phoneNumber', formData.phoneNumber);
        formDataToSubmit.append('identityDocument', formData.identityDocument);
        formDataToSubmit.append('addressDocument', formData.addressDocument);
        formDataToSubmit.append('selfie', formData.selfie);
        
        // await submitVerification(formDataToSubmit);
        
        setSubmitted(true);
      } catch (error) {
        console.error('Submission error:', error);
      }
    }
  };

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
      {/* Info Banner */}
      <div className="bg-orange-100 p-6 rounded-xl border border-orange-700 flex items-start justify-start gap-4">
        <Info size={24} className="text-orange-700 shrink-0" />
        <div className='space-y-1'>
          <h2 className="font-semibold text-orange-700">Verification Required</h2>
          <p className="text-xs text-gray-500">
            Verify your account to unlock exclusive benefits and increase your trust score.
          </p>
        </div>
      </div>

      {/* Verification List */}
      {/* <div className="bg-white rounded-xl border border-gray-200 divide-y">
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
      </div> */}

      {/* Benefits Section */}
      <div className="bg-white p-6 rounded-xl border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-4">Verification Benefits</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-center gap-2">
            <CheckCircle size={14} />
            Access to premium sellers
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle size={14} />
            Priority customer support
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle size={14} />
            Enhanced buyer protection
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle size={14} />
            Faster dispute resolution
          </li>
        </ul>
      </div>

      {/* Badge Subscription */}
      <div className="bg-white p-6 rounded-xl border border-purple-700 flex items-start justify-between gap-4">
        <span className='bg-purple-800 rounded-full p-2'> 
          <CheckCircle size={24} className="text-white" />
        </span>
        <div className='space-y-0.5 flex-1'>
          <h3 className="font-medium">No Active Badge</h3>
          <p className="text-xs text-gray-500">
            Subscribe to display a verified badge on your profile
          </p>
        </div>
        <button className='btn'>
          Subscribe
        </button>
      </div>

      {/* Multi-Step Verification Form */}
      {!submitted ? (
        <div className='border border-gray-300 p-6 rounded-xl flex flex-col gap-6'>
          {/* Step Indicator */}
          <div className="text-center">
            <small className='text-xs text-gray-500'>
              STEP {currentStep} OF 2
            </small>
            <div className='flex items-center justify-center gap-2 mt-2'>
              <span className={`h-2 rounded-full transition-all ${
                currentStep === 1 ? 'w-6.5 bg-primary' : 'w-2.5 bg-primary/40'
              }`}></span>
              <span className={`h-2 rounded-full transition-all ${
                currentStep === 2 ? 'w-6.5 bg-primary' : 'w-2.5 bg-primary/40'
              }`}></span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <>
                <div className='bg-white border border-gray-300 p-6 rounded-xl space-y-6'>
                  <div>
                    <h3 className='text-lg font-semibold mb-4'>Phone Verification</h3>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Phone Number *
                    </label>
                    <input 
                      type='tel'
                      name='phoneNumber'
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className={`bg-blue-50 border ${
                        errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                      } rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                      placeholder='+234-7897657890'
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
                    )}
                  </div>
                </div>

                <div className='bg-white border border-gray-300 p-6 rounded-xl space-y-6'>
                  <h3 className='text-lg font-semibold'>Required Documents</h3>
                  
                  {/* Government ID Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Government-issued ID *
                    </label>
                    <label
                      htmlFor="identityDocument"
                      className={`flex flex-col w-full h-40 text-center gap-1.5 items-center justify-center border-dashed border-2 ${
                        errors.identityDocument ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg p-4 cursor-pointer bg-gray-100 hover:bg-gray-200 transition-all duration-300`}
                    >
                      <Upload size={34} strokeWidth={1.5} />
                      {formData.identityDocument ? (
                        <p className="text-green-600">✓ {formData.identityDocument.name}</p>
                      ) : (
                        <>
                          <p>Upload Government-issued ID</p>
                          <small className='text-xs'>Passport, Driver's License, or National ID</small>
                        </>
                      )}
                      <input
                        onChange={(e) => handleFileChange(e, 'identityDocument')}
                        type="file"
                        id="identityDocument"
                        accept="image/*"
                        hidden
                      />
                    </label>
                    {errors.identityDocument && (
                      <p className="text-red-500 text-xs mt-1">{errors.identityDocument}</p>
                    )}
                  </div>

                  {/* Address Proof Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Proof of Address *
                    </label>
                    <label
                      htmlFor="addressDocument"
                      className={`flex flex-col w-full h-40 text-center gap-1.5 items-center justify-center border-dashed border-2 ${
                        errors.addressDocument ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg p-4 cursor-pointer bg-gray-100 hover:bg-gray-200 transition-all duration-300`}
                    >
                      <Upload size={34} strokeWidth={1.5} />
                      {formData.addressDocument ? (
                        <p className="text-green-600">✓ {formData.addressDocument.name}</p>
                      ) : (
                        <>
                          <p>Upload Proof of Address</p>
                          <small className='text-xs'>Utility bill or bank statement (last 3 months)</small>
                        </>
                      )}
                      <input
                        onChange={(e) => handleFileChange(e, 'addressDocument')}
                        type="file"
                        id="addressDocument"
                        accept="image/*"
                        hidden
                      />
                    </label>
                    {errors.addressDocument && (
                      <p className="text-red-500 text-xs mt-1">{errors.addressDocument}</p>
                    )}
                  </div>
                </div>

                <button 
                  type="button" 
                  onClick={handleNext} 
                  className='btn w-full flex items-center justify-center gap-2'
                >
                  Next Step
                  <ArrowRight size={18} />
                </button>
              </>
            )}

            {/* Step 2: Selfie Verification */}
            {currentStep === 2 && (
              <>
                <div className='bg-white border border-gray-300 rounded-xl space-y-6 p-6'>
                  <h3 className='text-lg font-semibold'>Selfie Verification</h3>
                  <p className="text-sm text-gray-600">
                    Please take a clear selfie holding your government ID for verification
                  </p>
                  
                  <div>
                    <label
                      htmlFor="selfie"
                      className={`flex flex-col w-40 mx-auto h-40 text-center gap-1.5 items-center justify-center border-dashed border-2 ${
                        errors.selfie ? 'border-red-500' : 'border-gray-300'
                      } rounded-full p-4 cursor-pointer bg-gray-100 hover:bg-gray-200 transition-all duration-300`}
                    >
                      {formData.selfie ? (
                        <img 
                          src={URL.createObjectURL(formData.selfie)} 
                          alt="Selfie preview" 
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <>
                          <Camera size={32} strokeWidth={1.5} />
                          <small className='text-xs text-center'>Click to take a selfie</small>
                        </>
                      )}
                      <input
                        onChange={(e) => handleFileChange(e, 'selfie')}
                        type="file"
                        id="selfie"
                        accept="image/*"
                        capture="user"
                        hidden
                      />
                    </label>
                    {errors.selfie && (
                      <p className="text-red-500 text-xs text-center mt-2">{errors.selfie}</p>
                    )}
                  </div>
                </div>

                <div className='flex items-center gap-4'>
                  <button 
                    type="button" 
                    onClick={handleBack} 
                    className='w-full btn btn-tertiary flex items-center justify-center gap-2'
                  >
                    <ArrowLeft size={18} />
                    Back
                  </button>
                  <button type="submit" className='w-full btn'>
                    Submit Verification
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      ) : (
        /* Success State */
        <div className='bg-white p-8 rounded-xl border border-gray-300 text-center text-gray-500 space-y-4'>
          <CheckCircle size={64} className='text-primary mx-auto' />
          <div className='space-y-2'>
            <h2 className='text-xl font-semibold text-primary'>Verification Submitted!</h2>
            <p className='text-gray-600'>Your documents are being reviewed. You'll be notified within 24-48 hours.</p>
            <div className='inline-flex items-center gap-2 bg-yellow-100 rounded-full px-4 py-2 mt-2'>
              <Clock size={16} className="text-yellow-600" />
              <span className='text-yellow-700 text-sm font-medium'>Pending Review</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Verification;