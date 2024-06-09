import { connectMongodb } from '@/lib/mongodb';
import Post from '@/models/post';
import Page from "@/app/Components/Page"
import {Header2} from "@/app/Components/header2";
const PostPage = async ({ params }) => {
    const { id } = params;

    await connectMongodb();
    const post = await Post.findById(id).lean();

    return( <>

        <Page post={post} />
    </>);
};

export default PostPage;
