# FoodieHub - Frontend

A modern, responsive React application for a food delivery platform built with React 18, Vite, Redux Toolkit, and Tailwind CSS.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [Available Scripts](#available-scripts)
- [Directory Structure](#directory-structure)
- [Components](#components)
- [Pages](#pages)
- [State Management](#state-management)
- [Custom Hooks](#custom-hooks)
- [API Integration](#api-integration)
- [Styling](#styling)
- [Authentication](#authentication)
- [Real-time Updates](#real-time-updates)
- [Performance](#performance)
- [Troubleshooting](#troubleshooting)

## ✨ Features

### Customer Features
- 🍕 **Menu Browsing** - Browse food items by category (Pizza, Burgers, Chicken, Desserts, Beverages)
- 🔍 **Product Search** - Search and filter products
- 🛒 **Shopping Cart** - Add/remove items, adjust quantities
- 📦 **Order Checkout** - Multi-step checkout with validation
- 📍 **Order Tracking** - Real-time order status updates with timeline
- 📱 **Responsive Design** - Mobile, tablet, and desktop support

### Admin Features
- 🔐 **Admin Login** - Secure JWT-based authentication
- 📝 **Product Management** - Create, read, update, delete products
- 📋 **Order Management** - View and update order status
- 📊 **Dashboard** - Statistics and metrics overview
- 🔄 **Real-time Updates** - Live status updates

### Technical Features
- ⚡ **Fast Performance** - Vite build tool for rapid development
- 🎯 **State Management** - Redux Toolkit for global state
- 🎨 **Modern Styling** - Tailwind CSS utility-first approach
- 🔄 **Real-time Data** - Polling mechanism for live updates
- ✅ **Form Validation** - Input validation with error messages
- 🚀 **Lazy Loading** - Code splitting and route-based code loading

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.2.0 | UI Library |
| Vite | 4.4.9 | Build Tool |
| Redux Toolkit | 1.9.5 | State Management |
| React Router | 6.15.0 | Client-side Routing |
| Tailwind CSS | 3.3.3 | Styling |
| Axios | 1.5.0 | HTTP Client |
| Lucide React | 0.292.0 | Icons |

## 📁 Project Structure

```
apps/frontend/
├── src/
│   ├── api/
│   │   └── index.js                    # Axios configuration & API endpoints
│   │
│   ├── components/
│   │   ├── Header.jsx                  # Navigation & Cart
│   │   ├── Footer.jsx                  # Footer section
│   │   ├── ProductCard.jsx             # Product display component
│   │   ├── CartDropdown.jsx            # Shopping cart dropdown
│   │   └── PrivateRoute.jsx            # Protected route wrapper
│   │
│   ├── hooks/
│   │   ├── useFetch.js                 # Custom data fetching hook
│   │   ├── USEFETCH_DOCUMENTATION.md   # Hook documentation
│   │   └── USEFETCH_EXAMPLES.js        # Hook usage examples
│   │
│   ├── pages/
│   │   ├── HomePage.jsx                # Landing page
│   │   ├── MenuPage.jsx                # Menu browsing page
│   │   ├── CheckoutPage.jsx            # Checkout form
│   │   ├── OrderTrackingPage.jsx       # Order tracking with timeline
│   │   │
│   │   ├── AdminLoginPage.jsx          # Admin login page
│   │   ├── AdminDashboardPage.jsx      # Admin dashboard
│   │   ├── AdminProductsPage.jsx       # Products management list
│   │   ├── AdminProductFormPage.jsx    # Product create/edit form
│   │   └── AdminOrdersPage.jsx         # Orders management
│   │
│   ├── store/
│   │   ├── index.js                    # Redux store configuration
│   │   ├── cartSlice.js                # Shopping cart state
│   │   └── authSlice.js                # Authentication state
│   │
│   ├── App.jsx                         # Route definitions
│   ├── main.jsx                        # React entry point
│   └── index.css                       # Global styles & Tailwind imports
│
├── public/
│   └── favicon.svg                     # App favicon
│
├── index.html                          # HTML template
├── vite.config.js                      # Vite configuration
├── tailwind.config.js                  # Tailwind CSS configuration
├── postcss.config.js                   # PostCSS configuration
└── package.json                        # Dependencies & scripts
```

## 🚀 Installation

### Prerequisites
- Node.js v14 or higher
- npm v6 or higher

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd food-delivery-app/apps/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment** (optional)
   Create `.env.local` (optional, defaults to localhost):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

## 🔧 Environment Setup

### Development
```env
VITE_API_URL=http://localhost:5000/api
```

### Production
```env
VITE_API_URL=https://api.foodiehub.com/api
```

The API URL is used by Axios to make requests to the backend.

## ▶️ Running the Application

### Development Mode
```bash
npm run dev
```
Opens on `http://localhost:5173` with hot module replacement

### Production Build
```bash
npm run build
```
Creates optimized production build in `dist/` folder

### Preview Production Build
```bash
npm run preview
```
Serves the production build locally for testing

## 📜 Available Scripts

```bash
npm run dev          # Start development server with HMR
npm run build        # Create production build
npm run preview      # Preview production build
npm run lint         # Run ESLint (if configured)
```

## 🗂️ Directory Structure Detailed

### `/src/api`
Contains Axios configuration and API service methods:
- Centralized HTTP client setup
- Automatic JWT token injection
- Error handling and interceptors
- API endpoints organized by feature (products, orders, auth)

### `/src/components`
Reusable UI components:
- **Header**: Navigation bar with cart icon
- **Footer**: Footer with links
- **ProductCard**: Individual product display with add-to-cart
- **CartDropdown**: Shopping cart preview
- **PrivateRoute**: Route protection for admin pages

### `/src/hooks`
Custom React hooks:
- **useFetch**: Custom hook for data fetching with loading/error states
- See `USEFETCH_DOCUMENTATION.md` for complete details

### `/src/pages`
Page components (route-level):
- Customer pages: Home, Menu, Checkout, OrderTracking
- Admin pages: Login, Dashboard, Products, Orders

### `/src/store`
Redux state management:
- **cartSlice**: Cart items and totals
- **authSlice**: Admin authentication state
- **index.js**: Store configuration

## 🧩 Components

### Header Component
Navigation bar with:
- Logo and brand name
- Navigation links
- Shopping cart with item count
- Admin login/logout buttons
- Mobile responsive menu

### ProductCard Component
Displays individual product:
- Product image
- Name and description
- Price
- Quantity selector
- Add to cart button
- Preparation time
- Availability status

### CartDropdown Component
Shopping cart preview:
- List of items in cart
- Quantity controls
- Remove item buttons
- Total price calculation
- Tax calculation
- Checkout button

### PrivateRoute Component
Protected route wrapper:
- Redirects to login if not authenticated
- Wraps admin-only pages
- Uses Redux auth state

## 📄 Pages

### HomePage
Landing page with:
- Hero section with CTA
- Feature highlights
- Category showcase
- Call-to-action buttons

### MenuPage
Menu browsing with:
- Category filter buttons
- Product grid
- Search functionality
- Loading states
- Error handling

### CheckoutPage
Checkout process with:
- Order summary with items and totals
- Customer information form
- Delivery address input
- Validation messages
- Confirmation button

### OrderTrackingPage
Order tracking with:
- Order number and details
- Status timeline (5 stages)
- Customer information
- Order items breakdown
- Estimated delivery time
- Real-time status updates (5-second polling)

### AdminLoginPage
Admin authentication:
- Email and password input
- Form validation
- Error messages
- Token storage in localStorage

### AdminDashboardPage
Admin overview:
- Key metrics cards
- Quick action links
- Recent orders list
- Top products list

### AdminProductsPage
Product management:
- Products table with images
- Search functionality
- Status badges
- Edit/Delete buttons
- Add product link

### AdminProductFormPage
Product creation/editing:
- Form inputs for all fields
- Image preview
- Category selector
- Availability toggle
- Preparation time input

### AdminOrdersPage
Order management:
- Orders table
- Status filter dropdown
- Search by order number or customer
- Real-time status updates
- Customer details view

## 🔄 State Management

### Redux Store Structure

```javascript
{
  cart: {
    items: [
      { _id, name, price, quantity, image, ... }
    ],
    totalPrice: 0
  },
  auth: {
    token: null,
    admin: null,
    isAuthenticated: false,
    loading: false,
    error: null
  }
}
```

### Cart Operations
```javascript
// Add item to cart
dispatch(addToCart({ product, quantity }))

// Remove item
dispatch(removeFromCart(productId))

// Update quantity
dispatch(updateQuantity({ productId, quantity }))

// Clear cart
dispatch(clearCart())
```

### Auth Operations
```javascript
// Login
dispatch(loginStart())
dispatch(loginSuccess({ token, admin }))

// Logout
dispatch(logout())
```

## 🪝 Custom Hooks

### useFetch Hook
Complete data fetching solution:

```javascript
const { data, loading, error, refetch } = useFetch('/api/products', {
  method: 'GET',
  skip: false,
  headers: {}
});
```

Features:
- Automatic token injection
- Error handling
- Loading state
- Manual refetch capability
- Skip option for conditional fetching

See `USEFETCH_DOCUMENTATION.md` for detailed documentation.

## 🌐 API Integration

### Service Layer (`src/api/index.js`)

Product endpoints:
```javascript
productAPI.getAll(category)
productAPI.getById(id)
productAPI.getCategories()
productAPI.create(data)
productAPI.update(id, data)
productAPI.delete(id)
```

Order endpoints:
```javascript
orderAPI.create(data)
orderAPI.getById(id)
orderAPI.getAll()
orderAPI.updateStatus(id, status)
orderAPI.getStats()
```

Auth endpoints:
```javascript
authAPI.login(email, password)
authAPI.register(email, password)
authAPI.verify()
```

### Request/Response Format

All requests include:
```javascript
{
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer <token>' // If logged in
  }
}
```

All responses follow:
```javascript
{
  success: true/false,
  data: {},
  message: "...",
  count: 10
}
```

## 🎨 Styling

### Tailwind CSS
- Utility-first CSS framework
- Responsive design classes
- Custom color palette in `tailwind.config.js`
- Global styles in `src/index.css`

### Color Palette
```javascript
{
  primary: '#FF6B35',    // Orange
  secondary: '#004E89',  // Dark Blue
  accent: '#F77F00',     // Gold
  light: '#F5F5F5'       // Light Gray
}
```

### Responsive Design
- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Flexible grid layouts
- Touch-friendly buttons

## 🔐 Authentication

### Admin Login Flow
1. User navigates to `/admin/login`
2. Enters email and password
3. Backend validates credentials
4. JWT token returned
5. Token stored in localStorage as `adminToken`
6. Token auto-injected in subsequent requests
7. Redirect to admin dashboard
8. Protected routes check `isAuthenticated` in Redux

### Protected Routes
```jsx
<Route
  path="/admin/products"
  element={
    <PrivateRoute>
      <AdminProductsPage />
    </PrivateRoute>
  }
/>
```

## 🔄 Real-time Updates

### Order Tracking
- Polls backend every 5 seconds
- Updates order status automatically
- Shows estimated delivery time
- Displays order progress timeline

```javascript
useEffect(() => {
  const interval = setInterval(fetchOrder, 5000);
  return () => clearInterval(interval);
}, [orderId]);
```

### Admin Dashboard
- Auto-refreshing order list
- Live status updates
- Real-time statistics

## ⚡ Performance

### Optimizations
- Code splitting by routes
- Lazy component loading
- Image optimization
- Minification in production
- Gzip compression ready
- Redux DevTools for debugging

### Build Size
- Production build: ~150 KB (gzipped)
- Main bundle: ~80 KB
- Vendor bundle: ~70 KB

## 🔧 Troubleshooting

### Common Issues

**Issue: API requests return 401 Unauthorized**
- Solution: Make sure backend is running on port 5000
- Check localStorage for `adminToken`
- Login again to refresh token

**Issue: Page shows "Loading..." indefinitely**
- Solution: Check if backend is running
- Check browser console for errors
- Verify VITE_API_URL environment variable

**Issue: Tailwind styles not applied**
- Solution: Ensure `index.css` imports Tailwind
- Check `tailwind.config.js` content paths
- Run `npm run build` to verify

**Issue: Redux state not persisting on page refresh**
- Solution: This is expected - localStorage only stores auth token
- Use `localStorage.getItem('adminToken')` for persistence

**Issue: Admin pages showing "Unauthorized"**
- Solution: Make sure you're logged in
- Token may have expired - login again
- Check browser localStorage

## 📦 Dependencies

### Production
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.15.0",
  "@reduxjs/toolkit": "^1.9.5",
  "react-redux": "^8.1.2",
  "axios": "^1.5.0",
  "lucide-react": "^0.292.0"
}
```

### Dev Dependencies
```json
{
  "@vitejs/plugin-react": "^4.0.3",
  "vite": "^4.4.9",
  "tailwindcss": "^3.3.3",
  "postcss": "^8.4.28",
  "autoprefixer": "^10.4.14"
}
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [React Router](https://reactrouter.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Axios Documentation](https://axios-http.com)

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Push dist/ folder to gh-pages branch
```

## 📝 Environment Variables

### Development (.env.local)
```env
VITE_API_URL=http://localhost:5000/api
```

### Production (.env.production)
```env
VITE_API_URL=https://api.yourdomain.com/api
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

MIT License - feel free to use this project

## 🎉 Getting Started

1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Open http://localhost:5173
4. Start building!

---

**Built with ❤️ using React, Vite, and Tailwind CSS**
