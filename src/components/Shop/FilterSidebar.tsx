import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { MOCK_CATEGORIES, MOCK_BRANDS, MOCK_PRODUCTS } from '../../data/mockProducts';
import { Star, Check, RotateCcw, Search, ChevronDown, ChevronUp } from 'lucide-react';

interface FilterSidebarProps {
  isMobileDrawer?: boolean;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ isMobileDrawer = false }) => {
  const { filters, setFilters, resetFilters, formatBDT, navigateTo } = useStore();
  const [brandSearch, setBrandSearch] = useState('');

  // Top rated items for sidebar widget (as in reference shop.html)
  const topRatedProducts = MOCK_PRODUCTS
    .filter(p => p.rating >= 4.8)
    .slice(0, 3);

  const handleCategoryClick = (categorySlug: string) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category === categorySlug ? 'all' : categorySlug
    }));
  };

  const handleBrandToggle = (brandName: string) => {
    setFilters(prev => {
      const exists = prev.brands.includes(brandName);
      const updated = exists
        ? prev.brands.filter(b => b !== brandName)
        : [...prev.brands, brandName];
      return { ...prev, brands: updated };
    });
  };

  const handleRatingClick = (ratingVal: number) => {
    setFilters(prev => ({
      ...prev,
      rating: prev.rating === ratingVal ? null : ratingVal
    }));
  };

  const filteredBrands = MOCK_BRANDS.filter(b =>
    b.name.toLowerCase().includes(brandSearch.toLowerCase())
  );

  return (
    <aside aria-label="Filters" className="space-y-6 text-slate-800">
      {/* Header with Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <h3 className="font-bold text-sm tracking-tight text-slate-900 uppercase">
          Filter Products
        </h3>
        <button
          onClick={resetFilters}
          className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1 transition-colors"
        >
          <RotateCcw size={12} />
          <span>Reset All</span>
        </button>
      </div>

      {/* 1. Category Filter */}
      <div className="space-y-2.5">
        <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900">
          Categories
        </h4>
        <div className="space-y-1">
          <button
            onClick={() => setFilters(prev => ({ ...prev, category: 'all' }))}
            className={`w-full text-left py-1.5 px-2 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
              filters.category === 'all'
                ? 'bg-emerald-50 text-emerald-700 font-bold'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>All Categories</span>
            <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-bold">
              {MOCK_PRODUCTS.length}
            </span>
          </button>

          {MOCK_CATEGORIES.map((cat) => {
            const isSelected = filters.category === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.slug)}
                className={`w-full text-left py-1.5 px-2 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                  isSelected
                    ? 'bg-emerald-50 text-emerald-700 font-bold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="truncate pr-2">{cat.name}</span>
                <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-bold shrink-0">
                  {cat.itemCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Price Range Filter */}
      <div className="space-y-3 pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900">
            Price Range (BDT)
          </h4>
          <span className="text-[11px] font-bold text-emerald-600">
            {formatBDT(filters.maxPrice)}
          </span>
        </div>

        {/* Range Slider */}
        <input
          type="range"
          min="1000"
          max="200000"
          step="1000"
          value={filters.maxPrice}
          onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
          className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none"
        />

        {/* Min / Max manual inputs */}
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs flex items-center">
            <span className="text-slate-400 mr-1 text-[11px]">৳</span>
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, minPrice: Math.max(0, Number(e.target.value)) }))}
              className="w-full bg-transparent font-medium text-slate-800 focus:outline-none text-xs"
              placeholder="Min"
            />
          </div>
          <span className="text-slate-400 text-xs">-</span>
          <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs flex items-center">
            <span className="text-slate-400 mr-1 text-[11px]">৳</span>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Math.max(filters.minPrice, Number(e.target.value)) }))}
              className="w-full bg-transparent font-medium text-slate-800 focus:outline-none text-xs"
              placeholder="Max"
            />
          </div>
        </div>
      </div>

      {/* 3. Brands Filter */}
      <div className="space-y-2.5 pt-3 border-t border-slate-100">
        <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900">
          Brands
        </h4>

        {/* Brand Search */}
        <div className="relative">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search brands..."
            value={brandSearch}
            onChange={(e) => setBrandSearch(e.target.value)}
            className="w-full py-1.5 pl-7 pr-3 bg-slate-50 border border-slate-200 rounded-lg text-xs placeholder:text-slate-400 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Checkbox list */}
        <div className="max-h-44 overflow-y-auto space-y-1 pr-1">
          {filteredBrands.map((brand) => {
            const isChecked = filters.brands.includes(brand.name);
            return (
              <label
                key={brand.id}
                className="flex items-center justify-between py-1 px-1.5 rounded hover:bg-slate-50 cursor-pointer text-xs text-slate-600 transition-colors select-none"
              >
                <div className="flex items-center gap-2">
                  <div
                    onClick={() => handleBrandToggle(brand.name)}
                    className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                      isChecked
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isChecked && <Check size={11} className="stroke-[3]" />}
                  </div>
                  <span className={isChecked ? 'font-bold text-slate-900' : ''}>{brand.name}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">({brand.productCount})</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 4. Customer Rating Filter */}
      <div className="space-y-2 pt-3 border-t border-slate-100">
        <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900">
          Customer Rating
        </h4>
        <div className="space-y-1">
          {[4.5, 4.0, 3.5].map((starThreshold) => {
            const isSelected = filters.rating === starThreshold;
            return (
              <button
                key={starThreshold}
                onClick={() => handleRatingClick(starThreshold)}
                className={`w-full py-1.5 px-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                  isSelected ? 'bg-amber-50 text-amber-900 font-bold' : 'hover:bg-slate-50 text-slate-600'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center text-amber-400">
                    <Star size={13} className="fill-amber-400" />
                  </div>
                  <span>{starThreshold} & Above</span>
                </div>
                {isSelected && <Check size={12} className="text-amber-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Availability / Deals Filter */}
      <div className="space-y-2 pt-3 border-t border-slate-100">
        <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900">
          Availability & Offers
        </h4>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={(e) => setFilters(prev => ({ ...prev, inStockOnly: e.target.checked }))}
              className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 accent-emerald-600"
            />
            <span>In Stock Items Only</span>
          </label>

          <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={filters.onSaleOnly}
              onChange={(e) => setFilters(prev => ({ ...prev, onSaleOnly: e.target.checked }))}
              className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 accent-emerald-600"
            />
            <span className="font-medium text-rose-600">On Sale / Discounted</span>
          </label>
        </div>
      </div>

      {/* 6. Top Rated Sidebar Widget (Present in reference shop.html) */}
      {!isMobileDrawer && (
        <div className="pt-5 border-t border-slate-200">
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 mb-3">
            Top Rated Products
          </h4>
          <div className="space-y-3">
            {topRatedProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => navigateTo('product-details', p.slug)}
                className="flex items-center gap-3 group cursor-pointer p-1.5 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-12 h-12 object-cover rounded-lg bg-slate-100 shrink-0"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <h5 className="text-xs font-semibold text-slate-800 group-hover:text-emerald-600 truncate transition-colors">
                    {p.title}
                  </h5>
                  <div className="flex items-center gap-1 text-[11px] text-amber-500 mt-0.5">
                    <Star size={11} className="fill-amber-400" />
                    <span className="font-bold text-slate-700">{p.rating}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-900 mt-0.5 block">
                    {formatBDT(p.price)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};
