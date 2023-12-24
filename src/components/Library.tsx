

import { TbPlaylist } from 'react-icons/tb'
import { AiOutlinePlus } from 'react-icons/ai'

const Library = () => {
function handleUpload(){
    // const file = e.target.files[0]
}

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4 text-neutral-400">
        <div className="inline-flex items-center gap-x-2">
            <TbPlaylist size={26}/>
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
