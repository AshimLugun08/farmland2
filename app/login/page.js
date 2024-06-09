"use client"
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {useSession} from "next-auth/react";
import {toast} from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session } = useSession();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
    console.log(session.user.role)
      if (res.error) {
        setError("Invalid Credentials");
        return;
      }
      toast("login succesfully",{
        position: "top-right",
        autoClose:5000,
        hideProgressBar: false,
        closeOnClick:true,
        pauseOnHover:true,
        draggable:true,
        progress:undefined,
        theme:"dark",
      })
        router.replace("mainpage");



      // Redirect to the homepage after successful login
    } catch (error) {
      console.log(error);
      toast("invalid data",{
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
  };

  return (
    <section className="bg-gray-300 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <Link href={"/"}> <Image src="/Screenshot__102_-removebg-preview.png" alt="logo" width={110}
                                   height={110}/></Link>
        </div>
        <div
            className="w-full bg-white rounded-3xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0  dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-green-600  md:text-2xl">
              Login page to your <span className={"text-green-900"}>Account</span>
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium  ">Your email</label>
                <input type="email"  onChange={(e) => setEmail(e.target.value)} name="email" id="email" className=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium  ">Password</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder="••••••••" className=" border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>

              <button type="submit" className="w-full  bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
              <p className="text-sm font-light text-gray-800 dark:text-gray-400">
                Don’t have an account yet? <Link href={"/signin"}><span
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</span></Link>
              </p>
              {error && <p>{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
