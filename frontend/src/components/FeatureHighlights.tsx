import { motion } from "framer-motion";
import { 
  Zap, 
  Layout, 
  Search, 
  Palette,
  Link,
  Clock,
  Tag,
  Sparkles
} from "lucide-react";

const features = [
  {
    icon: Link,
    title: "Seamless Integration",
    description: "Works with YouTube, X, Notion, and all your favorite platforms. Save anything with one click.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Zap,
    title: "Instant Capture",
    description: "Save links, videos, and documents instantly. No more losing important information.",
    color: "from-orange-500 to-orange-600"
  },
  {
    icon: Search,
    title: "Powerful Organization",
    description: "Tag, categorize, and search through your entire knowledge base with lightning speed.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Palette,
    title: "Clean & Minimalist",
    description: "Beautiful, clutter-free interface that focuses on what matters - your content.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Layout,
    title: "All-in-One Dashboard",
    description: "Consolidate every link, video, and doc into a single, searchable source of truth.",
    color: "from-indigo-500 to-purple-500"
  },
  {
    icon: Sparkles,
    title: "Smart Organization",
    description: "AI-powered suggestions help you organize and discover connections in your knowledge.",
    color: "from-pink-500 to-rose-500"
  }
];

export const FeatureHighlights = () => {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Organize Your Mind
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Powerful features designed to make knowledge management effortless and enjoyable.
          </motion.p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <div className="bg-white border border-gray-200 rounded-2xl p-8 h-full shadow-lg hover:shadow-xl transition-all duration-300">
                {/* Icon */}
                <div className="mb-6">
                  <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Features Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-lg font-semibold mb-2 text-gray-900">Lightning Fast</h4>
            <p className="text-gray-600 text-sm">Save and organize content in seconds</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Tag className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-lg font-semibold mb-2 text-gray-900">Smart Tags</h4>
            <p className="text-gray-600 text-sm">Automatically categorize your content</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-lg font-semibold mb-2 text-gray-900">AI Powered</h4>
            <p className="text-gray-600 text-sm">Discover connections in your knowledge</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 