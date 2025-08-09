import { Trash2, ExternalLink } from "lucide-react";
import { useCallback, useEffect } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface CardProps {
  id: string;
  title: string;
  Src: string;
  type: string;
  content?: string;
  Date: string;
  tags?: string[];
  icon?: ReactNode;
  del: (id: string) => void;
  shared?: boolean;
}

const Card = ({ Src, type, title, tags, Date, content, icon, id, del, shared }: CardProps) => {

  const useExternalLink = () => {
    const openExternalLinks = useCallback((...urls: string[]) => {
      urls.forEach(url => window.open(url, '_blank'));
    }, []);
  
    return openExternalLinks;
  };

  const openExternalLink = useExternalLink();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const getTwitterUrl = (url: string | undefined) => {
    if (!url) return "";
    return url.replace(/^https:\/\/x\.com/, "https://twitter.com");
  };

  const transformedUrl = getTwitterUrl(Src);

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
  // add a embedded form for Notion Doc too, which is shared publicly,


  return (
    // Replaced `div` with `motion.div` and added animation props
    <motion.div
      className="flex flex-col justify-between bg-white
      text-gray-800 max-w-80 max-h-[56vh] md:mx-2 my-5
      rounded-xl shadow-lg overflow-hidden px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
    >
      <div>
        <div className="flex justify-between h-10 mb-2 items-center">
          <div className="flex items-center gap-2">
            <span className="text-xl text-orange-600">{icon}</span>
            <span className="text-base font-bold text-orange-600">{type}</span>
          </div>
          <div className="text-xl flex gap-3">
            <ExternalLink
              onClick={() => openExternalLink(Src)}
              className="hover:text-orange-500 
              text-gray-500 cursor-pointer"
            />
           {!shared && <Trash2 onClick={()=>del(id)} className="hover:text-orange-500 text-gray-500 cursor-pointer" />}
          </div>
        </div>
        <div className="h-12 font-bold text-2xl">{title}</div>
      </div>

      <div className="object-cover overflow-hidden flex flex-col gap-2">
        <span>{content}</span>
        {(type === "Website" || type === "Links" || type === "Document" || type === "Others") && <span>{Src}</span>}

        {/* Twitter Embed */}
        {type == "Twitter" && (
          <blockquote
            className="twitter-tweet"
            data-theme="light"
            style={{ width: "100%", maxWidth: "500px" }}
          >
            <a href={transformedUrl}></a>
          </blockquote>
        )}

        {/* YouTube Embed */}
        {type=="Youtube" && (
          <iframe
            src={embedUrl}
            className="w-full h-[100%]"
            style={{ maxWidth: "500px", aspectRatio: "16/9" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        )}

        {/* Notion Embed */}
        {type=="Notion" && (
          <iframe
            src={Src}
            className="w-full"
            style={{ maxWidth: "500px", height:"300px", border: '1px solid #ddd', aspectRatio: "16/9" }}
            allowFullScreen
            frameBorder="0"
          ></iframe>
        )}
        {/* <iframe src="https://hospitable-page-c67.notion.site/ebd/24962da32a8d80768465fb06c59fc74c" width="100%"
         height="600" frameborder="0" allowfullscreen /> */}
         {/*
         <iframe src="https://hospitable-page-c67.notion.site/ebd/24962da32a8d80768465fb06c59fc74c" 
         width="100%" height="600" frameborder="0" allowfullscreen />
         */}
      </div>

      <div>
        <div className="text-sm w-full h-10 items-center flex gap-1 my-2">
          {tags && tags.map((tag,index)=><div key={index} 
          className="bg-orange-600 text-white w-fit px-3 py-1 
          rounded-xl">#{tag}</div>)}
        </div>
        <div className="h-8 items-center my-1 text-sm text-gray-500">Added on {Date}</div>
      </div>
    </motion.div>
  );
};

export default Card;