"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from "next/image";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("shopkeeper");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(role);

    if (!email || !password) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const userExist = await fetch("/api/UserExist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const { user } = await userExist.json();

      if (user) {
        setError("User already exists");
        return;
      }

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          role,
        }),
      });

      console.log(res);
      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/login");
      } else {
        console.log("User registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
      <section className="bg-gray-300">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div  className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
           <Link href={"/"}> <Image src="/Screenshot__102_-removebg-preview.png" alt="logo" width={110} height={110} /></Link>
          </div>
          <div className="w-full bg-white rounded-3xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-green-600 md:text-2xl">
                Login to your <span className="text-green-900">Account</span>
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">Your email</label>
                  <input
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                      id="email"
                      className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                  <input
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                  />
                </div>
                <div>
                  <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">Role</label>
                  <select
                      id="role"
                      name="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50 h-8"
                  >
                    <option value="farmer">Farmer</option>
                    <option value="dealer">Dealer</option>
                    <option value="shopkeeper">Shopkeeper</option>
                  </select>
                </div>
                <div>
                  <button
                      type="submit"
                      className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Login
                  </button>
                </div>
                {error && <div className="text-red-600 text-sm">{error}</div>}
              </form>
              <p className="text-sm font-light text-gray-800 dark:text-gray-400">
                You already have login? <Link href="/login"><span className="font-medium text-primary-600 hover:underline dark:text-primary-500">login</span></Link>
              </p>
            </div>
          </div>
        </div>
      </section>
  );
};

export default SignInPage;
