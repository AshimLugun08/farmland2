import { connectMongodb } from "@/lib/mongodb";
import Post from "@/models/post";
import { ObjectId } from "mongodb";

export async function POST(req, res) {
    const { id } = await req.json(); // Assuming the ID is passed in the body

    // Check if the provided ID is a valid ObjectId
    if (!ObjectId.isValid(id)) {
        return new Response(JSON.stringify({ success: false, message: 'Invalid ID' }), { status: 400 });
    }

    try {
        await connectMongodb();

        const result = await Post.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 1) {
            return new Response(JSON.stringify({ success: true }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ success: false, message: 'Post not found' }), { status: 404 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
    }
}
