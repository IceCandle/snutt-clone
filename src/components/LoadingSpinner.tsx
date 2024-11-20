const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-900">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent dark:border-orange-400 dark:border-t-transparent" />
    </div>
  );
};
export default LoadingSpinner;
