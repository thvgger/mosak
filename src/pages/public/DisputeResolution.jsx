import React from "react";
import {
  Shield,
  AlertCircle,
  Clock,
  FileText,
  FileSearch,
  Scale,
  CheckCircle,
} from "lucide-react";

const Section = ({ id, title, icon: Icon, children }) => (
  <section id={id} className="mb-14 scroll-mt-28">
    <div className="flex items-center gap-3 mb-4">
      <Icon className="w-6 h-6 text-blue-600" />
      <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
    </div>
    <div className="text-gray-700 space-y-4 leading-relaxed">{children}</div>
  </section>
);

const Callout = ({ type = "info", title, children }) => {
  const styles = {
    info: "bg-blue-50 border-blue-300 text-blue-800",
    warning: "bg-amber-50 border-amber-300 text-amber-800",
    danger: "bg-red-50 border-red-300 text-red-800",
    success: "bg-green-50 border-green-300 text-green-800",
  };

  return (
    <div className={`border-l-4 p-4 rounded-md ${styles[type]}`}>
      {title && <p className="font-semibold mb-1">{title}</p>}
      <p className="text-sm">{children}</p>
    </div>
  );
};

const DisputeResolution = () => {
  const nav = [
    { id: "overview", label: "Overview" },
    { id: "qualifies", label: "What Qualifies as a Dispute" },
    { id: "escrow", label: "Escrow's Role in Disputes" },
    { id: "timeline", label: "Resolution Timeline" },
    { id: "evidence", label: "Evidence Requirements" },
    { id: "outcomes", label: "Possible Outcomes" },
    { id: "appeals", label: "Appeals Process" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <h1 className="text-4xl font-bold text-gray-900">
            Dispute Resolution Policy
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: January 2026
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <p className="text-sm font-semibold text-gray-500 mb-3">
              In this policy
            </p>
            <nav className="space-y-2">
              {nav.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block text-sm text-gray-700 hover:text-blue-600"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="bg-white p-8 rounded-xl shadow-sm border">
          {/* Overview */}
          <Section id="overview" title="1. Overview" icon={FileText}>
            <p>
              At Mosaic, we are committed to fair and transparent dispute
              resolution. Our process ensures that both freelancers and clients
              are protected through structured review and evidence-based
              decision making.
            </p>

            <h3 className="font-semibold text-lg mt-6">Key Principles</h3>
            <ul className="list-disc ml-6 space-y-2">
              <li>Evidence-based decisions</li>
              <li>Neutral third-party review</li>
              <li>Binding outcomes</li>
              <li>Escrow protection throughout the process</li>
            </ul>

            <Callout title="Platform Policy">
              You must always communicate through Mosaic. Off-platform
              communication may affect your ability to resolve disputes.
            </Callout>
          </Section>

          {/* What qualifies */}
          <Section
            id="qualifies"
            title="2. What Qualifies as a Dispute"
            icon={AlertCircle}
          >
            <p>
              Not every disagreement qualifies as a formal dispute. Below are
              valid and non-valid dispute scenarios.
            </p>

            <h3 className="font-semibold mt-6">Valid Disputes</h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>Work not delivered as agreed</li>
              <li>Quality significantly below expectations</li>
              <li>Scope changes without agreement</li>
              <li>Missed deadlines without communication</li>
            </ul>

            <h3 className="font-semibold mt-6">Not Disputes</h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>Minor revision requests</li>
              <li>Communication delays</li>
              <li>Technical issues outside either party’s control</li>
            </ul>

            <Callout type="info" title="Example">
              A client requesting a 10th revision after final delivery is not a
              valid dispute.
            </Callout>
          </Section>

          {/* Escrow */}
          <Section
            id="escrow"
            title="3. Escrow's Role in Disputes"
            icon={Shield}
          >
            <p>
              Escrow protects both parties by holding funds until the work is
              verified as complete or a dispute is resolved.
            </p>

            <ul className="list-disc ml-6 space-y-1">
              <li>Milestone payments remain locked during disputes</li>
              <li>No automatic releases during investigations</li>
              <li>Partial releases may occur if partial work is accepted</li>
            </ul>

            <Callout type="warning" title="Important">
              Funds cannot be withdrawn while a dispute is active.
            </Callout>
          </Section>

          {/* Timeline */}
          <Section
            id="timeline"
            title="4. Resolution Timeline"
            icon={Clock}
          >
            <div className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-2 text-sm">
                <div className="bg-gray-100 p-3 font-medium">Stage</div>
                <div className="bg-gray-100 p-3 font-medium">Typical Duration</div>

                <div className="p-3 border-t">Initial review</div>
                <div className="p-3 border-t">1–2 business days</div>

                <div className="p-3 border-t">Evidence submission</div>
                <div className="p-3 border-t">3–5 days</div>

                <div className="p-3 border-t">Final decision</div>
                <div className="p-3 border-t">Up to 10 days</div>
              </div>
            </div>

            <Callout type="danger" title="Deadline Notice">
              You have 48 hours to submit requested evidence or your case may
              be closed.
            </Callout>
          </Section>

          {/* Evidence */}
          <Section
            id="evidence"
            title="5. Evidence Requirements"
            icon={FileSearch}
          >
            <p>
              Strong evidence is critical for fair resolution. The quality of
              documentation directly affects dispute outcomes.
            </p>

            <ul className="list-disc ml-6 space-y-1">
              <li>Original project brief</li>
              <li>All platform messages</li>
              <li>File versions and deliverables</li>
              <li>Timeline of revisions</li>
            </ul>

            <Callout type="warning">
              Evidence sent outside the platform may not be considered.
            </Callout>
          </Section>

          {/* Outcomes */}
          <Section
            id="outcomes"
            title="6. Possible Outcomes"
            icon={Scale}
          >
            <ul className="space-y-3">
              <li>
                <span className="font-semibold">Full refund:</span> If work does
                not meet the contract terms.
              </li>
              <li>
                <span className="font-semibold">Full payment:</span> If work is
                delivered as agreed.
              </li>
              <li>
                <span className="font-semibold">Partial payment:</span> If part
                of the work is acceptable.
              </li>
              <li>
                <span className="font-semibold">Revision required:</span> If
                issues are fixable.
              </li>
            </ul>
          </Section>

          {/* Appeals */}
          <Section
            id="appeals"
            title="7. Appeals Process"
            icon={CheckCircle}
          >
            <p>
              You may request an appeal if you believe the decision was made in
              error or critical evidence was overlooked.
            </p>

            <Callout type="info" title="Appeal Window">
              Appeals must be submitted within 5 business days of the decision.
            </Callout>
          </Section>
        </main>
      </div>
    </div>
  );
};

export default DisputeResolution;