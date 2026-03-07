import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import Button from '../../components/ui/Button';
import usePageTitle from '../../hooks/usePageTitle';

export default function Login() {
  usePageTitle('Log In');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({});
  const { login, loading, error, clearError } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/account';

  const validate = () => {
    const errs = {};
    if (!email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Invalid email';
    if (!password) errs.password = 'Password is required';
    return errs;
  };

  const errs = validate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (Object.keys(errs).length > 0) return;
    clearError();
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch {
      // error is set in store
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">AB</span>
            </div>
            <span className="text-lg font-extrabold tracking-tight text-dark">
              The Athlete&apos;s Blender
            </span>
          </Link>
          <h1 className="text-2xl font-extrabold text-dark tracking-tight">Welcome back</h1>
          <p className="text-sm text-gray-500 mt-1">Log in to manage your subscription</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-600 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-dark mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); clearError(); }}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors"
                placeholder="you@example.com"
              />
              {touched.email && errs.email && (
                <p className="text-xs text-red-500 mt-1 font-medium">{errs.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-dark mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); clearError(); }}
                onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors"
                placeholder="Enter your password"
              />
              {touched.password && errs.password && (
                <p className="text-xs text-red-500 mt-1 font-medium">{errs.password}</p>
              )}
            </div>

            <Button variant="primary" className="w-full" size="lg" disabled={loading}>
              {loading ? 'Logging in...' : 'Log In'}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don&apos;t have an account?{' '}
            <Link to="/account/register" className="font-bold text-brand hover:text-brand-dark transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
