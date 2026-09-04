import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useStore, AppView } from '../../context/StoreContext';

export interface BreadcrumbItem {
  label: string;
  view?: AppView;
  slug?: string;
  active?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const { navigateTo } = useStore();

  return (
    <nav aria-label="Breadcrumb" className="py-3.5 px-4 bg-slate-50/80 border-b border-slate-200/70 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex items-center flex-wrap gap-1.5">
        <button
          onClick={() => navigateTo('home')}
          className="inline-flex items-center gap-1 hover:text-emerald-600 transition-colors text-slate-600"
          title="Go to Home"
        >
          <Home size={13} />
          <span>Home</span>
        </button>

        {items.map((item, index) => (
          <React.Fragment key={index}>
            <ChevronRight size={12} className="text-slate-400 shrink-0" />
            {item.active || !item.view ? (
              <span className="font-semibold text-slate-900 truncate max-w-[200px] sm:max-w-none" aria-current="page">
                {item.label}
              </span>
            ) : (
              <button
                onClick={() => navigateTo(item.view!, item.slug)}
                className="hover:text-emerald-600 transition-colors truncate max-w-[150px] sm:max-w-none"
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};
