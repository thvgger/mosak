// Centralized data structure

import automobiles from "../assets/categories/automobiles.png";
import phones from "../assets/categories/phones.png";
import fashion from "../assets/categories/fashion.png";
import homes from "../assets/categories/homes.png";
import electronics from "../assets/categories/electronics.png";
import agriculture from "../assets/categories/agriculture.png";

export const marketplaceData = {
  categories: [
    {
      id: 'automobiles',
      name: 'Automobiles',
      icon: '🚗',
      color: "from-[#FE7309] to-[#C55500]",
      img: automobiles,
      subcategories: [
        { 
          id: 'cars', name: 'Cars',
          brands: [ 'Toyota', 'Honda', 'Mercedes-Benz', 'BMW', 'Lexus', 'Nissan', 'Ford', 'Hyundai', 'Kia', 'Volkswagen', 'Audi', 'Peugeot', 'Other']
        },
        { id: 'trucks', name: 'Trucks' },
        { id: 'motorcycles', name: 'Motorcycles' },
        { id: 'vehicle-parts', name: 'Vehicle Parts' }
      ]
    },
    {
      id: 'phones-tablets',
      name: 'Phones & Tablets',
      icon: '📱',
      color: "from-[#82F69B] to-[#396E45]",
      img: phones,
      subcategories: ['Samsung', 'Iphone', 'Realme', 'Xiaomi', 'Oppo', 'Vivo', 'Huawei', 'Infinix', 'Tecno']
    },
    {
      id: 'fashion',
      name: 'Fashion',
      icon: '👕',
      color: "from-[#24589B] to-[#0C1E35]",
      img: fashion,
      subcategories: ['men', 'women', 'kids', 'accessories']
    },
    {
      id: 'home-living',
      name: 'Homes & Living',
      icon: '🏠',
      color: "from-[#CC8CA6] to-[#6F4556]",
      img: homes,
      subcategories: ['furniture', 'appliances', 'decor', 'kitchen']
    },
    {
      id: 'electronics',
      name: 'Electronics',
      icon: '🔌',
      color: "from-[#004B14] to-[#00B12F]",
      img: electronics,
      subcategories: [ 'laptops', 'gas-cooker', 'audio', 'gaming']
    },
    // {
    //   id: 'services',
    //   name: 'Services',
    //   icon: '🔧',
    //   color: "from-[#ADBF81] to-[#51593C]",
    //   subcategories: ['professional', 'home-services', 'automotive', 'beauty']
    // },
    {
      id: 'agriculture',
      name: 'Agriculture',
      icon: '🚜',
      color: "from-[#ADBF81] to-[#51593C]",
      img: agriculture,
      subcategories: ['equipment', 'supplies', 'livestock', 'produce']
    }
  ],

  // Products data
  products: [
    {
      id: '1',
      title: '2015 Porsche Macan Turbo - Fully Loaded',
      description: 'Imported from USA. Clean title, no accident history.',
      price: 22000000,
      originalPrice: 44000000,
      discount: 50,
      featured: true,
      trending: true,
      category: 'automobiles',
      subcategory: 'cars',
      brand: 'Porsche',
      condition: 'foreign-used',
      badge: 'silver',
      location: 'Lagos',
      year: 2015,
      transmission: 'automatic',
      fuelType: 'petrol',
      mileage: 75000,
      seller: {
        id: 'seller1',
        name: 'Auto Elite Motors',
        verified: true,
        rating: 4.8
      },
      images: ['https://images.unsplash.com/photo-1692595891435-f098f7538887?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1629791191284-1930e995d7e6?q=80&w=465&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://placehold.co/400'],
      features: ['Premium build quality with attention to detail', 'Latest technology and innovative features', 'Comprehensive warranty coverage', 'Fast and secure delivery', 'Panoramic Sunroof', 'Premium Audio', 'Backup Camera'],
      createdAt: '2024-01-15',
      views: 1250,
      reviews: 20,
      favorites: 89
    },
    {
      id: '2',
      title: '2020 Toyota Camry XLE',
      description: 'Excellent condition, one owner, full service history.',
      price: 8500000,
      originalPrice: 9500000,
      discount: 10,
      featured: true,
      trending: true,
      category: 'automobiles',
      subcategory: 'cars',
      brand: 'Toyota',
      condition: 'foreign-used',
      badge: 'gold',
      location: 'Abuja',
      year: 2020,
      mileage: 45000,
      seller: {
        id: 'seller2',
        name: 'Toyota Certified',
        verified: true,
        rating: 4.9
      },
      images: ['https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2FyfGVufDB8fDB8fHww', 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNhcnxlbnwwfHwwfHx8MA%3D%3D'],
      features: ['Sunroof', 'Navigation', 'Backup Camera'],
      createdAt: '2024-01-20',
      views: 980,
      reviews: 42,
      favorites: 45
    },
    {
      id: '3',
      title: '2017 Ford Ranger Raptor',
      description: 'Off-road capable pickup truck.',
      price: 18000000,
      originalPrice: 22000000,
      discount: 18,
      featured: true, // feature booloean value set to true
      trending: true,
      category: 'automobiles',
      subcategory: 'Trucks',
      brand: 'Ford',
      condition: 'foreign-used',
      badge: 'platinum',
      location: 'Port Harcourt',
      year: 2017,
      mileage: 65000,
      seller: {
        id: 'seller3',
        name: 'Truck Masters',
        verified: true,
        rating: 4.6
      },
      images: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FyfGVufDB8fDB8fHww', 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhcnxlbnwwfHwwfHx8MA%3D%3D'],
      features: ['4x4', 'Off-road Package', 'Leather Interior'],
      createdAt: '2024-01-14',
      views: 1200,
      reviews: 11,
      favorites: 67
    },
    {
      id: '4',
      title: 'Gaming Laptop',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 18000000,
      originalPrice: 850000,
      discount: 18,
      featured: true,
      trending: true,
      category: 'electronics',
      subcategory: 'laptops',
      brand: 'Hp',
      condition: 'foreign-used',
      badge: 'gold',
      location: 'Port Harcourt',
      year: 2017,
      storage: '512gb',
      ram: '16gb',
      networkType: '5g',
      battery: 4500,
      seller: {
        id: 'seller4',
        name: 'TechHub NG',
        verified: true,
        rating: 4.6
      },
      images: ['https://images.unsplash.com/photo-1556438064-2d7646166914?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', "https://images.unsplash.com/photo-1641623410264-948701015656?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1623870606070-c41ac6c46a4d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
      features: ['4x4', 'Off-road Package', 'Leather Interior'],
      createdAt: '2024-01-14',
      views: 1200,
      favorites: 67
    },
    {
      id: '5',
      title: 'Gaming Laptop',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 18000000,
      originalPrice: 850000,
      discount: 18,
      featured: true,
      trending: true,
      category: 'electronics',
      subcategory: 'laptops',
      brand: 'Dell',
      condition: 'foreign-used',
      badge: 'gold',
      location: 'Port Harcourt',
      year: 2017,
      mileage: 65000,
      seller: {
        id: 'seller5',
        name: 'TechHub NG',
        verified: true,
        rating: 4.6
      },
      images: ['https://images.unsplash.com/photo-1599604079629-bb0dfe72f847?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', "https://images.unsplash.com/photo-1641623410264-948701015656?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1623870606070-c41ac6c46a4d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
      features: ['4x4', 'Off-road Package', 'Leather Interior'],
      createdAt: '2024-01-14',
      views: 1200,
      favorites: 67
    },
    {
      id: 6,
      title: 'Samsung S23 Ultra',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 18000000,
      originalPrice: 850000,
      discount: 18,
      featured: true,
      trending: true,
      category: 'phones-tablets',
      subcategory: 'Samsung',
      brand: 'Dell',
      condition: 'foreign-used',
      badge: 'gold',
      location: 'Port Harcourt',
      year: 2017,
      mileage: 65000,
      seller: {
        id: 'seller5',
        name: 'TechHub NG',
        verified: true,
        rating: 4.6
      },
      images: [
        'https://images.unsplash.com/photo-1678911820864-e2c567c655d7?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
        'https://images.unsplash.com/photo-1599604079629-bb0dfe72f847?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
        "https://images.unsplash.com/photo-1641623410264-948701015656?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
        // "https://images.unsplash.com/photo-1623870606070-c41ac6c46a4d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      features: ['4x4', 'Off-road Package', 'Leather Interior'],
      createdAt: '2024-01-14',
      views: 1200,
      favorites: 67
    }
    // Add more products...
  ],

  // Filter options
  filterOptions: {
    conditions: [
      { id: 'new', name: 'New' },
      { id: 'foreign-used', name: 'Foreign Used' },
      { id: 'nigerian-used', name: 'Nigerian Used' },
      { id: 'refurbished', name: 'Refurbished' }
    ],
    badges: [
      { id: 'diamond', name: 'Diamond' },
      { id: 'platinum', name: 'PLATINUM' },
      { id: 'gold', name: 'Gold' },
      { id: 'silver', name: 'Silver' },
      { id: 'bronze', name: 'Bronze' }
    ],
    priceRanges: [
      { id: '0-2m', label: 'Less than ₦2M', min: 0, max: 2000000 },
      { id: '2m-3m', label: '₦2M - ₦3M', min: 2000000, max: 3000000 },
      { id: '3m-4m', label: '₦3M - ₦4M', min: 3000000, max: 4000000 },
      { id: '4m-5m', label: '₦4M - ₦5M', min: 4000000, max: 5000000 },
      { id: '5m-plus', label: 'Above ₦5M', min: 5000000, max: 100000000 }
    ],
    yearRanges: [
      { id: '2022-2026', label: '2022 - 2026', min: 2022, max: 2026 },
      { id: '2017-2021', label: '2017 - 2021', min: 2017, max: 2021 },
      { id: '2012-2016', label: '2012 - 2016', min: 2012, max: 2016 },
      { id: '2007-2011', label: '2007 - 2011', min: 2007, max: 2011 }
    ],
    locations: [
      'Lagos', 'Abuja', 'Ibadan', 'Kano', 'Port Harcourt', 
      'Benin City', 'Kaduna', 'Maiduguri', 'Zaria', 'Aba'
    ]
  }
};


// Helper functions - Add this new function
export const getTrendingProducts = (limit = 4) => {
  return [...marketplaceData.products]
    .filter(product => product.trending === true) // Only trending products
    .sort((a, b) => b.views - a.views) // Sort by popularity
    .slice(0, limit);
};

// Helper functions
export const getCategoryById = (categoryId) => {
  return marketplaceData.categories.find(cat => cat.id === categoryId);
};

export const getProductsByCategory = (categoryId) => {
  return marketplaceData.products.filter(product => product.category === categoryId);
};

export const getSubcategoryProducts = (categoryId, subcategoryId) => {
  return marketplaceData.products.filter(
    product => product.category === categoryId && product.subcategory === subcategoryId
  );
};

export const getProductById = (productId) => {
  return marketplaceData.products.find(product => product.id === productId);
};

export const getFeaturedProducts = (limit = 4) => {
  return [...marketplaceData.products]
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
};

export const getBestSellingProducts = (limit = 4) => {
  return [...marketplaceData.products]
    .sort((a, b) => b.favorites - a.favorites)
    .slice(0, limit);
};