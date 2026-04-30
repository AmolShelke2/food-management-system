import React, { useEffect, useState } from 'react';
import { orderAPI } from '../api';
import { Loader, Search, Eye } from 'lucide-react';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  preparing: 'bg-orange-100 text-orange-700',
  out_for_delivery: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

const statusOptions = [
  'pending',
  'confirmed',
  'preparing',
  'out_for_delivery',
  'delivered',
  'cancelled',
];

export const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.getAll();
      setOrders(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdatingId(orderId);
      await orderAPI.updateStatus(orderId, newStatus);
      setOrders(orders.map(order =>
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = !statusFilter || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
          <p className="text-gray-600 mt-1">Manage and track customer orders</p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Filters */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by order # or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-gray-300"
          >
            <option value="">All Statuses</option>
            {statusOptions.map(status => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader className="animate-spin text-primary" size={40} />
          </div>
        )}

        {/* Orders Table */}
        {!loading && (
          <div className="card overflow-hidden">
            {filteredOrders.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-600">No orders found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">
                        Order #
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">
                        Items
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map(order => (
                      <tr key={order._id} className="border-b hover:bg-gray-50 transition">
                        <td className="px-6 py-4 font-bold">{order.orderNumber}</td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium">{order.customer.name}</p>
                            <p className="text-sm text-gray-600">{order.customer.phone}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {order.items.length} items
                        </td>
                        <td className="px-6 py-4 font-bold text-primary">
                          ₹{order.totalPrice.toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            disabled={updatingId === order._id}
                            className={`px-3 py-1 rounded-full text-sm font-medium border-0 cursor-pointer ${
                              statusColors[order.status]
                            } disabled:opacity-50`}
                          >
                            {statusOptions.map(status => (
                              <option key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <a
                            href={`/order-tracking/${order._id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded transition inline-block"
                            title="View Order"
                          >
                            <Eye size={18} />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
