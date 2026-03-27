import React from "react";
import AboutImg1 from "../../assets/about/about-img-1.png";
import AboutImg2 from "../../assets/about/about-img-2.png";
import AboutImg3 from "../../assets/about/about-img-3.png";
import AboutImg4 from "../../assets/about/about-img-4.png";
import AboutImg5 from "../../assets/about/about-img-5.png";
import AboutImg6 from "../../assets/about/about-img-6.png";
import { CheckCircle, Shield, ShoppingBag, Star, Users } from "lucide-react";
import JoinCommunity from "../../components/home/JoinCommunity";

const Section = ({ badge, title, children, image, reverse }) => {
  return (
    <section className="mb-24">
      <div className={`grid md:grid-cols-2 gap-12 items-center ${reverse ? "md:flex-row-reverse" : ""}`}>
        
        {/* TEXT */}
        <div>
          {badge && (
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
              {badge}
            </span>
          )}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {children}
        </div>

        {/* IMAGE */}
        <div className="bg-gray-50 border rounded-2xl p-6 shadow-sm">
          <img
            src={image}
            alt="illustration"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <div className="container mx-auto px-6 py-16">

      {/* HERO */}
      <section className="mb-14 md:mb-28">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <span className="w-fit px-4 py-1.5 bg-primary/10 text-primary rounded-xl border border-primary text-sm font-medium mb-4 flex items-center gap-1.5">
              <Star size={14} />
              Community Marketplace
            </span>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              MosakHub connects people to{" "}
              <span className="text-blue-600">sell, hire</span>, and collaborate securely.
            </h1>

            <p className="text-gray-600 mb-4">
              MosakHub is a secure digital marketplace where businesses, creators,
              and buyers connect to complete transactions with confidence.
            </p>

            <p className="text-gray-600 mb-4">
              Every deal runs through escrow protection, ensuring funds are safe
              until delivery.
            </p>

            <p className="text-gray-600 mb-6">
              This removes uncertainty and lets users focus on doing business.
            </p>

            <div className="flex gap-4">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
                Get Started
              </button>
              <button className="px-6 py-3 border border-gray-300 rounded-lg hover:border-blue-600 hover:text-blue-600">
                See How It Works
              </button>
            </div>
          </div>

          <div className="">
            <img src={AboutImg1} alt="" className="mx-auto" />
          </div>
        </div>
      </section>


      {/* OUR MISSION */}
      <section className="mb-28">
        <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-6 md:gap-12 items-center">
          <div className="">
            <img src={AboutImg2} alt="" className="mr-auto" />
          </div>

          <div>
            <span className="w-fit px-4 py-1.5 bg-primary/10 text-primary rounded-xl border border-primary text-sm font-medium mb-6 flex items-center gap-1.5">
              <Users size={16} />
              About MosakHub
            </span>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Our Mission
            </h1>

            <p className="text-gray-600 mb-4">
              MosakHub connects people who want to work, trade, and collaborate safely online.
            </p>

            <p className="text-gray-600 mb-4">
              The platform brings businesses, creators, and buyers into one ecosystem where they can build partnerships, exchange value, and complete transactions with confidence
            </p>

            <p className="text-gray-600 mb-6">
              Through secure escrow protection, every transaction remains safe until both sides fulfill their agreement.
            </p>
          </div>
        </div>
      </section>


      {/* TRUST */}
      <section className="mb-14 md:mb-28">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <span className="w-fit px-4 py-1.5 bg-primary/10 text-primary rounded-xl border border-primary text-sm font-medium mb-4 flex items-center gap-1.5">
              <ShoppingBag size={16} />
              Why Mosakhub Exists 
            </span>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Building trust in online transactions
            </h1>

            <p className="text-gray-600 mb-4">
              Many online deals fail because of three major challenges.
            </p>

            <p className="text-gray-600 mb-4">
              MosakHub was built to solve these problems by creating a trusted system where security and transparency guide every interaction.
            </p>

            <div className="space-y-4 mb-6">
              {[
                {
                  name: "Lack of Trust", 
                  subtitle: "Many people hesitate to trade online because they fear being scammed."
                },
                {
                  name: "Poor communication",
                  subtitle: "Without a structured platform, agreements can easily break down."
                },
                {
                  name: "Payment risk",
                  subtitle: "Sending money without protection exposes both parties to loss."
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded text-xl">
                    {i + 1}
                  </span>
                  <div className="flex flex-col gap-0 items-start">
                    <p className="text-gray-700">{item.name}</p>
                    <small className="text-gray-500"> {item.subtitle} </small>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-gray-600 mb-6">
              MosakHub removes these risks by introducing a secure environment where transactions are protected from start to finish.
            </p>
          </div>

          <div className="">
            <img src={AboutImg3} alt="" className="mx-auto" />
          </div>
        </div>
      </section>


      {/* TOOLS */}
      <section className="mb-14 md:mb-28">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="">
            <img src={AboutImg4} alt="" className="mx-auto" />
          </div>

          <div>
            <span className="w-fit px-4 py-1.5 bg-primary/10 text-primary rounded-xl border border-primary text-sm font-medium mb-4 flex items-center gap-1.5">
              <ShoppingBag size={16} />
              What MosakHub Enables
            </span>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Tools to trade, collaborate, and grow
            </h1>

            <p className="text-gray-600 mb-4">
              MosakHub gives users the tools they need to earn, trade, and grow professionally in one ecosystem.
              Users on the platform can:
            </p>

            <div className="space-y-4 mb-6">
              {[
                {
                  name: "Sell products or services", 
                  subtitle: "Many people hesitate to trade online because they fear being scammed."
                },
                {
                  name: "Collaborate with professionals and businesses",
                  subtitle: "Without a structured platform, agreements can easily break down."
                },
                {
                  name: "Complete transactions using escrow-protected secure deals",
                  subtitle: "Sending money without protection exposes both parties to loss."
                },
                {
                  name: "Build reputation through verified work and successful deals",
                  subtitle: "Sending money without protection exposes both parties to loss."
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded text-xl">
                    {i + 1}
                  </span>
                  <div className="flex flex-col gap-0 items-start">
                    <p className="text-gray-700">{item.name}</p>
                    {/* <small className="text-gray-500"> {item.subtitle} </small> */}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-gray-600 mb-6">
              This structure supports both buyers and sellers within a single trusted marketplace.
            </p>
          </div>          
        </div>
      </section>




      {/* SAFETY  */}
      <section className="mb-14 md:mb-28">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <span className="w-fit px-4 py-1.5 bg-green-100/10 text-green-400 rounded-xl border border-green-400 text-sm font-medium mb-4 flex items-center gap-1.5">
              <Shield size={16} />
              Secure Deals & Safety
            </span>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Trade with confidence using escrow protection
            </h1>

            <p className="text-gray-600 mb-4">
              Security stands at the center of MosakHub.
              The escrow system protects funds until both sides fulfill their agreement, ensuring that transactions are completed fairly.
              Key Safeguards
            </p>

            {/* <p className="text-gray-600 mb-4">
              MosakHub was built to solve these problems by creating a trusted system where security and transparency guide every interaction.
            </p> */}

            <div className="space-y-4 mb-6">
              {[
                {
                  name: "Escrow payment protection", 
                  subtitle: "Funds are securely held until delivery is confirmed."
                },
                {
                  name: "Verified user profiles",
                  subtitle: "User identities and activities are monitored to increase trust."
                },
                {
                  name: "Secure messaging",
                  subtitle: "All transaction communication happens safely within the platform."
                },
                {
                  name: "Dispute resolution support",
                  subtitle: "If issues arise, the platform provides structured dispute resolution."
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="bg-green-400 text-white w-10 h-10 flex items-center justify-center rounded text-xl">
                    {i + 1}
                  </span>
                  <div className="flex flex-col gap-0 items-start">
                    <p className="text-gray-700">{item.name}</p>
                    <small className="text-gray-500"> {item.subtitle} </small>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-gray-600 mb-6">
              These safeguards help reduce fraud and increase confidence across the ecosystem.
            </p>
          </div>

          <div className="">
            <img src={AboutImg5} alt="" className="mx-auto" />
          </div>
        </div>
      </section>



      {/* REPUTATION */}
      <section className="">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="">
            <img src={AboutImg6} alt="" className="mx-auto" />
          </div>

          <div>
            <span className="w-fit px-4 py-1.5 bg-orange-100/40 text-orange-500 rounded-xl border border-orange-500 text-sm font-medium mb-4 flex items-center gap-1.5">
              <CheckCircle size={16} />
              Grow Like a Pro
            </span>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Build your reputation and reach the top
            </h1>

            <p className="text-gray-600 mb-4">
              MosakHub rewards users who contribute consistently to the ecosystem.
              As users complete transactions and build positive feedback, their reputation grows within the platform.
              This visibility creates new opportunities and helps trusted users stand out.
            </p>

            <div className="space-y-4 mb-6">
              {[
                {
                  name: "Build your reputation through successful deals", 
                  subtitle: "Many people hesitate to trade online because they fear being scammed."
                },
                {
                  name: "Stay active within the marketplace",
                  subtitle: "Without a structured platform, agreements can easily break down."
                },
                {
                  name: "Maintain reliable service and strong feedback",
                  subtitle: "Sending money without protection exposes both parties to loss."
                },
                {
                  name: "Climb the platform leaderboard",
                  subtitle: "Sending money without protection exposes both parties to loss."
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="bg-orange-600 text-white w-10 h-10 flex items-center justify-center rounded text-xl">
                    {i + 1}
                  </span>
                  <div className="flex flex-col gap-0 items-start">
                    <p className="text-gray-700">{item.name}</p>
                    {/* <small className="text-gray-500"> {item.subtitle} </small> */}
                  </div>
                </div>
              ))}
            </div>
          </div>          
        </div>
      </section>


      <JoinCommunity />

    </div>
  );
};

export default About;