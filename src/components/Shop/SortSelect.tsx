import React from 'react';
import { LayoutGrid, Grid3X3, List, SlidersHorizontal } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { FilterState } from '../../types';

interface SortSelectProps {
  totalProducts: number;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  columns: 3 | 4;
  onColumnsChange: (cols: 3 | 4) => void;
}

export const SortSelect: React.FC<SortSelectProps> = ({
  totalProducts,
  viewMode,
  onViewModeChange,
  columns,
  onColumnsChange
}) => {
  const { filters, setFilters, setIsFilterDrawerOpen } = useStore();

  const activeFiltersCount =
    (filters.category !== 'all' ? 1 : 0) +
    filters.brands.length +
    (filters.rating ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.onSaleOnly ? 1 : 0) +
    (filters.searchQuery ? 1 : 0) +
    (filters.maxPrice < 200000 ? 1 : 0);

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-2xs mb-5">
      {/* Left: Products Count & Mobile Filter Trigger */}
      <div className="flex items-center justify-between sm:justify-start gap-3">
        <button
          onClick={() => setIsFilterDrawerOpen(true)}
          className="lg:hidden inline-flex items-center gap-2 bg-slate-900 text-white px-3.5 py-2 rounded-xl text-xs font-bold"
        >
          <SlidersHorizontal size={14} />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className="bg-emerald-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {activeFiltersCount}
            </span>
          )}
        </button>

        <span className="text-xs font-semibold text-slate-600">
          Showing <strong className="text-slate-900">{totalProducts}</strong> products
        </span>
      </div>

      {/* Right: Sorting and View Toggles */}
      <div className="flex items-center justify-between sm:justify-end gap-3">
        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort-by" className="text-xs text-slate-500 hidden md:inline font-medium">
            Sort by:
          </label>
          <select
            id="sort-by"
            value={filters.sortBy}
            onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as FilterState['sortBy'] }))}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
          >
            <option value="featured">Featured Deals</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest Arrivals</option>
            <option value="discount">Biggest Discount (%)</option>
          </select>
        </div>

        {/* View Mode Switcher */}
        <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => {
              onViewModeChange('grid');
              onColumnsChange(3);
            }}
            className={`p-1.5 rounded-lg transition-colors ${
              viewMode === 'grid' && columns === 3
                ? 'bg-white text-emerald-600 shadow-2xs font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            title="3 Columns Grid"
            aria-label="3 Columns Grid"
          >
            <Grid3X3 size={16} />
          </button>

          <button
            onClick={() => {
              onViewModeChange('grid');
              onColumnsChange(4);
            }}
            className={`p-1.5 rounded-lg transition-colors ${
              viewMode === 'grid' && columns === 4
                ? 'bg-white text-emerald-600 shadow-2xs font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            title="4 Columns Grid"
            aria-label="4 Columns Grid"
          >
            <LayoutGrid size={16} />
          </button>

          <button
            onClick={() => onViewModeChange('list')}
            className={`p-1.5 rounded-lg transition-colors ${
              viewMode === 'list'
                ? 'bg-white text-emerald-600 shadow-2xs font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            title="List View"
            aria-label="List View"
          >
            <List size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
