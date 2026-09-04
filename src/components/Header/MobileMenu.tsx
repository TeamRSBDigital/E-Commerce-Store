import React from 'react';
import { X, ShoppingBag, Heart, User, ChevronRight, Phone, Flame, Truck, ShieldCheck, Home, HelpCircle } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { MOCK_CATEGORIES } from '../../data/mockProducts';

export const MobileMenu: React.FC = () => {
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    navigateTo,
    setFilters,
    wishlistCount,
    cartCount
  } = useStore();

  if (!isMobileMenuOpen) return null;

  const handleCategoryClick = (categorySlug: string) => {
    setIsMobileMenuOpen(false);
    setFilters(prev => ({ ...prev, category: categorySlug }));
    navigateTo('shop');
  };

  const handleFlashDeals = () => {
    setIsMobileMenuOpen(false);
    setFilters(prev => ({ ...prev, onSaleOnly: true, category: 'all' }));
    navigateTo('shop');
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-bold">
              <ShoppingBag size={18} />
            </div>
            <span className="font-bold text-base tracking-tight">STOREFRONT</span>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Quick Access Badges */}
        <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 border-b border-slate-200">
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              navigateTo('wishlist');
            }}
            className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:text-emerald-600 transition-colors"
          >
            <Heart size={16} className="text-rose-500" />
            <span>Wishlist ({wishlistCount})</span>
          </button>

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              navigateTo('track-order');
            }}
            className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:text-emerald-600 transition-colors"
          >
            <HelpCircle size={16} className="text-amber-500" />
            <span>Track Order</span>
          </button>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {/* Main Links */}
          <div className="py-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigateTo('home');
              }}
              className="w-full text-left px-4 py-3 flex items-center gap-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              <Home size={18} className="text-emerald-600" />
              <span>Home</span>
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setFilters(prev => ({ ...prev, category: 'all', onSaleOnly: false }));
                navigateTo('shop');
              }}
              className="w-full text-left px-4 py-3 flex items-center gap-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              <ShoppingBag size={18} className="text-emerald-600" />
              <span>Shop All Products</span>
            </button>

            <button
              onClick={handleFlashDeals}
              className="w-full text-left px-4 py-3 flex items-center justify-between text-sm font-bold text-rose-600 hover:bg-rose-50/50"
            >
              <div className="flex items-center gap-3">
                <Flame size={18} className="fill-rose-500 text-rose-500" />
                <span>Flash Deals</span>
              </div>
              <span className="text-[10px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full font-extrabold uppercase">
                HOT SALE
              </span>
            </button>
          </div>

          {/* Categories List */}
          <div className="py-3">
            <div className="px-4 pb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              Browse Categories
            </div>
            {MOCK_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.slug)}
                className="w-full text-left px-4 py-2.5 flex items-center justify-between text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
              >
                <span>{cat.name}</span>
                <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-bold">
                  {cat.itemCount}
                </span>
              </button>
            ))}
          </div>

          {/* Delivery & Assurance */}
          <div className="p-4 space-y-2 text-xs text-slate-600 bg-slate-50/70">
            <div className="flex items-center gap-2">
              <Truck size={14} className="text-emerald-600 shrink-0" />
              <span>Cash on Delivery in 64 Districts</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
              <span>100% Genuine Brand Warranty</span>
            </div>
          </div>
        </div>

        {/* Footer Support Hotline */}
        <div className="p-4 border-t border-slate-200 bg-white">
          <p className="text-[11px] text-slate-500 mb-1">Need help with your order?</p>
          <a
            href="tel:+8801700000000"
            className="inline-flex items-center gap-2 font-bold text-slate-900 text-sm hover:text-emerald-600"
          >
            <Phone size={15} className="text-emerald-500" />
            <span>+880 1700-000000</span>
          </a>
        </div>
      </div>
    </div>
  );
};
