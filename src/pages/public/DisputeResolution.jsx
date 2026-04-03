import React, { useEffect, useState } from "react";
import {
  Shield,
  AlertCircle,
  Clock,
  FileText,
  FileSearch,
  Scale,
  CheckCircle,
  Info,
} from "lucide-react";

const DisputeResolution = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const nav = [
    { id: "overview", label: "Overview" },
    { id: "qualifies", label: "What Qualifies as a Dispute" },
    { id: "escrow", label: "Escrow's Role in Disputes" },
    { id: "timeline", label: "Resolution Timeline" },
    { id: "evidence", label: "Evidence Requirements" },
    { id: "outcomes", label: "Possible Outcomes" },
    { id: "appeals", label: "Appeals Process" },
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
        rootMargin: "-40% 0px -50% 0px",
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
      <div className="mb-10 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Dispute Resolution Policy
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            How conflicts are handled on Mosalak
          </p>
          <p className="text-gray-600 text-xs mt-1">
            Last updated: January 2026
          </p>
        </div>

        <button className="btn">
          Invite Friends & Earn Points
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* SIDEBAR */}
        <div className="md:col-span-1">
          <div className="sticky top-24">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              On This Page
            </h3>

            <div className="space-y-1">
              {nav.map((item) => {
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
          {/* OVERVIEW */}
          <section id="overview" className="scroll-mt-28">
            <h2 className="text-xl font-semibold mb-3">1. Overview</h2>
            <hr className="bg-gray-300 h-px border-0 my-4" />

            <p className="text-sm text-gray-600 mb-4">
              At Mosalak, we're committed to fair and transparent dispute resolution. Our process ensures that both freelancers and clients are protected throughout their working relationship. We use evidence-based decisions made by neutral third-party reviewers to resolve conflicts fairly and efficiently.

              <br/><br/>
              This policy outlines when disputes are appropriate, how they're handled, and what outcomes you can expect. Understanding this process helps you protect your interests and maintain professional relationships on our platform.
            </p>

            <p className="text-gray-800 font-medium mb-2"> Key Principles </p>
            <ul className="pl-5 text-sm text-gray-600 space-y-2">
              <li className="list-disc!">Evidence-based decisions</li>
              <li className="list-disc!">Neutral third-party review</li>
              <li className="list-disc!">Binding outcomes</li>
              <li className="list-disc!">Escrow protection throughout the process</li>
            </ul>

            {/* INFO BOX */}
            <div className="border border-blue-200 bg-blue-50 p-4 rounded-md flex gap-3 mt-5">
              <span className="rounded-md bg-primary/20 h-fit p-1">
                <Info className="text-blue-600" size={18} />
              </span>
              <div>
                <p className="text-sm font-medium text-primary">
                  Protection Guarantee
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Your funds remain safely in escrow throughout the entire dispute process. Neither party can access them until the dispute is fully resolved.
                </p>
              </div>
            </div>
          </section>

          {/* QUALIFIES */}
          <section id="qualifies" className="scroll-mt-28">
            <h2 className="text-xl font-semibold mb-3">
              2. What Qualifies as a Dispute
            </h2>
            <hr className="bg-gray-300 h-px border-0 my-4" />

            <p className="text-sm text-gray-600 mb-6">
              Not every disagreement requires a formal dispute. Understanding what qualifies helps you choose the right resolution path and saves time for everyone involved.
            </p>

            <h3 className="text-sm font-semibold mb-2">Valid Disputes</h3>
            <ul className="list-disc! pl-5 text-sm text-gray-600 space-y-2 mb-6">
              <li className="list-disc!"><b>Work not delivered as agreed:</b> Deliverables don't match the project brief or specifications</li>
              <li className="list-disc!"><b>Quality significantly below requirements:</b> Work fails to meet the professional standards outlined in the agreement</li>
              <li className="list-disc!"><b>Scope changes without agreement:</b> One party adds or changes requirements without mutual consent</li>
              <li className="list-disc!"><b>Missed deadlines without communication:</b> Failure to deliver on agreed timelines without prior notice or discussion</li>
            </ul>

            <h3 className="text-sm font-semibold mb-2">NOT Disputes (Contact Support Instead)</h3>
            <ul className="list-disc! pl-5 text-sm text-gray-600 space-y-2 mb-4">
              <li className="list-disc!"><b>Minor revision requests:</b> Small adjustments within the agreed scope</li>
              <li className="list-disc!"><b>Communication difficulties:</b> Misunderstandings that can be resolved through discussion</li>
              <li className="list-disc!"><b>Timeline adjustments by mutual consent:</b> Both parties agree to change deadlines</li>
              <li className="list-disc!"><b>Technical platform issues:</b> Problems with Mosalak's functionality or features</li>
            </ul>

            <div className="border border-blue-200 bg-blue-50 p-4 rounded-md flex gap-3 mt-5">
              <span className="rounded-md bg-primary/20 h-fit p-1">
                <AlertCircle className="text-blue-600" size={18} />
              </span>
              <div>
                <p className="text-sm font-medium text-blue-700">Example Scenario</p>
                <p className="text-sm text-gray-600 mt-1">
                  A client approved milestone 1 deliverables but later requests changes to that already-approved work while you're on milestone 3. This qualifies for a dispute since work was approved and should be considered complete.
                </p>
              </div>
            </div>
          </section>

          {/* ESCROW */}
          <section id="escrow" className="scroll-mt-28">
            <h2 className="text-xl font-semibold mb-3">
              3. Escrow's Role in Disputes
            </h2>
            <hr className="bg-gray-300 h-px border-0 my-4" />

            <div className="border border-blue-200 bg-blue-50 p-4 rounded-md flex gap-3 my-4">
              <span className="rounded-md bg-primary/20 h-fit p-1">
                <AlertCircle className="text-blue-600" size={18} />
              </span>
              <div>
                <p className="text-sm font-medium text-blue-700">Escrow Protection</p>
                <p className="text-sm text-gray-600 mt-1">
                  Funds remain frozen in escrow during disputes. Neither party can access them until resolution is complete. This protects both freelancers from non-payment and clients from paying for undelivered work.
                </p>
              </div>
            </div>


            <h3 className="text-sm font-semibold mb-2">How Escrow Works During Disputes</h3>
            <ul className="list-disc! pl-5 text-sm text-gray-600 space-y-2 mb-4">
              <li className="list-disc!"><b>Milestone payments held securely:</b> All disputed milestone funds are locked and cannot be released</li>
              <li className="list-disc!"><b>No automatic releases:</b> Timers and auto-release functions are suspended during active disputes</li>
              <li className="list-disc!"><b>Partial releases possible:</b> In split decisions, funds can be divided based on what was delivered versus what was agreed</li>
              <li className="list-disc!"><b>Platform fees only on released amounts:</b> You're only charged fees on money that's actually paid out</li>
            </ul>

            <p className="text-gray-600 text-sm mb-4">
              The escrow system ensures that all parties can engage in the dispute process knowing their financial interests are protected. Clients won't pay for work that doesn't meet standards, and freelancers won't lose payment for legitimate work completed.
            </p>
          </section>

          {/* TIMELINE */}
          <section id="timeline" className="scroll-mt-28">
            <h2 className="text-xl font-semibold mb-3">
              4. Resolution Timeline
            </h2>
            <hr className="bg-gray-300 h-px border-0 my-4" />

            <div className="border border-gray-200 bg-blue-50 p-4 rounded-md flex gap-3 my-4">
              <span className="rounded-md bg-gray-500/20 h-fit p-1">
                <AlertCircle className="text-gray-600" size={18} />
              </span>
              <div className="w-full">
                <p className="text-sm font-medium text-gray-700">Expected Timeline</p>
                <div className="w-full text-sm text-gray-600 mt-1 py-2 border-b border-gray-600 flex items-center justify-between">
                  <p> Day 1-2 </p>
                  <p className="text-xs"> Dispute opened and reviewed by our team</p>
                </div>
                <div className="w-full text-sm text-gray-600 mt-1 py-2 border-b border-gray-600 flex items-center justify-between">
                  <p> Day 3-5 </p>
                  <p className="text-xs"> Evidence collection from both parties</p>
                </div>
                <div className="w-full text-sm text-gray-600 mt-1 py-2 border-b border-gray-600 flex items-center justify-between">
                  <p> Day 6-8 </p>
                  <p className="text-xs"> Investigation and analysis by neutral reviewer</p>
                </div>
                <div className="w-full text-sm text-gray-600 mt-1 py-2 border-b border-gray-600 flex items-center justify-between">
                  <p> Day 9-10 </p>
                  <p className="text-xs"> Decision issued and communicated to both parties</p>
                </div>
                <p className="text-gray-600 text-sm mt-2.5"> Average resolution time: 7-10 business days </p>
              </div>
            </div>

            <h3 className="text-sm font-semibold mb-2">What Affects Timeline</h3>
            <ul className="list-disc! pl-5 text-sm text-gray-600 space-y-2 mb-4">
              <li className="list-disc!"><b>Complexity of disagreement:</b> More complex cases involving multiple milestones may take longer</li>
              <li className="list-disc!"><b>Evidence clarity and completeness:</b> Well-documented cases resolve faster</li>
              <li className="list-disc!"><b>Response time from both parties:</b> Delays in providing requested information extend the process</li>
              <li className="list-disc!"><b>Need for additional information:</b> If initial evidence is unclear, we may request more details</li>
            </ul>

            <div className="text-sm text-gray-600 space-y-2">
              <p><strong>Initial review:</strong> 1–2 days</p>
              <p><strong>Evidence submission:</strong> 3–5 days</p>
              <p><strong>Final decision:</strong> Up to 10 days</p>
            </div>

            <div className="border border-red-200 bg-red-50 p-4 rounded-lg flex gap-3 mt-5">
              <Clock className="text-red-600" size={20} />
              <div>
                <p className="text-sm font-medium text-red-700">
                  Deadline Notice
                </p>
                <p className="text-sm text-gray-600">
                  Submit evidence within 48 hours or risk case closure.
                </p>
              </div>
            </div>
          </section>

          {/* EVIDENCE */}
          <section id="evidence" className="scroll-mt-28">
            <h2 className="text-xl font-semibold mb-3">
              Evidence Requirements
            </h2>
            <hr className="bg-gray-300 h-px border-0 my-4" />

            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
              <li>Project brief</li>
              <li>Messages</li>
              <li>Deliverables</li>
              <li>Revision timeline</li>
            </ul>
          </section>

          {/* OUTCOMES */}
          <section id="outcomes" className="scroll-mt-28">
            <h2 className="text-xl font-semibold mb-3">
              Possible Outcomes
            </h2>
            <hr className="bg-gray-300 h-px border-0 my-4" />

            <ul className="text-sm text-gray-600 space-y-2">
              <li><strong>Full refund</strong></li>
              <li><strong>Full payment</strong></li>
              <li><strong>Partial payment</strong></li>
              <li><strong>Revision required</strong></li>
            </ul>
          </section>

          {/* APPEALS */}
          <section id="appeals" className="scroll-mt-28">
            <h2 className="text-xl font-semibold mb-3">
              Appeals Process
            </h2>
            <hr className="bg-gray-300 h-px border-0 my-4" />

            <p className="text-sm text-gray-600 mb-4">
              Appeals can be submitted if errors occurred or evidence was missed.
            </p>

            <div className="border border-blue-200 bg-blue-50 p-4 rounded-lg flex gap-3">
              <CheckCircle className="text-blue-600" size={20} />
              <div>
                <p className="text-sm font-medium text-blue-700">
                  Appeal Window
                </p>
                <p className="text-sm text-gray-600">
                  Must be submitted within 5 business days.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DisputeResolution;