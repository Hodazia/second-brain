const Wrongpage404 = () => {
  return (
    // Changed to light background and a clean card style
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6 bg-white shadow-lg rounded-lg outline outline-1 outline-gray-200">
        <h1 className="text-2xl font-semibold text-red-500">Access Denied</h1>
        <p className="mt-4 text-gray-700">
          You are not authorized to view this page. Please log in to continue.
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="mt-6 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default Wrongpage404;