// models/user.js
import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  posts: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    }],
    default: [],
  },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
