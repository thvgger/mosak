import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import { useMarketplace } from '../../contexts/MarketplaceContext';

import webdev from "../../assets/freelance/webdev.png";
import graphics from "../../assets/freelance/graphics.png";
import content from "../../assets/freelance/content.png";
import digital from "../../assets/freelance/digital.png";
import video from "../../assets/freelance/video.png";
import mobile from "../../assets/freelance/mobile.png";

const Categories = () => {
  const navigate = useNavigate();
  // const { categories } = useMarketplace();

  const categories = [
    { id: 1, name: "Web Development", color: "from-blue-700 to-blue-500", img: webdev },
    { id: 2, name: "Graphic Design", color: "from-pink-700 to-pink-500", img: graphics },
    { id: 3, name: "Content Writing", color: "from-green-700 to-green-500", img: content },
    { id: 4, name: "Digital Marketing", color: "from-purple-700 to-purple-500", img: digital },
    { id: 5, name: "Video Editing", color: "from-yellow-700 to-yellow-500", img: video },
    { id: 6, name: "Mobile App Development", color: "from-red-700 to-red-500", img: mobile },    
  ]

  const handleCategoryClick = (categoryId) => {
    // Navigate to the freelance category URL
    navigate(`/freelance/${categoryId}`);
    window.scrollTo(0, 0);
  };

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    dragFree: true
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );

  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    onSelect();
    emblaApi.on("select", onSelect);

    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="w-1 h-8 bg-primary rounded-full"></span>
            <h2 className="section-title mb-0"> Category </h2>
          </div>

          <div className="flex gap-2">
            <button
              onClick={scrollPrev}
              className="h-9 w-9 bg-primary text-white rounded-full border flex items-center justify-center hover:bg-primary/80 cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={scrollNext}
              className="h-9 w-9 bg-primary text-white rounded-full border flex items-center justify-center hover:bg-primary/80 cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Embla */}
        <div className="embla overflow-x-clip mt-8" ref={emblaRef}>
          <div className="embla__container flex gap-4">
            {categories.map((category) => (
              <div 
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="shrink-0 basis-1/2 md:basis-1/3 lg:basis-1/6 last-of-type:mr-3 md:last-of-type:mr-4" 
              >
                <div className="bg-white border border-muted/20 rounded-lg p-4 text-center cursor-pointer hover:shadow-lg transition-all duration-300 pt-3 transform hover:scale-105 shadow-sm">
                  <div className="w-full flex flex-col gap-3">
                    <span className="text-base font-semibold text-nowrap whitespace-nowrap">
                      {category.name}
                    </span>
                    <div className={`bg-linear-to-r ${category.color} flex items-center justify-center w-full h-36 rounded-md`}>
                      <img src={category.img} alt="" className="w-30 h-fit mx-auto object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="embla__dots">
          {categories.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`embla__dot ${
                i === selectedIndex ? "is-active" : ""
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;