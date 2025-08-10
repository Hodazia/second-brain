import React from 'react';
import Preview from "../assets/Dashboardprevi.png"

export const DashboardPrev = ()  => {

    return  (

    // The main container uses flexbox to center its content both horizontally and vertically.
    // It takes up the full width and has a minimum height to ensure it's always centered on the screen.
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 text-center">
      
      {/* The main content container with a max-width for better readability on large screens */}
      <div className="max-w-4xl mx-auto">

        {/* Title for the dashboard */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome to Your Card Vault
        </h1>

        {/* Explanatory text, styled to look like a friendly SaaS product message */}
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          This is where you'll find all the information you've saved.
          Start by adding your first piece of content to build your knowledge base.
        </p>

        {/* Placeholder image. Replace the 'src' attribute with the URL of your dashboard photo.
          The classes 'w-full max-w-lg h-auto' ensure the image is responsive
          and doesn't exceed its container's width.
        */}
        <img
          src={Preview}
          alt="Dashboard illustration"
          className="w-[90%] md:w-[80%] lg:w-[100%] h-auto rounded-lg shadow-md mx-auto"
        />

        {/* Optional: Add a call-to-action button or link */}
        <button className="mt-8 px-6 py-3 bg-orange-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-orange-700 transition duration-300">
          Add Your First Content
        </button>
        
      </div>
    </div>
  );
}