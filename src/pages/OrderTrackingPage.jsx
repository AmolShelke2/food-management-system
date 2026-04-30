import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { orderAPI } from '../api';
import { Loader, CheckCircle, Truck, Clock } from 'lucide-react';

const statusSteps = [
  { key: 'pending', label: 'Order Placed', icon: Clock },
  { key: 'confirmed', label: 'Confirmed', icon: CheckCircle },
  { key: 'preparing', label: 'Preparing', icon: Loader },
  { key: 'out_for_delivery', label: 'On the way', icon: Truck },
  { key: 'delivered', label: 'Delivered', icon: CheckCircle },
];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  preparing: 'bg-orange-100 text-orange-700',
  out_for_delivery: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

export const OrderTrackingPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await orderAPI.getById(orderId);
        setOrder(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load order');
      } finally {
        setLoading(false);
      }
    };

    // Fetch initially and then every 5 seconds for real-time updates
    fetchOrder();
    const interval = setInterval(fetchOrder, 5000);

    return () => clearInterval(interval);
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader className="animate-spin text-primary" size={40} />
          <p className="text-gray-600">Loading order...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error || 'Order not found'}</p>
          <a href="/" className="btn btn-primary">Go to Home</a>
        </div>
      </div>
    );
  }

  const currentStatusIndex = statusSteps.findIndex(s => s.key === order.status);

  return (
    <div className="min-h-screen bg-light py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Track Your Order</h1>
          <p className="text-gray-600">Order #{order.orderNumber}</p>
        </div>

        <div className="card p-8 mb-8">
          {/* Status Timeline */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {statusSteps.map((step, index) => {
                const IconComponent = step.icon;
                const isCompleted = index <= currentStatusIndex;
                const isCurrent = index === currentStatusIndex;

                return (
                  <div key={step.key} className="flex flex-col items-center flex-1">
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition ${
                        isCompleted
                          ? 'bg-primary text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      <IconComponent size={24} />
                    </div>

                    {/* Label */}
                    <p
                      className={`text-sm font-medium text-center mb-4 ${
                        isCurrent ? 'text-primary font-bold' : isCompleted ? 'text-gray-700' : 'text-gray-500'
                      }`}
                    >
                      {step.label}
                    </p>

                    {/* Connector */}
                    {index < statusSteps.length - 1 && (
                      <div
                        className={`h-1 flex-1 ${isCompleted ? 'bg-primary' : 'bg-gray-200'}`}
                        style={{ minWidth: '20px' }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Current Status */}
          <div className="mb-8 p-4 bg-blue-50 rounded-lg border-l-4 border-primary">
            <p className="text-sm text-gray-600 mb-1">Current Status</p>
            <p className={`text-lg font-bold ${statusColors[order.status]}`}>
              {statusSteps.find(s => s.key === order.status)?.label}
            </p>
          </div>

          {/* Order Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Items */}
            <div>
              <h3 className="font-bold text-lg mb-4">Order Items</h3>
              <div className="space-y-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between pb-2 border-b">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold">₹{item.subtotal.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Details */}
            <div>
              <h3 className="font-bold text-lg mb-4">Delivery Details</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-600">Name</p>
                  <p className="font-medium">{order.customer.name}</p>
                </div>
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="font-medium">{order.customer.email}</p>
                </div>
                <div>
                  <p className="text-gray-600">Phone</p>
                  <p className="font-medium">{order.customer.phone}</p>
                </div>
                <div>
                  <p className="text-gray-600">Address</p>
                  <p className="font-medium">{order.customer.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{order.totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (5%)</span>
                <span>₹{(order.totalPrice * 0.05).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Total</span>
                <span className="text-primary">₹{(order.totalPrice * 1.05).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Estimated Delivery */}
          {order.estimatedDeliveryTime && (
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <p className="text-sm text-gray-600 mb-1">Estimated Delivery</p>
              <p className="font-bold">
                {new Date(order.estimatedDeliveryTime).toLocaleString()}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <a href="/" className="btn btn-secondary">
            Back to Home
          </a>
          <a href="/menu" className="btn btn-primary">
            Order More
          </a>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;
