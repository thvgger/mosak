import React from 'react';
import { ChevronRight } from 'lucide-react';

const TopBanner = () => {
  return (
    <div className='bg-white px-4 md:px-5 py-2 text-center text-sm text-white hidden md:flex'>
      <div className="container bg-linear-to-r from-[#006eff] via-[#0F1BFF]/70 to-[#020FFF]/70 rounded-2xl flex items-center justify-between">
        <span className='px-8 py-2.5 md:py-4 text-sm md:text-base md:font-medium'>
          {/* Stop doing everything.  */}
          Get access to the top 1% of talent with Business Plus.
        </span>
        <span className='hidden md:inline-flex items-center hover:underline text-xs px-8'>
          Get offer
          <ChevronRight size={16} strokeWidth={1.5} />
        </span>
      </div>
    </div>
  )
}

export default TopBanner; 