import { Button } from "./Button"
import { Sidebar, Table2 } from "lucide-react"
import Logout from "./Logout"
import { useState } from "react"
import NotFound404 from "./NotFound"
import  SidebarControl from "./Sidebar"
import { ExternalLink,Trash2 } from "lucide-react"
import { useCallback } from "react"
import { RiNotionFill } from "react-icons/ri";
import { useEffect } from "react"

const succesClick = () => {
    console.log("Clicked successfully");
    isOpen = false;
}
const succesConfirm = () => {
    console.log("Confirmed successfully");
    isOpen = false;
}

let isOpen:boolean = true;
const type:string = "Gist"
export const Tutorials= () => {
    const [isOpen,setisOpen]= useState<boolean>(true);

    const useExternalLink = () => {
        const openExternalLinks = useCallback((...urls: string[]) => {
          urls.forEach(url => window.open(url, '_blank'));
        }, []);
      
        return openExternalLinks;
      };
    
      const openExternalLink = useExternalLink();

    // A state to track if the Gist script has been loaded
const [gistLoaded, setGistLoaded] = useState(false);

useEffect(() => {
  // Check if the type is "Gist" and the script hasn't been loaded yet
  if (type === "Gist" && !gistLoaded) {
    const script = document.createElement("script");
    script.src = "https://gist.github.com/Hodazia/c0a7c28ebffe7122f57dc2cba387e477.js";
    script.async = true;
    document.body.appendChild(script);

    // Set the state to true so the script doesn't get added again
    setGistLoaded(true); 
  }
}, [type, gistLoaded]);
     // New utility function to get Google Drive embed URL
  const getGoogleDriveEmbedUrl = (url: string) => {
    const regex = /drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      const fileId = match[1];
      return `youtube.com/watch?v=VIDEO_ID3/${fileId}?embedded=true`;
    }
    return url;
  };

    const toggleClick = () => {
        setisOpen(false)
    }

      // New utility function to get the Spotify embed URL
  const getSpotifyEmbedUrl = (url: string) => {
    try {
        const urlObj = new URL(url);
        const path = urlObj.pathname.split('/');
        const type = path[1];
        const id = path[2];
        return `youtube.com/watch?v=VIDEO_ID1/${type}/${id}?utm_source=generator`;
    } catch (e) {
        return "";
    }
  };
    return (
        <>


        <div className="card">
        <h2>Document Title</h2>
        <div className="pdf-viewer-container">
        <iframe
            src={"file:///Users/ziaul/Downloads/GFG_DL_RESOURCES.pdf"}
            className="w-full"
            style={{ height: '300px', maxWidth: '500px', border: '1px solid #ddd' }}
            frameBorder="0"
          ></iframe>
        </div>

        <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7341192548226387968" height="1454" width="504"
         frameBorder="0" 
         allowFullScreen title="Embedded post"
         ></iframe>
        <h2>Document Title VIA OBJECTS</h2>
        <div className="pdf-viewer-container ">
          <object
          type="application/pdf"
          width={100}
          height={100}
          data="/GFG_DL_RESOURCES.pdf"
          className=""
          >

          </object>
          </div>

          <div>Component way to do so</div>

          
        {/* <iframe
            src={getSpotifyEmbedUrl("https://open.spotify.com/embed/album/3GkXRRRkV3rfgwG1wJset9?utm_source=generator")}
            className="w-full"
            style={{ height: '80px' }}
            allow="encrypted-media"
            frameBorder="0"
            allowFullScreen
          ></iframe>
          <iframe data-testid="embed-iframe" 
           
          src="https://open.spotify.com/embed/album/3GkXRRRkV3rfgwG1wJset9?utm_source=generator" 
          width="100%" height="402" frameBorder="0" allowFullScreen 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy">
          </iframe> */}
        {/* for GoogleDrive 
        it is correct working fine , the below one
        */}
        {/* <iframe
            src="https://docs.google.com/document/d/1xwoWwsr9QY_TcJX7CeyQaJxAiC1G83TPlUCOWRqoM9s/edit?usp=sharing"
            className="w-full"
            style={{ height: '300px', maxWidth: '500px', border: '1px solid #ddd' }}
            allowFullScreen
            frameBorder="0"
          ></iframe> */}
            </div>
            <iframe
        src="https://www.figma.com/design/2KakkV26ODweuNfG6UtHOb/protoTUTORIAL?node-id=0-1&m=dev&t=0pVIvTPcYypIWHS7-1"
        width="100%"
        height={100}
        style={{ border: "none" }}
        allowFullScreen
      ></iframe>

<iframe 
style={{border: "1px solid rgba(0, 0, 0, 0.1);" }}
width="800"
 height="450" 
 src="https://embed.figma.com/design/2KakkV26ODweuNfG6UtHOb/protoTUTORIAL?node-id=0-1&embed-host=share" 
allowFullScreen>

</iframe>
            

<iframe 
style={{border: "1px solid rgba(0, 0, 0, 0.1);" }}
width="800"
 height="450" 
 src="https://www.canva.com/design/DAGufXdjuBA/iuAao8IGP3sNCL2PVzWQvw/view?embed" 
allowFullScreen>

</iframe>

{/* 
     <div style="position: relative; width: 100%; height: 0; padding-top: 100.0000%;
 padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
 border-radius: 8px; will-change: transform;">
  <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
    src="https://www.canva.com/design/DAGufXdjuBA/iuAao8IGP3sNCL2PVzWQvw/view?embed" allowfullscreen="allowfullscreen" allow="fullscreen">
  </iframe>
</div>
<a href="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAGufXdjuBA&#x2F;iuAao8IGP3sNCL2PVzWQvw&#x2F;view?utm_content=DAGufXdjuBA&amp;utm_campaign=designshare&amp;utm_medium=embeds&amp;utm_source=link" 
target="_blank" rel="noopener">Purple White Professional Minimal Brand Logo</a> by ZIAUL HODA        */}
</>
      ) 
     }
      




