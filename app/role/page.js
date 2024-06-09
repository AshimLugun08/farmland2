"use client"
import { useSession } from "next-auth/react";

export default function rolePage() {
    const { data } = useSession();



    console.log(data);
}
