import React from 'react';
import why01 from "../../assets/why-01.svg";
import why02 from "../../assets/why-02.svg";
import why03 from "../../assets/why-03.svg";
import why04 from "../../assets/why-04.svg";
import whyBg from "../../assets/why-bg.png";

const Why = () => {
  return (
    <section className='py-8 md:py-12 px-4 md:px-10'>
      <div className='container flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-4 bg-primary/10 p-4 md:p-8 md:py-16 rounded-xl md:rounded-2xl'>
        <div className='max-w-130 flex flex-col items-start'>
          {/* <h2 className='section-title'> Why Mosak? </h2>    */}
          <p className='text-xl lg:text-[40px] font-semibold leading-tight mb-4'>
          We are known for high quality work and money back guarantee
          </p>   
          <small className='text-sm mb-4'> 
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis aliquet ante. Phasellus vel sodales tortor, id consequat risus
          </small>
          <button className='btn'>
          Join now
          </button>
          </div>


        <div className='w-full h-full grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='text-white text-center p-4 rounded-md bg-primary space-y-2'>
            <img src={why01} alt='' className='w-fit mb-2 mx-auto h-12' />
            <h4 className='text-lg font-bold mb-0.5'> Escrow Protection </h4>
            <p className='text-sm'> Your money is safe until delivery </p>
          </div>
          <div className='text-primary text-center p-4 rounded-md bg-primary/30 space-y-2 relative'>
            <div className='absolute z-0 inset-0 bg-cover bg-center opacity-20'style={{
              background: `url(${whyBg})`,
              backgroundBlendMode: 'overlay',
              }}></div>
            <img src={why02} alt='' className='w-fit mb-2 mx-auto h-12' />
            <h4 className='text-lg font-bold mb-0.5'> Verified Sellers </h4>
            <p className='text-sm'> Only trusted merchants allowed </p>
          </div>
          <div className='text-primary text-center p-4 rounded-md bg-primary/30 space-y-2 relative'>
            <div className='absolute z-0 inset-0 bg-cover bg-center opacity-20'style={{
              background: `url(${whyBg})`,
              backgroundBlendMode: 'overlay',
              }}></div>
            <img src={why03} alt='' className='w-fit mb-2 mx-auto h-12' />
            <h4 className='text-lg font-bold mb-0.5'> Dispute Resolution </h4>
            <p className='text-sm'> Fair conflict management </p>
          </div>
          <div className='text-white text-center p-4 rounded-md bg-primary space-y-2'>
            <img src={why04} alt='' className='w-fit mb-2 mx-auto h-12' />
            <h4 className='text-lg font-bold mb-0.5'> Secure Wallet </h4>
            <p className='text-sm'> Fast and protected payments </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Why;