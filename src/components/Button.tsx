"use client"

import { generateTouchHandlers } from "@/utils/mobile"
import { forwardRef, useMemo } from "react"
import { twMerge } from "tailwind-merge"


type ButtonProps = {} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, className, type = "button", ...rest }, ref) => {
    const touchHandlers = useMemo(() => generateTouchHandlers(), [])
    return (
        <button
            className={twMerge(
                `w-full 
                rounded-full 
                p-3
                border
                border-transparent
                font-bold
                md:hover:opacity-75
                disabled:opacity-50
                disabled:cursor-not-allowed
                disabled:hover:opacity-50
                disabled:aria-pressed:opacity-50 
                bg-green-500 
                text-black 
                transition-transform 
                aria-pressed:opacity-75`,
                className
            )}
            {...touchHandlers}
            ref={ref}
            type={type}
            {...rest}
        >
            {children}
        </button>
    )
})

Button.displayName = "Button"

export default Button
