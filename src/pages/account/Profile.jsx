import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import Button from '../../components/ui/Button';
import { useToast } from '../../store/toastStore';
import usePageTitle from '../../hooks/usePageTitle';

export default function Profile() {
  usePageTitle('Profile');
  const { user, updateProfile, changePassword, loading } = useAuthStore();
  const toast = useToast();

  const [name, setName] = useState({ firstName: user?.firstName || '', lastName: user?.lastName || '' });
  const [pw, setPw] = useState({ current: '', newPw: '', confirm: '' });
  const [pwErrors, setPwErrors] = useState({});

  const handleNameSave = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(name);
      toast.success('Profile updated!');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!pw.current) errs.current = 'Required';
    if (!pw.newPw) errs.newPw = 'Required';
    else if (pw.newPw.length < 6) errs.newPw = 'Min 6 characters';
    if (pw.newPw !== pw.confirm) errs.confirm = 'Passwords do not match';
    setPwErrors(errs);
    if (Object.keys(errs).length > 0) return;

    try {
      await changePassword(pw.current, pw.newPw);
      toast.success('Password changed!');
      setPw({ current: '', newPw: '', confirm: '' });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Info */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-extrabold text-dark mb-4">Profile</h2>
        <form onSubmit={handleNameSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-dark mb-1.5">First Name</label>
              <input
                type="text"
                value={name.firstName}
                onChange={(e) => setName((n) => ({ ...n, firstName: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-dark mb-1.5">Last Name</label>
              <input
                type="text"
                value={name.lastName}
                onChange={(e) => setName((n) => ({ ...n, lastName: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-dark mb-1.5">Email</label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-gray-50 text-gray-400"
            />
          </div>
          <Button variant="primary" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-extrabold text-dark mb-4">Change Password</h2>
        <form onSubmit={handlePasswordSave} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-dark mb-1.5">Current Password</label>
            <input
              type="password"
              value={pw.current}
              onChange={(e) => setPw((p) => ({ ...p, current: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors"
            />
            {pwErrors.current && <p className="text-xs text-red-500 mt-1 font-medium">{pwErrors.current}</p>}
          </div>
          <div>
            <label className="block text-sm font-bold text-dark mb-1.5">New Password</label>
            <input
              type="password"
              value={pw.newPw}
              onChange={(e) => setPw((p) => ({ ...p, newPw: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors"
            />
            {pwErrors.newPw && <p className="text-xs text-red-500 mt-1 font-medium">{pwErrors.newPw}</p>}
          </div>
          <div>
            <label className="block text-sm font-bold text-dark mb-1.5">Confirm New Password</label>
            <input
              type="password"
              value={pw.confirm}
              onChange={(e) => setPw((p) => ({ ...p, confirm: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors"
            />
            {pwErrors.confirm && <p className="text-xs text-red-500 mt-1 font-medium">{pwErrors.confirm}</p>}
          </div>
          <Button variant="outline" disabled={loading}>
            {loading ? 'Updating...' : 'Update Password'}
          </Button>
        </form>
      </div>
    </div>
  );
}
