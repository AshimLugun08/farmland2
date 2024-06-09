"use client";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from "next/link";

export const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchPosts = async () => {
      if (!session) {
        return;
      }

      try {
        const response = await axios.get('/api/post');
        if (response.status === 200) {
          const filteredPosts = response.data.filter(post => {
            if (session?.user?.role === 'farmer') {
              return post.category === 'machine';
            } else if (session?.user?.role === 'shopkeeper') {
              return post.category === 'food';
            }
            return false;
          });
          setPosts(filteredPosts);
        } else {
          throw new Error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Error fetching posts');
      }
    };

    fetchPosts();
  }, [session]); // Dependency array ensures this runs when `session` changes

  return (
      <div className="p-6">

        <div className="flex flex-wrap bg-gray-200  justify-center">
          <div className="w-full p-6">
            <h1 className="font-serif text-3xl font-medium">Our <span className={"text-red-600"}>Product</span></h1>
          </div>
          {posts.map(post => (
              <Link href={`/mainpage/${post._id}`} key={post._id}>
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
                </div>
              </Link>
          ))}
        </div>
      </div>
  );
};
