import { Product, Category, Brand, Coupon, Order, CustomerOrderInfo, CartItem } from '../types';
import { MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_BRANDS, MOCK_COUPONS } from '../data/mockProducts';
import { DELIVERY_RATES } from '../data/bangladeshLocations';

export interface ProductsQueryOptions {
  category?: string;
  brands?: string[];
  minPrice?: number;
  maxPrice?: number;
  rating?: number | null;
  inStockOnly?: boolean;
  onSaleOnly?: boolean;
  searchQuery?: string;
  sortBy?: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest' | 'discount';
  page?: number;
  pageSize?: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  minPriceAvailable: number;
  maxPriceAvailable: number;
}

class ProductsApiService {
  // Simulated asynchronous API call with immediate execution to prevent artificial lag
  async getProducts(options: ProductsQueryOptions = {}): Promise<ProductsResponse> {
    const {
      category,
      brands = [],
      minPrice = 0,
      maxPrice = 200000,
      rating,
      inStockOnly = false,
      onSaleOnly = false,
      searchQuery = '',
      sortBy = 'featured',
      page = 1,
      pageSize = 12
    } = options;

    let filtered = [...MOCK_PRODUCTS];

    // Search query filter (matches title, brand, category, tags, description)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (category && category !== 'all') {
      filtered = filtered.filter(
        p => p.categorySlug.toLowerCase() === category.toLowerCase() ||
             p.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Brands filter
    if (brands.length > 0) {
      filtered = filtered.filter(p =>
        brands.some(b => b.toLowerCase() === p.brand.toLowerCase())
      );
    }

    // Price range filter
    filtered = filtered.filter(
      p => p.price >= minPrice && p.price <= maxPrice
    );

    // Rating filter
    if (rating && rating > 0) {
      filtered = filtered.filter(p => p.rating >= rating);
    }

    // In Stock filter
    if (inStockOnly) {
      filtered = filtered.filter(p => p.inStock && p.stockCount > 0);
    }

    // On Sale filter
    if (onSaleOnly) {
      filtered = filtered.filter(p => (p.discountPercentage ?? 0) > 0);
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'discount':
        filtered.sort((a, b) => (b.discountPercentage ?? 0) - (a.discountPercentage ?? 0));
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.isHot ? 1 : 0) - (a.isHot ? 1 : 0));
        break;
    }

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const validPage = Math.min(Math.max(1, page), totalPages);
    const startIdx = (validPage - 1) * pageSize;
    const paginated = filtered.slice(startIdx, startIdx + pageSize);

    const prices = MOCK_PRODUCTS.map(p => p.price);
    const minPriceAvailable = Math.min(...prices);
    const maxPriceAvailable = Math.max(...prices);

    return {
      products: paginated,
      total,
      page: validPage,
      pageSize,
      totalPages,
      minPriceAvailable,
      maxPriceAvailable
    };
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    const product = MOCK_PRODUCTS.find(p => p.slug === slug || p.id === slug);
    return product || null;
  }

  async getFeaturedProducts(limit = 8): Promise<Product[]> {
    return MOCK_PRODUCTS.filter(p => p.isHot || p.isBestSeller).slice(0, limit);
  }

  async getFlashDeals(limit = 4): Promise<Product[]> {
    return MOCK_PRODUCTS.filter(p => (p.discountPercentage ?? 0) >= 15).slice(0, limit);
  }

  async getNewArrivals(limit = 6): Promise<Product[]> {
    return MOCK_PRODUCTS.filter(p => p.isNew || p.rating >= 4.7).slice(0, limit);
  }

  async getRelatedProducts(categorySlug: string, currentId: string, limit = 4): Promise<Product[]> {
    return MOCK_PRODUCTS.filter(
      p => p.categorySlug === categorySlug && p.id !== currentId
    ).slice(0, limit);
  }

  async getCategories(): Promise<Category[]> {
    return [...MOCK_CATEGORIES];
  }

  async getBrands(): Promise<Brand[]> {
    return [...MOCK_BRANDS];
  }

  async validateCoupon(code: string, subtotal: number): Promise<{ valid: boolean; discount: number; message: string; coupon?: Coupon }> {
    const coupon = MOCK_COUPONS.find(c => c.code.toUpperCase() === code.toUpperCase().trim());
    if (!coupon) {
      return { valid: false, discount: 0, message: 'Invalid coupon code. Try EID2026 or DHAKA60.' };
    }

    if (coupon.minSpend && subtotal < coupon.minSpend) {
      return {
        valid: false,
        discount: 0,
        message: `Minimum spend of ৳${coupon.minSpend.toLocaleString()} required for this coupon.`
      };
    }

    let discount = 0;
    if (coupon.discountType === 'percentage') {
      discount = Math.round((subtotal * coupon.value) / 100);
      // Cap percentage discount at 600 BDT
      if (discount > 600) discount = 600;
    } else {
      discount = coupon.value;
    }

    return {
      valid: true,
      discount,
      message: `Coupon applied: ৳${discount.toLocaleString()} saved!`,
      coupon
    };
  }

  async submitOrder(customer: CustomerOrderInfo, items: CartItem[], couponCode?: string): Promise<Order> {
    const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    
    // Dynamic Delivery Fee based on location rules
    let deliveryFee = DELIVERY_RATES.OUTSIDE_DHAKA;
    if (customer.deliveryMethod === 'express-dhaka') {
      deliveryFee = DELIVERY_RATES.EXPRESS_DHAKA;
    } else if (customer.deliveryMethod === 'inside-dhaka' || customer.division.toLowerCase().includes('dhaka')) {
      deliveryFee = DELIVERY_RATES.INSIDE_DHAKA;
    }

    if (subtotal >= DELIVERY_RATES.FREE_SHIPPING_THRESHOLD && customer.deliveryMethod !== 'express-dhaka') {
      deliveryFee = 0;
    }

    let discount = 0;
    if (couponCode) {
      const res = await this.validateCoupon(couponCode, subtotal);
      if (res.valid) discount = res.discount;
    }

    const total = Math.max(0, subtotal - discount + deliveryFee);
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const orderId = `BD-${randomNum}`;

    const couriers: Order['courier'][] = ['Pathao Courier', 'Steadfast Courier', 'RedX', 'eCourier'];
    const assignedCourier = couriers[Math.floor(Math.random() * couriers.length)];

    const newOrder: Order = {
      orderId,
      createdAt: new Date().toISOString(),
      items,
      customer,
      subtotal,
      discount,
      deliveryFee,
      total,
      status: 'Confirmed',
      courier: assignedCourier,
      trackingNumber: `TRK-${Math.floor(10000000 + Math.random() * 90000000)}`
    };

    // Store in localStorage for instant tracking lookup
    try {
      const existingOrders = JSON.parse(localStorage.getItem('mrb_store_orders') || '[]');
      existingOrders.unshift(newOrder);
      localStorage.setItem('mrb_store_orders', JSON.stringify(existingOrders));
    } catch {
      // ignore storage error in private mode
    }

    return newOrder;
  }

  async getOrderById(orderId: string): Promise<Order | null> {
    try {
      const existingOrders: Order[] = JSON.parse(localStorage.getItem('mrb_store_orders') || '[]');
      const found = existingOrders.find(o => o.orderId.toUpperCase() === orderId.toUpperCase().trim());
      if (found) return found;
    } catch {
      // fallback
    }

    // Default mock lookup for demo
    if (orderId.toUpperCase().includes('BD-') || orderId.length >= 5) {
      return {
        orderId: orderId.toUpperCase(),
        createdAt: new Date(Date.now() - 3600 * 24 * 1000).toISOString(),
        items: [
          {
            id: 'cart-demo',
            productId: MOCK_PRODUCTS[0].id,
            product: MOCK_PRODUCTS[0],
            quantity: 1,
            selectedColor: 'Jet Black'
          }
        ],
        customer: {
          fullName: 'Kazi Naimul',
          phone: '+880 1711-234567',
          division: 'Dhaka Division',
          district: 'Dhaka City',
          thanaArea: 'Dhanmondi',
          streetAddress: 'House 42, Road 7A, Dhanmondi R/A',
          deliveryMethod: 'inside-dhaka',
          paymentMethod: 'cod'
        },
        subtotal: MOCK_PRODUCTS[0].price,
        discount: 0,
        deliveryFee: 60,
        total: MOCK_PRODUCTS[0].price + 60,
        status: 'Processing',
        courier: 'Pathao Courier',
        trackingNumber: 'PTH-88392109'
      };
    }
    return null;
  }
}

export const productsApi = new ProductsApiService();
