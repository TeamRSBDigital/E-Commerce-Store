import React, { useState, useEffect } from 'react';
import { Breadcrumb } from '../components/Common/Breadcrumb';
import { FilterSidebar } from '../components/Shop/FilterSidebar';
import { MobileFilterDrawer } from '../components/Shop/MobileFilterDrawer';
import { SortSelect } from '../components/Shop/SortSelect';
import { ProductGrid } from '../components/Product/ProductGrid';
import { useStore } from '../context/StoreContext';
import { productsApi } from '../api/productsApi';
import { Product } from '../types';
import { X, ChevronLeft, ChevronRight, SlidersHorizontal, RefreshCw } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { filters, setFilters, resetFilters, formatBDT, setIsFilterDrawerOpen } = useStore();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [columns, setColumns] = useState<3 | 4>(3);

  const PAGE_SIZE = 9;

  // Load products based on current filters and pagination
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    productsApi
      .getProducts({
        category: filters.category,
        brands: filters.brands,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        rating: filters.rating,
        inStockOnly: filters.inStockOnly,
        onSaleOnly: filters.onSaleOnly,
        searchQuery: filters.searchQuery,
        sortBy: filters.sortBy,
        page: currentPage,
        pageSize: PAGE_SIZE
      })
      .then((res) => {
        if (!isMounted) return;
        setProducts(res.products);
        setTotalCount(res.total);
        setTotalPages(res.totalPages);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [filters, currentPage]);

  // Remove individual active filter
  const removeCategoryFilter = () => {
    setFilters(prev => ({ ...prev, category: 'all' }));
  };

  const removeBrandFilter = (brandName: string) => {
    setFilters(prev => ({ ...prev, brands: prev.brands.filter(b => b !== brandName) }));
  };

  const removeRatingFilter = () => {
    setFilters(prev => ({ ...prev, rating: null }));
  };

  const removePriceFilter = () => {
    setFilters(prev => ({ ...prev, minPrice: 0, maxPrice: 200000 }));
  };

  const removeSearchFilter = () => {
    setFilters(prev => ({ ...prev, searchQuery: '' }));
  };

  const hasActiveFilters =
    filters.category !== 'all' ||
    filters.brands.length > 0 ||
    filters.rating !== null ||
    filters.inStockOnly ||
    filters.onSaleOnly ||
    filters.searchQuery.trim() !== '' ||
    filters.maxPrice < 200000 ||
    filters.minPrice > 0;

  const currentCategoryLabel =
    filters.category === 'all'
      ? 'All Products'
      : filters.category
          .split('-')
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');

  return (
    <div className="bg-slate-50/50 min-h-screen pb-16">
      {/* 1. Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Shop', view: 'shop' },
          { label: currentCategoryLabel, active: true }
        ]}
      />

      {/* 2. Shop Header */}
      <div className="bg-white border-b border-slate-200 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {filters.searchQuery ? `Search Results for "${filters.searchQuery}"` : currentCategoryLabel}
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Explore our certified collection of tech, electronics, lifestyle and fashion products.
              </p>
            </div>

            {/* Quick reset button if filters are on */}
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="self-start md:self-center inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors"
              >
                <RefreshCw size={13} />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>

          {/* Active Filter Badges Pills */}
          {hasActiveFilters && (
            <div className="flex items-center flex-wrap gap-2 mt-4 pt-3 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Active Filters:
              </span>

              {filters.category !== 'all' && (
                <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                  <span>Category: {currentCategoryLabel}</span>
                  <button onClick={removeCategoryFilter} aria-label="Remove category filter">
                    <X size={13} />
                  </button>
                </span>
              )}

              {filters.searchQuery && (
                <span className="inline-flex items-center gap-1 bg-sky-100 text-sky-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                  <span>Query: "{filters.searchQuery}"</span>
                  <button onClick={removeSearchFilter} aria-label="Remove search query">
                    <X size={13} />
                  </button>
                </span>
              )}

              {filters.brands.map(brand => (
                <span key={brand} className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                  <span>Brand: {brand}</span>
                  <button onClick={() => removeBrandFilter(brand)} aria-label={`Remove brand ${brand}`}>
                    <X size={13} />
                  </button>
                </span>
              ))}

              {(filters.minPrice > 0 || filters.maxPrice < 200000) && (
                <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                  <span>Price: {formatBDT(filters.minPrice)} - {formatBDT(filters.maxPrice)}</span>
                  <button onClick={removePriceFilter} aria-label="Remove price filter">
                    <X size={13} />
                  </button>
                </span>
              )}

              {filters.rating && (
                <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                  <span>Rating: {filters.rating}+ Stars</span>
                  <button onClick={removeRatingFilter} aria-label="Remove rating filter">
                    <X size={13} />
                  </button>
                </span>
              )}

              {filters.inStockOnly && (
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-200">
                  <span>In Stock Only</span>
                  <button onClick={() => setFilters(prev => ({ ...prev, inStockOnly: false }))} aria-label="Remove in stock filter">
                    <X size={13} />
                  </button>
                </span>
              )}

              {filters.onSaleOnly && (
                <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-rose-200">
                  <span>On Sale</span>
                  <button onClick={() => setFilters(prev => ({ ...prev, onSaleOnly: false }))} aria-label="Remove sale filter">
                    <X size={13} />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 3. Main Catalog Layout (Sidebar + Grid) */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Desktop Left Sidebar (3 cols) */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs sticky top-24">
              <FilterSidebar />
            </div>
          </div>

          {/* Right Product Grid Area (9 cols) */}
          <div className="lg:col-span-9">
            {/* Sorting, Product Count & View switcher */}
            <SortSelect
              totalProducts={totalCount}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              columns={columns}
              onColumnsChange={setColumns}
            />

            {/* Products Grid */}
            <ProductGrid
              products={products}
              viewMode={viewMode}
              columns={columns}
              loading={loading}
            />

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  Page <strong className="text-slate-900">{currentPage}</strong> of <strong className="text-slate-900">{totalPages}</strong>
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="p-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {[...Array(totalPages)].map((_, idx) => {
                    const pageNum = idx + 1;
                    const isActive = pageNum === currentPage;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                          isActive
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    aria-label="Next page"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Off-canvas Filter Drawer */}
      <MobileFilterDrawer />
    </div>
  );
};
