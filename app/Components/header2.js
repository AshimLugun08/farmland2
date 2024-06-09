"use client";
import React, {useState ,useCallback} from 'react'
import Link from 'next/link';
import { signOut } from 'next-auth/react'
import {useSession} from "next-auth/react";
import {AiOutlineMenu} from "react-icons/ai";
import MenuItems from "@/app/Components/menuitm";
import Image from "next/image";

export const Header2 = ()=> {
    const handleLogout = () => {
        signOut({ callbackUrl: '/login' });
    };
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value)=>!value);
  },[])
  const { data: session } = useSession();
  return (
    <>
        <header>
    <nav className="col-span-3 flex border-b-2 h-16 flex-wrap bg-gray-300 items-center justify-between w-full  md:py-0 px-4 text-lg text-gray-700 bg-white">
<div>
 <Image src={"/Screenshot__102_-removebg-preview.png"} width={50} height={50} alt="img" />
</div>



      {/* Desktop Menu */}
        <div className={"justify-end  flex   items-center transition space-x-6"}>
            <div className={"font-sans hover:underline transition duration-300"}>About Us</div>
            <div className={"font-sans hover:underline transition duration-300"}>Contact Us</div>
         <Link href={"/mainpage"}>  {session && (<div className={"font-sans hover:underline transition duration-300"}>Home</div>)}</Link>
        <div
                className="p-4  border-[1px]   hover:text-yellow-400  hover:bg-green-800 border-green-800 h-12 flex  flex-row items-center gap-3 rounded-full curser-pointer hover:shodow-md transition">
                <h2 className={"font-sans"}>Farm Land Home</h2>
                <AiOutlineMenu onClick={toggleOpen}/>

            </div>
        </div>
        {isOpen && (
            <div
                className="absolute rounded-xl shadow-md w-[20vw] bg-gray-300 overflow-hidden right-0 top-14 text-sm z-10">
            <div className="flex flex-col curser-pointer">
              <>
              {!session && (<Link href={'/login'}>
              <MenuItems
                  onClick={()=> console.log("hi")}
                  label="Login"
                   classsName="z-10"
              /></Link>)}
                {!session && (<Link href={'/signin'}>
                  <MenuItems
                      onClick={()=> console.log("hi")}
                      label="Sign up"

                  /></Link>)}

                {session && (<MenuItems
                    onClick={handleLogout}
                      label="Logout"

                  />)}
                {session && session.user.role !== 'shopkeeper' &&(<Link href={'/Upload'}>
                  <MenuItems
                      onClick={()=> console.log("hi")}
                      label="Upload"

                  /></Link>)}
                {session &&  session.user.role !== 'shopkeeper' &&(<Link href={'/myPost'}>
                  <MenuItems
                      onClick={()=> console.log("hi")}
                      label="MyPost"

                  /></Link>)}
              </>
            </div>
          </div>
      )}
    </nav>
  </header>
    </>
  )
}
