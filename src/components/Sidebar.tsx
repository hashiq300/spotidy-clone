"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BiSearch } from "react-icons/bi"
import { HiHome } from "react-icons/hi"
import { twMerge } from "tailwind-merge"

import Box from "@/components/Box"
import Library from "@/components/Library"





type SidebarProps = {
  children: React.ReactNode
}


const routes = [
  { name: "Home", path: "/", icon: <HiHome size={26} /> },
  { name: "Search", path: "/search", icon: <BiSearch size={26} /> },
]

function Sidebar({ children }: SidebarProps) {
  const pathname = usePathname();
  return (
    <div className="h-full flex">
      <aside className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={twMerge(
                  "flex items-center gap-x-4 text-md font-medium text-neutral-400 hover:text-white py-1 w-full",
                  pathname === route.path && "text-white"
                )}
              >
                {route.icon}
                <span className="truncate w-full">{route.name}</span>
              </Link>
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library />
        </Box>
      </aside>
      <main className="h-full flex-1 overflow-y-auto md:py-2">
        {children}
      </main>
    </div>
  )
}

export default Sidebar
