import React from 'react';
import { Truck, ShieldCheck, RefreshCw, CreditCard } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const badges = [
    {
      icon: Truck,
      title: 'Nationwide Delivery',
      desc: 'Inside Dhaka ৳60, all other 63 districts ৳120',
      color: 'text-emerald-600 bg-emerald-50'
    },
    {
      icon: CreditCard,
      title: 'Cash on Delivery',
      desc: 'Pay after inspecting your parcel at home',
      color: 'text-sky-600 bg-sky-50'
    },
    {
      icon: ShieldCheck,
      title: '100% Authentic',
      desc: 'Direct brand official warranty & replacement',
      color: 'text-amber-600 bg-amber-50'
    },
    {
      icon: RefreshCw,
      title: '7-Day Easy Return',
      desc: 'Hassle-free replacement policy across BD',
      color: 'text-indigo-600 bg-indigo-50'
    }
  ];

  return (
    <section className="bg-white border-b border-slate-200 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 transition-colors"
              >
                <div className={`p-2.5 rounded-xl ${badge.color} shrink-0`}>
                  <Icon size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{badge.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{badge.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
