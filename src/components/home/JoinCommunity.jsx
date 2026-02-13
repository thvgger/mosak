import React from 'react';
import joinImg from "../../assets/join-img.png";
import joinBg from "../../assets/join-bg.png";

const JoinCommunity = () => {
  return (
    <section className='py-8 md:py-12 px-4 md:px-10'>
      <div className='relative! overflow-hidden container flex flex-col md:flex-row gap-4 text-start items-center justify-betweeen text-white rounded-xl  md:rounded-3xl pt-8 p-4 md:p-12'>
        <div className='absolute z-0 inset-0 bg-cover bg-center opacity-10'
          style={{
            background: `url(${joinBg})`,
            backgroundBlendMode: 'overlay',
          }}></div>
        <div className='absolute -z-1 inset-0 bg-primary'></div>
        <div className='space-y-2 z-4'>
          <h2 className='section-title'> Join the Mosalak Community </h2>
          <p> Earn points on every transaction. Unlock exclusive rewards and badges. </p>
          <h4 className='font-semibold text-2xl'> Up to 25% OFF </h4>
          <div className='flex items-center gap-3 md:mt-6'>
            <button className='btn btn-secondary'> Join Community </button>
            <button className='btn btn-tertiary text-white border-white'> View Rewards </button>
          </div>
        </div>
        <img src={joinImg} alt='' className='h-80 ml-auto w-full md:w-fit object-cover rounded-2xl shadow-lg z-4' />
      </div>
    </section>
  )
}

export default JoinCommunity;