import { Trash2, ExternalLink } from "lucide-react";
import { useCallback, useEffect } from "react";
import type { ReactNode } from "react";

interface CardProps {
  id: string;
  title: string;
  Src: string 
  type: string;
  content?: string;
  Date: string;
  tags?: string[];
  icon?: ReactNode;
  del: (id: string) => void ;
  shared?: boolean;
}

const Card = ({ Src,type,title,tags,Date,content,icon,id,del,shared }: CardProps) => {

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

    let videoId = "";
    if (url.includes("youtube.com/live/")) {
      videoId = url.split("/live/")[1].split("?")[0];
    } else if (url.includes("youtu.be")) {
      videoId = url.split("/")[3].split("?")[0];
    } else if (url.includes("youtube.com/watch")) {
      const urlParams = new URL(url).searchParams;
      videoId = urlParams.get("v") || "";
    } else if (url.includes("youtube.com/playlist")) {
      const urlParams = new URL(url).searchParams;
      videoId = urlParams.get("v") || "";
      if (!videoId) {
        const listId = urlParams.get("list");
        if (listId) {
          videoId = listId.split(",")[0];
        }
      }
    }

    if (videoId) {
      return `https://www.youtube.com/embed/$${videoId}`;
    }

    return "";
  };

  const embedUrl = convertToEmbedUrl(Src);

  return (
    // Changed card background, added shadow and dark text
    <div className="flex flex-col justify-between bg-white text-gray-800 max-w-80 max-h-[56vh] md:mx-2 my-5 rounded-xl shadow-lg overflow-hidden px-4">
      <div>
        <div className="flex justify-between h-10 mb-2 items-center">
          <div className="flex items-center gap-2">
            <span className="text-xl">{icon}</span>
            <span className="text-base font-bold">{type}</span>
          </div>
          <div className="text-xl flex gap-3">
            <ExternalLink
              onClick={() => openExternalLink(Src)}
              className="hover:text-orange-500 text-gray-500 cursor-pointer"
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
            data-theme="light" // Changed theme to light
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
      </div>

      <div>
        <div className="text-sm w-full h-10 items-center flex gap-1 my-2">
          {tags && tags.map((tag,index)=><div key={index} className="bg-purple-300 text-purple-500 w-fit px-3 py-1 rounded-xl">#{tag}</div>)}
        </div>
        <div className="h-8 items-center my-1 text-sm text-gray-500">Added on {Date}</div>
      </div>
    </div>
  );
};

export default Card;