// pages/api/mypost.js
import { connectMongodb } from "@/lib/mongodb";
import User from "@/models/user";
import Post from "@/models/post"; // Import the Post model
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const GET = async (req) => {
  await connectMongodb();

  const session = await getServerSession({ req, ...authOptions });

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  try {
    const user = await User.findById(session.user.id).populate({path: "posts",model: Post});
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ posts: user.posts }), { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/mypost:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch user data" }), { status: 500 });
  }
};
