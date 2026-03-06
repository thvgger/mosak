import { useState } from "react";
import featuresBg from "../../assets/features-bg.png";
import marketplace1 from "../../assets/how-it-works/marketplace/img-01.png";
import marketplace2 from "../../assets/how-it-works/marketplace/img-02.png";
import marketplace3 from "../../assets/how-it-works/marketplace/img-03.png";
import freelancers1 from "../../assets/how-it-works/freelancers/img-01.png";
import freelancers2 from "../../assets/how-it-works/freelancers/img-02.png";
import freelancers3 from "../../assets/how-it-works/freelancers/img-03.png";
import community1 from "../../assets/how-it-works/community/img-01.png";
import community2 from "../../assets/how-it-works/community/img-02.png";
import community3 from "../../assets/how-it-works/community/img-03.png";
import earning1 from "../../assets/how-it-works/earning/img-01.png";
import earning2 from "../../assets/how-it-works/earning/img-02.png";
import earning3 from "../../assets/how-it-works/earning/img-03.png";
import HowItWorks1 from "../../assets/how-it-works-1.png";
import postings1 from "../../assets/how-it-works/postings/img-01.png";
import postings2 from "../../assets/how-it-works/postings/img-02.png";
import postings3 from "../../assets/how-it-works/postings/img-03.png";
import HowItWorks2 from "../../assets/how-it-works-2.png";
import HowItWorks3 from "../../assets/how-it-works-3.png";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const HowItWorks = () => {
  const [mode, setMode] = useState("marketplace");

  const HOW_IT_WORKS_DATA = {
    marketplace:[
      {
        id: 1,
        title: "List & Discover Products",
        image: marketplace1,
        description: "Buy and sell locally with confidence. Browse verified listings or post your own products for free. No listing fees. No hidden charges. Anyone can post and sell.",
        cta: "Start exploring",
        url: "/marketplace"
      },
      {
        id: 2,
        title: "Pay Safely with Escrow",
        image: marketplace2,
        description: "Your money is protected. Funds are held securely until you confirm delivery. Sellers get paid only when buyers are satisfied.",
        cta: "Explore",
        url: "/marketplace"
      },
      {
        id: 3,
        title: "Receive, Inspect, Confirm",
        image: marketplace3,
        description: "Confirm before funds are released. Inspect items on delivery. If there’s an issue, open a dispute. If all is good, confirm and escrow releases payment.",
        cta: "Get started",
        url: "/marketplace"
      }
    ],
    freelancers: [
      {
        id: 1,
        title: "Create Your Profile",
        image: freelancers1,
        description: "Set up once. Start earning. Create a freelancer profile, list your skills, set your prices, and show your previous work. No signup fees. No monthly charges.",
        cta: "Build profile",
        url: "/freelancers"
      },
      {
        id: 2,
        title: "Get Hired & Start Work",
        image: freelancers2,
        description: "Clients come to you. Clients browse freelancers or post jobs. You receive job requests, agree on scope, timeline, and price before work begins.",
        cta: "Explore projects",
        url: "/freelancers"
      },
      {
        id: 3,
        title: "Get Paid Securely",
        image: freelancers3,
        description: "Payment released only when work is approved. Client funds are held securely. Once the job is completed and approved, payment is released to you. If there’s an issue, Mosak steps in to resolve it fairly.",
        cta: "Set up payments",
        url: "/freelancers"
      }
    ],
    community: [
      {
        id: 1,
        title: "Join the Live Community",
        image: community1,
        description: "Connect with real users. Engage in a shared space where buyers, sellers, and freelancers interact openly within Mosak.",
        cta: "Sign up",
        url: "/community"

      },
      {
        id: 2,
        title: "Stay Active & Visible",
        image: community2,
        description: "Activity builds trust. Your participation increases your visibility and credibility across the platform.",
        cta: "Explore forums",
        url: "/community"
      },
      {
        id: 3,
        title: "Clean, Moderated Conversations",
        image: community3,
        description: "Spam-free by design. Messages auto-expire. Spam is filtered. The focus stays on meaningful engagement, not noise.", 
        cta: "Join groups",
        url: "/community"
      }
    ],
    earningPoints: [
      {
        id: 1,
        title: "Earn Points by Being Active",
        image: earning1,
        description: "Every action counts. Earn points for engagement, referrals, transactions, and participation across the platform.",
        cta: "View tasks",
        url: "/"
      },
      {
        id: 2,
        title: "Climb the Leaderboard",
        image: earning2,
        description: "Consistency wins. Top active users rise on the leaderboard and unlock special recognition and rewards.",
        cta: "Check points",
        url: "/"
      },
      {
        id: 3,  
        title: "Get Rewarded Monthly",
        image: earning3,
        description: "Points turn into real rewards. Top performers earn cash rewards, badges, and platform benefits at the end of each cycle.",
        cta: "Redeem now",
        url: "/"
      }
    ],
    postings: [
      {
        id: 1,
        title: "Post What You Need",
        image: postings1,
        description: "Describe the job clearly. Post your task, budget, timeline, and expectations in a few steps.",
        cta: "Create posting",
        url: "/postings"
      },
      {
        id: 2,
        title: "Receive Offers",
        image: postings2,
        description: "Service providers reach out. Qualified providers respond with their proposals for your job.",
        cta: "View responses",
        url: "/postings"
      },
      {
        id: 3,
        title: "Choose & Pay Safely",
        image: postings3,
        description: "Hire with confidence. Select who you want to work with. Payment is secured and only released when the job is done.",
        cta: "Finalize now",
        url: "/postings"
      }
    ],
  };

  const cards = HOW_IT_WORKS_DATA[mode];




const HowItWorksDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: "marketplace", label: "For Marketplace" },
    { value: "freelancers", label: "For Freelancers" },
    { value: "community", label: "For Community" },
    { value: "earningPoints", label: "For Earning Points" },
    { value: "postings", label: "For Postings" },
  ];

  const current = options.find(opt => opt.value === value);

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-muted/50 text-sm font-medium text-dark bg-white hover:bg-muted/10 transition"
      >
        <span>{current?.label}</span>
        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Overlay */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white border border-muted/30 shadow-lg z-20 overflow-hidden">
            {options.map(option => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-sm transition
                  ${
                    value === option.value
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted hover:bg-muted/10"
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};



  return (
    <section className="py-8 md:py-12 bg-white" id="how-it-works">
      <div className="container">
        <div className="mb-4 md:mb-8 flex items-center justify-between">
          <h2 className="section-title mb-0">How it works</h2>

          <div className="flex items-center space-x-2 text-muted text-sm">
            <HowItWorksDropdown
              value={mode}
              onChange={setMode}
            />
          </div>


          {/* <div className="flex items-center space-x-2 text-muted text-sm">
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="font-medium text-dark focus:outline-none bg-transparent border border-muted/50 rounded-full px-2 py-1"
            >
              <option value="marketplace"> For Marketplace </option>
              <option value="freelancers"> For Freelancers </option>
              <option value="community"> For Community </option>
              <option value="earningPoints"> For Earning Points </option>
              <option value="postings"> For Postings </option>
            </select>
          </div> */}
        </div>

        {/* Cards Container */}
        <div className="relative">
          {/* Horizontal scroll on mobile, grid on md+ */}
          <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto pb-6 md:pb-0 md:overflow-x-visible">
            {cards.map((item) => (
              <div
                key={item.id}
                className="w-full sm:min-w-[calc(80vw-2.5rem)] md:min-w-0 shrink-0 md:shrink relative rounded-2xl overflow-hidden group bg-cover bg-no-repeat"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-80 object-cover"
                />

                <div className={`absolute inset-0 bg-linear-to-t from-black to-black/40 flex flex-col justify-end p-6 transition-all duration-500 ${mode ? "opacity-100" : "opacity-0"}`}>
                  <h3 className="text-white text-lg font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-white/80 text-sm mt-1">
                    {item.description}
                  </p>

                  {item.cta && (
                    <Link to={item?.url || "/"} className="mt-4 btn w-full mx-auto transition-all duration-500 md:absolute md:translate-y-20 group-hover:relative translate-y-0 md:group-hover:translate-y-0">
                      {item.cta}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;