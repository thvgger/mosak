import React, { useEffect, useState } from "react";
import { FileText, AlertTriangle, CheckCircle, Shield } from "lucide-react";

const Terms = () => {
  const [activeSection, setActiveSection] = useState("introduction");

  const sections = [
    { id: "introduction", label: "Introduction & Acceptance" },
    { id: "platform", label: "Nature of the Platform" },
    { id: "roles", label: "User Roles" },
    { id: "escrow", label: "Escrow & Payments" },
    { id: "wallet", label: "Mosalak Earnings & Wallet" },
    { id: "fees", label: "Fees & Charges" },
    { id: "kyc", label: "Verification & KYC" },
    { id: "community", label: "Community Rules" },
    { id: "disputes", label: "Dispute Resolution" },
    { id: "refunds", label: "Returns & Refunds" },
    { id: "offplatform", label: "Off-Platform Transactions" },
    { id: "termination", label: "Account Suspension" },
    { id: "liability", label: "Limitation of Liability" },
    { id: "changes", label: "Changes to Terms" },
    { id: "law", label: "Governing Law" },
  ];

  useEffect(() => {
    const allSections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-40% 0px -50% 0px",
        threshold: 0.1,
      },
    );

    allSections.forEach((section) => {
      if (section.id) observer.observe(section);
    });

    return () => {
      allSections.forEach((section) => {
        if (section.id) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="container mx-auto px-6 py-16">
      {/* HEADER */}
      <div className="mb-10 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Terms of Use
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            These Terms govern your access to Mosalak's marketplace, freelance
            services, escrow system, wallet system, and community features.
          </p>
          <p className="text-gray-600 text-xs mt-1">
            Last Updated: February 12, 2026
          </p>
        </div>

        <button className="btn px-4">Invite Friends & Earn Points</button>
      </div>

      {/* LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* SIDEBAR */}
        <div className="md:col-span-1">
          <div className="sticky top-24">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              On This Page
            </h3>

            <div className="space-y-1">
              {sections.map((item) => {
                const isActive = activeSection === item.id;

                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block rounded-md py-2 px-4 border-l-2 text-sm transition
                      ${
                        isActive
                          ? "bg-primary/10 text-primary border-primary font-medium"
                          : "text-gray-600 border-transparent hover:bg-gray-100"
                      }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="md:col-span-3 space-y-10">
          {/* INTRO */}
          <section id="introduction" className="scroll-mt-28">
            <h2 className="text-xl font-semibold mb-3">
              Introduction & Acceptance
            </h2>
            <hr className="bg-gray-300 h-px border-0 my-4" />

            <p className="text-sm text-gray-600 mb-6">
              Welcome to Mosalak. By accessing or using our platform, you
              acknowledge that you have read, understood, and agree to be bound
              by these Terms of Use ("Terms"), along with our Privacy Policy,
              Escrow Policy, and Dispute Resolution Framework.
              <br />
              <br />
              These Terms constitute a legally binding agreement between you
              ("User," "you," or "your") and Mosalak Technologies Limited
              ("Mosalak," "we," "us," or "our"), a company registered in
              Nigeria.
            </p>

            <p className="text-gray-700 mb-2">
              By creating an account, you confirm that:
            </p>
            <ul className="pl-5 space-y-2 mb-4 text-sm text-gray-600">
              <li className="list-disc!"> You are at least 18 years of age </li>
              <li className="list-disc!">
                You have the legal capacity to enter into binding contracts
              </li>
              <li className="list-disc!">
                You will comply with all applicable Nigerian laws and
                regulations
              </li>
              <li className="list-disc!">
                All information you provide is accurate and complete
              </li>
            </ul>

            <p>
              If you do not agree to these Terms, you must not access or use the
              Mosalak platform.
            </p>
          </section>

          {/* PLATFORM */}
          <section id="platform" className="scroll-mt-28">
            <h2 className="text-xl font-semibold mb-3">
              Nature of the Platform
            </h2>
            <hr className="bg-gray-300 h-px border-0 my-4" />

            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
              <li>Marketplace connecting buyers and freelancers</li>
              <li>Escrow-based payment system</li>
              <li>Dispute resolution support</li>
            </ul>

            <div className="border border-blue-200 bg-blue-50 p-4 rounded-lg flex gap-3 mt-5">
              <span>
                <FileText className="text-blue-600" size={20} />
              </span>
              <div>
                <p className="text-sm font-medium text-blue-700">
                  Important Notice
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <b>Mosalak is a technology platform and not a bank.</b> We do
                  not provide banking services, loans, or financial advice. Our
                  escrow and wallet services are designed to facilitate secure
                  peer-to-peer transactions within our marketplace ecosystem.
                </p>
              </div>
            </div>
          </section>

          {/* ROLES */}
          <section id="roles" className="scroll-mt-28">
            <h2 className="text-xl font-semibold mb-3">User Roles</h2>
            <hr className="bg-gray-300 h-px border-0 my-4" />

            <div className="bg-gray-50 border rounded-lg p-4 text-sm text-gray-600 space-y-2">
              <p>
                <strong>Buyers:</strong> Post jobs and pay for services
              </p>
              <p>
                <strong>Sellers:</strong> Deliver services
              </p>
              <p>
                <strong>Platform:</strong> Facilitates transactions only
              </p>
            </div>
          </section>

          {/* ESCROW */}
          <section id="escrow" className="scroll-mt-28">
            <h2 className="text-xl font-semibold mb-3">Escrow & Payments</h2>
            <hr className="bg-gray-300 h-px border-0 my-4" />

            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
              <li>Funds held until delivery confirmation</li>
              <li>No early withdrawal</li>
              <li>Disputes pause fund release</li>
            </ul>

            <div className="border border-amber-200 bg-amber-50 p-4 rounded-lg flex gap-3 mt-5">
              <Shield className="text-amber-600" size={20} />
              <div>
                <p className="text-sm font-medium text-amber-700">Important</p>
                <p className="text-sm text-gray-600">
                  Escrow protects both buyers and sellers.
                </p>
              </div>
            </div>
          </section>

          {/* WALLET */}
          <section id="wallet" className="scroll-mt-28">
            <h2 className="text-xl font-semibold mb-3">Earnings & Wallet</h2>
            <hr className="bg-gray-300 h-px border-0 my-4" />

            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
              <li>Earnings stored in wallet</li>
              <li>Withdrawals subject to verification</li>
              <li>Fraud checks may delay withdrawals</li>
            </ul>
          </section>

          {/* FEES */}
          <section id="fees" className="scroll-mt-28">
            <h2 className="text-xl font-semibold mb-3">Fees & Charges</h2>
            <hr className="bg-gray-300 h-px border-0 my-4" />

            <div className="border border-blue-200 bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                Platform fees may apply to transactions, withdrawals, and
                premium features.
              </p>
            </div>
          </section>

          {/* COMMUNITY */}
          <section id="community" className="scroll-mt-28">
            <h2 className="text-xl font-semibold mb-3">Community Rules</h2>
            <hr className="bg-gray-300 h-px border-0 my-4" />

            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
              <li>No fraud or scams</li>
              <li>No harassment</li>
              <li>No prohibited content</li>
            </ul>

            <div className="border border-red-200 bg-red-50 p-4 rounded-lg flex gap-3 mt-5">
              <AlertTriangle className="text-red-600" size={20} />
              <p className="text-sm text-gray-600">
                Violations may result in account suspension.
              </p>
            </div>
          </section>

          {/* LIABILITY */}
          <section id="liability" className="scroll-mt-28">
            <h2 className="text-xl font-semibold mb-3">
              Limitation of Liability
            </h2>
            <hr className="bg-gray-300 h-px border-0 my-4" />

            <p className="text-sm text-gray-600">
              Mosalak is not liable for user disputes, losses, or indirect
              damages.
            </p>
          </section>

          {/* CHANGES */}
          <section id="changes" className="scroll-mt-28">
            <h2 className="text-xl font-semibold mb-3">Changes to Terms</h2>
            <hr className="bg-gray-300 h-px border-0 my-4" />

            <p className="text-sm text-gray-600">
              Terms may be updated periodically. Continued use means acceptance.
            </p>
          </section>

          {/* LAW */}
          <section id="law" className="scroll-mt-28">
            <h2 className="text-xl font-semibold mb-3">Governing Law</h2>
            <hr className="bg-gray-300 h-px border-0 my-4" />

            <p className="text-sm text-gray-600">
              These terms are governed by Nigerian law.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;