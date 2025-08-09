const NotFound404 = () => {
  return (
    // Changed to light background and a clean card style
    <div className="flex items-center justify-center min-h-screen 
    bg-gradient-to-b from-white to-orange-50">
      <div className="text-center p-6 bg-white shadow-lg rounded-lg outline outline-1 outline-gray-200">
        <h1 className="text-2xl font-semibold text-red-500">404 - Page Not Found</h1>
        <p className="mt-4 text-gray-700">
          Sorry, the page you are looking for does not exist. It might have been removed or you may have entered the URL incorrectly.
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="mt-6 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};
export default NotFound404;