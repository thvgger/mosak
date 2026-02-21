import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, X, ChevronRight, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMarketplace } from "../../contexts/MarketplaceContext";
import PromotedSlider from "./PromotedSlider";

const CategoriesBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [mobileView, setMobileView] = useState("categories");

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  // Use your marketplace context
  const { categories, products, updateFilters } = useMarketplace();

  // Get all unique brands for a category/subcategory
  const getBrandsForCategory = (categoryId, subcategoryId = null) => {
    const categoryProducts = products.filter(p => p.category === categoryId);
    
    if (subcategoryId) {
      const subProducts = categoryProducts.filter(p => p.subcategory === subcategoryId);
      const brands = [...new Set(subProducts.map(p => p.brand).filter(Boolean))];
      return ['All ' + subcategoryId, ...brands];
    }
    
    const brands = [...new Set(categoryProducts.map(p => p.brand).filter(Boolean))];
    return ['All Brands', ...brands];
  };

  // Get featured products by checking boolean value
  // const getFeaturedProducts = (categoryId, subcategoryId = null) => {
  //   let filteredProducts = products.filter(p => p.category === categoryId);
    
  //   if (subcategoryId) {
  //     filteredProducts = filteredProducts.filter(p => p.subcategory === subcategoryId);
  //   }
    
  //   return filteredProducts
  //     .slice(0, 4) // Limit to 4 featured products
  //     .map(product => ({
  //       id: product.id,
  //       title: product.title,
  //       price: `₦${product.price.toLocaleString()}`,
  //       image: product.images?.[0] || "https://via.placeholder.com/400x300",
  //       brand: product.brand
  //     }));
  // };
  const getFeaturedProducts = (categoryId, subcategoryId = null) => {
    // Step 1: Filter by category
    let filteredProducts = products.filter(
      (p) => p.category === categoryId && p.featured === true
    );

    // Step 2: If subcategory is provided, filter further
    if (subcategoryId) {
      filteredProducts = filteredProducts.filter(
        (p) => p.subcategory === subcategoryId
      );
    }

    // Step 3: Limit to 4 and format output
    return filteredProducts
      .slice(0, 4)
      .map((product) => ({
        id: product.id,
        title: product.title,
        price: `₦${product.price.toLocaleString()}`,
        image: product.images?.[0] || "https://via.placeholder.com/400x300",
        brand: product.brand,
      }));
  };

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    const category = categories.find(c => c.id === categoryId);
    
    // Select first subcategory if exists
    if (category?.subcategories && category.subcategories.length > 0) {
      const firstSub = Array.isArray(category.subcategories) 
        ? category.subcategories[0].id || category.subcategories[0]
        : null;
      setSelectedSubcategory(firstSub);
    } else {
      setSelectedSubcategory(null);
    }
    
    if (window.innerWidth < 768) {
      setMobileView("subcategories");
    }
  };

  // Handle subcategory selection
  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
    if (window.innerWidth < 768) {
      setMobileView("brands");
    }
  };

  // Handle brand selection
  const handleBrandSelect = (brand) => {
    const filters = {
      category: selectedCategory
    };
    
    if (selectedSubcategory) {
      filters.subcategory = selectedSubcategory;
    }
    
    if (brand !== 'All Brands' && brand !== `All ${selectedSubcategory}`) {
      filters.brand = [brand];
    }
    
    updateFilters(filters);
    navigate('/marketplace');
    setDropdownOpen(false);
    resetSelections();
  };

  // Handle featured product click
  const handleFeaturedProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setDropdownOpen(false);
    resetSelections();
  };

  // Handle "Shop All" click
  const handleShopAll = () => {
    const filters = { category: selectedCategory };
    if (selectedSubcategory) {
      filters.subcategory = selectedSubcategory;
    }
    
    updateFilters(filters);
    navigate('/marketplace');
    setDropdownOpen(false);
    resetSelections();
  };

  // Reset all selections
  const resetSelections = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setMobileView("categories");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownOpen) {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(e.target) &&
          buttonRef.current &&
          !buttonRef.current.contains(e.target)
        ) {
          setDropdownOpen(false);
          resetSelections();
        }
      }
    };
    
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [dropdownOpen]);

  // Initialize first category when dropdown opens
  useEffect(() => {
    if (dropdownOpen && categories.length > 0 && !selectedCategory) {
      handleCategorySelect(categories[0].id);
    }
  }, [dropdownOpen, categories]);

  // Get current category data
  const currentCategory = categories.find(c => c.id === selectedCategory);
  
  // Get subcategories for current category
  const getSubcategories = () => {
    if (!currentCategory?.subcategories) return [];
    
    if (Array.isArray(currentCategory.subcategories)) {
      // Handle both array of strings and array of objects
      return currentCategory.subcategories.map(sub => 
        typeof sub === 'string' ? { id: sub, name: sub } : sub
      );
    }
    return [];
  };

  // Get brands for current selection
  const brands = getBrandsForCategory(selectedCategory, selectedSubcategory);
  
  // Get featured products for current selection
  const featuredProducts = getFeaturedProducts(selectedCategory, selectedSubcategory);

  // Loading state
  if (!categories || categories.length === 0) {
    return (
      <div className="bg-gray-50 border-b border-gray-200 z-40">
        <div className="container flex items-center gap-8 py-3 text-sm">
          <div className="flex items-center gap-1 font-medium text-gray-700">
            All Categories
          </div>
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  // Mobile Header Component
  const MobileHeader = ({ title, onBack }) => (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
      <button
        onClick={onBack}
        className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded transition-colors"
      >
        <ChevronLeft size={20} />
        <span className="text-sm text-gray-600">Back</span>
      </button>
      <h3 className="font-semibold text-gray-900 text-center flex-1">{title}</h3>
      <button
        onClick={() => {
          setDropdownOpen(false);
          resetSelections();
        }}
        className="p-1 hover:bg-gray-100 rounded transition-colors"
      >
        <X size={20} className="text-gray-600" />
      </button>
    </div>
  );

  const CategoriesView = ({ categories, onBack, onSelect }) => (
    <div className="flex flex-col h-full overflow-y-auto">
      <MobileHeader title="All Categories" onBack={onBack} />
      <div className="flex-1 h-full overflow-y-auto p-4 pb-0">
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.id}>
              <button
                onClick={() => onSelect(category.id)}
                className="w-full text-left px-4 py-4 rounded-lg flex items-center justify-between bg-gray-50 hover:bg-white hover:shadow-sm text-gray-700 border border-gray-200 transition-all"
              >
                <span className="font-medium flex items-center gap-3">
                  <span className="text-xl">{category.icon}</span>
                  <span>{category.name}</span>
                </span>
                <ChevronRight size={20} className="text-gray-400" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const SubcategoriesView = ({ category, subcategories, onBack, onSelect, onShopAll }) => (
    <>
      <MobileHeader title={category?.name || "Back"} onBack={onBack} />
      <div className="flex-1 h-full overflow-y-auto p-4">
        {subcategories.length > 0 ? (
          <>
            <ul className="space-y-2">
              {subcategories.map((sub) => (
                <li key={sub.id}>
                  <button
                    onClick={() => onSelect(sub.id)}
                    className="w-full text-left px-4 py-4 rounded-lg flex items-center justify-between bg-gray-50 hover:bg-white hover:shadow-sm text-gray-700 border border-gray-200 transition-all"
                  >
                    <span className="font-medium">{sub.name || sub.id}</span>
                    <ChevronRight size={20} className="text-gray-400" />
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={onShopAll}
              className="w-full mt-6 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Shop All {category?.name}
            </button>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No subcategories available</p>
            <button
              onClick={onShopAll}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Browse {category?.name}
            </button>
          </div>
        )}
      </div>
    </>
  );

  const BrandsView = ({ brands, category, subcategory, onBack, onSelect }) => (
    <>
      <MobileHeader
        title={subcategory || category?.name || "Brands"}
        onBack={onBack}
      />
      <div className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {brands.map((brand) => (
            <li key={brand}>
              <button
                onClick={() => onSelect(brand)}
                className="w-full text-left px-4 py-4 rounded-lg flex items-center justify-between bg-gray-50 hover:bg-white hover:shadow-sm text-gray-700 border border-gray-200 transition-all"
              >
                <span className="font-medium">{brand}</span>
                <ChevronRight size={20} className="text-gray-400" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
  

  return (
    <div className="bg-indigo-200 shadow-sm">
      <div className="container flex items-center gap-8 py-4 text-sm overflow-x-auto scrollbar-hide">
        {/* All Categories Button */}
        <button
          ref={buttonRef}
          onClick={() => {
            setDropdownOpen(!dropdownOpen);
            if (!dropdownOpen) {
              resetSelections();
            }
          }}
          className="flex items-center gap-1 font-medium text-gray-900 hover:text-blue-600 transition-colors whitespace-nowrap"
        >
          All Categories
          <ChevronDown
            size={16}
            className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Quick Links */}
        <button 
          onClick={() => {
            navigate('/marketplace');
            updateFilters({});
          }}
          className="text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap"
        >
          Featured selections
        </button>
        <button 
          onClick={() => {
            navigate('/marketplace');
            updateFilters({ sort: 'popularity' });
          }}
          className="text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap"
        >
          Best Sellers
        </button>
        <button 
          onClick={() => {
            navigate('/marketplace');
            updateFilters({ sort: 'newest' });
          }}
          className="text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap"
        >
          Newest Arrivals
        </button>

        {/* Overlay */}
        {dropdownOpen && (
          <div
            className="fixed inset-0 bg-black/70 -z-1"
            onClick={() => {
              setDropdownOpen(false);
              resetSelections();
            }}
          />
        )}

        {/* Mega Menu Dropdown - Desktop View */}
        {dropdownOpen && (
          <div
            ref={dropdownRef}
            className="fixed md:absolute left-1/2 -translate-x-1/2 top-16 md:top-full md:mt-2 w-full max-h-screen md:max-h-100 bg-transparent shadow-xl z-50 md:rounded-lg overflow-hidden px-0 md:px-10"
            // style={{ maxWidth: '1200px' }}
          >
            {/* DESKTOP VIEW - 4 Columns Layout */}
            <div className="container p-0! pr-2! md:rounded-lg bg-white hidden md:flex w-full max-h-100 overflow-hidden">
              {/* COLUMN 1: Main Categories */}
              <div className="w-58 border-r border-gray-200 bg-gray-50 overflow-y-auto">
                <div className="p-6">
                  <h4 className="font-bold text-gray-900 mb-4 text-lg">
                    All Categories
                  </h4>
                  <ul className="space-y-2">
                    {categories.map((category) => (
                      <li key={category.id}>
                        <button
                          onClick={() => handleCategorySelect(category.id)}
                          className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between transition-all ${
                            selectedCategory === category.id
                              ? "bg-white text-blue-600 font-semibold border border-blue-100 shadow-sm"
                              : "hover:bg-white hover:shadow-sm text-gray-700"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <span className="text-xl">{category.icon}</span>
                            <span>{category.name}</span>
                          </span>
                          <ChevronRight size={16} className="text-gray-400" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* COLUMN 2: Subcategories */}
              <div className="w-58 border-r border-gray-200 overflow-y-auto">
                <div className="p-6">
                  <h4 className="font-bold text-gray-900 mb-4 text-lg">
                    {currentCategory?.name || "Select Category"}
                  </h4>
                  {getSubcategories().length > 0 ? (
                    <>
                      <ul className="space-y-2 mb-6">
                        {getSubcategories().map((sub) => (
                          <li key={sub.id}>
                            <button
                              onClick={() => handleSubcategorySelect(sub.id)}
                              className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between transition-all capitalize ${
                                selectedSubcategory === sub.id
                                  ? "bg-blue-50 text-blue-600 font-medium border border-blue-100"
                                  : "hover:bg-gray-50 text-gray-700"
                              }`}
                            >
                              <span>{sub.name || sub.id}</span>
                              <ChevronRight size={16} className="text-gray-400" />
                            </button>
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={handleShopAll}
                        className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                      >
                        Shop All 
                        {/* {currentCategory?.name} */}
                      </button>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">No subcategories</p>
                      <button
                        onClick={handleShopAll}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                      >
                        Browse {currentCategory?.name}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* COLUMN 3: Brands */}
              <div className="w-52 border-r border-gray-200 overflow-y-auto">
                <div className="p-6">
                  <h4 className="font-bold text-gray-900 mb-4 text-lg capitalize">
                    {selectedSubcategory || currentCategory?.name || "Brands"}
                  </h4>
                  <ul className="space-y-2">
                    {brands.map((brand) => (
                      <li key={brand}>
                        <button
                          onClick={() => handleBrandSelect(brand)}
                          className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors text-sm"
                        >
                          {brand}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* COLUMN 4: Featured Products */}
              <div className="w-80 flex-1 min-w-0 overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="font-bold text-gray-900 text-lg">
                      FEATURED {selectedSubcategory?.toUpperCase() || currentCategory?.name?.toUpperCase() || "PRODUCTS"}
                    </h4>
                    {/* <button
                      onClick={handleShopAll}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      View All →
                    </button> */}
                  </div>
                  
                  {featuredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-3">
                      {featuredProducts.map((product) => (
                        <div key={product.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow bg-white flex items-start gap-2">
                          <div className="min-w-20 h-20 aspect-square bg-gray-100 rounded overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-full h-full flex-1 aspect-square object-cover"
                              onError={(e) => {
                                e.target.src = "https://via.placeholder.com/400x400";
                              }}
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <h5 className="text-sm font-medium text-gray-900 line-clamp-2">
                              {product.title}
                            </h5>
                            <p className="text-blue-600 font-bold text-xs">{product.price}</p>
                            {/* <button 
                              onClick={() => handleFeaturedProductClick(product.id)}
                              className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm transition-colors"
                            >
                              SHOP NOW →
                            </button> */}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8">
                      <p className="text-center mb-4">No featured products available</p>
                      <button
                        onClick={handleShopAll}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded text-sm transition-colors"
                      >
                        Browse {selectedSubcategory || currentCategory?.name}
                      </button>
                    </div>
                  )}
                </div>
              </div>



              {/* Column 5 - Promoted */}
              <div className="relative max-w-64">
                <PromotedSlider />
              </div>
            </div>

            <div className="md:hidden max-h-screen flex flex-col justify-between space-y-2 bg-white">
              {/* Top Section */}
              <div className="overflow-y-auto">
                {mobileView === "categories" && (
                  <CategoriesView
                    categories={categories}
                    onBack={() => {
                      setDropdownOpen(false);
                      resetSelections();
                    }}
                    onSelect={handleCategorySelect}
                  />
                )}

                {mobileView === "subcategories" && (
                  <SubcategoriesView
                    category={currentCategory}
                    subcategories={getSubcategories()}
                    onBack={() => setMobileView("categories")}
                    onSelect={handleSubcategorySelect}
                    onShopAll={handleShopAll}
                  />
                )}

                {mobileView === "brands" && (
                  <BrandsView
                    brands={brands}
                    category={currentCategory}
                    subcategory={selectedSubcategory}
                    onBack={() => setMobileView("subcategories")}
                    onSelect={handleBrandSelect}
                  />
                )}
              </div>

              {/* Promo Section */}
              <div className="w-full h-40 bg-primary/60 p-6 text-center text-white">
                <p className="text-lg font-bold">21% Discount</p>
                <p className="mt-2">Escape the noise, hear the magic with Xiaomi Earbuds.</p>
                <p className="mt-2">Starting price: N99 NGN</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesBar;