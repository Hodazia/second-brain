
import axios from "../../utils/token"
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../utils/config"
import { useParams } from 'react-router';
import DashBoard from "./Dashboard";

const Shared = () => {
    const { hash } = useParams(); 
    const [data,setData] = useState([])
    useEffect(()=>{
        async function getData() {
            const res = await axios.get(`${BACKEND_URL}/api/v1/brain/${hash}`)
            setData(res.data.content)
        }
        getData()
    },[hash])

  return (
    <div>
      <DashBoard shared={true} data={data}/>
    </div>
  )
}

export default Shared