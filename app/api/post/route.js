// pages/api/posts.js

import {connectMongodb} from '@/lib/mongodb';
import Post from '@/models/post';
import { NextResponse } from 'next/server';

export const GET =async (request)=>{
  

  try {
    await connectMongodb();
    console.log("hii")
    const posts=await Post.find();
    
    
    return new NextResponse(JSON.stringify(posts),{status:200});
    
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
