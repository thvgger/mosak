import React, { useEffect, useState } from "react";
import {
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";

const TrustSafety = () => {
  const [activeSection, setActiveSection] = useState("philosophy");

    const list = [
    { id: "philosophy", label: "Our Trust Philosophy" },
    { id: "identity", label: "Identity & Verification" },
    { id: "escrow", label: "Escrow Protection System" },
    { id: "platform", label: "Platform Monitoring" },
    { id: "community", label: "Community Moderation" },
    { id: "warning", label: "Off-Platform Risk Warning" },
    { id: "data-protection", label: "Data Protection" },
    { id: "commitment", label: "Our Commitment" },
  ];

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-40% 0px -50% 0px", // controls when it becomes active
        threshold: 0.1,
      }
    );

    sections.forEach((section) => {
      if (section.id) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section.id) observer.unobserve(section);
      });
    };
  }, []);


  return (
    <div className="container mx-auto px-6 py-16">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Trust & Safety
          </h1>
          <p className="text-gray-600 mt-1 max-w-2xl">
            Mosalak operates as a structured, transparent platform with multiple protection layers designed to reduce fraud, protect transactions, and maintain marketplace integrity.
          </p>

          {/* TAGS */}
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="flex items-center gap-1 text-sm bg-green-100/80 text-dark pr-3.5 pl-2 py-1 rounded-full">
              <CheckCircle size={14} className="text-green-700" /> Escrow Protected
            </span>
            <span className="flex items-center gap-1 text-sm bg-green-100/80 text-dark pr-3.5 pl-2 py-1 rounded-full">
              <CheckCircle size={14} className="text-green-700" /> Verified Users
            </span>
            <span className="flex items-center gap-1 text-sm bg-green-100/80 text-dark pr-3.5 pl-2 py-1 rounded-full">
              <CheckCircle size={14} className="text-green-700" /> Structured Dispute System
            </span>
          </div>
        </div>

        <button className="btn px-4">
          Invite Friends & Earn Points
        </button>
      </div>

      {/* MAIN LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
        {/* SIDEBAR */}
        <div className="md:col-span-1">
          <div className="bg-white sticky top-22">
            <h3 className="text-base font-semibold text-gray-700 mb-3">
              On This Page
            </h3>
            <ul className="space-y-1 text-sm flex flex-col">
              {list.map((item) => {
                const isActive = activeSection === item.id;

                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`w-full rounded-md py-2 px-4 border-l-2 transition-all duration-200
                      ${
                        isActive
                          ? "bg-primary/10 text-primary border-primary font-medium"
                          : "text-gray-600 border-transparent hover:bg-gray-100"
                      }
                    `}
                  >
                    {item.label}
                  </a>
                );
              })}
            </ul>
          </div>
        </div>

        {/* CONTENT */}
        <div className="md:col-span-3 space-y-10">

          {/* SECTION */}
          <section id="philosophy" className="scroll-mt-28">
            <h2 className="text-xl font-semibold mb-3">
              Our Trust Philosophy
            </h2>
            <hr className="w-full h-px border-0 bg-gray-300 my-4"/>
            <p className="text-gray-600 mb-4">
              Mosalak is built on the principle that online transactions should be secure, transparent, and fair. We achieve this through a combination of technology, human oversight, and structured processes.
            </p>

            {/* INFO BOX */}
            <div className="border border-blue-200 bg-blue-50 p-4 rounded-lg flex gap-3">
              <ShieldCheck className="text-blue-600" size={20} />
              <div>
                <p className="text-sm font-medium text-blue-700">
                  Structured Protection
                </p>
                <p className="text-sm text-gray-600">
                  Mosalak is a structured platform designed to reduce fraud, protect payments, and ensure accountability through escrow, verification, and dispute resolution systems.
                </p>
              </div>
            </div>
          </section>

          {/* IDENTITY */}
          <section id="identity" className="scroll-mt-28">
            <h2 className="text-xl font-semibold mb-3">
              Identity & Verification
            </h2>
            <hr className="w-full h-px border-0 bg-gray-300 my-4"/>
            <p className="text-sm text-gray-600 mb-4">
              All users on Mosalak undergo verification processes to establish authenticity and accountability.
            </p>
            <ul className="list-disc! pl-5 space-y-2 text-gray-600 text-sm">
              <li className="list-disc!">Phone number verification required for all accounts</li>
              <li className="list-disc!">Email verification for communication and notifications</li>
              <li className="list-disc!">Bank verification number (BVN) required for withdrawals</li>
              <li className="list-disc!">Sellers must complete profile verification before accepting jobs</li>
              <li className="list-disc!">Additional document verification for high-value transactions</li>
              <li className="list-disc!">Continuous monitoring for suspicious activity</li>
            </ul>
          </section>

          {/* ESCROW */}
          <section id="escrow" className="scroll-mt-28">
            <h2 className="text-xl font-semibold mb-3">
              Escrow Protection System
            </h2>
            <hr className="w-full h-px border-0 bg-gray-300 my-4"/>
            <p className="text-sm text-gray-600 mb-4">
              Every transaction on Mosalak is protected by our escrow system. Funds are held securely until work is delivered and confirmed.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm mb-3">
              <li>Buyer funds are secured immediately upon payment</li>
              <li>Seller cannot access funds until buyer confirms delivery</li>
              <li>Automatic release after 7 days if no dispute is raised</li>
              <li>Structured dispute resolution for disagreements</li>
              <li>Escrow protection applies to all on-platform transactions</li>
            </ul>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Learn more:</strong> Visit our dedicated <Link className="text-primary underline" to="/escrow-protection">Escrow Protection</Link> page for detailed information.
            </p>
          </section>

          {/* MONITORING */}
          <section id="platform" className="scroll-mt-28">
            <h2 className="text-xl font-semibold mb-3">
              Platform Monitoring
            </h2>
            <hr className="w-full h-px border-0 bg-gray-300 my-4"/>
            <p className="text-sm text-gray-600 mb-4">
              Mosalak employs automated and manual monitoring systems to detect and prevent fraudulent activity.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm">
              <li>Automated fraud detection algorithms</li>
              <li>Pattern recognition for suspicious transactions</li>
              <li>Review of flagged accounts and activities</li>
              <li>IP and device tracking for security</li>
              <li>Transaction velocity monitoring</li>
              <li>Manual review of high-risk transactions</li>
            </ul>
          </section>

          {/* COMMUNITY */}
          <section id="community" className="scroll-mt-28">
            <h2 className="text-xl font-semibold mb-3">
              Community Moderation
            </h2>
            <hr className="w-full h-px border-0 bg-gray-300 my-4"/>
            <p className="text-sm text-gray-600 mb-4">
              User-generated content and marketplace listings are subject to moderation to maintain platform quality and safety.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm">
              <li>All job postings reviewed for compliance</li>
              <li>Prohibited content and services are removed</li>
              <li>User ratings and reviews monitored for authenticity</li>
              <li>Reporting system for community flagging</li>
              <li>Account suspension for policy violations</li>
            </ul>
          </section>

          {/* WARNING */}
          <section id="warning" className="scroll-mt-28">
            <h2 className="text-xl font-semibold mb-3">
              Off-Platform Risk Warning
            </h2>
            <hr className="w-full h-px border-0 bg-gray-300 my-4"/>
            <div className="border border-blue-200 bg-blue-50 p-4 rounded-lg flex gap-3 mb-4">
              <AlertTriangle className="text-blue-600" size={20} />
              <div>
                <p className="text-sm font-medium text-blue-700">
                  Critical Warning
                </p>
                <p className="text-sm text-gray-600">
                  Transactions conducted outside Mosalak are not protected. Never send money or share banking details outside the platform.
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Users who attempt to move transactions off-platform may face account suspension. This policy protects all parties from fraud and ensures accountability.
            </p>
          </section>

          {/* DATA */}
          <section id="data-protection" className="scroll-mt-28">
            <h2 className="text-xl font-semibold mb-3">
              Data Protection
            </h2>
            <hr className="w-full h-px border-0 bg-gray-300 my-4"/>
            <p className="text-sm text-gray-600 mb-4">
              Mosalak treats user data with the highest level of security and confidentiality.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm">
              <li>Encrypted storage of sensitive information</li>
              <li>Secure payment processing through verified gateways</li>
              <li>No sharing of personal data without consent</li>
              <li>Regular security audits and updates</li>
              <li>Compliance with Nigerian data protection regulations</li>
              <li>User control over privacy settings</li>
            </ul>
          </section>

          {/* COMMITMENT */}
          <section id="commitment" className="scroll-mt-28">
            <h2 className="text-xl font-semibold mb-3">
              Our Commitment
            </h2>
            <hr className="w-full h-px border-0 bg-gray-300 my-4"/>
            <p className="text-gray-600 text-sm mb-4">
              Mosalak is committed to continuous improvement of our trust and safety systems. We invest in technology, training, and processes to protect our community.
            </p>
            <p className="text-gray-600 text-sm">
              If you encounter suspicious activity or have safety concerns, contact our support team immediately at <a target="_blank" className="font-semibold" href="mailto:support@mosak.com">support@mosalak.com</a>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default TrustSafety;