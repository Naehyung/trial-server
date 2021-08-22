import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  id: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: { type: String, required: true },
});

export default mongoose.model("Message", messageSchema);
