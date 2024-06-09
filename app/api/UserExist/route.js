import { connectMongodb } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(res){
    try {
        await connectMongodb();
        const {email}=await res.json()
       const user =await User.findOne({email}).select("_id");
        console.log("User",user);
        return NextResponse.json({user});
    } catch (error) {
        console.log(error)
    }
}