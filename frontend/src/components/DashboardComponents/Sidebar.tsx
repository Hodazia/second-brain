import { useState, useEffect } from "react";
import { Brain, Youtube, Twitter, FileText, Link, Filter, LogOut, Sidebar as SidebarIcon } from "lucide-react";
import { Button } from "./Button";
import { useNavigate } from "react-router";
import Logout from './Logout';

interface prop{
  shared?:boolean;
}

function SidebarControl({shared}:prop){
  const [open, setOpen] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const [logoutpop,setLogoutpop] = useState(false);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    setOpen(width > 1380); // Adjust breakpoint
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  const data = [
    { name: "All", logo: <Filter /> },
    { name: "Tweets", logo: <Twitter /> },
    { name: "Videos", logo: <Youtube /> },
    { name: "Documents", logo: <FileText /> },
    { name: "Links", logo: <Link /> },
  ];

  return (
    // Changed sidebar background to white and added a subtle shadow
    <div
      id="sidebar"
      className={`bg-white shadow-xl min-h-screen py-8 transition-all 
        duration-100 ease-in-out ${
        open ? "w-[20vw]" : "w-20"
      }`}
    >
      <div id="Logo" className="w-full px-2">
        <div className="flex items-center justify-between h-10">
          {open && (
            <div onClick={()=>navigate('/dashboard')} className="flex
             items-center text-2xl md:text-3xl gap-2 font-bold">
               {/* Changed logo color to match the landing page */}
              <Brain className="text-orange-500 text-3xl md:text-4xl" />
              <div>Second Brain</div>
            </div>
          )}
          {/* Changed icon color to a dark gray */}
          <SidebarIcon
            onClick={() => setOpen((prev) => !prev)}
            className="cursor-pointer text-gray-600 hover:text-gray-900"
          />
        </div>
      </div>
      <div className="mt-10 w-full h-full ">
        <div className="mb-20">
          {data.map((item, index) => (
            <Button
              onClick={()=>navigate(`/dashboard/${item.name.toLowerCase()}`)} // Corrected to use lowercase URLs
              key={index}
              sidebar={true}
              variant="h-14 px-10"
              text={open ? item.name : ""}
              icon={item.logo}
              />
            ))}
          </div>
        {!shared && <Button onClick={()=>{
         setLogoutpop(true)
        }}  text={open ? "Logout" : ""} icon={<LogOut />}
         // Adjusted logout button style for light theme
         variant="px-10 gap-5 my-3 text-xl hover:bg-gray-200 h-10 text-gray-700"/>}
        <Logout isOpen={logoutpop} onClose={()=>{
          setLogoutpop(false)
        }} onConfirm={()=>{
          navigate('/')
          localStorage.removeItem('token')
        }}/>
      </div>
    </div>
  );
}

export default SidebarControl;