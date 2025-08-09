import { motion } from "framer-motion";
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";

export const VideoShowcase = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Headline */}
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-8 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            See How It Works in{" "}
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              60 Seconds
            </span>
          </motion.h2>

          {/* Video Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative mb-12"
          >
            <div className="relative bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
              {/* Placeholder for Loom video - replace with actual embed */}
              <div className="aspect-video bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Play className="w-10 h-10 text-white ml-1" />
                  </div>
                  <p className="text-gray-700 text-lg font-medium">
                    Product Demo Video
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Replace with your Loom embed
                  </p>
                </div>
              </div>
              
              {/* Video controls overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
                >
                  <Play className="w-8 h-8 text-white ml-1" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Secondary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <button 
              className="bg-orange-500 hover:bg-orange-600 text-white 
              px-8 py-4 text-lg font-semibold rounded-lg shadow-lg 
              hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105"
              onClick={() => navigate('/signup')}
            >
              Try secondBrain for Free
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}; 