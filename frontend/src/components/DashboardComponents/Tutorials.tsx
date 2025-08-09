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
        <div className="flex w-full h-full justify-center items-center ">
        <div className="m-5 p-2">
        <Button 
        sidebar={false}
        variant="primary"
        text="Hey this is a button"
        icon={<Table2 />}
        />
        <Button 
        sidebar={false}
        variant="primary"
        text="Hey this is a button"
        icon={<Table2 />}
        />
        <RiNotionFill />
        <iframe
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
          </iframe>
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
            <div id="gist-container">
    {/* The Gist content will be dynamically loaded here by the script */}
  </div>
        </div>
        {/*modal will appear once we click the logout  */}
        {/* <Logout 
        isOpen={isOpen}
        onClose={toggleClick}
        onConfirm={toggleClick}
        /> */}
        
        </div>
        {/* <NotFound404 /> */}
        <SidebarControl shared={true} />
        <div>
        <div className="flex justify-between h-10 mb-2 items-center">
          <div className="flex items-center gap-2">
            <span className="text-xl text-orange-600">Notion Icon</span>
            <span className="text-base font-bold text-orange-600">Notion</span>
          </div>
          <div className="text-xl flex gap-3">
            <ExternalLink
              onClick={() => openExternalLink("https://hospitable-page-c67.notion.site/Frontend-24962da32a8d80768465fb06c59fc74c")}
              className="hover:text-orange-500 
              text-gray-500 cursor-pointer"
            />
           {/* <Trash2 onClick={()=>del(id)} className="hover:text-orange-500 text-gray-500 cursor-pointer" />} */}
          </div>
        </div>
        <div className="h-12 font-bold text-2xl">The title of Notion DOC</div>
      </div>
        <div className="object-cover overflow-hidden flex flex-col gap-2">
        <span>Notion Document about </span>
        </div>
        <iframe src="https://hospitable-page-c67.notion.site/ebd/24962da32a8d80768465fb06c59fc74c" width="100%" height="600" 
        frameBorder="0" allowFullScreen />



        </>
    )
}