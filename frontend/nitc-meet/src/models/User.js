// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String }, // From Google Auth
  //personalityResponses: { type: Map, of: Number }, // Store question responses
  personality: { type: String }, // Calculated personality word
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
