import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Flame, Gift } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const HeroBanner: React.FC = () => {
  const { navigateTo, setFilters, formatBDT } = useStore();

  const handleShopNow = () => {
    setFilters(prev => ({ ...prev, category: 'all', onSaleOnly: false }));
    navigateTo('shop');
  };

  const handleFlashSale = () => {
    setFilters(prev => ({ ...prev, onSaleOnly: true, category: 'all' }));
    navigateTo('shop');
  };

  return (
    <section className="bg-slate-900 text-white relative overflow-hidden py-8 sm:py-14 border-b border-slate-800">
      {/* Background Subtle Gradient Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <Sparkles size={13} />
              <span>Eid & New Season Mega Sale • Up to 25% Off</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Premium Tech & Fashion <br className="hidden sm:inline" />
              Delivered Across <span className="text-emerald-400 underline decoration-emerald-500/40 underline-offset-8">Bangladesh</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Shop authentic smartphones, Hi-Res wireless audio, traditional handloom sarees, and smart home appliances with Cash on Delivery nationwide.
            </p>

            {/* CTA Actions */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={handleShopNow}
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black px-6 py-3.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
              >
                <span>Explore Catalog</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={handleFlashSale}
                className="bg-slate-800/90 hover:bg-slate-700 text-white border border-slate-700 font-bold px-5 py-3.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 transition-all hover:border-slate-500"
              >
                <Flame size={16} className="text-rose-400" />
                <span>Today's Flash Deals</span>
              </button>
            </div>

            {/* Micro value props */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={15} className="text-emerald-400" />
                <span>100% Genuine Products</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Zap size={15} className="text-amber-400" />
                <span>Dhaka 24hr Express Delivery</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Gift size={15} className="text-sky-400" />
                <span>Use Coupon: EID2026</span>
              </span>
            </div>
          </div>

          {/* Right Highlight Cards / Featured Banner (5 Cols) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {/* Top Featured Product Promo Card */}
            <div
              onClick={() => navigateTo('product-details', 'soundcore-space-one-anc-headphones')}
              className="bg-slate-800/80 border border-slate-700/80 hover:border-emerald-500/50 p-4 sm:p-5 rounded-2xl flex items-center gap-4 cursor-pointer group transition-all"
            >
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80"
                alt="Headphones"
                className="w-20 h-20 object-cover rounded-xl bg-slate-700 group-hover:scale-105 transition-transform"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  Top Audio Pick
                </span>
                <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors truncate mt-1">
                  Anker Soundcore Space One
                </h4>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-sm font-black text-white">{formatBDT(9450)}</span>
                  <span className="text-xs text-slate-400 line-through">{formatBDT(11990)}</span>
                </div>
              </div>
            </div>

            {/* Bottom Promo Card */}
            <div
              onClick={() => navigateTo('product-details', 'samsung-galaxy-s24-ultra-5g')}
              className="bg-slate-800/80 border border-slate-700/80 hover:border-emerald-500/50 p-4 sm:p-5 rounded-2xl flex items-center gap-4 cursor-pointer group transition-all"
            >
              <img
                src="https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=300&q=80"
                alt="Galaxy S24 Ultra"
                className="w-20 h-20 object-cover rounded-xl bg-slate-700 group-hover:scale-105 transition-transform"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded">
                  Flagship Smartphone
                </span>
                <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors truncate mt-1">
                  Samsung Galaxy S24 Ultra 5G
                </h4>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-sm font-black text-white">{formatBDT(142000)}</span>
                  <span className="text-xs text-emerald-400 font-bold">-8% OFF</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
