import { useState, useEffect } from "react";
import { Brain, Youtube, Twitter, FileText, Link, Filter, LogOut, Sidebar as SidebarIcon, X } from "lucide-react";
import { Button } from "./Button";
import { useNavigate } from "react-router";
import Logout from './Logout';
import { RiNotionFill } from "react-icons/ri";
import { FaSpotify, FaLinkedin, FaFigma } from "react-icons/fa";
import { SiGoogledocs, SiCanva } from "react-icons/si";
import { toast } from "sonner";

interface Prop {
  shared?: boolean;
  open: boolean;
  setOpen: (isOpen: boolean) => void;
}

function SidebarControl({ shared, open, setOpen }: Prop) {
  const [width, setWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const [currentOption, setCurOption] = useState("All");
  const [logoutPop, setLogoutPop] = useState(false);

  const isMobile = width <= 768; // breakpoint for mobile

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    if (!isMobile) {
      setOpen(true);
    } else {
      setOpen(false);
    }
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  const data = [
    { name: "All", logo: <Filter /> },
    { name: "Tweets", logo: <Twitter /> },
    { name: "Videos", logo: <Youtube /> },
    { name: "Documents", logo: <FileText /> },
    { name: "Notion", logo: <RiNotionFill /> },
    { name: "Spotify", logo: <FaSpotify /> },
    { name: "Google Docs", logo: <SiGoogledocs /> },
    { name: "Linkedin", logo: <FaLinkedin /> },
    { name: "Figma", logo: <FaFigma /> },
    { name: "Canva", logo: <SiCanva /> },
    { name: "Links", logo: <Link /> },
  ];

  const handleMenuClick = (name: string) => {
    navigate(`/dashboard/${name.toLowerCase()}`);
    setCurOption(name);
    if (isMobile) {
      setOpen(false); // close after navigation
    }
  };

  return (
    <>
      {/* Mobile: Small icon to open sidebar */}
      {isMobile && !open && (
        <div className="fixed top-4 left-4 z-50">
          <SidebarIcon
            onClick={() => setOpen(true)}
            className="cursor-pointer text-orange-600 hover:text-orange-900 w-8 h-8"
          />
        </div>
      )}

      {/* Sidebar */}
      <div
        id="sidebar"
        className={`bg-gradient-to-b from-white to-orange-50 shadow-xl 
          h-screen overflow-y-auto py-8 transition-all duration-300 ease-in-out 
          fixed top-0 left-0 border-r z-40
          ${open ? "translate-x-0 w-64" : "-translate-x-full w-64"}
          ${!isMobile && open ? "w-[20vw]" : ""}`}
      >
        {/* Header */}
        <div id="Logo" className="w-full px-4 flex items-center justify-between">
          {open && (
            <div
              onClick={() => navigate("/dashboard")}
              className="flex items-center text-2xl font-bold cursor-pointer"
            >
              <div className="bg-orange-500 rounded-full">
                <Brain className="p-2 text-white h-12 w-12" />
              </div>
              <div className="ml-2">DocuView</div>
            </div>
          )}

          {/* Close button for mobile */}
          {isMobile && open && (
            <X
              onClick={() => setOpen(false)}
              className="cursor-pointer text-orange-600 hover:text-orange-900 w-6 h-6"
            />
          )}
        </div>

        {/* Menu */}
        <div className="mt-10">
          {data.map((item, index) => (
            <div
              key={index}
              className={`${currentOption === item.name ? "bg-gray-200" : ""}`}
            >
              <Button
                onClick={() => handleMenuClick(item.name)}
                sidebar={true}
                variant="h-14 px-10 text-orange-600"
                text={open ? item.name : ""}
                icon={item.logo}
              />
            </div>
          ))}
        </div>

        {/* Logout */}
        {!shared && (
          <Button
            onClick={() => setLogoutPop(true)}
            text={open ? "Logout" : ""}
            icon={<LogOut />}
            variant="px-10 gap-5 my-3 text-xl hover:bg-gray-200 h-10 text-orange-600"
          />
        )}

        <Logout
          isOpen={logoutPop}
          onClose={() => setLogoutPop(false)}
          onConfirm={() => {
            navigate("/");
            localStorage.removeItem("token");
            toast.success("You have been logged out successfully!");
          }}
        />
      </div>
    </>
  );
}

export default SidebarControl;
