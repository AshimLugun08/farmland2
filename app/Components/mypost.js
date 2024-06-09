"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter} from "next/navigation";
import {toast} from "react-toastify";

const Mypost = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/mypost');
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || 'Failed to fetch posts');
                }

                setPosts(data.posts);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchPosts();
    }, []);

    const handleDelete = async (id) => {
        try {
            toast("Deleting post",{
                position: "top-right",
                autoClose:2000,
                hideProgressBar: false,
                closeOnClick:true,
                pauseOnHover:true,
                draggable:true,
                progress:undefined,
                theme:"light",
            })
            const res = await fetch(`/api/mypost/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to delete post');
            }

            // Update state to remove the deleted post
            setPosts((prevPosts) => prevPosts.filter(post => post._id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="p-6">
            <div className="flex flex-wrap bg-gray-200 justify-center">
                <div className="w-full p-6">
                    <h1 className="font-serif text-3xl font-medium">Your <span className="text-red-600">Post</span></h1>
                </div>
                {error && <div>Error: {error}</div>}
                {posts.length === 0 && !error && <div className="text-gray-500 justify-center"><h1>No posts available.</h1></div>}
                {posts.map(post => (

                        <div
                            className="relative card bg-white flex flex-col m-6 text-gray-700 shadow-md bg-clip-border rounded-xl w-96 cursor-pointer">
                            <figure
                                className="relative h-56 mx-4 mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                                <img
                                    src={post.img}
                                    alt="Post"
                                    className="rounded-xl object-cover transition-transform duration-500 ease-in-out transform hover:scale-110"
                                />
                            </figure>
                            <div
                                className="pl-4 mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                <h2 className="card-title">{post.product}</h2>
                                <p className="font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                    {post.description}
                                </p>
                            </div>
                            <div className="card-actions flex justify-end mr-3 mb-2">
                                <button onClick={() => handleDelete(post._id)} className="btn bg-red-600 text-white">Remove Post
                                </button>
                            </div>
                        </div>

                ))}
            </div>
        </div>
    );
};

export default Mypost;
