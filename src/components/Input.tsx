import { forwardRef } from "react"
import { twMerge } from "tailwind-merge"

type InputProps = {} & React.InputHTMLAttributes<HTMLInputElement>


const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...rest }, ref) => {
    return (
        <input className={twMerge(
            "rounded-lg bg-neutral-800 text-neutral-100 px-4 py-2 w-full focus:outline-transparent focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 transition-colors border border-neutral-500",
            className
        )} ref={ref} {...rest} />
    )
})

Input.displayName = "Input"

export default Input
