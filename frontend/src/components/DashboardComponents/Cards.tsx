import { RiNotionFill } from "react-icons/ri";
import Card from "./Card";
import { FileText, Link, Youtube, Twitter, Monitor } from "lucide-react";
import {FaLinkedin,  FaSpotify } from "react-icons/fa";
import { SiGoogledocs } from "react-icons/si";
import { SiGooglemaps } from "react-icons/si";
import { FaFigma } from "react-icons/fa";
import { SiCanva } from "react-icons/si";

interface CardItem {
  _id:string;
  title: string;
  type: string;
  link: string;
  content: string;
  tags: string[];
}

interface Dataarray {
  data: CardItem[];
  deleteCard: (id: string) => void; 
  shared?: boolean;
}


const Cards = ({data,deleteCard,shared}:Dataarray) => {

    const icons = [
      { name: "Twitter", logo: <Twitter /> },
      { name: "Youtube", logo: <Youtube /> },
      { name: "Document", logo: <FileText /> },
      { name: "Links", logo: <Link /> },
      { name: "Website", logo: <Link /> },
      {name:"Notion",logo:<RiNotionFill />},
      {name:"Spotify",logo:<FaSpotify />},
      {name:"Google Docs",logo:<SiGoogledocs />},
      {name:"Google Maps",logo:<SiGooglemaps/>},
      {name:"Linkedin",logo:<FaLinkedin />},
      {name:"Figma", logo:<FaFigma />},
      {name:"Canva",logo:<SiCanva />},
      { name: "Other", logo: <Monitor /> },
    ];
    
  return (
    <div className="mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item)=>{
        const icon =  icons.filter((i)=>i.name==item.type)
        return <Card shared={shared} del={deleteCard} title={item.title}
         key={item._id} id={item._id} content={item.content} 
         type={item.type} icon={icon[0].logo} Src={item.link} 
         tags={item.tags} Date={new Date().toLocaleDateString()}/>
        })}
      </div>
    </div>
  )
}

export default Cards