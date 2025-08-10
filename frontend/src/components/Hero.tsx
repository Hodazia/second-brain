
import { Brain, ArrowRight} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-orange-50">
      
      <div className="absolute inset-0 overflow-hidden">
        
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 
        w-96 h-96 bg-gradient-to-br from-orange-400/30 to-orange-600/20 rounded-full blur-3xl"></div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-orange-50/50"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Logo and title */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full blur-xl opacity-75 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-full">
                  <Brain className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
            
            {/* Headline */}
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-gray-900"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Your Digital Mind,
              <br />
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Organized.
              </span>
            </motion.h1>

            {/* Sub-headlines with underline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-8"
            >
              <p className="text-xl md:text-2xl font-semibold italic text-gray-700 mb-2">
                Just Two Clicks Away
              </p>
              <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
            </motion.div>

            {/* Description */}
            <motion.p 
              className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Create, organize, and access all your important links, documents, and ideas in one clean space. 
              Expand and define your knowledge with a digital brain that truly understands your unique workflow.
            </motion.p>
          </motion.div>

          {/* Main CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mb-16"
          >
            <button 
              className="bg-orange-500 hover:bg-orange-600 text-white 
              px-12 py-6 text-xl font-semibold rounded-lg shadow-lg 
              hover:shadow-orange-500/25 
              transition-all duration-300 transform hover:scale-105"
              onClick={() => navigate('/signup')}
            >
              Start Building Your CardVault <span>
              <ArrowRight className="mx-auto w-6 h-6" />
              </span>
              
            </button>
          </motion.div>

          {/* Visual Element - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Sample cards */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">YT</span>
                    </div>
                    <span className="font-medium text-sm text-gray-700">YouTube Video</span>
                  </div>
                  <p className="text-xs text-gray-600">How to build a second brain...</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">N</span>
                    </div>
                    <span className="font-medium text-sm text-gray-700">Notion Page</span>
                  </div>
                  <p className="text-xs text-gray-600">Project planning notes...</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">D</span>
                    </div>
                    <span className="font-medium text-sm text-gray-700">Document</span>
                  </div>
                  <p className="text-xs text-gray-600">Research findings...</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </motion.div>
    </section>
  );
};
