import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMarketplace } from '../../contexts/MarketplaceContext';
import SidebarFilters from '../../components/marketplace/SidebarFilters';
import ProductGrid from '../../components/marketplace/ProductGrid';
import SortDropdown from '../../components/marketplace/SortDropdown';
import Breadcrumbs from "../../components/marketplace/Breadcrumbs";
import SearchBar from '../../components/marketplace/SearchBar';
import CategoriesBar from '../../components/marketplace/CategoriesBar';

const MarketplacePage = () => {
  const { category: categoryParam } = useParams();
  const navigate = useNavigate();
  const { 
    filteredProducts, 
    filters, 
    sortBy, 
    pagination,
    categories,
    updateFilters, 
    setSortBy, 
    changePage,
    getCategoryById,
    getFeaturedProducts,
    getBestSellingProducts,
    resetFilters
  } = useMarketplace();
  
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Get current category based on filters, not URL
  const currentCategory = filters.category ? getCategoryById(filters.category) : null;

  // Sync URL params with filters when page loads
  useEffect(() => {
    if (categoryParam && categoryParam !== filters.category) {
      // URL has category - update filters to match
      updateFilters({ category: categoryParam });
    }
  }, [categoryParam]); // Only run when URL param changes

  // Handle filter change from sidebar
  const handleFilterChange = (newFilters) => {
    // If category is being changed
    if (newFilters.category !== undefined) {
      if (newFilters.category === null) {
        // "All Categories" selected - update filters without changing URL
        updateFilters({ category: null });
      } else {
        // Specific category selected - update URL to match
        navigate(`/marketplace/${newFilters.category}`);
        updateFilters({ category: newFilters.category });
      }
    } else {
      // Other filter changes
      updateFilters(newFilters);
    }
  };

  // Handle search
  const handleSearch = (query) => {
    updateFilters({ searchQuery: query });
  };

  // Handle clear all filters
  const handleClearAllFilters = () => {
    // Only reset filters, don't navigate
    resetFilters();
  };

  return (
    <section className="min-h-screen bg-gray-50 pb-6">
      <div className='bg-[#eaeaea]'>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="sticky top-16 md:top-20 z-40">
        <CategoriesBar />
      </div>

      {/* Pass currentCategory based on filters to Breadcrumbs */}
      <Breadcrumbs 
        category={currentCategory} 
      />

      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-dark transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div className="container">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <div className="hidden lg:block w-1/5">
            <SidebarFilters 
              filters={filters} 
              onFilterChange={handleFilterChange}
              onClearAllFilters={handleClearAllFilters}
            />
          </div>

          {/* Products Content */}
          <div className="flex-1 md:bg-white md:p-4 md:rounded-2xl md:shadow-md">
            {/* Toolbar */}
            <div className="mb-2 flex justify-between items-center">
              <div>
                <h4 className="text-base font-medium">
                  {/* Show "All Products" when no category filter is active */}
                  {currentCategory ? currentCategory.name : 'All Products'}
                  <span className="text-gray-500 font-normal text-sm ml-1.5">
                    ({pagination.total} products found)
                  </span>
                </h4>
                {/* {currentCategory ? (
                  <p className="text-sm text-gray-600 mt-1">
                    Browse our selection of {currentCategory.name.toLowerCase()}
                  </p>
                ) : (
                  <p className="text-sm text-gray-600 mt-1">
                    Browse products from all categories
                  </p>
                )} */}
              </div>

              <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
            </div>

            {/* Products Grid */}
            <ProductGrid products={filteredProducts} />

            {/* Pagination */}
            {pagination.total > pagination.limit && (
              <div className="mt-8 flex justify-center">
                <div className="flex gap-2">
                  {[...Array(Math.ceil(pagination.total / pagination.limit))].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => changePage(i + 1)}
                      className={`px-4 py-2 rounded ${
                        pagination.page === i + 1
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Featured Sections - Only show when viewing "All Products" */}
        {!filters.category && pagination.total > 0 && (
          <>
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Best Selling</h2>
              <ProductGrid products={getBestSellingProducts(4)} />
            </div>
            
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
              <ProductGrid products={getFeaturedProducts(4)} />
            </div>
          </>
        )}
      </div>

      {/* Mobile Filters Overlay */}
      {showMobileFilters && (
        <div className="fixed top-16 inset-0 z-50 lg:hidden">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="absolute inset-y-0 left-0 w-4/5 max-w-sm bg-white overflow-y-auto">
            <div className="p-4">
              <div className="flex justify-end items-center mb-4">
                {/* <h2 className="text-xl font-bold">Filters</h2> */}
                <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <SidebarFilters 
                filters={filters} 
                onFilterChange={handleFilterChange}
                onClearAllFilters={handleClearAllFilters}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MarketplacePage;