import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X, LogOut, Settings } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import CartDropdown from "./CartDropdown";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="text-xl font-bold hidden sm:inline text-gray-800">
              FoodieHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          {!isAuthenticated && (
            <nav className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-primary font-medium"
              >
                Home
              </Link>
              <Link
                to="/menu"
                className="text-gray-700 hover:text-primary font-medium"
              >
                Menu
              </Link>
            </nav>
          )}

          {/* Right Side Items */}
          <div className="flex items-center gap-4">
            {/* Cart Icon */}
            {!isAuthenticated && (
              <div className="relative">
                <button
                  onClick={() => setCartOpen(!cartOpen)}
                  className="relative p-2 text-gray-700 hover:text-primary transition"
                >
                  <ShoppingCart size={24} />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
                {cartOpen && (
                  <CartDropdown onClose={() => setCartOpen(false)} />
                )}
              </div>
            )}

            {/* Admin/Login */}
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/admin"
                  className="p-2 text-gray-700 hover:text-primary transition"
                  title="Admin Panel"
                >
                  <Settings size={20} />
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-700 hover:text-red-500 transition"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link
                to="/admin/login"
                className="hidden sm:block btn btn-secondary text-sm"
              >
                Admin
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t">
            <div className="flex flex-col gap-2 pt-4">
              {!isAuthenticated && (
                <>
                  <Link
                    to="/"
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    to="/menu"
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Menu
                  </Link>
                </>
              )}
              {isAuthenticated ? (
                <>
                  <Link
                    to="/admin"
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="px-4 py-2 text-left text-red-600 hover:bg-gray-100 rounded"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/admin/login"
                  className="px-4 py-2 text-primary font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
