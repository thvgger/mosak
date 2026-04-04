import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    location: '',
    role: '',
    issueCategory: '',
    message: '',
    acceptTerms: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const roles = ['Customer', 'Partner', 'Developer', 'Reseller', 'Other'];
  const issueCategories = ['Technical Support', 'Billing', 'Account Management', 'Feature Request', 'Bug Report', 'General Inquiry'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      // Reset form after successful submission
      setFormData({
        fullName: '',
        email: '',
        location: '',
        role: '',
        issueCategory: '',
        message: '',
        acceptTerms: false
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-16">
      {/* HEADER */}
      <div className="mb-10 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Contact Support
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Our team is here to help. We typically respond within 24 hours.
          </p>
        </div>

        <button className="btn px-4">
          Invite Friends & Earn Points
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-8 py-8 space-y-6 border border-gray-300 rounded-md bg-white shadow">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="John Doe"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="john@example.com"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="City, Country"
          />
        </div>

        {/* I am a (Role) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            I am a <span className="text-red-500">*</span>
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
          >
            <option value="">Select your role</option>
            {roles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>

        {/* Issue Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Issue Category <span className="text-red-500">*</span>
          </label>
          <select
            name="issueCategory"
            value={formData.issueCategory}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
          >
            <option value="">Select issue type</option>
            {issueCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
            placeholder="Describe your issue in detail..."
          />
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              required
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          <div className="ml-2">
            <label className="text-sm text-gray-700 flex items-center gap-1">
              I accept the terms{' '}
              <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
                Read our T&Cs
              </a>
            </label>
          </div>
        </div>

        {/* Submit Button & Status */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit Request'
            )}
          </button>

          {submitStatus === 'success' && (
            <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
              ✓ Request submitted successfully! Our team will contact you soon.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              ✗ Something went wrong. Please try again.
            </div>
          )}
        </div>
      </form>

      {/* Footer note */}
      {/* <p className="text-center text-gray-500 text-sm mt-6">
        Need immediate assistance? Call us at <span className="font-medium">+1 (800) 123-4567</span>
      </p> */}
    </div>
  );
};

export default Contact;