import React, { useState } from 'react';
import { Breadcrumb } from '../components/Common/Breadcrumb';
import { useStore } from '../context/StoreContext';
import { Search, Package, Truck, CheckCircle2, Clock, MapPin, AlertCircle } from 'lucide-react';

export const TrackOrderPage: React.FC = () => {
  const { navigateTo } = useStore();
  const [orderQuery, setOrderQuery] = useState('BD-849201');
  const [searched, setSearched] = useState(true);

  // Mock tracking status
  const trackingData = {
    orderId: orderQuery.toUpperCase() || 'BD-849201',
    courier: 'Pathao Courier BD',
    courierTrackingId: 'PT-98231-BD',
    currentStatus: 'out-for-delivery',
    statusLabel: 'Out for Delivery',
    destination: 'Dhanmondi 8/A, Dhaka 1209',
    estimatedDate: 'Today by 6:00 PM',
    riderName: 'Habibur Rahman (Pathao Rider)',
    riderPhone: '+880 1812-345678',
    timeline: [
      {
        title: 'Order Confirmed & Payment Verified',
        time: 'Yesterday, 04:30 PM',
        completed: true,
        desc: 'Customer requested Cash on Delivery'
      },
      {
        title: 'Quality Inspected & Dispatched from Central Hub',
        time: 'Today, 09:15 AM',
        completed: true,
        desc: 'Tejgaon Central Sorting Facility, Dhaka'
      },
      {
        title: 'Handed Over to Pathao Courier',
        time: 'Today, 11:45 AM',
        completed: true,
        desc: 'Assigned to Dhanmondi Distribution Hub'
      },
      {
        title: 'Out for Delivery to Your Doorstep',
        time: 'Today, 02:15 PM',
        completed: true,
        current: true,
        desc: 'Rider is on the way with your package'
      },
      {
        title: 'Delivered & Cash Collected',
        time: 'Estimated by 06:00 PM',
        completed: false,
        desc: 'Parcel handoff and verification'
      }
    ]
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderQuery.trim()) return;
    setSearched(true);
  };

  return (
    <div className="bg-slate-50/50 min-h-screen pb-16">
      <Breadcrumb
        items={[
          { label: 'Shop', view: 'shop' },
          { label: 'Track Order', active: true }
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Track Your Delivery
          </h1>
          <p className="text-xs text-slate-500 mt-1.5">
            Enter your Storefront Order ID (e.g. BD-849201) or 11-digit mobile number to view live courier status.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-2 mt-5">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Enter Order ID (e.g. BD-849201)"
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-xs text-slate-900 font-mono font-semibold focus:outline-none focus:border-emerald-500 shadow-2xs"
              />
            </div>
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-2xl text-xs transition-colors shadow-xs"
            >
              Track Status
            </button>
          </form>
        </div>

        {/* Tracking Details Display */}
        {searched && (
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            {/* Summary Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Order Tracking ID
                </span>
                <span className="text-lg font-black text-slate-900 font-mono">
                  {trackingData.orderId}
                </span>
              </div>

              <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-bold self-start sm:self-auto">
                <Truck size={14} className="text-emerald-600" />
                <span>{trackingData.statusLabel}</span>
              </div>
            </div>

            {/* Courier Meta */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-2xl text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Courier Partner:</span>
                <span className="font-bold text-slate-900">{trackingData.courier}</span>
                <span className="text-[10px] text-slate-500 block font-mono">
                  Waybill: {trackingData.courierTrackingId}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px]">Delivery Rider:</span>
                <span className="font-bold text-slate-900">{trackingData.riderName}</span>
                <span className="text-[10px] text-emerald-600 font-semibold block">
                  {trackingData.riderPhone}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px]">Estimated Arrival:</span>
                <span className="font-bold text-emerald-600">{trackingData.estimatedDate}</span>
                <span className="text-[10px] text-slate-500 block">
                  {trackingData.destination}
                </span>
              </div>
            </div>

            {/* Timeline Milestones */}
            <div className="pt-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-6">
                Delivery Timeline
              </h3>

              <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {trackingData.timeline.map((step, idx) => (
                  <div key={idx} className="relative">
                    {/* Circle Indicator */}
                    <div
                      className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        step.completed
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'bg-white border-slate-300'
                      }`}
                    >
                      {step.completed && <CheckCircle2 size={10} className="stroke-[3]" />}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4
                        className={`text-xs font-bold ${
                          step.completed ? 'text-slate-900' : 'text-slate-400'
                        }`}
                      >
                        {step.title}
                      </h4>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {step.time}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
