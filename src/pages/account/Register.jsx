import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import Button from '../../components/ui/Button';
import usePageTitle from '../../hooks/usePageTitle';

export default function Register() {
  usePageTitle('Create Account');
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
  const [touched, setTouched] = useState({});
  const { register, loading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    clearError();
  };

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = 'First name is required';
    if (!form.lastName.trim()) errs.lastName = 'Last name is required';
    if (!form.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    return errs;
  };

  const errs = validate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ firstName: true, lastName: true, email: true, password: true, confirmPassword: true });
    if (Object.keys(errs).length > 0) return;
    try {
      await register(form);
      navigate('/account', { replace: true });
    } catch {
      // error set in store
    }
  };

  const fields = [
    { name: 'firstName', label: 'First Name', type: 'text', placeholder: 'John', half: true },
    { name: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Doe', half: true },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Min. 6 characters' },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Re-enter password' },
  ];

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
          <h1 className="text-2xl font-extrabold text-dark tracking-tight">Create your account</h1>
          <p className="text-sm text-gray-500 mt-1">Start building your perfect smoothie box</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-600 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {fields.filter((f) => f.half).map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-bold text-dark mb-1.5">{field.label}</label>
                  <input
                    type={field.type}
                    value={form[field.name]}
                    onChange={(e) => update(field.name, e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, [field.name]: true }))}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors"
                  />
                  {touched[field.name] && errs[field.name] && (
                    <p className="text-xs text-red-500 mt-1 font-medium">{errs[field.name]}</p>
                  )}
                </div>
              ))}
            </div>

            {fields.filter((f) => !f.half).map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-bold text-dark mb-1.5">{field.label}</label>
                <input
                  type={field.type}
                  value={form[field.name]}
                  onChange={(e) => update(field.name, e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, [field.name]: true }))}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors"
                />
                {touched[field.name] && errs[field.name] && (
                  <p className="text-xs text-red-500 mt-1 font-medium">{errs[field.name]}</p>
                )}
              </div>
            ))}

            <Button variant="primary" className="w-full" size="lg" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/account/login" className="font-bold text-brand hover:text-brand-dark transition-colors">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
