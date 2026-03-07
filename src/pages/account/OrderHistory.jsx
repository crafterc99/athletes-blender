import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { getOrdersByUser } from '../../services/orders';
import usePageTitle from '../../hooks/usePageTitle';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

const STATUS_COLORS = {
  confirmed: 'bg-brand-50 text-brand',
  processing: 'bg-blue-50 text-blue-600',
  shipped: 'bg-purple-50 text-purple-600',
  delivered: 'bg-gray-100 text-gray-600',
};

export default function OrderHistory() {
  usePageTitle('Order History');
  const user = useAuthStore((s) => s.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getOrdersByUser(user.id).then((o) => {
      setOrders(o);
      setLoading(false);
    });
  }, [user]);

  if (loading) return <LoadingSpinner className="py-20" />;

  return (
    <div>
      <h2 className="text-xl font-extrabold text-dark mb-6">Order History</h2>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
          <ShoppingBagIcon className="w-12 h-12 text-gray-200 mx-auto mb-4" />
          <h3 className="font-bold text-dark mb-2">No orders yet</h3>
          <p className="text-sm text-gray-400 mb-6">Build your first smoothie box to get started!</p>
          <Link
            to="/build"
            className="inline-block bg-brand text-white text-sm font-bold px-6 py-3 rounded-xl hover:bg-brand-dark transition-colors"
          >
            Build Your Box
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <Link
              key={order.id}
              to={`/account/orders/${order.id}`}
              className="block bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-gray-200 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-bold text-dark">{order.id}</p>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-500'}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    {' '}&middot;{' '}
                    {order.boxSize?.label} Box &middot; {order.recipes?.length} recipe{order.recipes?.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg tabular-nums">${order.total?.toFixed(2)}</p>
                  <p className="text-[11px] text-gray-400 font-medium">
                    {order.purchaseType === 'subscription' ? 'Subscription' : 'One-time'}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
