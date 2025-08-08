import { Button } from "./Button"
import { Sidebar, Table2 } from "lucide-react"
import Logout from "./Logout"
import { useState } from "react"
import NotFound404 from "./NotFound"
import  SidebarControl from "./Sidebar"

const succesClick = () => {
    console.log("Clicked successfully");
    isOpen = false;
}
const succesConfirm = () => {
    console.log("Confirmed successfully");
    isOpen = false;
}

let isOpen:boolean = true;
export const Tutorials= () => {
    const [isOpen,setisOpen]= useState<boolean>(true);

    const toggleClick = () => {
        setisOpen(false)
    }
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
        </div>
        {/*modal will appear once we click the logout  */}
        <Logout 
        isOpen={isOpen}
        onClose={toggleClick}
        onConfirm={toggleClick}
        />
        
        </div>
        {/* <NotFound404 /> */}
        <SidebarControl shared={true} />
        </>
    )
}