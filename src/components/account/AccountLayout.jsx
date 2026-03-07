import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import clsx from 'clsx';
import {
  HomeIcon,
  ShoppingBagIcon,
  ArrowPathIcon,
  UserIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/24/outline';

const NAV_ITEMS = [
  { to: '/account', icon: HomeIcon, label: 'Dashboard', end: true },
  { to: '/account/orders', icon: ShoppingBagIcon, label: 'Orders' },
  { to: '/account/subscription', icon: ArrowPathIcon, label: 'Subscription' },
  { to: '/account/profile', icon: UserIcon, label: 'Profile' },
];

export default function AccountLayout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-dark py-10 sm:py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <span className="text-brand text-xs font-bold uppercase tracking-widest">
            My Account
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 tracking-tight">
            Welcome back, {user?.firstName || 'Athlete'}
          </h1>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar nav */}
          <nav className="lg:w-56 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-2 space-y-0.5">
                {NAV_ITEMS.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      clsx(
                        'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                        isActive
                          ? 'bg-brand-50 text-brand'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-dark'
                      )
                    }
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </NavLink>
                ))}
              </div>
              <div className="border-t border-gray-100 p-2">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 w-full cursor-pointer"
                >
                  <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
                  Log Out
                </button>
              </div>
            </div>
          </nav>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
}
