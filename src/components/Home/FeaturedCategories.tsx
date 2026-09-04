import React from 'react';
import { ArrowRight, Smartphone, Headphones, Shirt, Sparkles, Home, Laptop } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { MOCK_CATEGORIES } from '../../data/mockProducts';

export const FeaturedCategories: React.FC = () => {
  const { navigateTo, setFilters } = useStore();

  const handleCategoryClick = (slug: string) => {
    setFilters(prev => ({ ...prev, category: slug }));
    navigateTo('shop');
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone': return <Smartphone size={22} className="text-emerald-600" />;
      case 'Headphones': return <Headphones size={22} className="text-sky-600" />;
      case 'Shirt': return <Shirt size={22} className="text-amber-600" />;
      case 'Sparkles': return <Sparkles size={22} className="text-rose-600" />;
      case 'Home': return <Home size={22} className="text-indigo-600" />;
      case 'Laptop': return <Laptop size={22} className="text-purple-600" />;
      default: return <Sparkles size={22} className="text-emerald-600" />;
    }
  };

  return (
    <section className="py-8 sm:py-12 bg-slate-50/60 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Featured Categories
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Explore authentic products curated for Bangladeshi consumers
            </p>
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

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {MOCK_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.slug)}
              className="bg-white border border-slate-200/80 hover:border-emerald-500/50 rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer group hover:shadow-md hover:shadow-slate-900/5 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-50 group-hover:bg-emerald-50 flex items-center justify-center mb-3 transition-colors">
                {getCategoryIcon(cat.iconName)}
              </div>

              <h3 className="text-xs font-bold text-slate-800 group-hover:text-emerald-600 line-clamp-2 transition-colors">
                {cat.name}
              </h3>

              <span className="text-[11px] text-slate-400 mt-1 font-medium">
                {cat.itemCount} Items
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
