import React from 'react';
import joinBg from "../../assets/join-bg.png";
import { Shield, Check, Box, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

const TopNav = () => {
  return (
    <div className='w-full bg-primary text-white flex flex-col items-center'>
      <div className='w-full bg-[#000F66] text-white text-xs font-normal hidden md:flex items-center justify-center gap-4 h-10'>
        <span className='flex items-center gap-1.5'> <Shield size={16} strokeWidth={1.5} /> Escrow-Protected Marketplace </span>
        <span className='flex items-center gap-1.5'> <Check size={16} strokeWidth={1.5} /> Verified Sellers </span>
        <span className='flex items-center gap-1.5'> <Box size={16} strokeWidth={1.5} /> Safe Delivery </span>
        <span className='flex items-center gap-1.5'> <Wallet size={16} strokeWidth={1.5} /> Money-Back Guarantee </span>
      </div>

      <div className='w-full hidden md:flex items-center justify-center gap-4 py-3 relative'>
        <p className='text-sm z-2'> Buy. Sell. Hire. Earn. All in one platform. </p>
        {/* <Link to="/freelancers" className='btn btn-secondary z-2'> Hire A Freelancer </Link> */}
        <Link to="/community" className='btn btn-secondary z-2'> Join Community </Link>

        <div className='absolute inset-0 bg-cover bg-center opacity-15'
          style={{
            background: `url(${joinBg})`,
            backgroundBlendMode: 'overlay',
          }}></div>
      </div>
    </div>
  )
}

export default TopNav;