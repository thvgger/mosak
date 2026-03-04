import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import logo from "../assets/mosalak-logo.png";

const Footer = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const footerLinks = {
    'About Mosak': [
      { label: 'About Us', url: '/about' },
      { label: 'How it Works', url: '#' },
      { label: 'Trust & Safety', url: '#' },
      { label: 'Escrow Protection', url: '#' },
      { label: 'Careers', url: '#' },
      { label: 'Press', url: '#' },
    ],
    'Buy': [
      { label: 'All Categories', url: '#' },
      { label: 'Trending Products', url: '#' },
      { label: 'Hot Deals', url: '#' },
      { label: 'New Arrivals', url: '#' },
      { label: 'Nearby Products', url: '#' },
      { label: 'Track Order', url: '#' },
    ],
    'Sell': [
      { label: 'Start Selling', url: '#' },
      { label: 'Seller Dashboard', url: '#' },
      { label: 'Boost Your Listings', url: '#' },
      { label: 'Seller Protection', url: '#' },
      { label: 'Fees & Pricing', url: '#' },
      { label: 'Seller Success Stories', url: '#' },
    ],
    'Support': [
      { label: 'Help Center', url: '/help-center' },
      { label: 'Contact Us', url: '/contact' },
      { label: 'Dispute Resolution', url: '#' },
      { label: 'Returns & Refunds', url: '#' },
      { label: 'Report a Problem', url: '/report' },
      { label: 'FAQs', url: '/faqs' },
    ],
    'Connect': [
      { label: 'Join our Community', url: '/community' },
      { label: 'Newsletter', url: '#' },
      { label: 'Facebook', url: '#' },
      { label: 'Twitter', url: '#' },
      { label: 'Instagram', url: '#' },
      { label: 'Linkedin', url: '#' },
      { label: 'Youtube', url: '#' },
    ],
  };

  const toggleDropdown = (category) => {
    if (openDropdown === category) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(category);
    }
  };

  return (
    <footer className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          <div className="w-fit whitespace-nowrap">
            <img src={logo} alt="MosakHub Logo" className="w-32 mb-6" />
            <p className="text-sm">
              One Hub Ecosystem
            </p>
          </div>

          {/* Desktop grid layout (hidden on mobile) */}
          {/* <div className=""> */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="w-full hidden lg:block mb-12">
                <h4 className="text-lg font-bold mb-4">{category}</h4>
                <ul className="space-y-2">
                  {links.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.url} 
                        className="hover:text-primary/80 transition text-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          {/* </div> */}
        </div>

        
        {/* Mobile dropdowns */}
        <div className="block lg:hidden space-y-4 mb-8">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="border-b border-dark/20 last-of-type:border-0 pb-4">
              <button
                className="flex items-center justify-between w-full text-lg font-bold mb-2"
                onClick={() => toggleDropdown(category)}
                aria-expanded={openDropdown === category}
              >
                <span>{category}</span>
                {openDropdown === category ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openDropdown === category ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <ul className="space-y-2 pl-4 pt-2">
                  {links.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.url} 
                        className="hover:text-primary/80 transition text-sm block py-1"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>


        {/* Bottom section */}
        <div className="border-t border-dark/20 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="">
              ©2025 MosakHub. All rights reserved.
            </p>
            
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-4 mt-2">
                <a href="#" className="text-sm">Privacy Policy</a>
                <a href="#" className="text-sm">Terms of Service</a>
                <a href="#" className="text-sm">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;