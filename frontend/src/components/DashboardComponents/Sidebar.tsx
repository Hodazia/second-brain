import { useState, useEffect } from "react";
import { Brain, Youtube, Twitter, FileText, Link, Filter, LogOut, Sidebar as SidebarIcon } from "lucide-react";
import { Button } from "./Button";
import { useNavigate } from "react-router";
import Logout from './Logout';
// ADD A REACT-ICONS LIBRARY TO GET NOTION ICON
import { RiNotionFill } from "react-icons/ri";
import { FaSpotify } from "react-icons/fa";
import { SiGoogledocs } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { FaFigma } from "react-icons/fa";
import { SiCanva } from "react-icons/si";
import { toast } from "sonner";

interface prop{
  shared?:boolean;
  open: boolean;
  setOpen: (isOpen: boolean) => void;
}


function SidebarControl({ shared, open, setOpen }:prop){
  // const [open, setOpen] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const [currentoption,setcuroption] = useState('All');
  const [logoutpop,setLogoutpop] = useState(false);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    setOpen(width > 1380); // Adjust breakpoint
    return () => window.removeEventListener("resize", handleResize);
  }, [width,setOpen]);

  const data = [
    { name: "All", logo: <Filter /> },
    { name: "Tweets", logo: <Twitter /> },
    { name: "Videos", logo: <Youtube /> },
    { name: "Documents", logo: <FileText /> },
    {name:"Notion",logo:<RiNotionFill />},
    {name:"Spotify",logo:<FaSpotify />},
    {name:"Google Docs",logo:<SiGoogledocs />},
    {name:"Linkedin", logo:<FaLinkedin />},
    {name:"Figma", logo:<FaFigma />},
    {name:"Canva",logo:<SiCanva />},
    { name: "Links", logo: <Link /> },

  ];

  return (
    // Changed sidebar background to white and added a subtle shadow
    <div
      id="sidebar"
      className={`bg-gradient-to-b from-white to-orange-50
         shadow-xl h-screen overflow-y-auto py-8 transition-all 
        duration-100 ease-in-out fixed top-0 left-0 
        border-r border-1px
        ${
        open ? "w-[20vw]" : "w-20"
      }`}
    >
      <div id="Logo" className="w-full px-2">
        <div className="flex items-center justify-between h-10">
          {open && (
            <div onClick={()=>navigate('/dashboard')} className="flex
             items-center text-2xl md:text-3xl gap-2 font-bold">
               {/* Changed logo color to match the landing page */}
               <div className="bg-orange-500 rounded-full">
               <Brain className="p-2 text-white text-4xl md:text-4xl h-12 w-12" />
               </div>
              
              <div className="">DocuView</div>
            </div>
          )}
          
          <SidebarIcon
            onClick={() => setOpen(!open)}
            className="cursor-pointer text-orange-600 hover:text-orange-900"
          />
        </div>
      </div>
      <div className="mt-10 w-full h-full ">
        <div className="mb-20">
          {data.map((item, index) => (
            <div className={`${currentoption==item.name ? 'bg-gray-200' : ''}`}>
            <Button
              onClick={()=>
                {
                  navigate(`/dashboard/${item.name.toLowerCase()}`)
                  setcuroption(item.name)
                }} // Corrected to use lowercase URLs
              key={index}
              sidebar={true}
              variant="h-14 px-10 text-orange-600"
              text={open ? item.name : ""}
              icon={item.logo}
              //@ts-ignore
              //Disabled={`${shared==true? "true":"false"}`}
              />

            </div>
            ))}
          </div>
        {!shared && <Button onClick={()=>{
         setLogoutpop(true)
        }}  text={open ? "Logout" : ""} icon={<LogOut />}
         // Adjusted logout button style for light theme
         variant="px-10 gap-5 my-3 text-xl hover:bg-gray-200 h-10 text-orange-600"/>}
        <Logout isOpen={logoutpop} onClose={()=>{
          setLogoutpop(false)
        }} onConfirm={()=>{
          navigate('/')
          localStorage.removeItem('token')
          toast.success("You have been logged out successfully! ")
        }}/>
      </div>
    </div>
  );
}

export default SidebarControl;