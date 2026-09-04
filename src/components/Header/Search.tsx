import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, X, ArrowRight, Tag } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '../../data/mockProducts';
import { Product } from '../../types';

interface SearchProps {
  isMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Search: React.FC<SearchProps> = ({ isMobile = false, onCloseMobile }) => {
  const { searchQuery, setSearchQuery, handleSearchSubmit, navigateTo, formatBDT } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced live suggestion calculation
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) {
      setSuggestions([]);
      setIsDropdownOpen(false);
      return;
    }

    const timer = setTimeout(() => {
      const q = searchQuery.toLowerCase().trim();
      let matched = MOCK_PRODUCTS.filter(p => {
        const matchesQuery = p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q));

        if (selectedCategory !== 'all') {
          return matchesQuery && p.categorySlug === selectedCategory;
        }
        return matchesQuery;
      });

      setSuggestions(matched.slice(0, 5));
      setIsDropdownOpen(true);
    }, 180);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory]);

  // Click outside to close suggestion dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDropdownOpen(false);
    if (onCloseMobile) onCloseMobile();
    handleSearchSubmit(searchQuery);
  };

  const handleSelectProduct = (product: Product) => {
    setIsDropdownOpen(false);
    if (onCloseMobile) onCloseMobile();
    navigateTo('product-details', product.slug);
  };

  return (
    <div ref={dropdownRef} className={`relative ${isMobile ? 'w-full' : 'flex-1 max-w-2xl'}`}>
      <form
        onSubmit={onSubmit}
        className="flex items-center bg-white border border-slate-300 hover:border-emerald-500 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/20 rounded-lg transition-all shadow-xs"
      >
        {/* Category selector on desktop */}
        {!isMobile && (
          <div className="relative border-r border-slate-200 shrink-0">
            <select
              aria-label="Filter products by category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-transparent py-2.5 pl-3 pr-8 text-xs font-medium text-slate-700 hover:text-slate-900 cursor-pointer focus:outline-none"
            >
              <option value="all">All Categories</option>
              {MOCK_CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.slug}>{cat.name}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]">
              ▼
            </div>
          </div>
        )}

        {/* Input field */}
        <div className="relative flex-1 flex items-center">
          <input
            ref={inputRef}
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              if (suggestions.length > 0) setIsDropdownOpen(true);
            }}
            placeholder="Search Walton, Samsung, Panjabi, Gadgets..."
            className="w-full py-2.5 pl-3 pr-8 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSuggestions([]);
                setIsDropdownOpen(false);
                inputRef.current?.focus();
              }}
              className="absolute right-2 text-slate-400 hover:text-slate-600 p-1"
              title="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Search Submit Button */}
        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-r-md transition-colors flex items-center justify-center shrink-0"
          aria-label="Search"
        >
          <SearchIcon size={16} />
        </button>
      </form>

      {/* Instant Suggestions Dropdown */}
      {isDropdownOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden divide-y divide-slate-100 animate-in fade-in-50 duration-150">
          {suggestions.length > 0 ? (
            <>
              <div className="px-3.5 py-2 bg-slate-50 flex items-center justify-between text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
                <span>Matching Products ({suggestions.length})</span>
                <span>Press Enter to View All</span>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {suggestions.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelectProduct(p)}
                    className="w-full text-left p-2.5 hover:bg-emerald-50/50 flex items-center gap-3 transition-colors group"
                  >
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-11 h-11 object-cover rounded-md bg-slate-100 shrink-0"
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-900 group-hover:text-emerald-700 truncate">
                        {p.title}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-bold text-emerald-600">
                          {formatBDT(p.price)}
                        </span>
                        {p.originalPrice && (
                          <span className="text-[11px] text-slate-400 line-through">
                            {formatBDT(p.originalPrice)}
                          </span>
                        )}
                        <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                          {p.brand}
                        </span>
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                ))}
              </div>

              <button
                onClick={onSubmit}
                className="w-full text-center py-2.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50/40 hover:bg-emerald-50 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>View all results for "{searchQuery}"</span>
                <ArrowRight size={13} />
              </button>
            </>
          ) : (
            <div className="p-4 text-center">
              <Tag size={20} className="mx-auto text-slate-400 mb-1" />
              <p className="text-xs font-medium text-slate-700">No products match "{searchQuery}"</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Try searching for 'Samsung', 'Walton', 'Headphones', or 'Panjabi'</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
