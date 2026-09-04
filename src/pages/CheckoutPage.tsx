import React, { useState, useMemo } from 'react';
import { Breadcrumb } from '../components/Common/Breadcrumb';
import { useStore } from '../context/StoreContext';
import { productsApi } from '../api/productsApi';
import { BANGLADESH_DIVISIONS, DELIVERY_RATES, PAYMENT_METHODS } from '../data/bangladeshLocations';
import { Order, CustomerOrderInfo } from '../types';
import {
  CheckCircle2,
  Truck,
  ShieldCheck,
  CreditCard,
  Banknote,
  Smartphone,
  Printer,
  ArrowRight,
  PackageCheck,
  AlertCircle
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    clearCart,
    cartSubtotal,
    navigateTo,
    formatBDT,
    addToast
  } = useStore();

  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [division, setDivision] = useState('Dhaka');
  const [district, setDistrict] = useState('Dhaka City');
  const [thana, setThana] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'nagad' | 'card'>('cod');
  const [selectedCourier, setSelectedCourier] = useState('Pathao Courier');

  // Submitting state & Placed order confirmation
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Available districts based on division
  const currentDivisionObj = useMemo(() => {
    return BANGLADESH_DIVISIONS.find(d => d.name === division) || BANGLADESH_DIVISIONS[0];
  }, [division]);

  // If division changes, auto reset district to first available
  const handleDivisionChange = (newDivision: string) => {
    setDivision(newDivision);
    const divObj = BANGLADESH_DIVISIONS.find(d => d.name === newDivision);
    if (divObj && divObj.districts.length > 0) {
      setDistrict(divObj.districts[0].name);
    }
  };

  // Shipping calculation
  const isInsideDhaka = district.toLowerCase().includes('dhaka');
  const freeShipping = cartSubtotal >= DELIVERY_RATES.FREE_SHIPPING_THRESHOLD;
  const shippingFee = freeShipping
    ? 0
    : isInsideDhaka
    ? DELIVERY_RATES.INSIDE_DHAKA
    : DELIVERY_RATES.OUTSIDE_DHAKA;

  const totalPayable = cartSubtotal + shippingFee;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (cart.length === 0) {
      setErrorMessage('Your cart is empty.');
      return;
    }

    if (!fullName.trim()) {
      setErrorMessage('Please enter recipient full name.');
      return;
    }

    // BD Phone validation: Must be 11 digits starting with 01
    const cleanPhone = phone.trim().replace(/\D/g, '');
    if (cleanPhone.length < 11 || !cleanPhone.startsWith('01')) {
      setErrorMessage('Please enter a valid 11-digit Bangladeshi mobile number (e.g. 01712345678).');
      return;
    }

    if (!address.trim()) {
      setErrorMessage('Please provide a complete street address, house/road number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const customerInfo: CustomerOrderInfo = {
        fullName,
        phone,
        email,
        division,
        district,
        thanaArea: thana || district,
        streetAddress: address,
        notes,
        deliveryMethod: isInsideDhaka ? 'inside-dhaka' : 'outside-dhaka',
        paymentMethod
      };

      const newOrder = await productsApi.submitOrder(customerInfo, cart);

      setPlacedOrder(newOrder);
      clearCart();
      addToast('success', 'Order Confirmed!', `Your order ${newOrder.orderId} has been placed successfully.`);
    } catch (err) {
      setErrorMessage('Failed to place order. Please try again or contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // SUCCESS CONFIRMATION VIEW
  if (placedOrder) {
    return (
      <div className="bg-slate-50/50 min-h-screen py-12 px-4">
        <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 size={36} />
            </div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Thank You! Order Received
            </span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Order Confirmed: {placedOrder.orderId}
            </h1>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              We have dispatched an SMS notification to <strong>{placedOrder.customer.phone}</strong>. Your order is being packed and prepared for dispatch.
            </p>
          </div>

          {/* Tracking Details Card */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 sm:p-5 space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-4 pb-3 border-b border-slate-200/60">
              <div>
                <span className="text-slate-400 block text-[11px]">Courier Partner:</span>
                <span className="font-bold text-slate-900">{placedOrder.courier}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Payment Method:</span>
                <span className="font-bold text-slate-900 uppercase">{placedOrder.customer.paymentMethod}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Tracking Number:</span>
                <span className="font-bold text-emerald-600 font-mono">{placedOrder.trackingNumber}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Delivery Location:</span>
                <span className="font-bold text-slate-900">{placedOrder.customer.district}, {placedOrder.customer.division}</span>
              </div>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">Delivery Address:</span>
              <span className="font-medium text-slate-700">
                {placedOrder.customer.streetAddress}, {placedOrder.customer.thanaArea}, {placedOrder.customer.district}
              </span>
            </div>
          </div>

          {/* Itemized summary */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Purchased Items
            </h3>
            <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
              {placedOrder.items.map((it, idx) => (
                <div key={idx} className="p-3 bg-white flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={it.product.image}
                      alt={it.product.title}
                      className="w-10 h-10 object-cover rounded-lg bg-slate-50"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 line-clamp-1">{it.product.title}</h4>
                      <span className="text-slate-400 text-[11px]">Qty: {it.quantity} × {formatBDT(it.product.price)}</span>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900">{formatBDT(it.product.price * it.quantity)}</span>
                </div>
              ))}

              <div className="p-4 bg-slate-50 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-semibold">{formatBDT(placedOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Delivery Fee:</span>
                  <span className="font-semibold">
                    {placedOrder.deliveryFee === 0 ? 'FREE' : formatBDT(placedOrder.deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Amount:</span>
                  <span>{formatBDT(placedOrder.total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={handlePrint}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Printer size={15} />
              <span>Print Invoice Receipt</span>
            </button>

            <button
              onClick={() => navigateTo('shop')}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <span>Continue Shopping</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // CHECKOUT FORM VIEW
  return (
    <div className="bg-slate-50/50 min-h-screen pb-16">
      <Breadcrumb
        items={[
          { label: 'Shop', view: 'shop' },
          { label: 'Cart', view: 'cart' },
          { label: 'Secure Checkout', active: true }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-6">
          Express Checkout
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center max-w-md mx-auto my-8">
            <h3 className="text-base font-bold text-slate-900 mb-2">Your cart is empty</h3>
            <p className="text-xs text-slate-500 mb-6">Please add products to your cart before proceeding to checkout.</p>
            <button
              onClick={() => navigateTo('shop')}
              className="bg-emerald-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl"
            >
              Return to Shop
            </button>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Form: Delivery & Payment Details (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* 1. Recipient Information */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">1</span>
                  <span>Customer & Contact Info</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mahfuzur Rahman"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Mobile Number (BD) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                        +88
                      </span>
                      <input
                        type="tel"
                        required
                        placeholder="01712345678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-3.5 py-2.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Email Address (Optional for e-invoice)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. mahfuz@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Bangladesh Shipping Address */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">2</span>
                  <span>Delivery Address (Bangladesh)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Division */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Division *
                    </label>
                    <select
                      value={division}
                      onChange={(e) => handleDivisionChange(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 cursor-pointer font-medium"
                    >
                      {BANGLADESH_DIVISIONS.map(div => (
                        <option key={div.name} value={div.name}>{div.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* District */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      District *
                    </label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 cursor-pointer font-medium"
                    >
                      {currentDivisionObj.districts.map(dist => (
                        <option key={dist.name} value={dist.name}>{dist.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Thana / Area */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Thana / Upazila / Area
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Dhanmondi / Mirpur / Agrabad"
                      value={thana}
                      onChange={(e) => setThana(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  {/* Courier Partner */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Preferred Courier
                    </label>
                    <select
                      value={selectedCourier}
                      onChange={(e) => setSelectedCourier(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 cursor-pointer font-medium"
                    >
                      <option value="Pathao Courier">Pathao Courier (Express)</option>
                      <option value="Steadfast Courier">Steadfast Courier</option>
                      <option value="RedX Logistics">RedX Logistics</option>
                      <option value="eCourier">eCourier Bangladesh</option>
                    </select>
                  </div>

                  {/* Full Street Address */}
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Street Address / House & Road Number *
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="e.g. House #14, Road #5, Flat 4B, Sector 7"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  {/* Order Notes */}
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Delivery Instructions / Notes (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Please deliver after 3 PM or call upon arrival"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Payment Methods */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">3</span>
                  <span>Payment Method</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PAYMENT_METHODS.map((pm) => {
                    const isSelected = paymentMethod === pm.id;
                    return (
                      <div
                        key={pm.id}
                        onClick={() => setPaymentMethod(pm.id as any)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-slate-900">{pm.name}</span>
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300'
                            }`}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug">{pm.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Summary: Review & Place Order (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-xs space-y-5 sticky top-24">
                <h3 className="text-base font-black text-slate-900 tracking-tight">
                  Order Review
                </h3>

                {/* Items preview list */}
                <div className="max-h-56 overflow-y-auto divide-y divide-slate-100 pr-1">
                  {cart.map((it) => (
                    <div key={it.id} className="py-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <img
                          src={it.product.image}
                          alt={it.product.title}
                          className="w-10 h-10 object-cover rounded-lg bg-slate-50 shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="font-bold text-slate-900 truncate">{it.product.title}</h4>
                          <span className="text-[11px] text-slate-400">Qty: {it.quantity}</span>
                        </div>
                      </div>
                      <span className="font-bold text-slate-900 shrink-0">
                        {formatBDT(it.product.price * it.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pricing lines */}
                <div className="space-y-2.5 text-xs text-slate-600 pt-3 border-t border-slate-100">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-bold text-slate-900">{formatBDT(cartSubtotal)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>
                      Shipping ({isInsideDhaka ? 'Inside Dhaka' : 'Outside Dhaka'}):
                    </span>
                    <span className="font-bold text-slate-900">
                      {shippingFee === 0 ? (
                        <span className="text-emerald-600">FREE</span>
                      ) : (
                        formatBDT(shippingFee)
                      )}
                    </span>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between">
                  <span className="text-sm font-bold text-slate-900">Total Due:</span>
                  <span className="text-2xl font-black text-slate-900">
                    {formatBDT(totalPayable)}
                  </span>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-2">
                    <AlertCircle size={15} className="shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Place Order CTA Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold text-xs sm:text-sm py-4 rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.01] active:scale-98"
                >
                  {isSubmitting ? (
                    <span>Processing Order...</span>
                  ) : (
                    <>
                      <PackageCheck size={18} />
                      <span>Confirm & Place Order ({formatBDT(totalPayable)})</span>
                    </>
                  )}
                </button>

                <div className="text-[11px] text-slate-400 space-y-1.5 pt-2">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={13} className="text-emerald-500" />
                    <span>Pay with Cash on Delivery or Mobile Financial Services</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Truck size={13} className="text-emerald-500" />
                    <span>Official tracking ID provided immediately after booking</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
