import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

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
    loop: false,
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
    <div className="bg-white mb-4 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold"> M-Adverts</h3>
        <button className="btn px-3 py-2 text-xs">
          <span className="hidden sm:inline">View All Ads</span>
          <span className="sm:hidden">View All</span>
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Carousel Container */}
      <div className="embla overflow-x-hidden px-4 relative" ref={emblaRef}>
        <div className="embla__container flex">
          {groupedAds.map((adPair, index) => (
            <div key={index} className="w-full flex-[0_0_100%] flex gap-4">
              {adPair.map((ad) => (
                <div key={ad.id} className="bg-primary/20 border border-primary/30 rounded-lg p-4 w-full h-full">
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
                    <div>
                      <p className="text-xs text-gray-700 line-clamp-2">
                        {ad.message}
                      </p>
                      
                      {/* Link */}
                      <div className="overflow-hidden">
                        <a 
                          href={ad.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary text-xs font-medium hover:underline break-all"
                        >
                          {ad.link}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>


        {/* Navigation Buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex items-center justify-between gap-2">
          <button
            onClick={scrollPrev}
            className="h-8 w-8 -ml-4 bg-primary text-white rounded-full border flex items-center justify-center hover:bg-primary/80 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!canScrollPrev}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={scrollNext}
            className="h-8 w-8 mr-4 bg-primary text-white rounded-full border flex items-center justify-center hover:bg-primary/80 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!canScrollNext}
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-4">
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