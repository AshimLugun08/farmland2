"use client"
import React from 'react'
// import { Header } from '../Components/header'
import {signOut, useSession} from 'next-auth/react'
import {Posts} from "@/app/Components/posts";
import {Header2} from "@/app/Components/header2";
import Link from 'next/link'
import Dealerage from "@/app/Components/dealer";
import {useState,useEffect} from "react";
import Carousel from "@/app/Components/slider";
import "@/app/globals.css"

export default function userPage() {

  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'authenticated') {
      setLoading(false);
    }
  }, [status]);

  if (loading) {
    return <div>Loading...</div>; // You can show a loading spinner here
  }

  if (!session) {
    return <div>Please sign in to view this page.</div>;
  }

  return (
    <>
      {session.user.role !== 'dealer' && <Carousel />}


      {session.user.role === 'dealer' ? <Dealerage /> : <Posts />}
    
    </>
  )
}
