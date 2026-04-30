import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Package, TrendingUp, Clock } from "lucide-react";
import useFetch from "../hooks/useFetch";
import SkeletonWrapper from "../components/SkeletonWrapper";

export const AdminDashboardPage = () => {
  const { data, loading, error } = useFetch("/api/orders");

  console.log(data, "data");

  const stats = [
    {
      title: "Total Orders",
      value: "18",
      icon: ShoppingBag,
      color: "from-blue-500 to-blue-600",
      path: "/admin/orders",
    },
    {
      title: "Pending Orders",
      value: "12",
      icon: Clock,
      color: "from-yellow-500 to-yellow-600",
      path: "/admin/orders",
    },
    {
      title: "Total Products",
      value: "20",
      icon: Package,
      color: "from-green-500 to-green-600",
      path: "/admin/products",
    },
    {
      title: "Total Revenue",
      value: "₹30,000",
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600",
      path: "/admin/orders",
    },
  ];

  return (
    <div className="min-h-screen bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage orders, products, and your business
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Link
                key={index}
                to={stat.path}
                className="card overflow-hidden hover:shadow-lg transition cursor-pointer group"
              >
                <div
                  className={`bg-gradient-to-br ${stat.color} p-6 text-white relative overflow-hidden`}
                >
                  <div className="absolute -right-8 -bottom-8 opacity-20">
                    <Icon size={120} />
                  </div>
                  <Icon size={32} className="relative z-10 mb-4" />
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm font-medium">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">
                    {stat.value}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="card p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              to="/admin/products"
              className="p-6 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition text-center"
            >
              <Package size={32} className="mx-auto mb-3 text-primary" />
              <h3 className="font-bold text-gray-800">Manage Products</h3>
              <p className="text-sm text-gray-600 mt-1">
                Add, edit, or delete products
              </p>
            </Link>

            <Link
              to="/admin/orders"
              className="p-6 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition text-center"
            >
              <ShoppingBag size={32} className="mx-auto mb-3 text-primary" />
              <h3 className="font-bold text-gray-800">View Orders</h3>
              <p className="text-sm text-gray-600 mt-1">
                Track and update order status
              </p>
            </Link>

            <Link
              to="/admin/products/new"
              className="p-6 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition text-center"
            >
              <TrendingUp size={32} className="mx-auto mb-3 text-primary" />
              <h3 className="font-bold text-gray-800">Add New Product</h3>
              <p className="text-sm text-gray-600 mt-1">
                Create a new menu item
              </p>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="card p-6">
            <h3 className="text-xl font-bold mb-4">Recent Orders</h3>
            {loading ? (
              <SkeletonWrapper loading={loading}>
                <div className="space-y-3"></div>
              </SkeletonWrapper>
            ) : (
              <div className="space-y-3">
                {data?.data?.slice(0, 5).map((order) => (
                  <div
                    key={order._id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">
                        Order #{order._id.slice(-6)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.customer?.name || "Unknown Customer"}
                      </p>
                    </div>
                    <span className="font-bold text-primary">
                      ₹{order.totalPrice.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            )}
            <Link
              to="/admin/orders"
              className="mt-4 text-primary hover:text-orange-600 font-medium text-sm"
            >
              View all orders →
            </Link>
          </div>

          {/* Top Products */}
          <div className="card p-6">
            <h3 className="text-xl font-bold mb-4">Top Selling Products</h3>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">Margherita Pizza</p>
                    <p className="text-sm text-gray-600">₹299</p>
                  </div>
                  <span className="font-bold text-primary">{10 * i} sold</span>
                </div>
              ))}
            </div>
            <Link
              to="/admin/products"
              className="mt-4 text-primary hover:text-orange-600 font-medium text-sm"
            >
              View all products →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
