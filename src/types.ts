export interface Product {
  id: string;
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  image: string;
  secondaryImage?: string;
  images: string[];
  inStock: boolean;
  stockCount: number;
  isNew?: boolean;
  isHot?: boolean;
  isBestSeller?: boolean;
  description: string;
  shortDescription?: string;
  specifications: Record<string, string>;
  variants?: {
    type: 'color' | 'size' | 'storage';
    name: string;
    options: string[];
  }[];
  tags: string[];
  sku: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  image: string;
  itemCount: number;
  subcategories?: string[];
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  productCount: number;
}

export interface FilterState {
  category: string;
  subCategory?: string;
  brands: string[];
  minPrice: number;
  maxPrice: number;
  rating: number | null;
  inStockOnly: boolean;
  onSaleOnly: boolean;
  searchQuery: string;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest' | 'discount';
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  selectedStorage?: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  minSpend?: number;
  description: string;
}

export interface CustomerOrderInfo {
  fullName: string;
  phone: string;
  email?: string;
  division: string;
  district: string;
  thanaArea: string;
  streetAddress: string;
  notes?: string;
  deliveryMethod: 'inside-dhaka' | 'outside-dhaka' | 'express-dhaka';
  paymentMethod: 'cod' | 'bkash' | 'nagad' | 'card';
}

export interface Order {
  orderId: string;
  createdAt: string;
  items: CartItem[];
  customer: CustomerOrderInfo;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  status: 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered';
  courier: 'Pathao Courier' | 'Steadfast Courier' | 'RedX' | 'eCourier';
  trackingNumber: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}
