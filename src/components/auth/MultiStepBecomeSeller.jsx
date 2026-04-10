import { useState, useEffect } from "react";
import {
  Store,
  Building2,
  MapPin,
  FileText,
  Phone,
  Mail,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";

const MultiStepBecomeSeller = ({ onClose, onSubmit, loading, user }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    business_name: "",
    business_address: "",
    business_description: "",
    business_phone: user?.phone_number || "",
    business_email: user?.email || "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load existing profile data if user already has seller role but incomplete profile
  // Add a check at the beginning of MultiStepBecomeSeller component
  useEffect(() => {
    // Check if user already has complete seller profile
    if (
      user?.business_profile?.business_name &&
      user?.business_profile?.business_address &&
      user?.business_profile?.business_description
    ) {
      // Profile is complete, redirect to seller dashboard
      onClose();
      window.location.href = "/seller";
    }

    // Load existing profile data if any
    const sellerProfile = user?.business_profile;
    if (sellerProfile) {
      setFormData({
        business_name: sellerProfile.business_name || "",
        business_address: sellerProfile.business_address || "",
        business_description: sellerProfile.business_description || "",
        business_phone:
          sellerProfile.business_phone || user?.phone_number || "",
        business_email: sellerProfile.business_email || user?.email || "",
      });

      // If profile has some data but incomplete, pre-fill and show appropriate step
      if (
        sellerProfile.business_name &&
        sellerProfile.business_address &&
        !sellerProfile.business_description
      ) {
        setStep(2); // Skip to description if business info is already there
      }
    }
  }, [user, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const validateStep1 = () => {
    if (!formData.business_name.trim()) {
      setError("Business name is required");
      return false;
    }
    if (!formData.business_address.trim()) {
      setError("Business address is required");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.business_description.trim()) {
      setError("Business description is required");
      return false;
    }
    if (
      formData.business_phone &&
      !/^[\d\s+()-]{10,}$/.test(formData.business_phone)
    ) {
      setError("Please enter a valid phone number");
      return false;
    }
    if (
      formData.business_email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.business_email)
    ) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
      setError("");
    }
  };

  const handleBack = () => {
    setStep(1);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep2()) return;

    setIsSubmitting(true);

    // Prepare data according to API requirements
    const businessData = {
      business_name: formData.business_name,
      business_address: formData.business_address,
      business_description: formData.business_description,
      // Note: Phone and email might need separate API calls if your backend doesn't accept them
      // For now, we'll send only what the API expects
    };

    const result = await onSubmit(businessData);
    setIsSubmitting(false);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        onClose();
        // Redirect to seller dashboard after successful onboarding
        window.location.href = "/seller";
      }, 2000);
    } else {
      setError(
        result.error || "Failed to create seller account. Please try again.",
      );
    }
  };

  if (success) {
    return (
      <div className="bg-white rounded-xl p-6 md:p-8 max-w-md w-full shadow-xl text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Welcome to Mosak Hub!</h2>
        <p className="text-gray-600 mb-4">
          Your seller account has been created successfully!
        </p>
        <p className="text-sm text-gray-500">
          Redirecting you to your seller dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 md:p-8 max-h-[90vh] max-w-md w-full shadow-xl overflow-y-auto scrollbar-hide relative">
      {/* Progress Steps */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span
            className={`text-xs font-medium ${step >= 1 ? "text-primary" : "text-gray-400"}`}
          >
            Business Info
          </span>
          <span
            className={`text-xs font-medium ${step >= 2 ? "text-primary" : "text-gray-400"}`}
          >
            Description
          </span>
        </div>
        <div className="flex gap-1">
          <div
            className={`h-1 flex-1 rounded-full transition-all ${step >= 1 ? "bg-primary" : "bg-gray-200"}`}
          />
          <div
            className={`h-1 flex-1 rounded-full transition-all ${step >= 2 ? "bg-primary" : "bg-gray-200"}`}
          />
        </div>
      </div>

      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Store size={32} className="text-primary" />
        </div>
        <h2 className="text-xl font-semibold mb-2">
          {step === 1
            ? "Become a Seller"
            : "Tell customers about your business"}
        </h2>
        <p className="text-sm text-gray-600">
          {step === 1
            ? "Start selling your products and grow your business on Mosak Hub"
            : "Help customers understand what makes your business unique"}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded text-sm border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="space-y-4">
            {/* Business Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Building2
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  name="business_name"
                  value={formData.business_name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your business/store name"
                  required
                  disabled={loading || isSubmitting}
                  autoFocus
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                This will be your store name on Mosak Hub
              </p>
            </div>

            {/* Business Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-3 top-3 text-gray-400"
                />
                <textarea
                  name="business_address"
                  value={formData.business_address}
                  onChange={handleChange}
                  rows="2"
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Full business address"
                  required
                  disabled={loading || isSubmitting}
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            {/* Business Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Description <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FileText
                  size={18}
                  className="absolute left-3 top-3 text-gray-400"
                />
                <textarea
                  name="business_description"
                  value={formData.business_description}
                  onChange={handleChange}
                  rows="6"
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Describe what you sell, your values, shipping policy, return policy, etc."
                  required
                  disabled={loading || isSubmitting}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                This will appear on your store page and help customers learn
                about you
              </p>
            </div>

            {/* Note about contact info */}
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-800">
                <span className="font-semibold">Note:</span> Your business
                contact information will be managed in your account settings
                after your store is created.
              </p>
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-6">
          {step === 2 && (
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 btn btn-secondary"
              disabled={loading || isSubmitting}
            >
              <ArrowLeft size={16} className="inline mr-2" />
              BACK
            </button>
          )}

          {step === 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex-1 btn"
              disabled={loading || isSubmitting}
            >
              CONTINUE
              <ArrowRight size={16} className="inline ml-2" />
            </button>
          ) : (
            <button
              type="submit"
              className="flex-1 btn"
              disabled={loading || isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                  CREATING YOUR STORE...
                </span>
              ) : (
                "CREATE YOUR STORE"
              )}
            </button>
          )}
        </div>
      </form>

      <div className="text-center mt-6">
        <p className="text-xs text-gray-400">
          Please complete all steps. Your store will be created after
          submission.
        </p>
      </div>

      <div className="text-center mt-4">
        <p className="text-xs text-gray-500">
          By becoming a seller, you agree to our
          <a href="/terms" className="text-primary hover:underline ml-1">
            Seller Terms of Service
          </a>
        </p>
      </div>
    </div>
  );
};

export default MultiStepBecomeSeller;
