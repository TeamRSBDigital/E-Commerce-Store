import React from 'react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { PackageSearch, RefreshCw } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface ProductGridProps {
  products: Product[];
  viewMode?: 'grid' | 'list';
  columns?: 3 | 4;
  loading?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  viewMode = 'grid',
  columns = 3,
  loading = false
}) => {
  const { resetFilters } = useStore();

  if (loading) {
    return (
      <div className={`grid gap-4 sm:gap-5 ${
        viewMode === 'list'
          ? 'grid-cols-1'
          : columns === 4
          ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
          : 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3'
      }`}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-2xl p-4 animate-pulse">
            <div className="aspect-square bg-slate-100 rounded-xl mb-3"></div>
            <div className="h-3 bg-slate-100 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-slate-100 rounded w-4/5 mb-3"></div>
            <div className="h-5 bg-slate-100 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-10 text-center my-6">
        <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <PackageSearch size={32} />
        </div>
        <h3 className="text-base font-bold text-slate-900 mb-1">No products match your criteria</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto mb-5 leading-relaxed">
          Try adjusting your price range, selected brand, or search keywords to find what you're looking for.
        </p>
        <button
          onClick={resetFilters}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-xs"
        >
          <RefreshCw size={14} />
          <span>Reset All Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div
      className={`grid gap-3 sm:gap-5 ${
        viewMode === 'list'
          ? 'grid-cols-1'
          : columns === 4
          ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
          : 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3'
      }`}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} viewMode={viewMode} />
      ))}
    </div>
  );
};
