import React from 'react'
import Image from 'next/image'
import Link from "next/link";
export const Main_body = () => {
  return (
    <div className='flex bg-[url("https://res.cloudinary.com/du5ghkse1/image/upload/v1717723485/market-5430564_1280_oldupg.jpg")] min-h-screen w-full rounded-b-3xl bg-cover bg-center bg-no-repeat'>
        <div className='min-h-screen flex w-full  '><div className='w-2/4 bg-black bg-opacity-60 content-center rounded-bl-3xl'>
       <div className='mb-48  ml-5'>
           <div className='text-7xl font-bold text-white font-serif'>Let's now shop for <br></br>daily food &<br></br>
               necessary <span className={"text-warning"}>product</span>
           </div>

           <div className='text-3xl text-gray-400 mt-6 font-sans'>We are trusted grocery shop.You can buy all
               your<br></br> necessary products and  daily food on <br></br>your phone.
           </div>
           <div className='mt-4  space-x-8'><Link href={"/signin"}>
<button className="btn btn-outline btn-warning hover:bg-yellow-500 hover:text-white hover:border-none font-bold">Get Start</button></Link></div></div>
</div>
<div className=''>
        <Image className='h-screen' src="/Untitled_design-removebg-preview.png" alt='bussiness' height={300} width={800}/>
        </div>
        </div>


    </div>



  )
}
