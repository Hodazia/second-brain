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
        className={`${variant} ${sidebar && "gap-5 my-3 text-xl hover:bg-zinc-500"}
         w-full md:flex flex items-center 
        cursor-pointer rounded-lg text-sm gap-2 px-4 `}>
            <div>{icon}</div>
            <div>{text}</div>
        </button>
    )

}