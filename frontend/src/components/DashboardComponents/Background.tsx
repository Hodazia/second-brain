import { Button } from "./Button";
import { Share2, Plus } from "lucide-react";
import Cards from "./Cards";
import axios from "../../utils/token";
import { useEffect, useState } from "react";
import { BACKEND_URL, FRONTEND_URL } from "../../utils/config";
import { useParams, useNavigate } from "react-router";
import { toast } from "sonner";

interface FuncProps {
  onClickopen: () => void;
  cardRender: boolean;
  data?: Card[]; 
  shared?: boolean;
}

interface Card {
  _id: string;
  title: string;
  content: string;
  type: string;
  link: string;
  tags: string[];
}

const Background = ({ onClickopen, cardRender, data, shared }: FuncProps) => {
  const [cardData, setCardData] = useState<Card[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();
  
  const {filter} = useParams();
  
  // Check if user is authenticated
  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
      return false;
    }
    return true;
  };
  
  // Fetch cards only when shared is false
  useEffect(() => {
    if (shared) return;
    
    if (!checkAuth()) return;
    
    async function getCards() {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/signin');
          return;
        }

        const currentFilter = filter || 'all'; 
        // get the cards data from the backend API, choose filtered one so, 
        if (filter) {
          const res = await axios.get<{ content: Card[] }>(`${BACKEND_URL}/api/v1/contents/${currentFilter}`);
          setCardData(res.data.content || []); // Set fetched data
        } else {
          const res = await axios.get<{ contents: Card[] }>(`${BACKEND_URL}/api/v1/content`);
          setCardData(res.data.contents || []); // Set fetched data
        }
      } catch (error: any) {
        console.error("Failed to fetch cards:", error);
        
        if (error.response?.status === 401) {
          // Unauthorized - token is invalid
          localStorage.removeItem('token');
          navigate('/signin');
          toast.error("Session expired. Please sign in again.");
        } else {
          toast.error("Failed to fetch cards. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }
  
    getCards();
  }, [cardRender, deleted, shared, filter, navigate]); // Added navigate to dependencies
  

  async function deleteCard(id: string) {
    if (!checkAuth()) return;
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/signin');
        return;
      }

      const res = await axios.delete<{ message: string }>(`${BACKEND_URL}/api/v1/content`, {
        data: { contentId: id },
      });
      setDeleted((prev) => !prev);
      toast.success(res.data.message);
    } catch (error: any) {
      console.error("Failed to delete card:", error);
      
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/signin');
        toast.error("Session expired. Please sign in again.");
      } else {
        toast.error("Failed to delete the card. Please try again.");
      }
    }
  }
  

  async function copy() {
    if (!checkAuth()) return;
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/signin');
        return;
      }

      const res = await axios.post<{ hash?: string }>(`${BACKEND_URL}/api/v1/brain/share`, {
        share: true,
      });
      
      if (res.data && res.data.hash) {
        await navigator.clipboard.writeText(`${FRONTEND_URL}/share/${res.data.hash}`);
        toast.success("Copied to clipboard!");
      } else {
        toast.error("No hash data found.");
      }
    } catch (error: any) {
      console.error("Failed to copy:", error);
      
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/signin');
        toast.error("Session expired. Please sign in again.");
      } else {
        toast.error("Failed to copy. Please try again.");
      }
    }
  }
  

  
  return (
    <div id="Background" className="w-full min-h-screen py-12 md:px-10
     md:py-12 bg-gradient-to-b from-white to-orange-50  ">
      <div id="nav" className="w-full flex justify-between px-1">
        <div id="text" className="font-bold text-2xl md:text-4xl">
          Welcome to your Dashboard!
        </div>
        {!shared && (
          <div className="flex gap-3  w-[19vw] flex-wrap">
            <Button
              text="Share Idea"
              variant="bg-orange-600 hover:bg-white hover:text-orange-600
              text-white justify-center items-center p-1 "
              sidebar={false}
              icon={<Share2 />}
              onClick={copy}
            />
            <Button
              onClick={onClickopen}
              text="Add Content"
              variant="bg-orange-600 hover:bg-white hover:text-orange-600
              text-white justify-center items-center p-1"
              icon={<Plus />}
            />
          </div>
        )}
      </div>
      <div id="cards">
        {loading ? (
        <div className=" absolute left-1/2 top-1/2">
           <div>Loading...</div>
        </div>
        ) :(
          
          shared && data? (
          
              <Cards deleteCard={deleteCard} 
            shared={shared} 
              data={data} />
               ):
               cardData.length === 0 ? (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-gray-500 font-bold">
                  No cards found for this section.
                </div>
              )
               :
            (<Cards 
              deleteCard={deleteCard}
               data={cardData} />)
        )}
      </div>

    </div>
  );
};

export default Background;