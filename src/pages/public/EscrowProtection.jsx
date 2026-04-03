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
    a: "If a client doesn't respond within 5 days of delivery, funds are automatically released to you. Your payment is protected even if the client becomes unresponsive.",
  },
  {
    q: "What if the freelancer delays?",
    a: "You can communicate via chat or request a refund if work hasn't started. Once work begins, milestone deadlines are tracked and you can open a dispute if agreed timelines aren't met.",
  },
  {
    q: "What happens during dispute?",
    a: "Both parties submit evidence through the platform. Mosalak's dispute team reviews all information within 3-5 business days and makes a fair decision based on the original contract terms and submitted work.",
  },
  {
    q: "Can I cancel escrow?",
    a: "Before work starts: Yes, with mutual agreement between both parties. After work starts: Only through the dispute resolution process to ensure fairness for both parties.",
  },
  {
    q: "Are there escrow fees?",
    a: "No additional fees for escrow protection. It's included in Mosalak's standard service fee, ensuring secure payments without any hidden costs.",
  },
];

const EscrowProtection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="container  mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            How Escrow Works
          </h2>
          <p className="text-gray-500 text-sm">
            Secure payments for both clients and freelancers
          </p>
        </div>

        <button className="btn px-4">
          Invite Friends & Earn Points
        </button>
      </div>

      {/* Timeline */}
      <div className="bg-gray-200 rounded-xl p-6 mb-10">
        <h3 className="text-center font-semibold mb-8">
          The Escrow Process
        </h3>

        <div className="flex justify-between items-start relative">
          {/* Line */}
          <div className="absolute top-6 left-0 right-0 h-px bg-primary"></div>

          {steps.map((step, i) => (
            <div key={i} className="relative text-center w-1/5">
              {/* Circle */}
              <div className="w-12 h-12 bg-white border border-primary rounded-full flex items-center justify-center font-bold text-blue-600 relative z-10">
                {i + 1}
              </div>

              <h4 className="mt-4 font-semibold text-gray-900 text-sm text-start">
                {step.title}
              </h4>
              <p className="text-start text-xs text-gray-500 mt-2">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Rules */}
      <div className="bg-gray-200 rounded-xl p-6 mb-10">
        <h3 className="text-center font-semibold mb-6">
          Escrow Rules
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {rules.map((rule, i) => (
            <div
              key={i}
              className="bg-white rounded-md p-5 shadow-sm border border-gray-200"
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
      <div className="bg-gray-200 rounded-xl p-6 mb-10">
        <h3 className="text-center font-semibold mb-6">
          Frequently Asked Questions
        </h3>

        <div className="space-y-0 max-w-3xl mx-auto bg-white rounded-lg border border-gray-300 p-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="overflow-hidden border-b last:border-0 border-gray-300"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === i ? null : i)
                }
                className="w-full flex justify-between items-center text-left py-5"
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
                <div className="px-0 pb-4 text-sm text-gray-600">
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