import { OurFileRouter } from '@/app/api/uploadthing/core'
import { UploadButton } from '@/lib/uploadthing'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { twMerge } from 'tailwind-merge'

type UploadFileProps = {
  endpoint: keyof OurFileRouter
  className?: string;
  allowedContent: string;
  buttonContent: string;
  onUploadComplete: (url: string) => void;
  disabled?: boolean;
}

const UploadFile = ({ endpoint, className, allowedContent, buttonContent, onUploadComplete, disabled }: UploadFileProps) => {
  const [filename, setFilename] = useState('')
  const [progress, setProgress] = useState<number | null>(null)
  return (
      <div className={twMerge(
        'relative',
        disabled && 'opacity-50 pointer-events-none'
      )}>
      <UploadButton
        endpoint={endpoint}
        className={twMerge(
          'ut-button:w-full ut-button:bg-neutral-700 ut-clear-btn:hover:bg-transparent ut-button:after:bg-green-600 ut-button:truncate',
          className
        )}
        content={{
          allowedContent,
          button: getbuttonContent(filename, buttonContent, progress)
        }}
        onClientUploadComplete={(e) => {
          setProgress(null)
          setFilename(e[0].name)
          onUploadComplete(e[0].url)

        }}
        onUploadError={(e) => {
          toast.error(e.message)
        }}

        onUploadProgress={(n) => setProgress(n)}
      />
      {/* {progress !== null && <p className='h-fit z-10 absolute top-1.5 left-1/2 -translate-x-1/2'>{progress}%</p>} */}
    </div>
  )
}

function getbuttonContent(filename: string, buttonContent: string, progress: number | null) {
  if(progress !== null){
    return ""
  }else if(filename !== ""){
    return `uploaded ${filename}`
  }else{
    return buttonContent
  }
}

export default UploadFile
