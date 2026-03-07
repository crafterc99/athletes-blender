import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import * as subService from '../../services/subscriptions';
import { PRICING } from '../../data/pricing';
import usePageTitle from '../../hooks/usePageTitle';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ConfirmModal from '../../components/ui/ConfirmModal';
import Button from '../../components/ui/Button';
import { useToast } from '../../store/toastStore';
import {
  ArrowPathIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  XCircleIcon,
  ForwardIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';

export default function SubscriptionManagement() {
  usePageTitle('Subscription');
  const user = useAuthStore((s) => s.user);
  const toast = useToast();
  const [sub, setSub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [modal, setModal] = useState({ open: false, action: null });

  useEffect(() => {
    if (!user) return;
    subService.getSubscriptionByUser(user.id).then((s) => {
      setSub(s);
      setLoading(false);
    });
  }, [user]);

  const doAction = async (action, successMsg) => {
    setActionLoading(true);
    try {
      const updated = await action();
      setSub(updated);
      toast.success(successMsg);
    } catch (err) {
      toast.error(err.message);
    }
    setActionLoading(false);
    setModal({ open: false, action: null });
  };

  const actions = {
    skip: () => doAction(() => subService.skipDelivery(sub.id), 'Delivery skipped!'),
    pause: () => doAction(() => subService.pauseSubscription(sub.id), 'Subscription paused'),
    resume: () => doAction(() => subService.resumeSubscription(sub.id), 'Subscription resumed!'),
    cancel: () => doAction(() => subService.cancelSubscription(sub.id), 'Subscription cancelled'),
    updateFrequency: (freq) => doAction(
      () => subService.updateSubscription(sub.id, { frequency: freq }),
      `Frequency updated to ${freq}`
    ),
  };

  if (loading) return <LoadingSpinner className="py-20" />;

  if (!sub) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
        <ArrowPathIcon className="w-12 h-12 text-gray-200 mx-auto mb-4" />
        <h2 className="text-lg font-extrabold text-dark mb-2">No Active Subscription</h2>
        <p className="text-sm text-gray-400 mb-6">Subscribe to get fresh smoothie packs delivered regularly.</p>
        <Link
          to="/build"
          className="inline-flex items-center gap-2 bg-brand text-white text-sm font-bold px-6 py-3 rounded-xl hover:bg-brand-dark transition-colors"
        >
          <PlusCircleIcon className="w-4 h-4" />
          Build Your Box
        </Link>
      </div>
    );
  }

  const statusColor = sub.status === 'active' ? 'brand' : sub.status === 'paused' ? 'amber' : 'gray';

  return (
    <div className="space-y-6">
      {/* Status Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-extrabold text-dark">Subscription</h2>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-${statusColor}-50 text-${statusColor === 'brand' ? 'brand' : statusColor + '-600'}`}>
            <span className={`w-1.5 h-1.5 rounded-full bg-${statusColor === 'brand' ? 'brand' : statusColor + '-500'}`} />
            {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400 font-medium">Box</span>
            <p className="font-bold text-dark">{sub.boxSize?.label} ({sub.boxSize?.count} smoothies)</p>
          </div>
          <div>
            <span className="text-gray-400 font-medium">Frequency</span>
            <p className="font-bold text-dark capitalize">{sub.frequency}</p>
          </div>
          {sub.status === 'active' && sub.nextDelivery && (
            <div className="col-span-2">
              <span className="text-gray-400 font-medium">Next Delivery</span>
              <p className="font-bold text-dark">{new Date(sub.nextDelivery).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      {sub.status !== 'cancelled' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-dark mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {sub.status === 'active' && (
              <>
                <button
                  onClick={() => setModal({ open: true, action: 'skip', title: 'Skip Next Delivery', message: 'Your next delivery will be pushed forward by one cycle. You can always undo this later.', confirmLabel: 'Skip Delivery', onConfirm: actions.skip })}
                  className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-brand/30 hover:bg-brand-50/30 transition-all cursor-pointer"
                >
                  <ForwardIcon className="w-5 h-5 text-brand" />
                  <span className="text-sm font-bold text-dark">Skip Delivery</span>
                </button>
                <button
                  onClick={() => setModal({ open: true, action: 'pause', title: 'Pause Subscription', message: 'Your subscription will be paused. No deliveries will be sent until you resume.', confirmLabel: 'Pause', onConfirm: actions.pause })}
                  className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-amber-200 hover:bg-amber-50/50 transition-all cursor-pointer"
                >
                  <PauseCircleIcon className="w-5 h-5 text-amber-500" />
                  <span className="text-sm font-bold text-dark">Pause</span>
                </button>
              </>
            )}
            {sub.status === 'paused' && (
              <button
                onClick={() => setModal({ open: true, action: 'resume', title: 'Resume Subscription', message: 'Your subscription will be reactivated and deliveries will resume.', confirmLabel: 'Resume', onConfirm: actions.resume })}
                className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-brand/30 hover:bg-brand-50/30 transition-all cursor-pointer col-span-2"
              >
                <PlayCircleIcon className="w-5 h-5 text-brand" />
                <span className="text-sm font-bold text-dark">Resume Subscription</span>
              </button>
            )}
            <button
              onClick={() => setModal({ open: true, action: 'cancel', title: 'Cancel Subscription', message: 'Are you sure? You\'ll lose your subscription benefits including free shipping and your blender discount.', confirmLabel: 'Cancel Subscription', variant: 'outline', onConfirm: actions.cancel })}
              className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-red-200 hover:bg-red-50/50 transition-all cursor-pointer col-span-2"
            >
              <XCircleIcon className="w-5 h-5 text-red-400" />
              <span className="text-sm font-bold text-gray-400">Cancel Subscription</span>
            </button>
          </div>
        </div>
      )}

      {/* Change Frequency */}
      {sub.status === 'active' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-dark mb-4">Delivery Frequency</h3>
          <div className="flex gap-3">
            {PRICING.subscriptionFrequencies.map((f) => (
              <button
                key={f.id}
                onClick={() => f.id !== sub.frequency && actions.updateFrequency(f.id)}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  sub.frequency === f.id
                    ? 'bg-brand text-white shadow-[0_2px_8px_rgba(22,163,74,0.25)]'
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Edit Box Link */}
      {sub.status !== 'cancelled' && (
        <div className="text-center">
          <Link to="/build">
            <Button variant="outline">Edit My Box</Button>
          </Link>
        </div>
      )}

      <ConfirmModal
        open={modal.open}
        onClose={() => setModal({ open: false, action: null })}
        onConfirm={modal.onConfirm}
        title={modal.title}
        message={modal.message}
        confirmLabel={modal.confirmLabel}
        variant={modal.variant}
        loading={actionLoading}
      />
    </div>
  );
}
