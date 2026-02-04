import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PromotedSlider = () => {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const scrollAmount = slider.offsetWidth * 1.08;

    slider.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="h-full">
      {/* Prev Button */}
      <button
        onClick={() => scroll("prev")}
        className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Next Button */}
      <button
        onClick={() => scroll("next")}
        className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
      >
        <ChevronRight size={18} />
      </button>

      {/* Slider */}
      <div
        ref={sliderRef}
        className="flex h-full gap-4 overflow-x-auto scroll-smooth scrollbar-hide py-2"
      >
        {/* Card 1 */}
        <div className="w-full h-full shrink-0 bg-primary/60 rounded-xl p-4 flex flex-col items-center justify-between text-center gap-4">
          <img
            src=""
            alt=""
            className="bg-gray-300 w-full h-30 object-cover rounded-md"
          />
          <strong>21% Discount</strong>
          <p className="text-sm">
            Escape the noise, It’s time to hear the magic with Xiaomi Earbuds.
          </p>
          <span className="flex items-center gap-2 text-sm">
            Price:
            <span className="bg-gray-200 px-2 py-1 rounded">
              ₦22,000,000
            </span>
          </span>
          <button className="btn w-full"> Shop Now </button>
        </div>

        {/* Card 2 */}
        <div className="w-full shrink-0 bg-primary/40 rounded-xl p-4 flex flex-col items-center justify-between text-center gap-4">
          <img
            src=""
            alt=""
            className="bg-gray-300 w-full h-30 object-cover rounded-md"
          />
          <strong>21% Discount</strong>
          <p className="text-sm">
            Escape the noise, It’s time to hear the magic with Xiaomi Earbuds.
          </p>
          <span className="flex items-center gap-2 text-sm">
            Price:
            <span className="bg-gray-200 px-2 py-1 rounded">
              ₦99 NGN
            </span>
          </span>

          <button className="btn w-full"> Show Now </button>
        </div>

        {/* Card 3 */}
        <div className="w-full shrink-0 bg-primary/40 rounded-xl p-4 flex flex-col items-center justify-between text-center gap-4">
          <img
            src=""
            alt=""
            className="bg-gray-300 w-full h-30 object-cover rounded-md"
          />
          <strong>21% Discount</strong>
          <p className="text-sm">
            Escape the noise, It’s time to hear the magic with Xiaomi Earbuds.
          </p>
          <span className="flex items-center gap-2 text-sm">
            Price:
            <span className="bg-gray-200 px-2 py-1 rounded">
              ₦99 NGN
            </span>
          </span>

          <button className="btn w-full"> Show Now </button>
        </div>

        {/* Card 4 */}
        <div className="w-full shrink-0 bg-primary/40 rounded-xl p-4 flex flex-col items-center justify-between text-center gap-4">
          <img
            src=""
            alt=""
            className="bg-gray-300 w-full h-30 object-cover rounded-md"
          />
          <strong>21% Discount</strong>
          <p className="text-sm">
            Escape the noise, It’s time to hear the magic with Xiaomi Earbuds.
          </p>
          <span className="flex items-center gap-2 text-sm">
            Price:
            <span className="bg-gray-200 px-2 py-1 rounded">
              ₦99 NGN
            </span>
          </span>

          <button className="btn w-full"> Show Now </button>
        </div>

        {/* Add more cards as needed */}
      </div>
    </div>
  );
};

export default PromotedSlider;