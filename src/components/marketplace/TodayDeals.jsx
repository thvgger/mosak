import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useMarketplace } from "../../contexts/MarketplaceContext";
import ProductCard from './ProductCard';

const TodayDeals = () => {
  const { getFeaturedProducts } = useMarketplace();


  const featuredProducts = getFeaturedProducts(4); // Get trending products

  // If no trending products, don't render the section
  if (featuredProducts.length === 0) {
    return null;
  }

  return (
    <section className='py-8 md:py-12 bg-white' id='hot-deals'>
      <div className='container'>
        <div className='flex items-center justify-between mb-4 md:mb-6'>
          <div className="flex items-center gap-4">
            <span className="w-1 h-8 bg-primary rounded-full"></span>
            <h2 className="section-title mb-0"> Today's Deals </h2>
          </div>
          
          <Link to="/marketplace" className='btn btn-text text-primary text-sm px-0'>
            View All 
            <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredProducts.map((product) => (
            <ProductCard 
              key={product.id}
              product={product}
              showBadge={true}
            />
          ))}
        </div>        
      </div>
    </section>
  )
}

export default TodayDeals;