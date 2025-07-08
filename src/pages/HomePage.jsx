import React, { useState, useEffect } from 'react';
import { ArrowRight, Clock, Star, MapPin, Utensils, ShoppingBag, Coffee } from 'lucide-react';
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
      <section className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Your favorite food,
                <span className="text-emerald-200"> delivered fast</span>
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-emerald-100">
                Order from the best local restaurants, stores, and brands with super-fast delivery
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center space-x-2 text-emerald-100">
                  <Clock className="w-5 h-5" />
                  <span>30 min delivery</span>
                </div>
                <div className="flex items-center space-x-2 text-emerald-100">
                  <Star className="w-5 h-5" />
                  <span>4.8 rating</span>
                </div>
                <div className="flex items-center space-x-2 text-emerald-100">
                  <MapPin className="w-5 h-5" />
                  <span>Available in 8 cities</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/4393426/pexels-photo-4393426.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Food delivery"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What would you like to order?
            </h2>
            <p className="text-xl text-gray-600">
              Choose from our three amazing services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <Link
                  key={service.id}
                  to={service.link}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="aspect-w-16 aspect-h-12 relative">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-80`}></div>
                  </div>
                  
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <div className="mb-4">
                      <IconComponent className="w-8 h-8 mb-3" />
                      <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                      <p className="text-sm opacity-90 mb-3">{service.description}</p>
                      
                      <div className="space-y-1">
                        {service.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{service.subtitle}</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Popular near you
            </h2>
            <p className="text-xl text-gray-600">
              Trending products from top-rated vendors
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <LoadingSpinner text="Loading featured products..." />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Cities Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              We deliver in
            </h2>
            <p className="text-xl text-gray-600">
              Available in major cities across India
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {cities.map((city) => (
              <div key={city.name} className="text-center group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all"></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{city.name}</h3>
                <p className="text-sm text-gray-600">{city.restaurants} restaurants</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to order?
          </h2>
          <p className="text-xl mb-8 text-emerald-100">
            Join millions of happy customers and get your favorite food delivered fast
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dineout"
              className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Order Now
            </Link>
            <Link
              to="/login"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;


