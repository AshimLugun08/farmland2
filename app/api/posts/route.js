import { connectMongodb } from '@/lib/mongodb';
import Post from '@/models/post';
import mongoose from 'mongoose';

export async function POST(req, res) {
    try {
        const { id } = await req.json(); // Use req.json to parse the request payload

        console.log('Received ID:', id); // Debugging statement

        await connectMongodb();

        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.error('Invalid post ID');
            return new Response(JSON.stringify({ error: "Invalid post ID" }), { status: 400 });
        }

        try {
            const post = await Post.findById(id);
            if (!post) {
                console.error('Post not found');
                return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });
            }
            return new Response(JSON.stringify(post), { status: 200 });
        } catch (error) {
            console.error('Error fetching post:', error);
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }
    } catch (error) {
        console.error('Error in POST handler:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
