import Header from '@/components/Header'
import ListItem from '@/components/ListItem'
import { getServersideSession } from '@/lib/auth'
import Image from 'next/image'

export default async function Home() {
  const session = await getServersideSession();
  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <div className="bg-gradient-to-b from-emerald-800 p-6">
        <Header session={session}/>
        <div className='mb-2'>
          <h1 className='text-white text-3xl font-semibold'>
            Welcome Back
          </h1>
          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4'>
            <ListItem
              image="/images/liked.png"
              href='/liked'
              name="Liked Songs"
            />
          </div>
        </div>
      </div>
      <div className='mt-2 mb-7 px-6'>
        <div className="flex justify-between items-center">
          <h2 className='text-2xl font-semibold'>Newest Songs</h2>
        </div>
      </div>
    </div>
  )
}
