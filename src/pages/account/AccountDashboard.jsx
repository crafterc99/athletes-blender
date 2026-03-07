import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { getSubscriptionByUser } from '../../services/subscriptions';
import { getOrdersByUser } from '../../services/orders';
import usePageTitle from '../../hooks/usePageTitle';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import {
  ArrowPathIcon,
  ShoppingBagIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';

export default function AccountDashboard() {
  usePageTitle('Dashboard');
  const user = useAuthStore((s) => s.user);
  const [sub, setSub] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      getSubscriptionByUser(user.id),
      getOrdersByUser(user.id),
    ]).then(([s, o]) => {
      setSub(s);
      setOrders(o);
      setLoading(false);
    });
  }, [user]);

  if (loading) return <LoadingSpinner className="py-20" />;

  const recentOrders = orders.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Subscription Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-extrabold text-dark">Subscription</h2>
          <Link to="/account/subscription" className="text-xs font-bold text-brand hover:text-brand-dark transition-colors">
            Manage
          </Link>
        </div>
        {sub ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${
                sub.status === 'active' ? 'bg-brand-50 text-brand' :
                sub.status === 'paused' ? 'bg-amber-50 text-amber-600' :
                'bg-gray-100 text-gray-500'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${
                  sub.status === 'active' ? 'bg-brand' :
                  sub.status === 'paused' ? 'bg-amber-500' :
                  'bg-gray-400'
                }`} />
                {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
              </span>
              <span className="text-sm text-gray-400">
                {sub.boxSize?.label} Box &middot; {sub.frequency}
              </span>
            </div>
            {sub.status === 'active' && sub.nextDelivery && (
              <p className="text-sm text-gray-500">
                Next delivery: <span className="font-bold text-dark">{new Date(sub.nextDelivery).toLocaleDateString()}</span>
              </p>
            )}
          </div>
        ) : (
          <div className="text-center py-6">
            <ArrowPathIcon className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-sm text-gray-400 mb-4">No active subscription</p>
            <Link
              to="/build"
              className="inline-flex items-center gap-2 bg-brand text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-brand-dark transition-colors"
            >
              <PlusCircleIcon className="w-4 h-4" />
              Build Your Box
            </Link>
          </div>
        )}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-extrabold text-dark">Recent Orders</h2>
          {orders.length > 0 && (
            <Link to="/account/orders" className="text-xs font-bold text-brand hover:text-brand-dark transition-colors">
              View All
            </Link>
          )}
        </div>
        {recentOrders.length === 0 ? (
          <div className="text-center py-6">
            <ShoppingBagIcon className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-sm text-gray-400">No orders yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <Link
                key={order.id}
                to={`/account/orders/${order.id}`}
                className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div>
                  <p className="text-sm font-bold text-dark">{order.id}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold tabular-nums">${order.total?.toFixed(2)}</p>
                  <span className="inline-block mt-0.5 text-[11px] font-bold text-brand bg-brand-50 px-2 py-0.5 rounded-md">
                    {order.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Link
          to="/build"
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-brand/30 hover:shadow-md transition-all text-center"
        >
          <PlusCircleIcon className="w-8 h-8 text-brand mx-auto mb-2" />
          <p className="text-sm font-bold text-dark">Build a Box</p>
        </Link>
        <Link
          to="/account/profile"
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-brand/30 hover:shadow-md transition-all text-center"
        >
          <svg className="w-8 h-8 text-brand mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          <p className="text-sm font-bold text-dark">Settings</p>
        </Link>
      </div>
    </div>
  );
}
