"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { IoMdClose } from "react-icons/io"

type ModalProps = {
    title: string
    description: string
    children: React.ReactNode
    isOpen: boolean
    onChange: (open: boolean) => void
}

const Modal = ({children, description, isOpen, onChange, title}: ModalProps) => {

    return (
        <Dialog.Root 
        open={isOpen} 
        defaultOpen={isOpen} 
        onOpenChange={onChange}
        >
            <Dialog.Portal>
                <Dialog.Overlay className="bg-neutral-900/50 backdrop-blur-sm fixed inset-0" />
                <Dialog.Content 
                    className="fixed drop-shadow-md border border-neutral-700 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-full h-full md:h-auto md:max-h-[85vh] w-full md:w-[90vw] md:max-w-[450px] rounded-md bg-neutral-800 p-[25px] focus:outline-none"
                >
                    <Dialog.Title className="text-xl text-center font-bold mb-4" >
                        {title}
                    </Dialog.Title>
                    <Dialog.Description className="mb-5 text-sm leading-normal text-center">
                        {description}
                    </Dialog.Description>
                    <div>
                        {children}
                    </div>
                    <Dialog.Close asChild>
                        <button className="text-neutral-400 hover:text-white absolute top-2.5 right-2.5 inline-flex justify-center items-center focus-visible:outline focus-visible:outline-neutral-50 focus-visible:text-white focus:outline-transparent rounded-md">
                            <IoMdClose size={26}/>
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default Modal
