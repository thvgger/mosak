import React, { useState } from 'react';
// import { FiChevronDown } from 'react-icons/fi';
import { ChevronDown } from 'lucide-react';

const SortDropdown = ({ sortBy, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: 'popularity', label: 'Popularity' },
    { value: 'rating', label: 'Rating' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest Products' }
  ];

  const currentOption = sortOptions.find(opt => opt.value === sortBy) || sortOptions[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white md:bg-gray-50 hover:bg-gray-100 transition ${isOpen ? "bg-gray-50!" : ""}`}
      >
        <span className="text-gray-700 text-xs md:text-sm">Sort by: <span className="font-medium">{currentOption.label}</span></span>
        <ChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            {sortOptions.map(option => (
              <button
                key={option.value}
                onClick={() => {
                  onSortChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition ${
                  sortBy === option.value 
                    ? 'bg-primary/5 text-primary font-medium' 
                    : 'text-gray-700'
                } first:rounded-t-lg last:rounded-b-lg`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SortDropdown;