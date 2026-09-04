import React from 'react';
import { Phone, Truck, ShieldCheck, HelpCircle } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AnnouncementBar: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <aside aria-label="Announcement" className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left message with icons */}
        <div className="flex items-center gap-3 text-center sm:text-left">
          <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
            <Truck size={13} />
            <span>Fast Delivery across all 64 districts in Bangladesh</span>
          </span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline-flex items-center gap-1 text-slate-300">
            <ShieldCheck size={13} className="text-amber-400" />
            <span>100% Authentic & Cash on Delivery Available</span>
          </span>
        </div>

        {/* Right utilities */}
        <div className="flex items-center gap-4">
          <a
            href="tel:+8801700000000"
            className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
          >
            <Phone size={12} className="text-emerald-400" />
            <span className="font-semibold">+880 1700-000000</span>
          </a>

          <span className="text-slate-700">|</span>

          <button
            onClick={() => navigateTo('track-order')}
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <HelpCircle size={12} />
            <span>Track Order</span>
          </button>

          <span className="text-slate-700">|</span>

          <span className="font-bold text-emerald-400 bg-slate-800 px-1.5 py-0.5 rounded text-[11px]">
            BDT (৳)
          </span>
        </div>
      </div>
    </aside>
  );
};
