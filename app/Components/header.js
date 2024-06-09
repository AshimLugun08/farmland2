import React from 'react'
import Image from 'next/image'
import { Nav } from './nav'

export const Header = () => {
  return (<>
    <div className='flex'>
    <div className=" items-center justify-between p-4">
    <div className=" items-center space-x-4">
      <h1 className="text-xl font-semibold">Company Name</h1>
    </div></div>
    <Nav />
    </div></>
  )
}
