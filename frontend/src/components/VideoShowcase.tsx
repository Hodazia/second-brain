import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";


interface VideoProp {
  Src:string
}

export const VideoShowcase = ({
  Src
}:VideoProp) => {
  const navigate = useNavigate();


  const convertToEmbedUrl = (url: string | undefined) => {
    if (!url) return "";
    
    let videoId = ""
    // This regular expression is a much more robust way to extract the video ID
    // It works for standard watch?v=, youtu.be, and embed URLs
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e|embed)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/;
    const match = url.match(regex);
    
    if (match && match[1]) {
      videoId = match[1];
    } else {
      // Fallback for custom or non-standard URLs like the ones you provided
      const customMatch = url.match(/\/([^\/]+)$/);
      if (customMatch && customMatch[1]) {
        videoId = customMatch[1].split('?')[0];
      }
    }

    if (videoId) {
      // Use the standard and correct YouTube embed format
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return "";
  };

  const embedUrl = convertToEmbedUrl(Src);
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
              6 Minutes
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
            <div className="relative bg-white border border-gray-200 
            rounded-2xl  shadow-lg">
              {/* Placeholder for Loom video - replace with actual embed */}
              <div className="aspect-video bg-gradient-to-br
               from-orange-50 to-orange-100 rounded-xl border
                border-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm text-gray-500 ">
                    <iframe src=
                    {embedUrl}
                    className="w-full h-[400px]"
                    style={{ aspectRatio: "16/9" }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    >
                    </iframe>
                  </p>
                </div>
              </div>
              
              {/* Video controls overlay */}
              {/* <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
                >
                  <Play className="w-8 h-8 text-white ml-1" />
                </motion.button>
              </div> */}
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
              Try CardVault for Free
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}; 