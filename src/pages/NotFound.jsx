import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import usePageTitle from '../hooks/usePageTitle';

export default function NotFound() {
  usePageTitle('Page Not Found');

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-black text-gray-100 mb-4">404</div>
        <h1 className="text-2xl font-extrabold text-dark mb-3 tracking-tight">
          Page not found
        </h1>
        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button variant="primary">Go Home</Button>
          </Link>
          <Link to="/build">
            <Button variant="outline">Build Your Box</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
