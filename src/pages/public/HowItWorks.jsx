import React, { useState } from "react";
import { CheckCircle, Info } from "lucide-react";

const tabs = ["For Freelancers", "For Clients", "For Sellers", "For Buyers"];

const earnPoints = [
  { title: "Post a Job", points: "+5 points", sub: "Per job posted" },
  { title: "Leave a Review", points: "+5 points", sub: "Per review given" },
  { title: "Complete a Project", points: "+40 points", sub: "Mark job as done" },
  { title: "Hire a Freelancer", points: "+35 points", sub: "First hire bonus" },
  { title: "Refer a Client", points: "+60 points", sub: "When they post a job" },
  { title: "Complete KYC Verification", points: "+150 points", sub: "One-time bonus" },
];

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState("For Clients");

  return (
    <div className="container mx-auto py-6 md:py-16">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Ways to Earn Points
          </h2>
          <p className="text-sm text-gray-500">
            Earn rewards by completing these actions
          </p>
        </div>

        <button className="btn">
          Invite Friends & Earn Points
        </button>
      </div>

      {/* Tabs */}
      <div className="border border-gray-200 rounded-lg p-2 flex gap-4 mb-6 bg-gray-50">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-2 py-2 text-sm ${
              activeTab === tab
                ? "border-b-2 border-primary text-primary font-medium"
                : "text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Pro Tip */}
      <div className="border border-primary/80 bg-blue-50 text-primary p-4 py-3 rounded-lg mb-6 text-sm flex items-center gap-2">
        {/* 💡  */}
        <Info size={14} className="" />
        Pro Tip: Complete your KYC verification to unlock the highest point
        rewards and build trust with clients.
      </div>

      {/* Earn Points */}
      <div className="border border-gray-200 rounded-xl p-6 mb-10">
        <h3 className="font-semibold text-gray-900 mb-4">
          How to Earn Points
        </h3>

        {/* Badge */}
        <div className="flex items-center justify-between border rounded-lg p-4 mb-6 bg-purple-50 border-purple-200">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-purple-600" />
            <div>
              <p className="font-medium text-gray-900">No Active Badge</p>
              <p className="text-sm text-gray-500">
                Subscribe to display a verified badge on your profile
              </p>
            </div>
          </div>

          <button className="btn">
            Subscribe
          </button>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {earnPoints.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-300"
            >
              <div>
                <p className="font-medium text-gray-900">{item.title}</p>
                <p className="text-sm text-gray-500">{item.sub}</p>
              </div>
              <p className="text-blue-600 font-semibold">{item.points}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bonus Challenges */}
      <div className="mb-10">
        <h3 className="font-semibold text-gray-900 mb-1">
          Bonus Challenges
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Limited-time opportunities
        </p>

        {/* Card 1 */}
        <div className="bg-blue-700 text-white p-6 rounded-xl mb-4">
          <p className="font-semibold">Week 1 Onboarding Challenge</p>
          <p className="text-sm opacity-80 mb-4">
            Complete 5 actions this week
          </p>

          <div className="w-full bg-white/30 rounded-full h-2 mb-2">
            <div className="bg-white h-2 rounded-full w-1/2"></div>
          </div>

          <div className="flex justify-between text-sm">
            <span>2/5 actions completed</span>
            <span>+200 Bonus Points</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-blue-700 text-white p-6 rounded-xl">
          <p className="font-semibold">Community Star</p>
          <p className="text-sm opacity-80 mb-4">
            Get 3 five-star reviews
          </p>

          <div className="w-full bg-white/30 rounded-full h-2 mb-2">
            <div className="bg-white h-2 rounded-full w-full"></div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span>Progress: 3/3 reviews ✅</span>
            <button className="bg-white text-blue-700 px-3 py-1 rounded-md text-xs">
              Claim Reward
            </button>
          </div>
        </div>

        <button className="mt-4 text-sm text-blue-600">
          View All Active Challenges
        </button>
      </div>

      {/* Use Points */}
      <div className="border rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-1">
          How to Use Your Points
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Redeem points for these benefits
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <Card
            title="Boost Listings"
            desc="Make your services stand out"
            points="Starting at 500 points"
          />
          <Card
            title="Unlock Visibility Perks"
            desc="Get featured in search results"
            points="Starting at 200 points"
          />
          <Card
            title="Promotion Discounts"
            desc="Save on paid features"
            points="Redeem points for discounts"
          />
          <Card
            title="Priority Placement"
            desc="Stay tuned for updates"
            points="Coming Soon"
            disabled
          />
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, desc, points, disabled }) => (
  <div
    className={`border rounded-lg p-5 ${
      disabled ? "opacity-50" : "hover:shadow-sm"
    }`}
  >
    <p className="font-medium text-gray-900 mb-1">{title}</p>
    <p className="text-sm text-gray-500 mb-2">{desc}</p>
    <p className="text-sm text-orange-500 font-medium">{points}</p>
  </div>
);

export default HowItWorks;