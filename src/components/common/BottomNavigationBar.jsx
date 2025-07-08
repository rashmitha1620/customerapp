import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Grid3X3, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

const BottomNavigationBar = () => {
  const location = useLocation();
  const { getCartItemsCount } = useCart();

  const navItems = [
    {
      name: 'Home',
      icon: Home,
      path: '/',
      active: location.pathname === '/'
    },
    {
      name: 'Search',
      icon: Search,
      path: '/search',
      active: location.pathname === '/search'
    },
    {
      name: 'Categories',
      icon: Grid3X3,
      path: '/categories',
      active: location.pathname === '/categories'
    },
    {
      name: 'Cart',
      icon: ShoppingCart,
      path: '/cart',
      active: location.pathname === '/cart',
      badge: getCartItemsCount()
    },
    {
      name: 'Profile',
      icon: User,
      path: '/profile',
      active: location.pathname === '/profile'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors ${
                item.active
                  ? 'text-emerald-600'
                  : 'text-gray-500 hover:text-emerald-600'
              }`}
            >
              <div className="relative">
                <IconComponent className="w-6 h-6" />
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs mt-1 font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigationBar;