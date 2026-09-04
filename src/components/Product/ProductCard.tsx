import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star, Check } from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Rating } from '../Common/Rating';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode = 'grid' }) => {
  const { addToCart, toggleWishlist, isWishlisted, openQuickView, navigateTo, formatBDT } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.inStock) return;
    addToCart(product, 1);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    openQuickView(product);
  };

  // List View Rendering for Shop Filter
  if (viewMode === 'list') {
    return (
      <div
        onClick={() => navigateTo('product-details', product.slug)}
        className="group relative bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-5 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-900/5 transition-all cursor-pointer"
      >
        {/* Image Box */}
        <div className="relative w-full sm:w-48 h-48 sm:h-44 bg-slate-50 rounded-xl overflow-hidden shrink-0">
          <img
            src={isHovered && product.secondaryImage ? product.secondaryImage : product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
            {product.discountPercentage && product.discountPercentage > 0 && (
              <span className="bg-rose-500 text-white text-[11px] font-black px-2 py-0.5 rounded-md shadow-xs">
                -{product.discountPercentage}%
              </span>
            )}
            {product.isHot && (
              <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                HOT
              </span>
            )}
          </div>
        </div>

        {/* Content Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span className="font-semibold text-emerald-600">{product.category}</span>
            <span>•</span>
            <span className="font-medium text-slate-400">{product.brand}</span>
          </div>

          <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug">
            {product.title}
          </h3>

          <p className="text-xs text-slate-600 mt-2 line-clamp-2 hidden sm:block">
            {product.shortDescription || product.description}
          </p>

          <div className="mt-2.5 flex items-center gap-3">
            <Rating rating={product.rating} reviewCount={product.reviewCount} />
            <span className={`text-xs font-semibold ${product.inStock ? 'text-emerald-600' : 'text-rose-500'}`}>
              {product.inStock ? `In Stock (${product.stockCount})` : 'Out of Stock'}
            </span>
          </div>
        </div>

        {/* Price & Actions Right Section */}
        <div className="w-full sm:w-48 sm:border-l sm:border-slate-100 sm:pl-5 flex flex-row sm:flex-col justify-between sm:justify-center items-center sm:items-start gap-3 shrink-0">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg sm:text-xl font-black text-slate-900">
                {formatBDT(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  {formatBDT(product.originalPrice)}
                </span>
              )}
            </div>
            {product.discountPercentage && (
              <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">
                Save {formatBDT(product.originalPrice! - product.price)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                !product.inStock
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : isAddedRecently
                  ? 'bg-emerald-700 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95'
              }`}
            >
              {isAddedRecently ? <Check size={14} /> : <ShoppingBag size={14} />}
              <span>{isAddedRecently ? 'Added' : 'Add to Cart'}</span>
            </button>

            <button
              onClick={handleWishlist}
              className={`p-2.5 rounded-xl border transition-colors ${
                wishlisted
                  ? 'bg-rose-50 border-rose-200 text-rose-500'
                  : 'border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-200 bg-white'
              }`}
              title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart size={16} className={wishlisted ? 'fill-rose-500 text-rose-500' : ''} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Standard Grid View (Preserving reference styling from shop.html)
  return (
    <div
      onClick={() => navigateTo('product-details', product.slug)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white border border-slate-200/80 hover:border-emerald-500/50 rounded-2xl p-3 sm:p-4 flex flex-col justify-between hover:shadow-lg hover:shadow-slate-900/5 transition-all duration-200 cursor-pointer"
    >
      <div>
        {/* Image Container with Badges & Action Buttons */}
        <div className="relative aspect-square w-full rounded-xl bg-slate-50 overflow-hidden mb-3">
          <img
            src={isHovered && product.secondaryImage ? product.secondaryImage : product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />

          {/* Badges Top Left */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
            {product.discountPercentage && product.discountPercentage > 0 && (
              <span className="bg-rose-500 text-white text-[10px] sm:text-[11px] font-black px-2 py-0.5 rounded-md shadow-xs">
                -{product.discountPercentage}%
              </span>
            )}
            {product.isHot && (
              <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                HOT
              </span>
            )}
            {product.isNew && (
              <span className="bg-sky-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                NEW
              </span>
            )}
          </div>

          {/* Out of Stock Overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-2xs flex items-center justify-center z-10">
              <span className="bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider">
                Out of Stock
              </span>
            </div>
          )}

          {/* Quick Action Floating Buttons (Wishlist & Quick View) */}
          <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-20">
            <button
              onClick={handleWishlist}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-sm ${
                wishlisted
                  ? 'bg-rose-50 text-rose-500 border border-rose-200'
                  : 'bg-white/90 backdrop-blur-xs text-slate-500 hover:text-rose-500'
              }`}
              aria-label="Toggle wishlist"
              title="Add to Wishlist"
            >
              <Heart size={15} className={wishlisted ? 'fill-rose-500 text-rose-500' : ''} />
            </button>

            <button
              onClick={handleQuickView}
              className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-slate-500 hover:text-emerald-600 flex items-center justify-center transition-transform hover:scale-110 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Quick View"
              title="Quick View"
            >
              <Eye size={15} />
            </button>
          </div>
        </div>

        {/* Product Meta */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span className="font-semibold text-emerald-600 uppercase tracking-wider text-[10px]">
              {product.brand}
            </span>
            <span className="text-slate-400 truncate max-w-[120px]">
              {product.category}
            </span>
          </div>

          <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug min-h-[38px]">
            {product.title}
          </h3>

          <div className="py-0.5">
            <Rating rating={product.rating} reviewCount={product.reviewCount} size="sm" />
          </div>
        </div>
      </div>

      {/* Price & Add to Cart Footer */}
      <div className="pt-3 border-t border-slate-100 mt-2">
        <div className="flex items-baseline gap-1.5 mb-2.5">
          <span className="text-base sm:text-lg font-black text-slate-900">
            {formatBDT(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-slate-400 line-through">
              {formatBDT(product.originalPrice)}
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs ${
            !product.inStock
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : isAddedRecently
              ? 'bg-emerald-700 text-white'
              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white active:scale-98'
          }`}
        >
          {isAddedRecently ? (
            <>
              <Check size={14} className="stroke-[3]" />
              <span>Added to Cart</span>
            </>
          ) : (
            <>
              <ShoppingBag size={14} />
              <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
