"use client";
import React, { useState, useEffect } from 'react';
import { Roboto_Condensed} from "next/dist/compiled/@next/font/dist/google"; // Correct import path
import {MdOutlineProductionQuantityLimits} from "react-icons/md";
import {FaProductHunt} from "react-icons/fa";
import {IoTimerOutline} from "react-icons/io5";
import {CiDeliveryTruck} from "react-icons/ci";
import {TbTruckReturn} from "react-icons/tb";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {router} from "next/client";
const popup =()=>{
    toast("order placed",{
        position: "top-right",
        autoClose:5000,
        hideProgressBar: false,
        closeOnClick:true,
        pauseOnHover:true,
        draggable:true,
        progress:undefined,
        theme:"light",
    })


}

const Page = ({ post }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (post) {
            setLoading(false);
        } else {
            setError("Post not found");
            setLoading(false);
        }
    }, [post]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={`pl-40 `}>
            {post ? (
                <div>
                    <p className={`capitalize text-5xl pb-3`}>
                        Product\ <span className="text-red-600">{post.category}</span>
                    </p>
                    <div className="flex flex-wrap space-x-14 ">
                        {post.img && (
                            <img
                                className="pt-3 h-80 w-90 border-b shadow-2xl rounded-b-3xl"
                                src={post.img}
                                alt={post.product}
                            />
                        )}
                        <div>
                            <h1 className="pt-7 font-bold text-4xl capitalize">{post.product}</h1>
                            <p className={"pt-2 text-gray-500 text-2xl"}>{post.description}</p>
                            <h1 className="pt-7 font-sans text-4xl capitalize">₹{post.price}</h1>
                            <div className="pt-2">
                                <button onClick={popup} type="button"
                                        className=" text-white bg-red-600 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Buy now
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-200 mt-6 mr-40">
                        <h1 className="text-3xl m-6 font-serif font-medium mb-6">Our Services</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div
                                className="relative card bg-white flex flex-col text-gray-700 shadow-md bg-clip-border rounded-xl cursor-pointer w-60 mx-auto">
                                <div
                                    className="relative h-40 mx-4 pt-6 flex items-center justify-center text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                                    <MdOutlineProductionQuantityLimits size="3em" className={"text-gray-600"}/>
                                </div>
                                <div className="flex flex-col items-center justify-center p-4 h-full">
                                    <h2 className="card-title text-xl font-semibold justify-center text-blue-gray-900">Quality</h2>
                                    <p className="text-base font-light  leading-relaxed ">You can trust</p>

                                </div>
                            </div>

                            <div
                                className="relative card bg-white flex flex-col text-gray-700 shadow-md bg-clip-border rounded-xl cursor-pointer w-60 mx-auto">
                                <div
                                    className="relative h-40 mx-4 pt-6 flex items-center justify-center text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                                   <IoTimerOutline size={"3em"} className={"text-gray-600"}/>
                                </div>
                                <div className="flex flex-col items-center justify-center p-4 h-full">
                                    <h2 className="card-title text-xl font-semibold text-blue-gray-900">On time
                                        </h2>
                                    <p className="text-base font-light  leading-relaxed ">Guarantee</p>
                                </div>
                            </div>

                            <div
                                className="relative card bg-white flex flex-col text-gray-700 shadow-md bg-clip-border rounded-xl cursor-pointer w-60 mx-auto">
                                <div
                                    className="relative h-40 mx-4 pt-6 flex items-center justify-center text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                                    <CiDeliveryTruck size={"3em"} className={"text-gray-600"}/>
                                </div>
                                <div className="flex flex-col items-center justify-center p-4 h-full">
                                    <h2 className="card-title text-xl font-semibold text-blue-gray-900">Free
                                       </h2>
                                    <p className="text-base font-light  leading-relaxed "> Delivery</p>
                                </div>
                            </div>

                            <div
                                className="relative card bg-white flex flex-col text-gray-700 shadow-md bg-clip-border rounded-xl cursor-pointer w-60 mx-auto">
                                <div
                                    className="relative h-40 mx-4 pt-6 flex items-center justify-center text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                                    <TbTruckReturn size={"3em"} className={"text-gray-600"}/>
                                </div>
                                <div className="flex flex-col items-center justify-center p-4 h-full">
                                    <h2 className="card-title text-xl font-semibold text-blue-gray-900">Return Policy
                                        </h2>
                                    <p className="text-base font-light  leading-relaxed ">No Question asked</p>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>


            ) : (
                <div>No post found</div>
            )}
        </div>
    );
};

export default Page;
