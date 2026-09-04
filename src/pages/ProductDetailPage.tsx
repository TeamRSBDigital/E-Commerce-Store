import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { productsApi } from '../api/productsApi';
import { Product } from '../types';
import { Breadcrumb } from '../components/Common/Breadcrumb';
import { Rating } from '../components/Common/Rating';
import { ProductCard } from '../components/Product/ProductCard';
import { MOCK_REVIEWS } from '../data/mockProducts';
import { DELIVERY_RATES } from '../data/bangladeshLocations';
import {
  Heart,
  ShoppingBag,
  Zap,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  Share2,
  Phone,
  HelpCircle,
  Clock,
  Sparkles
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    currentProductSlug,
    addToCart,
    toggleWishlist,
    isWishlisted,
    navigateTo,
    formatBDT,
    addToast
  } = useStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedStorage, setSelectedStorage] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    if (!currentProductSlug) return;
    setLoading(true);

    productsApi.getProductBySlug(currentProductSlug).then(p => {
      if (p) {
        setProduct(p);
        setSelectedImage(0);
        // Default variants if available
        if (p.variants) {
          p.variants.forEach(v => {
            if (v.type === 'color') setSelectedColor(v.options[0]);
            if (v.type === 'size') setSelectedSize(v.options[0]);
            if (v.type === 'storage') setSelectedStorage(v.options[0]);
          });
        }
        // Load related
        productsApi.getRelatedProducts(p.categorySlug, p.id).then(setRelatedProducts);
      }
      setLoading(false);
    });
  }, [currentProductSlug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-xs text-slate-500 font-semibold">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-lg font-bold text-slate-900 mb-2">Product Not Found</h2>
        <p className="text-xs text-slate-500 mb-6">The requested product does not exist or has been relocated.</p>
        <button
          onClick={() => navigateTo('shop')}
          className="bg-emerald-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addToCart(product, quantity, selectedColor, selectedSize, selectedStorage);
  };

  const handleBuyNow = () => {
    if (!product.inStock) return;
    addToCart(product, quantity, selectedColor, selectedSize, selectedStorage);
    navigateTo('checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      addToast('info', 'Link Copied', 'Product link copied to your clipboard.');
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="bg-slate-50/50 min-h-screen pb-16">
      {/* 1. Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Shop', view: 'shop' },
          { label: product.category, view: 'shop' },
          { label: product.title, active: true }
        ]}
      />

      {/* 2. Main Product Details Card */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Gallery Column (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Main Image Frame */}
              <div className="relative aspect-square w-full rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden group">
                <img
                  src={product.images[selectedImage] || product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badge */}
                {product.discountPercentage && product.discountPercentage > 0 && (
                  <div className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-sm">
                    -{product.discountPercentage}% OFF
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative w-16 sm:w-20 aspect-square rounded-xl overflow-hidden border-2 bg-slate-50 shrink-0 transition-all ${
                        selectedImage === idx
                          ? 'border-emerald-600 scale-105 shadow-sm'
                          : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info & Buy Column (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                {/* Brand & SKU */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded">
                      {product.brand}
                    </span>
                    <span>•</span>
                    <span className="font-medium text-slate-600">{product.category}</span>
                  </div>
                  <span className="font-mono text-[11px] text-slate-400">SKU: {product.sku}</span>
                </div>

                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-tight">
                  {product.title}
                </h1>

                {/* Ratings & Stock */}
                <div className="flex items-center flex-wrap gap-4 mt-3 pt-3 border-t border-slate-100">
                  <Rating rating={product.rating} reviewCount={product.reviewCount} size="md" />

                  <span className="text-slate-300">|</span>

                  <span
                    className={`text-xs font-bold inline-flex items-center gap-1.5 ${
                      product.inStock ? 'text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full' : 'text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                    <span>{product.inStock ? `In Stock (${product.stockCount} available)` : 'Out of Stock'}</span>
                  </span>
                </div>
              </div>

              {/* Price Display */}
              <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl sm:text-3xl font-black text-slate-900">
                      {formatBDT(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-slate-400 line-through">
                        {formatBDT(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  {product.originalPrice && (
                    <span className="text-xs font-bold text-emerald-600 block mt-0.5">
                      You save {formatBDT(product.originalPrice - product.price)} ({product.discountPercentage}% discount)
                    </span>
                  )}
                </div>

                <button
                  onClick={handleShare}
                  className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-200/50 transition-colors"
                  title="Share product"
                >
                  <Share2 size={18} />
                </button>
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {product.shortDescription || product.description}
              </p>

              {/* Variants Selector */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-3.5 pt-2 border-t border-slate-100">
                  {product.variants.map((variant, i) => (
                    <div key={i}>
                      <span className="text-xs font-bold text-slate-900 block mb-1.5">
                        Select {variant.name}:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {variant.options.map((opt) => {
                          const isSelected =
                            variant.type === 'color' ? selectedColor === opt :
                            variant.type === 'size' ? selectedSize === opt :
                            selectedStorage === opt;

                          return (
                            <button
                              key={opt}
                              onClick={() => {
                                if (variant.type === 'color') setSelectedColor(opt);
                                else if (variant.type === 'size') setSelectedSize(opt);
                                else setSelectedStorage(opt);
                              }}
                              className={`text-xs px-3.5 py-2 rounded-xl font-bold border transition-all ${
                                isSelected
                                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quantity Stepper & Buttons */}
              <div className="pt-3 border-t border-slate-100 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-800">Quantity:</span>
                  <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-slate-600 hover:bg-slate-200 transition-colors font-bold text-sm"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-xs font-black text-slate-900 min-w-[34px] text-center bg-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                      className="px-3 py-2 text-slate-600 hover:bg-slate-200 transition-colors font-bold text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 text-white py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all active:scale-98"
                  >
                    <ShoppingBag size={18} />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    disabled={!product.inStock}
                    className="flex-1 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 text-white py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
                  >
                    <Zap size={18} className="text-amber-400 fill-amber-400" />
                    <span>Buy Now (Instant Checkout)</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-3.5 rounded-2xl border transition-colors flex items-center justify-center shrink-0 ${
                      wishlisted
                        ? 'bg-rose-50 border-rose-200 text-rose-500'
                        : 'border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-200 bg-white'
                    }`}
                    title="Toggle Wishlist"
                  >
                    <Heart size={20} className={wishlisted ? 'fill-rose-500 text-rose-500' : ''} />
                  </button>
                </div>
              </div>

              {/* Delivery Assurance Box for Bangladesh */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <Truck size={17} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900">Standard Delivery Timeline:</span>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      Inside Dhaka: <strong>৳{DELIVERY_RATES.INSIDE_DHAKA}</strong> (24 to 48 hours) • Outside Dhaka (all 63 districts): <strong>৳{DELIVERY_RATES.OUTSIDE_DHAKA}</strong> (48 to 72 hours)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-slate-200/60">
                  <ShieldCheck size={17} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900">Payment & Return Protection:</span>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      Cash on Delivery available nationwide • 7 Days Replacement Guarantee • bKash / Nagad instant checkout.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Product Tabs (Description, Specifications, Customer Reviews) */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            {/* Tabs Selector */}
            <div className="flex items-center gap-4 border-b border-slate-200 pb-3">
              <button
                onClick={() => setActiveTab('desc')}
                className={`text-sm font-bold pb-2 transition-colors relative ${
                  activeTab === 'desc'
                    ? 'text-emerald-600 border-b-2 border-emerald-600'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Product Description
              </button>

              <button
                onClick={() => setActiveTab('specs')}
                className={`text-sm font-bold pb-2 transition-colors relative ${
                  activeTab === 'specs'
                    ? 'text-emerald-600 border-b-2 border-emerald-600'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Specifications Table
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`text-sm font-bold pb-2 transition-colors relative ${
                  activeTab === 'reviews'
                    ? 'text-emerald-600 border-b-2 border-emerald-600'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Customer Reviews ({product.reviewCount})
              </button>
            </div>

            {/* Tab Contents */}
            <div className="py-6">
              {activeTab === 'desc' && (
                <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4 text-xs sm:text-sm">
                  <p>{product.description}</p>
                  <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-100">
                    <h4 className="font-bold text-emerald-950 mb-1">Why Buy From Storefront Bangladesh?</h4>
                    <p className="text-xs text-emerald-800">
                      Every order is securely handled and dispatched with official brand warranty seals, authentic billing, and genuine replacement coverage across all 64 districts in Bangladesh.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="max-w-2xl border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="grid grid-cols-2 p-3 text-xs">
                      <span className="font-semibold text-slate-500">{key}</span>
                      <span className="font-bold text-slate-900">{val}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-6 p-5 bg-slate-50 rounded-2xl border border-slate-100 max-w-lg">
                    <div className="text-center">
                      <span className="text-4xl font-black text-slate-900">{product.rating}</span>
                      <div className="mt-1">
                        <Rating rating={product.rating} showNumber={false} size="md" />
                      </div>
                      <span className="text-[11px] text-slate-500 mt-1 block">Based on {product.reviewCount} reviews</span>
                    </div>
                    <div className="text-xs text-slate-600 border-l border-slate-200 pl-6 space-y-1">
                      <p>• 98% verified satisfaction</p>
                      <p>• Authentic Bangladeshi verified purchases</p>
                      <p>• Express courier turnaround</p>
                    </div>
                  </div>

                  <div className="space-y-4 max-w-3xl">
                    {MOCK_REVIEWS.map((rev) => (
                      <div key={rev.id} className="p-4 border border-slate-200/90 rounded-2xl bg-white space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-bold text-xs text-slate-900">{rev.author}</span>
                            <span className="text-[11px] text-slate-400 ml-2">({rev.location})</span>
                          </div>
                          <span className="text-[11px] text-slate-400">{rev.date}</span>
                        </div>
                        <Rating rating={rev.rating} showNumber={false} size="sm" />
                        <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Related Products Carousel / Grid */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 mt-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              Related Products in {product.category}
            </h3>
            <button
              onClick={() => {
                navigateTo('shop');
              }}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
            >
              View More
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
