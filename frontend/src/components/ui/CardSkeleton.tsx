export const CardSkeleton = () => {
    return (
      <div className="p-4 rounded-xl border border-gray-200 shadow-sm bg-white w-80">
        {/* Top bar with icon and actions */}
        <div className="flex justify-between items-start mb-3">
          <div className="h-5 w-5 bg-gray-200 rounded"></div>
          <div className="flex space-x-2">
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
          </div>
        </div>
  
        {/* Title */}
        <div className="h-5 bg-gray-200 rounded mb-2 w-3/4"></div>
  
        {/* Description */}
        <div className="h-4 bg-gray-200 rounded mb-4 w-full"></div>
        <div className="h-4 bg-gray-200 rounded mb-6 w-5/6"></div>
  
        {/* Button placeholder */}
        <div className="h-6 w-28 bg-gray-200 rounded mb-6"></div>
  
        {/* Tags */}
        <div className="flex space-x-2 mb-4">
          <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
          <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
        </div>
  
        {/* Date */}
        <div className="h-3 w-24 bg-gray-200 rounded"></div>
      </div>
    );
  };
  