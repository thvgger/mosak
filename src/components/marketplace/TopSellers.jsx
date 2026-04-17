import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from 'react-router-dom';
import { Star, ChevronRight, ChevronLeft } from 'lucide-react';
import freelancerImg from '../../assets/why-bg.png';

import platinumImg from "../../assets/badges/platinum.png";
import goldImg from "../../assets/badges/gold.png";
import silverImg from "../../assets/badges/silver.png";
import bronzeImg from "../../assets/badges/bronze.png";

const TopSellers = () => {
  const sellers = [
    {
      id: 1,
      userName: "Jane Doe",
      title: "Logo Designer",
      bio: "Professional logo design services",
      rating: 4.9,
      reviews: 342,
      price: "15,000",
      icon: goldImg,
      rank: "gold"
    },
    {
      id: 2,
      userName: "John Smith",
      title: "Web Developer",
      bio: "Full-stack web development",
      rating: 4.9,
      reviews: 342,
      price: "15,000",
      icon: platinumImg,
      rank: "platinum"
    },
    {
      id: 3,
      userName: "Alice Johnson",
      title: "Content Writing",
      bio: "Expert content writing services",
      rating: 4.9,
      reviews: 342,
      price: "15,000",
      icon: silverImg,
      rank: "silver"
    },
    {
      id: 4,
      userName: "Bob Brown",
      title: "Video Editing",
      bio: "Professional video editing services",
      rating: 4.9,
      reviews: 342,
      price: "15,000",
      icon: bronzeImg,
      rank: "bronze"
    },
    {
      id: 5,
      userName: "Bob Brown",
      title: "Video Editing",
      bio: "Professional video editing services",
      rating: 4.9,
      reviews: 342,
      price: "15,000",
      icon: bronzeImg,
      rank: "bronze"
    }
  ]


    
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    dragFree: true,
    slidesToScroll: 1
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

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
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);


  const getBadgeColor = (badge) => {
    const colors = {
      platinum: 'bg-purple-200',
      gold: 'bg-yellow-200',
      silver: 'bg-[#EAEAEA] text-[#393A40]',
      bronze: 'bg-red-200',
    };
    return colors[badge.toLowerCase()] || 'bg-gray-200';
  };



  return (
    <section className='py-8 md:py-12 bg-white'>
      <div className='container'>
        {/* Header */}
        <div className='flex items-center justify-between mb-4 md:mb-8'>
          <div className="flex items-center gap-4">
            <span className="w-1 h-8 bg-primary rounded-full"></span>
            <h2 className="section-title mb-0"> 
              Top Sellers
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className={`h-9 w-9 rounded-full border flex items-center justify-center ${
                canScrollPrev 
                  ? "text-white bg-primary hover:bg-primary/80 cursor-pointer" 
                  : "text-gray-400 bg-gray-100 cursor-not-allowed"
              }`}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className={`h-9 w-9 rounded-full border flex items-center justify-center ${
                canScrollNext 
                  ? "text-white bg-primary hover:bg-primary/80 cursor-pointer" 
                  : "text-gray-400 bg-gray-100 cursor-not-allowed"
              }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Services Grid */}
        {/* <div className='grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4'>
          {sellers.map((seller) => (
            <div key={seller.id} 
              className="border border-primary/20 overflow-hidden rounded-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className='relative w-full h-40 mb-4'>
                <div className='absolute w-full h-full z-0 bg-primary/20'></div>
                <img src={freelancerImg} alt='' className='z-20 h-40 w-full object-cover object-center relative opacity-40' />
              </div>

              <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 mb-4'>
                <p className='text-lg font-semibold'> {seller.userName} </p>
                <span className={`p-1 px-2 rounded text-xs bg-primary/10 flex items-center gap-1 ${getBadgeColor(seller.rank)}`}>
                  <img src={seller.icon} className='object-cover w-4 h-4'/> 
                  {seller.rank} 
                </span>
              </div>

              <div className="flex flex-col items-start gap-1 justify-between px-2 mb-2">
                <p className="text-sm line-clamp-1"> {seller.bio} </p>
              </div>

              <div className="flex items-center gap-1.5 px-2 mb-2">
                <div className="flex items-center">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 font-medium text-sm text-gray-900">{seller.rating}</span>
                </div>
                <span className="text-sm text-gray-500">({seller.reviews})</span>
              </div>

              <div className="px-2 my-4">
                <Link to="/" 
                  className="btn btn-primary w-full text-center"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div> */}


        {/* Carousel with ProductCards */}
        <div className="embla overflow-x-clip" ref={emblaRef}>
          <div className="embla__container flex gap-6">
            {sellers.map((seller) => (
              <div 
                key={seller.id}
                className="embla__slide shrink-0 
                  basis-1/2 
                  md:basis-1/3 
                  lg:basis-1/4
                  last-of-type:mr-3 md:last-of-type:mr-4
                  border border-primary/20 overflow-hidden rounded-md hover:shadow-lg transition-shadow duration-300
                  "
              >
                <div className='relative w-full h-40 mb-4'>
                <div className='absolute w-full h-full z-0 bg-primary/20'></div>
                <img src={freelancerImg} alt='' className='z-20 h-40 w-full object-cover object-center relative opacity-40' />
              </div>

              {/* User Info */}
              <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 mb-4'>
                <p className='text-lg font-semibold'> {seller.userName} </p>
                <span className={`p-1 px-2 rounded text-xs bg-primary/10 flex items-center gap-1 ${getBadgeColor(seller.rank)}`}>
                  <img src={seller.icon} className='object-cover w-4 h-4'/> 
                  {seller.rank} 
                </span>
              </div>

              {/* Service Icon & Title */}
              <div className="flex flex-col items-start gap-1 justify-between px-2 mb-2">
                <p className="text-sm line-clamp-1"> {seller.bio} </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1.5 px-2 mb-2">
                <div className="flex items-center">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 font-medium text-sm text-gray-900">{seller.rating}</span>
                </div>
                <span className="text-sm text-gray-500">({seller.reviews})</span>
              </div>
              {/* Hire Button */}
              <div className="px-2 my-4">
                <Link to="/" 
                  className="btn btn-primary w-full text-center"
                >
                  View Profile
                </Link>
              </div>
              </div>
            ))}

            {/* {sellers.map((seller) => (
            <div key={seller.id} 
              className="border border-primary/20 overflow-hidden rounded-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className='relative w-full h-40 mb-4'>
                <div className='absolute w-full h-full z-0 bg-primary/20'></div>
                <img src={freelancerImg} alt='' className='z-20 h-40 w-full object-cover object-center relative opacity-40' />
              </div>

              <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 mb-4'>
                <p className='text-lg font-semibold'> {seller.userName} </p>
                <span className={`p-1 px-2 rounded text-xs bg-primary/10 flex items-center gap-1 ${getBadgeColor(seller.rank)}`}>
                  <img src={seller.icon} className='object-cover w-4 h-4'/> 
                  {seller.rank} 
                </span>
              </div>

              <div className="flex flex-col items-start gap-1 justify-between px-2 mb-2">
                <p className="text-sm line-clamp-1"> {seller.bio} </p>
              </div>

              <div className="flex items-center gap-1.5 px-2 mb-2">
                <div className="flex items-center">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 font-medium text-sm text-gray-900">{seller.rating}</span>
                </div>
                <span className="text-sm text-gray-500">({seller.reviews})</span>
              </div>
              <div className="px-2 my-4">
                <Link to="/" 
                  className="btn btn-primary w-full text-center"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))} */}
          </div>
        </div>

        {/* Dots Indicator */}
        {sellers.length > 4 && (
          <div className="embla__dots mt-8">
            {Array.from({ length: Math.ceil(sellers.length / 4) }).map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i * 4)}
                className={`embla__dot ${
                  Math.floor(selectedIndex / 4) === i ? "is-active" : ""
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default TopSellers;