import React, { useState } from 'react';
import { ShoppingBag, Phone, Mail, MapPin, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Footer: React.FC = () => {
  const { navigateTo, setFilters } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      {/* Newsletter Section */}
      <div className="border-b border-slate-800 py-8 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left space-y-1">
              <h3 className="text-lg font-bold text-white tracking-tight">
                Subscribe to Exclusive Offers & Deals
              </h3>
              <p className="text-slate-400 text-xs">
                Get weekly coupon codes, new tech launches, and seasonal discounts directly in your inbox.
              </p>
            </div>

            {subscribed ? (
              <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-2.5 rounded-xl font-semibold">
                <CheckCircle2 size={16} />
                <span>Thank you! You'll receive our next discount alert.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center w-full max-w-md gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 px-4 py-3 rounded-xl text-xs flex-1 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3 rounded-xl transition-colors shrink-0 flex items-center gap-1.5"
                >
                  <span>Subscribe</span>
                  <ArrowRight size={13} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & About (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center font-bold text-base">
                <ShoppingBag size={18} />
              </div>
              <span className="text-lg font-black tracking-tight">
                STORE<span className="text-emerald-500">FRONT</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Bangladesh's leading high-performance online destination for authentic electronics, smartphones, fashion, and kitchen appliances. Guaranteed genuine products with fast Cash on Delivery across all 64 districts.
            </p>

            <div className="space-y-2 pt-2 text-slate-300">
              <div className="flex items-center gap-2.5">
                <Phone size={14} className="text-emerald-400 shrink-0" />
                <span>Hotline: +880 1700-000000 (9 AM - 10 PM)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={14} className="text-emerald-400 shrink-0" />
                <span>support@storefront.com.bd</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Plot 12, Road 4, Dhanmondi R/A, Dhaka 1205, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Quick Shop Links */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4">
              Top Categories
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => {
                    setFilters(prev => ({ ...prev, category: 'smartphones-gadgets' }));
                    navigateTo('shop');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Smartphones & Gadgets
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setFilters(prev => ({ ...prev, category: 'audio-headphones' }));
                    navigateTo('shop');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Audio & Headphones
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setFilters(prev => ({ ...prev, category: 'mens-fashion' }));
                    navigateTo('shop');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Men's Panjabi & Shirts
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setFilters(prev => ({ ...prev, category: 'womens-fashion' }));
                    navigateTo('shop');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Traditional Sarees
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setFilters(prev => ({ ...prev, category: 'home-kitchen' }));
                    navigateTo('shop');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Home & Kitchen
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => navigateTo('track-order')} className="hover:text-white transition-colors">
                  Track Your Order
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-white transition-colors">
                  Shipping & Delivery Info
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('wishlist')} className="hover:text-white transition-colors">
                  My Wishlist
                </button>
              </li>
              <li>
                <span className="text-slate-400">7-Day Return Policy</span>
              </li>
              <li>
                <span className="text-slate-400">Warranty Registration</span>
              </li>
            </ul>
          </div>

          {/* Delivery & Payment Partners */}
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
                Accepted Payment
              </h4>
              <div className="flex flex-wrap gap-2 text-[11px] font-bold">
                <span className="bg-slate-800 text-pink-400 border border-slate-700 px-2.5 py-1 rounded-md">
                  bKash
                </span>
                <span className="bg-slate-800 text-amber-500 border border-slate-700 px-2.5 py-1 rounded-md">
                  Nagad
                </span>
                <span className="bg-slate-800 text-purple-400 border border-slate-700 px-2.5 py-1 rounded-md">
                  Rocket
                </span>
                <span className="bg-slate-800 text-emerald-400 border border-slate-700 px-2.5 py-1 rounded-md">
                  Cash on Delivery
                </span>
                <span className="bg-slate-800 text-sky-400 border border-slate-700 px-2.5 py-1 rounded-md">
                  Visa / Master
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
                Delivery Couriers
              </h4>
              <div className="flex flex-wrap gap-2 text-[11px] text-slate-300">
                <span className="bg-slate-800/80 px-2 py-1 rounded border border-slate-700">Pathao Courier</span>
                <span className="bg-slate-800/80 px-2 py-1 rounded border border-slate-700">Steadfast</span>
                <span className="bg-slate-800/80 px-2 py-1 rounded border border-slate-700">RedX</span>
                <span className="bg-slate-800/80 px-2 py-1 rounded border border-slate-700">eCourier</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="border-t border-slate-800 py-5 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Storefront Bangladesh Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>Trade License: TRAD/DNCC/092102</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
