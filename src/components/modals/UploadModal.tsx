"use client"


import Modal from '@/components/Modal'
import { useSession } from 'next-auth/react'
import { FieldValues, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import useUploadModal from '@/hooks/useUploadModal'
import Input from '../Input'
import { UploadButton, UploadDropzone, Uploader } from '@/lib/uploadthing'
import UploadFile from '../UploadFile'
import MultiSelectInput from '../MultiSelectInput'

type FormState = {
    author: string;
    title: string;
    songUrl: string | null;
    thumbnailUrl: string | null;
}

const UploadModal = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { isOpen, onClose, onOpen } = useUploadModal();
    const { data: session } = useSession()

    const { register, handleSubmit, reset, setValue } = useForm<FormState>({
        defaultValues: {
            author: "",
            title: "",
            songUrl: null,
            thumbnailUrl: null,
        }
    })

    async function onSubmit(data: FieldValues) {
        console.log(data)
    }
    useEffect(() => {
        if (!session?.user) {
            onClose()
        }
    }, [session?.user, onClose])

    if (!session?.user) {
        return null
    }


    return (
        <Modal
            title='Upload a song'
            description='Add a mp3 song to your library'
            isOpen={isOpen}
            onChange={() => {
                if (isOpen) {
                    reset()
                    onClose()
                } else {
                    onOpen()
                }
            }}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    id="title"
                    disabled={isLoading}
                    {...register("title", { required: true })}
                    placeholder="Song Title"
                />
                <UploadFile
                    className='mt-5'
                    disabled={isLoading}
                    onUploadComplete={(url) => {
                        setValue("thumbnailUrl", url)
                    }}
                    endpoint='thumbnail'
                    allowedContent="image/png, image/jpeg, image/jpg MAX (2MB)"
                    buttonContent="Upload Song Thumbnail"
                />
                <UploadFile
                    className='mt-3'
                    disabled={isLoading}
                    onUploadComplete={(url) => {
                        setValue("songUrl", url)
                    }}
                    endpoint='song'
                    allowedContent="audio/mpeg, audio/mp3 MAX (32MB)"
                    buttonContent="Upload Song"
                />
                <MultiSelectInput onSelect={(value) => {
                    setValue("author", value.id)
                }} />
            </form>
        </Modal>
    )
}

export default UploadModal
