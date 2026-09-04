import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
}

export const Rating: React.FC<RatingProps> = ({
  rating,
  reviewCount,
  size = 'sm',
  showNumber = true
}) => {
  const iconSize = size === 'sm' ? 14 : size === 'md' ? 18 : 22;

  return (
    <div className="flex items-center gap-1.5" aria-label={`Rating ${rating} out of 5 stars`}>
      <div className="flex items-center text-amber-500">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = rating >= star;
          const half = !filled && rating >= star - 0.5;

          return (
            <span key={star} className="relative inline-block">
              {filled ? (
                <Star size={iconSize} className="fill-amber-400 text-amber-400" />
              ) : half ? (
                <span className="relative">
                  <Star size={iconSize} className="text-gray-300" />
                  <span className="absolute inset-0 overflow-hidden w-1/2">
                    <Star size={iconSize} className="fill-amber-400 text-amber-400" />
                  </span>
                </span>
              ) : (
                <Star size={iconSize} className="text-gray-300" />
              )}
            </span>
          );
        })}
      </div>

      {showNumber && (
        <span className="text-xs font-semibold text-slate-700 ml-0.5">
          {rating.toFixed(1)}
        </span>
      )}

      {reviewCount !== undefined && (
        <span className="text-xs text-slate-400">
          ({reviewCount})
        </span>
      )}
    </div>
  );
};
