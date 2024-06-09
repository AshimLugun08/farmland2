// models/post.js

import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  img: { type: String, required: false},
  product: { type: String, required: true },
  contact_no: { type: String, required: true },
  price: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,}
    ,
  description: { type: String, required: true },
  role: { type: String,
    required: false},
  category: { type: String, required: false }
});

const Post =mongoose.models.Posts || mongoose.model('Posts', postSchema);
export default Post;