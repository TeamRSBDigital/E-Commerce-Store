import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, User, Menu, Search as SearchIcon, X, Check, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Search } from './Search';
import { AnnouncementBar } from './AnnouncementBar';
import { Navigation } from './Navigation';

export const Header: React.FC = () => {
  const {
    navigateTo,
    cartCount,
    cartSubtotal,
    wishlistCount,
    setIsCartOpen,
    setIsMobileMenuOpen,
    formatBDT
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="w-full bg-white z-40">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Main Header */}
      <div className={`transition-all duration-200 border-b border-slate-100 ${isScrolled ? 'sticky top-0 bg-white/95 backdrop-blur-md shadow-xs' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3 md:gap-6">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-700 hover:text-emerald-600 rounded-lg transition-colors"
              aria-label="Open mobile menu"
            >
              <Menu size={22} />
            </button>

            {/* Brand Logo */}
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-2 text-left focus:outline-none group shrink-0"
              title="Return to Home"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-600 group-hover:bg-emerald-700 flex items-center justify-center text-white font-black text-lg shadow-sm shadow-emerald-600/30 transition-all group-hover:scale-105">
                <ShoppingBag size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 leading-none">
                  STORE<span className="text-emerald-600">FRONT</span>
                </span>
                <span className="text-[10px] tracking-wider text-slate-400 font-semibold uppercase">
                  Bangladesh Official
                </span>
              </div>
            </button>

            {/* Desktop Search Bar */}
            <div className="hidden lg:flex flex-1 justify-center max-w-xl mx-4">
              <Search />
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              {/* Mobile Search Trigger */}
              <button
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                className="lg:hidden p-2 text-slate-700 hover:text-emerald-600 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Toggle search"
              >
                {isMobileSearchOpen ? <X size={20} /> : <SearchIcon size={20} />}
              </button>

              {/* Account Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                  className="flex items-center gap-2 p-2 sm:px-3 text-slate-700 hover:text-emerald-600 hover:bg-slate-50 rounded-lg transition-colors text-left"
                  aria-label="User Account"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                    <User size={18} />
                  </div>
                  <div className="hidden xl:flex flex-col text-xs leading-tight">
                    <span className="text-slate-400 text-[10px]">Hello, Sign in</span>
                    <span className="font-bold text-slate-800">My Account</span>
                  </div>
                </button>

                {isAccountMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-2 divide-y divide-slate-100 animate-in fade-in-50 duration-150">
                    <div className="p-3 bg-slate-50">
                      <p className="text-xs font-bold text-slate-900">Welcome to Storefront</p>
                      <p className="text-[11px] text-slate-500">Access orders, wishlist & addresses</p>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setIsAccountMenuOpen(false);
                          navigateTo('track-order');
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                      >
                        Track My Order
                      </button>
                      <button
                        onClick={() => {
                          setIsAccountMenuOpen(false);
                          navigateTo('wishlist');
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                      >
                        My Wishlist ({wishlistCount})
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => navigateTo('wishlist')}
                className="relative p-2 sm:px-3 flex items-center gap-2 text-slate-700 hover:text-emerald-600 hover:bg-slate-50 rounded-lg transition-colors"
                aria-label={`Wishlist with ${wishlistCount} items`}
              >
                <div className="relative">
                  <Heart size={21} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-in zoom-in">
                      {wishlistCount}
                    </span>
                  )}
                </div>
                <div className="hidden xl:flex flex-col text-xs leading-tight text-left">
                  <span className="text-slate-400 text-[10px]">Favorites</span>
                  <span className="font-bold text-slate-800">Wishlist</span>
                </div>
              </button>

              {/* Cart Button with Count & Subtotal */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 sm:gap-3 bg-slate-900 hover:bg-emerald-600 text-white p-2 sm:px-3.5 sm:py-2.5 rounded-xl transition-all shadow-sm group"
                aria-label={`Cart with ${cartCount} items totaling ${formatBDT(cartSubtotal)}`}
              >
                <div className="relative">
                  <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2.5 bg-emerald-500 text-white text-[11px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-slate-900">
                      {cartCount}
                    </span>
                  )}
                </div>

                <div className="hidden sm:flex flex-col text-xs text-left leading-tight">
                  <span className="text-[10px] text-slate-300 font-medium group-hover:text-emerald-100">My Cart</span>
                  <span className="font-black text-white">
                    {formatBDT(cartSubtotal)}
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Search Expandable Drawer */}
          {isMobileSearchOpen && (
            <div className="lg:hidden mt-3 pt-3 border-t border-slate-100 animate-in slide-in-from-top-2 duration-150">
              <Search isMobile onCloseMobile={() => setIsMobileSearchOpen(false)} />
            </div>
          )}
        </div>
      </div>

      {/* Main Category / Mega Navigation */}
      <Navigation />
    </header>
  );
};
