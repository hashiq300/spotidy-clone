"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { FaPlay } from "react-icons/fa"

type ListItemProps = {
    image: string
    name: string
    href: string
}

const ListItem = ({href, image, name}: ListItemProps ) => {
    const router = useRouter();

   function handleClick(){
    router.push(href)
   }
  return (
    <button className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4">
      <div className="min-h-16 min-w-16 relative">
        <Image 
        src={image} 
        className="object-cover" 
        fill 
        alt="image"
        />
      </div>
      <p className="font-medium truncate py-5">{name}</p>
      <div className="absolute transition-transform opacity-0 rounded-full flex items-center justify-center bg-green-500 p-4 drop-shadow-md right-5 md:group-hover:opacity-100 md:hover:scale-105 text-black">
        <FaPlay className="translate-x-0.5" />
      </div>
    </button>
  )
}

export default ListItem
