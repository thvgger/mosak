import React, { useEffect } from 'react'
import SearchBar from '../../components/marketplace/SearchBar';
import CategoriesBar from '../../components/marketplace/CategoriesBar';
import FlashSale from "../../components/marketplace/FlashSale";
import Categories from '../../components/marketplace/Categories';
import TodayDeals from '../../components/marketplace/TodayDeals';
import TrendingSales from '../../components/marketplace/TrendingSales';
import JoinCommunity from '../../components/home/JoinCommunity';
import { useLocation } from 'react-router-dom';
import TopSellers from '../../components/marketplace/TopSellers';

const MarketPlace = () => {
  const { hash } = useLocation(); 
  useEffect(() => { 
    if (hash) { 
      const element = document.querySelector(hash); 
      if (element) {
        element.scrollIntoView({ behavior: "smooth" }); 
      } 
    } 
  }, [hash]);

  return (
    <section className=''>
      <div className='bg-[#eaeaea]'>
        <SearchBar />
      </div>
      <div className="sticky top-16 md:top-20 z-40">
        <CategoriesBar />
      </div>
      
      {/* Rest of the content */}
      <div className='space-y-8 pt-8'>
        <div className='bg-white'>
          <FlashSale />
        </div>
        <Categories />
        <TodayDeals />
        <TrendingSales /> 
        <TopSellers />
      </div>
        <JoinCommunity />
    </section>
  )
}

export default MarketPlace;