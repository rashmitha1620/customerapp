import React, { useState, useEffect } from 'react';
import { ArrowRight, Clock, Star, MapPin, Utensils, ShoppingBag, Coffee, Zap, Globe, Store } from 'lucide-react';
import { Link } from 'react-router-dom';
import { productsApi } from '../services/api';
import ProductCard from '../components/products/ProductCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

const HomePage = ({ searchQuery }) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await productsApi.getProducts();
      // Get featured products for each category
      const featured = response.data.slice(0, 6);
      setFeaturedProducts(featured);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  const services = [
    {
      id: 'dineout',
      title: 'Dine Out',
      subtitle: 'Express Delivery',
      description: 'Get your favorite meals delivered in 30 minutes',
      icon: Utensils,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-orange-500 to-red-500',
      link: '/dineout',
      features: ['30 min delivery', 'Hot & Fresh', '500+ restaurants']
    },
    {
      id: 'food-delivery',
      title: 'Food Delivery',
      subtitle: 'City Mart',
      description: 'Order from local stores and restaurants',
      icon: ShoppingBag,
      image: 'https://images.pexels.com/photos/4393426/pexels-photo-4393426.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-emerald-500 to-green-500',
      link: '/food-delivery',
      features: ['Local stores', 'Fresh groceries', 'Same day delivery']
    },
    {
      id: 'instamart',
      title: 'InstaMart',
      subtitle: 'Nationwide Shopping',
      description: 'Shop from anywhere, delivered nationwide',
      icon: Coffee,
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      color: 'from-purple-500 to-indigo-500',
      link: '/instamart',
      features: ['Nationwide delivery', 'Premium brands', '2-5 days delivery']
    }
  ];

  const cities = [
    { name: 'Mumbai', restaurants: '12,000+', image: 'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Delhi', restaurants: '15,000+', image: 'https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Bangalore', restaurants: '10,000+', image: 'https://images.pexels.com/photos/1722183/pexels-photo-1722183.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Chennai', restaurants: '8,000+', image: 'https://images.pexels.com/photos/1722198/pexels-photo-1722198.jpeg?auto=compress&cs=tinysrgb&w=300' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 pt-4">
        <div className="max-w-7xl mx-auto">
          {/* Special Offer Banner */}
          <div className="relative bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-2xl p-6 mb-6 overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-white text-lg font-bold mb-2">SPECIAL OFFER</h2>
              <h1 className="text-white text-3xl font-bold mb-4">
                UP TO<br />
                50% OFF
              </h1>
              {/* Pagination dots */}
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                <div className="w-2 h-2 bg-white/50 rounded-full"></div>
              </div>
            </div>
            {/* Product images */}
            <div className="absolute right-4 top-4 flex flex-col space-y-2">
              <img
                src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=100"
                alt="Shoe"
                className="w-16 h-16 object-cover rounded-lg"
              />
              <img
                src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=100"
                alt="Watch"
                className="w-12 h-12 object-cover rounded-lg"
              />
              <img
                src="https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=100"
                alt="Lotion"
                className="w-10 h-10 object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Service Categories */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <Link
              to="/dineout"
              className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <Zap className="w-8 h-8 text-emerald-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Express</span>
            </Link>
            <Link
              to="/instamart"
              className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <Globe className="w-8 h-8 text-emerald-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Nationwide</span>
            </Link>
            <Link
              to="/food-delivery"
              className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <Store className="w-8 h-8 text-emerald-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">City Mart</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Recommended Products */}
      <section className="py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Recommended Products
          </h2>

          {loading ? (
            <div className="flex justify-center">
              <LoadingSpinner text="Loading featured products..." />
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredProducts.slice(0, 4).map((product) => (
                <div key={product.id} className="bg-white rounded-lg p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-24 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-medium text-sm text-gray-900 mb-1">{product.name}</h3>
                  <div className="flex items-center space-x-1 mb-2">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600">{product.rating}</span>
                  </div>
                  <p className="text-sm font-bold text-gray-900">₹{product.price}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Flash Deals */}
      <section className="py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Flash Deals</h2>
            <ArrowRight className="w-5 h-5 text-gray-400" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-red-400 to-red-500 rounded-xl p-4 text-white">
              <Zap className="w-6 h-6 mb-2" />
              <span className="text-sm font-medium">Flash Deals</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center">
              <ShoppingCart className="w-6 h-6 text-emerald-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Grocery</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center">
              <Coffee className="w-6 h-6 text-emerald-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Skincare</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;


