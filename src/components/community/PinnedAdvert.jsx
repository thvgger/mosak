import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import car from "../../assets/car.png";
// import "./custom.css";

const PinnedAdvert = () => {
  const ads = [
    {
      id: 1,
      type: "M-Advert",
      initials: "CA",
      name: "Chioma Adeleke",
      badge: "Gold",
      role: "Seller",
      message: "Good morning everyone! Just launched my new collection on the marketplace. Would love your feedback! 👇",
      link: "https://mosalak.com/invite/abc123xyzsz"
    },
    {
      id: 2,
      type: "M-Advert",
      initials: "CA",
      name: "Chioma Adeleke",
      badge: "Gold",
      role: "Seller",
      message: "Good morning everyone! Just launched my new collection on the marketplace. Would love your feedback! 👇",
      link: "https://mosalak.com/invite/abc123xyzsz"
    },
    {
      id: 3,
      type: "M-Advert",
      initials: "TJ",
      name: "Tunde Johnson",
      badge: "Silver",
      role: "Seller",
      message: "Flash sale this weekend! 30% off on all electronics. Don't miss out! 🔥",
      link: "https://mosalak.com/invite/def456xyz"
    },
    {
      id: 4,
      type: "M-Advert",
      initials: "AS",
      name: "Amina Sule",
      badge: "Platinum",
      role: "Designer",
      message: "New African print collection now available. Limited stock available! 🎨",
      link: "https://mosalak.com/invite/ghi789xyz"
    },
    {
      id: 5,
      type: "M-Advert",
      initials: "KE",
      name: "Kunle Edwards",
      badge: "Gold",
      role: "Seller",
      message: "Weekend special: Buy 2 get 1 free on all fashion items. Shop now! 👗",
      link: "https://mosalak.com/invite/jkl012xyz"
    },
    {
      id: 6,
      type: "M-Advert",
      initials: "KE",
      name: "Kunle Edwards",
      badge: "Gold",
      role: "Seller",
      message: "Weekend special: Buy 2 get 1 free on all fashion items. Shop now! 👗",
      link: "https://mosalak.com/invite/jkl012xyz"
    }
  ];

  // Group ads into pairs of 2
  const groupedAds = [];
  for (let i = 0; i < ads.length; i += 2) {
    groupedAds.push(ads.slice(i, i + 2));
  }

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    dragFree: true
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

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

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="bg-white p-4 pt-2 pb-0 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-bold"> M-Adverts </h3>
        <button className="btn px-3 py-2 text-xs">
          <span className="hidden sm:inline"> View All Ads </span>
          <span className="sm:hidden"> View All </span>
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Carousel Container */}
      <div className="embla h-full relative! overflow-x-hidden px-4 pb-4" ref={emblaRef}>
        <div className="embla__container w-full">
          {groupedAds.map((adPair, index) => (
            <div key={index} className="embla__slide flex-[0_0_100%] flex items-center justify-start gap-4 last-of-type:pr-4">
              {adPair.map((ad) => (
                <div key={ad.id} className="bg-primary/20 border border-primary/30 rounded-lg p-4 w-full h-fit">
                  {/* Ad Type Badge */}
                  {/* <div className="mb-3">
                    <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                      {ad.type}
                    </span>
                  </div> */}

                  {/* User Info */}
                  <div className="flex flex-col items-start gap-3">
                    {/* User Details */}
                    <div className="w-full flex items-center justify-between gap-2">
                      {/* Avatar */}
                      <div className='flex items-center gap-2'>
                        <div className="w-7 h-7 bg-primary border border-white text-white rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">
                          {ad.initials}
                        </div>
                        <h4 className="font-bold text-gray-800 text-xs truncate">{ad.name}</h4>
                      </div>

                      <div className='flex items-center gap-2'>
                        <span className="bg-yellow-200 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap">
                          {ad.badge}
                        </span>
                        <span className="bg-gray-200 px-2 py-0.5 rounded-full text-xs text-gray-500 whitespace-nowrap">
                          {ad.role}
                        </span>
                      </div>
                    </div>
                      
                    {/* Message */}
                    <div className='w-full flex items-start justify-between gap-2'>
                      <div className='flex flex-col gap-1'>
                        <p className="text-xs text-gray-700 line-clamp-2">
                          {ad.message}
                        </p>
                        
                        {/* Link */}
                        <div className="overflow-hidden">
                          <a 
                            href={ad.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary text-xs font-medium hover:underline break-all line-clamp-1"
                          >
                            {ad.link}
                          </a>
                        </div>
                      </div>

                      <img src={ad?.img || car} alt='' className='w-18 h-auto rounded-sm object-cover object-center' />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>


        {/* Navigation Buttons */}
        <div className="w-full flex items-center justify-between gap-2">
          <button
            onClick={scrollPrev}
            className="absolute top-1/2 -translate-y-1/2 left-0 h-8 w-8 bg-primary text-white rounded-full border-4 border-white flex items-center justify-center hover:bg-primary/80 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!canScrollPrev}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute top-1/2 -translate-y-1/2 right-0 h-8 w-8 bg-primary text-white rounded-full border-4 border-white flex items-center justify-center hover:bg-primary/80 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!canScrollNext}
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-2 relative">
          {groupedAds.map((_, i) => (
            <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === selectedIndex ? "bg-primary w-4" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Page Indicator */}
        {/* <div className="text-center mt-2 text-sm text-gray-500">
          {selectedIndex + 1} of {groupedAds.length}
        </div> */}
      </div>
    </div>
  );
};

export default PinnedAdvert;