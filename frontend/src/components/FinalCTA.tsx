import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Users, Star } from "lucide-react";

export const FinalCTA = () => {
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
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-400/10 to-orange-600/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-400/10 to-orange-600/10 rounded-full blur-3xl"></div>
          </div>

          {/* Main content */}
          <div className="relative z-10 bg-white border border-gray-200 rounded-3xl p-12 shadow-lg">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ready to Build Your{" "}
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Digital Second Brain?
              </span>
            </motion.h2>

            <motion.p 
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Join thousands of users who are organizing their digital lives, one card at a time.
            </motion.p>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-8 text-gray-500"
            >
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium">10,000+ active users</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium">4.8/5 rating</span>
              </div>
            </motion.div>

            {/* Final CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <button 
               
                className="bg-orange-500 hover:bg-orange-600 text-white 
                px-12 py-6 text-xl font-semibold rounded-lg shadow-lg 
                hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105"
                onClick={() => navigate('/signup')}
              >
                Get Started Now - It's Free
                <ArrowRight className="mx-auto w-6 h-6" />
              </button>
            </motion.div>

            {/* Additional info */}
            <motion.p 
              className="text-sm text-gray-500 mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              viewport={{ once: true }}
            >
              No credit card required • Free forever • Setup in 2 minutes
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 