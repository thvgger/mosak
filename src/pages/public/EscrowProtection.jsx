import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const steps = [
  {
    title: "Client Funds Escrow",
    desc: "Client deposits payment into secure escrow. Funds are locked until work is approved.",
  },
  {
    title: "Freelancer Starts Work",
    desc: "Freelancer begins project knowing payment is secured and protected.",
  },
  {
    title: "Work Delivered",
    desc: "Freelancer submits deliverables and marks milestone as complete.",
  },
  {
    title: "Client Reviews",
    desc: "Client has 5 days to review, approve, or request revisions.",
  },
  {
    title: "Funds Released",
    desc: "Payment released automatically or after client approval.",
  },
];

const rules = [
  {
    title: "When Funds Are Locked",
    items: [
      "When project starts",
      "During milestone work",
      "Until client review period",
      "Throughout dispute resolution",
    ],
  },
  {
    title: "When Funds Are Released",
    items: [
      "Client approves work",
      "Auto-release after 5 days",
      "Dispute settled in your favor",
      "Mutual agreement reached",
    ],
  },
  {
    title: "Auto-Release Timer",
    items: [
      "Starts after delivery",
      "5 days for client review",
      "Releases if no action taken",
      "Protects freelancer payment",
    ],
  },
  {
    title: "Dispute Triggers",
    items: [
      "Client rejects deliverables",
      "Work not as agreed",
      "Either party can open case",
      "Resolved in 3–5 business days",
    ],
  },
];

const faqs = [
  {
    q: "What if the client disappears?",
    a: "If a client doesn't respond within 5 days, funds are automatically released to you.",
  },
  {
    q: "What if the freelancer delays?",
    a: "You can request a refund if work hasn't started or open a dispute if deadlines are missed.",
  },
  {
    q: "What happens during dispute?",
    a: "Both parties submit evidence and a decision is made within 3–5 business days.",
  },
  {
    q: "Can I cancel escrow?",
    a: "Before work starts: yes. After work starts: only via dispute resolution.",
  },
  {
    q: "Are there escrow fees?",
    a: "No hidden fees. Escrow protection is included in platform service fees.",
  },
];

const EscrowProtection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            How Escrow Works
          </h2>
          <p className="text-gray-500">
            Secure payments for both clients and freelancers
          </p>
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
          Invite Friends & Earn Points
        </button>
      </div>

      {/* Timeline */}
      <div className="bg-gray-100 rounded-xl p-6 mb-10">
        <h3 className="text-center font-semibold mb-8">
          The Escrow Process
        </h3>

        <div className="flex justify-between items-start relative">
          {/* Line */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-blue-300"></div>

          {steps.map((step, i) => (
            <div key={i} className="relative text-center w-1/5">
              {/* Circle */}
              <div className="w-12 h-12 mx-auto bg-white border-4 border-blue-500 rounded-full flex items-center justify-center font-bold text-blue-600 relative z-10">
                {i + 1}
              </div>

              <h4 className="mt-4 font-semibold text-gray-900 text-sm">
                {step.title}
              </h4>
              <p className="text-xs text-gray-500 mt-2 px-2">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Rules */}
      <div className="bg-gray-100 rounded-xl p-6 mb-10">
        <h3 className="text-center font-semibold mb-6">
          Escrow Rules
        </h3>

        <div className="grid md:grid-cols-4 gap-4">
          {rules.map((rule, i) => (
            <div
              key={i}
              className="bg-white rounded-lg p-5 shadow-sm border"
            >
              <div className="w-8 h-8 bg-blue-600 text-white rounded-md flex items-center justify-center mb-3 text-sm font-bold">
                {i + 1}
              </div>

              <h4 className="font-semibold text-gray-900 mb-3">
                {rule.title}
              </h4>

              <ul className="text-sm text-gray-600 space-y-1">
                {rule.items.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-gray-100 rounded-xl p-6">
        <h3 className="text-center font-semibold mb-6">
          Frequently Asked Questions
        </h3>

        <div className="space-y-3 max-w-3xl mx-auto">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-lg border overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === i ? null : i)
                }
                className="w-full flex justify-between items-center p-4 text-left"
              >
                <span className="font-medium text-gray-900">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === i && (
                <div className="px-4 pb-4 text-sm text-gray-600">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EscrowProtection;