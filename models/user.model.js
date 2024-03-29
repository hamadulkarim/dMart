import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {type: String, required: true, trim: true},
  email:{type: String, required: true, unique: true},
  password:{type: String, required: true, },
  phone:{type: String, required: true},
  address: {type: String, required: true},
  role: {type: String, enum: ['normal', 'admin'], default: 'normal'}
}, {timestamps: true})

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User