
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../utils/config"
import { useParams } from 'react-router';
import DashBoard from "./Dashboard";

const Shared = () => {
    const { hash } = useParams(); 
    const [data,setData] = useState([])
    useEffect(()=> {
      async function getData() {
        try {
            const res = await axios.get(`${BACKEND_URL}/api/v1/brain/share/${hash}`);
            // Ensure res.data is not null or undefined before setting data
            if (res.data && res.data.content) {
                setData(res.data.content);
            } else {
                console.error("No content found in shared link.");
                setData([]);
            }
        } 
        catch (error) {
            console.error("Failed to fetch shared content:", error);
            setData([]);
        }
      }
      getData();},
      [hash]);

  return (
    <div>
      <DashBoard shared={true} data={data}/>
    </div>
  )
}

export default Shared