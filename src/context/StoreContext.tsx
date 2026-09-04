import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Product, CartItem, FilterState } from '../types';
import { productsApi } from '../api/productsApi';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message: string;
}

export type AppView = 'home' | 'shop' | 'product-details' | 'cart' | 'checkout' | 'wishlist' | 'track-order';

interface StoreContextType {
  // Navigation & Routing
  currentView: AppView;
  currentProductSlug: string | null;
  navigateTo: (view: AppView, productSlug?: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string, selectedStorage?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Wishlist
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
  clearWishlist: () => void;
  wishlistCount: number;

  // Quick View Modal
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  // Drawers
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  isFilterDrawerOpen: boolean;
  setIsFilterDrawerOpen: (open: boolean) => void;

  // Global Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearchSubmit: (query?: string) => void;

  // Filters state for Shop page
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;

  // Notifications
  toasts: ToastMessage[];
  addToast: (type: 'success' | 'info' | 'error', title: string, message: string) => void;
  removeToast: (id: string) => void;

  // Helper
  formatBDT: (amount: number) => string;
}

const DEFAULT_FILTERS: FilterState = {
  category: 'all',
  brands: [],
  minPrice: 0,
  maxPrice: 200000,
  rating: null,
  inStockOnly: false,
  onSaleOnly: false,
  searchQuery: '',
  sortBy: 'featured'
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [currentProductSlug, setCurrentProductSlug] = useState<string | null>(null);

  // Cart & Wishlist state with safe localStorage hydration
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('mrb_store_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('mrb_store_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI state
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mrb_store_cart', JSON.stringify(cart));
    } catch {
      // storage unavailable
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('mrb_store_wishlist', JSON.stringify(wishlist));
    } catch {
      // storage unavailable
    }
  }, [wishlist]);

  // URL Hash router integration for SEO & back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash || hash === '/' || hash === 'home') {
        setCurrentView('home');
        setCurrentProductSlug(null);
      } else if (hash.startsWith('product/')) {
        const slug = hash.replace('product/', '');
        setCurrentProductSlug(slug);
        setCurrentView('product-details');
      } else if (hash === 'shop' || hash.startsWith('shop')) {
        setCurrentView('shop');
      } else if (hash === 'cart') {
        setCurrentView('cart');
      } else if (hash === 'checkout') {
        setCurrentView('checkout');
      } else if (hash === 'wishlist') {
        setCurrentView('wishlist');
      } else if (hash === 'track-order') {
        setCurrentView('track-order');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = useCallback((view: AppView, productSlug?: string) => {
    setCurrentView(view);
    if (productSlug) {
      setCurrentProductSlug(productSlug);
      window.location.hash = `product/${productSlug}`;
    } else {
      window.location.hash = view === 'home' ? '' : view;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Notifications
  const addToast = useCallback((type: 'success' | 'info' | 'error', title: string, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Cart operations
  const addToCart = useCallback((
    product: Product,
    quantity = 1,
    selectedColor?: string,
    selectedSize?: string,
    selectedStorage?: string
  ) => {
    setCart(prev => {
      // Find matching item with same variants
      const existingIdx = prev.findIndex(item =>
        item.productId === product.id &&
        item.selectedColor === selectedColor &&
        item.selectedSize === selectedSize &&
        item.selectedStorage === selectedStorage
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }

      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        productId: product.id,
        product,
        quantity,
        selectedColor,
        selectedSize,
        selectedStorage
      };

      return [...prev, newItem];
    });

    addToast('success', 'Added to Cart', `${product.title.slice(0, 32)}... added to your bag.`);
  }, [addToast]);

  const removeFromCart = useCallback((cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    addToast('info', 'Item Removed', 'Product has been removed from your cart.');
  }, [addToast]);

  const updateQuantity = useCallback((cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === cartItemId ? { ...item, quantity: Math.min(newQty, 20) } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  // Wishlist operations
  const toggleWishlist = useCallback((product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        addToast('info', 'Removed from Wishlist', `${product.title.slice(0, 30)}... removed.`);
        return prev.filter(p => p.id !== product.id);
      } else {
        addToast('success', 'Saved to Wishlist', `${product.title.slice(0, 30)}... added to wishlist.`);
        return [...prev, product];
      }
    });
  }, [addToast]);

  const isWishlisted = useCallback((productId: string) => {
    return wishlist.some(p => p.id === productId);
  }, [wishlist]);

  const clearWishlist = useCallback(() => {
    setWishlist([]);
  }, []);

  const wishlistCount = wishlist.length;

  // Quick View
  const openQuickView = useCallback((product: Product) => {
    setQuickViewProduct(product);
  }, []);

  const closeQuickView = useCallback(() => {
    setQuickViewProduct(null);
  }, []);

  // Search
  const handleSearchSubmit = useCallback((query?: string) => {
    const q = query !== undefined ? query : searchQuery;
    setFilters(prev => ({ ...prev, searchQuery: q }));
    navigateTo('shop');
  }, [searchQuery, navigateTo]);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  // Format BDT currency helper
  const formatBDT = useCallback((amount: number) => {
    return `৳${amount.toLocaleString('en-BD')}`;
  }, []);

  const value = {
    currentView,
    currentProductSlug,
    navigateTo,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSubtotal,
    cartCount,
    isCartOpen,
    setIsCartOpen,
    wishlist,
    toggleWishlist,
    isWishlisted,
    clearWishlist,
    wishlistCount,
    quickViewProduct,
    openQuickView,
    closeQuickView,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isFilterDrawerOpen,
    setIsFilterDrawerOpen,
    searchQuery,
    setSearchQuery,
    handleSearchSubmit,
    filters,
    setFilters,
    resetFilters,
    toasts,
    addToast,
    removeToast,
    formatBDT
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
