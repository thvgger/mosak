import React, { useState } from "react";

const faqData = [
  {
    question: "How do I create a freelancer profile?",
    answer: (
      <>
        <p className="mb-3">Creating your freelancer profile is simple:</p>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Go to Settings → Profile</li>
          <li>Complete all required fields</li>
          <li>Upload portfolio samples</li>
          <li>Set your hourly rate</li>
          <li>Add certifications (optional)</li>
        </ol>
        <p className="mt-3">
          A complete profile increases your chances of getting hired.
        </p>
      </>
    ),
    date: "January 28, 2026",
  },
  {
    question: "How do I get a job on Mosalak?",
    answer: (
      <>
        <ul className="list-disc pl-5 space-y-1">
          <li>Browse job listings</li>
          <li>Submit proposals</li>
          <li>Get invited by clients</li>
          <li>Offer consultations</li>
        </ul>
        <p className="mt-3 text-sm">
          Pro tip: Respond within 24 hours for better visibility.
        </p>
      </>
    ),
    date: "January 25, 2026",
  },
  {
    question: "How do payments work?",
    answer: (
      <>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Client pays upfront (escrow)</li>
          <li>You complete the work</li>
          <li>Client approves</li>
          <li>Funds released to your wallet</li>
        </ol>
      </>
    ),
    date: "January 28, 2026",
  },
  {
    question: "When can I withdraw my earnings?",
    answer: (
      <>
        <ul className="list-disc pl-5 space-y-1">
          <li>Minimum balance required</li>
          <li>Funds must be cleared</li>
          <li>Account must be verified</li>
        </ul>
      </>
    ),
    date: "January 30, 2026",
  },
  {
    question: "How do consultations work?",
    answer: (
      <>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Enable consultations</li>
          <li>Set your rate</li>
          <li>Choose availability</li>
          <li>Client books & pays</li>
          <li>Session completed</li>
        </ol>
      </>
    ),
    date: "January 22, 2026",
  },
  {
    question: "How do I boost my gig visibility?",
    answer: (
      <>
        <ul className="list-disc pl-5 space-y-1">
          <li>Profile Boost</li>
          <li>Featured Gig</li>
          <li>Earn points through quality work</li>
        </ul>
      </>
    ),
    date: "January 20, 2026",
  },
];

const FaqItem = ({ item, isOpen, onClick }) => {
  return (
    <div className="border border-gray-300 rounded-lg bg-white">
      <button
        onClick={onClick}
        className="w-full text-left p-4 flex justify-between items-center"
      >
        <h3 className="font-medium text-gray-800">{item.question}</h3>
        <span className="text-gray-500">{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen && (
        <div className="px-4 pb-4 text-sm text-gray-600 border-t border-gray-300">
          <div className="pt-3">{item.answer}</div>
          <p className="text-xs text-gray-400 mt-3">
            Last updated: {item.date}
          </p>
        </div>
      )}
    </div>
  );
};

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const tabs = [
    "FAQs for Freelancers",
    "FAQs for Clients",
    "FAQs for Sellers",
    "FAQs for Buyers",
  ];

  return (
    <div className="container mx-auto px-6 py-16">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          FAQs for Freelancers
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          Everything you need to know about working as a freelancer on Mosalak
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* SIDEBAR */}
        <div className="md:col-span-1">
          <div className="sticky top-24">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              FAQs
            </h3>

            <div className="space-y-1">
              {tabs.map((tab, i) => (
                <button
                  key={i}
                  className={`block w-full text-left px-4 py-2 rounded-md text-sm transition
                    ${
                      i === 0
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="md:col-span-3 space-y-6">
          {/* INTRO CARD */}
          <div className="bg-gray-100 rounded-xl p-6 text-center">
            <h2 className="font-semibold text-gray-800">
              Frequently Asked Questions for Freelancers
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Everything you need to know about working as a freelancer on Mosalak
            </p>
          </div>

          {/* FAQ LIST */}
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <FaqItem
                key={index}
                item={item}
                isOpen={openIndex === index}
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqs;