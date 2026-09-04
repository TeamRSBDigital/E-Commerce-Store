import React, { useState } from 'react';
import { Breadcrumb } from '../components/Common/Breadcrumb';
import { useStore } from '../context/StoreContext';
import { productsApi } from '../api/productsApi';
import { DELIVERY_RATES } from '../data/bangladeshLocations';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, ShoppingBag, Gift, CheckCircle2, AlertCircle } from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSubtotal,
    cartCount,
    navigateTo,
    formatBDT
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponStatus, setCouponStatus] = useState<{ valid: boolean; message: string } | null>(null);

  const freeShippingThreshold = DELIVERY_RATES.FREE_SHIPPING_THRESHOLD;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const res = await productsApi.validateCoupon(couponInput, cartSubtotal);
    if (res.valid) {
      setCouponDiscount(res.discount);
      setCouponStatus({ valid: true, message: res.message });
    } else {
      setCouponDiscount(0);
      setCouponStatus({ valid: false, message: res.message });
    }
  };

  const estimatedDelivery = remainingForFreeShipping === 0 ? 0 : DELIVERY_RATES.INSIDE_DHAKA;
  const finalTotal = Math.max(0, cartSubtotal - couponDiscount + estimatedDelivery);

  return (
    <div className="bg-slate-50/50 min-h-screen pb-16">
      <Breadcrumb
        items={[
          { label: 'Shop', view: 'shop' },
          { label: 'Your Shopping Cart', active: true }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-6">
          Shopping Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-200 rounded-3xl p-12 text-center max-w-xl mx-auto my-6">
            <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag size={32} />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-1">Your cart is empty</h2>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Looks like you haven't added anything to your cart yet. Discover high-demand products at discounted rates.
            </p>
            <button
              onClick={() => navigateTo('shop')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-xs transition-colors"
            >
              Start Shopping Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Cart Items Table (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              {/* Free Shipping Notice */}
              <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-4 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-emerald-900 font-semibold">
                  <Truck size={18} className="text-emerald-600 shrink-0" />
                  <span>
                    {remainingForFreeShipping > 0
                      ? `Add ${formatBDT(remainingForFreeShipping)} more to qualify for FREE Delivery inside Dhaka!`
                      : '🎉 You have qualified for FREE standard delivery!'}
                  </span>
                </div>
                <button
                  onClick={() => navigateTo('shop')}
                  className="font-bold text-emerald-700 hover:text-emerald-800 underline text-[11px] shrink-0"
                >
                  Add More Items
                </button>
              </div>

              {/* Items List */}
              <div className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-2xs divide-y divide-slate-100">
                <div className="hidden sm:grid grid-cols-12 p-4 bg-slate-50/70 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <span className="col-span-6">Product</span>
                  <span className="col-span-2 text-center">Unit Price</span>
                  <span className="col-span-2 text-center">Quantity</span>
                  <span className="col-span-2 text-right">Subtotal</span>
                </div>

                {cart.map((item) => (
                  <div key={item.id} className="p-4 sm:p-5 flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center">
                    {/* Product info (6 cols) */}
                    <div className="w-full sm:col-span-6 flex items-center gap-3.5">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl bg-slate-50 border border-slate-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                          {item.product.brand}
                        </span>
                        <h3
                          onClick={() => navigateTo('product-details', item.product.slug)}
                          className="text-xs sm:text-sm font-bold text-slate-900 hover:text-emerald-600 transition-colors line-clamp-2 cursor-pointer leading-snug"
                        >
                          {item.product.title}
                        </h3>

                        {/* Variants */}
                        <div className="flex flex-wrap gap-1 mt-1 text-[10px] text-slate-500">
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

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="sm:hidden mt-2 text-[11px] text-rose-500 hover:text-rose-700 font-semibold flex items-center gap-1"
                        >
                          <Trash2 size={12} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>

                    {/* Unit Price (2 cols) */}
                    <div className="w-full sm:w-auto sm:col-span-2 flex justify-between sm:justify-center items-center text-xs font-semibold text-slate-700">
                      <span className="sm:hidden text-slate-400">Unit Price:</span>
                      <span>{formatBDT(item.product.price)}</span>
                    </div>

                    {/* Quantity (2 cols) */}
                    <div className="w-full sm:w-auto sm:col-span-2 flex justify-between sm:justify-center items-center">
                      <span className="sm:hidden text-xs text-slate-400">Quantity:</span>
                      <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-slate-600 hover:bg-slate-200 transition-colors font-bold"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2.5 py-1 text-xs font-bold text-slate-900 min-w-[24px] text-center bg-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-slate-600 hover:bg-slate-200 transition-colors font-bold"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>

                    {/* Total & Remove (2 cols) */}
                    <div className="w-full sm:w-auto sm:col-span-2 flex justify-between sm:justify-end items-center gap-3">
                      <span className="sm:hidden text-xs text-slate-400">Total:</span>
                      <div className="text-right">
                        <span className="text-xs sm:text-sm font-black text-slate-900 block">
                          {formatBDT(item.product.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="hidden sm:inline-flex items-center gap-1 text-[11px] text-rose-500 hover:text-rose-700 font-semibold mt-1 transition-colors"
                        >
                          <Trash2 size={11} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons below table */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => navigateTo('shop')}
                  className="text-xs font-bold text-slate-600 hover:text-emerald-600 transition-colors"
                >
                  ← Continue Shopping
                </button>

                <button
                  onClick={clearCart}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-700 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary & Coupon Column (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-xs space-y-5 sticky top-24">
                <h3 className="text-base font-black text-slate-900 tracking-tight">
                  Order Summary
                </h3>

                {/* Pricing Lines */}
                <div className="space-y-3 text-xs text-slate-600 pb-4 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <span>Items Subtotal:</span>
                    <span className="font-bold text-slate-900">{formatBDT(cartSubtotal)}</span>
                  </div>

                  {couponDiscount > 0 && (
                    <div className="flex items-center justify-between text-emerald-600 font-bold">
                      <span>Coupon Discount:</span>
                      <span>-{formatBDT(couponDiscount)}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span>Estimated Shipping (Dhaka):</span>
                    <span className="font-semibold text-slate-800">
                      {estimatedDelivery === 0 ? (
                        <span className="text-emerald-600 font-bold">FREE</span>
                      ) : (
                        formatBDT(estimatedDelivery)
                      )}
                    </span>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="flex items-baseline justify-between pt-1">
                  <span className="text-sm font-bold text-slate-900">Total Payable:</span>
                  <span className="text-xl font-black text-slate-900">{formatBDT(finalTotal)}</span>
                </div>

                {/* Coupon Input Box */}
                <div className="pt-2">
                  <form onSubmit={handleApplyCoupon} className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-700 block">
                      Have a Promo Coupon?
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. EID2026 or DHAKA60"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs uppercase placeholder:normal-case focus:outline-none focus:border-emerald-500 flex-1 font-mono font-semibold"
                      />
                      <button
                        type="submit"
                        className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors shrink-0"
                      >
                        Apply
                      </button>
                    </div>

                    {couponStatus && (
                      <div
                        className={`text-[11px] font-semibold flex items-center gap-1.5 mt-1.5 ${
                          couponStatus.valid ? 'text-emerald-600' : 'text-rose-500'
                        }`}
                      >
                        {couponStatus.valid ? <CheckCircle2 size={13} /> : <AlertCircle size={13} />}
                        <span>{couponStatus.message}</span>
                      </div>
                    )}
                  </form>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={() => navigateTo('checkout')}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.01] active:scale-98"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={16} />
                </button>

                <div className="space-y-2 pt-2 text-[11px] text-slate-400">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
                    <span>Cash on Delivery available nationwide</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck size={14} className="text-emerald-500 shrink-0" />
                    <span>Courier partners: Pathao, Steadfast, RedX</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
