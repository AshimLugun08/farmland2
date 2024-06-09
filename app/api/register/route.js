import { NextResponse } from "next/server";
import { connectMongodb } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs"
export async function POST(req) {
    try {
        const { email, password, role } = await req.json(); // Make sure 'role' is correctly extracted from the request body
        const hashedPassword = await bcrypt.hash(password, 10);
        await connectMongodb();
        await User.create({ email, password: hashedPassword, role }); // Ensure 'role' is passed to the User.create() function
        return NextResponse.json({ message: "User registered" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "An error occurred while registering the user" }, { status: 500 });
    }
}
