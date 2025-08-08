import Card from "./Card";
import { FileText, Link, Youtube, Twitter, Monitor } from "lucide-react";

interface CardItem {
  _id:string;
  title: string;
  linkType: string;
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
      { name: "Other", logo: <Monitor /> },
    ];
    
  return (
    <div className="mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item)=>{
        const icon =  icons.filter((i)=>i.name==item.linkType)
        return <Card shared={shared} del={deleteCard} title={item.title} key={item._id} id={item._id} content={item.content} type={item.linkType} icon={icon[0].logo} Src={item.link} tags={item.tags} Date={new Date().toLocaleDateString()}/>
        })}
      </div>
    </div>
  )
}

export default Cards