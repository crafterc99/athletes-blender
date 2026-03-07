import { useLocation, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MENU } from '../data/menu';
import usePageTitle from '../hooks/usePageTitle';
import Button from '../components/ui/Button';

export default function OrderConfirmation() {
  usePageTitle('Order Confirmed');
  const location = useLocation();
  const order = location.state?.order;

  if (!order) return <Navigate to="/" replace />;

  const getSorbetName = (id) =>
    MENU.sorbets.find((s) => s.id === id)?.name ?? 'None';

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2, damping: 12 }}
            className="w-20 h-20 bg-brand rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_4px_16px_rgba(22,163,74,0.3)]"
          >
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-dark tracking-tight">
            Order Confirmed!
          </h1>
          <p className="text-gray-500 mt-2">
            Your order <span className="font-bold text-dark">{order.id}</span> has been placed.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8"
        >
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div>
              <p className="text-sm text-gray-400">Box</p>
              <p className="font-bold text-dark">{order.boxSize?.label} &middot; {order.boxSize?.count} smoothies</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Total</p>
              <p className="text-xl font-extrabold tabular-nums">${order.total?.toFixed(2)}</p>
            </div>
          </div>

          {order.recipes?.map((recipe, i) => (
            <div key={i} className="py-3 border-b border-gray-50 last:border-b-0">
              <div className="flex justify-between mb-2">
                <span className="font-bold text-sm text-dark">{recipe.name || `Recipe ${i + 1}`}</span>
                <span className="text-sm font-bold text-gray-400">x{recipe.quantity}</span>
              </div>
              <p className="text-xs text-gray-400">
                {recipe.bases?.join(', ')} &middot; {recipe.addIns?.join(', ')}
                {recipe.sorbet ? ` · ${getSorbetName(recipe.sorbet)}` : ''}
                {recipe.supplements?.length > 0 ? ` · ${recipe.supplements.join(', ')}` : ''}
              </p>
            </div>
          ))}

          {order.purchaseType === 'subscription' && (
            <div className="mt-6 p-4 rounded-xl bg-brand-50">
              <p className="text-sm font-bold text-brand">Subscription active</p>
              <p className="text-xs text-brand/70 mt-1">
                Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-center mt-8"
        >
          <Link to="/account/orders">
            <Button variant="outline">View Orders</Button>
          </Link>
          <Link to="/">
            <Button variant="primary">Back to Home</Button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
