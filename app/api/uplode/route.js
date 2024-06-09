import { connectMongodb } from "@/lib/mongodb";
import Post from "@/models/post";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const POST = async (req) => {
  await connectMongodb();

  const session = await getServerSession({ req, ...authOptions });

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  try {
    const { product, contact_no, description, img,price } = await req.json();

    if (!product || !contact_no || !description || !img ||!price) {
      return new Response(JSON.stringify({ error: "Please add all the fields" }), { status: 422 });
    }

    const role = session.user.role;

    const user=session.user.id
    let category;
    if (role === "farmer") {
      category = "food";
    } else if (role === "dealer") {
      category = "machine";
    } else {
      return new Response(JSON.stringify({ error: "Forbidden: Invalid role" }), { status: 403 });
    }

    const newProduct = new Post({
      product,
      contact_no,
      description,
      img,
      price,
      user,
      category,
    });

    const savedProduct = await newProduct.save();
    console.log("Product saved successfully", savedProduct);

    await User.findByIdAndUpdate(session.user.id, {
      $push: { posts: savedProduct._id }
    });

    return new Response(JSON.stringify(savedProduct), { status: 201 });

  } catch (error) {
    console.error("Error in POST /api/upload:", error);
    return new Response(JSON.stringify({ error: "Failed to save product" }), { status: 500 });
  }
};
