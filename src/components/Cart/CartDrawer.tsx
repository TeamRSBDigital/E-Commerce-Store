import React from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { DELIVERY_RATES } from '../../data/bangladeshLocations';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartCount,
    navigateTo,
    formatBDT
  } = useStore();

  if (!isCartOpen) return null;

  const freeShippingThreshold = DELIVERY_RATES.FREE_SHIPPING_THRESHOLD;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigateTo('checkout');
  };

  const handleViewCart = () => {
    setIsCartOpen(false);
    navigateTo('cart');
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <div className="relative ml-auto w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={20} className="text-emerald-400" />
            <h3 className="font-bold text-sm tracking-wide">
              Shopping Cart ({cartCount})
            </h3>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-emerald-50/70 p-3 border-b border-emerald-100">
          <div className="flex items-center justify-between text-xs font-semibold text-emerald-900 mb-1.5">
            <div className="flex items-center gap-1.5">
              <Truck size={14} className="text-emerald-600" />
              <span>
                {remainingForFreeShipping > 0
                  ? `Add ${formatBDT(remainingForFreeShipping)} more for FREE Delivery`
                  : '🎉 Congratulations! You qualify for FREE Delivery!'}
              </span>
            </div>
            <span>{Math.round(freeShippingProgress)}%</span>
          </div>
          <div className="w-full h-1.5 bg-emerald-200/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full transition-all duration-300"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-slate-100">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-3">
                <ShoppingBag size={30} />
              </div>
              <h4 className="text-sm font-bold text-slate-800 mb-1">Your cart is currently empty</h4>
              <p className="text-xs text-slate-500 mb-5 max-w-xs">
                Browse our top smartphones, audio gear, and authentic fashion collections.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigateTo('shop');
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition-colors"
              >
                Explore Shop
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="py-3.5 flex items-start gap-3">
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-16 h-16 object-cover rounded-xl bg-slate-50 shrink-0 border border-slate-100"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate leading-snug">
                    {item.product.title}
                  </h4>

                  {/* Variant labels */}
                  <div className="flex flex-wrap gap-1 text-[10px] text-slate-500 mt-1">
                    {item.selectedColor && (
                      <span className="bg-slate-100 px-1.5 py-0.5 rounded">
                        Color: {item.selectedColor}
                      </span>
                    )}
                    {item.selectedSize && (
                      <span className="bg-slate-100 px-1.5 py-0.5 rounded">
                        Size: {item.selectedSize}
                      </span>
                    )}
                    {item.selectedStorage && (
                      <span className="bg-slate-100 px-1.5 py-0.5 rounded">
                        Storage: {item.selectedStorage}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-2.5">
                    <span className="text-xs font-bold text-slate-900">
                      {formatBDT(item.product.price)}
                    </span>

                    {/* Stepper */}
                    <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-2 py-0.5 text-xs font-bold text-slate-900 min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout Button */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>Subtotal:</span>
              <span className="text-sm font-black text-slate-900">
                {formatBDT(cartSubtotal)}
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span>Delivery Charge:</span>
              <span className="font-semibold text-emerald-600">
                {remainingForFreeShipping === 0 ? 'FREE' : 'Calculated at checkout'}
              </span>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={handleCheckout}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={14} />
              </button>

              <button
                onClick={handleViewCart}
                className="w-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 py-2.5 rounded-xl font-semibold text-xs transition-colors"
              >
                View Full Cart
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 pt-1">
              <ShieldCheck size={12} className="text-emerald-500" />
              <span>Cash on Delivery & Secure Mobile Banking</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
