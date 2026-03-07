import clsx from 'clsx';

export default function LoadingSpinner({ size = 'md', className }) {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={clsx('flex items-center justify-center', className)}>
      <div
        className={clsx(
          'border-3 border-gray-200 border-t-brand rounded-full animate-spin',
          sizes[size]
        )}
      />
    </div>
  );
}
