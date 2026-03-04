import HeroImg from "../../assets/hero-img.png";
import { Search } from 'lucide-react';
// import { IoIosSearch } from "react-icons/io";

const Hero = () => {
  return (
    <section className="h-156 py-16 flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-x-clip" style={{
      backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0)), url(${HeroImg})`,
    }}>
      <div className="container">
        <div className="text-start text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 leading-tight">
            <span className="block">Buy. Sell. Hire. Earn. </span>
            <span className="block">All in Mosalak Hub.</span>
          </h1>
          
          <p className="text-sm mb-6.5 max-w-lg">
            Join a vibrant community where talent meets opportunity. Discover 
            how easy it is to find the perfect freelancer for your project.
          </p>

          <div className="relative max-w-lg bg-[#D9D9D9] rounded-lg shadow-lg border border-gray-300 focus:ring-1 focus:ring-primary text-sm flex items-center px-1.5 py-1">
            <span className="absolute z-2 left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-bold">
              {/* <IoIosSearch /> */}
              {/* <Search /> */}
            </span>
            <input
              type="text"
              placeholder="Search by product, talent, or keywords"
              className="w-full px-8 py-3 pl-3 text-muted placeholder:text-muted focus:outline-none"
            />
            <button className="btn">
              Search
            </button>
          </div>      
        </div>
      </div>
    </section>
  );
};

export default Hero;