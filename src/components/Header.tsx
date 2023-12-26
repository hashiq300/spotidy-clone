"use client"

import { generateTouchHandlers } from "@/utils/mobile"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMemo } from "react"
import { BiSearch } from "react-icons/bi"
import { HiHome } from "react-icons/hi"
import { RxCaretLeft, RxCaretRight } from "react-icons/rx"
import Button from "@/components/Button"
import { signOut } from "next-auth/react"
import useAuthModal from "@/hooks/useAuthModal"
import { Session } from "next-auth"
import { FaUserAlt } from "react-icons/fa"
import toast from "react-hot-toast"


type HeaderProps = {
    session: Session | null
}

const Header = ({ session }: HeaderProps) => {
    const router = useRouter();


    const touchHandlers = useMemo(() =>
        generateTouchHandlers<HTMLAnchorElement>()
        , [])

    const { onOpen } = useAuthModal()

    const handleLogout = () => {
        signOut()
        toast.success("Logged out successfully")
        router.push("/")
    }

    return (
        <div className="mb-4 flex  items-center justify-between">
            <div className="hidden md:flex gap-x-2 items-center">
                <button
                    className="rounded-full flex items-center justify-center p-1 bg-black"
                    onClick={() => router.back()}
                >
                    <RxCaretLeft size={35} />
                </button>
                <button
                    className="rounded-full flex items-center justify-center p-1 bg-black"
                    onClick={() => router.forward()}
                >
                    <RxCaretRight size={35} />
                </button>
            </div>
            <div className="flex md:hidden gap-x-2 items-center">
                <Link
                    href="/"
                    className="rounded-full p-2 bg-white flex items-center justify-center text-black transition-transform aria-pressed:opacity-75"
                    {...touchHandlers}
                >
                    <HiHome size={20} />
                </Link>
                <Link
                    href="/search"
                    className="rounded-full p-2 bg-white flex items-center justify-center text-black transition-transform aria-pressed:opacity-75"
                    {...touchHandlers}
                >
                    <BiSearch size={20} />
                </Link>
            </div>
            <div className="flex justify-between items-center gap-x-4">
                <>
                    {session?.user ? (
                        <div className="flex gap-x-4 items-center">
                            <Button
                                onClick={handleLogout}
                                className="bg-white px-6 py-2"
                            >
                                Logout
                            </Button>
                            <Button 
                                className="bg-white"
                                onClick={() => router.push("/account")}

                            >
                                <FaUserAlt />
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div>
                                <Button className="bg-transparent text-neutral-300 font-medium"
                                    onClick={onOpen}
                                >
                                    Sign Up
                                </Button>

                            </div>
                            <div>
                                <Button
                                    className="bg-white px-6 py-2"
                                    onClick={onOpen}
                                >
                                    Log In
                                </Button>
                            </div>
                        </>
                    )}
                </>
            </div>
        </div>
    )
}

export default Header
