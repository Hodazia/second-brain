import type { ReactElement } from "react"

interface BtnDashProps {
    text:string,
    type?:string,
    variant?:string,
    disabled?:boolean,
    onClick?:() => void,
    icon:ReactElement
    sidebar?:boolean
}

export const Button = ({text,type,variant,disabled,icon,onClick,sidebar}: BtnDashProps) => {
    return (
        <button disabled={disabled} onClick={onClick} 
        // Adjusted styles for the light theme
        className={`${variant} ${sidebar && "gap-5 my-3 text-xl text-gray-700 hover:bg-gray-200"}
          w-full md:flex flex items-center 
        cursor-pointer rounded-lg text-sm gap-2 px-4 `}>
            <div>{icon}</div>
            <div>{text}</div>
        </button>
    )

}