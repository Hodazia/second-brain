import { useNavigate } from "react-router-dom"

interface Content {
    _id: string;
    type: 'document' | 'tweet' | 'youtube' | 'link';
    link: string;
    title: string;
    tags: string[];
    content?: string;
  }

export const Dashboard = () => {
    // navigate to sharable link 
    const navigate = useNavigate();
    const [content, setcontent ] = useState<Content> ();
    return (
      <>
      
      </>
    )

}