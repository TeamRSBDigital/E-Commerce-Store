import React from 'react';
import { X, Check } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { FilterSidebar } from './FilterSidebar';

export const MobileFilterDrawer: React.FC = () => {
  const { isFilterDrawerOpen, setIsFilterDrawerOpen } = useStore();

  if (!isFilterDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsFilterDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <h3 className="font-bold text-sm tracking-wide">Filters</h3>
          <button
            onClick={() => setIsFilterDrawerOpen(false)}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
            aria-label="Close filters"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <FilterSidebar isMobileDrawer />
        </div>

        <div className="p-4 border-t border-slate-200 bg-white">
          <button
            onClick={() => setIsFilterDrawerOpen(false)}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs"
          >
            <Check size={16} />
            <span>Apply Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
};
