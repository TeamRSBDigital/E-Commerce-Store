import React from 'react';
import { HeroBanner } from '../components/Home/HeroBanner';
import { TrustBadges } from '../components/Home/TrustBadges';
import { FeaturedCategories } from '../components/Home/FeaturedCategories';
import { FlashDeals } from '../components/Home/FlashDeals';
import { ProductCard } from '../components/Product/ProductCard';
import { useStore } from '../context/StoreContext';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck, Star } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigateTo, setFilters, formatBDT } = useStore();

  const bestSellers = MOCK_PRODUCTS.filter(p => p.isBestSeller).slice(0, 8);
  const newArrivals = MOCK_PRODUCTS.filter(p => p.isNew || p.rating >= 4.7).slice(0, 4);

  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <HeroBanner />

      {/* 2. Trust Badges (Cash on Delivery, 64 districts) */}
      <TrustBadges />

      {/* 3. Featured Categories */}
      <FeaturedCategories />

      {/* 4. Flash Deals (With Countdown) */}
      <FlashDeals />

      {/* 5. Best-Selling Products Section */}
      <section className="py-10 sm:py-14 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-1">
                <TrendingUp size={14} />
                <span>Customer Favorites</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Best-Selling Products
              </h2>
            </div>

            <button
              onClick={() => {
                setFilters(prev => ({ ...prev, category: 'all' }));
                navigateTo('shop');
              }}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group"
            >
              <span>View All</span>
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Promotional Split Banners */}
      <section className="py-8 sm:py-12 bg-slate-50/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Banner 1: Audio & Tech */}
            <div
              onClick={() => {
                setFilters(prev => ({ ...prev, category: 'audio-headphones' }));
                navigateTo('shop');
              }}
              className="relative rounded-3xl overflow-hidden bg-slate-900 text-white p-6 sm:p-8 flex flex-col justify-between min-h-[220px] cursor-pointer group shadow-sm"
            >
              <div className="relative z-10 max-w-xs space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                  Up to 25% Off
                </span>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
                  Wireless Audio & Noise Cancellation
                </h3>
                <p className="text-xs text-slate-300">
                  Hi-Res certified TWS earbuds & over-ear headphones by Anker & Xiaomi.
                </p>
              </div>

              <div className="relative z-10 pt-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
                  <span>Shop Audio Deals</span>
                  <ArrowRight size={14} />
                </span>
              </div>

              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80"
                alt="Headphones"
                className="absolute right-0 bottom-0 w-1/2 h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-300 pointer-events-none"
              />
            </div>

            {/* Banner 2: Authentic Traditional Wear */}
            <div
              onClick={() => {
                setFilters(prev => ({ ...prev, category: 'mens-fashion' }));
                navigateTo('shop');
              }}
              className="relative rounded-3xl overflow-hidden bg-emerald-950 text-white p-6 sm:p-8 flex flex-col justify-between min-h-[220px] cursor-pointer group shadow-sm"
            >
              <div className="relative z-10 max-w-xs space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full">
                  Handcrafted Elegance
                </span>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
                  Pure Cotton Panjabi & Jamdani Sarees
                </h3>
                <p className="text-xs text-emerald-200">
                  Artisan handloom crafts tailored for your family celebrations.
                </p>
              </div>

              <div className="relative z-10 pt-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
                  <span>Shop Traditional Wear</span>
                  <ArrowRight size={14} />
                </span>
              </div>

              <img
                src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=400&q=80"
                alt="Panjabi"
                className="absolute right-0 bottom-0 w-1/2 h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-300 pointer-events-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. New Arrivals */}
      <section className="py-10 sm:py-14 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 text-sky-600 text-xs font-bold uppercase tracking-wider mb-1">
                <Sparkles size={14} />
                <span>Just Landed in Dhaka</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                New Arrivals
              </h2>
            </div>

            <button
              onClick={() => {
                setFilters(prev => ({ ...prev, sortBy: 'newest', category: 'all' }));
                navigateTo('shop');
              }}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group"
            >
              <span>Explore All</span>
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. Bangladeshi Customer Testimonials */}
      <section className="py-10 sm:py-14 bg-slate-50/80">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Trusted by 50,000+ Happy Customers
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              What Shoppers Across Bangladesh Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "Ordered the Anker headphones at 11 AM in Dhanmondi and got it delivered by 5 PM the same day with Pathao. Sound quality is brilliant and price is lower than market!"
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Tanvir Hossain</h4>
                  <span className="text-[11px] text-slate-400">Dhanmondi, Dhaka</span>
                </div>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded">
                  Verified Order
                </span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "Bought the Jamdani saree for my sister's wedding in Chattogram. The weaving quality and zari work are 100% authentic. Paid via bKash easily."
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Nusrat Jahan</h4>
                  <span className="text-[11px] text-slate-400">Agrabad, Chattogram</span>
                </div>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded">
                  Verified Order
                </span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "Walton Primo S8 Pro arrived safely in Sylhet. Packaging had full bubble wrap protection and the warranty card was properly stamped. Will buy again."
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Farhan Ahmed</h4>
                  <span className="text-[11px] text-slate-400">Zindabazar, Sylhet</span>
                </div>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded">
                  Verified Order
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
