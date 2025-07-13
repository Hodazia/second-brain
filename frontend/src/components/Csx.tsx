{/*
    in here, we will learn about clsx, twmerge, and cva, 
    what are the differences between them */}

import clsx from "clsx"
import { twMerge } from "tailwind-merge"
import { cn } from "../lib/utils"
// define an interface of carprops with noof wheels as number and iscolor as boolean
interface CarProps {
    noofwheels:Number,
    iscolor:Boolean
}

// define an interface for variants , to pass as props or type checking 
interface VariantProps {
    variant: String,
    noofwheels:Number
}

const Car = ({variant, noofwheels}: VariantProps) => {
    //const nowheels = noofwheels;
    function getVariantStyle(variant:String){
        switch(variant)
        {
            case 'primary':
                return "text-center text-3xl text-blue-500"

            case 'secondary':
                return "text-center text-xl text-green-500"

            default:
                return "text-center text-gray-800"
        }
    }
    return (
        <>
        {/*down below we have used clsx for conditional styling in classNames */}
        {/* <h1 className={clsx("text-3xl border rounded-full ", {
            "bg-blue-500": iscolor
        })}>{`This is the no of wheels ${nowheels}`}</h1> */}

        {/*now what about tw-merge why we use it!!, usually the next one has higher priority */}
        {/* <h1 className={twMerge(clsx("text-3xl bg-yellow-400 border rounded-full ", {
            "bg-blue-500": iscolor
        }))}>{`This is the no of wheels ${nowheels}`}</h1> */}

            {/*now what is cn with variants,  */}
        <h1 className={cn(getVariantStyle(variant))}>{`This is the no of wheels`}
        </h1>
        </>
    )
}


export default Car;