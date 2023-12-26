"use client"

import { TbPlaylist } from 'react-icons/tb'
import { AiOutlinePlus } from 'react-icons/ai'
import { useSession } from 'next-auth/react'
import useAuthModal from '@/hooks/useAuthModal'
import useUploadModal from '@/hooks/useUploadModal'


const Library = () => {
  const { data: session } = useSession()
  const authModal = useAuthModal()
  const uploadModal = useUploadModal()
  function handleUpload() {
    if(!session?.user){
      authModal.onOpen()
    }else{
      uploadModal.onOpen()
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4 text-neutral-400">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist size={26} />
          <p className='font-medium text-md'>Your Library</p>
        </div>
        <button
          className='hover:text-white hover:bg-neutral-800 p-1 rounded-md transition-colors' onClick={handleUpload}>
          <AiOutlinePlus size={20} />
        </button>
      </div>
      <div className='flex flex-col gap-y-2 mt-4 px-3'>
        List of songs
      </div>
    </div>
  )
}

export default Library
