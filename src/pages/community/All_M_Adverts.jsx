import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  PanelLeftOpen,
  PanelRightOpen,
  Filter,
  ChevronDown,
  Grid,
  List,
  Search
} from 'lucide-react';
// import MAdverts from './MAdverts';

const All_M_Adverts = () => {
  const { setIsSidebarOpen, isSidebarOpen } = useOutletContext();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchTerm, setSearchTerm] = useState('');

  // This would typically fetch all adverts from an API
  // For now, we're just reusing the MAdverts component
  return (
    <div className="h-full overflow-y-auto flex-1 flex flex-col min-w-0 bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="min-h-14 flex items-center justify-between gap-3 px-4">
          <div className="flex items-center">
            {!isSidebarOpen ? (
              <button
                onClick={() => setIsSidebarOpen(prev => !prev)}
                className="rounded hover:bg-gray-50 p-1"
              >
                <PanelLeftOpen size={20} className='text-gray-400' />
              </button>
            ) : (
              <button
                onClick={() => setIsSidebarOpen(prev => !prev)}
                className="rounded hover:bg-gray-50 p-1"
              >
                <PanelRightOpen size={20} className='text-gray-400' />
              </button>
            )}
          </div>

          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search all M-Adverts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg border ${
                viewMode === 'grid' 
                  ? 'bg-primary text-white border-primary' 
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg border ${
                viewMode === 'list' 
                  ? 'bg-primary text-white border-primary' 
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-gray-50 px-4 py-2 border-t border-gray-200 flex items-center gap-4 text-sm overflow-x-auto text-nowrap scrollbar-hide">
          <span className="text-gray-500 font-medium flex items-center gap-1">
            <Filter size={14} />
            Filters:
          </span>
          <button className="px-3 py-1 bg-white border border-gray-300 rounded-full text-xs hover:bg-gray-50">
            All Categories
          </button>
          <button className="px-3 py-1 bg-white border border-gray-300 rounded-full text-xs hover:bg-gray-50">
            This Week
          </button>
          <button className="px-3 py-1 bg-white border border-gray-300 rounded-full text-xs hover:bg-gray-50">
            Most Viewed
          </button>
          <button className="px-3 py-1 bg-white border border-gray-300 rounded-full text-xs hover:bg-gray-50">
            Most Liked
          </button>
        </div>
      </div>

      {/* Content */}
      {/* <div className="p-4 md:p-6">
        <MAdverts />
      </div> */}
    </div>
  );
};

export default All_M_Adverts;