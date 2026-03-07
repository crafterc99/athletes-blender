import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getOrderById } from '../../services/orders';
import { MENU } from '../../data/menu';
import usePageTitle from '../../hooks/usePageTitle';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Button from '../../components/ui/Button';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function OrderDetail() {
  const { orderId } = useParams();
  usePageTitle(`Order ${orderId}`);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getOrderById(orderId)
      .then(setOrder)
      .catch(() => navigate('/account/orders', { replace: true }))
      .finally(() => setLoading(false));
  }, [orderId, navigate]);

  if (loading) return <LoadingSpinner className="py-20" />;
  if (!order) return null;

  const getSorbetName = (id) =>
    MENU.sorbets.find((s) => s.id === id)?.name ?? 'None';

  return (
    <div>
      <button
        onClick={() => navigate('/account/orders')}
        className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-dark transition-colors mb-6 cursor-pointer"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Back to Orders
      </button>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-extrabold text-dark">{order.id}</h2>
            <p className="text-sm text-gray-400 mt-1">
              {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-extrabold tabular-nums">${order.total?.toFixed(2)}</p>
            <span className="inline-block mt-1 text-xs font-bold text-brand bg-brand-50 px-2.5 py-1 rounded-lg">
              {order.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4 border-y border-gray-100 mb-6 text-sm">
          <div>
            <span className="text-gray-400 font-medium">Box</span>
            <p className="font-bold text-dark">{order.boxSize?.label} ({order.boxSize?.count} smoothies)</p>
          </div>
          <div>
            <span className="text-gray-400 font-medium">Type</span>
            <p className="font-bold text-dark">{order.purchaseType === 'subscription' ? 'Subscription' : 'One-time'}</p>
          </div>
          {order.frequency && (
            <div>
              <span className="text-gray-400 font-medium">Frequency</span>
              <p className="font-bold text-dark capitalize">{order.frequency}</p>
            </div>
          )}
        </div>

        <h3 className="font-extrabold text-dark mb-4">Recipes</h3>
        <div className="space-y-4">
          {order.recipes?.map((recipe, i) => (
            <div key={i} className="p-4 rounded-xl bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-dark">{recipe.name || `Recipe ${i + 1}`}</h4>
                <span className="text-sm font-bold bg-white px-2.5 py-1 rounded-lg text-dark">
                  x{recipe.quantity}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
                <div>
                  <span className="font-bold text-gray-400 uppercase tracking-wider">Bases</span>
                  <p className="text-gray-600 mt-0.5">{recipe.bases?.join(', ') || 'None'}</p>
                </div>
                <div>
                  <span className="font-bold text-gray-400 uppercase tracking-wider">Add-ins</span>
                  <p className="text-gray-600 mt-0.5">{recipe.addIns?.join(', ') || 'None'}</p>
                </div>
                <div>
                  <span className="font-bold text-gray-400 uppercase tracking-wider">Sorbet</span>
                  <p className="text-gray-600 mt-0.5">{recipe.sorbet ? getSorbetName(recipe.sorbet) : 'None'}</p>
                </div>
                <div>
                  <span className="font-bold text-gray-400 uppercase tracking-wider">Supplements</span>
                  <p className="text-gray-600 mt-0.5">{recipe.supplements?.join(', ') || 'None'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <Link to="/build">
            <Button variant="primary">Reorder This Box</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
