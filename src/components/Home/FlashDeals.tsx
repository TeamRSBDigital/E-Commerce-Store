import React, { useState, useEffect } from 'react';
import { Flame, Clock, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { MOCK_PRODUCTS } from '../../data/mockProducts';
import { ProductCard } from '../Product/ProductCard';

export const FlashDeals: React.FC = () => {
  const { navigateTo, setFilters } = useStore();

  // Simulated countdown timer for flash deals
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const flashProducts = MOCK_PRODUCTS.filter(p => (p.discountPercentage ?? 0) >= 15).slice(0, 4);

  const handleViewAllDeals = () => {
    setFilters(prev => ({ ...prev, onSaleOnly: true, category: 'all' }));
    navigateTo('shop');
  };

  return (
    <section className="py-8 sm:py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with Timer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              <Flame size={22} className="fill-rose-500 text-rose-500 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>Flash Deals</span>
                <span className="text-[11px] bg-rose-500 text-white font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Limited Time
                </span>
              </h2>
              <p className="text-xs text-slate-500">Unbeatable prices on high-demand gadgets and festive fashion</p>
            </div>
          </div>

          {/* Countdown timer pill */}
          <div className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold shrink-0 self-start sm:self-auto">
            <Clock size={14} className="text-amber-400" />
            <span className="text-slate-300 font-medium">Ends in:</span>
            <div className="flex items-center gap-1 font-mono text-xs">
              <span className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-400">
                {String(timeLeft.hours).padStart(2, '0')}h
              </span>
              <span>:</span>
              <span className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-400">
                {String(timeLeft.minutes).padStart(2, '0')}m
              </span>
              <span>:</span>
              <span className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-400">
                {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {flashProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View all button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleViewAllDeals}
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-6 py-3 rounded-xl transition-colors"
          >
            <span>Explore All Discounted Deals</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};
