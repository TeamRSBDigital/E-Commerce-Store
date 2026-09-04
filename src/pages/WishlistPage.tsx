import React from 'react';
import { Breadcrumb } from '../components/Common/Breadcrumb';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/Product/ProductCard';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, navigateTo } = useStore();

  return (
    <div className="bg-slate-50/50 min-h-screen pb-16">
      <Breadcrumb
        items={[
          { label: 'Shop', view: 'shop' },
          { label: 'My Saved Items', active: true }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <Heart size={26} className="text-rose-500 fill-rose-500" />
              <span>My Wishlist ({wishlist.length})</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Save your favorite electronics, audio gadgets, and traditional apparel for later.
            </p>
          </div>

          {wishlist.length > 0 && (
            <button
              onClick={() => navigateTo('shop')}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              <span>Explore More Products</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-200 rounded-3xl p-12 text-center max-w-md mx-auto my-10">
            <div className="w-16 h-16 bg-rose-50 text-rose-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart size={32} />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-1">Your wishlist is empty</h2>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Explore our catalog and click the heart icon on any product to bookmark it for later.
            </p>
            <button
              onClick={() => navigateTo('shop')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-xs transition-colors"
            >
              Browse Catalog
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
