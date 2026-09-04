# Build a High-Performance E-Commerce Storefront

## Reference

Use the uploaded `shop.html` as the **primary visual and UX reference**.

The new storefront should preserve the overall design language, layout hierarchy, spacing, product-card style, navigation behavior, filtering experience, and responsive structure of the reference — but **do not copy the source code directly**.

Rebuild it as a modern, production-ready application.

---

## 1. Technology Stack

Use:

* Next.js with App Router
* React
* TypeScript
* Modern CSS / Tailwind CSS
* Server Components by default
* Client Components only where interactivity is actually required
* Optimized image handling
* SEO-friendly server-rendered pages

Do NOT build this as a simple static HTML conversion.

Do NOT use unnecessary libraries.

---

# 2. PRIMARY OBJECTIVE — EXTREME PERFORMANCE

Performance is a first-class requirement.

The storefront must be engineered to load extremely fast on both desktop and mobile.

Target:

* Excellent Lighthouse Performance score
* Excellent Core Web Vitals
* Very low JavaScript shipped to the browser
* Fast First Contentful Paint
* Fast Largest Contentful Paint
* Minimal Cumulative Layout Shift
* Minimal Total Blocking Time
* Fast Time to Interactive
* Excellent mobile performance

Do NOT claim a specific Lighthouse score unless it has actually been measured.

---

# 3. DO NOT blindly reproduce the reference dependencies

The reference HTML uses dependencies such as Bootstrap, Swiper, GLightbox, Google Fonts and custom JavaScript.

Do NOT automatically carry all of them into the new application.

For every dependency, ask:

> Can this functionality be implemented more efficiently with native CSS, React, or a small custom component?

If yes, implement the lighter solution.

Avoid dependency bloat.

---

# 4. Font Optimization

Do NOT load unnecessary external fonts.

Prefer:

* A single optimized font family
* Only required font weights
* WOFF2 format
* Self-hosted fonts when appropriate
* `font-display: swap`
* Preload only the font actually required for above-the-fold rendering

Do NOT include unnecessary:

* TTF
* EOT
* SVG font
* multiple duplicate font formats

Do not load 10+ font weights when only 400/500/600/700 are required.

---

# 5. Image Optimization

All product and banner images must be optimized.

Use:

* Next.js Image optimization
* WebP/AVIF where appropriate
* Responsive image sizes
* Proper width/height
* Lazy loading below the fold
* Priority loading only for the actual LCP image
* Avoid oversized source images
* Prevent layout shift

Do not load every product image immediately.

Do not use large original images when a smaller responsive version is sufficient.

---

# 6. Storefront Layout

Use the uploaded `shop.html` as the visual reference.

The storefront should contain:

### Header

* Announcement/top bar
* Logo
* Search
* Account
* Wishlist
* Cart
* Main navigation
* Mega menu where appropriate
* Mobile menu
* Sticky header where useful

The reference contains elements such as account, wishlist, cart, search and category navigation. Recreate the UX in a modern optimized way.

---

# 7. Homepage

Create a polished e-commerce homepage containing:

* Hero/banner section
* Promotional sections
* Featured categories
* Featured products
* Best-selling products
* New arrivals
* Discount/sale products
* Product recommendation sections
* Brand/category sections where appropriate
* Newsletter section
* Footer

Do not overload the homepage with unnecessary animations.

---

# 8. Shop Page

Recreate the reference shop experience.

Include:

* Breadcrumb
* Page title
* Product count
* Sorting
* Product grid
* Responsive product cards
* Category filtering
* Brand filtering
* Price filtering
* Availability/stock filtering where appropriate
* Mobile filter drawer
* Pagination or efficient pagination alternative

The reference specifically contains category filtering, price filtering, top-rated products and brand/tag filtering. Preserve this general UX pattern while implementing it dynamically.

---

# 9. Product Card

Create a reusable product card component.

It should support:

* Product image
* Hover/secondary image where useful
* Product title
* Category
* Current price
* Previous price
* Discount percentage
* Rating
* Review count
* Wishlist
* Quick add-to-cart
* Sale badge
* Out-of-stock state

Keep the DOM and JavaScript lightweight.

---

# 10. Product Details Page

Create:

* Product image gallery
* Product title
* Rating
* Review count
* Price
* Discount
* Stock status
* Product variants
* Quantity selector
* Add to cart
* Buy now
* Wishlist
* Product description
* Specifications
* Reviews
* Related products

The page must remain fast even with multiple product images.

---

# 11. Search

Implement fast product search.

Support:

* Keyword search
* Category-aware search
* Search suggestions
* Product result page
* Empty state
* Mobile search UX

Do not send unnecessary requests on every keystroke.

Use debouncing where client-side search is required.

---

# 12. Cart

Create a proper cart experience:

* Add product
* Remove product
* Update quantity
* Variant selection
* Subtotal
* Discount
* Delivery charge
* Total
* Empty cart state
* Cart drawer where appropriate

Keep cart state reliable across navigation.

---

# 13. Wishlist

Implement:

* Add/remove wishlist
* Wishlist count
* Wishlist page
* Add-to-cart from wishlist
* Empty wishlist state

---

# 14. Checkout

Create a clean, conversion-focused checkout.

Include:

* Customer information
* Phone
* Address
* District/area
* Delivery option
* Order summary
* Coupon
* Delivery charge
* Payment method
* Place order

Design the checkout to minimize unnecessary steps.

---

# 15. Bangladesh E-Commerce UX

The storefront is intended for Bangladesh.

Therefore design the checkout and customer experience around:

* BDT
* Bangladeshi phone numbers
* District/area selection
* Inside-Dhaka / outside-Dhaka delivery logic
* Cash on Delivery
* Local payment integration readiness
* Courier integration readiness

Do not hard-code business rules that are supposed to come from the backend.

---

# 16. Backend/API Architecture

Do not put business logic directly inside UI components.

Use a clean API/data layer.

Architecture should allow:

```text
Next.js Storefront
        ↓
Backend API
        ↓
Database
        ↓
OMS / Admin
```

The storefront must be capable of receiving:

* Products
* Categories
* Inventory
* Prices
* Discounts
* Orders
* Customers
* Coupons
* Settings

from the backend.

---

# 17. SEO

Every important storefront page must be SEO-friendly.

Implement:

* Server-rendered metadata
* Dynamic title
* Meta description
* Canonical URLs
* Open Graph metadata
* Product structured data
* Breadcrumb structured data where appropriate
* Semantic HTML
* Clean URLs
* Proper heading hierarchy

Product/category pages must be indexable.

---

# 18. Security

Never expose:

* Database credentials
* API secrets
* Admin credentials
* Internal service credentials
* Private environment variables
* Admin-only APIs

The public storefront must never expose the private OMS/admin implementation.

Do not rely on a hidden URL as a security mechanism.

---

# 19. Admin Separation

The storefront is PUBLIC.

The OMS/Admin is PRIVATE.

Do not place admin navigation inside the storefront.

Architecture:

```text
PUBLIC
/
 /shop
 /category/[slug]
 /product/[slug]
 /cart
 /checkout
 /wishlist
 /account

PRIVATE
MRB OMS
```

The admin system must have proper authentication and authorization.

---

# 20. Component Architecture

Create reusable components such as:

```text
components/
├── Header
├── AnnouncementBar
├── Navigation
├── MegaMenu
├── Search
├── MobileMenu
├── ProductCard
├── ProductGrid
├── ProductGallery
├── FilterSidebar
├── MobileFilter
├── PriceFilter
├── CategoryFilter
├── SortSelect
├── CartDrawer
├── WishlistButton
├── Rating
├── Breadcrumb
├── Pagination
├── Footer
└── ...
```

Avoid duplicating markup across pages.

---

# 21. Loading Strategy

Above-the-fold content should load first.

Use:

* Server rendering
* Streaming where beneficial
* Suspense boundaries where appropriate
* Lazy loading
* Dynamic imports only when beneficial
* Image priority only for LCP
* Prefetching only where useful

Do not use a fake full-page loading screen just to hide slow rendering.

The actual page should become usable quickly.

---

# 22. JavaScript Rules

Minimize client-side JavaScript.

Do NOT make the entire application a Client Component.

Use Server Components by default.

Client Components should only be used for things such as:

* Cart interaction
* Wishlist interaction
* Filters
* Search interaction
* Mobile menu
* Variant selection
* Quantity controls
* Other genuinely interactive UI

---

# 23. CSS Rules

Keep CSS optimized.

Avoid:

* Huge unused CSS frameworks
* Duplicate styles
* Excessive specificity
* Inline style everywhere
* Unnecessary animations
* Layout shifts caused by CSS

Use responsive design from the beginning.

---

# 24. Accessibility

Implement:

* Semantic HTML
* Keyboard navigation
* Proper labels
* Accessible buttons
* Accessible dialogs/drawers
* Focus management
* Alt text
* Color contrast
* ARIA only where necessary

Do not sacrifice accessibility for visual effects.

---

# 25. Visual Requirement

The result should feel very close to the uploaded `shop.html` in terms of:

* Overall visual hierarchy
* Header structure
* Navigation
* Product grid
* Sidebar
* Product cards
* Typography scale
* Spacing
* Buttons
* Filter experience
* Mobile behavior

But improve:

* Performance
* Responsiveness
* Accessibility
* Code quality
* Maintainability
* SEO
* Real data integration readiness

Do not simply copy/paste the original HTML.

---

# 26. Development Process

Before coding:

1. Inspect the provided reference file thoroughly.
2. Identify all reusable UI patterns.
3. Identify which visual elements are essential.
4. Identify unnecessary dependencies.
5. Create the storefront architecture.
6. Build reusable components.
7. Implement responsive layouts.
8. Optimize images/fonts/assets.
9. Implement SEO.
10. Run production build.
11. Test desktop and mobile.
12. Check console errors.
13. Check broken links/routes.
14. Test loading behavior.
15. Run Lighthouse/PageSpeed after deployment.
16. Fix the largest performance bottlenecks.

Do not declare the project "fully optimized" without actually testing it.

---

# 27. Critical Rule

The priority order is:

```text
1. Correct functionality
2. Fast loading
3. Excellent Core Web Vitals
4. Mobile UX
5. SEO
6. Accessibility
7. Visual similarity to reference
8. Maintainable architecture
```

Do not sacrifice real performance merely to reproduce an animation or effect from the reference template.

---

# FINAL REQUIREMENT

Build the storefront as a **production-quality, high-performance e-commerce frontend**, using the uploaded `shop.html` as the visual/UX reference.

The final implementation must be:

* Fast
* Lightweight
* Responsive
* SEO-friendly
* Accessible
* Secure
* Scalable
* Backend/API ready
* Compatible with the MRB OMS architecture

Do not use fake backend functionality.

Do not hard-code data that should come from the API.

Do not expose private admin functionality.

Do not add unnecessary dependencies.

Do not claim performance scores without measuring them.
