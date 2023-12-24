"use client"

import Modal from "@/components/Modal"
import AuthModal from "@/components/modals/AuthModal"
import { useEffect, useState } from "react"


const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null;

    return (
        <>
            <AuthModal/>
        </>
    )
    // return null
}

export default ModalProvider
