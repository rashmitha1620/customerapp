import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, Zap, Globe, Store, ShoppingCart, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';
import { productsApi } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { formatCurrency } from '../utils/helpers';

const HomePage = ({ searchQuery }) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await productsApi.getProducts();
      // Get the first 4 products (which are now the recommended products)
      const featured = response.data.slice(0, 4);
      setFeaturedProducts(featured);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const stars = [];
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-3 h-3 ${i < fullStars ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
        {/* Special Offer Banner */}
        <div className="relative bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-2xl p-6 mb-6 overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-white text-lg font-bold mb-2">SPECIAL OFFER</h2>
            <h1 className="text-white text-3xl lg:text-4xl font-bold mb-4">
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
              className="w-16 h-16 object-cover rounded-lg shadow-lg"
            />
            <img
              src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=100"
              alt="Watch"
              className="w-12 h-12 object-cover rounded-lg shadow-lg"
            />
            <img
              src="https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=100"
              alt="Lotion"
              className="w-10 h-10 object-cover rounded-lg shadow-lg"
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

        {/* Recommended Products */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Recommended Products
          </h2>

          {loading ? (
            <div className="flex justify-center">
              <LoadingSpinner text="Loading recommended products..." />
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-24 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-medium text-sm text-gray-900 mb-1">{product.name}</h3>
                  <div className="flex items-center space-x-1 mb-2">
                    {product.rating === 5.0 ? (
                      <div className="flex space-x-1">
                        {renderStars(5)}
                      </div>
                    ) : (
                      <>
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600">{product.rating}</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm font-bold text-gray-900">{formatCurrency(product.price)}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Flash Deals */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Flash Deals</h2>
            <ArrowRight className="w-5 h-5 text-gray-400" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-red-400 to-red-500 rounded-xl p-4 text-white flex flex-col items-center">
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
      </div>
    </div>
  );
};

export default HomePage;