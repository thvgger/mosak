import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMarketplace } from "../../contexts/MarketplaceContext";
import ProductCard from "./ProductCard";
import "../home/custom.css";

const TrendingSales = () => {
  const { getTrendingProducts } = useMarketplace();
  
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

  // Get trending products
  const trendingProducts = getTrendingProducts(12); // Get trending products

  // If no trending products, don't render the section
  if (trendingProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-8 md:py-12 bg-white" id="trending-products">
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <span className="w-1 h-8 bg-primary rounded-full"></span>
            <h2 className="section-title mb-0"> Trending Near You </h2>
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

        {/* Carousel with ProductCards */}
        <div className="embla overflow-x-clip" ref={emblaRef}>
          <div className="embla__container flex gap-6">
            {trendingProducts.map((product) => (
              <div 
                key={product.id}
                className="embla__slide shrink-0 
                  basis-1/2 
                  md:basis-1/3 
                  lg:basis-1/4
                  last-of-type:mr-3 md:last-of-type:mr-4
                  "
              >
                <div className="h-full">
                  <ProductCard 
                    product={product}
                    showBadge={true}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        {trendingProducts.length > 4 && (
          <div className="embla__dots mt-8">
            {Array.from({ length: Math.ceil(trendingProducts.length / 4) }).map((_, i) => (
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
  );
};

export default TrendingSales;