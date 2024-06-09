import {Header2} from "@/app/Components/header2";
import {Posts} from "@/app/Components/posts";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Dealerage() {


    return (
        <>
            <div
                className='flex bg-[url("https://res.cloudinary.com/du5ghkse1/image/upload/v1717763626/turnip-8266093_640_ve4ufo.jpg")]  min-h-screen w-full rounded-3xl bg-cover bg-center bg-no-repeat'>
                <div className='min-h-screen flex w-full  '>
                    <div className='w-2/4 bg-black bg-opacity-60 content-center rounded-tl-3xl'>
                        <div className='mb-48  ml-5'>
                            <div className='text-7xl font-bold text-white font-serif'>Sell your products and  <br></br>avoid  <span className={"text-warning"}>hassle</span>
                            </div>

                            <div className='text-lg text-gray-400 mt-6 font-sans'>The text in the image reads:

                                "Unlock unbeatable support in your selling journey! <br></br>Join the revolution and
                                experience a quicker, smarter way to sell.<br></br> With this network of agents at no
                                extra cost,<br></br> you'll be ready for anything."
                            </div>
                            <div className='mt-4  space-x-8'>
                                <Link href={"/Upload"}>
                                <button
                                    className="btn btn-outline btn-warning hover:bg-yellow-500 hover:text-white hover:border-none font-bold">Get
                                    Start
                                </button></Link>
                            </div>
                            <div className={"flex space-x-12 absolute bottom-0 font-sans text-white"}><div className={""}><div  className={"font-bold text-3xl "}>10,000+</div><div className={"pl-2"}>sold</div></div> <div className={""}><div className={"font-bold text-3xl "}>500+</div> <div className={"pl-2"}>agents</div></div></div>
                        </div>
                    </div>
                    <div className=''>
                        {/*<Image className='h-screen' src="/Untitled_design-removebg-preview.png" alt='bussiness'*/}
                        {/*       height={300} width={800}/>*/}
                    </div>
                </div>


            </div>

        </>
    )
}
