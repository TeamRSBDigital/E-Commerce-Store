import React, { useState, useRef, useEffect } from 'react';
import { LayoutGrid, Flame, ChevronDown, Sparkles, Zap, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { MOCK_CATEGORIES } from '../../data/mockProducts';

export const Navigation: React.FC = () => {
  const { navigateTo, setFilters } = useStore();
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsCategoryMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategorySelect = (categorySlug: string) => {
    setIsCategoryMenuOpen(false);
    setFilters(prev => ({ ...prev, category: categorySlug }));
    navigateTo('shop');
  };

  const handleFlashDealsClick = () => {
    setFilters(prev => ({ ...prev, onSaleOnly: true, category: 'all' }));
    navigateTo('shop');
  };

  return (
    <nav aria-label="Main Navigation" className="hidden lg:block bg-white border-b border-slate-200 text-sm font-medium">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          {/* All Categories Trigger & Dropdown */}
          <div ref={menuRef} className="relative">
            <button
              onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              className="flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3.5 font-bold transition-colors select-none"
              aria-expanded={isCategoryMenuOpen}
              aria-haspopup="true"
            >
              <LayoutGrid size={17} />
              <span>All Categories</span>
              <ChevronDown size={15} className={`transition-transform duration-200 ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Mega Menu / Categories Dropdown */}
            {isCategoryMenuOpen && (
              <div className="absolute left-0 top-full w-72 bg-white border border-slate-200 shadow-xl rounded-b-xl z-50 py-2 divide-y divide-slate-100 animate-in fade-in-50 duration-150">
                {MOCK_CATEGORIES.map((cat) => (
                  <div key={cat.id} className="group relative">
                    <button
                      onClick={() => handleCategorySelect(cat.slug)}
                      className="w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all"></span>
                        <span className="text-xs font-semibold">{cat.name}</span>
                      </div>
                      <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold">
                        {cat.itemCount}
                      </span>
                    </button>
                  </div>
                ))}

                <div className="p-3 bg-slate-50 mt-1">
                  <div className="flex items-center gap-2 text-[11px] text-slate-600">
                    <Truck size={13} className="text-emerald-600 shrink-0" />
                    <span>Free Shipping over ৳2,500 inside Dhaka</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Primary Nav Links */}
          <ul className="flex items-center gap-6 text-slate-700 text-xs tracking-wide">
            <li>
              <button
                onClick={() => navigateTo('home')}
                className="py-3.5 hover:text-emerald-600 font-semibold transition-colors"
              >
                Home
              </button>
            </li>

            <li>
              <button
                onClick={() => {
                  setFilters(prev => ({ ...prev, category: 'all', onSaleOnly: false }));
                  navigateTo('shop');
                }}
                className="py-3.5 hover:text-emerald-600 font-semibold transition-colors"
              >
                Shop Catalog
              </button>
            </li>

            <li>
              <button
                onClick={() => handleCategorySelect('smartphones-gadgets')}
                className="py-3.5 hover:text-emerald-600 transition-colors"
              >
                Smartphones & Gadgets
              </button>
            </li>

            <li>
              <button
                onClick={() => handleCategorySelect('audio-headphones')}
                className="py-3.5 hover:text-emerald-600 transition-colors"
              >
                Audio & Wearables
              </button>
            </li>

            <li>
              <button
                onClick={() => handleCategorySelect('mens-fashion')}
                className="py-3.5 hover:text-emerald-600 transition-colors"
              >
                Men's Fashion
              </button>
            </li>

            <li>
              <button
                onClick={() => handleCategorySelect('womens-fashion')}
                className="py-3.5 hover:text-emerald-600 transition-colors"
              >
                Women's Fashion
              </button>
            </li>

            <li>
              <button
                onClick={handleFlashDealsClick}
                className="py-3.5 inline-flex items-center gap-1 text-rose-600 font-bold hover:text-rose-700 transition-colors group"
              >
                <Flame size={15} className="fill-rose-500 text-rose-500 animate-pulse" />
                <span>Flash Deals</span>
                <span className="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded-full font-extrabold uppercase ml-1">
                  HOT
                </span>
              </button>
            </li>
          </ul>
        </div>

        {/* Right Help / Contact link */}
        <div className="flex items-center gap-4 text-xs">
          <button
            onClick={() => navigateTo('track-order')}
            className="text-slate-600 hover:text-emerald-600 font-medium inline-flex items-center gap-1.5 transition-colors"
          >
            <Zap size={14} className="text-amber-500" />
            <span>Track Order</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
