import React, { useEffect } from 'react';
import Hero from '../../components/home/Hero';
import Categories from '../../components/marketplace/Categories';
import HowItWorks from '../../components/home/HowItWorks';
import Why from '../../components/home/Why';
import JoinCommunity from '../../components/home/JoinCommunity';
import FlashSale from '../../components/marketplace/FlashSale';
import TrendingSales from '../../components/marketplace/TrendingSales';
import Ready from '../../components/home/Ready';
import Features from '../../components/home/Features';
import { useLocation } from 'react-router-dom';

const Home = () => {
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
    <>
      <Hero />
      <Categories />
      <HowItWorks />
      <Features />
      <Why />
      <JoinCommunity />
      {/* <FlashSale /> */}
      {/* <TrendingSales/> */}
      <Ready />
    </>
  )
}

export default Home;