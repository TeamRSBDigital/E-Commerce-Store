import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Check, ShieldCheck, Truck, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Rating } from '../Common/Rating';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    closeQuickView,
    addToCart,
    toggleWishlist,
    isWishlisted,
    navigateTo,
    formatBDT
  } = useStore();

  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedStorage, setSelectedStorage] = useState<string>('');

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize, selectedStorage);
    closeQuickView();
  };

  const handleViewFullDetails = () => {
    closeQuickView();
    navigateTo('product-details', product.slug);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={closeQuickView}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden z-10 animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-3.5 right-3.5 z-20 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 shadow-sm transition-colors"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Left: Images */}
        <div className="md:w-1/2 p-5 bg-slate-50 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100">
          <div className="relative aspect-square w-full rounded-2xl bg-white overflow-hidden shadow-xs">
            <img
              src={product.images[selectedImage] || product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-2 mt-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? 'border-emerald-600 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info & Actions */}
        <div className="md:w-1/2 p-5 sm:p-6 overflow-y-auto flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 uppercase tracking-wider">
              <span>{product.brand}</span>
              <span>•</span>
              <span className="text-slate-400">{product.category}</span>
            </div>

            <h2 className="text-lg font-bold text-slate-900 mt-1 leading-snug">
              {product.title}
            </h2>

            <div className="flex items-center gap-3 mt-2">
              <Rating rating={product.rating} reviewCount={product.reviewCount} />
              <span className={`text-xs font-semibold ${product.inStock ? 'text-emerald-600' : 'text-rose-500'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2.5 mt-3 pt-3 border-t border-slate-100">
              <span className="text-2xl font-black text-slate-900">
                {formatBDT(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-slate-400 line-through">
                  {formatBDT(product.originalPrice)}
                </span>
              )}
              {product.discountPercentage && (
                <span className="text-xs bg-rose-100 text-rose-700 font-bold px-2 py-0.5 rounded-full">
                  -{product.discountPercentage}% OFF
                </span>
              )}
            </div>

            <p className="text-xs text-slate-600 mt-3 line-clamp-3 leading-relaxed">
              {product.description}
            </p>

            {/* Variants */}
            {product.variants?.map((v, i) => (
              <div key={i} className="mt-3">
                <span className="text-xs font-bold text-slate-700 block mb-1.5">{v.name}:</span>
                <div className="flex flex-wrap gap-1.5">
                  {v.options.map((opt) => {
                    const isSelected =
                      v.type === 'color' ? selectedColor === opt :
                      v.type === 'size' ? selectedSize === opt :
                      selectedStorage === opt;

                    return (
                      <button
                        key={opt}
                        onClick={() => {
                          if (v.type === 'color') setSelectedColor(opt);
                          else if (v.type === 'size') setSelectedSize(opt);
                          else setSelectedStorage(opt);
                        }}
                        className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition-all ${
                          isSelected
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Quantity Controls */}
            <div className="flex items-center gap-3 mt-4">
              <span className="text-xs font-bold text-slate-700">Quantity:</span>
              <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 transition-colors font-bold"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-bold text-slate-900 min-w-[28px] text-center bg-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                  className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 transition-colors font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 text-white py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <ShoppingBag size={16} />
                <span>Add to Cart ({formatBDT(product.price * quantity)})</span>
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3 rounded-xl border transition-colors ${
                  wishlisted
                    ? 'bg-rose-50 border-rose-200 text-rose-500'
                    : 'border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-200'
                }`}
                title="Wishlist"
              >
                <Heart size={18} className={wishlisted ? 'fill-rose-500 text-rose-500' : ''} />
              </button>
            </div>

            <button
              onClick={handleViewFullDetails}
              className="w-full text-center py-2 text-xs font-semibold text-slate-500 hover:text-emerald-600 transition-colors flex items-center justify-center gap-1"
            >
              <span>View Full Specifications & Reviews</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
