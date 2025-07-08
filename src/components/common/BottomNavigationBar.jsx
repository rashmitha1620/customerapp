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
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden shadow-lg">
      <div className="flex items-center justify-around py-3 px-2 safe-area-pb">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 min-w-0 flex-1 relative group ${
                item.active
                  ? 'text-emerald-600 bg-emerald-50'
                  : 'text-gray-500 hover:text-emerald-600 hover:bg-gray-50'
              }`}
            >
              <div className="relative mb-1">
                <IconComponent className="w-6 h-6" />
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1 border border-white shadow-md transform scale-90">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium text-center leading-tight truncate max-w-full">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigationBar;