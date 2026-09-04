import React, { useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { QuickViewModal } from './components/Product/QuickViewModal';
import { CartDrawer } from './components/Cart/CartDrawer';
import { ToastContainer } from './components/Common/Toast';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { WishlistPage } from './pages/WishlistPage';
import { TrackOrderPage } from './pages/TrackOrderPage';

// Mobile bottom nav icons
import { Home, Compass, Heart, ShoppingBag, Truck } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentView, navigateTo, cartCount, wishlistCount } = useStore();

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [currentView]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans antialiased selection:bg-emerald-500 selection:text-white pb-16 md:pb-0">
      {/* 1. Global Header */}
      <Header />

      {/* 2. Dynamic View Content */}
      <main className="flex-1">
        {currentView === 'home' && <HomePage />}
        {currentView === 'shop' && <ShopPage />}
        {currentView === 'product-details' && <ProductDetailPage />}
        {currentView === 'cart' && <CartPage />}
        {currentView === 'checkout' && <CheckoutPage />}
        {currentView === 'wishlist' && <WishlistPage />}
        {currentView === 'track-order' && <TrackOrderPage />}
      </main>

      {/* 3. Global Footer */}
      <Footer />

      {/* 4. Global Modals & Drawers */}
      <QuickViewModal />
      <CartDrawer />
      <ToastContainer />

      {/* 5. Mobile Sticky Bottom Navigation Bar */}
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-2 flex items-center justify-around shadow-lg"
      >
        <button
          onClick={() => navigateTo('home')}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] font-semibold transition-colors ${
            currentView === 'home' ? 'text-emerald-600' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home size={18} className={currentView === 'home' ? 'stroke-[2.5]' : ''} />
          <span>Home</span>
        </button>

        <button
          onClick={() => navigateTo('shop')}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] font-semibold transition-colors ${
            currentView === 'shop' ? 'text-emerald-600' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Compass size={18} className={currentView === 'shop' ? 'stroke-[2.5]' : ''} />
          <span>Shop</span>
        </button>

        <button
          onClick={() => navigateTo('wishlist')}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] font-semibold transition-colors relative ${
            currentView === 'wishlist' ? 'text-emerald-600' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Heart size={18} className={currentView === 'wishlist' ? 'stroke-[2.5] text-rose-500 fill-rose-500' : ''} />
          <span>Wishlist</span>
          {wishlistCount > 0 && (
            <span className="absolute top-0 right-1 bg-rose-500 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
              {wishlistCount}
            </span>
          )}
        </button>

        <button
          onClick={() => navigateTo('cart')}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] font-semibold transition-colors relative ${
            currentView === 'cart' ? 'text-emerald-600' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <ShoppingBag size={18} className={currentView === 'cart' ? 'stroke-[2.5]' : ''} />
          <span>Cart</span>
          {cartCount > 0 && (
            <span className="absolute top-0 right-1 bg-emerald-600 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </button>

        <button
          onClick={() => navigateTo('track-order')}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] font-semibold transition-colors ${
            currentView === 'track-order' ? 'text-emerald-600' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Truck size={18} className={currentView === 'track-order' ? 'stroke-[2.5]' : ''} />
          <span>Track</span>
        </button>
      </nav>
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
