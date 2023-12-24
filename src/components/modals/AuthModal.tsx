"use client"


import Modal from '@/components/Modal'
import useAuthModal from '@/hooks/useAuthModal'
import Button from '../Button'
import { FaGoogle } from 'react-icons/fa'
import { signIn, useSession } from 'next-auth/react'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

const AuthModal = () => {
    const { isOpen, onClose, onOpen } = useAuthModal();
    const { data: session } = useSession()

    useEffect(() => {
        if(session?.user){
            onClose()
        }
    }, [session?.user, onClose])

    if(session?.user){
        return null
    }

    
    return (
        <Modal
            title='Welcome back'
            description='Log in to your account'
            isOpen={isOpen}
            onChange={() => {
                if (isOpen) {
                    onClose()
                } else {
                    onOpen()
                }
            }}
        >
            <Button 
                className='inline-flex justify-center items-center gap-x-4 text-white focus-visible:opacity-75'
                onClick={() => signIn('google')}
            >
                <FaGoogle size={20} />
                <span>Sign in with Google</span>
            </Button>
        </Modal>
    )
}

export default AuthModal
